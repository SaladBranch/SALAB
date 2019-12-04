<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/salab/vendors/js/jquery-ui.js"></script>
<script type="text/javascript">

var textSelection;

$(function() {
	
	$(".droppable").selectable({
	    filter : ".selectable-content",
	    start : function() {
	    	$("text-editing").blur();
	    	$("text-editing").removeClass("text-editing");
	    }
	});

	$(document).on("click", ".element", function() {
		if ($(".text-selected").length > 0) {
			restoreSelection(selection);
			$(".text-selected").addClass("text-reselect");
			$(".text-selected").removeClass("text-selected");
			$(".text-reselect").css("background", "none");
		} else if ($(".text-reselect").length > 0)
			$(".text-reselect").contents().unwrap();
	});
	
	$(document).on("dblclick", ".element", function() {
		$(this).addClass("text-editing");
		$(this).children(".textarea").attr("contenteditable", "true");
		if ($(".droppable").is(".ui-selectable"))
			$(".droppable").selectable("destroy");
		$(this).children(".textarea").selectText();
	    /* $(this).toggleClass("selectable-content").removeClass("ui-selected");
	    $(".droppable").selectable("destroy").selectable({
		    filter : ".selectable-content"
		}); */
	});
	
	$(document).on("mousemove", ".text-editing", function() {
		if ($(".droppable").is(".ui-selectable"))
			$(".droppable").selectable("destroy");
	});

	$(document).on("mouseleave", ".text-editing", function() {
		if (!$(".droppable").is(".ui-selectable")) {
			$(".droppable").selectable({
			    filter : ".selectable-content",
			    start : function() {
			    	$(".text-editing").children(".textarea").attr("contenteditable", "false");
			    	$(".text-editing").removeClass("text-editing");
			    }
			});
		}
	});
	
	$("input").on("focusin", function() {
		var focused = window.getSelection();
		if (focused.rangeCount > 0) {
			var target = focused.getRangeAt(0).commonAncestorContainer.parentElement.className + " ";
			// cursor 드래그 된 것이 있을 경우
			if (focused.focusNode != null) {
	    		selection = saveSelection();
				wrapTag(focused.getRangeAt(0), "span", "text-selected", "background", "lightgray");
		        window.getSelection().removeAllRanges();    
			}
		}
	});
	
});

function wrapTag(target, typeName, className, cssType, cssProperty) {
	if (target != null && typeName != null) {
	    var contents = target.extractContents();
	    var node = document.createElement(typeName);
	    if (className != null)
	    	node.className += className;
	    if (cssType != null && cssProperty != null) {
	    	if (cssType == "textDecoration")
    		    node.style.textDecoration = cssProperty;
	    	else
    	    	node.style.cssText = cssType + " : " + cssProperty;
	    }
	    node.appendChild(contents);
	    target.deleteContents();
	    target.insertNode(node);
	}
	else {
		console.log("wrapTag 에러 발생 !!");
	}
};

function saveSelection() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

jQuery.fn.selectText = function() {
	var doc = document;
	var element = this[0];
	if (doc.body.createTextRange) {
		var range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		var selection = window.getSelection();        
		var range = document.createRange();
		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	}
};
	
</script>

<style type="text/css">
.droppable {
	width : 500px;
	height : 500px;
	border : 1px solid black;
	position: relative;
}
.element {
	width : 100px;
	height : 100px;
	border : 1px solid gray;
}
.textarea {
	width : 100%;
	height : 100%;
	float : left;
}
p {
	float : left;
}

.ui-selected {
	background : gray;
}

.ui-selecting {
	background : lightgray;
}
</style>
</head>
<body>

<div class="droppable">
	<div class="element selectable-content">
		<div class="textarea" contenteditable="false"></div>
	</div>
	<div class="element selectable-content">
		<div class="textarea" contenteditable="false"></div>
	</div>
</div>

<div class="attribute">
	<input type="text">
	<input type="number">
</div>

</body>
</html>