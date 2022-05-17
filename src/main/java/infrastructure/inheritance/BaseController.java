package infrastructure.inheritance;

import infrastructure.inheritance.model.enumeration.CommonClsDataStatic;
import infrastructure.util.CastUtil;
import infrastructure.util.MenuUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.co.a2m.security.kryptos.A2mAES256;
import kr.co.a2m.security.kryptos.A2mAIRA;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import applications.code.CodeDAOImpl;

public class BaseController {
	// @JK
//	protected Logger logger = LogManager.getLogger(BaseController.class);
	protected static Logger logger = LogManager.getLogger(BaseController.class);
	
	protected String jsonType="LIST";
	int autoGrowCollectionLimit = 2056;
	
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
	    dataBinder.setAutoGrowCollectionLimit(autoGrowCollectionLimit);
	}
	
	@Autowired 
	private CodeDAOImpl dao; 
	
	/**
	 * 
	 * @Method : logging
	 * @Author : pjk
	 * @Date : Dec 30, 2020
	 * @param msg
	 * @Description : 보안 취약점에 의한 공통 logging 함수 추가  
	 */
	public static void exceptionLogging(Exception e) {
		logger.info("ERROE 발생!!!!!!!!!!!!!!!");
		logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() 
				+ "\n" + " [ Cause ] : " 
				+ e.getMessage()
				+ "\n" + e.getCause()
				+ "\n" + e.getLocalizedMessage()
				+ "\n" + e.getSuppressed()
				);
	}
	
	@ModelAttribute(value="token")
	public String getToken( ModelAndView mav ,HttpServletRequest request, HttpServletResponse response) throws Exception {
		A2mAIRA a = new A2mAIRA();
		 
		String token="";
		Map tokenMap = new HashMap();
		 
		try {
			token = (String) a.genKey();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			exceptionLogging(e);
		}
		
		HttpSession session = request.getSession();
		
		String pathKey = MenuUtil.getPathKey(request);
		
		if(session.getAttribute("_token")  != null){
			Map sessionToken = (Map) session.getAttribute("_token");
			
			if( sessionToken.get("PATHKEY").equals(pathKey) ){
				token = (String) sessionToken.get("_TOKEN_KEY");
			
			} else {
				tokenMap.put("_TOKEN_KEY", token);
				tokenMap.put("PATHKEY", pathKey);
				session.setAttribute("_token", tokenMap);
			}
		}else{
			tokenMap.put("_TOKEN_KEY", token);
			tokenMap.put("PATHKEY", pathKey);
			session.setAttribute("_token", tokenMap);
			
		}
		
	
		A2mAES256 aes = new A2mAES256();
		Map messageMap = ResourceUtil.getMessageMap("system.encrypt");
		String key = (String) ((Map)messageMap.get("key")).get("MESSAGE");
		
		Cookie cookie =new Cookie("csrftoken", aes.encrypt(token, key));
		/*
		 * @JK - 보안 취약점 수정
		 */
		cookie.setSecure(true);
		
		response.addCookie(cookie);
		
		return token;
	}
	 

	 
	 
	 @ModelAttribute(value="navimenu")
	 public Map getMenuId( ModelAndView mav ,HttpServletRequest request, HttpServletResponse response){
		 
		Map map = MenuUtil.getMenuList(request,response);
		if(map.get("menuMap")!=null){
			Map grantMap = MenuUtil.getGrant((Map) map.get("menuMap"));
			// @JK - 현재 요청 URI 추가 
			grantMap.put("REQUEST_URI", request.getRequestURI());
			
			mav.addObject("grant", grantMap);
			mav.addObject("grantjson", JSONObject.fromObject(grantMap));
		}else{
			Map paramMap = new HashMap();
			Map grantMap = new HashMap();
			String key = MenuUtil.getPathKey(request);
			if(((Map)((HttpSession)request.getSession()).getAttribute("SESS_USER")) != null) {
				paramMap.put("USER_ID", ((Map)((HttpSession)request.getSession()).getAttribute("SESS_USER")).get("SESS_USER_ID"));
				paramMap.put("USER_UID", ((Map)((HttpSession)request.getSession()).getAttribute("SESS_USER")).get("USER_UID"));
			}
			paramMap.put("MENU_ID",key);
			
			Map tmp = null;
			try {
				tmp = (Map) dao.object("common.auth.Auth","getMenuRole", paramMap);
			} catch (Exception e) {
				// TO-DO Auto-generated catch block
				//e.printStackTrace();
				exceptionLogging(e);
			}
			
			if(tmp != null){
				boolean mng_yn = CastUtil.getBool(CastUtil.castToString(tmp.get("MNG_YN")));
				if(mng_yn){
					 grantMap.put("READ_YN",true);
					 grantMap.put("WRT_YN", true);
					 grantMap.put("MOD_YN",true);
					 grantMap.put("DEL_YN", true);
					 grantMap.put("PNT_YN", true);
					 grantMap.put("EXC_DN_YN",true);
					 grantMap.put("MNG_YN",true);
				} else {
					 grantMap.put("READ_YN",CastUtil.getBool(CastUtil.castToString( tmp.get("READ_YN"))));
					 grantMap.put("WRT_YN", CastUtil.getBool(CastUtil.castToString( tmp.get("WRT_YN"))));
					 grantMap.put("MOD_YN", CastUtil.getBool(CastUtil.castToString( tmp.get("MOD_YN"))));
					 grantMap.put("DEL_YN", CastUtil.getBool(CastUtil.castToString( tmp.get("DEL_YN"))));
					 grantMap.put("PNT_YN", CastUtil.getBool(CastUtil.castToString( tmp.get("PNT_YN"))));
					 grantMap.put("EXC_DN_YN",CastUtil.getBool(CastUtil.castToString( tmp.get("EXC_DN_YN"))));
					 grantMap.put("MNG_YN",CastUtil.getBool(CastUtil.castToString( tmp.get("MNG_YN"))));
				}
				 
				mav.addObject("grant", grantMap );
				mav.addObject("grantjson", JSONObject.fromObject(grantMap));
			}
		}
		return (Map) map.get("resultMap");
	}
	 
	/**
	 * JSON TYPE을 자동으로 지정하여 --SOrt 기능의 수행여부를 판단
	 * @작성일    : 2014. 10. 17. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태설명: CHECK
	 *  현 상황에서는 ENUM을 만들어 TREE,LIST,MAP 등등에 대해 사용해야 하지만 일단 보류 
	 */
	@ModelAttribute(value="jsonType")
	public String getDataType(HttpServletRequest request, HttpServletResponse response){
		jsonType = "LIST";
		
		// 원칙적으로 ENUM을 만드는 것이 좋으나 일단 보류 
		if(request.getParameter("jsonType") != null ){
			if(request.getParameter("jsonType").equals("TREE")){
				jsonType="TREE";
			}else{
				jsonType="LIST";
			} 
		}else{
			jsonType="LIST";
		}
		return jsonType;
	}
	 
	@ModelAttribute(value="cid")
	public String getcurrentMenuId(HttpServletRequest request){
//		String key = MenuUtil.getPathKey(request);
//		return MenuUtil.getcurrentMenuId(menuMap);
		return (String)  MenuUtil.getCurrentPathId(request);
	 }
	
	@ModelAttribute(value="pathKey") 
	public String  getpathKey(HttpServletRequest request) throws Exception{
//		String key = MenuUtil.getPathKey(request);
		 String reqPage = request.getRequestURI();
		 String ctxPath = request.getContextPath();
//		 Pattern pattern = Pattern.compile("([a-zA-Z]{3})");
//		 Matcher matcher = pattern.matcher(key);
//		 String prefix = null ;
//	     if(matcher.find()){ 
//			prefix = matcher.group(1);
//		 }
//	     key = prefix+"/"+key;
		 reqPage =  reqPage.replace(ctxPath, "");
		 Pattern pattern = Pattern.compile(".*?\\/");
		 Matcher matcher = pattern.matcher(reqPage);
		 String prefix = "" ;
		 int i =0; 
	     while(matcher.find()){ 
			prefix += reqPage.substring(matcher.start(), matcher.end());
			i++;
	     }
	     prefix= prefix.substring(0,prefix.lastIndexOf("/"));
		return prefix;
	}
	
	@ModelAttribute(value="code") 
	public Map getCommCode() throws Exception{
		Map map = new HashMap();
		List list = dao.list("commCode");
		map.put("list",list);
		map.put("json",JSONArray.fromObject(list).toString());
		return map;
	}
	
	/**
	 * 
	 * @Method : getEventStatus
	 * @Author : parkjk
	 * @Date : Apr 23, 2021
	 * @param request
	 * @return
	 * @throws Exception
	 * @Description : EVENT(Alarm)의 상태 값 조회
	 */
	@ModelAttribute(value="event_status") 
	public Map getEventStatus(HttpServletRequest request) throws Exception{
		Map map = new HashMap();
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map eventStatusAndPlanCnt = new HashMap<>();
		if(parameter.get("EVENT_ID") != null) {
//			eventStatusAndPlanCnt = oam_0100_dao.getEventStatusAndPlanCnt(parameter);
			eventStatusAndPlanCnt.put("EVENT_ID", parameter.get("EVENT_ID"));
		}
		return JSONObject.fromObject(eventStatusAndPlanCnt);
	}
	
	@ModelAttribute(value="client") 
	public Map getClient(HttpServletRequest request) throws Exception{
		Map map = new HashMap();
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		map.putAll(session);
		map.remove("INS_DT");
		map.remove("IP");
		map.remove("USE_FRM_DT");
		map.remove("UPT_DT");
		map.remove("USE_TO_DT");
		map.remove("INS_ID");
		//map.remove("IS_FIRST_LOGIN");
		map.remove("UPT_ID");
		map.remove("PWD");
		map.remove("LANG_CODE");
		map.remove("SALT");
		return JSONObject.fromObject(map);
	}
	
	@ModelAttribute(value="label")
	public Map getCommLabel() throws Exception{
		Map map =CommonClsDataStatic.getEnumList(); 
		return map;
	}

//	@ModelAttribute(value="grant") 
//	public Map getGrant(HttpServletRequest request, HttpServletResponse response) throws Exception{
//		HttpSession session = request.getSession();
//		 Map menu = (Map)session.getAttribute("SESS_MENU");
//		return menu;
//	}
	
	@ModelAttribute("YESTERDAYS")
	public Date yesterday() throws Exception{
		Calendar cal = Calendar.getInstance();
		cal.add(cal.DATE, -1);
		return cal.getTime();
	}	
	
	
	@ModelAttribute("TOMORROWS")
	public Date tomorrow() throws Exception{
		Calendar cal = Calendar.getInstance();
		cal.add(cal.DATE, 1);
		return cal.getTime();
	}	
	
	@ModelAttribute("BEFORE_MONTHS")
	public Date beforeMonth() throws Exception{
		Calendar cal = Calendar.getInstance();
		cal.add(cal.MONTH, -1);
		return cal.getTime();
	}	
	
	@ModelAttribute("AFTER_MONTHS")
	public Date AefterMonth() throws Exception{
		Calendar cal = Calendar.getInstance();
		cal.add(cal.MONTH, 1);
		return cal.getTime();
	}	
	
	@ModelAttribute("MONTH_LAST_DATES")
	public Date yearLastDate() throws Exception{
		Calendar cal = Calendar.getInstance();
		int year = cal.get ( cal.YEAR );
		int month = cal.get ( cal.MONTH ) + 1 ;

		cal.set(year, month, 1);//다음달 1일
		cal.add(Calendar.DATE, -1);
		cal.get(Calendar.DATE);
		return cal.getTime();
	}
	
	@ModelAttribute("BEFORE_SEVEN_DATES")
	public Date beforeSevenDate() throws Exception{
		Calendar cal = Calendar.getInstance();
		cal.add(cal.DATE, -7);
		return cal.getTime();
	}
	
	@ModelAttribute("AFTER_SEVEN_DATES")
	public Date afterSevenDate() throws Exception{
		Calendar cal = Calendar.getInstance();
		cal.add(cal.DATE, 7);
		return cal.getTime();
	}
	
	 
	public int getAutoGrowCollectionLimit() {
		return autoGrowCollectionLimit;
	}
	public void setAutoGrowCollectionLimit(int autoGrowCollectionLimit) {
		this.autoGrowCollectionLimit = autoGrowCollectionLimit;
	}
	public String getJsonType() {
		return jsonType;
	}
	public void setJsonType(String jsonType) {
		this.jsonType = jsonType;
	}
} 