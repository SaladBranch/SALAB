package com.sesame.salab.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
	
	
}
