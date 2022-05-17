<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
tr.NO_DATA td{padding: 8rem .45rem 8rem .45rem !important;font-size: 1rem !important;}
#layerPopup .layer-cont.REGISTER, #layerPopup .layer-cont.ALARM {width:1400px;}
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="WT_ALARM_GR_ID" name="WT_ALARM_GR_ID" value="${DATA.WT_ALARM_GR_ID}"></input>

<div class="container system-wrap system-wrap1">
	<!-- 메뉴 엑세스 상세 정보 페이지 -->
	<div class="system-detail-wrap">
	  <div class="system-left">
	  
	    <!--타이틀-->
	    <div class="tit-wrap">
	      <h2 class="heading3">
	        <span class="txt">${PAGE_TITLE}</span>
	        <!-- <span class="version">V47</span> -->
	      </h2>
	      <ul class="location">
	        <li>SYSTEM</li>
	        <li>Code Management</li>
	       <li class="bold">Alarm Code</li>
	      </ul>
	    </div>
	    <!--//타이틀-->
	    
	    <!-- 상세폼 -->
	    <div class="registration-form registration-form1">
	      <div class="registration-form-lst-wrap">
	      
	      	<!-- 왼쪽 -->
	        <ul class="registration-form-lst">
	          <li>
	            <span>Turbine Model</span>
	            <div class="registration-write">
	              <span id="TURBINE-MODEL"></span>
	            </div>
	          </li>
	          <li>
	            <span>Name</span>
	            <div class="registration-write">
	              <span id="ALARM_NM"></span>
	            </div>
	          </li>
	          <li>
	            <span>Description</span>
	            <div class="registration-write change-line">
	              <span id="DESCRPT"></span>
	            </div>
	          </li>
	        </ul>
	        <!-- //왼쪽 -->
	        
	        <!-- 오른쪽 -->
	        <ul class="registration-form-lst">
	          <li>
	            <span>Group Code</span>
	            <div class="registration-write">
	              <span id="ALARM_GROUP_CODE"></span>
	            </div>
	          </li>
	          <li>
	            <span>Model Code</span>
	            <div class="registration-write">
	              <span id="CODE_A"></span>
	            </div>
	          </li>
	          <li>
	            <span>Manufacturer Code</span>
	            <div class="registration-write">
	              <span id="CODE_B"></span>
	            </div>
	          </li>
	          <li>
	            <span>Capacity Code</span>
	            <div class="registration-write">
	              <span id="CODE_C"></span>
	            </div>
	          </li>
	        </ul>
	        <!-- //오른쪽 -->
	      </div>
	    </div>
	    <!-- //상세폼 -->
	    
	    
	    
	    <!-- 검색 폼 -->
		<div class="search-form-wrap">
			<!-- .active 시 활성화 --> 
			<div class="search-wrapper">
				<form>
					<div class="input-group">
						<label for="detailKeyword" class="sr-only">검색어입력</label>
						<input type="text" name="detailKeyword" id="SEARCH_CRITERIA_ALL" placeholder="Enter your search term and then press Enter.">
					</div>
					<a id="SEARCH_RESET_BTN" href="javascript:void(0);" class="refresh-btn">
						<span class="sr-only">Initializing a search</span>
						<i class="xi-refresh"></i>
					</a>
					<a id="SEARCH_TOGGLE_BTN" href="javascript:void(0);" class="slide-toggle-search">
						<span class="sr-only">상세검색 토글 버튼</span>
						<i class="xi-angle-down-min"></i>
					</a>
				</form>
				<div class="search-detail">
					<ul class="detail-search-lst">
						<li>
							<span class="detail-search-keyword">Alarm Code</span>
							<div class="input-group">
								<label for="criteriaA" class="sr-only"></label>
								<input type="text" id="SEARCH_CRITERIA_A" name="criteriaA" value="" maxlength="50">
							</div>
						</li>
						<li>
							<span class="detail-search-keyword">Alarm Text</span>
							<div class="input-group">
								<label for="criteriaB" class="sr-only"></label>
								<input type="text" id="SEARCH_CRITERIA_B" name="criteriaB" value="" maxlength="50">
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
					<select id="PAGE_SIZE" class="info-select">
						<option value="5">5</option>
						<option value="10" selected>10</option>
						<option value="20">20</option>
						<option value="30">30</option>
					</select>
				</div>
			</div>
			<!-- //오른쪽 폼 -->
		</div>
		<!--//검색폼-->
	    
	    
	    <div class="base_grid_table">
	    	<div class="table-wrap">
	    		<table>
	    			<caption>Menu Management - No, Condition, Menu, Menu ID, URL, Use or not, Upper menu, Order, Menu level</caption>
					<colgroup>
						<col style="width:5%">
						<col style="width:15%">
						<col style="width:20%">
						<col style="width:20%">
						<col style="width:5%">
						<col style="width:5%">
						<col style="width:5%">
						<col style="width:5%">
					</colgroup>
					<thead>
						<tr>
							<th rowspan="2" scope="col">No.</th>
							<th rowspan="2" scope="col">Alarm Code</th>
							<th rowspan="2" scope="col">Alarm Text</th>
							<th rowspan="2" scope="col">Date</th>
							<th colspan="4" scope="col">Detail</th>
						</tr>
						<tr>
							<th scope="col">Action</th>
							<th scope="col">Part</th>
							<th scope="col">Tool</th>
							<th scope="col">PPE</th>
						</tr>
					</thead>
					<tbody id="ALARM_LIST">
						<!-- <tr>
							<td>1</td>
							<td>136</td>
							<td>Asym.currL1:____A,Others:____A</td>
							<td>2021-01-01T00:00:00</td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
						</tr> -->
					</tbody>
	    		</table>
	    	</div>
	    </div>
	    
	    <!-- 페이저 -->
		<div id="PAGENATION" class="pager">
			<a id="FST_PAGE" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
			<a id="PRE_PAGE" href="javascript:void(0);" class="arr prev">&lt;</a>
			                
			<a id="NXT_PAGE" href="javascript:void(0);" class="arr next">&gt;</a>
			<a id="LST_PAGE" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
		</div>
		<!-- //페이저 -->
	    
	    
	  </div>
	  
	  <!-- 버튼 모음 -->
	  <div class="system-right">
	    <div class="btns" style="position:fixed; width:12%;">
	      	<span id="MODIFY_BTN" class="btn-style btn-style1">Modify</span>
			<span id="DELETE_BTN" class="btn-style btn-style3">Delete</span>
			<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
	    </div>
	  </div>
	</div>
</div>

<!-- 모달창 -->
<div id="layerPopup" class="dialog_company"></div>

<!-- 스크립트 -->	
<script src="${ctxPath}/script/sys/sys_0902.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	$(document).ready(sys0902());
</script>