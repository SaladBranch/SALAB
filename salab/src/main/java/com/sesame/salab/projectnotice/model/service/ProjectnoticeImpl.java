package com.sesame.salab.projectnotice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.projectnotice.model.dao.projectnoticeDao;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;

@Service("projectnoticeService")
public class ProjectnoticeImpl implements ProjectnoticeService{

	@Autowired
	private projectnoticeDao pnDao;

	@Override
	public List<Projectnotice> searchNoticeList(Projectnotice projectnotice) {
		return pnDao.searchNoticeList(projectnotice);
	}
	
	
}
