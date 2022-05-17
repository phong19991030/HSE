package infrastructure.message;

import infrastructure.util.ResourceUtil;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
//import javax.websocket.Session;
import java.util.ResourceBundle;

public  class MessageManager   {
	private volatile  static  MessageManager instance;
	
	private  Map<String,Map> messageMap;
	
	public MessageManager() {
		messageMap = new HashMap();
		
//		ResourceBundle bundle= ResourceBundle.getBundle("config.system.message.config",Locale.KOREAN);
		
		ResourceBundle bundle = ResourceUtil.getResourceBundle("config.message.config");
		Enumeration<String> keys =bundle.getKeys();
//		bundle.getKeys()
		while(keys.hasMoreElements()){
			String key = (String) keys.nextElement();
			
//			
			Map keyMap = ResourceUtil.convertMsgSource(bundle.getString(key));
//			bundle.getString(key);
			messageMap.put(key, keyMap);
		}
		// TO-DO Auto-generated constructor stub
//		messageList = new ArrayList();
	}

	
	
	public static  synchronized  MessageManager getInstance(){
		if(instance  ==null){//있는지 체크 없으면 
			instance  = new MessageManager (); //생성한뒤
			}
		return instance  ;//생성자를 넘긴다.
	}
	/**
	 * 기능명 
	 * @작성일    : 2016. 5. 11. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public  Map getMessageMap(String str){
		Map map =  messageMap.get(str);
		
		return  map;
	}

	public  Map<String, Map> getMessageMap() {
		return messageMap;
	}
	
	
	
} 
