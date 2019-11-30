package com.sesame.salab.admin.model.vo;

import java.io.Serializable;

public class Admin implements Serializable {
	private static final long SerialVersionUID = 1008L;
	
	private String adminid;
	private String adminpwd;
	
	public Admin() {}

	public Admin(String adminid, String adminpwd) {
		super();
		this.adminid = adminid;
		this.adminpwd = adminpwd;
	}

	public String getAdminid() {
		return adminid;
	}

	public void setAdminid(String adminid) {
		this.adminid = adminid;
	}

	public String getAdminpwd() {
		return adminpwd;
	}

	public void setAdminpwd(String adminpwd) {
		this.adminpwd = adminpwd;
	}

	@Override
	public String toString() {
		return "Admin [adminid=" + adminid + ", adminpwd=" + adminpwd + "]";
	}
	
	

}
