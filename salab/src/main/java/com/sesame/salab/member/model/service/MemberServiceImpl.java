package com.sesame.salab.member.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.common.paging.model.vo.Paging;
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

	@Override
	public String getCheckedMember(String uemail) {
		return memberDao.getCheckedMember(uemail);
	}

	@Override
	public Member getMemberForPwd(Member member) {
		return memberDao.getMemberForPwd(member);
	}

	@Override
	public int initChangePwd(Member member) {
		return memberDao.initchangePwd(member);
	}
	
	@Override
	public Member chkGoogleUser(Member member) {
		return memberDao.chkGoogleUser(member);
	}

	@Override
	public void enrollGoogleUser(Member m) {
		memberDao.enrollGoogleUser(m);
	}
  
	

	@Override
	public List<Member> memberList(HashMap<String, Object> map) {
		return memberDao.memberList(map);
	}

	@Override
	public Member memberDetail(int userno) {
		return memberDao.memberDetail(userno);
	}

	@Override
	public int mlistCount(String keyword) {
		return memberDao.mlistCount(keyword);
  }
  
	public int changePhoneNum(Member member) {
		return memberDao.changePhoneNum(member);
	}

	@Override
	public int memberUpdate(Member member) {
		return memberDao.memberUpdate(member);
	}
	//스탠다드로 다운그레이드
	@Override
	public int changeToStandard(int userno) {
		return memberDao.changeToStandard(userno);
	}

	@Override
	public List<Member> dailyChangeList() {
		return memberDao.dailyChangeList();
	}

	@Override
	public int daliySetStandard(List<Member> memberList) {
		return memberDao.daliySetStandard(memberList);
	}

}
