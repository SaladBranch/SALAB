package com.sesame.salab.projectnotice.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.notice.controller.NoticeController;
import com.sesame.salab.projectnotice.model.vo.Projectnotice;

@Repository("projectnoticeDao")
public class projectnoticeDao {

	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Projectnotice> searchNoticeList(Projectnotice projectnotice) {
		return  sqlSession.selectList("projectnoticeMapper.getNoticeList",projectnotice);
	}
	

}
