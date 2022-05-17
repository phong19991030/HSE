package infrastructure.grant;

import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.util.ArrangeUtil;
import infrastructure.util.CastUtil;
import infrastructure.util.MenuUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;
import module.sys.Sys_0203ServiceImpl;
import module.sys.Sys_0302DAOImpl;

public class GrantInterceptor implements HandlerInterceptor {
	
	@Autowired
	public Sys_0203ServiceImpl sys_0203service;
	@Autowired
	private Sys_0302DAOImpl sys_0302Dao;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
		 Object handler) throws Exception {
		 HttpSession session = request.getSession();
		 String reqPage = request.getRequestURI();
		 String ctxPath = request.getContextPath();
		Map parameter = ParameterUtil.getParameterMap(request); 

		 String key ="";
		 if(reqPage !=null){
			 key = reqPage.replace(ctxPath, "");
		 }
		 
		 String ext = "";
			if(reqPage != null && !reqPage.equals(ctxPath) || !reqPage.equals(ctxPath+"/")){
				if(reqPage.indexOf(".") > -1){
					ext = reqPage.substring(reqPage.lastIndexOf(".")+1);
				}
			}
		
		Map messageMap = ResourceUtil.getMessageMap("system.session.filter.accept");
		String accept_ext = (String) ((Map)messageMap.get("ext")) .get("MESSAGE");
		
		messageMap = ResourceUtil.getMessageMap("system.grant.interceptor.accept");
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
		Map genManage = ResourceUtil.getMessageMap("system.genmode");
		if(CastUtil.getBool(genManage.get("MESSAGE"))){
			if(cm_reqPage.matches("/generate.*")){
				passFilter = true;
			}
		}
		
		//세션검증 제외페이지
		if(passFilter){ 
			return true;
		}
		
		//session 체크 
		//세션값이 있을 경우에 만
		if(session.getAttribute("SESS_USER") != null) {
			
			String user_uid = session.getAttribute("SESS_USER").toString();
			
			/*
			 * check permission: user - turbine
			 */			
			Map sess = (Map) parameter.get("session");
			if(parameter.get("search") != null) {
				parameter.putAll((Map) parameter.get("search"));
			}
			parameter.putAll(sess);
			if(parameter.get("TURBINE_ID") != null ) {
				parameter.put("GERATOR_ID", parameter.get("TURBINE_ID"));
			}
			// @JK - 발전기 권한 체크 : 여기다 밖으면 어카냐..
//			if(parameter.get("GERATOR_ID") != null ) {
//				Boolean checkGerator = (Boolean) sys_0302Dao.object("checkGenerator", parameter);
//				if(!checkGerator) {
//					Writer writer =  response.getWriter();
//					response.sendRedirect(request.getContextPath() + "/common/auth/expire");
//					writer.write("<script>alert('This user does not have permission with the generator!')</script>");
//					return false;
//				}
//			}
			if(parameter.get("EVENT_ID") != null ) {
				Boolean checkEvent = (Boolean) sys_0302Dao.object("checkEvent", parameter);
				if(!checkEvent) {
					Writer writer =  response.getWriter();
					response.sendRedirect(request.getContextPath() + "/common/auth/expire");
					writer.write("<script>alert('Something wrong!')</script>");
					return false;
				}			
			}
			
			if(parameter.get("PART_ID") != null ) {
				// PART_ID 가 여러개인 경우 (ex: Request quote)에도 기능할 수 있게 수정 (hhyun 200313)
				String[] partId = parameter.get("PART_ID").toString().split(",");
				
				for(String obj : partId) {
					parameter.put("PART_ID", obj);
					Boolean checkPart = (Boolean) sys_0302Dao.object("checkPart", parameter);
					if(!checkPart) {
						Writer writer =  response.getWriter();
						response.sendRedirect(request.getContextPath() + "/common/auth/expire");
						writer.write("<script>alert('Something wrong!')</script>");
						return false;
					}
				}
				
				/* origin code
				Boolean checkPart = (Boolean) sys_0302Dao.object("checkPart", parameter);
				if(!checkPart) {
					Writer writer =  response.getWriter();
					response.sendRedirect(request.getContextPath() + "/common/auth/expire");
					writer.write("<script>alert('Something wrong!')</script>");
					return false;
				}
				*/			
			}
			
			if(parameter.get("MAIN_PART_ID") != null ) {
				Boolean checkMainPart = (Boolean) sys_0302Dao.object("checkMainPart", parameter);
				if(!checkMainPart) {
					Writer writer =  response.getWriter();
					response.sendRedirect(request.getContextPath() + "/common/auth/expire");
					writer.write("<script>alert('Something wrong!')</script>");
					return false;
				}			
			}
			
			/*
			 * end check permission
			 */			
			
			
//			Map menuMap = (Map) MenuUtil.getMenuList(request,response).get("menuMap");
			Map map= null ;
			

			Map menuMap = MenuUtil.getMenuList(request,response);  
			 

			if(menuMap == null || menuMap.get("menuMap")==null){
				String pathKey = MenuUtil.getPathKey(request);
				
				
				/*권한 예외상황 처리 */
//				if(pathKey.equals("btm_0202")|| pathKey.equals("btm_0203")|| pathKey.equals("btm_0204")){
//					pathKey ="btm_0201";
//				}
//				if(pathKey.equals("btm_0302")|| pathKey.equals("btm_0303")|| pathKey.equals("btm_0304")){
//					pathKey ="btm_0301";
//				}
//				if(pathKey.equals("fcm_0403")){
//					pathKey ="fcm_0401";
//				}
//				if(pathKey.equals("hrm_0201")){
//					return true;  
//				}
				
				/*권한 예외상황 처리 */
				if(pathKey.equals("sft_0002")){
					pathKey ="sft_0001";
				}
				
				 Map menu = (Map)session.getAttribute("SESS_MENU");
				 
				 if(menu !=null){ 
					 Object obj =  ArrangeUtil.findMapFromTreeMapBasedFullScan(menu,pathKey);
					 if(obj != null && obj instanceof Map){
						Map tmpMap = (Map)obj;
						menuMap.put("menuMap", tmpMap);
					 }
				 }
			}
			
			if(menuMap.get("menuMap")!=null){
				map =   MenuUtil.getGrant((Map) menuMap.get("menuMap"));
			}
			
			
			// 권한맵을 일단 확인 
//			doan comment to make layout
			if(map != null) {
				
				// @JK 
				Boolean flag = map.get("READ_YN") != null ? (Boolean) map.get("READ_YN") : false;
				// 권한이 있을 경우 통과 
				if(flag){
					return true;
				} else {
					// 없을 경우 제한 
					Writer writer = response.getWriter();
					writer.write("<script>alert('권한이 없습니다.')</script>");
//					System.out.println("권한이 없습니다.");
					//writer.flush();
					response.sendRedirect(request.getContextPath() + "/main/main");
					return false;
				}
			} else {
				passFilter=false;
				if(!passFilter){
					for(String str : matchingUrl){
						if(cm_reqPage.matches(str.trim())){
							passFilter = true;
							break;
						}
					}
				}
//				 System.out.println("권한 없음- 일단 패스 ");
				// 조건을 추가 할 수도 있음 
				if(passFilter ||key.contains("/common")|| key.matches("/[a-zA-Z]{3}/popup/.*")) {
					return true;
				} else {
					Writer writer =  response.getWriter();
					writer.write("<script>alert('잘못된 접근입니다.')</script>");
					response.sendRedirect(request.getContextPath() + "/main/main");
					return false;
				}
				 
			}
//			return true;
		}else{
			passFilter=false;
			if(!passFilter){
				for(String str : matchingUrl){
					if(cm_reqPage.matches(str.trim())){
						passFilter = true;
						break;
					}
				}
			}
			//세션이 없을 경우에 
			//통과 여부
			if(passFilter ){
				return true;
			}else{
//				System.out.println("세션이 없습니다.");
				Writer writer =  response.getWriter();
				response.sendRedirect(request.getContextPath() + "/common/auth/expire");
				writer.write("<script>alert('세션이 없습니다.')</script>");
				return false;
			}
		}
		
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler, ModelAndView mav) throws Exception {
//		System.out.println(mav.getViewName());
		String mdi = request.getParameter("mdi");
		
		if(mav != null){
			String view = mav.getViewName();
		
			if(mdi!= null &&mdi.equals("true")){
				mav.setViewName("tab:"+view);
			}
		}
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}
}
