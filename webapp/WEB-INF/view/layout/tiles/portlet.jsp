<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<link media="screen" href="${ctxPath}/stylesheet/${design}/main.contents.css" rel="stylesheet" type="text/css" /> 

<style>

.widget{
	background: white;
/* 	border: 1px solid #c1c1c1; */
	position: absolute;
}

#widgetsArea{
	position: relative;
}

.title_widget{
	background: #3b3b3b;
	margin: 2px;
	text-align: center;
	color: white;
	line-height: 1.5;
	font-weight: bolder;
}

.content_widget{
	margin: 2px;
	width: 100%;
	height: 100%;
}

.area_info {
    background: #fff;
    margin-bottom: 30px;
    height: 225px;
    border: 1px solid #dee3eb;
    overflow: hidden;
    height: 100%; 
}
</style>
<script type="text/javascript">
var widgetsList = [];
var width, height, cellWidth, cellHeight;
var column = 5;
var row = 3;
var space = 30;
	
	$(document).ready(function(){
		getMyWidgetsList();
	
		height = parseInt(window.innerHeight) - 200;
		cellHeight = (height - (row-1)*space)/row;
		 $('#widgetsArea').css({"width":'100%', "height": height + "px"});
		width = $('#widgetsArea').width() ;
		cellWidth = (width - (column-1)*space)/column;
		
		$('#aaDialog').dialog({
			autoOpen: false
		});
	});
	
	
	function getMyWidgetsList(){
		
		  var url = CTX + '/common/common/portlet/getData02.ajax';
	
			$.ajax({
				url : url,// CTX+ url, )
				data : {
				},
				cache : false,
				success : function(data, textStatus, jqXHR) {
					// $target.dialog({width:'auto'})
					renderWidget(data);
					
				}
			});
	}
	
	
	function renderWidget(data){
// 		console.log(data);
		if(!data || data.length == 0){
			return false;
		}else{
			var area = $('#widgetsArea');
			  $.each(data, function(index, obj) { 
					var div = '<div class="widget" style="width: '+(obj.W*cellWidth +(obj.W- 1)*space) +'px; height: '+ (obj.H*cellHeight +(obj.H- 1)*space) +'px;  top: '+(obj.Y*cellHeight + obj.Y*space)+'px; left: '+(obj.X*cellWidth + obj.X*space)+'px">'
// 					+'<div class="title_widget">'+obj.TITLE+'</div>'
					+'<div id="widget_'+obj.WIDGET_ID+'" class="content_widget"><div>'
					+'</div>'
					area.append(div);
					//$("#widget_"+obj.WIDGET_ID).load(CTX+ obj.URL);
					$("#widget_"+obj.WIDGET_ID).append('<iframe id="frame_' + obj.WIDGET_ID + '" src="' + (CTX + obj.URL) + '" width="100%" height="100%" scrolling="no"></iframe>');
// 					return false;
				});
		}
	}
	
</script>


<div id="widgetsArea">

</div>
<div id="aaDialog">BBBBB</div>