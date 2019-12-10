var elementCount = 0; //canvas에 삽입된 object 개수
var selectcnt = 0; //선택된 object 개수
var selectedObj = new Array(); //선택된 object 담아둘 배열
var canvas = ".canvas-container";
var $focus = $('.focus');
var $all = $('#multiselect');
var appendElement = "";

function initSelect(){
    var $lastone = $('#droppable .obj').last();
    $('#droppable .obj').each(function(){
        if($(this).is($lastone)){
            selectedObj = new Array();
            selectedObj.push($lastone);
            $lastone.addClass('ui-selected');
            addControl();
        }else{
            $(this).removeClass('ui-selected');
            $(this).children().remove('.ui-resizable-handle');
            $(this).children('.ui-rotatable-handle').hide();
            if($(this).hasClass('ui-draggable'))
                $(this).draggable('destroy');
        }
    });
}

function moveDragging(){
    var dragX = event.pageX - 40;
	var dragY = event.pageY - 40;
	$(".dragging").css({
        left: dragX,
        top: dragY
    });
}
function includeElement(X, Y, temp) {
	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
    $('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
    
    var objId = temp.children().attr("id");
    var module = getModule(objId);
    var comp;
    if(module != undefined){
        comp = module.obj_code;
    }else{
    	var index = temp.children().attr("data-order");
    	comp = privateLibrary[index].code;
    }
    $("#droppable").append(comp);
    $('#droppable .obj').last().css({
    	top: Y,
    	left: X
    });
    initSelect();
    setTimeout(function(){
    	Thumbnail();
    }, 100);
    
}
function leftMouseListner(){
    $(document).on('click', function(event){
        toggleContext(0);
    	if(!$(event.target).is("#droppable .obj *") && !$(event.target).is(".tab-menu *") && !$(event.target).is(".text-item *") && !$(event.target).is(".figure-item *") && !$(event.target).is(".minicolors-panel *")) {
	        window.getSelection().removeAllRanges();
			$(".ui-selected .obj-comp .text-selected").contents().unwrap();
    	}
    });
    $('#droppable').on('click', function(){
        toggleContext(0);
    });
    $(document).on('dblclick', "#droppable .obj", function(event){
    	
    	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
    	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');

    	if($all.html() != ""){
            $all.children().each(function(){
                $(this).css({
                    left: Number($(this).css('left').replace('px', '')) + Number($all.css('left').replace('px', '')) + 'px',
                    top: Number($(this).css('top').replace('px', '')) + Number($all.css('top').replace('px', '')) + 'px'
                });
                $(this).removeClass('ui-selected');
                $(this).appendTo($('#droppable')); 
            });
        }

		if ($("#droppable").is(".ui-selectable"))
			$("#droppable").selectable("destroy");
		if ($(this).is(".ui-draggable"))
			$(this).draggable("destroy");
		
		$(this).addClass("text-editing");
		$(this).addClass("ui-selected");
		
		$(this).children(".textarea").attr("contenteditable", "true");
        $(this).children().remove('.ui-resizable-handle');
        $(this).children('.ui-rotatable-handle').hide();
    	$(this).children(".textarea").selectText();
		
        $('.right-side-bar .canvas-menu').hide();
        $('.right-side-bar .tab-menu').show();
        $('.right-side-bar .tab-content').show();
    });
}
function rightMouseListner(){
    $(window).on('contextmenu', function(){
        event.preventDefault();
    });
    //canvas 
    $('#droppable').on('contextmenu', function(e){
        e.preventDefault();
        $('.context-menu').html(contextmenu.canvas);
        toggleContext(1);
        menuActivation();
        showContext(e.clientX, e.clientY);
    });
    $(document).on('contextmenu', '#droppable .obj', function(e){
        e.preventDefault();
        if($(this).parents('.group-obj').length == 0)
            $(this).addClass('ui-selected');
        else
            $(this).parents('.group-obj').addClass('ui-selected');
        selectedObj = new Array();
        $('#droppable .ui-selected').each(function(){
            selectedObj.push($(this));
        });
        addControl();
        (selectedObj.length > 1 || selectedObj[0].hasClass('group-obj')) ? $('.context-menu').html(contextmenu.multi) : $('.context-menu').html(contextmenu.single);
        toggleContext(1);
        menuActivation();
        showContext(e.clientX, e.clientY);
    });
}
function toggleContext(num){
    num === 1 ? $('.context-menu').addClass('show') : $('.context-menu').removeClass('show');
}
function showContext(x, y){
    $('.context-menu').css({
        top: y,
        left: x
    });
}
function menuActivation(){
    copiedObj.length > 0 ? $('.pasteObj').removeClass('disabled') : $('.pasteObj').addClass('disabled');
    
    selectedObj.length === 1 && selectedObj[0].hasClass('group-obj') ? $('.ungroupObj').removeClass('disabled') : $('.ungroupObj').addClass('disabled');
    
    selectedObj.length === 1 ? $('.groupObj').addClass('disabled') : $('.groupObj').removeClass('disabled');
}
function addControl(){
    if($all.html() != ""){
        $all.children().each(function(){
            $(this).css({
                left: Number($(this).css('left').replace('px', '')) + Number($all.css('left').replace('px', '')) + 'px',
                top: Number($(this).css('top').replace('px', '')) + Number($all.css('top').replace('px', '')) + 'px'
            });
            $(this).removeClass('ui-selected');
            $(this).appendTo($('#droppable')); 
        });
    }
    if(selectedObj.length == 1){ //선택된 개체가 하나 일 때
        $obj = selectedObj[0];
        $obj.append(resize_handler.code);
        $obj.children('.ui-rotatable-handle').show();
        var __dx;
        var __dy;
        var __scale=0.5;
        var __recoupLeft, __recoupTop;
        
        $obj.draggable({ //select 된놈은 드래그 가능
            cancel: '.ui-resizable-handle',
            drag: function (event, ui) {
                __dx = ui.position.left - ui.originalPosition.left;
                __dy = ui.position.top - ui.originalPosition.top;
                ui.position.left = ui.originalPosition.left + (__dx);
                ui.position.top = ui.originalPosition.top + (__dy);
                ui.position.left += __recoupLeft;
                ui.position.top += __recoupTop;
            },
            start: function (event, ui) {
            	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
            	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
                $focus.hide();
                var left = parseInt($(this).css('left'), 10);
                left = isNaN(left) ? 0 : left;
                var top = parseInt($(this).css('top'), 10);
                top = isNaN(top) ? 0 : top;
                __recoupLeft = left - ui.position.left;
                __recoupTop = top - ui.position.top;
            },
            stop: function (event, ui) {
                $(this).css('cursor', 'default');
                setTimeout(function(){
            		Thumbnail();
            	}, 100);
            }
        }).rotatable({
            degrees: getRotateDegree($obj),
            start: function(){
            	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
            	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
            },
            rotate : function() {
            	formatChange();
            },
            stop: function() {
            	setTimeout(function(){
            		Thumbnail();
            	}, 100);
            },
            wheelRotate: false
        });
        //group obj는 also resize 대상 변경
        if($obj.hasClass('group-obj')){
            $obj.resizable({
            	handles:{
                    'n': '.ui-resizable-n',  
                    'e': '.ui-resizable-e',  
                    's': '.ui-resizable-s',
                    'w': '.ui-resizable-w',
                    'ne': '.ui-resizable-ne',  
                    'se': '.ui-resizable-se',
                    'sw': '.ui-resizable-sw',
                    'nw': '.ui-resizable-nw',  
                },
                resize : function() {
                    formatChange();
                },
                alsoResize: $obj.children('.obj'),
                start: function(){
                	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
                },
                stop: function(){
                    setTimeout(function(){
                		Thumbnail();
                	}, 100);
                }
            });
        }else{
            $obj.resizable({
                handles:{
                    'n': '.ui-resizable-n',  
                    'e': '.ui-resizable-e',  
                    's': '.ui-resizable-s',
                    'w': '.ui-resizable-w',
                    'ne': '.ui-resizable-ne',  
                    'se': '.ui-resizable-se',
                    'sw': '.ui-resizable-sw',
                    'nw': '.ui-resizable-nw',  
                },
                resize : function() {
                    formatChange();
                },
                alsoResize: "this .obj-comp",
                start: function(){
                	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
                	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
                },
                stop: function(){
                    setTimeout(function(){
                		Thumbnail();
                	}, 100);
                }
            });
        }
        formatChange();
        clearEnterable();
        
    }else if(selectedObj.length > 1){ //선택된 개체가 복수일 때(크기 조절, 회전 x / 이동만 가능)
        for(i = 0; i<selectedObj.length; i++){
            $obj = selectedObj[i];
            $obj.children().remove('.ui-resizable-handle');
            $obj.children('.ui-rotatable-handle').hide();
            if($obj.hasClass('ui-draggable'))
                $obj.draggable('destroy');
            if(!$obj.hasClass('ui-selected'))
                $obj.addClass('ui-selected');
            $all.append($obj);
        }
        $all.draggable({
        	start: function(){
        		list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
        		$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
        	}
        }).css({
            top: 0,
            left: 0           
        });
        formatChange();
    }
}

function getRotateDegree($obj){
    var matrix = $obj.css("-webkit-transform") ||
        $obj.css("-moz-transform") ||
        $obj.css("-ms-transform") ||
        $obj.css("-o-transform") ||
        $obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

$(function(){
    //canvas 위에 삽입된 object는 select 가능
    //애초에 모든 controller들이 붙어서 온 상태이다. 염두해두도록
    rightMouseListner();
    leftMouseListner();

    $('#droppable').selectable({
        filter: " > .obj",
        start: function(){
            selectedObj = new Array();
	    	$(".text-editing").blur();
	    	window.getSelection().removeAllRanges();
	    	$(".text-editing").removeClass("text-editing");
        },
        selected: function(e, ui){
            selectedObj.push($(ui.selected));
        },
        unselected: function(e, ui){
        	console.log("함");
            $(ui.unselected).children().remove('.ui-resizable-handle');
            if($(ui.unselected).hasClass('ui-draggable'))
                $(ui.unselected).draggable('destroy');
            $(ui.unselected).children('.ui-rotatable-handle').hide();
        },
        stop: function(){
            addControl();
        }
    });

    //canvas 위의 마우스 드래깅
    var mode = false; //드래그 영역 토글 변수
    var startX = 0, startY = 0, left, top, width, height; //드래그 영역 위치지정 변수
    $(document).on('mousedown', function(e){ //canvas 마우스 이벤트
    	if($(e.target).is("#droppable .obj *") || $(e.target).is(".ui-resizable-handle") || $(e.target).is(".ui-rotatable-handle") || $(e.target).is(".left-side-bar *") || $(e.target).is(".right-side-bar *") || $(e.target).is(".top-canvas-opts") || $(e.target).is(".text-dragged")){
            mode = false;
    	}
        else {
            mode = true;
            startX = e.clientX;
            startY = e.clientY;
            width = height = 0;
            $focus.show();
        }
    	if(!$(e.target).is("#droppable .obj *") && !$(e.target).is(".tab-menu *") && !$(e.target).is(".text-item *") && !$(e.target).is(".figure-item *") && !$(e.target).is(".minicolors-panel *") && !$(e.target).is(".component")) {
    		$("#droppable .obj-comp[contenteditable=true]").each(function() {
    	        $(this).attr("contenteditable", "false");
    		})
    	}
    }).on('mousemove', function(e){
        if(appendElement != ""){
            moveDragging();
            mode = false;
        }      
        if(mode){
            setDragLocation(e);
        }
    }).on('mouseup', function(e){
        mode = false;
        $focus.hide();
        $focus.css({width: 0, height: 0});
        
        $(".dragging").remove();
        var nowX = event.clientX;
        var nowY = event.clientY;
        var canvasTop = Math.round($("[id=droppable]").offset().top);
        var canvasLeft = Math.round($("[id=droppable]").offset().left);
        var canvasRight = canvasLeft * 1 + $("[id=droppable]").css("width").split("px")[0] * 1;
        var canvasBottom = canvasTop * 1 + $("[id=droppable]").css("height").split("px")[0] * 1;
        if (nowX >= canvasLeft && nowX <= canvasRight && nowY >= canvasTop && nowY <= canvasBottom ? appendElement != "" : false) {
            includeElement(nowX - canvasLeft, nowY - canvasTop, appendElement);
            appendElement = "";
        }else{
            appendElement = "";
        }
    });

    //obj 삽입
    var clicks = 0; //더블클릭 판별용 변수
    var target = "#droppable"; //object append할 변수
    $('.geItem').on('mousedown', function(e){
        event.preventDefault();
        clicks++;
        setTimeout(function(){
            clicks = 0;
        }, 400);
        
        if(clicks == 2){
            var module = getModule($(this).attr("id"));
            module.setX(200);
            module.setY(100);
            list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
            $('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
            $(target).append(module.obj_code);
            initSelect();
            clicks = 0;
        }else{
            appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).clone().wrap("<div/>").parent().html() + "</div>").appendTo("body");
            moveDragging();
        }
    });
    //라이브러리 obj 삽입
    $('.lib-tab-content').on('mousedown', '.plib-item',function(e){
    	event.preventDefault();
    	if(e.button == 2){
    	    $('.context-menu').html(contextmenu.library($(this).attr('data-order')));
    	    toggleContext(1);
    	    menuActivation();
    	    showContext(e.clientX, e.clientY);
    	}else{
    		clicks++;
        	setTimeout(function(){
        		clicks = 0;
        	}, 400);
        	var index = $('.lib-tab-content .plib-item').index($(this));
        	if(clicks == 2){
        		$(target).append(privateLibrary[index].code);
        		initSelect();
        		clicks = 0;
        	}else{
                appendElement = $("<div class='dragging' style='width : 80px; height : 80px; position : absolute; background : white; z-index : 20000; border : 2px solid black; border-radius : 5px;'>" + $(this).clone().wrap("<div/>").parent().html() + "</div>").appendTo("body");
                moveDragging();
        	}
    	}
    	
    });
    
    //마우스 움직일 때 드래그 영역 설정 함수
    function setDragLocation(e){
        var x = e.clientX;
        var y = e.clientY;
        width = Math.max(x - startX, startX - x);
        left = Math.min(startX, x);
        $focus.css('left', left);
        $focus.css("width", width);

        height = Math.max(y - startY, startY - y);
        top = Math.min(startY, y);
        $focus.css('top', top);
        $focus.css('height', height);        
    }
});

//canvas sizing
$(function(){
    $('.right-side-bar .tab-menu').hide();
    $('.right-side-bar .tab-content').hide();
    $('.back-chk input').on('change', function(){
        var $colorpic = $('<div class="canvas-colorpic"></div>')
        if($(this).is(':checked')){
            $('#canvas-background').append($colorpic);
            $('.canvas-colorpic').minicolors({
                control: 'hue',
                position: 'bottom right',
                defaultValue: $('#droppable').attr('data-background'),
                change: function(hex, opacity){
                    $('#droppable').css('background-color', hex);
                    $('#droppable').attr('data-background', hex);
                    
                }
            });
            setTimeout(function(){
        		Thumbnail();
        	}, 100);
        }else{
            $('.minicolors').remove();
            $('#droppable').css('background-color', '#fff');
            $('#droppable').attr('data-background', '#ffffff');
        }
        
    });
    
    $('#canvas-sizing').on('click', function(){
        $options = $('#canvas-sizing-opt');
        if($options.css('display') == "none"){
            $options.show();
        }else{
            $options.hide();
        }
    });
    /* canvas margin */
    $('#canvas-sizing-opt li').on('click', function(){
        if($(this).text() != 'custom'){
            $('#canvas-sizing').html($(this).html());
            $('#canvas-sizing-opt').hide();
            $('.canvas-sizing label').show();
        	$('.canvas-custom-sizing').hide();
            var width = Number($(this).children('span').text().split('x')[0]);
            var height = Number($(this).children('span').text().split('x')[1]);
            if(width < Number($('.canvas-container').css('width').replace('px', ''))){
            	$('#droppable').css({
                    width: width + 'px',
                    height: height + 'px'
                });
            }else{
            	$('#droppable').css({
                    width: width + 'px',
                    height: height + 'px'
                });
            }
            
            if(width < height){
            	$('.canvas-sizing .radio-label input').eq(0).prop('checked', true);
            	$('.canvas-sizing .radio-label input').eq(1).prop('checked', false);
            }else{
            	$('.canvas-sizing .radio-label input').eq(0).prop('checked', false);
            	$('.canvas-sizing .radio-label input').eq(1).prop('checked', true);
            }
            $('#droppable').attr('data-canvas', $(this).html().split(' <')[0]);
        }else{
        	$('#canvas-sizing').html('custom');
        	$('#canvas-sizing-opt').hide();
        	$('#droppable').attr('data-canvas', 'custom');
        	$('.canvas-sizing label').hide();
        	$('.canvas-custom-sizing').show();
        	
        	$('#custom-width input').val(Number($('#droppable').css('width').replace('px', '')));
        	$('#custom-height input').val(Number($('#droppable').css('height').replace('px', '')));
        }
    });
    
    $('.canvas-sizing .radio-label').on('click', function(){
    	var index = $('.canvas-sizing .radio-label').index($(this));
    	$('.canvas-sizing .radio-label input').eq(1-index).prop('checked', false);
    	var width = Number($('#droppable').css('width').replace('px', ''));
    	var height = Number($('#droppable').css('height').replace('px', ''));
    	if($(this).text() === 'portrait' && width > height)    
    		$('#droppable').css({
    			width: height + 'px',
    			height: width + 'px'
    		});
    	else if($(this).text() === 'landscape' && height > width)
    		$('#droppable').css({
    			width: height + 'px',
    			height: width + 'px'
    		});
	});
    
    $('#custom-width input').on('focusout', function(){
    	$('#droppable').css('width', $(this).val()+'px');
    });
    $('#custom-height input').on('focusout', function(){
    	$('#droppable').css('height', $(this).val()+'px');
    });
    if(Number($('#droppable').css('width').replace('px', '')) < Number($('#droppable').css('height').replace('px', ''))){
    	$('.canvas-sizing .radio-label input').eq(0).prop('checked', true);
    	$('.canvas-sizing .radio-label input').eq(1).prop('checked', false);
    }else{
    	$('.canvas-sizing .radio-label input').eq(0).prop('checked', false);
    	$('.canvas-sizing .radio-label input').eq(1).prop('checked', true);
    }
});

$('#droppable').bind('DOMSubtreeModified', function(e){
    if($('#droppable .ui-selected').length == 0 && $(".obj-comp[contenteditable=true]").length == 0 && $(".text-editing").length == 0){
        $('.right-side-bar .canvas-menu').show();
        $('.right-side-bar .tab-menu').hide();
        $('.right-side-bar .tab-content').hide();
    } else {
        $('.right-side-bar .canvas-menu').hide();
        $('.right-side-bar .tab-menu').show();
        $('.right-side-bar .tab-content').show();
    }
});

function savetoLibrary(){
	var comp = selectedObj[0].clone();
	comp.removeClass('ui-resizable ui-selected ui-selectee ui-draggable ui-draggable-handle');
	comp.children().remove('.ui-resizable-handle');
	comp.children().remove('.ui-rotatable-handle');
	
	//canvas위에 실제로 뿌려줄 저장된 object의 코드
	var code = comp.wrap("<div/>").parent().html();
	code = code.substr(0, code.indexOf('</div>') + 6) + code.substr(code.indexOf('</div>') + 6).trim();
	
	var rotateDegree = getRotateDegree(selectedObj[0]);
	
	selectedObj[0].css('transform', 'rotate(0)').removeClass('ui-selected');
	selectedObj[0].children('.ui-resizable-handle').hide();
	
	html2canvas(selectedObj[0], { 
		onrendered: function(canvas){
			var data = canvas.toDataURL('image/png');
			var plib = {
				code: code,
				content: data,
				fileno: list[0].fileno,
				userno: list[0].userno,
			};
			
			$.ajax({
				url: 'toPrivateLib.do',
				type: 'post',
				cache: false,
				data: JSON.stringify(plib),
				contentType: "application/json; charset=UTF-8",
				dataType: 'json',
				success: function(data){
					$libItem = $("<div class='plib-item' data-order='"+(privateLibrary.length)+"'><div class='plib-item-thumb'><img src='" 
							+ plib.content + "'></div><div class='plib-item-name'>untitled</div></div>");
					$('.lib-tab-content').append($libItem);
					var pl = {
						code: data.plib.code,
						_id: data.plib._id
					}
					privateLibrary.push(pl);
					resizeLibImg();
				},
				error: function(){
					console.log("lib 추가 실패");
				}
			});
		}
	});
	
	selectedObj[0].css('transform', 'rotate(' + rotateDegree + 'deg)').addClass('ui-selected');
	selectedObj[0].children('.ui-resizable-handle').show();
}


//라이브러리에서 지우기
function deleteFromLib(index){
	//privateLibrary에 현재 lib 코드들이 들어잇음
	var chk = confirm("정말로 삭제하시겠습니까?\n삭제 후에는 복구되지 않습니다.");
	if(chk){
		$.ajax({
			url: "deletePlib.do",
			data: JSON.stringify(privateLibrary[index]),
			type: 'post',
			cache: false,
			contentType: "application/json; charset=UTF-8",
			error: function(){
				console.log("lib 삭제 실패");
			}
		});
		$('.lib-tab-content .plib-item').eq(index).remove();
		privateLibrary.splice(index, 1);
	}
}
function resizeLibImg(){
	setTimeout(function(){
		$('.plib-item-thumb img').each(function(){
			var index = $('.plib-item-thumb img').index($(this));
			var code = privateLibrary[index].code.split("rotate(")[1].split(")")[0];
			
			var w = $(this).width();
			var h = $(this).height();
			if(w >= h){
				$(this).css({
					width: "70px",
					'margin-left': ($('.plib-item-thumb').width() - 70)/2 + 'px'
				});
				if($(this).height() < 70){
					$(this).css({
						'margin-top': (70-$(this).height())/2 + "px"
					});
				}
			}else{
				$(this).css({
					height: "70px",
					'margin-top': ($('.plib-item-thumb').height() - 70)/2 + 'px'
				});
				if($(this).width() < 70){
					$(this).css({
						'margin-left': ($('.plib-item-thumb').width()-$(this).width())/2 + "px"
					});
				}
			}
			var degree = code.replace(code.substr(-3),'');
			if(degree != 0){
				if(code.substr(-3) === 'rad'){
					degree = Number(degree)*(180/Math.PI);
					console.log(degree);
				}
				$(this).css({
					transform: 'rotate(' + degree + 'deg)'
				})
			}
		});	
	}, 50);
}
//라이브러리 이미지로 내보내기
function saveLibAsImg(target){
	
}
