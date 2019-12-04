package com.sesame.salab.faq.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.faq.model.vo.Faq;

@Repository("faqDao")
public class FaqDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Faq> faqList() {
		return sqlSession.selectList("faqMapper.selectList");
	}

	public List<Faq> adminFaqList() {
		return sqlSession.selectList("faqMapper.selectList");
	}

}
