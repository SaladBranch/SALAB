function modalOpen(type){
    $('.modal-form').addClass('is-visible');
    setTimeout(function(){
        $('.modal-form').addClass('is-open'); 
    }, 20);
    if(type === 'login'){
        $('.login-form').eq(0).show();
        $('.signup-form').eq(0).hide();
    }else{
        $('.login-form').eq(0).hide();
        $('.signup-form').eq(0).show();
    }
}

$(window).click(function(event){
    if($(event.target).is($('.modal-form'))){
        $('.modal-form').removeClass('is-open');
        $('.modal-form').removeClass('is-visible');
    }
});

/* Mobile menu 열기 */
$('.mobile-menu input').on('click', function(){
    var top = $(document).scrollTop() + 65;
    if($(this).is(':checked')){
        $('.mobile-menu-list').css('top', top);
        $('.mobile-menu-list').show();
        $('body').css('overflow', 'hidden');

    }else{
        $('.mobile-menu-list').hide();
        $('body').css('overflow', 'auto');
    }
});

/*Scroll down to next Section*/
$(document).ready(function(){
    $('.to-down').on('click', function(){
        $('html, body').animate({
            scrollTop: $(".section-features").offset().top
        }, 1000);
    });
});

$(window).scroll(function(){
    var height = $(document).scrollTop();
    if(height >= 750){
        $('.navbar').css('background', '#0a0a0a');
    }else{
        $('.navbar').css('background', 'rgba(0,0,0,0.6)');
    }
});
/* Switch the Form */
$('.login-link').on('click', function(){
    var index = $('.login-link').index(this);
    $('.signup-form').eq(index).css('display', 'none');
    $('.login-form').eq(index).css('display', 'block');
});
$('.enroll-link').on('click', function(){
    var index = $('.enroll-link').index(this);
    $('.login-form').eq(index).css('display', 'none');
    $('.signup-form').eq(index).css('display', 'block');
});
$('form input').focus(function(){
    $(this).css('border', '1.5px solid #00a8ff'); 
});
$('form input').blur(function(){
    $(this).css('border', '1.5px solid #d8d8d8');
});

/* Enroll validation */
var enroll_submitted = false;
function enrollValid(button){
    var index = $('.enroll-btn').index(button);
    var form = document.signupForm[index];
    
    var email = form.useremail;
    var password = form.userpwd;
    var phone = form.userphone;
    
    if(isValidEmail(email) && isValidPwd(password) && isValidPhone(phone)){
        return true;
    }else{
        return false;
    }
}

function isValidEmail(email){
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var result = true;
    if(email.value == ""){
        event.preventDefault();
        alertDangerToast("이메일을 입력해주세요", email);
        result = false;
    }else{
        if(regExp.test(email.value)){
            result = true;
        }else{
            event.preventDefault();
            alertDangerToast("이메일 양식에 맞게 입력해주세요", email);
            result = false;
        }
    }
    return result;
}

function isValidPwd(password){
    var regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    var result = true;
    if(password.value == ""){
        event.preventDefault();
        alertDangerToast("비밀번호를 입력해주세요", password);
        result = false;
    }else{
        if(regExp.test(password.value))
            result = true;
        else{
            event.preventDefault();
            alertDangerToast("비밀번호는 6~20자리로, 숫자나 특수문자를 포함해야 합니다.");
            result = false;
        }
    }
    return result;
}
function isValidPhone(phone){
    var regExp = /^\d{3}\d{3,4}\d{4}$/;
    var result = true;
    if(phone.value == ""){
        event.preventDefault();
        alertDangerToast("전화번호를 입력해주세요", phone);
        return result;
    }else{
        if(regExp.test(phone.value))
            result = true;
        else{
            var checkDash = phone.value.search(/-/);
            if(checkDash > 0){
                event.preventDefault();
                alertDangerToast("'-'없이 입력해 주세요", phone);
            }else{
                event.preventDefault();
                alertDangerToast("전화번호 양식에 맞게 입력해 주세요", phone);
            }
            result = false;
        }
    }
    return result;
}
    
function alertDangerToast(msg, inputType){
    new Toast({
        message: msg,
        type: 'danger'
    });
    inputType.focus();
}

function onlyNumber(){
    console.log(event.keyCode);
    if((event.keyCode<48)||(event.keyCode > 57)){
        console.log(event.keyCode);
        event.returnValue = false;
    }
}
