<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">

<script type="text/javascript" >
var code = '${CODE}';
var type = '${TYPE}';

var writePermission = '${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN}' == 'Y';

 
 function confirmCode(){

	 if(validateCommon()){

		 var code = $('#COMM_CD').val();
			var old = $('#OLD_COMMON_CD').val();

			var name = $('#COMM_NM').val();
			var upCd = $('#UP_COMMON_CD').val();
			var lev = $('#LEV_COMMON_CD').val();
			var crud = 'U';
			var description = $('#DESCRPT').val();
			$.ajax({
				  url: CTX+'/sys/sys_0104/addCommonCode.ajax',
				  type: 'POST',
				  data:{
					  COMM_CD:code,
					  COMM_NM:name,
					  DESCRPT:description,
					  CRUD:crud,
					  LEV:lev,
					  UP_CD: upCd,
					  OLD_COMM_CD: old
				  },
				  success: function(data) {
					  if(data == 'true'){
						  
							alert(crud == 'C'?'<spring:message code='message.saveSuccess' />': '<spring:message code='message.updateSuccess' />');
							getData();
							$('#detail-panel .copde').html(code);
							$('#detail-panel .name').html(name);
							$('#detail-panel .description').html(description);
							cancelUpdate();
					  }else if( data == 'dupl'){
							$('#COMM_CD').inputWarning('This code already have existed.');
							alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');  
					  }else{
							alert(crud == 'C'?'<spring:message code='message.saveFailed' />': '<spring:message code='message.updateFailed' />');
					  }
					  resetComm();
				  },
				  error: function( req, status, err ) {
				    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
				  }
				});	
		}
 }

 function doubleCheck(){
	var crud = 'U';
		
	 var code = $('#COMM_CD').val().trim();
		
		if(code==null||code==''){
			$('#COMM_CD').inputWarning('"Code" is required item.');
			alert('"Code" is required item.');
			return false;
		}
		var upcode = $('#UP_COMMON_NM').val().trim();
		if(upcode==null||upcode==''){
			$('#UP_COMMON_NM').inputWarning('Please click add button on parent code.');
			alert('Please click add button on parent code.');
			return false;
		}
		var old = $('#OLD_COMMON_CD').val().trim();
		if(old){
			old = '&OLD_COMM_CD='+old;
		}else{
			old = '';
		}
			$.ajax({
				  url: CTX+'/sys/sys_0104/checkDoubleCode.ajax?COMM_CD='+code+'&UP_CD='+upcode + old,
				  type: 'GET',
				  success: function(data) {
					    if(data === true){
					    	$('#COMM_CD').available();
					    }else if(data === false){
							$('#COMM_CD').inputWarning('This code already have existed.');
					    	alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');

					    }else{
					    	alert('<spring:message code='msg.somethingWrong' />')
					    }
				  },
				  error: function( req, status, err ) {
				    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
				  }
				});		

		
	}
 

function deleteCode(){
		
		 var code = '${CODE}'; 
		 var lev = 1;

		 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
				$.ajax({
					  url: CTX+'/sys/sys_0104/deleteCommonCode.ajax',
					  data:{
						  LEV: lev,
						  CODE: code.trim()
					  },
					  success: function(data) {
						  alert('<spring:message code='message.deletedSuccess' />');
						window.location.href = CTX+ '/sys/sys_0104/list?';
						 
					  },
					  error: function( req, status, err ) {
						  alert('<spring:message code='message.deletedFailed' />');
					  }
					});	 
		 } 
}

function removeComm(){
	
	var code = $('#COMM_CD').val();
	var lev = $('#LEV_COMMON_CD').val();
	
	
		 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
				$.ajax({
					  url: CTX+'/sys/sys_0104/deleteCommonCode.ajax',
					  data:{
						  LEV: lev,
						  CODE: code.trim()
					  },
					  success: function(data) {
						  alert('<spring:message code='message.deletedSuccess' />');
						  if(lev == 1){
							  window.location.href = CTX+ '/sys/sys_0104/list?';
						  }else{
							  getData();
								$('#detail-panel').hide();
								$('#update-panel').hide();
						  }

					  },
					  error: function( req, status, err ) {
						  alert('<spring:message code='message.deletedFailed' />');
					  }
					});	 
		 } 
}
function addItemComm(obj){
	  resetComm();

	 var id = $(obj.target).closest('tr').attr('data-uid');
		var item =  $('#table_grid_code').data('kendoGrid').dataSource.getByUid(id)
		 var code = item.COMM_CD; 
		 var name = item.NAME;
		 var lev = item.LEV;
		 
		 
	
		 if(lev<3){

			 $('#COMM_CD').val('');
			 $('#COMM_NM').val('');
			 $('#DESCRPT').val('');
			 $('#LEV_COMMON_CD').val(parseInt(lev)+1);
			 $('#UP_COMMON_CD').val(code);
			 $('#UP_COMMON_NM').val(name);
			 $('#TYPE_COMMON_CD').val('C');
			 
		 }else{
			 resetComm();
		 }
}
function validateCommon(){
	var check = true;
	var code = $('#COMM_CD').val().trim();
	var name = $('#COMM_NM').val().trim();
	var parent = $('#UP_COMMON_NM').val().trim();
	var desc = $('#DESCRPT').val().trim();
	if(code==null||code==''){
		check = false;
		$('#COMM_CD').inputWarning('"Code" is required item.');
	}
	if(name==null||name==''){
		check = false;
		$('#COMM_NM').inputWarning('"Code name" is required item.');

	}
	if(parent==null||parent==''){
		check = false;
		$('#UP_COMMON_NM').inputWarning('Please click add button on parent code.');

	}
	if(desc==null||desc==''){
		check = false;
		$('#DESCRPT').inputWarning('"Description" is required item.');

	}
	return check;
} 
 
$(function(){
// 	drawgrid_comm();
	getData();
	 $('.system-detail-wrap .registration-form-lst.registration-form-lst-bg  div.wrap-scroll-area').mCustomScrollbar({
	    axis: "Y",
	    theme: "minimal-dark",
	    mouseWheelPixels: 300
	  });
});

function codeClick(obj) {	
	$('#update-panel input, textarea').val('');
	var i = obj.attr('index');
//		alert(i);
	var obj = list[i];
//		console.log(obj);
	var up_nm;

	if (obj['LEV'] > 1) {
		list.forEach(function(obj2, i) {
			if (obj2.COMM_CD == obj.UP_CD) {
				up_nm = obj2.NAME;
			}
		});
	} else {
		up_nm = 'ROOT'
	}
	
	if(parseInt(obj.LEV) > 2){
		$('.add-btn').hide();
	}else{
		$('.add-btn').show();
	}
	
// 	if(parseInt(obj.LEV) > 1){
// 		$('#PRE_COMMON_CD').closest('div.input-group').hide();
// 	}else{
// 		$('#PRE_COMMON_CD').closest('div.input-group').show();
// 	}
	
	$('#LEV_COMMON_CD').val( parseInt(obj.LEV));
	$('#UP_COMMON_CD').val(obj.UP_CD);
	$('#COMM_CD').val(obj.COMM_CD);
	
	$('#OLD_COMMON_CD').val(obj.COMM_CD);
	
	$('#detail-panel .up_nm').html(up_nm);
// 	$('#detail-panel .prefix').html(obj.PRE_NM);
	$('#detail-panel .code').html(obj.COMM_CD);
	$('#detail-panel .name').html(obj.NAME);
	$('#detail-panel .description').html(obj.DESCRPT);		
	$('#update-panel .up_nm').val(up_nm);
	$('#update-panel .code').val(obj.COMM_CD);
	$('#update-panel .name').val(obj.NAME);
	$('#update-panel .description').val(obj.DESCRPT);
	$('#update-panel input, textarea').resetWarning();
	$('#detail-panel').show();
	$('#update-panel').hide();
}

//.system-detail-wrap .registration-form-lst.registration-form-lst-bg
// $('.system-detail-wrap .registration-form-lst.registration-form-lst-bg').mCustomScrollbar({
//   axis: "Y",
//   theme: "minimal-dark",
//   mouseWheelPixels: 300
// });

function openDialog(){
	var lev = 1

	var url = CTX + '/sys/sys_0104/form.dialog';
	openCommonDialog(url, {'LEV': lev}, '', 'registration');
}

function openDialog2(){
	var cd = $('#COMM_CD').val();
 	var nm = $('#detail-panel .name').html();
	var lev = parseInt($('#LEV_COMMON_CD').val()) + 1;
// 	if(lev > 2){
// 		return false;
// 	}
// 	var type = $('#detail-panel .type').html();
	if(lev>3){
		return false;
	}
	var url = CTX + '/sys/sys_0104/form.dialog';
	openCommonDialog(url, {'UP_CD': cd, 'UP_NM': nm, 'LEV': lev}, '', 'registration');
}


function getData(){
var url = CTX+'/sys/sys_0104/getCommonCode.ajax?CODE='+code;
$.ajax({
	  url: url,
	  type: 'GET',
	  data:{
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
	 if(lev == 1) {
		 $area.append(
				 '<li class="line" LEV="'+lev+'" part_cd="'+ obj['COMM_CD'] +'">'
			+'<div index="'+i+'" class="registration">'
			+'		<span class="num">'+obj['CODE']+'</span><span>'+obj['NAME']+'</span>'
			+'<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
			+'</div>'
			+'</li>');
		
	 } else if(lev < lastLev) {
		 var $parent = $('li[part_cd="'+ lastId +'"]').closest('li[LEV="'+(lev-1)+'"]');
		 if($parent.children('ul.depth2').length > 0){
			 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" part_cd="'+ obj['COMM_CD'] +'">'
								+'	<div index="'+i+'" class="registration">'
								+'		<span class="num">'+obj['CODE']+'</span><span>'+obj['NAME']+'</span>'

// 								+'<span>'+obj['NAME']+'</span>'
								+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
								+'	</div>'
								+'</li>');
		 }else{
			 $parent.append( '<ul class="depth2"> <li  LEV="'+lev+'" part_cd="'+ obj['COMM_CD'] +'">'
						+'	<div index="'+i+'"  class="registration">'
						+'		<span class="num">'+obj['CODE']+'</span><span>'+obj['NAME']+'</span>'
						+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
						+'	</div>'
						+'</li></ul>');
		 }
	 } else if(lev > lastLev){
		 var $parent = $('li[part_cd="'+ lastId +'"]');
		 if($parent.children('ul.depth2').length > 0){
			 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" part_cd="'+ obj['COMM_CD'] +'">'
								+'	<div index="'+i+'"  class="registration">'
								+'		<span class="num">'+obj['CODE']+'</span><span>'+obj['NAME']+'</span>'
								+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
								+'	</div>'
								+'</li>');
		 }else{
			 $parent.append( '<ul class="depth2"> <li  LEV="'+lev+'" part_cd="'+ obj['COMM_CD'] +'">'
						+'	<div index="'+i+'"  class="registration">'
						+'		<span class="num">'+obj['CODE']+'</span><span>'+obj['NAME']+'</span>'
						+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
						+'	</div>'
						+'</li></ul>');
		 }
	 } else {
		 var $parent = $('li[part_cd="'+ lastId +'"]').closest('li[LEV="'+(lev-1)+'"]');
		 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" part_cd="'+ obj['COMM_CD'] +'">'
					+'	<div index="'+i+'"  class="registration">'
					+'		<span class="num">'+obj['CODE']+'</span><span>'+obj['NAME']+'</span>'
					+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
					+'	</div>'
					+'</li>');
	 }
	 
	 lastLev = obj['LEV'];
	 lastId = obj['COMM_CD'];
 });


	$('div.registration').click(function(){
		 codeClick($(this));
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
</script>

<div class="container system-wrap system-wrap1">
  <!-- 유지보수 테이블 관리 -->
  <div class="system-detail-wrap">
    <div class="system-left">
      <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">${CODE}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
          <li class="bold"><spring:message code='sys.sys_0101.list.Comm' /></li>
	      
	    </ul>
	  </div>

      <!--//tit-wrap-->
      <!-- registration form -->
      <div id="commonCodeForm" class="maintenance-form registration-form registration-form1">
        <div class="registration-form-lst-wrap maintenance-write-form">

            <div class="registration-form-lst registration-form-lst-bg">
				<h3>Code list</h3>
<!-- 				<button type="button" onclick="openDialog()" class="registration-search-btn btn-style btn-style1 popup-btn">Register</button> -->
				<div class="wrap-scroll-area">
						<ul class="registration-scoll">
							
						</ul>
				</div>
						
			</div>
			<ul id="detail-panel" style="display: none" class="registration-form-lst right">
<!--          				<input type="hidden" id="COMM_CD" name="COMM_CD"> -->
<!--          				<input type="hidden" id="UP_CD" name="UP_CD"> -->
<!--          				<input type="number" hidden id="LEV_COMMON_CD" name="LEV_COMMON_CD"> -->
<!--          				<input type="hidden" id="UP_COMMON_CD" name="UP_COMMON_CD"> -->
         				
         			
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
									<a onclick="removeComm()" class="del-btn">
										<i class="xi-trash"></i>
									</a> 
								</c:if>
								
							</span>
						</li>
						<li class="tit-area">
							<span class="tit">Code</span>
							<strong class="tit-sub">
								<span class="code-name code"></span>
							</strong>
						</li>
						<li class="type-area">
							<span class="tit">Name</span>
							<span class="txt name"></span>
						</li>
						<li class="sub-area">
							<span class="tit">Description</span>
							<span class="cont description">
							</span>
						</li>
					</ul>
					
					<ul id="update-panel"  style="display: none"  class="registration-form-lst right">
						<input type="hidden" id="UP_COMMON_CD" name="UP_COMMON_CD">
						<input type="hidden" id="LEV_COMMON_CD" name="LEV_COMMON_CD">
						<input type="hidden" id="TYPE_COMMON_CD" name="TYPE_COMMON_CD">
						<input type="hidden" id="OLD_COMMON_CD" name="OLD_COMMON_CD">
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
									<label for="name" class="sr-only">Name</label> <input type="text" id="UP_COMMON_NM" name="" class="up_nm" value="" readonly></div>
							</div>
						</li>
						

						<li class="sub4"><span>Code<span class="red"> *</span></span>
							<div class="registration-write btn-input-wrap btn-input-double-check">
								<div class="input-group">
									<label for="name" class="sr-only">Code</label> 
									<input type="text" id="COMM_CD"  nova-validation="required" name="COMM_CD"  class="code"  value="" placeholder="">
								</div>
								<button type="button" onclick="doubleCheck()" class="registration-search-btn">Double Check</button>
							</div>
						</li>
						<li class="sub4"><span>Name<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="name" class="sr-only">Name</label> 
									<input type="text" id="COMM_NM"  nova-validation="required" name="NAME" class="name"   value="" placeholder="">
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
<%--           <ul class="registration-form-lst">
				<input type="hidden" id="UP_COMMON_CD" name="UP_COMMON_CD">
				<input type="hidden" id="LEV_COMMON_CD" name="LEV_COMMON_CD">
				<input type="hidden" id="TYPE_COMMON_CD" name="TYPE_COMMON_CD">
				<input type="hidden" id="OLD_COMMON_CD" name="OLD_COMMON_CD">
				
            <li>
              <span>Parent code<span class="red"> *</span></span>
              <div class="registration-write">
                <div class="input-group">
                  <label for="UP_COMMON_NM" class="sr-only">Code</label>
                  <input type="text" name="UP_COMMON_NM" id="UP_COMMON_NM" placeholder="Select parent on left table." readonly="readonly" placeholder="">
                </div>
                
              </div>
            </li>
            <li>
              <span><spring:message code='sys.sys_0101.list.title.code' /><span class="red"> *</span></span>
              
              <div class="registration-write btn-input-wrap btn-input-double-check">
                <div class="input-group">
                  <label for="COMM_CD" class="sr-only"><spring:message code='sys.sys_0101.list.title.code' /></label>
                  <input type="text" nova-validation="required" name="COMM_CD" id="COMM_CD" placeholder="">
                </div>
                <button type="button" onclick="doubleCheck()" class="registration-search-btn">Double Check</button>
              
              </div>
            </li>
             <li>
              <span><spring:message code='sys.sys_0101.list.title.codeName' /><span class="red"> *</span></span>
              <div class="registration-write">
                <div class="input-group">
                  <label for="COMM_NM" class="sr-only"><spring:message code='sys.sys_0101.list.title.codeName' /></label>
                  <input type="text" nova-validation="required" name="COMM_NM" id="COMM_NM" placeholder="">
                </div>
               
              </div>
            </li>
	     <li>
              <span><spring:message code='sys.sys_0101.list.title.description' /><span class="red"> *</span></span>
              <div class="registration-write">
<!--                 <div class="input-group"> -->
					                              <div class="input-group input-group-wrap">

                  <label for="DESCRPT" class="sr-only">Description</label>
                  <textarea  nova-validation="required" maxlength="2500" id="DESCRPT" name="DESCRPT"></textarea>
                  </div>
<!--                 </div> -->
                
              </div>
            </li>
          </ul> --%>
        </div>
      </div>
      <!-- //registration form -->
    </div>
	<div class="system-right">
      <div class="btns">
<%--       	<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
    
        	<a onclick="confirmCode()" class="btn-style btn-style1"><spring:message code='button.save' /></a>
      </c:if> --%>
        <c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
        	<a onclick="deleteCode()" class="btn-style btn-style3"><spring:message code='button.delete' /></a>
        </c:if>
        <a href="" class="btn-style btn-style2"><spring:message code='button.back' /></a>

      </div>
    </div>
  </div>
  <!-- //유지보수 테이블 관리 -->
</div>
