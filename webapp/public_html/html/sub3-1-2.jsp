<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 조회등록 -->
		<div class="container onm-wrap2">
			
			<div class="system-detail-wrap">
				<div class="system-left">
					<div class="tit-wrap">
						<h2 class="heading3">
							<span class="txt">Register</span>
						</h2>
						<ul class="location">
							<li>Asset Management</li>
							<li>Parts</li>
							<li class="bold">Basic information</li>
						</ul>
					</div>
					<div class="registration-form registration-form1">
								
						<div class="registration-form-lst-wrap registration-form-lst-wrap-full">
							<ul class="registration-form-lst">
								<li>
									<span class="essential">Select WTG</span>
									<div class="registration-write twice-input registration-write-select registration-write-three">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="selectWTG1"></label>
												<select name="selectWTG1" id="selectWTG1" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="selectWTG2"></label>
												<select name="selectWTG2" id="selectWTG2" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="selectWTG3"></label>
												<select name="selectWTG3" id="selectWTG3" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</li>
								<li>
									<span class="essential">Select Part Number</span>
									<div class="registration-write twice-input registration-write-select registration-write-three">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="selectPartNumber"></label>
												<select name="selectPartNumber" id="selectPartNumber" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</li>
								<li>
									<span class="essential">Detail Name</span>
									<div class="registration-write twice-input registration-write-select registration-write-three">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="detailName"></label>
												<select name="detailName" id="detailName" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</li>
								<li>
									<span>Code Number</span>
									<div class="registration-write">004_HV_001</div>
								</li>
								<li>
									<span class="essential">Minimum Requirement</span>
									<div class="registration-write twice-input registration-write-select">
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="minimumRequirement1"></label>
												<select name="minimumRequirement1" id="minimumRequirement1" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
										<div class="input-group-wrapper">
											<div class="select-box">
												<label for="minimumRequirement2"></label>
												<select name="minimumRequirement2" id="minimumRequirement2" class="info-select">
													<option value="1">-</option>
													<option value="2"></option>
													<option value="3"></option>
												</select>
											</div>
										</div>
									</div>
								</li> 
							</ul>
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
		<!-- //조회등록 -->
<jsp:include page="include/footer.jsp"></jsp:include>