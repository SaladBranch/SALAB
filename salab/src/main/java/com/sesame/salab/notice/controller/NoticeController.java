package com.sesame.salab.notice.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.admin.model.vo.Admin;
import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.service.NoticeService;
import com.sesame.salab.notice.model.vo.Notice;

@Controller
public class NoticeController {
	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);
	
	@Autowired
	private NoticeService noticeService;
	
	
	//회원공지사항 목록
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
		paging.setLimit(8);
		paging.setUnderlimit(5);
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
	
	//회원 공지사항 상세
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
	
	//관리자 공지사항 목록
	@RequestMapping(value="adminNoticeList.do")
	public ModelAndView adminNoticeListMethod(ModelAndView mv, Notice notice,@RequestParam(value="page", required=false) String currentPage) throws Exception {
		
		int curPage;
		
		if(currentPage != null) {
			curPage = Integer.parseInt(currentPage);
		} else {
			curPage = 1;
		}
		
		int listCount = noticeService.listCount(); //DB에서 현재 총 Row수 가져옴 
		Paging paging = new Paging(); //현재 페이지 
		paging.setLimit(7);
		paging.setUnderlimit(5);
		paging.makePage(listCount, curPage);  //페이징 처리함 
		
		List<Notice> adminNoticeList = noticeService.noticeList(paging);
		
		if(adminNoticeList != null) {
			mv.addObject("adminNoticeList", adminNoticeList);
			mv.addObject("paging", paging);
			mv.setViewName("admin/adminNotice");
		}else {
			mv.addObject("message", "공지사항 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	//관리자 공지사항 상세
	@RequestMapping(value="adminNoticeDetail.do")
	public ModelAndView adminNoticeDetailMethod(ModelAndView mv, @RequestParam(value="noticeno") int noticeno , @RequestParam(value="page", required=false) String currentPage) throws Exception {
		
		Notice notice = noticeService.selectOne(noticeno);
		
		if(notice != null) {
			mv.addObject("notice", notice);
			mv.addObject("page", currentPage);
			mv.setViewName("admin/adminNoticeDetail");
		}else {
			mv.addObject("message", "공지사항 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	
	//관리자 공지사항 등록
	@RequestMapping(value="noticeInsert.do", method=RequestMethod.POST)
	public ModelAndView adminNoticeInsertMethod(ModelAndView mv, Notice notice, HttpSession session) {
		
		notice.setAdminid(((Admin)session.getAttribute("loginAdmin")).getAdminid());
		
		int result = noticeService.noticeInsert(notice);
		
	    if(result <= 0) {
	    	mv.setViewName("common/error");
	    } else {
	    	mv.setViewName("redirect:adminNoticeList.do");
	    }
		
		return mv;
	}
	
	//관리자 공지사항 삭제
	@RequestMapping(value="adminNoticeDelete.do")
	public ModelAndView adminNoticeDeleteMethod(ModelAndView mv, Notice notice, @RequestParam(value="noticeno") int noticeno) {
		int result = noticeService.noticeDelete(noticeno);
		
		if(result <= 0) {
	    	mv.setViewName("common/error");
	    } else {
	    	mv.setViewName("redirect:adminNoticeList.do");
	    }
		
		return mv;
	}

}

