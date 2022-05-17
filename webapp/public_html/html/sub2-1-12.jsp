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
				<h3 class="heading4">Register blade damage</h3>
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
								<td class="txt-left" colspan="3">
									<div class="registration-write btn-input-wrap">
										<div class="input-group select-box">
											<label for="maintenanceCode">-</label>
											<select name="maintenanceCode" id="maintenanceCode" class="info-select">
												<option value="1">-</option>
												<option value="2"></option>
												<option value="3"></option>
											</select>
										</div>
										<button type="button" class="registration-search-btn">Select</button>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="essential">Damage area</span>
								</th>
								<td class="txt-left" colspan="3">
									<div class="registration-write twice-input registration-write-select">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="damageArea1"></label>
												<select name="damageArea1" id="damageArea1" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="damageArea2">-</label>
												<select name="damageArea2" id="damageArea2" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="essential">Severity</span>
								</th>
								<td class="txt-left" colspan="3">
									<div class="registration-write twice-input registration-write-select">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="severity"></label>
												<select name="severity" id="severity" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="essential">Damage</span>
								</th>
								<td class="txt-left" colspan="3">
									<div class="registration-write">
										<div class="input-group">
											<label for="damage" class="sr-only">Blade type</label>
											<input type="text" name="damage" id="damage" placeholder="">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="essential">Maintenance plan</span>
								</th>
								<td class="txt-left" colspan="3">
									<div class="registration-write">
										<div class="input-group">
											<label for="maintenancePlan" class="sr-only">Maintenance plan</label>
											<input type="text" name="maintenancePlan" id="maintenancePlan" placeholder="">
										</div>
									</div>
								</td>
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
								<td>
									<a href="" class="btn-style btn-style4 btn-style-l">
										<i class="xi-search"></i>
										<span class="sr-only">search</span>
									</a>
								</td>
							</tr>
							<tr>
								<th scope="row" rowspan="2">Attachment</th>
								<td class="txt-left" colspan="3">
									<div class="base_grid_table">
										<table>
											<caption>Attachment - NO, Images, Comments</caption>
											<colgroup>
												<col style="width:10%">
												<col style="width:37.5%">
												<col style="width:37.5%">
												<col style="width:15%">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">NO.</th>
													<th scope="col">Images</th>
													<th scope="col">Comments</th>
													<th scope="col"></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td>
														<span class="path-img imgcut">
															<span class="img">
																<img src="/img/sub/login_bg.png" alt="예시이미지">
															</span>
														</span>
													</td>
													<td>
														<div class="registration-write comments">
															<label for="comments" class="sr-only">comments</label>
															<textarea id="comments"></textarea>
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
								</td>
							</tr>
							<tr>
								<td class="txt-left" colspan="3">
									<div class="registration-write btn-input-wrap fake-field-file-wrap">
										<div class="input-group">
											<div class="fake-field-file"></div>
											<input type="file" name="cv-arquivo" id="cv-arquivo" class="field-file">
										</div>
										<label for="cv-arquivo" aria-label="Attach file" class="registration-search-btn">
											<i class="xi-paperclip"></i>
										</label>
									</div>
								</td>
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
				</div>
			</div>
		</div>
	</div>
	<!-- //블레이드 점검보고서 작성 -->
	
	<!-- layerpopup -->
	<div id="layerPopup" class="layer-popup-blade-inspection active">
		<div class="layer-cont">
			<div class="tit-wrap">
				<strong class="heading6">Images Viewer</strong>
			</div>
	
			<ul class="img-viewer-lst">
				<li>
					<img src="/img/sub/ex_blade.png" alt="예시이미지">
					<span class="img-info">Figure1. surface paint contamination</span>
				</li>
				<li>
					<img src="/img/sub/login_bg.png" alt="예시이미지">
					<span class="img-info">Figure1. surface paint contamination</span>
				</li>
			</ul>
	
			<a href="#none" class="layer-close">
				<span class="sr-only">close layer popup</span>
				<i class="xi-close"></i>
			</a>
		</div>
	</div>
	<!-- //layerpopup -->
<jsp:include page="include/footer.jsp"></jsp:include>