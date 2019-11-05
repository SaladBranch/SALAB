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
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <title>휴지통 | Salab</title>
</head>
<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">휴지통</div>
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
                                <li><a href="#">계정 설정하기</a></li>
                                <li><a href="#">도움말</a></li>
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
            <div class="recent-file">
                <div class="icon-wrapper"><i class="far fa-clock"></i></div>
                <a href="recentFile.do">최근 파일</a>
            </div>
            <div class="private-file">
                <div class="icon-wrapper"><i class="far fa-file"></i></div>
                <a href="privateFile.do">개인 파일</a>
            </div>
            <div class="trashcan active-menu">
                <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>
                <a href="trashCan.do">휴지통</a>
            </div>
        </div>
        <div class="left-middle-side-bar">
            <div class="new-team">
                <div class="icon-wrapper"><i class="far fa-object-group"></i></div>
                <a href="#">새로운 팀 </a>
            </div>
        </div>
    </div>
    <div id="right-click-menu" class="right-click-menu">
        <ul>
            <li><a href="#">파일복구</a></li>
            <li><a href="#">파일 영구 삭제</a></li>
        </ul>
    </div>
    <div id="multi-right-click-menu" class="multi-right-click-menu">
        <ul>
            <li><a href="#"><span></span>개 파일 복구</a></li>
            <li><a href="#"><span></span>개 파일 영구 삭제</a></li>
        </ul>
    </div>
    <div class="right-main-side">
        <div class="focus"></div>
        <div class="sort-standard">
            <div class="sort-by">
                <div class="sort-by-mention">
                <i class="fas fa-chevron-down"></i><span id="span-content">파일 삭제 일자</span>
                </div>
            </div>
            <div class="sort-standards">
                <ul>
                    <li><a href="#" class="sort-active">파일 삭제 일자</a></li>
                    <li><a href="#">파일 명</a></li>
                    <li><a href="#">파일 생성 일자</a></li>
                    <li><a href="#">최근 수정 일자</a></li>
                </ul>
            </div>
        </div>
        
        <div class="row recent-files">
            <div class="file-grid">
                <div class="file-container">
                    <div class="file-thumbnail">
                        
                    </div>
                    <div class="file-info">
                        <div class="about-file">
                            <div class="file-name">
                                Untitled
                            </div>
                            <div class="file-edited">
                                5분 전 편집 in 개인파일
                            </div>
                        </div>
                        <div class="file-options">
                            <div class="file-options-btn">&#8942;</div>
                            <div class="file-options-menu">
                                <ul>
                                    <li><a href="#">파일열기</a></li>
                                    <li><a href="#">파일 정보 설정</a></li>
                                    <li><a href="#">사본만들기</a></li>
                                    <li><a href="#">웹테스트</a></li>
                                    <li><a href="#">삭제</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="file-grid">
                <div class="file-container">
                    <div class="file-thumbnail">
                        
                    </div>
                    <div class="file-info">
                        <div class="about-file">
                            <div class="file-name">
                                Untitled
                            </div>
                            <div class="file-edited">
                                5분 전 편집 in 개인파일
                            </div>
                        </div>
                        <div class="file-options">
                            <div class="file-options-btn">&#8942;</div>
                            <div class="file-options-menu">
                                <ul>
                                    <li><a href="#">파일열기</a></li>
                                    <li><a href="#">파일 정보 설정</a></li>
                                    <li><a href="#">사본만들기</a></li>
                                    <li><a href="#">웹테스트</a></li>
                                    <li><a href="#">삭제</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="file-grid">
                <div class="file-container">
                    <div class="file-thumbnail">
                        
                    </div>
                    <div class="file-info">
                        <div class="about-file">
                            <div class="file-name">
                                Untitled
                            </div>
                            <div class="file-edited">
                                5분 전 편집 in 개인파일
                            </div>
                        </div>
                        <div class="file-options">
                            <div class="file-options-btn">&#8942;</div>
                            <div class="file-options-menu">
                                <ul>
                                    <li><a href="#">파일열기</a></li>
                                    <li><a href="#">파일 정보 설정</a></li>
                                    <li><a href="#">사본만들기</a></li>
                                    <li><a href="#">웹테스트</a></li>
                                    <li><a href="#">삭제</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="file-grid">
                <div class="file-container">
                    <div class="file-thumbnail">
                        
                    </div>
                    <div class="file-info">
                        <div class="about-file">
                            <div class="file-name">
                                Untitled
                            </div>
                            <div class="file-edited">
                                5분 전 편집 in 개인파일
                            </div>
                        </div>
                        <div class="file-options">
                            <div class="file-options-btn">&#8942;</div>
                            <div class="file-options-menu">
                                <ul>
                                    <li><a href="#">파일열기</a></li>
                                    <li><a href="#">파일 정보 설정</a></li>
                                    <li><a href="#">사본만들기</a></li>
                                    <li><a href="#">웹테스트</a></li>
                                    <li><a href="#">삭제</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="file-grid">
                <div class="new-file">
                    &#43; 새 파일
                </div>
            </div>
        </div>
    </div>
    
    
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/recentFile/recentFile.js"></script>
</body>
</html>