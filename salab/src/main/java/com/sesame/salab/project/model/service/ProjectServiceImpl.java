package com.sesame.salab.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.project.model.dao.ProjectDao;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.project.model.vo.ProjectMember;

@Service("ProjectService")
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectDao pDao;
	
	@Override
	public int createProject(Project project) {
		// TODO Auto-generated method stub
		return pDao.createProject(project);
	}

	@Override
	public List<Member> autocomp(String text) {
		// 팀원검색 자동완성 메소드
		return pDao.autocomp(text);
	}

	@Override
	public String projectInvite(String uno) {
		// 팀원 초대하기위해 메일 검색
		return pDao.projectInvest(uno);
	}

	@Override
	public int selectProjectNo(Project project) {
		// 최근생성한 프로젝트넘버 검색
		return pDao.seletProjectNo(project);
	}

	@Override
	public Project selectProject(Project project) {
		// TODO Auto-generated method stub
		return pDao.selectProject(project);
	}

	@Override
	public List<ProjectMember> selectProjectMemeber(int projectno) {
		// TODO Auto-generated method stub
		return pDao.selectProjectMemeber(projectno);
	}

}
