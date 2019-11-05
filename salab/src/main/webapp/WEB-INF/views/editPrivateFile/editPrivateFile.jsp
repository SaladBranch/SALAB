<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width:device-width, initial-scale:1.0;">
    <link rel="stylesheet" href="/salab/vendors/css/normalize.css" type="text/css">
    <link rel="stylesheet" href="/salab/vendors/css/grid.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/common.css" type="text/css">
    <link rel="shortcut icon" type="image/x-icon" href="/salab/resources/img/logo.png">
    
    <link rel="stylesheet" href="/salab/resources/css/editPrivateFile/editFile.css" type="text/css">
    <link rel="stylesheet" href="/salab/resources/css/recentFile/recentFileMQ.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <title>파일명 | Salab</title>
</head>
<body>
    <header>
    <nav class="top-bar">
        <div class="top-bar-title">
            <div class="top-bar-titleText"><a href="privateFile.do">개인 파일</a> / 파일명</div>
        </div>
        <div class="top-left-menus">
            <div class="top-bar-menu">
                <input type="checkbox">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <button><img src="/salab/resources/img/leftarrow.png"></button>
            <button><img src="/salab/resources/img/rightarrow.png"></button>
            <button><i class="far fa-play-circle"></i></button>
        </div>
        <div class="top-bar-children" id="top-bar-right">
            <div></div>
            <div class="top-right-menus">
                <div class="canvas-size">
                    <p>57%<i class="fas fa-chevron-down"></i></p>
                </div>
                <button class="open-edit" onclick="toggleEdit(this);"><img src="/salab/resources/img/openedit_blank.png"></button>
            </div>
        </div>
    </nav>
    </header>
       
    <div class="left-side-bar">
        <div class="tab-menu">
            <div class="tab page-tab active-tab">Page</div>
            <div class="tab comp-tab">Comp</div>
            <div class="tab lib-tab">Lib</div>
        </div>
        <div class="tab-content page-tab-content">
            <div class="page">
                <div class="page-top">
                    <div class="page-no">1.</div>
                    <div class="page-thumbnail">
                        <img src="/salab/resources/img/whitebox.png">
                    </div>
                </div>
                <div class="page-name">
                    <input type="text" class="page-title" value="Untitled">
                </div>
            </div>
            
            <div class="newpage">
                &#43;
            </div>
        </div>
        
        <div class="tab-content comp-tab-content">
            <div class="searchbox">
                <i class="fas fa-search"></i><input type="text" placeholder="검색">
            </div>
            <div class="comp-category common-shape" onclick="toggleComps(this, '.common-shape-comps');">
                <p>&#9660;</p>기본도형(common shape)
            </div>
              <div class="common-shape-comps">
                <div style="padding:5px;">
                    <!--직사각형-->
                    <a class="geItem c_rectangle" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <rect x="4" y="5" width="40" height="20" fill="transparent" stroke="#000" stroke-width="2"></rect>
                    </svg>
                    </a>
                    <!--모서리가 둥근 직사각형-->
                    <a class="geItem c_brectangle" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <rect x="4" y="5" rx="5" ry="5" width="40" height="20" fill="transparent" stroke="#000" stroke-width="2"></rect>
                    </svg>
                    </a>
                    <!--Heading-->
                    <a class="geItem c_heading" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <g transform="scale(0.35)">
                        <foreignObject x="4" y="15" width="180" height="160">
                            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 15px;">
                                <h1>Heading</h1>
                            </div>
                        </foreignObject>
                        </g>
                    </svg>
                    </a>
                    <!--글타래-->
                    <a class="geItem c_paragraph" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <g transform="scale(0.3)">
                        <foreignObject x="1" y="-10" width="300" height="160">
                            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 15px;">
                                <h1>Heading</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et suscipit modi quaerat, porro.Lorem ipsum dolor sit amet.</p>
                            </div>
                        </foreignObject>
                        </g>
                    </svg>
                    </a>
                    <!--타원-->
                    <a class="geItem c_ellipse" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <ellipse cx="24" cy="15" rx="20" ry="10" stroke="#000" stroke-width="2" fill="transparent"></ellipse>
                    </svg>
                    </a>
                </div>
            </div>
            <div class="comp-category form-control">
                <p>&#9654;</p>폼(form)
            </div>
        </div>
        
        <div class="tab-content lib-tab-content">
            
        </div>
    </div>
    <!--<div class="component">
        <div class="draggable rectangle ui-widget-content"></div>
    </div>-->
    
    
    <div class="canvas-container">
        <div id="droppable" class="canvas ui-widget-content">
            
        </div>
    </div>
    
    <div class="right-side-bar">
        <div class="tab-menu">
            <div class="tab figure-tab active-tab">Figure</div>
            <div class="tab text-tab">Text</div>
        </div>
    </div>
    
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery-ui.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/dragndrop.js"></script>
    <script type="text/javascript">
    $(function(){
        $('.page-tab-content').show();
        $('.comp-tab-content').hide();
        $('.lib-tab-content').hide();
    });
    $('.page-tab').click(function(){
        $('.left-side-bar .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.page-tab').addClass('active-tab');
        $('.page-tab-content').show();
        $('.comp-tab-content').hide();
        $('.lib-tab-content').hide();
        
    });
    $('.comp-tab').click(function(){
        $('.left-side-bar .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.comp-tab').addClass('active-tab');
        $('.page-tab-content').hide();
        $('.comp-tab-content').show();
        $('.lib-tab-content').hide();
       
    });
    $('.lib-tab').click(function(){
        $('.left-side-bar .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.lib-tab').addClass('active-tab');
        $('.page-tab-content').hide();
        $('.comp-tab-content').hide();
        $('.lib-tab-content').show();
        
    });
        
    function toggleComps(menu, comp){
        if($(comp).css("display") == "none"){
            $(comp).show();
            $(menu).children("p").text("▼");
        }else{
            $(comp).hide();
            $(menu).children("p").text("▶");
        }
    }
        
    function toggleEdit(btn){
        if($('.right-side-bar').css("display") == "none"){
            $(btn).children("img").attr("src", "/salab/resources/img/openedit_full.png");
            $('.right-side-bar').show();
        }else{
            $(btn).children("img").attr("src", "/salab/resources/img/openedit_blank.png");
            $('.right-side-bar').hide();
        }
    }
    </script>
</body>
</html>