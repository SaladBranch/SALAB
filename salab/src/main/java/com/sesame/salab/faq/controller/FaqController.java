package com.sesame.salab.faq.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.admin.model.vo.Admin;
import com.sesame.salab.faq.model.service.FaqService;
import com.sesame.salab.faq.model.vo.Faq;

@Controller
public class FaqController {
	private static final Logger logger = LoggerFactory.getLogger(FaqController.class);
	
	@Autowired
	private FaqService faqService;
	
	
	//faq 목록 조회
	@RequestMapping(value="faqlist.do")
	public ModelAndView faqListMethod(ModelAndView mv, Faq faq) throws Exception{
		List<Faq> faqlist = faqService.faqList();
		
		if(faqlist != null) {
			mv.addObject("faqlist", faqlist);
			mv.setViewName("help/userFAQ");
		}else {
			mv.addObject("message", "faq 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	
	//admin Faq 목록 조회
	@RequestMapping(value="adminFaqList.do")
	public ModelAndView adminFaqListMethod(ModelAndView mv, Faq faq) throws Exception{
		List<Faq> adminFaqList = faqService.adminFaqList();
		
		if(adminFaqList != null) {
			mv.addObject("adminFaqList", adminFaqList);
			mv.setViewName("admin/adminFaq");
		}else {
			mv.addObject("message", "faq 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	//admin Faq 등록
	@RequestMapping(value="adminFaqInsert.do", method=RequestMethod.POST)
	public ModelAndView adminFaqInsertMethod(ModelAndView mv, Faq faq, HttpSession session) throws Exception{
		faq.setAdminid(((Admin)session.getAttribute("loginAdmin")).getAdminid());
		
		int result = faqService.adminFaqInsert(faq);
		
		if(result <= 0) {
	    	mv.setViewName("common/error");
	    } else {
	    	mv.setViewName("redirect:adminFaqList.do");
	    }
		
		return mv;
	}

}
