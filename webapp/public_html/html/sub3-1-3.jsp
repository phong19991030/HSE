<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 재고관리 -->
	<div class="container">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Inventory Management</span>
				<span class="version">004_HV_001_</span>
			</h2>
			<ul class="location">
				<li>Asset Management</li>
				<li>Parts</li>
				<li class="bold">Inventory Management</li>
			</ul>
		</div>
		<div class="search-form-wrap">
			<ul class="tab3">
		      <li class="active">
		        <a href="#" class="popup-btn">
		          <span>Total 11</span>
		        </a>
		      </li>
		      <li>
		        <a href="#">
		          <span>Unused 5</span>
		        </a>
		      </li>
		      <li>
		        <a href="#">
		          <span>Usage Plan 1</span>
		        </a>
		      </li>
		      <li>
		        <a href="#">
		          <span>In Use 3</span>
		        </a>
		      </li>
		      <li>
		        <a href="#">
		          <span>Disposal 2</span>
		        </a>
		      </li>
		    </ul>
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
				<caption>Inventory Management - No, State, Detail Code Number, Category, Purchase Date, Purchase Price, Durability</caption>
				<colgroup>
					<col style="width:5%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:15%">
					<col style="width:20%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">State</th>
						<th scope="col">Detail Code Number</th>
						<th scope="col">Category</th>
						<th scope="col">Purchase Date</th>
						<th scope="col">Purchase Price</th>
						<th scope="col">Durability</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>10</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>9</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>8</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>7</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>6</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>5</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
					</tr>
					<tr>
						<td>1</td>
						<td>Unused</td>
						<td>004_HV_001_00a</td>
						<td>SK cable</td>
						<td>2018.12.12</td>
						<td>250,000</td>
						<td>2025.12.11 (1,844 Days left)</td>
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
       
       <div class="btns">
			<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
			<!-- <a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a> -->
		</div>
		
	</div>
	<!--//재고관리-->

<jsp:include page="include/footer.jsp"></jsp:include>