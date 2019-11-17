
//component 선택

	// component 마우스 enter
    $('.enterable').mouseenter(function() {
    	if (!$(this).is(".clickedItem")) {
        	$(this).css({
        		border : "1px solid lightgray"
        	});
    	}
    });

	// component 마우스 leave
    $('.enterable').mouseleave(function() {
    	if (!$(this).is(".clickedItem")) {
        	$(this).css({
    			border : "1px solid white"
        	});
    	}
    });

	// component 마우스 click
    $('.enterable').click(function(){
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
        if (!$(this).is(".dropdownable"))
        	$(".figure-line-droplist").css({ display : "none" });
        else {
        	figurelineClicked();
        }
        $(this).addClass('clickedItem');
        $(this).css("border", "1px solid black");
    	$(this).children("input").focus();
        $(this).children("input").css("border", "1px solid skyblue");
    });

	// component - ratiofix 마우스 enter
    $('.figure-item.checkbox').mouseenter(function() {
    	$(this).children("div.checkbox").css({
    		border : "1px solid gray",
    		background : "lightgray"
    	});
    });

	// component - tab 마우스 enter
    $('.togglable').mouseenter(function() {
    	$(this).children("p").css({
    		color : "gray"
    	});
    }).mouseleave(function() {
    	$(this).children("p").css({
    		color : "black"
    	});
    });

	// component - ratiofix 마우스 leave
    $('.figure-item.checkbox').mouseleave(function() {
        if ($(this).is(".checked")){
        	$(this).children("div.checkbox").css({
        		border : "1px solid gray",
        		background : "white"
        	});
        } else {
        	$(this).children("div.checkbox").css({
        		border : "1px solid lightgray",
        		background : "white"
        	});
        }
    });

	// component - ratiofix 마우스 click
    $('.figure-item.checkbox').click(function() {
    	$('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
    	if (!$(this).is(".dropdownable"))
        	$(".figure-line-droplist").css({ display : "none" });
        if ($(this).is(".checked")){
            $(this).removeClass("checked");
            if ($(this).attr("id") == "size-ratio-fix")
            	$(".ui-selected").removeClass(".figure-size-ratiofixed");
            if ($(this).attr("id") == "weight-ratio-fix")
            	$(".ui-selected").removeClass(".figure-weight-ratiofixed");
            if ($(this).attr("id") == "radius-ratio-fix")
            	$(".ui-selected").removeClass(".figure-radius-ratiofixed");
        	$(this).children("div.checkbox").css({
        		border : "1px solid lightgray"
        	});
        	$(this).children("div.checkbox").children("img").css({
        		display : "none"
        	});
        } else {
            $(this).addClass("checked");
            if ($(this).attr("id") == "size-ratio-fix")
                $(".ui-selected").addClass(".figure-size-ratiofixed");
            if ($(this).attr("id") == "weight-ratio-fix")
                $(".ui-selected").addClass(".figure-weight-ratiofixed");
            if ($(this).attr("id") == "radius-ratio-fix")
            	$(".ui-selected").addClass(".figure-radius-ratiofixed");
        	$(this).children("div.checkbox").css({
        		border : "1px solid gray"
        	});
        	$(this).children("div.checkbox").children("img").css({
        		display : "block"
        	});
        }
    });

// component 선택
    
// input 선택
    
    $(".right-side-bar input").on("change keyup paste focusout", function(event) {

    	var type = $(this).parents().attr("id");
    	var value = $(this).val();
    	
    	var eventType = event.handleObj.type;
    	
    	switch(type) {
    		case "width" : 
    	    	if (eventType == "keyup" ? event.keyCode == 13 : eventType == "change" || eventType == "focusout") {
    	    		if ($(".figure-shape-comps #size-ratio-fix").is(".checked")) {
    	    			var pastHeight = $(".figure-shape-comps .figure-item[id=height] input").val();
    	    			$(".figure-shape-comps .figure-item[id=height] input").val(Math.round(filterNumber(value) / $(".ui-selected").css("width").split("px")[0] * pastHeight));
    	    		}
    	    	}
    			$(this).val(filterNumber(value));
    			break;
    		case "height" :
    	    	if (eventType == "keyup" ? event.keyCode == 13 : eventType == "change" || eventType == "focusout") {
    	    		if ($(".figure-shape-comps #size-ratio-fix").is(".checked")) {
	    		    	var pastWidth = $(".figure-shape-comps .figure-item[id=width] input").val();
	    		    	$(".figure-shape-comps .figure-item[id=width] input").val(Math.round(filterNumber(value) / $(".ui-selected").css("height").split("px")[0] * pastWidth));
	    			}
    	    	}
    			$(this).val(filterNumber(value));
    			break;
    		case "rotation" :
    			$(this).val(filterNumber(value));
    			break;
    		case "backgroundColor" :
    			$(this).val(filterColor(value));
    			backgroundColorChange();
    			break;
    		case "lineColor" :
    			$(this).val(filterColor(value));
    			lineColorChange();
    			break;
    		case "weight-top" :
	    		if ($(".figure-line-comps #weight-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "weight-left" :
	    		if ($(".figure-line-comps #weight-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "weight-right" :
	    		if ($(".figure-line-comps #weight-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "weight-bottom" :
	    		if ($(".figure-line-comps #weight-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "radius-top-left" :
	    		if ($(".figure-line-comps #radius-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "radius-top-right" :
	    		if ($(".figure-line-comps #radius-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "radius-bottom-left" :
	    		if ($(".figure-line-comps #radius-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "radius-top-right" :
	    		if ($(".figure-line-comps #radius-ratio-fix").is(".checked")) {
    		    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "textColor" :
    			$(this).val(filterColor(value));
    			textColorChange();
    			break;
    	}

    	if (eventType == "keyup" ? event.keyCode == 13 : eventType == "change" || eventType == "focusout") {
    		// component 도 select 해제할건가 정하기
    		$(this).css("border", "1px solid white");
    		applyChange();
    		//$(this).blur();
            $('.enterable').each(function(){
                $(this).removeClass('clickedItem');
                $(this).css("border", "1px solid white");
                $(this).children("input").css("border", "1px solid white");
            });
    	}
		
    });
    
    function filterNumber(value) {
    	return value.replace(/[^(0-9)]/g, "");
    }

    function filterColor(value) {
    	var filterValue = value.replace(/[^(0-9)^(a-f)^(A-F)]/g, "");
    	if (filterValue.length > 7) {
    		filterValue = filterValue.substring(0, 6);
    	}
    	filterValue = "#" + filterValue.toUpperCase();
    	return filterValue;
    }

	// backgroundColor 색상 변화
    function backgroundColorChange() {
    	var str = pad($(".figure-item#backgroundColor input[type=text]").val().replace(/[#]/g, ""), 6);
    	var str1 = parseInt(str.substring(0, 2), 16).toString();
    	var str2 = parseInt(str.substring(2, 4), 16).toString();
    	var str3 = parseInt(str.substring(4, 6), 16).toString();
    	$(".figure-item#backgroundColor .colorView").css({
    		background : "rgba(" + str1 + ", " + str2 + ", " + str3 + ")"
    	});
    }

	// lineColor 색상 변화
    function lineColorChange() {
    	var str = pad($(".figure-item#lineColor input[type=text]").val().replace(/[#]/g, ""), 6);
    	var str1 = parseInt(str.substring(0, 2), 16).toString();
    	var str2 = parseInt(str.substring(2, 4), 16).toString();
    	var str3 = parseInt(str.substring(4, 6), 16).toString();
    	$(".figure-item#lineColor .colorView").css({
    		background : "rgba(" + str1 + ", " + str2 + ", " + str3 + ")"
    	});
    }

	// textColor 색상 변화
    function textColorChange() {
    	var str = pad($(".text-item#textColor input[type=text]").val().replace(/[#]/g, ""), 6);
    	var str1 = parseInt(str.substring(0, 2), 16).toString();
    	var str2 = parseInt(str.substring(2, 4), 16).toString();
    	var str3 = parseInt(str.substring(4, 6), 16).toString();
    	$(".text-item#textColor .colorView").css({
    		background : "rgba(" + str1 + ", " + str2 + ", " + str3 + ")"
    	});
    }

// input 선택
    
// line style 선택

    // line 클릭 시 dropdownList 출력
    $('.figure-item .line').click(function() {
    	figurelineClicked();
    });

    // line 클릭 시 dropdownList 출력
    function figurelineClicked() {
    	$(".figure-line-droplist").children(".component#0").children("hr").css({
    		border : $(".figure-item .line").children("hr").css("border-style") + " 3px white"
    	});
    	var dropTop = $(".figure-item .line").position().top + 4;
    	var dropLeft = $(".figure-item .line").position().left + 5;
    	$(".figure-line-droplist").css({
    		display : "block",
    		top : dropTop,
    		left : dropLeft
    	});
    }

    // line 클릭 시 dropdownList component 클릭 시 변경
    function figurelineChange(style){
    	$(".figure-line-droplist").css({
    		display : "none"
    	});
    	$(".figure-item .line").children("hr").css({
    		border : style + " 3px gray"
    	});
		applyChange();
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
    }

	// line dropdownList 마우스 enter 시 색상 변화
    $(".figure-line-droplist .component").on("mouseenter", function() {
    	$(".figure-line-droplist .component").each(function() {
    		$(this).css("background", "black");
    	});
    	$(this).css("background", "gray");
    });
    
// line style 선택

// text style 선택

	// font 클릭 시 dropdownList 출력
	$('.text-item .fontType').click(function() {
		textfontClicked();
     });

     // font 클릭 시 dropdownList 출력
     function textfontClicked() {
     	var dropTop = $(".text-item .fontType").position().top + 29;
     	var dropLeft = $(".text-item .fontType").position().left + 10;
     	$(".text-font-droplist").css({
     		display : "block",
     		top : dropTop,
     		left : dropLeft
     	});
     }

     // font 클릭 시 dropdownList component 클릭 시 변경
     function textFontChange(title, style){
     	$(".text-font-droplist").css({
     		display : "none"
     	});
     	$(".text-item[id=font] .fontType").html(title);
     	$(".text-item[id=font] input").val(style);
 		applyChange();
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
     }

 	// font dropdownList 마우스 enter 시 색상 변화
     $(".text-font-droplist .component").on("mouseenter", function() {
     	$(".text-font-droplist .component").each(function() {
     		$(this).css("background", "white");
     	});
     	$(this).css("background", "lightgray");
     });
     
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
		
		applyChange();
		
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
		
    	 applyChange();
    	 
	});
     
// text sort 선택

// canvas div 값 가져오기

	// canvas div 클릭 시 서식 값 변화
    function formatChange(object) {
    	
    	var target = object.children(".obj-comp");
    	
    	// 가로
    	$(".figure-shape-comps .figure-item[id=width] input").val(object.css("width").split("px")[0]);
    	
    	// 세로
    	$(".figure-shape-comps .figure-item[id=height] input").val(object.css("height").split("px")[0]);

    	// 비율 고정 checkbox
    	if (object.attr("class").split(" ").includes(".figure-size-ratiofixed")) {
            $(".figure-shape-comps .figure-item[id=size-ratio-fix]").addClass("checked");
        	$(".figure-shape-comps .figure-item[id=size-ratio-fix]").children("div.checkbox").css({
        		border : "1px solid gray"
        	});
        	$(".figure-shape-comps .figure-item[id=size-ratio-fix]").children("div.checkbox").children("img").css({
        		display : "block"
        	});
    	} else {
            $(".figure-shape-comps .figure-item[id=size-ratio-fix]").removeClass("checked");
        	$(".figure-shape-comps .figure-item[id=size-ratio-fix]").children("div.checkbox").css({
        		border : "1px solid lightgray"
        	});
        	$(".figure-shape-comps .figure-item[id=size-ratio-fix]").children("div.checkbox").children("img").css({
        		display : "none"
        	});
    	}

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
    	if (object.attr("class").split(" ").includes(".figure-weight-ratiofixed")) {
            $(".figure-line-comps .figure-item[id=weight-ratio-fix]").addClass("checked");
        	$(".figure-line-comps .figure-item[id=weight-ratio-fix]").children("div.checkbox").css({
        		border : "1px solid gray"
        	});
        	$(".figure-line-comps .figure-item[id=weight-ratio-fix]").children("div.checkbox").children("img").css({
        		display : "block"
        	});
    	} else {
            $(".figure-line-comps .figure-item[id=weight-ratio-fix]").removeClass("checked");
        	$(".figure-line-comps .figure-item[id=weight-ratio-fix]").children("div.checkbox").css({
        		border : "1px solid lightgray"
        	});
        	$(".figure-line-comps .figure-item[id=weight-ratio-fix]").children("div.checkbox").children("img").css({
        		display : "none"
        	});
    	}

    	// 선 모서리 radius
    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(target.css("border-top-left-radius").split("px")[0]);
    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(target.css("border-top-right-radius").split("px")[0]);
    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(target.css("border-bottom-left-radius").split("px")[0]);
    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(target.css("border-bottom-right-radius").split("px")[0]);

    	// 비율 고정 checkbox
    	if (object.attr("class").split(" ").includes(".figure-radius-ratiofixed")) {
            $(".figure-line-comps .figure-item[id=radius-ratio-fix]").addClass("checked");
        	$(".figure-line-comps .figure-item[id=radius-ratio-fix]").children("div.checkbox").css({
        		border : "1px solid gray"
        	});
        	$(".figure-line-comps .figure-item[id=radius-ratio-fix]").children("div.checkbox").children("img").css({
        		display : "block"
        	});
    	} else {
            $(".figure-line-comps .figure-item[id=radius-ratio-fix]").removeClass("checked");
        	$(".figure-line-comps .figure-item[id=radius-ratio-fix]").children("div.checkbox").css({
        		border : "1px solid lightgray"
        	});
        	$(".figure-line-comps .figure-item[id=radius-ratio-fix]").children("div.checkbox").children("img").css({
        		display : "none"
        	});
    	}
    	
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
    		case "Roboto" :
    			fontName = "Sans-serif";
    			fontType = "Sans-serif";
    			break;
    	}
    	
    	$(".text-font-comps .text-item[id=font] .fontType").html(fontName);
    	$(".text-font-comps .text-item[id=font] input").val(fontType);
    	
    	$(".text-font-comps .text-item[id=size] input").val($(target).css("font-size").split("px")[0]);
    	
    	// font 색상
    	var fontColor = target.css("color").split("(")[1].split(")")[0].split(", ");
    	$(".text-font-comps .text-item[id=textColor] input").val("#" + (pad((fontColor[0] * 1).toString(16), 2) + pad((fontColor[1] * 1).toString(16), 2) + pad((fontColor[2] * 1).toString(16), 2)).toUpperCase());
    	$(".text-font-comps .text-item[id=textColor] .colorView").css({ background : target.css("color") });
    	
    	if ($(target).css("font-weight").includes("700")) {
    		$(".text-font-comps .text-effect[id=bold]").addClass("clicked");
    		$(".text-font-comps .text-effect[id=bold]").css("border", "1px solid black");
    		$(".text-font-comps .text-effect[id=bold]").css("background", "white");
    	} else {
    		$(".text-font-comps .text-effect[id=bold]").removeClass("clicked");
    		$(".text-font-comps .text-effect[id=bold]").css("border", "1px solid white");
    		$(".text-font-comps .text-effect[id=bold]").css("background", "white");
    	}
    	
    	if ($(target).css("font-style").includes("italic")) {
    		$(".text-font-comps .text-effect[id=italic]").addClass("clicked");
    		$(".text-font-comps .text-effect[id=italic]").css("border", "1px solid black");
    		$(".text-font-comps .text-effect[id=italic]").css("background", "white");
    	} else {
    		$(".text-font-comps .text-effect[id=italic]").removeClass("clicked");
    		$(".text-font-comps .text-effect[id=italic]").css("border", "1px solid white");
    		$(".text-font-comps .text-effect[id=italic]").css("background", "white");
    	}

    	if ($(target).css("text-decoration").includes("underline")) {
    		$(".text-font-comps .text-effect[id=underline]").addClass("clicked");
    		$(".text-font-comps .text-effect[id=underline]").css("border", "1px solid black");
    		$(".text-font-comps .text-effect[id=underline]").css("background", "white");
    	} else {
    		$(".text-font-comps .text-effect[id=underline]").removeClass("clicked");
    		$(".text-font-comps .text-effect[id=underline]").css("border", "1px solid white");
    		$(".text-font-comps .text-effect[id=underline]").css("background", "white");
    	}

    	if ($(target).css("text-decoration").includes("line-through")) {
    		$(".text-font-comps .text-effect[id=strikethrough]").addClass("clicked");
    		$(".text-font-comps .text-effect[id=strikethrough]").css("border", "1px solid black");
    		$(".text-font-comps .text-effect[id=strikethrough]").css("background", "white");
    	} else {
    		$(".text-font-comps .text-effect[id=strikethrough]").removeClass("clicked");
    		$(".text-font-comps .text-effect[id=strikethrough]").css("border", "1px solid white");
    		$(".text-font-comps .text-effect[id=strikethrough]").css("background", "white");
    	}

    	console.log("textBackground : " + $(target).css("background-color"));

    	$(".text-shape-comps .text-sort").each(function() {
    		$(this).removeClass("clicked");
    		$(this).css("border", "1px solid white");
    		$(this).css("background", "white");
    	});
    	
    	switch ($(target).css("text-align")) {
    		case "left" :
        		$(".text-shape-comps .text-sort#left").addClass("clicked");
        		$(".text-shape-comps .text-sort#left").css("border", "1px solid black");
        		$(".text-shape-comps .text-sort#left").css("background", "white");
    			break;
    		case "center" :
        		$(".text-shape-comps .text-sort#center").addClass("clicked");
        		$(".text-shape-comps .text-sort#center").css("border", "1px solid black");
        		$(".text-shape-comps .text-sort#center").css("background", "white");
    			break;
    		case "right" :
        		$(".text-shape-comps .text-sort#right").addClass("clicked");
        		$(".text-shape-comps .text-sort#right").css("border", "1px solid black");
        		$(".text-shape-comps .text-sort#right").css("background", "white");
    			break;
    		default : 
        		$(".text-shape-comps .text-sort#justify").addClass("clicked");
    			$(".text-shape-comps .text-sort#justify").css("border", "1px solid black");
    			$(".text-shape-comps .text-sort#justify").css("background", "white");
    			break;
    	}
    	
    }

// canvas div 값 가져오기
    
// canvas div에 값 적용시키기

	// input 변화
    function applyChange() {
    	
    	if ($(".ui-selected").length > 0) {
    		
    		// FIGURE
    		
        	// 가로, 세로
        	$(".ui-selected").css({
        		width : $(".figure-shape-comps .figure-item[id=width] input").val(),
        		height : $(".figure-shape-comps .figure-item[id=height] input").val()
        	});
        	
        	// 회전율
        	var radius = $(".ui-selected").css("transform").split("(")[1].split(")")[0].split(", ");
        	radius = Math.round(Math.atan2(radius[1], radius[0]) * (180/Math.PI));
        	if (radius != $(".figure-shape-comps .figure-item[id=rotation] input").val()) {
        		$(".ui-selected").css({
        			transform : "rotate(" + $(".figure-shape-comps .figure-item[id=rotation] input").val() + "deg)"
        		});
        	}

        	// 배경 색
        	var backgroundColor = $(".figure-shape-comps .figure-item[id=backgroundColor] input").val().split("#")[1];
        	var backgroundColor1 = parseInt(backgroundColor.substring(0, 2), 16);
        	var backgroundColor2 = parseInt(backgroundColor.substring(2, 4), 16);
        	var backgroundColor3 = parseInt(backgroundColor.substring(4, 6), 16);
        	
        	$(".ui-selected .obj-comp").css({
        		background : "rgb(" + backgroundColor1 + ", " + backgroundColor2 + ", " + backgroundColor3 + ")"
        	});

        	// 선 종류, 굵기, 색
        	var lineColor = $(".figure-line-comps .figure-item[id=lineColor] input").val().split("#")[1];
        	var lineColor1 = parseInt(lineColor.substring(0, 2), 16);
        	var lineColor2 = parseInt(lineColor.substring(2, 4), 16);
        	var lineColor3 = parseInt(lineColor.substring(4, 6), 16);
        	
        	$(".ui-selected .obj-comp").css("border-top", $(".figure-line-comps .figure-item[id=kinds] hr").css("border-style") + " " + $(".figure-line-comps .figure-item[id=weight-top] input").val() + "px rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
        	$(".ui-selected .obj-comp").css("border-left", $(".figure-line-comps .figure-item[id=kinds] hr").css("border-style") + " " + $(".figure-line-comps .figure-item[id=weight-left] input").val() + "px rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
        	$(".ui-selected .obj-comp").css("border-right", $(".figure-line-comps .figure-item[id=kinds] hr").css("border-style") + " " + $(".figure-line-comps .figure-item[id=weight-right] input").val() + "px rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
        	$(".ui-selected .obj-comp").css("border-bottom", $(".figure-line-comps .figure-item[id=kinds] hr").css("border-style") + " " + $(".figure-line-comps .figure-item[id=weight-bottom] input").val() + "px rgb(" + lineColor1 + ", " + lineColor2 + ", " + lineColor3 + ")");
        	
        	// 선 모서리 radius
        	$(".ui-selected .obj-comp").css("border-top-left-radius", $(".figure-line-comps .figure-item[id=radius-top-left] input").val() + "px");
        	$(".ui-selected .obj-comp").css("border-top-right-radius", $(".figure-line-comps .figure-item[id=radius-top-right] input").val() + "px");
        	$(".ui-selected .obj-comp").css("border-bottom-left-radius", $(".figure-line-comps .figure-item[id=radius-bottom-left] input").val() + "px");
        	$(".ui-selected .obj-comp").css("border-bottom-right-radius", $(".figure-line-comps .figure-item[id=radius-bottom-right] input").val() + "px");
        	
        	
        	// TEXT
        	$(".ui-selected .obj-comp").css("font-family", $(".text-font-comps .text-item[id=font] input").val());

        	// text 색
        	
        	var fontColor = $(".text-font-comps .text-item[id=textColor] input").val().split("#")[1];

        	var fontColor1 = parseInt(fontColor.substring(0, 2), 16);
        	var fontColor2 = parseInt(fontColor.substring(2, 4), 16);
        	var fontColor3 = parseInt(fontColor.substring(4, 6), 16);

        	$(".ui-selected .obj-comp").css({
        		color : "rgb(" + fontColor1 + ", " + fontColor2 + ", " + fontColor3 + ")"
        	});

        	if ($(".text-effect[id=bold]").is(".clicked"))
            	$(".ui-selected .obj-comp").css("font-weight", "bold");
        	else
            	$(".ui-selected .obj-comp").css("font-weight", "normal");
        	
        	if ($(".text-effect[id=italic]").is(".clicked"))
        		$(".ui-selected .obj-comp").css("font-style", "italic");
        	else
        		$(".ui-selected .obj-comp").css("font-style", "normal");

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
        		$(".ui-selected .obj-comp").css("text-decoration", "none");
        	else 
        		$(".ui-selected .obj-comp").css("text-decoration", textDecoration);
        	
        	if ($(".text-sort[id=justify]").is(".clicked"))
            	$(".ui-selected .obj-comp").css("text-align", "justify");
        	else if ($(".text-sort[id=left]").is(".clicked"))
            	$(".ui-selected .obj-comp").css("text-align", "left");
        	else if ($(".text-sort[id=center]").is(".clicked"))
            	$(".ui-selected .obj-comp").css("text-align", "center");
        	else if ($(".text-sort[id=right]").is(".clicked"))
            	$(".ui-selected .obj-comp").css("text-align", "right");
        	
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
 