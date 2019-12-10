<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width:device-width, initial-scale:1.0;">
    <link rel="stylesheet" href="/salab/vendors/css/normalize.css" type="text/css">
    <link rel="stylesheet" href="/salab/vendors/css/grid.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/common.css" type="text/css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
    
    <link rel="stylesheet" href="/salab/resources/css/admin/adminNoticeInsert.css" type="text/css">
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
                <a href="adminMemberList.do">회원정보</a>
            </div>
            <div class="ad-notice active-menu">
                <a href="adminNoticeList.do">공지사항</a>
            </div>
            <div class="ad-faq">
                <a href="adminFaqList.do">자주 찾는 질문</a>
            </div>
            <div class="ad-qna">
                <a href="adminQnaList.do">1:1문의</a>
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
				<form action="noticeInsert.do" id="noticeinsert" method="post" enctype="multipart/form-data">
					<ul>
						<li>
							<p class="notice_title">제목</p>
							<input type="text" id="notice_box_title" name="noticetitle">
						</li>
						<li>
							<p class="notice_content">내용</p>
							<textarea id="notice_box_content" name="noticecontent"></textarea>
						</li>
						<li>
							<input type="button" class="notice_back_btn" value="목록으로" onclick="back_notice();">
							<input type="button" class="notice_insert_btn" value="글 등록" onclick="insert_notice();">
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
function back_notice(){
	var result = confirm("취소 하시겠습니까?");
	
	if(result){
		history.go(-1);
	}
}
</script>
<!-- 목록으로 버튼 click -->

<!-- 글 등록 버튼 click -->
<script type="text/javascript">
function insert_notice(){
	var ntitle = $("#notice_box_title").val();
	var ncontent = $("#notice_box_content").val();
	
	if(ntitle == ""){
		alert("제목을 입력해 주세요.");
		$("#notice_box_title").focus();
	} else if(ncontent == ""){
		alert("내용을 입력해 주세요.");
		$("#notice_box_content").focus();
	} else{
		$("#noticeinsert").submit();
	}
}
</script>
<!-- 글 등록 버튼 click -->


</html>