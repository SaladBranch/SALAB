package com.sesame.salab.faq.model.service;

import java.util.List;

import com.sesame.salab.faq.model.vo.Faq;

public interface FaqService {
	List<Faq> faqList();

	List<Faq> adminFaqList();

	int adminFaqInsert(Faq faq);

}
