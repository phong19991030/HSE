<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">
<script type="text/javascript" >
var list  = [];
var writePermission = '${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN}' == 'Y';
var g_sort = 'name';

// var drawgrid_part = function(formId,data){
// 	$('#grid_code').setViewGrid({
// 		id:'grid_code',
// 		type:'tree',
// 		seq: true,
// 		displayState : false ,	
// 		pinHeader : false, 			
// 		url:CTX+'/sys/sys_0108/getPartCode.ajax',
// 		param : formId,  
// 		localData: data,  
// 		modelName : 'RESULTLIST',
// 		gridOptions : {
// 			caption: '<spring:message code='sys.sys_0101.list.partCd' />',
// 			loadonce:true,
// 			rownumber:false,
// // 			height: 520
// //			pageSize: 10,
//   //          pageable: true
// 		},
// 		colModels : [
//    	   		{name:'<spring:message code='sys.sys_0101.list.title.codeName' />', id :'NAME', align:'left !important'},
//    	   	    {name:'코드', id :'CODE', hidden:true},	   	   		  
//    	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
//    	 		{name:'레벨' ,id :'LEV', hidden:true},
//    	 		{name:'PART_NO' ,id :'PART_NO', hidden:true},
//    	 		{name:'DETAIL_NM' ,id :'DETAIL_NM', hidden:true},
// 			{name : '', id : 'ACTION', attrType:{'func':'link_part'}, width : 80 }
//    	   	],
// 		defaultOptions:{ align:'center'}, 
// 		callback: 'treeCallback',
//  	 	treeview: {
//  			viewField:'NAME', 
//  			levField:'LEV', 		
//  			codeField:'CODE', 			
//  			pcodeField:'UP_CD'	
//  		},
// 		events:[
// 			{
//   				event: 'click',
// 				funcName: 'doGridClickPart'  
// 			}
// 		],  
// 		btn:[ 
// /* 			{button:'adds', func:'addRootPart', 'classes':'', label:'Add'},
// 			{button:'saves', func:'confirmCode', 'classes':'', label:'<spring:message	code='button.save' />'}, */
// 		]		
// 	});
// 	return false;
//  };	
//make treeview look clearly
//  function treeCallback(grid) {
//  	$(grid).find('span[data-lev="1"]').each(function(i, o) {
//  		$(o).css({
//  			margin: '0px',
//  			padding: '0px'
//  		});
//  		//$(o).after('<span style="color: red;">&nbsp;</span>');
//  	});
 	
//  	$(grid).find('span[data-lev="2"]').each(function(i, o) {
//  		if ($(o).hasClass('parent')) {
//  			$(o).css('margin-left', '40px');			
//  		}
//  		//$(o).after('<span style="color: lightgreen;">&nbsp;</span>');
//  	});
 	
//  	$(grid).find('span[data-lev="3"]').each(function(i, o) {
//  		$(o).css('margin-right', '40px');		
//  		//$(o).after('<span style="color: blue;">&nbsp;</span>');
//  	});
//  }	
 function confirmCode(){
	 	
		var suf = $('#SUF_PART_CD').val();
		var fre = $('#PRE_PART_CD').val();
		var lev = $('#LEV_PART_CD').val();
		var upCd = $('#UP_PART_CD').val();
		var code =  $('#PART_CD').val();
		var crud = 'U';
		var description = $('#DESCRPT').val();
		if(validatePart()){
			$.ajax({
				  url: CTX+'/sys/sys_0108/addPartCode.ajax',
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
					  
					  if(data.result == 'true'){
						  //alert('<spring:message code='sys.sys_0101.list.alert.success' />');
							alert(_MESSAGE.common.saveSuccess);
						  	getData();
							$('#detail-panel .prefix').html(fre);
							$('#detail-panel .suffix').html(suf);
							$('#detail-panel .description').html(description);	
							cancelUpdate();
					  }else{
						  if(data.msg == "dupl"){
							  $('#SUF_PART_CD').inputWarning('This code already have existed.')
							  $('#PRE_PART_CD').inputWarning('This code already have existed.')
							  alert('<spring:message code='sys.sys_0101.dulp' />');
							  

						  }else{
							  //alert('<spring:message code='message.saveFailed' />');
							  alert(_MESSAGE.common.saveFail);
						  }
					  }
					  

					
					
				  },
				  error: function( req, status, err ) {
				    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
				  }
				});	
		}else{
			alert('<spring:message code='sys.sys_0101.list.alert.invalid' />')
		}		
 }

 function cancelCode(){
		var url = CTX+'/sys/sys_0108/list';
		$(location).attr('href',url); 
	 
	}
 
 function validatePart(){
		var suf = $('#SUF_PART_CD').val().trim();
		var pre = $('#PRE_PART_CD').val().trim();
		var lev = $('#LEV_PART_CD').val();
		var desc = $('#DESCRPT').val().trim();
		var check = true;
		if(!$('#UP_PART_NM').val()){
			 $('#UP_PART_NM').inputWarning('Select parent part code.');
			 check = false;
	 	}
	 if(lev && lev > 1){
		 if(suf==null||suf==''){
			 $('#SUF_PART_CD').inputWarning('"SUFFIX code" is required item.');
			 check = false;
		 }
		
	 }else{
 		if(pre==null||pre==''){
			 
			 $('#PRE_PART_CD').inputWarning('"PREFIX code" and "SUFFIX code" are required items.');

			 check = false;
		 }
		 if(suf==null||suf==''){
			 $('#SUF_PART_CD').inputWarning('"PREFIX code" and "SUFFIX code" are required items.');
			 check = false;
		 }
	 }
		if(!desc){
			$('#DESCRPT').inputWarning('"Description" required item.');
			check = false;
		}
	 return check;
 }
//     function doGridClickPart(rowId, target, obj3, obj4, obj5, obj6){
//     	var colObj = $(obj6).data();
// 		var col = colObj['col'];
// 		var up_nm = '';
		
//     	if(col=='NAME'){
//     		if(rowId){
//     			rowData = $('#table_grid_code').getRowData(rowId);
//     			if(rowData){
//     				if(rowData.LEV >1){
// 						var datas = $('#table_grid_code').data('kendoGrid').dataSource.data();
// 						datas.forEach(function(obj, i){
// 							if(obj.PART_CD == rowData.UP_CD){
// 								up_nm = obj.NAME;
// 							}
// 						});
						
// 	    				$('input[name="PRE_PART_CD"]').attr('disabled', 'true'); 

// 					}else{
// 	    				$('input[name="PRE_PART_CD"]').removeAttr('disabled'); 

// 	    				$('input[name="PRE_PART_CD"]').val(rowData.PRE_NM); 
// 						up_nm = 'ROOT';
// 					}
 
//     				$('#DESCRPT').val(rowData.DESCRPT);
//     	 			$('input[name="SUF_PART_CD"]').val(rowData.SUF_NM);
//     				$('input[name="UP_PART_CD"]').val(rowData.UP_CD);
//     				$('input[name="LEV_PART_CD"]').val(rowData.LEV);
// 					$('input[name="UP_PART_NM"]').val(up_nm);
//     				$('#TYPE_PART_CD').val('U');
//     				$('#PART_CD').val(rowData.CODE);
    				
//     			}
//     		}
//     	}
//  }
    
    function partClick(obj) {	
		$('#update-panel input, textarea').val('');

		var i = obj.attr('index');
// 		alert(i);
		var obj = list[i];
// 		console.log(obj);
		var up_nm;

		if (obj['LEV'] > 1) {
			list.forEach(function(obj2, i) {
				if (obj2.PART_CD == obj.UP_CD) {
					up_nm = obj2.NAME;
				}
			});
		} else {
			up_nm = 'ROOT'
		}
		
		if(parseInt(obj.LEV) > 1){
			$('.add-btn').hide();
		}else{
			$('.add-btn').show();
		}
		
		if(parseInt(obj.LEV) > 1){
			$('#PRE_PART_CD').closest('div.input-group').hide();
		}else{
			$('#PRE_PART_CD').closest('div.input-group').show();
		}
 
		$('#LEV_PART_CD').val( parseInt(obj.LEV));
		$('#UP_PART_CD').val(obj.UP_CD);
		$('#PART_CD').val(obj.PART_CD);
		$('#detail-panel .up_nm').html(up_nm);
		$('#detail-panel .prefix').html(obj.PRE_NM);
		$('#detail-panel .suffix').html(obj.SUF_NM);
		$('#detail-panel .type').html(obj.TYPE);
		$('#detail-panel .description').html(obj.DESCRPT);		
		$('#update-panel .up_nm').val(up_nm);
		$('#update-panel .prefix').val(obj.PRE_NM);
		$('#update-panel .suffix').val(obj.SUF_NM);
// 		$('#update-panel .type').val(obj.TYPE);
		$('#update-panel .description').val(obj.DESCRPT);
		$('#update-panel input, textarea').resetWarning();
		$('#detail-panel').show();
		$('#update-panel').hide();
	}

    
    
  function resetPart(){

	  		$('.overlap').removeClass('overlap');
	  		$('.input-info-txt').remove();
		 	$('#PRE_PART_CD').val('').removeAttr('disabled');
	 	    $('#SUF_PART_CD').val('');
			$('#UP_PART_CD').val('');
			$('#LEV_PART_CD').val('');
			$('#TYPE_PART_CD').val('');
			$('#UP_PART_CD').val('');
			$('#UP_PART_NM').val('');
			$('#PART_CD').val('');
			$('#DESCRPT').val('');	 
			 $('#UP_PART_NM').val('');
 }
 
   function addRootPart(){
	   resetPart();
		$('#LEV_PART_CD').val(1);
		
		 $('#PRE_PART_CD').val('');
		 $('#SUF_PART_CD').val('');
		 $('#UP_PART_CD').val('');
		 $('#TYPE_PART_CD').val('C');
		 $('#UP_PART_NM').val('ROOT');
		 
 	}
  function addItemPart(obj){
	  resetPart();
		 var id = $(obj.target).closest('tr').attr('data-uid');
		 var item =  $('#table_grid_code').data('kendoGrid').dataSource.getByUid(id)
		 var code = item.PART_CD; 
		 var name = item.NAME;
		 var lev = item.LEV;
		 if(lev && lev>=1){

			 $('#PRE_PART_CD').val('');
			 $('#SUF_PART_CD').val('');
			 $('#DESCRPT').val('');
			 $('#LEV_PART_CD').val(parseInt(lev)+1);
			 $('#UP_PART_CD').val(code);
			 $('#UP_PART_NM').val(name);
			 $('#TYPE_PART_CD').val('C');
			 $('#PRE_PART_CD').attr('disabled','true');

			 
		 }else{
			 resetPart();
		 }
  }
  function removePart(obj){
		var code = $('#PART_CD').val();
		var lev = $('#LEV_PART_CD').val();
		 
// 		 var partNo = item.PART_NO;
// 		 var partDetailNo = item.DETAIL_NM;
		 		var childCount = $('li[part_cd="'+code+'"] > ul.depth2 > li').length;

		 if(childCount > 0){
			 alert("<spring:message code='sys.sys_0101.deleteWarning' />");
		 }
		 else{
			 if(confirm(_MESSAGE.common.deleteConfirm)){
					$.ajax({
						  url: CTX+'/sys/sys_0108/deletePartCode.ajax',
						  data:{
							  LEV: lev,
							  CODE: code
						  },
						  success: function(data) {
							  //alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
							  alert(_MESSAGE.common.deleteSuccess);
							  getData();
								$('#detail-panel').hide();
								$('#update-panel').hide();
						  },
						  error: function( req, status, err ) {
						    alert(_MESSAGE.common.deleteFail);
						  }
						});	 
			 }
		 }
		 
		 
  }
//   function deleteCode(){
	  
//   }
//   function link_part(cellValue, options, rowObject) {	
// 	 	var type = options['field'];
// 		var row = options['model'];
// 		var lev = row['LEV'];
// 		if(type=='ACTION' && writePermission){

// 			if(lev<2){
// 				return '<div class="add-delete-btn-wrap"><a  onclick="removePart(event)" class="delete-btn"><span class="sr-only">delete</span><i class="xi-minus-square"></i></a>'
// 	          +'<a onclick="addItemPart(event)"  class="add-btn"><span class="sr-only">add</span><i class="xi-plus-square"></i></a></div>';
// 			}else{
// 				return '<div class="add-delete-btn-wrap"><a  onclick="removePart(event)" class="delete-btn"><span class="sr-only">delete</span><i class="xi-minus-square"></i></a></div>';
// 			}
// 		}else{
// 			return '<div></div>'
// 		}
// }
//   function topFunction() {
// 	  $('#cont').animate({
// 		    scrollTop: $("#grid3")[0].offsetTop
// 	  }, 400);
// }
  
  $(function(){
	  getData();
// 	  drawgrid_part();
		 $('.system-detail-wrap .registration-form-lst.registration-form-lst-bg  div.wrap-scroll-area').mCustomScrollbar({
			    axis: "Y",
			    theme: "minimal-dark",
			    mouseWheelPixels: 300
			  });
		 
		 $('#select_type').change(function(){
			  getData();
		 })
	})

	function importExel(){
	var type="CODE";
	var url = CTX+'/sys/sys_0103/importExel/form.tab?CODE_TYPE=003&TYPE='+type;
	var param = {};		
	var success = function(html){
			};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.4) + ',height=' + (parseInt(window.innerHeight) * 0.4));	
}
  
  
  function openDialog(){
		var lev = 1

		var url = CTX + '/sys/sys_0108/form.dialog';
		openCommonDialog(url, {'LEV': lev}, '', 'registration');
	}

function openDialog2(){
	 	var cd = $('#PART_CD').val();
	 	var nm = ($('#detail-panel .prefix').html()? ($('#detail-panel .prefix').html() + ' | '): '') + $('#detail-panel .suffix').html();
		var lev = parseInt($('#LEV_PART_CD').val()) + 1;
		
		var type = $('#detail-panel .type').html();
		if(lev>3){
			return false;
		}
		var url = CTX + '/sys/sys_0108/form.dialog';
		openCommonDialog(url, {'UP_CD': cd, 'UP_NM': nm, 'TYPE': type, 'LEV': lev}, '', 'registration');
	}
	

function getData(){
	debugger;
	var type = $('#select_type').val()
	var url = CTX+'/sys/sys_0108/getPartCode.ajax';
	$.ajax({
		  url: url,
		  type: 'GET',
		  data:{
			  TYPE: type,
			  SORT: g_sort
		  },
		  success: function(data) {
// 			  console.log(data);
			  list = data;
			  generateUI(data);
		  },
		  error: function( req, status, err ) {
		    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
		  }
		});	
}


function generateUI(data){
	 var lastId = '';
	 var lastLev = 0;
	 $('.registration-scoll').empty();
	 var $area = $('.registration-scoll');
	 data.forEach(function(obj, i) {
		 var lev = obj['LEV'] 
		 
		 if(!obj['TYPE']){
			 console.log('no type');
		 }
		 console.log(obj['TYPE']);

		 if(lev == 1) {
			 $area.append(
					 '<li class="line" LEV="'+lev+'" part_cd="'+ obj['PART_CD'] +'">'
				+'<div index="'+i+'" class="registration">'
				+'<span>'+obj['NAME']+'</span>'
				+'<div class="tag c_'+obj['TYPE']+'">'+obj['TYPE']+'</div>'
				+'<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
				+'</div>'
				+'</li>');
			
		 } else if(lev < lastLev) {
			 var $parent = $('li[part_cd="'+ lastId +'"]').closest('li[LEV="'+(lev-1)+'"]');
			 if($parent.children('ul.depth2').length > 0){
				 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" part_cd="'+ obj['PART_CD'] +'">'
									+'	<div index="'+i+'" class="registration">'
									+'<span>'+obj['NAME']+'</span>'
									+'<div class="tag c_'+obj['TYPE']+'">'+obj['TYPE']+'</div>'
									+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
									+'	</div>'
									+'</li>');
			 }else{
				 $parent.append( '<ul class="depth2"> <li  LEV="'+lev+'" part_cd="'+ obj['PART_CD'] +'">'
							+'	<div index="'+i+'"  class="registration">'
							+'<span>'+obj['NAME']+'</span>'
							+'<div class="tag c_'+obj['TYPE']+'">'+obj['TYPE']+'</div>'
							+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
							+'	</div>'
							+'</li></ul>');
			 }
		 } else if(lev > lastLev){
			 var $parent = $('li[part_cd="'+ lastId +'"]');
			 if($parent.children('ul.depth2').length > 0){
				 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" part_cd="'+ obj['PART_CD'] +'">'
									+'	<div index="'+i+'"  class="registration">'
									+'<span>'+obj['NAME']+'</span>'
									+'<div class="tag c_'+obj['TYPE']+'">'+obj['TYPE']+'</div>'
									+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
									+'	</div>'
									+'</li>');
			 }else{
				 $parent.append( '<ul class="depth2"> <li  LEV="'+lev+'" part_cd="'+ obj['PART_CD'] +'">'
							+'	<div index="'+i+'"  class="registration">'
							+'<span>'+obj['NAME']+'</span>'
							+'<div class="tag c_'+obj['TYPE']+'">'+obj['TYPE']+'</div>'
							+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
							+'	</div>'
							+'</li></ul>');
			 }
		 } else {
			 var $parent = $('li[part_cd="'+ lastId +'"]').closest('li[LEV="'+(lev-1)+'"]');
			 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" part_cd="'+ obj['PART_CD'] +'">'
						+'	<div index="'+i+'"  class="registration">'
						+'<span>'+obj['NAME']+'</span>'
						+'<div class="tag c_'+obj['TYPE']+'">'+obj['TYPE']+'</div>'
						+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
						+'	</div>'
						+'</li>');
		 }
		 
		 lastLev = obj['LEV'];
		 lastId = obj['PART_CD'];
	 });

	
	$('div.registration').click(function(){
		 partClick($(this));
	})
}

function preUpdate() {
	$('#detail-panel').hide();
	$('#update-panel').show();
}

function cancelUpdate() {
	$('#detail-panel').show();
	$('#update-panel').hide();
}


$(function(){
	
	$('#select_sort').change(function(){
		g_sort = $(this).val();
		getData();
		
	})
})

</script>
<style>
li > div.registration > div.tag {
    padding: 4px;
    border-radius: 8px;
    background: #455eee;
    color: #fff;
    display: inline-block;
    font-size: 10px;
}
.c_PART{
	background: #455eee !important;
}

.c_TOOL{
	background: #636363 !important;
}

.c_PPE{
	background: #F79838 !important;
}

</style>

<div class="container system-wrap system-wrap1">
  <!-- 유지보수 테이블 관리 -->
  <div class="system-detail-wrap">
    <div class="system-left" style="width: 100%; border-right: none; padding-right: 0;">
	  
      <!--tit-wrap-->
       
      <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.SUBMENU.MENU_NM}</li>
<%--           <li class="bold"><spring:message code='sys.sys_0101.list.partCd' /></li> --%>
	      
	    </ul>
	  </div>
      <!--//tit-wrap-->
      <!-- registration form -->
      <div id="part_form" class="maintenance-form registration-form registration-form1">
        <div class="registration-form-lst-wrap maintenance-write-form">
          	         <div class="registration-form-lst registration-form-lst-bg">
						<h3>Code list</h3>
						<div class="select-box" style="display: inline-grid; width: 20%; margin-left: 20px; background: #fff">
						<label for="select_type" class="mark">-- TYPE --</label>
						<select id="select_type" name="search.TYPE" class="info-select">
							<option value="all"># Asset</option>
							<option value="PART">PART</option>
							<option value="TOOL">TOOL</option>
							<option value="PPE">PPE</option>
						</select>			
						</div>		
						
						<div class="select-box" style="display: inline-grid; width: 30%; margin-left: 10px; background: #fff">
						<label for="select_type" class="mark">-- SORT --</label>
						<select id="select_sort" name="search.SORT" class="info-select">
							<option value="name"># Sort</option>
							<option value="date">Registration Date</option>
						</select>			
						</div>	
						
								<button type="button" onclick="openDialog()" class="registration-search-btn btn-style btn-style1 popup-btn">Register</button>
						<div class="wrap-scroll-area">
						<ul class="registration-scoll">
							
						</ul>
						</div>
						
					</div>
	   				<ul id="detail-panel" style="display: none" class="registration-form-lst right">
         				<input type="hidden" id="PART_CD" name="PART_CD">
<!--          				<input type="hidden" id="UP_CD" name="UP_CD"> -->
         				<input type="number" hidden id="LEV_PART_CD" name="LEV_PART_CD">
         				<input type="hidden" id="UP_PART_CD" name="UP_PART_CD">
         				
         			
						<li class="head-area">
							<h3>
								<span class="up_nm"></span>
							</h3>
							<span class="btn-wrap"> 

								<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
									<a onclick="openDialog2()" class="add-btn">
										<i class="xi-plus"></i>
									</a>
									<a onclick="preUpdate()" class="modify-btn">
										<i class="xi-eraser"></i>
									</a>
									<a onclick="removePart()" class="del-btn">
										<i class="xi-trash"></i>
									</a> 
								</c:if>
								
							</span>
						</li>
						<li class="tit-area">
							<span class="tit">Code</span>
							<strong class="tit-sub">
								<em class="num prefix"></em>
								<span class="code-name suffix"></span>
							</strong>
						</li>
						<li class="type-area">
							<span class="tit">Type</span>
							<span class="txt type"></span>
						</li>
						<li class="sub-area">
							<span class="tit">Description</span>
							<span class="cont description">
							</span>
						</li>
					</ul>
					
					<ul id="update-panel"  style="display: none"  class="registration-form-lst right">
					
						<li class="head-area">
							<h3>
								<span>Code edit</span>
							</h3> 
							<span class="btn-wrap">
							<a onclick="confirmCode()" class="save-btn btn-style btn-style1">Save</a>
							<a onclick="cancelUpdate()"	class="close-btn"> <i class="xi-close"></i></a>
							</span>
						</li>
						<li class="sub0"><span>Parent code</span>
							<div class="registration-write">
								<div class="input-group">
									<label for="name" class="sr-only">Name</label> <input type="text" id="UP_PART_NM" name="" class="up_nm" value="" readonly></div>
							</div>
						</li>

						<li class="sub1"><span>Code<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="name" class="sr-only">Code</label> <input
										type="text" id="PRE_PART_CD"  nova-validation="required" name="PRE_PART_CD"  class="prefix" value="" placeholder="Prefix">
								</div>
								<div class="input-group">
									<label for="name" class="sr-only">Code</label> <input
										type="text" id="SUF_PART_CD"  nova-validation="required" class="suffix" name="SUF_PART_CD" value="" placeholder="Suffix code">
								</div>

							</div>
						</li>
						<li class="sub2"><span>Description<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="name"class="sr-only">Description</label>
									<textarea id="DESCRPT" nova-validation="required"  class="description">

									</textarea>
								</div>
							</div>
						</li>
					</ul>
					
<!--           <ul class="registration-form-lst"> -->
<!-- 											<input type="hidden" id="PART_CD" name="PART_CD"> -->
<!-- 											<input type="hidden" id="UP_PART_CD" name="UP_PART_CD"> -->
<!-- 											<input type="hidden" id="LEV_PART_CD" name="LEV_PART_CD"> -->
<!-- 											<input type="hidden" id="TYPE_PART_CD" name="TYPE_PART_CD"> -->
<!--             <li> -->
<%--               <span><spring:message code='sys.sys_0101.parenCd' /><span class="red"> *</span></span> --%>
<!--               <div class="registration-write"> -->
<!--                 <div class="input-group"> -->
<!--                   <label for="maintenancecode" class="sr-only">Code</label> -->
<!--                   <input type="text" placeholder="Select parent on left table." name="UP_PART_NM" id="UP_PART_NM" nova-validation="required" readonly="readonly" placeholder=""> -->
<!--                 </div> -->
                
<!--               </div> -->
<!--             </li> -->
<!--             <li> -->
<!--               <span>Code<span class="red"> *</span></span> -->
<!--               <div class="registration-write btn-input-wrap btn-input-twice-wrap "> -->
<!--                 <div class="input=wrapper"> -->
<!--                 	<div class="input-group"> -->
<!-- 	                  <label for="SUF_PART_CD" class="sr-only">Code</label> -->
<!-- 	                  <input type="text" name="PRE_PART_CD"  placeholder="PREFIX" id="PRE_PART_CD" placeholder=""> -->
<!-- 	                </div> -->
<!-- 	                <div class="input-group"> -->
<!-- 	                  <label for="SUF_PART_CD" class="sr-only">Code</label> -->
<!-- 	                  <input type="text" name="SUF_PART_CD" placeholder="SUFFIX" id="SUF_PART_CD" placeholder=""> -->
<!-- 	                </div> -->
<!--                 </div> -->
<!--               </div> -->
<!--             </li> -->
<!-- 	     <li> -->
<%--               <span><spring:message code='sys.sys_0101.list.title.description' /><span class="red"> *</span></span> --%>
<!--               <div class="registration-write"> -->
<!--                 <div class="input-group"> -->
<!--                   <label for="DESCRPT" class="sr-only">Description</label> -->
<!--                   <textarea maxlength="2500" id="DESCRPT" name="DESCRPT"></textarea> -->
<!--                 </div> -->
                
<!--               </div> -->
<!--             </li> -->
<!--           </ul> -->
        </div>
      </div>
      <!-- //registration form -->
    </div>
<%--     <div class="system-right">
      <div class="btns">
      	<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
        	<a onclick="confirmCode()" class="btn-style btn-style1"><spring:message code='button.save' /></a>
      	</c:if>
        <a href="" class="btn-style btn-style2"><spring:message code='button.back' /></a>
        <a onclick="deleteCode()" class="btn-style btn-style3"><spring:message code='button.delete' /></a>
        <a onclick="importExel()" class="btn-style btn-style1"><spring:message code='sys.sys_0101.importEx' /></a>
        
      </div>
    </div> --%>
  </div>
  <!-- //유지보수 테이블 관리 -->
</div>
