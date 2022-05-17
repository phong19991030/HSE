<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">
<script type="text/javascript" >
/*  001 - common code, 002-Maintence code, 003-Part code, 004-Alarm code*/

var drawgrid_comm = function(formId,data){
	$('#grid1').setViewGrid({
		id:'grid1',
		type:'tree',
		seq: true,
		displayState : false ,	
		pinHeader : false, 		
		url:CTX+'/sys/sys_0101/getCommonCode.ajax',
		param : formId, 
		localData: data,  
		modelName : 'RESULTLIST',
		gridOptions : {caption: '<spring:message code='sys.sys_0101.list.Comm' />', loadonce:true, rownumber:false,
// 			height: 520
			//pageSize: 10,
            //pageable: true
			},
		colModels : [
   	   		{name:'<spring:message code='sys.sys_0101.list.title.code' />', id :'CODE', align:'left !important'},  
   	   		{name:'<spring:message code='sys.sys_0101.list.title.codeName'/>', id :'NAME', align:'center'}, 
   	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
   	 		{name:'레벨' ,id :'LEV', hidden:true},
			{name : '',id : 'ACTION', attrType:{'func':'link_comm'}, width : 80}
   	   	],
   	   	callback: 'treeCallback',
		defaultOptions:{ align:'center'}, 
 	 	treeview: {
 			viewField:'CODE', 	
 			levField:'LEV', 						
 			codeField:'NAME', 		
 			pcodeField:'UP_CD'		
 		},
		events:[
			{event: 'click',funcName: 'doGridClickComm'}
		], 
		btn:[ 
/* 			{button:'addd', func:'addRootComm', 'classes':'', label:'<spring:message code="button.register"/>'},
			{button:'confirm_comm', func:'createCode', 'classes':'', label:'<spring:message	code='button.save' />'}, */
		]		
	});
	return false;
 };	

 /* Maintance code */
 var drawgrid_maint = function(formId,data){
	$('#grid2').setViewGrid({
		id:'grid2',
		type:'tree',
		seq: true,
		displayState : false ,	
		pinHeader : false, 			
		url:CTX+'/sys/sys_0101/getMaintanceCode.ajax',
		param : formId,  
		localData: data,  
		modelName : 'RESULTLIST',
		gridOptions : {caption: '<spring:message code='sys.sys_0101.list.MaintenCd' />', loadonce:true, rownumber:false, 
// 			height: 520
			//pageSize: 10,
            //pageable: true
			},
		colModels : [
   	   		{name:'<spring:message code='sys.sys_0101.list.title.codeName' />', id :'NAME', align:'left !important'},
   	   		{name:'코드', id :'CODE',hidden:true},  
   	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
   	 		{name:'레벨' ,id :'LEV', hidden:true},
			{name : '', id : 'ACTION', attrType:{'func':'link'}, width : 80 }
   	   	],
   	   	callback: 'treeCallback',
		defaultOptions:{ align:'center'}, 
 	 	treeview: {
 			viewField:'NAME', 
 			levField:'LEV', 		
 			codeField:'CODE', 			
 			pcodeField:'UP_CD'	
 		},
		events:[
			{event: 'click', funcName: 'doGridClickMaint'}
		],  
		btn:[ 
/* 			{button:'addd', func:'addRootMainten', 'classes':'', label:'<spring:message code="button.register"/>'},
			{button:'confirm_main', func:'createCode', 'classes':'', label:'<spring:message	code='button.save' />'}, */
		]		
	});
	return false;
 };	

// make treeview look clearly
function treeCallback(grid) {
	$(grid).find('span[data-lev="1"]').each(function(i, o) {
		$(o).css({
			margin: '0px',
			padding: '0px'
		});
		//$(o).after('<span style="color: red;">&nbsp;</span>');
	});
	
	$(grid).find('span[data-lev="2"]').each(function(i, o) {
		if ($(o).hasClass('parent')) {
			$(o).css('margin-left', '40px');			
		}
		//$(o).after('<span style="color: lightgreen;">&nbsp;</span>');
	});
	
	$(grid).find('span[data-lev="3"]').each(function(i, o) {
		$(o).css('margin-right', '40px');		
		//$(o).after('<span style="color: blue;">&nbsp;</span>');
	});
}
 
 /* Part code */
 var drawgrid_part = function(formId,data){
		$('#grid3').setViewGrid({
			id:'grid3',
			type:'tree',
			seq: true,
			displayState : false ,	
			pinHeader : false, 			
			url:CTX+'/sys/sys_0101/getPartCode.ajax',
			param : formId,  
			localData: data,  
			modelName : 'RESULTLIST',
			gridOptions : {caption: '<spring:message code='sys.sys_0101.list.partCd' />', loadonce:true, rownumber:false, 
// 				height: 520
				//pageSize: 10,
               // pageable: true
				},
			colModels : [
	   	   		{name:'<spring:message code='sys.sys_0101.list.title.codeName' />', id :'NAME', align:'left !important'},
	   	   	    {name:'코드', id :'CODE', hidden:true},	   	   		  
	   	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
	   	 		{name:'레벨' ,id :'LEV', hidden:true},
				{name : '', id : 'ACTION', attrType:{'func':'link_part'}, width : 80 }
	   	   	],
	   	    callback: 'treeCallback',
			defaultOptions:{ align:'center'}, 
	 	 	treeview: {
	 			viewField:'NAME', 
	 			levField:'LEV', 		
	 			codeField:'CODE', 			
	 			pcodeField:'UP_CD'	
	 		},
			events:[
				{event: 'click', funcName: 'doGridClickPart' }
			],  
			btn:[ 
/* 				{button:'addd', func:'addRootPart', 'classes':'', label:'<spring:message code="button.register"/>'},
				{button:'confirm_part', func:'createCode', 'classes':'', label:'<spring:message	code='button.save' />'}, */
			]		
		});
		return false;
	 };	


$(document).ready(function(){
		$('#alarmCode').hide();
    	$('#treeviewMaintenParent').hide();
    	$('#treeviewPart').hide();
    	addRootComm();
	    $("select.optionCode").change(function(){
	        var selectedCode = $(this).children("option:selected").val();
	        if(selectedCode!='001'){
	        	$('#commonCode').hide();
	        }else{
	        	$('#commonCode').show();
	        	//drawgrid_comm();
	        	resetComm();
	        	addRootComm();
	        }
	        if(selectedCode!='002'){
	        	$('#treeviewMaintenParent').hide();
	        }else{
	        	$('#treeviewMaintenParent').show();
	        	//drawgrid_maint();
	        	resetMainten();
	        	addRootMainten();
	        }
	        if(selectedCode!='003'){
	        	$('#treeviewPart').hide();
	        }else{
	        	$('#treeviewPart').show();
	        	//drawgrid_part();
	        	resetPart();
	        	addRootPart();
	        }
	        
	        if(selectedCode!='004'){
	        	$('#alarmCode').hide();
	        }else{
	        	$('#alarmCode').show();
	        }	                	       
	    });
	    
	    

});


/*check double common code  */
function doubleCheck(){
	var code = $('#COMM_CD').val();
	if(code==null||code==''){
		$('#COMM_CD').inputWarning(rules['required'].msg[lang]);

// 		alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
	}else{
		$.ajax({
			  url: CTX+'/sys/sys_0101/checkDoubleCode.ajax?COMM_CD='+code,
			  type: 'GET',
			  success: function(data) {
			    if(data){
					alert('<spring:message code='sys.sys_0101.list.alert.news' />')
			    }else{
			    	alert('<spring:message code='sys.sys_0101.list.alert.doubles' />')
			    }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});		
	}	
}
function createCode(){
	var type = $("select.optionCode").val();
	/* Add common code */
	if(type=='001'){
		if(validateCommon()){
			var code = $('#COMM_CD').val();
			var name = $('#COMM_NM').val();
			var upCd = $('#UP_COMMON_CD').val();
			var lev = $('#LEV_COMMON_CD').val();
			var crud = $('#TYPE_COMMON_CD').val();
			var description = $('#DESCRPT').val();
			$.ajax({
				  url: CTX+'/sys/sys_0101/addCommonCode.ajax',
				  type: 'POST',
				  data:{
					  COMM_CD:code,
					  COMM_NM:name,
					  DESCRPT:description,
					  CRUD:crud,
					  LEV:lev,
					  UP_CD: upCd.trim()
				  },
				  success: function(data) {
					  if(data){
							alert('<spring:message code='sys.sys_0101.list.alert.success' />');
							//drawgrid_comm();							 
					  }else{
							alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');  
					  }
					  resetComm();
					  onBack();
				  },
				  error: function( req, status, err ) {
				    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
				  }
				});	
		}else{
			alert('<spring:message code='sys.sys_0101.list.alert.invalid' />')
		}
	}else if(type=='002'){
		/* Add Maintance code */
		var suf = $('#SUF_MAIN_CD').val();
		var fre = $('#PRE_MAIN_CD').val();
		var lev = $('#LEV_MAIN_CD').val();
		var upCd = $('#UP_MAIN_CD').val();
		var description = $('#DESCRPT').val();
		var crud = $('#TYPE_MAIN_CD').val();
		var code = $('#MAIN_CD').val();
		if(validateMainten()){
			$.ajax({
				  url: CTX+'/sys/sys_0101/addMaintenCode.ajax',
				  type: 'POST',
				  data:{
					  DESCRPT: description,
					  CRUD:crud,
					  SUFFIX_NM: suf,
					  LEV: lev,
					  UP_CD: upCd,
					  PREFIX_NM: fre,
					  MAINTEN_CD: code
				  },
				  success: function(data) {
					alert('<spring:message code='sys.sys_0101.list.alert.success' />');
					//drawgrid_maint();
					resetMainten();
					onBack();
				  },
				  error: function( req, status, err ) {
				    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
				  }
				});	
		}
	}else if(type=='003'){
		/* Add Part code */
		var suf = $('#SUF_PART_CD').val();
		var fre = $('#PRE_PART_CD').val();
		var lev = $('#LEV_PART_CD').val();
		var upCd = $('#UP_PART_CD').val();
		var code =  $('#PART_CD').val();
		var crud = $('#TYPE_PART_CD').val();
		var description = $('#DESCRPT').val();
		if(validatePart(lev,fre,suf)){
			$.ajax({
				  url: CTX+'/sys/sys_0101/addPartCode.ajax',
				  type: 'POST',
				  data:{
					  DESCRPT: description,
					  PART_NM: suf,
					  LEV: lev,
					  UP_CD: upCd,
					  PREFIX_NM: fre,
					  PART_CD: code,
					  CRUD: crud
				  },
				  success: function(data) {
					alert('<spring:message code='sys.sys_0101.list.alert.success' />');
					//drawgrid_part();
					resetPart();
					onBack();
				  },
				  error: function( req, status, err ) {
				    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
				  }
				});	
		}else{
			alert('<spring:message code='sys.sys_0101.list.alert.invalid' />')
		}		
	}else{
		  var manufar = $('#Manu_ALARM_CD').val();
		  var type = $('#Type_ALARM_CD').val();
		  var capacity = $('#Capacity_ALARM_CD').val();
		  var name = $('#ALARM_NM').val();
		  var description = $('#DESCRPT').val();
		  if(validateDoubleAlarm(manufar, type, capacity, name)){
				$.ajax({
					  url: CTX+'/sys/sys_0101/addAlarmCode.ajax',
					  data:{
						  MANUFAR: manufar,
						  ALARM_TP: type,
						  CAPACITY:capacity,
						  DESCRPT: description,
						  ALARM_NM: name
					  },
					  success: function(data, status) {
						  var check = data['CHECK'];
						  if(check){
							  var code = data['WT_ALARM_GR_ID'];
							  onBack();
// 							  if(confirm("<spring:message code='sys.sys_0101.confirm.DeatailAlarm' />")){
// 									var url = CTX+'/sys/sys_0101/listdetailAlarm/form.popup?WT_ALARM_GR_ID='+code;
// 									popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
// 							  }else{
// 								  cancelCode();
									
// 							  }
						  }else{
							  alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
						  }
					  },
					  error: function( req, status, err ) {
					    
					  }
					});
		  }else{
			  alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
		  }
	}
}
 function validateCommon(){
	var check = true;
	var code = $('#COMM_CD').val();
	var name = $('#COMM_NM').val();
	if(code==null||code==''){
		check = false;
		$('#COMM_CD').inputWarning(rules['required'].msg[lang]);
	}else{
		  $('#COMM_CD').available();
	  }
	if(name==null||name==''){
		check = false;
		$('#COMM_NM').inputWarning(rules['required'].msg[lang]);

	}else{
		  $('#COMM_NM').available();
	  }
	return check;
} 
 function cancelCode(){
		var url = CTX+'/sys/sys_0101/list';
		$(location).attr('href',url); 
 }
 /*Common code js  */
  function doGridClickComm(rowId, target, obj3, obj4, obj5, obj6){
	 	var val = $(obj5.target).html();
	 	var code = $(val).attr('data-id');
		var lev = $(val).attr('data-lev');
		var colObj = $(obj6).data();
		var col = colObj['col'];
		if(col=='CODE'||col=='NAME'){
			if(rowId){
				rowData = $('#table_grid1').getRowData(rowId);
				if(rowData){					
					document.getElementById("COMM_NM").removeAttribute("readonly");
					$('input[name="COMM_CD"]').val(rowData.CODE); 
					$('#DESCRPT').val(rowData.DESCRPT);
		 			$('input[name="COMM_NM"]').val(rowData.NAME);
					$('#TYPE_COMMON_CD').val('U');
					if(rowData.UP_CD==""){
						$('#PARENT_COMM_CD').val("ROOT");
					}else{
						$('#PARENT_COMM_CD').val(rowData.UP_CD);
					}
					topFunction();
				}
			}
		} 
 }
  function addRootComm(){
	  resetComm();
	  	$('#PARENT_COMM_CD').val("ROOT");
		$('#LEV_COMMON_CD').val(1);
		 document.getElementById("COMM_CD").removeAttribute("readonly");
		 document.getElementById("COMM_NM").removeAttribute("readonly"); 
		 $('#TYPE_COMMON_CD').val('C');
		 topFunction();
 }
  function resetComm(){
	  	document.getElementById("COMM_CD").setAttribute("readonly", true);
		document.getElementById("COMM_NM").setAttribute("readonly", true);
		 	$('#COMM_CD').val('');
	 	    $('#COMM_NM').val('');
			$('#UP_COMMON_CD').val('');
			$('#LEV_COMMON_CD').val('');
			$('#TYPE_COMMON_CD').val('');
			$('#UP_COMMON_CD').val('');
			$('#DESCRPT').val('');
			$('#PARENT_COMM_CD').val('');
  }
  function removeComm(obj){
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
				$.ajax({
					  url: CTX+'/sys/sys_0101/deleteCommonCode.ajax',
					  data:{
						  LEV: lev,
						  CODE: code
					  },
					  success: function(data) {
						  alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
						  //drawgrid_comm();
						  resetComm();
					  },
					  error: function( req, status, err ) {					    
					  }
					});	 
		 } 
  }
  function addItemComm(obj){	
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var name = $(obj.target).closest('tr').find('td[data-col="NAME"]').html();
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(lev<3){
			 document.getElementById("COMM_CD").removeAttribute("readonly");
			 document.getElementById("COMM_NM").removeAttribute("readonly");
			 $('#COMM_CD').val('');
			 $('#COMM_NM').val('');
			 $('#DESCRPT').val('');
			 $('#LEV_COMMON_CD').val(parseInt(lev)+1);
			 $('#UP_COMMON_CD').val(code);
			 $('#TYPE_COMMON_CD').val('C');
			 $('#PARENT_COMM_CD').val(code);
			 topFunction();
		 }else{
			 resetComm();
		 }
  }

  function link_comm(cellValue, options, rowObject) {
	 	var type = options['field'];
		var row = options['model'];
		var lev = row['LEV'];
		if(type=='ACTION'){
			if(lev<3){
				return '<button type="button" onclick="addItemComm(event)" class="btn_span">+</button> <button  type="button" onclick="removeComm(event)" class="btn_span_minus">-</button>';
			}else{
				return '<button  type="button" onclick="removeComm(event)" class="btn_span_minus" style="margin-left: 40%;">-</button>';
			}
		}else{
			return '<div></div>';
		}
 }
  /*Common code js  */
 /*Maintance code js  */
  function doGridClickMaint(rowId, target, obj3, obj4, obj5, obj6){
 	var val = $(obj5.target).html();
 	var code = $(val).attr('data-id');
	var lev = $(val).attr('data-lev');
	var colObj = $(obj6).data();
	var col = colObj['col'];
	if(col=='NAME'){
		if(rowId){
			$('#trParentMain').hide();
			rowData = $('#table_grid2').getRowData(rowId);
			if(rowData){
				document.getElementById("PRE_MAIN_CD").removeAttribute("readonly");
				document.getElementById("SUF_MAIN_CD").removeAttribute("readonly");
				$('input[name="PRE_MAIN_CD"]').val(rowData.PRE_NM); 
				$('#DESCRPT').val(rowData.DESCRPT);
	 			$('input[name="SUF_MAIN_CD"]').val(rowData.SUF_NM);
				$('input[name="UP_MAIN_CD"]').val(rowData.UP_CD);
				$('input[name="LEV_MAIN_CD"]').val(lev);
				$('#TYPE_MAIN_CD').val('U');
				$('#MAIN_CD').val(code);
				topFunction();
			}
		}
	}
	
  }
  function resetMainten(){
  	document.getElementById("PRE_MAIN_CD").setAttribute("readonly", true);
	document.getElementById("SUF_MAIN_CD").setAttribute("readonly", true);
	 	$('#PRE_MAIN_CD').val('');
 	    $('#SUF_MAIN_CD').val('');
		$('#UP_MAIN_CD').val('');
		$('#LEV_MAIN_CD').val('');
		$('#TYPE_MAIN_CD').val('');
		$('#UP_MAIN_CD').val('');
		$('#DESCRPT').val('');
		$('#MAIN_CD').val('');
		$('#trParentMain').hide();
		$('#PARENT_MAIN_CD').val('');
 }
  function addRootMainten(){
	 $('#LEV_MAIN_CD').val(1);
	 $('#TYPE_MAIN_CD').val('C');
	 document.getElementById("PRE_MAIN_CD").removeAttribute("readonly");
	 document.getElementById("SUF_MAIN_CD").removeAttribute("readonly");
	 $('#PRE_MAIN_CD').val('');
	 $('#SUF_MAIN_CD').val('');
	 $('#UP_MAIN_CD').val('');
	 $('#trParentMain').show();
	 $('#PARENT_MAIN_CD').val("ROOT");
	 topFunction();
 }
  function validateMainten(){
	var check = true;
	var pre = $('#PRE_MAIN_CD').val();
	var suf = $('#SUF_MAIN_CD').val();
	if(pre==null||pre==''){
		check = false;
		$('#PRE_MAIN_CD').inputWarning(rules['required'].msg[lang]);
	}else{
		  $('#PRE_MAIN_CD').available();
	  }
	if(suf==null||suf==''){
		check = false;
		$('#SUF_MAIN_CD').inputWarning(rules['required'].msg[lang]);
	}else{
		  $('#SUF_MAIN_CD').available();
	  }
	return check;
} 
 function removeItemMain(obj){
	 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
	 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();	 
	 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
			$.ajax({
				  url: CTX+'/sys/sys_0101/deleteMaintenCode.ajax',
				  data:{
					  LEV: lev,
					  CODE: code
				  },
				  success: function(data) {
					  alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
					  //drawgrid_maint();
					  resetMainten();
				  },
				  error: function( req, status, err ) { 
				  }
				});	 
	 }
 }
 function addItemMain(obj){
	 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
	 var name = $(obj.target).closest('tr').find('td[data-col="NAME"]').html();
	 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
	 if(lev<3){
		 document.getElementById("PRE_MAIN_CD").removeAttribute("readonly");
		 document.getElementById("SUF_MAIN_CD").removeAttribute("readonly");
		 $('#PRE_MAIN_CD').val('');
		 $('#SUF_MAIN_CD').val('');
		 $('#DESCRPT').val('');
		 $('#LEV_MAIN_CD').val(parseInt(lev)+1);
		 $('#UP_MAIN_CD').val(code);
		 $('#TYPE_MAIN_CD').val('C');
		 $('#trParentMain').show();
		 $('#PARENT_MAIN_CD').val((((($(obj.target).closest('tr'))[0].innerText).split('-'))[0]).replace('+',''));
		 topFunction();
	 }
 }
 
 function link(cellValue, options, rowObject) {
	 	var type = options['field'];
		var row = options['model'];
		var lev = row['LEV'];
		if(type=='ACTION'){
			if(lev<3){
				return '<button type="button" onclick="addItemMain(event)" class="btn_span">+</button> <button  type="button" onclick="removeItemMain(event)" class="btn_span_minus">-</button>';
			}else{
				return '<button  type="button" onclick="removeItemMain(event)" class="btn_span_minus" style="margin-left: 21%;">-</button>';
			}
		}
	}
 /*Maintance code js  */
  /*Part code js  */
    function validatePart(lev, pre, suf){
	var check = true;
	if(pre==null||pre==''){
		check = false;
		$('#PRE_PART_CD').inputWarning(rules['required'].msg[lang]);
	}else{
		  $('#PRE_PART_CD').available();
	  }
	if(suf==null||suf==''){
		check = false;
		$('#SUF_PART_CD').inputWarning(rules['required'].msg[lang]);
	}else{
		  $('#SUF_PART_CD').available();
	  }
	 return check;
	
 }
    function doGridClickPart(rowId, target, obj3, obj4, obj5, obj6){
     	var val = $(obj5.target).html();
     	var code = $(val).attr('data-id');
    	var lev = $(val).attr('data-lev');
    	var colObj = $(obj6).data();
    	var col = colObj['col'];
    	if(col=='NAME'){
    		$('#trParentPart').hide();
    		if(rowId){
    			rowData = $('#table_grid3').getRowData(rowId);
    			if(rowData){
    				if(lev>1){
    					 $('#PRE_PART_CD').hide();
    					 $('#label_SUF_NM').hide();
    					 $('#part_label_number').hide();
    					 $('#label_PART_NM').show();  
    				}else{
    					 $('#PRE_PART_CD').show();
    					 $('#label_SUF_NM').show();
    					 $('#part_label_number').show();
    					 $('#label_PART_NM').hide();    					 
    				}
    				document.getElementById("PRE_PART_CD").removeAttribute("readonly");
    				document.getElementById("SUF_PART_CD").removeAttribute("readonly");
    				$('input[name="PRE_PART_CD"]').val(rowData.PRE_NM); 
    				$('#DESCRPT').val(rowData.DESCRPT);
    	 			$('input[name="SUF_PART_CD"]').val(rowData.SUF_NM);
    				$('input[name="UP_PART_CD"]').val(rowData.UP_CD);
    				$('input[name="LEV_PART_CD"]').val(lev);
    				$('#TYPE_PART_CD').val('U');
    				$('#PART_CD').val(code);
    				topFunction();
    			}
    		}
    	}
 }
  function resetPart(){
	  	 $('#trParentPart').hide();
	 	 $('#label_PART_NM').hide();
		 $('#PRE_PART_CD').show();
		 $('#part_label_number').show();
		 $('#label_SUF_NM').show();
	  	document.getElementById("PRE_PART_CD").setAttribute("readonly", true);
		document.getElementById("SUF_PART_CD").setAttribute("readonly", true);
		 	$('#PRE_PART_CD').val('');
	 	    $('#SUF_PART_CD').val('');
			$('#UP_PART_CD').val('');
			$('#LEV_PART_CD').val('');
			$('#TYPE_PART_CD').val('');
			$('#UP_PART_CD').val('');
			$('#PART_CD').val('');
			$('#DESCRPT').val('');	 
 }
 
   function addRootPart(){
	   resetPart();
		$('#LEV_PART_CD').val(1);
		 document.getElementById("PRE_PART_CD").removeAttribute("readonly");
		 document.getElementById("SUF_PART_CD").removeAttribute("readonly");
		 $('#PRE_PART_CD').val('');
		 $('#SUF_PART_CD').val('');
		 $('#UP_PART_CD').val('');
		 $('#TYPE_PART_CD').val('C');
		 $('#trParentPart').show();
		 $('#PARENT_PART_CD').val("ROOT");
		 topFunction();
 }
  function addItemPart(obj){
	  resetPart();
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var name = $(obj.target).closest('tr').find('td[data-col="NAME"]').html();
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(lev<2){
			 document.getElementById("PRE_PART_CD").removeAttribute("readonly");
			 document.getElementById("SUF_PART_CD").removeAttribute("readonly");
			 $('#PRE_PART_CD').val('');
			 $('#PRE_PART_CD').hide();
			 $('#label_SUF_NM').hide();
			 $('#part_label_number').hide();
			 $('#label_PART_NM').show();			 
			 $('#SUF_PART_CD').val('');
			 $('#DESCRPT').val('');
			 $('#LEV_PART_CD').val(parseInt(lev)+1);
			 $('#UP_PART_CD').val(code);
			 $('#TYPE_PART_CD').val('C');
			 $('#trParentPart').show();
			 $('#PARENT_PART_CD').val((((($(obj.target).closest('tr'))[0].innerText).split('-'))[0]).replace('+',''));
			 topFunction();
		 }else{
			 resetPart();			
		 }
  }
  function removePart(obj){
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
				$.ajax({
					  url: CTX+'/sys/sys_0101/deletePartCode.ajax',
					  data:{
						  LEV: lev,
						  CODE: code
					  },
					  success: function(data) {
						  alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
						  //drawgrid_part();
						  resetPart();
					  },
					  error: function( req, status, err ) {
					    
					  }
					});	 
		 }
  }
  function link_part(cellValue, options, rowObject) {	
	 	var type = options['field'];
		var row = options['model'];
		var lev = row['LEV'];
		if(type=='ACTION'){
			if(lev<2){
				return '<button type="button" onclick="addItemPart(event)" class="btn_span">+</button> <button  type="button" onclick="removePart(event)" class="btn_span_minus">-</button>';
			}else{
				return '<button  type="button" onclick="removePart(event)" class="btn_span_minus" style="margin-left: 21%;">-</button>';
			}
		}	 
 }
  /*Part code js  */
  /* Alarm code js */
  function checkDoubleAlarm(){
	  var manufar = $('#Manu_ALARM_CD').val();
	  var type = $('#Type_ALARM_CD').val();
	  var capacity = $('#Capacity_ALARM_CD').val();
	  if(validateDoubleAlarm(manufar, type, capacity, "default")){
			$.ajax({
				  url: CTX+'/sys/sys_0101/checkDoubleAlarmCode.ajax',
				  data:{
					  MANUFAR: manufar,
					  ALARM_TP: type,
					  CAPACITY:capacity
				  },
				  success: function(data) {
					  if(data){
						  alert('<spring:message code='sys.sys_0101.list.alert.news' />');
					  }else{
						  alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
					  }
					  
				  },
				  error: function( req, status, err ) {
				  }
				});
	  }else{
		  alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
	  }

  }
  function validateDoubleAlarm( a, b, c, d){
	  var check = true;

	  if(a == null || a==''){
		  check = false;
		  $('#Manu_ALARM_CD').inputWarning(rules['required'].msg[lang]);
	  }else{
		  $('#Manu_ALARM_CD').available();
	  }
	  if(b == null || b==''){
		  check = false;
		  $('#Type_ALARM_CD').inputWarning(rules['required'].msg[lang]);
	  }else{
		  $('#Type_ALARM_CD').available();
	  }
	 if(c == null || c==''){
		 check = false;
		  $('#Capacity_ALARM_CD').inputWarning(rules['required'].msg[lang]);
	  }else{
		  $('#Capacity_ALARM_CD').available();
	  }
	 if(d != 'default' || $('#ALARM_NM').val()){
	  if(d == null || d==''){
		  check = false;
		  $('#ALARM_NM').inputWarning(rules['required'].msg[lang]);
	  }else{
		  $('#ALARM_NM').available();
	  }
	 }
	  return check;
  }
  /* Alarm code js */
  function topFunction() {
	  $('#cont').animate({
		    scrollTop: $("#TOP")[0].offsetTop
	  }, 400);
	  
	  

}
</script>
<div id="add_code_form" class="container system-wrap system-wrap1">
	  <!-- 발전기 등록테이블 -->
	  <!--tit-wrap-->
	  
	  	  <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      	      <li><spring:message code='sys.sys_0101.list.title.resgister' /></li>
	      
	    </ul>
	  </div>
	  
<%-- <span id="btnDelete" class="basic_btn bg_gray ico l7" onclick="cancelCode()"><spring:message code='sys.sys_0101.list.button.cancel' /></span>
 --%>
					<div class="group_content system-detail-wrap" id="TOP">
					<div class="system-left">
						 <div class="registration-form registration-form1" style="padding-bottom:0;">
						  <div class="registration-form-lst-wrap">
						          <ul class="registration-form-lst">
									<li>
						              <span><spring:message code='sys.sys_0101.list.title.type' /></span>
						             <div class="registration-write  registration-write-select">
						                <div class="input-group-wrapper">
				                  <div class="select-box">
				                  <label for="code_type"  ><spring:message code='sys.sys_0101.list.title.type' /></label>
									<select id="code_type" class="optionCode info-select"  >
										  <option value="001"><spring:message code='sys.sys_0101.list.Comm' /></option>
										  <option value="002"><spring:message code='sys.sys_0101.list.MaintenCd' /></option>
										  <option value="003"><spring:message code='sys.sys_0101.list.partCd' /></option>
										  <option value="004"><spring:message code='sys.sys_0101.list.title.alarmCode' /></option>
										</select>
						           </div>
						           </div>
				              </div>
				            </li>
				            </ul>
				            </div>
				            </div>
				            </div>
<!--Register maintenance code  -->
						<div id="treeviewMaintenParent" style='float:left; width: 100%;'>						
<!-- 							<div id="grid2" style='float:left;  width:45%;'></div>
 -->							<div  class="group_content system-detail-wrap">
 								<div class="system-left">
									<div class="registration-form registration-form1">
								  <div class="registration-form-lst-wrap">
								          <ul class="registration-form-lst">
											<li hidden>
								              <span><spring:message code='sys.sys_0101.list.title.category' /><span class="red"> *</span></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
												<input type="text" id="PARENT_MAIN_CD" name="PARENT_MAIN_CD" readonly value="">
								           </div>
						              </div>
						            </li>
						            <li>
							            <span class="detail-search-keyword"><spring:message code='sys.sys_0101.list.title.category' /><span class="red"> *</span>
							            <div class="registration-write twice-input">
							            <div class="input-group-wrapper">
							            <div class="input-group">
							            <label for="PRE_MAIN_CD" ></label>
											<input maxlength="20" type="text" id="PRE_MAIN_CD"   nova-validation="required"   name="PRE_MAIN_CD" readonly  value="">
											</div>
							            </div>
							           <div class="input-group-wrapper">
							            <div class="input-group">
							            	<label for="SUF_MAIN_CD" ></label>
											<input maxlength="200" type="text" id="SUF_MAIN_CD"   nova-validation="required"  name="SUF_MAIN_CD" readonly  value="">																						
											<input type="hidden" id="MAIN_CD" name="MAIN_CD">
											<input type="hidden" id="UP_MAIN_CD" name="UP_MAIN_CD">
											<input type="hidden" id="LEV_MAIN_CD" name="LEV_MAIN_CD">
											<input type="hidden" id="TYPE_MAIN_CD" name="TYPE_MAIN_CD">		
							            </div>
							            </div>
							          </li>
						            </ul>
						            </div>
						            </div>
						            </div>
       							<div class="system-right">
       														<div class="btns">
       								
<%-- 								<span class="basic_btn sbtn ac_click btn-style btn-style1" hidden onclick="addRootMainten()"><spring:message code='oam.oam_0203.detail.tab03.form.grid.button.add' /></span>
 --%>								<a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="createCode()"><spring:message code='button.save' /></a>
								<a class="basic_btn sbtn ac_click btn-style btn-style2"   onclick="onBack()"><spring:message code='button.back' /></a>
										
										</div>
						            
						            </div>
							</div>
							
						</div>						
						
						<!--Register part code  -->						
						<div id="treeviewPart" style='float:left; width: 100%;'>						
<!-- 							<div id="grid3" style='float:left;  width:45%;'></div>
 -->									<div class="group_content system-detail-wrap" id="part_content">
 									<div class="system-left"> 
									<div class="registration-form registration-form1">
								  <div class="registration-form-lst-wrap">
								          <ul class="registration-form-lst">
								          <li hidden>
								              <span><spring:message code='sys.sys_0101.parenCd' /></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
												<input type="text" id="PARENT_PART_CD" name="PARENT_PART_CD" readonly value="">
								           </div>
						              </div>
						            </li>
						            <li>
								        <span><spring:message code='sys.sys_0101.list.title.partNumber' /><span class="red"> *</span></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
												<input maxlength="20"   nova-validation="required"   type="text" id="PRE_PART_CD" name="PRE_PART_CD" readonly value="">
								           </div>
						              </div>
						            </li>
						            </ul>
						            <ul class="registration-form-lst">
						            <li>
							            <span class="detail-search-keyword"><label id='label_SUF_NM'><spring:message code='sys.sys_0101.list.title.classification'/><span class="red"> *</span>
							            <div class="registration-write">
							            <div class="input-group-wrapper">
							            <div class="input-group">
							            <label for="PRE_MAIN_CD" ></label>
							            	<input maxlength="200" type="text" id="SUF_PART_CD"  nova-validation="required"  name="SUF_PART_CD" readonly  value="">
							            	<input type="hidden" id="PART_CD" name="PART_CD">
											<input type="hidden" id="UP_PART_CD" name="UP_PART_CD">
											<input type="hidden" id="LEV_PART_CD" name="LEV_PART_CD">
											<input type="hidden" id="TYPE_PART_CD" name="TYPE_PART_CD">
											</div>
							            </div>
							           
							          </li>
								</ul>
										</div>
						</div>
						
						</div>
						<div class="system-right">
						<div class="btns">
<%-- 	       					<span class="basic_btn sbtn ac_click  btn-style btn-style1" hidden  onclick="addRootPart()"><spring:message code='oam.oam_0203.detail.tab03.form.grid.button.add' /></span>
 --%>						<a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="createCode()"><spring:message code='button.save' /></a>
							<a class="basic_btn sbtn ac_click btn-style btn-style2"   onclick="onBack()"><spring:message code='button.back' /></a>
      					</div>
							</div>
					</div>
						</div>													
<!--Register common code  -->						
						<div id="commonCode" style='float:left; width: 100%;'>
<!-- 							<div id="grid1" style='float:left;  width:45%;'> </div>
 -->							<div class="group_content system-detail-wrap">
							<div class="system-left">
							<div class="registration-form registration-form1">
								  <div class="registration-form-lst-wrap">
								          <ul class="registration-form-lst">
								          <li hidden>
								              <span><spring:message code='sys.sys_0101.parenCd' /></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
												<input type="text" id="PARENT_COMM_CD" name="PARENT_COMM_CD" readonly value="">
								           </div>
						              </div>
						            </li>
						            <li>
								        <span><spring:message code='sys.sys_0101.list.title.code' /><span class="red"> *</span></span>
								             <div class="registration-write  btn-input-wrap"">
								                <div class="input-group">
								                
												<input maxlength="20"   nova-validation="required" type="text" id="COMM_CD" name="COMM_CD"  readonly value="">
								           </div>
								           <button  class="btn bg_orange ico g8 registration-search-btn"  onclick="doubleCheck()"><spring:message code='sys.sys_0101.list.button.doubles' /></button>
								           
						              </div>
						            </li>
						            </ul>
						            <ul class="registration-form-lst">
						            
						            <li>
								              <span><spring:message code='sys.sys_0101.list.title.codeName' /><span class="red"> *</span></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
											<input maxlength="200" type="text"   nova-validation="required"   id="COMM_NM" readonly name="COMM_NM"  value="">
											
											<input type="hidden" id="UP_COMMON_CD" name="UP_COMMON_CD">
											<input type="hidden" id="LEV_COMMON_CD" name="LEV_COMMON_CD">
											<input type="hidden" id="TYPE_COMMON_CD" name="TYPE_COMMON_CD">								           </div>
						              </div>
						            </li>
								</ul>
										</div>
						</div>
						</div>
						<div class="system-right">
						
						<div class="btns">
<%-- 	       					<span class="basic_btn sbtn ac_click btn-style btn-style1" hidden  onclick="addRootComm()"><spring:message code='oam.oam_0203.detail.tab03.form.grid.button.add' /></span>
 --%>							<a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="createCode()"><spring:message code='button.save' /></a>
								<a class="basic_btn sbtn ac_click btn-style btn-style2"   onclick="onBack()"><spring:message code='button.back' /></a>
							
      					</div>
							
						</div>
						</div>
						</div>						
						<!--Register alarm code  -->
						<div id="alarmCode" style="float:left; width: 100%;">
 						<div class="group_content system-detail-wrap">
						<div class="system-left">
						<div class="registration-form registration-form1">
						<div class="registration-form-lst-wrap">
								  <ul class="registration-form-lst">
								      <li>
								              <span><spring:message code='sys.sys_0101.list.title.matyca' /><span class="red"> *</span></span>
								                <div class="registration-write  btn-input-wrap"">
								                <div class="input-group" style="width: 30%">
												<input maxlength="20"  nova-validation="required" type="text" id="Manu_ALARM_CD" name="Manu_ALARM_CD"   value="">
										</div>
										<label>/</label>
										<div class="input-group" style="width: 30%">
										<input maxlength="20" type="text"  nova-validation="required" id="Type_ALARM_CD" name="Type_ALARM_CD"   value="">
										</div>
										<label>/</label>
										<div class="input-group" style="width: 30%">
										<input maxlength="20" type="text"  nova-validation="required" id="Capacity_ALARM_CD" name="Capacity_ALARM_CD"   value="">
								        </div>
								           		<button  class="btn bg_orange ico g8 registration-search-btn"  onclick="checkDoubleAlarm()"><spring:message code='sys.sys_0101.list.button.doubles' /></button>
						              </div>
						            </li>
						            </ul>
						            <ul class="registration-form-lst">
						            <li>
								        <span><spring:message code='sys.sys_0101.list.title.codeName' /><span class="red"> *</span></span>
								              <div class="registration-write">
								                
								                <div class="input-group">
								                
												<input type="text" maxlength="100" id="ALARM_NM"  nova-validation="required" name="ALARM_NM"  value="">
								           </div>
								           </div>
								           
						            </li>
						        </ul>
						</div>
						</div>
						</div>
						<div class="system-right">
							 <a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="createCode()"><spring:message code='button.save' /></a>
							 <a class="basic_btn sbtn ac_click btn-style btn-style2"   onclick="onBack()"><spring:message code='button.back' /></a>
						
						</div>
						</div>
						
						
						</div>
						
						<div class="system-left">
						 <div class="registration-form registration-form1" style="padding-top:0;">
						  <div class="registration-form-lst-wrap">
						          <ul class="registration-form-lst">
						    <li>
					            <span class="detail-search-keyword"><spring:message code='sys.sys_0101.list.title.description' /></span>
					            <div class="registration-write">
					                              <div class="input-group input-group-wrap">
					              
					              <label for="search_code" class="sr-only"><spring:message code='sys.sys_0101.list.title.description' /></label>
				<!-- 	              <input type="text" id="search_code" name="search.ROLE_ID" value=""> -->
					              <textarea maxlength="2500" id="DESCRPT" name="DESCRPT" ></textarea>
					              </div>
					            </div>
					          </li>
				            </ul>
				            </div>
				            </div>
				            </div>
					</div>
			</div>

<script type="text/javascript">
//drawgrid_comm();
function onBack(){
	window.location.href = "";
}
</script>
	