var elementCount = 1;

var target = '.canvas';
var startX = 0;
var startY = 0;
var left, top, width, height;

$('.geItem').on("mousedown", function(e){
    startX = e.clientX;
    startY = e.clientY;
    var temp = $(this).children("svg").clone();
    var comp = temp.children();
    temp.attr({
        width: '200px',
        height: '100px'
    });
    comp.attr({
        'stroke-width':"1" 
    });
    $(target).append(temp);
})