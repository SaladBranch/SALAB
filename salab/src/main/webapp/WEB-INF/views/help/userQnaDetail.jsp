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
    
    <link rel="stylesheet" href="/salab/resources/css/help/userQnaDetail.css" type="text/css">
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
                                <li><a href="userqna.do">도움말</a></li>
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
            <div class="recent-file">
                <a href="noticelist.do">공지사항</a>
            </div>
            <div class="private-file">
                <a href="faqlist.do">자주 하는 질문</a>
            </div>
            <div class="trashcan active-menu">
                <a href="qnalist.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    
    	<div class="qna_top">
    		<p>1:1문의</p>
    	</div>
    	
        <div class="qna_bottom">
			<div class="qna_box">
				<p class="qna_fromAdmin">From. SALAB</p>
				<p class="qna_info">기본적인 문의의 경우 FAQ를 통해 관련 내용을 확인하실 수 있으니 참고 부탁드립니다.</p>
				<p class="qna_info_faq"><a href="faqlist.do"><span class="go_faq"><u>FAQ바로가기</u></span></a></p>
				<ul>
					<li>
						<p class="qna_title">제목</p>
						<input type="text" id="qna_box_title" name="qna_box_title" value="${requestScope.qna.qnatitle }" readonly >
					</li>
					<li>
						<p class="qna_content">내용</p>
						<textarea id="qna_box_content" name="qna_box_content" readonly="readonly" >${requestScope.qna.qnacontent }</textarea>
					</li>
					<li>
						<p class="qna_ans">답변</p>
						<c:if test="${!empty requestScope.qna.qnareplycontent }">
							<textarea id="qna_box_ans" name="qna_box_ans" readonly="readonly" >${requestScope.qna.qnareplycontent }</textarea>
						</c:if>
						<c:if test="${empty requestScope.qna.qnareplycontent }">
							<textarea id="qna_box_ans" name="qna_box_ans" readonly="readonly" placeholder="아직 요청하신 문의가 작성되지 않았습니다. 빠른 시일 내로 답변드리겠습니다."></textarea>
						</c:if>
					</li>
					<li class="back_btn">
						<button type="button" class="qna_back_btn btn btn-full" onclick="back_qna();">목록으로</button>
					</li>
					<li class="success_btn">
						<button class="qna_delete_btn btn btn-full" onclick="qna_delete();">문의삭제</button>
					</li>
				</ul>
			</div>
        </div>
        
    </div>
    
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/help/help.js"></script>
    
</body>

<!-- 취소 버튼 click -->
<script type="text/javascript">
function back_qna(){
	history.go(-1);
}
</script>
<!-- 취소 버튼 click -->

<!-- 삭제 버튼 click -->
<script type="text/javascript">
function qna_delete(){
	var check = confirm("취소 하시겠습니까?");
	if(check){
		location.href="qnaDelete.do?qnano=${requestScope.qna.qnano }";
	}
}
</script>
<!-- 등록 버튼 click -->


</html>