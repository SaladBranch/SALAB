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

    <link rel="stylesheet" href="/salab/resources/css/help/userNotice2.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <title>USER | SALAB</title>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">도움말</div>
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
            <div class="menu-title">
                <span>도움말</span>
            </div>
            <div class="recent-file active-menu">
                <!-- <div class="icon-wrapper"><i class="far fa-clock"></i></div>  -->
                <a href="noticelist.do">공지사항</a>
            </div>
            <div class="private-file">
                <!-- <div class="icon-wrapper"><i class="far fa-file"></i></div>  -->
                <a href="faqlist.do">자주 찾는 질문</a>
            </div>
            <div class="trashcan">
                <!-- <div class="icon-wrapper"><i class="far fa-trash-alt"></i></div>  -->
                <a href="userQnA.do">1:1문의</a>
            </div>
        </div>
    </div>
    
    <div class="right-main-side">
       <div class="notice_top">
          <p>공지사항</p>
       </div>
        <div class="notice_bottom">
           <ul>
              <!-- 목록 상단 -->
              <li class="notice_head">
                 <ul>
                    <li class="notice_head_no"><span>NO</span></li>
                    <li class="notice_head_title"><span>제목</span></li>
                    <li class="notice_head_date"><span>날짜</span></li>
                 </ul>
              </li>
              <!-- 목록 상단 -->
              
              <!-- 목록 -->
              <c:if test="${!empty requestScope.noticelist }">
	              <c:forEach var="notice" items="${requestScope.noticelist }">
	              <li class="notice_list">
	                 <ul>
	                	<a href="userNoticeDetail.do">
	                    <li class="notice_head_no"><span>${notice.noticeno }</span></li>
	                    <li class="notice_head_title"><span>${notice.noticetitle }</span></li>
	                    <li class="notice_head_date"><span>${notice.noticedate }</span></li>
	                   	</a>
	                 </ul>
	              </li>
	              </c:forEach>
              </c:if>
              <!-- 목록 -->
              
              <!-- 목록 == null -->
              <c:if test="${empty requestScope.noticelist }">
	              <li class="notice_list">
	                 <ul>
	                    <li class="notice_head_null"><span>아직 등록된 공지사항이 없습니다.</span></li>
	                 </ul>
	              </li>
              </c:if>
              <!-- 목록 == null -->
           </ul>
        </div>
        
        <!-- 페이징 처리 -->
        <div class="box_footer">
       		<ul>
	       		<li class="paging_list">
		       		<ul>
						<!-- 처음 -->
						<c:if test="${paging.currentPage eq 1 }">
							<li class="paging_btn">[처음]</li>
						</c:if>
						<c:if test="${paging.currentPage ne 1 }">
							<li class="paging_btn"><a href="noticelist.do?page=1">[처음]</a></li>
						</c:if>
						<!-- 처음 -->
						
						<!-- 이전-->
						<c:if test="${paging.startPage eq 1 }">
							<li class="paging_btn">[이전]</li>
						</c:if>
						<c:if test="${paging.startPage ne 1 }">
							<li class="paging_btn"><a href="noticelist.do?page=${paging.startPage - 1 }">[이전]</a></li>
						</c:if>
						<!-- 이전-->
						
						<!-- 현재 Page 숫자 목록 -->
						<c:forEach var="pageno" begin="${paging.startPage }" end="${paging.endPage }" step="1">
							<c:if test="${pageno eq paging.currentPage }">		
								<li class="paging_no_this">[${ pageno }]</li>
							</c:if>
							<c:if test="${pageno ne paging.currentPage }">
								<a href="noticelist.do?page=${ pageno }"><li class="paging_no">${ pageno }</li></a>
							</c:if>
						</c:forEach>
						<!-- 현재 Page 숫자 목록 -->
						
						<!-- 다음-->
						<c:if test="${paging.endPage eq paging.maxPage}">
							<li class="paging_btn">[다음]</li>
						</c:if>
						<c:if test="${paging.endPage ne paging.maxPage}">
							<li class="paging_btn"><a href="noticelist.do?page=${paging.endPage + 1 }">[다음]</a></li>
						</c:if>
						<!-- 다음-->
						
						<!-- 끝 -->
						<c:if test="${paging.currentPage ge paging.maxPage }">
							<li class="paging_btn">[끝]</li>
						</c:if>
						<c:if test="${paging.currentPage lt paging.maxPage }">
							<li class="paging_btn"><a href="noticelist.do?page=${paging.maxPage }">[끝]</a></li>
						</c:if>
						<!-- 끝 -->
					</ul>
				</li>
       		</ul>
        </div>
        <!-- 페이징 처리 -->
    </div>

</body>
</html>