package com.sesame.salab.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

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
		
		logger.info("전달받은 회원정보 : " + member.toString());
		
		String uemail = member.getUseremail();
		
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
			mv.addObject("message", "응 데이터 못집어넣었어");
		}
		return mv;
	}
	
	@RequestMapping(value="emailchk.do", method=RequestMethod.POST)
	public String emailConfirmMethod(Member member) {
		int result = memberService.updateEmailChecked(member);
		return "emailCI/emailConfirm";
	}
	
	
	@RequestMapping(value="login.do", method=RequestMethod.POST)
	public String loginMethod(HttpSession session, Member member, HttpServletRequest requset) {
		String viewFileName = "recentFile/recentFile";
		logger.info("로그인 입력 정보 : " + member.toString());
		Member loginMember = memberService.loginCheck(member);
		
		//유저메인 페이지 로딩시에 파일에대한 정보가 필요해서 추가합니다
		List<PrivateFile> privateFile = pfService.selectList(loginMember.getUserno());
		
		if(loginMember != null && bcryptPasswordEncoder.matches(member.getUserpwd(), loginMember.getUserpwd()) && privateFile != null) {
			session.setAttribute("loginMember", loginMember);
			requset.setAttribute("privateFile", privateFile);
			logger.info(String.valueOf(privateFile.size()));
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
