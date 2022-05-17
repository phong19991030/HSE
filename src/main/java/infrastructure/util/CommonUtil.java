package infrastructure.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 공통 Utility 클래스.
 * @FileName  : CommonUtil.java
 * @Project     : mis_java
 * @최초작성일 : 2014. 9. 26. 
 * @프로그램설명 : 공통적인 데이터 변경등의 기능을 수행하는 단위 컴포넌트
 */
/**
 * @author keim
 *
 */
/**
 * 기능명 
 * @작성일    : 2015. 6. 22. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public final class CommonUtil
{
	protected static Logger logger = LogManager.getLogger(CommonUtil.class);
	/** 
	 * 도메인
	*/
    public static String getDomain(HttpServletRequest req) {
        StringBuffer sb = new StringBuffer();
        sb.append(req.getScheme());
        sb.append("://");
        sb.append(req.getServerName());
        sb.append(":");
        sb.append(req.getServerPort());
        sb.append(req.getContextPath());
        return sb.toString();
    }  

	/**
	 * Map에 대한 데이타 가져오기
	 * @param map - 대상Map
	 * @param key - 데이터를 가져올 Key
	 * @param defaultValue - 데이터가 없는 경우 기본값
	 * @return String
	 */
    public static String getMapValue(Map map, String key, String defaultValue){
        if (map == null) return "";
        Object value = map.get(key);
        if (value == null) return defaultValue;
        if (StringUtils.isEmpty("" + value)) return defaultValue;
        return "" + value;
    }
    
    public static boolean isEmpty(Object obj) {
		if(obj == null) return true;

		if ((obj instanceof String) && (((String)obj).trim().length() == 0)) { return true; }
		
		if (obj instanceof Map) { return ((Map<?, ?>) obj).isEmpty(); }
		
		if (obj instanceof Map) { return ((Map<?, ?>)obj).isEmpty(); }
		
		if (obj instanceof List) { return ((List<?>)obj).isEmpty(); }
		
		if (obj instanceof Object[]) { return (((Object[])obj).length == 0); }
		
    	return false;
    }

    /**
     * NUll 체크 로직 
     * @작성일    : 2014. 9. 26. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명:  TEST - LOGIC TEST 이후 수정 필   
     */
    public static boolean isNull(Object obj){
    	if(obj ==null){
    		return true;
    	}
    	return false;
    }
    

    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean isNotEmpty(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp !=null && !tmp.equals("")){
    		return true;
    	}
    	return false;
    }
    
    /**
     * byte 체크 
     * @작성일    : 2015. 4. 27. 
     * @작성자      : keim
     * @프로그램설명 : 바이트 체크 
     * @진행상태설명:  TO-DO :  
     */
	public static String rightBytes(String strValue, int iByte) {
		byte[] result = null;

		if(strValue == null){
			return null;
		}else if(strValue.equals("") || iByte < 0){
			return new String("");
		}else{
			byte[] source = strValue.getBytes();

			if(source.length < iByte){
				return new String(strValue);
			}else{
				result = new byte[iByte];
				System.arraycopy(source, source.length - iByte, result, 0, iByte);
				return new String(result);
			}
		}
	}
    
	/**
     * 지정한 문자열로 지정한 길이만큼 반복해서 채운다. 
     * @작성일    : 2015. 4. 27. 
     * @작성자      : keim
     * @프로그램설명 : 
     * fill("#", 5) return : "#####"
	 * fill("abc", 7) return : "abcabca"
	 * fill("abc", 2) return : "ab" 
     * @진행상태설명:  TO-DO :  
     */
	public static String fill(String strPattern, int iLen){
		StringBuffer sb = new StringBuffer();

		if( strPattern == null){
			return null;
		}else if(strPattern.equals("") || iLen < 0){
			return "";
		}else{
			for(int i = 0; i < iLen; i = i + strPattern.length()){
				sb.append(strPattern);
			}
		}

		return sb.substring(0, iLen);
	}
	
	
	
    /**
     * 인스턴스 타입 리턴 
     * @작성일    : 2014. 9. 26. 
     * @작성자      : keim
     * @프로그램설명 : pameter Object 에 대하여 클래스 유형을 
     * @진행상태설명:  TO-DO : 미정의된 클래스에 대하여 reflection으로 클래스를 찾아 타입 리턴 
     */
    public static Class getInstanceType(Object obj){
    	Object cls = new Object();
    	if(obj != null ){
	    	if(obj instanceof String){
	    		cls= new String();
	    	}else if(obj instanceof Integer){
	    		cls= new Integer(0);
	    	}else if(obj instanceof Double){
	    		cls= new Double(0);
	    	}else if(obj instanceof Float){
	    		cls= new Float(0);
	    	}else if(obj instanceof HashMap){
	    		cls= new HashMap();
	    	}else if(obj instanceof ArrayList){
	    		cls= new ArrayList();
	    	}else if(obj instanceof BigDecimal){
	    		cls= new BigDecimal(0);
	    	}else if(obj instanceof Date){
	    		cls= new Date();
	    	}else {
	    		cls = obj;
//	    		Reflection refex = new Reflection();
	    	}
    	}
    	return cls.getClass();
    }
    
    
    
    /**
     * 구동되는 상대 경로 추출
     * @작성일    : 2014. 10. 24. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명:  TEST 리눅스 환경 window 환경 테스트 필요 
     */
    public static String  getDirectoryPath(String proName){
    	Class cls = CommonUtil.class;
//    	String proName = "mis_java";
    	/*
    	 * @JK - 보안 취약점 수정
    	 */
    	//String path = cls.getClassLoader().getResource("").getPath();
    	String path = "";
    	if(cls.getClassLoader().getResource("").getPath() != null) {
    		path = cls.getClassLoader().getResource("").getPath();
    	}
//    	String path = "/web/mis/WEB-INF/class";
    	String directory = "";
//    	ResourceUtil.getMessage
//    	ResourceBundle bundle= ResourceBundle.getBundle("kr.or.innopolis.mis.config.properties.system",Locale.KOREAN);
    	Map messageMap = ResourceUtil.getMessageMap("system.dir.upload");
    	
//    	if(proName.equals("excelDownload")){
//    		directory = bundle.getString("dir.download.excel");
//    	}
    	
    	if(messageMap.get(proName) instanceof Map){
    	directory = (String) ((Map)  messageMap.get(proName)).get("MESSAGE");
    	}else if (messageMap.get(proName) instanceof String)
    	directory = (String)   messageMap.get(proName);
    	
//		String proName = "mis_java";
//    	System.out.println(path);
//    	System.out.println(proName);
    	
    	if( path.indexOf("WEB-INF") > 0){
    		path = path.substring(0,path.indexOf("WEB-INF"));
    		if(path.indexOf("/") == 0 ){
    			path = path.substring(1);
    		}
    	}else{
    		path = "/web/mis";
    	}
    	
    	logger.error("path"+path);
    	
//    	path = path.substring(0,path.lastIndexOf("/",path.lastIndexOf("/",path.lastIndexOf("/")-1)-1));
    	path += directory;
    	return path;
    }
    
    public static String getDirectoryDownloadExcel(){
    	return getDirectoryPath("excelDownload");
    }
    
    public static String getDirectoryUploadDefault(){
    	return getDirectoryPath("default");
    }
    
    public static String getDirectoryUploadExcel(){
    	return getDirectoryPath("excelUpload");
    }
    
    public static String getDirectoryDownloadHomeTax(){
    	return getDirectoryPath("hometaxDownload");
    }
    public static String getDirectoryUploadEmpImg(){
    	
    	
    	
//    	Class cls = CommonUtil.class;
//    	String path = cls.getClassLoader().getResource("").getPath();
//    	String directory = "";
//    	ResourceBundle bundle= ResourceBundle.getBundle("kr.or.innopolis.mis.config.properties.system",Locale.KOREAN);
//    	
//    	
//    	directory = bundle.getString("dir.upload.img");
//    	logger.error(path);
//    	path = path.substring(0,path.indexOf("WEB-INF"));
//    	path += directory;
    	
    	return getDirectoryPath("empimg");
    }
    
    public static String getDirectoryExportPdf(){
    	return getDirectoryPath("pdf");
    }
    
    public static void printMap(Map map){
    	for (Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()) {
//    		System.out.println(entry.getKey()+" : "+ entry.getValue());
    	}
    }
    
    public static String generateUuidAttachFile() {
		return java.util.UUID.randomUUID().toString();
	}
    
//    public static Map genPdf(String content, String url, String baseURL, boolean usePolaris) throws Exception {
//    	if(!content.startsWith("<html>")) {
//    		content = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/></head><body>" + content + "<page size=\"a4\" width=\"210mm\" height=\"297mm\" orientation=\"portrait\" margin-left=\"20mm\" margin-top=\"10mm\" margin-right=\"20mm\" margin-bottom=\"10mm\" border-left=\"\" border-left-margin=\"5mm\" border-top=\"\" border-top-margin=\"5mm\" border-right=\"\" border-right-margin=\"5mm\" border-bottom=\"\" border-bottom-margin=\"5mm\" background-color=\"\" background-repeat=\"\" background-size=\"cover\" footnote-seperator=\"1pt solid rgb(0, 0, 0)\" footnote-seperator-align=\"left\" footnote-seperator-width=\"25%\" endnote-seperator=\"1pt solid rgb(0, 0, 0)\" endnote-seperator-align=\"left\" endnote-seperator-width=\"25%\" start-page-numbers=\"1\"><pageheader display=\"both\" height=\"15mm\"></pageheader><pagefooter display=\"both\" height=\"15mm\"></pagefooter><footnotes></footnotes><endnotes></endnotes></page></body></html>";
//    	}
//    	content = updateFonts(content);
//    	String fileNamePhysical = generateUuidAttachFile().replace("-", "");
//    	content = content.replaceAll("</span></p>","</span><br /></p>").replaceAll("<col\\s+([^>^/]*)>", "<col $1 />");
//    	if (usePolaris) {
//    		// replace P to DIV, because P tag display not corresponding spacing when export    		
//        	content = content.replaceAll("<p\\s+([^>]*)>", "<div $1>").replaceAll("<p>", "<div>").replaceAll("</p>", "</div>");
//    	}
//    	
//    	Map fileInfo = new HashMap<>();
//		fileInfo.put("fileNamePhysical", fileNamePhysical);
//		fileInfo.put("FLE_TP", "pdf");
//		// export pdf to
//		org.jsoup.nodes.Document document =Jsoup.parse(content, "", Parser.xmlParser());
//		document.outputSettings().escapeMode(org.jsoup.nodes.Entities.EscapeMode.xhtml);
//		//exportPdf(document.toString(), fileInfo, url, baseURL);
//		exportPdf(document, fileInfo, url, baseURL);
//		return fileInfo;
//    }

	

	public static String updateFonts(String text) {
		
		String patternString = "font-family:[a-zA-Z0-9ㄱ-ㅎ가-힣 ',_-]*;";
		String [] ACCEPT_FONTS = new String [] {
				"font-family: Batang;",
				"font-family: 'Arial Unicode MS';",
				"font-family: NanumBarunGothic;",
				"font-family: 'Malgun Gothic';"
		};
		List fonts = Arrays.asList(ACCEPT_FONTS);
		Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(text);
        String ret = "";
        int start = 0;
        int end = 0;
        while(matcher.find()) {
        	ret += text.substring(start, matcher.start());
        	start = matcher.end();
        	if(fonts.contains(matcher.group())) {
        		ret += matcher.group();
        	} else {
        		ret += "font-family: Batang;";
        	}
        	//System.out.println(ret);
        }
        if (start < text.length()) {
        	ret += text.substring(start);
        }
        ret = ret.replaceAll("font-family:[ ]*\"", "font-family: Batang;\""); // for empty font
        //System.out.println(ret);
        return ret;
		//return text.replaceAll("[a-z-]*font-family:[']*[a-zA-Z0-9ㄱ-ㅎ가-힣 _-]*[']*;", "font-family:'Batang';");
	}
	
//	public static void exportPdf(String contentPdf, Map fileInfo, String url, String baseURL) throws Exception {
//		String fileNamePhysical = (String) fileInfo.get("fileNamePhysical");
//		contentPdf = contentPdf.replaceAll("</[a-z]{1}:[a-z]*>","").replaceAll("<[a-z]{1}:[a-z]*>", "");
//		Map pathMessage = ResourceUtil.getMessageMap("system.dir.upload.pdf");
//		String directory = (String) pathMessage.get("MESSAGE");
//		String path = directory + "/" + fileNamePhysical + ".pdf";
//
//		// String path2 = CommonUtil.getDirectoryExportPdf();
//
//		if (!(new File(directory)).isDirectory()) {
//			new File(directory).mkdir();
//		}
//
//		// get font in project
//		// String url = request.getRequestURL().toString();
//		// String baseURL = url.substring(0, url.length() -
//		// request.getRequestURI().length()) + request.getContextPath();
//		//String fontPdf = baseURL + "/stylesheet/font/arialuni.ttf";
//		//String fontPdf2 = baseURL + "/stylesheet/font/batang.ttf";
//		//String fontPdf = baseURL + Utils.getProperty("font.arialuni").replaceAll("/", "\\" + File.separator);
//		//String fontPdf2 = baseURL + Utils.getProperty("font.batang").replaceAll("/", "\\" + File.separator);
//
//		// step 2
//		if (path != null && !path.trim().equals("")) {
//			ITextRenderer renderer = new ITextRenderer();
//			renderer.setDocumentFromString(contentPdf);
////			final String fontDir = baseURL.substring(0, baseURL.length() - 1) + Utils.getProperty("font.baseDir").replaceAll("/", "\\" + File.separator);
////			final String fontDir = baseURL + Utils.getProperty("font.baseDir").replaceAll("/", "\\" + File.separator);
//			final String fontDir = (baseURL + Utils.getProperty("font.baseDir").replaceAll("/", "\\" + File.separator)).replace("//", "/");
//			DecorationDocumentService.resolveFonts(fontDir, renderer);
//			/*renderer.getFontResolver().addFont(fontPdf, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//			renderer.getFontResolver().addFont(fontPdf2, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);*/
//			//int x = DecorationDocumentService.caculateHeightOfA4(new StringBuilder("<div style=\"height: 297mm;\"></div>"), renderer);
//			renderer.layout();
//			FileOutputStream outputStream = new FileOutputStream(path);
//			renderer.createPDF(outputStream, true);
//			renderer.finishPDF();
//
//			File f = new File(path);
//			String FLE_NM = (String) fileInfo.get("fileName") + ".pdf";
//			String NEW_FLE_NM = (String) fileInfo.get("fileNamePhysical") + ".pdf";
//			fileInfo.put("FLE_PATH", path);
//			fileInfo.put("FLE_NM", FLE_NM);
//			fileInfo.put("NEW_FLE_NM", NEW_FLE_NM);
//			fileInfo.put("FLE_SZ", f.length());
//		}
//
//	}
	
//	private static void exportPdf(Document document, Map fileInfo, String url, String baseURL) throws Exception {
//		
//		String fileNamePhysical = (String) fileInfo.get("fileNamePhysical");
//		Map pathMessage = ResourceUtil.getMessageMap("system.dir.upload.pdf");
//		String directory = (String) pathMessage.get("MESSAGE");
//		String path = directory + "/" + fileNamePhysical + ".pdf";
//
//		// String path2 = CommonUtil.getDirectoryExportPdf();
//
//		if (!(new File(directory)).isDirectory()) {
//			new File(directory).mkdir();
//		}
//
//		// get font in project
//		// String url = request.getRequestURL().toString();
//		// String baseURL = url.substring(0, url.length() -
//		// request.getRequestURI().length()) + request.getContextPath();
//		//String fontPdf = baseURL + "/stylesheet/font/arialuni.ttf";
//		//String fontPdf2 = baseURL + "/stylesheet/font/batang.ttf";
//		//String fontPdf = baseURL + Utils.getProperty("font.arialuni").replaceAll("/", "\\" + File.separator);
//		//String fontPdf2 = baseURL + Utils.getProperty("font.batang").replaceAll("/", "\\" + File.separator);
//
//		// step 2
//		if (path != null && !path.trim().equals("")) {
//			ITextRenderer renderer = new ITextRenderer();
//			
//			// ndq: Add blank to doc to avoid overlap start
//			Document cloneDoc = document;
//			
//			try {
//				Element header = cloneDoc.getElementById("template_header");
//				int headerHeight = 0;
//				if(header != null) {
//					headerHeight = DecorationDocumentService.getElementHeight(header, renderer);	
//				}
//				
//				Element footer = cloneDoc.getElementById("template_footer");
//				int footerHeight = 0;
//				if(footer != null) {
//					footerHeight = DecorationDocumentService.getElementHeight(footer, renderer);
//				}
//				
//				
//				int pageHeight = 0;
//				pageHeight = DecorationDocumentService.getElementHeight(cloneDoc, renderer);
//				
//				int a4Height = DecorationDocumentService.getA4PageHeight(renderer);
//				
//				int pageNum = (pageHeight / a4Height) + 1;
//				
//				int eContentHeight = pageNum * (a4Height*277/297) - headerHeight - footerHeight;
//				
//				if(header != null) {
//					header.remove();
//				}
//				if(footer != null) {
//					footer.remove();
//					Element body = cloneDoc.getElementsByTag("body").get(0);
//					DecorationDocumentService.addBlankToElement(body, renderer, eContentHeight);
//					if(header != null) {
//						body.insertChildren(0, header);	
//					}
//					
//					body.insertChildren(-1, footer);					
//				}
//				//System.out.println(cloneDoc.toString());
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			// ndq: Add blank to doc to avoid overlap end
//			
//			String contentPdf = cloneDoc.toString();
//			System.out.println(contentPdf);
//			contentPdf = contentPdf.replaceAll("</[a-z]{1}:[a-z]*>","").replaceAll("<[a-z]{1}:[a-z]*>", "");			
//			renderer.setDocumentFromString(contentPdf);
//			
//			final String fontDir = (baseURL + Utils.getProperty("font.baseDir").replaceAll("/", "\\" + File.separator)).replace("//", "/");
//			DecorationDocumentService.resolveFonts(fontDir, renderer);
//			/*renderer.getFontResolver().addFont(fontPdf, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//			renderer.getFontResolver().addFont(fontPdf2, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);*/
//			//int x = DecorationDocumentService.caculateHeightOfA4(new StringBuilder("<div style=\"height: 297mm;\"></div>"), renderer);
//			renderer.layout();
//			FileOutputStream outputStream = new FileOutputStream(path);
//			renderer.createPDF(outputStream, true);
//			renderer.finishPDF();
//
//			File f = new File(path);
//			String FLE_NM = (String) fileInfo.get("fileName") + ".pdf";
//			String NEW_FLE_NM = (String) fileInfo.get("fileNamePhysical") + ".pdf";
//			fileInfo.put("FLE_PATH", path);
//			fileInfo.put("FLE_NM", FLE_NM);
//			fileInfo.put("NEW_FLE_NM", NEW_FLE_NM);
//			fileInfo.put("FLE_SZ", f.length());
//		}
//	}
	
//	Doan add 20220429
	public static List getListFromStr(String str, String regex){
		List lst = new ArrayList();
		String[] arrOfStr = CastUtil.castToString(str).split(regex);
		for (int i = 0; i < arrOfStr.length; i++) {
			lst.add(arrOfStr[i]);
		}
		return lst;
    }
}