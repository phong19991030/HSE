<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 견적요청_메일보내기 -->
		<div class="container onm-wrap2">
		
			<div class="system-detail-wrap">
				<div class="system-left">
					<div class="tit-wrap">
						<h2 class="heading3">
							<span class="txt">Register</span>
						</h2>
						<ul class="location">
							<li>Education</li>
							<li class="bold">Register</li>
						</ul>
					</div>
					<div class="registration-form registration-form1">
						<div class="base_grid_table">
							<table>
								<caption>Purpose - Title, Contents, Attachment</caption>
								<colgroup>
									<col style="width:20%">
									<col style="width:80%">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">title</th>
										<td class="txt-left note">
											<div class="input-group">
												<label for="title" class="sr-only">title</label>
												<input type="text" name="title" id="title" placeholder="">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">
											<span class="essential">Contents</span>
										</th>
										<td class="txt-left note">
											<div class="registration-write">
												<label for="contents" class="sr-only">Contents</label>
												<textarea id="contents"></textarea>
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