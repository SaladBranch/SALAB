package com.sesame.salab.common;

public class FileList implements java.io.Serializable{
	public static final long SerialVersionUID = 9001L;
	
	private int pfileno;
	private int userno;
	private String pfilethumbnail;
	private String pfiletitle;
	private String pfilelastmodified;
	private String pfilecreatedate;
	private String trashcan;
	private String pt;
	
	public FileList() {}

	public FileList(int pfileno, int userno, String pfilethumbnail, String pfiletitle, String pfilelastmodified,
			String pfilecreatedate, String trashcan, String pt) {
		super();
		this.pfileno = pfileno;
		this.userno = userno;
		this.pfilethumbnail = pfilethumbnail;
		this.pfiletitle = pfiletitle;
		this.pfilelastmodified = pfilelastmodified;
		this.pfilecreatedate = pfilecreatedate;
		this.trashcan = trashcan;
		this.pt = pt;
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

	public String getPfilelastmodified() {
		return pfilelastmodified;
	}

	public void setPfilelastmodified(String pfilelastmodified) {
		this.pfilelastmodified = pfilelastmodified;
	}

	public String getPfilecreatedate() {
		return pfilecreatedate;
	}

	public void setPfilecreatedate(String pfilecreatedate) {
		this.pfilecreatedate = pfilecreatedate;
	}

	public String getTrashcan() {
		return trashcan;
	}

	public void setTrashcan(String trashcan) {
		this.trashcan = trashcan;
	}

	public String getPt() {
		return pt;
	}

	public void setPt(String pt) {
		this.pt = pt;
	}

	@Override
	public String toString() {
		return "FileList [pfileno=" + pfileno + ", userno=" + userno + ", pfilethumbnail=" + pfilethumbnail
				+ ", pfiletitle=" + pfiletitle + ", pfilelastmodified=" + pfilelastmodified + ", pfilecreatedate="
				+ pfilecreatedate + ", trashcan=" + trashcan + ", pt=" + pt + "]";
	}
	
	
}
