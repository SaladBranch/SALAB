package com.sesame.salab.admin.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.admin.model.vo.Admin;

@Repository("adminDao")
public class AdminDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public Admin loginCheck(Admin admin) {
		return sqlSession.selectOne("adminMapper.loginCheck", admin);
	}

}
