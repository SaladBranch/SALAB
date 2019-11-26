package com.sesame.salab.userPage.model.service;

import java.util.ArrayList;
import java.util.List;

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

	@Override
	public List<Member> findProjectList(Member member) {
		// TODO Auto-generated method stub
		return upDao.findProjectList(member);
	}

	@Override
	public List<Integer> test(Member member) {
		// TODO Auto-generated method stub
		return upDao.test(member);
	}

	@Override
	public String searchPremium(Integer integer) {
		// TODO Auto-generated method stub
		return upDao.searchPremium(integer);
	}

	@Override
	public void searchNextLeader(Integer integer) {
		upDao.searchNextLeader(integer);
		
	}

	@Override
	public void deleteAccount(Member member) {
		upDao.deleteAccount(member);
		
	}

	@Override
	public int userImgInsert(Member member) {
		// TODO Auto-generated method stub
		return upDao.userImgInsert(member);
	}
	

}
