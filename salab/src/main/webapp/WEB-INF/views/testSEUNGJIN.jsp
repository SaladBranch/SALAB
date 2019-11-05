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

.canvas { width : 600px; height : 600px; position : absolute; top : 100px; left : 300px; background : white; border : 5px solid black; z-index : -9999 }

</style>

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>

var elementCount = 1;
var appendElement = "";

$(document).on("mousedown", ".element", function(event) {
	appendElement = $("<div class='dragging' name='" + $(this).attr("id") + "'>" + $(this).html() + "</div>").appendTo("body");
	moveDragging(event);
});

$(document).on("mousemove", "body", function(event) {
	moveDragging(event);
});

$(document).on("mouseup", "body", function(event) {
	$(".dragging").remove();
	var nowX = event.pageX;
	var nowY = event.pageY;
	
	/* var canvasTop = $(".canvas").css("top").split("px")[0];
	var canvasLeft = $(".canvas").css("left").split("px")[0];
	var canvasRight = $(".canvas").css("left").split("px")[0] * 1 + $(".canvas").css("width").split("px")[0] * 1;
	var canvasBottom = $(".canvas").css("top").split("px")[0] * 1 + $(".canvas").css("height").split("px")[0] * 1; */

	var canvasTop = $(".canvas").offset().top;
	var canvasLeft = $(".canvas").offset().left;
	var canvasRight = canvasTop * 1 + $(".canvas").css("width").split("px")[0] * 1;
	var canvasBottom = canvasLeft * 1 + $(".canvas").css("height").split("px")[0] * 1;
	
	if (nowX >= canvasLeft && nowX <= canvasRight && nowY >= canvasTop && nowY <= canvasBottom ? appendElement != "" : false) {
		includeElement(nowX - canvasLeft - 40, nowY - canvasTop - 40, appendElement.children().attr("id"));
		appendElement = "";
	}
});

function moveDragging(event) {
	var dragX = event.pageX - 40;
	var dragY = event.pageY - 40;
	$(".dragging").css("left", dragX);
	$(".dragging").css("top", dragY);
}

function includeElement(X, Y, element) {
	var elementType = "background : white; ";
	if (element == "object1") {
		elementType = elementType + "border : 2px solid black;";
	} else if (element == "object2") {
		elementType = elementType + "border : 2px solid black; border-radius : 50px;";
	}
	//$(".canvas").append("<div id=element" + elementCount + " style='position : absolute; top : " + Y + "px; left : " + X + "px; " + elementType + "' onmouseover='divDraggable(\"element" + elementCount++ + "\")'>");
	$(".canvas").append("<div id=element" + elementCount + " style='position : absolute; top : " + Y + "px; left : " + X + "px; width : 84px; height : 84px; ' onmouseenter='canvasDivEnter(\"element" + elementCount + "\")' onmouseleave='canvasDivLeave(\"element" + elementCount++ + "\")'><div class='object' style='width : 80px; height : 80px; " + elementType + "'></div></div>");
}

function canvasDivEnter(element) {
	$("div[id=" + element + "]").css("border", "2px solid blue");
	$("div[id=" + element + "]").draggable();
}

function canvasDivLeave(element) {
	$("div[id=" + element + "]").css("border", "");
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
	<div class="canvas">
	
	</div>
</div>

</body>
</html>