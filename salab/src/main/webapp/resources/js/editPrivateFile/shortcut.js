var copiedObj = [];
$(document).on('keydown', function(e){
    if(e.keyCode == 46){
        for(i = 0; i<selectedObj.length; i++){
            selectedObj[i].remove();
        }
        selectedObj = new Array();
    }
    if(e.ctrlKey && e.keyCode == 67 && $('.ui-selected').length > 0){
        copyObject();
    }
    if(e.ctrlKey && e.keyCode == 86 && copiedObj != ""){
        pasteObject();
    }
});

function copyObject(){
    copiedObj = new Array();
    $('.ui-selected').each(function(){
         copiedObj.push($(this));
    });
}
function pasteObject(){
    var $all = $('#multiselect');
    selectedObj = new Array();
    if(copiedObj.length == 1){
        var $newObj = copiedObj[0].clone();
        $('#droppable .obj').each(function(){
            $(this).removeClass('ui-selected');
            $(this).children().remove('.ui-resizable-handle');
            $(this).children('.ui-rotatable-handle').hide();
            if($(this).hasClass('ui-draggable'))
                $(this).draggable('destroy');
        })
        
        $newObj.css({
            left: Number(copiedObj[0].css('left').replace('px', '')) + 50 + 'px',
            top: Number(copiedObj[0].css('top').replace('px', '')) + 100 + 'px'
        });
        $newObj.addClass('ui-selected');
        $newObj.appendTo("#droppable");
        selectedObj.push($newObj);
        addControl();
    }
    else{
        selectedObj = new Array();
        $all.children().each(function(){
            $(this).removeClass('ui-selected');
            if($(this).hasClass('ui-draggable'))
                $(this).draggable('destroy');
            var $newObj = $(this).clone();
            
            $newObj.addClass('ui-selected');
            $newObj.css({
                left: Number($(this).css('left').replace('px', '')) + 10 + 'px',
                top: Number($(this).css('top').replace('px', '')) + 100 + 'px'
            });
            $(this).appendTo($('#droppable'));
            $newObj.appendTo($all);
            selectedObj.push($newObj);
        });
    }
}