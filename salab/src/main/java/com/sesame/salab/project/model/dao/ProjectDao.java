package com.sesame.salab.project.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.member_project.model.vo.Member_Project;
import com.sesame.salab.project.model.vo.Project;
import com.sesame.salab.project.model.vo.ProjectMember;
import com.sesame.salab.projectfile.model.vo.ProjectFile;

@Repository
public class ProjectDao {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SqlSession sqlSession;
	
	public int createProject(Project project) {
		return sqlSession.insert("projectMapper.createProject", project);
	}

	public List<Member> autocomp(String text) {
		return sqlSession.selectList("projectMapper.autocomp", text);
	}

	public String projectInvest(String uno) {
		Member m =sqlSession.selectOne("projectMapper.projectInvest", uno);
		return m.getUseremail();
	}

	public int seletProjectNo(Project project) {
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
			 logger.info("DB에 등록되지않은 멤버");
		 }else {
			 HashMap<String,Object> map = new HashMap<String,Object>();
			 map.put("projectno", projectno);
			 map.put("userno",membercheck);
			 int joinedCheck= sqlSession.selectOne("projectMapper.joinedMemberCheck", map);
			 if(joinedCheck ==0) {
				 logger.info("초대가능멤버");
				 result=membercheck;
			 }else {
				 logger.info("해당 프로젝트에 이미초대된멤버");
				 result=-1;
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
		return sqlSession.selectOne("projectMapper.selectProjectnoAfterCreated", userno);
	}

	public List<ProjectFile> selectMainFileList(int projectno) {
		return sqlSession.selectList("ProjectfileMapper.selectMainFileList", projectno);
	}

	public List<ProjectFile> selectListAll(int projectno) {
		return sqlSession.selectList("ProjectfileMapper.selectListAll", projectno);
	}
	//프로젝트 이미지 삽입
	public int projectImgInsert(Project project) {
		return sqlSession.update("projectMapper.projectImgInsert", project);	
	}

}
