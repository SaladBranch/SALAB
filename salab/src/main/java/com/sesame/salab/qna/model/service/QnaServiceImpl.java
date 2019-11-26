package com.sesame.salab.qna.model.service;

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
	public int listCount() {
		return qnaDao.listCount();
	}

	@Override
	public List<Qna> qnaList(Paging paging) {
		return qnaDao.qnaList(paging);
	}

}
