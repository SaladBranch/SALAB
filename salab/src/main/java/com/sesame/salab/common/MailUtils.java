package com.sesame.salab.common;

import java.io.UnsupportedEncodingException;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailUtils {
	private JavaMailSender mailSender;
	private MimeMessage message;
	private MimeMessageHelper messageHelper;
	
	public MailUtils(JavaMailSender mailSender) throws MessagingException{
		this.mailSender = mailSender;
		message = this.mailSender.createMimeMessage();
		messageHelper = new MimeMessageHelper(message, true, "UTF-8");
	}
	
	public void setSubject(String subject) throws MessagingException{
		messageHelper.setSubject(subject);
	}
	
	public void setText(String htmlContent) throws MessagingException{
		messageHelper.setText(htmlContent, true);
	}
	
	public void setFrom(String email, String name) throws MessagingException, UnsupportedEncodingException{
		messageHelper.setFrom(email, name);
	}
	
	public void setTo(String email) throws MessagingException{
		messageHelper.setTo(email);
	}
	
	public void addInline(String contentId, DataSource dataSource) throws MessagingException{
		messageHelper.addInline(contentId, dataSource);
	}
	
	public void send() {
		mailSender.send(message);
	}
	
	public String emailCITemplate(String uemail, String authkey) {
		String template = new StringBuffer().append("<div style='width: 500px; height: 200px; border: 2px solid #3ec28f; border-radius: 10px; margin: 0 auto;'>")
				.append("<h1 style='font-size: 20px; padding-left: 20px; margin-top: 30px;'>[SALAB]이메일 인증</h1>")
				.append("<p style='padding-left: 20px; margin-top: 30px;'>아래의 버튼을  클릭하시면 이메일 인증이 완료됩니다.</p>")
				.append("<form action='http://localhost:8888/salab/emailchk.do' method='post' target='_blank' style='margin-top: 20px;'>")
				.append("<input type='hidden' name='useremail' value='" + uemail +"'>")
				.append("<input type='hidden' name='userauthkey' value='"+ authkey +"'>")
				.append("<button style='border:0; background: #26b17b; border-radius: 5px; padding: 10px 10px; color: #fff; font-size: 15px; margin-left: 20px;'>이메일 인증 확인</button>")
				.append("</form></div>")
				.toString();
		return template;
	}

	public String findPwdTemplate(String uemail, String authkey) {
		String template = new StringBuffer().append("<div style='width: 500px; height: 200px; border: 2px solid #3ec28f; border-radius: 10px; margin: 0 auto;'>")
				.append("<h1 style='font-size: 20px; padding-left: 20px; margin-top: 30px;'>[SALAB]비밀번호 변경</h1>")
				.append("<p style='padding-left: 20px; margin-top: 30px;'>아래의 버튼을  클릭하시면 이메일 인증을 완료하고 비밀번호를 변경하실 수 있습니다.</p>")
				.append("<form action='http://localhost:8888/salab/pwdEmailchk.do' method='post' target='_blank' style='margin-top: 20px;'>")
				.append("<input type='hidden' name='useremail' value='" + uemail +"'>")
				.append("<input type='hidden' name='userauthkey' value='"+ authkey +"'>")
				.append("<button style='border:0; background: #26b17b; border-radius: 5px; padding: 10px 10px; color: #fff; font-size: 15px; margin-left: 20px;'>이메일 인증 확인</button>")
				.append("</form></div>")
				.toString();
		return template;
	}
	//프로젝트 초대메일 발신용
	public String projectInviteTemplate(String uno, int projectno) {
		String template = new StringBuffer().append("<div style='width: 500px; height: 200px; border: 2px solid #3ec28f; border-radius: 10px; margin: 0 auto;'>")
				.append("<h1 style='font-size: 20px; padding-left: 20px; margin-top: 30px;'>[SALAB]이메일 인증</h1>")
				.append("<p style='padding-left: 20px; margin-top: 30px;'>아래의 버튼을  클릭하시면 이메일 인증이 완료됩니다.</p>")
				.append("<form action='http://localhost:8888/salab/projectinvite.do' method='post' target='_blank' style='margin-top: 20px;'>")
				.append("<input type='hidden' name='userno' value='" + uno +"'>")
				.append("<input type='hidden' name='projectno' value='" + projectno +"'>")
				.append("<button style='border:0; background: #26b17b; border-radius: 5px; padding: 10px 10px; color: #fff; font-size: 15px; margin-left: 20px;'>초대 확인</button>")
				.append("</form></div>")
				.toString();
		return template;
	}

}
