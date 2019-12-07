package com.sesame.salab.library.model.vo;

public class PrivateLibrary extends Library{
	private int userno;
	
	public PrivateLibrary() {}
	
	public PrivateLibrary(int userno) {
		super();
		this.userno = userno;
	}

	public int getUserno() {
		return userno;
	}

	public void setUserno(int userno) {
		this.userno = userno;
	}

	@Override
	public String toString() {
		return "PrivateLibrary [userno=" + userno + "]";
	}
	
}
