<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 결과작성 -->
		<div class="container onm-wrap2">
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">WTG Inspection</span>
					<span class="version">V47</span>
				</h2>
				<ul class="location">
					<li>O&amp;M</li>
					<li>WTG Inspection</li>
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
					<h3 class="heading4">Overview</h3>
					<div class="registration-form-lst-wrap registration-form-lst-wrap-full">
						<ul class="registration-form-lst">
							<li>
								<span class="essential">Type</span>
								<div class="registration-write twice-input">
									<div class="select-box">
										<label for="InspectionType"></label>
										<select name="InspectionType" id="InspectionType" class="info-select">
											<option value="1">WTG Inspection-</option>
											<option value="2"></option>
											<option value="3"></option>
										</select>
									</div>
								</div>
							</li>
							<li>
								<span>Report number</span>
								<div class="registration-write">
									<ul class="registration-result">
										<li>Report 20190821_01</li>
									</ul>
								</div>
							</li>
							<li>
								<span class="essential">Report name</span>
								<div class="registration-write">
									<ul class="registration-result">
										<li>행원풍력발전단지 유지보수 용역</li>
										<li>Maintenance for Hangwon Wind Farm</li>
									</ul>
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
								<span class="essential">Down time</span>
								<div class="registration-write">
									<ul class="registration-result">
										<li>2019.09.01 00:00 ~ 2019.09.07 12:00</li>
										<li>912h</li>
									</ul>
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
								<span class="essential">Down time</span>
								<div class="registration-write">
									<ul class="registration-result">
										<li>2019.09.01 00:00 ~ 2019.09.07 12:00</li>
									</ul>
									<span class="total-hour">912h</span>
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
								<span class="essential">Workers</span>
								<div class="registration-write twice-input registration-write-three registration-write-select control-write-select">
									<div class="input-group-wrapper">
										<div class="select-box">
											<label for="Workers1"></label>
											<select name="Workers1" id="Workers1" class="info-select">
												<option value="1">-</option>
												<option value="2"></option>
												<option value="3"></option>
											</select>
										</div>
									</div>
									<div class="input-group-wrapper">
										<div class="select-box">
											<label for="Workers2"></label>
											<select name="Workers2" id="Workers2" class="info-select">
												<option value="1">-</option>
												<option value="2"></option>
												<option value="3"></option>
											</select>
										</div>
										<a href="" class="delet-select-box">
											<i class="xi-close"></i>
										</a>
									</div>
									<div class="input-group-wrapper">
										<div class="select-box">
											<label for="writer3"></label>
											<select name="writer3" id="Workers3" class="info-select">
												<option value="1">-</option>
												<option value="2"></option>
												<option value="3"></option>
											</select>
										</div>
										<a href="" class="delet-select-box">
											<i class="xi-close"></i>
										</a>
									</div>
									
									<a href="" class="add-select-box">
										<i class="xi-plus-square"></i>
									</a>
								</div>
							</li>
							<li>
								<span class="essential">Writer</span>
								<div class="registration-write">
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="Writer" class="sr-only">Writer</label>
											<input type="text" name="Writer" id="Writer" placeholder="">
										</div>
									</div>
								</div>
							</li>
							<li>
								<span>Tag</span>
								<div class="registration-write">
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="Tag" class="sr-only">Tag</label>
											<input type="text" name="Tag" id="Tag" placeholder="">
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
							<caption>Safety - Safety, Attachment</caption>
							<colgroup>
								<col style="width:20%">
								<col style="width:80%">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">
										<span class="essential">Issues</span>
									</th>
									<td class="txt-left note">
										<div class="registration-write">
											<label for="issues" class="sr-only">issues</label>
											<textarea id="issues"></textarea>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">Attachment</th>
									<td class="txt-left">
										<ul class="path-file">
											<li>
												<span class="path-fiie-detail">
													<strong class="file-name">Figure1.jpg(104KB)</strong>
													<strong class="file-info">Yaw system grease nipple breakage</strong>
													<em class="file-time">2019.08.12 12:12:12</em>
												</span>
												<span class="path-fiie-etc">
													<a href="#" class="delete-btn">
														<i class="xi-trash"></i>
													</a>
													<a href="" class="detail-btn">
														<i class="xi-search"></i>
													</a>
												</span>
											</li>
											<li>
												<span class="path-fiie-detail">
													<strong class="file-name">Figure1.jpg(104KB)</strong>
													<strong class="file-info">
														<span class="input-group">
															<label for="fileInfo" class="sr-only"></label>
															<input type="text" name="fileInfo" id="fileInfo" placeholder="">
														</span>
													</strong>
													<em class="file-time">2019.08.12 12:12:12</em>
												</span>
												<span class="path-fiie-etc">
													<a href="#" class="delete-btn">
														<i class="xi-trash"></i>
													</a>
													<a href="" class="detail-btn">
														<i class="xi-search"></i>
													</a>
												</span>
											</li>
										</ul>

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

					<strong class="heading8">Purpose
						<span class="active-toggle-wrap">
							<input type="checkbox" id="activeToggle2" name="" value="" class="sr-only">
							<label for="activeToggle2"><span class="sr-only">Activation</span></label>
						</span>
					</strong>
					<div class="base_grid_table">
						<table>
							<caption>Purpose - Purpose, Attachment</caption>
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
								<tr>
									<th scope="row">Attachment</th>
									<td class="txt-left">
										<ul class="path-file">
											<li>
												<span class="path-fiie-detail">
													<strong class="file-name">Figure1.jpg(104KB)</strong>
													<strong class="file-info">Yaw system grease nipple breakage</strong>
													<em class="file-time">2019.08.12 12:12:12</em>
												</span>
												<span class="path-fiie-etc">
													<a href="#" class="delete-btn">
														<i class="xi-trash"></i>
													</a>
													<a href="" class="detail-btn">
														<i class="xi-search"></i>
													</a>
												</span>
											</li>
											<li>
												<span class="path-fiie-detail">
													<strong class="file-name">Figure1.jpg(104KB)</strong>
													<strong class="file-info">
														<span class="input-group">
															<label for="fileInfo" class="sr-only"></label>
															<input type="text" name="fileInfo" id="fileInfo" placeholder="">
														</span>
													</strong>
													<em class="file-time">2019.08.12 12:12:12</em>
												</span>
												<span class="path-fiie-etc">
													<a href="#" class="delete-btn">
														<i class="xi-trash"></i>
													</a>
													<a href="" class="detail-btn">
														<i class="xi-search"></i>
													</a>
												</span>
											</li>
										</ul>

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

					<strong class="heading8">Tools list
						<span class="active-toggle-wrap">
							<input type="checkbox" id="activeToggle3" name="" value="" class="sr-only">
							<label for="activeToggle3"><span class="sr-only">Activation</span></label>
						</span >
					</strong>
					<div class="base_grid_table">
						<table>
							<caption>Tools list - No, Items, Qlty</caption>
							<colgroup>
								<col style="width:10%">
								<col style="width:65%">
								<col style="width:10%">
								<col style="width:15%">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">No.</th>
									<th scope="col">Item</th>
									<th scope="col">Qty</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>2</td>
									<td>디지털 멀티미디어  ㅣ  Multimeter</td>
									<td>1</td>
									<td>
										<div class="add-delete-btn-wrap">
						                    <a href="" class="delete-btn">
						                      <span class="sr-only">delete</span>
						                      <i class="xi-minus-square"></i>
						                    </a>
						                    <a href="" class="add-btn">
						                      <span class="sr-only">add</span>
						                      <i class="xi-plus-square"></i>
						                    </a>
						                 </div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<strong class="heading8">Parts
						<span class="active-toggle-wrap">
							<input type="checkbox" id="activeToggle4" name="" value="" class="sr-only">
							<label for="activeToggle4"><span class="sr-only">Activation</span></label>
						</span >
					</strong>
					<div class="base_grid_table">
						<table>
							<caption>Tools list - No, Items, Qlty</caption>
							<colgroup>
								<col style="width:10%">
								<col style="width:65%">
								<col style="width:10%">
								<col style="width:15%">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">No.</th>
									<th scope="col">Item</th>
									<th scope="col">Qty</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>2</td>
									<td>디지털 멀티미디어  ㅣ  Multimeter</td>
									<td>1</td>
									<td>
										<div class="add-delete-btn-wrap">
						                    <a href="" class="delete-btn">
						                      <span class="sr-only">delete</span>
						                      <i class="xi-minus-square"></i>
						                    </a>
						                    <a href="" class="add-btn">
						                      <span class="sr-only">add</span>
						                      <i class="xi-plus-square"></i>
						                    </a>
						                 </div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<strong class="heading8">PPE
						<span class="active-toggle-wrap">
							<input type="checkbox" id="activeToggle5" name="" value="" class="sr-only">
							<label for="activeToggle5"><span class="sr-only">Activation</span></label>
						</span >
					</strong>
					<div class="base_grid_table">
						<table>
							<caption>Tools list - No, Items, Qlty</caption>
							<colgroup>
								<col style="width:10%">
								<col style="width:65%">
								<col style="width:10%">
								<col style="width:15%">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">No.</th>
									<th scope="col">Item</th>
									<th scope="col">Qty</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>2</td>
									<td>디지털 멀티미디어  ㅣ  Multimeter</td>
									<td>1</td>
									<td>
										<div class="add-delete-btn-wrap">
						                    <a href="" class="delete-btn">
						                      <span class="sr-only">delete</span>
						                      <i class="xi-minus-square"></i>
						                    </a>
						                    <a href="" class="add-btn">
						                      <span class="sr-only">add</span>
						                      <i class="xi-plus-square"></i>
						                    </a>
						                 </div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<strong class="heading8">Work
						<span class="active-toggle-wrap">
							<input type="checkbox" id="activeToggle6" name="" value="" class="sr-only">
							<label for="activeToggle6"><span class="sr-only">Activation</span></label>
						</span>
					</strong>
					<div class="base_grid_table">
						<table>
							<caption>Work - Maintenance code, Difficulty, Work, Detail, Attachment, Part Replacement</caption>
							<colgroup>
								<col style="width:20%">
								<col style="width:80%">
							</colgroup>
							<thead>
							<tbody>
								<tr>
									<th scope="row">Maintenance code</th>
									<td class="txt-left">
										<div class="registration-write btn-input-wrap">
											<div class="input-group">
												<label for="Manufacture" class="sr-only">Manufacture</label>
												<input type="text" name="Manufacture" id="Manufacture" placeholder="">
											</div>
											<button type="button" class="registration-search-btn popup-btn">Check</button>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">Difficulty</th>
									<td class="txt-left">
										<div class="registration-write registration-write-select">
											<div class="input-group-wrapper">
												<div class="select-box">
													<label for="Difficulty">-</label>
													<select name="Difficulty" id="Difficulty" class="info-select">
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
										<span class="essential">Work</span>
									</th>
									<td class="txt-left">

										<div class="registration-write">
											<div class="input-group">
												<label for="Work" class="sr-only">Manufacture</label>
												<input type="text" name="Work" id="Work" placeholder="">
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										<span class="essential">Detail</span>
									</th>
									<td class="txt-left note">
										<div class="registration-write">
											<label for="Detail" class="sr-only">Detail</label>
											<textarea id="Detail"></textarea>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">Attachment</th>
									<td class="txt-left">
										<ul class="path-file">
											<li>
												<span class="path-fiie-detail">
													<strong class="file-name">Figure1.jpg(104KB)</strong>
													<strong class="file-info">Yaw system grease nipple breakage</strong>
													<em class="file-time">2019.08.12 12:12:12</em>
												</span>
												<span class="path-fiie-etc">
													<a href="#" class="delete-btn">
														<i class="xi-trash"></i>
													</a>
													<a href="" class="detail-btn">
														<i class="xi-search"></i>
													</a>
												</span>
											</li>
											<li>
												<span class="path-fiie-detail">
													<strong class="file-name">Figure1.jpg(104KB)</strong>
													<strong class="file-info">
														<span class="input-group">
															<label for="fileInfo" class="sr-only"></label>
															<input type="text" name="fileInfo" id="fileInfo" placeholder="">
														</span>
													</strong>
													<em class="file-time">2019.08.12 12:12:12</em>
												</span>
												<span class="path-fiie-etc">
													<a href="#" class="delete-btn">
														<i class="xi-trash"></i>
													</a>
													<a href="" class="detail-btn">
														<i class="xi-search"></i>
													</a>
												</span>
											</li>
										</ul>

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
								<tr>
									<th scope="row">Flight time</th>
									<td class="txt-left">
										<div class="registration-write btn-input-wrap registration-write-select">
											<div class="select-box input-group">
												<label for="Replacement">-</label>
												<select name="Replacement" id="Replacement" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
											<button type="button" class="registration-search-btn popup-btn">Check</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="more-btn-wrap individual-more-btn-wrap">
						<a href="" class="more popup-btn">
							<span class="sr-only">more details</span>
							<i class="xi-plus-circle"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
		<!-- //결과작성 -->
<jsp:include page="include/footer.jsp"></jsp:include>