package com.sesame.salab.projectnotice.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.controller.NoticeController;
import com.sesame.salab.notice.model.vo.Notice;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;
import com.sesame.salab.qna.model.vo.Qna;

@Repository("projectnoticeDao")
public class projectnoticeDao {

	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);
	@Autowired
	private SqlSession sqlSession;

	public List<Projectnotice> searchNoticeList(Projectnotice projectnotice) {
		return  sqlSession.selectList("projectnoticeMapper.getNoticeList",projectnotice);
	}

	public int listCount(int projectno) {
		return  sqlSession.selectOne("projectnoticeMapper.listCount",projectno);

	}

	public List<Projectnotice> noticeList(Paging paging) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("projectnoticeMapper.selectList", paging);
	}

	public List<Projectnotice> testList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		System.out.println(map.get("paging").toString());
		System.out.println(sqlSession.selectList("projectnoticeMapper.testList", map));
		return sqlSession.selectList("projectnoticeMapper.testList", map);
	}

	public void noticeRegist(Projectnotice projectnotice) {
		sqlSession.insert("projectnoticeMapper.insertNotice", projectnotice);
		System.out.println("컹쓰");
		
	}

	public Projectnotice selectTeamNotice(Projectnotice projectnotice) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("projectnoticeMapper.selectTeamNotice", projectnotice);
	}

	public int modifiedNotice(Projectnotice projectnotice) {
		return sqlSession.update("projectnoticeMapper.modifiedNotice", projectnotice);
	}

	public int deleteNotice(Projectnotice projectnotice) {
		return sqlSession.delete("projectnoticeMapper.deleteNotice", projectnotice);
	}
	

}
