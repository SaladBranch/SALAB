
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

	// component 안의 input focusout
    $('.enterable input').focusout(function(){
        $(this).css("border", "1px solid white");
    });

	// component 안의 backgroundColor input 유효성검사
    $(".figure-item#backgroundColor input[type=text]").on("change keyup paste", function(event) {
    	var value = $(this).val().replace(/[^(0-9)^(a-f)^(A-F)]/g, "");
    	if (value.length > 7) {
    		value = value.substring(0, 6);
    	}
    	$(this).val("#" + value.toUpperCase());
    	if (event.keyCode == 13) {
    		$(this).focusout();
    		backgroundColorChange();
    	}
    });

	// component 안의 backgroundColor input focusout 시 색상 변화
    $(".figure-item#backgroundColor input[type=text]").on("focusout", function() {
    	backgroundColorChange();
    });

	// line dropdownList 마우스 enter 시 색상 변화
    $(".figure-line-droplist .component").on("mouseenter", function() {
    	$(".figure-line-droplist .component").each(function() {
    		$(this).css("background", "black");
    	});
    	$(this).css("background", "gray");
    });

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

    // 유효성 검사 중 공백 0으로 채우기
	function pad(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
	
	// canvas div 클릭 시 서식 값 변화
    function formatChange(object) {
    	$(".figure-shape-comps .figure-item[id=width] input").val(object.css("width").split("px")[0]);
    	$(".figure-shape-comps .figure-item[id=height] input").val(object.css("height").split("px")[0]);
    	var background = object.css("background").split("(")[1].split(")")[0].split(", ");
    	$(".figure-shape-comps .figure-item[id=backgroundColor] input").val("#" + pad((background[0]).toString(16), 2) + pad((background[1]).toString(16), 2) + pad((background[2]).toString(16), 2));
    	$(".figure-line-comps .figure-item[id=kinds] div.line hr").css({
    		border : object.children("obj-comp").css("border")
    	});
    	//alert(object.css("transform"));
    }
    
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
    	})
    }
        