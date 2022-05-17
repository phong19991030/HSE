package infrastructure.util;

import infrastructure.message.MessageManager;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.ResourceBundle;

import net.sf.json.JSONObject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

public final class ResourceUtil {
	protected static Logger logger = LogManager.getLogger(ResourceUtil.class);	
//	private static MessageSource msgSource;
//	private static Map message ;
	/**
	 * ResourceBundleMessageSource의 연결은 Spring설정에서 자동으로 이루어진다.
	 * @param msgSource
	 */

	
	public static ResourceBundle getResourceBundle(String src){
		ResourceBundle bundle= ResourceBundle.getBundle(src,Locale.KOREAN);
		return bundle;
	}

	/**
	 * 메시지 가져옴 
	 * @작성일    : 2016. 4. 19. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public static Map convertMsgSource(String src){
//		Locale locale = new Locale("ko");
		ResourceBundle bundle= ResourceBundle.getBundle(src,Locale.ENGLISH);
		Enumeration<String> keys =bundle.getKeys();
//		Iterator it = keys.iterator();
//		key = entry.getKey() ;
		Map message= new HashMap();
		while(keys.hasMoreElements()){
			String key = (String) keys.nextElement();
			
			genKeyMessage(message,key,bundle.getString(key));
			
//			bundle.getString(key);
		}
		return message;
	}
	
//	public static String getMessage(String msgId){
//		String msg = null;
//		try {
//			msg = msgSource.getMessage(msgId, new Object[0], Locale.getDefault());
//		}catch(NoSuchMessageException e){
//			logger.error(e.getMessage());
//		}
//		return msg;
//	}
	
	
//	public static String getMessage(String msgId, Object[] args){
//		String msg = null;
//		try {
//			msg = msgSource.getMessage(msgId, args, Locale.getDefault());
//		}catch(NoSuchMessageException e){
//			logger.error(e.getMessage());
//		}
//		return msg;
//	}
	
	/**
	 * key message 정리
	 * @작성일    : 2016. 5. 11. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	private static void genKeyMessage(Map map, String key,String message){
		
		if(key.contains(".")){
			String preKey = key.substring(0, key.indexOf("."));
			String otherKey = key.substring(key.indexOf(".")+1);
			if(map.get(preKey)!=null){
				if(map.get(preKey) instanceof Map){
					genKeyMessage((Map) map.get(preKey),otherKey,message);
				}else{
					String str = (String) map.get(preKey);
					Map newMap = new HashMap();
					newMap.put("MESSAGE", str);
//					map.put(key,newMap);
					map.put(preKey,newMap);
					genKeyMessage((Map) map.get(preKey),otherKey,message);
				}
			}else{
				map.put(preKey, new HashMap()); 
				genKeyMessage((Map) map.get(preKey),otherKey,message);
//				genKeyMessage(map,key,message);
			}
		}else{
			if(map !=null){
				Map newMap = new HashMap();
				newMap.put("MESSAGE", message);
				map.put(key,newMap);
			}else{
				map =new HashMap();
				Map newMap = new HashMap();
				newMap.put("MESSAGE", message);
				map.put(key,newMap);
			}
		}
	}
	private static  Object getKeyObject(Map map, String key){
		if(key.contains(".")){
			String preKey = key.substring(0, key.indexOf("."));
			String otherKey = key.substring(key.indexOf(".")+1);
			if(map.get(preKey)!=null){
				if(map.get(preKey) instanceof Map){
					return getKeyObject((Map) map.get(preKey),otherKey);
				}
			}
		}else{
			if(map !=null){
				return map.get(key);
				
			}
		}
		return null;
		
	}
	
	/**
	 * 입력한 메세지 맵에서 key를 추출하여 가져오는 기능  
	 * @작성일    : 2016. 5. 11. 
	 * @작성자      : keim
	 * @진행상태:  COMPLETE
	 * @프로그램설명 : 메세지 키 하위의 모든 메세지 구조의 키를 String 형태로 반환
	 * 데이터가 그룹핑(여러건)데이터라면 Json 포맷으로 반환  
	 * 메소드를 단독으로 사용할 수도 있고 convertMsgSource 를 통해 메세지 맵을 가져와 사용할 수도 있다. 
	 * 기본적으로MessageManager 에서 맵을 추출하여 사용하는것을 권장한다.
	 * 또는 맵에서 데이터를 추출 할 떄도 사용할 수 있다. 
	 * 
	 *   key의 맨앞에는 파일명이 와야한다.  system.Properties의 데이터를 가져오고 싶은 경우
	 *   system.xxx.xxx 라고 기재한다. 
	 *   
	 *   메세지 정보는 그루핑하여 가져올 수 있다.
	 *    
	 * ex) system.Properties  
	 *   dir.upload.default=/files/upload/default
	 *   dir.upload.excel=/files/upload/excel
	 *   dir.upload.img=/files/photo/hrm
	 *   다음과 같이 2개의 prefix $1 = dir , 이고 $2=upload 라면
	 *   key로는 dir.upload를 사용할 수 있다.  
	 *   
	 *   
	 *   
	 */
	public  String getMessages(String key,Map message){
		
		String resultString = "";
		Object obj =  getKeyObject(message,key);
		if( obj instanceof Map){
			
			Map map = (Map) obj;
			
			
			if(map.size() == 1 ){
				Map.Entry<String,Object> entry= (Entry<String, Object>) map.entrySet().iterator().next();
				
//2018.01.03 - keim message 구조 Map으로 통일 				
//				resultString =JSONObject.fromObject( (Map) obj).toString();
				if(entry.getValue() instanceof String){
					resultString = (String) entry.getValue() ;
				}else{
					resultString =JSONObject.fromObject( (Map) obj).toString();
				}
			}else{
				resultString =JSONObject.fromObject( (Map) obj).toString();
			}
			
		}else if(obj instanceof String){
			resultString =(String) obj;
		}
				
		return resultString;
	}
	/**
	 * 메세지를 가져오는 기능  
	 * @작성일    : 2016. 5. 11. 
	 * @작성자      : keim
	 * @진행상태:  COMPLETE
	 * @프로그램설명 : messageManger에서  메세지 키 하위의 모든 메세지 구조의 키를 String 형태로 반환
	 * 데이터가 그룹핑(여러건)데이터라면 Json 포맷으로 반환  
	 * 
	 *   system.Properties의 데이터를 가져오고 싶은 경우
	 *   getMessage("system","dir.upload.default") 라고 기재한다. 
	 *   
	 *   메세지 정보는 그루핑하여 가져올 수 있다.
	 *    
	 * ex) system.Properties  
	 *   dir.upload.default=/files/upload/default
	 *   dir.upload.excel=/files/upload/excel
	 *   dir.upload.img=/files/photo/hrm
	 *   다음과 같이 2개의 prefix $1 = dir , 이고 $2=upload 라면
	 *   key로는 dir.upload를 사용할 수 있다.  
	 *   
	 *   
	 */
	public static  String getMessage(String file,String key){
		return getMessage(file+"."+key);
	}
	/**
	 * 메세지를 가져오는 기능  
	 * @작성일    : 2016. 5. 11. 
	 * @작성자      : keim
	 * @진행상태:  COMPLETE
	 * @프로그램설명 : messageManger에서 메세지 키 하위의 모든 메세지 구조의 키를 String 형태로 반환
	 * 데이터가 그룹핑(여러건)데이터라면 Json 포맷으로 반환  
	 * 
	 *   key의 맨앞에는 파일명이 와야한다.  system.Properties의 데이터를 가져오고 싶은 경우
	 *   system.xxx.xxx 라고 기재한다. 
	 *   
	 *   메세지 정보는 그루핑하여 가져올 수 있다.
	 *    
	 * ex) system.Properties  
	 *   dir.upload.default=/files/upload/default
	 *   dir.upload.excel=/files/upload/excel
	 *   dir.upload.img=/files/photo/hrm
	 *   다음과 같이 2개의 prefix $1 = dir , 이고 $2=upload 라면
	 *   key로는 dir.upload를 사용할 수 있다.  
	 *   
	 *   
	 */
	public static  String getMessage(String key){
		Map message = MessageManager.getInstance().getMessageMap();
		String resultString = "";
		Object obj =  getKeyObject(message,key);
		if( obj instanceof Map){
			Map map = (Map) obj;
			
			
			if(map.size() == 1 ){
				Map.Entry<String,Object> entry= (Entry<String, Object>) map.entrySet().iterator().next();
				
				//2018.01.03 - keim message 구조 Map으로 통일 				
//				resultString =JSONObject.fromObject( (Map) obj).toString();
				if(entry.getValue() instanceof String){
					resultString = (String) entry.getValue() ;
				}else{
					resultString =JSONObject.fromObject( (Map) obj).toString();
				}
				
			}else{
				resultString =JSONObject.fromObject( (Map) obj).toString();
			}
		}else if(obj instanceof String){
			resultString =(String) obj;
		}
				
		return resultString;
	}
	
	
	public static  String getMessageInfo(String file,String key){
		return getMessageInfo(file+"."+key);
	}
	public static  String getMessageInfo(String key){
		Map message = MessageManager.getInstance().getMessageMap();
		String resultString = "";
		Object obj =  getKeyObject(message,key);
		if( obj instanceof Map){
			Map map = (Map) obj;
			
			
			if(map.size() == 1 ){
				Map.Entry<String,Object> entry= (Entry<String, Object>) map.entrySet().iterator().next();
				
//2018.01.03 - keim message 구조 Map으로 통일 				
				resultString =JSONObject.fromObject( (Map) obj).toString();
//				if(entry.getValue() instanceof String){
//					resultString = (String) entry.getValue() ;
//				}else{
//					resultString =JSONObject.fromObject( (Map) obj).toString();
//				}
				
			}else{
				resultString =JSONObject.fromObject( (Map) obj).toString();
			}
		}else if(obj instanceof String){
			resultString =(String) obj;
		}
				
		return resultString;
	}
	
	/**
	 * 메세지맵을 가져오는 기능  
	 * @작성일    : 2016. 5. 11. 
	 * @작성자      : keim
	 * @진행상태:  COMPLETE
	 * @프로그램설명 : messageManger에서 메세지 키 하위의 모든 메세지 구조의 키를 Map 형태로 반환
	 *  
	 * ex) system.Properties
	 *   key의 맨앞에는 파일명이 와야한다.  system.Properties의 데이터를 가져오고 싶은 경우
	 *   system.xxx.xxx 라고 기재한다. 
	 *   
	 *   메세지 정보는 그루핑하여 가져올 수 있다. 
	 *   
	 *   dir.upload.default=/files/upload/default
	 *   dir.upload.excel=/files/upload/excel
	 *   dir.upload.img=/files/photo/hrm
	 *   다음과 같이 2개의 prefix $1 = dir , 이고 $2=upload 라면
	 *   key로는 dir.upload를 사용할 수 있다.  
	 *   
	 *   * 단일 데이터의 경우 key는 MESSAGE로 자동 세팅된다.
	 *   
	 *   
	 *   getMessageMap("system.dir.upload.default") = {MESSAGE = "/files/upload/default"} 
	 *   getMessageMap("system.dir.upload") = {default = "/files/upload/default" ,excel="/files/upload/excel" ,img="/files/photo/hrm" }
	 *   
	 *   
	 */
	public static  Map getMessageMap(String key){
		Map message = MessageManager.getInstance().getMessageMap();
		Map resultMap = new HashMap();
		Object obj =  getKeyObject(message,key);
		if( obj instanceof Map){
			resultMap = (Map)obj;
		}else if(obj instanceof String){
		}
				
		return resultMap;
	}
	
	
//	public class ExposedResourceBundleMessageSource extends
//        ResourceBundleMessageSource {
//		private static MessageSource msgSource;
//		public Set<String> getKeys(String basename, Locale locale) {
//        ResourceBundle bundle = getResourceBundle(basename, locale);
//        return bundle.keySet();
//    }
}
