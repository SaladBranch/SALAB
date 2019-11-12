package com.sesame.salab.project.model.vo;

import java.sql.Date;

public class Project implements java.io.Serializable{
	private static final long serialVersionUID = 1004L;

	private int projectno;
	private String projectname;
	private Date projectcreatedate;
	private Date projectlastmodified;
	private String projectimage_o;
	private String projectimage_r;
	private int userno;
	
	public Project() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Project(int projectno, String projectname, Date projectcreatedate, Date projectlastmodified,
			String projectimage_o, String projectimage_r, int userno) {
		super();
		this.projectno = projectno;
		this.projectname = projectname;
		this.projectcreatedate = projectcreatedate;
		this.projectlastmodified = projectlastmodified;
		this.projectimage_o = projectimage_o;
		this.projectimage_r = projectimage_r;
		this.userno = userno;
	}

	public int getProjectno() {
		return projectno;
	}

	public void setProjectno(int projectno) {
		this.projectno = projectno;
	}

	public String getProjectname() {
		return projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public Date getProjectcreatedate() {
		return projectcreatedate;
	}

	public void setProjectcreatedate(Date projectcreatedate) {
		this.projectcreatedate = projectcreatedate;
	}

	public Date getProjectlastmodified() {
		return projectlastmodified;
	}

	public void setProjectlastmodified(Date projectlastmodified) {
		this.projectlastmodified = projectlastmodified;
	}

	public String getProjectimage_o() {
		return projectimage_o;
	}

	public void setProjectimage_o(String projectimage_o) {
		this.projectimage_o = projectimage_o;
	}

	public String getProjectimage_r() {
		return projectimage_r;
	}

	public void setProjectimage_r(String projectimage_r) {
		this.projectimage_r = projectimage_r;
	}
	
	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	@Override
	public String toString() {
		return "Project [projectno=" + projectno + ", projectname=" + projectname + ", projectcreatedate="
				+ projectcreatedate + ", projectlastmodified=" + projectlastmodified + ", projectimage_o="
				+ projectimage_o + ", projectimage_r=" + projectimage_r + ", userno=" + userno + "]";
	}

}
