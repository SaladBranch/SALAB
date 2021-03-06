<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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

    <title>${project.projectname }  | Salab</title>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText"><a href="gotoProject.do?projectno=${project.projectno }">${project.projectname}</a></div>
                <input id="projectno" type="hidden" value="${project.projectno}">
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
                <div class=""></div>
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
                <input type="text" id="search-text" placeholder="검색" maxlength="20">
            </div>
            <div class="recent-file ">
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
						
							<c:if test="${projectno eq projectList.projectno }">
								<a class="projectName active-menu" href="gotoProject.do?projectno=${projectList.projectno }">${projectList.projectname }</a>
							</c:if>
							<c:if test="${projectno ne projectList.projectno }">
								<a class="projectName" href="gotoProject.do?projectno=${projectList.projectno }">${projectList.projectname }</a>
							</c:if>
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
    <div class="right-main-side">
        <div class="focus"></div> <!-- 여백 -->
        <div class="sort-by  absolute icon-positioning">
            <i class="fas fa-chevron-left" onclick="goBack()"></i>
        </div>
        <sector>
            <div class="notice-grid ">
                <div class="notice-header">공지사항</div>
                <div class="notice-body">
                    <c:if test="${sessionScope.userauth eq 'LEADER'}">
                        <div class="notice-title ">
                            <input class="InputText" type="text" placeholder=" :Notice Title" maxlength="40" value="">
                        </div>
                        <div>
                            <div class="noticeinfo">
                               <c:set var="today" value="<%= new java.util.Date() %>" />
                                <span>${sessionScope.loginMember.username}</span>
                                <span> edited <fmt:formatDate value="${today }" dateStyle="short" /></span>
                            </div>
                            <div>
                                <textarea id="notice-content" class="notice-contentbox  scrollbar" rows="16" placeholder=":Notice Content"></textarea>
                            </div>
                        </div>
                        <div class="buttonbox">
                            <div class="button" onclick="noticeRegist()">
                                등록하기
                            </div>
                        </div>


                    </c:if>
                </div>
            </div>
        </sector>



    </div>
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript">
	    $('.user-profile').click(function(){
	        var drop = $('.profile-dropmenu');
	        if(drop.css('display') == 'block'){
	            drop.hide();
	        }else{
	            drop.show();
	        }
	    });
        function noticeRegist() {
            var title = $('.InputText').val();
            var content = $('#notice-content').val();
            var projectno =${requestScope.projectno}
            location.href = 'projectNotiRegist.do?pnoticetitle=' + title + '&pnoticecontent=' + content+"&projectno="+projectno ;
        }
        function goBack(){
            window.history.back();
        }
</script>

</body>

</html>