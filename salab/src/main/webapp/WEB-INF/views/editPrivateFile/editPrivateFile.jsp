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
    <link rel="stylesheet" href="/salab/resources/css/editPrivateFile/components.css" type="text/css">
    
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
        <div class="main-toggle-menu">
        <ul>
            <li><a href="recentFile.do">파일 페이지로 이동</a></li>
            <hr>
            <li id="toggle-page">
                페이지<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-page-menu">
                    <li><a href="#">새 페이지</a></li>
                    <li><a href="#">페이지 복사</a></li>
                    <li><a href="#">페이지 삭제</a></li>
                    <li><a href="#">페이지 이름 변경</a></li>
                    <li><a href="#">저장</a></li>
                    <li><a href="#">전체 저장</a></li>
                    <li><a href="#">내보내기</a></li>
                    <li><a href="#">전체 내보내기</a></li>
                </ul>
            </li>
            
            <li id="toggle-edit">
                편집<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-edit-menu">
                    <li><a href="#">실행취소</a></li>
                    <li><a href="#">다시실행</a></li>
                    <li><a href="#">삭제하기</a></li>
                    <li><a href="#">잘라내기</a></li>
                    <li><a href="#">복사</a></li>
                    <li><a href="#">붙여넣기</a></li>
                    <li><a href="#">개인 라이브러리</a></li>
                </ul>
            </li>
            <li id="toggle-sort">
                정렬<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-sort-menu">
                    <li><a href="#">그룹</a></li>
                    <li><a href="#">그룹해제</a></li>
                    <li id="toggle-sort-order">
                    순서<span><i class="fas fa-caret-right"></i></span>
                        <ul class="toggle-sort-order">
                            <li><a href="#">맨 앞으로</a></li>
                            <li><a href="#">앞으로</a></li>
                            <li><a href="#">맨 뒤로</a></li>
                            <li><a href="#">뒤로</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li id="toggle-insert">
                삽입<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-insert-menu">
                    <li><a href="#">이미지</a></li>
                    <li><a href="#">테이블</a></li>
                    <li><a href="#">메모</a></li>
                </ul>
            </li>
            <li id="toggle-look">
                 보기<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-look-menu">
                    <li><a href="#">격자무늬 보이기</a></li>
                    <li><a href="#">웹 테스트</a></li>
                </ul>
            </li>
        </ul>
    </div>
    
    <div class="focus"></div>
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
                    <a id="obj_rect" class="geItem c_rectangle" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <rect x="4" y="5" width="40" height="20" fill="transparent" stroke="#000" stroke-width="2"></rect>
                    </svg>
                    </a>
                    <!--모서리가 둥근 직사각형-->
                    <a id="obj_brect" class="geItem c_brectangle" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <rect x="4" y="5" rx="5" ry="5" width="40" height="20" fill="transparent" stroke="#000" stroke-width="2"></rect>
                    </svg>
                    </a>
                    <!--Heading-->
                    <a id="obj_heading" class="geItem c_heading" display="inline-block">
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
                    <a id="obj_paragraph" class="geItem c_paragraph" display="inline-block">
                    <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                        <g transform="scale(0.3)">

                        <foreignObject x="1" y="-10" width="300" height="160">
                            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 15px;">
                                <h1>Heading</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et suscipit modi quaerat, porro.Lorem ipsum dolor sit amet.</p>
                            </div>
                        </foreignObject>
                    </svg>
                    </a>
                    <!--타원-->
                    <a id="obj_ellipse" class="geItem c_ellipse" display="inline-block">
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
        <div class="tab-content">
        	<div class="figure-tab-content">
            	<div class="figure-category figure-shape" onclick="toggleComps(this, '.figure-shape-comps');">
                	<p>&#9660;</p>SHAPE
            	</div>
            	<div class="figure-shape-comps">
            		<div class="figure-item enterable" id="width">
            			<span>가로</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item enterable" id="height">
            			<span>세로</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item" id="ratio-fix">
            			<input type="checkbox" name="ratio" value="가나다라">체크박스가안나와요ㅠ_ㅠ
            		</div>
            		<div class="figure-item enterable" id="rotation">
            			<span>회전</span><input type="number" value="20"><span>%</span>
            		</div>
            		<div class="figure-item enterable" id="backgroundColor">
            			<span>배경</span><div class="colorView"></div><input type="text" value="#000000">
            		</div>
            	</div>
            	<div class="figure-category figure-line" onclick="toggleComps(this, '.figure-line-comps');">
                	<p>&#9660;</p>LINE
            	</div>
            	<div class="figure-line-comps">
            		<div class="figure-item enterable" id="kinds">
            			<span>종류</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item enterable" id="width">
            			<span>색상</span><div class="colorView"></div><input type="text" value="#000000">
            		</div>
            		<div class="figure-item" id="weight">
            			<span>굵기</span>
            		</div>
            		<div class="figure-item enterable" id="weight-top">
            			<span>T</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item enterable" id="weight-left">
            			<span>L</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item enterable" id="weight-right">
            			<span>R</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item enterable" id="weight-bottom">
            			<span>B</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="figure-item" id="ratio-fix">
            			<input type="checkbox" name="ratio" value="가나다라">너두? 야나두!
            		</div>
            	</div>
        	</div>
        	<div class="text-tab-content">
            	<div class="text-category text-shape" onclick="toggleComps(this, '.text-shape-comps');">
                	<p>&#9660;</p>FONT
            	</div>
            	<div class="text-font-comps">
            		<div class="text-item enterable" id="font">
            			<span>폰트</span><select></select>
            		</div>
            		<div class="text-item enterable" id="size">
            			<span>크기</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="text-item enterable" id="textcolor">
            			<span>색상</span><div class="colorView"></div><input type="text" value="#000000">
            		</div>
            		<div class="text-item" id="effect">
            			<span>효과</span>
            		</div>
            		<div class="text-item" id="effect">
            			<span>효과</span>
            		</div>
            	</div>
            	<div class="text-category text-shape" onclick="toggleComps(this, '.text-shape-comps');">
                	<p>&#9660;</p>SHAPE
            	</div>
            	<div class="text-shape-comps">
            		<div class="text-item enterable" id="textgroundcolor">
            			<span>강조</span><div class="colorView"></div><input type="text" value="#000000">
            		</div>
            		<div class="text-item" id="sort">
            			<span>정렬</span>
            		</div>
            		<div class="text-item" id="sort">
            			<span>정렬</span>
            		</div>
            	</div>
        	</div>
        </div>
    </div>
    
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery-ui.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery.ui.rotatable.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/dragndrop.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/componentList.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/rightSidebar.js"></script>
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
            $(comp).slideDown(200);
            $(menu).children("p").text("▼");
        }else{
            $(comp).slideUp(200);
            $(menu).children("p").text("▶");
        }
    }
        
    function toggleEdit(btn){
        if($('.right-side-bar').css("display") == "none"){
        	$(btn).children("img").attr("src", "/salab/resources/img/openedit_full.png");
            $('.right-side-bar').fadeIn(300);
        }else{
            $(btn).children("img").attr("src", "/salab/resources/img/openedit_blank.png");
            $('.right-side-bar').fadeOut(300);
            editable = "false";
        }
    }

    $('.figure-tab').click(function(){
        $('.tab-menu .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.figure-tab').addClass('active-tab');
        $('.figure-tab-content').show();
        $('.text-tab-content').hide();
    });
    
    $('.text-tab').click(function(){
        $('.tab-menu .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.text-tab').addClass('active-tab');
        $('.figure-tab-content').hide();
        $('.text-tab-content').show();
    });

    $('.top-bar-menu input').click(function(){
        if($(this).is(':checked')){
            $('.main-toggle-menu').show();
        }else{
            $('.main-toggle-menu').hide();
        }
    });
        
    $(document).on('click', function(e){
        if(!$(e.target).is($('.top-bar-menu input'))){
            console.log("ㅇ")
            $('.top-bar-menu input').prop("checked", false);
            $('.main-toggle-menu').hide();    
        }
    });
    </script>
</body>
</html>