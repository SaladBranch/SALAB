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

    <link rel="stylesheet" href="/salab/resources/css/admin/adminFaqInsert.css" type="text/css">
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
			<div class="faq_box">
				<p class="faq_fromAdmin">FAQ 등록</p>
				<form action="faqInsert.do" id="faqinsert" method="post" enctype="multipart/form-data">
					<ul>
						<li>
							<p class="faq_category">분류</p>
							<input type="text" id="faq_box_category" name="faqcategory" placeholder="결제/계정/오류/협업  > 택 1 입력">
						</li>
						<li>
							<p class="faq_title">제목</p>
							<input type="text" id="faq_box_title" name="faqtitle">
						</li>
						<li>
							<p class="faq_content">내용</p>
							<textarea id="faq_box_content" name="faqcontent"></textarea>
						</li>
						<li>
							<input type="button" class="faq_back_btn" value="목록으로" onclick="back_faq();">
							<input type="button" class="faq_insert_btn" value="글 등록" onclick="insert_faq();">
						</li>
					</ul>
				</form>
			</div>
        </div>
    </div>
    
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/admin/admin.js"></script>
    
</body>
<!-- 목록으로 버튼 click -->
<script type="text/javascript">
function back_faq(){
	var result = confirm("취소 하시겠습니까?");
	
	if(result){
		history.go(-1);
	}
}
</script>
<!-- 목록으로 버튼 click -->

<!-- 글 등록 버튼 click -->
<script type="text/javascript">
function insert_faq(){
	var fcategory = $("#faq_box_category").val();
	var ftitle = $("#faq_box_title").val();
	var fcontent = $("#faq_box_content").val();
	
	if(fcategory == ""){
		alert("분류코드를 작성해 주세요.")
		$("#faq_box_category").focus();
	} else if(ftitle == ""){
		alert("제목을 입력해 주세요.");
		$("#faq_box_title").focus();
	} else if(fcontent == ""){
		alert("내용을 입력해 주세요.");
		$("#faq_box_content").focus();
	} else{
		alert("hi");
		$("#faqinsert").submit();
	}
}
</script>
<!-- 글 등록 버튼 click -->
</html>