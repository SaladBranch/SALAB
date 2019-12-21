
//페이지 셀렉트
    $('.page-item').on('click', function(){
    	for(i = 0; i<selectedObj.length; i++){
    		$obj = selectedObj[i];
    		$obj.children().remove('.ui-resizable-handle');
            if($obj.hasClass('ui-draggable'))
            	$obj.draggable('destroy');
            $obj.children('.ui-rotatable-handle').hide();
            if($obj.hasClass('ui-selected'))
            	$obj.removeClass('ui-selected');
    	}
    	//이전에 셀렉트된 페이지에 대한 인덱스
    	var beforeIndex = $('.ui-selected').index();
    	//현재 새로 셀렉트된 페이지 인덱스
        var index = $('.page-item').index($(this));

        //현재 캔버스위에 태글들을 임시저장
        tempStorage(beforeIndex);
        
        $('.page-item').each(function(){
            $(this).removeClass('ui-selected');
        });
        pageContent(index);
        $('.page-item').eq(index).addClass('ui-selected');
        
        $('#droppable').on('dragenter', function(e){
        	$(this).addClass('drag-over');
        }).on('dragleave', function(e){
        	$(this).removeClass('drag-over');
        }).on('dragover', function(e){
        	e.stopPropagation();
        	e.preventDefault();
        }).on('drop', function(e){
        	e.preventDefault();
        	
        	var files = e.originalEvent.dataTransfer.files; //드래그&드랍 항목
        	for(var i = 0; i < files.length; i++) {
        	var file = files[i];
        	preview(file, size - 1); //미리보기 만들기
        	}
        	setTimeout(function(){
            	Thumbnail();
            }, 500);
        });
    });
    
    var pindex;
    var beforepindex;
    var pageMoveTempStorage;
    $('.page-tab-content').sortable({
        items: "> li",
        axis: 'y',
        handle: 'div',
        cancel: '.newpage',
        start: function(event, ui){
            beforepindex = ui.item.index();
            
            pageMoveTempStorage = {
            		content: list[beforepindex].content,
            		userno: list[beforepindex].userno,
            		fileno: list[beforepindex].fileno,
            		pageno: list[beforepindex].pageno,
	    			pagename: list[beforepindex].pagename,
	    			_id: list[beforepindex]._id,
	    			thumbnail: $('.page-thumbnail:eq('+beforepindex+')').html()
            }
        },
        stop: function(event, ui){
        	pindex = ui.item.index();
            if(beforepindex != pindex){
                
            	if(beforepindex < pindex){
            		for(var i = beforepindex; i <= pindex; i++){
                    	if(i < pindex){
                    		list[i].content = list[i+1].content;
                        	list[i].pagename = list[i+1].pagename;
                        	list[i]._id = list[i+1]._id;
                        	list[i].thumbnail = list[i+1].thumbnail;
                    	}else {
                    		list[i].content = pageMoveTempStorage.content;
                        	list[i].pagename = pageMoveTempStorage.pagename;
                        	list[i]._id = pageMoveTempStorage._id;
                        	list[i].thumbnail = pageMoveTempStorage.thumbnail;
                    	}
                    }
            	}else if(beforepindex > pindex){
            		for(var i = beforepindex; pindex <= i ; i--){
                    	if(i > pindex){
                    		list[i].content = list[i-1].content;
                        	list[i].pagename = list[i-1].pagename;
                        	list[i]._id = list[i-1]._id;
                        	list[i].thumbnail = list[i-1].thumbnail;
                    	}else {
                    		list[i].content = pageMoveTempStorage.content;
                        	list[i].pagename = pageMoveTempStorage.pagename;
                        	list[i]._id = pageMoveTempStorage._id;
                        	list[i].thumbnail = pageMoveTempStorage.thumbnail;
                    	}
                    }
            	}
            	
                $.ajax({
                	url: 'pageMove.do',
                	type: 'post',
                	contentType: "application/json; charset=UTF-8",
                	cache: false,
                	data: JSON.stringify(list),
                	success: function(){
                		console.log('pageMove!!');
                	},error: function(){
                		console.log('error');
                	}
                });
            }
            
        }
    });
    
    //페이지 셀렉트시에 페이지를 변경시켜줄 함수
    function pageContent(index){
    	var no = index;
    	$('.canvas-container').html(list[no].content);
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
        
        //페이지별 color 다르게 적용
        toggleCanvasColor();
        
        //페이지별 grid 여부
        if($('#droppable').attr('data-grid') === 'true')
        	$('.grid-chk input').prop('checked', true);
        else
        	$('.grid-chk input').prop('checked', false);
        
        //페이지별 canvas size
        $('#canvas-sizing-opt li').each(function(){
        	if($(this).html().split(' <')[0] === $('#droppable').attr('data-canvas')){
        		$('#canvas-sizing').html($(this).html());
        		$('.canvas-sizing label').show();
            	$('.canvas-custom-sizing').hide();
        	}
        });
        if($('#droppable').attr('data-canvas') === 'custom'){
        	$('.canvas-sizing label').hide();
        	$('.canvas-custom-sizing').show();
        }
        
        //페이지별 방향
        if(Number($('#droppable').css('width').replace('px', '')) < Number($('#droppable').css('height').replace('px', ''))){
        	$('.canvas-sizing .radio-label input').eq(0).prop('checked', true);
        	$('.canvas-sizing .radio-label input').eq(1).prop('checked', false);
        }else{
        	$('.canvas-sizing .radio-label input').eq(0).prop('checked', false);
        	$('.canvas-sizing .radio-label input').eq(1).prop('checked', true);
        }
        
        /* canvas sizing */
        //page 오른쪽 여백
        var dwidth = Number($('#droppable').css('width').replace('px', ''));
        var cwidth = Number($('.canvas-container').css('width').replace('px', ''));
        
        //page zoom 맞춰주기
        var scaleValues = $('#droppable').css('transform');
        var zoomPercent = (scaleValues ==='none')? 1 : ((scaleValues.split('(')[1]).split(')')[0]).split(',')[0];
        $('.canvas-size p span').text(Math.floor(100*zoomPercent) + "%");
        var scroll_zoom = new ScrollZoom($('.canvas-container'),5,0.1);
        
        //페이지 바꼈을때도 obj 선택하면 메뉴 바뀌게 다시 한 번 지정
        $('#droppable').bind('DOMSubtreeModified', function(e){
            if($('#droppable .ui-selected').length > 0){
                $('.right-side-bar .canvas-menu').hide();
                $('.right-side-bar .tab-menu').show();
                $('.right-side-bar .tab-content').show();
            }else{
                $('.right-side-bar .canvas-menu').show();
                $('.right-side-bar .tab-menu').hide();
                $('.right-side-bar .tab-content').hide();
            }
        });
        
    }

    //페이지 삭제용 함수
    function pageDelete(){
    	var index = $('.ui-selected').index();
    	var con = confirm("정말 삭제하시겠습니까? \n(삭제된 페이지는 복구할 수 없습니다.)");
    	if(con){
    		$.ajax({
        		url: 'pageDelete.do',
        		data: JSON.stringify(list[index]),
        		contentType: "application/json; charset=UTF-8",
        		type: 'post',
        		success: function(data){
        			if(index != 0){
        				$('.page-item:eq(0)').click();
        			}else{
        				$('.page-item:eq(1)').click();
        			}
        			$('.page-item:eq('+index+')').remove();
        			for(var i = index; i < list.length; i++){
        				if(i != list.length-1){
        					list[i] = list[i+1];
        					list[i].pageno = list[i].pageno - 1;
        				}else{
        					list.pop();
        				}
        			}
        			console.log('delete success');
        		},
        		error: function(){
        			console.log("error");
        		},
        	});
    	}
    }
    
    //페이지 콘텐츠 임시저장용 함수
    function tempStorage(index){
    	 list[index].content = $('.canvas-container').html();
    }
    
    function pageCopy(){
    	var index = $('.ui-selected').index();

    	$($('.page-item:eq('+index+')').after('<li class="page-item">' +
				'<div class="page">' +
                '<div class="page-top">' +
                    '<div class="page-thumbnail">' +
                        $('.page-thumbnail:eq('+index+')').html() +
                    '</div>'+
                '</div>' +
                '<div class="page-name">' + 
                    '<input type="text" class="page-title" value="Copy of '+ $('.page-title:eq('+index+')').val() +'">' +
                '</div>' +
            '</div>'	+ 
            '</li>'));
    	
    	list.splice(index+1, 0, {
    		content: $('.canvas-container').html(),
    		pageno: list[index].pageno,
    		fileno: list[index].fileno,
    		userno: list[index].userno,
    		pagename: list[index].pagename,
    		thumbnail: $('.page-thumbnail:eq('+index+')').html(),
    		_id: null,
    		undo: new Array(),
    		redo: new Array()
    	});
    	
    	$.ajax({
    		url: 'pageCopy.do',
    		type: 'post',
    		data: JSON.stringify(list[index+1]),
    		contentType: "application/json; charset=UTF-8",
    		dataType: 'json',
    		success: function(data){
    			for(var i =0; i < data.pageList.length; i++){
	    			var dataSet = {
	    					content: data.pageList[i].content, 
	    					pageno: data.pageList[i].pageno,
	    					fileno: data.pageList[i].fileno,
	    					userno: data.pageList[i].userno,
	    					pagename: data.pageList[i].pagename,
	    					thumbnail: data.pageList[i].thumbnail,
	    					_id: data.pageList[i]._id,
	    					undo: new Array(),
	    					redo: new Array()
	    			}
    				list[i] = dataSet;
    			}
    			
    			$('.page-item').on('click', function(){
    		    	//이전에 셀렉트된 페이지에 대한 인덱스
    		    	var beforeIndex = $('.ui-selected').index();
    		    	//현재 새로 셀렉트된 페이지 인덱스
    		        var index = $('.page-item').index($(this));
    		        
    		        //현재 캔버스위에 태글들을 임시저장
    		        tempStorage(beforeIndex);
    		        
    		        $('.page-item').each(function(){
    		            $(this).removeClass('ui-selected');
    		        });
    		        pageContent(index);
    		        $('.page-item').eq(index).addClass('ui-selected');
    		        
    		    });
    			
    			console.log('copy success');
    			$('.page-item:eq('+(index + 1)+')').click();
    			
    		},
    		error : function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR.status );
				console.log( jqXHR.statusText );
				console.log( jqXHR.responseText );
				console.log( jqXHR.readyState );
			}
    	});
    }
    
    //page 탭 리스트 불러오는 ajax
    function pageTab(){
    	
    	var thumblist = new Array();
    	for(var i = 0; i < $('.page-thumbnail').length; i++){
    		thumblist.push({
    				thumb: $('.page-thumbnail:eq('+i+')').html()
    		});
    		console.log(i, thumblist[i]);
    	}
    	
    	$.ajax({
    		url: 'pageTab.do',
    		type: 'post',
    		data: {
    			userno: list[0].userno,
    			fileno: list[0].fileno
    		},
    		dataType: 'json',
    		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    		success: function(data){
    			for(var i =0; i < data.page.length; i++){
    			
	    			var dataSet = {
	    					content: data.page[i].content, 
	    					pageno: data.page[i].pageno,
	    					fileno: data.page[i].fileno,
	    					userno: data.page[i].userno,
	    					pagename: data.page[i].pagename,
	    					thumbnail: data.page[i].thumbnail,
	    					_id: data.page[i]._id,
	    					undo: new Array(),
	    					redo: new Array()
	    			}
    				list[i] = dataSet;
    			}
    			$('.newpage').remove();
    			$('.page-tab-content').append(
    					'<li class="page-item">' +
						'<div class="page">' +
    	                '<div class="page-top">' +
    	                    '<div class="page-thumbnail">' +
    	                        '<img src="/salab/resources/img/whitebox.png">' +
    	                    '</div>'+
    	                '</div>' +
    	                '<div class="page-name">' + 
    	                    '<input type="text" class="page-title" value="'+ dataSet.pagename +'">' +
    	                '</div>' +
    	            '</div>'	+ 
    	            '</li>'
    			);
    			$('.page-tab-content').append(
    					'<div class="newpage" onclick="newPage()">' +
    	                '&#43;' +
    	            '</div>'	
    			);
    			
    			$('.page-item').on('click', function(){
    		    	//이전에 셀렉트된 페이지에 대한 인덱스
    		    	var beforeIndex = $('.ui-selected').index();
    		    	//현재 새로 셀렉트된 페이지 인덱스
    		        var index = $('.page-item').index($(this));
    		        
    		        //현재 캔버스위에 태글들을 임시저장
    		        tempStorage(beforeIndex);
    		        
    		        $('.page-item').each(function(){
    		            $(this).removeClass('ui-selected');
    		        });
    		        pageContent(index);
    		        $('.page-item').eq(index).addClass('ui-selected');
    		        
    		    });
    		},
    		error: function(){
    			
    		}
    	});
    }
    
    function newPage(){
    	$.ajax({
    		url: 'newPage.do',
    		type: 'post',
    		dataType: 'json',
    		data: {
    			userno: list[0].userno,
    			fileno: list[0].fileno
    		},
    		success: function(data){
    			console.log("ok");
    			pageTab();
    		},
    		error:function(){
    			
    		}
    	});
    }
    
    function pageSave(){
    	var index = $('.ui-selected').index();
    	$('.isModified:eq('+index+')').removeClass('active');
    	
    	for(i = 0; i<selectedObj.length; i++){
    		$obj = selectedObj[i];
    		$obj.children().remove('.ui-resizable-handle');
            if($obj.hasClass('ui-draggable'))
            	$obj.draggable('destroy');
            $obj.children('.ui-rotatable-handle').hide();
            if($obj.hasClass('ui-selected'))
            	$obj.removeClass('ui-selected');
    	}
    	
    	list[index].content = $('.canvas-container').html();
    	list[index].thumbnail = $('.page-thumbnail:eq('+index+')').html();
    	
    	$.ajax({
    		url: 'pageSave.do',
    		type: 'post',
    		cache: false,
    		data: JSON.stringify(list[index]),
    		contentType: "application/json; charset=UTF-8",
    		success: function(data){
    			console.log('save success');
    		},
    		error: function(){
    			console.log("error");
    		}
    	});
    	
    }
    
    function pageAllSave(){
    	var index = $('.ui-selected').index();
    	$('.isModified').removeClass('active');
    	
    	for(i = 0; i<selectedObj.length; i++){
    		$obj = selectedObj[i];
    		$obj.children().remove('.ui-resizable-handle');
            if($obj.hasClass('ui-draggable'))
            	$obj.draggable('destroy');
            $obj.children('.ui-rotatable-handle').hide();
            if($obj.hasClass('ui-selected'))
            	$obj.removeClass('ui-selected');
    	}
    	
    	list[index].content = $('.canvas-container').html();
    	for(var i = 0; i < list.length; i++){
        	list[i].thumbnail = $('.page-thumbnail:eq('+i+')').html();
    	}
    	
    	$.ajax({
    		url: 'pageAllSave.do',
    		type: 'post',
    		cache: false,
    		data: JSON.stringify(list),
    		contentType: "application/json; charset=UTF-8",
    		success: function(data){
    			console.log('allsave success');
    		},
    		error: function(){
    			console.log("error");
    		}
    	});
    	
    }
    

    	$('#droppable').on('dragenter', function(e){
        	$(this).addClass('drag-over');
        }).on('dragleave', function(e){
        	$(this).removeClass('drag-over');
        }).on('dragover', function(e){
        	e.stopPropagation();
        	e.preventDefault();
        }).on('drop', function(e){
        	var files = e.originalEvent.dataTransfer.files;
        	var x = e.offsetX - 10;
        	var y = e.offsetY - 30;
        	
        	for(var i = 0; i < files.length; i++) {
        	var file = files[i];
        	preview(file, size - 1, x, y); 
        	}
        	e.preventDefault();
        		
        	setTimeout(function(){
        		Thumbnail();
        	}, 500);
        	
        });
    	
    	function memo(){
    		$('#droppable').addClass('memo-container');
    	}
    	
    	$(document).on('mouseenter', '.memo-container', function(e){
        }).on('mouseleave', '.memo-container', function(e){
        }).on('mouseover', '.memo-container', function(e){
        	e.stopPropagation();
        	e.preventDefault();
        }).on('mouseup', '.memo-container', function(e){
        	var x = e.offsetX -8;
        	var y = e.offsetY -18;
        	
        	var div = '<div class="memo" style="position: absolute; left: '+x+'px; top: '+y+'px" display: flex">' + 
        		'<i class="fas fa-map-marker-alt memo-icon"></i>' +
        		'<div class="memo-content">'+
        		'<div class="memo-userThumb">'+
                '<div class="memo-info">'+
                '<div class="user">'+
                '<span style="width: 40px; height: 40px;"><image src="/salab/resources/img/default_profile.png" style="width:100%; height:100%;"></span>'+
                '<span style="font-size: 15px; font-weight: bold; padding-left: 5px">ashashasasgarga</span>'+
                '</div>'+
                '<div class="button">'+
                '<button class="btn-ghost cancel">cancel</button>'+
                '<button class="btn-ghost done" disabled="true">done</button>'+
                '</div>'+
                '</div>'+
                '<input type="text" class="memo-cnt" value="" placeholder="Comment..">'+
		        '</div>'+
		        '</div>'+
        		'</div>'+
        		'</div>';
        	
        	$('#droppable').append(div);
        	$('#droppable').removeClass('memo-container');
        	
        });
    	
    	$(document).on('keyup', '.memo-cnt', function(){
    		var keyword = $(this).val();
    		if(keyword == ''){
    			console.log($(this).siblings('.memo-info').find('.done').text());
    			$(this).siblings('.memo-info').find('.done').attr('disabled', true);
    		}else{
    			$(this).siblings('.memo-info').find('.done').attr('disabled', false);
    		}
    	});
    	
    	$(document).on('mouseup', '.memo-icon', function(){
    		$(this).siblings('.memo-content').toggle();
    	});
    	
    	$(document).on('click', '.btn-ghost.cancel', function(){
    		$(this).closest('.memo').remove();
    	});
    	
    	$(document).on('mouseup', '.memoRemove', function(){
    		$(this).closest('.memo').remove();
    	});
    	
    	$(document).on('mouseup', '.memoEdit', function(){
    		var $memo = $(this).closest('.memo-info').siblings('.memo-cnt');
    		var $button = $(this).closest('.button');
    		
    		$($memo).attr('readOnly', false);
    		$($memo).removeClass('disabled');
    		$($button).html(
    				 '<button class="btn-ghost cancel">cancel</button>'+
    	                '<button class="btn-ghost done">done</button>'
    	                );
    	});
    	
    	$(document).on('click', '.btn-ghost.done', function(){
    		var $memo = $(this).closest('.memo-info').siblings('.memo-cnt');
    		var $button = $(this).closest('.button');
    		var $user = $(this).closest('.user');
    		
    		$($memo).attr('readOnly', true);
    		$($memo).addClass('disabled');
    		$($button).html(
    			'<div class="file-options">'+
	            '<div class="file-options-btn">⋮</div>'+
	            '<div class="file-options-menu">'+
	            '<ul>'+
	            '<li><a href="javascript:" class="memoEdit">메모 수정</a></li>'+
	            '<li><a href="javascript:" class="memoRemove">메모 삭제</a></li>'+
	            '</ul>'+
	            '</div>'+
    			'</div>');
    	});
    	
    function preview(file, idx, x, y){
    	var reader = new FileReader();
    	reader.onload = (function(f, idx){
    		return function(e){
    			var div = '<div class="obj" style="position: absolute; left: '+x+'px; top: '+y+'px">' +
    			'<img src="' + e.target.result + '" title="' + escape(f.name) + '" class="obj-comp"/>' +
    			'</div>';
    			$('#droppable').append(div);
    		};
    	})(file, idx);
    	reader.readAsDataURL(file);
    }
    
    function exportPdf(){
    	var index = $('.page-item.ui-selected').index();
    	pdf = new jsPDF('l', 'mm', 'a4', true);
    	
    	var image = new Image();
    	image.src= $(list[index].thumbnail).attr('src');
    	
    	var imgWidth = pdf.internal.pageSize.width;
    	var imgHeight = pdf.internal.pageSize.height;
    	
    		if(image.width > image.height){
        		pdf.addImage(image.src, 'PNG', 0, 0, imgWidth, imgHeight);
        	}else{
        		imgWidth = (pdf.internal.pageSize.width / (image.width / pdf.internal.pageSize.width)) * 2;
        		pdf.addImage(image.src, 'PNG', (imgWidth / 2) - 20, 0, imgWidth, imgHeight);
        	}
    		pdf.save($('.page-title:eq('+index+')').val() + '.pdf');
    }
    
    function exportAllPdf(){
    	pdf = new jsPDF('l', 'mm', 'a4', true);
    	
    	for(var i = 0; i < list.length; i++){
    		var image = new Image();
        	image.src= $(list[i].thumbnail).attr('src');
        	
        	var imgWidth = pdf.internal.pageSize.width;
        	var imgHeight = pdf.internal.pageSize.height;
        		if(i < list.length -1){
        			if(image.width > image.height){
            			pdf.addImage(image.src, 'PNG', 0, 0, imgWidth, imgHeight);
            		}else{
            			imgWidth = (pdf.internal.pageSize.width / (image.width / pdf.internal.pageSize.width)) * 2;
            			pdf.addImage(image.src, 'PNG',(imgWidth / 2) - 20, 0, imgWidth, imgHeight);
            		}
            		pdf.addPage();
        		}else{
        			if(image.width > image.height){
            			pdf.addImage(image.src, 'PNG', 0, 0, imgWidth, imgHeight);
            		}else{
            			imgWidth = (pdf.internal.pageSize.width / (image.width / pdf.internal.pageSize.width)) * 2;
            			pdf.addImage(image.src, 'PNG', (imgWidth / 2) - 20, 0, imgWidth, imgHeight);
            		}
        		}
    	}
    	
    	pdf.save($('#file-title').val() + '.pdf');
    }
    
    $(document).on('dblclick','.page-title', function(e){
    	$(this).focus();
    	$(this).select();
    	e.preventDefault();
    });
    
    $(document).on('blur', '.page-title', function(e){
    	var retitle = $(this).val();
    	var index = $('.page-title').index(this);

    	if(retitle == list[index].pagename){
    		return false
    	}else{
    		$.ajax({
        		url: 'pageRename.do',
        		type: 'post',
        		data: {
        			pagename: retitle,
        			userno: list[0].userno,
        			fileno: list[0].fileno,
        			pageno: list[index].pageno
        		},
        		dataType: 'text',
        		success: function(data){
        			console.log(data);
        		},
        		error:function(request,status,error){
        	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        	    }
        	});
    	}
    	
    	e.preventDefault();
    });
    
    $(document).on('click', '#file-title', function(e){
    	$(this).focus();
    	$(this).select();
    });
    
    $(document).on('blur', '#file-title', function(e){
    	var retitle = $(this).val();
    	
    	$.ajax({
    		url: 'pfRename.do',
    		type: 'post',
    		data: {
    			pfiletitle: retitle,
    			userno: list[0].userno,
    			pfileno: list[0].fileno,
    		},
    		dataType: 'text',
    		success: function(data){
    			if(data == "success"){
    				pageTab();
    			}
    		},
    		error:function(request,status,error){
    	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    	    }
    	});
    	e.preventDefault();
    });
    
    function popup(){
    	
    	var win_width = 1040;
    	var height = 630;
    	window.open('', 'popup', 'width='+win_width+', height=' + height + ', menubar=no, scrollbar=no');
    	
    	var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "webTest.do");
        document.body.appendChild(form);

        var insert = document.createElement("input");
        insert.setAttribute("type", "hidden");
        insert.setAttribute("name", "pfileno");
        insert.setAttribute("value", list[0].fileno);
        form.append(insert);

        var insert2 = document.createElement("input");
        insert2.setAttribute("type", "hidden");
        insert2.setAttribute("name", "pt");
        insert2.setAttribute("value", 'private');
        form.append(insert2);
        
        var insert2 = document.createElement("input");
        insert2.setAttribute("type", "hidden");
        insert2.setAttribute("name", "userno");
        insert2.setAttribute("value", list[0].userno);
        form.append(insert2);
        form.target = 'popup';
        form.submit();
    }
    
    function upImage(){
    	var file = document.getElementById('imagePreview');
    	file.click();
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
            	var div = '<div class="obj">' +
    			'<img src="' + e.target.result + '" class="obj-comp"/>' +
    			'</div>';
            	$('#droppable').append(div);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    function filter(node) {
        return (node.className !== 'memo' && node.className !== 'grid-canvas' && node.className !== 'ui-resizable-handle ui-resizable-n' 
        	&& node.className !== 'ui-resizable-handle ui-resizable-e' && node.className !== 'ui-resizable-handle ui-resizable-s' && node.className !== 'ui-resizable-handle ui-resizable-w' 
        		&& node.className !== 'ui-resizable-handle ui-resizable-ne' && node.className !== 'ui-resizable-handle ui-resizable-se' && node.className !== 'ui-resizable-handle ui-resizable-sw' 
        			&& node.className !== 'ui-resizable-handle ui-resizable-nw' && node.className !== 'ui-rotatable-handle ui-draggable' && node.className !== 'ui-selectee ui-selected');
    }
    
    function modified(){
    	var index = $('.page-item').index($('.page-item.ui-selected'));
        $('.isModified:eq('+index+')').addClass('active');
    }
    
    $(document).on('mouseup', '.file-options-btn',function(){
        var index = $('.file-options-btn').index($(this));
        $('.file-options-menu').each(function(){
            if($('.file-options-menu').index($(this)) == index){
                if($(this).css('display') == 'block'){
                    $(this).hide();
                }else{
                    $(this).show();
                }
            }else{
                $(this).hide();
            }
        });
        
    });
    
    //component search
    function searchComp(){
    	var keyword = $('#search-comp').val();
    	
    	if(keyword == ''){
    		$('.comp-searchResult').html('');
    	}else{

    		$('.comp-searchResult').html('');
    		$('.common-shape-comps').find('a').each(function() {

            	if($(this).attr("id").split("_")[1].includes(keyword)){
            		$('.comp-searchResult').append($(this).clone());
            	}
        	});
    	}
    }
