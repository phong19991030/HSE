<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
  
<div class="container"> 
 
	<main class="popup-cont clearfix">
		<div class="wrap">
			<div class="popup-wrap">
			
				<!-- SCADA Alarm -->	
				<div class="popup-type popup-type1">
					<span class="tit">
						<em><strong class="name">159</strong>External RPM guard</em>
					</span>
					<div class="inner">
						<span class="txt">
							<span class="overtxt">
								Platform maintenance will temporarily Stop the servicePlatform maintenance will 
								latform maintenance will temporarily Stop the servicePlatform maintenance will
								latform maintenance will temporarily Stop the servicePlatform maintenance will
							</span>
						</span>
						<span class="location-wrap">
							<span class="location">V47</span>
							<span class="date">Created 2020.01.02</span>	
						</span>
					</div>
					<a href="javascript:void(0);" class="layer-close">
						<span class="sr-only">close layer popup</span>
						<i class="xi-close"></i>
					</a>
					<a href="javascript:void(0);" class="view-btn btn-style">All View
						<i class="xi-long-arrow-right"></i>
					</a>
				</div>
				<!-- //SCADA Alarm -->
			</div>
		</div> 
	
		<div class="wrap">
			<div class="popup-wrap">
			
				<!-- CMS Error -->				
				<div class="popup-type popup-type2">
					<span class="tit">
						<em><span class="blade">Blade1</span><strong>b1-m-edge</strong></em>
					</span>
					<div class="inner">
						<span class="sub">
							<span><strong class="value">12.3</strong>(min : 9.5 / max : 10.2)</span>
						</span>
						
						<span class="location-wrap">
							<span class="location">V47</span>
							<span class="date">Created 2020.01.02</span>	
						</span>
					</div>
					<a href="javascript:void(0);" class="layer-close">
						<span class="sr-only">close layer popup</span>
						<i class="xi-close"></i>
					</a>
					<a href="javascript:void(0);" class="view-btn btn-style">Detail
						<i class="xi-long-arrow-right"></i>
					</a>
				</div>
				<!-- //CMS Error -->					
				
			</div>
		</div>

	</main>

</div>
<jsp:include page="include/footer.jsp"></jsp:include>