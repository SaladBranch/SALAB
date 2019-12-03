package com.sesame.salab.notice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.dao.NoticeDao;
import com.sesame.salab.notice.model.vo.Notice;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService{
	
	@Autowired
	private NoticeDao noticeDao;

	@Override
	public List<Notice> noticeList(Paging paging) {
		return noticeDao.noticeList(paging);
	}

	@Override
	public int listCount() {
		return noticeDao.listCount();
	}

	@Override
	public Notice selectOne(int noticeno) {
		return noticeDao.selectOne(noticeno);
	}

	@Override
	public int noticeInsert(Notice notice) {
		return noticeDao.noticeInsert(notice);
	}

}
