<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="kr.a2mvn.largefileupload.exception.FumException"%>
<%@page import="kr.a2mvn.largefileupload.controller.*"%>
<%
	FumController ctr = FumController.getInstance();
	String res = "";
	try{
		res = ctr.deleteTempFile(request, response);
	}catch(FumException ex){
		res = ctr.handleCustomException(ex, request, response);
	}catch(Exception e){
		e.printStackTrace();
		res = e.getMessage();
	}
	out.print(res);
%>