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

    <link rel="stylesheet" href="/salab/resources/css/help/userQnA.css" type="text/css">
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
                <a href="userNotice.do">공지사항</a>
            </div>
            <div class="private-file">
                <!-- <div class="icon-wrapper"><i class="far fa-file"></i></div>  -->
                <a href="#">자주 찾는 질문</a>
            </div>
            <div class="trashcan active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="userQnA.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    	<div class="qna_top">
    		<p>1:1문의</p>
    	</div>
        <div class="qna_bottom">
        	<ul>
   				<li class="qna_head_check">
   					<input type="radio"><span>Y</span>
   				</li>
   				<li class="qna_head_check">
   					<input type="radio"><span>N</span>
   				</li>
   				<li>
   					<div class="qna_head_insert"></div>
   				</li>
        		<li class="qna_head">
        			<ul>
        				<li class="qna_head_sub" id="qna_no"><span>NO</span></li>
        				<li class="qna_head_sub" id="qna_title"><span>제목</span></li>
        				<li class="qna_head_sub" id="qna_date"><span>등록날짜</span></li>
        				<li class="qna_head_sub" id="qna_yn"><span>답변여부</span></li>
        			</ul>
        		</li>
        		<li class="qna_list">
        			<ul>
        				<li class="qna_head_sub" id="qna_no"><span>1</span></li>
        				<li class="qna_head_sub" id="qna_title"><a href="#"><span>새로운 업데이트 예정일이 언제인가요? </span></a></li>
        				<li class="qna_head_sub" id="qna_date"><span>19-10-23</span></li>
        				<li class="qna_head_sub" id="qna_yn"><span>N</span></li>
        			</ul>
        		</li>
        		<li class="qna_list">
        			<ul>
        				<li class="qna_head_sub" id="qna_null"><span>아직 등록된 문의가 없습니다.</span></li>
        			</ul>
        		</li>
        	</ul>
        </div>
    </div>

</body>
</html>