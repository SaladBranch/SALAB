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
    <script type="text/javascript">
        function inviteAction() {
            if (!($("input[name=invest]").length)) {
                alert('초대할 팀원을 입력해주세요');
                return false;
            }
            $('form').submit();
        }

        $(function() {
            $("#invite-username-input").autocomplete({
                source: function(request, response) { //많이 봤죠? jquery Ajax로 비동기 통신한 후 
                    //json객체를 서버에서 내려받아서 리스트 뽑는 작업 
                    $.ajax({ //호출할 URL 
                        url: "autocomplete.do", //우선 jsontype json으로 
                        type: 'post',
                        dataType: "json", // parameter 값이다. 여러개를 줄수도 있다. 
                        data: { //request.term >> 이거 자체가 text박스내에 입력된 값이다. 
                            text: request.term
                        },
                        success: function(result) { //return 된놈을 response() 함수내에 다음과 같이 정의해서 뽑아온다. 
                            console.log(result.list);
                            response($.map(result.list, function(item) {
                                console.log(item);
                                return {
                                    label:  decodeURIComponent(item.username, "utf-8").replace(/\+/gi, " ") + "  " + item.usermail,
                                    value: decodeURIComponent(item.username, "utf-8").replace(/\+/gi, " "),
                                    userno: item.userno,
                                    usermail: item.usermail
                                }
                            }));
                        }
                    });
                }, //최소 몇자 이상되면 통신을 시작하겠다라는 옵션 
                minLength: 2, //자동완성 목록에서 특정 값 선택시 처리하는 동작 구현 
                //구현없으면 단순 text태그내에 값이 들어간다. 
                select: function(event, ui) {
                    console.log(ui.item.userno);
                    $('form').append();
                    $('#log').prepend('<div class="invite-email">' + ui.item.value + '<em>  ' + ui.item.usermail +' <div class="deleteEmail" onclick="deleteEmail()"><i class="fas fa-times"></i></div>'+ '</em><input type="hidden" name="invest" value="' + ui.item.userno + '"></div>');
                }
            });
        });
        
    </script>
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
            <div class="scrollbox">
                <!--생성 섹션 -->
                <div class="middle">
                    <!-- 멤버추가 -->
                    <div class="create-upside-div">
                        <div class="upside-title-div create-team-p">PROJECT를 함께 수행할 팀원을 추가할 수 있습니다.</div>
                        <p>
                            함께 하고자 하는 유저의 닉네임으로 검색합니다.<br>
                            email을 확인하고 선택해 주세요.<br>
                            해당 이메일에서 수락하여야만 프로젝트에 참여할 수 있습니다.
                        </p>
                    </div>
                    <div class="create-middleside-div">
                        <div>
                            <input id="invite-username-input" class="invite-username-input" type="text" name="invest1" list="autocomp" placeholder="  함께할 유저의 이름을 입력하세요">
                            <div class="btn-zone">
                                <div class="none-Invite">
                                    <a href="createProject.do?userno=${loginMember.userno}&projectname=${projectname}">나중에 초대할게요.</a>
                                </div>
                                <button id="inviteBtn" class="btn btn-full invite-action" onclick="inviteAction()">Invite this members</button>
                                <!--                            <input type="button" value="Invite this members" class="btn btn-full">-->
                            </div>




                        </div>
                    </div>
                    <div>
                        <form action="investCreateProject.do" method="post" name="inviteList">
                            <input type="hidden" name="userno" value="${loginMember.userno }">
                            <input type="hidden" name="projectname" value="${projectname }">
                            <div id="log" class="invite-emailList scrollbar">
                            </div>    
                        </form>
                    </div>
                    <!-- <input id="invite-username-input" class="invite-username-input" type="text" name="invest1" list="autocomp">

                            <div>
                                <div id="log" class="invite-emailList"></div>
                            </div>
                            <datalist id="autocomp">

                            </datalist>


                            <button class="btn inviteBtn" onclick="investTeam()">INVITE</button>
                            -->



                </div>
            </div>
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

    function deleteEmail(){
        console.log(event.target.parentElement.parentElement.parentElement);
      var deleteOb = event.target.parentElement.parentElement.parentElement;
        deleteOb.innerHTML="";
    }
</script>

</html>