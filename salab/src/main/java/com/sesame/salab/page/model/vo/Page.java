package com.sesame.salab.page.model.vo;

public class Page {
	private int userno;
	private int fileno;
	private int pageno;
	private String content;
	private String pagename;
	
	public Page() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Page(int userno, int fileno, int pageno, String content, String pagename) {
		super();
		this.userno = userno;
		this.fileno = fileno;
		this.pageno = pageno;
		this.content = content;
		this.pagename = pagename;
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	public int getFileno() {
		return fileno;
	}

	public void setFileno(int fileno) {
		this.fileno = fileno;
	}

	public int getPageno() {
		return pageno;
	}

	public void setPageno(int pageno) {
		this.pageno = pageno;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	
	public String getPagename() {
		return pagename;
	}

	public void setPagename(String pagename) {
		this.pagename = pagename;
	}

	@Override
	public String toString() {
		return "Page [userno=" + userno + ", fileno=" + fileno + ", pageno=" + pageno + ", content=" + content
				+ ", pagename=" + pagename + "]";
	}

}
