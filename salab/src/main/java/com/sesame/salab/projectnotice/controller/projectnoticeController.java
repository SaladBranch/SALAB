package com.sesame.salab.projectnotice.controller;

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
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.notice.controller.NoticeController;
import com.sesame.salab.projectnotice.model.service.ProjectnoticeService;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;
import com.sesame.salab.qna.model.vo.Qna;

@Controller
public class projectnoticeController {
	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

	@Autowired
	private ProjectnoticeService pnService;

	@RequestMapping(value = "projectNoticelist.do")
	public ModelAndView projectNoticelistMethod(ModelAndView mv, Projectnotice projectnotice,
			@RequestParam(value = "page", required = false) String currentPage) throws Exception {

		int curPage;
		projectnotice.setProjectno(2);// 테스트 값
		int projectno = 2;

		if (currentPage != null && Integer.parseInt(currentPage) != 0) {
			curPage = Integer.parseInt(currentPage);
			logger.info(curPage + "번 페이지 진입.");
		} else {
			curPage = 1;
		}

		int listCount = pnService.listCount(projectno); // DB에서 현재 총 Row수 가져옴
		System.out.println(listCount + "개수 의 리스트");
		Paging paging = new Paging(); // 현재 페이지
		paging.setLimit(10); // 한페이지에 10개의 리스트
		paging.makePage(listCount, curPage); // 페이징 처리함

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("paging", paging);
		map.put("projectno", projectno);
		List<Qna> pnoticelist = pnService.testList(map);
		System.out.println(pnoticelist.size());

		if (pnoticelist != null) {
			mv.addObject("noticelist", pnoticelist);
			mv.addObject("paging", paging);
			mv.setViewName("project/teamNoticeList");
		} else {
			mv.addObject("message", "프로젝트 공지사항 조회 실패");
			mv.setViewName("common/error");
		}

		return mv;
	}

	@RequestMapping(value="projectNotiRegist.do")
	public String projectNotiRegistMethod(Projectnotice projectnotice, HttpSession session) throws Exception {
		if(projectnotice != null) {
		System.out.println(projectnotice.toString());
		}else {
			System.out.println("null왔다리");
		}
		Member member = (Member) session.getAttribute("loginMember");
		int projectno=2;//테스트값
		projectnotice.setProjectno(projectno);
		projectnotice.setPnoticewriter(member.getUsername());
		pnService.noticeRegist(projectnotice);

		return "forward:/projectNoticelist.do";
	}
   	@RequestMapping(value="teamNoticeDetail.do")
   	public ModelAndView teamNoticeDetailMethod(ModelAndView mv,Projectnotice projectnotice ) {
   		if(projectnotice != null) {
   			System.out.println(projectnotice.toString());
   			projectnotice = pnService.selectTeamNotice(projectnotice);
   			mv.addObject("projectnotice", projectnotice);
   			System.out.println(projectnotice.toString());
   	   		mv.setViewName("project/teamNoticeDetail");
   		}else{
			mv.addObject("message", "프로젝트 공지사항 조회 실패");
			mv.setViewName("common/error");
		}
   		return mv;
   	}
	@RequestMapping(value="modifiedNotice.do")
   	public ModelAndView modifiedNoticeMethod(ModelAndView mv,Projectnotice projectnotice ) {
   		if(projectnotice != null) {
   			System.out.println(projectnotice.toString());
   			int result= pnService.modifiedNotice(projectnotice);
   			System.out.println("결과 : "+result);
   	   		mv.setViewName("forward:/projectNoticelist.do");
   		}else{
			mv.addObject("message", "프로젝트 공지사항 조회 실패");
			mv.setViewName("common/error");
		}
		return mv;
	}
	
	
	@RequestMapping(value="deleteNotice.do")
   	public ModelAndView deleteNoticeMethod(ModelAndView mv,Projectnotice projectnotice ) {
   		if(projectnotice != null) {
   			System.out.println(projectnotice.toString());
   			int result= pnService.deleteNotice(projectnotice);
   			System.out.println("결과 : "+result);
   	   		mv.setViewName("forward:/projectNoticelist.do");
   		}else{
			mv.addObject("message", "프로젝트 공지사항 삭제 실패");
			mv.setViewName("common/error");
		}
		return mv;
	}
}
