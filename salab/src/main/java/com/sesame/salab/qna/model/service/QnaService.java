package com.sesame.salab.qna.model.service;

import java.util.HashMap;
import java.util.List;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.qna.model.vo.Qna;

public interface QnaService {

	int listCount(int userno);

	List<Qna> qnaList(HashMap<String, Object> map);

	Qna selectOne(int qnano);

	int qnaInsert(Qna qna);

}
