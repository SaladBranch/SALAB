package com.sesame.salab.member_project.model.vo;

import java.sql.Date;

public class Member_Project implements java.io.Serializable{
	private static final long serialVersionUID = 1003L;
	
	private int projectno;
	private int userno;
	private Date projectjoindate;
	private String userauth;
	
	public Member_Project() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Member_Project(int projectno, int userno, Date projectjoindate, String userauth) {
		super();
		this.projectno = projectno;
		this.userno = userno;
		this.projectjoindate = projectjoindate;
		this.userauth = userauth;
	}

	public int getProjectno() {
		return projectno;
	}

	public void setProjectno(int projectno) {
		this.projectno = projectno;
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
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

	@Override
	public String toString() {
		return "Member_Project [projectno=" + projectno + ", userno=" + userno + ", projectjoindate=" + projectjoindate
				+ ", userauth=" + userauth + "]";
	}
	
}
