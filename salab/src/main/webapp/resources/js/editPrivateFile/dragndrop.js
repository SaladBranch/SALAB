
var clicks = 0;
var delay = 400;
var target = '#droppable';
var appendElement = "";
var selectedObj = [];
var selectcnt = 0;
var editable = "true";

function addResizable($obj){
    $obj.append(resize_handler.code);
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
    $obj.rotatable();
    $obj.children('.ui-rotatable-handle').show();
}
function delResizable($obj){
    $obj.children().remove('.ui-resizable-handle');
    $obj.children('.ui-rotatable-handle').hide();
}

/* obj 삽입시, 삽입 obj 선택 */
function initSelect(){
    $('#droppable .obj').each(function(){
        $(this).removeClass('ui-selected');
        delResizable($(this));
    });
    var $lastone = $('#droppable .obj').last();
    selectedObj = new Array();
    selectedObj.push($lastone);
    $lastone.addClass('ui-selected');
    addResizable($lastone);
}

/* 모두 선택 취소 */
function clearSelect(){
    $('#droppable .obj').each(function(){
        $(this).removeClass('ui-selected');
        delResizable($(this));
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

$(function(){
    //selectable
    $('#droppable').selectable({
        filter: " > .obj"
    });
    
    //단축키 설정 이벤트
    //mouse drag 변수
    var mode = false;
    var startX = 0;
    var startY = 0;
    var left, top, width, height;
    var $focus = $('.focus');
    $(document).on('mouseenter', '#droppable .obj',function(){
        $(this).draggable({
            cancel: ".ui-rotatable-handle"
        });
    }).on('keyup', function(e){
        if(e.keyCode == 46){
            for(i = 0; i<selectedObj.length; i++){
                selectedObj[i].remove();
            }
        }
    }).on("mousedown", function(e){
        if($(e.target).is("#droppable .obj *") || $(e.target).is(".ui-resizable-handle") || $(e.target).is(".ui-rotatable-handle"))
            mode = false;
        else if($(e.target).is(".ui-rotatable-handle")){
            $(e.target).parent(".obj").rotatable();
        }
        else{
            mode = true;
            startX = e.clientX;
            startY = e.clientY;
            width = height = 0;
            $focus.show();   
        }
    }).on('mouseup', function(e){
        mode = false;
        $focus.hide();
        $focus.css("width", 0);
        $focus.css("height", 0);  
        
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
    }).on('mousemove', function(e){
        if(appendElement != ""){
            moveDragging();
            mode = false;
        }
        if(mode){
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
    //canvas 위 마우스 이벤트
    $('#droppable').on('mousedown', function(e){
        selectcnt = $('.ui-selected').length;
        var $all = $('#multiselect');
        if(!$(e.target).is('#droppable .obj *')){
            clearSelect();
            if($all.html() != ""){
                $all.draggable('destroy');
                
                $all.children().each(function(){
                    $(this).css({
                        left: Number($(this).css('left').replace('px', '')) + Number($all.css('left').replace('px', '')) + 'px',
                        top: Number($(this).css('top').replace('px', '')) + Number($all.css('top').replace('px', '')) + 'px'
                    });
                    $(this).draggable('enable');
                });
                $('#droppable').append($all.children());
            }
        }else{
            var $obj = $(e.target).parents(".obj");
            clearSelect();
            $selectedObj = $obj;
            $obj.addClass("ui-selected");
            addResizable($obj);
            formatChange($obj);
//            console.log(selectcnt);
            if(selectcnt > 1){
                selectedObj = new Array();
                $('.ui-selected').each(function(){
                    selectedObj.push($(this));
                    $all.append($(this));
                    $(this).draggable('disable');
                });
                $all.draggable().css({
                    top: 0,
                    left: 0
                });
            }else{
                var $obj = $(e.target).parents(".obj");
                clearSelect();
                selectedObj = new Array();
                selectedObj.push($obj);
                $obj.addClass("ui-selected");
                addResizable($obj);    
            }
            if (editable == "true") {
            	$(".open-edit img").attr("src", "/salab/resources/img/openedit_full.png");
              $('.right-side-bar').fadeIn(300);
            }
        }
    }).on('mouseup', function(){
        selectcnt = $('.ui-selected').length;
        console.log(selectcnt);
    });
    
    //obj 삽입 이벤트
    $('.geItem').on('mousedown', function(e){
        event.preventDefault();
        clicks++;

        setTimeout(function(){
            clicks = 0;
        }, delay);

        //더블클릭 할 경우 바로 component 삽입 / drag 시 원하는 위치 삽입
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
});

