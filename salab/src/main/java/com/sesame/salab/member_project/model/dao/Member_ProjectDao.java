package com.sesame.salab.member_project.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.vo.Member_Project;

@Repository
public class Member_ProjectDao {

	@Autowired
	private SqlSession sqlSession;

}
