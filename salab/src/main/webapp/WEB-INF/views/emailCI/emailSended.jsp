<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width:device-width, initial-scale:1.0;">
    <link rel="stylesheet" href="/salab/vendors/css/grid.css">
    <link rel="stylesheet" href="/salab/vendors/css/normalize.css">
    <link rel="stylesheet" href="/salab/resources/css/common.css">
    <link rel="stylesheet" href="/salab/resources/css/header.css">
    <link rel="stylesheet" href="/salab/resources/css/footer.css">
    <link rel="stylesheet" href="/salab/resources/css/emailCI/emailCI.css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
    
    <link rel="stylesheet" href="/salab/resources/css/mainQuery.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
	<title>이메일 전송 | SALAB</title>
</head>
<body>
	<c:import url="../header.jsp" />
	
    <section class="section-noti">
        <div class="row notification">
            <h2>인증메일이 전송되었습니다!</h2>
            <p><span class="uemail">${uemail }</span> 로 인증메일이 전송되었습니다.<br>${mention }</p>
            <a href="https://www.${mailLink }" class="btn btn-full" target="_blank">${mailLink }로 이동</a>
            <a class="btn btn-ghost" href="resendMail.do?uemail=${uemail}&type=resend">인증메일 다시 전송</a>
        </div>
    </section>
    
	<c:import url="../footer.jsp" />
	
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/main.js"></script>
    <script type="text/javascript">
		$(function(){
    		$('.google-login').on('click', function(){
    			location.href = "${google_url}";
    		});
    	});
    </script>
</body>
</html>