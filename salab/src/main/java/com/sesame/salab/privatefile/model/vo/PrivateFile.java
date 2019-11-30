package com.sesame.salab.privatefile.model.vo;

import java.sql.Date;

public class PrivateFile implements java.io.Serializable {
	private static final long serialVersionUID = 1001L;

	private int pfileno;
	private int userno;
	private String pfilethumbnail;
	private String pfiletitle;
	private Date pfilelastmodified;
	private String trashcan;
	
	public PrivateFile() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PrivateFile(int pfileno, int userno, String pfilethumbnail, String pfiletitle, Date pfilelastmodified,
			String trashcan) {
		super();
		this.pfileno = pfileno;
		this.userno = userno;
		this.pfilethumbnail = pfilethumbnail;
		this.pfiletitle = pfiletitle;
		this.pfilelastmodified = pfilelastmodified;
		this.trashcan = trashcan;
	}

	public int getPfileno() {
		return pfileno;
	}

	public void setPfileno(int pfileno) {
		this.pfileno = pfileno;
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	public String getPfilethumbnail() {
		return pfilethumbnail;
	}

	public void setPfilethumbnail(String pfilethumbnail) {
		this.pfilethumbnail = pfilethumbnail;
	}

	public String getPfiletitle() {
		return pfiletitle;
	}

	public void setPfiletitle(String pfiletitle) {
		this.pfiletitle = pfiletitle;
	}

	public Date getPfilelastmodified() {
		return pfilelastmodified;
	}

	public void setPfilelastmodified(Date pfilelastmodified) {
		this.pfilelastmodified = pfilelastmodified;
	}

	public String getTrashcan() {
		return trashcan;
	}

	public void setTrashcan(String trashcan) {
		this.trashcan = trashcan;
	}

	@Override
	public String toString() {
		return "PrivateFile [pfileno=" + pfileno + ", userno=" + userno + ", pfilethumbnail=" + pfilethumbnail
				+ ", pfiletitle=" + pfiletitle + ", pfilelastmodified=" + pfilelastmodified + ", trashcan=" + trashcan
				+ "]";
	}
	
}
