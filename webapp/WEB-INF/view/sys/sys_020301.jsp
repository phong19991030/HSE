<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!-- 
	***********
	** 메뉴등록 Form 
	***********
-->
<script type="text/javascript">
// insert 후처리
function saveCallbackFunc(form, data){
	if(data == "true"){
		location.reload();
		closeDialogPopup(form);
		// 다이얼로그일 경우만 적용됨(팝업일 경우는 적용안됨 : list부분 레이아웃과 구별되기 때문)
		// 그리드 reload
		//$("#table_grid").jqGrid('setGridParam',{datatype:'json', page:1, postData:{}}).trigger("reloadGrid");
	}else{
		//alert("메뉴ID가 존재합니다.");
	}
} 
function submitForm(){
	$('#saveMenuForm').submit();
}
function deleteMenu(e){
	var url =CTX+'/sys/sys_0203/01/delete01.ajax';
	var data = {};
	data['MENU_ID'] = '${param.MENU_ID}';
	if(!data['MENU_ID']){
		return false
	}
	 if(confirm(_MESSAGE.common.deleteConfirm)){	
	$.ajax({
		url :url,// CTX+ url, )
		data : $.extend({
			'type' : 'dialog'
			,'cls' : ''
		}, data),
		cache : false,
		success : function(data, textStatus, jqXHR) {
			if(data == true || data == 'true'){
				alert('<spring:message code='message.deletedSuccess' />')
				window.location.href = '';
			}else if(data == 'hasChildren'){
				alert('<spring:message code='sys.sys_0203.list.hasChildren' />');
			}else{
				alert('<spring:message code='message.deletedFailed' />');

			}
		}
	});
	 }

}
$(function(){
	$('.info-select').each(function(){
		$(this).closest('div.select-box').find('label').text($(this).find('option:selected').html());
	})

	$('.info-select').change(function(){
		$(this).closest('div.select-box').find('label').text($(this).find('option:selected').html());
	});
})
</script>

<c:set var="LEV" value="${param.LEV}" />  
<c:set var="MENU_ID" value="${param.MENU_ID}" />  
<div class="container system-wrap system-wrap1">
   	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
					<c:choose>
						<c:when test="${MODE eq 'EDIT'}">
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.register"/></span>
						</c:otherwise>
					</c:choose>			      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>SYSTEM</li>
	      <li class="bold">MENU MANAGEMENT</li>
	    </ul>
	  </div>
     <!-- 메뉴 엑세스 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
	<form:form action="${formPath }/insert01.ajax" id="saveMenuForm" data-func="saveAjax" data-callback="saveCallbackFunc" >
	<div class="registration-form registration-form1">
		<div class="registration-form-lst-wrap">
		<input type="hidden" name="MODE" value="${MODE}" />
	
			<ul class="registration-form-lst">
              <li>
                <span><spring:message code="sys.sys_0203.list.label.menuid"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="MENU_ID" class="sr-only">Code</label>
					<input type="text" id="MENU_ID" name="MENU_ID" 
						value="${(DATA.MENU_ID != null) ? DATA.MENU_ID:''}" readonly="readonly">              </div>
                </div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0203.list.label.menunm"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="MENU_NM" class="sr-only"></label>
					<input type="text" id="MENU_NM" name="MENU_NM"  nova-validation="required"
						value="${DATA.MENU_NM}">
                  </div>
                </div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0203.list.label.menunmen"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="menuDescription" class="sr-only">Description</label>
					<input type="text" id="MENU_NM_ENG" name="MENU_NM_ENG"  nova-validation="required,onlyEng"
						value="${DATA.MENU_NM_ENG}">
                  </div>
                </div>
              </li>
              <li>
                <span>  <spring:message code="sys.sys_0203.list.label.topmenu"/>  <span class="red"> *</span> </span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="UP_MENU_ID" class="sr-only"></label>
					 <input type="text" id="UP_MENU_ID" name="UP_MENU_ID" 
						readonly="readonly" value="${DATA.MODE == 'EDIT' ? DATA.UP_MENU_ID : ((LEV > 0) ? MENU_ID:'M_ROOT')}">
					 
                  </div>
                </div>
              </li>
              <li>
                <span>  <spring:message code="sys.sys_0203.list.label.order"/>   </span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="ORD_NO" class="sr-only"></label>
					 <input type="text" id="ORD_NO" name="ORD_NO" 
						value="${(DATA.ORD_NO != null) ? DATA.ORD_NO:'1' }">
                  </div>
                </div>
              </li>
              <li>
                <span>  <spring:message code="sys.sys_0203.list.label.lev"/>   </span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="LEV" class="sr-only"></label>
					 <input type="text" id="LEV" name="LEV" 
						readonly="readonly" value="${DATA.MODE == 'EDIT' ? DATA.LEV : ((LEV > 0) ? (LEV+1):'1')}">
					 
                  </div>
                </div>
              </li>
            </ul>
            
            <ul class="registration-form-lst">
              <li>
                <span>  <spring:message code="sys.sys_0203.list.label.classification"/>   </span>
                <div class="registration-write registration-write-select">
                <div class="input-group-wrapper">
	                  <div class="select-box">
                    <label for="CLS_CD" ></label>
	                  <select id="CLS_CD" name="CLS_CD" class="info-select">
							<option value=""># Classification</option>
							<!-- 
							<option value="MIS">MIS</option>
							<option value="PMS">PMS</option> 
							<option value="MAN">MAIN</option>-->
							<option value="APV" <c:if test="${DATA.CLS_CD == 'APV'}" >selected="selected" </c:if> >Payment System</option>
							<option value="ADM" <c:if test="${DATA.CLS_CD == 'ADM'}" >selected="selected" </c:if> >Manager</option>							
							<option value="CUS" <c:if test="${DATA.CLS_CD == 'CUS'}" >selected="selected" </c:if> >General User</option>
						</select>	
	                  </div>
	                </div>
                
                </div>
              </li>
              <li>
                <span>Use</span>
                    <div class="registration-write registration-write-select">
               		 <div class="input-group-wrapper">
	                  <div class="select-box">
                    	<label for="USE_YN" ></label>
					 	<a2m:combo type="fixed" id="USE_YN" cls="YN_ENG" selected="${DATA.USE_YN}"/>
					</div>	 
                  </div>
                </div>
              </li>
              <li>
                <span>  <spring:message code="sys.sys_0203.list.label.url"/>   </span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="LINK_PATH" class="sr-only"></label>
					 	<input type="text" id="LINK_PATH" name="LINK_PATH"  value="${DATA.LINK_PATH}">
					 
                  </div>
                </div>
              </li>
              <li>
                <span> <spring:message code="sys.sys_0203.list.label.parameter"/>   </span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="PARAM" class="sr-only"></label>
					 	<input type="text" id="PARAM" name="PARAM"  value="${DATA.PARAM}">
                  </div>
                </div>
              </li>
              <li>
                <span>Description</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="RMK" class="sr-only"></label>
					 <textarea id="RMK" name="RMK" maxlength="4000" style="width: 100%; height: 100px; 
								resize:none;">${DATA.RMK}</textarea>
					 
                  </div>
                </div>
              </li>
            </ul>
		
	</div>
		</div>
	
				

	</form:form>
</div>
      <div class="system-right">
        <div class="btns">
        						<c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
        
			<a class="btn-style btn-style1" onclick="submitForm()"><spring:message
							code='button.save' /></a>
							</c:if>
			<c:if test="${MODE eq 'EDIT' && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
				<a class="btn-style btn-style3" onclick="deleteMenu()"><spring:message	code='button.delete' /></a>
			</c:if>
			<a class="btn-style btn-style2" href="">Cancel</a>
			
        </div>
      </div>
</div>
</div>