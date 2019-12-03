package com.sesame.salab.admin.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.admin.model.dao.AdminDao;
import com.sesame.salab.admin.model.vo.Admin;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminDao adminDao;

	@Override
	public Admin loginCheck(Admin admin) {
		return adminDao.loginCheck(admin);
	}
	
}
