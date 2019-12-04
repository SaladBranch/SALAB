package com.sesame.salab.project.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
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
	
	@RequestMapping(value="gotoProject.do")
	public ModelAndView gotoProjectMethod(ModelAndView mv, Project project,HttpSession session ) throws MessagingException, UnsupportedEncodingException {
	logger.info("gotoTeamProject.do 진입");
	if(project != null) {
		System.out.println(project.toString());
	}
	Member member = (Member) session.getAttribute("loginMember");
	//프로젝트 데이터조회
	project = pService.selectProject(project);
	System.out.println(project.toString());
	
	int listCount = pnService.listCount(project.getProjectno());
	Paging paging = new Paging();
	paging.makePage(listCount, 1);
	System.out.println(paging.toString());
	
	//프로젝트 내에 공지사항 확인
	HashMap<String, Object> map = new HashMap<String, Object>();
	map.put("paging", paging);
	map.put("projectno", project.getProjectno());
	List<Projectnotice> pnoticelist = pnService.testList(map);
	System.out.println(pnoticelist.size());
	
	//멤버 리스트 확인
	List<ProjectMember> memberList = pService.selectProjectMemeber(project.getProjectno());
	System.out.println("멤버결과:"+memberList.toString());
	
	//페이지메인에 표시될 프로젝트 확인 (최대4개)
	List<ProjectFile> teamProjectList = pService.selectMainFileList(project.getProjectno());
	if(teamProjectList == null) {
		System.out.println("nullllllllllll");
	}else {
		System.out.println("dddd"+teamProjectList);
	}
	//현재 유저의 유저권한 확인
	HashMap<String, Object> mapForAuth = new HashMap<String, Object>();
	mapForAuth.put("userno", member.getUserno());
	mapForAuth.put("projectno", project.getProjectno());
	String userAuth = mpService.selectUserAuth(mapForAuth);
	session.setAttribute("userauth", userAuth);
	System.out.println(userAuth);
	
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
	public void inviteEmailCheckMethod(@RequestParam("useremail") String useremail,@RequestParam("projectno") int projectno, HttpServletResponse response, HttpSession session ) throws IOException, MessagingException {
		logger.info("진입");
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
	
	@RequestMapping(value="gotoProjectFile.do")
	public ModelAndView gotoProjectFileMethod(String sort,ModelAndView mv, Project project,HttpServletRequest request,HttpSession session ) throws MessagingException, UnsupportedEncodingException {
	logger.info("gotoProjectFile.do 진입");
	MongoService mgService = new MongoService();
	if(project != null) {
		System.out.println(project.toString());
	}
	Member member = (Member) session.getAttribute("loginMember");
	//프로젝트 데이터조회
	project = pService.selectProject(project);
	System.out.println(project.toString());
	
	
	List<ProjectFile> fileList = pService.selectListAll(project.getProjectno());
	
	if(fileList == null) {
		System.out.println("nullllllllllll");
	}else {
		System.out.println("dddd"+fileList);
	}
	if(sort !=null) {
		if(sort.equals("recent")) {
			Collections.sort(fileList, new Comparator<ProjectFile>() {
				@Override
				public int compare(ProjectFile f1, ProjectFile f2) {
					return f2.getPrfilelastmodified().compareTo(f1.getPrfilelastmodified());
				}
			});
			logger.info("최근 수정 순으로 정렬완료!");
		}else if(sort.equals("name")) {
			Collections.sort(fileList, new Comparator<ProjectFile>() {
				@Override
				public int compare(ProjectFile f1, ProjectFile f2) {
					return f1.getPrfiletitle().compareTo(f2.getPrfiletitle());
				}
			});
			logger.info("이름 순으로 정렬완료!");
		}else if(sort.equals("date")) {
			Collections.sort(fileList, new Comparator<ProjectFile>() {
				@Override
				public int compare(ProjectFile f1, ProjectFile f2) {
					return f1.getPrfilecreatedate().compareTo(f2.getPrfilecreatedate());
				}
			});
			logger.info("생성날짜 순으로 정렬완료!");
		}
		request.setAttribute("sort", sort);
	}
	
/*	if(fileList != null) {
		for(ProjectFile pf : fileList) {
			Page p = new Page();
			p.setFileno(pf.getPrfileno());
			p.setUserno(pf.getProjectno());
			p.setPageno(1);
			Page page = mgService.findOne("page", p);
			pf.setPfilethumbnail(page.getThumbnail());
		}*/
	request.removeAttribute("privateFile");
	request.setAttribute("privateFile", fileList);

	
	mv.addObject("project", project);
  	mv.setViewName("project/projectFile");
	return mv;
	}
}
