<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="USER_UID" name="USER_UID" value="${DATA.USER_UID}"></input>
<input type="hidden" id="USER_ID" name="USER_ID" value=""></input>

<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="com.com_01012.label.title" /></h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>
        <section class="contSection">
          	<div class="content clearfix">
          		<div class="left-area">
          			<article class="view-form">
          				<h2 class="heading4"><spring:message code="com.com_01012.label.title1" /></h2>
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
			                    		<th scope="row"><span><spring:message code="com.com_0101.label.userId" /></span></th>
			                    		<td colspan="3"><span id="USER_ID"></span></td>
			                    		<!-- <th scope="row"><span><spring:message code="com.com_0101.label.license" /></span></th> -->
			                    		<td ><span hidden id="LICENSE">A2M</span></td>
		                    		</tr>
		                    		<tr>
			                    		<th scope="row"><span><spring:message code="com.com_0101.label.userName" /></span></th>
			                    		<td><span id="USER_ID"></span></td>
			                    		<th scope="row"><span><spring:message code="com.com_0101.label.menuAccess" /></span></th>
			                    		<td><span id="MENU-ACCESS"></span></td>
		                    		</tr>
		                    		<tr>
			                    		<th scope="row"><span><spring:message code="com.com_0101.label.emp" /></span></th>
			                    		<td><span id=EMP></span></td>
		                    		</tr>
		                    	</tbody>
		                	</table>
				    	</div>
          			</article>
          		</div>
          		<div class="right-area">
	              	<div class="right-btn-type">
		                <button id="MODIFY_BTN" class="btn-style2">
		                  <i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
		                </button>
		                <button id="DELETE_BTN" class="btn-style5">
		                  <i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
		                </button>
		                <button class="btn-style3" onclick="goList()">
		                  <i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span>
		                </button>
	              	</div>
	            </div>
          	</div>
        </section>
	</div>
</main>

<!-- reload file js -->
<script src="${ctxPath}/script/sys/sys_0302.js?cachebuster="+ new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>

	var param = '${DATA}';
	
	$(document).ready(function(){
		sys0302();
	});
</script>