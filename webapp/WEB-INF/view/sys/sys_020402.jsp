<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
/**
 * Role 관리
 */  
 var roleid = '${DATA.ROLE_ID}';

 var drawgrid2 = function(formId, data) {
	 var mydata = data;
		//프로그램 list
		$('#grid2').setViewGrid({
			id: 'grid2',
			displayState: false,
//	 		localData: mydata,
			url: CTX + '/sys/sys_0204/getPgmForRole.ajax?ROLE_ID=' + roleid,
			param : formId ,
			
			modelName: 'RESULTLIST',  
			gridOptions: {
				sortable:true, 	
				caption:'프로그램 List',
				loadonce:true,
				rownumbers:true,
				//gridPaginationLength:100,
// 				height: 700
				//pageSize: 10,
                //pageable: true
			},
			colModels: [	             
	 			{name:'UP_MENU_ID' ,id :'UP_MENU_ID', attrType:'text', hidden:true},
	 			{name:'LINK_PATH' ,id :'LINK_PATH', attrType:'text', hidden:true},
				{name:'<spring:message code="sys.sys_0203.list.label.menunm"/>2', id :'PGM_NM', align:'left', width:300, },

				{name:'<spring:message code="sys.sys_0203.list.label.menunm"/>', id :'PGM_NM', align:'left', width:300, attrType:'text'},
				{name:'<spring:message code="sys.sys_0203.list.label.menuid"/>', id :'MENU_ID', align:'left', width:135, attrType:'text'},
//	      	   	{name:'유형' ,id :'CLS', attrType:'select',typeValue:[{LABEL:'일반',DATA:'1'},{LABEL:'담당',DATA:'2'}]},
				{name:'<spring:message code="sys.sys_0204.list.label.charge"/>' ,id :'MNG_YN', hidden: true, attrType:'checkbox', typeOption: {typeHeader: true}, typeValue:[{DATA:'Y'},{DATA:'N'}]
	     	   		, cellattr:function(value,rowData,model,opts){ 
	     	   				if(rowData.P_MNG_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
	     	   	},
		   	   	{name:'<spring:message code="sys.sys_0204.list.label.read"/>' ,id :'READ_YN', attrType:'checkbox',typeOption: {typeHeader: true}, typeValue:[{DATA:'Y'},{DATA:'N'}]
	     	   		, cellattr:function(value,rowData,model,opts){ 
					     	if(rowData.P_READ_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
	     	   	},
	   	   		{name:'<spring:message code="sys.sys_0204.list.label.writing"/>' ,id :'WRT_YN', attrType:'checkbox',typeOption: {typeHeader: true}, typeValue:[{DATA:'Y'},{DATA:'N'}]
		     	   , cellattr:function(value,rowData,model,opts){ 
					     	if(rowData.P_WRT_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
	   	   		},
	   	   		{name:'수정' ,id :'MOD_YN', attrType:'checkbox',typeValue:[{DATA:'Y'},{DATA:'N'}], hidden:true
			   	   	, cellattr:function(value,rowData,model,opts){ 
					     	if(rowData.P_MOD_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
	   	   		},
	   	   		{name:'삭제' ,id :'DEL_YN', attrType:'checkbox',typeValue:[{DATA:'Y'},{DATA:'N'}], hidden:true
		     	   , cellattr:function(value,rowData,model,opts){ 
					     	if(rowData.P_DEL_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
	  	   		},
	   	   		{name:'Print' ,id :'PNT_YN', attrType:'checkbox',typeValue:[{DATA:'Y'},{DATA:'N'}], hidden:true
		     	   , cellattr:function(value,rowData,model,opts){ 
					     	if(rowData.P_PNT_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
	  	   		},
	   	   		{name:'<spring:message code="sys.sys_0204.list.label.excel"/>' ,id :'EXC_DN_YN', attrType:'checkbox',typeOption: {typeHeader: true}, typeValue:[{DATA:'Y'},{DATA:'N'}]
		     	   , cellattr:function(value,rowData,model,opts){ 
					     	if(rowData.P_EXC_DN_YN =='D'){ 
					     		return 'readonly="readonly"';
					  		}
					  }
//	   	   		, cellattr:function(rowid,cval,rawObject){
//	 	    	   		if(rawObject.USER_EXC_DN_YN =='N'){ 
//	 	    	   			return 'class="readonly"';
//	 	    	   		}
//	 	    	   	}
	  	   		},
//	    	   		{name:'LEV' ,id :'LEV',hidden:true},
	   	   		{name:'<spring:message code="sys.sys_0204.list.label.excel"/>',id :'ROLE_ID',attrType:'readonlytext', hidden:true},
	  	   		{name:'<spring:message code="sys.sys_0203.list.label.lev"/>', id :'LEV', width:50}
	   	   	], 
//	    	   	callback : 'callbackFunc2',
			callback: 'gridCallback',
		    treeview: {
			viewField:'PGM_NM', 		// 적용될 필드
			levField:'LEV', 			// LEVEL 필드
			codeField:'MENU_ID', 	
			pcodeField:'UP_MENU_ID'	// 주코드
		}, 
	   	   	defaultOptions: {align:'center', width:70, sortable:false},
	   	   // boundEvent : 'setStyle',
			btn:[
// 				{button:'saveBtn', func:'saveData', label:'<spring:message code="sys.sys_0201.list.label.submit"/>'},
			]		
		});
		
		return false;
	};

	function callbackFunc2(form, data){
			window.location.href = "";
	} ;
	
	function saveData() {
    	$('#loader').css("display",'block');
		//var dataItems = $('#table_grid2').getGrid().dataItems();
		var grid = $('#grid2').getViewGridWrap();
		var rowList = grid.getGrid().items();
		//console.log(rowList);
		/* $.each(rowList, function(i, obj){
			var param = {};
			$obj = $(obj);
			$('#grid2').getRowData(i)['BLD_PROC_ID'];
			param["CRUD"] =  $('#CRUD').val();
			param["DEL_YN"] = $('#DEL_YN').val();
			param["EXC_DN_YN"] = $('#EXC_DN_YN').val();
			param["LEV"] = $('#LEV').val();
			param["LINK_PATH"] = $('#LINK_PATH').val();
			param["MENU_ID"] = $('#MENU_ID').val();
			param["MNG_YN"] = $('#MNG_YN').val();
			param["MOD_YN"] = $('#MOD_YN').val();
			param["ORD_NO"] = $('#ORD_NO').val();
			param["PGM_NM"] = $('#PGM_NM').val();
			param["PNT_YN"] = $('#PNT_YN').val();
			param["P_DEL_YN"] = $('#P_DEL_YN').val();
			param["P_EXC_DN_YN"] = $('#P_EXC_DN_YN').val();
			param["P_MNG_YN"] = $('#P_MNG_YN').val();
			param["P_MOD_YN"] = $('#P_MOD_YN').val();
			param["P_PNT_YN"] = $('#P_PNT_YN').val();
			param["P_READ_YN"] = $('#P_READ_YN').val();
			param["P_WRT_YN"] = $('#P_WRT_YN').val();
			param["P_READ_YN"] = $('#P_READ_YN').val();
			param["READ_YN"] = $('#READ_YN').val();
			param["ROLE_ID"] = $('#ROLE_ID').val();
			param["UP_MENU_ID"] = $('#UP_MENU_ID').val();
			param["WRT_YN"] = $('#WRT_YN').val();
			
			var url = CTX + '/sys/sys_0204/save04.ajax';
			if($obj.$('#CRUD').val() == 'U'){
				$.ajax({
					url: url,
					type: 'POST',
					data: param,
					dataType: 'json',
					success: function(data, textStatus, jqXHR) {
						alert('<spring:message code="edu.edu_0201.list.alert.success"/>');
						//$(location).attr('href', CTX + '/sys/sys_0204/list');
					}
				});
			}
		}); */
		
		var $gridDom = $('#table_grid2').getFormViewGrid();
		var dataObj={};
		if($gridDom){
			$.each($gridDom, function(){
				dataObj[$(this).data('resultKey')] = JSON.stringify($(this).getDataSource().data().toJSON());
// 				dataObj[$(this).data('resultKey')] = $(this).getDataSource().data().toJSON();
// 				var arr = []
// 				 $(this).getDataSource().data().forEach(function (obj, i){
// 					 arr.push(obj.toJSON());
// 				 });
// 				 dataObj[$(this).data('resultKey')]  = arr;
			});
		}
		
		var url = CTX + '/sys/sys_0204/save04.ajax';
		$.ajax({
			url: url,
			type: 'POST',
			cache:false,
			data: dataObj,
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if(data === true ){
					alert('<spring:message code="message.saveSuccess"/>');
					callbackFunc2();
				}else{
	                alert('<spring:message code='message.saveFailed' />');
				}
            	$('#loader').css("display",'none');

			},
			error: function(xhr){
            	$('#loader').css("display",'none');
                alert('<spring:message code='message.saveFailed' />');
			}
		});
	}

	
	function gridCallback(form) {
// 		console.log(form);
		var $btn = $(document).find('span[data-func="saveData"]');
		if ($btn) {
			$btn.removeClass('ac_click');
			$btn.on('click', function() {
				/*
				 * @JK - 보안 취약점 수정
				 */
				//eval($(this).attr('data-func') + '()');
				window[$(this).attr('data-func')]();
			});
		}
	}
	
	var setStyle = function(){
		
		var grid = $('#grid2').getViewGridWrap();
		var rowList = grid.getGrid().items();

		$.each(rowList, function(i, obj){
			$obj = $(obj);
			var element = $obj.find('input[name="LINK_PATH"]')[0].outerHTML;
			var value = $(element).attr('value');
			
			var mng_yn = $obj.find('input[name="MNG_YN"]');
			var read_yn = $obj.find('input[name="READ_YN"]');
			var wrt_yn = $obj.find('input[name="WRT_YN"]');
			var mod_yn = $obj.find('input[name="MOD_YN"]');
			var del_yn = $obj.find('input[name="DEL_YN"]');
			var pnt_yn = $obj.find('input[name="PNT_YN"]');
			var exc_dn_yn = $obj.find('input[name="EXC_DN_YN"]');
			if(value == null || value ==''){
				mng_yn.attr('disabled', true);		
				read_yn.attr('disabled', true);	
				wrt_yn.attr('disabled', true);		
				mod_yn.attr('disabled', true);		
				del_yn.attr('disabled', true);		
				pnt_yn.attr('disabled', true);		
				exc_dn_yn.attr('disabled', true);	
			}


		});

	};
	
$(document).ready(function(){
	drawgrid2();	
});

function goList() {
	$(location).attr('href', CTX + '/sys/sys_0204/list');
}	
</script>

<div class="container system-wrap system-wrap1">
   
     <!-- 메뉴 엑세스 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
		
        <!--tit-wrap-->
        
	        <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
            <li class="bold">${DATA.ROLE_ID}</li>
	      
	      
	    </ul>
	  </div>
        <span style="font-size: 14px; font-style: italic;">* To display a sub-menu, please check on its parent-menu also.</span>
			<form:form action="${formPath}/save04.ajax" id="saveForm" data-func="saveData" data-callback="callbackFunc2">			
				<div id="grid2"></div>		
			</form:form>		
 		</div>
      <div class="system-right">
        <div class="btns">
        <c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
        
			<a class="btn-style btn-style1" onclick="saveData()"><spring:message code='button.save' /></a>
		</c:if>
			<a class="btn-style btn-style2" href=""><spring:message code='button.back' /></a>
		
        </div>
      </div>
    </div>

    <!-- //메뉴 엑세스 등록 -->
</div>

    <div id="loader" style="display: none" class="lds-dual-ring  overlay"></div>
