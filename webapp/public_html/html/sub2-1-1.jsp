<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 알림관리 -->
	<div class="container">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Alarm management</span>
				<span class="version">V47</span>
			</h2>
			<ul class="location">
				<li>O&amp;M</li>
				<li>Alarm management</li>
				<li>HANGWON</li>
				<li>Group01</li>
				<li class="bold">V47</li>
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
		<!-- 켄도 테이블 사용시 -->
		<!-- <div class="mark-info-lst txt-right">
			<span class="mark mark3">Alarm</span>
			<span class="mark mark2">Planning</span>
			<span class="mark mark4">Operating</span>
			<span class="mark mark1">Complete</span>
			<span class="mark mark5">SCADA error</span>
		</div> -->
		<!-- //켄도 테이블 사용시 -->
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
						<td>10</td>
						<td>
							<span class="process-mark process-mark1">
								<i class="xi-check-circle"></i>
								<span class="sr-only">Complete</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td><div class="subject">If the error the turbine has stopped with has reset before the.If the error the turbine has stopped with has reset before theIf the error the turbine has stopped with has reset before theIf the error the turbine has stopped with has reset before theIf the error the turbine has stopped with has reset before the</div></td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>9</td>
						<td>
							<span class="process-mark process-mark1">
								<i class="xi-check-circle"></i>
								<span class="sr-only">Complete</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>8</td>
						<td>
							<span class="process-mark process-mark1">
								<i class="xi-check-circle"></i>
								<span class="sr-only">Complete</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>7</td>
						<td>
							<span class="process-mark process-mark1">
								<i class="xi-check-circle"></i>
								<span class="sr-only">Complete</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>6</td>
						<td>
							<span class="process-mark process-mark1">
								<i class="xi-check-circle"></i>
								<span class="sr-only">Complete</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>5</td>
						<td>
							<span class="process-mark process-mark2">
								<i class="xi-library-books"></i>
								<span class="sr-only">Planning</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>
							<span class="process-mark process-mark3">
								<i class="xi-error"></i>
								<span class="sr-only">Alarm</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>
							<span class="process-mark process-mark4">
								<i class="xi-wrench"></i>
								<span class="sr-only">Operating</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>
							<span class="process-mark process-mark4">
								<i class="xi-wrench"></i>
								<span class="sr-only">Operating</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
					<tr>
						<td>1</td>
						<td>
							<span class="process-mark process-mark5">
								<i class="xi-error"></i>
								<span class="sr-only">SCADA error</span>
							</span>
						</td>
						<td>2019.10.02 12:12:12 </td>
						<td>20</td>
						<td>Turbine OK</td>
						<td>If the error the turbine has stopped with has reset before the....</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		 
		
		<div class="mark-info-lst">
			<span class="mark mark3">Alarm</span>
			<span class="mark mark2">Planning</span>
			<span class="mark mark4">Operating</span>
			<span class="mark mark1">Complete</span>
			<span class="mark mark5">SCADA error</span>
		</div>

		<div class="pager">
			<a href="" class="arr prev">prev</a>
			<a href="" title="1페이지" class="active">1</a>
			<a href="" title="2페이지">2</a>
			<a href="" title="3페이지">3</a>
			<a href="" title="4페이지">4</a>
			<a href="" class="arr next">Next</a>
		</div>
	</div>
	<!--//알림관리-->

<jsp:include page="include/footer.jsp"></jsp:include>