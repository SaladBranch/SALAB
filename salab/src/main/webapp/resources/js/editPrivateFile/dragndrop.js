var elementCount = 0; //canvas에 삽입된 object 개수
var selectcnt = 0; //선택된 object 개수
var selectedObj = new Array(); //선택된 object 담아둘 배열
var canvas = ".canvas-container";
var $focus = $('.focus');
var $all = $('#multiselect');
var appendElement = "";

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
    $(document).on('dblclick', "#droppable .obj", function(){
        $(this).children(".obj-comp").focus();
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
        var __dx;
        var __dy;
        var __scale=0.5;
        var __recoupLeft, __recoupTop;
        
        $obj.draggable({ //select 된놈은 드래그 가능
            cancel: '.ui-resizable-handle',
            drag: function (event, ui) {
                //resize bug fix ui drag `enter code here`
                __dx = ui.position.left - ui.originalPosition.left;
                __dy = ui.position.top - ui.originalPosition.top;
                //ui.position.left = ui.originalPosition.left + ( __dx/__scale);
                //ui.position.top = ui.originalPosition.top + ( __dy/__scale );
                ui.position.left = ui.originalPosition.left + (__dx);
                ui.position.top = ui.originalPosition.top + (__dy);
                //
                ui.position.left += __recoupLeft;
                ui.position.top += __recoupTop;
            },
            start: function (event, ui) {
                $focus.hide();
                //resize bug fix ui drag
                var left = parseInt($(this).css('left'), 10);
                left = isNaN(left) ? 0 : left;
                var top = parseInt($(this).css('top'), 10);
                top = isNaN(top) ? 0 : top;
                __recoupLeft = left - ui.position.left;
                __recoupTop = top - ui.position.top;
            },
            stop: function (event, ui) {
                $(this).css('cursor', 'default');
            }
        }).rotatable({
            degrees: getRotateDegree($obj),
            stop : function() {
            	formatChange();
            },
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
                alsoResize: $obj.children('.obj'),
                stop: function(){
                    formatChange();
                }
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
                alsoResize: "this .obj-comp",
                stop: function(){
                    formatChange();
                }
            });
        }
        formatChange();
        
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
        formatChange();
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
            // select 실행 시 cursor out
            window.getSelection().removeAllRanges();
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

//canvas sizing
$(function(){
    $('.right-side-bar .tab-menu').hide();
    $('.right-side-bar .tab-content').hide();
    $('.back-chk input').on('change', function(){
        var defaultVal = $('#droppable').css('background-color');
        var $colorpic = $('<div class="canvas-colorpic"></div>')
        if($(this).is(':checked')){
            $('#canvas-background').append($colorpic);
            $('.canvas-colorpic').minicolors({
                control: 'hue',
                position: 'bottom right',
                defaultValue: defaultVal,
                change: function(hex, opacity){
                    $('#droppable').css('background-color', hex);
                }
            });
        }else{
            $('.minicolors').remove();
            $('#droppable').css('background-color', '#fff');
        }
    });
    
    $('#canvas-sizing').on('click', function(){
        $options = $('#canvas-sizing-opt');
        if($options.css('display') == "none"){
            $options.show();
        }else{
            $options.hide();
        }
    });
    
    $('#canvas-sizing-opt li').on('click', function(){
        if($(this).text() != 'custom'){
            $('#canvas-sizing').html($(this).html());
            $('#canvas-sizing-opt').hide();
            var width = $(this).children('span').text().split('x')[0] + 'px';
            var height = $(this).children('span').text().split('x')[1] + 'px';
            $('#droppable').css({
                width: width,
                height: height
            });
        }
    });
});

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