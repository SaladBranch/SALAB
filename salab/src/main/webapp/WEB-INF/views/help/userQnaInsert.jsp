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
    
    <link rel="stylesheet" href="/salab/resources/css/help/userQnaInsert.css" type="text/css">
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
                <span>도움말</span>
            </div>
            <div class="recent-file">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="noticelist.do">공지사항</a>
            </div>
            <div class="private-file">
                <!-- <div class="icon-wrapper"><i class="far fa-file"></i></div>  -->
                <a href="faqlist.do">자주 찾는 질문</a>
            </div>
            <div class="trashcan active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
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
				<form action="qnaInsert.do" id="qnainsert" method="post" enctype="multipart/form-data">
					<p class="qna_toAdmin">To. SALAB</p>
					<p class="qna_info">현재 1:1 문의 답변에 평균 7 ~ 14일 정도 소요될 수 있으며, 최대 20일 이상 지연될 수 있습니다.</p>
					<p class="qna_info">신속하게 답변드릴 수 있도록 최선을 다하겠습니다.</p>
					<p class="qna_info">기본적인 문의의 경우 FAQ를 통해 관련 내용을 확인하실 수 있으니 참고 부탁드립니다.</p>
					<p class="qna_info_faq"><u><a href="faqlist.do">FAQ바로가기</a></u></p>
					<ul>
						<li>
							<p class="qna_title">제목</p>
							<input type="text" id="qna_box_title" name="qnatitle">
						</li>
						<li>
							<p class="qna_content">내용</p>
							<textarea id="qna_box_content" name="qnacontent"></textarea>
						</li>
						<li>
							<span class="qna_back_btn" onclick="back_qna();">취소</span>
							<input type="button" value="등록" class="qna_success_btn" onclick="qna_insert();">
						</li>
					</ul>
				</form>
			</div>
        </div>
        
    </div>
    
</body>

<!-- 취소 버튼 click -->
<script type="text/javascript">
function back_qna(){	
	var check = confirm("취소 하시겠습니까?");
		if(check){ history.go(-1);}
}
</script>
<!-- 취소 버튼 click -->

<!-- 등록 버튼 click -->
<script type="text/javascript">
function qna_insert(){
	var qna_title = $("#qna_box_title").val();
	var qna_content = $("#qna_box_content").val();
	
	if(qna_title == ""){
		alert("제목을 입력해 주세요.");
		$("#qna_box_title").focus();
	} else if(qna_content == ""){
		alert("내용을 입력해 주세요.");
		$("#qna_box_content").focus();
	} else{
		alert("hi");
		$("#qnainsert").submit();
	}
}
</script>
<!-- 등록 버튼 click -->


</html>