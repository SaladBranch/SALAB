package com.sesame.salab.privatefile.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.service.PrivateFileService;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Controller
public class PrivateFileController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private PrivateFileService pfService;
	
	@RequestMapping("insert_newprivateFile.do")
	public ModelAndView insertNewPage(@RequestParam("userno")String userno, ModelAndView mv) {
		MongoService mgService = new MongoService();
		
		int result = pfService.insertNewPrivateFile(userno);
		//새파일 생성후 페이지생성위한 파일넘버 가져옴
		PrivateFile pfile = pfService.createPage(userno);
		
		//mongodb에 저장할 객체생성
		Page page = new Page();
		page.setUserno(Integer.parseInt(userno));
		page.setFileno(pfile.getPfileno());
		page.setPageno(1);
		page.setContent("<div id='droppable' class='canvas ui-widget-content' data-background='#ffffff' data-grid='false' data-canvas='Desktop'>" + 
				"<div id='multiselect'></div>" +
				"</div>");
		page.setPagename("Untitled");
		
		//파일 생성후 바로 첫페이지 생성
		mgService.createFirstPage(page);
		
		//생성한 페이지 바로 가져옴
		 ArrayList<Page> pageList = (ArrayList<Page>)mgService.findPage("page", page);
		mgService.close();
		mv.addObject("userno", userno);
		mv.addObject("fileno", pfile.getPfileno());
		mv.addObject("pageList", pageList);
		mv.setViewName("editPrivateFile/editPrivateFile");
		if(result <= 0) {
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	@RequestMapping(value = "pageTab.do", method = RequestMethod.POST, produces="text/plain;charset=UTF-8")
	public ModelAndView findInConditionMongo(Page page, ModelAndView mv) {
		mv.setViewName("jsonView");
		
		MongoService mgService = new MongoService();
		ArrayList<Page> pageList = (ArrayList<Page>)mgService.findPage("page", page);
		
		Gson gson = new Gson();
		String result = gson.toJson(pageList);
		mv.addObject("page", pageList);
		mgService.close();
		return mv;
	}
	
	@RequestMapping(value="newPage.do", method=RequestMethod.POST)
	public ModelAndView newPage(Page page, ModelAndView mv) {
		MongoService mgService = new MongoService();
		String collection = "page";
		int result = mgService.countPage(page, collection);
		System.out.println(result);
		mv.setViewName("jsonView");
		
		page.setContent("<div id='droppable' class='canvas ui-widget-content' data-background='#ffffff' data-grid='false' data-canvas='Desktop'>" + 
				"<div id='multiselect'></div>" +
				"</div>");
		page.setPagename("Untitled");
		page.setPageno(result + 1);
		
		mgService.insertNewPage(page, collection);
		mgService.close();
		
		return mv;
	}
	
	@RequestMapping(value="pageDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageDelete(@RequestBody Page page) {
		MongoService mgService = new MongoService();
		String collection = "page";
		mgService.pageDelete(collection, page);
		logger.info("deletePage :: " + page.toString());
		
		List<Page> list = mgService.selectUpdatePageNo(collection, page);
		for(Page p : list) {
			logger.info(p.toString());
			mgService.updatePageNo(collection, p, "delete");
		}
		
		mgService.close();
	}
	
	@RequestMapping(value="pageCopy.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageCopy(@RequestBody Page page) {
		MongoService mgService = new MongoService();
		String collection = "page";
		List<Page> list = mgService.selectUpdatePageNo(collection, page);
		for(Page p : list) {
			mgService.updatePageNo(collection, p, "copy");
		}
		page.set_id(null);
		page.setPagename("Copy of " + page.getPagename());
		page.setPageno(page.getPageno() + 1);
		System.out.println(page.toString());
		
		mgService.insertNewPage(page, collection);
		
		mgService.close();
	}
	
	@RequestMapping(value="pageMove.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageMove(@RequestBody List<Page> page) {
		MongoService mgService = new MongoService();
		String collection = "page";
		
		for(Page p : page) {
			mgService.saveDoc(collection, p);
			logger.info(p.toString());
		}
		logger.info("===================");
		
		mgService.close();
		
	}
	
}
