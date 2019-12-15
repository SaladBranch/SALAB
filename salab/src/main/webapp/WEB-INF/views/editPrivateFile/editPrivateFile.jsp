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
    <link rel="stylesheet" href="/salab/vendors/css/jquery.minicolors.css" type="text/css">
    
    <script src="https://kit.fontawesome.com/08d0951667.js"></script>
    <title>${pfile.pfiletitle } | Salab</title>
</head>
<body>
    <header>
    <nav class="top-bar">
        <div class="top-bar-title">
            <div class="top-bar-titleText"><a href="privateFile.do">개인 파일</a> / <input id="file-title" type="text" value="${pfile.pfiletitle }"></div>
        </div>
        <div class="top-left-menus">
            <div class="top-bar-menu">
                <input type="checkbox">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <button onclick="undoPage();" id="top-undo-btn"><img src="/salab/resources/img/leftarrow_disabled.png"></button>
            <button onclick="redoPage();" id="top-redo-btn"><img src="/salab/resources/img/rightarrow_disabled.png"></button>
            <button onclick="memo();" id="top-memo-btn"><img src="/salab/resources/img/memo-icon.png"></button>
            <button onclick="upImage();" id="top-image-btn"><img src="/salab/resources/img/img-icon.png"></button>
            <button><i class="far fa-play-circle" onclick="popup();"></i></button>
        </div>
        <div class="top-bar-children" id="top-bar-right">
            <div></div>
            <div class="top-right-menus">
                <div class="canvas-size">
                    <p><span>100%</span><i class="fas fa-chevron-down"></i></p>
                    <div class="top-canvas-opts">
                        <input type="number" min="10" max="500" onkeyup="linkZoom(this.value);">
                        <hr>
                        <ul>
                            <li>25%</li>
                            <li>50%</li>
                            <li>75%</li>
                            <li>100%</li>
                            <li>150%</li>
                            <li>200%</li>
                            <li>300%</li>
                            <li>400%</li>
                        </ul>
                    </div>
                </div>
                <button class="open-edit" onclick="toggleEdit(this);"><img src="/salab/resources/img/openedit_full.png"></button>
            </div>
        </div>
    </nav>
    </header>
        <div class="main-toggle-menu">
        <ul>
            <li><a href="recentFile.do?sort=recent">파일 페이지로 이동</a></li>
            <hr>
            <li id="toggle-page">
                페이지<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-page-menu">
                    <li><a onclick="newPage()">새 페이지</a></li>
                    <li><a href="javascript:" onclick="pageCopy();">페이지 복사</a></li>
                    <li><a href="javascript:" onclick="pageDelete();">페이지 삭제</a></li>
                    <li><a href="javascript:">페이지 이름 변경</a></li>
                    <li><a href="javascript:" onclick="pageSave();">저장</a></li>
                    <li><a href="javascript:" onclick="pageAllSave();">전체 저장</a></li>
                    <li><a href="javascript:" onclick="exportPdf();">내보내기</a></li>
                    <li><a href="javascript:" onclick="exportAllPdf();">전체 내보내기</a></li>
                </ul>
            </li>
            
            <li id="toggle-edit">
                편집<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-edit-menu">
                    <li><a href="javascript:undoPage();">실행취소</a></li>
                    <li><a href="javascript:redoPage();">다시실행</a></li>
                    <li><a href="javascript:deleteObject();">삭제하기</a></li>
                    <li><a href="javascript:cutObject();">잘라내기</a></li>
                    <li><a href="javascript:copyObject();">복사</a></li>
                    <li><a href="javascript:pasteObject();">붙여넣기</a></li>
                    <li><a href="javascript:savetoLibrary();">개인 라이브러리</a></li>
                </ul>
            </li>
            <li id="toggle-sort">
                정렬<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-sort-menu">
                    <li><a href="javascript:groupObject();">그룹</a></li>
                    <li><a href="javascript:ungroupObject();">그룹해제</a></li>
                    <li id="toggle-sort-order">
                    순서<span><i class="fas fa-caret-right"></i></span>
                        <ul class="toggle-sort-order">
                            <li><a href="javascript:send_forward();">맨 앞으로</a></li>
                            <li><a href="javascript:send_front();">앞으로</a></li>
                            <li><a href="javascript:send_backward();">맨 뒤로</a></li>
                            <li><a href="javascript:send_back();">뒤로</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li id="toggle-insert">
                삽입<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-insert-menu">
                    <li><a href="javascript:" onclick="upImage();">이미지</a></li>
                    <li><a href="#">테이블</a></li>
                    <li><a href="javascript:" onclick="memo();">메모</a></li>
                </ul>
            </li>
            <li id="toggle-look">
                 보기<span><i class="fas fa-caret-right"></i></span>
                <ul class="toggle-look-menu">
                    <li><a href="#">격자무늬 보이기</a></li>
                    <li><a href="javascript:" onclick="popup();">웹 테스트</a></li>
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
            			<div class="page-thumbnail"></div>
            			<span class="isModified"></span>
            		</div>
            		<div class="page-name ui-sortable-handle"><input type="text" class="page-title" value="${pageList[0].pagename }"></div>
            	</div>
            </li>
        	<c:forEach var="page" items="${pageList }" begin="1">
           			<li class="page-item">
            		<div class="page">
	            		<div class="page-top">
	            			<div class="page-thumbnail"></div>
	            			<span class="isModified"></span>
	            		</div>
            			<div class="page-name"><input type="text" class="page-title" value="${page.pagename }"></div>
            		</div>
            		</li>
            </c:forEach>
            <div class="newpage" onclick="newPage()">&#43;</div>
        </ol>


        
        <div class="tab-content comp-tab-content">
            <div class="searchbox">
                <i class="fas fa-search"></i><input id="search-comp" type="text" placeholder="검색" onkeypress="if(event.keyCode==13) {searchComp(); return false;}">
            </div>
            <div class="comp-searchResult"></div>
            <div class="comp-category common-shape" onclick="toggleComps(this, '.common-shape-comps');">
                <p>&#9660;</p>기본도형(common shape)
            </div>
              <div class="common-shape-comps">
                <div style="padding:4px;">
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
            <div class="comp-category form-control" onclick="toggleComps(this, '.form-control-comps');">
                <p>&#9654;</p>폼(form)
            </div>
            <div class="form-control-comps">
               <div style="padding: 4px;">
                  <!-- Input text -->
                  <a id="obj_textInput" class="geItem c_textInput" display="inline-block" title="텍스트 input">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.25)">
                  			<foreignObject x="1" y="45" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 15px;">
                  					<input type="text" placeholder="내용 입력">
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Input button_Normal_A -->
                  <a id="obj_buttonInput_Normal_A" class="geItem c_buttonInput_Normal_A" display="inline-block" title="버튼">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.25)">
                  			<foreignObject x="1" y="23" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 35px; margin-left: 25px;">
                  					<input type="button" value="Button" style="width: 150px; height: 80px; color: #fff; background-color: #3498db; border-radius: 4px;">
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Input button_Normal_B -->
                  <a id="obj_buttonInput_Normal_B" class="geItem c_buttonInput_Normal_B" display="inline-block" title="버튼">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.25)">
                  			<foreignObject x="1" y="23" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 35px; margin-left: 25px;">
                  					<input type="button" value="Button" style="width: 150px; height: 80px; color: #fff; background-color: #c9c9c9; border-radius: 4px;">
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Input button_Long_A -->
                  <a id="obj_buttonInput_Long_A" class="geItem c_buttonInput_Long_A" display="inline-block" title="긴 버튼">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.25)">
                  			<foreignObject x="1" y="40" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 22px; margin-left: 5px;">
                  					<input type="button" value="Button" style="width: 185px; height: 40px; color: #fff; background-color: #3498db; border-radius: 4px;">
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Input button_Long_B -->
                  <a id="obj_buttonInput_Long_B" class="geItem c_buttonInput_Long_B" display="inline-block" title="긴 버튼">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.25)">
                  			<foreignObject x="1" y="40" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 23px; margin-left: 5px;">
                  					<input type="button" value="Button" style="width: 185px; height: 40px; color: #fff; background-color: #c9c9c9; border-radius: 4px;">
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Plus Btn -->
                  <a id="obj_plusBtn" class="geItem c_plusBtn" display="inline-block" title="항목 추가">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.3)">
                  			<foreignObject x="1" y="25" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 50px; margin-left: 50px;">
                  					<div style="width: 55px; height: 55px; color: #222; background-color: #c9c9c9; border-radius: 2px;text-align: center; font-weight: bold;">+</div>
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Minus Btn -->
                  <a id="obj_minusBtn" class="geItem c_minusBtn" display="inline-block" title="항목 삭제">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.3)">
                  			<foreignObject x="1" y="25" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 50px; margin-left: 50px;">
                  					<div style="width: 55px; height: 55px; color: #222; background-color: #c9c9c9; border-radius: 2px;text-align: center; font-weight: bold;">-</div>
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
                  <!-- Message -->
                  <a id="obj_messageForm" class="geItem c_messageForm" display="inline-block" title="메세지">
                  	<svg width="80" height="80" xmlns="http://w3.org/2000/svg" version="1.1" viewbox="0 0 50 30">
                  		<g transform="scale(0.3)">
                  			<foreignObject x="1" y="23" width="300" height="160">
                  				<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 22px; margin-left: 15px;">
                  					<div style="position: absolute;">
										<div style="color:#fff;background-color:rgb(46, 204, 113);padding:15px;border-radius:4px;text-align:center;">Message</div>
										<span style="position:absolute;width:0;height:0;right:0;top:50%;margin-right:-16px;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:16px solid rgb(46, 204, 113);"></span>
									</div>
                				</div>
                  			</foreignObject>
                  		</g>
                  	</svg>
                  </a>
               </div>
            </div>  
        </div>
        <div class="tab-content lib-tab-content">
            <div class="searchbox">
                <i class="fas fa-search"></i><input type="text" placeholder="검색">
            </div>
        </div>
        
    </div>
    
    <div class="canvas-container">
        ${pageList[0].content }
        <div id="guide-h" class="guide"></div>
	    <div id="guide-v" class="guide"></div>
    </div>
    
    <div class="right-side-bar">
        <div class="canvas-menu">
            <div class="canvas-tab active-tab">Canvas</div>
            <div class="canvas-view">
                <h5>view</h5>
                <div class="canvas-opt" id="cansvas-grid">
                    <label class="chk-label grid-chk">격자무늬 보이기<input type="checkbox"><span class="checkmark"></span></label>
                </div>
                <div class="canvas-opt" id="canvas-background">
                    <label class="chk-label back-chk">캔버스 배경<input type="checkbox"><span class="checkmark"></span></label>
                </div>
            </div>
            <div class="canvas-sizing">
                <h5>size</h5>
                <div id="canvas-sizing">Desktop <span>1440x1024</span></div>
                <span class="open-options">&#9660;</span>
                <ul id="canvas-sizing-opt">
                    <li>Desktop <span>1440x1024</span></li>
                    <li>MacBook <span>1152x700</span></li>
                    <li>MacBook Pro <span>1440x900</span></li>
                    <li>iMac <span>1280x720</span></li>
                    <hr>
                    <li>iPad Pro <span>1024x1336</span></li>
                    <li>iPad <span>768x1024</span></li>
                    <li>iPhone 6/7/8 <span>375x667</span></li>
                    <li>Android <span>360x640</span></li>
                    <hr>
                    <li>16:9 <span>1600x900</span></li>
                    <li>16:10 <span>1920x1200</span></li>
                    <li>4:3 <span>1600x1200</span></li>
                    <hr>
                    <li>custom</li>
                </ul>
                <label class="radio-label">portrait<input type="radio"><span class="radiomark"></span></label>
                <label class="radio-label">landscape<input type="radio"><span class="radiomark"></span></label>
                <div class='canvas-custom-sizing'>
	            	<div id='custom-width'><input type='number'>px</div><span>&times;</span>
	            	<div id='custom-height'><input type='number'>px</div>
	           	</div>
            </div>
            
        </div>
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
            			<span class="tab-content-text">가로</span><input type="number" value="0"><span class="tab-content-text">px</span>
            		</div>
            		<div class="figure-item enterable" id="height">
            			<span class="tab-content-text">세로</span><input type="number" value="0"><span class="tab-content-text">px</span>
            		</div>
            		<div class="figure-item checkbox" id="size-ratioFix">
						<div class="checkbox"><img src="/salab/resources/img/rightsidebar_check.png"></div><span class="checkbox">도형 비율 고정</span>
            		</div>
            		<div class="figure-item enterable" id="rotation">
            			<span class="tab-content-text">회전</span><input type="number" value="0"><span class="tab-content-text">%</span>
            		</div>
            		<div class="figure-item enterable" id="backgroundColor">
            			<span class="tab-content-text">배경</span><input class="colorView" id="background">
            		</div>
            	</div>
            	<div class="figure-category figure-line" onclick="toggleComps(this, '.figure-line-comps');">
                	<p>&#9660;</p>LINE
            	</div>
            	<div class="figure-line-comps">
            		<div class="figure-item enterable dropdownable" id="kinds">
            			<span class="tab-content-text">종류</span><div class="line"><hr></div>
            		</div>
            		<div class="figure-item enterable" id="lineColor">
            			<span class="tab-content-text">색상</span><input class="colorView" id="line">
            		</div>
            		<div class="figure-item togglable" id="weight" onclick="toggleItems('weight');">
            			<span class="tab-content-text">굵기</span><p>&#9660;</p>
            		</div>
            		<div class="weight-tab">
	            		<div class="figure-item enterable" id="weight-top">
	            			<span class="tab-content-text">T</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item enterable" id="weight-left">
	            			<span class="tab-content-text">L</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item enterable" id="weight-right">
	            			<span class="tab-content-text">R</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item enterable" id="weight-bottom">
	            			<span class="tab-content-text">B</span><input type="number" value="0"><span class="tab-content-text">px</span>
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
            			<span class="tab-content-text">모서리</span><p>&#9660;</p>
            		</div>
            		<div class="radius-tab">
	            		<div class="figure-item enterable" id="radius-top-left">
	            			<span class="tab-content-text">T - L</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item enterable" id="radius-top-right">
	            			<span class="tab-content-text">T - R</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item enterable" id="radius-bottom-left">
	            			<span class="tab-content-text">B - L</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item enterable" id="radius-bottom-right">
	            			<span class="tab-content-text">B - R</span><input type="number" value="0"><span class="tab-content-text">px</span>
	            		</div>
	            		<div class="figure-item checkbox" id="radius-ratioFix">
							<div class="checkbox"><img src="/salab/resources/img/rightsidebar_check.png"></div><span class="checkbox">모서리 비율 고정</span>
	            		</div>
            		</div>
            		
            	</div>
        	</div>
        	<div class="text-tab-content">
            	<div class="text-category text-shape" onclick="toggleComps(this, '.text-font-comps');">
                	<p>&#9660;</p>FONT
            	</div>
            	<div class="text-font-comps">
            		<div class="text-item enterable dropdownable" id="font">
            			<span class="tab-content-text">폰트</span><div class="fontType"></div><p>&#9660;</p>
            		</div>
            		<div class="text-item enterable" id="size">
            			<span class="tab-content-text">크기</span><input type="number" id="size" value="20"><span class="tab-content-text">px</span>
            		</div>
            		<div class="text-item enterable" id="textColor">
            			<span class="tab-content-text">색상</span><input class="colorView" id="text">
            		</div>
            		<div class="text-item" id="effect">
            			<span class="tab-content-text">효과</span>
            		</div>
            		<div class="text-item" id="effect-list">
            			<div class="text-effect" id="bold"><img src="/salab/resources/img/text_Bold.png"></div>
            			<div class="text-effect" id="italic"><img src="/salab/resources/img/text_Italic.png"></div>
            			<div class="text-effect" id="underline"><img src="/salab/resources/img/text_Underline.png"></div>
            			<div class="text-effect" id="strikethrough"><img src="/salab/resources/img/text_Strikethrough.png"></div>
            		</div>
            		
            		<div class= "text-font-droplist">
            			<c:forEach var="font" items="${fontList }">
            			<div class="component" style="font-family : ${font}" onclick="textFontChange('${font}')">${font}</div>
            			</c:forEach>
            		</div>
            		
            	</div>
            	<div class="text-category text-shape" onclick="toggleComps(this, '.text-shape-comps');">
                	<p>&#9660;</p>SHAPE
            	</div>
            	<div class="text-shape-comps">
            		<div class="text-item enterable" id="textgroundColor">
            			<span class="tab-content-text">강조</span><input class="colorView" id="textground">
            		</div>
            		<div class="text-item" id="sort">
            			<span class="tab-content-text">정렬</span>
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
        <div class="canvas-content">
        </div>
    </div>
    
    
    
	<input type="file" id="imagePreview" onchange="readURL(this);" style="display: none;">    
    <div class="context-menu"></div>
    <script type="text/javascript" src="/salab/vendors/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery-ui.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery.ui.rotatable.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/html2canvas.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/canvas2image.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jspdf.min.js"></script>
    <script type="text/javascript" src="/salab/vendors/js/jquery.minicolors.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/dragndrop.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/page.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/componentList.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/rightSidebar.js"></script>
    <script type="text/javascript" src="/salab/resources/js/editPrivateFile/shortcut.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js" integrity="sha256-Tw0/gX6aFDMese6GHQJFL/ZjF+f7edyF9okFVY/B9oU=" crossorigin="anonymous"></script>
    <script type="text/javascript">
    	//페이지컨텐츠를 담을 전역변수
    	var list = new Array();

    	var privateLibrary = new Array();
    	

    	 async function Thumbnail(){
    			var image;
    			
    			var clone = $('#droppable').clone();
    	    	$('#clone-canvas').html(clone);
    	    	$('#clone-canvas').find('.canvas').removeClass('grid-canvas');
    	    	$('#clone-canvas').find('.obj').removeClass('ui-selected');
    			
        		var node = document.getElementById('clone-canvas');
            	var canvas = document.createElement('canvas');
            	canvas.width = node.scrollWidth;
            	canvas.height = node.scrollHeight;
            	
            		await domtoimage.toPng(node, {filter: filter}).then(function (pngDataUrl) {
            	    image = new Image();
            	    $(image).attr('object-fit', 'contain');
            	    $(image).addClass('centered');
            	    image.onload = function () {
            	        var context = canvas.getContext('2d');

            	        context.translate(canvas.width, 0);
            	        context.scale(-1, 1);
            	        context.drawImage(image, 0, 0);

            	    };
            		image.src = pngDataUrl;
            		$('.ui-selected .page-thumbnail').html('');
        	        $('.ui-selected .page-thumbnail').append(image);
        	        $('#clone-canvas').html('');
            }).catch(function (error) {
            	console.log(error);
            });
            
          
    }	

    $(function(){
    	
    	//페이지 로딩시 전역변수에 pageList값을 옮겨담음
    	<c:forEach items="${pageList }" var="item">
    		list.push({
    			content: `${item.content}`,
    			pageno: "${item.pageno}",
    			fileno: "${item.fileno}",
    			userno: "${item.userno}",
    			pagename: "${item.pagename}",
    			thumbnail: `${item.thumbnail}`,
    			_id: "${item._id }",
    			undo: new Array(),
    			redo: new Array()

    		});
    	</c:forEach>
    	
   
	   		for(var i = 0; i < list.length; i++){
	   			$('.page-thumbnail:eq('+i+')').html(list[i].thumbnail);
	   		} 

        $('.page-tab-content').show();
        $('.comp-tab-content').hide();
        $('.lib-tab-content').hide();
        
        $('.grid-chk input').on('change', function(){
            if($(this).is(':checked')){
            	$('#droppable').addClass('grid-canvas');
            	$('#droppable').attr('data-grid', true)
            }else{
            	$('#droppable').removeClass('grid-canvas');
            	$('#droppable').attr('data-grid', false);
            }
                
        });
        
		//page onload시 lib-tab에 내용 추가
    	var plib = {
   			fileno: list[0].fileno,
   			userno: list[0].userno
    	}
    	$.ajax({
    		url: 'getPlibList.do',
    		type: 'post',
    		cache: false,
    		data: JSON.stringify(plib),
    		contentType: "application/json; charset=UTF-8",
    		dataType: 'json',
    		success: function(data){
    			/* $('.lib-tab-content').html("<div class='searchbox'><i class='fas fa-search'></i><input type='text' placeholder='검색'></div>") */
    			privateLibrary = new Array();
    			for(var i = 0; i<data.plib.length; i++){
					$libItem = $("<div class='plib-item' data-order='"+i+"'><div class='plib-item-thumb'><img src='" 
							+ data.plib[i].content + "'></div><div class='plib-item-name'>untitled</div></div>");
					$('.lib-tab-content').append($libItem);
					var pl = {
						code: data.plib[i].code,
						_id: data.plib[i]._id
	    			}
					privateLibrary.push(pl);
				}
   				resizeLibImg();
    		},
    		error: function(){
    			console.log("plib list 가져오기 실패");
    		}
    	});
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
            $('.right-side-bar').show();
            $('.canvas-container').css('width', 'calc(100% - 460px)');
        }else{
            $(btn).children("img").attr("src", "/salab/resources/img/openedit_blank.png");
            $('.right-side-bar').hide();
            editable = "false";
            $('.canvas-container').css('width', 'calc(100% - 230px)');
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
        $('.right-side-bar .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.figure-tab').addClass('active-tab');
        $('.text-tab-content').hide();
        $('.figure-tab-content').fadeIn(200);
    });
    
    $('.text-tab').click(function(){
        $('.right-side-bar .tab').each(function(){
            $(this).removeClass('active-tab'); 
        });
        $('.text-tab').addClass('active-tab');
        $('.figure-tab-content').hide();
        $('.text-tab-content').fadeIn(200);
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
    
    /* canvas size 조절 열기 */
    $('.canvas-size p').on('click', function(){
    	if($('.top-canvas-opts').css('display') == 'none'){
    		$('.top-canvas-opts').show();
    		$('.top-canvas-opts input').val(Number($('.canvas-size p span').text().split('%')[0]));
    	}else
    		$('.top-canvas-opts').hide();
    });
    $('.top-canvas-opts ul li').on('click', function(){
    	controlCanvasZoom(Number($(this).text().split('%')[0]));
    });
    $(document).on('mousedown', function(e){
    	if(!$(e.target).is('.top-canvas-opts *'))
    		$('.top-canvas-opts').hide();
        if(!$(e.target).is('#canvas-sizing-opt *'))
        	$('#canvas-sizing-opt').hide();
    });
    
    $('.top-canvas-opts input').on('focusout', function(){
    	controlCanvasZoom($(this).val());
    });
    
    function linkZoom(scale){
    	if(window.event.keyCode == 13)
    		controlCanvasZoom(scale);
    }
    
    function controlCanvasZoom(scale){
    	if(scale >= 10 && scale <=500){
        	$('.canvas-size p span').text(scale + '%');
        	$('#droppable').css('transform', 'scale(' + (scale/100) + ', ' + (scale/100) + ')');
        	$('.top-canvas-opts').hide();
        	var scroll_zoom = new ScrollZoom($('.canvas-container'),5,0.1);
    		
        	var changedWidth = $('#droppable').width() * scale/100;
    	}
    }

	$(document).on("mouseup", ".minicolors-grid", function() {
       setTimeout(function(){
    	   Thumbnail();
       }, 500);
	});
	
    </script>
    
</body>
</html>