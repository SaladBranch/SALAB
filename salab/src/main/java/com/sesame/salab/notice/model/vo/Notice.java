package com.sesame.salab.notice.model.vo;

import java.io.Serializable;
import java.sql.Date;

public class Notice implements Serializable {
	private static final long SerialVersionUID = 1011L;
	
	private int noticeno;
	private String adminid;
	private String noticetitle;
	private String noticecontent;
	private Date noticedate;
	
	public Notice() {}

	public Notice(int noticeno, String adminid, String noticetitle, String noticecontent, Date noticedate) {
		super();
		this.noticeno = noticeno;
		this.adminid = adminid;
		this.noticetitle = noticetitle;
		this.noticecontent = noticecontent;
		this.noticedate = noticedate;
	}

	public int getNoticeno() {
		return noticeno;
	}

	public void setNoticeno(int noticeno) {
		this.noticeno = noticeno;
	}

	public String getAdminid() {
		return adminid;
	}

	public void setAdminid(String adminid) {
		this.adminid = adminid;
	}

	public String getNoticetitle() {
		return noticetitle;
	}

	public void setNoticetitle(String noticetitle) {
		this.noticetitle = noticetitle;
	}

	public String getNoticecontent() {
		return noticecontent;
	}

	public void setNoticecontent(String noticecontent) {
		this.noticecontent = noticecontent;
	}

	public Date getNoticedate() {
		return noticedate;
	}

	public void setNoticedate(Date noticedate) {
		this.noticedate = noticedate;
	}

	@Override
	public String toString() {
		return "Notice [noticeno=" + noticeno + ", adminid=" + adminid + ", noticetitle=" + noticetitle
				+ ", noticecontent=" + noticecontent + ", noticedate=" + noticedate + "]";
	}
	
	

}
