package com.sesame.salab.project.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.project.model.service.ProjectService;
import com.sesame.salab.project.model.vo.Project;

@Controller
public class ProjectController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private ProjectService pService;
	
	@RequestMapping(value="createProject.do")
	public String createProejct(@RequestParam(value="userno", required=false)String userno, @RequestParam(value="projectname", required=false) String projectname) {
		//넘어온 값으로 객체 생성
		Project project = new Project();
		project.setProjectname(projectname);
		project.setUserno(Integer.parseInt(userno));
		
		//생성한 객체로 프로젝트 인서트
		int result = pService.createProject(project);
		String viewName = "project/teamPage";
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
	public String investCreateProject(@RequestParam("userno")String userno, @RequestParam("projectname")String projectname, @RequestParam("invest")String invest) {
		String[] investMember = invest.split(",");
		//초대메일 전송
		for(String str : investMember) {
			logger.info(str);
		}
		
		//프로젝트 생성
		Project project = new Project();
		project.setProjectname(projectname);
		project.setUserno(Integer.parseInt(userno));
		
		//생성한 객체로 프로젝트 인서트
		int result = pService.createProject(project);
		String viewName = "project/recentFile";
		if(result <= 0) {
			//프로젝트 생성실패하면 에러페이지로 이동
			viewName = "error";
		}
		
		return viewName;
	}
	
}
