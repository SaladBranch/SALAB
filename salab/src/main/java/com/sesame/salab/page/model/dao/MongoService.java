package com.sesame.salab.page.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

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
	public Page findOne(String findCollection, Page page) {
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno()),
				Criteria.where("pageno").is(page.getPageno())
		));
		
		return mongoOps.findOne(query, Page.class, findCollection);
	}
	public Page findTeamOne(String findCollection, Page page) {
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("projectno").is(page.getProjectno()),
				Criteria.where("fileno").is(page.getFileno()),
				Criteria.where("pageno").is(page.getPageno())
		));
		
		return mongoOps.findOne(query, Page.class, findCollection);
	}
	
	public Page findId(String findCollection, Page page) {
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("_id").is(page.get_id())
		));
		
		return mongoOps.findOne(query, Page.class, findCollection);
	}
	
	//find all
	public List<Page> findAll(String findCollection){
		return mongoOps.findAll(Page.class, findCollection);
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
				)).with(new Sort(Sort.Direction.ASC, "pageno"));
		return mongoOps.find(query, Page.class, collection);
	}
	
	public List<Page> findTeamPage(String collection, Page page) {
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("projectno").is(page.getProjectno()),
				Criteria.where("fileno").is(page.getFileno())
				)).with(new Sort(Sort.Direction.ASC, "pageno"));
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
		)).with(new Sort(Sort.Direction.DESC, "pageno")).limit(1);
		
		List<Page> findpage = mongoOps.find(query, Page.class, collection);
		
		return findpage.get(0).getPageno();
	}


	public void pageDelete(String collection, Page page) {
		// 페이지 삭제용 메소드
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno()),
				Criteria.where("pageno").is(page.getPageno())
		));
		
		mongoOps.remove(query, collection);
	}

	
	public List<Page> selectUpdatePageNo(String collection, Page page) {
		//페이지 삭제 후 삭제한 페이지보다 큰 페이지 번호 셀렉트하는 메소드
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno()),
				Criteria.where("pageno").gt(page.getPageno())
		)).with(new Sort(Sort.Direction.ASC, "pageno"));
		
		return mongoOps.find(query, Page.class, collection);
	}

	public void updatePageNo(String collection, Page page, String job) {
		//위에 메소드로 페이지번호 업데이트
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno()),
				Criteria.where("pageno").is(page.getPageno())
		));
		Update update = null;
		if(job.equals("delete")) {
			update = new Update().set("pageno", (page.getPageno() - 1));
		}else if(job.equals("copy")) {
			update = new Update().set("pageno", (page.getPageno() + 1));
		}
		
		mongoOps.updateFirst(query, update, collection);
		
	}

	public void saveDoc(String collection, Page p) {
		// TODO Auto-generated method stub
		Query query = new Query(new Criteria().andOperator(
					Criteria.where("_id").is(p.get_id())
				));
		
		mongoOps.save(p, collection);
	}


	public void pageRename(Page page, String collection) {
		// TODO Auto-generated method stub
		Query query = new Query(new Criteria().andOperator(
				Criteria.where("userno").is(page.getUserno()),
				Criteria.where("fileno").is(page.getFileno()),
				Criteria.where("pageno").is(page.getPageno())
		));
		
		Update update = new Update().set("pagename", page.getPagename());
		mongoOps.updateFirst(query, update, collection);
	}
	
}
