package com.sesame.salab.faq.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.faq.model.dao.FaqDao;
import com.sesame.salab.faq.model.vo.Faq;

@Service("faqService")
public class FaqServiceImpl implements FaqService{
	
	@Autowired
	private FaqDao faqDao;
	
	@Override
	public List<Faq> faqList(){
		return faqDao.faqList();
	}

}
