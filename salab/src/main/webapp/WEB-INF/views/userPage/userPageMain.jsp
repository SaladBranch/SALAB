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

    <link rel="stylesheet" href="../../../resources/css/userPage/userPageCommon.css">
    <link rel="stylesheet" href="../../../resources/css/userPage/userPageMain.css">

    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFile.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">

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
                <div class="add-btn">&#43</div>
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
            <div class="recent-file active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="#">계정정보</a>
            </div>
            <div class="private-file">
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
        <div>
            <section id="ipersonalInfo">
                <div id="pImageBox">
                    <div id="userImg">
                        <div id="pImage">
                            <div class="inputImg">
                                <label id="imgLabel" for="imgUpload">사진변경</label>
                                <input type="file" id="imgUpload">
                            </div>
                        </div>
                        <div id="userEmail">
                            <span class="horizontally">${loginMember.username }</span>
                        </div>
                    </div>
                </div>
                <div id="id-Info">
                    <div id="info-title">
                        <span>내 계정 정보</span>
                    </div>
                    <div id="id-changeBox">
                        <div id="userid">유저 이름</div>
                        <div>
                            <input id="id-change" type="text" placeholder="Ssdfa" maxlength="20">
                            <input type="button" id="id-change-btn" value="이름 변경하기">
                        </div>
                    </div>
                </div>
                <div id="delete-id">
                    <span>계정을 포함한 SALAB과 관련된 모든 정보들을 삭제하고 싶으신가요?</span>
                </div>
            </section>
            <section id="deleteAccount">
                <span>계정과 관련된 모든 것이 삭제됩니다</span>
                <div>
                    <ul>
                        <li>유저 계정정보가 모두 삭제됩니다.</li>
                        <li>해당 계정으로 업로드된 모든 데이터가 삭제됩니다</li>
                        <li>
                            <p>그동안 작업한 모든 프로젝트와 데이터들도 삭제되며 복구가 불가능 하게 됩니다.<br>(개인 프로젝트는 곧 바로 삭제되며, 협업 프로젝트는 팀원 중 한명에게 팀장 권한이 양도됩니다 )</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <input placeholder="ID">
                    <input placeholder="PASSWORD">
                    <input type="checkbox"><span>주의사항을 확인하였고 동의합니다.</span>
                    <input type="button" value="계정 삭제하기">
                </div>
            </section>
        </div>
    </div>

</body>
</html>