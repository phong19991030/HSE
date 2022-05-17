<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

	<div class="container system-wrap system-wrap1">
	
	  <!-- 발전기 등록 -->
	  <div class="system-detail-wrap">
	    <div class="system-left">
	      <!--tit-wrap-->
	      <div class="tit-wrap">
	        <h2 class="heading3">
	          <span class="txt">Dafault Validation</span>
	          <!-- <span class="version">V47</span> -->
	        </h2>
	        <ul class="location">
	          <li>SYSTEM</li>
	          <li class="bold">WF Management</li>
	        </ul>
	      </div>
	      <!--//tit-wrap-->
	      
	      <div class="search-form-wrap">
			<div class="search-wrapper">
				<form id="detailKeywordForm" name="detailKeywordForm" method="post">
					<div class="input-group">
						<label for="detailKeyword" class="sr-only">검색어입력</label>
						<input type="text" name="detailKeyword" id="detailKeyword" placeholder="Plaease enter something...">
					</div>
					<a href="#none" class="slide-toggle-search">
						<span class="sr-only">상세검색 토글 버튼</span>
						<i class="xi-angle-down-min"></i>
					</a>
				</form>
				<div class="search-detail">
					<ul class="detail-search-lst">
						<li>
							<span class="detail-search-keyword">selecbox</span>
							<div class="select-box">
								<label for="search_type">Complete</label>
								<select name="search_type" id="search_type" class="info-select">
									<option value="1" selected="selected">Complete</option>
									<option value="2">Planning</option>
									<option value="3">Alarm</option>
									<option value="4">Operating</option>
									<option value="5">SCADA error</option>
								</select>
							</div>
						</li>
						<li>
							<span class="detail-search-keyword">input text</span>
							<div class="input-group">
								<label for="alarmCode" class="sr-only">alarmCode</label>
								<input type="text" id="alarmCode" name="alarmCode" value="">
							</div>
						</li>
						<li>
							<span class="detail-search-keyword">calendar</span>
							<div class="calendar-picker">
						      <div class="calendar-wrap">
						        <div class="input-group">
						          <label for="searchText" class="sr-only"></label>
						          <input type="text" id="searchText" name="searchText" value="">
						          <button class="calendar-picker-btn">
						            <i class="xi-calendar"></i>
						          </button>
						        </div>
						        <em class="hyphen">
						          <span class="sr-only">-</span>
						        </em>
						        <div class="input-group">
						          <label for="searchText" class="sr-only"></label>
						          <input type="text" id="searchText" name="searchText" value="">
						          <button class="calendar-picker-btn">
						            <i class="xi-calendar"></i>
						          </button>
						        </div>
						      </div>
						    </div>
						</li>
					</ul>
					<button class="search-btn">search</button>
				</div>
			</div>

			<div class="total-wrap">
				<span class="num">Total <strong>1,211</strong></span>
				<div class="select-box">
					<label for="search_type">10</label>
					<select name="search_type" id="search_type" class="info-select">
						<option value="1" selected="selected">10</option>
						<option value="2">20</option>
						<option value="3">30</option>
					</select>
				</div>
			</div>
		</div>
		
	      <!-- registration form -->
	      <div class="registration-form registration-form1">
	        <div class="registration-form-lst-wrap">
	          <ul class="registration-form-lst">
	            <li>
	              <span class="essential">Dafault input</span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="wtgId" class="sr-only">WTG ID</label>
	                  <input type="text" name="wtgId" id="wtgId" placeholder="">
	                </div>
	              </div>
	            </li>
	            <li>
	              <span>Available input</span>
	              <div class="registration-write">
	                <div class="input-group available">
	                  <label for="wtgId" class="sr-only">WTG ID</label>
	                  <input type="text" name="wtgId" id="wtgId" placeholder="">
	                </div>
	              	<span class="input-info-txt">Available</span>
	              </div>
	            </li>
	            <li>
	              <span>Overwrap input</span>
	              <div class="registration-write">
	                <div class="input-group overlap">
	                  <label for="wtgId" class="sr-only">WTG ID</label>
	                  <input type="text" name="wtgId" id="wtgId" placeholder="">
	                </div>
	              	<span class="input-info-txt">Please enter the correct content.</span>
	              </div>
	            </li>
	          </ul>
	
	        </div>
	      </div>
	      <!-- //registration form -->
		  
		  <div class="base_grid_table">
			<table>
				<caption>Error List - No, Progress, Data, Alarm code, Description, Manual, Report</caption>
				<colgroup>
					<col style="width:8%">
					<col style="width:8%">
					<col style="width:16.5%">
					<col style="width:11.5%">
					<col style="width:15%">
					<col style="width:29%">
					<col style="width:6%">
					<col style="width:6%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">Progress</th>
						<th scope="col">Data</th>
						<th scope="col">Alarm code</th>
						<th scope="col">Alarm code</th>
						<th scope="col">Description</th>
						<th scope="col">Manual</th>
						<th scope="col">Report</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="8">
							<div class="none-result"><i class="xi-error"></i><span>There are no results for “ㅇㅇㅇ”</span></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	    </div>
	    <div class="system-right">
	      <div class="btns">
	        <a href="" class="btn-style btn-style1">Save</a>
	        <a href="" class="btn-style btn-style2">Cancel</a>
	        <a href="" class="btn-style btn-style3">Delete</a>
	      </div>
	    </div>
	  </div>
	
	  <!-- //발전기 등록 -->
	</div>
	
	<!-- layerpopup -->
	<div id="layerPopup" class="">
		<div class="layer-cont">
			<div class="tit-wrap">
				<strong class="heading6">Select a Mannfacture</strong>
			</div>
			<div class="search-form-wrap">
			    <div class="search-wrapper">
			      <form id="detailKeywordForm" name="detailKeywordForm" method="post">
			        <div class="input-group">
			          <label for="detailKeyword" class="sr-only">Enter search term</label>
			          <input type="text" name="detailKeyword" id="detailKeyword" placeholder="Plaease enter something...">
			        </div>
			        <a href="#none" class="layerpopup-search">
			          <span class="sr-only">search</span>
			          <i class="xi-search"></i>
			        </a>
			      </form>
			    </div>
			  </div>
			  
			  <div class="btn-table">
			  	<div class="base_grid_table">
				  	<table>
				  		<caption>Select a Mannfacture - Logo, Operator</caption>
				  		<thead>
				  			<tr>
				  				<th scope="col"></th>
				  				<th scope="col">Logo</th>
				  				<th scope="col">Operator</th>
				  			</tr>
				  		</thead>
				  		<tbody>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo1">
				                     <label for="checkLogo1" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>
				  					<img src="/img/sub/ex_logo.png" alt="">
				  				</td>
				  				<td>Operator 01</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo2">
				                     <label for="checkLogo2" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>
				  					<img src="/img/sub/ex_logo.png" alt="">
				  				</td>
				  				<td>Operator 02</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo3">
				                     <label for="checkLogo3" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>
				  					<img src="/img/sub/ex_logo.png" alt="">
				  				</td>
				  				<td>Operator 03</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo4">
				                     <label for="checkLogo4" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>
				  					<img src="/img/sub/ex_logo.png" alt="">
				  				</td>
				  				<td>Operator 04</td>
				  			</tr>
				  		</tbody>
				  	</table>
				  </div>
				  <div class="footer_table_btn">
				  	<a href="" class="btn">Cancel</a>
				  	<a href="" class="btn">Complete</a>
				  </div>
			  </div>
	  
			<a href="#none" class="layer-close">
				<span class="sr-only">close layer popup</span>
				<i class="xi-close"></i>
			</a>
		</div>
	</div>
	<!-- //layerpopup -->
	
<jsp:include page="include/footer.jsp"></jsp:include>