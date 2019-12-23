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
    
    <link rel="stylesheet" href="/salab/resources/css/help/userNoticeDetail.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
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
                   <a href="recentFile.do?sort=recent"><img src="/salab/resources/img/logo.png"></a>
                </div>
                <div class="top-bar-logotext"><a href="recentFile.do?sort=recent">SALAB</a></div>
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
                        <c:if test="${empty sessionScope.loginMember.userprofile_r}">
                                <img src="/salab/resources/img/default_profile.png" alt="">
                        </c:if>
                        <c:if test="${!empty sessionScope.loginMember.userprofile_r}">
                                <img src="/salab/resources/userUpfiles/${sessionScope.loginMember.userprofile_r}" alt="">
                        </c:if>
                    </div>
                    <div class="profile-name">
                        <p>${loginMember.username }<i class="fas fa-chevron-down"></i></p>
                        <div class="profile-dropmenu">
                            <ul class="profile-menus">
                                <li><a href="userMain.do">계정 설정하기</a></li>
                                <li><a href="usernotice.do">도움말</a></li>
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
                <span><a href="noticelist.do">도움말</a></span>
            </div>
            <div class="recent-file active-menu">
                <a href="noticelist.do">공지사항</a>
            </div>
            <div class="private-file">
                <a href="faqlist.do">자주 하는 질문</a>
            </div>
            <div class="trashcan">
                <a href="qnalist.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    
    	<div class="notice_top">
    		<p>공지사항</p>
    	</div>
    	
        <div class="notice_bottom">
			<div class="notice_box">
				<p class="notice_fromAdmin">From. SALAB</p>
				<ul>
					<li>
						<p class="notice_title">제목</p>
						<input type="text" id="notice_box_title" name="notice_box_title" readonly value="${requestScope.notice.noticetitle }">
					</li>
					<li>
						<p class="notice_content">내용</p>
						<textarea id="notice_box_content" name="notice_box_content" readonly="readonly">${requestScope.notice.noticecontent }</textarea>
					</li>
					<li class="back_btn">
						<button class="notice_back_btn btn btn-full" onclick="back_notice();">목록으로</button>
					</li>
				</ul>
			</div>
        </div>
        
    </div>
    
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/help/help.js"></script>
    
</body>

<!-- 목록으로 버튼 click -->
<script type="text/javascript">
function back_notice(){
	history.go(-1);
}
</script>
<!-- 목록으로 버튼 click -->


</html>