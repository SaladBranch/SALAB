package com.sesame.salab.privatefile.model.service;

import java.util.List;

import com.sesame.salab.common.FileList;
import com.sesame.salab.page.model.vo.Page;
import com.sesame.salab.privatefile.model.vo.PrivateFile;

public interface PrivateFileService {

	int insertNewPrivateFile(PrivateFile pfile);

	List<PrivateFile> selectList(int userno);

	PrivateFile createPage(int i);

	int changeLastModified(PrivateFile pfile);

	int updateThumbnail(Page page);

	List<FileList> selectListAll(int userno);

	PrivateFile selectOne(Page page);

	int pfRename(PrivateFile pfile);
	
}
