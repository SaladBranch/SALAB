package com.sesame.salab.member.model.service;

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
}
