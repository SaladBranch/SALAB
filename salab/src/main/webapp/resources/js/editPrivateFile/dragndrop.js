var elementCount = 0; //canvas에 삽입된 object 개수
var selectcnt = 0; //선택된 object 개수
var selectedObj = new Array(); //선택된 object 담아둘 배열
var canvas = ".canvas-container";
var $focus = $('.focus');
var $all = $('#multiselect');
var appendElement = "";
var editable = "true"; // right-side-bar 자동 오픈 여부

function initSelect(){
    var $lastone = $('#droppable .obj').last();
    $('#droppable .obj').each(function(){
        if($(this).is($lastone)){
            selectedObj = new Array();
            selectedObj.push($lastone);
            $lastone.addClass('ui-selected');
            addControl();
        }else{
            $(this).removeClass('ui-selected');
            $(this).children().remove('.ui-resizable-handle');
            $(this).children('.ui-rotatable-handle').hide();
            if($(this).hasClass('ui-draggable'))
                $(this).draggable('destroy');
        }
    });
}

function moveDragging(){
    var dragX = event.pageX - 40;
	var dragY = event.pageY - 40;
	$(".dragging").css({
        left: dragX,
        top: dragY
    });
}
function includeElement(X, Y, temp) {
    var objId = temp.children().attr("id");
    var module = getModule(objId);
    module.setX(X);
    module.setY(Y);
    var comp = module.obj_code;
	
	$("#droppable").append(comp);
    initSelect();
}
function leftMouseListner(){
    $(document).on('click', function(){
        toggleContext(0); 
    });
    $('#droppable').on('click', function(){
        toggleContext(0);
    });
}
function rightMouseListner(){
    $(window).on('contextmenu', function(){
        event.preventDefault();
    });
    //canvas 
    $('#droppable').on('contextmenu', function(e){
        e.preventDefault();
        $('.context-menu').html(contextmenu.canvas);
        toggleContext(1);
        menuActivation();
        showContext(e.clientX, e.clientY);
    });
    $(document).on('contextmenu', '#droppable .obj', function(e){
        e.preventDefault();
        if($(this).parents('.group-obj').length == 0)
            $(this).addClass('ui-selected');
        else
            $(this).parents('.group-obj').addClass('ui-selected');
        selectedObj = new Array();
        $('#droppable .ui-selected').each(function(){
            selectedObj.push($(this));
        });
        addControl();
        (selectedObj.length > 1 || selectedObj[0].hasClass('group-obj')) ? $('.context-menu').html(contextmenu.multi) : $('.context-menu').html(contextmenu.single);
        toggleContext(1);
        menuActivation();
        showContext(e.clientX, e.clientY);
    });
}
function toggleContext(num){
    num === 1 ? $('.context-menu').addClass('show') : $('.context-menu').removeClass('show');
}
function showContext(x, y){
    $('.context-menu').css({
        top: y,
        left: x
    });
}
function menuActivation(){
    copiedObj.length > 0 ? $('.pasteObj').removeClass('disabled') : $('.pasteObj').addClass('disabled');
    
    selectedObj.length === 1 && selectedObj[0].hasClass('group-obj') ? $('.ungroupObj').removeClass('disabled') : $('.ungroupObj').addClass('disabled');
    
    selectedObj.length === 1 ? $('.groupObj').addClass('disabled') : $('.groupObj').removeClass('disabled');
}
function addControl(){
    if($all.html() != ""){
        $all.children().each(function(){
            $(this).css({
                left: Number($(this).css('left').replace('px', '')) + Number($all.css('left').replace('px', '')) + 'px',
                top: Number($(this).css('top').replace('px', '')) + Number($all.css('top').replace('px', '')) + 'px'
            });
            $(this).removeClass('ui-selected');
            $(this).appendTo($('#droppable')); 
        });
    }
    if(selectedObj.length == 1){ //선택된 개체가 하나 일 때
        $obj = selectedObj[0];
        $obj.append(resize_handler.code);
        $obj.children('.ui-rotatable-handle').show();
        $obj.draggable({ //select 된놈은 드래그 가능
            start: function(e, ui){
                $focus.hide();
            },
            cancel: '.ui-rotatable-handle'
        }).rotatable({
            degrees: getRotateDegree($obj),
            wheelRotate: false
        });
        //group obj는 also resize 대상 변경
        if($obj.hasClass('group-obj')){
            $obj.resizable({
                handles:{
                    'n': '.ui-resizable-n',  
                    'e': '.ui-resizable-e',  
                    's': '.ui-resizable-s',
                    'w': '.ui-resizable-w',
                    'ne': '.ui-resizable-ne',  
                    'se': '.ui-resizable-se',
                    'sw': '.ui-resizable-sw',
                    'nw': '.ui-resizable-nw',  
                },
                alsoResize: $obj.children('.obj')
            });
        }else{
            $obj.resizable({
                handles:{
                    'n': '.ui-resizable-n',  
                    'e': '.ui-resizable-e',  
                    's': '.ui-resizable-s',
                    'w': '.ui-resizable-w',
                    'ne': '.ui-resizable-ne',  
                    'se': '.ui-resizable-se',
                    'sw': '.ui-resizable-sw',
                    'nw': '.ui-resizable-nw',  
                },
                alsoResize: "this .obj-comp"
            });
        }
        formatChange($obj);
        if (editable == "true") {
        	$(".open-edit").children("img").attr("src", "/salab/resources/img/openedit_full.png");
        	$(".right-side-bar").fadeIn(300);
        }
        
    }else if(selectedObj.length > 1){ //선택된 개체가 복수일 때(크기 조절, 회전 x / 이동만 가능)
    	console.log("복수 선택");
        for(i = 0; i<selectedObj.length; i++){
            $obj = selectedObj[i];
            $obj.children().remove('.ui-resizable-handle');
            $obj.children('.ui-rotatable-handle').hide();
            if($obj.hasClass('ui-draggable'))
                $obj.draggable('destroy');
            if(!$obj.hasClass('ui-selected'))
                $obj.addClass('ui-selected');
            $all.append($obj);
        }
        $all.draggable().css({
            top: 0,
            left: 0           
        });
    }
}

function getRotateDegree($obj){
    var matrix = $obj.css("-webkit-transform") ||
        $obj.css("-moz-transform") ||
        $obj.css("-ms-transform") ||
        $obj.css("-o-transform") ||
        $obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

$(function(){
    //canvas 위에 삽입된 object는 select 가능
    //애초에 모든 controller들이 붙어서 온 상태이다. 염두해두도록
    rightMouseListner();
    leftMouseListner();
    
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
    
    $('.page-tab-content').selectable({
        cancel: '.ui-selected',
        filter: '>li',
        start: function(){
        	//페이지를 셀렉트했을때 변경된 작업에대해서 임시저장하는 함
        	$( ".page-tab-content .ui-selected").each(function(){
                var index = $( ".page-tab-content li" ).index($(this));
                tempStorage(index);
            });
        },
        stop: function(){
        	//페이지를 셀렉트 했을때 안의 content 가 바뀌게 하는 함수
        	$( ".page-tab-content .ui-selected").each(function() {
                var index = $( ".page-tab-content li" ).index($(this));
                pageContent(index);
        	});
        }
    }).sortable({
        items: "> li",
        placeholder: "ui-selected",
        axis: 'y',
        handle: 'div, .ui-selected',
        cancel: '.newpage',
        helper: function(e, item){
            if ( ! item.hasClass('ui-selected') ) {
              item.parent().children('.ui-selected').removeClass('ui-selected');
              item.addClass('ui-selected');
            }
            var selected = item.parent().children('.ui-selected').clone();
            ph = item.outerHeight() * selected.length;
            item.data('multidrag', selected).siblings('.ui-selected').remove();
            return $('<li/>').append(selected).css({
                'list-style':"none",
                padding: 0
            });
        },
        start: function(e, ui) {
            ui.placeholder.css({'height':ph});
        },
        stop: function(e, ui) {
            var selected = ui.item.data('multidrag');
            ui.item.after(selected);
            ui.item.remove();
        }
    });
    //canvas 위의 마우스 드래깅
    var mode = false; //드래그 영역 토글 변수
    var startX = 0, startY = 0, left, top, width, height; //드래그 영역 위치지정 변수
    $(document).on('mousedown', function(e){ //canvas 마우스 이벤트
    	if($(e.target).is("#droppable .obj *") || $(e.target).is(".ui-resizable-handle") || $(e.target).is(".ui-rotatable-handle") || $(e.target).is(".left-side-bar *") || $(e.target).is(".right-side-bar *"))
            mode = false;
        else{
            mode = true;
            startX = e.clientX;
            startY = e.clientY;
            width = height = 0;
            $focus.show();
        }
    }).on('mousemove', function(e){
        if(appendElement != ""){
            moveDragging();
            mode = false;
        }      
        if(mode){
            setDragLocation(e);
        }
    }).on('mouseup', function(e){
        mode = false;
        $focus.hide();
        $focus.css({width: 0, height: 0});
        
        $(".dragging").remove();
        var nowX = event.clientX;
        var nowY = event.clientY;
        var canvasTop = Math.round($("[id=droppable]").offset().top);
        var canvasLeft = Math.round($("[id=droppable]").offset().left);
        var canvasRight = canvasLeft * 1 + $("[id=droppable]").css("width").split("px")[0] * 1;
        var canvasBottom = canvasTop * 1 + $("[id=droppable]").css("height").split("px")[0] * 1;
        if (nowX >= canvasLeft && nowX <= canvasRight && nowY >= canvasTop && nowY <= canvasBottom ? appendElement != "" : false) {
            includeElement(nowX - canvasLeft, nowY - canvasTop, appendElement);
            appendElement = "";
        }else{
            appendElement = "";
        }
    });
    
    //obj 삽입
    var clicks = 0; //더블클릭 판별용 변수
    var target = "#droppable"; //object append할 변수
    $('.geItem').on('mousedown', function(e){
        event.preventDefault();
        clicks++;
        setTimeout(function(){
            clicks = 0;
        }, 400);
        
        if(clicks == 2){
            var module = getModule($(this).attr("id"));
            module.setX(200);
            module.setY(100);
            $(target).append(module.obj_code);
            initSelect();
            clicks = 0;
        }else{
            appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).clone().wrap("<div/>").parent().html() + "</div>").appendTo("body");
            moveDragging();
        }
    });
    
    //마우스 움직일 때 드래그 영역 설정 함수
    function setDragLocation(e){
        var x = e.clientX;
        var y = e.clientY;
        width = Math.max(x - startX, startX - x);
        left = Math.min(startX, x);
        $focus.css('left', left);
        $focus.css("width", width);

        height = Math.max(y - startY, startY - y);
        top = Math.min(startY, y);
        $focus.css('top', top);
        $focus.css('height', height);        
    }
    
});