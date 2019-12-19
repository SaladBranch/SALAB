
var lastChanged = "";

// ** 메뉴 구성 hover, click 이벤트 모음

	// 메뉴 enterable enter, leave, click
    $('.enterable').mouseenter(function() {
    	if (!$(this).is(".clickedItem"))
        	$(this).css({ border : "1px solid lightgray" });
    }).mouseleave(function() {
    	if (!$(this).is(".clickedItem"))
        	$(this).css({ border : "1px solid white" });
    }).click(function(){
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
            $(this).children().children("input").css("border", "1px solid white");
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
		if (!$(this).children("input").is(":focus") && !$(this).children().children("input").is(":focus"))
			$(this).children("input").focus();
        $(this).children("input").css("border", "1px solid skyblue");
        $(this).children().children("input").css("border", "1px solid skyblue");
    });

	// 메뉴 checkbox enter, leave, click
    $('.figure-item.checkbox').mouseenter(function() {
    	// 마우스 진입 시 테두리 회색, 배경 밝은 회색
    	$(this).children("div.checkbox").css({ border : "1px solid gray", background : "lightgray" });
    }).mouseleave(function() {
    	// 마우스 퇴장 시
        if ($(this).is(".checked")){
        	// checkbox가 체크된 상태라면 테두리 회색, 배경 하얀색
        	$(this).children("div.checkbox").css({ border : "1px solid gray", background : "white" });
        } else {
        	// checkbox가 체크되지 않은 상태라면 테두리 밝은회색, 배경 하얀색
        	$(this).children("div.checkbox").css({ border : "1px solid lightgray", background : "white" });
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
        	$(this).children("div.checkbox").css({ border : "1px solid lightgray" });
        	$(this).children("div.checkbox").children("img").css({ display : "none" });
        } else {
            $(this).addClass("checked");
            if ($(this).attr("id") == "size-ratioFix")
                $(".ui-selected").addClass("size-ratiofixed");
            if ($(this).attr("id") == "weight-ratioFix")
                $(".ui-selected").addClass("weight-ratiofixed");
            if ($(this).attr("id") == "radius-ratioFix")
            	$(".ui-selected").addClass("radius-ratiofixed");
        	$(this).children("div.checkbox").css({ border : "1px solid gray" });
        	$(this).children("div.checkbox").children("img").css({ display : "block" });
        }
    });

	// 메뉴 button enter, leave
    $('.togglable').mouseenter(function() {
    	$(this).children("p").css({ color : "gray" });
    }).mouseleave(function() {
    	$(this).children("p").css({ color : "black" });
    });

    $(".component").on("mouseenter", function() {
    	$(".component").each(function() { $(this).css("background", "white"); });
    	$(this).css("background", "lightgray");
    });

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
    	 if ($(this).attr("id") == "bold" || $(this).attr("id") == "italic" || $(this).attr("id") == "underline" || $(this).attr("id") == "strikethrough") {
        	 if ($(this).is(".clicked")) {
        		 $(this).removeClass("clicked");
        		 $(this).css("border", "1px solid white");
        		 $(this).css("background", "white");
        	 } else {
        		 $(this).addClass("clicked");
        		 $(this).css("border", "1px solid black");
        		 $(this).css("background", "white");
        	 }
    	 }
    	 applyChange("text-effect-" + $(this).attr("id"));
     });
     
    // textarea edit 종료 시 thumbnail 변경
    $(document).on("focusout", ".textarea", function() {
    	Thumbnail();
    });

    // 메뉴 input 값 변경 시 정렬 후 applyChange(type) 실행
	$(".right-side-bar input").on("change keyup paste focusout", function(event) {

    	var type = $(this).parents().attr("id");
    	var value = $(this).val();
    	var eventType = event.handleObj.type;

    	var applyType = "";

    	if (type == "width") {
	    	if (eventType == "focusout") {
	    		if ($(".figure-shape-comps #size-ratioFix").is(".checked")) {
	    			var pastHeight = $(".figure-shape-comps .figure-item[id=height] input").val();
	    			$(".figure-shape-comps .figure-item[id=height] input").val(Math.round(filterValue("number", value) / $("div.ui-selected").css("width").split("px")[0] * pastHeight));
	    		}
	    	}
			$(this).val(filterValue("number", value));
			applyType = "width";
    	}

    	if (type == "height") {
	    	if (eventType == "focusout") {
	    		if ($(".figure-shape-comps #size-ratioFix").is(".checked")) {
    		    	var pastWidth = $(".figure-shape-comps .figure-item[id=width] input").val();
    		    	$(".figure-shape-comps .figure-item[id=width] input").val(Math.round(filterValue("number", value) / $("div.ui-selected").css("height").split("px")[0] * pastWidth));
    			}
	    	}
			$(this).val(filterValue("number", value));
			applyType = "height";
    	}

    	if (type == "rotation") {
			$(this).val(filterValue("number", value));
			applyType = "rotation";
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

    	if (type == "size") {
			applyType = "fontSize";
    	}

    	if (type == "textColor") {
			$(this).val(filterValue("color", value));
			changeColor("text");
			applyType = "textColor";
    	}

		// 값이 바뀐 경우에만 작동하게 하기
    	if (eventType == "change" || eventType == "paste") {
    		if ($(this).focus)
    			$(this).blur();
    	} else if (eventType == "focusout") {
    		clearEnterable();
    		applyChange(applyType);
    	}
		
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

	document.addEventListener("mousedown", function(event) {
    	if(!$(event.target).is(".tab-menu *") && !$(event.target).is(".text-item *") && !$(event.target).is(".figure-item *") && !$(event.target).is(".minicolors-panel *") && !$(event.target).is(".component")) {
    		if ($(event.target).is(".obj-comp") || $(event.target).is(".obj-comp *") ? $(".text-dragged").length > 0 && $(".text-dragged").is(".focusout") : false) {
				$(".text-dragged").removeClass("focusout");
				$(".text-dragged").selectText();
    		} else if ($(".text-dragged").length > 0 || window.getSelection().rangeCount > 0 && window.getSelection().toString().length > 0) {
				$(".text-dragged").contents().unwrap();
				window.getSelection().removeAllRanges();
			}
    	}
	}, true);
	/*
	document.addEventListener('mouseup', () => {
		  
		  console.clear();
		  
		  const selection = window.getSelection();
		  if (!selection.rangeCount) return;
		  
		  const range = selection.getRangeAt(0);
		  
		  console.log('Selected elements:');
		  range.cloneContents().querySelectorAll('*').forEach(e => console.log(e));
		  
		  console.log('Selected text/elements parent:');
		  console.log(range.commonAncestorContainer.parentNode);

		});
	*/
	$(document).on("mouseup", function() {
		if ($(".text-dragged").length == 0 && window.getSelection().rangeCount > 0 && window.getSelection().toString().length > 0) {
    		var isTextarea = "false";
    		var $checkTarget = $(window.getSelection().anchorNode).parent();
    		if ($(window.getSelection().anchorNode).closest(".textarea").length > 0)
				isTextarea = "true";
    		/*while(true) {
    			if (!$checkTarget.is("span")) {
    				if ($checkTarget.is(".textarea"))
    					isTextarea = "true";
    				break;
    			}
    			$checkTarget = $checkTarget.parent();
    		}*/
    		if (isTextarea == "true") {
    			wrapTag(window.getSelection().getRangeAt(0), "span", "text-dragged");
    			var $dragCheckTarget = $(".text-dragged");
    			while(true) {
        			if (!$dragCheckTarget.parent().is("span")) {
        				break;
        			} else if ($dragCheckTarget.text() == $dragCheckTarget.parent().text()) {
        				$dragCheckTarget.parent().wrap("<span class='text-dragged'>");
        				$dragCheckTarget.contents().unwrap();
            			$dragCheckTarget = $(".text-dragged");
        			} else {
        				break;
        			}
        		}
    			clearDragged();
    			formatChange();
    			$(".text-dragged").selectText();
    		} else {
    			if ($(".text-dragged").text() != "")
    				$(".text-dragged").content().unwrap();
    			else
    				$(".text-dragged").remove();
    		}
    		$(".textarea span").each(function() {
    			if ($(this).text() == "") {
    				$(this).remove();
    			}
    		});
		}
	});
	
	// canvas div 클릭 시 서식 값 변화
    function formatChange() {
    	
    	var targetMode;
    	var object = $("#droppable .ui-selected");
		var target = $("#droppable .ui-selected .obj-comp");
		
    	if (object.length == 1 && !object.is(".group-obj")) {
    		$(".figure-shape-comps .figure-item[id=width]").fadeIn(100);
    		$(".figure-shape-comps .figure-item[id=height]").fadeIn(100);
    		$(".figure-shape-comps .figure-item[id=size-ratioFix]").fadeIn(100);
    	} else {
    		$(".figure-shape-comps .figure-item[id=width]").fadeOut(100);
    		$(".figure-shape-comps .figure-item[id=height]").fadeOut(100);
    		$(".figure-shape-comps .figure-item[id=size-ratioFix]").fadeOut(100);	
    	}
    	
    	// 가로
    	if (object.length == 1 && target.length == 1)
    		$(".figure-shape-comps .figure-item[id=width] input").val(object.css("width").split("px")[0]);

    	// 세로
    	if (object.length == 1 && target.length == 1)
    		$(".figure-shape-comps .figure-item[id=height] input").val(object.css("height").split("px")[0]);

    	// 비율 고정 checkbox
    	if (object.length == 1 && target.length == 1)
    		changeCheckbox("size", object);

    	// 회전율
    	var rotate = checkAttr("rotate", object);
    	$(".figure-shape-comps .figure-item[id=rotation] input").val(rotate == "diffrent" ? "" : rotate);
    	
    	// 배경색
    	var backgroundColor = checkAttr("backgroundColor", target);
		$(".figure-shape-comps .figure-item[id=backgroundColor] .minicolors-swatch-color").eq(0).css("background", (backgroundColor == "diffrent" ? "white" : backgroundColor));
		$(".figure-shape-comps .figure-item[id=backgroundColor] input").val(backgroundColor == "diffrent" ? "" : backgroundColor);

		// 선 타입
    	var kinds = checkAttr("kinds", target);
    	$(".figure-line-comps .figure-item[id=kinds] .line hr").css({
    		border : "3px " + (target.css("border-top-style") == "diffrent" ? "solid" : kinds) + " gray"
    	});
    	
    	// 선 색상
		var lineColor = checkAttr("lineColor", target);
		$(".figure-line-comps .figure-item[id=lineColor] .minicolors-swatch-color").eq(0).css("background", (lineColor == "diffrent" ? "white" : lineColor));
		$(".figure-line-comps .figure-item[id=lineColor] input").val(lineColor == "diffrent" ? "" : lineColor);
	
    	// 선 굵기
		var lineWeight_t = checkAttr("lineWeight_t", target);
		var lineWeight_l = checkAttr("lineWeight_l", target);
		var lineWeight_r = checkAttr("lineWeight_r", target);
		var lineWeight_b = checkAttr("lineWeight_b", target);
    	$(".figure-line-comps .figure-item[id=weight-top] input").val(lineWeight_t == "diffrent" ? "" : lineWeight_t);
    	$(".figure-line-comps .figure-item[id=weight-left] input").val(lineWeight_l == "diffrent" ? "" : lineWeight_l);
    	$(".figure-line-comps .figure-item[id=weight-right] input").val(lineWeight_r == "diffrent" ? "" : lineWeight_r);
    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(lineWeight_b == "diffrent" ? "" : lineWeight_b);
    	
    	// 비율 고정 checkbox
    	changeCheckbox("weight", object);

    	// 선 모서리 radius
		var lineRadius_tl = checkAttr("lineRadius_tl", target);
		var lineRadius_tr = checkAttr("lineRadius_tr", target);
		var lineRadius_bl = checkAttr("lineRadius_bl", target);
		var lineRadius_br = checkAttr("lineRadius_br", target);
    	$(".figure-line-comps .figure-item[id=radius-top-left] input").val(lineRadius_tl == "diffrent" ? "" : lineRadius_tl);
    	$(".figure-line-comps .figure-item[id=radius-top-right] input").val(lineRadius_tr == "diffrent" ? "" : lineRadius_tr);
    	$(".figure-line-comps .figure-item[id=radius-bottom-left] input").val(lineRadius_bl == "diffrent" ? "" : lineRadius_tl);
    	$(".figure-line-comps .figure-item[id=radius-bottom-right] input").val(lineRadius_br == "diffrent" ? "" : lineRadius_tl);
    	
    	// 비율 고정 checkbox
    	changeCheckbox("radius", object);
    	
    	// TEXT
		var fontType = checkAttr("fontType", target);
    	$(".text-font-comps .text-item[id=font] .fontType").html(fontType == "diffrent" ? "mixed" : fontType.replace(/"/g, ""));
    	
    	var fontSize = checkAttr("fontSize", target);
    	$(".text-font-comps .text-item[id=size] input").val(fontSize == "diffrent" ? "mixed" : fontSize);
    	
    	// font 색상
		var fontColor = checkAttr("fontColor", target);
		$(".text-font-comps .text-item[id=textColor] .minicolors-swatch-color").eq(0).css("background", (fontColor == "diffrent" ? "white" : fontColor));
		$(".text-font-comps .text-item[id=textColor] input").val(fontColor == "diffrent" ? "mixed" : fontColor);
		
    	// text effect
    	var bold = checkAttr("bold", target);
    	var italic = checkAttr("italic", target);
    	var underline = checkAttr("underline", target);
    	var strikethrough = checkAttr("strikethrough", target);
    	clickOption("bold", (bold == "700" ? "true" : "false"));
    	clickOption("italic", (italic == "italic" ? "true" : "false"));
    	clickOption("underline", (underline == "underline" ? "true" : "false"));
    	clickOption("strikethrough", (strikethrough == "line-through" ? "true" : "false"));

    	// font 강조 색상
		var textgroundColor = checkAttr("textgroundColor", target);
		$(".text-shape-comps .text-item[id=textgroundColor] .minicolors-swatch-color").eq(0).css("background", (textgroundColor == "diffrent" ? "white" : textgroundColor));
		$(".text-shape-comps .text-item[id=textgroundColor] input").val(textgroundColor == "diffrent" ? "mixed" : textgroundColor);
		
    	// text sort
    	var sort = checkAttr("sort", target);
    	
    	$(".text-shape-comps .text-sort").each(function() {
    		$(this).removeClass("clicked");
    		$(this).css("border", "1px solid white");
    		$(this).css("background", "white");
    	});
    	
    	switch ($(target).css("text-align")) {
    		case "left" : sort = "left"; break;
    		case "center" : sort = "center"; break;
    		case "right" : sort = "right"; break;
    		default : sort = "justify"; break;
    	}
		$(".text-shape-comps .text-sort#" + sort).addClass("clicked");
		$(".text-shape-comps .text-sort#" + sort).css("border", "1px solid black");
		$(".text-shape-comps .text-sort#" + sort).css("background", "white");
    	
    }

	function checkAttr(type, object) {

    	var result = "start";
		var value = "";
		
		if (type == "fontType" || type == "fontSize" || type == "fontColor" || type == "bold" || type == "italic") {
			if ($(".text-dragged").length > 0) {
				
/*				$(".text-dragged").children().each(function() {
					switch(type) {
						case "fontType" : value = $(this).css("fontFamily").split(", ")[0]; break;
						case "fontSize" : value = $(this).css("font-size").split("px")[0] * 1; break;
						case "fontColor" : value = $(this).css("color").split("(")[1].split(")")[0].split(", "); value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase(); break;
						case "bold" : value = $(this).css("font-weight"); break;
						case "italic" : value = $(this).css("font-style"); break;
					}
					if (result == "start" || result == "")
						result = value;
					else if (result != value)
						result = "diffrent";
				});
				
				if (result != "diffrent") {

					var cssString = ""
					switch(type) {
						case "fontType" : cssString = "<span style=\"font-family"; break;
						case "fontSize" : cssString = "<span style=\"font-size"; break; break;
						case "fontColor" : cssString = "<span style=\"color"; break; break;
						case "bold" : cssString = "<span style=\"font-weight"; break;
						case "italic" : cssString = "<span style=\"font-style"; break; break;
					}
		    		$(".text-dragged").children().find("span").each(function() {
	    				var innerHTML = $(this).wrap("<div>").parent().html();
						$(this).unwrap();
						if (innerHTML.startsWith(cssString)) {
							switch(type) {
								case "fontType" : value = $(this).css("fontFamily").split(", ")[0]; break;
								case "fontSize" : value = $(this).css("font-size").split("px")[0] * 1; break;
								case "fontColor" : value = $(this).css("color").split("(")[1].split(")")[0].split(", "); value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase(); break;
								case "bold" : value = $(this).css("font-weight"); break;
								case "italic" : value = $(this).css("font-style"); break;
							}
		            		if (result == "start")
		            			result = value;
		            		else if (result != value)
		            			result = "diffrent";
						}
		        	});
				}*/
				
				if (result != "diffrent" && ($(".text-dragged").text() != $(".text-dragged").children().text() ? true : $(".text-dragged").text() == "")) {
					switch(type) {
						case "fontType" : value = $(".text-dragged").css("fontFamily").split(", ")[0]; break;
						case "fontSize" : value = $(".text-dragged").css("font-size").split("px")[0] * 1; break;
						case "fontColor" : value = $(".text-dragged").css("color").split("(")[1].split(")")[0].split(", "); value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase(); break;
						case "bold" : value = $(".text-dragged").css("font-weight"); break;
						case "italic" : value = $(".text-dragged").css("font-style"); break;
					}
            		if (result == "start" || result == "")
            			result = value;
            		else if (result != value)
            			result = "diffrent";
				}
	    		$(".text-dragged span").each(function() {
	    			if (result != "diffrent") {
						switch(type) {
							case "fontType" : value = $(this).css("fontFamily").split(", ")[0]; break;
							case "fontSize" : value = $(this).css("font-size").split("px")[0] * 1; break;
							case "fontColor" : value = $(this).css("color").split("(")[1].split(")")[0].split(", "); value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase(); break;
							case "bold" : value = $(this).css("font-weight"); break;
							case "italic" : value = $(this).css("font-style"); break;
						}
	            		if (result == "start" || result == "")
	            			result = value;
	            		else if (result != value)
	            			result = "diffrent";
	    			}
	        	});
			} else {
				$("div.ui-selected .obj-comp").each(function() {
					if (result != "diffrent" && ($(this).text() != $(this).children().text() ? true : $(this).text() == "")) {
						switch(type) {
							case "fontType" : value = $(this).css("fontFamily").split(", ")[0]; break;
							case "fontSize" : value = $(this).css("font-size").split("px")[0] * 1; break;
							case "fontColor" : value = $(this).css("color").split("(")[1].split(")")[0].split(", "); value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase(); break;
							case "bold" : value = $(this).css("font-weight"); break;
							case "italic" : value = $(this).css("font-style"); break;
						}
	            		if (result == "start")
	            			result = value;
	            		else if (result != value)
	            			result = "diffrent";
					}
				});
				var cssString = ""
				switch(type) {
					case "fontType" : cssString = "<span style=\"font-family"; break;
					case "fontSize" : cssString = "<span style=\"font-size"; break; break;
					case "fontColor" : cssString = "<span style=\"color"; break; break;
					case "bold" : cssString = "<span style=\"font-weight"; break;
					case "italic" : cssString = "<span style=\"font-style"; break; break;
				}
	    		$("div.ui-selected span").each(function() {
	    			if (result != "diffrent") {
	    				var innerHTML = $(this).wrap("<div>").parent().html();
						$(this).unwrap();
						if (innerHTML.startsWith(cssString)) {
							switch(type) {
								case "fontType" : value = $(this).css("fontFamily").split(", ")[0]; break;
								case "fontSize" : value = $(this).css("font-size").split("px")[0] * 1; break;
								case "fontColor" : value = $(this).css("color").split("(")[1].split(")")[0].split(", "); value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase(); break;
								case "bold" : value = $(this).css("font-weight"); break;
								case "italic" : value = $(this).css("font-style"); break;
							}
		            		if (result == "start")
		            			result = value;
		            		else if (result != value)
		            			result = "diffrent";
						}
	    			}
	        	});
			}
			if (result == "start") {
				switch(type) {
					case "fontType" : result = "Roboto"; break;
					case "fontSize" : result = 20; break; break;
					case "fontColor" : result = "#343434"; break;
					case "bold" : result = 300; break;
					case "italic" : result = "none"; break;
				}
			}
    		return result;
		}

		if (type == "underline" || type == "strikethrough") {
			if ($(".text-dragged").length > 0) {
				$(".text-dragged span").each(function() {
					var cssString = ""
					switch(type) {
						case "underline" : cssString = "<span style=\"text-decoration:underline"; break;
						case "strikethrough" : cssString = "<span style=\"text-decoration:line-through"; break;
					}
    				var innerHTML = $(this).wrap("<div>").parent().html();
					$(this).unwrap();
					if (innerHTML.startsWith(cssString)) {
						result = type == "underline" ? "underline" : "line-through";
					}
				});
			} else {
				$(".ui-selected span").each(function() {
					var cssString = ""
					switch(type) {
						case "underline" : cssString = "<span style=\"text-decoration:underline"; break;
						case "strikethrough" : cssString = "<span style=\"text-decoration:line-through"; break;
					}
    				var innerHTML = $(this).wrap("<div>").parent().html();
					$(this).unwrap();
					if (innerHTML.startsWith(cssString)) {
						result = type == "underline" ? "underline" : "line-through";
					}
				});
			}
			return result;
		}
		
		/*if (type == "underline" || type == "strikethrough") {
			var str;
			switch(type) {
				case "underline": str = "underline"; break;
				case "strikethrough" : str = "line-through"; break;
			}
			if ($(".text-dragged").length > 0) {
				$(".text-dragged span").each(function() {
					console.log($(this));
					console.log($(this).css("text-decoration"));
					console.log($(this).css("text-decoration").includes(str));
				});
				value = "";
				var $checkParent = $(".text-dragged").parent();
				while(true) {
					if ($checkParent.is(".textarea"))
						break;
					else if ($checkParent.css("text-decoration").includes(str)) {
						value = str;
						break;
					}
					$checkParent = $checkParent.parent();
				}
				if (value == "") {
					var textDecoration = "";
					var text = "";
					$(".text-dragged span").each(function() {
						if ($(this).children().length == 0) {
							text = text + $(this).text();
							if (textDecoration != "diffrent") {
								var check = "none";
								var $check = $(this);
								while (true) {
									if (!$check.is(".textarea")) {
										if ($check.css("text-decoration").includes(str)) {
											check = str;
											break;
										}
										$check = $check.parent();
									} else 
										break;
								}
								if (textDecoration == "")
									textDecoration = check == str ? str : "none";
								else {
									if (textDecoration != check) {
										textDecoration = "diffrent";
									}
								}
							}
						}
					});
					if (text != $(".text-dragged").text())
						value = "none";
					else
						value = textDecoration == str ? textDecoration : "none";
				}
				result = value;
			} else {
				var textDecoration = "";
				var text = "";
				$(".ui-selected .textarea span").each(function() {
					if ($(this).children().length == 0) {
						text = text + $(this).text();
						if (textDecoration != "diffrent") {
							var check = "none";
							var $check = $(this);
							while (true) {
								if (!$check.is(".textarea")) {
									if ($check.css("text-decoration").includes(str)) {
										check = str;
										break;
									}
									$check = $check.parent();
								} else 
									break;
							}
							if (textDecoration == "")
								textDecoration = check == str ? str : "none";
							else {
								if (textDecoration != check) {
									textDecoration = "diffrent";
								}
							}
						}
					}
				});
				if (text != $(".ui-selected .textarea").text())
					value = "none";
				else
					value = textDecoration == str ? textDecoration : "none";
				result = value;
			}
			return result;
		}*/

		if (type == "textgroundColor") {
			if ($(".text-dragged").length > 0) {
				$(".text-dragged span").each(function() {
					var innerHTML = $(this).wrap("<div>").parent().html();
					$(this).unwrap();
					if (innerHTML.startsWith("<span style=\"background:rgb(")) {
						value = $(this).css("background").split("(")[1].split(")")[0].split(", ");
						value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase();
	            		if (result == "start")
	            			result = value;
	            		else if (result != value)
	            			result = "diffrent";
					}
				});
				if (result != "diffrent") {
					var $checkParent = $(".text-dragged").parent();
					while(true) {
						var innerHTML = $checkParent.wrap("<div>").parent().html();
						$checkParent.unwrap();
						if ($checkParent.is(".textarea"))
							break;
						else if (innerHTML.startsWith("<span style=\"background:rgb(")) {
							value = $checkParent.css("background").split("(")[1].split(")")[0].split(", ");
							value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase();
		            		if (result == "start")
		            			result = value;
		            		else if (result != value)
		            			result = "diffrent";
							break;
						}
						$checkParent = $checkParent.parent();
					}
				}
			} else {
				$("#droppable .ui-selected span").each(function() {
					var innerHTML = $(this).wrap("<div>").parent().html();
					$(this).unwrap();
					if (innerHTML.startsWith("<span style=\"background:rgb(")) {
						value = $(this).css("background").split("(")[1].split(")")[0].split(", ");
						value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase();
	            		if (result == "start")
	            			result = value;
	            		else if (result != value)
	            			result = "diffrent";
					}
				});
			}
			if (result == "start")
				result = "#FFFFFF";
			return result;
		}

		object.each(function() {
			if (result != "diffrent") {
				
        		if (type == "rotate") {
        			value = $(this).css("transform");
        			value = value.split("(")[1].split(")")[0].split(", ");
        			value = Math.round(Math.atan2(value[1], value[0]) * (180/Math.PI));
                	if (value < 0)
                		value = 360 - (value * -1); 
        		}
        		
        		if (type == "backgroundColor") {
        			value = $(this).css("background").split("(")[1].split(")")[0].split(", ");
        			value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase();
        		}

    			if (type == "kinds") {
    				value = $(this).css("border-top-style");
    			}
    			
    			if (type == "lineColor") {
    				value = $(this).css("border-color").split("(")[1].split(")")[0].split(", ");
    				value = "#" + (pad((value[0] * 1).toString(16), 2) + pad((value[1] * 1).toString(16), 2) + pad((value[2] * 1).toString(16), 2)).toUpperCase();
    			}

    			if (type == "lineWeight_t") 
    				value = $(this).css("border-top-width").split("px")[0] * 1;
    			if (type == "lineWeight_l") 
    				value = $(this).css("border-left-width").split("px")[0] * 1;
    			if (type == "lineWeight_r") 
    				value = $(this).css("border-right-width").split("px")[0] * 1;
    			if (type == "lineWeight_b") 
    				value = $(this).css("border-bottom-width").split("px")[0] * 1;

    			if (type == "lineRadius_tl") 
    				value = $(this).css("border-top-left-radius").split("px")[0] * 1;
    			if (type == "lineRadius_tr") 
    				value = $(this).css("border-top-right-radius").split("px")[0] * 1;
    			if (type == "lineRadius_bl") 
    				value = $(this).css("border-bottom-left-radius").split("px")[0] * 1;
    			if (type == "lineRadius_br") 
    				value = $(this).css("border-bottom-right-radius").split("px")[0] * 1;

    			if (type == "sort") {
    				value = $(this).css("text-align");
    			}
    			
    			if (result == "start")
    				result = value;
    			else if (result != value)
    				result = "diffrent";
    			
			}
		});
		return result;
	}
	
	// input 변화
    function applyChange(type) {

    	var object = $("div.ui-selected");
		var target = $("div.ui-selected .obj-comp");
		
		if (object.length < 1) {
	    	object = $("div.text-editing");
			target = $("div.text-editing .obj-comp");
		}
		
    	if (object.length > 0) {

        	list[$('.page-item').index($('.page-item.ui-selected'))].undo.push($('.canvas-container').html());
        	$('#top-undo-btn img').attr('src', '/salab/resources/img/leftarrow.png').css('cursor', 'pointer');
        	
    		target.each(function() {
    			
        		// FIGURE
        		
            	// 가로, 세로
        		if (type == "width" || type == "height") {
        			$(this).parents("div.ui-selected").css({
                		width : $(".figure-shape-comps .figure-item[id=width] input").val(),
                		height : $(".figure-shape-comps .figure-item[id=height] input").val()
                	});                	
        		}
        		
            	// 회전율
        		if (type == "rotation") {
                	var radius = $(this).parents("div.ui-selected").css("transform").split("(")[1].split(")")[0].split(", ");
                	radius = Math.round(Math.atan2(radius[1], radius[0]) * (180/Math.PI));
                	if (radius != $(".figure-shape-comps .figure-item[id=rotation] input").val()) {
                		$(this).parents("div.ui-selected").css({
                			transform : "rotate(" + $(".figure-shape-comps .figure-item[id=rotation] input").val() * Math.PI / 180 + "rad)"
                		});
                		$(this).parents("div.ui-selected").data("uiRotatable").angle($(".figure-shape-comps .figure-item[id=rotation] input").val() * Math.PI / 180);
                	}
        		}

            	// 배경 색
        		if (type == "backgroundColor") {
                	$(this).css("background", $(".figure-shape-comps .figure-item[id=backgroundColor] input").val());
        		}

            	// 선 종류
        		if (type == "kinds") {
        			$(this).css("border-top", $(this).css("borderTopWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + $(this).css("borderColor"));
        			$(this).css("border-left", $(this).css("borderLeftWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + $(this).css("borderColor"));
        			$(this).css("border-right", $(this).css("borderRightWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + $(this).css("borderColor"));
        			$(this).css("border-bottom", $(this).css("borderBottomWidth") + " " + $(".figure-line-comps .figure-item[id=kinds] hr").css("borderStyle") + " " + $(this).css("borderColor"));
        		}

            	// 선 색
        		if (type == "lineColor") {
                	var lineColor = $(".figure-line-comps .figure-item[id=lineColor] input").val();
                	$(this).css("border-top", $(this).css("border-top").split("rgb")[0] + lineColor);
                	$(this).css("border-left", $(this).css("border-top").split("rgb")[0] + lineColor);
                	$(this).css("border-right", $(this).css("border-top").split("rgb")[0] + lineColor);
                	$(this).css("border-bottom", $(this).css("border-top").split("rgb")[0] + lineColor);
        		}
        		
        		// 선 굵기
        		if (type.startsWith("weight")) {
        			if (type.endsWith("top") || type.endsWith("all"))
        				$(this).css("border-top", $(".figure-line-comps .figure-item[id=weight-top] input").val() + "px " + $(this).css("borderStyle") + " " + $(this).css("borderColor"));
        			if (type.endsWith("left") || type.endsWith("all"))
        				$(this).css("border-left", $(".figure-line-comps .figure-item[id=weight-left] input").val() + "px " + $(this).css("borderStyle") + " " + $(this).css("borderColor"));
        			if (type.endsWith("right") || type.endsWith("all"))
        				$(this).css("border-right", $(".figure-line-comps .figure-item[id=weight-right] input").val() + "px " + $(this).css("borderStyle") + " " + $(this).css("borderColor"));
        			if (type.endsWith("bottom") || type.endsWith("all"))
        				$(this).css("border-bottom", $(".figure-line-comps .figure-item[id=weight-bottom] input").val() + "px " + $(this).css("borderStyle") + " " + $(this).css("borderColor"));
        		}

            	// 선 모서리 radius
        		if (type.startsWith("radius")) {
        			if (type.endsWith("top-left") || type.endsWith("all"))
        				$(this).css("border-top-left-radius", $(".figure-line-comps .figure-item[id=radius-top-left] input").val() + "px");
        			if (type.endsWith("top-right") || type.endsWith("all"))
        				$(this).css("border-top-right-radius", $(".figure-line-comps .figure-item[id=radius-top-right] input").val() + "px");
        			if (type.endsWith("bottom-left") || type.endsWith("all"))
        				$(this).css("border-bottom-left-radius", $(".figure-line-comps .figure-item[id=radius-bottom-left] input").val() + "px");
        			if (type.endsWith("bottom-right") || type.endsWith("all"))
        				$(this).css("border-bottom-right-radius", $(".figure-line-comps .figure-item[id=radius-bottom-right] input").val() + "px");
        		}
        		
            	// TEXT
        		
        		// font
        		if (type == "font") {
        			wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "font-family", $(".text-font-comps .text-item[id=font] .fontType").html());
        		    clearChanged("font-family");
        		}

        		// fontSize
        		if (type == "fontSize") {
        			wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "font-size", $(".text-font-comps .text-item[id=size] input").val() + "px");
        		    clearChanged("font-size");
        		}

            	// text 색
        		if (type == "textColor") {
    				var fontColor = $(".text-font-comps .text-item[id=textColor] input").val().split("#")[1];
                	var fontColor1 = parseInt(fontColor.substring(0, 2), 16);
                	var fontColor2 = parseInt(fontColor.substring(2, 4), 16);
                	var fontColor3 = parseInt(fontColor.substring(4, 6), 16);
                	
        			wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "color", "rgb(" + fontColor1 + ", " + fontColor2 + ", " + fontColor3 + ")");
        		    clearChanged("color");
        		}
        			
        		if (type == "text-effect-bold") {
            		wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "font-weight", checkAttr("bold", $(".text-dragged").length > 0 ? $(".text-dragged") : $(this)) == "700" ? 300 : 700);
        		    clearChanged("font-weight");
        		    
/*        			if (checkAttr("bold", $(".text-dragged").length > 0 ? $(".text-dragged") : $(this)) == "700") {
        				if ($(".text-dragged").length > 0) {
        					$(".text-dragged span").each(function() {
        						var cssString = "<span style=\"font-weight";
			    				var innerHTML = $(this).wrap("<div>").parent().html();
								$(this).unwrap();
								if (innerHTML.startsWith(cssString)) {
									$(this).contents().unwrap();
								}
        					});
        				} else {
        					$(this).find("span").each(function() {
        						var cssString = "<span style=\"font-weight";
			    				var innerHTML = $(this).wrap("<div>").parent().html();
								$(this).unwrap();
								if (innerHTML.startsWith(cssString)) {
									$(this).contents().unwrap();
								}
        					});
        				}
        			} else {
                		wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "font-weight", 700);
            		    clearChanged("font-weight");
        			}*/
                }
        		
        		if (type == "text-effect-italic") {
        			wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "font-style", checkAttr("italic", $(".text-dragged").length > 0 ? $(".text-dragged") : $(this)) == "italic" ? "" : "italic");
        		    clearChanged("font-style");
        		}
            	
        		if (type == "text-effect-underline") {
        			if (checkAttr("underline", $(".text-dragged").length > 0 ? $(".text-dragged") : $(this)) == "underline") {
        				if ($(".text-dragged").length > 0) {
        					$(".text-dragged span").each(function() {
        	    				var innerHTML = $(this).wrap("<div>").parent().html();
        						$(this).unwrap();
        						if (innerHTML.startsWith("<span style=\"text-decoration:underline")) {
        							$(this).contents().unwrap();
        						}
        					});
        				} else {
        					$(".ui-selected span").each(function() {
        	    				var innerHTML = $(this).wrap("<div>").parent().html();
        						$(this).unwrap();
        						if (innerHTML.startsWith("<span style=\"text-decoration:underline")) {
        							$(this).contents().unwrap();
        						}
        					});
        				}
        			} else {
            			wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "text-decoration", "underline");
        		    	clearChanged("textDecoration-underline");
        			}
        		}
        		
        		if (type == "text-effect-strikethrough") {
        			if (checkAttr("strikethrough", $(".text-dragged").length > 0 ? $(".text-dragged") : $(this)) == "line-through") {
        				if ($(".text-dragged").length > 0) {
        					$(".text-dragged span").each(function() {
        	    				var innerHTML = $(this).wrap("<div>").parent().html();
        						$(this).unwrap();
        						if (innerHTML.startsWith("<span style=\"text-decoration:line-through")) {
        							$(this).contents().unwrap();
        						}
        					});
        				} else {
        					$(".ui-selected span").each(function() {
        	    				var innerHTML = $(this).wrap("<div>").parent().html();
        						$(this).unwrap();
        						if (innerHTML.startsWith("<span style=\"text-decoration:line-through")) {
        							$(this).contents().unwrap();
        						}
        					});
        				}
        			} else {
        				wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "text-decoration", "line-through");
        				clearChanged("textDecoration-strikethrough");
        			}
        		}

            	// text 강조 색
        		if (type == "textgroundColor") {
    				var textgroundColor = $(".text-shape-comps .text-item[id=textgroundColor] input").val().split("#")[1];
                	var textgroundColor1 = parseInt(textgroundColor.substring(0, 2), 16);
                	var textgroundColor2 = parseInt(textgroundColor.substring(2, 4), 16);
                	var textgroundColor3 = parseInt(textgroundColor.substring(4, 6), 16);

        			wrapSpan($(".text-dragged").length > 0 ? $(".text-dragged") : $(this), "changed", "background", "rgb(" + textgroundColor1 + ", " + textgroundColor2 + ", " + textgroundColor3 + ")");
        		    clearChanged("background");
        		}

        		if (type == "text-sort") {
                	if ($(".text-sort[id=justify]").is(".clicked"))
                    	$(this).css("text-align", "justify");
                	else if ($(".text-sort[id=left]").is(".clicked"))
                		$(this).css("text-align", "left");
                	else if ($(".text-sort[id=center]").is(".clicked"))
                		$(this).css("text-align", "center");
                	else if ($(".text-sort[id=right]").is(".clicked"))
                		$(this).css("text-align", "right");
        		}
        		
    		});
    		
    	}

    	if (type != "") {
    		if (!type.endsWith("Color"))
    			Thumbnail();
    		lastChanged = type;
    	}
	    
    }
    
    function changeCheckbox(type, object) {
    	var target = $(".figure-item.checkbox[id=" + type + "-ratioFix]");
    	if (object.is("." + type + "-ratiofixed")) {
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
    
    // 유효성 검사 중 공백 0으로 채우기
	function pad(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

	function clearEnterable() {
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
        });
        $('.enterable input').each(function(){
            $(this).css("border", "1px solid white");
        });
	}

    function wrapTag(target, typeName, className, cssType, cssProperty) {
    	if (target != null && typeName != null) {
    	    var contents = target.extractContents();
    	    var node = document.createElement(typeName);
    	    if (className != null)
    	    	node.className += className;
    	    if (cssType != null && cssProperty != null) {
    	    	if (cssType == "textDecoration")
        		    node.style.textDecoration = cssProperty;
    	    	else
        	    	node.style.cssText = cssType + " : " + cssProperty;
    	    }
    	    node.appendChild(contents);
    	    target.deleteContents();
    	    target.insertNode(node);
    	}
    	else {
    		console.log("wrapTag 에러 발생 !!");
    	}
    }

    function wrapSpan(target, className, cssType, cssProperty) {
    	if (target.length > 0) {
    		if (target.is(".text-dragged")) {
        		target.html("<span class='" + className + "' style='" + cssType + ":" + cssProperty + ";'>" + target.html() + "</span>"); 
    		} else if (!target.is(".textarea")) {
    			if (target.find(".textarea").length > 0) {
        			target.find(".textarea").each(function() {
        	    		$(this).html("<span class='" + className + "' style='" + cssType + ":" + cssProperty + ";'>" + $(this).html() + "</span>");
        			});
    			} else {
	    			target.css(cssType, cssProperty);
    			}
    		} else {
    			target.html("<span class='" + className + "' style='" + cssType + ":" + cssProperty + ";'>" + target.html() + "</span>");
    		}
    	}
    	else {
    		console.log("wrapTag 에러 발생 !!");
    	}
    }

	function clearChanged(type) {
		
		$(".ui-selected .changed").each(function() {
			var $checkParent = $(this).parent();
			while(true) {
				if ($checkParent.is("div"))
					break;
				else if ($checkParent.text() == $(this).text()) {
					$checkParent.css(type, "");
				}
				$checkParent = $checkParent.parent();
			}
		})
		

	    $(".ui-selected .changed span").each(function() {
			if (type.startsWith("textDecoration")) {
				var spanText = $(this).wrap("<div>").parent().html();
				$(this).unwrap();
				if (type.endsWith("underline"))
					$(this).css("text-decoration", (spanText.includes("line-through") ? "line-through" : ""));
				if (type.endsWith("strikethrough")) 
					$(this).css("text-decoration", (spanText.includes("underline") ? "underline" : ""));
			}
			else 
				$(this).css(type, "");
	    });

	    $(".ui-selected .removed span").each(function() {
			$(this).css(type, "");
	    });
	    
	    $(".ui-selected .textarea span").each(function() {
			var spanText = $(this).wrap("<div>").parent().html();
			$(this).unwrap();
			if (spanText.startsWith("<span>") || spanText.startsWith("<span style=\"\">") || spanText.startsWith("<span style>")) 
				$(this).contents().unwrap();
			if ($(this).html() == "")
				$(this).remove();
	    });

		$(".ui-selected .changed").each(function() {
			$(this).removeAttr("class");
		});
		
	}

	function clearDragged() {
		$(".ui-selected span").each(function() {
			if ($(this).html() == "" && $(this).find("br").length == 0) {
				$(this).contents().unwrap();
			}
		});
		$(".text-dragged span").each(function() {
			if ($(this).children().length == 0) {
				var innerTEXT = $(this).text();
				var $checkParent = $(this).parent();
				while(true) {
					var innerHTML = $checkParent.wrap("<div>").parent().html();
					$checkParent.unwrap();
					if ($checkParent.is(".textarea"))
						break;
					else if (innerHTML.startsWith("<span style=\"background:rgb(") && innerTEXT == $checkParent.text()) {
						$checkParent.contents().unwrap();
						break;
					}
					$checkParent = $checkParent.parent();
				}
			}
		});
	}
	
	$(document).on("mousemove", ".text-editing", function() {
		if ($("#droppable").is(".ui-selectable"))
			$("#droppable").selectable("destroy");
	});

	$(document).on("mouseleave", ".text-editing", function() {
		if (!$("#droppable").is(".ui-selectable")) {
			$("#droppable").selectable({
		        filter: " > .obj",
		        start: function(){
		        	// 수정중
			    	$(".text-editing").blur();
			    	window.getSelection().removeAllRanges();
			    	$(".text-editing").find(".textarea").attr("contenteditable", "false");
			    	$(".text-editing").removeClass("text-editing");
			    	for(i = 0; i<selectedObj.length; i++){
			    		$obj = selectedObj[i];
			    		$obj.children().remove('.ui-resizable-handle');
			            if($obj.hasClass('ui-draggable'))
			            	$obj.draggable('destroy');
			            $obj.children('.ui-rotatable-handle').hide();
			            if($obj.hasClass('ui-selected'))
			            	$obj.removeClass('ui-selected');
			    	}
		            selectedObj = new Array();
		        },
		        selected: function(e, ui){
		            selectedObj.push($(ui.selected));
		        },
		        unselected: function(e, ui){
		            $(ui.unselected).children().remove('.ui-resizable-handle');
		            if($(ui.unselected).hasClass('ui-draggable'))
		                $(ui.unselected).draggable('destroy');
		            $(ui.unselected).children('.ui-rotatable-handle').hide();
		        },
		        stop: function(){
		            addControl();
			    	if ($("#droppable .ui-selected").length == 0) {
			    		$('.right-side-bar .canvas-menu').show();
			    		$('.right-side-bar .tab-menu').hide();
			    		$('.right-side-bar .tab-content').hide();
			    	}
		        }
		    });
		}
	});
	
	$(document).on("click", ".text-editing", function() {
		if ($(".text-dragged").length > 0) {
			if ($(".text-dragged").is("focusout"))
				$(".text-dragged").removeClass("focusout");
			$(".text-dragged").selectText();
		}
	});
	
	$("input").on("focusin", function() {
		if ($(".text-dragged").length > 0) {
			$(".text-dragged").addClass("focusout");
	        window.getSelection().removeAllRanges();
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
        	var str = pad(target.children("input").val().replace(/[#]/g, ""), 6);
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

    // line 클릭 시 dropdownList 출력
    function figurelineClicked() {
    	if ($(".figure-line-droplist").css("display") == "none") {
        	$(".figure-line-droplist").css({
        		top : $(".figure-item .line").position().top + 31 + $(".right-side-bar .tab-content").scrollTop(),
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

    // font 클릭 시 dropdownList component 클릭 시 변경
    function textFontChange(style){
     	$(".text-font-droplist").slideUp(100);
     	$(".text-item[id=font] .fontType").html(style);
 		applyChange("font");
		clearEnterable();
    }

    // font 클릭 시 dropdownList 출력
    function textfontClicked() {
    	if ($(".text-font-droplist").css("display") == "none") {
         	$(".text-font-droplist").css({
         		top : $(".text-item .fontType").position().top + 31,
         		left : $(".text-item .fontType").position().left - 35
         	});
         	$(".text-font-droplist").slideDown(100);
    	} else {
         	$(".text-font-droplist").slideUp(100);
    	}
    }

	//editablecontent select all text
	jQuery.fn.selectText = function() {
    	var doc = document;
    	var element = this[0];
    	if (doc.body.createTextRange) {
    		var range = document.body.createTextRange();
    		range.moveToElementText(element);
    		range.select();
    	} else if (window.getSelection) {
    		var selection = window.getSelection();        
    		var range = document.createRange();
    		range.selectNodeContents(element);
    		selection.removeAllRanges();
    		selection.addRange(range);
    	}
	};
