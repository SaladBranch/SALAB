
var elementCount = 1;
var appendElement = "";

$(function() {
	$(".element-click").resizable();
})

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
	
	tempA = $(temp.html());
	tempA.css({
		position: 'absolute',
		top: Y,
		left: X
	});
	tempA.children("svg").attr({
		width: '200px',
		height: '100px',
	});
	
	$("[id=droppable]").append(tempA);
	tempA.draggable({ drag : function(event) {
		if ($(".element-click").css("top") != "") {
			var canvasTop = Math.round($(".canvas-container").offset().top);
			var canvasLeft = Math.round($(".canvas-container").offset().left);
			$(".element-click").css({
				top: tempA.offset().top - canvasTop - 6,
				left: tempA.offset().left - canvasLeft - 6
			});
		}
		$(".element-enter").css({ top: "", left: "", width : "", height : "", border : "" });
	}}).resizable();
	tempA.mouseenter(function() {
		if ($(this).attr("name") != "clickedElement"){
			var canvasTop = Math.round($(".canvas-container").offset().top);
			var canvasLeft = Math.round($(".canvas-container").offset().left);
			$(".element-enter").css({
				top: $(this).offset().top - canvasTop,
				left: $(this).offset().left - canvasLeft,
				width : $(this).children("svg").css("width").split("px")[0] * 1,
				height : $(this).children("svg").css("height").split("px")[0] * 1,
		    	border : "1px solid blue"
			});
		}
	});
	tempA.mouseleave(function() {
		$(".element-enter").css({ top: "", left: "", width : "", height : "", border : "" });
	});
	tempA.click(function(){
		var canvasTop = Math.round($(".canvas-container").offset().top);
		var canvasLeft = Math.round($(".canvas-container").offset().left);
		$("[id=droppable] a[name='clickedElement'").attr({ name : "" });
		$(this).attr({ name : "clickedElement" });
		$(".element-click").css({
			top: $(this).offset().top - canvasTop - 6,
			left: $(this).offset().left - canvasLeft - 6,
			width : $(this).children("svg").css("width").split("px")[0] * 1 + 10,
			height : $(this).children("svg").css("height").split("px")[0] * 1 + 10,
	    	border : "2px dashed black"
		});
		$(".element-enter").css({ top: "", left: "", width : "", height : "", border : "" });
	});
	
}
