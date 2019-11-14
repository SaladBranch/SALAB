package com.sesame.salab.userPage.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.userPage.model.dao.userPageDao;

@Service("userPageService")
public class userPageServiceImpl implements userPageService {
	@Autowired
	private userPageDao upDao;
	
	@Override
	public int changeName(Member member) {
		return upDao.changeName(member);
	}

	@Override
	public int changePwd(Member member) {
		return upDao.changePwd(member);
	}
	

}
