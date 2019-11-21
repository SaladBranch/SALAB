
package com.sesame.salab.common;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.service.PrivateFileService;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Controller
public class PageController {
	private static final Logger logger = LoggerFactory.getLogger(PageController.class);
	
	@Autowired
	private PrivateFileService pfService;
	
	@RequestMapping(value="recentFile.do")
	public String toRecentFileMethod(HttpSession session, HttpServletRequest request) {
		String viewFileName = "recentFile/recentFile";
		Member member = (Member) session.getAttribute("loginMember");
		logger.info(member.toString());
		List<PrivateFile> privateFile = pfService.selectList(member.getUserno());
		if( privateFile != null) {
			request.setAttribute("privateFile", privateFile);
		}else {
			viewFileName = "common/error";
		}
		return viewFileName;
	}
	
	//연영 help 페이지 ~
	@RequestMapping(value="userNotice.do")
	public String toUserNoticeMethod() {
		return "help/userNotice";
	}
	
	@RequestMapping(value="userNoticeDetail.do")
	public String toUserNoticeDetailMethod() {
		return "help/userNoticeDetail";
	}
	
	@RequestMapping(value="userQna.do")
	public String toUserQnAMethod() {
		return "help/userQna";
	}
	
	@RequestMapping(value="userQnaInsert.do")
	public String toUserQnaInsertMethod() {
		return "help/userQnaInsert";
	}
	
	@RequestMapping(value="userQnaDetail.do")
	public String toUserQnaDetailMethod() {
		return "help/userQnaDetail";
	}
	@RequestMapping(value="userFAQ.do")
	public String toUserFAQMethod() {
		return "help/userFAQ";
	}
	
	// ~ 연영 help 페이지
	
	@RequestMapping(value="privateFile.do")
	public String toPrivateFileMethod() {
		return "privateFile/privateFile";
	}
	
	@RequestMapping(value="trashCan.do")
	public String toTrashCanMethod() {
		return "trashCan/trashCan";
	}
  
  @RequestMapping(value="epFile.do")
	public String toEditPrivateFileMethod(@RequestParam("userno")String userno, @RequestParam("fileno")String fileno, HttpServletRequest req) {
	  MongoService mgService = new MongoService();
	  Page page = new Page();
	  page.setUserno(Integer.parseInt(userno));
	  page.setFileno(Integer.parseInt(fileno));
	  ArrayList<Page> pageList = (ArrayList<Page>)mgService.findPage("page", page);

	  req.setAttribute("pageList", pageList);
	  req.setAttribute("userno", page.getUserno());
	  req.setAttribute("fileno", page.getFileno());
		return "editPrivateFile/editPrivateFile";
	}

	// 승진 테스트페이지 이동
	@RequestMapping(value="textTest.do")
	public String toTestSEUNGJIN() {
		return "textTest";
	}

	//건우
	  @RequestMapping(value="userMain.do")
  	 public String toUserPageMainMethod() {
  	    return "userPage/userPageMain";
 	  }
 
   	@RequestMapping(value="userUpgrade.do")
   	public String toUserAccountUpgradeMethod() {
    	  return "userPage/userUpgrade";
   	}
   	
   	//세준
   	@RequestMapping(value="newTeam.do")
   	public String createProjectMethod() {
   		return "project/newTeam";
   	}
   	
   	@RequestMapping(value="investTeam.do")
	public String createProejct(@RequestParam("projectname")String projectname, HttpServletRequest request) {
		request.setAttribute("projectname", projectname);
   		
		return "project/investTeam";
	}
   	
   	@RequestMapping(value="projectinvite.do")
   	public String projectInvite(@RequestParam("userno")String userno, @RequestParam("projectno")String projectno, HttpServletRequest request) {
   		request.setAttribute("userno", userno);
   		request.setAttribute("projectno", projectno);
   		return "project/inviteProject";
   	}
}
