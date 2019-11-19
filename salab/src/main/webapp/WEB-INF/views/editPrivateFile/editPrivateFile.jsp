<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
                    <li><a onclick="newPage()">새 페이지</a></li>
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

        <ol class="tab-content page-tab-content">
        	<li class="page-item ui-selectee ui-selected">
            	<div class="page ui-sortable-handle">
            		<div class="page-top ui-sortable-handle">
            			<div class="page-thumbnail"><img src="/salab/resources/img/whitebox.png"></div>
            		</div>
            		<div class="page-name ui-sortable-handle"><input type="text" class="page-title" value="${pageList[0].pagename }"></div>
            	</div>
            </li>
        	<c:forEach var="page" items="${pageList }" begin="1">
           			<li class="page-item">
            		<div class="page">
            			<div class="page-top">
            				<div class="page-thumbnail"><img src="/salab/resources/img/whitebox.png"></div>
            			</div>
            			<div class="page-name"><input type="text" class="page-title" value="${page.pagename }"></div>
            		</div>
            		</li>
            </c:forEach>
            <div class="newpage" onclick="newPage()">&#43;</div>
        </ol>


        
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
                    <!--정사각형-->
                    <a id="obj_square" class="geItem c_square" display="inline-block">
                        <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                            <rect x="7" y="-2" width="35" height="35" fill="transparent" stroke="#000" stroke-width="2"></rect>
                        </svg>
                    </a>
                    <!--정원(x) perfect Circle -->
                    <a id="obj_circle" class="geItem c_circle" display="inline-block">
                        <svg width="40" height="40" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                            <ellipse cx="24" cy="15" rx="17" ry="17" stroke="#000" stroke-width="2" fill="transparent"></ellipse>
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
        ${pageList[0].content }
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
            			<span>가로</span><input type="number" value="0"><span>px</span>
            		</div>
            		<div class="figure-item enterable" id="height">
            			<span>세로</span><input type="number" value="0"><span>px</span>
            		</div>
            		<div class="figure-item checkbox" id="size-ratioFix">
						<div class="checkbox"><img src="/salab/resources/img/rightsidebar_check.png"></div><span class="checkbox">도형 비율 고정</span>
            		</div>
            		<div class="figure-item enterable" id="rotation">
            			<span>회전</span><input type="number" value="0"><span>%</span>
            		</div>
            		<div class="figure-item enterable" id="backgroundColor">
            			<span>배경</span><div class="colorView"></div><input type="text" value="#FFFFFF">
            		</div>
            	</div>
            	<div class="figure-category figure-line" onclick="toggleComps(this, '.figure-line-comps');">
                	<p>&#9660;</p>LINE
            	</div>
            	<div class="figure-line-comps">
            		<div class="figure-item enterable dropdownable" id="kinds">
            			<span>종류</span><div class="line"><hr></div>
            		</div>
            		<div class="figure-item enterable" id="lineColor">
            			<span>색상</span><div class="colorView"></div><input type="text" value="#FFFFFF">
            		</div>
            		<div class="figure-item togglable" id="weight" onclick="toggleItems('weight');">
            			<span>굵기</span><p>&#9660;</p>
            		</div>
            		<div class="weight-tab">
	            		<div class="figure-item enterable" id="weight-top">
	            			<span>T</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item enterable" id="weight-left">
	            			<span>L</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item enterable" id="weight-right">
	            			<span>R</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item enterable" id="weight-bottom">
	            			<span>B</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item checkbox" id="weight-ratioFix">
							<div class="checkbox"><img src="/salab/resources/img/rightsidebar_check.png"></div><span class="checkbox">테두리 비율 고정</span>
	            		</div>
            		</div>
            		
            		<div class= "figure-line-droplist">
            			<div class="component" id="1" onclick="figurelineChange('dotted')"><hr style="border : dotted 3px black"></div>
            			<div class="component" id="2" onclick="figurelineChange('dashed')"><hr style="border : dashed 3px black"></div>
            			<div class="component" id="3" onclick="figurelineChange('solid')"><hr style="border : solid 3px black"></div>
            			<div class="component" id="4" onclick="figurelineChange('double')"><hr style="border : double 3px black"></div>
            			<div class="component" id="5" onclick="figurelineChange('ridge')"><hr style="border : ridge 3px black"></div>
            		</div>
            		
            		<div class="figure-item togglable" id="radius" onclick="toggleItems('radius');">
            			<span>모서리</span><p>&#9660;</p>
            		</div>
            		<div class="radius-tab">
	            		<div class="figure-item enterable" id="radius-top-left">
	            			<span>T - L</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item enterable" id="radius-top-right">
	            			<span>T - R</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item enterable" id="radius-bottom-left">
	            			<span>B - L</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item enterable" id="radius-bottom-right">
	            			<span>B - R</span><input type="number" value="0"><span>px</span>
	            		</div>
	            		<div class="figure-item checkbox" id="radius-ratioFix">
							<div class="checkbox"><img src="/salab/resources/img/rightsidebar_check.png"></div><span class="checkbox">모서리 비율 고정</span>
	            		</div>
            		</div>
            		
            	</div>
        	</div>
        	<div class="text-tab-content">
            	<div class="text-category text-shape" onclick="toggleComps(this, '.text-shape-comps');">
                	<p>&#9660;</p>FONT
            	</div>
            	<div class="text-font-comps">
            		<div class="text-item enterable" id="font">
            			<span>폰트</span><div class="fontType"></div><input type="hidden">
            		</div>
            		<div class="text-item enterable" id="size">
            			<span>크기</span><input type="number" value="20"><span>px</span>
            		</div>
            		<div class="text-item enterable" id="textColor">
            			<span>색상</span><div class="colorView"></div><input type="text" value="#000000">
            		</div>
            		<div class="text-item" id="effect">
            			<span>효과</span>
            		</div>
            		<div class="text-item" id="effect-list">
            			<div class="text-effect" id="bold"><img src="/salab/resources/img/text_Bold.png"></div>
            			<div class="text-effect" id="italic"><img src="/salab/resources/img/text_Italic.png"></div>
            			<div class="text-effect" id="underline"><img src="/salab/resources/img/text_Underline.png"></div>
            			<div class="text-effect" id="strikethrough"><img src="/salab/resources/img/text_Strikethrough.png"></div>
            		</div>
            		
            		<div class= "text-font-droplist">
            			<div class="component" id="1" onclick="textFontChange('굴림', 'Gulim')">굴림</div>
            			<div class="component" id="2" onclick="textFontChange('돋움', 'Dotum')">돋움</div>
            			<div class="component" id="3" onclick="textFontChange('바탕', 'Batang')">바탕</div>
            			<div class="component" id="4" onclick="textFontChange('궁서', 'Gungsuh')">궁서</div>
            			<div class="component" id="5" onclick="textFontChange('맑은 고딕', 'Malgun Gothic')">맑은 고딕</div>
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
            		<div class="text-item" id="sort-list">
            			<div class="text-sort" id="justify"><img src="/salab/resources/img/text_Justify.png"></div>
            			<div class="text-sort" id="left"><img src="/salab/resources/img/text_Left.png"></div>
            			<div class="text-sort" id="center"><img src="/salab/resources/img/text_Center.png"></div>
            			<div class="text-sort" id="right"><img src="/salab/resources/img/text_Right.png"></div>
            		</div>
            	</div>
        	</div>
        </div>
    </div>
    
    <div class="context-menu"></div>
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery-ui.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery.ui.rotatable.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/dragndrop.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/componentList.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/rightSidebar.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/shortcut.js"></script>
    <script type="text/javascript">
    	//페이지컨텐츠를 담을 전역변수
    	var list = new Array();
    $(function(){
    	//페이지 로딩시 전역변수에 pageList값을 옮겨담음
    	<c:forEach items="${pageList }" var="item">
    		list.push("${item.content }");
    	</c:forEach>
    	
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

    function toggleItems(menu){
    	var target = $("." + menu + "-tab");
		if (target.css("display") == "none"){
			$(".figure-item[id=" + menu + "] p").text("▼");
			target.slideDown(200);
		} else {
			$(".figure-item[id=" + menu + "] p").text("▶");
			target.slideUp(200);
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
            $('.top-bar-menu input').prop("checked", false);
            $('.main-toggle-menu').hide();    
        }
    });
    
    //page 탭 리스트 불러오는 ajax
    function pageTab(){
    	$.ajax({
    		url: 'pageTab.do',
    		type: 'post',
    		data: {
    			userno: ${userno},
    			fileno: ${fileno}
    		},
    		dataType: 'json',
    		success: function(data){
    			console.log(data.page[0].pageno);
    			$('.page-tab-content').html('');
    			for(var i =0; i < data.page.length; i++){
    				$('.page-tab-content').append(
        					'<li class="page-item">' +
    						'<div class="page">' +
        	                '<div class="page-top">' +
        	                    '<div class="page-thumbnail">' +
        	                        '<img src="/salab/resources/img/whitebox.png">' +
        	                    '</div>'+
        	                '</div>' +
        	                '<div class="page-name">' + 
        	                    '<input type="text" class="page-title" value="Untitled">' +
        	                '</div>' +
        	            '</div>'	+ 
        	            '</li>'
        			);
    			}
    			
    			$('.page-tab-content').append(
    					'<div class="newpage" onclick="newPage()">' +
    	                '&#43;' +
    	            '</div>'	
    			);
    		},
    		error: function(){
    			
    		}
    	});
    }
    
    function newPage(){
    	console.log('check');
    	$.ajax({
    		url: 'newPage.do',
    		type: 'post',
    		dataType: 'json',
    		data: {
    			userno: ${userno},
    			fileno: ${fileno}
    		},
    		success: function(data){
    			console.log("ok");
    			pageTab();
    		},
    		error:function(){
    			
    		}
    	});
    }
    
    //페이지 셀렉트시에 페이지를 변경시켜줄 함수
    function pageContent(index){
    	var no = index;
    	$('.canvas-container').html(list[no]);
    	$all = $('#multiselect');
    	$('#droppable').selectable({
            filter: " > .obj",
            start: function(){
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
            }
        });
        rightMouseListner();
        leftMouseListner();
        
    }
    
    function tempStorage(index){
    	var no = index;
    	list[no] = $('.canvas-container').html();
    }
    
    </script>
    
</body>
</html>