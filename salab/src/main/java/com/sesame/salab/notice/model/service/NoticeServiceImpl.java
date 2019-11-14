package com.sesame.salab.notice.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.notice.model.dao.NoticeDao;
import com.sesame.salab.notice.model.vo.Notice;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService{
	
	@Autowired
	private NoticeDao noticeDao;
	
	@Override
	public List<Notice> selectList(HashMap<String, Object> map){
		return noticeDao.selectList(map);
	}

}
