<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>승진 테스트 페이지</title>
<style type="text/css">

body { margin : 0; }

.sideBar_L { width : 210px; height : 780px; background : lightgray; padding : 10px 10px 10px 10px; position : absolute; left : 0px; top : 0px; z-index : 10000; }

.elementList { width : 210px; height : 780px; background : white; }
.element { width : 105px; height : 105px; margin : 0px; padding : 0px; float : left; }
.element .object { margin : 20px; }

.dragging { width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px; }
.dragging .object { margin : 8px; }

.droppable { width : 600px; height : 600px; position : absolute; top : 100px; left : 300px; background : white; border : 5px solid black; z-index : -9999 }

</style>

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>

var elementCount = 1;
var appendElement = "";

$('.geItem').on("mousedown", function(event) {
	appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).clone().wrap("<div/>").parent().html() + "</div>").appendTo("body");
	appendElement.children("a").children("svg").attr("width", "80");
	appendElement.children("a").attr("height", "80");
	moveDragging(event);
});

$("body").on("mousemove", function(event) {
	moveDragging(event);
});

$("body").on("mouseup", function(event) {
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
	}
});

function moveDragging(event) {
	var dragX = event.pageX - 40;
	var dragY = event.pageY - 40;
	$(".dragging").css({
		left : dragX,
		top : dragY
	});
}

function includeElement(X, Y, temp) {
	console.log(temp.html());
	tempA = temp.children("a");
	tempA.attr({
		onmouseenter : 'canvasDivEnter()'
	});
	tempA.css({
		position: 'absolute',
		top: Y,
		left: X
	});
	tempA.children("svg").attr({
		width: '200px',
		height: '100px',
	});
	
	$("[id=droppable]").append(temp.html());
	
}

function canvasDivEnter() {
	$("[id=droppable] a").draggable();
}

</script>
  
</head>
<body>
<div class="sideBar_L">
	<div class="elementList">
		<div class="element">
			<div class="object" id="object1" style="width : 60px; height : 60px; border : 2px solid gray;" ></div>
			</div>
		<div class="element">
			<div class="object" id="object2" style="width : 60px; height : 60px; border : 2px solid gray; border-radius : 50px">
			</div>
		</div>
	</div>
	<input type="hidden" value="1">

    <div class="canvas-container">
        <div id="droppable" class="canvas ui-widget-content">
            
        </div>
    </div>
    
</div>

</body>
</html>