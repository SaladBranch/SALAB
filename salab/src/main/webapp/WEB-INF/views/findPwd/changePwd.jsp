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
	<title>비밀번호 변경 | SALAB</title>
</head>
<body>
	<c:import url="../header.jsp" />
	
    <section class="section-findpwd">
        <div class="row newpwd">
            <h2>비밀번호 재설정</h2>
            <p>새로운 비밀번호를 입력해주세요.<br><span>비밀번호는 영소문자로 숫자나 특수문자를 하나 이상 포함하여 20글자 미만으로 지정해주세요.</span></p>
            <form action="initChangePwd.do" name="findPwdForm" class="findPwdForm" method="post">
            	<input type="hidden" name="useremail" value="${pmember.useremail }">
            	<input type="hidden" name="userauthkey" value="${pmember.userauthkey }">
            	<input type="password" placeholder="새 비밀번호" name="userpwd" class="newpwd" required>
            	<input type="password" placeholder="비밀번호 확인" name="userpwdchk" class="newpwdchk" required>
	            <button type="submit" class="btn btn-full" onclick="validPwd();">비밀번호 변경</button>
            </form>
        </div>
    </section>
	
	<c:import url="../footer.jsp" />
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/toast.js"></script>
    <script type="text/javascript" src="/salab/resources/js/main.js"></script>
    <script type="text/javascript">
    	function validPwd(){
    		var regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    		var form = document.findPwdForm;
    		var pwd = form.userpwd;
    		var pwdchk = form.userpwdchk;
    		var $button = $('.findPwdForm button');
    		if(!isValidPwd(pwd))
    			return false;
    		else if(pwdchk.value == ""){
    	    	event.preventDefault();
    	    	alertDangerToast("비밀번호를 다시 한 번 입력해주세요", pwdchk);
    	    	return false;
    		}else if(pwdchk.value != pwd.value){
    	    	event.preventDefault();
    	    	alertDangerToast("비밀번호를 정확하게 입력해주세요", pwdchk);
    	    	return false;
    		}else{
    			return true;
    		}
    	}
    </script>
</body>
</html>