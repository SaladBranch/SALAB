package com.sesame.salab.payment.model.vo;

public class Payment implements java.io.Serializable {
	private static final long serialVersionUID = 1012L;
	
	private int paymentno;
	private int userno;
	private String useremail;
	private String paymentoid;
	
	public Payment() {
		super();
	}

	public Payment(int paymentno, int userno, String useremail, String paymentoid) {
		super();
		this.paymentno = paymentno;
		this.userno = userno;
		this.useremail = useremail;
		this.paymentoid = paymentoid;
	}

	public int getPaymentno() {
		return paymentno;
	}

	public void setPaymentno(int paymentno) {
		this.paymentno = paymentno;
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

	public String getPaymentoid() {
		return paymentoid;
	}

	public void setPaymentoid(String paymentoid) {
		this.paymentoid = paymentoid;
	}

	@Override
	public String toString() {
		return "Payment [paymentno=" + paymentno + ", userno=" + userno + ", useremail=" + useremail + ", paymentoid="
				+ paymentoid + "]";
	}

}
