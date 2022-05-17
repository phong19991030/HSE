<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
td.NO_DATA {padding: 10rem .45rem 10rem .45rem !important;font-size: 1rem !important;}
</style>

<div class="container">

	<!-- 타이틀 -->
	<div class="tit-wrap">
		<h2 class="heading3">
			<span class="txt">Turbine Management</span>
		</h2>
		<ul class="location">
			<li>SYSTEM</li>
			<li class="bold">Turbine Management</li>
		</ul>
	</div>
	<!-- //타이틀 -->
	
	<!-- 검색폼 -->
	<div class="search-form-wrap">
		<!-- .active 시 활성화 -->
		<div class="search-wrapper" style="width:647px;">
			<form>
				<div class="input-group">
					<label for="detailKeyword" class="sr-only">검색어입력</label>
					<input type="text" name="detailKeyword" id="SEARCH_CRITERIA_ALL" placeholder="Enter your search term and then press Enter.">
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
			<!-- 상세 검색 -->
			<div class="search-detail">
				<ul class="detail-search-lst">
					<li>
						<span class="detail-search-keyword">Farm name</span>
						<div class="input-group">
							<label for="criteriaA" class="sr-only">Farm name</label>
							<input type="text" id="SEARCH_CRITERIA_A" name="criteriaA" value="" maxlength="50">
						</div>
					</li>
					<li>
						<span class="detail-search-keyword">Turbine name</span>
						<div class="input-group">
							<label for="criteriaB" class="sr-only">Turbine name</label>
							<input type="text" id="SEARCH_CRITERIA_B" name="criteriaB" value="">
						</div>
					</li>
					<li>
						<span class="detail-search-keyword">Manufacturer</span>
						<div class="select-box bul-none input-group">
							<label for="search_keyword">:: Select ::</label>
							<select name="SEARCH_CRITERIA_C" id="SEARCH_CRITERIA_C" class="info-select">
								<option value="" selected>:: Select ::</option>
								<c:forEach var="MANUFACTURER"  items="${MANUFACTURER_LIST}">
									<option value="${MANUFACTURER.COMPANY_ID}">${MANUFACTURER.COMPANY_NM}</option>
								</c:forEach>
							</select>
						</div>
					</li>
				</ul>
				<button id="SEARCH_BTN" class="search-btn">search</button>
			</div>
		</div>
	
		<!-- 오른쪽 폼 -->
		<div class="total-wrap">
			<!-- 전체 갯수 -->
			<span class="num">Total <strong id="TOTAL_CNT"></strong></span>
			<!-- 페이지 최대 갯수 셀렉트 박스 -->
			<div class="select-box">
				<label for="search_type"></label>
				<select name="search_type" id="PAGE_SIZE" class="info-select">
					<option value="10" selected>10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</div>
		</div>
		<!-- //오른쪽 폼 -->
	</div>
	<!-- //검색폼 -->
	
	<!-- 테이블 리스트 -->
	<div class="base_grid_table">
		<table>
			<colgroup>
				<col style="width:5%">
				<col style="width:15%">
				<col style="width:15%">
				<col style="width:15%">
				<col style="width:10%">
				<col style="width:10%">
				<col style="width:10%">
				<col style="width:20%">
			</colgroup>
			<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Farm</th>
					<th scope="col">Group</th>
					<th scope="col">Wind Turbine</th>
					<th scope="col">Manufacturer</th>
					<th scope="col">Turbine Model</th>
					<th scope="col">Power(MW)</th>
					<th scope="col">Date</th>
				</tr>
			</thead>
			<tbody id="ROW_LIST">
				<!-- 샘플 -->
<!-- 				<tr> -->
<!-- 					<td>1</td> -->
<!-- 					<td>테스트 발전단지</td> -->
<!-- 					<td>테스트 그룹</td> -->
<!-- 					<td>테스트 발전기</td> -->
<!-- 					<td>테스트 제조사</td> -->
<!-- 					<td>10</td> -->
<!-- 					<td>2020-01-01T00:00:00</td> -->
<!-- 				</tr> -->
				<!-- //샘플 -->
			</tbody>
		</table>
	</div>
	<!--//테이블 리스트 -->
	
	<!-- 페이저네이션 -->
	<div id="PAGENATION" class="pager">
		<a id="FST_PAGE" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
		<a id="PRE_PAGE" href="javascript:void(0);" class="arr prev">&lt;</a>
		                
		<a id="NXT_PAGE" href="javascript:void(0);" class="arr next">&gt;</a>
		<a id="LST_PAGE" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
	</div>
	<!-- //페이저네이션 -->
	
	<!-- 하단 -->
	<div class="footer_table_btn">
		<a id="REGISTER_BTN" href="javascript:void(0);" class="btn-style btn-style1">Register</a>
	</div>
	<!-- //하단 -->
</div>

<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0200.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	

<script>
	var farm_id = '${FARM_ID}';
	$(document).ready(function(){
		sys0200();		
	});
</script>
