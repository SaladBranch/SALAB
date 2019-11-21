package com.sesame.salab.userPage.model.service;

import java.util.ArrayList;
import java.util.List;

import com.sesame.salab.member.model.vo.Member;

public interface userPageService {

	int changeName(Member member);

	int changePwd(Member member);

	List<Member> findProjectList(Member member);

	List<Integer> test(Member member);

	String searchPremium(Integer integer);

	void searchNextLeader(Integer integer);

	void deleteAccount(Member member);

	int userImgInsert(Member member);

}
