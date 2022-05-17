<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 견적요청_메일보내기 -->
		<div class="container onm-wrap2">
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">Register</span>
				</h2>
				<ul class="location">
					<li>Asset Management</li>
					<li>Parts</li>
					<li class="bold">Inventory Management</li>
				</ul>
			</div>
			
			<div class="tab-wrap">
				<ul class="tab1">
					<li class="step step1 ov">
						<a href="#">
							<strong>1</strong>
							<span>Parts List</span>
						</a>
					</li>
					<li class="step step2 ov">
						<a href="#">
							<strong>2</strong>
							<span>Account List</span>
						</a>
					</li>
					<li class="step step3 ovs">
						<a href="#">
							<strong>3</strong>
							<span>Write Mail</span>
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
					<div class="base_grid_table">
						<table>
							<caption>Title, Sender, Recipient, Contents, Parts information</caption>
							<colgroup>
								<col style="width:20%">
								<col style="width:80%">
							</colgroup>
		
							<tbody>
								<tr>
									<th scope="row">
										<span class="essential">Title</span>
									</th>
									<td class="txt-left">
										<div class="registration-write">
											<div class="input-group">
												<label for="title" class="sr-only">Title</label>
												<input type="text" id="title" name="title" value="" placeholder="For a Vestas parts quote request">
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">Sender</th>
									<td class="txt-left">
										<div class="registration-write">
											<div class="input-group">
												<label for="sender" class="sr-only">Sender</label>
												<input type="text" id="sender" name="sender" value="" placeholder="csk@a2m.co.kr">
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">Recipient</th>
									<td class="txt-left">
										<div class="registration-write">
											<div class="input-group">
												<label for="recipient" class="sr-only">Recipient</label>
												<input type="text" id="senrecipientder" name="recipient" value="" placeholder="ABB (abb@abb.com), DMI(dmi@dmi.com)">
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row"><span class="essential">Contents</span></th>
									<td class="txt-left">
										<div class="registration-write">
											<label for="contents" class="sr-only">contents</label>
											<textarea id="contents"></textarea>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row"><span class="essential">Parts information</span></th>
									<td class="txt-left">
										<div class="base_grid_table">
											<table>
												<caption>Parts information - No, Target WTG, Part Number, Category, Stock, Purchase Quantity</caption>
												<colgroup>
													<col style="width:10%">
													<col style="width:30%">
													<col style="width:15%">
													<col style="width:15%">
													<col style="width:15%">
													<col style="width:15%">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">No</th>
														<th scope="col">Target WTG</th>
														<th scope="col">Part Number</th>
														<th scope="col">Category</th>
														<th scope="col">Stock</th>
														<th scope="col">Purchase Quantity</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>10</td>
														<td>Windfarm > Group1 > V47</td>
														<td>004</td>
														<td>Main Cable</td>
														<td><strong class="point2">2</strong></td>
														<td>
															<div class="input-group">
																<label for="purchaseQuantity" class="sr-only">Sender</label>
																<input type="text" id="purchaseQuantity" name="purchaseQuantity" value="" placeholder="">
															</div>
														</td>
													</tr>
													<tr>
														<td>9</td>
														<td>Windfarm > Group1 > V47</td>
														<td>004</td>
														<td>Main Cable</td>
														<td><strong class="point2">2</strong></td>
														<td>
															<div class="input-group">
																<label for="purchaseQuantity" class="sr-only">Sender</label>
																<input type="text" id="purchaseQuantity" name="purchaseQuantity" value="" placeholder="">
															</div>
														</td>
													</tr>
													<tr>
														<td>8</td>
														<td>Windfarm > Group1 > V47</td>
														<td>004</td>
														<td>Main Cable</td>
														<td><strong class="point2">2</strong></td>
														<td>
															<div class="input-group">
																<label for="purchaseQuantity" class="sr-only">Sender</label>
																<input type="text" id="purchaseQuantity" name="purchaseQuantity" value="" placeholder="">
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
					
					<div class="btns">
						<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
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