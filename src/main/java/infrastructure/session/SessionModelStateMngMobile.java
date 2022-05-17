package infrastructure.session;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import infrastructure.log.LoggingServiceImpl;

public  class SessionModelStateMngMobile {
	
	protected Logger logger = LogManager.getLogger(this.getClass());
	
	private volatile static SessionModelStateMngMobile ssm;
	
//	public List<Map<String,Object>> SessionList;
	public Map<String, SessionModel> sessionMap;
	
	public static SessionModelStateMngMobile getInstance(){
		if(ssm  ==null){//있는지 체크 없으면 
			synchronized (SessionModelStateMng.class) {
				if(ssm == null){
					ssm  = new SessionModelStateMngMobile (); //생성한뒤
				}
			}
		}
		return ssm;//생성자를 넘긴다.
	}
	
	public SessionModelStateMngMobile() {
		sessionMap = new HashMap();
	}

	public void setSession(HttpSession session){
		SessionModel sm = new SessionModel();
		sm.setSession(session);
		if(sessionMap != null && sessionMap.containsKey(sm.getUSER_ID())){
			HttpSession olderSession = sessionMap.get(sm.getUSER_ID()).getHs();
			if( !session.getId().equals(olderSession.getId())) {
				//expire 
				olderSession.invalidate();
			}
			
//			try {
//				HttpSession olderSession = sessionMap.get(sm.getUSER_ID()).getHs();
//				if( !session.getId().equals(olderSession.getId())) {
//					//expire 
//					olderSession.invalidate();
//				}
//				
//			} catch (Exception e) {
//				//e.printStackTrace();
//				logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
//			}
			sessionMap.remove(sm.getUSER_ID());
		}		
		sessionMap.put(sm.getUSER_ID(), sm);
		
	}
	
	public void removeSession(HttpSession session){
		SessionModel sm = new SessionModel();
		sm.setSession(session);
		if(sessionMap != null && sessionMap.containsKey(sm.getUSER_ID())){
			//expire 
			LoggingServiceImpl loggingService =new LoggingServiceImpl();
			
			HttpSession oldSession = sessionMap.get(sm.getUSER_ID()).getHs();
			try {
				loggingService.loggingLogin(false, oldSession);
				sessionMap.get(sm.getUSER_ID()).getHs().invalidate();
			} catch (Exception e) {
				//e.printStackTrace();
				logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			}
			sessionMap.remove(sm.getUSER_ID());
			
		}		
	}
} 
