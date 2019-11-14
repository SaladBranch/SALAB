package com.sesame.salab.faq.model.vo;

import java.io.Serializable;

public class Faq implements Serializable {
	private static final long SerialVersionUID = 1010L;
	
	private int faqno;
	private String adminid;
	private String faqcategory;
	private String faqtitle;
	private String faqcontent;
	
	public Faq() {}

	public Faq(int faqno, String adminid, String faqcategory, String faqtitle, String faqcontent) {
		super();
		this.faqno = faqno;
		this.adminid = adminid;
		this.faqcategory = faqcategory;
		this.faqtitle = faqtitle;
		this.faqcontent = faqcontent;
	}

	public int getFaqno() {
		return faqno;
	}

	public void setFaqno(int faqno) {
		this.faqno = faqno;
	}

	public String getAdminid() {
		return adminid;
	}

	public void setAdminid(String adminid) {
		this.adminid = adminid;
	}

	public String getFaqcategory() {
		return faqcategory;
	}

	public void setFaqcategory(String faqcategory) {
		this.faqcategory = faqcategory;
	}

	public String getFaqtitle() {
		return faqtitle;
	}

	public void setFaqtitle(String faqtitle) {
		this.faqtitle = faqtitle;
	}

	public String getFaqcontent() {
		return faqcontent;
	}

	public void setFaqcontent(String faqcontent) {
		this.faqcontent = faqcontent;
	}

	@Override
	public String toString() {
		return "Faq [faqno=" + faqno + ", adminid=" + adminid + ", faqcategory=" + faqcategory + ", faqtitle="
				+ faqtitle + ", faqcontent=" + faqcontent + "]";
	}
	
	
	
}
