package infrastructure.log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import applications.code.CodeDAOImpl;
import infrastructure.context.AppContext;
import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.CastUtil;
import infrastructure.util.MenuUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;

/**
 * LoggingService 
 * @작성일    : 2016. 4. 19. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public class LoggingServiceImpl extends AbstractService {
	
	protected Logger logger = LogManager.getLogger(LoggingServiceImpl.class);
	AbstractDAO adao = new LoggingDAOImpl();
	public LoggingServiceImpl() {
		// TODO Auto-generated constructor stub
		adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
		
	}

	
	public void update_sys_login_log_logout_error() throws Exception {
		Map map = new HashMap();
		adao.update("log.logging","removeSession",map);
	}

	public void loggingLogin(boolean inout , HttpSession session) throws Exception{
		
		Map map = new HashMap();
		
		Map user = (Map) session.getAttribute("SESS_USER");
		if(user !=null){
			map.put("USER_UID", user.get("USER_UID"));
			map.put("DEPT_CD", user.get("DEPT_CD"));
			map.put("SESS_ID", session.getId());
 			map.put("IP", user.get("CLIENT_IP"));
 			map.put("ACCESS_POINT", session.getAttribute("DEVICE_TYPE"));
			
			
			
			if(inout){
				adao.insert("log.logging","insert_sys_login_log",map);
				Integer LOGIN_NO = (Integer) map.get("LOGIN_NO");
				session.setAttribute("LOGIN_NO", LOGIN_NO);
			} else {
				map.put("LOGIN_NO",session.getAttribute("LOGIN_NO"));
				adao.update("log.logging","update_sys_login_log_logout_Time",map);
			}
		}
	}
	/**
	 * @param request
	 * @param response
	 */

	public void loggingMenuAccessInfo(HttpServletRequest request, HttpServletResponse response) {
		
		AbstractDAO adao = new CodeDAOImpl();
		adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
		
		List rescVarList = new ArrayList();
		Map messageMap = ResourceUtil.getMessageMap("etc");
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) messageMap) .entrySet()) {
			Map newMap = new HashMap();
			newMap.put("SYS_CONFIG_KEY", entry.getKey());
			newMap.put("SYS_CONFIG_VALUE",((Map) entry.getValue()).get("MESSAGE"));
			rescVarList.add(newMap);
		}
		
		List list= new ArrayList();
		try { 
			list = (List<Map>) adao.list("sys.envir","environmentlist",new HashMap());
			
			List resultList = ArrangeUtil.mergeListMap( rescVarList,list, "SYS_CONFIG_KEY" );
			
			Map envirMap = 
			CastUtil.convertMapListToMap(  resultList,"SYS_CONFIG_KEY","SYS_CONFIG_VALUE");
	    	
			
			Map logMap = new HashMap();
			HttpSession session= request.getSession();
			
			String key = MenuUtil.getPathKey(request);
			String user_uid = "";
			if(session.getAttribute("SESS_USER") != null) {
				user_uid = ((Map)session.getAttribute("SESS_USER")).get("USER_UID").toString();
			}
			logMap.put("USER_UID", user_uid);
			
			logMap.put("MENU_ID", (String)  MenuUtil.getCurrentPathId(request));
			logMap.put("MENU_NM", (String)  MenuUtil.getCurrentPathId(request));
			logMap.put("PGM_ID", key);
			
			request.getContentType();
			
			request.getHeaderNames();
			
			if(((String)envirMap.get("LOGGING_ACCESS_MENU_INFO_USE_YN")).equals("Y")){
//				adao.list("sys.envir","environmentlist",new HashMap());
		
					 
					 
					 
					 
/* TO- DO
 * 190325
 * KEIM - 아마존 반응 속도가 느림 
 * 
 * //				if(key !=null)				 
 *  //					 if(contents_type== null || contents_type.equals("text/html"))
 *  //					 adao.insert("log.logging","insert_log_access_menu_log",logMap);
 * */
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			exceptionLogging(e);
		}
	}
	
	public void loggingSystemErrorInfo(HttpServletRequest request, HttpServletResponse response,
			Exception exc
			) {
		
		AbstractDAO adao = new CodeDAOImpl();
		adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
		
		List rescVarList = new ArrayList();
		Map messageMap = ResourceUtil.getMessageMap("etc");
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) messageMap) .entrySet()) {
			Map newMap = new HashMap();
			newMap.put("SYS_CONFIG_KEY", entry.getKey());
			newMap.put("SYS_CONFIG_VALUE",((Map) entry.getValue()).get("MESSAGE"));
			rescVarList.add(newMap);
		}
		
		List list= new ArrayList();
		try { 
			list = (List<Map>) adao.list("sys.envir","environmentlist",new HashMap());
			
			List resultList = ArrangeUtil.mergeListMap( rescVarList,list, "SYS_CONFIG_KEY" );
			
			Map envirMap = 
			CastUtil.convertMapListToMap(  resultList,"SYS_CONFIG_KEY","SYS_CONFIG_VALUE");
	    	
			
			Map logMap = new HashMap();
			HttpSession session= request.getSession();
			
			String key = MenuUtil.getPathKey(request);
			
			logMap.put("USER_UID", ((Map)session.getAttribute("SESS_USER")).get("USER_UID"));
			
			logMap.put("MENU_ID", (String)  MenuUtil.getCurrentPathId(request));
			logMap.put("MENU_NM", (String)  MenuUtil.getCurrentPathId(request));
			logMap.put("PGM_ID", key);
			
			String message  = exc.toString();
			for(StackTraceElement stackTraceElement : exc.getStackTrace()) {                         
			    message = message +  System.lineSeparator() +"\tat "+ stackTraceElement.toString();
			}
			message = message.substring(0, Math.min( 3500, message.length()));
			
			
			logMap.put("ERR_LOG", message);
			
			request.getContentType();
			
			request.getHeaderNames();
			
			if(((String)envirMap.get("LOGGING_ERROR_LOG_INFO_USE_YN")).equals("Y")){
//				adao.list("sys.envir","environmentlist",new HashMap());
				 if(key !=null)
//					 if(contents_type== null || contents_type.equals("text/html"))
					 adao.insert("log.logging","insert_sys_error_log",logMap);
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			exceptionLogging(e);
		}
	}

	public void loggingMenuAccess2(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		String reqUri = request.getRequestURI();
		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		String part_id =  MenuUtil.getPathKey(request).toString();
		if(part_id == null || part_id.equals("")) return;
		parameter.put("PATH_ID", part_id);
		Map menu = (Map) adao.object("getMenuByPathId", parameter);
		if(menu == null) return;
		parameter.putAll(menu);
		String event = "";
		if( request.getAttribute("EVENT") != null && !request.getAttribute("EVENT").toString().equals("")) 
		event = request.getAttribute("EVENT").toString();
		parameter.put("VIEW", event);
	}
	
}
