$(document).ready(function () {
    alert("페이지진입");
    $('.clickNotice').click(function () {
        var projectno = $(this).children().val();
        readNotice(projectno);


    });

    /*
        $(".modalOutline").click(function () {
            HideOnBush();
        });*/

    //   pageListPrint(countNotice);

    //페이지전체 개수로 페이지이동만들기
    /*   pageListPrint();

       //페이지 뿌려주기
       console.log("ddd");
       noticeListPrint(1);
       console.log("ddd");*/

});
//프로젝트에서 멤버 강퇴
function memberKick(no) {
    $.ajax({
        url: "memberKick.do",
        type: 'post',
        dataType: "json",
        data: {
            userno: no,
            projectno: $('#projectno').val()
        },
        success: function (data) {
            location.href = 'gotoProject.do?projectno=' + $('#projectno').val();
        },
        error: function (status, request, errorData) {
            alert('에러');
            console.log("error code : " + request.status + "\nMessage : " + request.responseText +
                "\nError : " + errorData);
        }

    })
}
//멤버 권한 변경
function changeUserAuth(no, auth) {
    console.log(no + "," + auth);
    console.log(event.target.parentElement.parentElement.children.item(0));
    var eventEl = $(event.target.parentElement.parentElement.children.item(0));
    console.log(eventEl);
    $.ajax({
        url: "changeAuth.do",
        type: 'post',
        dataType: "json",
        data: {
            userno: no,
            userauth: auth,
            projectno: $('#projectno').val()
        },
        success: function (data) {
            console.log(data);
            if (data.result == "success") {
                switch (auth) {
                    case 'LEADER':
                        $(eventEl).attr("src", "/salab/resources/img/leader.png");
                        location.href = 'gotoProject.do?projectno=' + $('#projectno').val();
                        break;
                    case 'CAN_EDIT':
                        $(eventEl).attr("src", "/salab/resources/img/can-edit.png");
                        break;
                    case 'ONLY_READ':
                        $(eventEl).attr("src", "/salab/resources/img/only-read.png");
                        break;
                    default:
                        alert("오류_재 실행 해주세요")
                        break;
                }
            }
        },
        error: function (status, request, errorData) {
            alert('에러');
            console.log("error code : " + request.status + "\nMessage : " + request.responseText +
                "\nError : " + errorData);
        }

    })
}
//noticeList 이동
function gotoPNotice(){
            location.href = 'projectNoticelist.do?projectno=' + $('#projectno').val();
}
//noticeDetail 이동
function gotoNoticeDetail(no){
    location.href = 'teamNoticeDetail.do?pnoticeno=' + no+'&projectno='+$('#projectno').val();
}
//팀원 권한 메뉴창 toggle
function openMenu() {
    $(".setting-menu").addClass('hide');
    $(event.target.nextElementSibling).toggleClass('hide');
}
//모달끄기 버튼_
$(".modalOutline").click(function () {
    $(".modalOutline").addClass('hide');
})
//확인창만 닫기 기능
$(".modalBtn").click(function () {
    $(".afterEmailCheck").addClass('hide');
})

//팀원 초대창 toggle
function inviteModalToggle() {
    $("#inviteModal").removeClass('hide');
}

$(".modalContent").click(function () {
    event.stopImmediatePropagation();
});
//팀원 초대
$(".inviteBtn").click(function () {
    console.log("팀원초대 : " + inviteEmail);
    $.ajax({
        url: 'inviteEmailCheck.do',
        data: {
            useremail: $("#inviteEmail").val(),
            projectno: $("#projectno").val()
        },
        type: 'post',
        success: function (data) {
            console.log(data);

            if (data == 'inviteSuccess') {
                $("#inviteEmail").val("");
                $("#inviteModal").toggleClass('hide');
                $(".afterInvteModal").removeClass('hide');
            } else if (data == 'joinedMember') {
                $(".joinedMember").toggleClass('hide');
            } else {
                $(".notFoundUser").toggleClass('hide');
            }
        },
        error: function (status, request, errorData) {
            alert('에러');
            console.log("error code : " + request.status + "\nMessage : " + request.responseText +
                "\nError : " + errorData);
        }

    })
});
//게시판 이동

//게시글 이동

//사진변경

//프로젝트이름변경

//프로젝트 불러오기

//프로젝트 이동하기