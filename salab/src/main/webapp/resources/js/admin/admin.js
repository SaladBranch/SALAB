$(document).ready(function(){
	
	/*헤더 메뉴*/
	$(function() {
		$('.user-profile').click(function(){
		    var drop = $('.profile-dropmenu');
		    if(drop.css('display') == 'block'){
		        drop.hide();
		    }else{
		        drop.show();
		    }
		});
	});
	/*헤더 메뉴*/
	
});