package com.sesame.salab.admin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.sesame.salab.admin.model.service.AdminService;
import com.sesame.salab.admin.model.vo.Admin;

public class AdminController {
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private AdminService adminService;
	
	public String adminLoginMethod(Admin admin, HttpSession session, HttpServletRequest requset) {
		String viewFileName = "admin/adminMember";
		
		return viewFileName;
	}
	
	

}
