package com.sesame.salab.qna.model.dao;

import java.util.HashMap;
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

	public int listCount(int userno) {
		return sqlSession.selectOne("qnaMapper.listCount", userno);
	}

	public List<Qna> qnaList(HashMap<String, Object> map) {
		return sqlSession.selectList("qnaMapper.selectList", map);
	}

	public Qna selectOne(int qnano) {
		return sqlSession.selectOne("qnaMapper.selectOne", qnano);
	}

	public int qnaInsert(Qna qna) {
		return sqlSession.insert("qnaMapper.qnaInsert", qna);
	}

	public int adminListCount() {
		return sqlSession.selectOne("qnaMapper.adminListCount");
	}

	public List<Qna> adminQnaList(HashMap<String, Object> map) {
		return sqlSession.selectList("qnaMapper.adminselectList", map);
	}

	public int qnaUpdate(Qna qna) {
		return sqlSession.update("qnaMapper.qnaUpdate", qna);
	}

}
