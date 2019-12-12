package com.sesame.salab.payment.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.common.bootpay.javaApache.BootpayApi;
import com.sesame.salab.common.bootpay.javaApache.model.request.SubscribeBilling;
import com.sesame.salab.member.model.service.MemberService;
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.model.vo.Payment;
import com.sesame.salab.payment.service.PaymentService;

@Controller
public class PaymentController {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	@Autowired
	private PaymentService pmService;
	@Autowired
	private MemberService memberService;	
	
	@RequestMapping("test.do")
	public String returntestPage() {
		return "test";
	}
	
	@RequestMapping("pm_complete.do")
	public String returnCompPage() {
		logger.info("pm_complete.do. ");
		return "payment/paymentComplete";
	}
	
	@RequestMapping(value="pm_done.do", method=RequestMethod.POST)
	public void paymentCompMethod(@RequestParam("billing_key") String billingKey, @RequestParam("userno") String userno, @RequestParam("order_id") String orderid ,HttpServletResponse response) throws IOException {
		logger.info("pm_done.do 접속.");
		BootpayApi bootpay = new BootpayApi("5d5a6ed20627a800303d1954", "neJWvNvI9giAwmfjHyVS6UbU1XsnI8JxXxYHVC7WnG0=");
		SubscribeBilling bill = new SubscribeBilling();
		PrintWriter out = response.getWriter();
		java.sql.Date nextPayDay =  java.sql.Date.valueOf(LocalDate.now().plusDays(30));//다음결제일
		
		logger.info("다음결제일 : " +nextPayDay);
		//결제 성공시 값 넘기는 ajax를 통해 넘긴값 객체에 저장
		SimpleDateFormat date = new SimpleDateFormat("dd");
		Member member = new Member();
		member.setBillingkey(billingKey);
		member.setUserno(Integer.parseInt(userno));
		member.setPaymentdate(nextPayDay);
		logger.info("멤버정보 : " +member.toString());
		logger.info("orderid : "+orderid);
		SimpleDateFormat today = new SimpleDateFormat();
		//빌링키를 맴버테이블에 저장
		{
		int result = pmService.insertBilling(member);
		logger.info("빌링키 저장결과 : "+String.valueOf(result));
		//빌링키 저장이 성공하면 바로 결제
		if(result > 0) {
			logger.info("빌링키 저장완료, 결제process 진행");
			bill.billing_key = billingKey;
			bill.order_id = orderid;
			bill.price = 9900;
			bill.pg = "danal";
			bill.item_name = "Premium Service";
			if(bill.order_id != null && bill.price != 0 && bill.item_name != null) {
				try {
					bootpay.getAccessToken();
					bootpay.subscribe_billing(bill);
					Payment payment = new Payment();
					payment.setPaymentoid(orderid);
					payment.setUserno(Integer.parseInt(userno));
					int result2 = pmService.insertPayment(payment);
					logger.info("결제완료");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else {
				logger.info("결제 실패");
			}
		}
		}
		out.flush();
		out.close();
	}
	
	@RequestMapping(value="regularPayment.do", method=RequestMethod.POST)
	public void dailyPayMethod() throws IOException {
		BootpayApi bootpay = new BootpayApi("5d5a6ed20627a800303d1954", "neJWvNvI9giAwmfjHyVS6UbU1XsnI8JxXxYHVC7WnG0=");
		SubscribeBilling bill = new SubscribeBilling();
		List<Payment> paySuccess = new ArrayList<Payment>();
		List<Payment> ddd= new ArrayList<Payment>();
		List<String> payFail = new ArrayList<String>();
		java.sql.Date toDayDate = java.sql.Date.valueOf(LocalDate.now());
		logger.info(toDayDate+"// 정기결제 시작");
		//해당 날자와 동일한 MemberList 가져오기
		List<Member> memberList = pmService.equalPaymentDate();
		logger.info("금일 결제 인원 : " +memberList.size() +"명" );
		if(memberList.size() > 0) {
				for (int i=0; i<memberList.size(); i++) {
				System.out.println(memberList.get(i));

				logger.info(memberList.get(i).getUseremail()+"'s billing key : "+ memberList.get(i).getBillingkey());
				bill.billing_key = memberList.get(i).getBillingkey();
				bill.order_id = "regularPay"+toDayDate+"u"+memberList.get(i).getUserno();
				bill.price = 1000;
				bill.item_name = "Premium Service";
				bill.pg="danal";
				logger.info("결제 준비 완료");
				if(bill.order_id != null && bill.price != 0 && bill.item_name != null) {
					try {
						logger.info("id,price,name checked OK");
						bootpay.getAccessToken();
						//bootpay.subscribe_reserve_billing(subscribeBillingReserve);
						HttpResponse payResult = bootpay.subscribe_billing(bill);

						if(payResult.getStatusLine().toString().contains("HTTP/1.1 200 OK")) {
							logger.info("결제성공. ");
							Payment successPayment = new Payment();
							successPayment.setPaymentoid(bill.order_id);
							successPayment.setUserno(memberList.get(i).getUserno());
							successPayment.setUseremail(memberList.get(i).getUseremail());
							System.out.println(successPayment.toString());
							paySuccess.add(successPayment);
						}else {
							System.out.println("실패");
							payFail.add(String.valueOf(memberList.get(i).getUserno()));
						}
						/*
						Payment payment = new Payment();
						payment.setPaymentoid(bill.order_id);
						payment.setUserno(memberList.get(i).getUserno());
						int result2 = pmService.insertPayment(payment);
						logger.info("완료" +result2);
						*/
					} catch (Exception e) {	
						e.printStackTrace();
					}
				}
				
			}
				logger.info("  결제 성공: "+paySuccess.size() +"명  //  결제실패 : "+payFail.size()+"명");
				logger.info("결제성공 리스트 : " +paySuccess.toString());
				logger.info("결제실패 리스트 : " +payFail.toString());
				
				System.out.println("결제성공리스트를 가지고 db저장");
				int saveSuccessResult=pmService.savePaySuccess(paySuccess);
				int changeFailResult = pmService.changePayFail(payFail);
				System.out.println("저장결과 1: " +saveSuccessResult);
				System.out.println("저장결과 2: " +changeFailResult);
				if(paySuccess.size() ==saveSuccessResult) {
					logger.info("all paySuccess saved..");
				}
				if(payFail.size() == changeFailResult) {
					logger.info("all payFailed saved..");
				}
				if( paySuccess.size() !=saveSuccessResult  || payFail.size() != changeFailResult ) {
					logger.info("저장실패, log확인");
				}		
		}
	}
	//날자 만료된 인원 Standard 권한으로 변경
	@RequestMapping(value="dailyChangeLevel.do", method=RequestMethod.POST)
	public void dailyChangeLevelMethod() throws IOException {
		logger.info("dailyChangeLevel.do run..");
		//standard중에 권한 만료된 리스트 불러오기
		List<Member> memberList = memberService.dailyChangeList();
		logger.info("금일 만료 인원 : "+memberList.size()+"명");
		//리스트를 이용하여, standard로 초기화
		if(memberList.size()>0) {
			int result = memberService.daliySetStandard(memberList);
			if(result ==memberList.size()) {
				logger.info(result+"명 All Success..");
			}else {
				result=memberList.size()-result;
				logger.info(result+"명 Change Fail..");
			}
		}
		logger.info("end..");
		
	}
	@RequestMapping(value="pm_isbilling.do", method=RequestMethod.POST)
	public void paymentIsBillingMethod(@RequestParam("userno") String userno, @RequestParam("order_id") String orderid, HttpServletResponse response) throws IOException {
		logger.info("pm_isbilling.do 진입");
		//bootpay api 객체 생성
		BootpayApi bootpay = new BootpayApi("5d5a6ed20627a800303d1954", "neJWvNvI9giAwmfjHyVS6UbU1XsnI8JxXxYHVC7WnG0=");
		SubscribeBilling bill = new SubscribeBilling();
		PrintWriter out = response.getWriter();
		Member member = pmService.selectPaymentUser(userno);
		
		
		//빌링키를 맴버테이블에 저장
		//빌링키 저장이 성공하면 바로 결제
		if(member != null) {
			logger.info(member.getUseremail()+"'s billing key : "+ member.getBillingkey());
			bill.billing_key = member.getBillingkey();
			bill.order_id = orderid;
			bill.price = 1000;
			bill.item_name = "Premium Service";
			bill.pg="danal";
			logger.info("결제 준비 완료");
			if(bill.order_id != null && bill.price != 0 && bill.item_name != null) {
				try {
					logger.info("id,price,name checked OK");
					bootpay.getAccessToken();
					//bootpay.subscribe_reserve_billing(subscribeBillingReserve);
					bootpay.subscribe_billing(bill);
					Payment payment = new Payment();
					payment.setPaymentoid(orderid);
					payment.setUserno(Integer.parseInt(userno));
					int result2 = pmService.insertPayment(payment);
					logger.info("완료");
				} catch (Exception e) {	
					e.printStackTrace();
				}
			}
		}
		logger.info("check3");
		out.flush();
		out.close();
	}
}
