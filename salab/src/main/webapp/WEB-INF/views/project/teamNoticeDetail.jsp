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
    <link rel="stylesheet" href="/salab/resources/css/project/teamNoticeDetail.css" type="text/css">

    <script src="https://kit.fontawesome.com/08d0951667.js"></script>

    <title>Project | Salab</title>
</head>

<body>

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
                    <div class="notice-body">
                        <div>
                           
                             <c:if test="${sessionScope.userauth!='LEADER' }">
                            <div>
                                <div>
                                    <div class="notice-title">
                                        <input readonly  class="hideInputText" type="text" placeholder=" :Notice Title" maxlength="40" value="${projectnotice.pnoticetitle}">
                                        <span id="writedDate">${projectnotice.pnoticedate}</span>

                                    </div>
                                    <div id="check">
                                        <div class="notice-contentbox" rows="12" placeholder=":Notice Content">${projectnotice.pnoticecontent}</div>
                                    </div>

                                </div>
                            </div>
                            </c:if>
                           
                            <c:if test="${sessionScope.userauth=='LEADER' }">
                            <div>
                                <div>
                                    <div class="notice-title">
                                        <input id="notice-title" class="hideInputText" type="text" placeholder=" :Notice Title" maxlength="40" value="${projectnotice.pnoticetitle}">
                                        <span id="writedDate">${projectnotice.pnoticedate}</span>

                                    </div>
                                    <div id="check">
                                        <textarea  id="notice-content" class="notice-contentbox scrollbar" rows="12" placeholder=":Notice Content">${projectnotice.pnoticecontent}</textarea>
                                    </div>

                                </div>
                                <div class="buttonbox">
                                    <div class="button" onclick="modifiedNotice()">
                                        수정하기
                                    </div>
                                    <div class="button" onclick="deleteNotice()">
                                        삭제하기
                                    </div>
                                </div>
                            </div>
                            </c:if>
                        </div>
                    </div>
                </div>
            </sector>



        </div>

        <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
        <script type="text/javascript">
            function modifiedNotice() {
                var no = ${projectnotice.pnoticeno};
                var title = $("#notice-title").val();
                var content = $("#notice-content").val();
                var pno = ${projectnotice.projectno};

                var form = document.createElement("form");
                form.setAttribute("method", "post");
                form.setAttribute("action", "modifiedNotice.do");
                document.body.appendChild(form);

                var insert = document.createElement("input");
                insert.setAttribute("type", "hidden");
                insert.setAttribute("name", "pnoticeno");
                insert.setAttribute("value", no);
                form.append(insert);

                var insert2 = document.createElement("input");
                insert2.setAttribute("type", "hidden");
                insert2.setAttribute("name", "pnoticetitle");
                insert2.setAttribute("value", title);
                form.append(insert2);

                var insert3 = document.createElement("input");
                insert3.setAttribute("type", "hidden");
                insert3.setAttribute("name", "pnoticecontent");
                insert3.setAttribute("value", content);
                form.append(insert3);
                
                var insert4 = document.createElement("input");
                insert4.setAttribute("type", "hidden");
                insert4.setAttribute("name", "projectno");
                insert4.setAttribute("value", pno);
                form.append(insert4);

                form.submit();
            }


            function deleteNotice() {
                 location.href = 'deleteNotice.do?pnoticeno=' + ${projectnotice.pnoticeno}  +"&projectno="+${projectnotice.projectno};
            }

            function goBack() {
                window.history.back();
            }
        </script>
    </body>

</html>