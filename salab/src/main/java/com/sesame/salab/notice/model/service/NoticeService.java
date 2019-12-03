package com.sesame.salab.notice.model.service;

import java.util.List;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.vo.Notice;

public interface NoticeService {
	List<Notice> noticeList(Paging paging);

	int listCount();

	Notice selectOne(int noticeno);

	int noticeInsert(Notice notice);

	int noticeDelete(int noticeno);
	
}
