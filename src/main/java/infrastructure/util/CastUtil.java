package infrastructure.util;

import infrastructure.inheritance.model.defaultModel.DefaultModel;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
public final class CastUtil
{
	protected static Logger logger = LogManager.getLogger(CommonUtil.class);
	
    /**
     * 타입 상관없이 Long으로 변경 
     * @작성일    : 2016. 4. 27. 
     * @작성자      : "kimhd"
     * @프로그램설명 : 
     * @진행상태: COMPLETE 
     * @param obj - Object : 소수로 변환할 객체
     * @return long
     */
    public static long castToLong(Object obj){
    	String str = castToString(obj).trim();
    	if(str.equals("")) return 0;
    	else return Long.parseLong(str);
    }
 
    /**
     * 타입 상관없이 Double로 변경 
     * @작성일    : 2016. 4. 27. 
     * @작성자      : "kimhd"
     * @프로그램설명 : 
     * @진행상태: COMPLETE 
     * @param obj - Object : 소수로 변환할 객체
     * @return double
     */
    public static double castToDouble(Object obj){
    	String str = castToString(obj).trim();
    	if(str.equals("")) return 0;
    	else return Double.parseDouble(str) ;
    }
    
	/**
	 * 숫자형 데이터를 회계 단위로 표현
	 * @작성일	: 2014. 11. 17.
	 * @작성자	: keim
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
	 * @param num - String : 회계 단위로 표현할 숫자형 데이터
	 * @return String
	 */
	public static String addComma(String num){
		NumberFormat nf = NumberFormat.getInstance();
		if(num == null || num.trim().equals("")) num = "0";
		return nf.format(Long.parseLong(num));
	}   
	
	/**
	 * 문자열의 배열로 이루어진 문자열을 Array<String>로 변환
	 * @작성일	: 2016. 4. 27.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : "STR1, STR2, STR3, ..." 형태의 문자열을
	 * {"STR1", "STR2", "STR3", ...} 형태의 Array로 변환 
	 * @진행상태: COMPLETE
	 * @param obj - Object: 문자열의 배열로 이루어진 문자열 혹은 이러한 문자열로
	 * 변환될 수 있는 객체
	 * @param regex - String: 문자열들을 서로 구분하기 위한 문자
	 * @param limit - int: 문자열의 배열에서 문자열의 개수
	 * @return String[]: 결과로 얻은 문자열의 배열
	 */
	public static String[] castToArray(Object obj, String regex, int limit) {
		String str = castToString(obj);
		if (str != null && !str.equals("")) {
			str = str.replace("[", "").replace("]", "");
			String[] res = str.split(regex, limit);
			return res;
		}
		return null;
	}
	public static String[] castToArray(Object obj, String regex) {
		
		return castToArray(obj,regex, -1);
	}
	
	/**
	 * 문자열의 배열로 이루어진 문자열을 ArrayList<String>로 변환
	 * @작성일	: 2016. 4. 27.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : "STR1, STR2, STR3, ..." 형태의 문자열을
	 * ["STR1", "STR2", "STR3", ...] 형태의 Array로 변환 
	 * @진행상태: COMPLETE
	 * @param obj - Object: 문자열의 배열로 이루어진 문자열 혹은 이러한 문자열로
	 * 변환될 수 있는 객체
	 * @param regex - String: 문자열들을 서로 구분하기 위한 문자
	 * @param limit - int: 문자열의 배열에서 문자열의 개수
	 * @return ArrayList<String> : 결과로 얻은 문자열의 배열
	 */
	public static List<String> castToList(Object obj, String regex, int limit) {
		List<String> res = null;
		res =  Arrays.asList(castToArray(obj,regex,limit));
		return res;
	}
	public static List<String> castToList(Object obj, String regex) {
		return castToList(obj,regex, -1);
	}
	
    /**
     *  파라미터에서 regex 찾아 제거하고 반환
     * @작성일	: 2014. 11. 17.
     * @작성자	: keim
     * @프로그램설명 :
     * @진행상태: COMPLETE
     * @param parameter - Object regex가 포함된 변환대상
     * @param regex - String 제거할 문자 ex) '-' , ','
     * @return String : regex가 제거된 변환된 문자열
     */
    public static String stripExp(Object parameter, String regex) {
        return castToString(parameter).replaceAll(regex, "");
    }   
    
    /**
     * 타입 상관없이 Integer으로 변경 
     * @작성일    : 2014. 11. 17. 
     * @작성자      : keim
     * @프로그램설명 : 
     * @진행상태: COMPLETE 
     * @param obj - Object : 정수로 변환할 객체
     * @return Integer
     */
    public static Integer castToInteger(Object obj){
    	String str = castToString(obj).trim();
    	if(str.equals("")) return 0;
    	else return Integer.parseInt(str);
    }
    
    /**
     * 타입 상관없이 float으로 변경 
     * @작성일    : 2014. 11. 17. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE 
     * @param obj - Object : 소수로 변경할 데이터 객체
     * @return float : 변경된 소수
     */
    public static Float castToFloat(Object obj){
    	String str = castToString(obj).trim();
    	if(str.equals("")) return (float) 0.0;
    	else return Float.parseFloat(str);
    }
    
    
    
    /**
     * 타입 상관없이 String으로 변경 
     * @작성일 : 2014. 11. 17. 
     * @작성자 : keim
     * @프로그램설명 : 
     * @진행상태:  COMPLETE  
     * @param obj - String : 대상 문자열(ex.  "A01,A02,A03")
     * @param separator - String : 구분자(ex. ",")
     * @return String
     */
    public static String castToString(Object obj){
    	String str = new String();
    	if(obj instanceof List){
    		str = ((List)obj).toString();
    	}else if(obj instanceof Map){
    		str = ((Map)obj).toString();
    	}else if(obj instanceof Integer){
    		str= Integer.toString((Integer) obj);
    	}else if(obj instanceof Float){
    		str= Float.toString((Float) obj);
		}else if(obj instanceof Double){
			str= Double.toString((Double) obj);
		}else if(obj instanceof BigDecimal){
			str= ((BigDecimal) obj).toString();	
		}else if(obj instanceof Boolean){
			str= Boolean.toString((Boolean) obj);		
		}else if(obj instanceof Long){
			str= Long.toString((Long) obj);		
		}else if(obj instanceof String){
			str = (String) obj;
		}else{
			
			str="";
		}
    	
    	return str;
    }
    
	/**
	 * 타입 상관없이 String으로 변경하되, null이거나 공백문자일 경우 대체 문자열로 반환
	 * @작성일	: 2016. 4. 27.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : 
	 * @진행상태 : COMPLETE
	 * @param parameter - Object : 대상 문자열 혹은 문자열로 변환될 수 있는 객체
	 * @param replacement - String : 대체 문자열
	 * @return String
	 */
	public static String castToString(Object parameter, String replacement){
		String str = castToString(parameter);
		if (str == null || str.equals("")) {
			return replacement;
		} else {
			return str;
		}
	}
    
    /**
     * "Y" 또는 "true" 문자열을 부울 대수 true로 반환
     * @작성일	: 2016. 4. 27.
     * @작성자	: "kimhd"
     * @프로그램설명 :
     * @진행상태: COMPLETE
     * @param obj - Object : 부울 대수로 변환할 객체
     * @return boolean : 변환 결과를 담은 부울 대수
     */
    public static boolean getBool(Object obj){
    	String str = castToString(obj);
    	boolean bool = false;
    	if(str != null && (str.equals("Y") || str.equals("true"))) {
    		bool = true;
    	}
    	return bool;
    }
    
    /**
     * List<Map> -> List<Model>
     * @작성일    : 2014. 11. 6. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TO-DO, DEBUG, TEST, COMPLETE  
     * @param list - List<Map> :
     * @param obj - Object : 변환할 모델 객체
     * @return List : 
     */
    public static List getMapToModelList(List<Map> list,Object obj){
    	List resultList= new ArrayList();
    	try {
			for(Map map : list){
				DefaultModel model = (DefaultModel) obj.getClass().newInstance() ;
				resultList.add(model.getMapToModel(map,model));
			}
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.error(e.getMessage());
		}
    	
    	return resultList;
    }
    
    
    /**
     * Model -> Map
     * @작성일    : 2014. 11. 3. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TO-DO, DEBUG, TEST, COMPLETE  
     * @param obj - Object : 
     * @return Map : 
     */
    public static Map getModelToMap(Object obj){
    	Map map = new HashMap();
    	try {
    		if(obj instanceof DefaultModel){
				for(Method method :obj.getClass().getDeclaredMethods()){
					method.setAccessible(true);
					if(method.getName().startsWith("get") && ! method.getName().startsWith("getClass")){
						Object val = method.invoke(obj, null);
						map.put(method.getName().replace("get", "").toUpperCase(),val);
					}
				}
    		}else if(obj instanceof Map ){
    			map = (Map)obj;
    		}
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		}
    	return map;
    }
    
    /**
     * List<Model> - > List<Map>
     * @작성일    : 2014. 11. 3. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TEST
     * @param list - List<?> : 
     * @return List : 
     */
    public static List getModelToMapList(List<?> list){
    	List resultList = new ArrayList();
    	
    	try {
    		for(Object obj : list){
    			resultList.add(getModelToMap(obj));
    		}
    	} catch (SecurityException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} 
    	return resultList;
    }
    
    
    
    
    /**
     * Map - > List<Map>
     * @작성일    : 2014. 11. 3. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TEST
     * @param list - List<?> : 
     * @return List : 
     */
    public static List convertMapToMapList(Map<?,?> map,String keyField, String valueField){
    	List resultList = new ArrayList();
    	
    	try {
    		for (Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()) {
    			Map newMap = new HashMap();
    			newMap.put(keyField, entry.getKey());
    			newMap.put(valueField, entry.getValue());
    			resultList.add(newMap);
    			
    			
    		
    		}
    		
    		
    	} catch (SecurityException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} 
    	return resultList;
    }
    
    /**
     * List<Map> -> Map 
     * @작성일    : 2014. 11. 3. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TEST
     * @param list - List<?> : 
     * @return List : 
     */
    public static Map convertMapListToMap(List<Map> list,String keyField, String valueField){
//    	List resultList = new ArrayList();
    	Map resultMap = new HashMap();
    	try {
    		
    		for(Map map : list ){
    			resultMap.put(map.get(keyField) , map.get(valueField));
    			
    		}
    		
    	} catch (SecurityException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		} 
    	return resultMap;
    }
    
    /**
     * KSC-5601  인코딩으로 변황
     * @작성일    :  
     * @작성자      : 
     * @프로그램설명 :
     * @진행상태설명:   
     * @param obj - Object : 
     * @return String : 
     */
    public static String toStringEncodedKsc5601(Object obj) throws UnsupportedEncodingException{
        if (obj == null)
            return "" ;
        String str = "" + obj;        
        byte [] ksc5601 = str.getBytes("KSC5601");
        
        return new String(ksc5601);
    }

    /**
     * 기능명
     * @작성일	: 2014. 11. 17.
     * @작성자	: keim
     * @프로그램설명 :
     * @진행상태: COMPLETE
     * @param list - List<Map> : 
     * @return List<Map> : 
     */
    public static List convertXmlListToListMap(List<Map> list) throws Exception{
    	
		for(Map tmpMap :list){
			tmpMap.putAll(convertNodesFromXml((String)tmpMap.get("TXT")));
			tmpMap.remove("TXT");
		}
		
		return list;
	}
    
    
	/**
	 * 기능명
     * @작성일	: 2014. 11. 17.
     * @작성자	: keim
     * @프로그램설명 :
     * @진행상태: COMPLETE
     * @param xml - String : 
     * @return Map<String, String> : 
	 */
	public static Map<String, String> convertNodesFromXml(String xml) throws Exception {
//		System.out.println("xml :::: " + xml);
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		dbf.setValidating(false);
		dbf.setNamespaceAware(true);
		dbf.setIgnoringComments(false);
		dbf.setIgnoringElementContentWhitespace(true);
		dbf.setExpandEntityReferences(false);
		
		DocumentBuilder db = dbf.newDocumentBuilder();
		
		InputStream is = null;
		Document document = null;
		try {
			is = new ByteArrayInputStream(xml.getBytes());
			document = db.parse(is);
		}catch(IOException ie){
			logger.error(ie.getMessage());
			throw ie;
		}catch(SAXException se){	
			logger.error(se.getMessage());
			throw se;
		}finally{
			if(is !=null)
				is.close();
		}
		
	    NodeList list = document.getElementsByTagName("PivotSet");
	    NodeList nodeList =list.item(0).getChildNodes();
	   
	    return createMap(nodeList);
	}
	
	/**
	 * 기능명
     * @작성일	: 2014. 11. 17.
     * @작성자	: keim
     * @프로그램설명 :
     * @진행상태: COMPLETE
     * @param nodeList - NodeList : 
     * @return Map<String, String> : 
	 */
	public static Map<String, String> createMap(NodeList nodeList) {
	    Map<String, String> map = new HashMap<String, String>();
	    String key;
	    String value;
	    for (int i = 0; i < nodeList.getLength(); i++) {
	        Node currentNode = nodeList.item(i);
	        	key = currentNode.getChildNodes().item(0).getTextContent(); 
	        	value = currentNode.getChildNodes().item(1).getTextContent(); 
	        	map.put(key,value);
	    }
	    return map;
	}
	
	public static Map<String, Object>  stringToMap(String s) {
		Map<String, Object> myMap = new HashMap<String, Object>();
		String[] pairs = s.split(",");
		for (int i=0;i<pairs.length;i++) {
		    String pair = pairs[i];
		    String[] keyValue = pair.split(":");
		    if(keyValue.length>1) {
		    	 myMap.put(keyValue[0], keyValue[1]);
		    }		   
		}
		return myMap;
	}
	
	
	/**
	 * @author AnhPV
	 * @createdDate Oct 7, 2019
	 * @param listProgram
	 * @return
	 * @return String
	 * @description TODO
	 */
	public static String parseListToJson (List listProgram){
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(listProgram);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json;
	}
}