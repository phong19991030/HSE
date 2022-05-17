<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 견적요청_메일보내기 -->
		<div class="container onm-wrap2">
		
			<div class="system-detail-wrap">
				<div class="system-left">
					<div class="tit-wrap">
						<h2 class="heading3">
							<span class="txt">Manual</span>
						</h2>
						<ul class="location">
							<li>Education</li>
							<li class="bold">Manual</li>
						</ul>
					</div>
					<div class="registration-form registration-form1">
						<div class="base_grid_table">
							<table>
								<caption>Purpose - Purpose, Attachment</caption>
								<colgroup>
									<col style="width:20%">
									<col style="width:80%">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">Curriculum</th>
										<td class="txt-left note">
											<div class="input-group">
												<label for="curriculum" class="sr-only">Curriculum</label>
												<input type="text" name="curriculum" id="curriculum" placeholder="">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">Period</th>
										<td class="txt-left note">
											<div class="registration-write">
												<div class="calendar-picker">
													<div class="calendar-wrap">
														<div class="input-group">
															<label for="Period1" class="sr-only"></label>
															<input type="text" id="Period1" name="Period1" value="">
															<button class="calendar-picker-btn">
																<i class="xi-calendar"></i>
															</button>
														</div>
														<em class="hyphen">
															<span class="sr-only">-</span>
														</em>
														<div class="input-group">
															<label for="Period2" class="sr-only"></label>
															<input type="text" id="Period2" name="Period2" value="">
															<button class="calendar-picker-btn">
																<i class="xi-calendar"></i>
															</button>
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><span class="essential">Institution</span></th>
										<td class="txt-left note">
											<div class="input-group">
												<label for="institution" class="sr-only">Institution</label>
												<input type="text" name="institution" id="institution" placeholder="">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">
											<span class="essential">Education Contents</span>
										</th>
										<td class="txt-left note">
											<div class="registration-write">
												<label for="eduContents" class="sr-only">Education Contents</label>
												<textarea id="eduContents"></textarea>
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
										<th scope="row">Movie</th>
										<td>
											<div class="base_grid_table">
												<table>
													<caption>Movie - URL, Remark</caption>
													<colgroup>
														<col style="width:20%">
														<col style="width:80%">
													</colgroup>
													<tbody>
														<tr>
															<th scope="row">URL</th>
															<td class="txt-left">
																<div class="input-group">
																	<label for="url" class="sr-only">URL</label>
																	<input type="text" name="url" id="url" placeholder="">
																</div>
															</td>
														</tr>
														<tr>
															<th scope="row">Remark</th>
															<td class="txt-left">
																<div class="input-group">
																	<label for="remark" class="sr-only">Remark</label>
																	<input type="text" name="remark" id="remark" placeholder="">
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
		<!-- //견적요청_메일보내기 -->
<jsp:include page="include/footer.jsp"></jsp:include>