package com.sesame.salab.projectfile.model.service;

import java.util.List;

import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

public interface ProjectFileService {

	List<ProjectFile> getFileList(int projectno);

	int insertNewTeamFile(ProjectFile prfile);

	ProjectFile getFileNo(int projectno);

	ProjectFile selectOne(Page page);
	
}
