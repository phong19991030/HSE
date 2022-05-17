package applications.mail.refer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;


public class MailFormReciever {
//	String soapUrl =  "http://blog.naver.com/PostList.nhn?blogId=crymini&widgetTypeCall=true";
	String soapUrl =  "";
	
//	String soapUrl ="http://localhost:8080/aos/commun/aosReciever.do";  
	String message;
	URL url;
	URLConnection connection;
	HttpURLConnection conn;
	public MailFormReciever() {
		// TODO Auto-generated constructor stub 
	}
	public String getSoapUrl() {
		return soapUrl;
	}

	public void  setSoapUrl(String soapUrls) {
//		soapUrls = soapUrls.replace("http://blog.naver.com/", "");
//		soapUrls =  "http://blog.naver.com/PostList.nhn?blogId="+soapUrls+"&widgetTypeCall=true";
		System.out.println(soapUrls);
		this.soapUrl = soapUrls;
	}
	public void setVisitUrl(String soapUrls) {
//		soapUrls = soapUrls.replace("http://blog.naver.com/", "");
//		soapUrls= "http://blog.naver.com/NVisitorgp4Ajax.nhn?blogId="+soapUrls;
//		soapUrls =  "http://blog.naver.com/PostList.nhn?blogId="+soapUrls+"&widgetTypeCall=true";
//		System.out.println(soapUrls);
		this.soapUrl = soapUrls;
	}





	public void setSenderConfig(){
		try {
			url = new URL(soapUrl);
			conn = (HttpURLConnection) connection;
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	}
	public String sendExc(String url ){
		setSoapUrl(url);
		return send(soapUrl);
	}
	private String send(String soapUrl){
		boolean success = false; 
		
		String result=null;
		
		try {
			String message;
			URL url;
			
			url = new URL(soapUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("GET");
//			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
			conn.setRequestProperty("User-agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0");
			conn.setRequestProperty("Connection", "keep-alive");
			conn.setRequestProperty("Cache-Control", "max-age=0");
			conn.setRequestProperty("Accept-Language", "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4");
//			conn.setRequestProperty("Accept-Encoding", "gzip,deflate,sdch");
			conn.setUseCaches(false);
			conn.setDefaultUseCaches(false);
			conn.setDoInput(true);
			conn.setDoOutput(false);
			 
			Map<String, List<String>> map = conn.getHeaderFields();
			
			InputStream in = conn.getInputStream();
			byte[] rcvData =new byte[1024000];
			byte tmp ;
			int cnt=0;
			 while(true){ 
				 tmp = (byte) in.read();
				 if(tmp!=-1){
					 rcvData[cnt] = tmp;
				 }else{
					 break;
				 }
				 cnt++; 
			 }
			 
			result = new String(rcvData,"utf-8").trim();
			
//			System.out.println(result);
			
			
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("error");
			success = false;
			result = "false";
		}
		
		return result;
	}
	
	
	
}
