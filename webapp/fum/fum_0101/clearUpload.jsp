<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="kr.a2mvn.largefileupload.controller.*"%>
<%@page import="kr.a2mvn.largefileupload.exception.FumException"%>
<%
	FumController ctr = FumController.getInstance();
	String res = "";
	try {
		res = ctr.clearUpload(request);
	} catch (FumException ex) {
		res = ctr.handleCustomException(ex, request, response);
	} catch (Exception e) {
		e.printStackTrace();
		res = e.getMessage();
	}

	response.setHeader( "Pragma", "no-cache" );
	response.setHeader( "Cache-Control", "no-cache" );
	response.setDateHeader( "Expires", 0 );
	out.print(res);
%>
