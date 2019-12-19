<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width:device-width, initial-scale:1.0;">
    <link rel="stylesheet" href="/salab/vendors/css/normalize.css" type="text/css">
    <link rel="stylesheet" href="/salab/vendors/css/grid.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/common.css" type="text/css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">

    <link rel="stylesheet" href="/salab/resources/css/admin/adminMain.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <title>USER | SALAB</title>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">관리자</div>
            </div>
            <div class="top-bar-logo">
                <div class="top-bar-logoimg">
                    <a href="adminMain.do"><img src="/salab/resources/img/logo.png"></a>
                </div>
                <div class="top-bar-logotext"><a href="adminMain.do">SALAB</a></div>
            </div>
            <div class="top-bar-children" id="top-bar-right">
                <div class="mobile-top-bar-left">
                    <div class="toggle-menu">
                        <input type="checkbox">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div class="right-main-side">
    	<div class="login_box">
    		<div class="box-top">
    			<ul>
    				<li>
    					<p class="login-text">로그인</p>
    				</li>
    			</ul>
    		</div>
    		<div class="box-middle">
    			<form action="adminLogin.do" id="adminLogin" method="post" enctype="multipart/form-data">
    				<input type="text" id="in-id" name="adminid" placeholder="아이디">
    				<input type="password" id="in-pass" name="adminpwd" placeholder="비밀번호">
    			</form>
    		</div>
    		<div class="box-bottom">
    			<div class="login-box">
    				<button type="button" class="login-btn" id="login-btn"><i class="fas fa-arrow-right admin-login-arrow"></i></button>
    			</div>
    		</div>
    		<div class="box-footer">
    			<a href="main.do"><p class="gohome">SALAB으로 바로가시겠습니까?</p></a>
    		</div>
    	</div>
    </div>
    
</body>
<script type="text/javascript">
$(function(){
	$("#login-btn").click(function(){
		var adminId = $("#in-id").val();
		var adminPass = $("#in-pass").val();
		
		if(adminId == ""){
			alert("아이디를 입력해 주세요.");
			$("#in-id").focus();
		} else if(adminPass == ""){
			alert("비밀번호를 입력해 주세요.");
			$("#in-pass").focus();
		} else{
			$("#adminLogin").submit();
		}
	});
});
</script>



</html>