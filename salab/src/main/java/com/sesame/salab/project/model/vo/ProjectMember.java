package com.sesame.salab.project.model.vo;

import java.sql.Date;

public class ProjectMember implements java.io.Serializable{
	private static final long serialVersionUID = 2404L;


	private int userno;
	private String username;
	private Date projectjoindate;
	private String userauth;
	private String userprofile_o;
	
	public ProjectMember() {
		// TODO Auto-generated constructor stub
	}
	
	public ProjectMember(int userno, String username, Date projectjoindate, String userauth, String userprofile_o) {
		super();
		this.userno = userno;
		this.username = username;
		this.projectjoindate = projectjoindate;
		this.userauth = userauth;
		this.userprofile_o = userprofile_o;
	}

	@Override
	public String toString() {
		return "ProjectMember [userno=" + userno + ", username=" + username + ", projectjoindate=" + projectjoindate
				+ ", userauth=" + userauth + ", userprofile_o=" + userprofile_o + "]";
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

	public String getUserprofile_o() {
		return userprofile_o;
	}

	public void setUserprofile_o(String userprofile_o) {
		this.userprofile_o = userprofile_o;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


}