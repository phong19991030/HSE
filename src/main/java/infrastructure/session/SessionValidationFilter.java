package infrastructure.session;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.map.LinkedMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import applications.util.UtilService;
import applications.util.Utils;
import infrastructure.util.CastUtil;
import infrastructure.util.ResourceUtil;

/**
 * 모든 사용자 요청에 대한 Filter적용으로 세션검증을 대신한다.
 * 1. loginForm.jsp, expire.jsp의 경우 세션검증에서 제외
 * 2. 이미지(*.gif, *.jpg, *.png)는 제외 - 추가적으로 제외해야 하는 경우 아래 코드에 적용
 * 3. 1번 페이지에서 외부 리소스(*.js, *.css)를 사용하는 경우 세션검증을 통과하지 못하므로
 *    해당 페이지에서는 외부 리소스를 사용하지 못한다.
 */
public class SessionValidationFilter implements Filter {
	
	public Logger logger = LogManager.getLogger(SessionValidationFilter.class);
	
	@Autowired
	private UtilService utilService;
	
	protected FilterConfig filterConfig = null;
	
	/**
	 * init
	 */
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
	}
	/**
	 * doFilter
	 */ 
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// XSS  차단 
		
		
		//세션검사
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		HttpSession session = req.getSession(false);
		//요청페이지
		String reqPage = req.getRequestURI();
		String ctxPath = req.getContextPath();
		
		
		boolean expireSession = (session == null ? true : false);
		if(session != null && session.getAttribute("SESS_USER") == null){
			expireSession = true;
			
		}
	

		
		//요청의 확장자
		String ext = "";
		if(reqPage != null && (!reqPage.equals(ctxPath) || !reqPage.equals(ctxPath+"/"))){
			if(reqPage.indexOf(".") > -1){
				ext = reqPage.substring(reqPage.lastIndexOf(".")+1);
			}
		}
		
		boolean trueReponse = false;
		
		Map messageMap = ResourceUtil.getMessageMap("system.session.filter.accept");
		Map genManage = ResourceUtil.getMessageMap("system.genmode");
//		CastUtil.printMap(messageMap);
		
		//필터링결과처리
		if (expireSession) {  // not yet logged in
			String accept_ext = (String) ((Map)messageMap.get("ext")) .get("MESSAGE");
			String accept_url = (String) ((Map)messageMap.get("url")) .get("MESSAGE");
			String cm_reqPage = reqPage.replace(ctxPath, "");
			List<String> matchingExt = new ArrayList();
			List<String> matchingUrl = new ArrayList();
			matchingExt.addAll(Arrays.asList(accept_ext.split(",")));
			matchingUrl.addAll(Arrays.asList(accept_url.split(",")));
			
			boolean passFilter = false;
			if(!passFilter){
				for(String str : matchingExt){
					if(ext.equals(str.trim())){
						passFilter = true;
						break;
					}
				}
			}
			if(!passFilter){
				for(String str : matchingUrl){
					if(cm_reqPage.matches(str.trim())){
						passFilter = true;
						break;
					}
				}
			}
			
			if(CastUtil.getBool(genManage.get("MESSAGE"))){
				if(cm_reqPage.matches("/generate.*")){
					passFilter = true;
				}
			}
						
			//세션검증 제외페이지
			if(passFilter){
				// process auto login for remember me feature
				Cookie[] cookies = req.getCookies();
				if (cookies != null) {
					try {
						Utils.doRememberMe(cookies, session, req, resp, utilService);
					} catch (Exception e) {
						//e.printStackTrace();
						logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
						RequestDispatcher rd = req.getRequestDispatcher("/common/auth/logout");
						rd.forward(request, response);
					}
				}
				
				chain.doFilter(request, response);
			}else{//세션만료
				if(session != null) {
					if(!reqPage.matches(".*\\.ajax") && !reqPage.contains("/common/auth/loginForm")){
						session.setAttribute("refer", reqPage.replace(ctxPath, ""));
					}
				}
				
				RequestDispatcher rd = req.getRequestDispatcher("/common/auth/expire");
				rd.forward(request, response);	
			}
		}else{
			//세션유효 
			trueReponse = true;
			chain.doFilter(request, response);
		}
	}
	/**
	 * destroy
	 */
	public void destroy() {
		this.filterConfig = null;
	}	
	
	
//	public void validateXSS(ServletRequest request){
//		
////		Map map = 
////				Map.Entry<String, Object> entry : ((Map<String, Object>) paramerterMap) .entrySet()
//		for(Entry<String, String[]> entry : request.getParameterMap().entrySet()){
//			for(int i =0 ; i < entry.getValue().length ; i++){
//				String str = entry.getValue()[i];
//				 entry.getValue()[i] = ParameterUtil.cleanXSS(str);
//			}
//		}
//				
//				
////		ParameterUtil.cleanXSS(object)
////		ParameterUtil.cleanXSS(object)
//		
//		
//	}
	/**
	 * 메뉴를 step1,step2, step3,4 system으로 나누어 준다.
	 * 
	 **/
	
	Map tmpMap = new LinkedMap();
	public Map splitMenu(List menuList){
		Map menus = new LinkedMap();
		
		int i = 0;
		int k = 0;
		String pre_menu1 = "";
		String cur_menu1 = "";
		String pre_menu2 = "";
		String cur_menu2 = "";
		Map map = new LinkedMap();
		
		
		/**
		 *	STEP1, STEP2, STEP3,4 시스템 메뉴로 나누어 준다.
		 */
		
		
//		ArrayList system = new ArrayList();
		ArrayList infra = new ArrayList();
		
		Map sysMaps = new LinkedMap();
		Map menuMaps = new LinkedMap(); 
		
		tmpMap.put("system", new LinkedMap());
		tmpMap.put("menu", new LinkedMap());
		
		
//		Vector vs = new Vector(); 
		
		
		// 리스트로 먼저 정렬
		if(menuList != null && !menuList.isEmpty()){
			String cls ;
			String keyName="";
			String lev="";
			for(i = 0;i < menuList.size();i++){
				map = (Map)menuList.get(i);
//		  		cur_menu1 = (String)map.get("MENU1");
//		  		cur_menu2 = (String)map.get("MENU2");
				cls = (String) map.get("CLS_CD");
				//키 분류
				if(cls !=null){
					String menu_cls = ResourceUtil.getMessage("system.system.menu");
					//YJIN1214 PMS추가 20160509
				
					if(cls.equals(menu_cls))				
						keyName ="menu";
					else if(cls.equals("ADM")) 
						keyName ="system";
					else keyName ="notuse";
				}
				BigDecimal b = new BigDecimal("1");
				
				
				lev =((BigDecimal)map.get("LEV")).toString();
					try {
						Object obj;
						List<String> list = new ArrayList()  ;
						if(keyName !=null && keyName != "" && !keyName.equals("notuse")){
							if(!((Map) tmpMap.get(keyName)).containsKey("step"+lev)){
								Method m = this.getClass().getDeclaredMethod("createMV", String.class,String.class);
								m.invoke(this,"step"+lev,keyName);
							} 	
							obj = ((Map) tmpMap.get(keyName)).get("step"+lev);
							((List)obj).add(map);
						}
					} catch (SecurityException e) {
						// TODO Auto-generated catch block
//						logger.error(e.getMessage());
						logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
					} catch (NoSuchMethodException e) {
						// TODO Auto-generated catch block
//						logger.error(e.getMessage());
						logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
					}  catch (IllegalArgumentException e) {
						// TODO Auto-generated catch block
//						logger.error(e.getMessage());
						logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
//						logger.error(e.getMessage());
						logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
					} catch (InvocationTargetException e) {
						// TODO Auto-generated catch block
//						logger.error(e.getMessage());
						logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
					}	
			}
			getMaps((Map)tmpMap.get("system"),sysMaps);
			getMaps((Map)tmpMap.get("menu"),menuMaps);
			
			
		}
		Map.Entry<String,Object> entry= (Entry<String, Object>) menuMaps.entrySet().iterator().next();
		
		Map menuMapsChanged = new HashMap();
		
		menuMapsChanged.put("MENU", entry.getValue());
		
		
		
		menus.put("system", sysMaps);
		menus.put("menu", menuMaps);
		return menus;
	}
	public void getMaps(Map targetMap,Map resultMap){
		if(targetMap.size() >0){
			Set keyset =targetMap.keySet();
			Map maptemp =  targetMap;
			List<String> keyList= new ArrayList();
			for( Object key :Arrays.asList(keyset.toArray())){
				keyList.add(key.toString());
			}
			String keyNm;
			for(int j = 1 ; j<= maptemp.size();j++){
				keyNm ="step"+j;
				if(keyList.contains(keyNm)){
//					maptemp.get("step"+j);
					if(keyNm.equals("step1")){
						for(Map mm:  (List<Map>)maptemp.get("step"+j) ){
							resultMap.put(mm.get("MENU_ID"), mm);
						}
					}else{
//						sysMaps.get
						for(Map mm :  (List<Map>)maptemp.get("step"+j)){
							Map obj=null;
							String mid = (String) mm.get("UP_MENU_ID");
							Map objMap = getObject(j,mid,resultMap);
							if(objMap != null){
								((Map)objMap).put(mm.get("MENU_ID"), mm);
							}
							
							
						}
					}
					
				
				}
			}
			keyList.size();
			
		}
	}
	public Map getObject(int j,String mid,Map dtMap){
		Map obj=null;
		Map tmpMap;
		
		if(j ==2){
			obj= (Map)dtMap.get(mid.substring(0,j*3-1));
//			obj= (Map)((Map)dtMap.get(mid.substring(0,j*3-1))).get("List");
		}else {
			
			tmpMap= (Map) (((Map)getObject(j-1,mid,dtMap)));
			
			if(tmpMap != null){
			obj = (Map) tmpMap.get(mid.substring(0,j*3-1));
			}
		}
		if(obj != null){
			if(!obj.containsKey("List")){
				obj.put("List", new LinkedMap());
			}
		
		obj = (Map)obj.get("List");
		}
		return obj;
	}
	// 레퍼런스 문제 때문에 다시 new map을 생성하여 기존맵은 그대로, MENU_ID~는 cMap으로 넣어서 nmap을 리턴함. 
	private Map copyMap(Map oMap, Map cMap){
		Map nmap = new HashMap();
		nmap.put("MENU1", (String)oMap.get("MENU1"));
		nmap.put("MENU2", (String)oMap.get("MENU2"));
		nmap.put("MENU3", (String)oMap.get("MENU3"));
		nmap.put("MENU4", (String)oMap.get("MENU4"));
		nmap.put("NM1", (String)oMap.get("NM1"));
		nmap.put("NM2", (String)oMap.get("NM2"));
		nmap.put("NM3", (String)oMap.get("PGM_ID"));
		nmap.put("NM4", (String)oMap.get("PGM_ID"));
		nmap.put("PTH", (String)oMap.get("PTH"));
		nmap.put("MENU_CLCD", (String)oMap.get("MENU_CLCD"));
		//링크 정보를 고친다.
		nmap.put("MENU_ID", (String)cMap.get("MENU_ID"));
		nmap.put("PGM_ID", (String)cMap.get("PGM_ID"));
		nmap.put("PGM_PTH", (String)cMap.get("PGM_PTH"));
		nmap.put("PARAM", (String)cMap.get("PARAM"));
		
		return nmap;
	}
	
	
	private void createMV(String str,String key){
		((Map) tmpMap.get(key)).put(str, new ArrayList());
	}
}
