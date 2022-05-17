<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

	<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 블레이드 점검보고서 작성 -->
	<div class="container onm-wrap2">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Blade Inspection</span>
				<span class="version">V47</span>
			</h2>
			<ul class="location">
				<li>O&amp;M</li>
				<li>Blade Inspection</li>
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
				<h3 class="heading4">Working time &amp; Weather</h3>
				<div class="search-form-wrap search-form-wrap2">
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
	
					<button class="btn-style btn-style4">Blade Viewer</button>
				</div>
	
				<div class="base_grid_table">
					<table>
						<caption>Working time &amp; Weather - NO, Maintenance code, Damage area, Distance(m) from Root, Damage Maintenance Plan, Process, Attachment</caption>
						<colgroup>
							<col style="width:10%">
							<col style="width:13%">
							<col style="width:13%">
							<col style="width:13%">
							<col style="width:25%">
							<col style="width:13%">
							<col style="width:13%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">NO.</th>
								<th scope="col">Maintenance code</th>
								<th scope="col">Damage area</th>
								<th scope="col">Distance(m)<span class="add-txt">from Root</span></th>
								<th scope="col">Damage Maintenance Plan</th>
								<th scope="col">Process</th>
								<th scope="col">Attachment</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>10</td>
								<td>H-33</td>
								<td>TE</td>
								<td>5.0</td>
								<td>surface paint contamination Performance is not affected, but it is recommended...</td>
								<td>
									<span class="num-mark num-mark1">1</span>
								</td>
								<td>+3</td>
							</tr>
							<tr>
								<td>9</td>
								<td>H-33</td>
								<td>TE</td>
								<td>5.0</td>
								<td>surface paint contamination Performance is not affected, but it is recommended...</td>
								<td>
									<span class="num-mark num-mark2">1</span>
								</td>
								<td>+3</td>
							</tr>
							<tr>
								<td>8</td>
								<td>H-33</td>
								<td>TE</td>
								<td>5.0</td>
								<td>surface paint contamination Performance is not affected, but it is recommended...</td>
								<td>
									<span class="num-mark num-mark3">1</span>
								</td>
								<td>+3</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="apply-btn-wrap">
				<a href="" class="btn-style btn-style1">NEW</a>
			</div>
			</div>
			<div class="system-right">
				<div class="btns">
					<a href="" class="btn-style btn-style1">Save</a>
					<a href="" class="btn-style btn-style2">Cancel</a>
					<a href="" class="btn-style btn-style3">Temporary</a>
					<a href="" class="btn-style btn-style5">Blade Inspection Report</a>
				</div>
			</div>
		</div>
	</div>
	<!-- //블레이드 점검보고서 작성 -->
	
	<!-- layerpopup -->
	<div id="layerPopup" class="layer-popup-blade-inspection layer-popup-blade-inspection2 active">
		<div class="layer-cont">
			<div class="layer-scroll">
				<div class="tit-wrap">
					<strong class="heading6">Blade Viewer</strong>
				</div>
				
				<ul class="blade-info-lst">
					<li>Location : 행원풍력발전단지 행원 8호기</li>
					<li>Model : WinDS3000_3MW</li>
				</ul>
		
				<div class="blade-view-wrap">
					<ul class="tab2">
						<li class="active">
							<a href="#none">
								<span>Blade #1</span>
							</a>
						</li>
						<li>
							<a href="#none">
								<span>Blade #2</span>
							</a>
						</li>
						<li>
							<a href="#none">
								<span>Blade #3</span>
							</a>
						</li>
					</ul>
					<div class="blade-view-form">
						<div class="serverity-view">
							<span class="serverity-img">
								<span class="serverity-mark serverity-mark2" style="top:94px;left:0;">2</span>
								<span class="serverity-mark serverity-mark5" style="top:300px;right:0;">5</span>
								<span class="serverity-mark serverity-mark3" style="top:420px;right:0;">3</span>
								<span class="serverity-mark serverity-mark1" style="bottom:200px;left:0;">1</span>
								<span class="serverity-mark serverity-mark5" style="bottom:0;left:20px;">5</span>
							</span>
							<span class="serverity-info">
								<em>Severity</em>
								<span>1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
							</span>
						</div>
					</div>
					<div class="blade-events">
						<strong class="heading6">Events</strong>
						<div class="base_grid_table">
							<table>
								<caption>Events - NO, Maintenance code, Damage Maintenance Plan, Severity</caption>
								<colgroup>
									<col style="width:10%">
									<col style="width:25%">
									<col style="width:50%">
									<col style="width:15%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">NO.</th>
										<th scope="col">Maintenance code</th>
										<th scope="col">Damage area</th>
										<th scope="col">Severity</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>10</td>
										<td>H-33</td>
										<td>surface paint contamination Performance is not affected, but it is recommended...</td>
										<td>
											<span class="num-mark num-mark1">1</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<div class="base_grid_table">
							<table>
								<caption>Register blade damage - Maintenance code, Rotor diameter, Tower height, Blade type, Blade length, Blade color, Blade color</caption>
								<colgroup>
									<col style="width:20%">
									<col style="width:40%">
									<col style="width:35%">
									<col style="width:5%">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">
											<span class="essential">Maintenance code</span>
										</th>
										<td class="txt-left" colspan="2">TE > SuS</td>
									</tr>
									<tr>
										<th scope="row">
											<span class="essential">Damage range</span>
										</th>
										<td class="txt-left">
											<div class="base_grid_table">
												<table>
													<caption>Damage range - From Root(m), From LE(m)</caption>
													<colgroup>
														<col style="width:50%">
														<col style="width:50%">
													</colgroup>
													<thead>
														<tr>
															<th scope="col">From Root(m)</th>
															<th scope="col">From LE(m)</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<div class="select-box">
																	<label for="severity">-</label>
																	<select name="severity" id="severity" class="info-select">
																		<option value="1">-</option>
																		<option value="2"></option>
																		<option value="3"></option>
																	</select>
																</div>
															</td>
															<td>
																<div class="input-group">
																	<label for="fromLE" class="sr-only">From LE(m)</label>
																	<input type="text" name="fromLE" id="fromLE" placeholder="">
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</td>
										<td class="txt-left">
											<div class="base_grid_table">
												<table>
													<caption>Damage range - horizontal(m), Vertical(m)</caption>
													<colgroup>
														<col style="width:50%">
														<col style="width:50%">
													</colgroup>
													<thead>
														<tr>
															<th scope="col">horizontal(m)</th>
															<th scope="col">Vertical(m)</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<div class="input-group">
																	<label for="horizontalM" class="sr-only">horizontal(m)</label>
																	<input type="text" name="horizontalM" id="horizontalM" placeholder="">
																</div>
															</td>
															<td>
																<div class="input-group">
																	<label for="verticalM" class="sr-only">Vertical(m)</label>
																	<input type="text" name="verticalM" id="verticalM" placeholder="">
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<strong class="heading8">Blade Images</strong>
						<ul class="img-viewer-lst">
							<li>
								<span class="img">
									<img src="/img/sub/ex_blade_sample.png" alt="예시이미지">
									<a href="" class="download-img">
										<i class="xi-download"></i>
										<span class="sr-only">download img</span>
									</a>
								</span>
								<span class="img-info">Figure1. surface paint contamination</span>
								
							</li>
							<li>
								<span class="img">
									<img src="/img/sub/ex_blade_sample2.png" alt="예시이미지">
									<a href="" class="download-img">
										<i class="xi-download"></i>
										<span class="sr-only">download img</span>
									</a>
								</span>
								<span class="img-info">Figure1. surface paint contamination</span>
							</li>
						</ul>
					</div>
					
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