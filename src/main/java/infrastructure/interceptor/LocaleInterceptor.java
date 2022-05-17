package infrastructure.interceptor;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import applications.auth.AuthController;
import applications.auth.AuthDAOImpl;

public class LocaleInterceptor extends LocaleChangeInterceptor {
	
	protected Logger logger = LogManager.getLogger(this.getClass());
	
	@Autowired 
	private AuthDAOImpl authDAO;
	@Autowired 
	private AuthController authController;
	
	private String paramName = DEFAULT_PARAM_NAME;
	
	/**
	 * Set the name of the parameter that contains a locale specification
	 * in a locale change request. Default is "locale".
	 */
	public void setParamName(String paramName) {
		this.paramName = paramName;
		super.setParamName(paramName);
	}
	
	/**
	 * Return the name of the parameter that contains a locale specification
	 * in a locale change request.
	 */
	public String getParamName() {
		return this.paramName;
	}
	
	private String curr_locale = null;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws ServletException {
		
		/*
		 * Check if language setting changed, update menu list
		 */
		HttpSession session = request.getSession();		
		String newLocale = request.getParameter(this.paramName);
		Locale locale = LocaleContextHolder.getLocale();
		if (locale != null ) {
			curr_locale = locale.getLanguage();	
		}
		 
		if (curr_locale != null && newLocale != null && !newLocale.equals(curr_locale)) {
			updateMenu(newLocale, session);
		} 
		
		// default handle for language change
		return super.preHandle(request, response, handler);
	}

	private void updateMenu(String newLocale, HttpSession httpsession) {		
		try {
			//3) Menu
			Map user = (Map) httpsession.getAttribute("SESS_USER");
			user.put("LANG_CODE", newLocale);
			
		    List menu;
			menu = authDAO.getListMenu(user);
			Map menus = authController.splitMenu(menu);
			
			//99) Set menu
			httpsession.setAttribute("SESS_MENU", menus.get("menu"));
			httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}
	}
}
