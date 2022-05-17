<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">

/* function doSubmit() {
	$('.form_search_box#popupDrawgrid').trigger('submit');
}

function changeCls() {
    $('input[name=SE_CLS]').change(function(){
        $('.form_search_box#popupDrawgrid').submit();
    });
}

function searchBoxReset() {
 	$('.form_search_box#popupDrawgrid').each(function() {  
        this.reset();  
    });  
 	doSubmit();
} */

$(document).ready(function(){

	/* var defaultValue = '${param.defaultValue}';
	
	if(defaultValue === "" || defaultValue === null) { */
	var defaultValue = '${param.defaultValue}';
	console.log("AA "+defaultValue);
	//getData();
	var strFarmIds = '${strFarmIds}';
	var arrFarmIds = strFarmIds.split(",");	
	for(var i=0; i<arrFarmIds.length; i++){
	}
	
	$('.cls_Farm').change(function() {
		if("id_farm_all" == $(this).attr('id')){
			/* if(this.checked){
				$(".cls_Farm").each(function() {
					if($(this).attr("id") != "id_farm_all"){
						if(!this.checked){
							$(this).prop("checked");
							remakeGroupList(farmId,true);
						}
					}
				});
			}else{
				
			
				remakeGroupList(0,this.checked);
			} */
			
		}else{
			var farmId = $(this).attr('id').substring(8,$(this).attr('id').length);
			remakeGroupList(farmId,this.checked);
			remakeGenList(null,farmId,this.checked);
		}
	});
	
	
	$('.cls_group').change(function() {
		if("cls_group_all" == $(this).attr('id')){
			
		}else{
			
			var groupId = $(this).attr('id').substring(9,$(this).attr('id').length);
			remakeGenList(groupId,"",this.checked);
			
		}
	});
	
});

function remakeGroupList(farm_id,isChecked){
	var url = 	CTX+'/common/popup/getDataGroup';
	
   	$.ajax({
        url: url,
        data:  {"FARM_ID": farm_id} ,
        success: function (response) {
        	doGroupList(response,isChecked,farm_id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    }); 
}

function remakeGenList(group_id,farm_id,isChecked){
	var url = 	CTX+'/common/popup/getDataGenerator';
	
  	$.ajax({
        url: url,
        data:  {"GROUP_ID": group_id} ,
        success: function (response) {
        	doGeneratorList(response,group_id,farm_id,isChecked);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    }); 
}

function doGeneratorList(list,group_id,farm_id,isChecked){
	var str0= '<label class="containerCheckbox" style="display: flex;">' 
	+'<input type="checkbox" name="farm_check" class="cls_gen_all cls_group" id="id_gen_all">'
	+'<span class="checkmark"></span>'
	+'All'
	+'</label>'

	var str = "";
	if(isChecked){
		if(list && list.length >0){
			for(var i = 0; i<list.length; i++){
				str += '<label class="containerCheckbox" style="display: flex;">' 
					+'  <input type="checkbox" name="generator_check" class="cls_gen cls_gen_'+list[i].GERATOR_ID+'" id="id_gen_'+list[i].GERATOR_ID+'" tag="'+list[i].FARM_ID+'" gro="'+list[i].GROUP_ID+'">'
					+'  <span class="checkmark"></span>'
					+ list[i].GERATOR_NM
					+'</label>';
			}
		}
		if(!farm_id){
			if( $('div.col.generatorCol  .list').is(':empty') ) {
				$('div.col.generatorCol  .list').append(str0);
				$('div.col.generatorCol  .list').append(str);
			}else {
				$('div.col.generatorCol  .list').append(str);
			}
		}
	}else{
		if(farm_id){
			$(".cls_group").each(function() {
			   	var tmp = $(this).attr("tag");
			   	var taget = $(this).parent();
			   	if(farm_id == tmp){
			   		taget.remove();	   		
			   	}
			});
			
			$(".cls_gen").each(function() {
			   	var tmp = $(this).attr("tag");
			   	var taget = $(this).parent();
			   	if(farm_id == tmp){
			   		taget.remove();	   		
			   	}
			});
		}
		
		if(group_id){
			$(".cls_gen").each(function() {
			   	var tmp = $(this).attr("gro");
			   	var taget = $(this).parent();
			   	if(group_id == tmp){
			   		taget.remove();	   		
			   	}
			});
		}
		
	}
}

function doGroupList(list,isChecked,farm_id){
	var str0= '<label class="containerCheckbox" style="display: flex;">' 
	+'<input type="checkbox" name="farm_check" class="cls_group_all cls_group" id="id_group_all">'
	+'<span class="checkmark"></span>'
	+'All'
	+'</label>'
	
	var str = "";
	if(isChecked){
		if(list && list.length >0){
			for(var i = 0; i<list.length; i++){
				str += '<label class="containerCheckbox" style="display: flex;" >'
				+'  <input type="checkbox"  name="group_check" class="cls_group cls_group_'+list[i].GROUP_ID+'" id="id_group_'+list[i].GROUP_ID+'" tag="'+list[i].FARM_ID+'">'
				+'  <span class="checkmark" group_id="'+list[i].GROUP_ID+'"></span>'
				+ list[i].GROUP_NM
				+'</label>' ;
			}
		}
		if(farm_id == ""){
			
		}
		if( $('div.col.groupCol  .list').is(':empty') ) {
			$('div.col.groupCol  .list').append(str0);
			$('div.col.groupCol  .list').append(str);
		}else{
			$('div.col.groupCol  .list').append(str);
		}
	}else{
		
		if(farm_id == ""){
			$('div.col.groupCol  .list').empty();
			$('div.col.generatorCol  .list').empty();
		}else{
			$(".cls_group").each(function() {
			   	var tmp = $(this).attr("tag");
			   	var taget = $(this).parent();
			   	if(farm_id == tmp){
			   		taget.remove();	   		
			   	}
			});
		}
	}
	
	//
	$('.cls_group').change(function() {
		if("cls_group_all" == $(this).attr('id')){
			
		}else{
			var groupId = $(this).attr('id').substring(9,$(this).attr('id').length);
			remakeGenList(groupId,null,this.checked);
			
		}
	});
}
	

/* 
function getData(){
	
	var url = 	CTX+'${urlGetData}';
	
	   $.ajax({
	        url: url,
	        data:  {} ,
	        success: function (response) {
	        	
	        	renderFarmList(response);
	        	console.log("xong");
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}


function getDataGroup(farm_id){
	
	var url = 	CTX+'/common/popup/getDataGroup';
	
	   $.ajax({
	        url: url,
	        data:  {"FARM_ID": farm_id} ,
	        success: function (response) {
	        	renderGroupList(response,farm_id);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
} */


function renderGroupList(list,farm_id){
	
	if(list && list.length >0){
		
		var str = "";
		
		for(var i = 0; i<list.length; i++){

			str += '<div class="item" group_id="'+list[i].GROUP_ID+'" name="'+farm_id+'"><label class="containerCheckbox">' + list[i].GROUP_NM
			+'  <input type="checkbox"  name="group_check">'
			+'  <span class="checkmark" group_id="'+list[i].GROUP_ID+'"></span>'
			+'</label></div>' ;

		}
		
		var str0= '<div class="item1"><label class="containerCheckbox">' + 'All'
		+'  <input type="checkbox" name="farm_check">'
		+'  <span class="checkmark"></span>'
		+'</label></div>'
		if( $('div.col.groupCol  .list').is(':empty') ) {
			
			$('div.col.groupCol  .list').append(str0);
			$('div.col.groupCol  .list').append(str);
			
			
		}else{
			$('div.col.groupCol  .list').append(str);
			
		} 
			
			$('div.col.groupCol .item1').unbind('click').click(function(e){
				
				e.preventDefault();
				e.stopPropagation();
				if (e.target.tagName  && e.target.tagName.toLowerCase()  == 'input')
				    return;
				
				var $div_group= $('div.col.groupCol .item')
				var $checkbox_all = $('div.col.groupCol .item1').find('input[type="checkbox"]');
				var isChecked = $checkbox_all.is(':checked');
				if(!isChecked) {
					 $div_group.each(function(i) {
						$('div.col.generatorCol  .item1').remove();	
						//$('div[name='+$(this).attr('group_id')+']').remove();
		 				$('div[name='+$(this).attr('group_id')+']').remove();
						var $checkbox = $(this).find('input[type="checkbox"]');
						
						getDataGenerator($(this).attr('group_id'),$(this).attr('name'));
						$checkbox.prop('checked', true);
						$checkbox_all.prop('checked', true);
					});
				}else {
					
					$div_group.each(function(i) {
						
						var $checkbox = $(this).find('input[type="checkbox"]');
				
						$checkbox.prop('checked', false);
						$checkbox_all.prop('checked', false);
						
		 				$('div[name='+$(this).attr('group_id')+']').remove();
					});
					$('div.col.generatorCol  .item1').remove();	
				}
				
				
			});
						
			$('div.col.groupCol .item').unbind('click').click(function(e){
				
				e.preventDefault();
				e.stopPropagation();
				if (e.target.tagName  && e.target.tagName.toLowerCase()  == 'input')
				    return;
				
				var $checkbox = $(this).find('input[type="checkbox"]');
				//$checkbox.prop('checked', true);
				
	 			var isChecked = $checkbox.is(':checked');
	 			if (!isChecked) {
	 				getDataGenerator($(this).attr('group_id'),$(this).attr('name'));
	 				$checkbox.prop('checked', true);
	 			} else {
	 				$('div.col.groupCol .item1').find('input[type="checkbox"]').prop('checked', false);
	 				$checkbox.prop('checked', false);
					
					$('div[name='+$(this).attr('group_id')+']').remove();
	 				//$('div.col.groupCol  .list').empty();
	 				//$('div.col.generatorCol  .list').empty();				
	 			}	
	 			
	 			var $div_genarator = $('div.col.generatorCol  .item');
	 			 if( $div_genarator.length === 0 ) {
						$('div.col.generatorCol  .item1').remove();	
				}
			});
		
			
			//aaa

	}
}

function getDataGenerator(group_id,farm_id){

	var url = 	CTX+'/common/popup/getDataGenerator';
	
	   $.ajax({
	        url: url,
	        data:  {"GROUP_ID": group_id} ,
	        success: function (response) {
	        	

	        	renderGeneratorList(response,group_id,farm_id);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}

function renderGeneratorList(list,group_id,farm_id){
	

	if(list && list.length >0){
		var str = "";
		var str2 = "";
		
		for(var i = 0; i<list.length; i++){

			str2 += '<div class="item" generator_id="'+list[i].GERATOR_ID+'" name="'+group_id+'" name1="'+farm_id+'"><label class="containerCheckbox">' + list[i].GERATOR_NM
				+'  <input type="checkbox" value="month" name="generator_check">'
				+'  <span class="checkmark"></span>'
				+'</label></div>';
		}
		
		var str0= '<div class="item1"><label class="containerCheckbox">' + 'All'
		+'  <input type="checkbox" name="farm_check">'
		+'  <span class="checkmark"></span>'
		+'</label></div>'
		
		if( $('div.col.generatorCol  .list').is(':empty') ) {
			$('div.col.generatorCol  .list').append(str0);
			$('div.col.generatorCol  .list').append(str2);
		}else {
			$('div.col.generatorCol  .list').append(str2);
		}
		
		
		$('div.col.generatorCol .item1').unbind('click').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			if (e.target.tagName  && e.target.tagName.toLowerCase()  == 'input')
			    return;
		
			var $div_generatorCol= $('div.col.generatorCol .item')
			var $checkbox_all = $('div.col.generatorCol .item1').find('input[type="checkbox"]');
			var isChecked = $checkbox_all.is(':checked');
			if(!isChecked) {
				 $div_generatorCol.each(function(i) {
					
	 				
					var $checkbox = $(this).find('input[type="checkbox"]');
				
					$checkbox.prop('checked', true);
					$checkbox_all.prop('checked', true);
				});
			}else {
				
				$div_generatorCol.each(function(i) {
					
					var $checkbox = $(this).find('input[type="checkbox"]');
			
					$checkbox.prop('checked', false);
					$checkbox_all.prop('checked', false);
					
				});
				
			}
		});
		
		$('div.col.generatorCol .item').unbind('click').click(function(e){
		
			e.preventDefault();
			e.stopPropagation();
			if (e.target.tagName  && e.target.tagName.toLowerCase()  == 'input')
			    return;
			
			var $checkbox = $(this).find('input[type="checkbox"]');
			
 			var isChecked = $checkbox.is(':checked');
 			if (!isChecked) {
 				
 				$checkbox.prop('checked', true);
 			} else {
 				$('div.col.generatorCol .item1').find('input[type="checkbox"]').prop('checked', false);
 				$checkbox.prop('checked', false);

 			}	
		});
	}
}


function onSave(obj){
	
	var texts = "";
	var codes = "";
	var dataItems = $('div.col.generatorCol .item');
	$.each(dataItems, function(index, obj) {
		
		if($(this).find('input[name="generator_check"]:checked').length>0){
			if (!codes) {
				codes = $(this).attr('generator_id');
			}else {
				codes = codes+","+ $(this).attr('generator_id');
			}
			
			if (!texts) {
				texts = $(this).text();
			}
			else {
				texts = texts+","+$(this).text();
			}
		}
	});

	var target = '${param.target}';
	var type = '${param.type}';
	var callback = '${param.callback}';
	
	var $target = $('#' + target.replace(/\./g, '\\.'));	
	var $prevTarget = $target.parents('.bodyContents').find('[name="' + $target.data('prev') + '"]#'+ $target.data('prev').replace('.', '\\.')).eq(0);		// $target.prev('[name="' + $target.data('prev') + '"]').eq(0);
	var $nextTarget = $target.parents('.bodyContents').find('[name="' + $target.data('next') + '"]#'+ $target.data('next').replace('.', '\\.')).eq(0); 	// $target.next('[name="' + $target.data('next') + '"]').eq(0)

	
	var prevField = $target.data('targettext');
	var nextField = $target.data('targetcode');
	
	var GERATOR_ID = codes;
	var GERATOR_NM = texts;

	$prevTarget.val(GERATOR_NM).trigger('change');
	$nextTarget.val(GERATOR_ID).trigger('change');
	
	if(callback) eval(callback);	
	$(obj.target).closest('.a2m_dialog.ui-dialog-content').dialog('close');
}


</script>

<style>
.table{

	width: 100%;
	height: auto;
	background: #f3f3f3;
	
}

 .list {
	overflow-y: scroll;
	max-height: 400px;
	
}  

 .col{
	width: 32%;
	height: 400px;
	display: inline-table;
	background: #f3f3f3;
	overflow-y: scroll; 
} 

.farmCol, .groupCol{
	width: 33%;
	
/* 	border-right: 1px solid #c1c1c1; */
}
.title1{
    text-align: center;
    font-weight: 700;
    background: white;
/*     border-bottom: 1px solid #c1c1c1; */
    padding: 15px;
    background: #fff;
    display: inline-table;
    width: 33%
}
.item{
	padding: 10px 10px;
}

.popupTitle{
	text-align: left;
	font-size: 24px;
	font-weight: 800;
	color: #888888;
	display: inline-table;
	
}
.popupButton{
	float: right;
	display: inline-table;
	margin: 10px;
}

.item span{
	margin-right: 10px;
}

</style>
<div id="popup_wrapper">

		<div >
		<h3><spring:message code='title.popup.generator' /> --  ${param.session.USER_ID}  --- ${param.MDFY_EMP_NO}</h3>
		<div class="popupTitle">
		</div>
		<div class="popupButton">
		</div>
		</div>
	<div>
	
		<input hidden id="doan" value="${model.urlGetData}" >
		<input hidden name="select.GERATOR_NM">
		<input hidden name="select.GERATOR_ID">
			
		<div class="table search_tbl" >
			<div style="width: 100%; background: #fff;">
							<div class="title1"><spring:message code='title.farm.FARM_NM' /></div>
							<div class="title1"><spring:message code='title.tb.GROUP_NM' /></div>
							<div class="title1"><spring:message code='title.tb.GERATOR_NM' /></div>
			
			</div>
			<div class="col farmCol">
				<div class="list">
					<label class="containerCheckbox" style="display: flex;">
						<input type="checkbox" name="farm_check" class="cls_Farm cls_Farm_All" id="id_farm_all">  <span class="checkmark"></span>
						All  	
					</label>
					<c:forEach items="${listAllFarm}" var="farm">
						<label class="containerCheckbox" style="display: flex; ">
							<input type="checkbox" name="farm_check" class="cls_Farm cls_Farm_${farm.FARM_ID}" id="id_farm_${farm.FARM_ID}">  <span class="checkmark"></span>
							${farm.FARM_NM}
						</label>
					</c:forEach>
					
				</div>
				
			</div><div class="col groupCol">
				<div class="list"></div>
			
			</div><div class="col generatorCol">
				<div class="list"></div>
			
			</div>
		
		</div>
	</div>
	<div class="btn_area"><button class="basic_btn" onclick="onSave(event)">OK</button>
	</div>
	
</div>	