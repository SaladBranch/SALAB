function showModal(findKey) {
    if (findKey == "name") {
        $("#modal-name").show();
    } else if (findKey == "pwd") {
        $("#modal-password").show();
    } else if (findKey == "delete") {
        $("#modal-delete").show();
    }
}

function test() {
    alert("ddd");
}

$(document).ready(function () {
    alert("마이페이지진입");

    $(".close").click(function () {
        alert($(this).attr("id"));
    });

    $(".modalOutline").click(function () {
        HideOnBush();
    });
    $(".modalContent, .modalOutline").click(function () {
        event.stopImmediatePropagation();
        e.keypress(
            function () {
                if (e.keyCode == 32) {
                    alert("key up SPACE")
                }
            });
    });

    /*$('#id-change-btn').click(function () {
        $.ajax({
            url: "test1.do",
            data: {
                newname: "박건우"
            },
            type: "post",
            success: function (data) {
                alert("전송성공");
            },
            error: function(){ alert("실패");}
        });

    });*/
});

function HideOnBush() {
    $(".modalOutline").hide();
}



document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        alert("key up SPACE")
    }
}

function activeEnter(findKey) {

    if (window.event.keyCode == 13) {
        alert("엔터키감지");

        if (findKey == "atName") {} else if (findKey == "atPassword") {} else if (findKey == "atDelete") {}
    }
} 

function nameChangedo(){
    var form  = document.createElement("form");
    form.setAttribute("method","post");
    form.setAttribute("action","test1.do");
    document.body.appendChild(form);
    
    var insert = document.createElement("input");
    insert.setAttribute("type","hidden");
    insert.setAttribute("name","newName");
    insert.setAttribute("value",$("#newName").val());
    
    form.append(insert);
    
    form.submit();
}