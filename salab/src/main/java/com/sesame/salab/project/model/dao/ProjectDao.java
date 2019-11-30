package com.sesame.salab.project.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.project.model.vo.ProjectMember;

@Repository
public class ProjectDao {

	@Autowired
	private SqlSession sqlSession;
	
	public int createProject(Project project) {
		// TODO Auto-generated method stub
		return sqlSession.insert("projectMapper.createProject", project);
	}

	public List<Member> autocomp(String text) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("projectMapper.autocomp", text);
	}

	public String projectInvest(String uno) {
		// TODO Auto-generated method stub
		Member m =sqlSession.selectOne("projectMapper.projectInvest", uno);
		return m.getUseremail();
	}

	public int seletProjectNo(Project project) {
		// TODO Auto-generated method stub
		Project p = sqlSession.selectOne("projectMapper.selectProjectNo", project);
		return p.getProjectno();
	}

	public Project selectProject(Project project) {
		return sqlSession.selectOne("projectMapper.selectProject", project);
	}

	public List<ProjectMember> selectProjectMemeber(int projectno) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("projectMapper.selectProjectMemeber", projectno);
	}

}
