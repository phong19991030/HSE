<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container">
	<!--tit-wrap-->
	<div class="tit-wrap">
		<h2 class="heading3">
			<span class="txt">Multi Trend</span>
			<span class="version">V47</span>
		</h2>
		<ul class="location">
			<li>HANGWON</li>
			<li>Group01</li>
			<li class="bold">V47</li>
		</ul>
	</div>
	<!--//tit-wrap-->
	<div class="search-form-wrap search-form-wrap2">
		<div class="calendar-picker">
			<div class="calendar-wrap">
				<div class="input-group">
					<label for="searchText" class="sr-only"></label>
					<input type="text" id="searchText" name="searchText" value="">
					<button class="calendar-picker-btn">
						<i class="xi-calendar"></i>
					</button>
				</div>
				<em class="hyphen">
					<span class="sr-only">-</span>
				</em>
				<div class="input-group">
					<label for="searchText" class="sr-only"></label>
					<input type="text" id="searchText" name="searchText" value="">
					<button class="calendar-picker-btn">
						<i class="xi-calendar"></i>
					</button>
				</div>
			</div>
			<button class="search-btn">search</button>
		</div>
	</div>
	
	<div class="graph-wrapper">
		<div class="graph-wrap-scroll">
			<div class="graph-wrap">그래프넣어주세요.</div>
		</div>
		<div class="graph-wrap-scroll">
			<div class="graph-wrap">그래프넣어주세요.</div>
		</div>
		<div class="graph-wrap-scroll">
			<div class="graph-wrap">그래프넣어주세요.</div>
		</div>
	</div>
	
</div>
<!--js-->
<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>