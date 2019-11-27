<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width:device-width, initial-scale:1.0;">
    <link rel="stylesheet" href="/salab/vendors/css/normalize.css" type="text/css">
    <link rel="stylesheet" href="/salab/vendors/css/grid.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/common.css" type="text/css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
    
     <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFile.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/project/teamNoticeCommon.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/project/teamNoticeDetail.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <script type="text/javascript">
    function epFile(no){
    	var fileno = no;
    	var userno = ${loginMember.userno};
    	location.href="epFile.do?userno="+ userno + "&fileno=" +fileno;
    }
    </script>
    <title>Project | Salab</title>
</head>

<body>
<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">최근 파일</div>
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
                <div class="add-btn">&#43;</div>
                <div class="user-profile">
                    <div class="profile-img">
                        <img src="/salab/resources/img/default_profile.png" alt="">
                    </div>
                    <div class="profile-name">
                        <p>${loginMember.username }<i class="fas fa-chevron-down"></i></p>
                        <div class="profile-dropmenu">
                            <ul class="profile-menus">
                                <li><a href="userMain.do">계정 설정하기</a></li>
                                <li><a href="userNotice.do">도움말</a></li>
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
            <div class="search-bar">
                <i class="fas fa-search" id="search-icon"></i>
                <input type="text" id="search-text" placeholder="검색" maxlength="20">
            </div>
            <div class="recent-file active-menu">
                <div class="icon-wrapper"><i class="far fa-clock"></i></div>
                <a href="recentFile.do">최근 파일</a>
            </div>
            <div class="private-file">
                <div class="icon-wrapper"><i class="far fa-file"></i></div>
                <a href="privateFile.do">개인 파일</a>
            </div>
            <div class="trashcan">
                <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>
                <a href="trashCan.do">휴지통</a>
            </div>
        </div>
        <div class="left-middle-side-bar">
            <div class="new-team">
                <div class="icon-wrapper"><i class="far fa-object-group"></i></div>
                <a href="newTeam.do">새로운 팀 </a>
            </div>
        </div>
    </div>
    <div class="right-main-side">
        <div class="focus"></div> <!-- 여백 -->
        <div class="sort-by  absolute icon-positioning">
           <i class="fas fa-chevron-left"></i>
        </div>
        <sector>
            <div class="notice-grid">
                <div class="notice-header">공지사항</div>
                <div class="notice-body">
                    <div>
                        <div class="notice-title">
                            <input class="hideInputText" type="text" placeholder=" :Notice Title" maxlength="40">
                            <span id="writedDate">18.11.10</span>

                        </div>
                        <div id="check">
                            <textarea class="notice-contentbox" rows="12" placeholder=":Notice Content" ></textarea>
                        </div>

                    </div>
                    <div class="buttonbox">
                        <div class="button">
                            수정하기
                        </div>
                        <div class="button">
                            삭제하기
                        </div>
                    </div>
                </div>
            </div>


        </sector>



    </div>

    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/recentFile/recentFile.js"></script>
</body>
</html>