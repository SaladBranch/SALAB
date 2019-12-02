package com.sesame.salab.project.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.project.model.service.ProjectService;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.project.model.vo.ProjectMember;
import com.sesame.salab.projectnotice.model.service.ProjectnoticeService;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;

@Controller
public class ProjectController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
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
 		String viewName = "forward:/gotoProject.do?projectno="+projectno;
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
	
	@RequestMapping(value="gotoProject.do")
	public ModelAndView gotoProjectMethod(ModelAndView mv, Project project ) throws MessagingException, UnsupportedEncodingException {
	logger.info("gotoTeamProject.do 진입");
	if(project != null) {
		System.out.println(project.toString());
	}
	//프로젝트 데이터조회
	project = pService.selectProject(project);
	System.out.println(project.toString());
	
	int listCount = pnService.listCount(project.getProjectno());
	Paging paging = new Paging();
	paging.makePage(listCount, 1);
	System.out.println(paging.toString());
	
	HashMap<String, Object> map = new HashMap<String, Object>();
	map.put("paging", paging);
	map.put("projectno", project.getProjectno());
	List<Projectnotice> pnoticelist = pnService.testList(map);
	System.out.println(pnoticelist.size());
	
	List<ProjectMember> memberList = pService.selectProjectMemeber(project.getProjectno());
	System.out.println("멤버결과:"+memberList.toString());

	
	mv.addObject("memberList", memberList);
	mv.addObject("noticelist", pnoticelist);
	mv.addObject("paging", paging);
	mv.addObject("project", project);
  	mv.setViewName("project/projectMainPage");
	return mv;
	}

	@RequestMapping(value="changeAuth.do", method=RequestMethod.POST)
	@ResponseBody
	public String changeAuthMethod(ModelAndView mv, Member_Project member_project ,HttpServletResponse response ) throws MessagingException, UnsupportedEncodingException {
	logger.info("changeAuth.do 진입 : "+member_project.toString());
	
	response.setContentType("application/json; charset=UTF-8");
	JSONObject job = new JSONObject();
	int result = pService.changeAuth(member_project);

	if(result==1) {job.put("result", "success");}
	
	
	return job.toJSONString();
	
	}
	@RequestMapping(value="inviteEmailCheck.do", method= RequestMethod.POST)
	public void inviteEmailCheckMethod(@RequestParam("useremail") String useremail,@RequestParam("projectno") int projectno, HttpServletResponse response, HttpSession session ) throws IOException {
		logger.info("진입");
		response.setContentType("text/html; charset=UTF-8");
		int result = pService.inviteEmailCheck(useremail,projectno);
		PrintWriter out = response.getWriter();
		if(result== 2) {
			//초대기능 넣기
			out.append("inviteSuccess");
		}
		else if(result==1) {
			out.append("joinedMember");
		}
		else if(result==0){
			out.append("fail");
		}
		out.flush();
		out.close();
	}
	
	@RequestMapping(value="memberKick.do", method=RequestMethod.POST)
	@ResponseBody
	public String memberKickMethod(ModelAndView mv, Member_Project member_project ,HttpServletResponse response ) throws MessagingException, UnsupportedEncodingException {
	logger.info("memberKick.do 진입 : "+member_project.toString());
	
	response.setContentType("application/json; charset=UTF-8");
	JSONObject job = new JSONObject();
	int result = pService.memberKick(member_project);

	if(result==1) {job.put("result", "success");}
	
	
	return job.toJSONString();
	
	}
}
