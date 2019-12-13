<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>NEW PROEJCT | SALAB</title>
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/jquery-ui.js"></script>
    <link rel="stylesheet" href="/salab/vendors/css/jquery-ui.css">
    <link rel="stylesheet" href="/salab/resources/css/common.css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFile.css">
    <link rel="stylesheet" href="/salab/resources/css/project/createProject.css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">NEW PROJECT</div>
            </div>
            <div class="top-bar-logo">
                <div class="top-bar-logoimg">
                    <a href="recentFile.do?sort=recent"><img src="/salab/resources/img/logo.png"></a>
                </div>
                <div class="top-bar-logotext"><a href="recentFile.do?sort=recent">SALAB</a></div>
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
                <div class="add-btn add-btn-cursor" onclick="showModal('newFile')">&#43;</div>
                <div class="user-profile">
                    <div class="profile-img">
                        <c:if test="${empty sessionScope.loginMember.userprofile_r}">
                            <img src="/salab/resources/img/default_profile.png" alt="">
                        </c:if>
                        <c:if test="${!empty sessionScope.loginMember.userprofile_r}">
                            <img src="/salab/resources/userUpfiles/${sessionScope.loginMember.userprofile_r}" alt="">
                        </c:if>
                    </div>
                    <div class="profile-name">
                        <p>${loginMember.username }<i class="fas fa-chevron-down"></i></p>
                        <div class="profile-dropmenu">
                            <ul class="profile-menus">
                                <li><a href="userMain.do">계정 설정하기</a></li>
                                <li><a href="noticelist.do">도움말</a></li>
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
                <input type="text" id="search-text" placeholder="검색" maxlength="20" value="">
            </div>
            <div class="recent-file active-menu">
                <div class="icon-wrapper"><i class="far fa-clock"></i></div>
                <a href="recentFile.do?sort=recent>">최근 파일</a>
            </div>
            <div class="private-file">
                <div class="icon-wrapper"><i class="far fa-file"></i></div>
                <a href="privateFile.do?sort=recent">개인 파일</a>
            </div>
            <div class="trashcan">
                <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>
                <a href="trashCan.do?sort=recent">휴지통</a>
            </div>
        </div>
        <div class="left-middle-side-bar">
            <c:if test="${!empty sessionScope.myProjectList }">
                <div class="myTeam">
                    <c:forEach var="projectList" items="${sessionScope.myProjectList}">
                        <div class="each-team">
                            <c:if test="${projectList.projectimage_o eq null }">
                                <div class="icon-wrapper">
                                    <i class="fas fa-sitemap"></i>
                                </div>
                            </c:if>
                            <c:if test="${projectList.projectimage_o ne null }">
                                <div class="img-wrapper">
                                    <img src="/salab/resources/projectUpfiles/${projectList.projectimage_o} " alt="">
                                </div>
                            </c:if>
                            <a class="projectName" href="gotoProject.do?projectno=${projectList.projectno }">${projectList.projectname }</a>
                            <a href="gotoProjectFile.do?projectno=${projectList.projectno }&sort=recent">프로젝트 파일</a>
                        </div>
                    </c:forEach>
                </div>
                <div class="new-team" style="border-top: 1px solid #e2e2e2;">
                    <div class="icon-wrapper"><i class="far fa-object-group"></i></div>
                    <a href="newTeam.do">새로운 팀 </a>
                </div>
            </c:if>
            <c:if test="${empty sessionScope.myProjectList }">
                <div class="new-team">
                    <div class="icon-wrapper"><i class="far fa-object-group"></i></div>
                    <a href="newTeam.do">새로운 팀 </a>
                </div>
            </c:if>
        </div>
    </div>

    <div class="right-main-side create-team-grid">
        <!-- 아웃라인 -->
        <section class="project-title-section">
            <!-- 타이틀섹션-->
        </section>
        <section class="project-create-section">
            <form action="investTeam.do">
                <div class="scrollbox">
                    <!--생성 섹션 -->
                    <div class="middle">
                        <div class="create-upside-div">
                            <div class="upside-title-div">PROJECT에 사용될 이름을 입력해주세요</div>
                            <p>
                                함께 하고자 하는 유저의 닉네임을 설정해주세요<br>
                                닉네임이 한글일 시 검색 안되벌임
                                <br>
                                해당 이메일에서 수락하여야만 프로젝트에 참여할 수 있습니다.
                            </p>
                        </div>
                        <form action="investCreateProject.do" method="post">
                            <input type="text" class="create-projectname-input" name="projectname" placeholder="프로젝트 이름">
                            <button class="create-action btn btn-full">Create PROJECT</button>
                        </form>
                    </div>
                </div>
            </form>
        </section>
    </div>
</body>
<script type="text/javascript">
    $('.user-profile').click(function() {
        var drop = $('.profile-dropmenu');
        if (drop.css('display') == 'block') {
            drop.hide();
        } else {
            drop.show();
        }
    });
</script>
</html>