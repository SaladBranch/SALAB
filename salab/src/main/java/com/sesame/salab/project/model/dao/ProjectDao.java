package com.sesame.salab.project.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.project.model.vo.Project;

@Repository
public class ProjectDao {

	@Autowired
	private SqlSession sqlSession;
	
	public int createProject(Project project) {
		// TODO Auto-generated method stub
		return sqlSession.insert("projectMapper.createProject", project);
	}

	public List<Member> autocomp(String text) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("projectMapper.autocomp", text);
	}

}
