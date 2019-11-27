package com.sesame.salab.projectnotice.model.vo;

import java.io.Serializable;
import java.sql.Date;

public class Projectnotice implements Serializable {

	private static final long SerialVersionUID = 1025L;
	
	private int pnoticeno;
	private int projectno;
	private String pnoticetitle;
	private String pnoticecontent;
	private Date pnoticedate;
	private String pnoticewriter;
	
	public Projectnotice(){}

	public Projectnotice(int pnoticeno, int projectno, String pnoticetitle, String pnoticecontent, Date pnoticedate,
			String pnoticewriter) {
		super();
		this.pnoticeno = pnoticeno;
		this.projectno = projectno;
		this.pnoticetitle = pnoticetitle;
		this.pnoticecontent = pnoticecontent;
		this.pnoticedate = pnoticedate;
		this.pnoticewriter = pnoticewriter;
	}

	@Override
	public String toString() {
		return "Projectnotice [pnoticeno=" + pnoticeno + ", projectno=" + projectno + ", pnoticetitle=" + pnoticetitle
				+ ", pnoticecontent=" + pnoticecontent + ", pnoticedate=" + pnoticedate + ", pnoticewriter="
				+ pnoticewriter + "]";
	}

	public int getPnoticeno() {
		return pnoticeno;
	}

	public void setPnoticeno(int pnoticeno) {
		this.pnoticeno = pnoticeno;
	}

	public int getProjectno() {
		return projectno;
	}

	public void setProjectno(int projectno) {
		this.projectno = projectno;
	}

	public String getPnoticetitle() {
		return pnoticetitle;
	}

	public void setPnoticetitle(String pnoticetitle) {
		this.pnoticetitle = pnoticetitle;
	}

	public String getPnoticecontent() {
		return pnoticecontent;
	}

	public void setPnoticecontent(String pnoticecontent) {
		this.pnoticecontent = pnoticecontent;
	}

	public Date getPnoticedate() {
		return pnoticedate;
	}

	public void setPnoticedate(Date pnoticedate) {
		this.pnoticedate = pnoticedate;
	}

	public String getPnoticewriter() {
		return pnoticewriter;
	}

	public void setPnoticewriter(String pnoticewriter) {
		this.pnoticewriter = pnoticewriter;
	}

	
	
}
