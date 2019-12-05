package com.sesame.salab.projectfile.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.projectfile.model.dao.ProjectFileDao;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

@Service("ProjectFileService")
public class ProjectFileServiceImpl implements ProjectFileService{

	@Autowired
	private ProjectFileDao projectFileDao;
	
	@Override
	public List<ProjectFile> getFileList(int projectno) {
		return projectFileDao.getFileList(projectno);
	}

	@Override
	public int insertNewTeamFile(ProjectFile prfile) {
		return projectFileDao.insertNewTeamFile(prfile);
	}

	@Override
	public ProjectFile getFileNo(int projectno) {
		return projectFileDao.getFileNo(projectno);
	}

	@Override
	public ProjectFile selectOne(Page page) {
		return projectFileDao.selectOne(page);
	}
	
}
