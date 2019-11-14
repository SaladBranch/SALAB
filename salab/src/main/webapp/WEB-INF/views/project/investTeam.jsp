<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/resources/js/jquery-ui.js"></script>
    <link rel="stylesheet" href="/salab/vendors/css/jquery-ui.css">
    <link rel="stylesheet" href="/salab/resources/css/common.css">
    <link rel="stylesheet" href="/salab/resources/css/project/newTeam.css">
    <script type="text/javascript">
      
        function investTeam(){
        	console.log($('.investuser').val());
        	if(!($('.investuser').length)){
        		alert('초대할 팀원을 입력해주세요');
        		return false;
        	}
        	$('form').submit();
        }
    	
        $(function(){
           $( "#input1" ).autocomplete({ 
            	source : function( request, response ) { //많이 봤죠? jquery Ajax로 비동기 통신한 후 
            			//json객체를 서버에서 내려받아서 리스트 뽑는 작업 
            			$.ajax({ //호출할 URL 
            				url: "autocomplete.do", //우선 jsontype json으로 
            				type: 'post',
            				dataType: "json", // parameter 값이다. 여러개를 줄수도 있다. 
            				data: { //request.term >> 이거 자체가 text박스내에 입력된 값이다. 
            					text: request.term 
            				},success: function( result ) { //return 된놈을 response() 함수내에 다음과 같이 정의해서 뽑아온다. 
            					response( $.map( result.list, function( item ) { 
            						return {
            							label: item.username +"  " + item.usermail, value: item.username, userno: item.userno, usermail: item.usermail
            							}
            						}) 
            					); 
            				}
            			}); 
            }, //최소 몇자 이상되면 통신을 시작하겠다라는 옵션 
            minLength: 2, //자동완성 목록에서 특정 값 선택시 처리하는 동작 구현 
            //구현없으면 단순 text태그내에 값이 들어간다. 
            select: function( event, ui ) {
            	console.log(ui.item.userno);
            	$('form').append('<input type="hidden" name="invest" value="'+ ui.item.userno +'">');
            	$('#log').prepend('<div class="investuser">'+ ui.item.value +'<em>'+ui.item.usermail+'</em></div>');
            }
        });
        });
    </script>
</head>
<body>
    <div class="top">
      <div class="lev"><p>① 프로젝트 생성</p></div>
      <div class="lev"><p class="second">② 팀원 초대</p></div>
      <div class="lev"><p class="third">③ 완료</p></div>
  </div>
  <div class="middle">
         <p>프로젝트를 함꼐할 팀원을 초대해주세요.</p>
         <p/>
         <div id="log">
        </div>
         <div class="inputfield">
         	<input id="input1" class="inputInvest" type="text" name="invest1" list="autocomp">
         	<datalist id="autocomp">
         		
         	</datalist>
         </div>
      	<form action="investCreateProject.do" method="post">
        	<input type="hidden" name="userno" value="${loginMember.userno }">
        	<input type="hidden" name="projectname" value="${projectname }">
        
        </form>
        
          <button class="btn" onclick="investTeam()">팀원 초대하기</button>
          
      
      <a href="createProject.do?userno=${loginMember.userno}&projectname=${projectname}">나중에 초대할게요.</a>
  </div>
</body>
</html>