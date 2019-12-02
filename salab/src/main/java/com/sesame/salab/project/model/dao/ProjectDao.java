package com.sesame.salab.project.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.vo.Member_Project;
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
		return sqlSession.selectList("projectMapper.selectProjectMemeber", projectno);
	}

	public int inviteEmailCheck(String useremail,int projectno) {
		int result=0;
		Integer membercheck= sqlSession.selectOne("projectMapper.enrolledEmailCheck", useremail);
		 if(membercheck ==null) {
			 System.out.println("등록되지않은 멤버");
		 }else {
			 HashMap<String,Object> map = new HashMap<String,Object>();
			 map.put("projectno", projectno);
			 map.put("userno",membercheck);
			 System.out.println("등록된 멤버");
			 int joinedCheck= sqlSession.selectOne("projectMapper.joinedMemberCheck", map);
			 if(joinedCheck ==0) {
				 System.out.println("초대가능멤버");
				 result=2;
			 }else {
				 System.out.println("이미초대된멤버");
				 result=1;
			 }
		 }
		 
		 return result;
	}

	public int changeAuth(Member_Project member_project) {
		return sqlSession.update("member_projectMapper.changeAuth", member_project);
	}

	public int memberKick(Member_Project member_project) {
		return sqlSession.delete("member_projectMapper.memberKick", member_project);
	}

	public int selectProjectnoAfterCreated(int userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("projectMapper.selectProjectnoAfterCreated", userno);
	}

}
