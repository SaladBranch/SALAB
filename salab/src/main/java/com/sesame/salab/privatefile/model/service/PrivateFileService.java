package com.sesame.salab.privatefile.model.service;

import java.util.List;

import com.sesame.salab.privatefile.model.vo.PrivateFile;

public interface PrivateFileService {

	int insertNewPage(String userno);

	List<PrivateFile> selectList(int userno);
	
}
