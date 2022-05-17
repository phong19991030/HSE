<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">


$(document).ready(function(){

	/* var defaultValue = '${param.defaultValue}';
	
	if(defaultValue === "" || defaultValue === null) { */
	var defaultValue = '${param.defaultValue}';
	//console.log("AA "+defaultValue);
	//getData();
	var strFarmIds = '${strFarmIds}';
	var arrFarmIds = strFarmIds.split(",");	
	for(var i=0; i<arrFarmIds.length; i++){
		//console.log("CC "+arrFarmIds[1])
	}
	
	
	  $("#layerPopup .layer-cont .base_grid_table").mCustomScrollbar({
		    axis: "YX",
		    theme: "minimal-dark",
		    mouseWheelPixels: 300
		  });
	
	changeFarmAction();
	changeGroupAction();
	changeGeneratorAction();

});

function changeFarmAction(){

		 
	$('.base_grid_table.farm thead .checkbox-radio-custom').unbind('click').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var isChecked = $(this).find('input').is(':checked');
		 $('.base_grid_table.group tbody').empty();
		if(!isChecked){
			 $(this).find('input').prop('checked', true).trigger('change');
		
			 $('.base_grid_table.farm tbody .checkbox-radio-custom input').each(function(i) {
				$(this).prop('checked', true);
				getDataGroup($(this).attr('farm-id'));
			 });
		}else{
			 $(this).find('input').prop('checked', false).trigger('change');
			 $('.base_grid_table.farm tbody .checkbox-radio-custom > input').prop('checked', false);
		}
		$('.base_grid_table.turbine tbody').empty()
		$('.base_grid_table.group thead  .checkbox-radio-custom input').prop('checked', false).trigger('change');
		$('.base_grid_table.turbine thead  .checkbox-radio-custom input').prop('checked', false).trigger('change');

	});
	
	
	$('.base_grid_table.farm tbody .checkbox-radio-custom').unbind('click').click(function(e){
	 
		e.preventDefault();
		e.stopPropagation();
		
		var isChecked = $(this).find('input').is(':checked');
		console.log(isChecked);
		if(!isChecked) {
				
				getDataGroup($(this).find('input').attr('farm-id'));
				$(this).find('input').prop('checked', true);

		}else {
		
			$(this).find('input').prop('checked', false);
			$('.base_grid_table.group tbody .checkbox-radio-custom[farm-id='+$(this).find('input').attr('farm-id') +']').closest('tr').remove();
			$('.base_grid_table.turbine tbody .checkbox-radio-custom[farm-id='+$(this).find('input').attr('farm-id') +']').closest('tr').remove();
			$('.base_grid_table.farm thead .checkbox-radio-custom > input').prop('checked', false);
		}
	});
}

function changeGroupAction(){

	 
	$('.base_grid_table.group thead .checkbox-radio-custom').unbind('click').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var isChecked = $(this).find('input').is(':checked');
		 $('.base_grid_table.turbine tbody').empty();
		if(!isChecked){
			 $(this).find('input').prop('checked', true).trigger('change');
		
			 $('.base_grid_table.group tbody .checkbox-radio-custom input').each(function(i) {
				$(this).prop('checked', true);
				getDataGenerator($(this).attr('group-id'));
			 });
		}else{
			 $(this).find('input').prop('checked', false).trigger('change');
			 $('.base_grid_table.group tbody .checkbox-radio-custom > input').prop('checked', false);
		}
		$('.base_grid_table.turbine thead  .checkbox-radio-custom input').prop('checked', false).trigger('change');

	});
	
	
	$('.base_grid_table.group tbody .checkbox-radio-custom').unbind('click').click(function(e){
	 
		e.preventDefault();
		e.stopPropagation();
		
		var isChecked = $(this).find('input').is(':checked');
		console.log(isChecked);
		if(!isChecked) {
				
			getDataGenerator($(this).find('input').attr('group-id'));
				$(this).find('input').prop('checked', true);

		}else {
			$(this).find('input').prop('checked', false);
			$('.base_grid_table.turbine tbody .checkbox-radio-custom[group-id='+$(this).find('input').attr('group-id') +']').closest('tr').remove();
			$('.base_grid_table.turbine tbody .checkbox-radio-custom[group-id='+$(this).find('input').attr('group-id') +']').closest('tr').remove();
			$('.base_grid_table.group thead .checkbox-radio-custom > input').prop('checked', false);
		}
	});
}



function changeGeneratorAction(){
	$('.base_grid_table.turbine thead .checkbox-radio-custom').unbind('click').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var isChecked = $(this).find('input').is(':checked');
// 		 $('.base_grid_table.turbine tbody').empty();
		if(!isChecked){
			 $(this).find('input').prop('checked', true).trigger('change');
			 $('.base_grid_table.turbine tbody .checkbox-radio-custom input').each(function(i) {
				$(this).prop('checked', true);
			 });
		}else{
			 $(this).find('input').prop('checked', false).trigger('change');
			 $('.base_grid_table.turbine tbody .checkbox-radio-custom > input').prop('checked', false);
		}
	});
	
	
	$('.base_grid_table.turbine tbody .checkbox-radio-custom').unbind('click').click(function(e){
	 
		e.preventDefault();
		e.stopPropagation();
		
		var isChecked = $(this).find('input').is(':checked');
		console.log(isChecked);
		if(!isChecked) {
				$(this).find('input').prop('checked', true);

		}else {
			$(this).find('input').prop('checked', false);
			$('.base_grid_table.turbine thead .checkbox-radio-custom > input').prop('checked', false);
		}
	});
}


function getDataGroup(farmId){
	
	var url = 	CTX+'/common/popup/getDataGroup';
	console.log(url);
	   $.ajax({
	        url: url,
	        data:  {"FARM_ID": farmId} ,
	        success: function (response) {
	        	console.log(response);

	        	renderGroupList(response);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}

function renderGroupList(list){

	if(!list || list.length <= 0 ){
		return false;
	}
	for(i = 0; i< list.length; i++){
		var str ='<tr>'
		+'<td>'
		+' <div class="checkbox-radio-custom" farm-id="'+list[i].FARM_ID+'">'
		+'   <input type="checkbox" class="checkbox" group-id="'+list[i].GROUP_ID+'" id="groupName_'+list[i].GROUP_ID+'">'
		+'   <label for="groupName_'+list[i].GROUP_ID+'" >'+list[i].GROUP_NM+'</label>'
		+' </div>'
		+'</td>'
		+'</tr>';
		
		$('.base_grid_table.group tbody').append(str);
	}
	changeGroupAction()
}

function getDataGenerator(groupId){

	var url = 	CTX+'/common/popup/getDataGenerator';
	console.log(url);
	   $.ajax({
	        url: url,
	        data:  {"GROUP_ID": groupId} ,
	        success: function (response) {
	        	console.log(response);

	        	renderGeneratorList(response);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}

function renderGeneratorList(list){
	if(list && list.length >0){
	
		for(var i = 0; i<list.length; i++){
			var str ='<tr>'
				+'<td>'
				+' <div class="checkbox-radio-custom" farm-id="'+list[i].FARM_ID+'" group-id="'+list[i].GROUP_ID+'">'
				+'   <input type="checkbox" class="checkbox" turbine-id="'+list[i].GERATOR_ID+'" id="groupName_'+list[i].GERATOR_ID+'">'
				+'   <label for="groupName_'+list[i].GERATOR_ID+'" >'+list[i].GERATOR_NM+'</label>'
				+' </div>'
				+'</td>'
				+'</tr>';
			$('.base_grid_table.turbine tbody').append(str);
		}
		changeGeneratorAction()
	
	}
	
}



function onSave(obj){

	var texts = "";
	var codes = "";
	var dataItems = $('.base_grid_table.turbine .checkbox-radio-custom');
	$.each(dataItems, function(index, obj) {
		
		if($(this).find('input:checked').length>0){
			if (!codes) {
				codes = $(this).find('input').attr('turbine-id');
			}else {
				codes = codes+","+ $(this).find('input').attr('turbine-id');                                                                                                                                      
			}
			
			if (!texts) {
				texts = $(this).find('label').text();
			}
			else {
				texts = texts+","+$(this).find('label').text();
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
	destroyDialogPopup($("#layerPopup"));

}



</script>

<div class="tit-wrap">
        <strong class="heading6">Permission setting</strong>
      </div>

      <div class="btn-table">
        <div class="base_grid_table farm">
          <table>
            <caption>Permission setting - Farm name</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="farmNam">
                    <label for="farmNam"><spring:message code='title.farm.FARM_NM' /></label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
            <c:forEach items="${listAllFarm}"  var="farm">
	            <tr>
	                <td>
	                  <div class="checkbox-radio-custom">
	                    <input type="checkbox" class="checkbox" farm-id="${farm.FARM_ID}" id="farmNam_${farm.FARM_ID}" <c:if test="${farm.selected}"> checked</c:if>>
	                    <label for="farmNam_${farm.FARM_ID}" farm-id="${farm.FARM_ID}">${farm.FARM_NM}  </label>
	                  </div>
	                </td>
	              </tr>
            </c:forEach>
            </tbody>
          </table>
        </div>
        <div class="base_grid_table group">
          <table>
            <caption>Permission setting - Group name</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="groupName">
                    <label for="groupName"><spring:message code='title.tb.GROUP_NM' /></label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
            <c:forEach items="${listExitsGroup}" var="group">
	            <tr>
	                <td>
	                  <div class="checkbox-radio-custom">
	                    <input type="checkbox" class="checkbox" id="groupName_${group.GROUP_ID}" <c:if test="${group.selected}"> checked</c:if>>
	                    <label for="groupName_${group.GROUP_ID}" group-id="${group.GROUP_ID}" >${group.GROUP_NM}</label>
	                  </div>
	                </td>
	              </tr>
            </c:forEach>
              
            </tbody>
          </table>
        </div>
        <div class="base_grid_table turbine">
          <table>
            <caption>Permission setting - Turbine name</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName">
                    <label for="turbineName"><spring:message code='title.tb.GERATOR_NM' /></label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
            <c:forEach items="${listExitsTurbine}" var="turbine">
             <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName_${turbine.GERATOR_ID}" <c:if test="${turbine.selected}"> checked</c:if>>
                    <label for="turbineName_${turbine.GERATOR_ID}" generator_id="${turbine.GERATOR_ID}" >${turbine.GERATOR_NM}</label>
                  </div>
                </td>
              </tr>
            </c:forEach>
             
            </tbody>
          </table>
        </div>
        <div class="footer_table_btn">
<!--           <a href="" class="btn">Cancel</a> -->
          <a onclick="onSave(event)" class="btn">Select</a>
        </div>
      </div>
<script>


</script>