<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
.input {
	width : 150px;
	height : 50px;
	border : 1px solid black;
}
.console {
	width : 800px;
	height : 800px;
	border : 1px solid black;
}
</style>
<script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script src="/salab/vendors/js/jquery.caret.js"></script>
<script type="text/javascript">
function test(type) {

    //선택 영역 찾기
    var selected = window.getSelection().getRangeAt(0);
    console.log(selected);
    var contents = selected.extractContents();
     
    //b 태그 생성
    var node = document.createElement('span');
    
    var style = "";
    switch(type) {
    	case "red" : style = "color : red;"; break;
    	case "yellow" : style = "color : yellow;"; break;
    	case "bold" : style = "font-weight : bold;"; break;
    	case "normal" : style = "font-weight : normal;"; break;
    }
    
    node.style.cssText = style;
    node.className += "changed";
    node.appendChild(contents);
  
    selected.deleteContents();
    selected.insertNode(node);

	console.log("여기부터 시작");
	console.log($(".input span.changed"));
	
	//var doc = document.getElementsByClassName("changed").getElementByTag("span");
	
	if (type == "red" || type == "yellow") {
	    $(".input span.changed span").each(function() {
			$(this).css("color", "");
			var spanText = $(this).wrap("<div>").parent().html();
			$(this).unwrap();
			if (spanText.startsWith("<span>") || spanText.startsWith("<span style=\"\">")) {
				$(this).contents().unwrap();
			}
	    });
	}
	else if (type == "bold" || type == "normal") {
		
	}
	
	$(".input span").each(function() {
		if ($(this).html() == "")
			$(this).remove();
	})
	
    $(".input span.changed").removeAttr("class");
    
}
</script>
</head>
<body>
<div class="input" contentEditable="true">가나다라마바사아</div>
<button onclick="test('red');">색상(빨강) 변경</button>
<button onclick="test('yellow');">색상(노랑) 변경</button>
<button onclick="test('bold');">굵게 변경</button>
<button onclick="test('normal');">얇게 변경</button>
<div class="console"></div>
</body>
</html>