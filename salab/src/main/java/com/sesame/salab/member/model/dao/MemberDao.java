package com.sesame.salab.member.model.dao;

import java.util.HashMap;
import java.util.List;

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

	public int isExistEmail(String useremail) {
		return sqlSession.selectOne("memberMapper.isExistEmail", useremail);
	}

	public void deleteUncheckedMail(String uemail) {
		sqlSession.delete("memberMapper.deleteUncheckedMail", uemail);
	}

	public String getUncheckedMember(String uemail) {
		return sqlSession.selectOne("memberMapper.getUncheckedMember", uemail);
	}

	public String getCheckedMember(String uemail) {
		return sqlSession.selectOne("memberMapper.getCheckedMember", uemail);
	}

	public Member getMemberForPwd(Member member) {
		return sqlSession.selectOne("memberMapper.getMemberForPwd", member);
	}

	public int initchangePwd(Member member) {
		return sqlSession.update("memberMapper.initchangePwd", member);
	}

	public Member chkGoogleUser(Member member) {
		return sqlSession.selectOne("memberMapper.chkGoogleUser", member);
	}

	public void enrollGoogleUser(Member member) {
		sqlSession.insert("memberMapper.enrollGoogleUser", member);
	}
  
  public int mlistCount(String keyword) {
		return sqlSession.selectOne("memberMapper.mlistCount", keyword);
	}
	
	public List<Member> memberList(HashMap<String, Object> map) {
		return sqlSession.selectList("memberMapper.memberList", map);
	}

	public Member memberDetail(int userno) {
		return sqlSession.selectOne("memberMapper.memberDetail", userno);
	}

	public int changePhoneNum(Member member) {
		return sqlSession.update("memberMapper.changePhoneNum", member);
	}

	public int memberUpdate(Member member) {
		return sqlSession.update("memberMapper.memberUpdate", member);
	}

	public int changeToStandard(int userno) {
		return sqlSession.update("memberMapper.changeToStandard", userno);
	}

	public List<Member> dailyChangeList() {
		return sqlSession.selectList("memberMapper.dailyChangeList");
	}

	public int daliySetStandard(List<Member> memberList) {
		int result=0;
		for(int i = 0 ; i < memberList.size() ; i++) {
			result += sqlSession.update("memberMapper.daliySetStandard",memberList.get(i));
		}
		return result;
	}

	
}
