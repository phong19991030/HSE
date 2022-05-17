<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>전자결재</title>
<style>
.notice {width:600px; padding:35px; border:1px solid #bbbbbb; border-radius:20px; letter-spacing: -1px; font-family:"Noto Sans"}
.title {width:100%; height:63px;}
.title img {float:left; width:152px; height:63px;}
.title .sub_title{float:right; line-height:25px;font-weight:600; color:#4c4c4c;}
.contents {width:100%; padding-top:20px; padding-bottom:20px;}
.contents .text_title{font-size:20px; color:#3a52d8;  font-weight:bold;}
.text{font-size:14px; color:#666666; font-weight:500;padding-bottom:30px;}
.footer{width:100%; height:50px; padding-top:30px; padding-bottom:10px; border-top:1px solid #bbbbbb;}
.footer .sender{float:left; font-size:16px; font-weight:600; color:#666666;}
.footer .date {float:right; font-size:16px; color:#666666; font-weight:500;}
.notice strong{font-weight:600;}
</style>
</head>
	<body>
        <div class="notice">
				<div class="title">
					<a href="apvl.a2m.co.kr"><img alt="에이투엠로고" src="http://apvl.a2m.co.kr/images/atwomlogo.png"></a>
					<div class="sub_title">공지사항</div>
				</div>
				<div class="contents">
					<p class="text_title"><strong>[공지사항] ${NOTICE_TTL}</strong></p>
				</div>
				<div class="text">
					${NOTICE_CONT}
				</div>
				<div class="footer">
					<div class="sender">${DEPT_NM}<br><strong>${NAME_KR} ${PST_NM}</strong>드림</div>
					<div class="date"><strong>${TODAY}</strong></div>
				</div>
			</div>
    </body>
</html>
