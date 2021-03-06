var fileno, filetitle, teamAndPrivate, uno;
var fileList = new Array();

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
    
    $('.projectName').each(function(){
        var name = $(this).text();
        if(name.length > 11){
            $(this).text(name.substr(0, 11) + '...');    
        }
    });
    
    
});

/* 마우스 선택영역 만들기 */
(function() {
var target = '.file-container'; //셀렉트로 묶을 객체
var mode = false;
var startX = 0;
var startY = 0;
var left, top, width, height;
var $focus = $(".focus");
$(document).on("mousedown", ".right-main-side", function(e) {
	if(e.which != 3){
		mode = true;
	    startX = e.clientX;
	    startY = e.clientY;
	    width = height = 0;
	    $focus.show();
	}
	
}).on('mouseup', ".right-main-side", function(e) {
    mode = false;
    $focus.hide();
    $focus.css("width", 0);
    $focus.css('height', 0);
    //범위 내 객체를 선택한다.
    rangeSelect(target, left, top, left + width, top + height, function(include) {
    if(include){
    	if(e.which != '3'){
    		$(this).addClass('highlight').trigger('multiSelected');
    	}
    	/*$('.add-btn').hover(function(){
    		$(this).css('background-color', '#000');
    	});*/
    }else if(!include && $(this).hasClass('highlight')){
    	$(this).removeClass('highlight');
    	fileList = new Array();
    	if($('.far.fa-trash-alt.trash').length){
    		
    		$('.far.fa-trash-alt.trash').css('pointer-events', 'none');
    		$('.fas.fa-sync-alt.recovery').css('pointer-events', 'none');
    		$('.far.fa-trash-alt.trash').css('color', 'gray');
    		$('.fas.fa-sync-alt.recovery').css('color', 'gray');
    		$('.far.fa-trash-alt.trash').attr('onclick', 'filePermanentDelete()');
    		$('.fas.fa-sync-alt.recovery').attr('onclick', 'fileDeleteUndo()');
    	}
    	
    }
    });
}).on('mousemove', ".right-main-side", function(e) {
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
	var index = $('.file-container').index($(this));
    for(var i = 0; i<$('.file-container').length; i++){
    	if(i === index){
    		$('.file-container').eq(i).addClass('highlight').trigger('classChange');
    	}else{
    		$('.file-container').eq(i).removeClass('highlight').trigger('cancel');
    	}
    }
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
            toggleOnOff(0, 'single');
            toggleOnOff(0, 'multi');
        });
    }
    function rightMouseListener(){
    	var $focus = $(".focus");
    	$focus.hide();
        $(window).on('contextmenu', function(){
            event.preventDefault();
        });
        
        $('.file-container').on('contextmenu', function(e){
        	
        	var cnt = $('.file-container.highlight').length;
        	if(cnt >= 2 && !$(this).hasClass('highlight')){
        		toggleOnOff(0, 'multi');
        		$('.file-container.highlight').removeClass('highlight');
        	}if(cnt < 2 && !$(this).hasClass('highlight')){
        		toggleOnOff(0, 'single');
        		$('.file-container.highlight').removeClass('highlight');
        	}
        	
        	
        	$(this).addClass('highlight');
        	cnt = $('.file-container.highlight').length;
        	
            if(cnt < 2){
            	toggleOnOff(1, 'single');
            	showMenu(e.clientX, e.clientY, 'single');
            }else{
            	toggleOnOff(1, 'multi');
            	$('#multi-right-click-menu span').text(cnt);
            	showMenu(e.clientX, e.clientY, 'multi');
            }
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
    
    function toggleOnOff(num, type){
    	if(type == 'single')
    		num === 1 ? menu.classList.add("active") : menu.classList.remove("active");
		else if(type == 'multi')
			num === 1 ? multimenu.classList.add("active") : multimenu.classList.remove("active");
    }
    
    function showMenu(x, y, type){
    	if(type == 'single'){
    		menu.style.top = y + "px";
            menu.style.left = x + "px";
    	}else if(type == 'multi'){showModal
    		multimenu.style.top = y + "px";
            multimenu.style.left = x + "px";
    	}
        
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
	var type = $('.top-bar-titleText').text();
	if(sort.text() === 'recent'){
		if(type === '휴지통'){
			sort.text("파일 삭제 일자");
		}else{
			sort.text("최근 본 파일");
		}
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
	$('#id-change-btn').attr('disabled', false);
	if(findKey === "newFile"){
		$("#modal-name").show();
	}else if(findKey == "renameFile"){
		$("#modal-rename").show();
		$('#fileRename').val(filetitle);
	}
	
}

$(function(){
	$(".modalOutline").click(function () {
		$(".modalOutline").hide();
    });
    
    //모달창 클릭 시, 부모로 이벤트 전송 block
    $(".modalContent, .modalOutline").click(function () {
        event.stopImmediatePropagation();
        
    });
});

$(document).on('mousedown', '.file-grid', function(e){
	if(e.which == 1 || e.which == 3){
		fileno = $(this).find('.fileno').val();
		filetitle = $.trim($(this).find('.file-name').html());
		teamAndPrivate = $.trim($(this).find('.pt').val());
		uno = $(this).find('.userno').val();
	}
});

function newFile(){
	$(this).attr('disabled', true);
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

function newTeamFile(){
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "insert_newteamFile.do");
    document.body.appendChild(form);

    var insert = document.createElement("input");
    insert.setAttribute("type", "hidden");
    insert.setAttribute("name", "prfiletitle");
    insert.setAttribute("value", $("#fileName").val());
    form.append(insert);

    var insert2 = document.createElement("input");
    insert2.setAttribute("type", "hidden");
    insert2.setAttribute("name", "projectno");
    insert2.setAttribute("value", $("#projectNo").val());
    form.append(insert2);

    form.submit();
}

function renameFile(){
	$.ajax({
		url: 'pfRename.do',
		type: 'post',
		data: {
			pfiletitle: $("#fileRename").val(),
			userno: $("#userNo2").val(),
			pfileno: fileno,
			pt: teamAndPrivate
		},
		dataType: 'text',
		success: function(data){
			if(data == "success"){
				location.reload();
			}
		},
		error:function(request,status,error){
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	    }
	});
}

function fileCopy(){
	$.ajax({
		url: 'fileCopy.do',
		type: 'post',
		data: {
			pfileno: fileno,
			userno: $('#userNo').val(),
			pt: teamAndPrivate
		},
		dataType: 'json',
		success: function(data){
			location.reload();
		},
		error:function(request,status,error){
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	    }
	});
}
function multiFileCopy(){
	$.ajax({
		url: 'fileCopy.do',
		type: 'post',
		data: {
			pfileno: fileno,
			userno: $('#userNo').val(),
			pt: teamAndPrivate
		},
		dataType: 'json',
		success: function(data){
			location.reload();
		},
		error:function(request,status,error){
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	    }
	});
}

function fileDelete(){
	if(confirm){
		$.ajax({
			url: 'fileDelete.do',
			type: 'post',
			data: {
				pfileno: fileno,
				userno: $('#userNo').val(),
				pt: teamAndPrivate
			},
			dataType: 'text',
			success: function(data){
				if(data = "success"){
					location.reload();
				}
			},
			error : function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR.status );
				console.log( jqXHR.statusText );
				console.log( jqXHR.responseText );
				console.log( jqXHR.readyState );
				}
		});
	}
}


//trashCan
function filePermanentDelete(){
		var conf = confirm('파일을 삭제하시겠습니까?(삭제된 파일은 복구되지않습니다.)');
		if(conf == true){
			$.ajax({
				url: 'filePermanentDelete.do',
				type: 'post',
				data: {
					pfileno: fileno,
					userno: uno,
					pt: teamAndPrivate
				},
				dataType: 'text',
				success: function(data){
					if(data = "success"){
						location.reload();
					}
				},
				error : function( jqXHR, textStatus, errorThrown ) {
					console.log( jqXHR.status );
					console.log( jqXHR.statusText );
					console.log( jqXHR.responseText );
					console.log( jqXHR.readyState );
					}
			});
		}
}

function fileDeleteUndo(){
	$.ajax({
		url: 'fileDeleteUndo.do',
		type: 'post',
		data: {
			pfileno: fileno,
			pt: teamAndPrivate
		},
		dataType: 'text',
		success: function(data){
			if(data = "success"){
				location.reload();
			}
		},
		error : function( jqXHR, textStatus, errorThrown ) {
			console.log( jqXHR.status );
			console.log( jqXHR.statusText );
			console.log( jqXHR.responseText );
			console.log( jqXHR.readyState );
			}
	});
}

function popup(){
	
	var win_width = 1040;
	var height = 600+30;
	var userno = $('#userNo').val();
	window.open('', 'popup', 'width=1040, height=630, menubar=yes, scrollbar=no, fullscreen=no');
	
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "webTest.do");
    document.body.appendChild(form);

    var insert = document.createElement("input");
    insert.setAttribute("type", "hidden");
    insert.setAttribute("name", "pfileno");
    insert.setAttribute("value", fileno);
    form.append(insert);

    var insert2 = document.createElement("input");
    insert2.setAttribute("type", "hidden");
    insert2.setAttribute("name", "pt");
    insert2.setAttribute("value", teamAndPrivate);
    form.append(insert2);
    
    var insert2 = document.createElement("input");
    insert2.setAttribute("type", "hidden");
    insert2.setAttribute("name", "userno");
    insert2.setAttribute("value", userno);
    form.append(insert2);
    form.target = 'popup';
    form.submit();
}

$(document).on('classChange', '.file-container', function(){
	console.log('classChage');
	if($('.file-container').hasClass('highlight')){
		$('.far.fa-trash-alt.trash').css('pointer-events', 'auto');
		$('.fas.fa-sync-alt.recovery').css('pointer-events', 'auto');
		$('.far.fa-trash-alt.trash').css('color', 'white');
		$('.fas.fa-sync-alt.recovery').css('color', 'white');
	}else{
		$('.far.fa-trash-alt.trash').css('pointer-events', 'none');
		$('.fas.fa-sync-alt.recovery').css('pointer-events', 'none');
		$('.far.fa-trash-alt.trash').css('color', 'gray');
		$('.fas.fa-sync-alt.recovery').css('color', 'gray');
	}
	
	
});

$(document).on('keyup', '#search-text', function(){
	var keyword = $(this).val();
	if(keyword == ''){
		$('.file-grid').show();
	}else{
		$('.file-grid').hide();
		//input 에 입력된 값에 해당하는 파일만 show 나머지는 hide
		for(var i =0; i < $('.file-container').length; i++){
			var target = $('.file-name:eq('+i+')');
			
			if($.trim(target.html()).includes(keyword)){
				target.closest('.file-grid').show();
			}
		}
	}
});

$(document).on('multiSelected', '.file-container', function(){
	file = {
		pfileno: $(this).siblings('.fileno').val(),
		userno: $(this).siblings('.userno').val(),
		pfiletitle: $.trim($(this).find('.file-name').html()),
		pt: $(this).siblings('.pt').val()
	};
	fileList.push(file);
		
	if($('.far.fa-trash-alt.trash').length){
		
		$('.far.fa-trash-alt.trash').css('pointer-events', 'auto');
		$('.fas.fa-sync-alt.recovery').css('pointer-events', 'auto');
		$('.far.fa-trash-alt.trash').css('color', 'white');
		$('.fas.fa-sync-alt.recovery').css('color', 'white');
		$('.far.fa-trash-alt.trash').attr('onclick', 'multiPermanentDelete()');
		$('.fas.fa-sync-alt.recovery').attr('onclick', 'multiDeleteUndo()');
	}
});

function multiCopy(){
	
	$.ajax({
		url: 'multiCopy.do',
		type: 'post',
		data: JSON.stringify(fileList),
		dataType: 'json',
		contentType: "application/json; charset=UTF-8",
		success: function(data){
			console.log('success');
			location.reload();
		},
		error : function( jqXHR, textStatus, errorThrown ) {
			console.log( jqXHR.status );
			console.log( jqXHR.statusText );
			console.log( jqXHR.responseText );
			console.log( jqXHR.readyState );
		}
	});
};

function multiDelete(){
	for(var i =0; i < fileList.length; i++){
		console.log(fileList[i].pt);
	}
	
	
	$.ajax({
		url: 'multiDelete.do',
		type: 'post',
		data: JSON.stringify(fileList),
		dataType: 'json',
		contentType: "application/json; charset=UTF-8",
		success: function(data){
			console.log('success');
			location.reload();
		},
		error : function( jqXHR, textStatus, errorThrown ) {
			console.log( jqXHR.status );
			console.log( jqXHR.statusText );
			console.log( jqXHR.responseText );
			console.log( jqXHR.readyState );
		}
	});
}

function multiPermanentDelete(){
	var conf = confirm('선택된 파일들을 삭제하시겠습니까?(삭제된 파일은 복구되지않습니다.)');
	if(conf){
		$.ajax({
			url: 'multiPermanentDelete.do',
			type: 'post',
			data: JSON.stringify(fileList),
			dataType: 'json',
			contentType: "application/json; charset=UTF-8",
			success: function(data){
				console.log('success');
				location.reload();
			},
			error : function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR.status );
				console.log( jqXHR.statusText );
				console.log( jqXHR.responseText );
				console.log( jqXHR.readyState );
			}
		});
	}
}

function multiDeleteUndo(){
	$.ajax({
		url: 'multiDeleteUndo.do',
		type: 'post',
		data: JSON.stringify(fileList),
		dataType: 'json',
		contentType: "application/json; charset=UTF-8",
		success: function(data){
			console.log('success');
			location.reload();
		},
		error : function( jqXHR, textStatus, errorThrown ) {
			console.log( jqXHR.status );
			console.log( jqXHR.statusText );
			console.log( jqXHR.responseText );
			console.log( jqXHR.readyState );
		}
	});
}
