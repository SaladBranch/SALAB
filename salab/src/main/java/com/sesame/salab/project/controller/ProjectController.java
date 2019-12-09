package com.sesame.salab.project.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.common.MailUtils;
import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.service.Member_ProjectService;
import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.project.model.service.ProjectService;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.project.model.vo.ProjectMember;
import com.sesame.salab.projectfile.model.vo.ProjectFile;
import com.sesame.salab.projectnotice.model.service.ProjectnoticeService;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;

@Controller
public class ProjectController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private Member_ProjectService mpService;
	
	@Autowired
	private ProjectService pService;
	
	@Autowired
	private ProjectnoticeService pnService;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value="createProject.do")
	public String createProejct(@RequestParam(value="userno", required=false)String userno, @RequestParam(value="projectname", required=false) String projectname) {
		//넘어온 값으로 객체 생성
		Project project = new Project();
		project.setProjectname(projectname);
		project.setUserno(Integer.parseInt(userno));
		
		//생성한 객체로 프로젝트 인서트
		int result = pService.createProject(project);
		int projectno= pService.selectProjectnoAfterCreated(Integer.parseInt(userno));
 		String viewName = "redirect:/gotoProject.do?projectno="+projectno;
		if(result <= 0) {
			//프로젝트 생성실패하면 에러페이지로 이동
			viewName = "error";
		}
		
		return viewName;
	}
	
	@RequestMapping(value="autocomplete.do", method=RequestMethod.POST)
	public void autocompleteText(@RequestParam("text")String text, HttpServletResponse resp) throws IOException {
		logger.info(text);
		
		//유저 중복검사위한 아이디값 받아서 정보조회용
		List<Member> list = pService.autocomp(text);
		 
		//JSON으로 싸서 JSP에 전송
		JSONObject sendj = new JSONObject();
		JSONArray ja = new JSONArray();
		for(Member m : list) {
			JSONObject job = new JSONObject();
			job.put("userno", m.getUserno());
			job.put("username", URLEncoder.encode(m.getUsername(), "utf-8"));
			job.put("usermail", m.getUseremail());
			ja.add(job);
		}
		sendj.put("list", ja);
		 
		resp.setContentType("application/json; charset=UTF-8");
		PrintWriter out = resp.getWriter();
		out.println(sendj.toJSONString());
		out.flush();
		out.close();
	}
	
	@RequestMapping(value="investCreateProject.do", method=RequestMethod.POST)
	public ModelAndView investCreateProject(ModelAndView mv, @RequestParam("userno")String userno, @RequestParam("projectname")String projectname, @RequestParam("invest")String invest) throws MessagingException, UnsupportedEncodingException {
		//프로젝트 생성
		Project project = new Project();
		project.setProjectname(projectname);
		project.setUserno(Integer.parseInt(userno));
		
		//생성한 객체로 프로젝트 인서트
		int result = pService.createProject(project);
		mv.setViewName("recentFile/recentFile");
		if(result > 0) {
			//생성한 프로젝트의 프로젝트 번호 가져오는 코드
			int projectno = pService.selectProjectNo(project);
			String[] investMember = invest.split(",");
			//초대메일 전송
			for(String uno : investMember) {
				logger.info(uno);
				String uemail = pService.projectInvite(uno);
				logger.info(uemail);
				MailUtils sendMail = new MailUtils(mailSender);
				sendMail.setSubject("[SALAB] 프로젝트 참여");
				sendMail.setText(sendMail.projectInviteTemplate(uno, projectno));
				sendMail.setFrom("saladbranch@gmail.com", "SALAB");
				sendMail.setTo(uemail);
				sendMail.send();
			}
		}else {
			//프로젝트 생성실패하면 에러페이지로 이동
			mv.addObject("message", "엌ㅋㅋㅋ 프로젝트 생성되는 상상함");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	//프로젝트페이지로 이동
	@RequestMapping(value="gotoProject.do")
	public ModelAndView gotoProjectMethod(ModelAndView mv, Project project,HttpSession session ) throws MessagingException, UnsupportedEncodingException {
	logger.info("gotoTeamProject.do 진입");
	Member member = (Member) session.getAttribute("loginMember");
	//프로젝트 데이터조회
	project = pService.selectProject(project);
	int listCount = pnService.listCount(project.getProjectno());
	Paging paging = new Paging();
	paging.makePage(listCount, 1);
	
	//프로젝트 내에 공지사항 확인
	HashMap<String, Object> map = new HashMap<String, Object>();
	map.put("paging", paging);
	map.put("projectno", project.getProjectno());
	List<Projectnotice> pnoticelist = pnService.testList(map);
	
	//멤버 리스트 확인
	List<ProjectMember> memberList = pService.selectProjectMemeber(project.getProjectno());
	
	//페이지메인에 표시될 프로젝트 확인 (최대4개)
	List<ProjectFile> teamProjectList = pService.selectMainFileList(project.getProjectno());

	//현재 유저의 유저권한 확인
	HashMap<String, Object> mapForAuth = new HashMap<String, Object>();
	mapForAuth.put("userno", member.getUserno());
	mapForAuth.put("projectno", project.getProjectno());
	String userAuth = mpService.selectUserAuth(mapForAuth);
	session.setAttribute("userauth", userAuth);
	
	//화면 좌측, 유저의 프로젝트 리스트 재 확인
	List<Project> projectList = mpService.selectProjectList(member.getUserno());
	session.removeAttribute("myProjectList");
	session.setAttribute("myProjectList", projectList);

	mv.addObject("projectList",teamProjectList);
	mv.addObject("memberList", memberList);
	mv.addObject("noticelist", pnoticelist);
	mv.addObject("paging", paging);
	mv.addObject("project", project);
  	mv.setViewName("project/projectMainPage");
	return mv;
	}
	//projectMainPage.jsp_ 멤버의 권한 변경
	@RequestMapping(value="changeAuth.do", method=RequestMethod.POST)
	@ResponseBody
	public String changeAuthMethod(ModelAndView mv, Member_Project member_project ,HttpServletResponse response,HttpSession session ) throws MessagingException, UnsupportedEncodingException {
	response.setContentType("application/json; charset=UTF-8");
	JSONObject job = new JSONObject();
	int result = pService.changeAuth(member_project);
	if(result==1) {
		job.put("result", "success");
		if(member_project.getUserauth().equals("LEADER")) {
			Member_Project leaderToEditor = new Member_Project();
			Member member = (Member) session.getAttribute("loginMember");
			leaderToEditor.setUserno(member.getUserno());
			leaderToEditor.setProjectno(member_project.getProjectno());
			leaderToEditor.setUserauth("CAN_EDIT");
			int changeLeader = pService.changeAuth(leaderToEditor);
			if(changeLeader>0) {
				logger.info("Leader 변경 process 정상완료.");
			}
		}
	}
	
	
	return job.toJSONString();
	
	}
	//projectMainPage.jsp_ 멤버 추가 이메일전송
	@RequestMapping(value="inviteEmailCheck.do", method= RequestMethod.POST)
	public void inviteEmailCheckMethod(@RequestParam("useremail") String useremail,@RequestParam("projectno") int projectno, HttpServletResponse response, HttpSession session ) throws IOException, MessagingException {
		response.setContentType("text/html; charset=UTF-8");
		int result = pService.inviteEmailCheck(useremail,projectno);
		PrintWriter out = response.getWriter();
		if(result>0) {
			MailUtils sendMail = new MailUtils(mailSender);
			sendMail.setSubject("[SALAB] 프로젝트 참여");
			sendMail.setText(sendMail.projectInviteTemplate(String.valueOf(result), projectno));
			sendMail.setFrom("saladbranch@gmail.com", "SALAB");
			sendMail.setTo(useremail);
			sendMail.send();
		
			out.append("inviteSuccess");
		}
		else if(result<0) {
			out.append("joinedMember");
		}
		else if(result==0){
			out.append("fail");
		}
		out.flush();
		out.close();
	}
	//projectMainPage.jsp_ 멤버 강퇴	
	@RequestMapping(value="memberKick.do", method=RequestMethod.POST)
	@ResponseBody
	public String memberKickMethod(ModelAndView mv, Member_Project member_project ,HttpServletResponse response ) throws MessagingException, UnsupportedEncodingException {
	response.setContentType("application/json; charset=UTF-8");
	JSONObject job = new JSONObject();
	int result = pService.memberKick(member_project);

	if(result==1) {job.put("result", "success");}
	
	
	return job.toJSONString();
	
	}
	//projectMainPage.jsp_ 프로젝트 이미지삽입
	@RequestMapping(value="projectImgInsert.do", method=RequestMethod.POST)
	public String userImgInsertMethod(HttpServletRequest request,@RequestParam(name="upfiles", required=false) String upfiles, @RequestParam(name="ofilename",required=false) String ofilename,Project project, HttpSession session) throws IOException {
		if (upfiles != null) {
			String path = request.getSession().getServletContext().getRealPath("resources/projectUpfiles");

			String base64img = upfiles;
			String imgdata = base64img.split(",")[1];
			byte[] imageBytes = DatatypeConverter.parseBase64Binary(imgdata);
	
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String renameFileName =project.getProjectno()+"p"+ sdf.format(new java.sql.Date(System.currentTimeMillis()))+ "." + ofilename.substring(ofilename.lastIndexOf('.') + 1);
				
			BufferedImage bufImg  = ImageIO.read(new ByteArrayInputStream(imageBytes));
			ImageIO.write(bufImg, "jpg", new File(path + "/" + renameFileName));
			project.setProjectimage_o(renameFileName);
			int result=pService.projectImgInsert(project);
			if(result >0 ) {
				logger.info("img upload successed..  stored path  : "+path);
			}
		}
		return "redirect:gotoProject.do?projectno="+project.getProjectno();
	}
}
