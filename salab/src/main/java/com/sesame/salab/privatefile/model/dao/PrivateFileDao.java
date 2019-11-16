package com.sesame.salab.privatefile.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.privatefile.model.vo.PrivateFile;

@Repository
public class PrivateFileDao {

	@Autowired
	private SqlSession sqlSession;
	
	public int insertNewPrivateFile(String userno) {
		// TODO Auto-generated method stub
		return sqlSession.insert("privatefileMapper.insertNewPrivateFile", Integer.parseInt(userno));
	}

	public List<PrivateFile> selectList(int userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("privatefileMapper.selectList", userno);
	}

	public PrivateFile createPage(String userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("privatefileMapper.createPage", Integer.parseInt(userno));
	}

}
