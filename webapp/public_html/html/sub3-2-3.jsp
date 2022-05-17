<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 장바구니 -->
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
			<li class="step step2">
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
				<caption>Request - No, arget WTG, Part Number, Category, Stock, Required Stock</caption>
				<colgroup>
					<col style="width:5%">
					<col style="width:5%">
					<col style="width:30%">
					<col style="width:15%">
					<col style="width:20%">
					<col style="width:10%">
					<col style="width:10%">
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
						<th scope="col">Target WTG</th>
						<th scope="col">Part Number</th>
						<th scope="col">Category</th>
						<th scope="col">Stock</th>
						<th scope="col">Required Stock</th>
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
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>9</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>8</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>7</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>6</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>5</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>4</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>3</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>2</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
					</tr>
					<tr>
						<td>
							<div class="checkbox-radio-custom">
		                     <input type="checkbox" class="checkbox" id="checkLogo1">
		                     <label for="checkLogo1" class="sr-only"></label>
		                   </div>
						</td>
						<td>1</td>
						<td>Windfarm > Group1 > V47</td>
						<td>004</td>
						<td>Main Cable</td>
						<td>
							<strong class="point2">2</strong>
						</td>
						<td>3</td>
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
		
		<div class="apply-btn-wrap">
			<div class="add-cart">
				<span class="cart-num">01</span>
			</div>
			<a href="" class="btn-style btn-style4">Add</a>
		</div>
		
		<div class="btns">
			<a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a>
		</div>
	</div>
	<!--//장바구니-->
	
	<!-- layerpopup -->
	<div id="layerPopup" class="layer-popup-basket active">
		<div class="layer-cont">
			<div class="tit-wrap">
				<strong class="heading6">Basket</strong>
			</div>
			  
			  <div class="btn-table">
			  	<div class="base_grid_table">
				  	<table>
				  		<caption>Basket - No, Target WTG, Part Number, Category, Stock, Required Stock</caption>
				  		<thead>
				  			<tr>
				  				<th scope="col">NO.</th>
				  				<th scope="col">Target WTG</th>
				  				<th scope="col">Part Number</th>
				  				<th scope="col">Category</th>
				  				<th scope="col">Stock</th>
				  				<th scope="col">Required Stock</th>
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
				  				<td>Windfarm > Group1 > V47</td>
				  				<td>004</td>
				  				<td>Main Cable</td>
				  				<td><strong class="point2">2</strong></td>
				  				<td>3</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo2">
				                     <label for="checkLogo2" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>9</td>
				  				<td>Windfarm > Group1 > V47</td>
				  				<td>004</td>
				  				<td>Main Cable</td>
				  				<td><strong class="point2">2</strong></td>
				  				<td>3</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo3">
				                     <label for="checkLogo3" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>8</td>
				  				<td>Windfarm > Group1 > V47</td>
				  				<td>004</td>
				  				<td>Main Cable</td>
				  				<td><strong class="point2">2</strong></td>
				  				<td>3</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo4">
				                     <label for="checkLogo4" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>7</td>
				  				<td>Windfarm > Group1 > V47</td>
				  				<td>004</td>
				  				<td>Main Cable</td>
				  				<td><strong class="point2">2</strong></td>
				  				<td>3</td>
				  			</tr>
				  			<tr>
				  				<td>
				  					<div class="checkbox-radio-custom">
				                     <input type="checkbox" class="checkbox" id="checkLogo5">
				                     <label for="checkLogo5" class="sr-only"></label>
				                   </div>
				  				</td>
				  				<td>6</td>
				  				<td>Windfarm > Group1 > V47</td>
				  				<td>004</td>
				  				<td>Main Cable</td>
				  				<td><strong class="point2">2</strong></td>
				  				<td>3</td>
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
				
				
				  <div class="footer_table_btn">
				  	<a href="" class="btn">Delete</a>
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