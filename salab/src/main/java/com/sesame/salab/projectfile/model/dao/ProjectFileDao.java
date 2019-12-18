package com.sesame.salab.projectfile.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

@Repository
public class ProjectFileDao {
	
	@Autowired
	private SqlSession sqlSession;

	public List<ProjectFile> getFileList(int projectno) {
		return sqlSession.selectList("ProjectfileMapper.getFileList", projectno);
	}

	public int insertNewTeamFile(ProjectFile prfile) {
		return sqlSession.insert("ProjectfileMapper.insertNewTeamFile", prfile);
	}

	public ProjectFile getFileNo(int projectno) {
		return sqlSession.selectOne("ProjectfileMapper.getFileNo", projectno);
	}

	public ProjectFile selectOne(Page page) {
		return sqlSession.selectOne("ProjectfileMapper.selectOne", page);
	}

	public ProjectFile selectFile(ProjectFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("ProjectfileMapper.selectFile", pfile);
	}

	public int fileCopy(ProjectFile file) {
		// TODO Auto-generated method stub
		return sqlSession.insert("ProjectfileMapper.fileCopy", file);
	}

	public ProjectFile createPage(int projectno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("ProjectfileMapper.createPage", projectno);
	}

	public int changeLastModified(ProjectFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.update("ProjectfileMapper.changeLastModified", pfile);
	}
	
}
