<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
tr.NO_DATA td{padding: 8rem .45rem 8rem .45rem !important;font-size: 1rem !important;}
#layerPopup .layer-cont.TURBINE-MODEL {width:1060px;}
#layerPopup .layer-cont.TURBINE-MODEL .base_grid_table td {
	border-bottom: 1px solid #ddd; border-right: 1px solid #e2e2e2; border-left: 1px solid #c8c8ca;
}
#layerPopup .layer-cont.TURBINE-MODEL .base_grid_table th {
	border-bottom: 1px solid #ddd; border-right: 1px solid #e2e2e2; border-left: 1px solid #c8c8ca;
}
#layerPopup .layer-cont.REGISTER, #layerPopup .layer-cont.ALARM {width:1400px;}

#ACTION_LIST, #PART_LIST, #TOOL_LIST, #PPE_LIST { padding-right: 2.2rem; }

.add-btn i {
	font-size: 1.3rem;
    color: #fff;
    font-weight: 700;
}

.add-btn {
	/* width: calc(100% + 12%); */
	width: 100%;
    display: block;
    text-align: center;
    background: #e4e5e8;
    color: #fff;
    margin-top: 12px;
    padding: 3px 0;
    border-radius: 5px;
	line-height: 1;
}

.add-btn:hover {
	background: #1d41cc;
}

.layer-cont .system-left {padding-right: 1.25rem;}
.layer-cont .system-right {padding-left: 1.25rem;}

a#REGISTER_BTN {margin-top:10px;}

.base_grid_table {
    border-bottom: 2px solid #ebebed;
}

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
	      <div class="registration-form-lst-wrap" style="overflow:auto;">
	      
	      	<!-- 왼쪽 -->
	        <ul class="registration-form-lst">
	          <li>
	            <span>Turbine Model<span class="red"> *</span></span>
	            <div class="registration-write btn-input-wrap">
	              <div class="input-group">
	               	<label for="TURBINE-MODEL" class="sr-only"></label>
	               	<input type="text" id="TURBINE-MODEL" validation-check="required" placeholder="Select turbine Model" readonly>
	              </div>
	              <button id="TURBINE-MODEL_SEARCH_BTN" type="button" class="input-btn btn-style1">Select</button>
	            </div>
	          </li>
	          <li>
	            <span>Name<span class="red"> *</span></span>
	            <div class="registration-write">
	              <div class="input-group">
	               	<label for="ALARM_NM" class="sr-only"></label>
	               	<input type="text" id="ALARM_NM" validation-check="required" maxlength="15">
	              </div>
	            </div>
	          </li>
	          <li>
	            <span>Description</span>
	            <div class="registration-write">
	              <div class="input-group input-group-wrap">
	               	<label for="DESCRPT" class="sr-only"></label>
	               	<textarea id="DESCRPT"></textarea>
	              </div>
	            </div>
	          </li>
	        </ul>
	        <!-- //왼쪽 -->
	        
	        <!-- 오른쪽 -->
	        <ul class="registration-form-lst">
	          <li>
	            <span>Group Code</span>
	            <div class="registration-write">
	              <div class="input-group">
	               	<label for="ALARM_GROUP_CODE" class="sr-only"></label>
	               	<input type="text" id="ALARM_GROUP_CODE" placeholder="Select turbine model" readonly>
	              </div>
	            </div>
	          </li>
	          <li>
	            <span>Model Code</span>
	            <div class="registration-write">
	              <div class="input-group">
	               	<label for="CODE_A" class="sr-only"></label>
	               	<input type="text" id="CODE_A" placeholder="Select turbine model" readonly>
	              </div>
	            </div>
	          </li>
	          <li>
	            <span>Manufacturer Code</span>
	            <div class="registration-write">
	              <div class="input-group">
	               	<label for="CODE_B" class="sr-only"></label>
	               	<input type="text" id="CODE_B" placeholder="Select turbine model" readonly>
	              </div>
	            </div>
	          </li>
	          <li>
	            <span>Capacity Code</span>
	            <div class="registration-write">
	              <div class="input-group">
	               	<label for="CODE_C" class="sr-only"></label>
	               	<input type="text" id="CODE_C" placeholder="Select turbine model" readonly>
	              </div>
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
							<span class="detail-search-keyword">Group Code</span>
							<div class="input-group">
								<label for="criteriaA" class="sr-only"></label>
								<input type="text" id="SEARCH_CRITERIA_A" name="criteriaA" value="" maxlength="50">
							</div>
						</li>
						<li>
							<span class="detail-search-keyword">Code Name</span>
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
						<col style="width:5%">
					</colgroup>
					<thead>
						<tr>
							<th rowspan="2" scope="col">No.</th>
							<th rowspan="2" scope="col">Alarm Code</th>
							<th rowspan="2" scope="col">Alarm Text</th>
							<th rowspan="2" scope="col">Date</th>
							<th colspan="4" scope="col">Detail</th>
							<th rowspan="2" scope="col"></th>
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
							<td>
								<span class="delete-btn">
									<i class="xi-trash"></i>
								</span>
							</td>
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
	    
	    <div class="footer_table_btn">
			<a id="REGISTER_BTN" href="javascript:void(0);" class="btn-style btn-style1" style="width:100px;margin-left:5px;">Register</a>
		</div>
	  
	  </div>
	  
	  <!-- 버튼 모음 -->
	  <div class="system-right">
	    <div class="btns" style="position:fixed; width:12%;">
	      	<span id="SAVE_BTN" class="btn-style btn-style1">Save</span>
			<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
	    </div>
	  </div>
	</div>
</div>

<!-- 모달창 -->
<div id="layerPopup" class="dialog_company"></div>

<!-- 스크립트 -->	
<script src="${ctxPath}/script/sys/sys_0901.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	$(document).ready(sys0901);
</script>