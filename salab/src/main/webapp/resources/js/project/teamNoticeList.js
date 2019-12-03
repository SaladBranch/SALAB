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

function readNotice(pnoticeno) {
    var projectno = $("#projectno").val();
    location.href = 'teamNoticeDetail.do?pnoticeno=' + pnoticeno + "&projectno=" + projectno;
}

function moveListPage(page) {
    location.href = 'projectNoticelist.do?page=' + page+'&projectno='+$("#projectno").val();

}

function writeNotice() {
    location.href = 'teamNoticeWrite.do';

}

function pageListPrint(countNotice) {
    console.log($('showList'));
    console.log("총 페이지 : " + countNotice);
    var pageCount = 0;
    if (countNotice > 5) { //5보다 클 경우,
        $('#notice-paging').html($('#notice-paging').html() + '<span>←<span>')
        for (var k = 1; k <= pageCount; k++) {
            console.log(k);
            $('#notice-paging').html($('#notice-paging').html() + '<span>' + k + '<span>');
        }
        $('#notice-paging').html($('#notice-paging').html() + '<span>→<span>')
    } else if (countNotice < 6) {
        $('#notice-paging').html($('#notice-paging').html() + '<span>' + k + '<span>');
    }
}


function noticeListPrint(pageno) {
    console.log("페이지리스트불러오기. pageno : " + pageno);
    $.ajax({
        url: "noticeListPrint.do",
        data: {
            pageno: pageno,
            projectno: $("#projectno").val()
        },
        type: 'post',
        dataType: "json",
        success: function (data) {
            console.log("ㅇㅇㅇ");

        },
        error: function (status, request, errorData) {
            alert('에러');
            console.log("error code : " + request.status + "\nMessage : " + request.responseText +
                "\nError : " + errorData);
        }


    });
}