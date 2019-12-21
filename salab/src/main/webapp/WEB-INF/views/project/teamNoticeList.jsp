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
    <link rel="stylesheet" href="/salab/resources/css/project/teamNoticeCommon.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/project/teamNoticeList.css" type="text/css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>

    <title>${project.projectname } | Salab</title>
</head>

<body>
     <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText"><a href="gotoProject.do?projectno=${project.projectno }">${project.projectname}</a></div>
                <input id="projectno" type="hidden" value="${requestScope.projectno}">
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

        <section>
            <div class="notice-grid">
                <div class="notice-header">공지사항</div>
                <input type="hidden" value="${requestScope.projectno}" id="projectno">
                <div class="notice-body">
                        <c:if test="${empty requestScope.noticelist}">
                            No posts have been registed.
                        </c:if>
                     <c:forEach var="notice" items="${requestScope.noticelist}">
                      <div class="notice-body-box" value="${notice.pnoticeno}" onclick="readNotice(${requestScope.projectno},${notice.pnoticeno})">
                          <div class="notice-body-title">${notice.pnoticetitle}</div>
                          <div>
                              <div class="notice-body-info">
                                  <span>${notice.pnoticewriter} edited   </span>
                                  <span> ${notice.pnoticedate}</span>
                              </div>
                          </div>
                          <div class="notice-body-content">${notice.pnoticecontent}</div>
                      </div>
                      </c:forEach>
                </div>
                <c:if test="${sessionScope.userauth =='LEADER' }">
                	<div id="notice-writing" class="notice-writing button" onclick="writeNotice(${requestScope.projectno})"><span>게시글 작성</span></div>
				</c:if>
                <div id="notice-paging" class="paging" value="">
                    <input id="nowPage" type="hidden" value="${paging.currentPage}">
                    <c:if test="${paging.maxPage >= 5}">
                        <c:if test="${paging.startPage eq 1}">
                            <span class="donTouch"><</span> 
                        </c:if> 
                        <c:if test="${paging.startPage != 1}">
                              <span id="firstPage" onclick="moveListPage(${paging.startPage-1})"><</span>
                        </c:if>
                     </c:if>
                     <c:forEach var="pageno" begin="${paging.startPage }" end="${paging.endPage }" step="1">
                              <c:if test="${ pageno eq paging.currentPage}"><span class="currentPageNum" onclick="moveListPage(${ pageno })">${ pageno }</span></c:if>
                               <c:if test="${ pageno ne paging.currentPage}"><span onclick="moveListPage(${ pageno })">${ pageno }</span></c:if>
                               </c:forEach>
                                    <c:if test="${paging.maxPage gt 5}">
                                         <c:if test="${paging.endPage eq paging.maxPage}">
                                             <span class="donTouch">> </span>
                                         </c:if>
                                    <c:if test="${paging.endPage != paging.maxPage}">
                                         <span id="lastPage" onclick="moveListPage(${paging.endPage+1})">></span>
                                    </c:if>
                               </c:if>
                </div>
            </div>


        </secton>



    </div>
    <div>
    </div>

    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/project/teamNoticeList.js"></script>
    <script type="text/javascript">
        function goBack() {
            window.history.back();
        }
    </script>
</body>

</html>