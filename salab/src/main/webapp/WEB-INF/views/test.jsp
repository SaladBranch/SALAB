<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width:device-width, initial-scale:1.0;">
	<link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
<title>Insert title here</title>
<script src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
<script src="https://cdn.bootpay.co.kr/js/bootpay-3.0.2.min.js" type="application/javascript"></script>
<script type="text/javascript">
function payTest(){
	var d = new Date;
	console.log('${loginMember.useremail}');
	
	BootPay.request({
		price: 0, // 0으로 해야 한다.
		application_id: "5d5a6ed20627a800303d1951",
		name: 'Premium Service', //결제창에서 보여질 이름
		pg: 'danal',
		method: 'card_rebill', // 빌링키를 받기 위한 결제 수단
		show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
		user_info: {
			username: '오세준',
			email: '${loginMember.useremail}',
			phone: '${loginMember.userphone}'
		},
		order_id: 'order_id_'+ d.getTime(), //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
		params: {callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로'},
	}).error(function (data) {
		//결제 진행시 에러가 발생하면 수행됩니다.
		console.log(data);
	}).cancel(function (data) {
		//결제가 취소되면 수행됩니다.
		console.log(data);
	}).done(function (data) {
		console.log(data);
		// 빌링키를 정상적으로 가져오면 해당 데이터를 불러옵니다.
		$.ajax({
			url: 'pm_done.do',
			data: {
				billing_key : data.billing_key,
				order_id : 'order_id_' + d.getTime(),
				userno : '${loginMember.userno}'
			},
			type: 'POST',
			success: function(){
                alert("성공하자이말이야");
                
				location.href='pm_complete.do';
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log("error : " + textStatus);
			}
		});
	});
}

function isbilling(){
	var d = new Date;
	
	$.ajax({
		url: 'pm_isbilling.do',
		data: {
			order_id : 'order_id_' + d.getTime(),
			userno : '${loginMember.userno}'
		},
		type: 'POST',
		success: function(){
            alert("성공이다이말이야");
			location.href='pm_complete.do';
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("error : " + textStatus);
		}
	});
}
    function Test(){
        $.ajax({
		url: 'regularPayment.do',
		type: 'POST',
		success: function(){
            alert("당일결제");
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("error : " + textStatus);
		}
	});
    }
</script>
</head>
<body>
		<button onclick="isbilling();">빌링결제</button>
		<button onclick="payTest();">결제</button>
				<button onclick="Test();">당일결제</button>
</body>
</html>