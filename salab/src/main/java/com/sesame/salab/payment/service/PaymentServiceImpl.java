package com.sesame.salab.payment.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.dao.PaymentDao;
import com.sesame.salab.payment.model.vo.Payment;

@Service("PaymentService")
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentDao pdao;
	
	@Override
	public int insertBilling(Member member) {
		return pdao.insertBilling(member);
	}

	@Override
	public int insertPayment(Payment payment) {
		//결제내역 db에 저장하는 메소드
		return pdao.insertPayment(payment);
	}

	@Override
	public Member selectPaymentUser(String userno) {
		// 재결제시 결제할 유저 검색
		return pdao.selectPaymentUser(userno);
	}

	@Override
	public List<Member> equalPaymentDate() {
		// TODO Auto-generated method stub
		return pdao.selectEqualPaymentDate();
	}

	@Override
	public int savePaySuccess(List<Payment> paySuccess) {
		// TODO Auto-generated method stub
		return pdao.savePaySuccess(paySuccess);
	}

	@Override
	public int changePayFail(List<String> payFail) {
		// TODO Auto-generated method stub
		return pdao.changePayFail(payFail);
	}

}
