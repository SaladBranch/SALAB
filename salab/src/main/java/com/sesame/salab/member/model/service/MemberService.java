package com.sesame.salab.member.model.service;

import java.util.List;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.member.model.vo.Member;

public interface MemberService {
	Member loginCheck(Member member);
	int insertMember(Member member);
	int updateEmailChecked(Member member);
	int isExistEmail(String useremail);
	void deleteUncheckedMail(String uemail);
	String getUncheckedMember(String uemail);
	String getCheckedMember(String uemail);
	Member getMemberForPwd(Member member);
	int initChangePwd(Member member);
	Member chkGoogleUser(Member tempMember);
	void enrollGoogleUser(Member m);
	int mlistCount();
	List<Member> memberList(Paging paging);
	Member memberDetail(int userno);
	int changePhoneNum(Member member);

}
