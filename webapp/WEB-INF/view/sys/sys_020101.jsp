<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript" src="${ctxPath}/script/js/rsa.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/rng.js"></script>


<script>

var isValidId = true;

function doDelete() {
	if($('#userForm input[name="form.USER_ID"]').val() == 'admin'){
		 alert('Can not delete Administrator user.');
		return false;
	}
    var data = $('#userForm').serialize();
    if(confirm('<spring:message code='message.confirmDelete' />')) {
        $.ajax({
            url: CTX + "/sys/sys_0201/delete01.ajax",
            type: 'post',
            data: data,
            cache: false,
            success: function(data, textStatus, jqXHR) {
                if(data == "deleteY"){
                    alert('<spring:message code='message.deletedSuccess' />');
                }else{
                    alert('<spring:message code='message.deletedFailed' />');

                }
                saveCallbackFunc(); 
            },complete: function(){
                return true;
            },error : function(){
                alert('<spring:message code='message.deletedFailed' />');
                return false;
            }
        });
    }
  
}


function duplCheckID() {
    
    var result = duplCheckIDAjax();
    	
   
    return result;
}

function duplCheckIDAjax() {
	var msgDupl = 'This "User ID" already exists!';
    $.ajax({
        url: CTX + "/sys/sys_0201/duplCheckID.ajax",
        type: 'post',
        data: $('#userForm').serialize(),
        cache: false,
        success: function(data, textStatus, jqXHR) {
            if(data == "uniq"){
                if ($('#form\\.CRUD').val() == 'U') {
                    $('input[name="form.USER_ID"]').available();

//                 	alert("사용가능: 사용자ID 변경");
                   isValidId = true;
                } else if ($('#form\\.CRUD').val() == 'C'){
//                     alert("<span style='color: green;'>사용가능: 새 사용자 등록</span>"); 
                    isValidId = true;
                    $('input[name="form.USER_ID"]').available();

                }
            }	else if (data == "dupl") {
//             	alert("이미 사용중입니다.");
                isValidId = false;
                $('input[name="form.USER_ID"]').inputWarning(msgDupl)

        //        document.getElementById('btn_sub').disabled = true;
            }
            
        },complete: function(){
            return true;
        },error : function(e){
            console(e);
            alert('Error');
            return false;
        }
    });
}


function submitForm(){
	
	if (isValidId) {
			

			$('#userForm').submit();
		} else {
			alert('This "User ID" already exists!');
		}

		return false;

	}

	$(document)
			.ready(
					function() {

						var logoPath = '${LOGO_PATH}'.replace('\\', '\\\\');

						if (logoPath) {
							$('#profile-img-tag').attr('src',
									getImageUrl(logoPath)).show();
						}

						function readURL(input) {

							if (input.files && input.files[0]) {
								var reader = new FileReader();

								reader.onload = function(e) {
									$('#profile-img-tag').attr('src',
											e.target.result);
								}
								reader.readAsDataURL(input.files[0]);
							}
						}
						$("#file").change(function() {
							readURL(this);
						});

						$('#userForm input[name="form.COMP_NM"]').attr(
								'readonly', true);
						$('#ROLE_ID').attr('readonly', true);
						$('#ROLE_NM').attr('readonly', true);

						$('#GERATOR_ID').attr('readonly', true);
						$('#GERATOR_NM').attr('readonly', true);

						$(document).on(
								'change',
								'input[name=ROLE_ID]',
								function() {
									var $selector = $(document).find(
											'span[data-id="ROLE_ID"]');
									if ($selector) {
										$selector.data('defaultvalue', $(this)
												.val());
									}

								});

						$(document).on(
								'change',
								'input[name=GERATOR_ID]',
								function() {
									var $selector = $(document).find(
											'span[data-id="GERATOR_ID"]');
									if ($selector) {
										$selector.data('defaultvalue', $(this)
												.val());
									}

								});

						var id = '${DATA.USER_ID}';
						if (id != '') {
							$('#userForm input[name="form.USER_ID"]').attr(
									'readonly', true);
							$('#cmt_dupl').html('Do not change ID').css(
									'color', 'red');
							$('#userForm input[name="form.COMP_NM"]').val(
									'${COMP_NM}').trigger('change');
							$('#userForm input[name="form.COMP"]').val(
									'${DATA.COMP}').trigger('change');
							$('#userForm input[name="ROLE_ID"]').val(
									'${ROLE_ID}').trigger('change');
							$('#userForm input[name="ROLE_NM"]').val(
									'${ROLE_NM}').trigger('change');
							$('#userForm input[name="GERATOR_ID"]').val(
									'${GERATOR_ID}').trigger('change');
							$('#userForm input[name="GERATOR_NM"]').val(
									'${GERATOR_NM}').trigger('change');
							$('#userForm input[name="form.CRUD"]').val("U")
									.trigger('change');
							//$('#userForm input[name="form.inputPWD"]').placeholder = "********";
							document.getElementById("form.inputPWD").placeholder = "********";
							document.getElementById("form.confirmPWD").placeholder = "********";
						} else {
							$('#userForm input[name="form.CRUD"]').val("C");
							$('#deletebtn').remove();
						}
						getCompany();
						$('#userForm input[name="form.inputPWD"]').change(function(){
							var pass = $(this).val();
							if(rules['password'].func(pass)){
								$(this).available();
							}else{
								$(this).inputWarning(rules['password'].msg['en']);
							}
						});
						$('#userForm input[name="form.inputPWD"], #userForm input[name="form.confirmPWD"]').on('keyup', function() {
											if ($('#userForm input[name="form.inputPWD"]').val().length > 7 && $('#userForm input[name="form.inputPWD"]').val() == $('#userForm input[name="form.confirmPWD"]')
													.val()) {
												$('#message').html('Matching')
														.css('color', 'green');

											} else
												$('#message').html(
														'Not Matching').css(
														'color', 'red');

										});
						$('#btnUpload').on('click', function() {
							$('#file').trigger('click');
						});

						$('#btnUpload1').on('click', function() {
							$('#file').trigger('click');
						});

					});

	function getImageUrl(file) {

		var path = file.path ? file.path : file;
// 		console.log(path);
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

		return CTX + '/util/upload/imageView/' + dir + '/' + fileName + '.'
				+ extension;
	}

	function getCompany() {

		$.ajax({
			url : CTX + '/sys/sys_0301/getCompany.ajax',
			data : {},
			success : function(response) {
// 				console.log(response);
				var str = '';
				$.each(response, function(index, obj) {
					str += '<option value="'+obj.COMPANY_NM+'">'
							+ obj.COMPANY_NM + '</option>'
				});

				/* $("#COMPANY_NM").append(str); */
				$('#userForm select[name="form.COMP"]').append(str);

			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}

	function saveCallbackFunc(form, data) {
		$(location).attr('href', CTX + '/sys/sys_0201/list');
	}

	function callsave(form, callback, c) {
		var files = document.querySelector('input[name="file"]');
		const url = $(form).attr('action');
		if (files && files.files && files.files.length) {
			var formData = new FormData();
			var arr = $(form).serializeArray();
			$.each(arr, function(index, obj) {

				formData.append(obj.name, obj.value);
			});

			formData.append('file', files.files.length ? files.files[0] : null);

			$.ajax({
				type : 'POST',
				url : url,
				data : formData,
				dataType : 'json',
				processData : false,
				contentType : false,
				cache : false,
				success : function(data) {
// 					console.log(data);
					if (data.status) {
						alert('<spring:message code="message.saveSuccess"/>');
						//if (callback) eval(callback + '()');
						$(location).attr('href', CTX + '/sys/sys_0201/list');
					} else {
						alert('<spring:message code='message.saveFailed' />');
					}
				},
				error : function(xhr, textStatus, errors) {

				}
			});
		} else {
			var datas = {};
			var arr = $(form).serializeArray();
			$.each(arr, function(index, obj) {

				datas[obj.name] = obj.value;
			});

			$.ajax({
				type : 'POST',
				url : url,
				data : datas,
				dataType : 'json',
				cache : false,
				success : function(data) {
// 					console.log(data);
					if (data.status) {
						alert('<spring:message code="message.saveSuccess"/>');
						//if (callback) eval(callback + '()');
						$(location).attr('href', CTX + '/sys/sys_0201/list');
					} else {
						alert('<spring:message code='message.saveFailed' />');
					}
				},
				error : function(xhr, textStatus, errors) {
					console.log(xhr);
					console.log(textStatus);
					console.log(errors);
				}
			});
		}

		return false;
	}
	
    $(document).on('change', 'input[name=GERATOR_ID]', function() {
 		var $selector = $(document).find('span[data-id="GERATOR_ID"]');
		if ($selector) {
			$selector.data('defaultvalue', $(this).val());
		}
		
	});

	function backToList() {
		window.location.reload();
	}
	
	function checkConfirmPassword(){
		var $pass = $('input[name="form.inputPWD"]');
		var $cf = $('input[name="form.confirmPWD"]');
		if( $pass.val() != $cf.val()){
			$cf.inputWarning('Not match!')
		}else{
			$cf.available();
		}
	}
</script>
    
<div class="container system-wrap system-wrap1">
    
 <!-- 발전기 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
		<form:form action="${formPath}/save01.ajax" id="userForm" data-func="callsave" data-callback="saveCallbackFunc" enctype="multipart/form-data">
		<input type="hidden" id="form.DUPL_ID" name="form.DUPL_ID" value="">
		<input type="hidden" id="form.CRUD" name="form.CRUD" value="${crud}">
		<input type="hidden" id="form.USER_UID" name="form.USER_UID" value="${USER_UID}">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
					<c:choose>
						<c:when  test="${DATA.USER_ID == null || DATA.USER_ID == ''}">
							<span class="txt"><spring:message code="button.register"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:otherwise>
					</c:choose>		            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>SYSTEM</li>
            <li class="bold"><spring:message code="sys.sys_0201.list.label.titleuser"/></li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
              <li>
                <span><spring:message code="sys.sys_0201.list.label.id"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementId" class="sr-only">User ID</label>
<input type="text" id="form.USER_ID"  nova-validation="required" maxlength="" name="form.USER_ID"
									   value="${DATA.USER_ID}" onchange="duplCheckID()" />
					</div>
                </div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0201.list.label.nameofperson"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementName" class="sr-only">Name</label>
                    <input type="text" id="form.USER_NM" name="form.USER_NM" nova-validation="required" maxlength="100" 
									   value="${DATA.USER_NM}" />
                  </div>
                </div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0201.list.label.companyname"/><span class="red"> *</span></span>
                <div class="registration-write btn-input-wrap">
                   <a2m:choiceInputForm type = "dialog" cls = "selectCompany" id ='COMPANY_ID' params = "{selectType: ONE, COMP_TYPE: org}" 
											defaultValue="" callback="" eventType="dblclick" codeDefaultValue="${DATA.COMPANY_ID}" textDefaultValue="${DATA.COMPANY_NM}"
											textTargetName="form.COMP_NM" codeTargetName="form.COMP" textFieldName="COMPANY_NM" codeFieldName="COMPANY_ID" textValidate="required"
											codeView = "true" funcname="onSelectCompany" classes="dialog_company" />
     			</div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0201.list.label.password"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementPw" class="sr-only">Password</label>

                    <c:if test="${DATA.USER_ID == null || DATA.USER_ID == ''}" >
                             <input type="password" id="form.inputPWD" placeholder="8~16 characters, at least 1 letter and 1 number." name="form.inputPWD" nova-validation="required,password"  maxlength="16" value="${PWD}" placeholder=""/>
                    
                    </c:if>
                    <c:if test="${DATA.USER_ID != null && DATA.USER_ID != ''}" >
                          <input type="password" id="form.inputPWD"  placeholder="8~16 characters, at least 1 letter and 1 number." name="form.inputPWD"  maxlength="16" value="${PWD}" placeholder=""/>
                    </c:if>
					<input type="password" hidden id="form.PWD"  name="form.PWD" class="w150" value="" />
                  </div>
                </div>
                <div style="font-size: 12px; float: right; padding: 5px;">Password is 8~16 characters, at least 1 letter and 1 number!</div>
                
              </li>
              <li>
                <span><spring:message code="sys.sys_0201.list.label.reconfirmpassword"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementRetypePw" class="sr-only">Retype password</label>
                    <c:if test="${DATA.USER_ID == null || DATA.USER_ID == ''}" >
                                        <input type="password" id="form.confirmPWD"  onkeyup="checkConfirmPassword()" nova-validation="required"  name="form.confirmPWD" class="w150" />
                    </c:if>
                    
                    <c:if test="${DATA.USER_ID != null && DATA.USER_ID != ''}" >
                                        <input type="password" id="form.confirmPWD"  name="form.confirmPWD" class="w150" />
                    </c:if>
                  </div>
                </div>
              </li>
              
            </ul>

            <ul class="registration-form-lst">
              <li>
                <span>License</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementLicense" class="sr-only">License</label>
                    <input type="text" id="form.LICENSE" name="form.LICENSE" class="validate[maxSize[100]]" disabled value="A2M">
                  </div>
<!--                   <button type="button" class="registration-search-btn">Select</button> -->
                </div>
              </li>
              
              <li>
                <span><spring:message code="sys.sys_0201.list.label.menuaccessa"/><span class="red"> *</span></span>
                <div class="registration-write btn-input-wrap">
                 	<a2m:choiceInputForm type = "dialog" cls = "selectRole" id ='ROLE_ID' params = "{selectType: ONE, USER_UID: ${USER_UID}}" 
									defaultValue="" callback=""
									textTargetName="ROLE_NM" codeTargetName="ROLE_ID" textFieldName="ROLE_NM" codeFieldName="ROLE_ID" textValidate="required"
									codeView = "true" funcname = "onSelectRole" />
                </div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0201.list.label.email"/><span class="red"> *</span></span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementEmail" class="sr-only">E-mail</label>
                    <input type="text" id="form.EMAIL" class="validate[required,email]"  nova-validation="required, email" name="form.EMAIL" 
									   value="${DATA.EMAIL}" />
                  </div>
                </div>
              </li>
              <li>
                <span><spring:message code="sys.sys_0201.list.label.permissions"/></span>
                <div class="registration-write btn-input-wrap ">
                  <a2m:choiceInputForm id="GERATOR_ID" cls="generator3" type="dialog"  params=""
									codeFieldName="GERATOR_ID" codeTargetName="GERATOR_ID" codeDefaultValue="${GERATOR_ID}" defaultValue=""
									textFieldName="GERATOR_NM" textTargetName="GERATOR_NM" textDefaultValue="${GERATOR_NM}" textTargetReadonly="false"
									codeView="true" classes="layer-popup-permission"/>
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
        		<a class="btn-style btn-style1" onclick="submitForm()"><spring:message code='button.save' /></a> 
			</c:if>
			<c:if test="${not(USER_UID == nulll || USER_UID eq '') && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
				<a class="btn-style btn-style3" onclick="doDelete()"><spring:message	code='button.delete' /></a>
			</c:if>
			<a class="btn-style btn-style2" onclick="backToList()">
				<%-- <spring:message code='button.back' /> --%>
				Cancel
			</a>
	
        </div>
      </div>
    </div>
    <!-- //발전기 등록 -->
</div>
	<input type="hidden" id="RSAModulus" name="modulus" value="${RSAModulus }"/>
	<input type="hidden" id="RSAExponent" name="exponent" value="${RSAExponent }"/>