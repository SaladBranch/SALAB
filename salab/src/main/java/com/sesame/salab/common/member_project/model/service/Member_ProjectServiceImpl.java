package com.sesame.salab.common.member_project.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.dao.Member_ProjectDao;
import com.sesame.salab.member_project.model.vo.Member_Project;

@Service("Member_ProjectService")
public class Member_ProjectServiceImpl implements Member_ProjectService{

	@Autowired
	private Member_ProjectDao mpDao;

	

}
