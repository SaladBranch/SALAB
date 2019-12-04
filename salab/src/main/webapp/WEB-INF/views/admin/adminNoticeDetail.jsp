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
    
    <link rel="stylesheet" href="/salab/resources/css/admin/adminNoticeDetail.css" type="text/css">
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
                        <p>#<i class="fas fa-chevron-down"></i></p>
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
            <div class="ad-notice active-menu">
                <a href="adminNoticeList.do">공지사항</a>
            </div>
            <div class="ad-faq">
                <a href="adminFaq.do">자주 찾는 질문</a>
            </div>
            <div class="ad-qna">
                <a href="adminQna.do">1:1문의</a>
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
					<li>
						<input type="button" class="notice_back_btn" value="목록으로" onclick="back_notice();">
						<input type="button" class="notice_delete_btn" value="글 삭제" onclick="delete_notice();">
					</li>
				</ul>
			</div>
        </div>
        
    </div>
    
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/admin/admin.js"></script>
    
</body>

<!-- 목록으로 버튼 click -->
<script type="text/javascript">
function back_notice(){
	history.go(-1);
}
</script>
<!-- 목록으로 버튼 click -->

<!-- 글 삭제 버튼 click -->
<script type="text/javascript">
function delete_notice(){
	var result = confirm("삭제하시겠습니까?");
	if(result){
		location.href="adminNoticeDelete.do?noticeno=${requestScope.notice.noticeno }";
	}
	
}
</script>
<!-- 글 삭제 버튼 click -->


</html>