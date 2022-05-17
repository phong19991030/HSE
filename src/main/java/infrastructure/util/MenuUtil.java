package infrastructure.util;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 공통 Utility 클래스.
 * @FileName  : CommonUtil.java
 * @Project     : mis_java
 * @최초작성일 : 2014. 9. 26. 
 * @프로그램설명 : 공통적인 데이터 변경등의 기능을 수행하는 단위 컴포넌트
 */
/**
 * @author keim
 *
 */
public final class MenuUtil
{
     
    public static Map getMenuList(HttpServletRequest request, HttpServletResponse response){
    	Map returnMap= new HashMap();
//    	 String menuId= new String();
//		 String ctxPath = request.getContextPath();
		 String reqPage = request.getRequestURI();
//		 String key = reqPage.replace(ctxPath, "");
		 HttpSession session = request.getSession();
		 Map menu = (Map)session.getAttribute("SESS_MENU");
		 Map sysmenu = (Map)session.getAttribute("SESS_SYS_MENU");
		 Map menus = new HashMap();
		 Map menuMap = null ;
		 String menuType ="menu";
		 Map parameter = ParameterUtil.getParameterMap(request);
		 
		 String key = getPathKey(request);
		
		 
		 if(menu !=null){ 
			 Object obj =  ArrangeUtil.findMapFromTreeMapBasedFullScan(menu,key);
			 if(obj != null && obj instanceof Map){
			 menuMap = (Map)obj;
			 menuType= "menu"; 
			 menus = menu;
			 }
		 }
		 if(sysmenu !=null){ 
			 Object obj =  ArrangeUtil.findMapFromTreeMapBasedFullScan(sysmenu,key);
			 if(obj != null && obj instanceof Map){
			 menuMap = (Map)obj;
			 menuType= "sys";
			 menus = sysmenu;
			 }
		 }
		 Map resultMaps=new HashMap();
		 if(menus != null && menuMap !=null){
			 
			resultMaps =  fillMenuInfo(menus,menuMap);
			resultMaps.put("fid", getfirstMenuId((Map) resultMaps.get("SUBMENU")));
			resultMaps.put("cid", getcurrentMenuId((Map) resultMaps.get("SUBMENU")));
			
		 }
		 resultMaps.put("menuType", menuType);
		 resultMaps.put("param", parameter);
		 
		 returnMap.put("resultMap", resultMaps);
		 returnMap.put("menuMap", menuMap);
		 
		 return returnMap;
    }
    /**
   	 * 메뉴정보추출 위치 이동 필요
   	 * @작성일    : 2014. 10. 1. 
   	 * @작성자      : keim
   	 * @프로그램설명 :
   	 * @진행상태설명:  COMPLETE 완료
   	 */
   	private static Map fillMenuInfo(Map menu ,Map menuMap){
   		 Map map = new HashMap();
   		
   		for (Map.Entry<String, Object> entry : ((Map<String, Object>) menuMap) .entrySet()){
   			if(menuMap instanceof Map && menu instanceof Map){
   				if(menuMap.keySet().size() >1){
   					map.put(entry.getKey(),entry.getValue());
   					
   				}else{
   					Map subMap = (Map)menu.get(entry.getKey());
   					if(entry.getKey().equals("List")){
   						map =  fillMenuInfo(subMap,(Map)entry.getValue());
   					}else{
   						Map recurMap =  fillMenuInfo(subMap,(Map)entry.getValue());
   						// 2016.11.24 수정 중복recursive 방지 
   						// 알고리즘 개선이 사실상 불가능함. 이유는 
   						// recursive 파라미터를 정확하게 추출할 조건이 명확하지 않음. 
   						// 현재 메뉴야 하위 메뉴명이 같으면 덮어 쓰기
   						if(recurMap.get("MENU_ID").equals(subMap.get("MENU_ID"))){
   							map.putAll(recurMap);
   						}else{
	   						map.put("SUBMENU",recurMap);
	   						map.put("READ_YN", subMap.get("READ_YN"));
	   						map.put("MENU_NM", subMap.get("MENU_NM"));
	   						map.put("MENU_ID", subMap.get("MENU_ID"));
	   						map.put("LINK_PATH", recurMap.get("LINK_PATH"));
   						}
   					}
   				}
   			}
   		}
   		 return map;
   	 }
   	public static String getfirstMenuId(Map menuMap){
		String str = (String) menuMap.get("MENU_ID");
		return str;
	}
   	public static String getcurrentMenuId(Map menuMap){
		String str=null;
		if(menuMap instanceof Map){
			for (Map.Entry<String, Object> entry : ((Map<String, Object>) menuMap).entrySet()){
				if(entry.getValue() instanceof Map ){
					str = getcurrentMenuId((Map) entry.getValue());
				}
			}
			if(str==null){
				str = (String) menuMap.get("MENU_ID");
			}
		}
		return str;
	 }
    /**
     * 권한자동설정
     * @작성일    : 2016. 3. 17. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static Map getGrant(Map menuMap)  {
		 Map grantMap = new HashMap();
		 Map tmpmap = (Map) ArrangeUtil.findMapFromMapBasedFullScan(menuMap,"READ_YN");
		 
		 /*
		  * @JK - 보안 취약점 수정 
		  */
//		 boolean mng_yn = CastUtil.getBool((String) tmpmap.get("MNG_YN"));
//		 if(mng_yn){
//			 grantMap.put("READ_YN",true);
//			 grantMap.put("WRT_YN", true);
//			 grantMap.put("MOD_YN",true);
//			 grantMap.put("DEL_YN", true);
//			 grantMap.put("PNT_YN", true);
//			 grantMap.put("EXC_DN_YN",true);
//			 grantMap.put("MNG_YN",true);
//		 }else{
//			 grantMap.put("READ_YN",CastUtil.getBool((String) tmpmap.get("READ_YN")));
//			 grantMap.put("WRT_YN", CastUtil.getBool((String) tmpmap.get("WRT_YN")));
//			 grantMap.put("MOD_YN", CastUtil.getBool((String) tmpmap.get("MOD_YN")));
//			 grantMap.put("DEL_YN", CastUtil.getBool((String) tmpmap.get("DEL_YN")));
//			 grantMap.put("PNT_YN", CastUtil.getBool((String) tmpmap.get("PNT_YN")));
//			 grantMap.put("EXC_DN_YN", CastUtil.getBool((String) tmpmap.get("EXC_DN_YN")));
//			 grantMap.put("MNG_YN", CastUtil.getBool((String) tmpmap.get("MNG_YN")));
//		 }
		 if(tmpmap != null) {
			 boolean mng_yn = CastUtil.getBool((String) tmpmap.get("MNG_YN"));
			 if(mng_yn){
				 grantMap.put("READ_YN", true);
				 grantMap.put("WRT_YN", true);
				 grantMap.put("MOD_YN",true);
				 grantMap.put("DEL_YN", true);
				 grantMap.put("PNT_YN", true);
				 grantMap.put("EXC_DN_YN", true);
				 grantMap.put("MNG_YN", true);
			 }else{
				 grantMap.put("READ_YN", CastUtil.getBool((String) tmpmap.get("READ_YN")));
				 grantMap.put("WRT_YN", CastUtil.getBool((String) tmpmap.get("WRT_YN")));
				 grantMap.put("MOD_YN", CastUtil.getBool((String) tmpmap.get("MOD_YN")));
				 grantMap.put("DEL_YN", CastUtil.getBool((String) tmpmap.get("DEL_YN")));
				 grantMap.put("PNT_YN", CastUtil.getBool((String) tmpmap.get("PNT_YN")));
				 grantMap.put("EXC_DN_YN", CastUtil.getBool((String) tmpmap.get("EXC_DN_YN")));
				 grantMap.put("MNG_YN", CastUtil.getBool((String) tmpmap.get("MNG_YN")));
				 
				 
				 // @JK 추가 - MENU_ID, MENU_NM, PGM_ID 추가
				 grantMap.put("MENU_ID", (String) tmpmap.get("MENU_ID"));
				 grantMap.put("MENU_NM", (String) tmpmap.get("MENU_NM"));
				 grantMap.put("PGM_ID", (String) tmpmap.get("PGM_ID"));
			 }
		 }
		 
		 return grantMap;
	}
    
    public static String getPathKey(HttpServletRequest request){
    	 
		 String reqPage = request.getRequestURI();
		 String ctxPath = request.getContextPath();
		 String key = reqPage.replace(ctxPath, "");
		 
//		 String[] arr = key.split("\\/");
//		 key = arr[arr.length - 2];
		 
		 Pattern pattern = Pattern.compile("([a-zA-Z]{1,}\\_[0-9]{4,})");
		 Matcher matcher = pattern.matcher(key);
	     if(matcher.find()){ 
			key = matcher.group(1);
		 }
	     return key;
    }
    
    public static String getCurrentPathId(HttpServletRequest request){
   	 
		String reqPage = request.getRequestURI();
		String ctxPath = request.getContextPath();
		String key = reqPage.replace(ctxPath, "");
		String rest = "" ; 
		Pattern pattern = Pattern.compile("([a-zA-Z]{1,}\\_[0-9]{4,})");
		Matcher matcher = pattern.matcher(key);
	    if(matcher.find()){ 
	    	 rest = matcher.group(1);
		}
	    Pattern pattern1 = Pattern.compile("([0-9]{1,})");
		Matcher matcher1 = pattern1.matcher(key.substring(key.indexOf(rest)+rest.length() ).replace("/",""));
	    if(matcher1.find()){ 
		    	rest =rest + matcher1.group(1);
		}
		    
	     
	     
	     
//	     rest = rest+ key.replace(rest, "").replace("/","");
	     return rest;
    }
}