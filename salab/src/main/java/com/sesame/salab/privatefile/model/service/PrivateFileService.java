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

	int pfRename(FileList pfile);

	PrivateFile selectFile(PrivateFile pfile);

	int fileCopy(PrivateFile file);

	int fileDelete(FileList pfile);

	List<FileList> trashCanAll(int userno);

	int fileDeleteUndo(FileList pfile);

	int filePermanentDelete(FileList pfile);

	int prRename(FileList pfile);

	int teamfileDelete(FileList pfile);

	int teamFileDeleteUndo(FileList pfile);

	int teamFilePermanentDelete(FileList pfile);
	
}
