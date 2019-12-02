
package com.sesame.salab.common;

import java.awt.GraphicsEnvironment;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.service.Member_ProjectService;
import com.sesame.salab.page.model.dao.MongoService;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.service.PrivateFileService;
import com.sesame.salab.privatefile.model.vo.PrivateFile;
import com.sesame.salab.project.model.vo.Project;

@Controller
public class PageController {
	private static final Logger logger = LoggerFactory.getLogger(PageController.class);
	
	@Autowired
	private PrivateFileService pfService;
	@Autowired
	private Member_ProjectService mpService;
	
	@RequestMapping(value="recentFile.do")
	public String toRecentFileMethod(HttpSession session, HttpServletRequest request, String sort) {
		String viewFileName = "recentFile/recentFile";
		MongoService mgService = new MongoService();
		Member member = (Member) session.getAttribute("loginMember");
		
		List<FileList> fileList = pfService.selectListAll(member.getUserno());
		if(sort.equals("recent")) {
			Collections.sort(fileList, new Comparator<FileList>() {
				@Override
				public int compare(FileList f1, FileList f2) {
					return f2.getPfilelastmodified().compareTo(f1.getPfilelastmodified());
				}
			});
		}else if(sort.equals("name")) {
			Collections.sort(fileList, new Comparator<FileList>() {
				@Override
				public int compare(FileList f1, FileList f2) {
					return f2.getPfiletitle().compareTo(f1.getPfiletitle());
				}
			});
		}else if(sort.equals("date")) {
			Collections.sort(fileList, new Comparator<FileList>() {
				@Override
				public int compare(FileList f1, FileList f2) {
					return f1.getPfilecreatedate().compareTo(f2.getPfilecreatedate());
				}
			});
		}
			
		if(fileList != null) {
			for(FileList pf : fileList) {
				Page p = new Page();
				p.setFileno(pf.getPfileno());
				p.setUserno(pf.getUserno());
				p.setPageno(1);
				Page page = mgService.findOne("page", p);
				pf.setPfilethumbnail(page.getThumbnail());
			}
			mgService.close();
		
			request.setAttribute("privateFile", fileList);
			request.setAttribute("sort", sort);
		}else {
			viewFileName = "common/error";
		}
		List<Project> projectList = mpService.selectProjectList(member.getUserno());
		session.setAttribute("myProjectList", projectList);
		
		return viewFileName;
	}
	@RequestMapping(value="privateFile.do")
	public String toPrivateFileMethod(HttpSession session, HttpServletRequest request, String sort) {
		String viewFileName = "privateFile/privateFile";
		MongoService mgService = new MongoService();
		Member member = (Member)session.getAttribute("loginMember");
		
		List<PrivateFile> privateFile = pfService.selectList(member.getUserno());
		if(sort.equals("recent")) {
			Collections.sort(privateFile, new Comparator<PrivateFile>() {
				@Override
				public int compare(PrivateFile p1, PrivateFile p2) {
					return p2.getPfilelastmodified().compareTo(p1.getPfilelastmodified());
				}
			});
		}else if(sort.equals("name")) {
			Collections.sort(privateFile, new Comparator<PrivateFile>() {
				@Override
				public int compare(PrivateFile p1, PrivateFile p2) {
					return p2.getPfiletitle().compareTo(p1.getPfiletitle());
				}
			});
		}else if(sort.equals("date")) {
			Collections.sort(privateFile, new Comparator<PrivateFile>() {
				@Override
				public int compare(PrivateFile p1, PrivateFile p2) {
					return p1.getPfilecreatedate().compareTo(p2.getPfilecreatedate());
				}
			});
		}
		if( privateFile != null) {
			for(PrivateFile pf : privateFile) {
				Page p = new Page();
				p.setFileno(pf.getPfileno());
				p.setUserno(pf.getUserno());
				p.setPageno(1);
				logger.info(p.toString());
				Page page = mgService.findOne("page", p);
				logger.info("thumbnail :: " + page.getThumbnail());
				pf.setPfilethumbnail(page.getThumbnail());
			}
			mgService.close();
		
			request.setAttribute("privateFile", privateFile);
			request.setAttribute("sort", sort);
		}else {
			viewFileName = "common/error";
		}
			
		return viewFileName;
	}

	@RequestMapping(value="findPwd.do")
	public String toFindPwdMethod() {
		return "findPwd/findPwd";
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
	
	// 관리자 페이지
	@RequestMapping(value="adminLogin.do")
	public String toAdminLoginMethod() {
		return "admin/adminLogin";
	}
	
	@RequestMapping(value="adminMember.do")
	public String toAdminMemberMethod() {
		return "admin/adminMember";
	}
	
	@RequestMapping(value="adminNotice.do")
	public String toAdminNoticeMethod() {
		return "admin/adminNotice";
	}
	
	@RequestMapping(value="adminFaq.do")
	public String toAdminFaqMethod() {
		return "admin/adminFaq";
	}
	
	@RequestMapping(value="adminQna.do")
	public String toAdminQnaMethod() {
		return "admin/adminQna";
	}
	
	// 관리자 페이지
	

	
	@RequestMapping(value="trashCan.do")
	public String toTrashCanMethod() {
		return "trashCan/trashCan";
	}
  
	@RequestMapping(value="epFile.do")
	public String toEditPrivateFileMethod(@RequestParam("userno")String userno, @RequestParam("fileno")String fileno, HttpServletRequest req) throws UnsupportedEncodingException {
		MongoService mgService = new MongoService();
		Page page = new Page();
		page.setUserno(Integer.parseInt(userno));
		page.setFileno(Integer.parseInt(fileno));
		List<Page> pageList = (List<Page>)mgService.findPage("page", page);

		// 컴퓨터에 갖고있는 font 가져오기
		List<String> fontList = new ArrayList<String>();
		GraphicsEnvironment e = GraphicsEnvironment.getLocalGraphicsEnvironment();
		String[] fonts = e.getAvailableFontFamilyNames();
		
		for (String font : fonts) {
			fontList.add(font);
		}

		req.setAttribute("pageList", pageList);
		req.setAttribute("userno", page.getUserno());
		req.setAttribute("fileno", page.getFileno());
		req.setAttribute("fontList", fontList);
		return "editPrivateFile/editPrivateFile";
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
   	
   	@RequestMapping(value="teamNoticeList.do")
   	public String teamNoticeListMethod() {
   		return "project/teamNoticeList";
   	}

   	@RequestMapping(value="teamNoticeWrite.do")
   	public String teamNoticeWriteMethod() {
   		return "project/teamNoticeWrite";
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
