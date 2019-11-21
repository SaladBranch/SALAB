package com.sesame.salab.qna.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.qna.model.service.QnaService;
import com.sesame.salab.qna.model.vo.Qna;

@Controller
public class QnaController {
	private static final Logger logger = LoggerFactory.getLogger(QnaController.class);
	
	@Autowired
	private QnaService qnaService;
	
	@RequestMapping(value="qnalist.do")
	public ModelAndView QnaListMethod(ModelAndView mv, Qna qna, @RequestParam(value="page", required=false) String currentPage) throws Exception {
		
		int curPage;
		
		if(currentPage != null) {
			curPage = Integer.parseInt(currentPage);
		} else {
			curPage = 1;
		}
		
		int listCount = qnaService.listCount(); //DB에서 현재 총 Row수 가져옴 
		Paging paging = new Paging(); //현재 페이지 
		paging.makePage(listCount, curPage);  //페이징 처리함 
		
		List<Qna> qnalist = qnaService.qnaList(paging);
		
		if(qnalist != null) {
			mv.addObject("qnalist", qnalist);
			mv.addObject("paging", paging);
			mv.setViewName("help/userQna");
		}else {
			mv.addObject("message", "1:1문의 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}

}
