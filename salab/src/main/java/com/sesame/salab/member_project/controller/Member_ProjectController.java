package com.sesame.salab.member_project.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.common.member_project.model.service.Member_ProjectService;
import com.sesame.salab.member_project.model.vo.Member_Project;

@Controller
public class Member_ProjectController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private Member_ProjectService mpService;
	
	@RequestMapping("insertTeamMember.do")
	public String insertTeamMember(@RequestParam("userno")String userno, @RequestParam("projectno")int pno) {
		logger.info(userno);
		logger.info(String.valueOf(pno));
		
		//객체생성하고 매개변수로 받은값 입력
		Member_Project mp = new Member_Project();
		mp.setUserno(Integer.parseInt(userno));
		mp.setProjectno(pno);
		
		String viewName;
		//MEMBER_PROJECT테이블에 추가하는 코드
		int result = mpService.insertTeamMember(mp);
		if(result > 0) {
			viewName = "project/teamPage";
		}else {
			viewName = "common/error";
		}
		
		return viewName;
	}
	
}
