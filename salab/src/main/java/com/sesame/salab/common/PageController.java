
package com.sesame.salab.common;

import java.awt.GraphicsEnvironment;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.member.model.service.MemberService;
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
	@Autowired
	private MemberService memberService;
	
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
					return f1.getPfiletitle().compareTo(f2.getPfiletitle());
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
				p.setPageno(1);
				if(pf.getPt().equals("private")) {
					p.setUserno(pf.getUserno());
					Page page = mgService.findOne("page", p);
					pf.setPfilethumbnail(page.getThumbnail());
				}else {
					p.setProjectno(pf.getUserno());
					Page page = mgService.findTeamOne("page", p);
					pf.setPfilethumbnail(page.getThumbnail());
				}
				
			}
			mgService.close();
		
			request.setAttribute("fileList", fileList);
			request.setAttribute("sort", sort);
		}else {
			viewFileName = "common/error";
		}
		List<Project> projectList = mpService.selectProjectList(member.getUserno());
		session.removeAttribute("myProjectList");
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
					return p1.getPfiletitle().compareTo(p2.getPfiletitle());
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
				Page page = mgService.findOne("page", p);
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
	@RequestMapping(value="adminMain.do")
	public String toAdminMainMethod() {
		return "admin/adminMain";
	}
	
	@RequestMapping(value="adminMemberList.do")
	public ModelAndView toAdminMemberMethod(ModelAndView mv, Member member,@RequestParam(value = "keyword", required = false) String keyword, @RequestParam(value="page", required=false) String currentPage) throws Exception  {
		
		int curPage;
		
		if(currentPage != null) {
			curPage = Integer.parseInt(currentPage);
		} else {
			curPage = 1;
		}
		
		if (keyword == null)
			keyword = "";
		
		int listCount = memberService.mlistCount(keyword); //DB에서 현재 총 Row수 가져옴 
		
		/*String lcount = String.valueOf(listCount);
		logger.info(lcount);
		logger.info(keyword);*/
		
		Paging paging = new Paging(); //현재 페이지 
		paging.setLimit(10);
		paging.setUnderlimit(5);
		paging.makePage(listCount, curPage);  //페이징 처리함 
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("paging", paging);
		map.put("keyword", keyword);
		
		List<Member> memberList = memberService.memberList(map);
		/*logger.info(paging.toString());*/
		
		if(memberList != null) {
			mv.addObject("memberList", memberList);
			mv.addObject("paging", paging);
			mv.addObject("keyword", keyword);
			mv.setViewName("admin/adminMember");
		}else {
			mv.addObject("message", "공지사항 조회 실패");
			mv.setViewName("common/error");
		}
		
		
		return mv;
	}
	
	@RequestMapping(value="adminMemberDetail.do")
	public ModelAndView toAdminMemberDetailMethod(ModelAndView mv,  @RequestParam(value="userno") int userno , @RequestParam(value="page", required=false) String currentPage) throws Exception{
		
		Member member = memberService.memberDetail(userno);
		
		if(member != null) {
			mv.addObject("member", member);
			mv.addObject("page", currentPage);
			mv.setViewName("admin/adminMemberDetail");
		}else {
			mv.addObject("message", "회원 조회 실패");
			mv.setViewName("common/error");
		}
		
		return mv;
	}
	
	@RequestMapping(value="adminNoticeInsert.do")
	public String toAdminNoticeInsertMethod() {
		return "admin/adminNoticeInsert";
	}
	
	@RequestMapping(value="adminFaq.do")
	public String toAdminFaqMethod() {
		return "admin/adminFaq";
	}
	
	@RequestMapping(value="adminFaqInsert.do")
	public String toAdminFaqInsertMethod() {
		return "admin/adminFaqInsert";
	}
	
	@RequestMapping(value="adminQna.do")
	public String toAdminQnaMethod() {
		return "admin/adminQna";
	}
	
	// 관리자 페이지
	

	
	@RequestMapping(value="trashCan.do")
	public String toTrashCanMethod(HttpSession session, HttpServletRequest request, String sort) {
		String viewFileName = "trashCan/trashCan";
		MongoService mgService = new MongoService();
		Member member = (Member) session.getAttribute("loginMember");
		List<FileList> fileList = pfService.trashCanAll(member.getUserno());

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
					return f1.getPfiletitle().compareTo(f2.getPfiletitle());
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
				p.setPageno(1);
				if(pf.getPt().equals("private")) {
					p.setUserno(pf.getUserno());
					Page page = mgService.findOne("page", p);
					pf.setPfilethumbnail(page.getThumbnail());
				}else {
					p.setProjectno(pf.getUserno());
					Page page = mgService.findTeamOne("page", p);
					pf.setPfilethumbnail(page.getThumbnail());
				}
				
			}
			mgService.close();
		
			request.setAttribute("fileList", fileList);
			request.setAttribute("sort", sort);
		}else {
			viewFileName = "common/error";
		}
		
		List<Project> projectList = mpService.selectProjectList(member.getUserno());
		session.setAttribute("myProjectList", projectList);
		
		return viewFileName;
	}
  
	@RequestMapping(value="epFile.do")
	public String toEditPrivateFileMethod(@RequestParam("userno")String userno, @RequestParam("fileno")String fileno, HttpServletRequest req) throws UnsupportedEncodingException {
		MongoService mgService = new MongoService();
		Page page = new Page();
		page.setUserno(Integer.parseInt(userno));
		page.setFileno(Integer.parseInt(fileno));
		List<Page> pageList = (List<Page>)mgService.findPage("page", page);
		
		PrivateFile pfile = pfService.selectOne(page);

		// 컴퓨터에 갖고있는 font 가져오기
		List<String> fontList = new ArrayList<String>();
		GraphicsEnvironment e = GraphicsEnvironment.getLocalGraphicsEnvironment();
		String[] fonts = e.getAvailableFontFamilyNames();
		
		for (String font : fonts) {
			fontList.add(font);
		}

		req.setAttribute("pfile", pfile);
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
   	public String teamNoticeWriteMethod(@RequestParam("projectno") int projectno,HttpServletRequest request) {
   		request.setAttribute("projectno", projectno);
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
   	
   	@RequestMapping(value="webTest.do")
   	public String webTest(FileList pfile, HttpServletRequest req) {
   		MongoService mgService = new MongoService();
   		Page page = new Page();
   		List<Page> pageList = null;
   		page.setFileno(pfile.getPfileno());
   		if(pfile.getPt().equals("private")) {
   			page.setUserno(pfile.getUserno());
   			pageList = mgService.findPage("page", page);
   		}else {
   			page.setProjectno(pfile.getUserno());
   			pageList = mgService.findTeamPage("page", page);
   		}
   		req.setAttribute("pageList", pageList);
   		
   		return "recentFile/webTest";
   	}
   	

	//승진 test
	@RequestMapping(value="testText.do")
	public String toTestTextPage() {
		return "testText";
	}
	
}
