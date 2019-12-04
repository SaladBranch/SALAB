package com.sesame.salab.projectfile.model.vo;

public class ProjectFile implements java.io.Serializable{
	public static final long SerialVersionUID = 9000L;
	
	private int prfileno;
	private int projectno;
	private String prfilethumbnail;
	private String prfiletitle;
	private String prfilelastmodified;
	private String prfilecreatedate;
	private String trashcan;
	
	public ProjectFile() {}

	@Override
	public String toString() {
		return "ProjectFile [prfileno=" + prfileno + ", projectno=" + projectno + ", prfilethumbnail=" + prfilethumbnail
				+ ", prfiletitle=" + prfiletitle + ", prfilelastmodified=" + prfilelastmodified + ", prfilecreatedate="
				+ prfilecreatedate + ", trashcan=" + trashcan + "]";
	}

	public ProjectFile(int prfileno, int projectno, String prfilethumbnail, String prfiletitle,
			String prfilelastmodified, String prfilecreatedate, String trashcan) {
		super();
		this.prfileno = prfileno;
		this.projectno = projectno;
		this.prfilethumbnail = prfilethumbnail;
		this.prfiletitle = prfiletitle;
		this.prfilelastmodified = prfilelastmodified;
		this.prfilecreatedate = prfilecreatedate;
		this.trashcan = trashcan;
	}

	public int getPrfileno() {
		return prfileno;
	}

	public void setPrfileno(int prfileno) {
		this.prfileno = prfileno;
	}

	public int getProjectno() {
		return projectno;
	}

	public void setProjectno(int projectno) {
		this.projectno = projectno;
	}

	public String getPrfilethumbnail() {
		return prfilethumbnail;
	}

	public void setPrfilethumbnail(String prfilethumbnail) {
		this.prfilethumbnail = prfilethumbnail;
	}

	public String getPrfiletitle() {
		return prfiletitle;
	}

	public void setPrfiletitle(String prfiletitle) {
		this.prfiletitle = prfiletitle;
	}

	public String getPrfilelastmodified() {
		return prfilelastmodified;
	}

	public void setPrfilelastmodified(String prfilelastmodified) {
		this.prfilelastmodified = prfilelastmodified;
	}

	public String getPrfilecreatedate() {
		return prfilecreatedate;
	}

	public void setPrfilecreatedate(String prfilecreatedate) {
		this.prfilecreatedate = prfilecreatedate;
	}

	public String getTrashcan() {
		return trashcan;
	}

	public void setTrashcan(String trashcan) {
		this.trashcan = trashcan;
	}

	public static long getSerialversionuid() {
		return SerialVersionUID;
	}

	
}
