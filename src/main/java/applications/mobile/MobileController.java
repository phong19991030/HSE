package applications.mobile;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.map.LinkedMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.auth.AuthController;
import applications.auth.AuthDAOImpl;
import applications.auth.AuthModel;
import infrastructure.log.LoggingServiceImpl;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.CalendarUtil;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;

@Controller("mobileController")
public class MobileController {
	@Autowired
	public MobileDAOImpl mobileDAOImpl;

	@Autowired
	private AuthDAOImpl authDAO;
	protected Logger logger = LogManager.getLogger(MobileController.class);
	LoggingServiceImpl loggingService = new LoggingServiceImpl();
	
	private static final String SEC_PROVIDER = "SunRsaSign";


	@RequestMapping("/common/mobile/saveDeviceInfo.ajax")
	public ModelAndView doSaveDeviceInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) {

		String result = "false";
		Map parameter = ParameterUtil.getParameterMap(request);
		Map sess = (Map) parameter.get("session");
		parameter.putAll(sess);
		try {
			if (parameter.get("DEVICE_ID") != null) {

				Object device = mobileDAOImpl.getDevice(parameter);
				if (device != null) {
					mobileDAOImpl.updateUsername(parameter);
				} else {
					mobileDAOImpl.saveDeviceInfo(parameter);
				}

				result = "true";
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = "false";
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/common/mobile/getUsername.ajax")
	public ModelAndView getUsername(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Exception {
		String username = "";

		Map parameter = ParameterUtil.getParameterMap(request);
		try {
			if (parameter.get("DEVICE_ID") != null) {

				Object device = mobileDAOImpl.getDevice(parameter);
				username = ((Map<String, String>) device).get("USER_ID");
			}
		} catch (Exception e) {
			e.printStackTrace();
			username = "";
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", username);
		return mav;
	}

	@RequestMapping("/common/auth/loginWithToken")
	public ModelAndView loginWithToken(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);

		boolean rs = true;
		Object data = null;

		try {
			if (parameter.get("DEVICE_ID") != null && parameter.get("TOKEN") != null) {

				Map device = (Map) mobileDAOImpl.userInfo(parameter);
				if (device == null) {
					rs = false;
					data = "login.INCORRECT_OR_NOT_EXIST_TOKEN";
				}else if (device.get("USER_ID") == null || device.get("PWD") == null) {
					rs = false;
					data = "login.GET_USER_PWD_FAILED";
				} else {
					
					String userId = device.get("USER_ID").toString();
					String user_pw = device.get("PWD").toString();
					device.put("USER_PW",  device.get("PWD").toString());
					
					data = userId;
					

					
					boolean ACCEPT_LOGIN_USE_YN = false;

					List rescVarList = new ArrayList<>();
					Map messageMap = ResourceUtil.getMessageMap("etc");
					for (Map.Entry<String, Object> entry : ((Map<String, Object>) messageMap).entrySet()) {
						Map newMap = new HashMap<>();
						newMap.put("SYS_CONFIG_KEY", entry.getKey());
						newMap.put("SYS_CONFIG_VALUE", ((Map) entry.getValue()).get("MESSAGE"));
						rescVarList.add(newMap);
					}

					List list = (List<Map>) authDAO.list("sys.envir", "environmentlist", new HashMap());
					List resultList = ArrangeUtil.mergeListMap(rescVarList, list, "SYS_CONFIG_KEY");

					Map envirMap = CastUtil.convertMapListToMap(resultList, "SYS_CONFIG_KEY", "SYS_CONFIG_VALUE");
					if (((String) envirMap.get("ACCEPT_LOGIN_USE_YN")).equals("Y")) {
						ACCEPT_LOGIN_USE_YN = true;
					}


					Map user = null;
					if (("a2m".equals(user_pw))) {
						user = (Map) authDAO.object("getUserMaster", device);
					} else {
						user = authDAO.getUser(device);
					}

					if (user == null || user.get("USER_ID") == null) {
						rs = false;
						data = "login.INCORRECT_USER_OR_PASSWORD";
					}

					if (rs) {

						String ipAddress = request.getHeader("X-FORWARDED-FOR");
						if (ipAddress == null) {
							ipAddress = request.getRemoteAddr();
						}
						
						
						if (user != null) {
							parameter.putAll(user);


							/**
							 * Check mobile
							 */

//	  						if(!StringUtils.isEmpty(type_login) && "MOBILE".equals(type_login)) {
//	  							
//	  							if(user.get("IS_FIRST_LOGIN") != null && user.get("IS_FIRST_LOGIN").toString().equals("1")){
//	  								mav.setViewName("jsonView");
//	  								mav.addObject("DATA", "CHANGE_PASSWORD");
//	  								return mav;
//	  							}	
//	  							// send logout notification to device that user_id login before
//	  							sendNotificationLogout(user_id);	
//
//	  						}

							parameter.put("SYS_USER_ID", user.get("SYS_USER_ID"));
							user.put("IP", ipAddress);
							user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
							// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
//	  						sessionBinding.setUser(user);
							parameter.put("USER_UID", user.get("USER_UID"));
							// 3) Menu
							List menu = authDAO.getListMenu(parameter);

							Map menus = splitMenu(menu);

							// 4) For Combo Data

							// 99) Set
							HttpSession httpsession = request.getSession();
							user.put("IP", request.getRemoteAddr());
							user.put("TYPE_LOGIN", "mobile");
							httpsession.setAttribute("SESS_USER", user);

							httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(parameter));
							httpsession.setAttribute("SESS_MENU", menus.get("menu"));
							httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
//	  						httpsession.setAttribute("SESS_EVENT", sessionBinding);
							httpsession.setAttribute("TYPE_LOGIN", "mobile");

							if (envirMap.get("LOGGING_LOGIN_INFO_USE_YN") != null
									&& envirMap.get("LOGGING_LOGIN_INFO_USE_YN").equals("Y")) {
								loggingService.loggingLogin(true, httpsession);
							}

							if (ACCEPT_LOGIN_USE_YN) {
								Map failUserMap = new HashMap();
								failUserMap.put("USER_ID", userId);
								failUserMap.put("USER_LOCKED", "N");
								failUserMap.put("LOGIN_FAIL_CNT", 0);
								authDAO.update("updateLoginFail", failUserMap);
							}
						}
					}
				}
			}else{
				rs = false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			rs = false;
		}
		
		AuthModel model = new AuthModel();

		//if (rs) {
//			HttpSession httpsession = request.getSession();
//			String user_uid = user != null ? (String) user.get("USER_UID") : "";
////				LoginStateMng.getInstance().validateLogin(user_uid, httpsession);

		//	rs = true;
		//} else {

			KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(2048);
			KeyPair keyPair = generator.genKeyPair();
			KeyFactory keyFactory = KeyFactory.getInstance("RSA", SEC_PROVIDER);
			PublicKey publicKey = keyPair.getPublic();
			PrivateKey privatKey = keyPair.getPrivate();
			session.setAttribute("_RSA_WEB_Key_", privatKey); // 세션에 RSA 개인키를 세션에 저장한다.
			RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
			String publicKeyModulus = publicSpec.getModulus().toString(16);
			String publicKeyExponent = publicSpec.getPublicExponent().toString(16);
			request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
			request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input

			model.setRSAModulus(publicKeyModulus);
			model.setRSAExponent(publicKeyExponent);
			model.setSuccess(false);
			model.setErrCode(data.toString());
//			mav.addObject("auth", model);

		//}

		Map mapData = new HashMap<>();
		if(rs) {
			mapData.put("LOGIN_RESULT", "true");
			mapData.put("USER_ID", data);
			
		}else {
			mapData.put("LOGIN_RESULT", "false");			
			mapData.put("errCode", data);
		}
		mapData.put("auth", model);

		mav.setViewName("jsonView");
		mav.addObject("DATA", mapData);
		
		return mav;
	}

	Map tmpMap = new LinkedMap();

	public Map splitMenu(List menuList) {
		Map menus = new LinkedMap();

		int i = 0;
		int k = 0;
		String pre_menu1 = "";
		String cur_menu1 = "";
		String pre_menu2 = "";
		String cur_menu2 = "";
		Map map = new LinkedMap();

		/**
		 * STEP1, STEP2, STEP3,4 시스템 메뉴로 나누어 준다.
		 */

//		ArrayList system = new ArrayList();
		ArrayList<?> infra = new ArrayList();

		Map sysMaps = new LinkedMap();
		Map menuMaps = new LinkedMap();

		tmpMap.put("system", new LinkedMap());
		tmpMap.put("menu", new LinkedMap());
		tmpMap.put("dev", new LinkedMap());

		String menu_cls = ResourceUtil.getMessage("system.system.menu");

		// 리스트로 먼저 정렬
		if (menuList != null && !menuList.isEmpty()) {
			String cls;
			String keyName = "";
			String lev = "";
			for (i = 0; i < menuList.size(); i++) {
				map = (Map) menuList.get(i);
//		  		cur_menu1 = (String)map.get("MENU1");
//		  		cur_menu2 = (String)map.get("MENU2");
				cls = (String) map.get("CLS_CD");
				// 키 분류
				if (cls != null) {

					if (cls.equals(menu_cls))
						keyName = "menu";
					else if (cls.equals("ADM"))
						keyName = "system";
					else
						keyName = "notuse";
				}
				BigDecimal b = new BigDecimal("1");

				lev = ((BigDecimal) map.get("LEV")).toString();
				try {
					Object obj;
					List<String> list = new ArrayList();
					if (keyName != null && keyName != "" && !keyName.equals("notuse")) {
						if (!((Map) tmpMap.get(keyName)).containsKey("step" + lev)) {
							Method m = this.getClass().getDeclaredMethod("createMV", String.class, String.class);
							m.invoke(this, "step" + lev, keyName);
						}
						obj = ((Map) tmpMap.get(keyName)).get("step" + lev);
						((List) obj).add(map);
					}
				} catch (SecurityException e) {
					// TODO Auto-generated catch block
					logger.error(e.getMessage());
				} catch (NoSuchMethodException e) {
					// TODO Auto-generated catch block
					logger.error(e.getMessage());
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					logger.error(e.getMessage());
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					logger.error(e.getMessage());
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					logger.error(e.getMessage());
				}
			}
			getMaps((Map) tmpMap.get("system"), sysMaps);
			getMaps((Map) tmpMap.get("menu"), menuMaps);

		}
		if (!menuMaps.entrySet().isEmpty()) {
			Map.Entry<String, Object> entry = (Entry<String, Object>) menuMaps.entrySet().iterator().next();

			Map menuMapsChanged = new HashMap();

			menuMapsChanged.put("MENU", entry.getValue());

			menus.put("system", sysMaps);
			menus.put("menu", menuMapsChanged);
		} else {
			menus.put("system", sysMaps);
			menus.put("menu", new HashMap());
		}

		return menus;
	}
	
	private void createMV(String str,String key){
		((Map) tmpMap.get(key)).put(str, new ArrayList());
	}

	public void getMaps(Map targetMap, Map resultMap) {
		if (targetMap.size() > 0) {
			Set keyset = targetMap.keySet();
			Map maptemp = targetMap;
			List<String> keyList = new ArrayList();
			for (Object key : Arrays.asList(keyset.toArray())) {
				keyList.add(key.toString());
			}
			String keyNm;
			for (int j = 1; j <= maptemp.size(); j++) {
				keyNm = "step" + j;
				if (keyList.contains(keyNm)) {
//					maptemp.get("step"+j);
					if (keyNm.equals("step1")) {
						for (Map mm : (List<Map>) maptemp.get("step" + j)) {
							resultMap.put(mm.get("MENU_ID"), mm);
						}
					} else {
//						sysMaps.get
						for (Map mm : (List<Map>) maptemp.get("step" + j)) {
							Map obj = null;
							String mid = (String) mm.get("UP_MENU_ID");
							Map objMap = getObject(j, mid, resultMap);
							if (objMap != null) {
								((Map) objMap).put(mm.get("MENU_ID"), mm);
							}

						}
					}

				}
			}
			keyList.size();

		}
	}

	public Map getObject(int j, String mid, Map dtMap) {
		Map obj = null;
		Map tmpMap;

		if (j == 2) {
			obj = (Map) dtMap.get(mid.substring(0, j * 3 - 1));
//			obj= (Map)((Map)dtMap.get(mid.substring(0,j*3-1))).get("List");
		} else {

			tmpMap = (Map) (((Map) getObject(j - 1, mid, dtMap)));

			if (tmpMap != null) {
				obj = (Map) tmpMap.get(mid.substring(0, j * 3 - 1));
			}
		}
		if (obj != null) {
			if (!obj.containsKey("List")) {
				obj.put("List", new LinkedMap());
			}

			obj = (Map) obj.get("List");
		}
		return obj;
	}

}