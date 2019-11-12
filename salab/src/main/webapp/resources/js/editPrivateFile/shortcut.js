var copiedObj = [];
$(document).on('keydown', function(e){
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
        copiedObj[0].removeClass("ui-selected");
        delResizable(copiedObj[0]);
        $newObj.css({
            left: Number(copiedObj[0].css('left').replace('px', '')) + 20 + 'px',
            top: Number(copiedObj[0].css('top').replace('px', '')) + 20 + 'px'
        });
        $newObj.appendTo("#droppable");
        selectedObj.push($newObj);
    }
    else{
        $all.draggable('destroy');
        $all.children().each(function(){
            $(this).removeClass('ui-selected');
            var $newObj = $(this).clone();
            $(this).draggable('disable');
            $newObj.draggable();
            $newObj.addClass('ui-selected');
            $newObj.css({
                left: Number($(this).css('left').replace('px', '')) + 20 + 'px',
                top: Number($(this).css('top').replace('px', '')) + 20 + 'px'
            });
            $('#droppable').append($newObj);
        });
        $('#droppable').append($all.children());
    }
}