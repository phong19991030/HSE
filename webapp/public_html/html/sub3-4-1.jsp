<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 부품관리 -->
	<div class="container">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Expert Pool</span>
			</h2>
			<ul class="location">
				<li>Asset Management</li>
				<li class="bold">Expert Pool</li>
			</ul>
		</div>
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
				<caption>Expert Pool - No, Company, Name, Contact, Skill, Participation Count, Date</caption>
				<colgroup>
					<col style="width:5%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:20%">
					<col style="width:15%">
					<col style="width:15%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">Company</th>
						<th scope="col">Name</th>
						<th scope="col">Contact</th>
						<th scope="col">Skill</th>
						<th scope="col">Participation Count</th>
						<th scope="col">Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>10</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>9</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>8</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>7</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>6</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>5</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>4</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>3</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>2</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
					</tr>
					<tr>
						<td>1</td>
						<td>VESTAS</td>
						<td>HongGilDong</td>
						<td>010-1234-5678 <br>hong@ace.com</td>
						<td>Gearbox Replacement/td>
						<td>
							<span class="participation-count">3</span>
						</td>
						<td>2020.02.27 11:06</td>
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
			
			<div class="footer_table_btn">
	        	<a href="" class="btn-style btn-style1">Register</a>
	        </div>
		</div>

		
	</div>
	<!--//부품관리-->

<jsp:include page="include/footer.jsp"></jsp:include>