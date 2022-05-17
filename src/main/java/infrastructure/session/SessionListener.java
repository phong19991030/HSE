package infrastructure.session;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SessionListener implements HttpSessionListener {
	
	protected Logger logger = LogManager.getLogger(SessionListener.class);

	@Override
	public void sessionCreated(HttpSessionEvent se) {
//		logger.info("sessionCreated");
		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
//		logger.info("sessionDestroyed");
	}
}
