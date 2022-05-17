package infrastructure.session;

import java.io.Serializable;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * 세션감시자 : 세션 생성/만료를 감시하여 SYS_LOGIN_STATE에 등록/수정
 */

@Scope("prototype")
@Component("sessionBindingMobile")
public class SessionBindingMobile implements HttpSessionBindingListener, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected Logger logger = LogManager.getLogger(SessionBindingMobile.class);
	Map user;
	String sessionId;

	public void setUser(Map user) {
		this.user = user;
	}

	/**
	 * 세션 생성시
	 */
	public void valueBound(HttpSessionBindingEvent event) {
		HttpSession httpSession = event.getSession();
		sessionId = httpSession.getId();
		user.put("SESSION_ID", sessionId);
		SessionModelStateMngMobile.getInstance().setSession(httpSession);
//		try {
//			LogPrototype log = new LogPrototype();
//			log.updateSysLogInfoForExpired(user);//기존 SESS_ID정리
//			log.insertSysLogInfo(user);
//		} catch (Exception e) {
//			logger.error(e.getMessage(), e);
//		}
	}

	/**
	 * 세션 만료시
	 */
	public void valueUnbound(HttpSessionBindingEvent event) {
//		try {
//			HttpSession httpSession = event.getSession();
//			SessionModelStateMngMobile.getInstance().removeSession(httpSession);
//		} catch (Exception e) {
//			logger.error(e.getMessage(), e);
//		}
	}
}
