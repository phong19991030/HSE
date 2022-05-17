<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<script type="text/javascript">


var isValidId = true;

 function duplCheckIDAjax() {
    $.ajax({
        url: CTX + "/sys/sys_0204/duplCheckID.ajax",
        type: 'post',
        data: $('#userForm').serialize(),
        cache: false,
        success: function(data, textStatus, jqXHR) {
				if(data == "dupl") {
                //$('#cmt_dupl em').html("이미 사용중입니다.");
                //alert("Duplicate ID")
 				$('#ROLE_ID').inputWarning('Role code already have existed.');
                isValidId = false;
            }
				else{
					 $('#ROLE_ID').available();

					isValidId = true;
				}
        },complete: function(){
            return true;
        },error : function(e){
            console(e);
            alert('<spring:message code="sys.sys_0101.list.alert.doubles"/>');
            return false;
        }
    });
   
} 
 function duplCheckID() {    
	 var val = $('#ROLE_ID').val();
	 if(!val){
		 $('#ROLE_ID').resetWarning();
		 return false;
	 }
	    var result = duplCheckIDAjax();	    	
	   	return result;
	}
function submitForm(){
	if (!$('#userForm').validationEngine('immediate'))
		return false;
	if(isValidId){	
		var param = {};
		
		param["CRUD"] = $('#CRUD').val();
		param["ROLE_ID"] = $('#ROLE_ID').val();
		param["ROLEID"] = $('#ROLE_ID').val();
		param["ROLE_NM"] = $('#ROLE_NM').val();
		param["RMK"] = $('#RMK').val();
		var check = true;
		var msg = rules['required'].msg[lang];

		if(!param["ROLE_ID"]){
// 			 $('#ROLE_ID').inputWarning(rules['required'].msg[lang]);
				var name = 'Code';
					var msg1 = msg.replace('###', '"'+name+'"')
				 $('#ROLE_ID').inputWarning(msg1);
			 check = false;
		}
		if(!param["ROLE_NM"]){
// 			 $('#ROLE_NM').inputWarning(rules['required'].msg[lang]);
				var name = 'Permission';
				var	msg2 = msg.replace('###', '"'+name+'"')
				 $('#ROLE_NM').inputWarning(msg2);
			 check = false;
		}
		if(!param["RMK"]){
//			 $('#ROLE_NM').inputWarning(rules['required'].msg[lang]);
				var name = 'Description';
				var	msg3 = msg.replace('###', '"'+name+'"')
				 $('#RMK').inputWarning(msg3);
			 check = false;
		}
		if(!check){
			return false;
		}
		
		var url = CTX + '/sys/sys_0204/saveRoleMgt.ajax';
		$.ajax({
			url: url,
			type: 'POST',
			data: param,
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if(data){
					alert('<spring:message code='message.updateSuccess' />');
					$(location).attr('href', CTX + '/sys/sys_0204/list');
				}else{
					alert('<spring:message code='message.updateFailed' />');

				}
			}
		});
	}
	else{
		 alert('<spring:message code='sys.sys_0204.alert.exist' />');
		 return false;
	}
	
}

function deleteForm(){
	 var selectedItem = document.getElementById("ROLE_ID").value ;
	 var message = {"ROLE_ID": selectedItem};
	 //debugger;
	 if(confirm('<spring:message code='message.confirmDelete' />')){	
		 
		 $.ajax({
 	        url:  CTX + "/sys/sys_0204/checkInuse.ajax",
 	        type: "post",
 	        data: message,

 	        success: function (data) {
 	        	if(data == 'notuse'){
 	        	   $.ajax({
 	      	        url:  CTX + "/sys/sys_0204/delete01.ajax",
 	      	        type: "post",
 	      	        data: message,

 	      	        success: function (data) {
 	      	        	if(data == 'true'){
 	      	        		//$(obj).parents('form').submit();
 	      	        		alert("<spring:message code="message.deletedSuccess"/>");
 	      	        		$(location).attr('href', CTX + '/sys/sys_0204/list');
 	      	        	}
 	      	        	else{
 	      	        		alert("<spring:message code="message.deletedFailed"/>");
 	      	        	}
 	      	       
 	      	        },
 	      	        error: function(jqXHR, textStatus, errorThrown) {     	        	
 	      	           console.log(textStatus, errorThrown);
 	      	        }
 	      	    }); 
 	        	}else if(data == 'inuse'){
 	        		 if(confirm('This permission is inuse. Are you sure you want to delete it?')){	
 	        			 $.ajax({
 	     	      	        url:  CTX + "/sys/sys_0204/delete01.ajax",
 	     	      	        type: "post",
 	     	      	        data: message,

 	     	      	        success: function (data) {
 	     	      	        	if(data == 'true'){
 	     	      	        		//$(obj).parents('form').submit();
 	     	      	        		alert("<spring:message code="message.deletedSuccess"/>\nPlease update users which is missing role.");
 	     	      	        		$(location).attr('href', CTX + '/sys/sys_0204/list');
 	     	      	        	}
 	     	      	        	else{
 	     	      	        		alert("<spring:message code="message.deletedFailed"/>");
 	     	      	        	}
 	     	      	        },
 	     	      	        error: function(jqXHR, textStatus, errorThrown) {     	        	
 	     	      	           console.log(textStatus, errorThrown);
 	     	      	        }
 	     	      	    }); 
 	        		 }
 	        	  
 	        	}else{
    	        		alert("Can not check permission rightnow.");
 	        	}
 	       
 	        },
 	        error: function(jqXHR, textStatus, errorThrown) {     	        	
 	           console.log(textStatus, errorThrown);
 	        }
 	    }); 
		 
		}
}


$(document).ready(function(){
	
	 var id = document.getElementById("ROLE_ID").value;
		if (id != '') {
		document.getElementById("ROLE_ID").setAttribute('readonly', true); ;
		
	}
 
}); 

function backToList(){
	window.location.reload();
}

</script>	
    
<div class="container system-wrap system-wrap1">
   
     <!-- 메뉴 엑세스 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
      <form:form name="noticeForm" id="userForm" >
		<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}" />
		<input type="hidden" id="ROLEID" name="ROLEID" value="${DATA.ROLE_ID}" />
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
<c:choose>
						<c:when  test="${DATA.CRUD eq 'C'}">
							<span class="txt"><spring:message code="button.register"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:otherwise>
					</c:choose>		            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>SYSTEM</li>
            <li class="bold">Menu access Management</li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
              <li>
                <span><spring:message code="sys.sys_0204.list.label.code"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="menuAccessCode" class="sr-only">Code</label>
								<input type="text" id="ROLE_ID" name="ROLE_ID"  nova-validation="required" maxlength="20"
									value="${DATA.ROLE_ID}"   onkeyup="duplCheckID()"  />                  </div>
                </div>
              </li>
              <li>
                <span>Permission<span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="menuPermission" class="sr-only">Permission</label>
								<input type="text" id="ROLE_NM" name="ROLE_NM"  nova-validation="required" maxlength="100" value="${DATA.ROLE_NM}"   />
                  </div>
                </div>
              </li>
            </ul>
            <ul class="registration-form-lst">
              <li>
                <span><spring:message code="sys.sys_0204.list.label.des"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="menuDescription" class="sr-only">Description</label>
					<input type="text" id="RMK" name="RMK" value="${DATA.RMK}" class="validate[maxSize[4000]]"    />						
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- //registration form -->
        </form:form>
      </div>
		<div class="system-right">
			<div class="btns">
				<c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
					<a class="btn-style btn-style1" onclick="submitForm()"><spring:message code='button.save' /></a>
				</c:if>
				<c:if test="${not(DATA.CRUD eq 'C') && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
					<a class="btn-style btn-style3" onclick="deleteForm()"><spring:message	code='button.delete' /></a>
				</c:if>
				<a class="btn-style btn-style2" onclick="backToList()"><spring:message code='button.back' /></a>
			</div>
		</div>
	</div>

    <!-- //메뉴 엑세스 등록 -->
</div>