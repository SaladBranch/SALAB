package com.sesame.salab.projectnotice.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.common.paging.model.vo.Paging;
import com.sesame.salab.notice.model.vo.Notice;
import com.sesame.salab.projectnotice.model.dao.projectnoticeDao;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;
import com.sesame.salab.qna.model.vo.Qna;

@Service("projectnoticeService")
public class ProjectnoticeImpl implements ProjectnoticeService{

	@Autowired
	private projectnoticeDao pnDao;

	@Override
	public List<Projectnotice> searchNoticeList(Projectnotice projectnotice) {
		return pnDao.searchNoticeList(projectnotice);
	}

	@Override
	public int listCount(int projectno) {
		// TODO Auto-generated method stub
		return pnDao.listCount(projectno);
	}

	@Override
	public List<Projectnotice> noticeList(Paging paging) {
		// TODO Auto-generated method stub
		return  pnDao.noticeList(paging);
	}

	@Override
	public List<Projectnotice> testList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return pnDao.testList(map);
	}

	@Override
	public void noticeRegist(Projectnotice projectnotice) {
		pnDao.noticeRegist(projectnotice);		
	}

	@Override
	public Projectnotice selectTeamNotice(Projectnotice projectnotice) {
		return pnDao.selectTeamNotice(projectnotice);
	}

	@Override
	public int modifiedNotice(Projectnotice projectnotice) {
		return pnDao.modifiedNotice(projectnotice);
		
	}

	@Override
	public int deleteNotice(Projectnotice projectnotice) {
		return pnDao.deleteNotice(projectnotice);
	}
	
	
}
