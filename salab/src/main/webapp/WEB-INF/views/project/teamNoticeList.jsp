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

    <title>최근 파일 | Salab</title>
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
                                <li><a href="userNotice.do">도움말</a></li>
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
            <div class="new-team">
                <div class="icon-wrapper"><i class="far fa-object-group"></i></div>
                <a href="newTeam.do">새로운 팀 </a>
            </div>
        </div>
    </div>
    <div class="right-main-side">
        <div class="focus"></div> <!-- 여백 -->

        <div class="sort-by  absolute icon-positioning">
            <i class="fas fa-chevron-left" onclick="goBack()"></i>
        </div>

        <sector>
            <div class="notice-grid">
                <div class="notice-header">공지사항</div>
                <input type="hidden" value="${requestScope.projectno}" id="projectno"><!-- 프로젝트번호 수정필요-->
                <div class="notice-body">
                    <table cellspacing="0">
                        <tr>
                            <th>작성일자</th>
                            <th>게시글</th>
                            <th>작성자</th>
                        </tr>

                        <c:forEach var="notice" items="${requestScope.noticelist}">
                            <tr class="clickNotice" value="${notice.pnoticeno}">
                                <input type="hidden" value="${notice.pnoticeno}">
                                <td>${notice.pnoticedate}</td>
                                <td>${notice.pnoticetitle}</td>
                                <td>${notice.pnoticewriter}</td>
                            </tr>
                        </c:forEach>

                    </table>
                </div>
                <div id="notice-writing" class="notice-writing button" onclick="writeNotice(projectno.value)"><span>게시글 작성</span></div>

                <div id="notice-paging" class="paging" value="">
                    <input id="nowPage" type="hidden" value="${paging.currentPage}">
                    <c:if test="${paging.maxPage >= 5}">
                        <c:if test="${paging.startPage eq 1}">
                            <span class="donTouch">
                                <</span> </c:if> <c:if test="${paging.startPage != 1}">
                                    <span id="firstPage" onclick="moveListPage(${paging.startPage-1})">
                                        <</span> </c:if> </c:if> <c:forEach var="pageno" begin="${paging.startPage }" end="${paging.endPage }" step="1">
                                            <span onclick="moveListPage(${ pageno })">${ pageno }</span>
                                            </c:forEach>

                                            <c:if test="${paging.maxPage gt 5}">
                                                <c:if test="${paging.endPage eq paging.maxPage}">
                                                    <span class="donTouch">> </span>
                                                </c:if>
                                                <c:if test="${paging.endPage != paging.maxPage}">
                                                    <span id="lastPage" onclick="moveListPage(${paging.endPage+1})">></span>
                                                </c:if>
                                            </c:if>


                                            <!-- <%--                     <% if(  ${listAttr.countNotice} >=7 ) { %>

                    <%}%>
                                      <% if(${listAttr.countNotice} >5){%>
                    <span>←</span>
                    <c:forEach var="i" begin='1' end='5'>
                        <span>${ i }</span>
                    </c:forEach>
                    <span>→</span>
                    <%}%>
                    <c:if test="${listAttr.countNotice  < 6} ">
                       
                    </c:if>
                    <c:if test="${listAttr.countNotice >= 5 } ">
                        <span>←</span>
                        <c:forEach var="i" begin='1' end='5'>
                            <span>${ i }</span>
                        </c:forEach>
                        <span>→</span>
                    </c:if>
                    <c:if test="${listAttr.countNotice eq 7} ">
                        <span>←</span>
                        <c:forEach var="i" begin='1' end='5'>
                            <span>${ i }</span>
                        </c:forEach>
                        <span>→</span>
                    </c:if>
                     --%>-->
                </div>
            </div>


        </sector>



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