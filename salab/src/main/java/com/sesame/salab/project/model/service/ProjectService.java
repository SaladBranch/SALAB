package com.sesame.salab.project.model.service;

import java.util.List;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.project.model.vo.Project;

public interface ProjectService {

	int createProject(Project project);

	List<Member> autocomp(String text);

	String projectInvite(String uno);

	int selectProjectNo(Project project);

}
