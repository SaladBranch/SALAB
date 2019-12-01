package com.sesame.salab.privatefile.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.common.FileList;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.dao.PrivateFileDao;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Service("PrivateFileService")
public class PrivateFileServiceImpl implements PrivateFileService {

	@Autowired
	private PrivateFileDao pfDao;
	
	@Override
	public int insertNewPrivateFile(String userno) {
		// 새파일 인서트용 메소드 
		return pfDao.insertNewPrivateFile(userno);
	}

	@Override
	public List<PrivateFile> selectList(int userno) {
		// 로그인시에 유저메인페이지에 보여질 파일에대한 정보 select용 메소드
		return pfDao.selectList(userno);
	}

	@Override
	public PrivateFile createPage(String userno) {
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

}
