<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	response.setStatus(200);
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>에러 발생 | Salab</title>
<link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css">
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css">
<script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script> 
<style type="text/css">
body {
	background : #27ad79;
}
.container {
	width : 1000px;
	margin : 100px auto 0px auto;
	text-align : center;
	color : white;
	font-weight : 700;
	font-family: 'NanumSquare', sans-serif;
}
.errorImage {
	width : 300px;
	height : 300px;
	margin : 0px auto 80px auto;
	font-family: 'NanumSquareRound', sans-serif;
}
.errorImage img {
	width : 200px;
	height : 200px;
	margin : 0px 50px 20px 50px;
	float : left;
	clear : both;
}
.errorImage span {
	margin : auto;
	float : left;
	clear : both;
}
.errorMsg {
	cursor : Default;
	margin : 0px auto 100px auto;
	font-family: 'NanumSquare', sans-serif;
}
.errorBtn {
	margin : auto;
	width : 500px;
	height : 80px;
	font-size : 25px;
	font-family: 'NanumSquare', sans-serif;
	line-height : 60px;
}
.button {
	width : 200px;
	height : 60px;
	background : #27ad79;
	color : white;
	border-radius : 5px;
	float : left;
	cursor : pointer;
	transition : background-color 0.3s, color 0.3s;
}
.button:hover {
	background : white;
	color : #27ad79;
	cursor : pointer;
}
</style>
</head>
<body>
	<div class="container">
		<div class="errorImage">
			<img src="/salab/resources/img/errorPage_white.png">
			<span style="font-size : 70px;">E R R O R</span>
		</div>
		<div class="errorMsg">
			<span style="font-size : 70px; margin-right : 20px;">[</span>
			<span style="font-size : 50px;">
			<c:if test="${!empty errorMsg}">
				${errorMsg }
			</c:if>
			<c:if test="${empty errorMsg}">
				${requestScope['javax.servlet.error.status_code']} Exception
			</c:if>
			</span>
			<span style="font-size : 70px; margin-left : 20px; clear : right">]</span>
		</div>
		<div class="errorBtn">
			<div class="button" style="margin-right : 100px;" onclick="location.href='main.do'">홈으로</div>
			<div class="button" onclick="location.href='javascript:history.back()'">이전으로</div>
		</div>
	</div>
</body>
</html>