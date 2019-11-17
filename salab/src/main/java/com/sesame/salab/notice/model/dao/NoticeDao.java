package com.sesame.salab.notice.model.dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.notice.model.vo.Notice;

@Repository("noticeDao")
public class NoticeDao {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	public List<Notice> selectList(HashMap<String, Object> map) {
		return sqlSession.selectList("noticeMapper.selectList", map);
	}

}
