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
    <link rel="stylesheet" href="/salab/resources/css/userPage/userPageMain.css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>

    <title>USER | SALAB</title>
</head>

<body>

    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div id="top-bar">계정 설정</div>
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
            <div class="recent-file active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="userMain.do">계정정보</a>
            </div>
            <div class="trashcan">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="userUpgrade.do">계정 업그레이드</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
        <div>

            <div id="userImg">
                <div class="inputImg">
                    <label id="imgLabel" for="imgUpload">
                        <div id="pImage"><span>사진변경</span></div>
                    </label>
                    <input type="file" id="imgUpload">
                </div>
                <div id="userEmail">
                    ${loginMember.useremail }
                </div>
            </div>
        </div>
        <div>

            <div class="division section-grid">
                <div class="content-box ">
                    <!--if PREMIUM-->
                    <div class="">
                        <div class="outline-box">
                            <div class="titleConfigure">
                                <span>Account Grade</span>
                            </div>
                            <div class="show-grade grade-title clickable">
                                PREMIUM GRADE
                            </div>
                        </div>
                        <div id="first-payment-date">
                            <div class="titleConfigure"><span>First-payment.</span></div>
                            <div class="contentConfigure"><span>2019년 12월 22일</span></div>
                        </div>
                        <div id="next-payment-date">
                            <div class="titleConfigure "><span>Next-payment.</span></div>
                            <div class="contentConfigure"><span>2019년 12월 22일</span></div>
                        </div>
                    </div>
                    <!-- if STANDARD -->
                    <div class="disable">
                        <div class="outline-box">
                            <div class="titleConfigure">
                                <span>Account Grade</span>
                            </div>
                            <div class="show-grade">
                                <span class="">STANDARD GRADE</span>
                            </div>
                        </div>
                        <div>
                            SALAB의 PREMIUM 기능을 확인하세요 !
                            <div id="standard-description">
                                <div class="description-title">
                                    <span>MESSENGER in file</span>
                                    <p>동시 메신저 기능을 지원합니다.<br>같은 페이지를 작업하는 팀원과의 원활한 소통을 위한, 메신저 기능이 기다리고 있습니다.</p>
                                </div>
                                <div class="description-title ">
                                    <span>MOUSE TRACKING</span>
                                    <p>팀원의 마우스커서를 보여줍니다. <br>내가 작업함과 동시에, 팀원이 현재 작업중인 파티션을 확인할 수 있습니다. </p>
                                </div>
                                <div class="description-title ">
                                    <span>TRANS-CO</span>
                                    <p>작업한 페이지를 code화 하여 보여줍니다.<br>TRANS-CO를 활용한다면, FRONT 구현에 시간을 덜 낭비할 수 있습니다.</p>
                                </div>
                            </div>
                        </div>
                        <div id="goto-upgrade" class="clickable">
                            <span>계정 업그레이드 하기</span>
                        </div>
                    </div>
                </div>
                <div id="goto-FAQ" class="escapeSentence">등급에 관련하여 궁금하신 사항이 있으신가요?</div>
            </div>
            <div class="division section-grid">
                <div id="id-Info" class="content-box">

                    <div class="outline-box">
                        <div id="nameTitle" class="titleConfigure">Name</div>
                        <div id="userId" class="contentConfigure blank">${loginMember.username }
                            <span class="blank clickable">change name !</span>
                        </div>
                    </div>
                    <div class="outline-box">
                        <div id="pwdTitle" class="titleConfigure outline">
                            Password
                        </div>
                        <div id="userpwd" class="contentConfigure blank">
                            <span class="blank clickable">change password !</span>
                        </div>
                    </div>
                    <div>
                        <div id="deleteTitle" class="clickable">
                            <span class="">계정을 포함한 SALAB과 관련된 모든 정보들을 삭제하고 싶으신가요?</span>
                        </div>
                    </div>
                </div>
                <div class="escapeSentence">logout</div>
            </div>
        </div>
    </div>
    <!-- modal-->
    <div>
        <div class="modalOutline z-index1 disable ">
            <div id="changeName" class="modalContent z-index3">
                <div class="titleConfigure">
                    Change Name
                </div>
                <input class="text-box block littleGap" type="text" placeholder="${loginMember.username }" maxlength="20">
                <input class="" type="button" id="id-change-btn" value="Name Change">
            </div>
        </div>
        <div class="modalOutline z-index2 disable">
            <div id="box-changePwd" class="modalContent">
                <div class="titleConfigure littlegap">
                    <span>Change Password</span>
                </div>
                <div>
                    <input type="password" class="input-grid" placeholder="Current Password" maxlength="20">
                    <div id="pwdChangeEx">
                        <span>6~20자의 영문 대/소문자, 숫자, 특수문자 혼용 가능.</span>
                    </div>
                    <input type="password" class="input-grid" placeholder="New Password" maxlength="20">

                    <input type="password" class="input-grid" placeholder="Confirm Password" maxlength="20">
                    <input type="button" value="Password Change">
                </div>
            </div>
        </div>
        <div class="modalOutline z-index3 disable">
            <div class="modalContent">
                <div id="delete-title" class="">
                    <span>Delete account.</span>
                </div>
                <div class="box-content">
                    <ul>
                        <li>모든 프로젝트와 데이터들도 삭제되며 복구가 불가능 하게 됩니다.</li>
                        <li>(협업 프로젝트는 팀원 중 한명에게 팀장 권한이 양도됩니다 )</li>
                    </ul>
                </div>
                <div id="deleteConfirm" class="">
                    <input id="deletePwd" type="password" class="text-box block littleGap" placeholder="PASSWORD" maxlength="20">
                    <input id="delete-btn" type="button" value="Agree & Delete">
                </div>
            </div>
        </div>
    </div>
</body>

</html>