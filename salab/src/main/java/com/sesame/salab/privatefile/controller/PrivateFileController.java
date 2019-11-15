package com.sesame.salab.privatefile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.privatefile.model.service.PrivateFileService;

@Controller
public class PrivateFileController {
	
	@Autowired
	private PrivateFileService pfService;
	
	@RequestMapping("insert_newprivateFile.do")
	public String insertNewPage(@RequestParam("userno")String userno) {
		
		int result = pfService.insertNewPrivateFile(userno);
		
		String viewName = "editPrivateFile/editPrivateFile";
		if(result <= 0) {
			viewName = "common/error";
		}
		
		return viewName;
	}
	
}
