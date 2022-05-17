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
	        		<li class="active">
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
        			<a href="#none" class="btn-style btn-style2">
        				<i class="xi-refresh"></i>
        				<span class="sr-only">Initialization</span>
        			</a>
        			<a href="#none" class="btn-style btn-style1">Save</a>
        		</span>
        	</h2>
        	
        	<div class="set-dashboard-layout set-empty"></div>
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