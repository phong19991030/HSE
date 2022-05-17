<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript" >

var writePermission = '${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN}' == 'Y';
var list = [];
var index;
 var g_sort = 'name';
 
 function getData(){
	var url = CTX+'/sys/sys_0107/getMaintanceCode.ajax';
	$.ajax({
		  url: url,
		  type: 'GET',
		  data:{
			  SORT: g_sort
		  },
		  success: function(data) {
// 			  console.log(data);
			  list = data;
			  generateUI(list);
		  },
		  error: function( req, status, err ) {
		    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
		  }
		});	
 }
 
 
 function openDialog(){
		var lev = 1

		var url = CTX + '/sys/sys_0107/form.dialog';
		openCommonDialog(url, {'LEV': lev}, '', 'registration');
	}
 
 function openDialog2(){
	 	var cd = $('#MAIN_CD').val();
	 	var nm = $('#detail-panel .prefix').html() + ' | ' + $('#detail-panel .suffix').html();
		var lev = parseInt($('#LEV_MAIN_CD').val()) + 1;
		if(lev>3){
			return false;
		}
		var url = CTX + '/sys/sys_0107/form.dialog';
		openCommonDialog(url, {'UP_CD': cd, 'UP_NM': nm, 'LEV': lev}, '', 'registration');
	}
 
 function generateUI(data){
	 var lastId = '';
	 var lastLev = 0;
	 $('.registration-scoll').empty();
	 var $area = $('.registration-scoll');
	 
// 	 if(g_sort == 'date'){
// 		 data.sort( sortByDate );
// 	 }else{
// 		 data.sort( sortByName );
// 	 }

	 data.forEach(function(obj, i) {
		 if(obj['MAINTEN_CD'] == "20210126070736036"){
		 }
		 var lev = obj['LEV'] 
		 if(lev == 1) {
			 $area.append(
					 '<li class="line" LEV="'+lev+'" mainten_cd="'+ obj['MAINTEN_CD'] +'">'
				+'<div index="'+i+'" class="registration">'
				+'<span class="num">'+obj['PRE_NM']+'</span><span>'+obj['SUF_NM']+'</span>'
				+'<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
				+'</div>'
				+'</li>');
			
		 } else if(lev < lastLev) {
			 var $parent = $('li[mainten_cd="'+ lastId +'"]').closest('li[LEV="'+(lastLev-2)+'"]');
			 if($parent.children('ul.depth2').length > 0){
				 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" mainten_cd="'+ obj['MAINTEN_CD'] +'">'
									+'	<div index="'+i+'" class="registration">'
									+'		<span class="num">'+obj['PRE_NM']+'</span><span>'+obj['SUF_NM']+'</span>'
									+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
									+'	</div>'
									+'</li>');
			 }else{
				 $parent.append( '<ul class="depth2"> <li  LEV="'+lev+'" mainten_cd="'+ obj['MAINTEN_CD'] +'">'
							+'	<div index="'+i+'"  class="registration">'
							+'		<span class="num">'+obj['PRE_NM']+'</span><span>'+obj['SUF_NM']+'</span>'
							+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
							+'	</div>'
							+'</li></ul>');
			 }
		 } else if(lev > lastLev){
			 var $parent = $('li[mainten_cd="'+ lastId +'"]');
			 if($parent.children('ul.depth2').length > 0){
				 $parent.children('ul.depth2').append( '<li  LEV="'+lev+'" mainten_cd="'+ obj['MAINTEN_CD'] +'">'
									+'	<div index="'+i+'"  class="registration">'
									+'		<span class="num">'+obj['PRE_NM']+'</span><span>'+obj['SUF_NM']+'</span>'
									+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
									+'	</div>'
									+'</li>');
			 }else{
				 $parent.append( '<ul class="depth2"> <li  LEV="'+lev+'" mainten_cd="'+ obj['MAINTEN_CD'] +'">'
							+'	<div index="'+i+'"  class="registration">'
							+'		<span class="num">'+obj['PRE_NM']+'</span><span>'+obj['SUF_NM']+'</span>'
							+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
							+'	</div>'
							+'</li></ul>');
			 }
		 } else {
			 var $parent = $('li[mainten_cd="'+ lastId +'"]').closest('li[LEV="'+(lastLev-1)+'"]');
			 $parent.children('ul.depth2').append('<li  LEV="'+lev+'" mainten_cd="'+ obj['MAINTEN_CD'] +'">'
						+'	<div index="'+i+'"  class="registration">'
						+'		<span class="num">'+obj['PRE_NM']+'</span><span>'+obj['SUF_NM']+'</span>'
						+'		<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>'
						+'	</div>'
						+'</li>');
		 }
		 
		 lastLev = obj['LEV'];
		 lastId = obj['MAINTEN_CD'];
	 });
	 
	 $('div.registration').click(function(){
		 maintenClick($(this));
	 })
	}

	function confirmCode() {

		var suf = $('#SUF_MAIN_CD').val();
		var fre = $('#PRE_MAIN_CD').val();
		var lev = $('#LEV_MAIN_CD').val();
		var upCd = $('#UP_MAIN_CD').val();
		var description = $('#DESCRPT').val();
		var crud = 'U';
		var code = $('#MAIN_CD').val();
		if (validateMainten()) {
			$
					.ajax({
						url : CTX + '/sys/sys_0107/addMaintenCode.ajax',
						type : 'POST',
						data : {
							DESCRPT : description,
							CRUD : crud,
							SUFFIX_NM : suf,
							LEV : lev,
							UP_CD : upCd,
							PREFIX_NM : fre,
							MAINTEN_CD : code
						},
						success : function(data) {
							if (data.result == 'true') {
								//alert(crud == 'C' ? '<spring:message code='message.saveSuccess' />'
								//		: '<spring:message code='message.updateSuccess' />');
								alert(_MESSAGE.common.saveSuccess);
								getData();
								$('#detail-panel .prefix').html(fre);
								$('#detail-panel .suffix').html(suf);
								$('#detail-panel .description').html(description);	
								cancelUpdate();
							} else {
								if (data.msg == "dupl") {
									alert('<spring:message code='sys.sys_0101.dulp' />');
									$('#PRE_MAIN_CD').inputWarning(
											'This code already have existed.')
									$('#SUF_MAIN_CD').inputWarning(
											'This code already have existed.')

								} else {
									//alert(crud == 'C' ? '<spring:message code='message.saveSuccess' />'
									//		: '<spring:message code='message.updateFailed' />');
									alert(_MESSAGE.common.saveFail);
								}
							}

						},
						error : function(req, status, err) {
							console
									.log(
											'<spring:message code='msg.somethingWrong' />',
											status, err);
						}
					});
		} else {
			alert('<spring:message code='sys.sys_0101.list.alert.invalid' />')
		}
	}

	function cancelCode() {
		var url = CTX + '/sys/sys_0107/list';
		$(location).attr('href', url);

	}

	function maintenClick(obj) {	
		$('#update-panel input, textarea').val('');
		var i = obj.attr('index');
// 		alert(i);
		var obj = list[i];
// 		console.log(obj);
		var up_nm;
		if (obj['LEV'] > 1) {
			list.forEach(function(obj2, i) {
				if (obj2.MAINTEN_CD == obj.UP_CD) {
					up_nm = obj2.NAME;
				}
			});
		} else {
			up_nm = 'ROOT'
		}
		
		if(parseInt(obj.LEV) >= 3){
			$('.add-btn').hide();
		}else{
			$('.add-btn').show();

		}
		
		$('#LEV_MAIN_CD').val( parseInt(obj.LEV));
		 $('#UP_MAIN_CD').val(obj.UP_CD);
		$('#MAIN_CD').val(obj.MAINTEN_CD);
		$('#detail-panel .up_nm').html(up_nm);
		$('#detail-panel .prefix').html(obj.PRE_NM);
		$('#detail-panel .suffix').html(obj.SUF_NM);
// 		$('#detail-panel .type').html(obj.TYPE);
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

	function validateMainten() {
		var check = true;
		var pre = $('#PRE_MAIN_CD').val().trim();
		var suf = $('#SUF_MAIN_CD').val().trim();
		var desc = $('#DESCRPT').val().trim();

		if (!$('#UP_MAIN_NM').val()) {
			check = false;
			$('#UP_MAIN_NM').inputWarning('Select parent maintenance code.');
		}
		if (pre == null || pre == '') {
			check = false;
			$('#PRE_MAIN_CD').inputWarning(
					'"PREFIX code" and "SUFFIX code" are required items.');

		}
		if (suf == null || suf == '') {
			$('#SUF_MAIN_CD').inputWarning(
					'"PREFIX code" and "SUFFIX code" are required items.');
			check = false;
		}
		if (!desc) {
			$('#DESCRPT').inputWarning('"Description" required item.');
			check = false;
		}

		return check;
	}

	function removeItemMain() {
		var code = $('#MAIN_CD').val();
		var lev = $('#LEV_MAIN_CD').val();
		var childCount = $('li[mainten_cd="'+code+'"] > ul.depth2 > li').length;
		if (childCount > 0) {
			alert("<spring:message code='sys.sys_0101.deleteWarning' />");
			return false;
		} else {
			if (confirm(_MESSAGE.common.deleteConfirm)) {
				$
						.ajax({
							url : CTX + '/sys/sys_0107/deleteMaintenCode.ajax',
							data : {
								LEV : lev,
								CODE : code
							},
							success : function(data) {
								//alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
								alert(_MESSAGE.common.deleteSuccess);
								getData();
								$('#detail-panel').hide();
								$('#update-panel').hide();
							},
							error : function(req, status, err) {
								//alert('<spring:message code='msg.somethingWrong' />');
								alert(_MESSAGE.common.deleteFail);
							}
						});
			}
		}
	}
 
	function preUpdate() {
		$('#detail-panel').hide();
		$('#update-panel').show();
	}

	function cancelUpdate() {
		$('#detail-panel').show();
		$('#update-panel').hide();
	}
	
	$(function() {
		// 		drawgrid_maint();  
		getData();
		$('.maintenance-form .registration-form-lst.registration-form-lst-bg div.wrap-scroll-area')
				.mCustomScrollbar({
					axis : "Y",
					theme : "minimal-dark",
					mouseWheelPixels : 300
				});

		$('#PRE_MAIN_CD , #SUF_MAIN_CD').keyup(function() {
			$('#PRE_MAIN_CD , #SUF_MAIN_CD').resetWarning();
		$('input[nova-validation="required"], textarea[nova-validation="required"]').keyup(function(){
			$(this).resetWarning();
		})
		})
	});
	//.system-detail-wrap .registration-form-lst.registration-form-lst-bg
	function importExel() {
		var type = "CODE";
		var url = CTX + '/sys/sys_0103/importExel/form.tab?CODE_TYPE=002&TYPE='
				+ type;
		var param = {};
		var success = function(html) {
		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
		//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.4) + ',height=' + (parseInt(window.innerHeight) * 0.4));	
	}
	

	$(function(){
	
		$('#select_type').change(function(){
			g_sort = $(this).val();
			getData();
			
		})
	})
	

// 		objs.sort( compare );

</script>


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
	      
	    </ul>
	  </div>
	  
     
      <!--//tit-wrap-->
      <!-- registration form -->
      <div class="maintenance-form registration-form registration-form1">
        <div class="registration-form-lst-wrap maintenance-write-form">
         <div class="registration-form-lst registration-form-lst-bg">
						<h3>Code list</h3>
						<div class="select-box" style="display: inline-grid; width: 30%; margin-left: 40px; background: #fff">
						<label for="select_type" class="mark">-- SORT --</label>
						<select id="select_type" name="search.TYPE" class="info-select">
							<option value="name"># Sort </option>
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
         				<input type="hidden" id="MAIN_CD" name="MAIN_CD">
<!--          				<input type="hidden" id="UP_CD" name="UP_CD"> -->
         				<input type="number" hidden id="LEV_MAIN_CD" name="LEV_MAIN_CD">
         				<input type="hidden" id="UP_MAIN_CD" name="UP_MAIN_CD">
         				
         			
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
									<a onclick="removeItemMain()" class="del-btn">
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
<!-- 						<li class="type-area"> -->
<!-- 							<span class="tit">Type</span> -->
<!-- 							<span class="txt type"></span> -->
<!-- 						</li> -->
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
									<label for="name" class="sr-only">Name</label> <input type="text" id="UP_MAIN_NM" name="" class="up_nm" value="" readonly></div>
							</div>
						</li>

						<li class="sub1"><span>Code<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="name" class="sr-only">Code</label> <input
										type="text" id="PRE_MAIN_CD"  nova-validation="required" name="PRE_MAIN_CD"  class="prefix" value="" placeholder="Prefix">
								</div>
								<div class="input-group">
									<label for="name" class="sr-only">Code</label> <input
										type="text" id="SUF_MAIN_CD"  nova-validation="required" class="suffix" name="SUF_MAIN_CD" value="" placeholder="Suffix code">
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
          
        </div>
      </div>
      <!-- //registration form -->
    </div>
<!--     <div class="system-right"> -->
<!--       <div class="btns"> -->
<%--       	<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}"> --%>
<%--              <a  class="btn-style btn-style1"><spring:message code='button.save' /></a> --%>
<%--       	</c:if> --%>
<%--         <a href="" class="btn-style btn-style2"><spring:message code='button.back' /></a> --%>

<!--       </div> -->
<!--     </div> -->
  </div>
  <!-- //유지보수 테이블 관리 -->
</div>
