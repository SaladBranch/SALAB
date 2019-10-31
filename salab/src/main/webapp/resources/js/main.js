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
    
    if(email.value == ""){
        event.preventDefault();
        alertDangerToast("이메일을 입력해주세요", email);
        return false;
    }
    if(password.value == ""){
        event.preventDefault();
        alertDangerToast("비밀번호를 입력해주세요", password);
        return false;
    }
    if(phone.value == ""){
        event.preventDefault();
        alertDangerToast("전화번호를 입력해주세요", phone);
        return false;
    }
}

function isValidEmail(email){
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(emailAddress);
}
    
function alertDangerToast(msg, inputType){
    new Toast({
        message: msg,
        type: 'danger'
    });
    inputType.focus();
}