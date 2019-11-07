
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