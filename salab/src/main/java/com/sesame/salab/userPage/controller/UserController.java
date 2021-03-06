package com.sesame.salab.userPage.controller;


import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import javax.xml.crypto.Data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.userPage.model.service.userPageService;

@Controller
public class UserController {
	
	@Autowired
	private userPageService upService; 	
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass()); 

	
	@RequestMapping(value="test1.do", method= RequestMethod.POST)
	public String returntestPage(@RequestParam("newName") String newName) {
		logger.info("test 진입");
		logger.info("new Name : " + newName);
		return "userPage/userPageMain";
	}
	
	@RequestMapping(value="changeName.do", method= RequestMethod.POST)
	public String nameChangeMethod(@RequestParam("newName") String newName , @RequestParam("userno") String userno, HttpSession session ) {
		logger.info("changeName.do 진입");
		logger.info("new Name : " + newName);
		logger.info("userno : " + userno);
		logger.info(session.getAttribute("loginMember").toString());
		/*Map<Integer,String> userInfo = new HashMap<Integer,String>();
		userInfo.put(Integer.parseInt(userno), newName);
		*/
		Member changeMember = new Member();
		changeMember.setUserno(Integer.parseInt(userno));
		changeMember.setUsername(newName);
		
		Member member = (Member) session.getAttribute("loginMember");
		member.setUsername(newName);
		int result = upService.changeName(changeMember);
		session.setAttribute("loginMember", member);
		return "userPage/userPageMain";
		
		//유저정보로 닉네임 변경.
	}
	
	@RequestMapping(value="changePwd.do", method= RequestMethod.POST)
	public void passwordChangeMethod(@RequestParam("opass") String opass, @RequestParam("rpass") String rpass, HttpServletResponse response, HttpSession session ) throws IOException {
		Member member = (Member) session.getAttribute("loginMember");
		Member checkMember =new Member();
		checkMember.setUserpwd(opass);
		System.out.println("세션 : "+member.toString());
		logger.info("changePwd.do 진입");
		logger.info("opass : " + checkMember.getUserpwd() +",rpass =  "+rpass );
	 

		logger.info("비교 : " + bcryptPasswordEncoder.matches(checkMember.getUserpwd(), member.getUserpwd()) );
		response.setContentType("text/html; charset=UTF-8");

		PrintWriter out = response.getWriter();
		//기존 비밀번호 확인
		if( bcryptPasswordEncoder.matches(checkMember.getUserpwd(), member.getUserpwd()) ) {
			
			//변경 성공시
			checkMember.setUserpwd(rpass);
			member.setUserpwd(bcryptPasswordEncoder.encode(checkMember.getUserpwd()));
			int result = upService.changePwd(member);
			logger.info("비밀번호 변경 결과 : "+result);
			if(result== 1)out.append("success");
		}else {
			out.append("fail");
			//변경 실패시
		}
		out.flush();
		out.close();
		//기존패스워드가 맞는지 확인,
		//맞다면 변경 프로세스 진행.
		//틀릴 시 , 사후처리.
	}
	@RequestMapping(value="accountDelete.do", method= RequestMethod.POST)
	public void accountDeleteMethod(@RequestParam("password") String password, HttpServletResponse response, HttpSession session) throws IOException{
		logger.info("delete.do 진입");
		logger.info("입력된 password : " + password);
		
		Member member = (Member) session.getAttribute("loginMember");
		Member checkMember = new Member();
		checkMember.setUserpwd(password);

		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		
		if( bcryptPasswordEncoder.matches(checkMember.getUserpwd(), member.getUserpwd()) ) {
			logger.info("password Checking passed... userinfo: "+member.toString());
			member.setUserpwd(bcryptPasswordEncoder.encode(checkMember.getUserpwd()));
			//해당 멤버가 가지고 있는 팀 프로젝트 번호리스트 가져오기.
			List<Integer> projectNumList = upService.test(member);
			logger.info("유저가 LEADER로 있는 프로젝트 수 : "+ projectNumList.size());
			for(int i =0; i < projectNumList.size() ; i++){
					if(member.getUserlevel().equals("PREMIUM")) {
						//PREMIUM
						upService.searchPremium(projectNumList.get(i));
					}else {
						//STANDARD
						upService.searchNextLeader(projectNumList.get(i));		
					}
				}
				//유저 삭제
			upService.deleteAccount(member);
			out.append("success");
		}else {
			//패스워드가 다를 시,
			out.append("fail");
			
		}
		out.flush();
		out.close();
	
		//기존패스워드가 맞는지 확인,
		//맞다면 삭제 프로세스 진행.
		//틀릴 시 , 사후처리.
	}
	@RequestMapping(value="imgInsert.do", method=RequestMethod.POST)
	public String userImgInsertMethod(HttpServletRequest request,@RequestParam(name="upfiles", required=false) String upfiles, @RequestParam(name="ofilename",required=false) String ofilename, HttpSession session) throws IOException {
		Member member = (Member) session.getAttribute("loginMember");
		System.out.println("imgInsert.do 진입..."+member.toString());
		if (upfiles != null) {
			System.out.println("if 진입");
			String path = request.getSession().getServletContext().getRealPath("resources/userUpfiles");
			System.out.println("path  : "+path);
			
			String base64img = upfiles;
			String imgdata = base64img.split(",")[1];
			byte[] imageBytes = DatatypeConverter.parseBase64Binary(imgdata);
	
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String renameFileName =member.getUserno()+"u"+ sdf.format(new java.sql.Date(System.currentTimeMillis()))+ "." + ofilename.substring(ofilename.lastIndexOf('.') + 1);
				
			BufferedImage bufImg  = ImageIO.read(new ByteArrayInputStream(imageBytes));
			ImageIO.write(bufImg, "jpg", new File(path + "/" + renameFileName));

			member.setUserprofile_r(renameFileName);
			int result=upService.userImgInsert(member);
			if(result >0 ) {
				System.out.println("이미지업로드 성공.");
			}

		}
		return "redirect:userMain.do";
	}
}
