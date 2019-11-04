<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width:device-width, initial-scale:1.0;">
	<link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
<title>Insert title here</title>
<script src="https://cdn.bootpay.co.kr/js/bootpay-3.0.2.min.js" type="application/javascript"></script>
<script type="text/javascript">
function payTest(){
	var d = new Date;
	
	BootPay.request({
		price: 0, // 0으로 해야 한다.
		application_id: "5d5a6ed20627a800303d1951",
		name: 'Premium Service', //결제창에서 보여질 이름
		pg: 'danal',
		method: 'card_rebill', // 빌링키를 받기 위한 결제 수단
		show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
		user_info: {
			username: '',
			email: ${loginMember.useremail},
			addr: '',
			phone: ${loginMember.userphone}
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
		// 빌링키를 정상적으로 가져오면 해당 데이터를 불러옵니다.
		$.ajax({
			url: 'pm_comp.do',
			data: {
				billing_key : data.billing_key,
				order_id : 'order_id_',
				u_no : ${loginMember.userno},
			},
			type: 'POST',
			success: function(){
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log("error : " + textStatus);
			}
		});
	});
}
</script>
</head>
<body>

</body>
</html>