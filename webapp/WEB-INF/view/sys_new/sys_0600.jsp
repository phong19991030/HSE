<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<%request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">Menu Access Management</h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>

		<!-- D : contSection border /
          1. tab : border (If you have a tap, please add this.)
          2. no tab : unborder  add (border-top disappears.)
           -->
		<section class="contSection unborder">
			<div class="content">
				<div class="content-body">

					<!-- fixed-search-form -->
					<div class="fixed-search-form">
						<div class="flex-wrap">

							<%--<!-- item -->
							<div class="item">
								<span class="item-tit">Code</span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" placeholder="Code" id="SEARCH_MENU_A">
									</div>
								</div>
							</div>

							<!-- item -->
							<div class="item">
								<span class="item-tit">Name</span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" placeholder="Name" id="SEARCH_MENU_B">
									</div>
								</div>
							</div>--%>
							<!-- item -->
							<div class="item search">
								<span class="item-tit"><spring:message code="common.button.label.search"/></span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" title="통합검색" placeholder="검색어를 입력해주세요" id="SEARCH_MENU_ALL">
									</div>
								</div>
							</div>
						</div>
						<div class="btn-wrap">
							<button id="SEARCH_RESET_BTN" class="refresh-btn">
								<span class="sr-only">새로고침</span>
							</button>
							<button class="search-btn" id="SEARCH_BTN"><spring:message code="common.button.label.search"/></button>
						</div>

					</div>
					<!-- // fixed-search-form -->

					<!-- D : list-form (목록폼)
                	1. After setting the width value on the colgroup,
                	2. Please cover all the text in td with a <p> tag (ellipsis) -->
					<article class="list-form">
						<!-- table -->
						<div class="base-table center-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 5%;">
									<col style="width: 10%;">
									<col style="width: 15%;">
									<col style="width: 25%;">
									<col style="width: 15%;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col"><spring:message code="hea.label.no"/></th>
										<th scope="col">Code</th>
										<th scope="col">Name</th>
										<th scope="col">Description</th>
										<th scope="col">Date</th>
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

						<!-- table-foot-area -->
						<div class="table-foot-area">
							<!-- 정렬 -->
							<div class="sort-length">
								<div class="select-group">
									<select class="select" title="한 페이지에 표시할 행 설정" id="PAGE_SIZE">
										<option value="10">10개</option>
										<option value="20">20개</option>
										<option value="30">30개</option>
									</select>
								</div>
							</div>
							<!-- pager -->
							<div id="PAGENATION" class="pager">
								<a href="javascript:void(0);" id="PRE_PAGE" class="arr prev">
									<span class="sr-only">이전</span>
								</a> <a href="javascript:void(0);" id="NXT_PAGE" class="arr next">
									<span class="sr-only">다음</span>
								</a>
							</div>
							<!-- foot btn -->
							<div class="foot-btn">
								<button class="btn-style1" id="REGISTER_BTN">
									<i class="las la-edit"></i><span class="name"><spring:message code="button.register"/></span>
								</button>
							</div>
						</div>
						<!-- //table-foot-area -->
					</article>

				</div>

			</div>
		</section>
	</div>
</main>



<script src="${ctxPath}/script/sys/sys_0600.js?cachebuster=" + new Date().getTime()></script>
<%-- <script src="${ctxPath}/script/sys/sys_0600.js"></script> --%>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		sys0600();
	});
</script>


