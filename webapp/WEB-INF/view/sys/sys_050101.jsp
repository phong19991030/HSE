<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<%@ include file="/WEB-INF/_include/taglib.jsp" %>


<script>

var isValidId = true;
var msgConfirmDelete = '<spring:message code='message.confirmDelete' />';
var deleteSuccess = '<spring:message code='message.deletedSuccess' />';
var deleteFailed = '<spring:message code='message.deletedFailed' />';
var crud = '';
var checkDuplName = 'unset';

function doDelete() {
    
    var data = $('#compForm').serialize();
    if(confirm(msgConfirmDelete)) {
        $.ajax({
            url: CTX + "/sys/sys_0501/delete01.ajax",
            type: 'post',
            data: data,
            cache: false,
            success: function(data, textStatus, jqXHR) {
//             	console.log(data);
                if(data && data.result == "true"){
                	alert(deleteSuccess);
                    backToList();
                }else if(data && data.result == "false" && data.msg){
                	alert(data.msg);
                }else{
                	alert(deleteFailed);
                }
//                 saveCallbackFunc(); 
            },complete: function(){
                return true;
            },error : function(){
                alert('<spring:message code='msg.somethingWrong' />');
                return false;
            }
        });
    }
    
}

function doUpdate(){
	if(isValidId) {
		$("#compForm").submit();
	}else {
		alert("<spring:message code="sys.sys_0204.alert.exist"/>");
	}
	 
	 return false;
}

function downloadFile(){
	var url = CTX + '/util/upload/imageView/'+'${DATA.NEW_FLE_NM}';
	 var win = window.open(url, '_blank');
	  win.focus();
}

function submitForm(obj){
	if(isValidId) {
		$(obj).parents('form').submit();
	}else {
		alert("<spring:message code="sys.sys_0204.alert.exist"/>");
	}
	 
	 return false;

}

function doubleCheck(){
	var comName = $('input[name="form.COMPANY_NM"]').val().trim();
	var comNameOld = $('input[name="form.COMPANY_NM_OLD"]').val();
	if(comName==null||comName==''){
    	$('#COMPANY_NM').resetWarning();
    	checkDuplName = 'unset';
		return false;
	}else{
		$.ajax({
			  url: CTX+'/sys/sys_0501/checkDoubleName.ajax?COMPANY_NM='+comName + '&CRUD='+crud + '&COMPANY_NM_OLD='+ comNameOld,
			  type: 'GET',
			  success: function(data) {
				    if(data == "true"){
				    	$('input[name="form.COMPANY_NM"]').available();
				    	checkDuplName = true;
				    }else{
				    	$('input[name="form.COMPANY_NM"]').inputWarning('This organization name already have existed!');
				    	checkDuplName = false;
				    }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});		
	}
	
}
	
$(document).ready(function(){
	
	
// 	var logoPath = '${LOGO_PATH}'.replace('\\', '\\\\'); 
	
// 	 if (logoPath) {
// 		 $('#profile-img-tag').attr('src', getImageUrl(logoPath)).show();
// 	} 
	
	$('input[name="form.COMPANY_NM"]').change(function(){
		doubleCheck();
	});
	
	$('#orgClassification').change(function(){
		$(this).resetWarning();
	})
	
	function readURL(input) {
       
		if (input.files && input.files[0]) {
           var reader = new FileReader();
           
           reader.onload = function (e) {
               $('#profile-img-tag').attr('src', e.target.result);
           }
           reader.readAsDataURL(input.files[0]);
       }
   }
   $("#file").change(function(){
       readURL(this);
   });
   
	var id= '${DATA.COMPANY_ID}';
	
	if (id != '') {
		crud == 'U';
		$('#compForm input[name="form.CRUD"]').val("U");
		$('#compForm .fake-field-file').val('${DATA.FLE_NM}');
		$('#compForm input[name="form.COMPANY_ID"]').val('${DATA.COMPANY_ID}');
		$('#compForm input[name="form.COMPANY_NM_OLD"]').val('${DATA.COMPANY_NM}');
		$('#compForm select[name="form.CLS"]').val('${DATA.CLS}').trigger('change');
		$('#compForm input[name="form.COMPANY_NM"]').val('${DATA.COMPANY_NM}');  
		$('#compForm input[name="form.COMPANY_ADR"]').val('${DATA.COMPANY_ADR}');  
		$('#compForm textarea[name="form.DESCRPT"]').val('${DATA.DESCRPT}');  
	}
	else {
		crud == 'C';
		$('#compForm input[name="form.CRUD"]').val("C");
		$('#deletebtn').remove();
	}
	
	$('#btnUpload').on('click', function() {
		$('#file').trigger('click');
	});
	
	$('#btnUpload1').on('click', function() {
		$('#file').trigger('click');
	});
}); 

function getImageUrl(file) {
	
	var path = file.path ? file.path : file;
// 	console.log(path);
	var splitChar = '\\';
	if (path.indexOf('\\') > -1)
		splitChar = '\\';
	else if (path.indexOf('/') > -1) {
		splitChar = '/';
	}
	
	var arr = path.split(splitChar);
	const fileName = arr[arr.length - 1].split('.')[0];
	const extension = arr[arr.length - 1].split('.')[1];
	const dir = arr[arr.length - 2];
	
	return CTX + '/util/upload/imageView/' + dir + '/' + fileName + '.' + extension;
}

function callsave(form, callback, c) {
	var files = document.querySelector('input[name="file"]');
	const url = $(form).attr('action');
	if (files.files.length) {
		var formData = new FormData();
		var arr = $(form).serializeArray();
		$.each(arr, function(index, obj){
		   
		    formData.append(obj.name, obj.value);
		});
		
		formData.append('file', files.files.length ? files.files[0] : null);
		
		$.ajax({
			type: 'POST',
			url: url,
			data: formData,
			dataType: 'json',
			processData: false,
		    contentType: false,
			cache: false,
			success: function(data) {
// 				console.log(data);
				if (data.status) {
					alert('<spring:message code="message.saveSuccess"/>');
					//if (callback) eval(callback + '()');
					$(location).attr('href', CTX + '/sys/sys_0501/list');
				} else {
					if(data.message){
						alert(data.message);
					}else{
						alert('<spring:message code='message.saveFailed' />');						
					}				}
			},
			error: function(xhr, textStatus, errors) {
				
			}
		});
	} else {
		var datas = {};
		var arr = $(form).serializeArray();
		$.each(arr, function(index, obj){
		   
		    datas[obj.name] = obj.value;
		});
		
		$.ajax({
			type: 'POST',
			url: url,
			data: datas,
			dataType: 'json',
			cache: false,
			success: function(data) {
// 				console.log(data);
				if (data.status) {
					alert('<spring:message code="message.saveSuccess"/>');
					//if (callback) eval(callback + '()');
					$(location).attr('href', CTX + '/sys/sys_0501/list');
				} else {
					if(data.message){
						alert(data.message);
					}else{
						alert('<spring:message code='message.saveFailed' />');						
					}
				}
			},
			error: function(xhr, textStatus, errors) {
				console.log(xhr);
				console.log(textStatus);
				console.log(errors);
			}
		});
	}
	
	return false;
}
 


function saveCallbackFunc(form, data){
	(location).attr('href', CTX + '/sys/sys_0501/list');
} 

function backToList(){
	window.location.reload();
}
 
</script>


	<div class="container system-wrap system-wrap1">

 <!-- 조직 등록 -->
	  <div class="system-detail-wrap">
	    <div class="system-left">
	    
	    	<form:form action="${formPath}/save01.ajax" id="compForm" data-func="callsave" data-callback="saveCallbackFunc">
	    <input type="hidden" id="form.CRUD" name="form.CRUD" value="${CRUD}">
							<input type="hidden" id="form.COMPANY_ID" name="form.COMPANY_ID" value="">
	      <!--tit-wrap-->
	      <div class="tit-wrap">
	        <h2 class="heading3">
					<c:choose>
						<c:when  test="${DATA.COMPANY_ID == null || DATA.COMPANY_ID == ''}">
							<span class="txt"><spring:message code="button.register"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:otherwise>
					</c:choose>			          <!-- <span class="version">V47</span> -->
	        </h2>
	        <ul class="location">
	          <li>SYSTEM</li>
	          <li class="bold"><spring:message code="title.user.org"/></li>
	        </ul>
	      </div>
	      <!--//tit-wrap-->
	      <!-- registration form -->
	      <div class="registration-form registration-form1">
	        <div class="registration-form-lst-wrap">
	          <ul class="registration-form-lst">
	            <li>
	              <span><spring:message code="sys.sys_0201.list.label.companyname"/><span class="red"> *</span></span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="orgOrganization" class="sr-only">Organization</label>
						<input type="text" id="form.COMPANY_NM" nova-validation="required" name="form.COMPANY_NM"
									value="" /> 
						<input type="text"  name="form.COMPANY_NM_OLD" hidden
									value="" /> 
			                </div>
	              </div>
	            </li>
	            <li>
	              <span><spring:message code='sys.sys_0501.class' /><span class="red"> *</span></span>
	              
	              <div class="registration-write  registration-write-select">
	                <div class="input-group input-group-wrapper">
	                <div class="select-box">
	                    <label for="orgClassification"  >Classification</label>
	                    <select   id="orgClassification"   val="${DATA.GROUP_ID}"  name="form.CLS" nova-validation="required"  class="info-select">
	                      <option value="">-- <spring:message code='sys.sys_0501.class' /> --</option>
 						<option value="1"><spring:message code="sys.sys_0501.class.operator"/></option>
		                  <option value="2"><spring:message code="sys.sys_0501.class.manufacture"/></option>
		                  <option value="3"><spring:message code="sys.sys_0501.class.isp"/></option>
		                  <option value="4"><spring:message code="sys.sys_0501.class.wfConsulting"/></option>
	                    </select>
	                  </div>
	                  </div>
	                </div>
	              
	            
	            </li>
	          </ul>
	
	          <ul class="registration-form-lst">
	            <li>
	              <span><spring:message code="sys.sys_0201.list.label.companyaddress"/></span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="orgAddress" class="sr-only">Address</label>
								<input type="text" id="form.COMPANY_ADR"  name="form.COMPANY_ADR"
									 value="" />
	                </div>
	              </div>
	            </li>
	            <li>
	              <span>Logo</span>
	              <div class="registration-write btn-input-wrap fake-field-file-wrap">
	                <div class="input-group">
	                  <div class="fake-field-file">${DATA.FLE_NM}</div>
						<input type="file" class="field-file" id="file" name="file" style="display: none;" accept=".jpg,.jpeg,.png"/>
	                <c:if test="${DATA.FLE_NM != null && DATA.FLE_NM != ''}">
                     <a target="_blank" onclick="downloadFile()" file-name="${DATA.NEW_FLE_NM}" class="file-download-btn">
                     	<span class="sr-only">Open</span>
                     	<i class="xi-external-link"></i>
                     </a>
	              </c:if>
	                </div>
<!-- 	                <span id="btnUpload1" style="color: #4c4c4c; font-weight:300;cursor: pointer;">Upload photo</span> -->
	                
	                <label for="cv-arquivo" id="btnUpload1" aria-label="Attach file" class="registration-search-btn">
	                  <i class="xi-paperclip"></i>
	                </label>
	              </div>
	            </li>
	            <li class="note">
	              <span><spring:message code="sys.sys_0501.list.label.description"/></span>
	              <div class="registration-write">
	              					                              <div class="input-group input-group-wrap">
	              
	                <label for="orgNote" class="sr-only">Note</label>
					<textarea  id="form.DESCRPT" name="form.DESCRPT" val="${DATA.DESCRPT}"  maxlength="200"></textarea> 				
					</div>			
	              </div>
	            </li>
	          </ul>
	
	        </div>
	      </div>
	      </form:form>
	      <!-- //registration form -->
	    </div>
	    <div class="system-right">
			<div class="btns">
				<c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
	      			<a class="btn-style btn-style1" onclick="doUpdate()"><spring:message code='button.save' /></a>
				</c:if>
				<c:if test="${not(DATA.COMPANY_ID == null || DATA.COMPANY_ID == '') && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
					<a class="btn-style btn-style3" id="deletebtn" onclick="doDelete()"><spring:message	code='button.delete' /></a>
				</c:if>
				<a class="btn-style btn-style2" onclick="backToList()"><spring:message code='button.back' /></a>
	      </div>
	    </div>
	  </div>
	  
	  
	  </div>
	