package com.sesame.salab.userPage.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;

@Repository
public class userPageDao {

	@Autowired
	private SqlSession sqlSession;

	public int changeName(Member member) {
		System.out.println(member.toString() +"in DAO");
		return sqlSession.update("userPageMapper.changeName", member);

	}

	public int changePwd(Member member) {
		return sqlSession.update("userPageMapper.changePwd", member);

	}
}
