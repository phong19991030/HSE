package infrastructure.session;

import java.io.Serializable;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class SessionModel implements Serializable {
	
	protected Logger logger = LogManager.getLogger(this.getClass());
	
	String sess_id ; 
	HttpSession hs;
	String USER_ID ;
	long access_time;
	
	public void setSession(HttpServletRequest req) {
//		this.ip = req.getRemoteHost();
		access_time = System.nanoTime(); 
		hs = (HttpSession) req.getSession();
		Map user_map = (Map) hs.getAttribute("SESS_USER");
		USER_ID = (String) user_map.get("USER_UID");
	}

	public void setSession(HttpSession session) {
//		this.ip = session.
		hs=  session;
		access_time = System.nanoTime(); 
		Map user_map = (Map) hs.getAttribute("SESS_USER");
//		USER_ID = (String) user_map.get("USER_UID");
		/*
		 * anhpv USER_UID -> USER_ID
		 */
		USER_ID = (String) user_map.get("USER_ID");
	}

	public String getSess_id() {
		return sess_id;
	}

	public void setSess_id(String sess_id) {
		this.sess_id = sess_id;
	}

	public HttpSession getHs() {
		return hs;
	}

	public void setHs(HttpSession hs) {
		this.hs = hs;
	}

	public String getUSER_ID() {
		return USER_ID;
	}



	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}



	public long getAccess_time() {
		return access_time;
	}



	public void setAccess_time(long access_time) {
		this.access_time = access_time;
	}
	
	public boolean expireHsr() {
		boolean state = false;
		
//		try {
			hs.invalidate();
//		} catch (Exception e) {
//			//e.printStackTrace();
//			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
//		}
		
		return state;
	}
}
