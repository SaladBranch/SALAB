package com.sesame.salab.qna.model.service;

import java.util.List;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.qna.model.vo.Qna;

public interface QnaService {

	int listCount();

	List<Qna> qnaList(Paging paging);

}
