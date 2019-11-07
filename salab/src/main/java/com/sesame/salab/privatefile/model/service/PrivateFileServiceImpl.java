package com.sesame.salab.privatefile.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.privatefile.model.dao.PrivateFileDao;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Service("PrivateFileService")
public class PrivateFileServiceImpl implements PrivateFileService {

	@Autowired
	private PrivateFileDao pfDao;
	
	@Override
	public int insertNewPage(String userno) {
		// 새파일 인서트용 메소드 
		return pfDao.insertNewPage(userno);
	}

	@Override
	public List<PrivateFile> selectList(int userno) {
		// 로그인시에 유저메인페이지에 보여질 파일에대한 정보 select용 메소드
		return pfDao.selectList(userno);
	}

}
