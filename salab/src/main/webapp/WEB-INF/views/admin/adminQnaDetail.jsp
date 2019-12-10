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

    <link rel="stylesheet" href="/salab/resources/css/admin/adminQnaDetail.css" type="text/css">
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
                    <a href="logoutMain.do"><img src="/salab/resources/img/logo.png"></a>
                </div>
                <div class="top-bar-logotext"><a href="logoutMain.do">SALAB</a></div>
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
                <a href="adminMemberList.do">회원정보</a>
            </div>
            <div class="ad-notice">
                <a href="adminNoticeList.do">공지사항</a>
            </div>
            <div class="ad-faq">
                <a href="adminFaqList.do">자주 찾는 질문</a>
            </div>
            <div class="ad-qna active-menu">
                <a href="adminQnaList.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    	<div class="qna_top">
    		<p>1:1문의</p>
    	</div>
    	
        <div class="qna_bottom">
			<div class="qna_box">
				<form action="adminQnaUpdate.do?qnano=${requestScope.qna.qnano }" id="adminQnaUpdate" method="post" enctype="multipart/form-data">
					<p class="qna_fromMember">From. Member</p>
					<ul>
						<li>
							<p class="qna_title">제목</p>
							<input type="text" id="qna_box_title" name="qnatitle" value="${requestScope.qna.qnatitle }" readonly >
						</li>
						<li>
							<p class="qna_content">내용</p>
							<textarea id="qna_box_content" name="qnacontent" readonly="readonly" >${requestScope.qna.qnacontent }</textarea>
						</li>
						<c:if test="${empty requestScope.qna.qnareplycontent }">
							<li>
								<p class="qna_ans">답변</p>
								<textarea id="qna_box_ans" name="qnareplycontent" placeholder="아직 요청하신 문의가 작성되지 않았습니다. 빠른 시일 내로 답변드리겠습니다."></textarea>
							</li>
							<li class="back_btn">
								<button type="button" class="qna_back_btn btn btn-full" onclick="back_qna();">목록으로</button>
							</li>
							<li class="update_btn">
								<button type="button" class="qna_update_btn btn btn-full" onclick="update_qna();">답변 등록</button>
							</li>
						</c:if>
						<c:if test="${!empty requestScope.qna.qnareplycontent }">
							<li>
								<p class="qna_ans">답변</p>
								<textarea id="qna_box_ans" name="qnareplycontent" readonly="readonly" >${requestScope.qna.qnareplycontent }</textarea>
							</li>
							<li class="back_btn">
								<button type="button" class="qna_back_btn btn btn-full" onclick="back_qna();">목록으로</button>
							</li>
							<li class="update_btn">
								<button type="button" class="qna_update_btn btn btn-full" onclick="finished_update();">답변 등록</button>
							</li>
						</c:if>
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
function back_qna(){
	var result = confirm("취소 하시겠습니까?");
	
	if(result){
		history.go(-1);
	}
}
</script>
<!-- 목록으로 버튼 click -->

<!-- 글 수정 버튼 click -->
<script type="text/javascript">
function update_qna(){
	var qreply = $("#qna_box_ans").val();
	
	if(qreply == ""){
		alert("답변을 입력해 주세요.");
		$("#qna_box_ans").focus();
	} else{
		$("#adminQnaUpdate").submit();
	}
}
</script>
<!-- 글 수정 버튼 click -->

<!-- 수정 후 click -->
<script type="text/javascript">
function finished_update(){
	alert("이미 수정한 문의입니다.");
}
</script>
<!-- 수정 후 click -->

</html>