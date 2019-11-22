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
<script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script type="text/javascript">
function test() {

	console.log(window.getSelection());

	var str = window.getSelection().focusNode.nodeValue;
		 	
	var start = window.getSelection().focusOffset;
	var end = window.getSelection().anchorOffset;
		 	
	if (start > end) {
		var change = start;
		start = end;
		end = change;
	}
	
	var str = window.getSelection().focusNode.nodeValue;
	var str1 = str.substring(0, start);
	var str2 = "<span style='font-weight : bold;'>" + str.substring(start, end) + "</span>";
	var str3 = str.substring(end, 7);

	$(".input").html(str1 + str2 + str3);
	$(".console").append(str1 + str2 + str3 + "<br>");
	
}
</script>
</head>
<body>
<div class="input" contentEditable="true">가나다라마바사</div>
<button onclick="test();">실행</button>
<div class="console"></div>
</body>
</html>