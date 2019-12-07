function showModal(findKey) {
    if (findKey == "name") {
        $("#modal-name").show();
    } else if (findKey == "pwd") {
        $("#modal-password").show();
    } else if (findKey == "delete") {
        $("#modal-delete").show();
    } else if (findKey == "phone") {
        $("#modal-phone").show();
    }
}


$(document).ready(function () {

    $(".modalOutline").click(function () {
        HideOnBush();
    });

    //모달창 클릭 시, 부모로 이벤트 전송 block
    $(".modalContent, .modalOutline").click(function () {
        event.stopImmediatePropagation();
        /*        e.keypress(
                    function () {
                        if (e.keyCode == 32) {
                            alert("key up SPACE")
                        }
                    });*/
    });

    //새로운 비밀번호 맞게 입력했는지 체크.
    $("#password1, #password2").keyup(function () {
        if (/.{6,20}$/.test($(this).val())) {
            $(this).css("border-color", "#3ec28f");
        } else {
            $(this).css("border-color", "red");
        }
    });

});
//모달창 숨기기
function HideOnBush() {
    $(".modalOutline").hide();
}

//엔터키 입력 시 , button이랑 연동.
/*
	function activeEnter(findKey) {
		
		if (window.event.keyCode == 13) {
			alert("엔터키감지");
			
			if (findKey == "atName") {
				
			} else if (findKey == "atPassword") {
				
			} else if (findKey == "atDelete") {
				
			}
		}
	}
*/
//이름변경 , 페이지 이동
function nameChangedo() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "changeName.do");
    document.body.appendChild(form);

    var insert = document.createElement("input");
    insert.setAttribute("type", "hidden");
    insert.setAttribute("name", "newName");
    insert.setAttribute("value", $("#newName").val());
    form.append(insert);

    var insert2 = document.createElement("input");
    insert2.setAttribute("type", "hidden");
    insert2.setAttribute("name", "userno");
    insert2.setAttribute("value", $("#userNo").val());

    form.append(insert2);

    form.submit();
}

//변경할 비밀번호 동일하게 입력했는지 확인
function validCheckPwd() {
    var pwd1 = document.getElementById('password1').value;
    var pwd2 = document.getElementById('password2').value;
    if (pwd1.length < 6 || pwd2.length < 6) {
        document.getElementById('validcheck-password').innerHTML = '<i class="fas fa-times"></i> 6글자 이상 입력하세요.';
    }else{
        if (pwd1 == pwd2) {
            document.getElementById('validcheck-password').innerHTML = '';
        } else {
            document.getElementById('validcheck-password').innerHTML = '<i class="fas fa-times"></i> 동일한 비밀번호를 입력해 주세요.';
        }
    }

}

//비밀번호 변경.
function passwordCheck(pwd, cpwd, cpwd2) {
    if (cpwd == cpwd2) {
        $.ajax({
            url: "changePwd.do",
            data: {
                opass: pwd,
                rpass: cpwd
            },
            type: "post",
            success: function (data) {
                console.log(data);
                if (data == 'success') {
                    alert("비밀번호 변경성공, 로그아웃됩니다.");
                    location.href = 'logout.do';
                } else if (data == 'fail') {
                    alert("비밀번호 변경 실패, 확인 후 재실행 해 주세요");
                }
            },
            error: function () {
                alert("실패");
            }
        });
    } else {
        document.getElementById('validcheck-password').innerHTML = '<i class="fas fa-times"></i> 동일한 비밀번호를 입력해 주세요.';

    }

}
//계정 삭제
function accountDelete(pwd) {
    $.ajax({
        url: "accountDelete.do",
        data: {
            password: pwd
        },
        type: "post",
        success: function (data) {
            if (data == 'fail') {
                document.getElementById('validcheck-delete').innerHTML = '<i class="fas fa-times"></i> 비밀번호가 일치하지 않습니다.';
            } else if (data = 'success') {
                alert("관련된 데이터가 모두 삭제되었습니다.");
                location.href = 'logout.do';
            }
        },
        error: function () {
            alert("에러");
        }
    });
}

//전화번호 번경
function validCheckPhone() {
    var number = document.getElementById('input-userPhone').value;
    var regExp = /^01\d{8,9}$/;
    if (regExp.test(number)) {
        document.getElementById('validcheck-phone').innerHTML = "";
        document.getElementById('phone-change-btn').disabled = false;

    } else {
        document.getElementById('phone-change-btn').disabled = 'disabled';
        document.getElementById('validcheck-phone').innerHTML = '<i class="fas fa-times"></i> 잘못된 전화번호 양식입니다.';

    }

}

function phoneChangedo() {
       var number = document.getElementById('input-userPhone').value;
 
    $.ajax({
        url: "changePhoneNum.do",
        data: {
            userphone: number
        },
        type: "post",
        success: function (data) {
            if(data=='success'){
                location.href= "userMain.do";
            }
            console.log("json data : " + data);
        },
        error: function () {
            alert("에러");
        }
    });
}