<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
	request.setCharacterEncoding("UTF-8");
%>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container system-wrap system-wrap1">
	<!-- 유지보수 테이블 관리 -->
	<div class="system-detail-wrap">
		<div class="system-left">
			<!--tit-wrap-->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">Maintenance code</span>
					<!-- <span class="version">V47</span> -->
				</h2>
				<ul class="location">
					<li>SYSTEM</li>
					<li>Code management</li>
					<li class="bold">Maintenance code</li>
				</ul>
			</div>
			<!--//tit-wrap-->
			<!-- registration form -->
			<div class="maintenance-form registration-form registration-form1">
				<div class="registration-form-lst-wrap maintenance-write-form">

					<div class="registration-form-lst registration-form-lst-bg">
						<h3>Code list</h3>
						<button type="button" class="registration-search-btn btn-style btn-style1 popup-btn">Register</button>
						<ul class="registration-scoll">
							<li class="first line">
								<div class="registration">
									<span class="num">A</span><span>Tower</span>
									<em	class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
								</div>
								<ul class="depth2">
									<li>
										<div class="registration">
											<span class="num">02</span><span>Motor</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
									<li>
										<div class="registration">
											<span class="num">04</span><span>Door & Stair</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
										<ul class="depth3">
											<li>
												<div class="registration">
													<span class="num">Test</span><span>test</span>
													<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
												</div>
											</li>
											<li>
												<div class="registration">
													<span class="num">Test</span><span>test</span>
													<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
												</div>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li class="line">
								<div class="registration">
									<span class="num">B</span><span>Hub & Rotor</span>
									<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
								</div>
								<ul class="depth2">
									<li>
										<div class="registration">
											<span class="num">08</span><span>Platform</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
									<li>
										<div class="registration">
											<span class="num">02</span><span>Motor</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
									<li>
										<div class="registration">
											<span class="num">04</span><span>door & Stair</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
								</ul>
							</li>
							<li class="line">
								<div class="registration">
									<span class="num">C</span><span>Hub & Rotor</span>
									<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
								</div>
								<ul class="depth2">
									<li>
										<div class="registration">
											<span class="num">08</span><span>Platform</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
									<li>
										<div class="registration">
											<span class="num">02</span><span>Motor</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
									<li>
										<div class="registration">
											<span class="num">04</span><span>Door & Stair</span> <em
												class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
								</ul>
							</li>
							<li class="line">
								<div class="registration">
									<span class="num">D</span><span>Hub & Rotor</span>
									<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
								</div>
								<ul class="depth2">
									<li>
										<div class="registration">
											<span class="num">08</span><span>Platform</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
									<li>
										<div class="registration">
											<span class="num">02</span><span>Motor</span>
											<em class="hide-arrow"><i class="xi-long-arrow-right"></i></em>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<ul class="registration-form-lst right">
						<li class="head-area">
							<h3>
								<span class="num">04</span><span>Door & Stair</span>
							</h3>
							<span class="btn-wrap">
								<a href="#" class="modify-btn">
									<i class="xi-eraser"></i>
								</a>
								<a href="#" class="del-btn">
									<i class="xi-trash"></i>
								</a>
							</span>
						</li>
						<li class="tit-area">
							<span class="tit">Code</span>
							<strong	class="tit-sub">
								<em class="num">29</em>
								<span class="code-name">SWitch gear</span>
							</strong>
						</li>
						<li class="type-area">
							<span class="tit">Type</span> 
							<span class="txt">Part</span>
						</li>
						<li class="sub-area">
							<span class="tit">Description</span>
							<span class="cont"> The turbine has had an overspeed on the
								rotor. the error occurs it the turbine reach a set limit for how
								many rotations it may take per minut. <br /> The turbine has
								had an overspeed on the rotor. the error occurs it the turbine
								reach a set limit for how many rotations it may take per minut.
								The turbine has had an overspeed on the rotor. the error occurs
								it the turbine reach a set limit for how many rotations it may
								take per minut. The turbine has had an overspeed on the rotor.
								the error occurs it the turbine reach a set limit for how many
								rotations it may take perminut. The turbine has had an overspeed
								on the rotor. the error occurs it the turbine
							</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- //registration form -->

		</div>
		<div class="system-right">
			<div class="btns">
				<a href="#" class="btn-style btn-style1">Save</a>
				<a href="#"	class="btn-style btn-style2">Cancel</a>
			</div>
		</div>
	</div>
	<!-- //유지보수 테이블 관리 -->
</div>

<!-- layerPopup -->
<div id="layerPopup" class="active registration">
	<div class="layer-cont">
		<a href="#none" class="layer-close">
			<span class="sr-only">close layer popup</span> <i class="xi-close"></i>
		</a>
		<div class="layer-cont-sub">
			<div class="tit-wrap">
				<strong class="heading6">Code registration</strong>
				<div class="checkbox-wrap">
					<div class="checkbox-radio-custom">
						<input type="checkbox" class="checkbox" id="regi-check1">
						<label for="regi-check1" class="sr-only"></label>
					</div>
					<span>Parent code registration</span>
				</div>
			</div>
			<ul class="registration-write-wrap registration-write-wrap2">
				<li class="sub0"><span>Parent code</span>
					<div class="registration-write">
						<div class="select-box">
							<label for="selectCode"></label> <select name="selectCode"
								id="selectCode" class="info-select">
								<option value="1">D l Hub & Rotor</option>
								<option value="2"></option>
								<option value="3"></option>
							</select>
						</div>
					</div>
				</li>
				<li class="sub1"><span>Code</span>
					<div class="registration-write">
						<div class="input-group">
							<label for="name" class="sr-only">Code</label> <input type="text"
								id="" name="" value="">
						</div>
					</div>
				</li>
				<li class="sub2"><span>Name</span>
					<div class="registration-write">
						<div class="input-group">
							<label for="name" class="sr-only">Name</label> <input type="text"
								id="" name="" value="">
						</div>
					</div>
				</li>
				<li class="sub3"><span>Description</span>
					<div class="registration-write">
						<div class="input-group">
							<label for="name" class="sr-only">Description</label>
							<textarea></textarea>
						</div>
					</div>
				</li>
			</ul>
			<div class="footer_table_btn">
				<a href="#" class="btn">Cancel</a> <a href="#" class="btn ok-btn">
					<i class="xi-check"></i>
				</a>
			</div>
		</div>
	</div>
</div>
<!--//layerPopup -->

<jsp:include page="include/footer.jsp"></jsp:include>