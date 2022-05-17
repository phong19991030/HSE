 package infrastructure.session;

import infrastructure.log.LoggingServiceImpl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

public  class SessionModelStateMng   {
	
	private volatile static SessionModelStateMng ssm;
	
	
//	public List<Map<String,Object>> SessionList;
	public Map<String, SessionModel> sessionMap;
	
	
	
	public static SessionModelStateMng getInstance(){
		if(ssm  ==null){//있는지 체크 없으면 
			synchronized (SessionModelStateMng.class) {
				if(ssm == null){
					ssm  = new SessionModelStateMng (); //생성한뒤
				}
			}
		}
		return ssm;//생성자를 넘긴다.
	}
	
	
	
	public SessionModelStateMng() {
		// TODO Auto-generated constructor stub
		sessionMap = new HashMap();
	}
	
	
	
	
	public void setSession(HttpSession session){
		SessionModel sm = new SessionModel();
		sm.setSession(session);
		if(sessionMap != null && sessionMap.containsKey(sm.getUSER_ID())){
			//expire 
			sessionMap.get(sm.getUSER_ID()).getHs().invalidate();
		}
		sessionMap.put(sm.getUSER_ID(), sm);
	}
	
	public void removeSession(HttpSession session) throws Exception {
		SessionModel sm = new SessionModel();
		sm.setSession(session);
		if(sessionMap != null && sessionMap.containsKey(sm.getUSER_ID())){
			//expire 
			LoggingServiceImpl loggingService =new LoggingServiceImpl();
			HttpSession oldSession = sessionMap.get(sm.getUSER_ID()).getHs();
			loggingService.loggingLogin(false, oldSession);
			sessionMap.get(sm.getUSER_ID()).getHs().invalidate();
			sessionMap.remove(sm.getUSER_ID());
		}		
		
	}
} 
