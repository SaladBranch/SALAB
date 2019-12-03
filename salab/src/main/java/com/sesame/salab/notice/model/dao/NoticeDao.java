package com.sesame.salab.notice.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.vo.Notice;

@Repository("noticeDao")
public class NoticeDao {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<Notice> noticeList(Paging paging) {
		return sqlSession.selectList("noticeMapper.selectList", paging);
	}

	public int listCount() {
		return sqlSession.selectOne("noticeMapper.listCount");
	}

	public Notice selectOne(int noticeno) {
		return sqlSession.selectOne("noticeMapper.selectOne", noticeno);
	}

	public int noticeInsert(Notice notice) {
		return sqlSession.insert("noticeMapper.noticeInsert", notice);
	}

	public int noticeDelete(int noticeno) {
		return sqlSession.delete("noticeMapper.noticeDelete", noticeno);
	}

}
