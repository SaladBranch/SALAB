package com.sesame.salab.page.model.dao;

import java.util.ArrayList;
import java.util.Arrays;

public class Taste {
	ArrayList<String> tastes;
	String[] testing;
	
	public Taste() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Taste(ArrayList<String> tastes, String[] testing) {
		super();
		this.tastes = tastes;
		this.testing = testing;
	}
	
	public ArrayList<String> getTastes() {
		return tastes;
	}
	public void setTastes(ArrayList<String> tastes) {
		this.tastes = tastes;
	}
	public String[] getTesting() {
		return testing;
	}
	public void setTesting(String[] testing) {
		this.testing = testing;
	}
	
	@Override
	public String toString() {
		return "Taste [tastes=" + tastes + ", testing=" + Arrays.toString(testing) + "]";
	}
	
	
    }