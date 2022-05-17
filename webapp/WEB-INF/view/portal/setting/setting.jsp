<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
  <link href="${ctxPath}/stylesheet/common/main.css" rel="stylesheet" type="text/css" media="all">

  <script type="text/javascript" src="${ctxPath}/script/common/main.js"></script>
  <link href="${ctxPath}/stylesheet/app/gridstack.css" rel="stylesheet" type="text/css" media="all">
  <script src="${ctxPath}/script/js/gridstack.js"></script>
  <script src="${ctxPath}/script/js/gridstack.jQueryUI.js"></script>


<script>
	var isAdmin = '${IS_ADMIN}';
	var columns = 6;
	var grid;
	var listDefault = [];
		$(document).ready(function(){
			  $('.set-menu-add').click(function(){
				  openDialogAdd();
			  });
			  
			  loadListWidgets();
			  getListDefault();
		});
		
		function getListDefault(){
			 var url = CTX + '/plt/plt_0101/getListDefault.ajax';
				
				$.ajax({
					url : url,// CTX+ url, )
					data : {
					},
					cache : false,
					success : function(data, textStatus, jqXHR) {
						// $target.dialog({width:'auto'})
//						console.log(data);
						listDefault = data.slice();
					}
				});
		}
		
		function openDialogAdd(){
			var url = CTX + '/plt/plt_0101/form.dialog';

			openCommonDialog(url, {'CRUD': 'C'}, 'callbackDialog', 'layer-popup-add-list');
		}
		
		function onEditItem(e){
			var id = $(e.target).closest('li').attr('widget_id');
			var url = CTX + '/plt/plt_0101/form.dialog';

			openCommonDialog(url, {'CRUD': 'U', 'WIDGET_ID': id}, 'callbackDialog', 'layer-popup-add-list');
		}

		function callbackDialog(){
		}
		
		function saveWidgetCallback(){
			loadListWidgets();
		}
		
		function loadListWidgets(){
			
			getListWidgets()
		}
		
		function getListWidgets(){
			
			  var url = CTX + '/plt/plt_0101/getData03.ajax';
				
				$.ajax({
					url : url,// CTX+ url, )
					data : {
					},
					cache : false,
					success : function(data, textStatus, jqXHR) {
						// $target.dialog({width:'auto'})
// 						console.log(data);
						renderWidgetsList(data);
						
						
					}
				});
		}
		
		function renderWidgetsList(data){
			if(!data || data.length == 0){
				return false;
			}else{
				rows = data.length;
				
				initGridStack();
				
				
				$('ul.set-menu-lst').empty();
				
				data.forEach(function(obj, index){
					

					var str = '<li ondragstart="dragStart(event)" '+ (isAdmin == 'true'?'ondblclick="onEditItem(event)"': '' )+' draggable="'+(obj.USE_YN == 'Y'?'false':'true')+'" min_width="'+obj.MIN_WIDTH+'" min_height="'+obj.MIN_HEIGHT+'"  widget_id="'+obj.WIDGET_ID+'" url="'+obj.URL+'"   class="'+(obj.USE_YN == 'Y'?'used':'')+'">'
	        			+'<a href="#none">'
	        			+'<span>'
	        			+'	<i class="'+obj.ICON+'"></i>'
	        			+obj.TITLE
	        			+'	</span>'
	        			+'</a>'
	        			+'</li>';
						$('ul.set-menu-lst').append(str);
						if(obj.USE_YN == 'Y'){
							 grid.addWidget($('<div class="grid-stack-item"  widget_id="'+obj.WIDGET_ID+'"  url="'+obj.URL+'">'
							 +'<div class="box grid-stack-item-content">'
							 +'<div class="box-cont">'
							 +'         <strong class="heading6">'
				             +'   <i class="'+obj.ICON+'"></i>'	
				             +'   <span>'+obj.TITLE+'</span>'
				             +'  <a onclick="unused(event)" class="box-btn">'
				             +'   <i class="xi-close"></i>'
				             +' </a>'
				             +' </strong>'
				             +'<div class="box-cont-wrap editing-box-wrap">'
							 +'	<a  class="editing-box"></a>'
							 +'</div>'
							 +'</div>'
							 +'</div></div>' ), obj.X, obj.Y, obj.W, obj.H, false, obj.MIN_WIDTH, 99, obj.MIN_HEIGHT, 99);
						}
						
				});

			}
			
		}
		
		
		
		function saveGrid(){
			var items = grid.engine.nodes;
			var widgets = [];
			if(items.length >0){
				items.forEach(function(obj, i){
//	 				console.log(obj)
					var element = {
							"WIDGET_ID": $(obj.el).attr("widget_id"),
							"X": obj.x,
							"Y": obj.y,
							"H": obj.height,
							"W": obj.width
					};
					widgets.push(element);
				});
			}
// 			console.log(widgets);
			
			var url = CTX + '/plt/plt_0101/save01.ajax';

			$.ajax({
				url : url,// CTX+ url, )
				data : {
					"WIDGETS": widgets,
				},
				cache : false,
				success : function(data, textStatus, jqXHR) {
					// $target.dialog({width:'auto'})
					if(data == 'true'){
						alert('<spring:message	code='common.msg.saveSuccess' /> ');	
						window.location.href= '/main/main';
					}else{
						
						alert('<spring:message	code='oam.oam_0203.detail.tab01.msg.saveUnsuccess' /> ');	

					}
					
				}
			});
		}
		
		function initGridStack(){
			
			$('#gridStackPlus').remove();

			var strStyle = "<style id='gridStackPlus' type='text/css'> ";
			for(i = 1; i<= columns; i++){
				strStyle += '.grid-stack > .grid-stack-item[data-gs-width="'+i+'"] {  width: '+(100.00*i/columns)+'%;}	.grid-stack > .grid-stack-item[data-gs-x="'+i+'"] {	  left:  '+(100.00*i/columns)+'%;	}		.grid-stack > .grid-stack-item[data-gs-min-width="'+i+'"] {		  min-width:  '+(100.00*i/columns)+'%;		}		.grid-stack > .grid-stack-item[data-gs-max-width="'+i+'"] {		  max-width:  '+(100.00*i/columns)+'%;		}'
			
			}
			strStyle+= "</style>";
			$(strStyle).appendTo("#main");
			
			
			
			cellHeight =   $('.set-dashboard-layout').height()/rows - 10;
// 			console.log('cellheight: '+ cellHeight);
			 var options = {
			         cellHeight: cellHeight,
			        verticalMargin: 10
			    };
			 
			 $('.set-dashboard-layout').empty().append('<div class="grid-stack dashboard-box-wrap"></div>')
			 $('.grid-stack').attr('data-gs-column', columns);
			 $('.grid-stack').attr('data-gs-max-row', rows);
			 
			 grid = GridStack.init({column: columns, row: rows, cellHeight: cellHeight,   verticalMargin: 10});

			
		}
		
		function unused(e){
			$obj = $(e.target);
			var id = $obj.closest('div.grid-stack-item').attr('widget_id');
			if(!id){
				console.log('error: ID is undefine');
				return;
			}
			grid.removeWidget($obj.closest('div.grid-stack-item'));
			$('ul.set-menu-lst li[widget_id="'+id+'"]').removeClass('used').attr('draggable', 'true');
		}

		function dragStart(event) {
// 			console.log( event.target);
			if( $(event.target).closest('li').hasClass('used')){
				return false;
			}
			  event.dataTransfer.setData("widget_id", $(event.target).closest('li').attr('widget_id'));
			  event.dataTransfer.setData("min_width", $(event.target).closest('li').attr('min_width'));
			  event.dataTransfer.setData("min_height", $(event.target).closest('li').attr('min_height'));
			  event.dataTransfer.setData("url", $(event.target).closest('li').attr('url'));
			  event.dataTransfer.setData("title", $(event.target).closest('li').find('a > span').text());
			  event.dataTransfer.setData("icon", $(event.target).closest('li').find('a > span > i').attr('class'));
			}

			function allowDrop(event) {
			  event.preventDefault();
			}

			function drop(event) {
				
			  event.preventDefault();
			  var id = event.dataTransfer.getData("widget_id");
			  if(!id){
				  return false;
			  }
			  var url = event.dataTransfer.getData("url");
			  var title = event.dataTransfer.getData("title");
			  var min_width = event.dataTransfer.getData("min_width");
			  var min_height = event.dataTransfer.getData("min_height");
			  var icon = event.dataTransfer.getData("icon");

				 grid.addWidget($('<div class="grid-stack-item"  widget_id="'+id+'"  url="'+url+'">'
						 +'<div class="box grid-stack-item-content">'
						 +'<div class="box-cont">'
						 +'         <strong class="heading6">'
			             +'   <i class="'+icon+'"></i>'	
			             +'   <span>'+title+'</span>'
			             +'  <a onclick="unused(event)" class="box-btn">'
			             +'   <i class="xi-close"></i>'
			             +' </a>'
			             +' </strong>'
			             +'<div class="box-cont-wrap editing-box-wrap">'
						 +'	<a  class="editing-box"></a>'
						 +'</div>'						 
						 +'</div>'
						 +'</div></div>' ), 0, 0, 0, 0, true, min_width, 99, min_height, 99);
					$('ul.set-menu-lst li[widget_id="'+id+'"]').addClass('used').attr("draggable","true");


			}		
			
			function emtpyGrid(){
// 				$('.set-dashboard-layout').find('div.grid-stack-item').each(function(){
// 					grid.removeWidget($(this));
// 					var id =$(this).attr('widget_id');
// 					$('ul.set-menu-lst li[widget_id="'+id+'"]').removeClass('used').attr('draggable', 'true');
// 				});
				if(listDefault && listDefault.length > 0){
					renderWidgetsList(listDefault);
				}else{
					return false;
				}
			}
		
</script>


      <!--main-->
      <main id="main">
        <div class="setting-menu">
        	<div class="set-menu-lst-scroll">
        		<ul class="set-menu-lst">
	        		
	        		
	        	</ul>
        	</div>
        	<c:if test="${IS_ADMIN == 'true'}">
        	<a href="#none" class="set-menu-add">
        		<i class="xi-plus-circle"></i>
        		<span class="sr-only">Add menu</span>
        	</a>
        	</c:if>
        </div>
        
        
        <div class="set-layout-wrap">
        	<h2 class="heading7"><spring:message code="title.dashboard"/>
        		<span class="btns">
        		    <a onclick="emtpyGrid()" class="btn-style btn-style1"><spring:message code="button.default"/></a>
        		
        			<a onclick="loadListWidgets()" class="btn-style btn-style1">
<!--         				<i class="xi-refresh"></i> -->
<!--         				<span class="sr-only">Initialization</span> -->
						<spring:message code="button.restore"/>
        			</a>
        			<a onclick="saveGrid()" class="btn-style btn-style1"><spring:message code="button.save"/></a>
        		</span>
        	</h2>
        	
        	<div class="set-dashboard-layout" ondragover="allowDrop(event)" ondrop="drop(event)">
        		  
        	</div>
        </div>
      </main>
   
      <script type="text/javascript">
        $(document).ready(function() {
          $('body').addClass('setting-wrap');
          $('#header .t-side > ul > li').removeClass('active');
          $('#header .t-side > ul > li.change-layout-btn').addClass('active');
        });
      </script>
      <!--//main에만 들어가는 js-->