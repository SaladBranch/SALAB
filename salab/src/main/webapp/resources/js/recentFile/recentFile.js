$(document).ready(function(){
    
    if($(window).width()>=768){
        $('.top-bar-children').width($('body').width() - 230 + 'px');
        $('.right-main-side').width($('body').width() - 230 + 'px');
        $(window).resize(function(){
            if($(window).width()>=768){
            $('.top-bar-children').width($('body').width() - 230 + 'px');
            $('.right-main-side').width($('body').width() - 230 + 'px');
            $('.left-side-bar').css('transform', 'translateX(0)');
            }else{
                $('.left-side-bar').css('transform', 'translateX(-280px)');
            }
        });
    }else{
        $('.top-bar-children').css({
            'width': '100%',
            'left': '0'
        });
        $('.right-main-side').css({
            'width': '100%',
            'left': '0'
        });
        $(window).resize(function(){
            if($(window).width()>=768){
                $('.top-bar-children').width($('body').width() - 230 + 'px').css('left', '230px');
                $('.right-main-side').width($('body').width() - 230 + 'px').css('left', '230px');
                $('.left-side-bar').css('transform', 'translateX(0)');
            }else{
                $('.left-side-bar').css('transform', 'translateX(-280px)');
            }
        })
    }
});

/* 마우스 선택영역 만들기 */
(function() {
var target = '.file-container'; //셀렉트로 묶을 객체
var mode = false;
var startX = 0;
var startY = 0;
var left, top, width, height;
var $focus = $(".focus");
$(document).on("mousedown", function(e) {
    mode = true;
    startX = e.clientX;
    startY = e.clientY;
    width = height = 0;
    $focus.show();
}).on('mouseup', function(e) {
    mode = false;
    $focus.hide();
    $focus.css("width", 0);
    $focus.css('height', 0);
    //범위 내 객체를 선택한다.
    rangeSelect(target, left, top, left + width, top + height, function(include) {
    if(include)
        $(this).addClass('highlight');
    else
        $(this).removeClass('highlight');
    });
}).on('mousemove', function(e) {
    if(!mode) {
        return;
    }
    var x = e.clientX;
    var y = e.clientY;
    //마우스 이동에 따라 선택 영역을 리사이징
    width = Math.max(x - startX, startX - x);
    left = Math.min(startX, x);
    $focus.css('left', left);
    $focus.css("width", width);
    
    height = Math.max(y - startY, startY - y);
    top = Math.min(startY, y);
    $focus.css('top', top);
    $focus.css('height', height);
});
    
function rangeSelect(selector, x1, y1, x2, y2, cb) {
    $(selector).each(function() {
        var $this = $(this);
        var offset = $this.offset();
        var x = offset.left;
        var y = offset.top;
        var w = $this.width();
        var h = $this.height();
        //범위 안인지 체크
        cb.call(this, x >= x1 && y >= y1 && x + w <= x2 && y + h <= y2);
    });
}
})();
/* 우클릭 메뉴 커스터마이징 */
$('.file-container').on('click', function(){
    $('.file-container').each(function(){
        $(this).removeClass("highlight");
    });
    $(this).addClass('highlight');
});
(function(){
    var menu = document.getElementById("right-click-menu");
    var multimenu = document.getElementById("multi-right-click-menu");
    var target = '.file-container';
    
    function init(){
        rightMouseListener();
        leftMouseListener();
    }
    
    function leftMouseListener(){
        document.addEventListener("click", function(e){
            toggleOnOff(0);
        });
    }
    function rightMouseListener(){
        $(window).on('contextmenu', function(){
            event.preventDefault();
        });
        $('.file-container').on('contextmenu', function(e){
            event.preventDefault();
            
            
            
            toggleOnOff(1);
            showMenu(e.clientX, e.clientY);
        });
    }
    function rangeSelect(selector, x1, y1, cb){
        $(selector).each(function(){
            var $this = $(this);
            var offset = $this.offset();
            var x = offset.left;
            var y = offset.top;
            var w = $this.width();
            var h = $this.height();
            cb.call(this, x <= x1 && x1 <= x+w && y <= y1 && y1 <= y + h);
        });
    }
    
    function toggleOnOff(num){
        num === 1 ? menu.classList.add("active") : menu.classList.remove("active");
    }
    
    function showMenu(x, y){
        menu.style.top = y + "px";
        menu.style.left = x + "px";
    }
    
    init();
})();


$('.toggle-menu input').click(function(){
    if($(this).is(':checked')){
        $('.left-side-bar').css('transform', 'translateX(0)');
    }else{
        $('.left-side-bar').css('transform', 'translateX(-280px)');
    }
});

$('.user-profile').click(function(){
    var drop = $('.profile-dropmenu');
    if(drop.css('display') == 'block'){
        drop.hide();
    }else{
        drop.show();
    }
});

$('.sort-by-mention').click(function(){
    var drop = $('.sort-standards');
    if(drop.css('display') == 'block'){
        drop.hide();
    }else{
        drop.show();
    }
});
$(function(){
	var sort = $('#span-content');
	if(sort.text() === 'recent'){
		sort.text("최근 본 파일");
		$('.sort-standards ul li').each(function(){$(this).removeClass('sort-active')});
		$('.sort-standards ul li').eq(0).addClass('sort-active');
	}else if(sort.text() === 'name'){
		sort.text("파일 명");
		$('.sort-standards ul li').each(function(){$(this).removeClass('sort-active')});
		$('.sort-standards ul li').eq(1).addClass('sort-active');
	}else if(sort.text() === 'date'){
		sort.text("파일 생성 일자");
		$('.sort-standards ul li').each(function(){$(this).removeClass('sort-active')});
		$('.sort-standards ul li').eq(2).addClass('sort-active');
	}
});

$('.file-options-btn').click(function(){
    var index = $('.file-options-btn').index($(this));
    $('.file-options-menu').each(function(){
        if($('.file-options-menu').index($(this)) == index){
            if($(this).css('display') == 'block'){
                $(this).hide();
            }else{
                $(this).show();
            }
        }else{
            $(this).hide();
        }
    });
    
});


//window onclick 시 나타났던 메뉴들 끄기
$(window).click(function(event){
    var menu = $('.file-options-menu');
    var sort = $('.sort-standards');
    var drop = $('.profile-dropmenu');
    if(!$(event.target).is($('.file-options-btn'))){
        menu.each(function(){
           if($(this).css('display') == 'block'){
               $(this).hide();
           }
        });
    }
    if(!$(event.target).is($('.sort-by-mention *')) && sort.css('display') == 'block'){
        sort.hide();
    }
    if(!$(event.target).is($('.user-profile *')) && drop.css('display') == 'block'){
        drop.hide();
    }
    
});

//파일 수정 일자 정리
$(function(){
	$('.file-edited span').each(function(){
		var y = $(this).text().substr(0,4);
		var m = Number($(this).text().substr(5,2) - 1);
		if(m == 1){
			m = '12';
			y--;
		}
		var d = $(this).text().substr(8,2);
		var h = $(this).text().substr(11,2);
		var mi = $(this).text().substr(14,2);
		var fdate = new Date(y, m, d, h, mi);
		var ndate = new Date();
		var minute = Math.floor((ndate - fdate)/60000);
		if(minute < 60)
			$(this).text(minute + "분 전 편집");
		else if(minute <= 1440)
			$(this).text(Math.floor(minute/60) + "시간 전 편집");
		else
			$(this).text(Math.floor(minute/1440) + "일 전 편집");
	});
});

function showModal(findKey) {
	$("#modal-name").show();
}

$(function(){
	$(".modalOutline").click(function () {
		$(".modalOutline").hide();
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
});

function newFile(){
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "insert_newprivateFile.do");
    document.body.appendChild(form);

    var insert = document.createElement("input");
    insert.setAttribute("type", "hidden");
    insert.setAttribute("name", "pfiletitle");
    insert.setAttribute("value", $("#fileName").val());
    form.append(insert);

    var insert2 = document.createElement("input");
    insert2.setAttribute("type", "hidden");
    insert2.setAttribute("name", "userno");
    insert2.setAttribute("value", $("#userNo").val());

    form.append(insert2);

    form.submit();
}