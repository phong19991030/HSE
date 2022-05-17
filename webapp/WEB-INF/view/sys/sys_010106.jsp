<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">

<div class="container system-wrap system-wrap1">
   
     <!-- 메뉴 엑세스 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
		<form:form id="importForm" action="" method="POST" enctype="multipart/form-data">
		<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}" />
		<input type="hidden" id="ROLEID" name="ROLEID" value="${DATA.ROLE_ID}" />
        <!--tit-wrap-->
        
                	  <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
            <li class="bold"><spring:message code='sys.sys_0101.importEx' /></li>
	      
	    </ul>
	  </div>
	  
        
        
        <input type="hidden" id="alarmCd" name="alarmCd">	
        <!--//tit-wrap-->
        <!-- registration form -->
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
               <li>
                <span><spring:message code='sys.sys_0101.attach' /><span class="red"> *</span></span>
                               
	              
	              
                <div class="registration-write btn-input-wrap fake-field-file-wrap">
	                <div class="input-group">
	                  <div class="fake-field-file"></div>
						<input type="file" class="field-file" name="importFile" id="importFile" style="display: none;" accept=".xlsx">
	                  </div>
<!-- 	                <span id="btnUpload1" style="color: #4c4c4c; font-weight:300;cursor: pointer;">Upload photo</span> -->
	                
	                <span for="cv-arquivo" id="btnUpload1" aria-label="Attach file" class="registration-search-btn">
	                  <i class="xi-paperclip"></i>
	                </span>
	              </div>
				
	              
	              
	              
	              
<!--                 <div class="registration-write"> -->
<!--                   <div class="input-group"> -->
<%--                     <label for="importFile" class="sr-only"><spring:message code='sys.sys_0101.attach' /></label> --%>
<!-- 								<input type="file" style="width:20%;"  class="form-control-file" name="importFile" id="importFile" accept=".xlsx" /> -->
<!-- 					 </div> -->
<!--                 </div> -->
              </li>
              <li>
              <button  class="btn_ico float_none  btn-style1" id="downloadTemplate"><spring:message code='sys.sys_0101.template' /></button>
              </li>
                   
              
            </ul>
            
          </div>
        </div>
        <!-- //registration form -->
        </form:form>



      </div>
      <div class="system-right">
        <div class="btns">
			<a class="btn-style btn-style1" onclick="importExcel()"><spring:message code='button.save' /></a>
			<a class="btn-style btn-style2" onclick="backToAlarmList()"><spring:message code='button.back' /></a>
			
        </div>
      </div>
    </div>

    <!-- //메뉴 엑세스 등록 -->
</div>

<!-- <div class="module_area"> -->
<%-- <span id="btnDelete" class="basic_btn bg_gray ico l7" onclick="cancelCode()"><spring:message code='sys.sys_0101.list.button.cancel' /></span> --%>
<!-- <div class="full_fr"> -->
<!-- 	<div class="group"> -->
<%-- 		<form:form id="importForm" action="" method="POST" enctype="multipart/form-data"> --%>
<!-- 					<div class="group_title"> -->
<%-- 						<strong class="g_title"><spring:message code='sys.sys_0101.importEx' /></strong> --%>
<!-- 						<div class="g_title_btn"> -->
<%-- <%-- 							<span id="btnDelete" class="btn bg_gray ico l7" onclick="cancelCode()"><spring:message code='sys.sys_0101.list.button.cancel' /></span> --%>
<%-- 							<button onclick="importExcel()" class="btn bg_orange ico g8" ><spring:message code='sys.sys_0101.list.button.confirm' /></button> --%> --%>
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="group_content"> -->
<!-- 						<table id="codeInfo" class="write_tbl"  style="width: 100%;" summary="코드정보"> -->
<%-- 							<caption><spring:message code='sys.sys_0101.list.title.information' /></caption> --%>
<!-- 							<colgroup> -->
<!-- 								<col width="20%"> -->
<!-- 								<col width="80%"> -->
<!-- 							</colgroup> -->
<!-- 							<tbody>				 -->
<!-- 								<tr> -->
<%-- 									<th class="" scope="row"><spring:message code='sys.sys_0101.attach' /><span class="red"> *</span></th> --%>
<!-- 									<td> -->
<!-- 										<input type="file" style="width:20%;" class="form-control-file" name="importFile" id="importFile" accept=".xlsx" /> -->
<%-- 										<button onclick="downloadTemplate()" class="btn bg_orange ico g8" ><spring:message code='sys.sys_0101.template' /></button> --%>
<!-- 										<input type="hidden" id="alarmCd" name="alarmCd">	 -->
<!-- 									</td> -->
<!-- 								</tr> -->
<!-- 							</tbody>  -->
<!-- 						</table> -->
<%-- 						<span class="basic_btn sbtn ac_click" style="margin-left: 45%;" onclick="importExcel()"><spring:message code='button.save' /></span> --%>
<!-- 					</div> -->
<%-- 			</form:form> --%>
<!-- 	</div> -->
<!-- 	<div class="sendLoading"> -->
<!-- 	<div class="contentLoading"> -->
<%-- 		<img alt="" src="${pageContext.request.contextPath }/images/Loading_icon.gif"> --%>
<!-- 	</div> -->
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->
<script type="text/javascript">
$(function(){
	$('#btnUpload1').on('click', function() {
		$('#importFile').trigger('click');
	});
	
	$('#downloadTemplate').click(function(){
		downloadTemplate();
	})
})


function backToAlarmList(){
	window.location.href = "";
}

var alarmCd = '${WT_ALARM_GR_ID}';
$('#alarmCd').val(alarmCd);
	function importExcel (){
		if(!$('#importFile').val() || $('#importFile')[0].files.length<= 0){
			alert('Some informations are required.')
			$('#importFile').inputWarning('"Attachments" is required item.');
			return false;
		}
		var typeCode = $("select.optionCode").val();
		var data = new FormData(document.querySelector("#importForm"));
		  $.ajax({
	            type: 'POST',
	            url: CTX+'/sys/sys_0103/importAlarmDetail.ajax',
	            data: data,
	            processData: false,
	            contentType: false,
	            cache: false,
	            //timeout 2 min
	            timeout: 120000,			
	            beforeSend: function() {
	            	$('#loader').css("display",'block');
				},
	            success: function(data) {
	            	$('#loader').css("display",'none');
	            	if(data && data.result == 'true'){
						alert(data.msg);
// 	            		("#importForm input").reset();
	            		window.location.href=  '';
	            	}else if(data && data.result == 'false' && data.msg){
	            		alert(data.msg);
	            	}else{
						alert('<spring:message code='message.saveFailed' />');
	            	}

	            },
	            error: function(xhr) {
	            	$('#loader').css("display",'none');
	                alert('<spring:message code='message.saveFailed' />');
	                document.querySelector("#importForm").reset();  // reset form
	            }
	        });
			return false;
	}
	
	function downloadTemplate(){
		var typeCode = "DETAIL";
		window.location.href = CTX + '/sys/sys_0103/templateExcelFile.ajax?TYPE='+typeCode;
	}	
</script>

    <div id="loader" style="display: none" class="lds-dual-ring  overlay"></div>
