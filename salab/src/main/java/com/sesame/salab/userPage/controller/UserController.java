package com.sesame.salab.userPage.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass()); 

	
	@RequestMapping(value="test1.do", method= RequestMethod.POST)
	public String returntestPage(@RequestParam("newName") String newName) {
		logger.info("test 진입");
		logger.info("new Name : " + newName);
		return "userPage/userPageMain";
	}
	
	
}
