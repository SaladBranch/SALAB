package com.sesame.salab.projectfile.controller;

import java.awt.GraphicsEnvironment;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.message.model.vo.Message;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.project.model.service.ProjectService;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.projectfile.model.service.ProjectFileService;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

@Controller
public class ProjectFileController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private ProjectFileService projectFileService;
	
	@RequestMapping(value="gotoProjectFile.do")
	public ModelAndView gotoProjectFileMethod(HttpServletRequest request,HttpSession session, ModelAndView mv, Project project, String sort) throws Exception {
		MongoService mgService = new MongoService();
		Member member = (Member) session.getAttribute("loginMember");
		//프로젝트 데이터조회
		project = projectService.selectProject(project);
		
		List<ProjectFile> fileList = projectFileService.getFileList(project.getProjectno()); 
		if(sort.equals("recent")) {
			Collections.sort(fileList, new Comparator<ProjectFile>() {
				@Override
				public int compare(ProjectFile f1, ProjectFile f2) {
					return f2.getPrfilelastmodified().compareTo(f1.getPrfilelastmodified());
				}
			});
		}else if(sort.equals("name")) {
			Collections.sort(fileList, new Comparator<ProjectFile>() {
				@Override
				public int compare(ProjectFile f1, ProjectFile f2) {
					return f1.getPrfiletitle().compareTo(f2.getPrfiletitle());
				}
			});
		}else if(sort.equals("date")) {
			Collections.sort(fileList, new Comparator<ProjectFile>() {
				@Override
				public int compare(ProjectFile f1, ProjectFile f2) {
					return f1.getPrfilecreatedate().compareTo(f2.getPrfilecreatedate());
				}
			});
		}
		
		if(fileList != null) {
			for(ProjectFile pf : fileList) {
				Page p = new Page();
				p.setFileno(pf.getPrfileno());
				p.setPageno(1);
				p.setProjectno(pf.getProjectno());
				Page page = mgService.findTeamOne("page", p);
				pf.setPrfilethumbnail(page.getThumbnail());
			}
			mgService.close();
			mv.addObject("fileList", fileList);
			mv.addObject("sort", sort);
			mv.setViewName("project/projectFile");
		}else {
			mv.setViewName("common/error");
		}
		
		mv.addObject("project", project);
	  	
		return mv;
	}
	
	@RequestMapping(value="insert_newteamFile.do", method=RequestMethod.POST)
	public ModelAndView insertNewteamPage(ProjectFile prfile, ModelAndView mv, HttpServletRequest request) {
		MongoService mgService = new MongoService();
		int result = projectFileService.insertNewTeamFile(prfile);
		//페이지 생성 위한 파일 넘버 가져오기
		ProjectFile prfile2 = projectFileService.getFileNo(prfile.getProjectno());
		Page page = new Page();
		page.setProjectno(prfile.getProjectno());
		page.setFileno(prfile2.getPrfileno());
		page.setPageno(1);
		page.setContent("<div id='droppable' class='canvas ui-widget-content' data-background='#ffffff' data-grid='false' data-canvas='Desktop'>" + 
				"<div id='multiselect'></div>" +
				"</div>");
		page.setPagename("Untitled");
		String sbase64 = encodeToString(request.getSession().getServletContext().getRealPath("/resources/thumbnail.txt"));
		page.setThumbnail("<img src='"+sbase64+"'>");
		
		mgService.createFirstPage(page);
		
		//생성한 페이지 바로 가져옴
		ArrayList<Page> pageList = (ArrayList<Page>)mgService.findTeamPage("page", page);
		mgService.close();
		mv.addObject("projectno", prfile.getProjectno());
		mv.addObject("fileno", prfile2.getPrfileno());
		mv.addObject("pageList", pageList);
		mv.setViewName("redirect:etFile.do");
		
		if(result <= 0) {
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	@RequestMapping(value="etFile.do")
	public String toEditTeamFileMethod(@RequestParam("projectno")String projectno, @RequestParam("fileno")String fileno, HttpServletRequest req) throws UnsupportedEncodingException {
		MongoService mgService = new MongoService();
		Page page = new Page();
		page.setProjectno(Integer.parseInt(projectno));
		page.setFileno(Integer.parseInt(fileno));
		List<Page> pageList = (List<Page>)mgService.findTeamPage("page", page);
		
		ProjectFile prfile = projectFileService.selectOne(page);

		// 컴퓨터에 갖고있는 font 가져오기
		List<String> fontList = new ArrayList<String>();
		GraphicsEnvironment e = GraphicsEnvironment.getLocalGraphicsEnvironment();
		String[] fonts = e.getAvailableFontFamilyNames();
		
		for (String font : fonts) {
			fontList.add(font);
		}
		for(Page p : pageList) {
			System.out.println(p.toString());
		}
		req.setAttribute("pfile", prfile);
		req.setAttribute("pageList", pageList);
		req.setAttribute("projectno", page.getProjectno());
		req.setAttribute("fileno", page.getFileno());
		req.setAttribute("fontList", fontList);
		return "editTeamFile/editTeamFile";
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
	                inFiles.close();    
	            } catch (Exception e) {
	                e.printStackTrace();
	            }            
	        return a;
	}
	
	@RequestMapping(value="getMessageList.do", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView initMessageList(@RequestBody Message msg, ModelAndView mv) {
		MongoService mgService = new MongoService();
		String collectionName = "message";
		System.out.println("prfileno: " + msg);
		List<Message> messageList = (List<Message>)mgService.getMessageList(collectionName, msg);
		mv.setViewName("jsonView");
		mv.addObject("messageList", messageList);
		mgService.close();
		System.out.println(messageList.size());
		return mv;
	}
}


