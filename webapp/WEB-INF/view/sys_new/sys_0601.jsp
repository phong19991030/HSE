<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">직원 정보 관리 등록</h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">

					<article class="registration-form">
						<h2 class="heading4">직원 정보</h2>

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
										<th scope="row">Code<span class="red"> *</span></th>
										<td colspan="3">
											<div class="register-write w100p">
												<div class="input-group">
													<input type="text" placeholder="You can type up to 10 characters." id= "ROLE_ID" validation-check="required" maxlength="10">
												</div>
											</div>
										</td>

									</tr>
									<tr>
										<th scope="row">Name <span class="red"> *</span></th>
										<td colspan="3">
											<div class="register-write w100p">
												<div class="input-group">
													<input type="text" placeholder="You can type up to 15 characters." id="ROLE_NM" validation-check="required" maxlength="15">
												</div>
											</div>
										</td>

									</tr>
									<tr>
										<th scope="row">Description <span class="red"> *</span></th>
										<td colspan="3">
											<div class="register-write w100p">
												<div class="input-group">
													<textarea title="주요 경력" placeholder="You can type up to 50 characters." id="RMK" validation-check="required"></textarea>
												</div>
											</div>
										</td>
									</tr>

								</tbody>
							</table>
						</div>
					</article>

					<article class="list-form"
						style="height: 450px; overflow-y: scroll;">
						<!-- table -->
						<div class="base-table center-table">
							<table>
								<caption>Menu Management - No, Condition, Menu, Menu
									ID, URL, Use or not, Upper menu, Order, Menu level</caption>
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
										<th rowspan="2" scope="col">No.</th>
										<th rowspan="2" scope="col">Menu(Kor)</th>
										<th rowspan="2" scope="col">Menu(Eng)</th>
										<th rowspan="2" scope="col">Menu ID</th>
										<th scope="col">Read</th>
										<th scope="col">Write</th>
										<th scope="col">Download</th>
									</tr>
									<tr>
										<th scope="col">
											<div class="checkbox-radio-group">
												<input type="checkbox" id="READ_ALL_CHECK"> <label
													for="READ_ALL_CHECK" class="sr-only"></label>
											</div>
										</th>
										<th scope="col">
											<div class="checkbox-radio-group">
												<input type="checkbox" id="WRITE_ALL_CHECK"> <label
													for="WRITE_ALL_CHECK" class="sr-only"></label>
											</div>
										</th>
										<th scope="col">
											<div class="checkbox-radio-group">
												<input type="checkbox" id="DOWN_ALL_CHECK"> <label
													for="DOWN_ALL_CHECK" class="sr-only"></label>
											</div>
										</th>
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
						<button class="btn-style1" id="SAVE_BTN">
							<i class="las la-edit"></i><span class="name"><spring:message code="button.save" /></span>
						</button>
						<button class="btn-style3" id="CANCEL_BTN">
							<i class="las la-reply"></i><span class="name"><span class="name"><spring:message code="button.cancel" /></span>
						</button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
</main>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="PREV_ROLE_ID" name="PREV_ROLE_ID"
	value="${DATA.ROLE_ID}"></input>


<script src="${ctxPath}/script/sys/sys_0601.js?cachebuster=" + new
	Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		sys0601();
	});
</script>