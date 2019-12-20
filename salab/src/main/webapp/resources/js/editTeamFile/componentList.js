var rotate_handler = {
    code: function(){ return `<div class="ui-rotatable-handle ui-draggable">`;}
}
var resize_handler = {
    code: function(){
        return `  
          <div class="ui-resizable-handle ui-resizable-n"></div>
          <div class="ui-resizable-handle ui-resizable-e"></div>
          <div class="ui-resizable-handle ui-resizable-s"></div>
          <div class="ui-resizable-handle ui-resizable-w"></div>
          <div class="ui-resizable-handle ui-resizable-ne"></div>
          <div class="ui-resizable-handle ui-resizable-se"></div>
          <div class="ui-resizable-handle ui-resizable-sw"></div>
          <div class="ui-resizable-handle ui-resizable-nw"></div>`;
    }
}

var obj_rect = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_rect.insertY}px; left: ${obj_rect.insertX}px; width: 140px; height: 70px;">
          <div class="obj-comp textarea obj-rect" contenteditable="false"></div>
        </div>`;
        return code;
    }
};
var obj_brect = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_brect.insertY}px; left: ${obj_brect.insertX}px; width: 140px; height: 70px;">
          <div class="obj-comp textarea obj-brect" contenteditable="false"></div>
        </div>`;
        return code;
    }
};

var obj_heading = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_heading.insertY}px; left: ${obj_heading.insertX}px; width: 200px;">
          <div class="obj-comp textarea obj-heading" contenteditable="false">
            <span style="font-size: 35px;"><span style="font-weight: 600;">Heading</span></span>
          </div>
        </div>`
        return code;
    }
};
var obj_paragraph = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_paragraph.insertY}px; left: ${obj_paragraph.insertX}px; width: 200px;">
          <div class="obj-comp textarea obj-paragraph" contenteditable="false">
            <span style="font-size: 35px;"><span style="font-weight: 600">Heading</span></span>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et suscipit modi quaerat, porro.Lorem ipsum dolor sit amet.</p>
          </div>
        </div>`
        return code;
    }
};
var obj_ellipse = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_ellipse.insertY}px; left: ${obj_ellipse.insertX}px; width: 140px; height: 70px;">
          <div class="obj-comp textarea obj-ellipse" contenteditable="false"></div>
        </div>`;
        return code;
    }
};
var obj_square = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj"  style="position: absolute; top: ${obj_square.insertY}px; left: ${obj_square.insertX}px; width: 100px; height: 100px;">
          <div class="obj-comp textarea obj-square" contenteditable="false"></div>
        </div>`;
        return code;
    }
};
var obj_circle = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_circle.insertY}px; left: ${obj_circle.insertX}px; width: 100px; height: 100px;">
          <div class="obj-comp textarea obj-circle" contenteditable="false"></div>
        </div>`;
        return code;
    }
};
var obj_textInput = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_textInput.insertY}px; left: ${obj_textInput.insertX}px; width: 200px; height: 30px;">
	        	<div class="obj-comp textarea obj-textInput" contenteditable="false">
	        		<input class="obj-comp textarea obj-textInput" type="text" placeholder="내용 입력">
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_buttonInput_Normal_A = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_buttonInput_Normal_A.insertY}px; left: ${obj_buttonInput_Normal_A.insertX}px; width: 100px; height: 45px;">
	        	<div class="obj-comp textarea obj_buttonInput_Normal_A" contenteditable="false">
	        		<div class="obj-comp obj-buttonInput_Normal_A">Button</div>
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_buttonInput_Normal_B = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_buttonInput_Normal_B.insertY}px; left: ${obj_buttonInput_Normal_B.insertX}px; width: 100px; height: 45px;">
	        	<div class="obj-comp textarea obj_buttonInput_Normal_B" contenteditable="false">
	        		<div class="obj-comp obj-buttonInput_Normal_B">Button</div>
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_buttonInput_Long_A = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_buttonInput_Long_A.insertY}px; left: ${obj_buttonInput_Long_A.insertX}px; width: 210px; height: 40px;">
	        	<div class="obj-comp textarea obj_buttonInput_Long_A" contenteditable="false">
	        		<div class="obj-comp obj-buttonInput_Long_A">Button</div>
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_buttonInput_Long_B = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_buttonInput_Long_B.insertY}px; left: ${obj_buttonInput_Long_B.insertX}px; width: 210px; height: 50px;">
	        	<div class="obj-comp textarea obj_buttonInput_Long_B" contenteditable="false">
	        		<div class="obj-comp obj-buttonInput_Long_B">Button</div>
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_plusBtn = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_plusBtn.insertY}px; left: ${obj_plusBtn.insertX}px; width: 28px; height: 28px;">
	        	<div class="obj-comp textarea obj_plusBtn" contenteditable="false">
	        		<div class="obj-comp obj_plusBtn">+</div>
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_minusBtn = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_minusBtn.insertY}px; left: ${obj_minusBtn.insertX}px; width: 28px; height: 28px;">
	        	<div class="obj-comp textarea obj_minusBtn" contenteditable="false">
	        		<div class="obj-comp obj_minusBtn">-</div>
	        	</div>
	        </div>`;
	        return code;
	    }
}
var obj_messageForm = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_messageForm.insertY}px; left: ${obj_messageForm.insertX}px; width: 150px; height: 50px;">
	        	<div class="obj-comp textarea" contenteditable="false">
					<div class="obj-comp obj_messageForm">Message</div>
	        	</div>
	        	<span style="position:absolute;width:0;height:0;right:0;top:50%;margin-right:-16px;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:16px solid rgb(46, 204, 113);"></span>
	        </div>`;
	        return code;
	    }
}

var getModule = function(id){
    switch(id){
        case 'obj_rect':
            return obj_rect;
        case 'obj_brect':
            return obj_brect;
        case 'obj_heading':
            return obj_heading;
        case 'obj_paragraph':
            return obj_paragraph;
        case 'obj_ellipse':
            return obj_ellipse;
        case 'obj_square':
            return obj_square;
        case 'obj_circle':
            return obj_circle;
        case 'obj_textInput':
    		return obj_textInput;
        case 'obj_buttonInput_Normal_A':
        	return obj_buttonInput_Normal_A;
        case 'obj_buttonInput_Normal_B':
        	return obj_buttonInput_Normal_B;
        case 'obj_buttonInput_Long_A':
        	return obj_buttonInput_Long_A;
        case 'obj_buttonInput_Long_B':
        	return obj_buttonInput_Long_B;
        case 'obj_plusBtn':
        	return obj_plusBtn;
        case 'obj_minusBtn':
        	return obj_minusBtn;
        case 'obj_messageForm':
        	return obj_messageForm;
    }
};

var contextmenu = {
    canvas: function(){
        return `
        <a href="javascript:pasteObject();" class="pasteObj">붙여넣기</a>
        <a href="javascript:selectAll();" class="selectAll">전체선택</a>
        <a href="#" class="changeCanvas-size">화면 사이즈 변경</a>
        <a href="#" class="changeCanvas-color">페이지 배경색</a>
        <a href="#" class="changeCanvas-color-all">모든 페이지에 이 배경색 적용</a>
        <a href="javascript:popup();" class="webtest">웹테스트</a>    
    `
    },
    single: function(){
        return `
        <a href="javascript:deleteObject();" class="deleteObj">삭제하기</a>
        <a href="javascript:cutObject();" class="cutObj">잘라내기</a>
        <a href="javascript:copyObject();" class="copyObj">복사</a>
        <a href="javascript:pasteObject();" class="pasteObj">붙여넣기</a>
        <a href="javascript:cloneObject();" class="cloneObj">복제하기</a>
        <div class="boundary"></div>
        <ul>        
        <li class="orderObj">순서<span><i class="fas fa-caret-right"></i></span>
            <ul class="orderObj-sub">
                <li><a href="javascript:send_forward();" class="send-forward">맨 앞으로</a></li>
                <li><a href="javascript:send_front();" class="send-front">앞으로</a></li>
                <li><a href="javascript:send_back();" class="send-back">뒤로</a></li>
                <li><a href="javascript:send_backward();" class="send-backward">맨 뒤로</a></li>
            </ul>
        </li>
        </ul>   
        <div class="boundary"></div>
        <ul>
        	<li class="sendObj">보내기<span><i class="fas fa-caret-right"></i></span>
        	<ul class="sendObj-sub">
        		<li><a href="">이미지 파일</a></li>
        		<li><a href="javascript:savetoLibrary();">개인 라이브러리</a></li>
        		<li><a href="javascript:savetoTeamLibrary();">팀 라이브러리</a></li>
        	</ul>
        </li>
        </ul>
        `
    },
    multi: function(){
        return `
        <a href="javascript:groupObject();" class="groupObj">그룹</a>
        <a href="javascript:ungroupObject();" class="ungroupObj">그룹해제</a>
        <div class="boundary"></div>
        <a href="javascript:deleteObject();" class="deleteObj">삭제하기</a>
        <a href="javascript:cutObject();" class="cutObj">잘라내기</a>
        <a href="javascript:copyObject();" class="copyObj">복사</a>
        <a href="javascript:pasteObject();" class="pasteObj">붙여넣기</a>
        <a href="javascript:cloneObject();" class="cloneObj">복제하기</a>
        <div class="boundary"></div>
        <ul>        
        <li class="orderObj">순서<span><i class="fas fa-caret-right"></i></span>
            <ul class="orderObj-sub">
                <li><a href="javascript:send_forward();" class="send-forward">맨 앞으로</a></li>
                <li><a href="javascript:send_front();" class="send-front">앞으로</a></li>
                <li><a href="javascript:send_back();" class="send-back">뒤로</a></li>
                <li><a href="javascript:send_backward();" class="send-backward">맨 뒤로</a></li>
            </ul>
        </li>
        </ul>
        `
    },
    library: function(target){
    	return `
        <a href="javascript:deleteFromLib(`+target+`);" class="deleteFromLib">삭제</a>
        <a href="javascript:saveLibAsImg(`+target+`);" class="saveAsImg">이미지로 내보내기</a>
        <a href="javascript:showModal(`+target+`);" class="renameLib">이름 바꾸기</a>
    	`
    },
    teamLibrary: function(target){
    	return `
        <a href="javascript:deleteFromTeamLib(`+target+`);" class="deleteFromLib">삭제</a>
        <a href="javascript:saveLibAsImg(`+target+`);" class="saveAsImg">이미지로 내보내기</a>
        <a href="javascript:showTeamModal(`+target+`);" class="renameTeamLib">이름 바꾸기</a>
    	`
    }
}

