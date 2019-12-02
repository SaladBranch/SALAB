package com.sesame.salab.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.dao.MemberDao;
import com.sesame.salab.member.model.vo.Member;

@Service("memberService")
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberDao memberDao;
	
	@Override
	public Member loginCheck(Member member) {
		return memberDao.loginCheck(member);
	}

	@Override
	public int insertMember(Member member) {
		return memberDao.insertMember(member);
	}

	@Override
	public int updateEmailChecked(Member member) {
		return memberDao.updateEmailChecked(member);
	}

	@Override
	public int isExistEmail(String useremail) {
		return memberDao.isExistEmail(useremail);
	}

	@Override
	public void deleteUncheckedMail(String uemail) { //인증받지 않은 회원 삭제용
		memberDao.deleteUncheckedMail(uemail);
	}

	@Override
	public String getUncheckedMember(String uemail) {
		return memberDao.getUncheckedMember(uemail);
	}

}
