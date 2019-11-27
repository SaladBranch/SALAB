package com.sesame.salab.notice.controller;


import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.service.NoticeService;
import com.sesame.salab.notice.model.vo.Notice;

@Controller
public class NoticeController {
	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);
	
	@Autowired
	private NoticeService noticeService;
	

	
	//공지사항 목록
	@RequestMapping(value="noticelist.do")
	public ModelAndView noticeListMethod(ModelAndView mv, Notice notice,@RequestParam(value="page", required=false) String currentPage) throws Exception {
		
		int curPage;
		
		if(currentPage != null) {
			curPage = Integer.parseInt(currentPage);
		} else {
			curPage = 1;
		}
		
		int listCount = noticeService.listCount(); //DB에서 현재 총 Row수 가져옴 
		Paging paging = new Paging(); //현재 페이지 
		paging.makePage(listCount, curPage);  //페이징 처리함 
		
		List<Notice> noticelist = noticeService.noticeList(paging);
		
		if(noticelist != null) {
			mv.addObject("noticelist", noticelist);
			mv.addObject("paging", paging);
			mv.setViewName("help/userNotice");
		}else {
			mv.addObject("message", "공지사항 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	@RequestMapping(value="noticeDetail.do")
	public ModelAndView noticeDetailMethod(ModelAndView mv, @RequestParam(value="noticeno") int noticeno , @RequestParam(value="page", required=false) String currentPage) throws Exception {
		
		Notice notice = noticeService.selectOne(noticeno);
		
		if(notice != null) {
			mv.addObject("notice", notice);
			mv.addObject("page", currentPage);
			mv.setViewName("help/userNoticeDetail");
		}else {
			mv.addObject("message", "공지사항 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}

}
