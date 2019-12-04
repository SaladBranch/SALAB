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

    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFile.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">

    <link rel="stylesheet" href="/salab/resources/css/project/projectMainPage.css" type="text/css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>

    <title>최근 파일 | Salab</title>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">${project.projectname}</div>
                <input id="projectno" type="hidden" value="${project.projectno}">
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
            <div class="recent-file">
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
        <div class="left-middle-side-bar scroll">
            <div class="myTeam scroll-y scrollbar">
                <!--현재 팀 프로젝트 표시-->
                <c:forEach var="projectList" items="${sessionScope.myProjectList}">
                    <c:if test="${project.projectno==projectList.projectno}">
                        <div class="clear Team-grid active-menu">
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
        <div class="top-out-grid">
            <!--최상단 grid-->
            <div class="grid-division">
                <!-- grid안 왼쪽 -->
                <div class="Blank">
                    <div class="teamLogo"></div>
                    <div class="name-box"> ${project.projectname}
                    </div>
                </div>
                <section class="file-section">
                    <!--최근파일-->
                    <div class="left">최근 생성 파일</div>
                    <div class="recentFile-grid part-grid clear">

                        
						<c:if test="${empty projectList }"> 
							<div class="file-grid">
				                <div class="new-file" onclick="showModal();">
				                    &#43; 새 파일
				                </div>
				            </div>
						</c:if>
						<c:if test="${!empty projectList }"> 
	                        <c:forEach var="pfile" items="${projectList}">
	                            <div class="file-grid" onclick="location.href='epFile.do'">
	                                <div class="file-container">
	                                    <div class="file-thumbnail">
	
	                                    </div>
	                                    <div class="file-info">
	                                        <div class="about-file">
	                                            <div class="file-name">
	                                                ${pfile.prfiletitle}
	                                            </div>
	                                            <div class="file-edited">
	                                                5분 전 편집 in 개인파일
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

                    </div>
                </section>
            </div>
            <div class="grid-division">
                <!--grid안 오른쪽-->
                <div class="Blank"></div>
                <section>
                    <!--teamNotice-grid-->
                    <div>
                        <div class="noticePreview-title left">공지사항</div>
                        <div class="moreNotice right" onclick="gotoPNotice()">더보기</div>
                    </div>
                    <div class="notice-grid part-grid clear">
                        <!-- NoticeList -->
                        <table cellspacing="0px">
                            <c:if test="${paging.maxPage== 0}">
                                <div class="notExistNotice">등록된 게시물이 없습니다.</div>
                            </c:if>
                            <c:forEach var="notice" items="${requestScope.noticelist}">
                                <tr class="clickNotice" value="${notice.pnoticeno}" onclick=" gotoNoticeDetail(${notice.pnoticeno})">
                                    <input type="hidden" value="${notice.pnoticeno}">
                                    <td>${notice.pnoticedate}</td>
                                    <td>${notice.pnoticetitle}</td>
                                    <td>${notice.pnoticewriter}</td>
                                </tr>
                            </c:forEach>
                        </table>
                    </div>
                </section>
                <section class="member-section">
                    <!--teamMember-grid -->
                    <div>
                        <div class="left">팀 원</div>
                        <c:if test="${sessionScope.userauth == 'LEADER'}">
                            <div class="right" onclick="inviteModalToggle()"> 팀원 초대하기</div>
                        </c:if>
                    </div>
                    <div class="member-grid part-grid clear scrollbar">
                        <!--팀원리스트-->
                        <div class="memberList">
                      	  <c:forEach var="memberList" items="${requestScope.memberList}" varStatus="i">
	                      	  	<div class="member-line">
	                                <div class="member-icon inline">
	                                    <c:if test="${memberList.userprofile_o ==null }"><img width="18" height="18" src="/salab/resources/img/default_profile.png" alt=""></c:if>
	                                    <c:if test="${memberList.userprofile_o !=null }">dd</c:if>
	                                </div>
	                                <div class="member-name inline">${memberList.username}</div>
	                                <div class="member-setup-grid inline">
	                                    <c:if test="${memberList.userauth =='LEADER'}"><img width="12" height="12" src="/salab/resources/img/leader.png" alt=""></c:if>
	                                    <c:if test="${memberList.userauth == 'CAN_EDIT'}"><img width="12" height="12" src="/salab/resources/img/can-edit.png" alt=""></c:if>
	                                    <c:if test="${memberList.userauth == 'ONLY_READ'}"><img width="12" height="12" src="/salab/resources/img/only-read.png" alt=""></c:if>
	                                    <c:if test="${sessionScope.userauth == 'LEADER'}">
	                                    	<c:if test="${memberList.userauth =='LEADER'}">
	                                    	<span class="member-setup hidden" onclick="openMenu()">&#8942;</span>
			                                    <div id="setting-menu" class="setting-menu hide">	                                    		                                  		
			                                           	<div class="hidedMenu" onclick="changeUserAuth(${memberList.userno},'LEADER')">Team Reader</div>                                   
			                                        	<div onclick="changeUserAuth(${memberList.userno},'CAN_EDIT')">Can Edit</div>
			                                      	 	<div onclick="changeUserAuth(${memberList.userno},'ONLY_READ')">only Read</div>
			                                     	   <div onclick="memberKick(${memberList.userno})">Kick</div>
			                                    </div>
	                                    	</c:if>
	                                    	<c:if test="${memberList.userauth !='LEADER'}">	 
		 	                                   <span class="member-setup" onclick="openMenu()">&#8942;</span>
			                                    <div id="setting-menu" class="setting-menu hide">	                                    		                                  		
			                                           	<div class="hidedMenu" onclick="changeUserAuth(${memberList.userno},'LEADER')">Team Reader</div>                                   
			                                        	<div onclick="changeUserAuth(${memberList.userno},'CAN_EDIT')">Can Edit</div>
			                                      	 	<div onclick="changeUserAuth(${memberList.userno},'ONLY_READ')">only Read</div>
			                                     	   <div onclick="memberKick(${memberList.userno})">Kick</div>
			                                    </div>
		                                    </c:if>
		                                </c:if>
	                                </div>
	                          	</div>
                      	  </c:forEach>
                        </div>
                    </div>

                </section>
                <section>
                    <!--modal-->
                    <div class="">
                        <!-- 팀원초대하기 modal-->
                        <div id="inviteModal" class="modalOutline hide" onclick="inviteModalToggle()">
                            <div id="invite-modalContent" class="modalContent">
                                <span class="modal-title">팀 원 초대하기</span>
                                <p class="modal-text">함께할 팀원의 SALAB계정을 입력해 주세요.<br>계정 확인 후, 해당 이메일로 메일을 발송합니다.<br>해당 이메일에서 수락을 할 경우,Project에 참여할 수 있습니다.<br>대소문자를 정확하게 확인해 주세요.</p>
                                <input id="inviteEmail" type="email" placeholder="SALAB@GAMIL.COM">
                                <div class="inviteBtn modalBtn">초대하기</div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <!--메일 발송후 모달-->
                        <div class="modalOutline afterEmailCheck afterInvteModal hide ">
                            <div class="modalContent">
                                <p class="modal-text2">안내 메일이 발송되었습니다.<br>해당 이메일에서 수락시 자동으로 팀원으로 추가됩니다.</p>
                                <div class="modalBtn">확인</div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <!--해당메일 없음 모달-->
                        <div class="modalOutline afterEmailCheck notFoundUser hide">
                            <div class="modalContent">
                                <p class="modal-text2">해당하는 계정이 존재하지 않습니다.<br>확인하시고 다시 시도해주세요.</p>
                                <div class="modalBtn">확인</div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <!--해당메일 없음 모달-->
                        <div class="modalOutline afterEmailCheck joinedMember hide">
                            <div class="modalContent">
                                <p class="modal-text2">이미 PROJECT에 참여중인 멤버입니다.</p>
                                <div class="modalBtn">확인</div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    </div>
    <!--right -->


</body>
<script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/salab/resources/js/project/projectMain.js"></script>

</html>