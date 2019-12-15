package com.sesame.salab.message.model.vo;

import java.util.Date;

public class Message {
	private String _id;
	private Integer userno;
	private String username;
	private String userprofile_r;
	private int prfileno;
	private String msg;
	private Date date;
	
	public Message() {}

	public Message(String _id, Integer userno, String username, String userprofile_r, int prfileno, String msg,
			Date date) {
		super();
		this._id = _id;
		this.userno = userno;
		this.username = username;
		this.userprofile_r = userprofile_r;
		this.prfileno = prfileno;
		this.msg = msg;
		this.date = date;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public Integer getUserno() {
		return userno;
	}

	public void setUserno(Integer userno) {
		this.userno = userno;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserprofile_r() {
		return userprofile_r;
	}

	public void setUserprofile_r(String userprofile_r) {
		this.userprofile_r = userprofile_r;
	}

	public int getPrfileno() {
		return prfileno;
	}

	public void setPrfileno(int prfileno) {
		this.prfileno = prfileno;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Message [_id=" + _id + ", userno=" + userno + ", username=" + username + ", userprofile_r="
				+ userprofile_r + ", prfileno=" + prfileno + ", msg=" + msg + ", date=" + date + "]";
	}

	
}
