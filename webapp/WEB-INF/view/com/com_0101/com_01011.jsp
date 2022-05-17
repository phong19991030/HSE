<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.btns {margin: 10px 0 0 0;}
#layerPopup .layer-cont.COMPANY {width:700px;}
#layerPopup .layer-cont.MENU-ACCESS {width:525px;}
#layerPopup .layer-cont.TURBINE-PERMISSION {width:700px;}
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="USER_UID" name="USER_UID" value="${DATA.USER_UID}"></input>

<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
          	<!-- tit-wrap -->
          	<div class="tit-wrap">
            	<div class="tit-left">
            		<c:if test="${PAGE_TITLE != null && PAGE_TITLE == 'Register'}">
	              		<h1 class="heading1"><spring:message code="com.com_0101.label.regis" /></h1>
            		</c:if> 
            		<c:if test="${PAGE_TITLE != null && PAGE_TITLE == 'Modify'}">
	              		<h1 class="heading1"><spring:message code="com.com_0101.label.modify" /></h1>
            		</c:if> 
            	</div>
          	</div>
          	<section class="contSection">
          		<div class="content clearfix">
          			<div class="left-area">
          				<article class="registration-form">
          					<div class="base-table">
          						<table>
                    				<caption></caption>
                    				<colgroup>
				                    	<col style="width: 11%;">
				                      	<col style="width: 39%;">
				                      	<col style="width: 11%;">
				                      	<col style="width: 39%;">
				                    </colgroup>
				                    <tbody>
				                    	<tr>
					                        <th scope="row"><span><spring:message code="com.com_0101.label.userId" /><span class="red"> *</span></span></th>
					                        <td>
					                          <div class="register-write w50p">
					                            <div class="input-group">
					                              	<label for="USER_ID" class="sr-only"><spring:message code="com.com_0101.label.userId" /></label>
		            								<input type="text" id="USER_ID" validation-check="required,ID" maxlength="15">
		            								<div style="font-size: 12px; float: right; padding: 5px;">8~20자, 문자 1개, 숫자 1개, 특수기호 1개 이상.</div>
					                            </div>
					                          </div>
					                        </td>
					                        <!-- <th scope="row"><span><spring:message code="com.com_0101.label.license" /><span class="red"> *</span></span></th> -->
					                        <td colspan="3">
					                          <div class="register-write w50p">
					                            <div class="input-group">
					                              	<label for="serManagementLicense" class="sr-only"><spring:message code="com.com_0101.label.license" /></label>
		            								              <input type="text" id="LICENSE" class="validate[maxSize[100]]" hidden value="A2M" validation-check="required">
					                            </div>
					                          </div>
					                        </td>
					                      </tr>
					                      <tr>
					                        <th scope="row"><span><spring:message code="com.com_0101.label.userName" /><span class="red"> *</span></span></th>
					                        <td>
					                          <div class="register-write w50p">
					                            <div class="input-group">
					                              	<label for="USER_NM" class="sr-only"><spring:message code="com.com_0101.label.userName" /></label>
		            								<input type="text" id="USER_NM" validation-check="required" maxlength="15">
					                            </div>
					                          </div>
					                        </td>
					                        <th scope="row"><span><spring:message code="com.com_0101.label.menuAccess" /><span class="red"> *</span></span></th>
					                        <td>
					                          <div class="register-write" style="display: flex">
					                            <div class="input-group">
										            <label for="MENU-ACCESS" class="sr-only"><spring:message code="com.com_0101.label.menuAccess" /></label>
										            <input type="text" id="MENU-ACCESS" placeholder="" validation-check="required" readonly>
					                            </div>
											    <button id="MENU-ACCESS_SEARCH_BTN" type="button" class="input-btn btn-style1" style="margin: 5px"><spring:message code="button.select" /></button>
					                          </div>
					                        </td>
					                      </tr>
					                      <tr>
					                        <%-- <th scope="row"><span><spring:message code="com.com_0101.label.company" /><span class="red"> *</span></span></th>
					                        <td>
					                          <div class="register-write w50p" style="display: flex">
					                            <div class="input-group">
										           <label for="COMPANY" class="sr-only"><spring:message code="com.com_0101.label.company" /></label>
		            								<input type="text" id="COMPANY" placeholder="Select Organization" validation-check="required" readonly>
					                            </div>
					                            <button id="COMPANY_SEARCH_BTN" type="button" class="input-btn btn-style1" style="margin: 5px"><spring:message code="button.select" /></button>
					                          </div>
					                        </td> --%>
					                        <th scope="row"><span><spring:message code="com.com_0101.label.emp" /></span></th>
					                        <td colspan="3">
					                          <div class="register-write w50p" style="display: flex">
					                            <div class="">
					                            	<input type="text" id="id_old_data_emp" name="old_data_emp" value="${DATA.EMP_NO}" hidden="true"/>
					                            	<input type="text" id="id_emp_str_uid_key_emp" name="EMP_NO" value="${DATA.EMP_NO}" hidden="true"/>
					                            </div>
					                            <jsp:include page="../../common/select_emp_btn.jsp">
					                            	<jsp:param name="key" value="key_emp" />
					                            	<jsp:param name="CRUD" value="C" />
					                            	<jsp:param name="strEmpId" value="" />
					                            	<jsp:param name="isOne" value="true" />
					                            </jsp:include>
					                          </div>
					                        </td>
					                      </tr>
					                      <tr>
					                        <th scope="row"><span><spring:message code="com.com_0101.label.password" /><span class="red"> *</span></span></th>
					                        <td colspan="3">
					                          <div class="register-write w50p">
					                            <div class="input-group">
										            <label for="PASSWORD" class="sr-only"><spring:message code="com.com_0101.label.password" /></label>
		            								<input type="password" id="PASSWORD" validation-check="required,password" maxlength="20" placeholder="8~20자, 문자 1개, 숫자 1개, 특수기호 1개 이상.">
					                            </div>
					                          </div>
					                        </td>
					                      </tr>
					                      <tr>
					                        <th scope="row"><span><spring:message code="com.com_0101.label.rePassword" /><span class="red"> *</span></span></th>
					                        <td colspan="3">
					                          <div class="register-write w50p">
					                            <div class="input-group">
										            <label for="PASSWORD2" class="sr-only"><spring:message code="com.com_0101.label.rePassword" /></label>
		            								<input type="password" id="PASSWORD2" validation-check="required" maxlength="20" placeholder="8~20자, 문자 1개, 숫자 1개, 특수기호 1개 이상.">
					                            </div>
					                          </div>
					                        </td>
					                      </tr>
				                    </tbody>
                    			</table>	
          					</div>
          				</article>
          			</div>
          			<div class="right-area">
		              <div class="right-btn-type">
		                <button id="SAVE_BTN" class="btn-style1">
		                  <i class="las la-edit"></i><span class="name"><spring:message code="button.save" /></span>
		                </button>
		                <button class="btn-style3" onclick="goList()">
		                  <i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span>
		                </button>
<%-- 			        	<a href="goList()" class="btn-style btn-style2"><spring:message code="button.cancel" /></a> --%>
		              </div>
		            </div>
          		</div>
          	</section>
        </section>
	</div>
</main>

<!-- <div class="layer-popup" id="layer-popup2">

</div> -->

<!-- layerpopup -->
<div id="layerPopup" class="layer-popup">
	
</div>

<!-- 스크립트 -->	
<!-- reload file js -->
<script src="${ctxPath}/script/sys/sys_0301.js?cachebuster="+ new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() { 
		sys0301();
	});
</script>



