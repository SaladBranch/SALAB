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

    <link rel="stylesheet" href="/salab/resources/css/admin/adminMemberDetail.css" type="text/css">
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
            <div class="ad-member active-menu">
                <a href="adminMemberList.do">회원정보</a>
            </div>
            <div class="ad-notice">
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
    	<div class="member_top">
    		<p>회원 정보</p>
    	</div>
    	
    	<div class="member_bottom">
			<div class="member_box">
				<p class="member_fromMember">Info. Member</p>
				<form action="adminMemberUpdate.do?userno=${requestScope.member.userno }" id="adminMemberUpdate" method="post" enctype="multipart/form-data">
					<ul>
						<li class="member_line">
							<img src="/salab/resources/img/logo.png" class="member_profile">
						</li>
						<li class="member_line">
							<p class="member_info">${requestScope.member.useremail }</p>
						</li>
						<li class="member_line">
							<input type="text" class="member_input" value="${requestScope.member.username }">
						</li>
						<li class="member_line">
							<input type="text" class="member_input" value="${requestScope.member.userphone }">
						</li>
						<li class="member_line">
							<p class="member_info">${requestScope.member.userenrolldate }</p>
						</li>
						<li class="member_line">
							<input type="text" class="member_input" value="${requestScope.member.userlevel }">
						</li>
						<li class="member_line">
							<p class="member_info">
								<c:if test="${!empty requestScope.member.paymentdate }">
									${requestScope.member.paymentdate }
								</c:if>
								<c:if test="${empty requestScope.member.paymentdate }">
									<span>결제예정일 정보 없음.</span>
								</c:if>
							</p>
						</li>
						<li>
							<input type="button" class="member_back_btn" value="목록으로" onclick="back_member();">
							<input type="button" class="member_update_btn" value="정보 수정" onclick="finished_update();">
						</li>
					</ul>
				</form>
			</div>
        </div>
        
        
    </div>
    
    
    <script type="text/javascript" src="/salab/resources/js/admin/admin.js"></script>
</body>

<!-- 목록으로 버튼 click -->
<script type="text/javascript">
function back_member(){
	history.go(-1);
}
</script>
<!-- 목록으로 버튼 click -->

<script type="text/javascript">

</script>


</html>