package com.sesame.salab.privatefile.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.common.FileList;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Repository
public class PrivateFileDao {

	@Autowired
	private SqlSession sqlSession;
	
	public int insertNewPrivateFile(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.insert("privatefileMapper.insertNewPrivateFile", pfile);
	}

	public List<PrivateFile> selectList(int userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("privatefileMapper.selectList", userno);
	}

	public PrivateFile createPage(int userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("privatefileMapper.createPage", userno);
	}

	public int changeLastModified(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.update("privatefileMapper.changeLastModified", pfile);
	}

	public int updateThumbnail(Page page) {
		// TODO Auto-generated method stub
		return sqlSession.update("privatefileMapper.updateThumbnail", page);
	}

	public List<FileList> selectListAll(int userno) {
		return sqlSession.selectList("privatefileMapper.selectListAll", userno);
	}

	public PrivateFile selectOne(Page page) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("privatefileMapper.selectOne", page);
	}

	public int pfRename(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.update("privatefileMapper.pfRename", pfile);
	}

	public PrivateFile selectFile(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("privatefileMapper.selectFile", pfile);
	}

	public int fileCopy(PrivateFile file) {
		// TODO Auto-generated method stub
		return sqlSession.insert("privatefileMapper.fileCopy", file);
	}

	public int fileDelete(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.update("privatefileMapper.fileDelete", pfile);
	}

	public List<FileList> trashCanAll(int userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("privatefileMapper.trashCanAll", userno);
	}

	public int fileDeleteUndo(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.update("privatefileMapper.fileDeleteUndo", pfile);
	}

	public int filePermanentDelete(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return sqlSession.delete("privatefileMapper.filePermanentDelete", pfile);
	}

}
