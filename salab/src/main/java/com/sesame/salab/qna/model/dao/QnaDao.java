package com.sesame.salab.qna.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.qna.model.vo.Qna;

@Repository("qnaDoa")
public class QnaDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int listCount() {
		return sqlSession.selectOne("qnaMapper.listCount");
	}

	public List<Qna> qnaList(Paging paging) {
		return sqlSession.selectList("qnaMapper.selectList", paging);
	}

}
