<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 플래닝 -->
	<div class="container onm-wrap2">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Planning</span>
				<span class="version">V47</span>
			</h2>
			<ul class="location">
				<li>O&amp;M</li>
				<li>Planning</li>
				<li>HANGWON</li>
				<li>Group01</li>
				<li class="bold">V47</li>
			</ul>
		</div>

		<div class="tab-wrap">
			<ul class="tab1">
				<li class="step step1 ov">
					<a href="#">
						<strong>1</strong>
						<span>Event &amp; Suggestion</span>
					</a>
				</li>
				<li class="step step2 ov">
					<a href="#">
						<strong>2</strong>
						<span>Plan</span>
					</a>
				</li>
				<li class="step step3 ov">
					<a href="#">
						<strong>3</strong>
						<span>Result</span>
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
		</div>

		<div class="system-detail-wrap">
			<div class="system-left">
				<h3 class="heading4">Summary</h3>
				<div class="registration-form-lst-wrap registration-form-lst-wrap-full">
					<ul class="registration-form-lst">
						<li>
							<span class="essential">Report name</span>
							<div class="registration-write twice-input">
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="reportName1" class="sr-only">Report name</label>
										<input type="text" name="reportName1" id="reportName1" placeholder="">
									</div>
								</div>
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="reportName2" class="sr-only">WTG</label>
										<input type="text" name="reportName2" id="reportName2" placeholder="">
									</div>
								</div>
							</div>
						</li>
						<li>
							<span class="essential">WTG name</span>
							<div class="registration-write">
								<ul class="registration-result">
									<li>행원8호기 V47</li>
									<li>WTG 8</li>
								</ul>
							</div>
						</li>
						<li>
							<span class="essential">Operator</span>
							<div class="registration-write">
								<ul class="registration-result">
									<li>제주에너지공사</li>
									<li>Jeju Energy Corporation</li>
								</ul>
							</div>
						</li>
						<li>
							<span class="essential">Estimated downtime</span>
							<div class="registration-write">
								<div class="calendar-picker">
									<div class="calendar-wrap">
										<div class="input-group">
											<label for="noticeCalendarPrev" class="sr-only"></label>
											<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
											<button class="calendar-picker-btn">
												<i class="xi-calendar"></i>
											</button>
										</div>
										<em class="hyphen">
											<span class="sr-only">-</span>
										</em>
										<div class="input-group">
											<label for="noticeCalendarNext" class="sr-only"></label>
											<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
											<button class="calendar-picker-btn">
												<i class="xi-calendar"></i>
											</button>
										</div>
									</div>
								</div>
								<span class="total-hour">912h</span>
							</div>
						</li>
					</ul>

				</div>

				<h3 class="heading4">Schedule</h3>
				<strong class="heading8">Part</strong>
				<div class="base_grid_table">
					<table>
						<caption>Part - Product Name, Qty, Cost, Inventory Status, Preparation Time</caption>
						<colgroup>
							<col style="width:20%">
							<col style="width:5%">
							<col style="width:10%">
							<col style="width:25%">
							<col style="width:30%">
							<col style="width:10%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Product Name</th>
								<th scope="col">Qty</th>
								<th scope="col">Cost</th>
								<th scope="col">Inventory Status</th>
								<th scope="col">Preparation Time</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Texaco Rando WM 32 LT</td>
								<td>1</td>
								<td>60,000</td>
								<td><span class="stock stock1">In Stock</span></td>
								<td>
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="noticeCalendarPrev" class="sr-only"></label>
												<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="noticeCalendarNext" class="sr-only"></label>
												<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
							<tr>
								<td>Omala</td>
								<td>1</td>
								<td>60,000</td>
								<td><span class="stock stock2">Out of Stock </span><span class="stock-info">[Purchase Request]</span></td>
								<td>
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="noticeCalendarPrev" class="sr-only"></label>
												<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="noticeCalendarNext" class="sr-only"></label>
												<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="more-btn-wrap">
					<a href="" class="more popup-btn">
						<span class="sr-only">more details</span>
						<i class="xi-plus-circle"></i>
					</a>
				</div>

				<strong class="heading8">Tools</strong>
				<div class="base_grid_table">
					<table>
						<caption>Part - Product Name, Qty, Cost, Inventory Status, Preparation Time</caption>
						<colgroup>
							<col style="width:20%">
							<col style="width:5%">
							<col style="width:10%">
							<col style="width:25%">
							<col style="width:30%">
							<col style="width:10%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Product Name</th>
								<th scope="col">Qty</th>
								<th scope="col">Cost</th>
								<th scope="col">Inventory Status</th>
								<th scope="col">Preparation Time</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Texaco Rando WM 32 LT</td>
								<td>1</td>
								<td>60,000</td>
								<td><span class="stock stock1">In Stock</span></td>
								<td>
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="noticeCalendarPrev" class="sr-only"></label>
												<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="noticeCalendarNext" class="sr-only"></label>
												<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
							<tr>
								<td>Omala</td>
								<td>1</td>
								<td>60,000</td>
								<td><span class="stock stock2">Out of Stock </span><span class="stock-info">[Purchase Request]</span></td>
								<td>
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="noticeCalendarPrev" class="sr-only"></label>
												<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="noticeCalendarNext" class="sr-only"></label>
												<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
							<tr>
								<td>Texaco Rando WM 32 LT</td>
								<td>1</td>
								<td>60,000</td>
								<td><span class="stock stock1">In Stock</span></td>
								<td>
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="noticeCalendarPrev" class="sr-only"></label>
												<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="noticeCalendarNext" class="sr-only"></label>
												<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
							<tr>
								<td>Texaco Rando WM 32 LT</td>
								<td>1</td>
								<td>60,000</td>
								<td><span class="stock stock1">In Stock</span></td>
								<td>
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="noticeCalendarPrev" class="sr-only"></label>
												<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="noticeCalendarNext" class="sr-only"></label>
												<input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="more-btn-wrap">
					<a href="" class="more">
						<span class="sr-only">more details</span>
						<i class="xi-plus-circle"></i>
					</a>
				</div>

				<strong class="heading8">Operation Schedule</strong>
				<div class="base_grid_table">
					<table>
						<caption>Operation Schedule - Work, Details, Period, Worker, Cost</caption>
						<colgroup>
							<col style="width:15%">
							<col style="width:10%">
							<col style="width:30%">
							<col style="width:20%">
							<col style="width:15%">
							<col style="width:10%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Work</th>
								<th scope="col">Details</th>
								<th scope="col">Period</th>
								<th scope="col">Worker</th>
								<th scope="col">Cost</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Blade repair</td>
								<td>Replace.</td>
								<td>2019.09.01 09:00 ~ 2019.09.01 15:00</td>
								<td>Admin01, Admin02, Admin03</td>
								<td>2,200,000</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
							<tr>
								<td>Repair blade sensor</td>
								<td>Replace.</td>
								<td>2019.09.01 09:00 ~ 2019.09.01 15:00</td>
								<td>Admin01, Admin02, Admin03</td>
								<td>
									<a href="" class="detail-btn">
										<i class="xi-search"></i>
									</a>
								</td>
								<td>
									<a href="#" class="delete-btn">
										<i class="xi-trash"></i>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="more-btn-wrap">
					<a href="" class="more">
						<span class="sr-only">more details</span>
						<i class="xi-plus-circle"></i>
					</a>
				</div>
			</div>
			<div class="system-right">
				<div class="btns">
					<a href="" class="btn-style btn-style1">Save</a>
					<a href="" class="btn-style btn-style2">Cancel</a>
					<a href="" class="btn-style btn-style3">Temporary</a>
				</div>
			</div>
		</div>

	</div>
	<!-- //플래닝 -->
	
	<!-- layerpopup -->
	<div id="layerPopup" class="layer-popup-planing active">
		<div class="layer-cont">
			<div class="tit-wrap">
				<strong class="heading6">Parts</strong>
			</div>
			<div class="category-wrap">
				<span class="category-name">Part Number</span>
				<div class="select-box">
					<label for="partNumber"></label>
					<select name="partNumber" id="partNumber" class="info-select">
						<option value="1">004</option>
						<option value="2"></option>
						<option value="3"></option>
					</select>
				</div>
			</div>
	
			<div class="category-wrap">
				<span class="category-name">Category</span>
				<span class="category-cont">Main Cable</span>
			</div>
	
			<div class="category-wrap">
				<span class="category-name">Detail Name</span>
				<div class="select-box">
					<label for="hvCable"></label>
					<select name="hvCable" id="hvCable" class="info-select">
						<option value="1">HV Cable</option>
						<option value="2"></option>
						<option value="3"></option>
					</select>
				</div>
			</div>
	
			<div class="category-wrap">
				<span class="category-name">Product Name</span>
				<div class="select-box">
					<label for="productName"></label>
					<select name="productName" id="productName" class="info-select">
						<option value="1">SK Cable</option>
						<option value="2"></option>
						<option value="3"></option>
					</select>
				</div>
				<div class="icon-wrap">
					<span>
						<i class="xi-profile-o"></i>
							<em class="tooltip">
							추후에 텍스트
							</em>
					</span>
					<span>
						<i class="xi-profile-o"></i>
							<em class="tooltip">
							2줄또는
							</em>
					</span>
						<span>
						<i class="xi-profile-o"></i>
							<em class="tooltip">
							3줄이 될수있음
							</em>
					</span>
				</div>
				
			</div>
	
			<div class="btns txt-right">
				<a href="" class="btn-style btn-style4">Cancel</a>
				<a href="" class="btn-style btn-style4">Complete</a>
			</div>
	
			<a href="#none" class="layer-close">
				<span class="sr-only">close layer popup</span>
				<i class="xi-close"></i>
			</a>
		</div>
	</div>
	<!-- //layerpopup -->
<jsp:include page="include/footer.jsp"></jsp:include>