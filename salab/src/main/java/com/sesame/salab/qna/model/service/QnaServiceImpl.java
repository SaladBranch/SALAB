package com.sesame.salab.qna.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.qna.model.dao.QnaDao;
import com.sesame.salab.qna.model.vo.Qna;

@Service("qnaService")
public class QnaServiceImpl implements QnaService{
	
	@Autowired
	private QnaDao qnaDao;

	@Override
	public int listCount(int userno) {
		return qnaDao.listCount(userno);
	}

	@Override
	public List<Qna> qnaList(HashMap<String, Object> map) {
		return qnaDao.qnaList(map);
	}

	@Override
	public Qna selectOne(int qnano) {
		return qnaDao.selectOne(qnano);
	}

	@Override
	public int qnaInsert(Qna qna) {
		return qnaDao.qnaInsert(qna);
	}

	@Override
	public int adminListCount() {
		return qnaDao.adminListCount();
	}

	@Override
	public List<Qna> adminQnaList(HashMap<String, Object> map) {
		return qnaDao.adminQnaList(map);
	}

	@Override
	public int qnaUpdate(Qna qna) {
		return qnaDao.qnaUpdate(qna);
	}

}
