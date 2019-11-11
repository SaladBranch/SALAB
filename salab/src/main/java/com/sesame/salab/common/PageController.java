
package com.sesame.salab.common;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.member.model.vo.Member;

@Controller
public class PageController {
	private static final Logger logger = LoggerFactory.getLogger(PageController.class);
	
	@RequestMapping(value="recentFile.do")
	public String toRecentFileMethod() {
		return "recentFile/recentFile";
	}
	
	@RequestMapping(value="userNotice.do")
	public String toUserNoticeMethod() {
		return "help/userNotice";
	}
	
	@RequestMapping(value="userQnA.do")
	public String toUserQnAMethod() {
		return "help/userQnA";
	}
	@RequestMapping(value="privateFile.do")
	public String toPrivateFileMethod() {
		return "privateFile/privateFile";
	}
	
	@RequestMapping(value="trashCan.do")
	public String toTrashCanMethod() {
		return "trashCan/trashCan";
	}
  
  @RequestMapping(value="epFile.do")
	public String toEditPrivateFileMethod() {
		return "editPrivateFile/editPrivateFile";
	}

	// 승진 테스트페이지 이동
	@RequestMapping(value="testSEUNGJIN.do")
	public String toTestSEUNGJIN() {
		return "testSEUNGJIN";
	}

	//건우
	  @RequestMapping(value="usermain.do")
  	 public String toUserPageMainMethod() {
  	    return "userPage/userPageMain";
 	  }
   	@RequestMapping(value="pwdchange.do")
   	public String toUserChangePwdMethod() {
   	   return "userPage/userChangePwd";
   	}
   	@RequestMapping(value="upgrade.do")
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
}
