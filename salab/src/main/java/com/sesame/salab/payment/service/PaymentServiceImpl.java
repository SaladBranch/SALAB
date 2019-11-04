package com.sesame.salab.payment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.dao.PaymentDao;

@Service("PaymentService")
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentDao pdao;
	
	@Override
	public int insertBilling(Member member) {
		return pdao.insertBilling(member);
	}

}
