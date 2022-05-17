<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<section class="section" id="section1">
		<div class="container">
			<h3 class="heading1">When there is no data</h3>
			<div class="no-data">No data found. Please try again.</div>
			
			<h3 class="heading1">MAKE ORDER - APVL PRODUCT</h3>
			<ul class="make-order-lst">
				<li>
					<span>
						<strong>Open houses</strong>
						<ul>
							<li>Mon - Fri :   9:00 - 18:00 </li>
							<li>Sat - Sun :   Closed</li>
						</ul>
					</span>
				</li>
				<li>
					<span>
						<strong>Phone number</strong>
						<ul>
							<li>(042) 864 4238</li>
							<li>(042) 864 4239</li>
						</ul>
					</span>
				</li>
				<li>
					<span>
						<strong>Our email</strong>
						<ul>
							<li>chaesk@a2m.co.kr</li>
							<li>parkjk@a2m.co.kr</li>
						</ul>
					</span>
				</li>
				<li>
					<span>
						<strong>Our location</strong>
						<ul>
							<li>13, Banseok-ro, Yuseong-gu, <br>Daejeon, Republic of Korea</li>
						</ul>
					</span>
				</li>
			</ul>
			
			<div class="order-form-wrap">
				<h4 class="heading2">Get in touch</h4>
				<p class="depth">Write us a letter !</p>
				<ul class="order-form">
					<li>
						<ul>
							<li>
								<div class="input-group input-group-ful">
									<input type="text" placeholder="First Name">
								</div>
							</li>
							<li>
								<div class="input-group input-group-ful">
									<input type="text" placeholder="Last Name">
								</div>
							</li>
						</ul>
					</li>
					<li>
						<ul>
							<li>
								<div class="input-group input-group-ful">
									<input type="text" placeholder="Company">
								</div>
							</li>
							<li>
								<div class="input-group input-group-ful">
									<input type="text" placeholder="Tel">
								</div>
							</li>
						</ul>
					</li>
					<li>
						<div class="input-group input-group-ful">
							<input type="text" placeholder="Email">
						</div>
					</li>
					<li>
						<div class="input-group input-group-ful">
							<textarea placeholder="Message"></textarea>
						</div>
					</li>
				</ul>
				
				<ul class="checkbox-radio-custom">
					<li>
						<input type="checkbox" id="webApplication">
						<label for="webApplication">Web application</label>
					</li>
					<li>
						<input type="checkbox" id="desktopApplication">
						<label for="desktopApplication">Desktop application</label>
					</li>
				</ul>
				<!-- case radio -->
				<!-- <ul class="checkbox-radio-custom">
					<li>
						<input type="radio" id="webApplication1" name="radio">
						<label for="webApplication1">Web application</label>
					</li>
					<li>
						<input type="radio" id="desktopApplication1" name="radio">
						<label for="desktopApplication1">Desktop application</label>
					</li>
				</ul> -->
				
				<div class="btn-wrap">
					<button type="button" class="btn-style btn-style3">Submit</button>
				</div>
			</div>
		</div>
	</section>
	<section class="section" id="section2">
		<div class="container">
			<h3 class="heading1">RELATED PRODUCT</h3>
			<ul class="board-lst">
				<li class="col-md-3 col-sm-6">
					<a href="#none">
						<span class="img">
							<img src="/img/market/sub/product5.png" alt="img 설명">
						</span>
						<span class="txt">
							<strong class="ellipsis-ext">Predict</strong>
							<span class="ellipsis-ext-sub">See into the future and optimize assets with predictive component monitoringSee into the future and optimize assets with predictive component monitoring</span>
						</span>
					</a>
				</li>
				<li class="col-md-3 col-sm-6">
					<a href="#none">
						<span class="img">
							<img src="/img/market/sub/product6.png" alt="img 설명">
						</span>
						<span class="txt">
							<strong class="ellipsis-ext">i4SEE Perfomance</strong>
							<span class="ellipsis-ext-sub">See into the future and optimize assets with predictive component monitoringSee into the future and optimize assets with predictive component monitoring</span>
						</span>
					</a>
				</li>
				<li class="col-md-3 col-sm-6">
					<a href="#none">
						<span class="img">
							<img src="/img/market/sub/product7.png" alt="img 설명">
						</span>
						<span class="txt">
							<strong class="ellipsis-ext">Pexapark Energy Sales Reporting</strong>
							<span class="ellipsis-ext-sub">See into the future and optimize assets with predictive component monitoringSee into the future and optimize assets with predictive component monitoring</span>
						</span>
					</a>
				</li>
				<li class="col-md-3 col-sm-6">
					<a href="#none">
						<span class="img">
							<img src="/img/market/sub/product8.png" alt="img 설명">
						</span>
						<span class="txt">
							<strong class="ellipsis-ext">Real-Time Data</strong>
							<span class="ellipsis-ext-sub">See into the future and optimize assets with predictive component monitoringSee into the future and optimize assets with predictive component monitoring</span>
						</span>
					</a>
				</li>
			</ul>
		</div>
	</section>
	
<jsp:include page="include/footer.jsp"></jsp:include>