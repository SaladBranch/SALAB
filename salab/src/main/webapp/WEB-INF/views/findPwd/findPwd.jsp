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
    <link rel="stylesheet" href="/salab/vendors/css/toast.css">
    <link rel="stylesheet" href="/salab/resources/css/common.css">
    <link rel="stylesheet" href="/salab/resources/css/header.css">
    <link rel="stylesheet" href="/salab/resources/css/footer.css">
    <link rel="stylesheet" href="/salab/resources/css/emailCI/emailCI.css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
    
    <link rel="stylesheet" href="/salab/resources/css/mainQuery.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
	<title>비밀번호 찾기 | SALAB</title>
</head>
<body>
	<c:import url="../header.jsp" />
	
    <section class="section-findpwd">
        <div class="row findpwd">
            <h2>비밀번호 재설정</h2>
            <p>등록하신 계정의 이메일을 입력해주세요.</p>
            <form action="" name="findPwdForm" class="findPwdForm" method="post">
	            <input type="email" name="findPwdMail" class="findPwdMail" required>
	            <button type="submit" class="btn btn-full" onclick="validEmail();">인증메일 전송</button>
            </form>
        </div>
    </section>
	
	<c:import url="../footer.jsp" />
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/toast.js"></script>
    <script type="text/javascript" src="/salab/resources/js/main.js"></script>
    <script type="text/javascript">
    	function validEmail(){
    		var form = document.findPwdForm;
    		var email = form.findPwdMail;
    		var $button = $('.findPwdForm button');
    		var origintext = $button.text();
    		
    		if(!isValidEmail(email))
    			return false;
    		else if(isExistEmail(email, $button == "none")){
    			event.preventDefault();
    			alertDangerToast("등록되지 않은 이메일입니다.", email);
    			return false;
    		}else{
    			$loader = $("<div class='loader'></div>");
    			$button.text("");
    			$button.html($loader);
    			return true;
    		}
    	}
    </script>
</body>
</html>