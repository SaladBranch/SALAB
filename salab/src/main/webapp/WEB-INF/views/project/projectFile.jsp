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
    <link rel="stylesheet" href="/salab/resources/css/userPage/userPageCommon.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/userPage/userPageMain.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFile.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <script type="text/javascript">
    function epFile(no){
    	var fileno = no;
    	var userno = ${loginMember.userno};
    	location.href="epFile.do?userno="+ userno + "&fileno=" +fileno;
    }
    </script>
    <title>최근 파일 | Salab</title>
</head>
<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">${requestScope.project.projectname }</div>
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
            <div class="recent-file active-menu">
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
     	   	<div class="myTeam scroll-y scrollbar">
                <!--현재 팀 프로젝트 표시-->
                <c:forEach var="projectList" items="${sessionScope.myProjectList}">
                    <c:if test="${project.projectno==projectList.projectno}">
                        <div class="clear Team-grid active">
                            <div class="icon-wrapper teamIcon inline"><i class="fas fa-sitemap"></i></div>
                            <div class="inline">
                                <div class="teamTitle"><a href="gotoProject.do?projectno=${projectList.projectno }">${projectList.projectname }</a></div>
                                <div class="teamFileList"><a href="gotoProjectFile.do?projectno=${projectList.projectno }"> - FileList</a></div>
                            </div>
                        </div>
                    </c:if>
                    <c:if test="${project.projectno!=projectList.projectno}">
                        <div class="clear Team-grid">
                            <div class="icon-wrapper teamIcon inline"><i class="fas fa-sitemap"></i></div>
                            <div class="inline">
                                <div class="teamTitle"><a href="gotoProject.do?projectno=${projectList.projectno }">${projectList.projectname }</a></div>
                                <div class="teamFileList"><a href="gotoProjectFile.do?projectno=${projectList.projectno }"> - FileList</a></div>
                            </div>
                        </div>
                    </c:if>
                </c:forEach>
            </div>
            <div class="new-team">
                <div class="icon-wrapper"><i class="far fa-object-group"></i></div>
                <a href="newTeam.do">새로운 팀 </a>
            </div>
        </div>
    </div>
    <div id="right-click-menu" class="right-click-menu">
        <ul>
            <li><a href="#">파일열기</a></li>
            <li><a href="#">파일 정보 설정</a></li>
            <li><a href="#">사본만들기</a></li>
            <li><a href="#">웹테스트</a></li>
            <li><a href="#">삭제</a></li>
        </ul>
    </div>
    <div id="multi-right-click-menu" class="multi-right-click-menu">
        <ul>
            <li><a href="#"><span></span>개 파일 사본만들기</a></li>
            <li><a href="#"><span></span>개 파일 삭제</a></li>
        </ul>
    </div>
    <div class="right-main-side">
        <div class="focus"></div>
        <div class="sort-standard">
            <div class="sort-by">
                <div class="sort-by-mention">
                <i class="fas fa-chevron-down"></i><span id="span-content">${sort }</span>
                </div>
            </div>
            <div class="sort-standards">
                <ul>
                    <li><a href="recentFile.do?sort=recent">최근 본 파일</a></li>
                    <li><a href="recentFile.do?sort=name">파일 명</a></li>
                    <li><a href="recentFile.do?sort=date">파일 생성 일자</a></li>
                </ul>
            </div>
        </div>
        
        <div class="row recent-files">
        	<c:if test="${!empty privateFile }">
        		<c:forEach var="pfile" items="${privateFile }">
        		<div class="file-grid" onclick="epFile(${pfile.pfileno});">
	                <div class="file-container">
	                    <div class="file-thumbnail">
	                        ${pfile.pfilethumbnail }
	                    </div>
	                    <div class="file-info">
	                        <div class="about-file">
	                            <div class="file-name">
	                                <c:out value="${pfile.pfiletitle }"/>
	                            </div>
	                            <div class="file-edited">
	                                <span>${pfile.pfilelastmodified }</span> in 개인파일
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
        	</c:forEach>
        	</c:if>
        	
            
            <div class="file-grid">
                <div class="new-file" onclick="showModal();">
                    &#43; 새 파일
                </div>
            </div>
        </div>
    </div>
    
    <div id="modal-name" class="modalOutline disable ">
    	<div id="newFile" class="modalContent z-index1">
        	<div class="titleConfigure">Create PrivateFile</div>
           	<input id="userNo" type="hidden" value="${loginMember.userno}">
            <input id="fileName" class="text-box block littleGap" type="text" value="Untitled" maxlength="20" onkeydown="activeEnter('atName')">
            <input class="" type="button" id="id-change-btn" value="New file" onclick="newFile();">
    	</div>
	</div>
    
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/recentFile/recentFile.js"></script>
    <script type="text/javascript">
    	$(function(){
    		console.log(${loginMember.userno});
    	})
    </script>
</body>
</html>