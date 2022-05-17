<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!-- Accessibility -->
<a href="#contents" class="skip-to sr-only">본문 바로가기</a>

<!--header-->
<header id="header">
	<div class="headerwrap">

		<!-- mobile -->
		<a href="javascript:void(0);" class="all-menu">
			<span class="sr-only">All menu</span>
			<em>
				<em></em>
			</em>
		</a>
		<!-- //mobile -->

		<h1 class="logo">
			<a href="/" class="logo-wrapper">
				<img style="height:100%" src="/img/market/sub/bywind_logo.png">

			</a>
<!-- 			<em class="txt">by Wind - Store</em> -->
		</h1>

		<div class="t-side">
			<div class="t-container">
				<div>
					<ul>
						<li class="ov">
							<a href="">Product</a>
						</li>
						<li>
							<a href="">API</a>
						</li>
						<li>
							<a href="">Contact</a>
						</li>
						<li>
							<a href="">About us</a>
						</li>
					</ul>
					
					<!-- logincase -->
					<!-- <a href="" class="login-toggle"><span>Login</span></a> -->
					<!-- logout case -->
					<a href="" class="login-toggle logout-toggle"><span>Logout</span></a>
				</div>
			</div>
		</div>
	</div>
</header>
<!--//header-->
<!--gnb-->
<div class="gnb-wrap">
	
	<nav id="gnb">
		<div class="gnb-lst-wrap">
			<!-- mobile -->
			<ul class="gnb-lst gnb-lst1">
				<li class="ov">
					<a href=""><span>Product</span></a>
				</li>
				<li>
					<a href=""><span>API</span></a>
				</li>
				<li>
					<a href=""><span>Contact</span></a>
				</li>
				<li>
					<a href=""><span>About us</span></a>
				</li>
			</ul>
			<div class="category-select">
				<div class="category-select-lst">
					<dl>
						<dt><a href="#none"><span></span></a></dt>
						<dd id="depart-select" class="select-lst-wrap" style="display: none;">
							<div class="select-lst-option">
								<ul>
									<li>
										<a href="">power</a>
									</li>
									<li>
										<a href="">ims</a>
									</li>
									<li>
										<a href="">category 3</a>
									</li>
									<li>
										<a href="">category 4</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
									<li>
										<a href="">category 5</a>
									</li>
								</ul>
							</div>
						</dd>
					</dl>
				</div>
  
				<!-- <label for="search_type"></label>
				<select name="search_type" id="search_type" class="info-select">
					<option value="1">power</option>
					<option value="2">ims</option>
					<option value="3">category 3</option>
					<option value="3">category 4</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
					<option value="3">category 5</option>
				</select> -->
			</div>
			<!-- //mobile -->
			
			<ul class="gnb-lst gnb-lst2">
				<li class="ov">
					<a href="#">
						<span>power</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>ims</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>category 3</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>category 4</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>categor 5</span>
					</a>
				</li>
			</ul> 
			
			<div class="lang">
				<ul>
					<li>
						<a href="">Eng</a>
					</li>
					<li>
						<a href="">USD</a>
					</li>
				</ul>
			</div>
			
			<div class="newsletter">
				<span><strong>Newsletter</strong>Sign up for our newsletter</span>
				<div class="email-input">
					<input type="text" placeholder="Your email..." id="newsletterInput">
					<button type="submit" id="send-btn" disabled="false"><i class="xi-send"></i></button>
				</div>
			</div>
			
			<div class="socical-wrap">
				<strong>Follow us on socical</strong>
				<ul class="sns-lst">
					<li>
						<a href="">
							<i class="xi-facebook-official"></i>
							<span class="sr-only">facebook</span>
						</a>
					</li>
					<li>
						<a href="">
							<i class="xi-kakaotalk"></i>
							<span class="sr-only">kakaotalk</span>
						</a>
					</li>
					<li>
						<a href="">
							<i class="xi-line-messenger"></i>
							<span class="sr-only">line messenger</span>
						</a>
					</li>
				</ul>
			</div>
			
			<!-- <div class="mobile-setting">
				<div class="mobile-set-cont">
					<div class="cont">
						<div>
							<strong>Alarm Indication</strong>
							<span class="txt">Skydar alarm, getting sensor error notification</span>
							<span class="active-toggle-wrap">
								<input type="checkbox" id="activeToggle3" name="" value="" class="sr-only">
								<label for="activeToggle3"><span class="sr-only">Activation</span></label>
							</span>
						</div>
					</div>
					<span>- When using app notifications, a small amount of data can be charged if you connect to the mobile network rather than WiFi.</span>
				</div>
			</div> -->
		</div>

		<!-- <div class="gnb-side">
			<div class="select-box lang-select">
				<label for="search_type"></label>
				<select name="search_type" id="search_type" class="info-select">
					<option value="1">KO</option>
					<option value="2">EN</option>
					<option value="3">VN</option>
				</select>
			</div>
			mobile
			<a href="#" class="lang-btn">
				<span class="sr-only">Language</span>
				<i class="xi-translate"></i>
			</a>
			<a href="#" class="setting-btn">
				<span class="sr-only">Setting</span>
				<i class="xi-cog"></i>
			</a>
			//mobile
			<a href="#" class="login-toggle-btn">
				<span>LOGOUT</span>
				mobile
				<i class="xi-log-out"></i>
				//mobile
			</a>
		</div> -->
	</nav>
</div>
<!--//gnb-->

<!-- layerpopup - mobile lang-->
<!-- <div id="layerPopupLang" class="layer-popup-lang">
	<div class="layer-cont">
		<strong class="tit">Language</strong>
		<ul class="lang-select-lst">
			<li class="active">
				<a href="#none"><span>KO</span></a>
			</li>
			<li>
				<a href="#none"><span>EN</span></a>
			</li>
			<li>
				<a href="#none"><span>VN</span></a>
			</li>
		</ul>
		<div class="lang-btn-wrap">
			<a href="#none" class="layer-close lang-btn">
				<span>Cancel</span>
			</a>
			<a href="#none" class="lang-btn layer-apply">
				<span>Apply</span>
			</a>
		</div>
	</div>
</div> -->
<!-- //layerpopup - mobile lang -->

<!--responsive-alert-->
<!-- <div class="responsive-alert">
	<div class="load">
		<hr><hr><hr><hr>
	</div>
	 <span>1024px이하 해상도는 <br>모바일에서 접속 부탁드립니다.</span>
</div> -->
<!--//responsive-alert-->