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
    <link rel="stylesheet" href="/salab/resources/css/userPage/userUpgrade.css">

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
                <span>Settings</span>
            </div>
            <div class="recent-file">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="userMain.do">계정정보</a>
            </div>
            <div class="trashcan active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="userUpgrade.do" >계정 업그레이드</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
        <!-- Standard 등급 시 -->
        <section id="upgrade-section" class="">
            <div id="upgrade-title" class="section-title titleConfigure">
                <span>ACCOUNT UPGRADE</span>
            </div>
            <div class="box-outline">
                <div id="upgrade-header">
                    <div class="horizontally">STANDARD</div>
                    <div class="horizontally ">PREMINUM</div>
                </div>
                <div id="upgrade-body">
                    <table>

                        <tr>
                            <th>참여 가능한 프로젝트</th>
                            <td>5개</td>
                            <td>20개</td>
                        </tr>
                        <tr>
                            <th>파일 별 최대 페이지 수</th>
                            <td>5개</td>
                            <td>20개</td>
                        </tr>
                        <tr>
                            <th>최대 협업 수</th>
                            <td>3인</td>
                            <td>10인</td>
                        </tr>
                        <tr>
                            <th>LIBRARY</th>
                            <td>ONLY PERSONAL</td>
                            <td>PERSONAL / TEAM</td>
                        </tr>
                        <tr>
                            <th>MESSENGER in file</th>
                            <td>X</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th>MOUSE TRACKING</th>
                            <td>X</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th>TRANS-CO</th>
                            <td>X</td>
                            <td>Yes</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <div id="upgrade-bottom">
                        <div>월 11$에 SALAB의 모든 기능을 사용해보세요 !</div>
                        <input type="button" value="PREMIUM 등록하기">
                    </div>
                </div>
                <div id="goto-FAQ" class="escapeSentence">등급에 관련하여 궁금하신 사항이 있으신가요?</div>
            </div>

            <div id="horizon-line"></div>
        </section>

        <!-- premium 등급 시 -->
        <section id="upgrade-section" class="disable">
            <div id="upgrade-title" class="section-title titleConfigure">
                <span>ACCOUNT DOWNGRADE</span>
            </div>
            <div class="box-outline">
                <div id="upgrade-header">
                    <div class="horizontally">STANDARD</div>
                    <div class="horizontally ">PREMINUM</div>
                </div>
                <div id="upgrade-body">
                    <table>

                        <tr>
                            <th>참여 가능한 프로젝트</th>
                            <td>5개</td>
                            <td>20개</td>
                        </tr>
                        <tr>
                            <th>파일 별 최대 페이지 수</th>
                            <td>5개</td>
                            <td>20개</td>
                        </tr>
                        <tr>
                            <th>동시 협업 인원</th>
                            <td>3인</td>
                            <td>10인</td>
                        </tr>
                        <tr>
                            <th>LIBRARY</th>
                            <td>ONLY PERSONAL</td>
                            <td>PERSONAL / TEAM</td>
                        </tr>
                        <tr>
                            <th>MESSENGER in file</th>
                            <td>X</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th>MOUSE TRACKING</th>
                            <td>X</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <th>TRANS-CO</th>
                            <td>X</td>
                            <td>Yes</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <div id="downgrade-bottom">
                        <div>SALAB의 PREMIUM 기능들을 더 이상 사용하지 않으실껀가요?</div>
                        <input type="button" value="STANDARD로  변경하기">
                    </div>
                </div>
                <div id="goto-FAQ" class="escapeSentence">등급에 관련하여 궁금하신 사항이 있으신가요?</div>
            </div>

            <div id="horizon-line"></div>
        </section>
    </div>
</body>

</html>