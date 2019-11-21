package com.sesame.salab.qna.model.vo;

import java.io.Serializable;
import java.sql.Date;

public class Qna implements Serializable {
	
	private static final long SerialVersionUID = 1009L;
	
	
	
	private int qnano;
	private String adminid;
	private int userno;
	private String qnatitle;
	private String qnacontent;
	private Date qnadate;
	private String qnareqlycontent;
	private Date qnareplydate;
	private String qnareplyyn;
	
	public Qna() {

	}

	public Qna(int qnano, String adminid, int userno, String qnatitle, String qnacontent, Date qnadate,
			String qnareqlycontent, Date qnareplydate, String qnareplyyn) {
		super();
		this.qnano = qnano;
		this.adminid = adminid;
		this.userno = userno;
		this.qnatitle = qnatitle;
		this.qnacontent = qnacontent;
		this.qnadate = qnadate;
		this.qnareqlycontent = qnareqlycontent;
		this.qnareplydate = qnareplydate;
		this.qnareplyyn = qnareplyyn;
	}

	public int getQnano() {
		return qnano;
	}

	public void setQnano(int qnano) {
		this.qnano = qnano;
	}

	public String getAdminid() {
		return adminid;
	}

	public void setAdminid(String adminid) {
		this.adminid = adminid;
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	public String getQnatitle() {
		return qnatitle;
	}

	public void setQnatitle(String qnatitle) {
		this.qnatitle = qnatitle;
	}

	public String getQnacontent() {
		return qnacontent;
	}

	public void setQnacontent(String qnacontent) {
		this.qnacontent = qnacontent;
	}

	public Date getQnadate() {
		return qnadate;
	}

	public void setQnadate(Date qnadate) {
		this.qnadate = qnadate;
	}

	public String getQnareqlycontent() {
		return qnareqlycontent;
	}

	public void setQnareqlycontent(String qnareqlycontent) {
		this.qnareqlycontent = qnareqlycontent;
	}

	public Date getQnareplydate() {
		return qnareplydate;
	}

	public void setQnareplydate(Date qnareplydate) {
		this.qnareplydate = qnareplydate;
	}

	public String getQnareplyyn() {
		return qnareplyyn;
	}

	public void setQnareplyyn(String qnareplyyn) {
		this.qnareplyyn = qnareplyyn;
	}

	@Override
	public String toString() {
		return "Qna [qnano=" + qnano + ", adminid=" + adminid + ", userno=" + userno + ", qnatitle=" + qnatitle
				+ ", qnacontent=" + qnacontent + ", qnadate=" + qnadate + ", qnareqlycontent=" + qnareqlycontent
				+ ", qnareplydate=" + qnareplydate + ", qnareplyyn=" + qnareplyyn + "]";
	}
	
	

}
