
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
        var code = `<div class="obj" style="position: absolute; top: ${obj_textInput.insertY}px; left: ${obj_textInput.insertX}px; width: 300px; height:35px;">
        	<input class="obj-comp obj-textInput" type="text" placeholder="내용 입력" readOnly>
        </div>`

        return code;
    }
};
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
	        		<div class="obj-comp obj_buttonInput_Normal_A">Button</div>
	        	</div>
	        </div>`;
	        return code;
	    }
};
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
	        	<div class="obj-comp textarea obj_buttonInput_Normal_B" contenteditable="false">Button</div>
	        </div>`;
	        return code;
	    }
};
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
	        	<div class="obj-comp textarea obj_buttonInput_Long_A" contenteditable="false">Button</div>
	        </div>`;
	        return code;
	    }
};
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
	        var code = `<div class="obj" style="position: absolute; top: ${obj_buttonInput_Long_B.insertY}px; left: ${obj_buttonInput_Long_B.insertX}px; width: 210px; height: 40px;">
	        	<div class="obj-comp textarea obj_buttonInput_Long_B" contenteditable="false">Button</div>
	        </div>`;
	        return code;
	    }
};
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
	        	<div class="obj-comp textarea obj_plusBtn" contenteditable="false">+</div>
	        </div>`;
	        return code;
	    }
};
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
	        	<div class="obj-comp textarea obj_minusBtn" contenteditable="false">-</div>
	        </div>`;
	        return code;
	    }
}
var obj_messageForm_A = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_messageForm_A.insertY}px; left: ${obj_messageForm_A.insertX}px; width: 130px; height: 45px; min-width: 41px; min-height: 41px;">
	        	<div class="obj-comp textarea obj_messageForm_A" contenteditable="false">Message</div>
	        	<span style="position:absolute;width:0;height:0;right:0;top:50%;margin-right:-16px;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:16px solid rgb(46, 204, 113);"></span>
	        </div>`;
	        return code;
	    }
}
var obj_messageForm_B = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_messageForm_B.insertY}px; left: ${obj_messageForm_B.insertX}px; width: 130px; height: 45px; min-width: 41px; min-height: 41px;">
	        	<div class="obj-comp textarea obj_messageForm_B" contenteditable="false">Message</div>
				<span style="position:absolute;width:0;height:0;left:0;top:50%;margin-left:-16px;border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:16px solid #bbb"></span>
	        </div>`;
	        return code;
	    }
}
var obj_memo_A = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_memo_A.insertY}px; left: ${obj_memo_A.insertX}px; width: 160px; height: 70px;">
				<div class="obj-comp textarea obj_memo_A" contenteditable="false">Memo..</div>
	        </div>`;
	        return code;
	    }
}
var obj_memo_B = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_memo_B.insertY}px; left: ${obj_memo_B.insertX}px; width: 160px; height: 70px;">
				<div class="obj-comp textarea obj_memo_B" contenteditable="false">Memo..</div>
	        </div>`;
	        return code;
	    }
}
var obj_label = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_label.insertY}px; left: ${obj_label.insertX}px; width: 75px; height: 20px;">
				<div class="obj-comp textarea obj_label">LABEL</div>
	        </div>`;
	        return code;
	    }
}
var obj_marker = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_marker.insertY}px; left: ${obj_marker.insertX}px; width: 31px; height: 31px;">
				<div class="obj-comp textarea obj_marker">1</div>
	        </div>`;
	        return code;
	    }
}
var obj_prev = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_prev.insertY}px; left: ${obj_prev.insertX}px; width: 75px; height: 25px;">
				<div class="obj-comp textarea obj_prev">< prev</div>
	        </div>`;
	        return code;
	    }
}
var obj_next = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_next.insertY}px; left: ${obj_next.insertX}px; width: 75px; height: 25px;">
				<div class="obj-comp textarea obj_next">next ></div>
	        </div>`;
	        return code;
	    }
}
var obj_profile_A = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_profile_A.insertY}px; left: ${obj_profile_A.insertX}px; width: 60px; height: 60px;">
					<img class="obj-comp obj_profile_A" src="/salab/resources/img/default_profile2.png">
	        </div>`;
	        return code;
	    }
}
var obj_profile_B = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_profile_B.insertY}px; left: ${obj_profile_B.insertX}px; width: 60px; height: 60px;">
					<img class="obj-comp obj_profile_B" src="/salab/resources/img/default_profile3.png">
	        </div>`;
	        return code;
	    }
};
var obj_paging = {
	    insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="group-obj obj ui-resizable ui-selected"  style="top: ${obj_paging.insertY}px; left: ${obj_paging.insertX}px;  width: 205px;height:30px; transform: rotate(0rad);">
	        <div class="obj" style="position: absolute; top: 0px; left: 0px;  width: 30px;height:30px;transform: rotate(0rad);">
	        	<div class="obj-comp textarea obj_paging"><</div>
	        </div>
	        <div class="obj" style="position: absolute; top: 0px; left: 35px;  width: 30px;height:30px;transform: rotate(0rad);">
	        	<div class="obj-comp textarea obj_paging" style="background:rgb(52, 152, 219); color:#fff;">1</div>
	        </div>
	        <div class="obj" style="position: absolute; top: 0px; left: 70px;  width: 30px;height:30px;transform: rotate(0rad);">
	        	<div class="obj-comp textarea obj_paging">2</div>
	        </div>
	        <div class="obj" style="position: absolute; top: 0px; left: 105px;  width: 30px;height:30px;transform: rotate(0rad);">
	        	<div class="obj-comp textarea obj_paging">3</div>
	        </div>
	        <div class="obj" style="position: absolute; top: 0px; left: 140px;  width: 30px;height:30px;transform: rotate(0rad);">
	        	<div class="obj-comp textarea obj_paging">4</div>
	        </div>
	        <div class="obj" style="position: absolute; top: 0px; left: 175px;  width: 30px;height:30px;transform: rotate(0rad);">
	        	<div class="obj-comp textarea obj_paging">></div>
	        </div>
	</div>`
	        return code;
	    }
	}
var obj_tooltip_A = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_tooltip_A.insertY}px; left: ${obj_tooltip_A.insertX}px; width: 130px; height: 35px; min-width: 41px; min-height: 41px;">
	        	<div class="obj-comp textarea obj_tooltip_A">Tooltip</div>
				<span style="position:absolute;width:0;height:0;left:50%;bottom:-12px;margin-left:-12px;border-left:12px solid transparent;border-right:12px solid transparent;border-top:12px solid #666"></span>
	        </div>`;
	        return code;
	    }
}
var obj_tooltip_B = {
		insertX: 200,
	    insertY: 100,
	    setX: function(x){
	        this.insertX = x;
	    },
	    setY: function(y){
	        this.insertY = y;
	    },
	    obj_code: function(){
	        var code = `<div class="obj" style="position: absolute; top: ${obj_tooltip_B.insertY}px; left: ${obj_tooltip_B.insertX}px; width: 130px; height: 35px; min-width: 41px; min-height: 41px;">
	        	<div class="obj-comp textarea obj_tooltip_B">Tooltip</div>
				<span style="position:absolute;width:0;height:0;left:50%;top:-12px;margin-left:-12px;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:12px solid #666"></span>
	        </div>`;
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
        <div class="obj" style="position: absolute; top: ${obj_radioInput.insertY}px; left: ${obj_radioInput.insertX}px; width: 50px; height: 50px;text-align:left;padding:0px;  vertical-align: middle;">
        <input type="radio" class="obj-comp obj_radioInput  " style="width: 40%;    height: 40%; opacity: 1; margin: 33%; height: 40%; opacity: 1; margin: 33%;">
        </div>
        `
        return code;
    }
};
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
        <div class="obj" style="position: absolute; top: ${obj_checkbox.insertY}px; left: ${obj_checkbox.insertX}px; width: 50px; height: 50px;text-align:left;padding:0px;  vertical-align: middle;">
        <input type="checkbox" class="obj-comp obj_checkbox" style="width: 40%; height: 40%; opacity: 1; margin: 33%;">
        </div>
        `
        return code;
    }
};
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
        	   <input class="obj-comp obj_file" type="file">
        </div>`
        return code;
    }
};
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
                      <ul class="obj-comp obj_ul" style='width : auto; list-style-type : disc; text-align:left;'>
                         <li style='width:80%; margin-left:20%; float:left;' contenteditable='false'>list</li>
                         <li style='width:80%; margin-left:20%; float:left;' contenteditable='false'>list</li>
                      </ul>
                   </div>`;
        return code;
    } 
};
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
        var code = `<div class="group-obj obj ui-selected ui-resizable ui-selectee"  style="top: ${obj_progressBar.insertY}px; left: ${obj_progressBar.insertX}px; width: 120px; height: 30px; transform: rotate(0rad);"><div class="obj" style="left:0px; top: 0px; position: absolute; width: 100px;height:20px;transform: rotate(0rad); cursor: default;"><div class="obj-comp obj_progressBar" contenteditable="false" ><div class="obj_progressBar_outline"></div></div></div><div class="obj" style="left:0px; top:0px; position: absolute;  width: 70px;height:20px; transform: rotate(0rad);"><div class="obj-comp obj_progressBar" contenteditable="false" ><div class="obj_progressBar_inline"></div></div></div></div>`;
        return code;
    }
};
var obj_search = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="obj" style="position: absolute; top: ${obj_search.insertY}px; left: ${obj_search.insertX}px; width: 200px;height:36px;min-width:100px;min-height:32px;">
          <div class="obj-comp  obj_search" style="border:1px solid gray;"><div class="obj_search_left" contenteditable="false" styles="min-width:30px;min-height:32px;"><img src="/salab/resources/img/search.png" alt=""></div><div class="obj_search_right textarea "styles="min-width:70px;min-height:32px;"></div></div></div>`
        return code;
    }
}
var obj_scroll_y = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div  class="group-obj obj ui-resizable ui-selected"  style="top: ${obj_scroll_y.insertY}px; left: ${obj_scroll_y.insertX}px;  width: 22px;height:205px; transform: rotate(0rad);">
        <div class="obj" style="position: absolute; top: 0px; left: 0px; width: 20px;height:200px;transform: rotate(0rad);">
          <div class="obj-comp obj_scroll_y" contenteditable="false" style="position: absolute; top: 0px; left: 0px;">
               <div class="obj_scroll_outline">
                    <div class="obj_scroll_upside"><i class="fas fa-angle-up"></i></div>
                    <div class="obj_scroll_downside"><i class="fas fa-angle-down"></i></div>
                </div>
            </div>
        </div>
        <div class="obj" style="position: absolute; top: 20px; left: 0px; width: 20px;height:40px; height:80px; transform: rotate(0rad);">
                <div class="obj-comp obj_scroll_y obj_scroll_inline"></div>
        </div>
    </div>`
        return code;
    }
}
var obj_scroll_x = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div class="group-obj obj ui-resizable ui-selected"  style="top: ${obj_scroll_x.insertY}px; left: ${obj_scroll_x.insertX}px;  width: 203px;height:28px; min-height:26px; min-width:130; transform: rotate(0rad);">
        <div class="obj" style="position: absolute; top: 0px; left: 0px; width: 200px;height:26px;min-height:25px; min-width:130; transform: rotate(0rad);
">
          <div class="obj-comp obj_scroll_x" contenteditable="false" style="position: absolute; top: 0px; left: 0px;">
               <div class="obj_scroll_x_outline">
                    <div class="obj_scroll_x_leftside"><img src="/salab/resources/img/leftangle.png" alt=""></div>
                    <div class="obj_scroll_x_center"></div>
                    <div class="obj_scroll_x_rightside"><img src="/salab/resources/img/rightangle.png" alt=""></div>
                </div>
            </div>
        </div>
        <div class="obj" style="position: absolute; top: 0px; left: 20px; width: 40px;height:25px;min-height:26px;transform: rotate(0rad);
">
                <div class="obj-comp obj_scroll_x_inline">
                    <div class=""></div>
                </div>
        </div>
    </div>`
        return code;
    }
}
var obj_dropdown = {
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
            <div class="obj" style="position: absolute; top: ${obj_dropdown.insertY}px; left: ${obj_dropdown.insertX}px;  width: 200px;height:40px;">
          <div class="obj-comp obj_dropdown" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            <div class="obj_dropdown_left "contenteditable="false" ><input type="text" placeholder="Drop down">
                            </div>
                            <div class="obj_dropdown_right" contenteditable="false">
                                    <img src="/salab/resources/img/upangle.png" alt="">
                                    <img src="/salab/resources/img/downangle.png" alt="">
                            </div>
        </div>
        </div>`
        return code;
    }
}
var obj_dropdownList = {
    insertX: 200,
    insertY: 100,
    setX: function(x){
        this.insertX = x;
    },
    setY: function(y){
        this.insertY = y;
    },
    obj_code: function(){
        var code = `<div onchange="test()" class="group-obj obj ui-resizable ui-selected"  style="top: ${obj_scroll_x.insertY}px; left: ${obj_scroll_x.insertX}px;  width: 205px;min-height:150px; transform: rotate(0rad);"contenteditable="false" >
            <div class="obj" style="position: absolute; top: 0px; left: 0px;  width: 200px;height:40px;transform: rotate(0rad)">
          <div class="obj-comp obj_dropdown" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            <div class="obj_dropdown_left"contenteditable="false" ><input type="text" placeholder="Drop down">
                            </div>
                            <div class="obj_dropdown_right" contenteditable="false">
                                    <img src="/salab/resources/img/upangle.png" alt="">
                                    <img src="/salab/resources/img/downangle.png" alt="">
                            </div>
        </div>
        </div>
        <div class="obj " style="position: absolute;margin-top:-100px; top: 100%; left: 0px;  width: 200px;height:80px;min-height:60px;transform: rotate(0rad);">
          <div class="obj-comp obj-brect textarea ui-selectee" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit; background-color:#fff;"></div></div>
        <div class="obj" style="position: absolute;margin-top:-100px; top: 100%; left: 10%;  width: 170px;height:30px;transform: rotate(0rad);">
          <div class="obj-comp obj-rect textarea ui-selectee" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit; background-color:inherit;border:0px;text-align:left;">List</div></div>
        <div class="obj" style="position: absolute;margin-top:-70px; top: 100%; left: 10%;  width: 170px;height:30px;transform: rotate(0rad);">
          <div class="obj-comp obj-rect textarea ui-selectee" style="position: absolute; top: 0px; left: 0px;width: inherit;height:inherit; background-color:inherit;border:0px;text-align:left;">List</div></div>
</div>`
        return code;
    }
}
//대각선
var obj_diagonal_R = {
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
            <div class="obj" style="position: absolute; top: ${obj_diagonal_R.insertY}px; left: ${obj_diagonal_R.insertX}px;  width: 200px;height:200px;">
          <div class="obj-comp obj_diagonal_R diagonal_R" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            
        </div>
        </div>`
        return code;
    }
}
//대각선
var obj_diagonal_L = {
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
            <div class="obj" style="position: absolute; top: ${obj_diagonal_L.insertY}px; left: ${obj_diagonal_L.insertX}px;  width: 200px;height:200px;">
          <div class="obj-comp obj_diagonal_L diagonal_L" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            
        </div>
        </div>`
        return code;
    }
}
//수평선
var obj_line_horizontal = {
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
            <div class="obj" style="position: absolute; top: ${obj_line_horizontal.insertY}px; left: ${obj_line_horizontal.insertX}px;  width: 200px;height:30px;">
          <div class="obj-comp obj_line_horizontal line_horizontal" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            
        </div>
        </div>`
        return code;
    }
}
//수직선
var obj_line_vertical = {
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
            <div class="obj" style="position: absolute; top: ${obj_line_vertical.insertY}px; left: ${obj_line_vertical.insertX}px;  width: 30px;height:200px;">
          <div class="obj-comp obj_line_vertical line_vertical" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            
        </div>
        </div>`
        return code;
    }
}
//와이어프레임
var obj_wireframe = {
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
            <div class="obj" style="position: absolute; top: ${obj_wireframe.insertY}px; left: ${obj_wireframe.insertX}px;  width: 200px;height:100px;">
          <div class="obj-comp obj_wireframe wireframe" style="position: absolute; top: 0px; left: 0px;width:inherit;height:inherit;">
                            
        </div>
        </div>`
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
        case 'obj_messageForm_A':
        	return obj_messageForm_A;
        case 'obj_messageForm_B':
        	return obj_messageForm_B;
        case 'obj_memo_A':
        	return obj_memo_A;
        case 'obj_memo_B':
        	return obj_memo_B;
        case 'obj_label':
        	return obj_label;
        case 'obj_marker':
        	return obj_marker;
        case 'obj_prev':
        	return obj_prev;
        case 'obj_next':
        	return obj_next;
        case 'obj_profile_A':
        	return obj_profile_A;
        case 'obj_profile_B':
        	return obj_profile_B;
        case 'obj_paging':
        	return obj_paging;
        case 'obj_tooltip_A':
        	return obj_tooltip_A;
        case 'obj_tooltip_B':
        	return obj_tooltip_B;
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
        case 'obj_scroll_x':
            return obj_scroll_x;
        case 'obj_dropdown':
            return obj_dropdown;
       case 'obj_dropdownList':
            return obj_dropdownList;
        case 'obj_diagonal_R':
            return obj_diagonal_R;
        case 'obj_diagonal_L':
            return obj_diagonal_L;
        case 'obj_line_horizontal':
            return obj_line_horizontal;
        case 'obj_line_vertical':
            return obj_line_vertical;
        case 'obj_wireframe':
            return obj_wireframe;
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
    	<a href="javascript:showModal(`+target+`);" class="renameLib">이름바꾸기</a>`
    }
}
