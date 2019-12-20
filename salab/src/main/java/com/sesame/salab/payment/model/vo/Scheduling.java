package com.sesame.salab.payment.model.vo;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sesame.salab.payment.controller.PaymentController;

@Component
public class Scheduling {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	public Scheduling() {}
	@Autowired
	private PaymentController payController;
	
	@Scheduled(cron=" 0 0 3 * * *")
	public void send() throws IOException {
		logger.info("정기결제 시작.");
		payController.dailyPayMethod();
	}
	@Scheduled(cron=" 0 0 2 * * *")
	public void userlevelManageMethod() throws IOException {
		logger.info("정기 유저레벨관리 시작.");
		payController.dailyChangeLevelMethod();
	}
	
}
