<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		<!-- 견적요청_메일보내기 -->
		<div class="container onm-wrap2">
			
			<div class="system-detail-wrap">
				<div class="system-left">
				       <div class="tit-wrap">
							<h2 class="heading3">
								<span class="txt">Expert Pool</span>
							</h2>
							<ul class="location">
							<li>Asset Management</li>
							<li class="bold">Expert Pool</li>
							</ul>
						</div> 
					 	<div class="registration-form registration-form1">
					 		<h3 class="heading4">Basic Information</h3>
							<div class="base_grid_table">
								<table>
									<caption>Basic Information - Name, Organization, Contact, Basic wages, Skill, Work expereience, Qualification</caption>
									<colgroup>
										<col style="width:20%">
										<col style="width:80%">
									</colgroup>
				
									<tbody>
										<tr>
											<th scope="row">
												<span class="essential">Name</span>
											</th>
											<td class="txt-left">
												<div class="registration-write">
													<div class="input-group">
														<label for="name" class="sr-only">Name</label>
														<input type="text" id="name" name="name" value="" placeholder="HongGilDong">
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">Organization</th>
											<td class="txt-left">
												<div class="base_grid_table">
													<table>
														<caption>Organization  - Company, Department, Position</caption>
														<colgroup>
															<col style="width:20%">
															<col style="width:80%">
														</colgroup>
									
														<tbody>
															<tr>
																<th scope="row">
																	<span class="essential">Company</span>
																</th>
																<td class="txt-left">
																	<div class="registration-write">
																		<div class="input-group">
																			<label for="company" class="sr-only">Company</label>
																			<input type="text" id="company" name="company" value="" placeholder="">
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th scope="row">Department</th>
																<td class="txt-left">
																	<div class="registration-write">
																		<div class="select-box">
																			<label for="department">-</label>
																			<select name="department" id="department" class="info-select">
																				<option value="1">-</option>
																				<option value="2"></option>
																				<option value="3"></option>
																			</select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th scope="row">Position</th>
																<td class="txt-left">
																	<div class="registration-write">
																		<div class="select-box">
																			<label for="position">-</label>
																			<select name="position" id="position" class="info-select">
																				<option value="1">-</option>
																				<option value="2"></option>
																				<option value="3"></option>
																			</select>
																		</div>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</td>
										</tr>
										
										<tr>
											<th scope="row">Contact</th>
											<td class="txt-left">
												<div class="base_grid_table">
													<table>
														<caption>Contact  -  Mobile number, Phone number, Email</caption>
														<colgroup>
															<col style="width:20%">
															<col style="width:80%">
														</colgroup>
									
														<tbody>
															<tr>
																<th scope="row"><span class="essential">Mobile number</span></th>
																<td class="txt-left">
																	<div class="registration-write phone-num-write">
																		<div class="input-group">
																			<label for="mobileNumber1" class="sr-only">Mobile number</label>
																			<input type="text" id="mobileNumber1" name="mobileNumber1" value="" placeholder="010">
																		</div>
																		<em>-</em>
																		<div class="input-group">
																			<label for="mobileNumber2" class="sr-only">Mobile number</label>
																			<input type="text" id="mobileNumber2" name="mobileNumber2" value="" placeholder="1234">
																		</div>
																		<em>-</em>
																		<div class="input-group">
																			<label for="mobileNumber3" class="sr-only">Mobile number</label>
																			<input type="text" id="mobileNumber3" name="mobileNumber3" value="" placeholder="5678">
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th scope="row"><span class="essential">Phone number</span></th>
																<td class="txt-left">
																	<div class="registration-write phone-num-write">
																		<div class="input-group">
																			<label for="phoneNumber1" class="sr-only">Phone number</label>
																			<input type="text" id="phoneNumber1" name="phoneNumber1" value="" placeholder="010">
																		</div>
																		<em>-</em>
																		<div class="input-group">
																			<label for="phoneNumber2" class="sr-only">Phone number</label>
																			<input type="text" id="phoneNumber2" name="phoneNumber2" value="" placeholder="1234">
																		</div>
																		<em>-</em>
																		<div class="input-group">
																			<label for="phoneNumber3" class="sr-only">Phone number</label>
																			<input type="text" id="phoneNumber3" name="phoneNumber3" value="" placeholder="5678">
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
														</tbody>
													</table>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row"><span class="essential">Basic wages</span></th>
											<td class="txt-left">
												<div class="registration-write">
													<div class="input-group">
														<label for="basicWages" class="sr-only">Basic wages</label>
														<input type="text" id="basicWages" name="basicWages" value="" placeholder="">
													</div>
												</div>
												<em>WON / 1DAY</em>
											</td>
										</tr>
										<tr>
											<th scope="row"><span class="essential">Skill</span></th>
											<td class="txt-left">
												<div class="registration-write">
													<label for="skill" class="sr-only">Skill</label>
													<textarea id="skill"></textarea>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">Work expereience</th>
											<td class="txt-left">
												<div class="registration-write">
													<label for="workExpereience" class="sr-only">Work expereience</label>
													<textarea id="workExpereience"></textarea>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">Qualification</th>
											<td class="txt-left">
												<div class="registration-write">
													<label for="qualification" class="sr-only">Qualification</label>
													<textarea id="qualification"></textarea>
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