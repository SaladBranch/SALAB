package com.sesame.salab.notice.model.service;

import java.util.HashMap;
import java.util.List;

import com.sesame.salab.notice.model.vo.Notice;

public interface NoticeService {
	List<Notice> selectList(HashMap<String, Object> map);
}
