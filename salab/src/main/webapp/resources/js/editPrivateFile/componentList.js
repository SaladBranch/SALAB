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
            <h1 style="font-size: 35px;">Heading</h1>
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
            <h1 style="font-size: 35px;">Heading</h1>
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
        var code = `<div class="obj" style="position: absolute; top: ${obj_textInput.insertY}px; left: ${obj_textInput.insertX}px; width: 300px; height:100;">
          <div class="obj-comp textarea obj_textInput" contenteditable="false">
           <input class="obj-textInput" type="text" placeholder="내용 입력">
          </div>
        </div>`

        return code;
    }
}
var obj_radioInput = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `
        <div class="obj" style="position: absolute; top: ${obj_textInput.insertY}px; left: ${obj_textInput.insertX}px; width: 50px; height: 50px;text-align:left;padding:0px;  vertical-align: middle;">
        <input type="radio" class="obj-comp obj_radioInput  " style="width: 40%;    height: 40%; opacity: 1; margin: 33%; height: 40%; opacity: 1; margin: 33%;">
        </div>
        `
        return code;
    }
}
var obj_checkbox = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `
        <div class="obj" style="position: absolute; top: ${obj_textInput.insertY}px; left: ${obj_textInput.insertX}px; width: 50px; height: 50px;text-align:left;padding:0px;  vertical-align: middle;">
        <input type="checkbox" class="obj-comp obj_checkbox" style="width: 40%; height: 40%; opacity: 1; margin: 33%;">
        </div>
        `
        return code;
    }
}
var obj_file = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_paragraph.insertY}px; left: ${obj_paragraph.insertX}px; width: 240px;min-height:24px;font-size:14px;">
          <div class="obj-comp textarea obj_file">
           <input class="obj_file" type="file">
          </div>
        </div>`
        return code;
    }
}
var obj_ul = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_ul.insertY}px; left: ${obj_ul.insertX}px; width: 200px;">
                      <div class="obj-comp obj_ul" style="text-align:left">
                      <ul style='width : auto; list-style-type : disc;'>
                         <li style='width:80%; margin-left:20%; float:left;' contenteditable='false'>list1</li>
                         <li style='width:80%; margin-left:20%; float:left;' contenteditable='false'>list2</li>
                      </ul>
                      </div>
                   </div>`;
        return code;
    } 
}
var obj_progressBar = {
    insertX: 0,
    insertY: 0,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="group-obj obj ui-selected ui-resizable ui-selectee"  style="top: ${obj_progressBar.insertY}px; left: ${obj_progressBar.insertX}px; width: 120px; height: 30px; transform: rotate(0rad);"><div class="obj" style="left:0px; top: 0px; position: absolute; width: 100px;height:20px;"><div class="obj-comp obj_progressBar" contenteditable="false"><div class="obj_progressBar_outline"></div></div></div><div class="obj" style="left:0px; top:0px; position: absolute;  width: 70px;height:20px;"><div class="obj-comp obj_progressBar" contenteditable="false"><div class="obj_progressBar_inline"></div></div></div></div>`;
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
        case 'obj_radioInput':
            return obj_radioInput;
         case 'obj_checkbox':
            return obj_checkbox;
          case 'obj_file':
            return obj_file;
          case 'obj_ul':
            return obj_ul;
          case 'obj_progressBar':
            return obj_progressBar;
         case 'obj_search':
            return obj_search;
         case 'obj_scroll_y':
            return obj_scroll_y;
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
    	`
    }
}

