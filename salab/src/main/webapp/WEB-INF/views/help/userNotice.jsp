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
                <div class="add-btn"></div>
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
                <span><a href="noticelist.do">도움말</a></span>
            </div>
            <div class="recent-file active-menu">
                <a href="noticelist.do">공지사항</a>
            </div>
            <div class="private-file">
                <a href="faqlist.do">자주 하는 질문</a>
            </div>
            <div class="trashcan">
                <a href="qnalist.do">1:1문의</a>
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
					<c:set var="lcount" value="${requestScope.paging.listCount - ((requestScope.paging.currentPage-1) * requestScope.paging.limit)}"/>
					<c:forEach var="notice" items="${requestScope.noticelist }">
						<c:url var="noticeDetail" value="noticeDetail.do">
							<c:param name="noticeno" value="${notice.noticeno }" />
							<c:param name="page" value="${paging.currentPage }" />
						</c:url>
						<li class="notice_list">
							<ul>
								<a href="${noticeDetail }">
									<li class="notice_head_no"><span><c:out value="${lcount }" /></span></li>
									<li class="notice_head_title"><span>${notice.noticetitle }</span></li>
									<li class="notice_head_date"><span>${notice.noticedate }</span></li>
								</a>
							</ul>
						</li>
						<c:set var="lcount" value="${lcount - 1 }" />
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
			<!-- 처음 -->
			<c:if test="${paging.currentPage eq 1 }">
				<span class="paging_btn"><i class="fas fa-angle-double-left"></i></span>
			</c:if>
			<c:if test="${paging.currentPage ne 1 }">
				<span class="paging_btn"><a href="noticelist.do?page=1"><i class="fas fa-angle-double-left"></i></a></span>
			</c:if>
			<!-- 처음 -->
			
			<!-- 이전-->
			<c:if test="${paging.startPage eq 1 }">
				<span class="paging_btn"><i class="fas fa-angle-left"></i></span>
			</c:if>
			<c:if test="${paging.startPage ne 1 }">
				<span class="paging_btn"><a href="noticelist.do?page=${paging.startPage - 1 }"><i class="fas fa-angle-left"></i></a></span>
			</c:if>
			<!-- 이전-->
			
			<!-- 현재 Page 숫자 목록 -->
			<c:forEach var="pageno" begin="${paging.startPage }" end="${paging.endPage }" step="1">
				<c:if test="${pageno eq paging.currentPage }">		
					<span class="paging_no_this">${ pageno }</span>
				</c:if>
				<c:if test="${pageno ne paging.currentPage }">
					<a href="noticelist.do?page=${ pageno }"><span class="paging_no">${ pageno }</span></a>
				</c:if>
			</c:forEach>
			<!-- 현재 Page 숫자 목록 -->
			
			<!-- 다음-->
			<c:if test="${paging.endPage eq paging.maxPage}">
				<span class="paging_btn"><i class="fas fa-angle-right"></i></span>
			</c:if>
			<c:if test="${paging.endPage ne paging.maxPage}">
				<span class="paging_btn"><a href="noticelist.do?page=${paging.endPage + 1 }"><i class="fas fa-angle-right"></i></a></span>
			</c:if>
			<!-- 다음-->
			
			<!-- 끝 -->
			<c:if test="${paging.currentPage ge paging.maxPage }">
				<span class="paging_btn"><i class="fas fa-angle-double-right"></i></span>
			</c:if>
			<c:if test="${paging.currentPage lt paging.maxPage }">
				<span class="paging_btn"><a href="noticelist.do?page=${paging.maxPage }"><i class="fas fa-angle-double-right"></i></a></span>
			</c:if>
			<!-- 끝 -->
        </div>
        <!-- 페이징 처리 -->
    </div>
    
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/help/help.js"></script>

</body>
</html>