package com.sesame.salab.privatefile.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import com.sesame.salab.common.FileList;
import com.sesame.salab.library.model.vo.PrivateLibrary;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.service.PrivateFileService;
import com.sesame.salab.privatefile.model.vo.PrivateFile;
import com.sesame.salab.projectfile.model.service.ProjectFileService;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

@Controller
public class PrivateFileController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private String collection = "page";
	
	@Autowired
	private PrivateFileService pfService;
	
	@Autowired
	private ProjectFileService prfService;
	
	@RequestMapping(value="insert_newprivateFile.do", method=RequestMethod.POST)
	public ModelAndView insertNewPage(PrivateFile pfile, ModelAndView mv, HttpServletRequest request) {
		MongoService mgService = new MongoService();
		int result = pfService.insertNewPrivateFile(pfile);
		//새파일 생성후 페이지생성위한 파일넘버 가져옴
		PrivateFile pfile2 = pfService.createPage(pfile.getUserno());
		//mongodb에 저장할 객체생성
		Page page = new Page();
		page.setUserno(pfile.getUserno());
		page.setFileno(pfile2.getPfileno());
		page.setPageno(1);
		page.setContent("<div id='droppable' class='canvas ui-widget-content' data-background='#ffffff' data-grid='false' data-canvas='Desktop'>" + 
				"<div id='multiselect'></div>" +
				"</div>"+
				"<div id=\"clone-canvas\"></div>");
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
				"</div>"+
				"<div id=\"clone-canvas\"></div>");
		page.setPagename("Untitled");
		page.setPageno(result + 1);
		page.setThumbnail("<img src='"+sbase64+"'/>");
		
		mgService.insertNewPage(page, collection);
		mgService.close();
		
		//새페이지 생성 후 최근변경일 업데이트
		if(page.getUserno() == 0) {
			changeLastModified(page.getProjectno(), page.getFileno(), "team");
		}else {
			changeLastModified(page.getUserno(), page.getFileno(), "private");
		}
		
		return mv;
	}
	
	@RequestMapping(value="pageDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageDelete(@RequestBody Page page) {
		MongoService mgService = new MongoService();
		mgService.pageDelete(collection, page);
		
		List<Page> list = mgService.selectUpdatePageNo(collection, page);
		for(Page p : list) {
			mgService.updatePageNo(collection, p, "delete");
		}
		
		mgService.close();
		
		//페이지 삭제 후 최근변경일 업데이트
		if(page.getUserno() == 0) {
			changeLastModified(page.getProjectno(), page.getFileno(), "team");
		}else {
			changeLastModified(page.getUserno(), page.getFileno(), "private");
		}
	}
	
	@RequestMapping(value="pageCopy.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView pageCopy(ModelAndView mv, @RequestBody Page page) {
		mv.setViewName("jsonView");
		MongoService mgService = new MongoService();
		List<Page> list = mgService.selectUpdatePageNo(collection, page);
		for(Page p : list) {
			mgService.updatePageNo(collection, p, "copy");
		}
		page.set_id(null);
		page.setPagename("Copy of " + page.getPagename());
		page.setPageno(page.getPageno() + 1);
		
		mgService.insertNewPage(page, collection);
		
		List<Page> pageList = mgService.findPage(collection, page);

		mgService.close();
		mv.addObject("pageList", pageList);
		
		
		//페이지 복사 후 최근변경일 업데이트
		if(page.getUserno() == 0) {
			changeLastModified(page.getProjectno(), page.getFileno(), "team");
		}else {
			changeLastModified(page.getUserno(), page.getFileno(), "private");
		}
		return mv;
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
		if(page.get(0).getUserno() == 0) {
			changeLastModified(page.get(0).getProjectno(), page.get(0).getFileno(), "team");
		}else {
			changeLastModified(page.get(0).getUserno(), page.get(0).getFileno(), "private");
		}
		
		
	}
	
	@RequestMapping(value="pageSave.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageSave(@RequestBody Page page) {
		MongoService mgService = new MongoService();
		
		mgService.saveDoc(collection, page);
		mgService.close();
		
		//저장 후 최근변경일 업데이트
		if(page.getUserno() == 0) {
			changeLastModified(page.getProjectno(), page.getFileno(), "team");
		}else {
			changeLastModified(page.getUserno(), page.getFileno(), "private");
		}
	}
	
	@RequestMapping(value="pageAllSave.do", method=RequestMethod.POST)
	@ResponseBody
	public void pageAllSave(@RequestBody List<Page> list) {
		MongoService mgService = new MongoService();
		for(Page p : list) {
			mgService.saveDoc(collection, p);
		}
		mgService.close();
		
		//저장 후 마지막 변경일 업데이트
		for(Page page : list) {
			if(page.getUserno() == 0) {
				changeLastModified(page.getProjectno(), page.getFileno(), "team");
			}else {
				changeLastModified(page.getUserno(), page.getFileno(), "private");
			}
		}
		
	}
	
	//페이지 안에서 변경이 일어나면 최근변경일 수정용 메소드
	public int changeLastModified(int userno, int pfileno, String pt) {
		if(pt.equals("private")) {
			PrivateFile pfile = new PrivateFile();
			pfile.setUserno(userno);
			pfile.setPfileno(pfileno);
			return pfService.changeLastModified(pfile);
		}else {
			ProjectFile pfile = new ProjectFile();
			pfile.setProjectno(userno);
			pfile.setPrfileno(pfileno);
			return prfService.changeLastModified(pfile);
		}
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
	public String pfRename(FileList pfile) {
		String success = "success";
		
		if(pfile.getPt().equals("private")) {
			int result = pfService.pfRename(pfile);
			if(result > 0) {
				changeLastModified(pfile.getUserno(), pfile.getPfileno(), "private");
			}else {
				success = "fail";
			}
		}else {
			int result = pfService.prRename(pfile);
			if(result > 0) {
				changeLastModified(pfile.getUserno(), pfile.getPfileno(), "team");
			}else {
				success = "fail";
			}
		}
		
		return success;
	}
	
	@RequestMapping(value="pageRename.do", method=RequestMethod.POST)
	@ResponseBody
	public String pageRename(Page page) {
		String success = "success";
		MongoService mgService = new MongoService();
		
		mgService.pageRename(page, collection);
		
		if(page.getUserno() == 0) {
			changeLastModified(page.getProjectno(), page.getFileno(), "team");
		}else {
			changeLastModified(page.getUserno(), page.getFileno(), "private");
		}
		
		return success;
	}
	
	@RequestMapping(value="fileCopy.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView fileCopy(ModelAndView mv, FileList fileList) {
		MongoService mgService = new MongoService();
		mv.setViewName( "jsonView" );
		
		if(fileList.getPt().equals("private")) {
			//뷰에서 넘겨준 파일넘버와 유저넘버로 파일의 모든 정보 검색
			PrivateFile pfile = new PrivateFile();
			pfile.setUserno(fileList.getUserno());
			pfile.setPfileno(fileList.getPfileno());
			PrivateFile file = pfService.selectFile(pfile);
			file.setPfiletitle("Copy of "+ file.getPfiletitle());
			//파일 타이틀의 접두사 붙여주고 파일넘버 시퀀스 처리해서 생성
			int result = pfService.fileCopy(file);
			
			//파일넘버와 유저넘버로 객체생성한다음 해당되는 페이지 검색
			Page p = new Page();
			p.setUserno(file.getUserno());
			p.setFileno(file.getPfileno());
			List<Page> list = mgService.findPage(collection, p);
			
			//페이지만들기위해 방금생성한 파일 넘버조회
			PrivateFile file2 = pfService.createPage(file.getUserno());
			
			//반복문 돌려서 아이디와 파일넘버만 바꿔서 인서트함
			for(Page page : list) {
				page.set_id(null);
				page.setFileno(file2.getPfileno());
				mgService.insertNewPage(page, collection);
			}
		}else {
			ProjectFile pfile = new ProjectFile();
			pfile.setProjectno(fileList.getUserno());
			pfile.setPrfileno(fileList.getPfileno());
			
			ProjectFile file = prfService.selectFile(pfile);
			logger.info(file.toString());
			file.setPrfiletitle("Copy of "+ file.getPrfiletitle());
			//파일 타이틀의 접두사 붙여주고 파일넘버 시퀀스 처리해서 생성
			int result = prfService.fileCopy(file);
			
			//파일넘버와 유저넘버로 객체생성한다음 해당되는 페이지 검색
			Page p = new Page();
			p.setProjectno(file.getProjectno());
			p.setFileno(file.getPrfileno());
			List<Page> list = mgService.findTeamPage(collection, p);
			
			//페이지만들기위해 방금생성한 파일 넘버조회
			ProjectFile file2 = prfService.createPage(file.getProjectno());

			//반복문 돌려서 아이디와 파일넘버만 바꿔서 인서트함
			for(Page page : list) {
				page.set_id(null);
				page.setFileno(file2.getPrfileno());
				mgService.insertNewPage(page, collection);
			}
		}
		mgService.close();
		return mv;
	}
	
	@RequestMapping(value="fileDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public String fileDelete(FileList pfile) {
		String result = "success";
		
		if(pfile.getPt().equals("private")) {
			int res = pfService.fileDelete(pfile);
			if(res < 0) {
				result="failed";
			}
		}else {
			int res = pfService.teamfileDelete(pfile);
			if(res < 0) {
				result="failed";
			}
		}
		
		return result;
	}
	
	@RequestMapping(value="fileDeleteUndo.do", method=RequestMethod.POST)
	@ResponseBody
	public String fileDeleteUndo(FileList pfile) {
		String result  = "success";
		
		if(pfile.getPt().equals("private")) {
			int res = pfService.fileDeleteUndo(pfile);
			if(res < 0) {
				result = "failed";
			}
		}else {
			int res = pfService.teamFileDeleteUndo(pfile);
			if(res < 0) {
				result = "failed";
			}
		}
		
		return result;
	}
	
	@RequestMapping(value="filePermanentDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public String filePermanentDelete(FileList pfile) {
		String result = "success";
		
		MongoService mgService = new MongoService();
		
		if(pfile.getPt().equals("private")) {
			int res = pfService.filePermanentDelete(pfile);
			if(res > 0) {
				mgService.removeData(collection, pfile);
				mgService.close();
			}else {
				result = "error/error";
			}
		}else {
			int res = pfService.teamFilePermanentDelete(pfile);
			if(res > 0) {
				mgService.removeTeamData(collection, pfile);
				mgService.close();
			}else {
				result = "error/error";
			}
		}
		
		return result;
	}
	
	@RequestMapping(value="toPrivateLib.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView addToPrivateFileLib(@RequestBody PrivateLibrary plib, ModelAndView mv) {
		MongoService mgService = new MongoService();
		String collectionName = "privateLibrary";
		
		mgService.addToPrivateFileLib(collectionName, plib);
		PrivateLibrary plibItem = (PrivateLibrary)mgService.getPlibId(collectionName, plib);
		
		mv.setViewName("jsonView");
		Gson gson = new Gson();
		String result = gson.toJson(plibItem);
		mv.addObject("plib", plibItem);
		mgService.close();
		
		return mv;
	}
	
	@RequestMapping(value="getPlibList.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getPrivateLibList(@RequestBody PrivateLibrary plib, ModelAndView mv) {
		MongoService mgService = new MongoService();
		String collectionName = "privateLibrary";
		
		List<PrivateLibrary> plibItems = (List<PrivateLibrary>)mgService.getPlibItems(collectionName, plib);
		mv.setViewName("jsonView");
		mv.addObject("plib", plibItems);
		mgService.close();
		return mv;
	}
	
	@RequestMapping(value="deletePlib.do", method=RequestMethod.POST)
	@ResponseBody
	public void deleteFromPrivateLibrary(@RequestBody PrivateLibrary plib) {
		MongoService mgService = new MongoService();
		String collectionName = "privateLibrary";
		mgService.deleteFromPrivateLibrary(collectionName, plib);
		mgService.close();

	}
	
	@RequestMapping(value="searchKeyword.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView searchKeyword(@RequestParam("keyword")String keyword, @RequestParam("userno")int userno, ModelAndView mv) {
		Map map = new HashMap();
		map.put("keyword", keyword);
		map.put("userno", userno);
		List<FileList> fileList = pfService.searchKeyword(map);
		
		mv.addObject("fileList", fileList);
		
		return mv;
	}
	
	@RequestMapping(value="multiCopy.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView multiCopy(@RequestBody List<FileList> fileList, ModelAndView mv) {
		MongoService mgService = new MongoService();
		mv.setViewName( "jsonView" );
		//뷰에서 넘겨준 파일넘버와 유저넘버로 파일의 모든 정보 검색
		for(FileList f : fileList) {
			if(f.getPt().equals("private")) {
				PrivateFile pfile = new PrivateFile();
				pfile.setUserno(f.getUserno());
				pfile.setPfileno(f.getPfileno());
				PrivateFile file = pfService.selectFile(pfile);
				file.setPfiletitle("Copy of "+ file.getPfiletitle());
				//파일 타이틀의 접두사 붙여주고 파일넘버 시퀀스 처리해서 생성
				int result = pfService.fileCopy(file);
				
				//파일넘버와 유저넘버로 객체생성한다음 해당되는 페이지 검색
				Page p = new Page();
				p.setUserno(file.getUserno());
				p.setFileno(file.getPfileno());
				List<Page> list = mgService.findPage(collection, p);
				
				//페이지만들기위해 방금생성한 파일 넘버조회
				PrivateFile file2 = pfService.createPage(file.getUserno());
				
				//반복문 돌려서 아이디와 파일넘버만 바꿔서 인서트함
				for(Page page : list) {
					page.set_id(null);
					page.setFileno(file2.getPfileno());
					mgService.insertNewPage(page, collection);
				}
			}else {
				ProjectFile pfile = new ProjectFile();
				pfile.setProjectno(f.getUserno());
				pfile.setPrfileno(f.getPfileno());
				ProjectFile file = prfService.selectFile(pfile);
				file.setPrfiletitle("Copy of "+ file.getPrfiletitle());
				//파일 타이틀의 접두사 붙여주고 파일넘버 시퀀스 처리해서 생성
				int result = prfService.fileCopy(file);
				
				//파일넘버와 유저넘버로 객체생성한다음 해당되는 페이지 검색
				Page p = new Page();
				p.setProjectno(file.getProjectno());
				p.setFileno(file.getPrfileno());
				List<Page> list = mgService.findTeamPage(collection, p);
				
				//페이지만들기위해 방금생성한 파일 넘버조회
				ProjectFile file2 = prfService.createPage(file.getProjectno());
				
				//반복문 돌려서 아이디와 파일넘버만 바꿔서 인서트함
				for(Page page : list) {
					page.set_id(null);
					page.setFileno(file2.getPrfileno());
					mgService.insertNewPage(page, collection);
				}
			}
		}
		
		return mv;
	}
	
	@RequestMapping(value="multiDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView multiDelete(@RequestBody List<FileList> fileList, ModelAndView mv) {
		mv.setViewName("jsonView");
		
		for(FileList pfile : fileList) {
			if(pfile.getPt().equals("private")) {
				int res = pfService.fileDelete(pfile);
			}else {
				int res = pfService.teamfileDelete(pfile);
			}
		}
		
		return mv;
	}
	
	@RequestMapping(value="multiPermanentDelete.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView multiPermanentDelete(@RequestBody List<FileList> fileList, ModelAndView mv) {
		mv.setViewName("jsonView");
		
		MongoService mgService = new MongoService();
		
		for(FileList pfile : fileList) {
			if(pfile.getPt().equals("private")) {
				int res = pfService.filePermanentDelete(pfile);
				if(res > 0) {
					mgService.removeData(collection, pfile);
				}else {
					mv.setViewName("error/error");
				}
			}else {
				int res = pfService.teamFilePermanentDelete(pfile);
				if(res > 0) {
					mgService.removeTeamData(collection, pfile);
					
				}else {
					mv.setViewName("error/error");
				}
			}
		}
		mgService.close();
		
		return mv;
	}
	
	@RequestMapping(value="multiDeleteUndo.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView multiDeleteUndo(@RequestBody List<FileList> fileList, ModelAndView mv) {
		mv.setViewName("jsonView");
		
		for(FileList pfile : fileList) {
			if(pfile.getPt().equals("private")) {
				int res = pfService.fileDeleteUndo(pfile);
				if(res < 0) {
					mv.setViewName("error/error");
				}
			}else {
				int res = pfService.teamFileDeleteUndo(pfile);
				if(res < 0) {
					mv.setViewName("error/error");
				}
			}
		}
		
		return mv;
	}
}















