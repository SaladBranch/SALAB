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

    <link rel="stylesheet" href="/salab/resources/css/admin/adminFaq.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
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
                        <p>${loginAdmin.adminid }<i class="fas fa-chevron-down"></i></p>
                        <div class="profile-dropmenu">
                            <ul class="profile-menus">
                                <li><a href="adminLogout.do">로그아웃</a></li>
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
            <div class="ad-member">
                <a href="adminMember.do">회원정보</a>
            </div>
            <div class="ad-notice">
                <a href="adminNoticeList.do">공지사항</a>
            </div>
            <div class="ad-faq active-menu">
                <a href="adminFaqList.do">자주 찾는 질문</a>
            </div>
            <div class="ad-qna">
                <a href="adminQna.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    	<div class="faq_top">
    		<p>자주 하는 질문</p>
    	</div>
        <div class="faq_bottom">
        	<ul>
        		<li class="faq_btn">
        			<input type="button" class="faqInsert-btn" value="NEW">
        		</li>
        		<c:forEach var="faq" items="${requestScope.adminFaqList }">
	        		<li class="faq_open">
	        			<ul>
							<li class="faq_open_category"><span>${faq.faqcategory }</span></li>
							<li class="faq_open_title"><span>${faq.faqtitle }</span></li>
							<li class="faq_open_plus"><span>+</span></li>
							<li class="faq_open_minus"><span>-</span></li>
							<div class="faq_box">
								<p>${faq.faqcontent }</p>
							</div>
		        		</ul>
	        		</li>
        		</c:forEach>
        	</ul>
        </div>
    </div>
    
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/admin/admin.js"></script>
    
</body>
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

<!-- new click -->
<script type="text/javascript">
$(function(){
	$(".faqInsert-btn").click(function(){
		location.href="adminFaqInsert.do";
	});
});
</script>
<!-- new click -->
</html>