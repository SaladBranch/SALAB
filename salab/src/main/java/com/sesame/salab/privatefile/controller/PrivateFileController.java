package com.sesame.salab.privatefile.controller;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
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
	private String collection = "page";
	
	@Autowired
	private PrivateFileService pfService;
	
	@RequestMapping(value="insert_newprivateFile.do", method=RequestMethod.POST)
	public ModelAndView insertNewPage(PrivateFile pfile, ModelAndView mv, HttpServletRequest request) {
		MongoService mgService = new MongoService();
		logger.info("pfile :: "+pfile.toString());
		int result = pfService.insertNewPrivateFile(pfile);
		//새파일 생성후 페이지생성위한 파일넘버 가져옴
		PrivateFile pfile2 = pfService.createPage(pfile.getUserno());
		logger.info("pfile2 :: "+pfile2.toString());
		//mongodb에 저장할 객체생성
		Page page = new Page();
		page.setUserno(pfile.getUserno());
		page.setFileno(pfile2.getPfileno());
		page.setPageno(1);
		page.setContent("<div id='droppable' class='canvas ui-widget-content' data-background='#ffffff' data-grid='false' data-canvas='Desktop'>" + 
				"<div id='multiselect'></div>" +
				"</div>");
		page.setPagename("Untitled");
		String sbase64 = encodeToString(request.getSession().getServletContext().getRealPath("/resources/thumbnail.txt"));
		page.setThumbnail("<img src='"+sbase64+"'>");
		
		//파일 생성후 바로 첫페이지 생성
		mgService.createFirstPage(page);
		
		//생성한 페이지 바로 가져옴
		 ArrayList<Page> pageList = (ArrayList<Page>)mgService.findPage(collection, page);
		mgService.close();
		mv.addObject("userno", pfile.getUserno());
		mv.addObject("fileno", pfile2.getPfileno());
		mv.addObject("pageList", pageList);
		mv.setViewName("redirect:epFile.do");
		
		if(result <= 0) {
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	@RequestMapping(value = "pageTab.do", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public ModelAndView findInConditionMongo(Page page, ModelAndView mv) {
		mv.setViewName("jsonView");
		
		MongoService mgService = new MongoService();
		ArrayList<Page> pageList = (ArrayList<Page>)mgService.findPage(collection, page);
		
		Gson gson = new Gson();
		String result = gson.toJson(pageList);
		mv.addObject("page", pageList);
		mgService.close();
		
		return mv;
	}
	
	@RequestMapping(value="newPage.do", method=RequestMethod.POST)
	public ModelAndView newPage(Page page, ModelAndView mv, HttpServletRequest request) throws IOException {
		MongoService mgService = new MongoService();
		int result = mgService.countPage(page, collection);
		
		String sbase64 = encodeToString(request.getSession().getServletContext().getRealPath("/resources/thumbnail.txt"));
		mv.setViewName("jsonView");
		
		page.setContent("<div id='droppable' class='canvas ui-widget-content' data-background='#ffffff' data-grid='false' data-canvas='Desktop'>" + 
				"<div id='multiselect'></div>" +
				"</div>");
		page.setPagename("Untitled");
		page.setPageno(result + 1);
		logger.info(sbase64);
		page.setThumbnail("<img src='"+sbase64+"'/>");
		
		mgService.insertNewPage(page, collection);
		mgService.close();
		
		//새페이지 생성 후 최근변경일 업데이트
		changeLastModified(page.getUserno(), page.getFileno());
		
		return mv;
	}
	
	@RequestMapping(value="pageDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageDelete(@RequestBody Page page) {
		MongoService mgService = new MongoService();
		mgService.pageDelete(collection, page);
		logger.info("deletePage :: " + page.toString());
		
		List<Page> list = mgService.selectUpdatePageNo(collection, page);
		for(Page p : list) {
			logger.info(p.toString());
			mgService.updatePageNo(collection, p, "delete");
		}
		
		mgService.close();
		
		//페이지 삭제 후 최근변경일 업데이트
		changeLastModified(page.getUserno(), page.getFileno());
	}
	
	@RequestMapping(value="pageCopy.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageCopy(@RequestBody Page page) {
		MongoService mgService = new MongoService();
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
		
		//페이지 복사 후 최근변경일 업데이트
		changeLastModified(page.getUserno(), page.getFileno());
		
	}
	
	@RequestMapping(value="pageMove.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageMove(@RequestBody List<Page> page) {
		MongoService mgService = new MongoService();
		
		for(Page p : page) {
			mgService.saveDoc(collection, p);
		}
		
		mgService.close();
		
		//페이지무브 후 최근변경일 업데이트
		changeLastModified(page.get(0).getUserno(), page.get(0).getFileno());
		
	}
	
	@RequestMapping(value="pageSave.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageSave(@RequestBody Page page) {
		MongoService mgService = new MongoService();
		
		logger.info(page.toString());
		
		mgService.saveDoc(collection, page);
		mgService.close();
		
		//저장 후 최근변경일 업데이트
		changeLastModified(page.getUserno(), page.getFileno());
	}
	
	@RequestMapping(value="pageAllSave.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageAllSave(@RequestBody List<Page> list) {
		MongoService mgService = new MongoService();
		logger.info(list.get(0).toString());
		for(Page p : list) {
			mgService.saveDoc(collection, p);
		}
		mgService.close();
		
		//저장 후 마지막 변경일 업데이트
		changeLastModified(list.get(0).getUserno(), list.get(0).getFileno());
		
	}
	
	//페이지 안에서 변경이 일어나면 최근변경일 수정용 메소드
	public int changeLastModified(int userno, int pfileno) {
		PrivateFile pfile = new PrivateFile();
		pfile.setUserno(userno);
		pfile.setPfileno(pfileno);
		return pfService.changeLastModified(pfile);
	}
	
	public String encodeToString(String path) {
		 String a = "";
	     File file = new File(path);
	    
	     try {
	    	 BufferedReader inFiles = new BufferedReader(new InputStreamReader(new FileInputStream(file.getAbsolutePath()), "UTF8"));
	    
	         String line = "";
	 
	            while((line = inFiles.readLine()) != null) {
	                if(line.trim().length() > 0) {
	                    a += line;
	                }
	            }
	            //System.out.println("line : "+a);
	                inFiles.close();    
	            } catch (Exception e) {
	                e.printStackTrace();
	            }            
	        return a;
	}
	
	@RequestMapping(value="pfRename.do", method=RequestMethod.POST)
	@ResponseBody
	public String pfRename(PrivateFile pfile) {
		logger.info("pfRename :: " + pfile.toString());
		String success = "success";
		
		int result = pfService.pfRename(pfile);
		if(result > 0) {
			changeLastModified(pfile.getUserno(), pfile.getPfileno());
		}else {
			success = "fail";
		}
		
		return success;
	}
	
	@RequestMapping(value="pageRename.do", method=RequestMethod.POST)
	@ResponseBody
	public String pageRename(Page page) {
		logger.info("pageRename :: " + page.toString());
		String success = "success";
		MongoService mgService = new MongoService();
		
		mgService.pageRename(page, collection);
		
		return success;
	}
}
