package com.sesame.salab.member.model.vo;

import java.io.Serializable;
import java.sql.Date;

public class Member implements Serializable{
	private static final long SerialVersionUID = 1000L;
	
	private int userno;
	private String useremail;
	private String userpwd;
	private String username;
	private String userphone;
	private String userprofile_o;
	private String userprofile_r;
	private String userlevel;
	private Date userenrolldate;
	private String userauthkey;
	private String useremailchecked;
	private String billingkey;
	private int paymentdate;
	
	public Member() {}

	public Member(int userno, String useremail, String userpwd, String username, String userphone, String userprofile_o,
			String userprofile_r, String userlevel, Date userenrolldate, String userauthkey, String useremailchecked,
			String billingkey, int paymentdate) {
		super();
		this.userno = userno;
		this.useremail = useremail;
		this.userpwd = userpwd;
		this.username = username;
		this.userphone = userphone;
		this.userprofile_o = userprofile_o;
		this.userprofile_r = userprofile_r;
		this.userlevel = userlevel;
		this.userenrolldate = userenrolldate;
		this.userauthkey = userauthkey;
		this.useremailchecked = useremailchecked;
		this.billingkey = billingkey;
		this.paymentdate = paymentdate;
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	public String getUseremail() {
		return useremail;
	}

	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}

	public String getUserpwd() {
		return userpwd;
	}

	public void setUserpwd(String userpwd) {
		this.userpwd = userpwd;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserphone() {
		return userphone;
	}

	public void setUserphone(String userphone) {
		this.userphone = userphone;
	}

	public String getUserprofile_o() {
		return userprofile_o;
	}

	public void setUserprofile_o(String userprofile_o) {
		this.userprofile_o = userprofile_o;
	}

	public String getUserprofile_r() {
		return userprofile_r;
	}

	public void setUserprofile_r(String userprofile_r) {
		this.userprofile_r = userprofile_r;
	}

	public String getUserlevel() {
		return userlevel;
	}

	public void setUserlevel(String userlevel) {
		this.userlevel = userlevel;
	}

	public Date getUserenrolldate() {
		return userenrolldate;
	}

	public void setUserenrolldate(Date userenrolldate) {
		this.userenrolldate = userenrolldate;
	}

	public String getUserauthkey() {
		return userauthkey;
	}

	public void setUserauthkey(String userauthkey) {
		this.userauthkey = userauthkey;
	}

	public String getUseremailchecked() {
		return useremailchecked;
	}

	public void setUseremailchecked(String useremailchecked) {
		this.useremailchecked = useremailchecked;
	}

	public String getBillingkey() {
		return billingkey;
	}

	public void setBillingkey(String billingkey) {
		this.billingkey = billingkey;
	}

	public int getPaymentdate() {
		return paymentdate;
	}

	public void setPaymentdate(int paymentdate) {
		this.paymentdate = paymentdate;
	}

	@Override
	public String toString() {
		return "Member [userno=" + userno + ", useremail=" + useremail + ", userpwd=" + userpwd + ", username="
				+ username + ", userphone=" + userphone + ", userprofile_o=" + userprofile_o + ", userprofile_r="
				+ userprofile_r + ", userlevel=" + userlevel + ", userenrolldate=" + userenrolldate + ", userauthkey="
				+ userauthkey + ", useremailchecked=" + useremailchecked + ", billingkey=" + billingkey
				+ ", paymentdate=" + paymentdate + "]";
	}
	
}
