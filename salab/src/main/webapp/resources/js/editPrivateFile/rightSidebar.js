
//component 선택

	// component 마우스 enter
    $('.enterable').mouseenter(function() {
    	if ($(this).attr("class").split(" ")[2] != "clickedItem") {
    		if ($(this).attr("class").split(" ")[3] != "clickedItem") {
            	$(this).css({
            		border : "1px solid lightgray"
            	});
    		}
    	}
    });

	// component 마우스 leave
    $('.enterable').mouseleave(function() {
    	if ($(this).attr("class").split(" ")[2] != "clickedItem") {
        	if ($(this).attr("class").split(" ")[3] != "clickedItem") {
        		$(this).css({
        			border : "1px solid white"
        		});
        	}
    	}
    });

	// component 마우스 click
    $('.enterable').click(function(){
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
        if ($(this).attr("class").split(" ")[2] != "dropdownable")
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
    $('.figure-item#ratio-fix').mouseenter(function() {
    	$(this).children("div.checkbox").css({
    		border : "1px solid gray",
    		background : "lightgray"
    	});
    });

	// component - ratiofix 마우스 leave
    $('.figure-item#ratio-fix').mouseleave(function() {
        var thisclass = $(this).attr("class").split(" ");
        if (thisclass.includes("checked")){
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
    $('.figure-item#ratio-fix').click(function() {
    	$('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
        if ($(this).attr("class").split(" ")[2] != "dropdownable")
        	$(".figure-line-droplist").css({ display : "none" });
        var thisclass = $(this).attr("class").split(" ");
        if (thisclass.includes("checked")){
            $(this).removeClass("checked");
        	$(this).children("div.checkbox").css({
        		border : "1px solid lightgray"
        	});
        	$(this).children("div.checkbox").children("img").css({
        		display : "none"
        	});
        } else {
            $(this).addClass("checked");
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
    	
    	switch(type) {
    		case "width" : 
    	    	if (event.type="keyup" ? event.keyCode == 13 : event.type == "focusout") {
    	    		var ratioclass = $(".figure-shape-comps #ratio-fix").attr("class").split(" ");
    	    		if (ratioclass.includes("checked")) {
    	    			var pastHeight = $(".figure-shape-comps .figure-item[id=height] input").val();
    	    			$(".figure-shape-comps .figure-item[id=height] input").val(Math.round(filterNumber(value) / $(".ui-selected").css("width").split("px")[0] * pastHeight));
    	    		}
    	    	}
    			$(this).val(filterNumber(value));
    			break;
    		case "height" :
    	    	if (event.type="keyup" ? event.keyCode == 13 : event.type == "focusout") {
    	    		var ratioclass = $(".figure-shape-comps #ratio-fix").attr("class").split(" ");
	    			if (ratioclass.includes("checked")) {
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
    			var ratioclass = $(".figure-line-comps #ratio-fix").attr("class").split(" ");
    			if (ratioclass.includes("checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "weight-left" :
    			var ratioclass = $(".figure-line-comps #ratio-fix").attr("class").split(" ");
    			if (ratioclass.includes("checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "weight-right" :
    			var ratioclass = $(".figure-line-comps #ratio-fix").attr("class").split(" ");
    			if (ratioclass.includes("checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    		case "weight-bottom" :
    			var ratioclass = $(".figure-line-comps #ratio-fix").attr("class").split(" ");
    			if (ratioclass.includes("checked")) {
    		    	$(".figure-line-comps .figure-item[id=weight-top] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-left] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-right] input").val(filterNumber(value));
    		    	$(".figure-line-comps .figure-item[id=weight-bottom] input").val(filterNumber(value));
    			} else {
        			$(this).val(filterNumber(value));
    			}
    			break;
    	}

    	if (event.type="keyup" ? event.keyCode == 13 : event.type == "focusout") {
    		// component 도 select 해제할건가 정하기
    		$(this).css("border", "1px solid white");
    		applyChange();
    		$(this).blur();
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
    }

	// line dropdownList 마우스 enter 시 색상 변화
    $(".figure-line-droplist .component").on("mouseenter", function() {
    	$(".figure-line-droplist .component").each(function() {
    		$(this).css("background", "black");
    	});
    	$(this).css("background", "gray");
    });
    
// line style 선택
    
// canvas div 값 가져오기

	// canvas div 클릭 시 서식 값 변화
    function formatChange(object) {
    	var target = $(object).children(".obj-comp");
    	
    	// 가로
    	$(".figure-shape-comps .figure-item[id=width] input").val(object.css("width").split("px")[0]);
    	
    	// 세로
    	$(".figure-shape-comps .figure-item[id=height] input").val(object.css("height").split("px")[0]);
    	
    	// 회전율
    	var radius = object.css("transform").split("(")[1].split(")")[0].split(", ");
    	var rotate = Math.round(Math.atan2(radius[1], radius[0]) * (180/Math.PI));
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
    }

// canvas div 값 가져오기
    
// canvas div에 값 적용시키기

	// input 변화
    function applyChange() {

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
    }

// canvas div에 값 적용시키기

    // 유효성 검사 중 공백 0으로 채우기
	function pad(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
 