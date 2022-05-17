<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">

<script type="text/javascript">
	function importExcel (){
		var typeCode = $("select.optionCode").val();
		var data = new FormData(document.querySelector("#importForm"));
		data.set("optionCode", typeCode);
		  $.ajax({
	            type: 'POST',
	            url: CTX+'/sys/sys_0103/importExcel.ajax',
	            data: data,
	            processData: false,
	            contentType: false,
	            cache: false,
	            timeout: 600000,			
	            beforeSend: function() {
// 					$('.sendLoading').show();
				},
	            success: function(data) {
	            	if(data == 'true'){
						alert('<spring:message code='message.saveSuccess' />');
		            	window.location.href = "";
	            	}else{
	            		alert('<spring:message code='message.saveFailed' />');
	            	}
// 	            	$('.sendLoading').hide();
	            },
	            error: function(xhr) {
// 	            	$('.sendLoading').hide();
	                alert(fu_message[WT_LOCALE].uploadFailed);
	                document.querySelector("#importForm").reset();  // reset form
	            }
	        });
			return false;
	}
	function downloadTemplate(){
		var typeCode = $("select.optionCode").val();
		window.location.href = CTX + '/sys/sys_0103/templateExcelFile.ajax?TYPE='+typeCode;
	}
	 function cancelCode(){
			var url = CTX+'/sys/sys_0105/list';
			$(location).attr('href',url); 
		 
	 }
	 var type = '${CODE_TYPE}';
	 
	 $(function(){
			$('#btnUpload1').on('click', function() {
				$('#importFile').trigger('click');
			}); 
			$('#typeCode').val(type).attr('disabled', true);
			
	 })
</script>


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
	    aaaaaaaaaaaaaaaaaaaaa
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
          <li class="bold"><spring:message code='sys.sys_0101.importEx' /></li>
	      
	    </ul>
	  </div>
	  
        
        <!--//tit-wrap-->
        <!-- registration form -->
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
            
               <li>
                <span><spring:message code='sys.sys_0101.list.title.type' /><span class="red"> *</span></span>
                <div class="registration-write  registration-write-select btn-input-wrap">
                  <div class="input-group-wrapper">
                  <div class="input-group">
                  <div class=" select-box">
						<label for="typeCode" ><spring:message code='sys.sys_0101.list.title.type' /></label>
								<select class="optionCode info-select" id="typeCode" name="optionCode">
										  <option value="001"><spring:message code='sys.sys_0101.list.Comm' /></option>
										  <option value="002"><spring:message code='sys.sys_0101.list.MaintenCd' /></option>
										  <option value="003"><spring:message code='sys.sys_0101.list.partCd' /></option>
										  <option value="004"><spring:message code='sys.sys_0101.list.title.alarmCode' /></option>
										</select>
					</div>
                 </div>
                 </div>
                  										 <button  class="btn_ico float_none registration-search-btn btxs_ico_search "  onclick="downloadTemplate()"><spring:message code='sys.sys_0101.template' /></button> 
                  
                </div>
              </li>
              <li>
                <span><spring:message code='sys.sys_0101.attach' /><span class="red"> *</span></span>
                
                <div class="registration-write btn-input-wrap fake-field-file-wrap">
	                <div class="input-group">
	                  <div class="fake-field-file"></div>
						<input type="file" class="field-file" name="importFile" id="importFile" style="display: none;" accept=".xlsx">
	                </div>
<!-- 	                <span id="btnUpload1" style="color: #4c4c4c; font-weight:300;cursor: pointer;">Upload photo</span> -->
	                
	                <label for="cv-arquivo" id="btnUpload1" aria-label="Attach file" class="registration-search-btn">
	                  <i class="xi-paperclip"></i>
	                </label>
	              </div>
	              
	              
<!--                 <div class="registration-write"> -->
<!--                   <div class="input-group"> -->
<%--                     <label for="importFile" class="sr-only"><spring:message code='sys.sys_0101.attach' /></label> --%>
<!-- 								<input type="file" style="width:20%;"  class="form-control-file" name="importFile" id="importFile" accept=".xlsx" /> -->
<!-- 					 </div> -->
<!--                 </div> -->
              </li>

            </ul>
            
          </div>
        </div>
        <!-- //registration form -->
        </form:form>
       	<div class="sendLoading">
			<div class="contentLoading">
				<img alt="" src="${pageContext.request.contextPath }/images/Loading_icon.gif">
			</div>
		</div>


      </div>
      <div class="system-right">
        <div class="btns">
			<a class="btn-style btn-style1" onclick="importExcel()"><spring:message code='button.save' /></a>
			<a class="btn-style btn-style2" onclick="cancelCode()"><spring:message code='button.back' /></a>
			
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
<%-- 						   <span id="btnDelete" class="btn bg_gray ico l7" onclick="cancelCode()"><spring:message code='sys.sys_0101.list.button.cancel' /></span> --%>
<%-- 							<button onclick="importExcel()" class="btn bg_orange ico g8" ><spring:message code='sys.sys_0101.list.button.confirm' /></button> --%>
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
<!-- 								<tr>  -->
<%-- 									<th><spring:message code='sys.sys_0101.list.title.type' /><span class="red"> *</span></th> --%>
<!-- 									<td> -->
<!-- 										<select class="optionCode" name="optionCode"> -->
<%-- 										  <option value="001"><spring:message code='sys.sys_0101.list.Comm' /></option> --%>
<%-- 										  <option value="002"><spring:message code='sys.sys_0101.list.MaintenCd' /></option> --%>
<%-- 										  <option value="003"><spring:message code='sys.sys_0101.list.partCd' /></option> --%>
<%-- 										  <option value="004"><spring:message code='sys.sys_0101.list.title.alarmCode' /></option> --%>
<!-- 										</select> -->
<%-- 										 <button  class="btn bg_orange ico g8"  onclick="downloadTemplate()"><spring:message code='sys.sys_0101.template' /></button>  --%>
<!-- 									</td> -->
<!-- 								</tr> -->
<!-- 								<tr> -->
<%-- 									<th class="" scope="row"><spring:message code='sys.sys_0101.attach' /><span class="red"> *</span></th> --%>
<!-- 									<td> -->
<!-- 										<input type="file" style="width:20%;"  class="form-control-file" name="importFile" id="importFile" accept=".xlsx" /> -->
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