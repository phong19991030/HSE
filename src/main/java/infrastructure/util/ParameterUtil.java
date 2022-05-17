package infrastructure.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.co.a2m.security.kryptos.A2mAES256;

import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class ParameterUtil {

	public static boolean checkToken(HttpServletRequest request) throws Exception{
		boolean result = false;
		HttpSession session = request.getSession();

		String pathKey = MenuUtil.getPathKey(request);
		String token =null;
		if(session.getAttribute("_token")  != null){
			Map sessionToken = (Map) session.getAttribute("_token");
			
			token = (String) sessionToken.get("_TOKEN_KEY");
		}
		
		
		String tokenHeader = request.getHeader("csrftoken");

		if(tokenHeader != null) {
			A2mAES256 aes = new A2mAES256();
			Map messageMap = ResourceUtil.getMessageMap("system.encrypt");
			String key = (String) ((Map)messageMap.get("key")).get("MESSAGE");
			
			tokenHeader = aes.decrypt(tokenHeader, key);
		}
		if(token !=null){
			if(tokenHeader == token){
				result = true;
			}
		}
		if(tokenHeader == null || tokenHeader ==""){
			result = true;
		}
		
		return result;
		
	}
	public static Map getParameterMapWithOutSession(HttpServletRequest request) throws Exception {
		if(checkToken(request)){
			Map map = new HashMap();
			getParam(request, map);
			return map;
		}else{
			// 
			throw new Exception();
			
		}
	}

	public static Map getParameterMap(HttpServletRequest request) {

		Map map = new HashMap();
		getParam(request, map);

		// 2) 세션정보를 파라미터에 담는다.(사용자정보를 쿼리에서 사용하는 경우가 많으므로)
		// AuthController확인(SESS_USER라는 명칭으로 세션에 사용자정보 저장되어 있다고 가정)
		HttpSession session = request.getSession();
		// //AuthController확인(SESS_USER라는 명칭으로 세션에 사용자정보 저장되어 있다고 가정)
		if (session != null && session.getAttribute("SESS_USER") != null) {
			Map user = (Map) session.getAttribute("SESS_USER");
			map.put("session", user);
			map.put("SESSION_ID", session.getId());
			map.put("DEVICE_TYPE", session.getAttribute("DEVICE_TYPE"));

			map.put("REGI_EMP_NO", user.get("USER_UID"));
			map.put("MDFY_EMP_NO", user.get("USER_UID"));
			map.put("REGI_DT", new Date());
			map.put("MDFY_DT", new Date());
		}
		// ndq 18.08.20: Add language parameter
	    Locale locale = LocaleContextHolder.getLocale();
		if (locale != null) {
			map.put("LANG_CODE", locale.getLanguage());
		}
		return map;
	}
	
	public static String getSessionId(Map parameter) {
		return (String) parameter.get("SESSION_ID");
	}

	/**
	 * 파라미터를 변형 해주는 기능
	 * 
	 * @작성일 : 2015. 7. 15.
	 * @작성자 : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO recursive로 변형 예정
	 */
	private static void getParam(HttpServletRequest request, Map map) {
		int initCapacity = 4000;

		Map paramerterMap = request.getParameterMap(); // 1) 파라미터정보를 Map에 담는다.
		if (request instanceof MultipartHttpServletRequest) {
			// muliPart인 경우
			Iterator<String> itr = ((MultipartHttpServletRequest) request).getFileNames();

			while (itr.hasNext()) {
				String uploadFileName = itr.next();
				// System.out.println(uploadFileName);
				List fileList = ((MultipartHttpServletRequest) request).getFiles(uploadFileName);
				// System.out.println(fileList.size());
				/**
				 * 180601 김진학 : jdk 1.7부터 getParameterMap()으로 넘어오는 맵은 immutable 합니다. 따라서 다른방법으로 수정 
				 */
				map.put(uploadFileName, fileList);

			}
		} 
		// System.out.println("================> request : " + request);
		// System.out.println("================> getParameterMap : " +
		// paramerterMap);

		Iterator iter = paramerterMap.keySet().iterator();
		String key = null;
		Object value = null;
		String modelKey;
		String listModel;
		String column;

		for (Map.Entry<String, Object> entry : ((Map<String, Object>) paramerterMap)
				.entrySet()) {
			key = entry.getKey();
			// value =((String[]) entry.getValue())[0];
			// System.out.println(key);
			// System.out.println(value);

			if (entry.getValue() instanceof String[]) {
				String[] tmp = (String[]) entry.getValue();
				if (tmp.length < 2) {
					value = ((String[]) entry.getValue())[0];
				} else {
					value =Arrays.asList(((String[]) entry.getValue()));
				}
				// System.out.println("문자열");
			} else if (entry.getValue() instanceof List) {
				value = entry.getValue();
			}
//			if(!CastUtil.castToString(key).matches(".*file.*") && !(value instanceof List<?>) && !((value instanceof String) && (value.toString().matches("^\\[({.*}(,|))*\\]$")))){
			if(!CastUtil.castToString(key).matches(".*file.*") && !(value instanceof List<?>)){
				value = cleanXSS(value);	
			}
			

			if (key.matches("[a-zA-Z](.*)\\[[0-9]{1,}\\]\\[(.*)\\]")) {
				// 여러건의 모델리스트일경우 List<Map> //name = "Hrm[0][DEPT_NM]"
				Pattern p = Pattern
						.compile("([a-zA-Z].*)\\[([0-9]{1,})\\]\\[(.*)\\]");
				Matcher m = p.matcher(key);
				m.matches();

//				System.out.println(m.group(1));
//				System.out.println(m.group(2));
//				System.out.println(m.group(3));

				modelKey = m.group(1);
				column = m.group(3);
				int seq = Integer.parseInt(m.group(2));
				// modelKey = modelKey.replaceAll("\\[[0-9]{1,}\\]", "");
				if (!map.containsKey(modelKey)) {
					map.put(modelKey, initList(initCapacity));
				} else {
					// 넘어온 데이터가 초기용량을초기 할 경우 기존 새로운 List를 생성하고 기존 데이터를 새로 바인드
					if (seq >= initCapacity) {
						List tmpList = ((List) (map.get(modelKey))); 
						initCapacity = seq+1000;
						List list =initList(seq+1000);
						list.addAll(tmpList);
						map.put(modelKey, list);
					}
					
				}
				
				if (((List) (map.get(modelKey))).get(seq) == null) {
					((List) (map.get(modelKey))).set(seq, new HashMap());
				}
				
				
				
				((Map) (((List) (map.get(modelKey))).get(seq))).put(column, value);
			}

			else if (key.matches("[a-zA-Z](.*)\\[[0-9]{1,}\\]\\.(.*)")) {
				// 여러건의 모델리스트일경우 List<Map> //name = "Hrm[0].DEPT_NM"
				modelKey = key.substring(0, key.indexOf("."));
				column = key.substring(key.indexOf(".") + 1);
				int seq = Integer.parseInt(modelKey.substring(
						modelKey.indexOf("[") + 1, modelKey.indexOf("]")));
				modelKey = modelKey.replaceAll("\\[[0-9]{1,}\\]", "");
				if (!map.containsKey(modelKey)) {
					map.put(modelKey, initList(initCapacity));
				} else {
					// 넘어온 데이터가 초기용량을초기 할 경우 기존 새로운 List를 생성하고 기존 데이터를 새로 바인드
					if (seq >= initCapacity) {
						List tmpList = ((List) (map.get(modelKey)));
						map.put(modelKey, initList(seq).addAll(tmpList));
					}
				}
				if (((List) (map.get(modelKey))).get(seq) == null) {
					((List) (map.get(modelKey))).set(seq, new HashMap());
				}
				((Map) (((List) (map.get(modelKey))).get(seq))).put(column,
						value);
			} else if (key.matches("[a-zA-Z](.*)\\.(.[^\\.]*)(.*)")) {
				// 단건의Map 형태 //name = "Hrm.DEPT_NM"
				modelKey = key.substring(0, key.indexOf("."));
				column = key.substring(key.indexOf(".") + 1);
				// map.put(modelKey, value);
				if (!map.containsKey(modelKey)) {
					map.put(modelKey, new HashMap());
				}
				((Map) (map.get(modelKey))).put(column, value);
			}// Map<Map<Map>> 담기는 구조도 생성 해야함
			else {
				// 리스트 형태변환
				if (key.matches(".*\\[.*\\]")) {
					key = key.replace("[", "").replace("]", "");
				}
				// 단건의 데이터 //name = "DEPT_NM"
				// 수정해야함
				if (map.containsKey(key)) {
					String tmp = (String) map.get(key);

					if (map.get(key) != null && map.get(key) instanceof List) {
						((List) map.get(key)).add(value);
					} else {
						map.put(key, new ArrayList());
					}

				} else {
					map.put(key, value);
				}

			}
		}
		// map.get(modelKey)
		removeNullListFromMapObject(map);
		
		// ndq 18.08.20: Add language parameter to param
	    Locale locale = LocaleContextHolder.getLocale();
		if (locale != null) {
			map.put("LANG_CODE", locale.getLanguage());
		}
		// System.out.println("===========> 가공된 데이터" + map);
	}

	private void generateObjectToMap() {

	}

	private static List initList(int size) {
		List list = new ArrayList();
		for (int i = 0; i < size; i++) {
			list.add(i, null);
		}

		return list;
	}

	private static void removeNullList(List list) {
		list.removeAll(Collections.singleton(null));
	}

	private static void removeNullListFromMapObject(Map map) {
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) map)
				.entrySet()) {
			if (entry.getValue() instanceof List) {
				removeNullList((List) entry.getValue());
			}
		}
	}

	public static Object cleanXSS(Object object) {

		if (!(object instanceof List) && !(object instanceof Map)) {
			String value;

			value = CastUtil.castToString(object);
			
			if(value.contains("{") && value.contains("}") && value.contains(":")) {
				
			} else {
				value = org.springframework.web.util.HtmlUtils.htmlEscape(value, "UTF-8");
			}
			
			value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			// value = value.replaceAll("\\(", "& #40;").replaceAll("\\)",
			// "& #41;");
			//value = value.replaceAll("'", "& #39;");
			//value = value.replaceAll("eval\\((.*)\\)", "");
			//value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
			//value = value.replaceAll("script", "");
			//value = org.springframework.web.util.HtmlUtils.htmlEscape(value);
			value = StringEscapeUtils.escapeSql(value);
			
			

			return value;
		} else {
			if (object instanceof List) {
				// List resultList = new ArrayList();
				List resultList = new ArrayList();
//				resultList.addAll((List)object);
								
				for (int i = 0; i < ((List) object).size(); i++) {
					// key = entry.getKey() ;

					// ((List)object).get(index)

					// tmps = cleanXSS(((List)obj ect).get(i));
					// resultList.set
					
					Object obj = cleanXSS(((List) object).get(i));
					if(obj != null ){
						((List) resultList).add(i,obj
								);
					}
					// object.
					
					
				}
				object = resultList;

			} else if (object instanceof Map) {

				for (Map.Entry<String, Object> entry : ((Map<String, Object>) object)
						.entrySet()) {
					// key = entry.getKey() ;
					entry.setValue(cleanXSS(entry.getValue()));
				}
			}
			return object;

		}
	}
	
	public static String decodeHtml(Object str) {
		String res = null;
		if (str != null && str instanceof String) {
			res = org.springframework.web.util.HtmlUtils.htmlUnescape(str.toString());
			res = res.replaceAll("& #39;", "'");
			res = res.replaceAll("&gt;", ">");
			res = res.replaceAll("&lt;", "<");
		}
		return res;
	}
	
	public static String decodeUnHtml(Object str) {
		String res = null;
		if (str != null && str instanceof String) {
//			res = str.toString().replaceAll("&amp; #39;", "&amp;#39;");
			res = str.toString().replaceAll("&amp; #39;", "&amp;apos;");
		}
		return res;
	}
	
	public static String deleteClassNM(Object str) {
		String res = null;
		if (str != null && str instanceof String) {
			res = str.toString().replaceAll("class=&quot;HStyle0&quot;", "");
			res = res.toString().replaceAll("class=&quot;HStyle21&quot;", "");
			res = res.toString().replaceAll("class=&quot;1&quot;", "");
		}
		return res;
	}
	
	public static String removeNL(Object str){
		String res = null;
		if(str != null && str instanceof String){
			System.out.println(str.toString());
			res = str.toString().replaceAll("(\r|\n|\r\n|\n\r)","");
		}
		return res;
	}
	
	@SuppressWarnings("rawtypes")
	public static Object getParameter(String paramName, Map parameters) {
		if (paramName == null || paramName.isEmpty() || parameters == null) {
			return null;
		}
		
		if (parameters.containsKey(paramName)) {
			return parameters.get(paramName);
		}
		
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static String getPWD(HttpServletRequest request) {
		StringBuilder pwd = new StringBuilder("a2m");
		Map<String, Object> parameters = getParameterMap(request);
		
		pwd = pwd.append(((Map)parameters.get("session")).get("PWD").toString()).append("m2a");
		return pwd.toString();
	}
	
}
