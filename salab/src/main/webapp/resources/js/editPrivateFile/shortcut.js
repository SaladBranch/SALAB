var copiedObj = [];
var cutted = 0; //복사인지, 잘라내기한건지 구분하기 위한 변수
var undo = [];
var redo = [];

$(document).on('keydown', function(e){
    if(e.keyCode == 46){ //delete
        deleteObject();
    }
    if(e.ctrlKey && e.keyCode == 67 && $('#droppable .ui-selected').length > 0){ //ctrl+c
        copyObject();
    }
    if(e.ctrlKey && e.keyCode == 83){//ctrl+s
    	e.preventDefault();
    	pageSave();
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode==83){ //ctrl+shift+s
    	e.preventDefault();
    	pageAllSave();
    }
    if(e.ctrlKey && e.keyCode == 88 && $('#droppable .ui-selected').length > 0){ //ctrl+x
        cutObject();
    }
    if(e.ctrlKey && e.keyCode == 86 && copiedObj != ""){ //ctrl+v
        pasteObject();
//        redo.push($('.canvas-container').children());
    }
    if(e.ctrlKey && e.keyCode == 90){//ctrl+z
    	undoPage();
    }
    if(e.ctrlKey && e.keyCode == 89){//ctrl+y
    	redoPage();
    }
    if(e.ctrlKey && e.keyCode == 65){ //ctrl+a
        e.preventDefault();
        if ($(".obj-comp[contenteditable=true]").length == 0 && $(".text-selected").length == 0)
        	selectAll();
        else
        	$(".obj-comp[contenteditable=true]").selectText();
    }
    if (!$("input").is(":focus") && $(".text-editing").length == 0) {
        if(e.keyCode == 38){
        	moveUp();
        }
        if(e.keyCode == 37){
        	moveLeft();
        }
        if(e.keyCode == 39){
        	moveRight();
        }
        if(e.keyCode == 40){
        	moveDown();
        }
    }
});
function deleteObject(){
	var index = $('.page-item').index($('.page-item.ui-selected'));
	list[index].undo.push($('.canvas-container').html());
	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
	
    for(i = 0; i<selectedObj.length; i++){
        selectedObj[i].remove();
    }
    selectedObj = new Array();   
    Thumbnail();
}

function copyObject(){
	if(selectedObj.length > 0){
	    copiedObj = new Array();
	    $('#droppable .ui-selected').each(function(){
	         copiedObj.push($(this));
	    });
	}
}
function cutObject(){
	var index = $('.page-item').index($('.page-item.ui-selected'));
	list[index].undo.push($('.canvas-container').html());
	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
	
    copiedObj = new Array();
    $('#droppable .ui-selected').each(function(){
        copiedObj.push($(this));
        $(this).remove();
    });
    cutted = 1;
    Thumbnail();
}
function pasteObject(){
	var index = $('.page-item').index($('.page-item.ui-selected'));
	list[index].undo.push($('.canvas-container').html());
	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
	
    var $all = $('#multiselect');
    selectedObj = new Array();
    
    if(copiedObj.length == 1){
        var $newObj = copiedObj[0].clone();
        $('#droppable .obj').each(function(){
            $(this).removeClass('ui-selected');
            $(this).children().remove('.ui-resizable-handle');
            $(this).children('.ui-rotatable-handle').hide();
            if($(this).hasClass('ui-draggable'))
                $(this).draggable('destroy');
        });
        
        $newObj.css({
            left: Number(copiedObj[0].css('left').replace('px', '')) + 50 + 'px',
            top: Number(copiedObj[0].css('top').replace('px', '')) + 100 + 'px'
        });
        $newObj.addClass('ui-selected');
        $newObj.appendTo("#droppable");
        selectedObj.push($newObj);
        addControl();
    }
    else{
        for(i = 0; i<copiedObj.length; i++){
            var $newObj = copiedObj[i].clone();
            copiedObj[i].removeClass('ui-selected');
            $newObj.css({
                left: Number(copiedObj[i].css('left').replace('px', '')) + 50 + 'px',
                top: Number(copiedObj[i].css('top').replace('px', '')) + 100 + 'px'
            });
            $newObj.addClass('ui-selected');
            $newObj.appendTo($all);
            selectedObj.push($newObj);
        }
        addControl();
    }
    Thumbnail();
    if(cutted == 1){
        copiedObj = new Array();
        cutted = 0;
    }
}
//복제하기
function cloneObject(){
	var index = $('.page-item').index($('.page-item.ui-selected'));
	list[index].undo.push($('.canvas-container').html());
	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
	
    copyObject();
    pasteObject();
    Thumbnail();
}
//그룹화
function groupObject(){
	if(selectedObj.length > 1){
		var index = $('.page-item').index($('.page-item.ui-selected'));
		list[index].undo.push($('.canvas-container').html());
		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
		
	    var $group = $('<div class="group-obj obj ui-selected"></div>')
	    var left = 1500, right = 0, bottom = 0, width = 0, height = 0, top = 1500;
	    for(i = 0; i<selectedObj.length; i++){
	        $obj = selectedObj[i];
	        
	        var oleft = Number($obj.css('left').replace('px', ''));
	        var otop = Number($obj.css('top').replace('px', ''));
	        var oright = oleft + Number($obj.css('width').replace('px', ''));
	        var obottom = otop + Number($obj.css('height').replace('px', ''));
	        
	        if(oleft < left) left = oleft;
	        if(otop < top) top = otop;
	        if(oright > right) right = oright;
	        if(obottom > bottom) bottom = obottom;
	        
	        $obj.children().remove('.ui-resizable-handle');
	        $obj.children('.ui-rotatable-handle').hide();
	        if($obj.hasClass('ui-draggable'))
	            $obj.draggable('destroy');
	        $obj.removeClass('ui-selected');
	        $group.append($obj);
	    }
	    $group.css({
	        top: top,
	        left: left,
	        width: right - left,
	        height: bottom - top
	    });
	    $group.children('.obj').each(function(){
	        $(this).css({
	            left: Number($(this).css('left').replace('px', '')) - left,
	            top: Number($(this).css('top').replace('px', '')) - top
	        });
	    });
	    
	    $group.appendTo('#droppable');
	    selectedObj = new Array();
	    selectedObj.push($group);
	    
	    addControl();
	}
}
//그룹해제
function ungroupObject(){
	var index = $('.page-item').index($('.page-item.ui-selected'));
	list[index].undo.push($('.canvas-container').html());
	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
	
    if(selectedObj[0].hasClass('group-obj')){
        $group = selectedObj[0];
        selectedObj = new Array();
        $group.children('.obj').each(function(){
            $(this).css({
            	left: $(this).offset().left - $('#droppable').offset().left,
            	top: $(this).offset().top - $('#droppable').offset().top,
            	transform: 'rotate(' + (getRotateDegree($group) + getRotateDegree($(this)))+ 'deg)'
            });
            $(this).addClass('ui-selected');
            $(this).appendTo('#droppable');
            selectedObj.push($(this));
        });
        $group.remove();
        addControl();
    }

}
//전체선택
function selectAll(){
    selectedObj = new Array();
    $('#droppable > .obj').each(function(){
        $(this).addClass('ui-selected');
        selectedObj.push($(this));
    });
    addControl();
}

//실행취소
function undoPage(){
	var undo = list[$('.page-item').index($('.page-item.ui-selected'))].undo;
	var redo = list[$('.page-item').index($('.page-item.ui-selected'))].redo;
	
	redo.push($('.canvas-container').html());
	$('#top-redo-btn img').attr('src', '/salab/resources/img/rightarrow.png');
	
	$('.canvas-container').html(undo[undo.length-1]);
	undo.pop();
	
	if(undo.length === 0)
		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow_disabled.png').css('cursor', 'default');
	
	selectedObj = new Array();
	$('#droppable .ui-selected').each(function(){
		selectedObj.push($(this));
	});
	
	$all = $('#multiselect');
	$('#droppable').selectable({
        filter: " > .obj",
        start: function(){
            selectedObj = new Array();
        },
        selected: function(e, ui){
            selectedObj.push($(ui.selected));
        },
        unselected: function(e, ui){
            $(ui.unselected).children().remove('.ui-resizable-handle');
            $(ui.unselected).children('.ui-rotatable-handle').hide();
            if($(ui.unselected).hasClass('ui-draggable'))
                $(ui.unselected).draggable('destroy');
        },
        stop: function(){
            addControl();
        }
    });
    rightMouseListner();
    leftMouseListner();
    $('#droppable').bind('DOMSubtreeModified', function(e){
        if($('#droppable .ui-selected').length > 0){
            $('.right-side-bar .canvas-menu').hide();
            $('.right-side-bar .tab-menu').show();
            $('.right-side-bar .tab-content').show();
        }else{
            $('.right-side-bar .canvas-menu').show();
            $('.right-side-bar .tab-menu').hide();
            $('.right-side-bar .tab-content').hide();
        }
    });
    
    addControl();
    Thumbnail();
}

//다시실행(redo)
function redoPage(){
	var undo = list[$('.page-item').index($('.page-item.ui-selected'))].undo;
	var redo = list[$('.page-item').index($('.page-item.ui-selected'))].redo;
	
	undo.push($('.canvas-container').html());
	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
	
	$('.canvas-container').html(redo[redo.length-1]);
	redo.pop();
	
	if(redo.length === 0)
		$('#top-redo-btn img').attr('src', '/salab/resources/img/rightarrow_disabled.png').css('cursor', 'default');
	
	selectedObj = new Array();
	$('#droppable .ui-selected').each(function(){
		selectedObj.push($(this));
	});
	
	$all = $('#multiselect');
	$('#droppable').selectable({
        filter: " > .obj",
        start: function(){
            selectedObj = new Array();
        },
        selected: function(e, ui){
            selectedObj.push($(ui.selected));
        },
        unselected: function(e, ui){
            $(ui.unselected).children().remove('.ui-resizable-handle');
            if($(ui.unselected).hasClass('ui-draggable'))
                $(ui.unselected).draggable('destroy');
            $(ui.unselected).children('.ui-rotatable-handle').hide();
        },
        stop: function(){
            addControl();
        }
    });
    rightMouseListner();
    leftMouseListner();
    $('#droppable').bind('DOMSubtreeModified', function(e){
        if($('#droppable .ui-selected').length > 0){
            $('.right-side-bar .canvas-menu').hide();
            $('.right-side-bar .tab-menu').show();
            $('.right-side-bar .tab-content').show();
        }else{
            $('.right-side-bar .canvas-menu').show();
            $('.right-side-bar .tab-menu').hide();
            $('.right-side-bar .tab-content').hide();
        }
    });
    
    addControl();
    Thumbnail();
}


//맨앞으로
var zIndex = 0;
function send_forward(){
	if(selectedObj.length > 0){
		var index = $('.page-item').index($('.page-item.ui-selected'));
		list[index].undo.push($('.canvas-container').html());
		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
		
	    var max = 0;
	    $('#droppable .obj').each(function(){
	        var num = $(this).css('z-index') == 'auto' ? 0 : $(this).css('z-index');
	        if(num > max){
	            max = num;
	        }
	    });
	    for(i = 0; i<selectedObj.length; i++){
	        selectedObj[i].css('z-index', Number(max) + 1);
	    }	
	}
}
//앞으로
function send_front(){
	if(selectedObj.length > 0){
		var index = $('.page-item').index($('.page-item.ui-selected'));
		list[index].undo.push($('.canvas-container').html());
		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
		
	    for(i = 0; i<selectedObj.length; i++){
	        var num = selectedObj[i].css('z-index') == 'auto' ? 0 : selectedObj[i].css('z-index');
	        selectedObj[i].css('z-index', Number(num) + 1);
	    }
	}
}
//뒤로
function send_back(){
	if(selectedObj.length > 0){
		var index = $('.page-item').index($('.page-item.ui-selected'));
		list[index].undo.push($('.canvas-container').html());
		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
		
	    for(i = 0; i<selectedObj.length; i++){
	        var num = selectedObj[i].css('z-index') == 'auto' ? 0 : selectedObj[i].css('z-index');
	        if(num != 0)
	            selectedObj[i].css('z-index', Number(num) - 1);
	        else{
	            $('#droppable .obj').each(function(){
	                var num = $(this).css('z-index') == 'auto' ? 0 : $(this).css('z-index');
	                $(this).css('z-index', Number(num) + 1);
	            });
	        }
	    }
	}
}
//맨뒤로
function send_backward(){
	if(selectedObj.length > 0){
		var index = $('.page-item').index($('.page-item.ui-selected'));
		list[index].undo.push($('.canvas-container').html());
		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
		
	    $('#droppable .obj').each(function(){
	        var num = $(this).css('z-index') == 'auto' ? 0 : $(this).css('z-index');
	        $(this).css('z-index', Number(num) + 1);
	    });
	    for(i = 0; i<selectedObj.length; i++){
	        selectedObj[i].css('z-index', 0);
	    }
	}
}
function moveUp(){
	if(selectedObj.length > 0){
		event.preventDefault();
		for(var i = 0; i<selectedObj.length; i++){
			var top = Number(selectedObj[i].css('top').replace('px', ''));
			selectedObj[i].css('top', top - 1 + 'px');
		}
	}
}
function moveLeft(){
	if(selectedObj.length > 0){
		event.preventDefault();
		for(var i = 0; i<selectedObj.length; i++){
			var left = Number(selectedObj[i].css('left').replace('px', ''));
			selectedObj[i].css('left', left - 1 + 'px');
		}
	}
}
function moveDown(){
	if(selectedObj.length > 0){
		event.preventDefault();
		for(var i = 0; i<selectedObj.length; i++){
			var top = Number(selectedObj[i].css('top').replace('px', ''));
			selectedObj[i].css('top', top + 1 + 'px');
		}
	}
}
function moveRight(){
	if(selectedObj.length > 0){
		event.preventDefault();
		for(var i = 0; i<selectedObj.length; i++){
			var left = Number(selectedObj[i].css('left').replace('px', ''));
			selectedObj[i].css('left', left + 1 + 'px');
		}
	}
}
//Zoom
$(document).ready(function(){
    var scroll_zoom = new ScrollZoom($('.canvas-container'),5,0.1)
});

function ScrollZoom(container, max_scale, factor){
    var target = container.children().first(); //zoom 대상: #droppable
    var size = {w:target.width(), h:target.height()};
    var pos = {x:0, y:0};
    var zoom_target = {x:0, y:0};
    var zoom_point = {x:0, y:0};
    var scale = Number($('.canvas-size p span').text().split('%')[0])/100;
    target.css('transform-origin', '0 0');
    target.on('mousewheel DOMMouseScroll', scrolled);
    
    function scrolled(e){
        if(e.ctrlKey){
            var offset = container.offset();
            zoom_point.x = e.pageX - offset.left; //줌 위치
            zoom_point.y = e.pageY - offset.top; //줌 위치
            
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            if(delta===undefined)
                delta = e.originalEvent.detail;
            delta = Math.max(-1,Math.min(1,delta)) //1 or -1
            zoom_target.x = (zoom_point.x - pos.x)/scale
            zoom_target.y = (zoom_point.y - pos.y)/scale
            
            if(scale < 0.6) 
            	factor = 0.05;
            else 
            	factor = 0.1;
            scale += delta*factor;
            scale = Math.max(0.1, Math.min(max_scale, scale));
            pos.x = -zoom_target.x * scale + zoom_point.x
            pos.y = -zoom_target.y * scale + zoom_point.y
            
            if(pos.x>0)
                pos.x = 0;
            if(pos.x + size.w * scale < size.w)
                pos.x = -size.w*(scale-1)
            if(pos.y>0)
                pos.y = 0
            if(pos.y + size.h * scale < size.h)
                pos.y = -size.h*(scale-1)
            
            update();
        }
    }
    function update(){
        target.css('transform', 'scale(' + (scale) + ', ' + (scale) + ')');
        $('.canvas-size p span').text(Math.floor(scale*100) + "%");
        var changedWidth = $('#droppable').width() * Math.floor(scale*100)/100;
        	
        $('.canvas-container').scrollTop(-pos.y);
        $('.canvas-container').scrollLeft(-pos.x);
    }
}
