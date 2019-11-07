package com.sesame.salab.payment.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.common.bootpay.javaApache.BootpayApi;
import com.sesame.salab.common.bootpay.javaApache.model.request.SubscribeBilling;
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.model.vo.Payment;
import com.sesame.salab.payment.service.PaymentService;

@Controller
public class PaymentController {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	@Autowired
	private PaymentService pmService;
	
	@RequestMapping("test.do")
	public String returntestPage() {
		return "test";
	}
	
	@RequestMapping("pm_complete.do")
	public String returnCompPage() {
		return "payment/paymentComplete";
	}
	
	@RequestMapping(value="pm_done.do", method=RequestMethod.POST)
	public void paymentCompMethod(@RequestParam("billing_key") String billingKey, @RequestParam("userno") String userno, @RequestParam("order_id") String orderid) {
		BootpayApi bootpay = new BootpayApi("5d5a6ed20627a800303d1954", "neJWvNvI9giAwmfjHyVS6UbU1XsnI8JxXxYHVC7WnG0=");
		SubscribeBilling bill = new SubscribeBilling();
		
		//결제 성공시 값 넘기는 ajax를 통해 넘긴값 객체에 저장
		Date d = new Date();
		SimpleDateFormat date = new SimpleDateFormat("dd");
		Member member = new Member();
		member.setBillingkey(billingKey);
		member.setUserno(Integer.parseInt(userno));
		member.setPaymentdate(Integer.parseInt(date.format(d)));
		logger.info(member.toString());
		logger.info(orderid);
		logger.info(date.format(d));
		
		//빌링키를 맴버테이블에 저장
		int result = pmService.insertBilling(member);
		logger.info(String.valueOf(result));
		//빌링키 저장이 성공하면 바로 결제
		if(result > 0) {
			
			bill.billing_key = billingKey;
			bill.order_id = orderid;
			bill.price = 9900;
			bill.pg = "danal";
			bill.item_name = "Premium Service";
			logger.info("check");
			if(bill.order_id != null && bill.price != 0 && bill.item_name != null) {
				try {
					logger.info("check2");
					bootpay.getAccessToken();
					bootpay.subscribe_billing(bill);
					Payment payment = new Payment();
					payment.setPaymentoid(orderid);
					payment.setUserno(Integer.parseInt(userno));
					int result2 = pmService.insertPayment(payment);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		logger.info("check3");
	}
	
	@RequestMapping(value="pm_isbilling.do", method=RequestMethod.POST)
	public void paymentIsBillingMethod(@RequestParam("userno") String userno, @RequestParam("order_id") String orderid) {
		//bootpay api 객체 생성
		BootpayApi bootpay = new BootpayApi("5d5a6ed20627a800303d1954", "neJWvNvI9giAwmfjHyVS6UbU1XsnI8JxXxYHVC7WnG0=");
		SubscribeBilling bill = new SubscribeBilling();
		
		Member member = pmService.selectPaymentUser(userno);
		
		//빌링키를 맴버테이블에 저장
		//빌링키 저장이 성공하면 바로 결제
		if(member != null) {
			
			bill.billing_key = member.getBillingkey();
			bill.order_id = orderid;
			bill.price = 9900;
			bill.pg = "danal";
			bill.item_name = "Premium Service";
			logger.info("check");
			if(bill.order_id != null && bill.price != 0 && bill.item_name != null) {
				try {
					logger.info("check2");
					bootpay.getAccessToken();
					bootpay.subscribe_billing(bill);
					Payment payment = new Payment();
					payment.setPaymentoid(orderid);
					payment.setUserno(Integer.parseInt(userno));
					int result2 = pmService.insertPayment(payment);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		logger.info("check3");
	}
}
