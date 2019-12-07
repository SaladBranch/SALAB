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

    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">

    <link rel="stylesheet" href="/salab/resources/css/userPage/userPageCommon.css">
    <link rel="stylesheet" href="/salab/resources/css/userPage/userPageMain.css">

    <link rel="stylesheet" href="/salab/vendors/css/croppie.css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>

    <title>USER | SALAB</title>
</head>

<body>

    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div id="top-bar"><a href="userMain.do" class="z99">계정 설정</a></div>
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
            <div id="userImg-box">
                <div id="pImage">
                    <label id="imgLabel" for="userimg">
                        <div class="selectImg">
                            <c:if test="${empty sessionScope.loginMember.userprofile_r}">
                                <img src="/salab/resources/img/default_profile.png" alt="">
                            </c:if>
                            <c:if test="${!empty sessionScope.loginMember.userprofile_r}">
                                <img src="/salab/resources/userUpfiles/${sessionScope.loginMember.userprofile_r}" alt="">
                            </c:if>
                        </div>
                        <input type="file" id="userimg" accept="image/*">
                        <input type="hidden" name="base64img" id="base64img">
                    </label>
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
                    <c:if test="${sessionScope.loginMember.userlevel eq 'PREMIUM' }">
                        <div class="">
                            <div class="outline-box">
                                <div class="titleConfigure">
                                    <span>Account Grade</span>
                                </div>
                                <div class="show-grade grade-title">
                                    PREMIUM GRADE
                                </div>
                            </div>
                            <!--<div id="first-payment-date">
                                <div class="titleConfigure"><span>First-payment.</span></div>
                                <div class="contentConfigure"><span>2019년 12월 22일</span></div>
                            </div>-->
                            <div id="next-payment-date">
                                <div class="titleConfigure "><span>Next-payment.</span></div>
                                <div><span class="contentConfigure">${sessionScope.loginMember.paymentdate} 결제 예정</span></div>
                            </div>
                        </div>
                    </c:if>
                    <!-- if STANDARD -->
                    <c:if test="${sessionScope.loginMember.userlevel ne 'PREMIUM' }">
                        <div class="">
                            <div class="outline-box">
                                <div class="titleConfigure">
                                    <span>Account Grade</span>
                                </div>
                                <div class="show-grade">
                                    <a href="userUpgrade.do">
                                        <span class="">STANDARD GRADE</span>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div class="titleConfigure"> SALAB의 <span class="teamColor">PREMIUM</span> 기능을 확인하세요 !</div>

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
                                <span><a href="userUpgrade.jsp">계정 업그레이드 하기</a></span>
                            </div>
                        </div>
                    </c:if>
                </div>
                <div id="goto-FAQ" class="escapeSentence"><a href="#">등급에 관련하여 궁금하신 사항이 있으신가요?</a></div>
            </div>
            <div class="division section-grid">
                <div id="id-Info" class="content-box">

                    <div class="outline-box">
                        <div id="nameTitle" class="titleConfigure">Name</div>
                        <div id="userId" class=" blank"><span class="contentConfigure">${loginMember.username }</span>
                            <span id="Modal-Name" class="blank clickable" onclick="showModal('name')">change name !</span>
                        </div>
                    </div>
                    <div class="outline-box">
                        <div id="pwdTitle" class="titleConfigure outline">
                            Password
                        </div>
                        <div id="userpwd" class=" blank">
                            <span value="vv" id="Modal-Password" class="blank clickable" onclick="showModal('pwd')">change password !</span>
                        </div>
                    </div>
                    <div class="outline-box">
                        <div id="userPhoneTitle" class="titleConfigure">Phone</div>
                        <div id="userPhone" class="blank">
                            <span class="contentConfigure">
                                <c:if test="${loginMember.userphone eq null}">
                                    Please Change Phone Number.
                                </c:if>
                                <c:if test="${loginMember.userphone ne null}">
                                    ${loginMember.userphone }
                                </c:if>
                            </span>
                            <span id="Modal-userPhone" class="blank clickable" onclick="showModal('phone')">change Phone Number !</span>
                        </div>
                    </div>
                    <div id="deleteTitle">
                        <span id="Modal-Delete" class="clickable" onclick="showModal('delete')">계정을 포함한 SALAB과 관련된 모든 정보들을 삭제하고 싶으신가요?</span>
                    </div>
                </div>
                <div id="goto-logout" class="escapeSentence"><a href="logout.do">logout</a></div>
            </div>
        </div>
    </div>
    <!-- modal-->
    <div>
        <div id="modal-name" class="modalOutline disable ">
            <div id="changeName" class="modalContent z-index1">
                <div class="titleConfigure">
                    Change Name
                </div>
                <input id="userNo" type="hidden" value="${loginMember.userno }">
                <input id="newName" class="text-box block littleGap" type="text" placeholder="${loginMember.username }" maxlength="20" onkeydown="activeEnter('atName')">
                <input class="" type="button" id="id-change-btn" value="Name Change" onclick="nameChangedo()">
            </div>
        </div>
        <div id="modal-password" class="modalOutline disable">
            <div id="box-changePwd" class="modalContent z-index3">
                <div class="titleConfigure littlegap">
                    <span>Change Password</span>
                </div>
                <div>
                    <input id="password" type="password" class="input-grid" placeholder="Current Password" maxlength="20">
                    <div id="pwdChangeEx">
                        <span>6~20자의 영문 대/소문자, 숫자, 특수문자 혼용 가능.</span>
                    </div>
                    <input id="password1" type="password" class="input-grid" placeholder="New Password" maxlength="20" onkeyup="validCheckPwd()">

                    <input id="password2" type="password" class="input-grid" placeholder="Confirm Password" maxlength="20" onkeydown="activeEnter('atPassword')" onkeyup="validCheckPwd()">
                    <span id="validcheck-password" class="chekc-span"> </span>
                    <input type="button" value="Password Change" onclick="passwordCheck(password.value , password1.value, password2.value)">
                </div>
            </div>
        </div>
        <div id="modal-phone" class="modalOutline disable ">
            <div id="changePhone" class="modalContent z-index1">
                <div class="titleConfigure">
                    Change Phone Number
                </div>
                <input id="input-userPhone" type="text" class="input-phone" value="${loginMember.userphone }" placeholder="'-' 를 제외한 휴대전화번호를 입력해주세요" onkeyup="validCheckPhone()" maxlength="11">
                <span id="validcheck-phone" class="chekc-span"> </span>
                <input type="button" id="phone-change-btn" value="Change !" onclick="phoneChangedo()" disabled='ture'>
            </div>
        </div>
        <div id="modal-delete" class="modalOutline disable">
            <div class="modalContent z-index3">
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
                    <input id="deletePwd" type="password" class="text-box block littleGap" placeholder="PASSWORD" maxlength="20" onkeydown="activeEnter('atDelete')">
                    <span id="validcheck-delete" class="chekc-span"> </span>
                    <input id="delete-btn" type="button" value="Agree & Delete" onclick="accountDelete(deletePwd.value)">
                </div>
            </div>
        </div>
    </div>
    <div id="profile-crop" class="modal-crop">
        <div class="modal-crop-content">
            <div class="crop-top clearfix">
                <a class="close-crop">&times;</a>
                <button class="change-img">확인</button>
            </div>
            <div class="crop-main">
            </div>
        </div>
    </div>

</body>

<script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/salab/resources/js/userPage/userPageMain.js"></script>
<script type="text/javascript" src="/salab/vendors/js/croppie.js"></script>
<script type="text/javascript">
    $("#userimg").on("change", function() {
        readFile(this);
    });

    var modalCrop = document.getElementById("profile-crop");
    var basic = $('.crop-main').croppie({
        viewport: {
            width: 300,
            height: 300
        },
        boundary: {
            width: 400,
            height: 500
        },
        showZoomer: false
    });

    function readFile(input) {
        console.log("변경시작");

        if (input.files && input.files[0]) { //파일있다면 
            console.log("파일있다");
            var reader = new FileReader();

            reader.onload = function(e) {
                console.log("창띄울게");
                $('.modal-crop').addClass('is-visible');
                setTimeout(function() {
                    $('.modal-crop').addClass('is-open');
                }, 20);
                $('.crop-main').croppie('bind', {
                    url: e.target.result
                });

                $('.change-img').on('click', function() {
                    $('.crop-main').croppie('result', {
                        type: 'base64',
                        format: 'jpeg',
                        size: {
                            width: 100,
                            height: 100
                        }
                    }).then(function(resp) {

                        $('#editImg').attr("src", resp);
                        $('.modal-crop').removeClass('is-visible');

                        /*rest를 <hidden>에 넣어서  imgInsert.do로 연결*/
                        {
                            var form = document.createElement("form");
                            form.setAttribute("method", "post");
                            form.setAttribute("action", "imgInsert.do");
                            document.body.appendChild(form);

                            var insert = document.createElement("input");
                            insert.setAttribute("type", "hidden");
                            insert.setAttribute("name", "upfiles");
                            insert.setAttribute("value", resp);
                            form.append(insert);

                            var insert2 = document.createElement("input");
                            insert2.setAttribute("type", "hidden");
                            insert2.setAttribute("name", "ofilename");
                            insert2.setAttribute("value", $("#userimg").val());
                            form.append(insert2);

                            form.submit();
                        }
                    });
                });

                $('.close-crop').on('click', function() {
                    input.value = "";
                    $('.modal-crop').removeClass('is-open');
                    $('.modal-crop').removeClass('is-visible');
                });
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    window.onclick = function(event) {
        if (event.target == modalCrop) {
            $('.modal-crop').removeClass('is-open');
            $('.modal-crop').removeClass('is-visible');
        }
    }
</script>

</html>