package com.sesame.salab.page.model.vo;

public class Page {
	private String _id;
	private int userno;
	private int projectno;
	private int fileno;
	private int pageno;
	private String content;
	private String pagename;
	private String thumbnail;
	
	public Page() {
		super();
	}

	public Page(String _id, int userno, int projectno, int fileno, int pageno, String content, String pagename,
			String thumbnail) {
		super();
		this._id = _id;
		this.userno = userno;
		this.projectno = projectno;
		this.fileno = fileno;
		this.pageno = pageno;
		this.content = content;
		this.pagename = pagename;
		this.thumbnail = thumbnail;
	}


	public String get_id() {
		return _id;
	}


	public void set_id(String _id) {
		this._id = _id;
	}


	public int getUserno() {
		return userno;
	}


	public void setUserno(int userno) {
		this.userno = userno;
	}


	public int getProjectno() {
		return projectno;
	}


	public void setProjectno(int projectno) {
		this.projectno = projectno;
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


	public String getThumbnail() {
		return thumbnail;
	}


	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}


	@Override
	public String toString() {
		return "Page [_id=" + _id + ", userno=" + userno + ", projectno=" + projectno + ", fileno=" + fileno
				+ ", pageno=" + pageno + ", content=" + content + ", pagename=" + pagename + ", thumbnail=" + thumbnail
				+ "]";
	}
	
	

}
