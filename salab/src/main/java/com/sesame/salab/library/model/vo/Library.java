package com.sesame.salab.library.model.vo;

public class Library {
	private String _id;
	private int fileno;
	private String code;
	private String content;
	
	public Library() {}

	public Library(String _id, int fileno, String code, String content) {
		super();
		this._id = _id;
		this.fileno = fileno;
		this.code = code;
		this.content = content;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public int getFileno() {
		return fileno;
	}

	public void setFileno(int fileno) {
		this.fileno = fileno;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "Library [_id=" + _id + ", fileno=" + fileno + ", code=" + code + ", content=" + content + "]";
	}
	
	
}
