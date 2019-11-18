package com.sesame.salab.page.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.mongodb.MongoClient;
import com.sesame.salab.page.model.vo.Page;

public class MongoService {
	
	private final int MONGO_PORT = 27017;
	private final String MONGO_HOST = "localhost";
	private final String DB_NAME = "salab";
	
	private MongoClient mongo;
	private MongoOperations mongoOps;
	
	//생성시DB와 연동
	public MongoService() {
		mongo = new MongoClient(MONGO_HOST, MONGO_PORT);
		mongoOps = new  MongoTemplate(mongo, DB_NAME);
	}
	
	
	//연결 끊기
	public void close() {
		try {
			mongo.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//DB 컬렉션 모두 출력
	public Set<String> showCollections(){
		return mongoOps.getCollectionNames();
	}
	
	//DB insert
	public void insert(String insertCollection) {
		Fruit fruit = new Fruit();
		fruit.setName("Jamong");
		fruit.setPrice(5000);
		
		Taste taste = new Taste();
		ArrayList<String> tastes = new ArrayList<String>();
		tastes.add("bitter");
		tastes.add("sweet");
		taste.setTastes(tastes);
		
		String[] testing = {"testing1", "testing2"};
		taste.setTesting(testing);
		
		fruit.setTaste(taste);
		
		mongoOps.insert(fruit, insertCollection);
	}
	
	//find one
	public Fruit findOne(String findCollection, Fruit findCondition) {
		Criteria criteria = new Criteria("_id");
		criteria.is(findCondition.get_id());
		
		Query query = new Query(criteria);
		Fruit fruit = mongoOps.findOne(query, Fruit.class, findCollection);
		return fruit;
	}
	
	//find all
	public List<Fruit> findAll(String findCollection){
		return mongoOps.findAll(Fruit.class, findCollection);
	}
	
	//find in condition
	public List<Fruit> findInConditionMongo(String findCollection, Fruit fruit){
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("price").is(fruit.getPrice()),
				Criteria.where("name").is(fruit.getName())
				));
		return mongoOps.find(query, Fruit.class, findCollection);
	}
	
	//remove collection
	public void removeCollection(String deleteCollection) {
		mongoOps.dropCollection(deleteCollection);
	}
	
	//remove data in collection
	public void removeData(String deleteCollection, Fruit condition) {
		Query query = new Query(new Criteria("_id").is(condition.get_id()));
		mongoOps.remove(query, deleteCollection);
	}


	public void createFirstPage(Page page) {
		mongoOps.insert(page, "page");
		
	}

	public List<Page> findPage(String collection, Page page) {
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno())
				));
		return mongoOps.find(query, Page.class, collection);
	}

	//새페이지 생성
	public void insertNewPage(Page page, String collection) {
		mongoOps.insert(page, collection);
		
	}

	//페이지 넘버계산용
	public int countPage(Page page, String collection) {
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno())
				));
		
		return (int) mongoOps.count(query, collection);
	}
}