<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="kr.a2mvn.largefileupload.model.FumFile"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStream"%>
<%@page import="kr.a2mvn.largefileupload.exception.FumException"%>
<%@page import="kr.a2mvn.largefileupload.controller.*"%>
<%@ page import="java.net.URLEncoder" %>
<%
	FumController ctr = FumController.getInstance();
	try{
		ServletOutputStream  os = response.getOutputStream();
		Map<String,Object> fileInfo = ctr.downloadFile(request, response);
		File file = (File)fileInfo.get("file");
		FumFile info = (FumFile)fileInfo.get("info");
		String fileNameDownload = (String)fileInfo.get("fileNameDownload");
		response.setContentType("application/force-download");
		response.setHeader("Content-Disposition",  
				"attachment; filename=\"" + URLEncoder.encode(fileNameDownload, "UTF-8") + "\"");
		response.setHeader("Set-Cookie", "fileDownload=true; path=/");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		// get your file as InputStream
		InputStream fileIn = new FileInputStream(file);
		byte[] outputByte = new byte[1024];
		// copy binary contect to output stream
		Long i =1L;
		while (fileIn.read(outputByte, 0, 1024) != -1) {
			i = i+1L;
			os.write(outputByte, 0, 1024);
			
			info.setDownloadSize(i*1024);
			session.setAttribute(info.getUniqueIdentifier(), info);
		}
		//release file
		fileIn.close();
		
		info.setDownloadSize(file.length());
		session.setAttribute(info.getUniqueIdentifier(), info);
		
		os.flush();
		os.close();
		return;
	}catch(FumException ex){
		response.setHeader("Set-Cookie", "fileDownload=false; path=/");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		String res = ctr.handleCustomException(ex, request, response);
		out.print(res);
	}catch(Exception e){
		response.setHeader("Set-Cookie", "fileDownload=false; path=/");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		e.printStackTrace();
		String res = e.getMessage();
		out.print(res);
	}
	
%>