package com.sesame.salab.project.model.service;

import java.util.List;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.project.model.vo.ProjectMember;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

public interface ProjectService {

	int createProject(Project project);

	List<Member> autocomp(String text);

	String projectInvite(String uno);

	int selectProjectNo(Project project);

	Project selectProject(Project project);

	List<ProjectMember> selectProjectMemeber(int projectno);

	int inviteEmailCheck(String useremail, int projectno);

	int changeAuth(Member_Project member_project);

	int memberKick(Member_Project member_project);

	int selectProjectnoAfterCreated(int userno);

	List<ProjectFile> selectMainFileList(int projectno);

	int projectImgInsert(Project project);
}
