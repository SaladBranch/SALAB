package com.sesame.salab.payment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.sesame.salab.common.bootpay.javaApache.BootpayApi;
import com.sesame.salab.common.bootpay.javaApache.model.request.SubscribeBilling;
import com.sesame.salab.member.model.vo.Member;
import com.sesame.salab.payment.service.PaymentService;

@Controller
public class PaymentController {
	
	@Autowired
	private PaymentService pmService;
	
	@RequestMapping(value="pm_comp.do", method=RequestMethod.POST)
	public String paymentCompMethod(@RequestParam("billing_key") String billingKey, @RequestParam("userno") String userno, @RequestParam("order_id") String orderid) {
		//결제 성공시 값 넘기는 ajax를 통해 넘긴값 객체에 저장
		Member member = new Member();
		member.setBillingkey(billingKey);
		member.setUserno(Integer.parseInt(userno));
		
		//빌링키를 맴버테이블에 저장
		int result = pmService.insertBilling(member);
		
		//빌링키 저장이 성공하면 바로 결제
		if(result > 0) {
			BootpayApi bootpay = new BootpayApi("5d5a6ed20627a800303d1954", "/5Qc/8x1aqIjmW0DoloUMMr1SNvoPYNN9K0dT7Lh9nI=");
			SubscribeBilling bill = new SubscribeBilling();
			
			bill.billing_key = billingKey;
			bill.order_id = orderid;
			bill.price = 9900;
			bill.pg = "danal";
			bill.item_name = "Premium Service";
			
			if(bill.order_id != null && bill.price != 0 && bill.item_name != null) {
				try {
					bootpay.getAccessToken();
					bootpay.subscribe_billing(bill);
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
		}
		
		return "";
	}
	
}
