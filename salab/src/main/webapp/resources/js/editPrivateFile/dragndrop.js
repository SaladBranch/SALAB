var elementCount = 1;

var target = '#droppable';
/* event 함수들 실행 후에는insertY 80으로 변경 */
var clicks = 0, delay = 400;

$('.geItem').on('mousedown', function(e){
    event.preventDefault();
    clicks++;
    
    setTimeout(function(){
       clicks = 0;        
    }, delay);
    
    if(clicks == 2){
        var module = getModule($(this).attr("id"));
        module.setX(200);
        module.setY(100);
        var temp = module.obj_code;
        $(target).append(temp);
        clicks = 0;
    }else{
        appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).clone().wrap("<div/>").parent().html() + "</div>").appendTo("body");
        moveDragging(event);
    } 
});

$('body').on('mousemove', function(e){
    moveDragging(event);
}).on('mouseup', function(e){
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

function moveDragging(event) {
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
	
	$("[id=droppable]").append(comp);
}

function canvasDivEnter(element) {
	$(this).css("border", "2px solid blue");
    $('#droppable .obj').draggable();
}

$(document).on('click', '#droppable .obj', function(){
    $(this).resizable({
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
        alsoResize: "this .textarea"
    });
});

$(document).on('click', function(e){
    if(!$(e.target).is($('#droppable .obj'))){
        $('#droppable .obj').each(function(){
            if(!$(this).resizable("option", "disabled")){
                $(this).children("ui-resizable-handle").hide();
                $(this).resizable("disable");
            }
                
        });
    }
});

