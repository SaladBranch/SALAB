package com.sesame.salab.member_project.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.project.model.vo.Project;

@Repository
public class Member_ProjectDao {

	@Autowired
	private SqlSession sqlSession;

	public int insertTeamMember(Member_Project mp) {
		// TODO Auto-generated method stub
		return sqlSession.insert("member_projectMapper.insertTeamMember", mp);
	}

	public List<Project> selectProjectList(int userno) {
		return sqlSession.selectList("member_projectMapper.selectProjectList", userno);
	}

}
