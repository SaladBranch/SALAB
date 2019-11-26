package com.sesame.salab.page.model.dao;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

@Controller
public class MongoController {
	
	@RequestMapping(value = "showCollectionsMongo.do", method = RequestMethod.POST)
	public ModelAndView showCollections() {
		ModelAndView mav = new ModelAndView("jsonView");
		
		MongoService mongoService = new MongoService();
		Set<String> collections = mongoService.showCollections();
		for(String s : collections) {
			System.out.println("collection ::: " + s);
		}
		mongoService.close();
		return mav;
	}
	
	@RequestMapping(value = "insertMongo.do", method = RequestMethod.POST)
	public ModelAndView insertMongo() {
		ModelAndView mav = new ModelAndView("jsonView");
		
		MongoService mongoService = new MongoService();
		mongoService.insert("person");
		mongoService.close();
		return mav;
	}
	
	@RequestMapping(value = "findInConditionMongo", method = RequestMethod.POST)
	public ModelAndView findInConditionMongo() {
		ModelAndView mav = new ModelAndView("jsonView");
		
		MongoService mongoService = new MongoService();
		Fruit condition = new Fruit();
		condition.setPrice(5000);
		condition.setName("Jamong");
		ArrayList<Fruit> fruits = (ArrayList<Fruit>) mongoService.findInConditionMongo("testData2", condition);
		Gson gson = new Gson();
		String result = gson.toJson(fruits);
		System.out.println("result ::: " + result);
		mongoService.close();
		return mav;
	}
	
	@RequestMapping(value = "removeCollection", method = RequestMethod.POST)
	public ModelAndView removeCollection() {
		ModelAndView mav = new ModelAndView("jsonView");
		
		MongoService mongoService = new MongoService();
		mongoService.removeCollection("testData2");
		mongoService.close();
		return mav;
	}
	
	@RequestMapping(value = "removeData", method = RequestMethod.POST)
	public ModelAndView removeData() {
		ModelAndView mav = new ModelAndView("jsonView");
		
		MongoService mongoService = new MongoService();
		Fruit condition = new Fruit();
		condition.set_id("5cb31f0285980309d27af0a8");
		mongoService.removeData("testData", condition);
		mongoService.close();
		return mav;
	}
}
