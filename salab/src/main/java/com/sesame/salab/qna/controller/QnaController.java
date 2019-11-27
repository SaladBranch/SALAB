package com.sesame.salab.qna.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.qna.model.service.QnaService;
import com.sesame.salab.qna.model.vo.Qna;

@Controller
public class QnaController {
	private static final Logger logger = LoggerFactory.getLogger(QnaController.class);
	
	@Autowired
	private QnaService qnaService;
	
	@RequestMapping(value="qnalist.do")
	public ModelAndView QnaListMethod(ModelAndView mv, Qna qna, @RequestParam(value="page", required=false) String currentPage, HttpSession session) throws Exception {
		
		int curPage;
		
		if(currentPage != null) {
			curPage = Integer.parseInt(currentPage);
		} else {
			curPage = 1;
		}
		
		int userno = ((Member)session.getAttribute("loginMember")).getUserno();
		
		int listCount = qnaService.listCount(userno); //DB에서 현재 총 Row수 가져옴 
		Paging paging = new Paging(); //현재 페이지 
		paging.makePage(listCount, curPage);  //페이징 처리함 
		
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("paging", paging);
		map.put("userno", userno);
		
		List<Qna> qnalist = qnaService.qnaList(map);
		
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
	
	
	//1:1문의 상세
	@RequestMapping(value="qnaDetail.do")
	public ModelAndView qnaDetailMethod(ModelAndView mv, @RequestParam(value="qnano") int qnano , @RequestParam(value="page", required=false) String currentPage) throws Exception {
		
		Qna qna = qnaService.selectOne(qnano);
		
		if(qna != null) {
			mv.addObject("qna", qna);
			mv.addObject("page", currentPage);
			mv.setViewName("help/userQnaDetail");
		}else {
			mv.addObject("message", "1:1문의 상세 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	//1:1문의 등록
	@RequestMapping(value="qnaInsert.do", method=RequestMethod.POST)
	public ModelAndView qnaInsertMethod(ModelAndView mv, Qna qna, HttpSession session) {
		
		qna.setUserno(((Member)session.getAttribute("loginMember")).getUserno());
		
		int result = qnaService.qnaInsert(qna);
		
	    if(result <= 0) {
	    	mv.setViewName("common/error");
	    } else {
	    	mv.setViewName("redirect:qnalist.do");
	    }
	    
		return mv;
	}

}
