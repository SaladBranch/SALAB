
    $('.enterable').mouseenter(function() {
    	if ($(this).attr("class").split(" ")[2] != "clickedItem") {
        	$(this).css({
        		border : "1px solid lightgray"
        	});
    	}
    });

    $('.enterable').mouseleave(function() {
    	if ($(this).attr("class").split(" ")[2] != "clickedItem") {
        	$(this).css({
        		border : "1px solid white"
        	});
    	}
    });
    
    $('.enterable').click(function(){
        $('.enterable').each(function(){
            $(this).removeClass('clickedItem');
            $(this).css("border", "1px solid white");
            $(this).children("input").css("border", "1px solid white");
        });
        $(this).addClass('clickedItem');
        $(this).css("border", "1px solid black");
    	$(this).children("input").focus();
        $(this).children("input").css("border", "1px solid skyblue");
    });

    $('.enterable input').focusout(function(){
        $(this).css("border", "1px solid white");
    });

    $('#droppable .obj').click(function(){
    	formatChange(this);
    });
    
    function formatChange(object) {
    	alert("object class : " + object.attr("class"));
    }
