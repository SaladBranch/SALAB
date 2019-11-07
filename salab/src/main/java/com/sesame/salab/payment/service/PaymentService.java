package com.sesame.salab.payment.service;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.model.vo.Payment;

public interface PaymentService {
	int insertBilling(Member member);

	int insertPayment(Payment payment);

	Member selectPaymentUser(String userno);
}
