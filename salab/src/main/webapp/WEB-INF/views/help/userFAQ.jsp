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

    <link rel="stylesheet" href="/salab/resources/css/help/userFAQ.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <title>USER | SALAB</title>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">도움말</div>
            </div>
            <div class="top-bar-logo">
                <div class="top-bar-logoimg">
                    <a href="recentPage.html"><img src="/salab/resources/img/logo.png"></a>
                </div>
                <div class="top-bar-logotext"><a href="recentFile.do">SALAB</a></div>
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
                <div class="add-btn"></div>
                <div class="user-profile">
                    <div class="profile-img">
                        <img src="/salab/resources/img/default_profile.png" alt="">
                    </div>
                    <div class="profile-name">
                        <p>${loginMember.username }<i class="fas fa-chevron-down"></i></p>
                        <div class="profile-dropmenu">
                            <ul class="profile-menus">
                                <li><a href="#">계정 설정하기</a></li>
                                <li><a href="userfaq.do">도움말</a></li>
                                <li><a href="logout.do">로그아웃</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <div class="left-side-bar">
        <div class="left-top-side-bar">
            <div class="menu-title">
                <span>도움말</span>
            </div>
            <div class="recent-file">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="userNotice.do">공지사항</a>
            </div>
            <div class="private-file active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-file"></i></div>  -->
                <a href="faqlist.do">자주 하는 질문</a>
            </div>
            <div class="trashcan">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="userQnA.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    	<div class="faq_top">
    		<p>자주 하는 질문</p>
    	</div>
        <div class="faq_bottom">
        	<ul>
        		<c:forEach var="faqlist" items="${requestScope.list }">
	        		<li class="faq_open">
	        			<ul>
							<li class="faq_open_category"><span>${faqlist.faqcategory }</span></li>
							<li class="faq_open_title"><span>${faqlist.faqtitle }</span></li>
							<li class="faq_open_plus"><span>+</span></li>
							<li class="faq_open_minus"><span>-</span></li>
							<div class="faq_box">
								<p>${faqlist.faqcontent }</p>
							</div>
		        		</ul>
	        		</li>
        		</c:forEach>
        	</ul>
        </div>
    </div>

</body>
<!-- 스크립트 -->

<!-- +click -->
<script type="text/javascript">
$(function() {
	$(".faq_box").hide();
	//숨김
	
	$(".faq_open").click(function(){
		console.log($(this).html());
		$(this).children("ul").children(".faq_open_minus").toggle();
		$(this).children("ul").children(".faq_open_plus").toggle();
		$(this).children("ul").children(".faq_box").slideToggle();
	});
});
</script>
<!-- +click -->



<!-- 스크립트 -->
</html>