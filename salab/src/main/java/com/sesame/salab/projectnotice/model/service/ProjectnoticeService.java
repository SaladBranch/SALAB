package com.sesame.salab.projectnotice.model.service;

import java.util.List;

import com.sesame.salab.projectnotice.model.vo.Projectnotice;

public interface ProjectnoticeService {

	List<Projectnotice> searchNoticeList(Projectnotice projectnotice);

}
