var copiedObj = [];
var cutted = 0; //복사인지, 잘라내기한건지 구분하기 위한 변수
$(document).on('keydown', function(e){
    if(e.keyCode == 46){
        deleteObject();
    }
    if(e.ctrlKey && e.keyCode == 67 && $('.ui-selected').length > 0){
        copyObject();
    }
    if(e.ctrlKey && e.keyCode == 88 && $('.ui-selected').length > 0){
        cutObject();
    }
    if(e.ctrlKey && e.keyCode == 86 && copiedObj != ""){
        pasteObject();
    }
});
function deleteObject(){
    for(i = 0; i<selectedObj.length; i++){
        selectedObj[i].remove();
    }
    selectedObj = new Array();   
}

function copyObject(){
    copiedObj = new Array();
    $('.ui-selected').each(function(){
         copiedObj.push($(this));
    });
}
function cutObject(){
    copiedObj = new Array();
    $('.ui-selected').each(function(){
        copiedObj.push($(this));
        $(this).remove();
    });
    cutted = 1;
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
        });
        
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
        for(i = 0; i<copiedObj.length; i++){
            var $newObj = copiedObj[i].clone();
            copiedObj[i].removeClass('ui-selected');
            $newObj.css({
                left: Number(copiedObj[i].css('left').replace('px', '')) + 50 + 'px',
                top: Number(copiedObj[i].css('top').replace('px', '')) + 100 + 'px'
            });
            $newObj.addClass('ui-selected');
            $newObj.appendTo($all);
            selectedObj.push($newObj);
        }
        console.log(selectedObj.length);
        addControl();

    }
    if(cutted == 1){
        copiedObj = new Array();
        cutted = 0;
    }
}