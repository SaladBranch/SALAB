package com.sesame.salab.userPage.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.common.PageController;
import com.sesame.salab.member.model.vo.Member;

@Repository
public class userPageDao {
	private static final Logger logger = LoggerFactory.getLogger(PageController.class);
	@Autowired
	private SqlSession sqlSession;

	public int changeName(Member member) {
		System.out.println(member.toString() +"in DAO");
		return sqlSession.update("userPageMapper.changeName", member);

	}

	public int changePwd(Member member) {
		return sqlSession.update("userPageMapper.changePwd", member);

	}

	public List<Member> findProjectList(Member member) {
		System.out.println("Dao 진입");
		List<Member> ddd = sqlSession.selectList("userPageMapper.findProjectList", member);
		System.out.println("check, " +ddd.size());
		for( int i =0; i <ddd.size() ; i++) {
			System.out.println(ddd.get(i).getUserno() );
			
		}
		return null;
	}

	public List<Integer> test(Member member) {
		List<Integer> ddd =sqlSession.selectList("userPageMapper.test", member);
		return ddd;
	}

	public String searchPremium(Integer projectno) {
		logger.info("in searchPremiumDao, Projectno  : "+projectno);
		String premiumUser ="0" +(sqlSession.selectOne("userPageMapper.searchPremium", projectno));
		System.out.println("프리미엄 유저 번호 : " +premiumUser);
		if(premiumUser.contains("null")) {
			logger.info("프리미엄유저 없음. 해당 프로젝트 setAllOnlyRead");
			//프리미엄인 유저 없음. a프로젝트 번호로 allread-only
			sqlSession.update("member_projectMapper.setAllOnlyRead",projectno);
		}else {
			logger.info("New Leader's Userno : " +Integer.parseInt(premiumUser));
			sqlSession.update("member_projectMapper.setLeader",Integer.parseInt(premiumUser));
		}
		return "d";
	}

	public void searchNextLeader(Integer projectno) {
		logger.info("in searchNextLeader, Projectno  : "+projectno);
		String nextLeader ="0" +(sqlSession.selectOne("member_projectMapper.searchNextLeader", projectno));
		if(nextLeader .contains("null")) { 
			logger.info("팀 원 존재하지않음. 프로젝트 삭제");
		}else {
			System.out.println(Integer.parseInt(nextLeader ));
			logger.info("New Leader's Userno : " +Integer.parseInt(nextLeader));
			sqlSession.update("member_projectMapper.setLeader",Integer.parseInt(nextLeader));
		}
	}

	public void deleteAccount(Member member) {
		sqlSession.delete("memberMapper.deleteAccount",member);
		logger.info(member.getUseremail() +"is deleted.");
		
	}

	public int userImgInsert(Member member) {
		// TODO Auto-generated method stub
		System.out.println(member.toString());
		return sqlSession.update("userPageMapper.userImgInsert", member);
	}
}
