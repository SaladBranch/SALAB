package com.sesame.salab.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;

@Repository("memberDao")
public class MemberDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int insertMember(Member member) {
		return sqlSession.insert("memberMapper.insertMember", member);
	}

	public int updateEmailChecked(Member member) {
		return sqlSession.update("memberMapper.updateEmailChecked", member);
	}

	public Member loginCheck(Member member) {
		return sqlSession.selectOne("memberMapper.loginCheck", member);
	}
	
}
