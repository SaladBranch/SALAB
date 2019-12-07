package com.sesame.salab.library.model.vo;

public class TeamLibrary extends Library{
	private int projectno;
	
	public TeamLibrary() {}

	public TeamLibrary(int projectno) {
		super();
		this.projectno = projectno;
	}

	public int getProjectno() {
		return projectno;
	}

	public void setProjectno(int projectno) {
		this.projectno = projectno;
	}

	@Override
	public String toString() {
		return "TeamLibrary [projectno=" + projectno + "]";
	}
	
	
}
