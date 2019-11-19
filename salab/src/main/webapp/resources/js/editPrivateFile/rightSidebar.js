
// ** 메뉴 구성 hover, click 이벤트 모음

	// component
    $('.enterable').mouseenter(function() {
    	
    	if (!$(this).is(".clickedItem")) {
        	$(this).css({
        		border : "1px solid lightgray"
        	});
    	}
    	
    }).mouseleave(function() {
    	
    	if (!$(this).is(".clickedItem")) {
        	$(this).css({
    			border : "1px solid white"
        	});
    	}
    	
    }).click(function(){
    	
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
        if (!$(this).is(".dropdownable")) {
        	$(".figure-line-droplist").slideUp(100);
        	$(".text-font-droplist").slideUp(100);
        }
        else {
        	if ($(this).attr("id") == "kinds") {
        		figurelineClicked();
            	$(".text-font-droplist").slideUp(100);
        	} else if ($(this).attr("id") == "font") {
        		textfontClicked();
            	$(".figure-line-droplist").slideUp(100);
        	}
        }
        $(this).addClass('clickedItem');
        $(this).css("border", "1px solid black");
    	$(this).children("input").focus();
        $(this).children("input").css("border", "1px solid skyblue");
   
    });

	// component 안의 ratiofix
    $('.figure-item.checkbox').mouseenter(function() {
    	
    	// 마우스 진입 시 테두리 회색, 배경 밝은 회색
    	$(this).children("div.checkbox").css({
    		border : "1px solid gray",
    		background : "lightgray"
    	});
    	
    }).mouseleave(function() {
    	
    	// 마우스 퇴장 시
        if ($(this).is(".checked")){
        	// checkbox가 체크된 상태라면 테두리 회색, 배경 하얀색
        	$(this).children("div.checkbox").css({
        		border : "1px solid gray",
        		background : "white"
        	});
        } else {
        	$(this).children("div.checkbox").css({
            	// checkbox가 체크되지 않은 상태라면 테두리 밝은회색, 배경 하얀색
        		border : "1px solid lightgray",
        		background : "white"
        	});
        }
        
    }).click(function() {
    	
    	$('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
    	
    	if (!$(this).is(".dropdownable")) {
        	$(".figure-line-droplist").slideUp(100);
        	$(".text-font-droplist").slideUp(100);
    	}
    	
        if ($(this).is(".checked")){
            $(this).removeClass("checked");
            if ($(this).attr("id") == "size-ratioFix")
            	$(".ui-selected").removeClass("size-ratiofixed");
            if ($(this).attr("id") == "weight-ratioFix")
            	$(".ui-selected").removeClass("weight-ratiofixed");
            if ($(this).attr("id") == "radius-ratioFix")
            	$(".ui-selected").removeClass("radius-ratiofixed");
        	$(this).children("div.checkbox").css({
        		border : "1px solid lightgray"
        	});
        	$(this).children("div.checkbox").children("img").css({
        		display : "none"
        	});
        } else {
            $(this).addClass("checked");
            if ($(this).attr("id") == "size-ratioFix")
                $(".ui-selected").addClass(".size-ratiofixed");
            if ($(this).attr("id") == "weight-ratioFix")
                $(".ui-selected").addClass(".weight-ratiofixed");
            if ($(this).attr("id") == "radius-ratioFix")
            	$(".ui-selected").addClass(".radius-ratiofixed");
        	$(this).children("div.checkbox").css({
        		border : "1px solid gray"
        	});
        	$(this).children("div.checkbox").children("img").css({
        		display : "block"
        	});
        }
        
    });

	// component 안의 tab
    $('.togglable').mouseenter(function() {
    	$(this).children("p").css({
    		color : "gray"
    	});
    }).mouseleave(function() {
    	$(this).children("p").css({
    		color : "black"
    	});
    });

// component 선택
    
// input change

	$(".right-side-bar input").on("change keyup paste focusout", function(event) {

    	var type = $(this).parents().attr("id");
    	var value = $(this).val();
    	var eventType = event.handleObj.type;
    	
    	var applyType = "";
    	
    	if (type == "width") {
	    	if (eventType == "keyup" ? event.keyCode == 13 : eventType == "change" || eventType == "focusout") {
	    		if ($(".figure-shape-comps #size-ratioFix").is(".checked")) {
	    			var pastHeight = $(".figure-shape-comps .figure-item[id=height] input").val();
	    			$(".figure-shape-comps .figure-item[id=height] input").val(Math.round(filterNumber(value) / $(".ui-selected").css("width").split("px")[0] * pastHeight));
	    		}
	    	}
			$(this).val(filterValue("number", value));
			applyType = "width";
    	}
    	
    	if (type == "height") {
	    	if (eventType == "keyup" ? event.keyCode == 13 : eventType == "change" || eventType == "focusout") {
	    		if ($(".figure-shape-comps #size-ratioFix").is(".checked")) {
    		    	var pastWidth = $(".figure-shape-comps .figure-item[id=width] input").val();
    		    	$(".figure-shape-comps .figure-item[id=width] input").val(Math.round(filterNumber(value) / $(".ui-selected").css("height").split("px")[0] * pastWidth));
    			}
	    	}
			$(this).val(filterValue("number", value));
			applyType = "height";
    	}

    	if (type == "ratition") {
			$(this).val(filterValue("number", value));
			applyType = "ratition";
    	}

    	if (type == "backgroundColor") {
			$(this).val(filterValue("color", value));
			changeColor("background");
			applyType = "backgroundColor";
    	}

    	if (type == "lineColor") {
			$(this).val(filterValue("color", value));
			changeColor("line");
			applyType = "lineColor";
    	}

    	if (type == "weight-top") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #weight-ratioFix").is(".checked")) {
    			changeValue("weight", filteredValue);
        		applyType = "weight-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "weight-top";
			}
    	}

    	if (type == "weight-left") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #weight-ratioFix").is(".checked")) {
    			changeValue("weight", filteredValue);
        		applyType = "weight-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "weight-left";
			}
    	}

    	if (type == "weight-right") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #weight-ratioFix").is(".checked")) {
    			changeValue("weight", filteredValue);
        		applyType = "weight-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "weight-right";
			}
    	}

    	if (type == "weight-bottom") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #weight-ratioFix").is(".checked")) {
    			changeValue("weight", filteredValue);
        		applyType = "weight-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "weight-bottom";
			}
    	}

    	if (type == "radius-top-left") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #radius-ratioFix").is(".checked")) {
    			changeValue("radius", filteredValue);
        		applyType = "radius-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "radius-top-left";
			}
    	}

    	if (type == "radius-top-right") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #radius-ratioFix").is(".checked")) {
    			changeValue("radius", filteredValue);
        		applyType = "radius-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "radius-top-right";
			}
    	}

    	if (type == "radius-bottom-left") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #radius-ratioFix").is(".checked")) {
    			changeValue("radius", filteredValue);
        		applyType = "radius-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "radius-bottom-left";
			}
    	}

    	if (type == "radius-top-right") {
			var filteredValue = filterValue("number", value);
    		if ($(".figure-line-comps #radius-ratioFix").is(".checked")) {
    			changeValue("radius", filteredValue);
        		applyType = "radius-all";
			} else {
    			$(this).val(filteredValue);
        		applyType = "radius-top-right";
			}
    	}

    	if (type == "textColor") {
			$(this).val(filterValue("color", value));
			changeColor("text");
    	}

    	if (eventType == "keyup" ? event.keyCode == 13 : eventType == "change" || eventType == "focusout") {

        	if ($(this).is(":focus"))
        		$(this).blur;
            clearEnterable();

    		applyChange(type);

    	}
		
    });

    function filterValue(type, value) {
    	
    	var returnValue = "none";
    	
    	if (type == "number")
    		returnValue = value.replace(/[^(0-9)]/g, "");
    	else if (type == "color") {
        	var filterValue = value.replace(/[^(0-9)^(a-f)^(A-F)]/g, "");
        	if (filterValue.length > 7) {
        		filterValue = filterValue.substring(0, 6);
        	}
        	returnValue = "#" + filterValue.toUpperCase();
    	}
    	
    	return returnValue;
    	
    }

    function changeColor(type) {
    	
    	var target = "";
    	
    	if (type == "background")
    		target = $(".figure-item#backgroundColor");
    	else if (type == "line")
    		target = $(".figure-item#lineColor");
    	else if (type == "text")
    		target = $(".text-item#textColor");
    	
    	if (target != "") {
        	var str = pad(target.children("input[type=text]").val().replace(/[#]/g, ""), 6);
        	if (str.length > 0 && str.length <= 6) {
            	var str1 = parseInt(str.substring(0, 2), 16).toString();
            	var str2 = parseInt(str.substring(2, 4), 16).toString();
            	var str3 = parseInt(str.substring(4, 6), 16).toString();
            	target.children(".colorView").css({
            		background : "rgba(" + str1 + ", " + str2 + ", " + str3 + ")"
            	});
        	}
    	}
    }
    
    function changeValue(type, value) {
    	
    	if (type == "weight"){
        	$(".figure-line-comps .figure-item[id=weight-top] input").val(value);
        	$(".figure-line-comps .figure-item[id=weight-left] input").val(value);
        	$(".figure-line-comps .figure-item[id=weight-right] input").val(value);
        	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(value);
    	} else if (type == "radius") {
	    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(value);
	    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(value);
	    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(value);
	    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(value);
    	}
    }

// input change
     
// line style 선택

	// line dropdownList 마우스 enter 시 색상 변화
    $(".figure-line-droplist .component").on("mouseenter", function() {
    	$(".figure-line-droplist .component").each(function() {
    		$(this).css("background", "white");
    	});
    	$(this).css("background", "lightgray");
    });
    
    // line 클릭 시 dropdownList 출력
    function figurelineClicked() {
    	if ($(".figure-line-droplist").css("display") == "none") {
        	$(".figure-line-droplist").css({
        		top : $(".figure-item .line").position().top + 31,
        		left : $(".figure-item .line").position().left + 11
        	});
        	$(".figure-line-droplist").slideDown(100);
    	} else {
        	$(".figure-line-droplist").slideUp(100);
    	}
    }

    // line 클릭 시 dropdownList component 클릭 시 변경
    function figurelineChange(style){
    	$(".figure-line-droplist").slideUp(100);
    	$(".figure-item .line").children("hr").css({
    		border : style + " 3px gray"
    	});
		applyChange("kinds");
		clearEnterable();
    }

// line style 선택

// text style 선택

 	// font dropdownList 마우스 enter 시 색상 변화
    $(".text-font-droplist .component").on("mouseenter", function() {
     	$(".text-font-droplist .component").each(function() {
     		$(this).css("background", "white");
     	});
     	$(this).css("background", "lightgray");
    });
     
    // font 클릭 시 dropdownList 출력
    function textfontClicked() {
    	if ($(".text-font-droplist").css("display") == "none") {
         	$(".text-font-droplist").css({
         		top : $(".text-item .fontType").position().top + 31,
         		left : $(".text-item .fontType").position().left + 9
         	});
         	$(".text-font-droplist").slideDown(100);
    	} else {
         	$(".text-font-droplist").slideUp(100);
    	}
    }

    // font 클릭 시 dropdownList component 클릭 시 변경
    function textFontChange(title, style){
     	$(".text-font-droplist").slideUp(100);
     	$(".text-item[id=font] .fontType").html(title);
     	$(".text-item[id=font] input").val(style);
 		applyChange("font");
		clearEnterable();
    }

// text style 선택
     
// text effect 선택

	$(".text-effect").on("mouseenter", function() {
		
		if (!$(this).is(".clicked")) {
			$(this).css("border", "1px solid gray");
		}
		$(this).css("background", "lightgray");
		
     }).on("mouseleave", function() {
    	 
		if (!$(this).is(".clicked")) {
			$(this).css("border", "1px solid white");
		}
		$(this).css("background", "white");
		
     }).on("click", function() {
    	 
    	 if ($(this).is(".clicked")) {
    		 $(this).removeClass("clicked");
    		 $(this).css("border", "1px solid white");
    		 $(this).css("background", "white");
    	 } else {
    		 $(this).addClass("clicked");
    		 $(this).css("border", "1px solid black");
    		 $(this).css("background", "white");
    	 }

    	 applyChange("text-effect-" + $(this).attr("id"));
				
     });
     
// text effect 선택

// text sort 선택

	$(".text-sort").on("mouseenter", function() {
		
		if (!$(this).is(".clicked")) {
			$(this).css("border", "1px solid gray");
		}
		$(this).css("background", "lightgray");
		
	}).on("mouseleave", function() {
    	 
		if (!$(this).is(".clicked")) {
			$(this).css("border", "1px solid white");
		}
		$(this).css("background", "white");
		
	}).on("click", function() {

		if ($(this).is(".clicked")) {

			if ($(this).attr("id") != "justify") {
				$(this).removeClass("clicked");
				$(this).css("border", "1px solid white");
				$(this).css("background", "white");
				
				$(".text-sort#justify").addClass("clicked");
				$(".text-sort#justify").css("border", "1px solid black");
				$(".text-sort#justify").css("background", "white");
			}
			
		} else {

			$(".text-sort").each(function() {
				$(this).removeClass("clicked");
				$(this).css("border", "1px solid white");
				$(this).css("background", "white");
			});

			$(this).addClass("clicked");
			$(this).css("border", "1px solid black");
			$(this).css("background", "white");
		}
		
    	 applyChange("text-sort");
    	 
	});
     
// text sort 선택

// canvas div 값 가져오기

	// canvas div 클릭 시 서식 값 변화
    function formatChange(object) {
    	
    	if (!object.is(".group-obj")) {

        	var target = object.children(".obj-comp");
        	
        	// 가로
        	$(".figure-shape-comps .figure-item[id=width] input").val(object.css("width").split("px")[0]);
        	
        	// 세로
        	$(".figure-shape-comps .figure-item[id=height] input").val(object.css("height").split("px")[0]);

        	// 비율 고정 checkbox
        	changeCheckbox("size", object);

        	// 회전율
        	var radius = object.css("transform");
        	var rotate = 0;
        	if (radius != "none") {
        		radius = radius.split("(")[1].split(")")[0].split(", ");
            	var rotate = Math.round(Math.atan2(radius[1], radius[0]) * (180/Math.PI));
        	}
        	
        	if (rotate < 0)
        		rotate = 360 - (rotate * -1); 
        	$(".figure-shape-comps .figure-item[id=rotation] input").val(rotate);
        	
        	// 배경색
        	var background = target.css("background").split("(")[1].split(")")[0].split(", ");
        	if (background[3] == "0")
        		$(".figure-shape-comps .figure-item[id=backgroundColor] input").val("#FFFFFF");
        	else
        		$(".figure-shape-comps .figure-item[id=backgroundColor] input").val("#" + (pad((background[0] * 1).toString(16), 2) + pad((background[1] * 1).toString(16), 2) + pad((background[2] * 1).toString(16), 2)).toUpperCase());
        	$(".figure-shape-comps .figure-item[id=backgroundColor] .colorView").css({ background : target.css("background") });
        	
        	// 선 타입
        	$(".figure-line-comps .figure-item[id=kinds] .line hr").css({
        		border : "3px " + target.css("border-top-style") + " gray"
        	});
        	
        	// 선 색상
    		var line = target.css("border-color").split("(")[1].split(")")[0].split(", ");
    		$(".figure-line-comps .figure-item[id=lineColor] input").val("#" + (pad((line[0] * 1).toString(16), 2) + pad((line[1] * 1).toString(16), 2) + pad((line[2] * 1).toString(16), 2)).toUpperCase());
    		$(".figure-line-comps .figure-item[id=lineColor] .colorView").css({ background : target.css("border-color") });
        	
        	// 선 굵기
        	$(".figure-line-comps .figure-item[id=weight-top] input").val(target.css("border-top-width").split("px")[0]);
        	$(".figure-line-comps .figure-item[id=weight-left] input").val(target.css("border-left-width").split("px")[0]);
        	$(".figure-line-comps .figure-item[id=weight-right] input").val(target.css("border-right-width").split("px")[0]);
        	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(target.css("border-bottom-width").split("px")[0]);

        	// 비율 고정 checkbox
        	changeCheckbox("weight", object);

        	// 선 모서리 radius
        	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(target.css("border-top-left-radius").split("px")[0]);
        	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(target.css("border-top-right-radius").split("px")[0]);
        	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(target.css("border-bottom-left-radius").split("px")[0]);
        	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(target.css("border-bottom-right-radius").split("px")[0]);

        	// 비율 고정 checkbox
        	changeCheckbox("radius", object);
        	
        	// TEXT
        	
        	var fontType = $(target).css("fontFamily").split(", ")[0];
        	var fontName = fontType;
        	
        	switch (fontName) {
        		case "Gulim" :
        			fontName = "굴림";
        			break;
        		case "Dotum" :
        			fontName = "돋움";
        			break;
        		case "Batang" :
        			fontName = "바탕";
        			break;
        		case "Gungsuh" :
        			fontName = "궁서";
        			break;
        		case "Malgun Gothic" :
        			fontName = "맑은 고딕";
        			break;
        	}
        	
        	$(".text-font-comps .text-item[id=font] .fontType").html(fontName);
        	$(".text-font-comps .text-item[id=font] input").val(fontType);
        	
        	$(".text-font-comps .text-item[id=size] input").val($(target).css("font-size").split("px")[0]);
        	
        	// font 색상
        	var fontColor = target.css("color").split("(")[1].split(")")[0].split(", ");
        	$(".text-font-comps .text-item[id=textColor] input").val("#" + (pad((fontColor[0] * 1).toString(16), 2) + pad((fontColor[1] * 1).toString(16), 2) + pad((fontColor[2] * 1).toString(16), 2)).toUpperCase());
        	$(".text-font-comps .text-item[id=textColor] .colorView").css({ background : target.css("color") });

        	// text effect
        	clickOption("bold", ($(target).css("font-weight").includes("700") ? "true" : "false"));
        	clickOption("italic", ($(target).css("font-style").includes("italic") ? "true" : "false"));
        	clickOption("underline", ($(target).css("text-decoration").includes("underline") ? "true" : "false"));
        	clickOption("strikethrough", ($(target).css("text-decoration").includes("line-through") ? "true" : "false"));
        	
        	// text sort
        	$(".text-shape-comps .text-sort").each(function() {
        		$(this).removeClass("clicked");
        		$(this).css("border", "1px solid white");
        		$(this).css("background", "white");
        	});
        	
        	var sort = "justify"
        	
        	switch ($(target).css("text-align")) {
        		case "left" : sort = "left"; break;
        		case "center" : sort = "center"; break;
        		case "right" : sort = "right"; break;
        	}

    		$(".text-shape-comps .text-sort#" + sort).addClass("clicked");
    		$(".text-shape-comps .text-sort#" + sort).css("border", "1px solid black");
    		$(".text-shape-comps .text-sort#" + sort).css("background", "white");
        	
    	}
    	else {
    		console.log("그룹화된 오브젝트입니다.");
    	}
    	
    }

    function changeCheckbox(type, object) {
    	
    	var target = $(".figure-item.checkbox[id=" + type + "-ratioFix]");

    	if (object.attr("class").split(" ").includes("." + type + "-ratiofixed")) {
    		target.addClass("checked");
    		target.children("div.checkbox").css("border", "1px solid gray");
    		target.children("div.checkbox").children("img").css("display", "block");
    	} else {
    		target.removeClass("checked");
    		target.children("div.checkbox").css("border", "1px solid lightgray");
    		target.children("div.checkbox").children("img").css("display", "none");
    	}
    }
    
    function clickOption(type, boolean) {
    	
    	if (boolean == "true") {
     		$(".text-font-comps .text-effect[id=" + type + "]").addClass("clicked");
     		$(".text-font-comps .text-effect[id=" + type + "]").css("border", "1px solid black");
     		$(".text-font-comps .text-effect[id=" + type + "]").css("background", "white");
     	} else if (boolean == "false") {
     		$(".text-font-comps .text-effect[id=" + type + "]").removeClass("clicked");
     		$(".text-font-comps .text-effect[id=" + type + "]").css("border", "1px solid white");
     		$(".text-font-comps .text-effect[id=" + type + "]").css("background", "white");
     	}
    }
    
// canvas div 값 가져오기
    
// canvas div에 값 적용시키기

	// input 변화
    function applyChange(type) {
    	
    	if ($(".canvas-container .ui-selected").length > 0) {
    		
    		var selectOption = ".canvas-container .ui-selected";
    		
    		if ($(".canvas-container .ui-selected").is(".group-obj"))
    			selectOption += " .obj";
    		
    		$(selectOption).each(function() {
    			
    			var select = $(this);
    			
        		// FIGURE
        		
            	// 가로, 세로
        		if (type == "width" || type == "height") {
                	select.css({
                		width : $(".figure-shape-comps .figure-item[id=width] input").val(),
                		height : $(".figure-shape-comps .figure-item[id=height] input").val()
                	});
        		}
        		
            	// 회전율
        		if (type == "rotation") {
                	var radius = select.css("transform").split("(")[1].split(")")[0].split(", ");
                	radius = Math.round(Math.atan2(radius[1], radius[0]) * (180/Math.PI));
                	if (radius != $(".figure-shape-comps .figure-item[id=rotation] input").val()) {
                		select.css({
                			transform : "rotate(" + $(".figure-shape-comps .figure-item[id=rotation] input").val() + "deg)"
                		});
                	}
        		}

            	// 배경 색
        		if (type == "backgroundColor") {
                	var backgroundColor = $(".figure-shape-comps .figure-item[id=backgroundColor] input").val().split("#")[1];
                	var backgroundColor1 = parseInt(backgroundColor.substring(0, 2), 16);
                	var backgroundColor2 = parseInt(backgroundColor.substring(2, 4), 16);
                	var backgroundColor3 = parseInt(backgroundColor.substring(4, 6), 16);
                	
                	select.children(".obj-comp").css({
                		background : "rgb(" + backgroundColor1 + ", " + backgroundColor2 + ", " + backgroundColor3 + ")"
                	});
        		}

            	// 선 종류
        		if (type == "kinds") {
                	select.children(".obj-comp").css("border-top", select.children(".obj-comp").css("borderTopWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
                	select.children(".obj-comp").css("border-left", select.children(".obj-comp").css("borderLeftWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
                	select.children(".obj-comp").css("border-right", select.children(".obj-comp").css("borderRightWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
                	select.children(".obj-comp").css("border-bottom", select.children(".obj-comp").css("borderBottomWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
        		}

            	// 선 색
        		if (type == "lineColor") {
                	var lineColor = $(".figure-line-comps .figure-item[id=lineColor] input").val().split("#")[1];
                	var lineColor1 = parseInt(lineColor.substring(0, 2), 16);
                	var lineColor2 = parseInt(lineColor.substring(2, 4), 16);
                	var lineColor3 = parseInt(lineColor.substring(4, 6), 16);
                	select.children(".obj-comp").css("border-top", select.children(".obj-comp").css("border-top").split("rgb")[0] + "rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
                	select.children(".obj-comp").css("border-left", select.children(".obj-comp").css("border-top").split("rgb")[0] + "rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
                	select.children(".obj-comp").css("border-right", select.children(".obj-comp").css("border-top").split("rgb")[0] + "rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
                	select.children(".obj-comp").css("border-bottom", select.children(".obj-comp").css("border-top").split("rgb")[0] + "rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
        		}
        		
        		// 선 굵기
        		if (type.startsWith("weight")) {
        			if (type.endsWith("top"))
        				select.children(".obj-comp").css("border-top", $(".figure-line-comps .figure-item[id=weight-top] input").val() + "px " + select.children(".obj-comp").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
        			if (type.endsWith("left"))
        				select.children(".obj-comp").css("border-left", $(".figure-line-comps .figure-item[id=weight-left] input").val() + "px " + select.children(".obj-comp").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
        			if (type.endsWith("right"))
        				select.children(".obj-comp").css("border-right", $(".figure-line-comps .figure-item[id=weight-right] input").val() + "px " + select.children(".obj-comp").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
        			if (type.endsWith("bottom"))
        				select.children(".obj-comp").css("border-bottom", $(".figure-line-comps .figure-item[id=weight-bottom] input").val() + "px " + select.children(".obj-comp").css("borderStyle") + " " + select.children(".obj-comp").css("borderColor"));
        		}

            	// 선 모서리 radius
        		if (type.startsWith("radius")) {
        			if (type.endsWith("top-left"))
        				select.children(".obj-comp").css("border-top-left-radius", $(".figure-line-comps .figure-item[id=radius-top-left] input").val() + "px");
        			if (type.endsWith("top-right"))
        				select.children(".obj-comp").css("border-top-right-radius", $(".figure-line-comps .figure-item[id=radius-top-right] input").val() + "px");
        			if (type.endsWith("bottom-left"))
        				select.children(".obj-comp").css("border-bottom-left-radius", $(".figure-line-comps .figure-item[id=radius-bottom-left] input").val() + "px");
        			if (type.endsWith("bottom-right"))
        				select.children(".obj-comp").css("border-bottom-right-radius", $(".figure-line-comps .figure-item[id=radius-bottom-right] input").val() + "px");
        		}
        		
            	// TEXT
        		
        		// font
        		if (type == "font") {
                	select.children(".obj-comp").css("font-family", $(".text-font-comps .text-item[id=font] input").val());
        		}

            	// text 색
        		if (type == "fontColor") {
                	var fontColor = $(".text-font-comps .text-item[id=textColor] input").val().split("#")[1];
                	var fontColor1 = parseInt(fontColor.substring(0, 2), 16);
                	var fontColor2 = parseInt(fontColor.substring(2, 4), 16);
                	var fontColor3 = parseInt(fontColor.substring(4, 6), 16);
                	select.children(".obj-comp").css({
                		color : "rgb(" + fontColor1 + ", " + fontColor2 + ", " + fontColor3 + ")"
                	});
        		}
            	
            	/*if ($(".text-effect[id=bold]").is(".clicked")) {

               	 	console.log(window.getSelection().anchorOffset);
               	 	console.log(window.getSelection().focusNode);
               	 	console.log(window.getSelection().focusOffset);
               	 	console.log(window.getSelection().focusNode.length);
               	 	console.log(window.getSelection());

               	 	var str = window.getSelection().focusNode.nodeValue;
               	 	
               	 	var start = window.getSelection().focusOffset;
               	 	var end = window.getSelection().anchorOffset;
               	 	
               	 	if (start > end) {
               	 		var change = start;
               	 		start = end;
               	 		end = change;
               	 	}
               	 	
               	 	var str1 = str.substring(0, start);
               	 	var str2 = "<span style='font-weight : bold;'>" + str.substring(start, end) + "</span>";
               	 	var str3 = str.substring(end, 7);

               	 	console.log("str1 : " + str1);
               	 	console.log("str2 : " + str2);
               	 	console.log("str3 : " + str3);
               	 	console.log("test : " + str1 + str2 + str3);
               	 	
               	 	select.children(".obj-comp").html(str1 + str2 + str3);
               	 	
                	//select.children(".obj-comp").css("font-weight", "bold");
                	
            	}*/

        		if (type == "text-effect-bold") {
                	if ($(".text-effect[id=bold]").is(".clicked"))
                    	select.children(".obj-comp").css("font-weight", "bold");
                	else
                    	select.children(".obj-comp").css("font-weight", "normal");
        		}
        		
        		if (type == "text-effect-italic") {
                	if ($(".text-effect[id=italic]").is(".clicked"))
                		select.children(".obj-comp").css("font-style", "italic");
                	else
                		select.children(".obj-comp").css("font-style", "normal");
        		}
            	
        		if (type == "text-effect-underline" || type == "text-effect-strikethrough") {
                	var textDecoration = "";
                	if ($(".text-effect[id=underline]").is(".clicked")){
                		textDecoration += "underline";
                	}
                	if ($(".text-effect[id=strikethrough]").is(".clicked")) {
                		if (textDecoration != "")
                				textDecoration += " ";
            			textDecoration += "line-through";
                	}
                	if (textDecoration == "")
                		select.children(".obj-comp").css("text-decoration", "none");
                	else 
                		select.children(".obj-comp").css("text-decoration", textDecoration);
        		}

        		if (type == "text-sort") {
                	if ($(".text-sort[id=justify]").is(".clicked"))
                    	select.children(".obj-comp").css("text-align", "justify");
                	else if ($(".text-sort[id=left]").is(".clicked"))
                    	select.children(".obj-comp").css("text-align", "left");
                	else if ($(".text-sort[id=center]").is(".clicked"))
                    	select.children(".obj-comp").css("text-align", "center");
                	else if ($(".text-sort[id=right]").is(".clicked"))
                    	select.children(".obj-comp").css("text-align", "right");
        		}
        		
    		})
    		
    	}
    	else {
    		console.log("선택된 엘리먼트가 없습니다.");
    	}
    	
    }

// canvas div에 값 적용시키기

    // 유효성 검사 중 공백 0으로 채우기
	function pad(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    // 유효성 검사 중 공백 0으로 채우기
	function abbreviate(str, limit) {
		return str.length <= limit ? str : str.substring(0, limit) + "...";
    }
	
	function clearEnterable() {
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
	}
 