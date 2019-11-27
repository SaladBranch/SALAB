package com.sesame.salab.projectnotice.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.notice.controller.NoticeController;
import com.sesame.salab.projectnotice.model.service.ProjectnoticeService;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;


@Controller
public class projectnoticeController {
	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);
	
	@Autowired
	private ProjectnoticeService pnService;
	
	@RequestMapping(value="searchNoticeList.do")
   	public String teamNoticeDetailMethod(/*@RequestParam("projectno")String projectno ,*/ HttpSession session,Projectnotice projectnotice2) {
   		logger.info("searchNoticeList.do 진입..");
   		//테스트키 noticeno = 2
   		Projectnotice projectnotice = new Projectnotice();
   		projectnotice.setProjectno(2);
   		System.out.println(projectnotice.toString());
   		List<Projectnotice> noticeList =  pnService.searchNoticeList(projectnotice);
   		logger.info("총 페이지 개수 : "+noticeList.size());
  		int countNotice= noticeList.size()/10;//총 페이지개수

  		int startPage = 1;
  		int endPage=5;

  		int nowPage=7;
  		List<Projectnotice> showList = new ArrayList<Projectnotice>();
  		if(noticeList.size() < nowPage*10 && noticeList.size() > nowPage*10-10) {//마지막페이지일경우
  			System.out.println("if에 걸림");
  			int gap = noticeList.size() -  (nowPage*10-10);
  			System.out.println("갭 : " +gap);
  			for(int i =(nowPage*10)-10; i < (nowPage*10-10)+gap; i++ ) {
  	  			System.out.println("i값 : " +i);
  	  			System.out.println((nowPage*10-10)+gap);
  	  			System.out.println(" _ "+noticeList.get(i).getPnoticeno());
  	  			showList.add(noticeList.get(i));
  			}
  		}else {
  		for( int i = nowPage*10-10 ; i <nowPage*10  ; i++) {//마지막페이지가 아닐경우
  			System.out.print("i값 : " +i);
  			System.out.println(" _ "+noticeList.get(i).getPnoticeno());
	  		showList.add(noticeList.get(i));
  			}
  		}
  		HashMap<String, Integer> listAttr = new HashMap<String, Integer>();
  		listAttr.put("countNotice", countNotice);
  		listAttr.put("startPage", 1);
  		listAttr.put("endPage", 5);
  		listAttr.put("nowPage", nowPage); 		 
  		session.setAttribute("showList", showList);
  		session.setAttribute("listAttr", listAttr);
   		return "project/teamNoticeList";
   	}
	@RequestMapping(value="noticeMain.do")
   	public ModelAndView noticeListMainMethod(/*@RequestParam("projectno")String projectno ,*/ HttpSession session, ModelAndView mv) {
		logger.info("searchNoticeList.do 진입..");
   		//테스트키 noticeno = 2
   		Projectnotice projectnotice = new Projectnotice();
   		projectnotice.setProjectno(2);
   		System.out.println(projectnotice.toString());
   		List<Projectnotice> noticeList =  pnService.searchNoticeList(projectnotice);
   		logger.info("총 페이지 개수 : "+noticeList.size());
  		int countNotice= noticeList.size()/10+1;//총 페이지개수

  		int startPage = 1;
  		int endPage=5;

  		int nowPage=1;
  		List<Projectnotice> showList = new ArrayList<Projectnotice>();
  		for( int i = nowPage*10-10 ; i <nowPage*10  ; i++) {//첫번째페이지.
  			System.out.print("i값 : " +i);
  			System.out.println(" _ "+noticeList.get(i).getPnoticeno());
	  		showList.add(noticeList.get(i));
  			}
  		HashMap<String, Integer> listAttr = new HashMap<String, Integer>();
  		listAttr.put("countNotice", countNotice);
  		listAttr.put("startPage", 1);
  		listAttr.put("endPage", 5);
  		listAttr.put("nowPage", nowPage); 		 

  		mv.addObject(showList);
  		mv.addObject(listAttr);
  		 		
  		mv.setViewName("project/teamNoticeList");
   		return mv;
	
	}

	
	@RequestMapping(value="pageListPrint.do", method=RequestMethod.POST)
   	public void pageListPrintMethod ( @RequestParam("projectno") String pno, HttpServletResponse response, HttpSession session) throws IOException {
		logger.info("pageListPrint 진입. projectno : "+pno);
		Projectnotice projectnotice = new Projectnotice();
   		projectnotice.setProjectno(Integer.parseInt(pno));
		List<Projectnotice> noticeList =  pnService.searchNoticeList(projectnotice);
   		logger.info("총 페이지 개수 : "+noticeList.size());
  		int countNotice= noticeList.size()/10+1;//총 페이지개수
        PrintWriter out = null;
	try {
	    out = response.getWriter();
	    out.append(String.valueOf(countNotice));
	    out.flush();	
	} catch (Exception e) {
	e.printStackTrace();
	}
		out.close();
            

	}
	@RequestMapping(value="noticeListPrint.do", method=RequestMethod.POST)
	public ModelAndView noticeListPrintMethod ( @RequestParam("pageno") String pageno,@RequestParam("projectno") String projectno, HttpServletResponse response, HttpSession session, ModelAndView mv) throws IOException {
		logger.info("noticeListPrint 진입. pageno : "+pageno +", projectno : "+projectno);
		
		Projectnotice projectnotice = new Projectnotice();
   		projectnotice.setProjectno(Integer.parseInt(projectno));
   		System.out.println(projectnotice.toString());
   		List<Projectnotice> noticeList =  pnService.searchNoticeList(projectnotice);
   		logger.info("총 페이지 개수 : "+noticeList.size());
  		int countNotice= noticeList.size()/10;//총 페이지개수
		

  		int startPage = 1;
  		int endPage=5;

  		int nowPage=Integer.parseInt(pageno);
  		List<Projectnotice> showList = new ArrayList<Projectnotice>();
  		if(noticeList.size() < nowPage*10 && noticeList.size() > nowPage*10-10) {//마지막페이지일경우
  			System.out.println("if에 걸림");
  			int gap = noticeList.size() -  (nowPage*10-10);
  			System.out.println("갭 : " +gap);
  			for(int i =(nowPage*10)-10; i < (nowPage*10-10)+gap; i++ ) {
  	  			System.out.println("i값 : " +i);
  	  			System.out.println((nowPage*10-10)+gap);
  	  			System.out.println(" _ "+noticeList.get(i).getPnoticeno());
  	  			showList.add(noticeList.get(i));
  			}
  		}else {
  		for( int i = nowPage*10-10 ; i <nowPage*10  ; i++) {//마지막페이지가 아닐경우
  			System.out.print("i값 : " +i);
  			System.out.println(" _ "+noticeList.get(i).getPnoticeno());
	  		showList.add(noticeList.get(i));
  			}
  		}
  		
  		mv.setViewName("jsonView");
  		mv.addObject("showList", showList);
  		/*JSONObject sendj = new JSONObject();

		JSONArray jar = new JSONArray();
		
		for(Projectnotice p : showList) {
			JSONObject job = new JSONObject();
			job.put("pnoticeno", p.getPnoticeno());
			job.put("projectno", p.getProjectno());
			job.put("pnoticetitle", URLEncoder.encode(p.getPnoticetitle(), "utf-8"));
			job.put("pnoticecontent", URLEncoder.encode(p.getPnoticecontent(), "utf-8"));
			job.put("pnoticewriter", p.getPnoticedate());
			
			jar.add(job);
		}
		sendj.put("list", jar);
		
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out =null;
		try {
			out= response.getWriter();
			out.append(sendj.toJSONString());
			out.flush();
		} catch (Exception e) {
			// TODO: handle exception
		}
		System.out.println("ㅇㅇㅇㅇ");
		out.close();*/
  		
  		return mv;
	}


}
