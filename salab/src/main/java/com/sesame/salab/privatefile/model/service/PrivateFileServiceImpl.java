package com.sesame.salab.privatefile.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.common.FileList;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.dao.PrivateFileDao;
import com.sesame.salab.privatefile.model.vo.PrivateFile;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

@Service("PrivateFileService")
public class PrivateFileServiceImpl implements PrivateFileService {

	@Autowired
	private PrivateFileDao pfDao;
	
	@Override
	public int insertNewPrivateFile(PrivateFile pfile) {
		// 새파일 인서트용 메소드 
		return pfDao.insertNewPrivateFile(pfile);
	}

	@Override
	public List<PrivateFile> selectList(int userno) {
		// 로그인시에 유저메인페이지에 보여질 파일에대한 정보 select용 메소드
		return pfDao.selectList(userno);
	}

	@Override
	public PrivateFile createPage(int userno) {
		// 새파일 생성시 페이지생성을 위해 fileno 셀렉트
		return pfDao.createPage(userno);
	}

	@Override
	public int changeLastModified(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return pfDao.changeLastModified(pfile);
	}

	@Override
	public int updateThumbnail(Page page) {
		// 저장, 전체저장시 파일의 썸네일 변경하는 메소드
		return pfDao.updateThumbnail(page);
	}

	@Override
	public List<FileList> selectListAll(int userno) {
		return pfDao.selectListAll(userno);
	}

	@Override
	public PrivateFile selectOne(Page page) {
		// TODO Auto-generated method stub
		return pfDao.selectOne(page);
	}

	@Override
	public PrivateFile selectFile(PrivateFile pfile) {
		// TODO Auto-generated method stub
		return pfDao.selectFile(pfile);
	}

	@Override
	public int fileCopy(PrivateFile file) {
		// TODO Auto-generated method stub
		return pfDao.fileCopy(file);
	}

	@Override
	public List<FileList> trashCanAll(int userno) {
		// TODO Auto-generated method stub
		return pfDao.trashCanAll(userno);
	}

	@Override
	public int pfRename(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.pfRename(pfile);
	}

	@Override
	public int prRename(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.prRename(pfile);
	}

	@Override
	public int fileDelete(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.fileDelete(pfile);
	}

	@Override
	public int teamfileDelete(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.teamfileDelete(pfile);
	}

	@Override
	public int fileDeleteUndo(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.fileDeleteUndo(pfile);
	}

	@Override
	public int teamFileDeleteUndo(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.teamFileDeleteUndo(pfile);
	}

	@Override
	public int filePermanentDelete(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.filePermanentDelete(pfile);
	}

	@Override
	public int teamFilePermanentDelete(FileList pfile) {
		// TODO Auto-generated method stub
		return pfDao.teamFilePermanentDelete(pfile);
	}

	@Override
	public List<FileList> searchKeyword(Map map) {
		// TODO Auto-generated method stub
		return pfDao.searchKeyword(map);
	}

	@Override
	public List<FileList> selectPrivateAll(int userno) {
		// TODO Auto-generated method stub
		return pfDao.selectPrivateAll(userno);
	}

}
