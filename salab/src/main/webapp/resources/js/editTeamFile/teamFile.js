$(document).ready(function(){
	var socket = io("http://localhost:8889");
	
	//채팅파트
	$('#chat_input').keydown(function(key){
		if(key.keyCode == 13){
			chat_sendbtn.click();
		}
	});
	$('#chat_sendbtn').click(function(){
		console.log("버튼 클릭드!");
		var message = {
			userno: $('#userno').val(),
			prfileno: $('#prfileno').val(),
			msg: $('#chat_input').val()
		}
		socket.emit("send_msg", message);
		$("#chat_input").val("");
	});
	
	socket.on("send_msg", function(message){
		if($('#prfileno').val() === message.prfileno){
			var $msg = $("<div class='send-msg'></div>").text(message.msg);
			if($('#userno').val() === message.userno){
				var $to = $("<div class='chat-to'></div>");
				$to.append($msg);
				$to.appendTo($('.chat-messages'));
			}else{
				var $from = $("<div class='chat-from'></div>");
				var $profile = $("<div class='send-user-profile'></div>");
				var $profileimg = $("<img>")
				var img = $('#userprofile_r').val();
				if(img === 'empty')
					$profileimg.attr('src', '/salab/resources/img/default_profile.png')
				else
					$profileimg.attr('src', '/salab/resources/userUpfiles/' + img)
				var $name = $("<div class='send-user-name'></div>").text($('#username').val());
				$from.append($profile.append($profileimg)).append($name).append($msg);
				$from.appendTo($('.chat-messages'));
			}
		}
	});
});