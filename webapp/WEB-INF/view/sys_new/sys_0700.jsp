<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.search-wrapper {width:647px !important;}
td.NO_DATA {padding: 10rem .45rem 10rem .45rem !important;font-size: 1rem !important;}
.active_1{
	padding: 4px;
	background: #455eee;
	color: #fff;
	border-radius: 2px;
}
.active_0{
	padding: 4px;
	background: #a5a5a5;
	color: #fff;
	border-radius: 2px;
}
</style>

<!-- 공지사항 관리 리스트 -->
<div class="container">
		<!-- 타이틀 -->
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Notice Management</span>
			</h2>
			<ul class="location">
				<li>SYSTEM</li>
				<li class="bold">Notice Management</li>
			</ul>
		</div>
		<!-- //타이틀 -->
		
		<!-- 검색 폼 -->
		<div class="search-form-wrap">
			<!-- 검색 -->
			<div class="search-wrapper">
				<form>
					<div class="input-group">
						<label for="detailKeyword" class="sr-only">검색어입력</label>
						<input type="text" name="detailKeyword" id="SEARCH" >
					</div>
					<a id="SEARCH_RESET_BTN" href="javascript:void(0);" class="refresh-btn" title="Refresh">
						<span class="sr-only">Initializing a search</span>
						<i class="xi-refresh"></i>
					</a>
					<a id="SEARCH_TOGGLE_BTN" href="javascript:void(0);" class="slide-toggle-search" title="Search details">
						<span class="sr-only">상세검색 토글 버튼</span>
						<i class="xi-angle-down-min"></i>
					</a>
				</form>
				
				<!-- 상세검색 -->
				<div class="search-detail">
					<ul class="detail-search-lst">
						<li>
							<span class="detail-search-keyword">Title</span>
							<div class="input-group">
								<label for="Title" class="sr-only">Title</label>
								<input type="text" id="TITLE" name="Title" value="">
							</div>
						</li>
						<li>
							<span class="detail-search-keyword">Register</span>
							<div class="select-box bul-none input-group">
								<label for="search_keyword">:: Select ::</label>
								<select name="REGISTER" id="REGISTER" class="info-select">
									<option value="" selected>:: Select ::</option>
									<c:forEach var="REGISTER"  items="${REGISTER_LIST}">
										<option value="${REGISTER.USER_UID}">${REGISTER.USER_NM}</option>
									</c:forEach>
								</select>
							</div>
						</li>
					</ul>
					<button id="SEARCH_BTN" class="search-btn">search</button>
				</div>
				<!-- //상세검색 -->
			</div>
			<!-- //검색 -->
			
			<!-- 오른쪽 폼 -->
			<div class="total-wrap">
				<!-- 전체 갯수 -->
				<span class="num">Total <strong id="TOTAL_CNT"></strong></span>
				<!-- 페이지 최대 갯수 셀렉트 박스 -->
				<div class="select-box">
					<label for="search_type"></label>
					<select name="page_size" id="PAGE_SIZE" class="info-select">
						<option value="5">5</option>
						<option value="10" selected="selected">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
					</select>
				</div>
			</div>
			<!-- //오른쪽 폼 -->
		</div>
		<!-- 검색 폼 -->
		
		<!-- 테이블 -->
		<div class="base_grid_table btn-table">
			<table>
				<caption>Manual - No, Title, Writer, Date, Attachment</caption>
				<colgroup>
					<col style="width:5%">
					<col style="width:35%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:10%"> 
					<col style="width:10%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">Title</th>
						<th scope="col">Register</th>
						<th scope="col">Date</th>
						<th scope="col">Attachment</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody id="ROW_LIST">
<!-- 					<tr> -->
<!-- 						<td>1</td> -->
<!-- 						<td>GWO Basic Safety Training</td> -->
<!-- 						<td>Admin</td> -->
<!-- 						<td>2021-05-17T15:45:02</td> -->
<!-- 						<td> -->
<!-- 							<a id="DOWNLOAD_BTN" class="download-btn"> -->
<!-- 								<i class="xi-download"></i> -->
<!-- 							</a> -->
<!-- 						</td> -->
<!-- 						<td> -->
<!-- 							<span class="active_0">Inactive</span> -->
<!-- 						</td> -->
<!-- 					</tr> -->
				</tbody>
			</table>
		</div>
		<!-- //테이블 -->
			
		<!-- 페이져 -->		
		<div id="PAGENATION" class="pager">
			<a id="FST_PAGE" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
			<a id="PRE_PAGE" href="javascript:void(0);" class="arr prev">&lt;</a>
			                
			<a id="NXT_PAGE" href="javascript:void(0);" class="arr next">&gt;</a>
			<a id="LST_PAGE" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
		</div>
		<!-- // 페이져 -->
		
		<!-- 하단 -->
		<div class="footer_table_btn">
        	<a id="REGISTER_BTN" href="javascript:void(0);" class="btn-style btn-style1">Register</a>
        </div>
		<!-- //하단 -->
</div>

<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0700.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>
<!-- //스크립트 -->

<script>
	$(document).ready(function(){
		sys0700();
	});
</script>
