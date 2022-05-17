<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html>
<html lang="KO-KR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <title>wind Turbine Platform</title>
  <meta name="robots" content="index,follow">
  <meta name="keywords" content="WT, Wind, Turbine, Platform">
  <meta name="description" content="">
  <meta name="copyright" content="Copyright 2020 © AtwoM. ALL Rights Reserved">
  <link href="${ctxPath}/stylesheet/common/common.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/layout.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/jquery.mCustomScrollbar.min.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/main.css" rel="stylesheet" type="text/css" media="all">

  <script type="text/javascript" src="${ctxPath}/script/lib/jquery-2.2.4.min.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/lib/jquery.mCustinScrollbar.concat.min.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/common.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/layout.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/main.js"></script>

  <!--[if lt IE 9]>
 <script src="/_res/jquery/html5shiv.js"></script>
 <script src="/_res/jquery/respond.1.4.2.min.js"></script>
<![endif]-->
</head>

<body class="gnb-active">
  <div id="wrap">
    <jsp:include page="include/header.jsp"></jsp:include>
    <!--contents-->
    <section id="contents">
      
      <!--detail-content-->
      <div id="detail-content">

      <!--main-->
      <main id="main">
        <div class="setting-menu">
        	<div class="set-menu-lst-scroll">
        		<ul class="set-menu-lst">
	        		<li class="used">
	        			<a href="#none">
	        				<span>
	        					<i class="xi-view-carousel"></i>
	        					Operation Condition
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-paper"></i>
	        					Sensor error
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-paper"></i>
	        					SCADA Alarm
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-paper"></i>
	        					Report
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Availability
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Production
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        		<li>
	        			<a href="#none">
	        				<span>
	        					<i class="xi-chart-bar"></i>
	        					Failure Rate
	        				</span>
	        			</a>
	        		</li>
	        	</ul>
        	</div>
        	<a href="#none" class="set-menu-add">
        		<i class="xi-plus-circle"></i>
        		<span class="sr-only">Add menu</span>
        	</a>
        </div>
        
        
        <div class="set-layout-wrap">
        	<h2 class="heading7">Setting Dashboard
        		<span class="btns">
        			<a href="" class="btn-style btn-style2">
        				<i class="xi-refresh"></i>
        				<span class="sr-only">Initialization</span>
        			</a>
        			<a href="" class="btn-style btn-style1">Save</a>
        		</span>
        	</h2>
        	
        	<div class="set-dashboard-layout">
        		<div class="line-layerout-wrap">
        			<div class="col-wrap">
        				<span></span>
        				<span></span>
        				<span></span>
        				<span></span>
        				<span></span>
        				<span></span>
        			</div>
        			<div class="row-wrap">
        				<span></span>
        				<span></span>
        				<span></span>
        				<span></span>
        				<span></span>
        				<span></span>
        			</div>
        		</div>   
        		
        		
        		<div class="dashboard-box-wrap">
        			<!-- Percentage divided into 16.666%, 33.332%, 49.998%, 66.664%, 83.33% -->
	        		<div class="box box1" style="width:66.664%;height:16.666%;">
			            <div class="box-cont">
			              <strong class="heading6">
			                <i class="xi-view-carousel"></i>	
			                <span>Operation Condition</span>
			                <a href="" class="box-btn">
			                  <i class="xi-close"></i>
			                </a>
			              </strong>
			              
			              <div class="box-cont-wrap editing-box-wrap">
			              	<a href="#none" class="editing-box"></a>
			              </div>
			        	</div>
			    	</div>
	        	</div>
        	</div>
        </div>
		
		<div id="layerPopupAddLst" class="layer-popup-add-list">
		  <div class="layer-cont">
		    <div class="tit-wrap">
		      <strong class="heading8">Add list</strong>
		    </div>
		    <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
				<ul class="registration-form-lst">
					<li>
						<span>Title</span>
						<div class="registration-write">
							<div class="input-group">
								<label for="addLstTitle" class="sr-only">Title</label>
								<input type="text" id="addLstTitle" name="addLstTitle" value="">
							</div>
						</div>
					</li>
					<li>
						<span>URL</span>
						<div class="registration-write">
							<div class="input-group">
								<label for="addLstUrl" class="sr-only">URL</label>
								<input type="text" id="addLstUrl" name="addLstUrl" value="">
							</div>
						</div>
					</li>
				</ul>
			</div>
			
			<div class="registration-form-lst-wrap">
				<ul class="registration-form-lst">
					<li>
						<span>Min width</span>
						<div class="registration-write">
							<div class="input-group">
								<label for="addLstMinWidth" class="sr-only">Min width</label>
								<input type="text" id="addLstMinWidth" name="addLstMinWidth" value="">
							</div>
						</div>
					</li>
				</ul>
				<ul class="registration-form-lst">
					<li>
						<span>Min height</span>
						<div class="registration-write">
							<div class="input-group">
								<label for="addLstMinHeight" class="sr-only">Min height</label>
								<input type="text" id="addLstMinHeight" name="addLstMinHeight" value="">
							</div>
						</div>
					</li>
				</ul>
			</div>
			
			<div class="add-lst-select-icon">
				<span>Select icon</span>
				<ul class="icon-lst">
					<li class="active">
						<a href="#none">
							<i class="xi-view-carousel"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-view-list"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-library-bookmark"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-package"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-mail"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-call"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-comment"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-forum"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-message"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-user-address"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-profile"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-group"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-star"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-heart"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-thumbs-up"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-trophy"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-bell"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-alarm"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-time"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-calendar"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-calendar-list"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-new"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-info"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-help"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-error"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-ban"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-warning"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-shield-checked"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-list-square"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-list-number"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-document"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-eraser"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-layout-snb"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-presentation"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-plug"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-battery-50"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-gps"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-chip"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-touch"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-usb"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-book"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-image"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-equalizer"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-equalizer-thin"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-flash"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-paper"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-library-books"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-library-image"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-chart-line"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-chart-bar-square"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-timer"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-map"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-location-arrow"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-walk"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-maker"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cart"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-box"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-coupon"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-exchange"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-money"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-briefcase"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-receipt"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-text"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-documents"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-upload"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-download"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-check"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-folder"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-folder-open"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-attachment"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cloud"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cloud-upload"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cloud-download"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-upload"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-download"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-globus"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-browser-text"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-central-router"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-branch"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-sitemap"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-sun"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-network-server"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-server"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-antenna"></i>
						</a>
					</li>
				</ul>
				<div class="btns txt-right">
					<a href="" class="btn-style btn-style2">Cancel</a>
					<a href="" class="btn-style btn-style2">Complete</a>
				</div>
			</div>
					
		    <a href="#none" class="layer-add-list-close">
		      <span class="sr-only">close layer popup</span>
		      <i class="xi-close"></i>
		    </a>
		   </div>
		 </div>
	
        
      </main>
      <jsp:include page="include/main_footer.jsp"></jsp:include>
      <!--main-->

      <!--main에만 들어가는 js-->
      <script src="https://code.highcharts.com/stock/highstock.js"></script>
      <script src="https://code.highcharts.com/stock/modules/data.js"></script>
      <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/stock/modules/export-data.js"></script>

      <script type="text/javascript">
        $(document).ready(function() {
          $('body').addClass('setting-wrap');
          $('#header .t-side > ul > li').removeClass('active');
          $('#header .t-side > ul > li.change-layout-btn').addClass('active');
        });
      </script>
      <!--//main에만 들어가는 js-->