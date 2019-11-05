
var elementCount = 1;
var appendElement = "";

$('.geItem').on("mousedown", function(event) {
	appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).closet('a').html() + "</div>").appendTo("body");
	appendElement.children("svg").attr("width", "80");
	appendElement.children("svg").attr("height", "80");
	moveDragging(event);
});

$(document).on("mousemove", "body", function(event) {
	moveDragging(event);
});

$(document).on("mouseup", "body", function(event) {
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
	console.log("X : " + event.pageX + " / Y : " + event.pageY);
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
	
	
	/*svg.children("svg").attr("width", "200");
	svg.children("svg").attr("height", "100");
	svg.children("svg").css("position", "relative");
	svg.children("svg").css("left", X);
	svg.children("svg").css("top", Y);
	svg.children("svg").attr("onmouseenter", "canvasDivEnter()");*/

	$("[id=droppable]").append(temp.html());
	
}

function canvasDivEnter(element) {
	$(this).css("border", "2px solid blue");
	$("[id=droppable] svg").draggable();
}

function canvasDivLeave(element) {
	$("div[id=" + element + "]").css("border", "");
}
