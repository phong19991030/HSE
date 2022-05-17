<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 견적요청_거래처 리스트 -->
	<div class="container">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Request</span>
			</h2>
			<ul class="location">
				<li>Asset Management</li>
				<li class="bold">Request</li>
			</ul>
		</div>
		
		<ul class="tab1">
			<li class="step step1 ov">
				<a href="#">
					<strong>1</strong>
					<span>Parts List</span>
				</a>
			</li>
			<li class="step step2 ov">
				<a href="#">
					<strong>2</strong>
					<span>Account List</span>
				</a>
			</li>
			<li class="step step3">
				<a href="#">
					<strong>3</strong>
					<span>Write Mail</span>
				</a>
			</li>
			<li class="step step4 check-btn">
				<a href="#">
					<strong>
						<span class="sr-only">completed</span>
						<i class="xi-check-circle-o"></i>
					</strong>
				</a>
			</li>
		</ul>
		
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
							<span class="detail-search-keyword">Process</span>
							<div class="select-box">
								<label for="search_type"></label>
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
							<span class="detail-search-keyword">Alarm code</span>
							<div class="input-group">
								<label for="alarmCode" class="sr-only">alarmCode</label>
								<input type="text" id="alarmCode" name="alarmCode" value="">
							</div>
						</li>
						<li>
							<span class="detail-search-keyword">Text</span>
							<div class="input-group">
								<label for="searchText" class="sr-only">searchText</label>
								<input type="text" id="searchText" name="searchText" value="">
							</div>
						</li>
					</ul>
					<button class="search-btn">search</button>
				</div>
			</div>

			<div class="total-wrap">
				<span class="num">Total <strong>1,211</strong></span>
				<div class="select-box">
					<label for="search_type"></label>
					<select name="search_type" id="search_type" class="info-select">
						<option value="1" selected="selected">10</option>
						<option value="2">20</option>
						<option value="3">30</option>
					</select>
				</div>
			</div>
		</div>
		<div class="base_grid_table btn-table">
			<table>
				<caption>Request - No, Account, Account Code, Business Registration Number, Contact</caption>
				<colgroup>
					<col style="width:10%">
					<col style="width:10%">
					<col style="width:20%">
					<col style="width:20%">
					<col style="width:20%">
					<col style="width:20%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</th>
						<th scope="col">No.</th>
						<th scope="col">Account</th>
						<th scope="col">Account Code</th>
						<th scope="col">Business Registration Number</th>
						<th scope="col">Contact</th>
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
						<td>10</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>9</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>8</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>7</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>6</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>5</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>4</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>3</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>2</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>1</td>
						<td>ABB</td>
						<td>VE-01</td>
						<td>302-11-11111</td>
						<td>HongGilDong (abb@abb.com)</td>
					</tr>
				</tbody>
			</table>
			<div class="pager">
				<a href="" class="arr prev">prev</a>
				<a href="" title="1페이지" class="active">1</a>
				<a href="" title="2페이지">2</a>
				<a href="" title="3페이지">3</a>
				<a href="" title="4페이지">4</a>
				<a href="" class="arr next">Next</a>
			</div>
			
		</div>
		<div class="btns">
			<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
			<a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a>
		</div>

		
	</div>
	<!--//견적요청_거래처 리스트-->

<jsp:include page="include/footer.jsp"></jsp:include>