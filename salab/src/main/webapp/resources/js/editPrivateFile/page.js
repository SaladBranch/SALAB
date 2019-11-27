
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
        console.log('시발 넘버 ' + list[index].pageno);
        
        //현재 캔버스위에 태글들을 임시저장
        tempStorage(beforeIndex);
        
        $('.page-item').each(function(){
            $(this).removeClass('ui-selected');
        });
        pageContent(index);
        $('.page-item').eq(index).addClass('ui-selected');
        
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
            console.log("도착점: " +pindex);
            console.log("도착점의 pno :: " + list[pindex].pageno);
            console.log("stop 에서의 beforeindex :: " + beforepindex);
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
            	
            	console.log(JSON.stringify(pageMoveTempStorage));
            	
                for(var i = 0; i < list.length; i++){
                	console.log(JSON.stringify(list[i]));
                }
                console.log("=======================");
                
                $.ajax({
                	url: 'pageMove.do',
                	type: 'post',
                	contentType: "application/json; charset=UTF-8",
                	cache: false,
                	data: JSON.stringify(list),
                	success: function(){
                		console.log('pageMove!!');
                		/*pageTab();*/
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
    	console.log('pageContent :: ' + no);
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
        
    }

    //페이지 삭제용 함수
    function pageDelete(){
    	var index = $('.ui-selected').index();
    	var confirm = confirm(`정말 삭제하시겠습니까?
    	(삭제된 페이지는 복구할 수 없습니다.)`);
    	if(confirm){
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
        	})
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
    			pageTab();
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
    		success: function(data){
    			$('.page-tab-content').html('');
    			for(var i =0; i < data.page.length; i++){
    			console.log("page["+ i +"] :: "+ JSON.stringify(data.page[i]));
    			
    			var dataSet = {
    					content: data.page[i].content, 
    					pageno: data.page[i].pageno,
    					fileno: data.page[i].fileno,
    					userno: data.page[i].userno,
    					pagename: data.page[i].pagename,
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