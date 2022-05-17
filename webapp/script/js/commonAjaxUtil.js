var AjaxAccess = function(){
	var self = this;
	
	this.loadingHTML = function(url, target, param, success, msg){
		
		$(target).empty();
//		var loading = $("<h2><span class="label label-default">Loading...</span></h2>").css("text-align","center");
		var loading = $('<div class="loading">		  <div class="bullet"></div>		  <div class="bullet"></div>		  <div class="bullet"></div>		  <div class="bullet"></div>		</div>');
//		var loading = $('<div class="container2">				  <div class="circle-container">				    <div class="circle2"></div>				  </div>				  <div class="circle-container">				    <div class="circle2"></div>				  </div>				  <div class="circle-container">				    <div class="circle2"></div>				  </div> 				</div>');
		
		$(target).append(loading);
		
		jQuery.ajax({
			url: url,
			type: "GET",
			data: param,
			dataType: "html",
			async : true
		})
		.done(function(html){

			$(target).empty();
			$(target).html(html);
//			setTimeout($(target).html(html), 3000);
			success();
			reInit();
			$("input").keydown(function(e){
				if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)){
					return false;
				} else {
					return true;
				}
			});
			
		})
		.fail(function(data){
			ajaxerror(msg);
		});
		
	};
	
	function ajaxerror(msg){
		$.ajax({
			error: function (xhr, textStatus, errorThrown) {
				switch(xhr.status){
				case 400:
				case 401:
					alear("Request false");
					//window.location.href = "/signin";
					break;
				default:
					window.location.reload();
				}
				
			}
		});
	}
	
	function reInit(){
		initialControl();
		noConflict();

	}
	
};