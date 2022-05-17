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
  <link href="${ctxPath}/stylesheet/common/sub.css" rel="stylesheet" type="text/css" media="all">

  <script type="text/javascript" src="${ctxPath}/script/lib/jquery-2.2.4.min.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/common.js"></script>
  
  <!--[if lt IE 9]>
 <script src="/_res/jquery/html5shiv.js"></script>
 <script src="/_res/jquery/respond.1.4.2.min.js"></script>
<![endif]-->
</head>

<body class="gnb-active">
  <div id="wrap">
    <!--contents-->
    <section id="contents">
      <!--detail-content-->
      <div id="detail-content" class="login">
        <div class="login-write-wrap">
          <ul>
            <li>
              <strong>
                <label for="id">ID</label>
              </strong>
              <div class="input-group">
                <input type="text" name="input" id="id">
              </div>
            </li>
            <li>
              <strong>
                <label for="Password">Password</label>
                <a href="" class="forget-pw">Forget Your Password?</a>
              </strong>
              <div class="input-group">
                <input type="password" name="Password" id="Password">
              </div>
            </li>
          </ul>

          <div class="login-btn-wrap">
            <div class="checkbox-radio-custom">
              <input type="checkbox" class="checkbox" id="check">
              <label for="check">Remember Me</label>
            </div>

            <button type="button" name="button">
              <span>Login</span>
            </button>
          </div>
        </div>
		<script>
		  $(document).ready(function() {
		    $('body').removeClass('gnb-active');
		    $('body').addClass('gnb-none');
		  });
	  </script>

<jsp:include page="include/main_footer.jsp"></jsp:include>
