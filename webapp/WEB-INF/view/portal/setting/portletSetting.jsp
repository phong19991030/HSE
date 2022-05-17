<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>




<link href="${ctxPath}/stylesheet/app/gridstack.css" rel="stylesheet" type="text/css" /> 
<link href="${ctxPath}/stylesheet/app/gridstack-extra.css" rel="stylesheet" type="text/css" /> 
<script type="text/javascript" src="${ctxPath}/script/js/gridstack.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/gridstack.jQueryUI.js"></script>



<style>

.tab {
  overflow: hidden;
/*   border: 1px solid #ccc; */
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
    z-index: 3;
    bottom: 0;
    background: #fff;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #fff;
    margin-bottom: -1px;
    border-top: 2px solid #4a65f1;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 12px 12px 22px 12px;
  border: 1px solid #ccc; 
  border-top: none;
}

#portletSetting{
/* 	padding: 10px; */
}

.pnl_left{
  vertical-align: top;
  display: inline-block;
  width: 20%;
  margin-right: 10px;
}



.fake_header{
    height: 100px;
    background: #3b3b3b;
    margin: 0 0 5px 0;
}

.fake_menu{
    width: 15%;
    min-height: 515px;
    margin: -5px 5px 0 0;
    background: #c1c1c1;
    display: inline-block;
}
.preview_portlet{
    width: calc(80% - 20px);
    display: inline-block;
    border: 1px solid #ccc;
    padding: 11px 10px 32px 10px;
}

.item_content{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 50px);
    margin: 0 auto;
    display: inline-block;
}



.grid {
    display: inline-block;
    vertical-align: top;
    position: relative;
/*     border: 1px solid #c1c1c1; */
    min-height: 100px;
    width: calc(90% - 90px);
	margin: 10px 5px 0px 5px;
        height: 500px;
}



.widget-item{
	box-shadow:none;
	text-shadow:none;
	padding: 10px;
    border-radius: 0px;
    background: #92a2f5;
    color: white;
    border-top: 1px solid #c3ccfd;
    border-bottom: 1px solid #273eb7;
}

.copy-item {
    padding: 10px;
    border: 1px solid #92a2f5;
    /* border-radius: 10px; */
    background: #92a2f5;
    margin-right: 10px;
    color: white;
    border-top: 1px solid #c3ccfd;
    border-bottom: 1px solid #273eb7;
}
	
.btn_to_right{
	float:right;
	cursor: pointer;
	margin: 0 5px 0 5px;
}

.btn_edit{
	float: left;
	cursor: pointer;
	margin: 0 8px 0 5px;
}

.btn_to_right:active{
	color: #21b5d2;
}

.delete_item{
	position: absolute;
    top: 0;
    right: 6px;
        margin: 5px;
}
.delete_item:hover{
	color: #ff8686;
}

.edit_item{
	position: absolute;
    top: 0;
    right: 30px;
        margin: 5px;
}

.edit_item:hover{
	color:#21b5d2;
}

/* dialog */
#dialog-form{

}

.fake_item{
width: 100%; 
height: 25px; 
background: white; 
}

.grid-stack .content{
}

.grid-stack .contentArea{
	margin: 5px;
}

.button1{
    width: 100%;
    height: 50px;
    background: #273eb7;
    color: white;
    margin-bottom: 10px;
}

.button_act{
    width: 8%;
    height: 40px;
    background: #273eb7;
    color: white;
    margin: 11px 2px 13px 0px;
}

button.button_act i{
	margin-right: 5px
}

#listItem{
	height: 415px;
	overflow-y: auto;
}

#listHis{
	height: 495px;
	overflow-y: auto;
}

.imageWidget{
	background-image: url(../../../images/stnd/common/widgetIcons.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 40px;
    position: absolute;
    left: 50%;
    top: calc(50% + 13px);
    transform: translate(-50%,-50%);
}

.button2 {
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: #ffffff;
    font-weight: bolder;
}

.content_text{
    white-space: nowrap;
    width: calc(100% - 40px);
    overflow: hidden;
    text-overflow: ellipsis;
}

.btn_active{
    background: #5d77fb;
	border-bottom: 1px solid #758bfd;
    border-top: 1px solid #273eb7;
}

.grid-stack > .grid-stack-item > .grid-stack-item-content{
	border:0px;
	border-radius:0;
	background:#f1f1f1;
	box-shadow: none;
    text-shadow: none;
}

.grid-stack .contentArea {
	margin:0px;
    padding: 5px;
    background: #666666;
    font-size: 12px;
}

.grid-stack > .grid-stack-item > .ui-resizable-se {
    cursor: se-resize;
    width: 20px;
    height: 20px;
    right: 10px;
    bottom: 6px;
}

.group .group_title {
    position: relative;
    padding: 18px 0px 12px 18px;
    border-bottom: 1px solid #e6e6e6;
}

.write_tbl tbody th {
    padding: 1px 7px 0 18px;
    text-align: left;
    color: #818181;
}

.group .group_title .g_title_btn {
    position: absolute;
    top: 12px;
    right: 13px;
}


</style>


<script type="text/javascript">
var selectedItem;
var grid;
var columns, rows, copyId;
var cellHeight = 500/3 - 10;
var widgetsList;

//message


$(function () {
// 	 var options = {
// 	         cellHeight: cellHeight,
// 	        verticalMargin: 10
// 	    };
// 	    $('.grid-stack').gridstack(options);
// 	    grid = $('.grid-stack').data('gridstack');
		  
	  
	getMyWidgetsList();
	
});




	function getAllWidgetsList(){
		  var url = CTX + '/plt/plt_0101/getData03.ajax';
	
			$.ajax({
				url : url,// CTX+ url, )
				data : {
				},
				cache : false,
				success : function(data, textStatus, jqXHR) {
					// $target.dialog({width:'auto'})
					renderWidgetsList(data);
					
				}
			});
	}

	function renderWidgetsList(data){
		if(!data || data.length == 0){
			return false;
		}else{
			$('#listItem').empty()
			data.each(function(obj, index){

				var active = false;
				
// 				widgetsList.each(function(obj2, index2){
// 					if(obj.WIDGET_ID == obj2.WIDGET_ID){
// 						active = true;
// 					}
// 				});
				
				if(grid){
					var items = grid.grid.nodes;
					
					if(items.length == 0){
						active = false;
					} else {
						items.each(function(obj2, index2){
							if(obj.WIDGET_ID == $(obj2.el).attr("widget_id")){
								active = true;
								return;
							}
						});
					}
				}
				
				if(active){
					 div = '<div class="widget-item button2 btn_active" widget_id="'+obj.WIDGET_ID+'" url="'+obj.URL+'"> <div class="item_content">'+obj.TITLE+'</div><span onclick="editItem(event)" class="btn_edit ac_click"><i class="fa fa-list-alt"></i></span></div>';
					$('#listItem').append(div);
				}else{
					div = '<div class="widget-item button2" widget_id="'+obj.WIDGET_ID+'" url="'+obj.URL+'"> <div class="item_content">'+obj.TITLE+'</div><span onclick="editItem(event)" class="btn_edit ac_click"><i class="fa fa-list-alt"></i></span> <span onclick="addWidget(event)" class="btn_to_right ac_click"><i class="fa fa-share-square-o"></i></span></div>';
					$('#listItem').prepend(div);
				}
				
			});
		}
		
	}
	
	function getMyWidgetsList(){
		
		  var url = CTX + '/plt/plt_0101/getData02.ajax';
	
			$.ajax({
				url : url,// CTX+ url, )
				data : {
				},
				cache : false,
				success : function(data, textStatus, jqXHR) {
					// $target.dialog({width:'auto'})
					renderWidget(data);
					widgetsList = data.slice();
					getAllWidgetsList();
					
				}
			});
	}
	
	function openDialogAddWidget(){
		var url =  CTX + '/plt/plt_0101/form.dialog';
		var $target = generateDialogDom();
		
		$.ajax({
			url :url,// CTX+ url, )
			data : $.extend({
				'type' : 'dialog'
				,'cls' : ''
			}, {}),
			cache : false,
			success : function(data, textStatus, jqXHR) {
				$target.html(data);
			}
		});
	
		$target.dialog({
			resizable : false,
			width : parseInt(window.innerWidth) * 0.5,
			height: parseInt(window.innerHeight) * 0.5,
			modal: true,
			open : function(){$(".ui-dialog").css("box-shadow","#999 5px 5px 5px");},
			close : function() {
				destroyDialogPopup($target);
			}
		});
	}
	
	function renderWidget(data){
// 		console.log(data);
		if(!data || data.length == 0){
			return false;
		}else{
			copyId = data[0].COPY_ID;
			rows = data[0].NUMROW;
			columns = data[0].NUMCOLUMN;
			
			cellHeight =  500/rows - 10;
			$('#gridStackPlus').remove();

			var strStyle = "<style id='gridStackPlus' type='text/css'> ";
			for(i = 1; i<= columns; i++){
				strStyle += '.grid-stack > .grid-stack-item[data-gs-width="'+i+'"] {  width: '+(100.00*i/columns)+'%;}	.grid-stack > .grid-stack-item[data-gs-x="'+i+'"] {	  left:  '+(100.00*i/columns)+'%;	}		.grid-stack > .grid-stack-item[data-gs-min-width="'+i+'"] {		  min-width:  '+(100.00*i/columns)+'%;		}		.grid-stack > .grid-stack-item[data-gs-max-width="'+i+'"] {		  max-width:  '+(100.00*i/columns)+'%;		}'
			
			}
			strStyle+= "</style>";
			$(strStyle).appendTo("#portletSetting");

			 var options = {
			         cellHeight: cellHeight,
			        verticalMargin: 10
			    };
			 
			 $('.grid').empty().append('<div class="grid-stack"></div>')
			 $('.grid-stack').attr('data-gs-width', columns);
			 $('.grid-stack').attr('data-gs-height', rows);
			 
			 $('.grid-stack').gridstack(options);
			
			
	
				data.each(function(obj, index){
					 grid.addWidget(jQuery( '<div class="grid-stack-item"  widget_id="'+obj.WIDGET_ID+'"  url="'+obj.URL+'"><div class="grid-stack-item-content button2">' 
							 	+ '<div class="contentArea">'
							 	+ '<div class="content_text">'
							 	+'<span class="content">'
								+ obj.TITLE
								+'</span>'
								+ '</div>'
								+ '<div class="imageWidget"><img src="../../../images/stnd/common/widgetIcons.png" style="visibility: hidden;" /></div>'
								+ '</div>'
								+ '<span class="edit_item ac_click" onclick="editItem(event)"><i class="fa fa-pencil"></i></span>'
								+ '<span class="delete_item ac_click" onclick="deleteItem(event)"><i class="fa fa-trash"></i></span>'
								+ '</div></div>' ), obj.X, obj.Y, obj.W, obj.H, false);
					
				});
		}
	}

	function addWidget(obj){
		if(!grid){
			alert('Choose the size');
			return false;
		}
// 		console.log(obj.target);
		$(obj.target).closest('.widget-item').addClass('btn_active');
		var id = $(obj.target).closest('.widget-item').attr("widget_id");
		var url = $(obj.target).closest('.widget-item').attr("url");
		var title = $(obj.target).closest('.widget-item').find('div.item_content').html();
		grid.addWidget(jQuery( '<div class="grid-stack-item"  widget_id="'+id+'"  url="'+url+'"><div class="grid-stack-item-content button2">' 
			 	+ '<div class="contentArea">'
			 	+ '<div class="content_text">'
				+'<span class="content">'
				+ title
				+'</span>'
				+ '</div>'
				+ '<div class="imageWidget"><img src="../../../images/stnd/common/widgetIcons.png" style="visibility: hidden;" /></div>'
				+'</div>'
				+ '<span class="edit_item ac_click" onclick="editItem(event)"><i class="fa fa-pencil"></i></span>'
				+ '<span class="delete_item ac_click" onclick="deleteItem(event)"><i class="fa fa-trash"></i></span>'+ '</div></div>' ), 0, 0, 1, 1, true);
		
	    $(obj.target).closest('.widget-item').find('span.btn_to_right').remove();
		
	}
	
	function editItem(obj){
		
		var id,url_wg, title;
		
		id = $(obj.target).closest('.grid-stack-item').attr('widget_id');
		if(id){
			url_wg = $(obj.target).closest('.grid-stack-item').attr('url');
			title = $(obj.target).closest('.grid-stack-item').find('.content').html();
		}else{
			id = $(obj.target).closest('.widget-item').attr('widget_id');
			url_wg = $(obj.target).closest('.widget-item').attr('url');
			title = $(obj.target).closest('.widget-item').find('.item_content').html();
		}
		
		

			var url =  CTX + '/plt/plt_0101/edit/form.dialog';
			var $target = generateDialogDom();
			
			$.ajax({
				url :url,// CTX+ url, )
				data : $.extend({
					'type' : 'dialog'
					,'cls' : ''
				}, {
					"WIDGET_ID": id,
					"TITLE": title,
					"URL": url_wg
				}),
				cache : false,
				success : function(data, textStatus, jqXHR) {
					$target.html(data);
				}
			});

			$target.dialog({
				resizable : false,
				width : parseInt(window.innerWidth) * 0.5,
				height: parseInt(window.innerHeight) * 0.5,
				modal: true,
				open : function(){$(".ui-dialog").css("box-shadow","#999 5px 5px 5px");},
				close : function() {
					destroyDialogPopup($target);
				}
			});
	}


	function deleteItem(obj){
		var id = $(obj.target).closest('.grid-stack-item').attr('widget_id');
		if(!id){
			console.log('error: ID is undefine');
			return;
		}
		var item = $(obj.target).closest('.grid-stack-item');
		grid.removeWidget(item);
		$('#listItem .widget-item').each(function(index, object){
			if($(object).attr('widget_id') == id){
				var btn = '<span onclick="addWidget(event)" class="btn_to_right ac_click"><i class="fa fa-share-square-o"></i></span>';
				if($(object).find('span.btn_to_right').length<1){
					$(object).append(btn);
				}
				$(object).removeClass('btn_active');
			}
		});
	}
	
	function saveGrid(){
		console.log('save');
		var items = grid.grid.nodes;
		var widgets = [];
		if(items.length >0){
			items.each(function(obj, i){
// 				console.log(obj)
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
		console.log(widgets);
		
		var url = CTX + '/plt/plt_0101/save01.ajax';

		$.ajax({
			url : url,// CTX+ url, )
			data : {
				"WIDGETS": widgets,
				"COPY_ID": copyId,
				"NUMCOLUMN": columns,
				"NUMROW": rows
			},
			cache : false,
			success : function(data, textStatus, jqXHR) {
				// $target.dialog({width:'auto'})
				if(data.RESULT == 'OK'){
					alert('저장되었습니다.');	
				}
				copyId = data.copyId;
				console.log(copyId);
				getHistoryVersion();
				
				
			}
		});
	}
	
	function addWidgetCallback(obj){
		 grid.addWidget(jQuery( '<div class="grid-stack-item"  widget_id="'+obj.tempID+'" url="'+obj.url+'"><div class="grid-stack-item-content button2">' 
				 	+ '<div class="contentArea">'
				 	+ '<div class="content_text">'
				 	+'<span class="content">'
					+ obj.title
					+'</span>'
					+ '</div>'
					+ '<div class="imageWidget"><img src="../../../images/stnd/common/widgetIcons.png" style="visibility: hidden;" /></div>'
					+ '</div>'
					+ '<span class="edit_item ac_click" onclick="editItem(event)"><i class="fa fa-pencil"></i></span>'
					+ '<span class="delete_item ac_click" onclick="deleteItem(event)"><i class="fa fa-trash"></i></span>'+ '</div></div>' ), 0, 0, 1, 1,  true);
		 div = '<div class="widget-item button2 btn_active" widget_id="'+obj.tempID+'" url="'+obj.URL+'"> <div class="item_content">'+obj.title+'</div></div>';
		$('#listItem').append(div);
		
	}
	
	function updateWidgetCallback(data){
		$('#listItem').find('.widget-item').each(function(i, obj){
			if($(obj).attr('widget_id') == data.WIDGET_ID){
				$(obj).find('div.item_content').empty().append(data.TITLE);
				$(obj).attr('url', data.URL); 
			}
		});
		$('#portletSetting').find('.grid .grid-stack-item').each(function(i, obj){
			if($(obj).attr('widget_id') == data.WIDGET_ID){
				$(obj).find('span.content').empty().append(data.TITLE);
				$(obj).attr('url', data.URL); 
			}
		});
	}
	
	function deleteWidgetCallback(data){
		$('#listItem').find('.widget-item').each(function(i, obj){
			if($(obj).attr('widget_id') == data.WIDGET_ID){
				$(obj).remove(); 
			}
		});
		$('#portletSetting').find('.grid .grid-stack-item').each(function(i, obj){
			if($(obj).attr('widget_id') == data.WIDGET_ID){
				grid.removeWidget(obj);
			}
		});
	}
	
	function applyGridSetting(){
		if(!confirm(messageGridSettingConfirm)){
			return false;
		}
		
		var row = $('#row').val();
		var column = $('#column').val();
		if(!row || !column){
			
			alert(messageGridSettingRequired);

			return false;
		}
		
		cellHeight =  500/row - 10;
		$('#gridStackPlus').remove();
		var strStyle = "<style id='gridStackPlus' type='text/css'> ";
		for(i = 1; i<= column; i++){
			strStyle += '.grid-stack > .grid-stack-item[data-gs-width="'+i+'"] {  width: '+100.00*i/column+'%;}	.grid-stack > .grid-stack-item[data-gs-x="'+i+'"] {	  left:  '+100.00*i/column+'%;	}		.grid-stack > .grid-stack-item[data-gs-min-width="'+i+'"] {		  min-width:  '+100.00*i/column+'%;		}		.grid-stack > .grid-stack-item[data-gs-max-width="'+i+'"] {		  max-width:  '+100.00/column+'%;		}'
		
		}
		strStyle+= "</style>";
		$(strStyle).appendTo("#portletSetting");

		 var options = {
		         cellHeight: cellHeight,
		        verticalMargin: 10
		    };
		 
		 $('.grid').empty().append('<div class="grid-stack"></div>')
		 $('.grid-stack').attr('data-gs-width', column);
		 $('.grid-stack').attr('data-gs-height', row);
// 		 grid.removeAll();
		 
		 $('.grid-stack').gridstack(options);
		 grid = $('.grid-stack').data('gridstack');
		 
		 $('#listItem .widget-item').each(function(index, object){
				var btn = '<span onclick="addWidget(event)" class="btn_to_right ac_click"><i class="fa fa-share-square-o"></i></span>';
				if($(object).find('span.btn_to_right').length<1){
					$(object).append(btn);
				}
			});
		 
		 columns = column;
		 rows = row;
		 
		 var items = $('#listItem .widget-item.button2.btn_active');
		 $.each(items, function(i, item) {
			$(item).removeClass('btn_active');
		 });
		
	}
	
	function openTab(evt, id) {
		  var i, tabcontent, tablinks;
		  tabcontent = $(".tabcontent");
		  for (i = 0; i < tabcontent.length; i++) {
		    tabcontent.css("display","none");
		  }
		  tablinks = $(".tablinks");
		  for (i = 0; i < tablinks.length; i++) {
		    tablinks[i].removeClass("active");
		  }
		  $('#tab_'+id).css("display","block");
		  $(evt.currentTarget).addClass("active");
		  if(id == '1'){
			  initTab1();
		  }else if(id == '2'){
			  initTab2();
		  }
		}
	
	function initTab1(){
		getAllWidgetsList();
	}
	
	function initTab2(){
		getHistoryVersion();
	}
	
	function getHistoryVersion(){
		  var url = CTX + '/plt/plt_0101/getData04.ajax';
			
			$.ajax({
				url : url,// CTX+ url, )
				data : {
				},
				cache : false,
				success : function(data, textStatus, jqXHR) {
					// $target.dialog({width:'auto'})
				
					renderHistoryList(data)
				}
			});
	}
	
	function renderHistoryList(data){
		if(!data || data.length == 0){
			return false;
		}else{
			$('#listHis').empty();
			data.each(function(obj, index){
				var str = '';
				if(obj.COPY_ID == copyId){
					str = 'btn_active';
				}

				 div = '<div class="copy-item button2 '+str+'" copy_id="'+obj.COPY_ID+'"> <div class="item_content">'+obj.INS_DT+'</div><span onclick="getVersion(event)" class="btn_to_right ac_click"><i class="fa fa-share-square-o"></i></span><span onclick="deleteVersion(event)" class="btn_to_right ac_click"><i class="fa fa-trash"></i></span></div>';
					$('#listHis').append(div);
				
			});
		}
		
	}
	
	function deleteVersion(obj){
		if(!confirm(confirmDeleteMsg)){
			return false;
		}
		var copyId_2 = $(obj.target).closest('.copy-item').attr('copy_id');
		var url =  CTX + '/plt/plt_0101/delete02.ajax';
		
		$.ajax({
			url : url,// CTX+ url, )
			data : {
				COPY_ID: copyId_2
			},
			cache : false,
			success : function(data, textStatus, jqXHR) {
				// $target.dialog({width:'auto'})
// 				getHistoryVersion();
				$('#listHis div.copy-item').each(function(index, object){
					console.log('aa'+copyId_2)
					if($(object).attr('copy_id') == copyId_2){
						if($(object).hasClass('btn_active')){
							$(object).remove();
							var first =	$('#listHis div.copy-item')[0];
							$(first).find('span[onclick="getVersion(event)"]').click();
						}else{
							$(object).remove();
						}
						return false;
					}
				});
			 
				
			}
		});

		
	}

	function getVersion(obj){
		
		$('#listHis .copy-item').removeClass('btn_active');
		$(obj.target).closest('.copy-item').addClass('btn_active');
		
		var copyId_2 = $(obj.target).closest('.copy-item').attr('copy_id');
		var url =  CTX + '/plt/plt_0101/getData05.ajax';
		
		$.ajax({
			url : url,// CTX+ url, )
			data : {
				COPY_ID: copyId_2
			},
			cache : false,
			success : function(data, textStatus, jqXHR) {
				// $target.dialog({width:'auto'})
				renderWidget(data);
				widgetsList = data.slice();
				getAllWidgetsList();
				
			}
		});

		
	}
	
	function refreshGrid(){
		getMyWidgetsList();
	}
	
</script>






<div id="portletSetting">
	
				
<div class="pnl_left">
<div id="gridSetting">

		
		<!-- 사용자 등록 -->
		<fieldset>
			<legend>입력 및 선택한 조건으로 등록합니다.</legend>
			<div class="group" style="border: 1px solid #ccc;">
				<div class="group_title">
					<strong class="g_title">
<%-- 					<spring:message				code='title.portlet.gridSetting' /> --%>
 									</strong>
					<span class="g_title_tip"><em class="aster"><i class="icon-ok"></i></em></span>
					<div class="g_title_btn">
<!-- 						<span class="btn bts_snew ac_click sbtn" data-func="reset" data-param="F">신규</span> -->
<!-- 						<span class="btn btm_delete ac_click sbtn" data-func="doDelete"></span> -->
						<span class="btn btm_apply ac_click sbtn" data-func="applyGridSetting"></span>
					</div>
				</div>
				<div class="group_content write">
			<table id="orgSave" class="write_tbl">
				<caption></caption>
				<colgroup>
					<col style="width: 75px;">
					<col style="width: auto;">
				
				</colgroup>
				<tbody>
					<tr>
						<th><label for="title">
<%-- 						<spring:message 									code='label.portlet.rows' /> --%>
 									</label></th>  
						<td><input type="number" name="row" id="row" style="width: 230px" min="1" max="6"  required></td>
					</tr>
					<tr>
						<th><label for="url">
<%-- 						<spring:message code='label.portlet.columns' /> --%>
						</label>
						</th>
						<td><input type="number" name="column" id="column" style="width: 230px" min="1" max="10"  required></td>
					</tr>


				</tbody>
			</table>

				</div>
			</div>
		</fieldset>

</div>
<div>
			
<div class="tab">
  <button class="tablinks active" onclick="openTab(event, '1')">Widgets list</button>
  <button class="tablinks" onclick="openTab(event, '2')">Versions</button>
</div>

<div id="tab_1" class="tabcontent" style="display:block">

			<div id="listItem">
</div>
	<button class="button button1" style="    margin-top: 20px;" onclick="openDialogAddWidget()">
<%-- 	<spring:message	code='title.form.newWidget' /> --%>
 									</button>

</div>

<div id="tab_2" class="tabcontent">
  <div id="listHis">
	</div>
</div>
		
	
</div>


</div>

<div class="preview_portlet">
<div style="text-align: right;">
	<button class="button button_act" onclick="refreshGrid()"><i class="fa fa-refresh"></i>
<%-- 	<spring:message		code='title.portlet.label.rollback' />  --%>
 									</button>
	<button class="button button_act" style="background: #3b3b3b;" onclick="saveGrid()"><i class="fa fa-floppy-o"></i><spring:message
 									code='button.save' /> </button>

	
</div>
<div id="previewGrid" style="border: 1px solid #ccc;">

<div class="fake_header">
	<div class="fake_item" style="height: 43% !important">
	<div ">
		<img src="${ctxPath}/images/stnd/common/header_img.png">
	</div>
	</div>
</div>
<div class="fake_menu">
		<img src="${ctxPath}/images/stnd/common/menu_img.png">


</div>

<div class="grid">
<div class="grid-stack" data-gs-width="5" data-gs-height="3">
 
  
</div>
 

</div>
</div>
</div>
</div>





