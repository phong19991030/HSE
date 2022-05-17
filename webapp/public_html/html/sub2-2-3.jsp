<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 결과작성 -->
		<div class="container onm-wrap2">
			<!-- <div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">WTG Checklist</span>
				</h2>
				<ul class="location">
					<li>O&amp;M</li>
					<li>WTG Checklist</li>
					<li>HANGWON</li>
					<li>Group01</li>
					<li class="bold">V47</li>
				</ul>
			</div> -->

			<!-- <div class="tab-wrap">
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
			</div> -->

			<div class="system-detail-wrap">
				<div class="system-left">
					<div class="tit-wrap">
						<h2 class="heading3">
							<span class="txt">WTG Checklist</span>
						</h2>
						<ul class="location">
							<li>O&amp;M</li>
							<li>WTG Checklist</li>
							<li>HANGWON</li>
							<li>Group01</li>
							<li class="bold">V47</li>
						</ul>
					</div>
					<div class="registration-form registration-form1">
						<h3 class="heading4">Overview</h3>
						<div class="registration-form-lst-wrap registration-form-lst-wrap-full">
							<ul class="registration-form-lst">
								<li>
									<span class="essential">Type</span>
									<div class="registration-write twice-input">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="Type">-</label>
												<select name="Type" id="Type" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</li>
								<li>
									<span class="essential">Report number</span>
									<div class="registration-write">
										<div class="input-group-wrapper">
											<div class="input-group">
												<label for="reportnumber" class="sr-only">Report number</label>
												<input type="text" name="reportnumber" id="reportnumber" placeholder="">
											</div>
										</div>
									</div>
								</li>
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
									<div class="registration-write twice-input registration-write-select registration-write-three">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="writer1"></label>
												<select name="writer1" id="writer1" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="writer2"></label>
												<select name="writer2" id="writer2" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="writer2"></label>
												<select name="writer2" id="writer2" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</li>
								<li>
									<span class="essential">Operator</span>
									<div class="registration-write twice-input">
										<div class="input-group-wrapper">
											<div class="input-group">
												<label for="operatorKor" class="sr-only">Operator korean</label>
												<input type="text" name="operatorKor" id="operatorKor" placeholder="">
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="input-group">
												<label for="operatorEng" class="sr-only">Operator english</label>
												<input type="text" name="operatorEng" id="operatorEng" placeholder="">
											</div>
										</div>
									</div>
								</li>
								<li>
									<span class="essential">Down time</span>
									<div class="registration-write">
										<div class="calendar-picker">
											<div class="calendar-wrap">
												<div class="input-group">
													<label for="downTime1" class="sr-only"></label>
													<input type="text" id="downTime1" name="downTime" value="">
													<button class="calendar-picker-btn">
														<i class="xi-calendar"></i>
													</button>
												</div>
												<em class="hyphen">
													<span class="sr-only">-</span>
												</em>
												<div class="input-group">
													<label for="downTime2" class="sr-only"></label>
													<input type="text" id="downTime2" name="downTime" value="">
													<button class="calendar-picker-btn">
														<i class="xi-calendar"></i>
													</button>
												</div>
											</div>
										</div>
										<span class="total-hour point2">912h</span>
									</div>
								</li>
								<li>
									<span class="essential">Working time</span>
									<div class="registration-write">
										<div class="calendar-picker">
											<div class="calendar-wrap">
												<div class="input-group">
													<label for="workingtime1" class="sr-only"></label>
													<input type="text" id="workingtime1" name="workingtime1" value="">
													<button class="calendar-picker-btn">
														<i class="xi-calendar"></i>
													</button>
												</div>
												<em class="hyphen">
													<span class="sr-only">-</span>
												</em>
												<div class="input-group">
													<label for="workingtime2" class="sr-only"></label>
													<input type="text" id="workingtime2" name="workingtime2" value="">
													<button class="calendar-picker-btn">
														<i class="xi-calendar"></i>
													</button>
												</div>
											</div>
										</div>
										<span class="total-hour">912h</span>
									</div>
								</li>
								<li>
					              <span class="essential">Worker</span>
					              <div class="registration-write btn-input-wrap">
					                <div class="input-group">
					                  <label for="Worker" class="sr-only">Worker</label>
					                  <input type="text" name="Worker" id="Worker" placeholder="">
					                </div>
					                <button type="button" class="registration-search-btn popup-btn">Select</button>
					              </div>
					            </li>
								<li>
									<span class="essential">Writer</span>
									<div class="registration-write twice-input">
										<div class="input-group-wrapper">
											<div class="input-group">
												<label for="operatorKor" class="sr-only">Operator korean</label>
												<input type="text" name="operatorKor" id="operatorKor" placeholder="ex)홍길동">
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="input-group">
												<label for="operatorEng" class="sr-only">Operator english</label>
												<input type="text" name="operatorEng" id="operatorEng" placeholder="ex)Hong GilDong">
											</div>
										</div>
									</div>
								</li>
							</ul>
	
						</div>
	
						<h3 class="heading4">Procedure</h3>
						<strong class="heading8">Safety
							<span class="active-toggle-wrap">
								<input type="checkbox" id="activeToggle1" name="" value="" class="sr-only">
								<label for="activeToggle1"><span class="sr-only">Activation</span></label>
							</span >
						</strong>
						<div class="base_grid_table">
							<table>
								<caption>Safety - Safety</caption>
								<colgroup>
									<col style="width:20%">
									<col style="width:80%">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">
											<span class="essential">Safety</span>
										</th>
										<td class="txt-left note">
											<div class="registration-write">
												<label for="issues" class="sr-only">issues</label>
												<textarea id="issues"></textarea>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
	
						<strong class="heading8">Overview
							<span class="active-toggle-wrap">
								<input type="checkbox" id="activeToggle2" name="" value="" class="sr-only">
								<label for="activeToggle2"><span class="sr-only">Activation</span></label>
							</span>
						</strong>
						<div class="base_grid_table">
							<table>
								<caption>Overview - Overview</caption>
								<colgroup>
									<col style="width:20%">
									<col style="width:80%">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">
											<span class="essential">Purpose</span>
										</th>
										<td class="txt-left note">
											<div class="registration-write">
												<label for="issues" class="sr-only">issues</label>
												<textarea id="issues"></textarea>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
	
						<strong class="heading8">Emergency Rescue Equipment
							<span class="active-toggle-wrap">
								<input type="checkbox" id="activeToggle3" name="" value="" class="sr-only">
								<label for="activeToggle3"><span class="sr-only">Activation</span></label>
							</span >
						</strong>
						<div class="base_grid_table">
							<table>
								<caption>Emergency Rescue Equipment - No, Inspection item, Results, Remark</caption>
								<colgroup>
									<col style="width:10%">
									<col style="width:15%">
									<col style="width:30%">
									<col style="width:30%">
									<col style="width:15%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">No.</th>
										<th scope="col">Inspection item</th>
										<th scope="col"></th>
										<th scope="col">Results</th>
										<th scope="col">Remark</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>4.1</td>
										<td>Flange</td>
										<td>Check condition and deformation</td>
										<td>
											<ul class="checkbox-radio-custom">
												<li>
													<input type="checkbox" class="checkbox" id="resultsCheck1">
								                     <label for="resultsCheck1">Normal</label>
												</li>
												<li>
													<input type="checkbox" class="checkbox" id="resultsCheck2">
								                     <label for="resultsCheck2">Abnormal</label>
												</li>
												<!-- 라디오버튼일 경우 -->
											</ul>
										</td>
										<td>
											<div class="input-group">
							                  <label for="Worker" class="sr-only">Worker</label>
							                  <input type="text" name="Worker" id="Worker" placeholder="">
							                </div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
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
		<!-- //결과작성 -->
<jsp:include page="include/footer.jsp"></jsp:include>