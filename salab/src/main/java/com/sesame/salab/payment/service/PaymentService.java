package com.sesame.salab.payment.service;

import java.util.ArrayList;
import java.util.List;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.model.vo.Payment;

public interface PaymentService {
	int insertBilling(Member member);

	int insertPayment(Payment payment);

	Member selectPaymentUser(String userno);

	List<Member> equalPaymentDate();

	int savePaySuccess(List<Payment> paySuccess);

	int changePayFail(List<String> payFail);
}
