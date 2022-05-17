<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 견적요청_메일보내기 -->
		<div class="container onm-wrap2">

			<div class="system-detail-wrap">
				<div class="system-left">
					<div class="tit-wrap">
						<h2 class="heading3">
							<span class="txt">Account Management</span>
						</h2>
						<ul class="location">
							<li>Account Management</li>
							<li>Account Management</li>
							<li class="bold">Request</li>
						</ul>
					</div>
			
					<div class="registration-form registration-form1">
						<div class="base_grid_table">
							<table>
								<caption>Account Management  - Account Code, Account Name, Business Registrator Number, Manager, Phone Number, Email, Note</caption>
								<colgroup>
									<col style="width:20%">
									<col style="width:80%">
								</colgroup>
			
								<tbody>
									<tr>
										<th scope="row">
											<span class="essential">Account Code</span>
										</th>
										<td class="txt-left">
											<div class="registration-write">
												<div class="input-group">
													<label for="title" class="sr-only">Account Code</label>
													<input type="text" id="title" name="title" value="" placeholder="">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><span class="essential">Account Name</span></th>
										<td class="txt-left">
											<div class="registration-write">
												<div class="input-group">
													<label for="accountName" class="sr-only">Account Name</label>
													<input type="text" id="accountName" name="accountName" value="" placeholder="ABB">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">Business Registrator Number</th>
										<td class="txt-left">
											<div class="registration-write phone-num-write">
												<div class="input-group">
													<label for="businessRegistratorNumber1" class="sr-only">Business Registrator Number</label>
													<input type="text" id="businessRegistratorNumber1" name="businessRegistratorNumber1" value="" placeholder="111">
												</div>
												<em>-</em>
												<div class="input-group">
													<label for="businessRegistratorNumber2" class="sr-only">Business Registrator Number</label>
													<input type="text" id="businessRegistratorNumber2" name="businessRegistratorNumber2" value="" placeholder="02">
												</div>
												<em>-</em>
												<div class="input-group">
													<label for="businessRegistratorNumber3" class="sr-only">Business Registrator Number</label>
													<input type="text" id="businessRegistratorNumber3" name="businessRegistratorNumber3" value="" placeholder="12345">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><span class="essential">Manager</span></th>
										<td class="txt-left">
											<div class="registration-write">
												<div class="input-group">
													<label for="manager" class="sr-only">Account Name</label>
													<input type="text" id="manager" name="manager" value="" placeholder="ABB">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><span class="essential">Phone Number</span></th>
										<td class="txt-left">
											<div class="registration-write phone-num-write">
												<div class="input-group">
													<label for="phoneNumber1" class="sr-only">Phone Number</label>
													<input type="text" id="phoneNumber1" name="phoneNumber1" value="" placeholder="82+">
												</div>
												<em>-</em>
												<div class="input-group">
													<label for="phoneNumber2" class="sr-only">Phone Number</label>
													<input type="text" id="phoneNumber2" name="phoneNumber2" value="" placeholder="0000">
												</div>
												<em>-</em>
												<div class="input-group">
													<label for="phoneNumber3" class="sr-only">Phone Number</label>
													<input type="text" id="phoneNumber3" name="phoneNumber3" value="" placeholder="0000">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><span class="essential">Email</span></th>
										<td class="txt-left">
											<div class="registration-write">
												<div class="input-group">
													<label for="email" class="sr-only">Account Name</label>
													<input type="text" id="email" name="email" value="" placeholder="abb@abb.com">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">Note</th>
										<td class="txt-left">
											<div class="registration-write">
												<label for="note" class="sr-only">Note</label>
												<textarea id="note"></textarea>
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