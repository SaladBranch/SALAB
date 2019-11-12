package com.sesame.salab.userPage.model.service;

import com.sesame.salab.member.model.vo.Member;

public interface userPageService {

	int changeName(Member member);

	int changePwd(Member member);

}
