package com.sesame.salab.page.model.dao;

public class Fruit {
	private String _id;
	private String name;
	private int price;
	private Taste taste;
	
	public Fruit() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Fruit(String _id, String name, int price, Taste taste) {
		super();
		this._id = _id;
		this.name = name;
		this.price = price;
		this.taste = taste;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Taste getTaste() {
		return taste;
	}

	public void setTaste(Taste taste) {
		this.taste = taste;
	}

	@Override
	public String toString() {
		return "Fruit [_id=" + _id + ", name=" + name + ", price=" + price + ", taste=" + taste + "]";
	}
	
}