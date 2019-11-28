package com.sesame.salab.projectnotice.model.service;

import java.util.HashMap;
import java.util.List;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.vo.Notice;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;
import com.sesame.salab.qna.model.vo.Qna;

public interface ProjectnoticeService {

	List<Projectnotice> searchNoticeList(Projectnotice projectnotice);

	int listCount(int projectno);

	List<Projectnotice> noticeList(Paging paging);

	List<Qna> testList(HashMap<String, Object> map);

	void noticeRegist(Projectnotice projectnotice);

	Projectnotice selectTeamNotice(Projectnotice projectnotice);

	int modifiedNotice(Projectnotice projectnotice);

	int deleteNotice(Projectnotice projectnotice);

}
