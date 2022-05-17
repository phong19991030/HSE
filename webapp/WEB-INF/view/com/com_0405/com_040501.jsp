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
<input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input>

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
				                    </colgroup>
				                    <tbody>
				                    	<tr>
					                        <th scope="row"><span><spring:message code="com.com_0405.label.companyName" /><span class="red"> *</span></span></th>
					                        <td>
					                          <div class="register-write w50p">
					                            <div class="input-group">
					                              	<label for="COMPANY_NAME" class="sr-only"><spring:message code="com.com_0405.label.companyName" /></label>
		            								<input type="text" id="COMPANY_NAME" validation-check="required,ID" maxlength="15">
					                            </div>
					                          </div>
					                        </td>
					                      </tr>
					                      <tr>
					                        <th scope="row"><span><spring:message code="com.com_0405.label.companyAddress" /><span class="red"> *</span></span></th>
					                        <td>
					                          <div class="register-write w50p">
					                            <div class="input-group">
					                              	<label for="COMPANY_ADDRESS" class="sr-only"><spring:message code="com.com_0405.label.companyAddress" /></label>
		            								<input type="text" id="COMPANY_ADDRESS" validation-check="required" maxlength="15">
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
		                <button class="btn-style3" onclick="javascript:history.back()">
		                  <i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span>
		                </button>
		              </div>
		            </div>
          		</div>
          	</section>
        </section>
	</div>
</main>

<!-- <div class="layer-popup" id="layer-popup2">

</div> -->



<!-- 스크립트 -->	
<!-- reload file js -->
<script src="${ctxPath}/script/com/com_040501.js?cachebuster="+ new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() { 
		com_040501();
	});
</script>



