package com.sesame.salab.member_project.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member_project.model.dao.Member_ProjectDao;
import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.project.model.vo.Project;

@Service("Member_ProjectService")
public class Member_ProjectServiceImpl implements Member_ProjectService{

	@Autowired
	private Member_ProjectDao mpDao;

	@Override
	public int insertTeamMember(Member_Project mp) {
		// 초대수락한 유저 프로젝트에 등록
		return mpDao.insertTeamMember(mp);
	}

	@Override
	public List<Project> selectProjectList(int userno) {
		return mpDao.selectProjectList(userno);
	}

	@Override
	public String selectUserAuth(HashMap<String, Object> mapForAuth) {
		// TODO Auto-generated method stub
		return mpDao.selectUserAuth(mapForAuth);
	}

	

}
