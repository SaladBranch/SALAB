package com.sesame.salab.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.common.MailUtils;
import com.sesame.salab.common.Tempkey;
import com.sesame.salab.member.model.service.MemberService;
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.service.PrivateFileService;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Controller
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	//요것도 파일정보 불러오는데 필요해서 했습니다
	@Autowired
	private PrivateFileService pfService;
	
	//처음 회원가입 시 , 회원정보 삽입하는 파트
	@RequestMapping(value="enroll.do", method=RequestMethod.POST)
	public ModelAndView insertMemberMethod(ModelAndView mv, Member member) throws Exception{
		member.setUserpwd(bcryptPasswordEncoder.encode(member.getUserpwd()));
		member.setUsername(member.getUseremail().substring(0, member.getUseremail().indexOf('@')));
		member.setUserauthkey(new Tempkey().getKey(50, false));
		
		String uemail = member.getUseremail();
		memberService.deleteUncheckedMail(uemail);
		int result = memberService.insertMember(member);
		if(result > 0) {
			//DB에 기본 입력 값 insert 성공 시 메일 작성
			MailUtils sendMail = new MailUtils(mailSender);
			sendMail.setSubject("[SALAB] 회원가입 이메일 인증");
			sendMail.setText(sendMail.emailCITemplate(uemail, member.getUserauthkey()));
			sendMail.setFrom("saladbranch@gmail.com", "SALAB");
			sendMail.setTo(uemail);
			sendMail.send();
			mv.addObject("uemail", uemail);
			mv.addObject("mailLink", uemail.substring(uemail.indexOf('@')+1, uemail.length()));
			mv.setViewName("emailCI/emailSended");
		}else {
			mv.setViewName("common/error");
		}
		return mv;
	}
	@RequestMapping(value="resendMail.do")
	public ModelAndView resendMailMethod(ModelAndView mv, String uemail, String type) throws Exception {
		String authkey = "";
		if(type.equals("resend"))
			authkey = memberService.getUncheckedMember(uemail);
		if(type.equals("find"))
			authkey = memberService.getCheckedMember(uemail);
		if(!authkey.equals("")) {
			MailUtils sendMail = new MailUtils(mailSender);
			if(type.equals("resend")) {
				sendMail.setSubject("[SALAB] 회원가입 이메일 인증");
				sendMail.setText(sendMail.emailCITemplate(uemail, authkey));
				mv.addObject("mention", "링크를 클릭하시면 가입 완료 및 로그인이 가능합니다.");
			}else if(type.equals("find")) {
				sendMail.setSubject("[SALAB] 비밀번호 변경");
				sendMail.setText(sendMail.findPwdTemplate(uemail, authkey));
				mv.addObject("mention", "링크를 클릭하시면 비밀번호 변경이 가능합니다.");
			}
				
			sendMail.setFrom("saladbranch@gmail.com", "SALAB");
			sendMail.setTo(uemail);
			sendMail.send();
			mv.addObject("uemail", uemail);
			mv.addObject("mailLink", uemail.substring(uemail.indexOf('@')+1, uemail.length()));
			mv.setViewName("emailCI/emailSended");
		}else {
			mv.setViewName("common/error");
		}
		return mv;
	}
	
	@RequestMapping(value="emailchk.do", method=RequestMethod.POST) //회원가입 인증메일 인증완료
	public String emailConfirmMethod(Member member) {
		int result = memberService.updateEmailChecked(member);
		return "emailCI/emailConfirm";
	}
	@RequestMapping(value="pwdEmailchk.do", method=RequestMethod.POST) //비밀번호찾기 인증메일 인증완료
	public ModelAndView changePwdMethod(Member member, ModelAndView mv) {
		Member pmember = memberService.getMemberForPwd(member);
		if(pmember != null) {
			mv.addObject("pmember", pmember);
			mv.setViewName("findPwd/changePwd");
		}else {
			mv.setViewName("common/error");
		}
		return mv;
	}
	@RequestMapping(value="initChangePwd.do", method=RequestMethod.POST)
	public String changePwdCompleteMethod(Member member) {
		String viewName = "";
		member.setUserpwd(bcryptPasswordEncoder.encode(member.getUserpwd()));
		int result = memberService.initChangePwd(member);
		if(result > 0)
			viewName = "findPwd/changeComplete";
		else
			viewName = "common/error";
		return viewName;
	}
	
	
	@RequestMapping(value="login.do", method=RequestMethod.POST)
	public String loginMethod(HttpSession session, Member member, HttpServletRequest requset) {
		String viewFileName = "redirect:recentFile.do?sort=recent";
		MongoService mgService = new MongoService();
		Member loginMember = memberService.loginCheck(member);
		
		if(loginMember != null && bcryptPasswordEncoder.matches(member.getUserpwd(), loginMember.getUserpwd())) {
			session.setAttribute("loginMember", loginMember);
		}else {
			viewFileName = "common/error";
		}
		return viewFileName;
	}
	
	@RequestMapping(value="logout.do")
	public String loginMethod(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session != null) {
			session.invalidate();
		}
		return "main";
	}
	
	@RequestMapping(value="isExistEmail.do", method=RequestMethod.POST)
	public void isExistEmailMethod(Member member, HttpServletResponse response) throws IOException {
		logger.info("등록된 이메일인지 확인 중..." + member.getUseremail());
		
		int result = memberService.isExistEmail(member.getUseremail());
		PrintWriter out = response.getWriter();
		if(result > 0) {
			out.append("exist");
			out.flush();
		}else {
			out.append("none");
			out.flush();
		}
		out.close();
	}
	@RequestMapping(value="pwdCheck.do", method=RequestMethod.POST)
	public void pwdCheckMethod(Member member, HttpServletResponse response) throws IOException{
		logger.info("비밀번호 일치 확인 중..." + member.toString());
		Member loginMember = memberService.loginCheck(member);
		PrintWriter out = response.getWriter();
		if(loginMember != null && bcryptPasswordEncoder.matches(member.getUserpwd(), loginMember.getUserpwd())){
			out.append("correct");
			out.flush();
		}else {
			out.append("incorrect");
			out.flush();
		}
		out.close();
	}
	
}
