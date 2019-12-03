package com.sesame.salab.member_project.model.service;

import java.util.List;

import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.project.model.vo.Project;

public interface Member_ProjectService {

	int insertTeamMember(Member_Project mp);

	List<Project> selectProjectList(int userno);

}
