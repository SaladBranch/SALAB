package com.sesame.salab.payment.model.vo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduling {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	public Scheduling() {}
	
	@Scheduled(cron="0/10 * * * * ?")
	public void send() {
		/*logger.info("똑딱");*/
	}
}
