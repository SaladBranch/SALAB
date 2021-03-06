package com.sesame.salab.project.model.vo;

import java.sql.Date;
//project main page 에서 member data담는 용도로 사용.
public class ProjectMember implements java.io.Serializable{
	private static final long serialVersionUID = 2404L;

	
	private int userno;
	private String username;
	private Date projectjoindate;
	private String userauth;
	private String userprofile_r;
	
	public ProjectMember() {
		// TODO Auto-generated constructor stub
	}

	public ProjectMember(int userno, String username, Date projectjoindate, String userauth, String userprofile_r) {
		super();
		this.userno = userno;
		this.username = username;
		this.projectjoindate = projectjoindate;
		this.userauth = userauth;
		this.userprofile_r = userprofile_r;
	}

	@Override
	public String toString() {
		return "ProjectMember [userno=" + userno + ", username=" + username + ", projectjoindate=" + projectjoindate
				+ ", userauth=" + userauth + ", userprofile_r=" + userprofile_r + "]";
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getProjectjoindate() {
		return projectjoindate;
	}

	public void setProjectjoindate(Date projectjoindate) {
		this.projectjoindate = projectjoindate;
	}

	public String getUserauth() {
		return userauth;
	}

	public void setUserauth(String userauth) {
		this.userauth = userauth;
	}

	public String getUserprofile_r() {
		return userprofile_r;
	}

	public void setUserprofile_r(String userprofile_r) {
		this.userprofile_r = userprofile_r;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}