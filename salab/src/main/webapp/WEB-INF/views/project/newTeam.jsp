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
                            <div class="upside-title-div create-team-p">새로운 프로젝트를 생성합니다.</div>
                            <p>
                                프로젝트의 이름을 입력해 주세요.<br>
                                적절한 프로젝트의 이름은, 프로젝트의 방향성을 보다 뚜렸하게 합니다.<br>
                                최대 30글자의 한글, 영어 , 숫자를 입력할 수 있습니다.
                            </p>
                        </div>
                        <form action="investCreateProject.do" method="post">
                            <input type="text" class="create-projectname-input" name="projectname" placeholder="Please write the name of the project here." maxlength="30" >
                            <button id="project_create_btn" class="create-action btn btn-full" onclick="checkName()">Create PROJECT</button>
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
    function checkName(){
        console.log("진입");
        console.log($(".create-projectname-input").val());
        console.log($(".create-projectname-input").html());
        
        if($(".create-projectname-input").val().length >0){
            
        }else{
            $(".create-projectname-input").val("Project With SALAB");
        }
    }
</script>
</html>