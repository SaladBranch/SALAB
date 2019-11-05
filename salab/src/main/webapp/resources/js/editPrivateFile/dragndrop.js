var elementCount = 1;

var target = '.canvas';
var insertX = 130;
/* event 함수들 실행 후에는insertY 80으로 변경 */
var insertY = 80;

var clicks = 0, delay = 400;

$('.geItem').on('mousedown', function(e){
    event.preventDefault();
    clicks++;
    
    setTimeout(function(){
       clicks = 0;        
    }, delay);
    
    if(clicks == 2){
        var temp = insertCompReposition($(this).clone());
        $(target).append(temp);
        insertY += temp.children("svg").height();
        clicks = 0;
    }else{
        appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).clone().wrap("<div/>").parent().html() + "</div>").appendTo("body");
        appendElement.children("svg").attr("width", "80");
        appendElement.children("svg").attr("height", "80");
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
	console.log("top : " + canvasTop + " / left : " + canvasLeft + " / right : " + canvasRight + " / bottom : " + canvasBottom)
	if (nowX >= canvasLeft && nowX <= canvasRight && nowY >= canvasTop && nowY <= canvasBottom ? appendElement != "" : false) {
		//includeElement(nowX - canvasLeft - 40, nowY - canvasTop - 40, appendElement);
		includeElement(nowX - canvasLeft, nowY - canvasTop, appendElement);
		appendElement = "";
	}
});

function moveDragging(event) {
	var dragX = event.pageX - 40;
	var dragY = event.pageY - 40;
	$(".dragging").css("left", dragX);
	$(".dragging").css("top", dragY);
}

function includeElement(X, Y, temp) {
	console.log(temp.html());
	tempA = temp.children("a");
	tempA.css({
		position: 'absolute',
		top: Y,
		left: X
	});
	tempA.children("svg").attr({
		width: '200px',
		height: '100px'
	});
    
    tempA.children("svg").attr("onmouseenter", "canvasDivEnter()");
    
	$("[id=droppable]").append(temp.html());
}

function canvasDivEnter(element) {
	$(this).css("border", "2px solid blue");
	$("[id=droppable] svg").draggable();
}

function canvasDivLeave(element) {
	$("div[id=" + element + "]").css("border", "");
}

function insertCompReposition(temp){
    temp.css({
        position: 'absolute',
        top: insertY,
        left: insertX
    });
    
    return insertSVGResize(temp);
}
function insertSVGResize(temp){
    var svg = temp.children("svg");
    var comp = svg.children();
    if(temp.is('.c_rectangle, .c_brectangle, .c_ellipse')){
        svg.attr({
            width: '200px',
            height: '100px',
        });
        comp.attr({
            'stroke-width':"0.5"
        });   
    }
    if(temp.is('.c_heading')){
        comp = comp.children();
        svg.attr({
            width: '200px',
            height: '100px'
        });

    }
    if(temp.is('.c_paragraph')){
        comp = comp.children();
        svg.attr({
            width: '200px',
            height: '100px'
        });
        comp.css({
            'font-size': '15px' 
        });
    }
    
    return temp;
}
