	var socket = io("http://localhost:8889");
	
	//채팅파트
	var msgAlert = 0; //msg 알림용 변수
	//방에 들어왔을때
	var userProfile = {
		userno: $('#userno').val(),
		username: $('#username').val(),
		userprofile_r: $('#userprofile_r').val() === 'empty'? 'empty' : $('#userprofile_r').val()
	}
	socket.emit("joinRoom", "prfile"+$('#prfileno').val(), userProfile);
	socket.on("joinRoom", function(userProfiles){
		$('.team-members').html("");
		if(userProfiles.length > 1){
			$('#more-members').show();
			$('.team-members').removeClass('hidden');
		}else{
			$('.team-members').addClass('hidden');
			$('#more-members').hide();
		}
		for(var i = 0; i < userProfiles.length; i++){
			userProfile = userProfiles[i];
			if(userProfiles.length != 1 && userProfile.userno != $('#userno').val()){
				$img = $('<img class="member-profile">').attr('data-usercolor', userProfile.usercolor);
				$img.css({
					border: '2px solid ' + $img.attr('data-usercolor')
				})
				userProfile.userprofile_r === 'empty' ? $img.attr('src', '/salab/resources/img/default_profile.png') :  $img.attr('src', '/salab/resources/userUpfiles/' + userProfile.userprofile_r);
				var member = $('<div class="each-member"></div>').append($img).append($('<span></span').text(userProfile.username));
				$('.team-members').append(member);
			}
			if(userProfile.userno == $('#userno').val()){
				$('#my-profile').attr('data-usercolor', userProfile.usercolor);
				$('#my-profile').css({
					border: '2px solid ' + $('#my-profile').attr('data-usercolor')
				});
			}
		}
	});
	//방에서 나갈때	
	socket.on("leaveRoom", function(userProfiles){
		$('.team-members').html("");
		if(userProfiles.length > 1){
			$('#more-members').show();
			$('.team-members').removeClass('hidden');
		}else{
			$('.team-members').addClass('hidden');
			$('#more-members').hide();
		}
		for(var i = 0; i < userProfiles.length; i++){
			userProfile = userProfiles[i];
			if(userProfiles.length != 1 && userProfile.userno != $('#userno').val()){
				$img = $('<img class="member-profile">').attr('data-usercolor', userProfile.usercolor);
				$img.css({
					border: '2px solid ' + $img.attr('data-usercolor')
				})
				userProfile.userprofile_r === 'empty' ? $img.attr('src', '/salab/resources/img/default_profile.png') :  $img.attr('src', '/salab/resources/userUpfiles/' + userProfile.userprofile_r);
				var member = $('<div class="each-member"></div>').append($img).append($('<span></span').text(userProfile.username));
				$('.team-members').append(member);
			}
			if(userProfile.userno == $('#userno').val()){
				console.log("내꺼다!");
				$('#my-profile').attr('data-usercolor', userProfile.usercolor);
				$('#my-profile').css({
					border: '2px solid ' + $('#my-profile').attr('data-usercolor')
				})
			}
		}
	});
	//Object 선택
	function TeamSelectObject(){
		
	}
	
	//Object삽입
	function TeamInsertObject(obj_code){
		socket.emit("InsertObject", obj_code);
	}
	socket.on("InsertObject", function(obj_code){
		$('#droppable').append(obj_code);
	});
	//Object 이동
	function TeamDragObject(ui, position){
		var index = $('#droppable > .obj').index(ui);
		var dragobj = {
			objIndex: index,
			objPos: position
		}
		socket.emit("DragObject", dragobj);
	}
	socket.on("DragObject", function(dragobj){
		var target = $('#droppable > .obj').eq(dragobj.objIndex);
		target.css({
			left: dragobj.objPos.left,
			top: dragobj.objPos.top
		});
	});
	//Object 사이즈
	function TeamResizeObject(obj, ui){
		var index = $('#droppable > .obj').index(obj);
		var resizeobj = {
			objIndex: index,
			objPos: ui.position,
			objSize: ui.size
		}
		socket.emit("ResizeObject", resizeobj);
	}
	socket.on("ResizeObject", function(resizeobj){
		var target = $('#droppable > .obj').eq(resizeobj.objIndex);
		target.css({
			left: resizeobj.objPos.left,
			top: resizeobj.objPos.top,
			width: resizeobj.objSize.width,
			height: resizeobj.objSize.height
		});
		formatChange();
	});
	//Object 회전
	function TeamRotateObject(obj, ui){
		var index = $('#droppable > .obj').index(obj);
		var rotateobj = {
			objIndex: index,
			objDegree: ui.angle.stop
		}
		socket.emit("RotateObject", rotateobj);
	}
	socket.on("RotateObject", function(rotateobj){
		var target = $('#droppable > .obj').eq(rotateobj.objIndex);
		target.css({
			transform: 'rotate('+ rotateobj.objDegree + 'rad)'
		});
		formatChange();
	})
	
    //채팅창 토글 
    $('.team-chat').on('click', function(){
        if($('.chat-box').css("display") == "none"){
        	msgAlert = 0;
        	$('#chat-alert').hide();
            $('.chat-box').show();
            $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
        }else{
            $('.chat-box').hide();
        }
    });
    
	$('#chat_input').keydown(function(key){
		if(key.keyCode == 13){
			chat_sendbtn.click();
		}
	});
	$('#chat_sendbtn').click(function(){
		var profile =  $('#userprofile_r').val() === 'empty'? 'empty' : $('#userprofile_r').val();
		var name = $('#username').val();
		var message = {
			userno: $('#userno').val(),
			username: name,
			userprofile_r: profile,
			prfileno: $('#prfileno').val(),
			msg: $('#chat_input').val()
		}
		socket.emit("send_msg", message);
		$("#chat_input").val("");
	});
	
	socket.on("send_msg", function(message){
		if($('.chat-box').css("display") == "none"){
			msgAlert++;
			$('#chat-alert').text(msgAlert).show();
		}else{
			msgAlert == 0;
			$('#chat-alert').hide();
		}
		if($('#userno').val() === message.userno){
			addMyMessage(message);
		}else{
			addYourMessage(message);
		}
		$('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
	});
	
	//onload시, chat 20개 불러오기 
	var MessageList = new Array();
	var firstMessageIndex;
	
	var getmsg = {
		prfileno: $('#prfileno').val(),
	}
	$.ajax({
		url: "getMessageList.do",
		type: 'post',
		contentType: "application/json; charset=UTF-8",
		cache: false,
		data: JSON.stringify(getmsg),
		dataType: 'json',
		success: function(data){
			for(var i = 0; i<data.messageList.length; i++){
				var message = {
					userno: data.messageList[i].userno,
					username: data.messageList[i].username,
					userprofile_r: data.messageList[i].userprofile_r,
					prfileno: data.messageList[i].prfileno,
					msg: data.messageList[i].msg,
					date: data.messageList[i].date
				}
				MessageList.push(message);
			}
			initMessageList();
		},
		error: function(){
			console.log("메시지 리스트 불러오기 실패");
		}
	});
	//불러온 chatting 박스에 추가
	function initMessageList(){
		var myuserno = $('#userno').val();
		if(MessageList.length >= 20){
			for(var i = MessageList.length - 20; i<MessageList.length; i++){
				if(myuserno == MessageList[i].userno)
					addMyMessage(MessageList[i]);
				else
					addYourMessage(MessageList[i]);
			}
			firstMessageIndex = MessageList.length - 20;
		}else{
			for(var i = 0; i<MessageList.length; i++){
				if(myuserno == MessageList[i].userno)
					addMyMessage(MessageList[i]);
				else
					addYourMessage(MessageList[i]);
			}
			firstMessageIndex = 0;
		}
	}
	function addMyMessage(message){
		var $msg = $("<div class='send-msg'></div>").text(message.msg);
		var $to = $("<div class='chat-to'></div>");
		$to.append($msg);
		$to.appendTo($('.chat-messages'));
	}
	function addYourMessage(message){
		var $msg = $("<div class='send-msg'></div>").text(message.msg);
		var $from = $("<div class='chat-from'></div>");
		var $profile = $("<div class='send-user-profile'></div>");
		var $profileimg = $("<img>");
		message.userprofile_r === 'empty' ? $profileimg.attr('src', '/salab/resources/img/default_profile.png') :  $profileimg.attr('src', '/salab/resources/userUpfiles/' + message.userprofile_r);
		var $name = $("<div class='send-user-name'></div>").text(message.username);
		$from.append($profile.append($profileimg)).append($name).append($msg);
		$from.appendTo($('.chat-messages'));
	}
	//Chat ScrollTop시 추가 로드하기
	$('.chat-messages').scroll(function(){
		var scrolltop = $('.chat-messages').scrollTop();
		var myuserno = $('#userno').val();
		if(scrolltop == 0 && firstMessageIndex != 0){
			if(firstMessageIndex < 5){
				for(var i = firstMessageIndex - 1; i>=0; i--){
					var $msg = $("<div class='send-msg'></div>").text(MessageList[i].msg);
					if(myuserno == MessageList[i].userno){
						var $to = $("<div class='chat-to'></div>");
						$to.append($msg);
						$to.prependTo($('.chat-messages'));
					}else{
						var $from = $("<div class='chat-from'></div>");
						var $profile = $("<div class='send-user-profile'></div>");
						var $profileimg = $("<img>");
						MessageList[i].userprofile_r === 'empty' ? $profileimg.attr('src', '/salab/resources/img/default_profile.png') :  $profileimg.attr('src', '/salab/resources/userUpfiles/' + MessageList[i].userprofile_r);
						var $name = $("<div class='send-user-name'></div>").text(MessageList[i].username);
						$from.append($profile.append($profileimg)).append($name).append($msg);
						$from.prependTo($('.chat-messages'));
					}
				}
				firstMessageIndex = 0;
			}else{
				for(var i = firstMessageIndex - 1; i>=firstMessageIndex-5; i--){
					var $msg = $("<div class='send-msg'></div>").text(MessageList[i].msg);
					if(myuserno == MessageList[i].userno){
						var $to = $("<div class='chat-to'></div>");
						$to.append($msg);
						$to.prependTo($('.chat-messages'));
					}else{
						var $from = $("<div class='chat-from'></div>");
						var $profile = $("<div class='send-user-profile'></div>");
						var $profileimg = $("<img>");
						MessageList[i].userprofile_r === 'empty' ? $profileimg.attr('src', '/salab/resources/img/default_profile.png') :  $profileimg.attr('src', '/salab/resources/userUpfiles/' + MessageList[i].userprofile_r);
						var $name = $("<div class='send-user-name'></div>").text(MessageList[i].username);
						$from.append($profile.append($profileimg)).append($name).append($msg);
						$from.prependTo($('.chat-messages'));
					}
				}
				firstMessageIndex -= 5;
			}
		}
	});
