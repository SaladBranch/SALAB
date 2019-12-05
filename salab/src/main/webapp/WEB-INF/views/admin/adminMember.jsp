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

    <link rel="stylesheet" href="/salab/resources/css/admin/adminMember.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <title>USER | SALAB</title>
</head>

<body>
    <header>
        <nav class="top-bar">
            <div class="top-bar-title">
                <div class="top-bar-titleText">관리자</div>
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
                        <p>${loginAdmin.adminid }<i class="fas fa-chevron-down"></i></p>
                        <div class="profile-dropmenu">
                            <ul class="profile-menus">
                                <li><a href="adminLogout.do">로그아웃</a></li>
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
            <div class="ad-member active-menu">
                <a href="adminMemberList.do">회원정보</a>
            </div>
            <div class="ad-notice">
                <a href="adminNoticeList.do">공지사항</a>
            </div>
            <div class="ad-faq">
                <a href="adminFaqList.do">자주 찾는 질문</a>
            </div>
            <div class="ad-qna">
                <a href="adminQnaList.do">1:1문의</a>
            </div>
        </div>
    </div>

    <div class="right-main-side">
    	<div class="member_top">
    		<p>회원 정보</p>
    	</div>
        <div class="member_bottom">
			<div class="member_btn_box">
					<div class="member_btn">
						<span>문의하기</span>
					</div>
			</div>
   				
        	<ul>
        		<!-- 목록 상단 -->
        		<li class="member_head">
        			<ul>
        				<li class="member_head_no"><span>NO</span></li>
        				<li class="member_head_email"><span>이메일</span></li>
        				<li class="member_head_date"><span>가입날짜</span></li>
        				<li class="member_head_level"><span>등급</span></li>
        			</ul>
        		</li>
        		<!-- 목록 상단 -->
        		
        		<!-- 목록 -->
        		<c:if test="${!empty requestScope.memberList }">
        			<%-- <c:set var="lcount" value="${requestScope.paging.listCount - ((requestScope.paging.currentPage-1) * requestScope.paging.limit)}"/> --%>
        			<c:forEach var="member" items="${requestScope.memberList }" varStatus="i" >
        				<c:url var="adminMemberDetail" value="adminMemberDetail.do">
							<c:param name="userno" value="${member.userno }" />
							<c:param name="page" value="${paging.currentPage }" />
						</c:url>
		        		<li class="member_list">
		        			<ul>
		        				<a href="${adminMemberDetail }">
			        				<li class="member_head_no"><span>${member.userno}<%-- <c:out value="${lcount }" /> --%></span></li>
			        				<li class="member_head_email"><span>${member.useremail }</span></li>
			        				<li class="member_head_date"><span>${member.userenrolldate }</span></li>
			        				<li class="member_head_level"><span>${member.userlevel }</span></li>
		        				</a>
		        			</ul>
		        		</li>
		        		<%-- <c:set var="lcount" value="${lcount - 1 }" /> --%>
	        		</c:forEach>
        		</c:if>
        		<!-- 목록 -->
        		
        		<!-- 목록 null -->
        		<c:if test="${empty requestScope.memberList }">
	        		<li class="member_list">
	        			<ul>
	        				<li class="member_head_null"><span>아직 등록된 회원이 없습니다.</span></li>
	        			</ul>
	        		</li>
        		</c:if>
        		<!-- 목록 null -->
        	</ul>
        </div>
        
        <!-- paging -->
        <div class="box_footer">
       		<ul>
	       		<li class="paging_list">
		       		<ul>
						<!-- 처음 -->
						<c:if test="${paging.currentPage eq 1}">
							<li class="paging_btn">[처음]</li>
						</c:if>
						<c:if test="${paging.currentPage ne 1 }">
							<li class="paging_btn"><a href="adminMemberList.do?page=1">[처음]</a></li>
						</c:if>
						<!-- 처음 -->
						
						<!-- 이전-->
						<c:if test="${paging.startPage eq 1 }">
							<li class="paging_btn">[이전]</li>
						</c:if>
						<c:if test="${paging.startPage ne 1 }">
							<li class="paging_btn"><a href="adminMemberList.do?page=${paging.startPage - 1 }">[이전]</a></li>
						</c:if>
						<!-- 이전-->
						
						<!-- 현재 Page 숫자 목록 -->
						<c:forEach var="pageno" begin="${paging.startPage }" end="${paging.endPage }" step="1">
							<c:if test="${pageno eq paging.currentPage }">		
								<li class="paging_no_this">[${ pageno }]</li>
							</c:if>
							<c:if test="${pageno ne paging.currentPage }">
								<a href="adminMemberList.do?page=${ pageno }"><li class="paging_no">${ pageno }</li></a>
							</c:if>
						</c:forEach>
						<!-- 현재 Page 숫자 목록 -->
						
						<!-- 다음-->
						<c:if test="${paging.endPage eq paging.maxPage}">
							<li class="paging_btn">[다음]</li>
						</c:if>
						<c:if test="${paging.endPage ne paging.maxPage}">
							<li class="paging_btn"><a href="adminMemberList.do?page=${paging.endPage + 1 }">[다음]</a></li>
						</c:if>
						<!-- 다음-->
						
						<!-- 끝 -->
						<c:if test="${paging.currentPage ge paging.maxPage }">
							<li class="paging_btn">[끝]</li>
						</c:if>
						<c:if test="${paging.currentPage lt paging.maxPage }">
							<li class="paging_btn"><a href="adminMemberList.do?page=${paging.maxPage }">[끝]</a></li>
						</c:if>
						<!-- 끝 -->
					</ul>
				</li>
       		</ul>
        </div>
        <!-- paging -->
    </div>
    
    
    <script type="text/javascript" src="/salab/resources/js/admin/admin.js"></script>
</body>
</html>