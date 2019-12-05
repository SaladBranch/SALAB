package com.sesame.salab.admin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.admin.model.service.AdminService;
import com.sesame.salab.admin.model.vo.Admin;

@Controller
public class AdminController {
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private AdminService adminService;
	
	
	//관리자 로그인
	@RequestMapping(value="adminLogin.do", method=RequestMethod.POST)
	public ModelAndView adminLoginMethod(ModelAndView mv, Admin admin, HttpSession session, HttpServletRequest request) throws Exception{
		String adminid = request.getParameter("adminid");
		String adminpwd = request.getParameter("adminpwd");
		
		admin.setAdminid(adminid);
		admin.setAdminpwd(adminpwd);
		
		Admin loginAdmin = adminService.loginCheck(admin);
		
		if(loginAdmin != null) {
			session.setAttribute("loginAdmin", loginAdmin);
			mv.setViewName("redirect:adminMemberList.do");
		} else {
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	
	//관리자 로그아웃
	@RequestMapping(value="adminLogout.do")
	public String adminLoginMethod(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session != null) {
			session.invalidate();
		}
		return "admin/adminMain";
	}

}
