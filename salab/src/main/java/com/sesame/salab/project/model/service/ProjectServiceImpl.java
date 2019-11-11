package com.sesame.salab.project.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.project.model.dao.ProjectDao;
import com.sesame.salab.project.model.vo.Project;

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

}
