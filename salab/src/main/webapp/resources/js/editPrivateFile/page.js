
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
        	console.log('enter');
        }).on('dragleave', function(e){
        	$(this).removeClass('drag-over');
        	console.log('leave');
        }).on('dragover', function(e){
        	e.stopPropagation();
        	e.preventDefault();
        	console.log('over');
        }).on('drop', function(e){
        	console.log('drop');
        	e.preventDefault();
        	/*$(this).removeClass('drag-over');*/
        	
        	var files = e.originalEvent.dataTransfer.files; //드래그&드랍 항목
        	for(var i = 0; i < files.length; i++) {
        	var file = files[i];
        	//var size = uploadFiles.push(file); //업로드 목록에 추가
        	preview(file, size - 1); //미리보기 만들기
        	}
        	setTimeout(function(){
        		Thumbnail();
        	}, 1000);
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
            console.log("출발점: " + beforepindex);
            console.log("출발점의 pno :: " + list[beforepindex].pageno);
            /*pageMoveTempStorage.pageno = list[beforepindex].pageno;*/
            pageMoveTempStorage = {
            		content: list[beforepindex].content,
            		userno: list[beforepindex].userno,
            		fileno: list[beforepindex].fileno,
            		pageno: list[beforepindex].pageno,
	    			pagename: list[beforepindex].pagename,
	    			_id: list[beforepindex]._id
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
                    	}else {
                    		list[i].content = pageMoveTempStorage.content;
                        	list[i].pagename = pageMoveTempStorage.pagename;
                        	list[i]._id = pageMoveTempStorage._id;
                    	}
                    }
            	}else if(beforepindex > pindex){
            		for(var i = beforepindex; pindex <= i ; i--){
                    	if(i > pindex){
                    		list[i].content = list[i-1].content;
                        	list[i].pagename = list[i-1].pagename;
                        	list[i]._id = list[i-1]._id;
                    	}else {
                    		list[i].content = pageMoveTempStorage.content;
                        	list[i].pagename = pageMoveTempStorage.pagename;
                        	list[i]._id = pageMoveTempStorage._id;
                    	}
                    }
            	}
            	
            	
                for(var i = 0; i < list.length; i++){
                	console.log(JSON.stringify(list[i]));
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
        var $colorpic = $('<div class="canvas-colorpic"></div>')
        if($('#droppable').attr('data-background') != "#ffffff"){
        	$('.back-chk input').prop('checked', true);
        	$('#canvas-background').append($colorpic);
            $('.canvas-colorpic').minicolors({
                control: 'hue',
                position: 'bottom right',
                defaultValue: $('#droppable').attr('data-background'),
                change: function(hex, opacity){
                    $('#droppable').css('background-color', hex);
                    $('#droppable').attr('data-background', hex);
                }
            });
        }else{
        	$('.minicolors').remove();
        	$('.back-chk input').prop('checked', false);
        }
        
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
        
        //page 오른쪽 여백
        var dwidth = Number($('#droppable').css('width').replace('px', ''));
        var cwidth = Number($('.canvas-container').css('width').replace('px', ''));
        if(dwidth > cwidth){
        	$('#droppable').css('margin', '5% 5%');
        }else{
        	$('#droppable').css('margin', '5% auto');
        }
        
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
        		cache: false,
        		type: 'post',
        		success: function(data){
        			console.log('delete success');
        			pageTab();
        		},
        		error: function(){
        			console.log("error");
        			pageTab();
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
    	
    	$.ajax({
    		url: 'pageCopy.do',
    		type: 'post',
    		cache: false,
    		data: JSON.stringify(list[index]),
    		contentType: "application/json; charset=UTF-8",
    		success: function(data){
    			console.log('copy success');
    			pageTab();
    		},
    		error: function(){
    			console.log("error");
    		}
    	});
    }
    
    //page 탭 리스트 불러오는 ajax
    function pageTab(){
    	
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
    			$('.page-tab-content').html('');
    			for(var i =0; i < data.page.length; i++){
    			
	    			var dataSet = {
	    					content: data.page[i].content, 
	    					pageno: data.page[i].pageno,
	    					fileno: data.page[i].fileno,
	    					userno: data.page[i].userno,
	    					pagename: data.page[i].pagename,
	    					thumbnail: data.page[i].thumbnail,
	    					_id: data.page[i]._id
	    			}
    			
    				if(i == 0){
    					$('.page-tab-content').append(
            					'<li class="page-item  ui-selectee ui-selected">' +
        						'<div class="page ui-sortable-handle">' +
            	                '<div class="page-top ui-sortable-handle">' +
            	                    '<div class="page-thumbnail">' +
            	                        '<img src="/salab/resources/img/whitebox.png">' +
            	                    '</div>'+
            	                '</div>' +
            	                '<div class="page-name ui-sortable-handle">' + 
            	                    '<input type="text" class="page-title" value="'+ dataSet.pagename +'">' +
            	                '</div>' +
            	            '</div>'	+ 
            	            '</li>'
            			);
    					
    					$('.page-thumbnail:eq('+i+')').html(dataSet.thumbnail);
    				}else{
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

    					$('.page-thumbnail:eq('+i+')').html(dataSet.thumbnail);
    				}
    				list[i] = dataSet;
    			}
    			
    			
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
    		        
    		        console.log('beforeIn :: ' +beforeIndex);
    		        console.log('index :: ' + index);
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
    	console.log('check');
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
    	console.log(JSON.stringify(list[index]));
    	
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
        	console.log('enter');
        }).on('dragleave', function(e){
        	$(this).removeClass('drag-over');
        	console.log('leave');
        }).on('dragover', function(e){
        	e.stopPropagation();
        	e.preventDefault();
        	console.log('over');
        }).on('drop', function(e){
        	console.log('drop');
        	var files = e.originalEvent.dataTransfer.files; //드래그&드랍 항목
        	for(var i = 0; i < files.length; i++) {
        	var file = files[i];
        	preview(file, size - 1); //미리보기 만들기
        	}
        	e.preventDefault();
        	console.log('real start');
        	setTimeout(function(){
        		Thumbnail();
        	}, 1000);
        	
        });
    
    function preview(file, idx){
    	var reader = new FileReader();
    	reader.onload = (function(f, idx){
    		return function(e){
    			var div = '<div class="obj">' +
    			'<img src="' + e.target.result + '" title="' + escape(f.name) + '" class="obj-comp"/>' +
    			'</div>';
    			$('#droppable').append(div);
    		};
    	})(file, idx);
    	reader.readAsDataURL(file);
    }
    
    function exportAllPdf(){
    	pdf = new jsPDF('landscape', 'mm', 'a4', true);
    	
    	for(var i = 0; i < list.length; i++){
    		var image = new Image();
        	image.src= $(list[i].thumbnail).attr('src');
    		
    			console.log('start');
        		pdf.addImage(image.src, 'PNG', 0, 0, (image.width * 0.186), (image.height * 0.179));
        		pdf.addPage();
        		console.log('end');
    	}
    	
    	pdf.save('test.pdf');
    }
    
    $(document).on('dblclick','.page-title', function(e){
    	$(this).focus();
    	$(this).select();
    	e.preventDefault();
    });
    
    $(document).on('blur', '.page-title', function(e){
    	var retitle = $(this).val();
    	var index = $('.page-title').index(this)

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
        			if(data == "success"){
        				pageTab();
        			}
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
