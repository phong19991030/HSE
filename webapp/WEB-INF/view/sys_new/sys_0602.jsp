<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.checkbox-radio-custom input[type="checkbox"]+label,
	.checkbox-radio-custom input[type="radio"]+label {
	padding: .5rem .5rem 0.5rem 0.5rem;
}
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="ROLE_ID" name="ROLE_ID" value="${DATA.ROLE_ID}"></input>

<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">Menu access Management</h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">

					<article class="view-form">
						<h2 class="heading4">Menu access Management</h2>

						<div class="base-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 11%;">
									<col style="width: 89%;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">Code</th>
										<td><span id="ROLE_ID"></span></td>
									</tr>
									<tr>
										<th scope="row">Name</th>
										<td><span id="ROLE_NM"></span></td>
									</tr>
									<tr>
										<th scope="row">Description</th>
										<td><span id="RMK"></span></td>
									</tr>
								</tbody>
							</table>
						</div>
					</article>
					
					<article class="list-form" style="height: 450px;overflow-y: scroll;">
						<!-- table -->
						<div class="base-table center-table">
							<table>
								<caption>Menu Management - No, Condition, Menu, Menu ID,
									URL, Use or not, Upper menu, Order, Menu level</caption>
								<colgroup>
									<col style="width: 5%;">
									<col style="width: 10%;">
									<col style="width: 15%;">
									<col style="width: 25%;">
									<col style="width: 15%;">
									<col style="width: 15%;">
									<col style="width: 15%;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">No.</th>
										<th scope="col">Menu(Eng)</th>
										<th scope="col">Menu(Kor)</th>
										<th scope="col">Menu ID</th>
										<th scope="col">Read</th>
										<th scope="col">Write</th>
										<th scope="col">Download</th>
									</tr>
								</thead>
								<tbody id="ROW_LIST">
								</tbody>
								<!-- last tr bottom shadow -->
								<tfoot>
									<tr class="hidden-table-bottom">
										<td></td>
									</tr>
								</tfoot>
								<!-- last tr bottom shadow -->
							</table>
						</div>
						<!-- //table -->

					</article>
				</div>
				<!-- // left area -->
				<!-- right area -->
				<div class="right-area">
					<div class="right-btn-type">
						<button class="btn-style2" id="MODIFY_BTN">
							<i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
						</button>
						<button class="btn-style5" id="DELETE_BTN">
							<i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
						</button>
						<button class="btn-style3" id="CANCEL_BTN">
							<i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span></span>
						</button>
					</div>
				</div>
				<!-- // right area -->
				
			</div>
		</section>
		
	</div>
</main>


<script src="${ctxPath}/script/sys/sys_0602.js?cachebuster=" + new
	Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		sys0602();
	});
</script>