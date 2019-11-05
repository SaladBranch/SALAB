package com.sesame.salab.payment.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.model.vo.Payment;

@Repository("paymentDao")
public class PaymentDao {

	@Autowired
	private SqlSession sqlSession;
	
	//빌링키를 회원테이블에 저장하는 메소드
	public int insertBilling(Member member) {
		return sqlSession.update("paymentMapper.insertBilling", member);
	}
	
	//결제내역 db 저장용
	public int insertPayment(Payment payment) {
		return sqlSession.insert("paymentMapper.insertPayment", payment);
	}

	public Member selectPaymentUser(String userno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("paymentMapper.selectPaymentUser", Integer.parseInt(userno));
	}		

}
