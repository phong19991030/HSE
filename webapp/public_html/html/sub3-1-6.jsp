<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 재고등록 사용계획 -->
		<div class="container">
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">Register</span>
					<span class="version">004_HV_001_</span>
				</h2>
				<ul class="location">
					<li>Asset Management</li>
					<li>Parts</li>
					<li class="bold">Inventory Management</li>
				</ul>
			</div>

			<div class="system-detail-wrap">
				<div class="system-left">
					<div class="search-form-wrap">
						<div class="search-wrapper select-search-wrapper">
							<div class="select-box">
								<label for="selectWTG2"></label>
								<select name="selectWTG2" id="selectWTG2" class="info-select">
									<option value="1">Unused</option>
									<option value="2">In Use</option>
									<option value="3">Usage Plan</option>
									<option value="4">Disposal</option>
								</select>
							</div>
						</div>
					</div>
					
					<div class="registration-form-lst-wrap">
						<ul class="registration-form-lst">
							<li>
								<span class="essential">Expected Date</span>
								<div class="registration-write">
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="expectedDate" class="sr-only"></label>
												<input type="text" id="expectedDate" name="expectedDate" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<span class="essential">Product Name</span>
								<div class="registration-write">
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="productName" class="sr-only">Report number</label>
											<input type="text" name="productName" id="productName" placeholder="">
										</div>
									</div>
								</div>
							</li>
							<li>
								<span class="essential">Durability Setting</span>
								<div class="registration-write twice-input registration-write-select">
									<div class="input-group-wrapper">
										<div class="select-box">
											<label for="durabilitySetting"></label>
											<select name="durabilitySetting" id="durabilitySetting" class="info-select">
												<option value="1">-</option>
												<option value="2"></option>
												<option value="3"></option>
											</select>
										</div>
									</div>
								</div>
							</li>
							<li>
								<span class="essential">Reminder Date</span>
								<div class="registration-write">
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="reminderDate" class="sr-only"></label>
												<input type="text" id="reminderDate" name="reminderDate" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<ul class="registration-form-lst">
							<li>
								<span>Detail Code Number</span>
								<div class="registration-write">004_HV_001_00a</div>
							</li>
							<li>
								<span>Purchase Date</span>
								<div class="registration-write">
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="purchaseDate" class="sr-only"></label>
												<input type="text" id="purchaseDate" name="purchaseDate" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<span>Purchase Price</span>
								<div class="registration-write">
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="purchasePrice" class="sr-only">Purchase Price</label>
											<input type="text" name="purchasePrice" id="purchasePrice" placeholder="">
										</div>
									</div>
								</div>
							</li>
							<li>
								<span>Related Report</span>
								<div class="registration-write btn-input-wrap">
					                <div class="input-group">
					                  <label for="relatedReport" class="sr-only">Worker</label>
					                  <input type="text" name="relatedReport" id="relatedReport" placeholder="">
					                </div>
					                <button type="button" class="registration-search-btn popup-btn">View</button>
				              </div>
							</li>
						</ul>
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
		<!-- //재고등록 사용계획 -->
<jsp:include page="include/footer.jsp"></jsp:include>