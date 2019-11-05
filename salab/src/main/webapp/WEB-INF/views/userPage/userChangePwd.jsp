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

    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">

    <link rel="stylesheet" href="/salab/resources/css/userPage/userPageCommon.css">
    <link rel="stylesheet" href="/salab/resources/css/userPage/uesrChangePwd.css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <title>USER | SALAB</title>
</head>

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
            <div id="menu-title">
                <span>계정 설정</span>
            </div>
            <div class="recent-file">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="#">계정정보</a>
            </div>
            <div class="private-file active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-file"></i></div>  -->
                <a href="#">비밀번호 변경</a>
            </div>
            <div class="trashcan">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="#">계정 업그레이드</a>
            </div>
        </div>
    </div>
        <div class="right-main-side">
    <section class="section-grid">
        <div class="box-grid">
            <div  class="box-title">
                <span>Change password</span>
            </div>
            <div class="box-content">
                <div class="sub-content">
                    <input type="password" class="input-grid" placeholder="Current Password" maxlength="20">
                </div>
                <div class="sub-content">
                    <input type="password" class="input-grid" placeholder="New Password" maxlength="20" >
                    <span>6~20자의 영문 대/소문자, 숫자, 특수문자 혼용 가능.</span>
                </div>
                <div class="sub-content">
                    <input type="password" class="input-grid" placeholder="Confirm Password" maxlength="20" >
                    <input type="button" value="변경하기">
                </div>
               
                    
              
            </div>
        </div>
    </section>
    </div>
</body>

</html>