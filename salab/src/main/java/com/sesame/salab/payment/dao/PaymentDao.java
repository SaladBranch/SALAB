package com.sesame.salab.payment.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.model.vo.Payment;

@Repository("paymentDao")
public class PaymentDao {
	private final Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
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

	public List<Member> selectEqualPaymentDate() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("paymentMapper.selectEqualPaymentDate");
	}

	public int savePaySuccess(List<Payment> paySuccess) {
		// TODO Auto-generated method stub
		Payment payment = new Payment();
		int result= 0;
		System.out.println(paySuccess.size()); 	
		for(int i =0 ; i < paySuccess.size();i++)
		{	
			logger.info("결제성공//유저번호 "+paySuccess.get(i).getUserno()+"번 DB저장");
			payment.setUserno(paySuccess.get(i).getUserno());
			payment.setPaymentoid(paySuccess.get(i).getPaymentoid());
			payment.setUseremail(paySuccess.get(i).getUseremail());
			sqlSession.update("paymentMapper.changepaySuccess", payment.getUserno());//다음 예약결제일 재설정
			int key = sqlSession.insert("paymentMapper.savePaySuccess", payment);//payment에 결제기록 저장
		
			if(key >0) {
				result += 1;
				logger.info("DB저장 완료");
			}else {
				logger.info("저장실패");
			}
			
		}return  result;
	}

	public int changePayFail(List<String> payFail) {
		
		int result= 0;
		for(int i =0 ; i < payFail.size();i++)
		{	
			logger.info("결제실패//유저번호 "+(payFail.get(i))+"번 DB저장");
			int userno = Integer.parseInt(payFail.get(i));
			System.out.println(userno);
			int key = sqlSession.update("paymentMapper.changepayFail", userno);
			if(key >0) {
				result += key;
				logger.info("DB저장 완료");
			}else {
				logger.info("DB저장실패");
			}
			
		}return  result;
	}		

}
