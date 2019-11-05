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
    <link rel="stylesheet" href="/salab/resources/css/userPage/Upgrade.css">

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
            <div class="recent-file ">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="#">계정정보</a>
            </div>
            <div class="private-file ">
                <!-- <div class="icon-wrapper"><i class="far fa-file"></i></div>  -->
                <a href="#">비밀번호 변경</a>
            </div>
            <div class="trashcan active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="#">계정 업그레이드</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
        <section class="section-grid">
            <div class="section-title">
                <span>계정 업그레이드</span>
            </div>
            <div class="box-outline">
                <div id="section-header">
                    <div class="cube">STANDARD</div>
                    <div class="cube">PREMINUM</div>
                </div>
                <div id="section-body">
                    <table>
                        <tr>
                            <th>basic 입력 기능</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>생성가능한 프로젝트</th>
                            <td>5개</td>
                            <td>40개</td>
                        </tr>
                        <tr>
                            <th>최대 협업 수</th>
                            <td>3인</td>
                            <td>10인</td>
                        </tr>
                        <tr>
                            <th>프로젝트 별 페이지 수</th>
                            <td>10페이지</td>
                            <td>40페이지</td>
                        </tr>
                        <tr>
                            <th>디바이스 테스트</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>24시 HOT-LINE</th>
                            <td>일부 지원</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Element Library</th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Team Board</th>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                </div>
                <div id="section-bottom">
                    <span>월 11$에 SALAB의 모든 기능을 사용해보세요 !</span>
                    <input type="button" value="PREMIUM 등록하기">
                </div>
            </div>


        </section>
    </div>
</body>

</html>