<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container">
	<!--tit-wrap-->
	<div class="tit-wrap">
		<h2 class="heading3">
			<span class="txt">Wind Turbine Monitoring</span>
			<span class="version">V47</span>
		</h2>
		<ul class="location">
			<li>HANGWON</li>
			<li>Group01</li>
			<li class="bold">V47</li>
		</ul>
	</div>
	<!--//tit-wrap-->

	<div class="monitoring-wrap">

		<div class="monitoring-turbine-scroll">
			<div class="monitoring-turbine-wrap">
				<ul class="pointer-lst">
					<li style="top:230px;left:106px;">
						<a href="#pointer1">A</a>
					</li>
					<li style="top: 219px;left:278px;">
						<a href="#pointer2">B</a>
					</li>
					<li style="top:216px;left:667px;">
						<a href="#pointer3">C</a>
					</li>
					<li style="top:203px;left:858px;" class="warning">
						<a href="#pointer4">D</a>
					</li>
					<li style="top:203px;left:1018px;">
						<a href="#pointer5">E</a>
					</li>
					<li style="top:100px;right:82px;">
						<a href="#pointer5">F</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="sensor-data-table-wrap">
			<div class="sensor-table-scroll">
				<div class="sensor-table-wrap sensor-table-wrap-blade">
					<!-- Sensor Data table default -->
					<div class="sensor-table sensor-table-default">
						<a href="#none" class="sensor-data-btn sensor-data-btn-modify">
							<i class="xi-pen"></i>
							<span class="sr-only">modify</span>
						</a>
						<a href="#none" class="sensor-data-btn sensor-data-btn-complete">
							<i class="xi-check"></i>
							<span class="sr-only">complete</span>
						</a>
						<div class="base_grid_table">
							<table>
								<caption>Sensor Data - Blade1</caption>
								<colgroup>
									<col style="width:50%">
									<col style="width:50%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col" colspan="2"><a herf="javascipt:void(0);" id="pointer1" class="pointer"><em>A</em> Rotor</a></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<a href="#none">b1-r-flap</a>
										</td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b1-r-flapMin" class="sr-only"></label>
														<input type="text" id="b1-r-flapMin" name="b1-r-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b1-r-flapMax" class="sr-only"></label>
														<input type="text" id="b1-r-flapMax" name="b1-r-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td>
											<a href="#none">b1-r-edge</a>
										</td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result2">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b1-r-edgeMin" class="sr-only"></label>
														<input type="text" id="b1-r-edgeMin" name="b1-r-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b1-r-edgeMax" class="sr-only"></label>
														<input type="text" id="b1-r-edgeMax" name="b1-r-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b1-m-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b1-m-flapMin" class="sr-only"></label>
														<input type="text" id="b1-m-flapMin" name="b1-m-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b1-m-flapMax" class="sr-only"></label>
														<input type="text" id="b1-m-flapMax" name="b1-m-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b1-m-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b1-m-edgeMin" class="sr-only"></label>
														<input type="text" id="b1-m-edgeMin" name="b1-m-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b1-m-edgeMax" class="sr-only"></label>
														<input type="text" id="b1-m-edgeMax" name="b1-m-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<em class="unit">Unit : kNm</em>
					</div>
					<!-- //Sensor Data table default -->
				</div>

				<div class="sensor-table-wrap sensor-table-wrap-blade">
					<!-- Sensor Data table default -->
					<div class="sensor-table sensor-table-default">
						<a href="#none" class="sensor-data-btn sensor-data-btn-modify">
							<i class="xi-pen"></i>
							<span class="sr-only">modify</span>
						</a>
						<a href="#none" class="sensor-data-btn sensor-data-btn-complete">
							<i class="xi-check"></i>
							<span class="sr-only">complete</span>
						</a>
						<div class="base_grid_table">
							<table>
								<caption>Sensor Data - Blade2</caption>
								<colgroup>
									<col style="width:50%">
									<col style="width:50%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col" colspan="2"><a herf="javascipt:void(0);" id="pointer2" class="pointer"><em>B</em> Transmission</a></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><a href="#none">b2-r-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-flapMin" class="sr-only"></label>
														<input type="text" id="b2-r-flapMin" name="b2-r-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-flapMax" class="sr-only"></label>
														<input type="text" id="b2-r-flapMax" name="b2-r-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-r-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result2">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMin" name="b2-r-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMax" name="b2-r-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-flapMin" class="sr-only"></label>
														<input type="text" id="b2-m-flapMin" name="b2-m-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-flapMax" class="sr-only"></label>
														<input type="text" id="b2-m-flapMax" name="b2-m-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMin" name="b2-m-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMax" name="b2-m-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<em class="unit">Unit : kNm</em>
					</div>
					<!-- //Sensor Data table default -->
				</div>

				<div class="sensor-table-wrap sensor-table-wrap-blade">
					<!-- Sensor Data table default -->
					<div class="sensor-table sensor-table-default">
						<a href="#none" class="sensor-data-btn sensor-data-btn-modify">
							<i class="xi-pen"></i>
							<span class="sr-only">modify</span>
						</a>
						<a href="#none" class="sensor-data-btn sensor-data-btn-complete">
							<i class="xi-check"></i>
							<span class="sr-only">complete</span>
						</a>
						<div class="base_grid_table">
							<table>
								<caption>Sensor Data - Blade3</caption>
								<colgroup>
									<col style="width:50%">
									<col style="width:50%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col" colspan="2"><a herf="javascipt:void(0);" id="pointer3" class="pointer warning"><em>C</em> Generator</a></th>
									</tr>
								</thead>
								<tbody>
									<tr class="warning">
										<td><a href="#none">b3-r-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b3-r-flapMin" class="sr-only"></label>
														<input type="text" id="b3-r-flapMin" name="b3-r-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b3-r-flapMax" class="sr-only"></label>
														<input type="text" id="b3-r-flapMax" name="b3-r-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b3-r-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result2">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b3-r-edgeMin" class="sr-only"></label>
														<input type="text" id="b3-r-edgeMin" name="b3-r-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b3-r-edgeMax" class="sr-only"></label>
														<input type="text" id="b3-r-edgeMax" name="b3-r-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b3-m-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b3-m-flapMin" class="sr-only"></label>
														<input type="text" id="b3-m-flapMin" name="b3-m-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b3-m-flapMax" class="sr-only"></label>
														<input type="text" id="b3-m-flapMax" name="b3-m-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b3-m-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b3-m-edgeMin" class="sr-only"></label>
														<input type="text" id="b3-m-edgeMin" name="b3-m-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b3-m-edgeMax" class="sr-only"></label>
														<input type="text" id="b3-m-edgeMax" name="b3-m-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<em class="unit">Unit : kNm</em>
					</div>
					<!-- //Sensor Data table default -->
				</div>
				
				<div class="sensor-table-wrap sensor-table-wrap-blade">
					<!-- Sensor Data table default -->
					<div class="sensor-table sensor-table-default">
						<a href="#none" class="sensor-data-btn sensor-data-btn-modify">
							<i class="xi-pen"></i>
							<span class="sr-only">modify</span>
						</a>
						<a href="#none" class="sensor-data-btn sensor-data-btn-complete">
							<i class="xi-check"></i>
							<span class="sr-only">complete</span>
						</a>
						<div class="base_grid_table">
							<table>
								<caption>Sensor Data - Blade2</caption>
								<colgroup>
									<col style="width:50%">
									<col style="width:50%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col" colspan="2"><a herf="javascipt:void(0);" id="pointer4" class="pointer"><em>D</em> Converter</a></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><a href="#none">b2-r-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-flapMin" class="sr-only"></label>
														<input type="text" id="b2-r-flapMin" name="b2-r-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-flapMax" class="sr-only"></label>
														<input type="text" id="b2-r-flapMax" name="b2-r-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-r-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result2">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMin" name="b2-r-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMax" name="b2-r-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-flapMin" class="sr-only"></label>
														<input type="text" id="b2-m-flapMin" name="b2-m-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-flapMax" class="sr-only"></label>
														<input type="text" id="b2-m-flapMax" name="b2-m-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMin" name="b2-m-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMax" name="b2-m-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<em class="unit">Unit : kNm</em>
					</div>
					<!-- //Sensor Data table default -->
				</div>
				
				<div class="sensor-table-wrap sensor-table-wrap-blade">
					<!-- Sensor Data table default -->
					<div class="sensor-table sensor-table-default">
						<a href="#none" class="sensor-data-btn sensor-data-btn-modify">
							<i class="xi-pen"></i>
							<span class="sr-only">modify</span>
						</a>
						<a href="#none" class="sensor-data-btn sensor-data-btn-complete">
							<i class="xi-check"></i>
							<span class="sr-only">complete</span>
						</a>
						<div class="base_grid_table">
							<table>
								<caption>Sensor Data - Blade2</caption>
								<colgroup>
									<col style="width:50%">
									<col style="width:50%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col" colspan="2"><a herf="javascipt:void(0);" id="pointer5" class="pointer"><em>E</em> Transformer</a></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><a href="#none">b2-r-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-flapMin" class="sr-only"></label>
														<input type="text" id="b2-r-flapMin" name="b2-r-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-flapMax" class="sr-only"></label>
														<input type="text" id="b2-r-flapMax" name="b2-r-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-r-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result2">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMin" name="b2-r-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMax" name="b2-r-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-flapMin" class="sr-only"></label>
														<input type="text" id="b2-m-flapMin" name="b2-m-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-flapMax" class="sr-only"></label>
														<input type="text" id="b2-m-flapMax" name="b2-m-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMin" name="b2-m-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMax" name="b2-m-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<em class="unit">Unit : kNm</em>
					</div>
					<!-- //Sensor Data table default -->
				</div>
				
				<div class="sensor-table-wrap sensor-table-wrap-blade">
					<!-- Sensor Data table default -->
					<div class="sensor-table sensor-table-default">
						<a href="#none" class="sensor-data-btn sensor-data-btn-modify">
							<i class="xi-pen"></i>
							<span class="sr-only">modify</span>
						</a>
						<a href="#none" class="sensor-data-btn sensor-data-btn-complete">
							<i class="xi-check"></i>
							<span class="sr-only">complete</span>
						</a>
						<div class="base_grid_table">
							<table>
								<caption>Sensor Data - Blade2</caption>
								<colgroup>
									<col style="width:50%">
									<col style="width:50%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col" colspan="2"><a herf="javascipt:void(0);" id="pointer5" class="pointer"><em>F</em> Nacelle</a></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><a href="#none">b2-r-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-flapMin" class="sr-only"></label>
														<input type="text" id="b2-r-flapMin" name="b2-r-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-flapMax" class="sr-only"></label>
														<input type="text" id="b2-r-flapMax" name="b2-r-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-r-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result2">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-r-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMin" name="b2-r-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-r-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-r-edgeMax" name="b2-r-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-flap</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-flapMin" class="sr-only"></label>
														<input type="text" id="b2-m-flapMin" name="b2-m-flapMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-flapMax" class="sr-only"></label>
														<input type="text" id="b2-m-flapMax" name="b2-m-flapMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
									<tr>
										<td><a href="#none">b2-m-edge</a></td>
										<td>
											<a href="#none">
												<span class="sensor-data-result sensor-data-result1">11.3</span>
												<span class="input-wrapper">
													<span class="input-group">
														<label for="b2-m-edgeMin" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMin" name="b2-m-edgeMin" value="" placeholder="min">
													</span>
													<span class="input-group">
														<label for="b2-m-edgeMax" class="sr-only"></label>
														<input type="text" id="b2-m-edgeMax" name="b2-m-edgeMax" value="" placeholder="max">
													</span>
												</span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<em class="unit">Unit : kNm</em>
					</div>
					<!-- //Sensor Data table default -->
				</div>
			</div>
		</div>
	</div>

</div>
<!--js-->
<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>