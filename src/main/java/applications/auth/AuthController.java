package applications.auth;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.collections.map.LinkedMap;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import applications.mobile.MobileDAOImpl;
import applications.util.CryptoUtil;
import applications.util.UtilService;
import applications.util.Utils;
import infrastructure.log.LoggingServiceImpl;
import infrastructure.session.SessionBinding;
import infrastructure.session.SessionBindingMobile;
import infrastructure.session.SessionModelStateMng;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.CalendarUtil;
import infrastructure.util.CastUtil;
import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;
import kr.co.a2m.security.kryptos.A2mSHA;
import module.model.RememberLoginAuth;
import module.util.RandomString;

@Controller("authController")
public class AuthController {

	private static final String KEY_CRYPTO = "a2m@2019";
	private static final String SEC_PROVIDER = "SunRsaSign";
	protected Logger logger = LogManager.getLogger(AuthController.class);
	@Autowired
	private AuthDAOImpl authDAO;
	@Autowired
	private MobileDAOImpl mobileDAOImpl;
	@Autowired
	private ServletContext servletContext;

	@Autowired
	private UtilService utilService;

	LoggingServiceImpl loggingService = new LoggingServiceImpl();

	@RequestMapping("/common/auth/changePassword")
	public ModelAndView changePassword(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Exception {
		Map result = new HashMap();

		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map sessionMap = (Map) parameter.get("session");

		/* 처리(NOW: 지금 변경하기, NEXT: 다음에 변경하기) */
		String process = (String) parameter.get("PW_CHANGE_PROCESS");
		result.put("PW_CHANGE_PROCESS", process);

		/* 지금 변경하기(NOW) */
		if (process.equals("NOW")) {

			/* 기존PW, 변경PW, 기존SALT */
			String oldPw = (String) parameter.get("oldPw");
			String newPw = (String) parameter.get("newPw");
			String salt = (String) sessionMap.get("SALT");

			Map user;
			A2mSHA sha = new A2mSHA();

			/* 기존 password 비교 */
			// 기존 salt 값이 있을 경우, 입력한 기존 PW 뒤에 기존 SALT 쳐서 암호화
			if (salt != null) {
				parameter.put("USER_PW", sha.encrypt(oldPw + salt));
				parameter.put("SALT", salt);
			}
			// 기존 salt 값이 없을 경우, 입력한 기존 PW 그대로 암호화
			else {
				parameter.put("USER_PW", sha.encrypt(oldPw));
			}
			// 로그인 후 session에 담긴 사용자 ID put, session에 저장된 ID를 사용하기 때문에 외부 요청은 조회 불가능 하므로 안전
			parameter.put("USER_ID", sessionMap.get("USER_ID"));

			// 입력한 PW와 ID로 사용자 조회
			user = authDAO.getUser(parameter);

			/* 후처리 */
			// 조회된 유저 없을 경우 => 입력한 기존 password 틀림
			if (user == null) {
				result.put("RESULT", false);
			}
			// 조회된 유저 있을 경우 => 입력한 새로운 PW로 변경 처리
			else {
				// 새로운 SALT 값 생성
				RandomString rs = new RandomString(20);
				salt = rs.nextString();
				// 새롭게 생성한 SALT값을 더해 암호화
				parameter.put("PASSWORD", sha.encrypt(newPw + salt));
				parameter.put("SALT", salt);
				parameter.put("USER_UID", sessionMap.get("USER_UID"));
				// 비밀번호 변경
				int cnt = (int) authDAO.update("changePassword", parameter);

				if (cnt > 0) {
					result.put("RESULT", true);
					// sessionMap.put("IS_FIRST_LOGIN", 0);
				}
			}

		}
		/* 다음에 변경하기(NEXT) */
		else if (process.equals("NEXT")) {
			sessionMap.put("IS_FIRST_LOGIN", 0);
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/common/auth/doLoginFormApi")
	public ModelAndView doLoginFormApi(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Exception {
		// MessageManager mm = MessageManager.getInstance();
		// String str = ResourceUtil.getMessages("system.sevlet.filter.ext");
		String str = ResourceUtil.getMessage("system", "session.filter.accept.ext");
		// System.out.println(str);

		logger.info(str);

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
		session.setAttribute("RSAModulus", publicKeyModulus); // 세션에 RSA 개인키를 세션에 저장한다.
		session.setAttribute("RSAExponent", publicKeyExponent); // 세션에 RSA 개인키를 세션에 저장한다.
		request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		AuthModel m = new AuthModel();
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		if (parameter.get("DEVICE_ID") != null) {
			Object device = mobileDAOImpl.getDevice(parameter);
			String username = ((Map<String, String>) device).get("USER_ID");
			m.setUsername(username);
		}

		/**
		 * ModelAndView
		 */

		m.setRSAModulus(publicKeyModulus);
		m.setRSAExponent(publicKeyExponent);
		mav.setViewName("jsonView");
		mav.addObject("DATA", m);
		return mav;
	}

	@RequestMapping("/common/auth/doLoginApi")
	public ModelAndView doLoginApi(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Exception {
		boolean ACCEPT_LOGIN_USE_YN = false;

		/** 로그인 실패시 **/

		// 아래처럼 controller에서 프로그램하지 마세요 !!! ㅠ

		// List rescVarList =
		// CastUtil.convertMapToMapList(map,"SYS_CONFIG_KEY","SYS_CONFIG_VALUE");
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

		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		PrivateKey privateKey = (PrivateKey) session.getAttribute("_RSA_WEB_Key_");
		/**
		 * Init
		 */
		Boolean isError = false;
		String errCode = "";
		String user_id = "";
		String user_pw = "";
		String mode = "";
		String type_login = "";
		Map user = null;

		SessionBindingMobile sessionBinding = new SessionBindingMobile();

		/**
		 * Request
		 */
		mode = (String) request.getParameter("mode");
		if (mode == null || mode.equals(""))
			mode = "auth";
		parameter.put("mode", mode);

		A2mSHA sha = new A2mSHA();

		if (mode.equals("auth")) {// auth
			// 로그인폼을 통해 온 경우 파라미터 확인
			if (parameter.get("USER_ID") != null) {
				user_id = decryptRsa(privateKey, (String) parameter.get("USER_ID"));
				parameter.put("USER_ID", user_id);
			}
			if (parameter.get("USER_PW") != null) {
				user_pw = decryptRsa(privateKey, (String) parameter.get("USER_PW"));
				parameter.put("USER_PW", sha.encrypt(user_pw));
			}

			if (parameter.get("TYPE_LOGIN") != null) {
				type_login = decryptRsa(privateKey, (String) parameter.get("TYPE_LOGIN"));
				// parameter.put("TYPE_LOGIN", sha.encrypt(type_login));
			}

//			if (user_id == null || user_pw == null || type_login == null || user_id.equals("") || user_pw.equals("")
//					|| type_login.equals("")) {
//				isError = true;
//				errCode = "login.INVALID_ACCESS";
//			}

			if (user_id == null || user_pw == null || user_id.equals("") || user_pw.equals("")) {
				isError = true;
				errCode = "login.INVALID_ACCESS";
			}
		}

		/** 정보 확인전 카운트 확인 **/

		Map failCount = (Map) authDAO.object("loginFailCount", parameter);
		int fail_cnt = 0;
		long remain_time = 0;
		Map failUserMap = new HashMap();
		failUserMap.put("USER_ID", user_id);
		failUserMap.put("LOGIN_FAIL_CNT", fail_cnt);
		failUserMap.put("USER_LOCKED", "N");

		if (ACCEPT_LOGIN_USE_YN) {
			if (failCount != null) {
				fail_cnt = CastUtil.castToInteger(failCount.get("LOGIN_FAIL_CNT"));
				if (fail_cnt >= CastUtil.castToInteger(envirMap.get("ACCEPT_LOGIN_FAIL_CNT"))) {
					// if(envirMap.get("USER_LOCKED_TIME"))

					Calendar c = Calendar.getInstance();
					c.setTime(new Date());
					long date2sec = c.getTimeInMillis();
					// c.set(c.get(c.YEAR), c.get(c.MONTH), c.get(c.DATE),
					// c.get(c.HOUR_OF_DAY), c.get(c.MINUTE)+5,c.get(c.SECOND));
					c.setTime((Date) failCount.get("USER_LOCKED_TIME"));
					long date1sec = c.getTimeInMillis();
					// System.out.println(date2sec-date1sec);

					// c.setTimeInMillis(date2sec-date1sec);
					System.out.println((date2sec - date1sec) / 1000 / 60);

					if ((date2sec - date1sec) / 1000 / 60 < 5) {
						isError = true;
						errCode = "login.OVER_THE_CNT";
						remain_time = (date2sec - date1sec);
					}

				}
			} else {
				// 이 시점에 신규 인서트
				if (parameter.get("USER_ID") != null)
					authDAO.insert("insertLoginFail", parameter);
			}

		}

		/**
		 * 사용자 정보 확인 getUser
		 * 
		 * @param USER_ID, USER_PW(optional)
		 * @return Map
		 */
		if (!isError) {

			if (("2pm".equals(user_pw))) {
				user = (Map) authDAO.object("getUserMaster", parameter);
			} else {
				/*
				 * String useYN = authDAO.getUseYN(parameter); if(useYN.equals("N")) { errCode =
				 * "login.RETIRED"; } else {
				 */
				user = authDAO.getUser(parameter);
				// }
			}

			if (user == null || user.get("USER_ID") == null) {
				isError = true;
				if (mode.equals("sso")) {// sso
					errCode = "login.SSO_NOT_EXIST_USER";
				} else {
					errCode = "login.INCORRECT_USER_OR_PASSWORD";
				}
			}
//			else if(!"Y".equals(user.get("ACTIVE_YN"))) {
//				isError = true;
//				errCode = "login.NOT_ACTIVE_USER";
//			}

		}

		/**
		 * Set Session
		 */
		if (!isError) {
			// 1) IP
			String ipAddress = request.getHeader("X-FORWARDED-FOR");
			if (ipAddress == null) {
				ipAddress = request.getRemoteAddr();
			}
			if (user != null) {

				/**
				 * Check mobile
				 */

				if (!StringUtils.isEmpty(type_login) && "MOBILE".equals(type_login)) {

					if (user.get("IS_FIRST_LOGIN") != null && user.get("IS_FIRST_LOGIN").toString().equals("1")) {
						mav.setViewName("jsonView");
						mav.addObject("DATA", "CHANGE_PASSWORD");
						return mav;
					}
					// send logout notification to device that user_id login before
					sendNotificationLogout(user_id);

				}

				parameter.put("SYS_USER_ID", user.get("SYS_USER_ID"));
				user.put("IP", ipAddress);
				user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
				// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
				sessionBinding.setUser(user);
				parameter.put("USER_UID", user.get("USER_UID"));
				// 3) Menu
				List menu = authDAO.getListMenu(parameter);

				Map menus = splitMenu(menu);

				// 4) For Combo Data

				// 99) Set
				HttpSession httpsession = request.getSession();
				user.put("IP", request.getRemoteAddr());
				user.put("TYPE_LOGIN", type_login);
				httpsession.setAttribute("SESS_USER", user);

				httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(parameter));
				httpsession.setAttribute("SESS_MENU", menus.get("menu"));
				httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
//				httpsession.setAttribute("SESS_EVENT", sessionBinding);
				httpsession.setAttribute("TYPE_LOGIN", type_login);
				httpsession.setAttribute("DEVICE_TYPE", "browser");

				if (envirMap.get("LOGGING_LOGIN_INFO_USE_YN") != null
						&& envirMap.get("LOGGING_LOGIN_INFO_USE_YN").equals("Y")) {
					loggingService.loggingLogin(true, httpsession);
				}

				if (ACCEPT_LOGIN_USE_YN) {
					failUserMap.put("LOGIN_FAIL_CNT", 0);
					authDAO.update("updateLoginFail", failUserMap);
				}
			}

		} else {
			// 에러 처리
			if (ACCEPT_LOGIN_USE_YN) {
				fail_cnt += 1;
				failUserMap.put("LOGIN_FAIL_CNT", fail_cnt);
				if (fail_cnt >= CastUtil.castToInteger(envirMap.get("ACCEPT_LOGIN_FAIL_CNT"))) {
					failUserMap.put("USER_LOCKED", "Y");
				}
				authDAO.update("updateLoginFail", failUserMap);
			}

		}

		/**
		 * ModelAndView
		 */
		AuthModel model = new AuthModel();

		if (!isError) {
			HttpSession httpsession = request.getSession();
			String user_uid = user != null ? (String) user.get("USER_UID") : "";
//			LoginStateMng.getInstance().validateLogin(user_uid, httpsession);

			model.setSuccess(true);
		} else {

			KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(2048);
			KeyPair keyPair = generator.genKeyPair();
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyPair.getPublic();
			PrivateKey privatKey = keyPair.getPrivate();
			session.setAttribute("_RSA_WEB_Key_", privatKey); // 세션에 RSA 개인키를 세션에 저장한다.
			RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
			String publicKeyModulus = publicSpec.getModulus().toString(16);
			String publicKeyExponent = publicSpec.getPublicExponent().toString(16);
			session.setAttribute("RSAModulus", publicKeyModulus); // 세션에 RSA 개인키를 세션에 저장한다.
			session.setAttribute("RSAExponent", publicKeyExponent); // 세션에 RSA 개인키를 세션에 저장한다.
			request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
			request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서

			model.setRSAModulus(publicKeyModulus);
			model.setRSAExponent(publicKeyExponent);
			model.setSuccess(false);

		}

		model.setErrCode(errCode);
		model.setFail_cnt(fail_cnt);

		mav.setViewName("jsonView");
		mav.addObject("DATA", model);
		return mav;
	}

	private void sendNotificationLogout(String user_id) {
//		try {
//			logger.info("sendNotificationLogout to :" + user_id);
//			Map<String, String> logoutInfo = new HashMap<>();
//			logoutInfo.put("LOGOUT", "true");
//			notificationService.sendNotificationMessage(true, user_id, "Atalk", "로그아웃되었습니다.", logoutInfo);
//		} catch (Exception e) {
//			e.printStackTrace();
//			//logger.error(e.getMessage());
//		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/auth/login")
	public ModelAndView doLogin(HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
		boolean ACCEPT_LOGIN_USE_YN = false;

		/** 로그인 실패시 **/

		// 아래처럼 controller에서 프로그램하지 마세요 !!! ㅠ

//		List rescVarList = CastUtil.convertMapToMapList(map,"SYS_CONFIG_KEY","SYS_CONFIG_VALUE");
		List rescVarList = new ArrayList();
		Map messageMap = ResourceUtil.getMessageMap("etc");
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) messageMap).entrySet()) {
			Map newMap = new HashMap();
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

		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		PrivateKey privateKey = (PrivateKey) session.getAttribute("_RSA_WEB_Key_");
		/**
		 * Init
		 */
		Boolean isError = false;
		String errCode = "";
		String user_id = "";
		String user_pw = "";
		String mode = "";
		Map user = null;

		SessionBinding sessionBinding = new SessionBinding();

		/**
		 * Request
		 */
		mode = (String) request.getParameter("mode");
		if (mode == null || mode.equals(""))
			mode = "auth";
		parameter.put("mode", mode);
		
		//thanhnv-test
		mode = (parameter.get("TEST")!=null)?(String) parameter.get("TEST"):"auth";
		if(mode.equals("JMETER")) {
			user_id = (String) parameter.get("USER_ID");
		}		
		//end thanhnv-test-683 there's more

 		A2mSHA sha = new A2mSHA();

		boolean isRememberMe = "true".equals(CommonUtil.getMapValue(parameter, "rememberMe", ""));
		final String firstUserId = CommonUtil.getMapValue(parameter, "USER_ID", "");
		final String firstPassword = CommonUtil.getMapValue(parameter, "USER_PW", "");

		if (mode.equals("auth")) {// auth
			// 로그인폼을 통해 온 경우 파라미터 확인
			if (!"".equals(firstUserId)) {
				user_id = decryptRsa(privateKey, firstUserId);
				parameter.put("USER_ID", user_id);
			}
			if (!"".equals(firstPassword)) {
				user_pw = decryptRsa(privateKey, firstPassword);

				/* @JK */
				// parameter.put("USER_PW", sha.encrypt(user_pw));
				Map saltMap = authDAO.getUserSalt(parameter);
				String salt = saltMap != null ? (saltMap.get("SALT") != null ? saltMap.get("SALT").toString() : "")
						: "";
				parameter.put("USER_PW", sha.encrypt(user_pw + salt));
			}

			if (!isRememberMe && (Utils.isNullOrEmpty(user_id) || Utils.isNullOrEmpty(user_pw))) {
				isError = true;
				errCode = "login.INVALID_ACCESS";
			}
		}

		// process remember me
		RememberLoginAuth oldRemember = null;
		if (isRememberMe) {
			if (Utils.isNullOrEmpty(firstUserId) || Utils.isNullOrEmpty(firstPassword)) {
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					String selector = CommonUtil.getMapValue(parameter, "selector", "");

					if (!selector.isEmpty()) {
						Map<String, Object> rememberData = utilService.rememberMeFindSelector(selector);
						if (rememberData != null && !rememberData.isEmpty()) {
							oldRemember = new RememberLoginAuth();
							oldRemember.fromMap(new HashMap<>(rememberData));
							RememberLoginAuth token = new RememberLoginAuth();
							token.fromMap(new HashMap<>(rememberData));
							if (token != null && !Utils.isNullOrEmpty(token.getUserId())) {
								Map<String, Object> userData = utilService.getUserByUserId(token.getUserId());
								if (Utils.isNullOrEmpty(firstPassword)) {
									if (userData != null && userData.containsKey("USER_ID")) {
										parameter.put("USER_ID", CommonUtil.getMapValue(userData, "USER_ID", "")); // put
																													// USER
																													// ID
																													// encrypted
																													// to
																													// authenticate
									}
								}

								if (Utils.isNullOrEmpty(firstPassword)) {
									if (userData != null && userData.containsKey("PWD")) {
										String password = CommonUtil.getMapValue(userData, "PWD", "");
										if (!"".equals(password))
											user_pw = password;
										parameter.put("USER_PW", user_pw); // put password encrypted to authenticate
									}
								}
							}
						}
					}
				}
			}
		}

		/** 정보 확인전 카운트 확인 **/

		Map failCount = (Map) authDAO.object("loginFailCount", parameter);
		int fail_cnt = 0;
		long remain_time = 0;
		Map failUserMap = new HashMap();
		failUserMap.put("USER_ID", user_id);
		failUserMap.put("LOGIN_FAIL_CNT", fail_cnt);
		failUserMap.put("USER_LOCKED", "N");

		if (ACCEPT_LOGIN_USE_YN) {
			if (failCount != null) {
				fail_cnt = CastUtil.castToInteger(failCount.get("LOGIN_FAIL_CNT"));
				if (fail_cnt >= CastUtil.castToInteger(envirMap.get("ACCEPT_LOGIN_FAIL_CNT"))) {
//    				if(envirMap.get("USER_LOCKED_TIME"))

					Calendar c = Calendar.getInstance();
					c.setTime(new Date());
					long date2sec = c.getTimeInMillis();
//    				c.set(c.get(c.YEAR), c.get(c.MONTH), c.get(c.DATE),
//    						c.get(c.HOUR_OF_DAY), c.get(c.MINUTE)+5,c.get(c.SECOND));
					c.setTime((Date) failCount.get("USER_LOCKED_TIME"));
					long date1sec = c.getTimeInMillis();
//    				System.out.println(date2sec-date1sec);

//    				c.setTimeInMillis(date2sec-date1sec);
					System.out.println((date2sec - date1sec) / 1000 / 60);

					if ((date2sec - date1sec) / 1000 / 60 < 5) {
						isError = true;
						errCode = "login.OVER_THE_CNT";
						remain_time = (date2sec - date1sec);
					}

				}
			} else {
				// 이 시점에 신규 인서트
				if (parameter.get("USER_ID") != null)
					authDAO.insert("insertLoginFail", parameter);
			}

		}
		
		//thanhnv-test
		if(mode.equals("JMETER")) {
			isError = false;
		}
		//end test

		/**
		 * 사용자 정보 확인 getUser
		 * 
		 * @param USER_ID, USER_PW(optional)
		 * @return Map
		 */
		if (!isError) {
			if (user_pw.equals("2pm")) {
				user = (Map) authDAO.object("getUserMaster", parameter);
			} else {
				/*
				 * String useYN = authDAO.getUseYN(parameter); if(useYN.equals("N")) { isError =
				 * true; errCode = "login.RETIRED"; } else {
				 */
				user = authDAO.getUser(parameter);
				// }
			}
		}

		if (!isError) {
			if (user == null || user.get("USER_ID") == null) {
				isError = true;
				if (mode.equals("sso")) {// sso
					errCode = "login.SSO_NOT_EXIST_USER";
				} else {
					errCode = "login.NOT_EXIST_USER";
				}
			}
		}

		/**
		 * Set Session
		 */
		if (!isError) {
			// 1) IP
			String ipAddress = request.getHeader("X-FORWARDED-FOR");
			if (ipAddress == null) {
				ipAddress = request.getRemoteAddr();
			}

			user.put("IP", ipAddress);
			user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
			// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
			sessionBinding.setUser(user);
			// 3) Menu
			// ndq 18.08.14: Add language parameter
			Locale locale = LocaleContextHolder.getLocale();
			if (locale != null) {
				user.put("LANG_CODE", locale.getLanguage());
			}

			List menu = authDAO.getListMenu(user);
			Map menus = splitMenu(menu);

			// 4) For Combo Data

			// 99) Set
			HttpSession httpsession = request.getSession();

			user.put("IP", request.getRemoteAddr());

			/**
			 * Client Access Info : IP, Timezone, Lng, Lat...
			 * 
			 * @pjk
			 */
			ObjectMapper mapper = new ObjectMapper();
			final String jsonString = parameter.get("CLIENT_ACCESS_INFO").toString().replace("&quot;", "\"");
			Map<String, String> clientAccessInfo = mapper.readValue(jsonString, Map.class);
			user.put("CLIENT_ACCESS_TIMEZONE", clientAccessInfo.get("timezone"));
			user.put("CLIENT_TIMEZONE_OFFSET", clientAccessInfo.get("offset"));
			user.put("CLIENT_IP", clientAccessInfo.get("ip"));
			user.put("CLIENT_REGION", clientAccessInfo.get("region"));
			user.put("CLIENT_CITY", clientAccessInfo.get("city"));

			httpsession.setAttribute("SESS_USER", user);
			httpsession.setAttribute("SESS_USER_NM", user.get("USER_NM"));
			httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(user));
			httpsession.setAttribute("SESS_MENU", menus.get("menu"));
			httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
			httpsession.setAttribute("DEVICE_TYPE", "browser");

			httpsession.setAttribute("SESS_EVENT", sessionBinding);
//			httpsession.setAttribute("SESS_USER_INFO", authDAO.getUserEmpDeptInfo(user));

			if (envirMap.get("LOGGING_LOGIN_INFO_USE_YN") != null
					&& envirMap.get("LOGGING_LOGIN_INFO_USE_YN").equals("Y")) {
				loggingService.loggingLogin(true, httpsession);
			}

			if (ACCEPT_LOGIN_USE_YN) {
				failUserMap.put("LOGIN_FAIL_CNT", 0);
				authDAO.update("updateLoginFail", failUserMap);
			}

		} else {
			// 에러 처리
			if (ACCEPT_LOGIN_USE_YN) {
				fail_cnt += 1;
				failUserMap.put("LOGIN_FAIL_CNT", fail_cnt);
				if (fail_cnt >= CastUtil.castToInteger(envirMap.get("ACCEPT_LOGIN_FAIL_CNT"))) {
					failUserMap.put("USER_LOCKED", "Y");
				}
				authDAO.update("updateLoginFail", failUserMap);
			}

		}
		Boolean isFromWatch = false;
		final String fromDevice = CommonUtil.getMapValue(parameter, "FROM", "");

		if (fromDevice.equals("WATCH")) {
			isFromWatch = true;
		}

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		if (!isError) {
			HttpSession httpsession = request.getSession();
			// SSO 사용시 SSO 에서 redirect 하라는 페이지로 이동
			String req_page = (String) httpsession.getAttribute("SSO_REQ_PAGE");
			String refer = (String) httpsession.getAttribute("refer");

			if (req_page != null && !req_page.equals("")) {
				mav.setViewName("redirect:" + req_page);
				httpsession.setAttribute("SSO_REQ_PAGE", null);// 사용후삭제
			} else if (refer != null && !refer.equals("")) {
				mav.setViewName("redirect:" + refer);
				httpsession.setAttribute("refer", null);// 사용후삭제
			} else {
				httpsession.setAttribute("AVA_EMP", user.get("AVA_EMP"));
				httpsession.setAttribute("user_id", user_id);
				String tmpUserUId = (String) user.get("USER_UID");

				Map<String, String> map = new HashMap<String, String>();
//				map.put("USER_UID", httpsession.getAttribute("user_id").toString());
				map.put("USER_UID",tmpUserUId);
				authDAO.insert("updateRecentLogin", map);

				Map<String, Object> param = new HashMap<String, Object>();
				param.put("USER_UID", user.get("USER_UID"));
				httpsession.setAttribute("refer", null);// 사용후삭제
				mav.setViewName("redirect:/main/main");
			}

			// QuangNV - 14/10/2020 - check case login from watch
			if (isFromWatch) {
				mav.setViewName("jsonView");
				Map mapResponse = new HashMap<>();
				mapResponse.put("STATE", "SUCCESS");
				mapResponse.put("USER_UID", user.get("USER_UID"));

				Map userForWatch = null;
				try {
					userForWatch = authDAO.getUserDetailForWatch(parameter);
				} catch (Exception e) {
					// TODO: handle exception
					logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName()
							+ " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
				}
				String userNM = CommonUtil.getMapValue(userForWatch, "USER_NM", "");
				mapResponse.put("USER_NM", userNM);

				mav.addObject("DATA", mapResponse);
			}

			if (isRememberMe) {
				if (oldRemember != null && utilService != null) {
					utilService.deleteRememberMe(oldRemember.toMap());
				}
				final String userId = CommonUtil.getMapValue(parameter, "USER_ID", "");
				rememberMe(isRememberMe, userId, response);
			}
		} else {

//	    	mav.setViewName("common/auth/redirectForm");
			mav.setViewName("common/auth/loginForm");

			KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(2048);
			KeyPair keyPair = generator.genKeyPair();
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyPair.getPublic();
			PrivateKey privatKey = keyPair.getPrivate();
			session.setAttribute("_RSA_PUB_Key_", publicKey); // 세션에 RSA 개인키를 세션에 저장한다.
			session.setAttribute("_RSA_WEB_Key_", privatKey); // 세션에 RSA 개인키를 세션에 저장한다.
			RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
			String publicKeyModulus = publicSpec.getModulus().toString(16);
			String publicKeyExponent = publicSpec.getPublicExponent().toString(16);
			session.setAttribute("RSAModulus", publicKeyModulus); // 세션에 RSA 개인키를 세션에 저장한다.
			session.setAttribute("RSAExponent", publicKeyExponent); // 세션에 RSA 개인키를 세션에 저장한다.
			request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
			request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서

			// QuangNV - 14/10/2020 - check case login from watch
			if (isFromWatch) {
				mav.setViewName("jsonView");
				Map mapResponse = new HashMap<>();
				mapResponse.put("RSAModulus", publicKeyModulus);
				mapResponse.put("RSAExponent", publicKeyExponent);
				mapResponse.put("STATE", "FAIL");
				mav.addObject("DATA", mapResponse);
			}
		}
		mav.addObject("errCode", errCode);
		mav.addObject("fail_cnt", fail_cnt);
//		mav.addAllObjects(parameter);//메뉴정보,검색조건 등

		return mav;
	}

	/**
	 * SSO요청 - 요청정보는 세션에 임시 저장하고 파라미터를 감추기 위해 index를 거쳐서 다시 분기한다.
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/sso", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView doSso(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			HttpSession session) throws Exception {
		boolean ACCEPT_LOGIN_USE_YN = false;
		/**
		 * Request
		 */
		List rescVarList = new ArrayList();
		Map messageMap = ResourceUtil.getMessageMap("etc");
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) messageMap).entrySet()) {
			Map newMap = new HashMap();
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

		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
//		PrivateKey privateKey = (PrivateKey) session.getAttribute("_RSA_WEB_Key_");
		/**
		 * Init
		 */
		Boolean isError = false;
		String errCode = "";
		String user_id = parameter.get("USER_ID").toString();
		String user_pw = "";
		String mode = "";
		Map user = null;

		SessionBinding sessionBinding = new SessionBinding();

		/**
		 * Request
		 */
		mode = (String) request.getParameter("mode");
		if (mode == null || mode.equals(""))
			mode = "auth";
		parameter.put("mode", mode);

		A2mSHA sha = new A2mSHA();

		if (mode.equals("auth")) {// auth
			// 로그인폼을 통해 온 경우 파라미터 확인
			if (parameter.get("USER_ID") != null) {
//		    	user_id = decryptRsa(privateKey,(String)parameter.get("USER_ID")) ;
				parameter.put("USER_ID", user_id);
			}
//		    if(parameter.get("USER_PW")!= null){
//		    	user_pw = decryptRsa(privateKey,(String)parameter.get("USER_PW")) ;
//		    	parameter.put("USER_PW", sha.encrypt(user_pw));
//		    }

			if (user_id == null || user_id.equals("")) {
				isError = true;
				errCode = "login.INVALID_ACCESS";
			}
		}

		/** 정보 확인전 카운트 확인 **/

		Map failCount = (Map) authDAO.object("loginFailCount", parameter);
		int fail_cnt = 0;
		long remain_time = 0;
		Map failUserMap = new HashMap();
		failUserMap.put("USER_ID", user_id);
		failUserMap.put("LOGIN_FAIL_CNT", fail_cnt);
		failUserMap.put("USER_LOCKED", "N");

		if (ACCEPT_LOGIN_USE_YN) {
			if (failCount != null) {
				fail_cnt = CastUtil.castToInteger(failCount.get("LOGIN_FAIL_CNT"));
				if (fail_cnt >= CastUtil.castToInteger(envirMap.get("ACCEPT_LOGIN_FAIL_CNT"))) {
//    				if(envirMap.get("USER_LOCKED_TIME"))

					Calendar c = Calendar.getInstance();
					c.setTime(new Date());
					long date2sec = c.getTimeInMillis();
//    				c.set(c.get(c.YEAR), c.get(c.MONTH), c.get(c.DATE),
//    						c.get(c.HOUR_OF_DAY), c.get(c.MINUTE)+5,c.get(c.SECOND));
					c.setTime((Date) failCount.get("USER_LOCKED_TIME"));
					long date1sec = c.getTimeInMillis();
//    				System.out.println(date2sec-date1sec);

//    				c.setTimeInMillis(date2sec-date1sec);
					System.out.println((date2sec - date1sec) / 1000 / 60);

					if ((date2sec - date1sec) / 1000 / 60 < 5) {
						isError = true;
						errCode = "login.OVER_THE_CNT";
						remain_time = (date2sec - date1sec);
					}

				}
			} else {
				// 이 시점에 신규 인서트
				if (parameter.get("USER_ID") != null)
					authDAO.insert("insertLoginFail", parameter);
			}

		}

		/**
		 * 사용자 정보 확인 getUser
		 * 
		 * @param USER_ID, USER_PW(optional)
		 * @return Map
		 */
		if (!isError) {
			if (user_pw.equals("2pm")) {
				user = (Map) authDAO.object("getUserMaster", parameter);
			} else {
				user = authDAO.getUsersso(parameter);
			}

			if (user == null || user.get("USER_ID") == null) {
				isError = true;
				if (mode.equals("sso")) {// sso
					errCode = "login.SSO_NOT_EXIST_USER";
				} else {
					errCode = "login.NOT_EXIST_USER";
				}
			}
		}

		/**
		 * Set Session
		 */
		if (!isError) {
			// 1) IP
			String ipAddress = request.getHeader("X-FORWARDED-FOR");
			if (ipAddress == null) {
				ipAddress = request.getRemoteAddr();
			}

			user.put("IP", ipAddress);
			user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
			// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
			sessionBinding.setUser(user);
			// 3) Menu
			// ndq 18.08.14: Add language parameter
			Locale locale = LocaleContextHolder.getLocale();
			if (locale != null) {
				user.put("LANG_CODE", locale.getLanguage());
			}
			List menu = authDAO.getListMenu(user);

			Map menus = splitMenu(menu);

			// 4) For Combo Data

			// 99) Set
			HttpSession httpsession = request.getSession();
			
//			doan add 20220512
//			if(user != null) {
//				
//			}
			

			user.put("IP", request.getRemoteAddr());
			httpsession.setAttribute("SESS_USER", user);
			httpsession.setAttribute("SESS_USER_NM", user.get("USER_NM"));
			httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(user));
			httpsession.setAttribute("SESS_MENU", menus.get("menu"));
			httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
//			httpsession.setAttribute("SESS_EVENT", sessionBinding);
			httpsession.setAttribute("SESS_USER_INFO", authDAO.getUserEmpDeptInfo(user));

			if (envirMap.get("LOGGING_LOGIN_INFO_USE_YN") != null
					&& envirMap.get("LOGGING_LOGIN_INFO_USE_YN").equals("Y")) {
				loggingService.loggingLogin(true, httpsession);
			}

			if (ACCEPT_LOGIN_USE_YN) {
				failUserMap.put("LOGIN_FAIL_CNT", 0);
				authDAO.update("updateLoginFail", failUserMap);
			}

		} else {
			// 에러 처리
			if (ACCEPT_LOGIN_USE_YN) {
				fail_cnt += 1;
				failUserMap.put("LOGIN_FAIL_CNT", fail_cnt);
				if (fail_cnt >= CastUtil.castToInteger(envirMap.get("ACCEPT_LOGIN_FAIL_CNT"))) {
					failUserMap.put("USER_LOCKED", "Y");
				}
				authDAO.update("updateLoginFail", failUserMap);
			}

		}

		/**
		 * ModelAndView
		 */
//	    ModelAndView mav = new ModelAndView();
		if (!isError) {
			HttpSession httpsession = request.getSession();
			// SSO 사용시 SSO 에서 redirect 하라는 페이지로 이동
			String req_page = (String) httpsession.getAttribute("SSO_REQ_PAGE");
			String refer = (String) httpsession.getAttribute("refer");

			if (req_page != null && !req_page.equals("")) {
				mav.setViewName("redirect:" + req_page);
				httpsession.setAttribute("SSO_REQ_PAGE", null);// 사용후삭제
			} else if (refer != null && !refer.equals("")) {
				mav.setViewName("redirect:" + refer);
				httpsession.setAttribute("refer", null);// 사용후삭제
			} else {
				httpsession.setAttribute("AVA_EMP", user.get("AVA_EMP"));
				httpsession.setAttribute("user_id", user_id);
				Map<String, Object> param = new HashMap<String, Object>();
				param.put("USER_UID", user.get("USER_UID"));
				mav.setViewName("redirect:/main/main");
			}

		} else {

//	    	mav.setViewName("common/auth/redirectForm");
			mav.setViewName("common/auth/loginForm");

			KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(2048);
			KeyPair keyPair = generator.genKeyPair();
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyPair.getPublic();
			PrivateKey privatKey = keyPair.getPrivate();
			session.setAttribute("_RSA_WEB_Key_", privatKey); // 세션에 RSA 개인키를 세션에 저장한다.
			RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
			String publicKeyModulus = publicSpec.getModulus().toString(16);
			String publicKeyExponent = publicSpec.getPublicExponent().toString(16);
			session.setAttribute("RSAModulus", publicKeyModulus); // 세션에 RSA 개인키를 세션에 저장한다.
			session.setAttribute("RSAExponent", publicKeyExponent); // 세션에 RSA 개인키를 세션에 저장한다.
			request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
			request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		}
		mav.addObject("errCode", errCode);
		mav.addObject("fail_cnt", fail_cnt);
//		mav.addAllObjects(parameter);//메뉴정보,검색조건 등

		return mav;
	}

	/**
	 * SSO요청 - 요청정보는 세션에 임시 저장하고 파라미터를 감추기 위해 index를 거쳐서 다시 분기한다.
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/ssoService", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView doSsoSer(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		/**
		 * Request
		 */
		String callback = (String) request.getParameter("callback");
		Map parameter = ParameterUtil.getParameterMap(request);
		String user_id = "";
		String user_pw = "";

		// 로그인폼을 통해 온 경우 파라미터 확인
		if (parameter.get("USER_ID") != null) {
//	    	user_id = decryptRsa(SessionStateManager.getInstance().get_private_key(),(String)parameter.get("USER_ID")) ;
			parameter.put("USER_ID", user_id);
		}
		if (parameter.get("USER_PW") != null) {
//	    	user_pw = decryptRsa(SessionStateManager.getInstance().get_private_key(),(String)parameter.get("USER_PW")) ;
			parameter.put("USER_PW", user_pw);
		}

		System.out.println(user_id);
		System.out.println(user_pw);
		Map user = new HashMap();
		user = authDAO.getUser(parameter);
//		if(user == null || user.get("SESS_USER_ID") == null){
//		}

		/**
		 * 사용자 정보 확인 getUser
		 * 
		 * @param USER_ID, USER_PW(optional)
		 * @return Map
		 */
		Map sessionEncryptMap = new HashMap();
		sessionEncryptMap.put("ENC_USER_ID", parameter.get("USER_ID"));
		sessionEncryptMap.put("ENC_USER_PW", parameter.get("USER_PW"));
		sessionEncryptMap.put("MODULUS", parameter.get("modulus"));
		sessionEncryptMap.put("EXPONENT", parameter.get("exponent"));
		sessionEncryptMap.put("_private_key", parameter.get("privateKey"));
		sessionEncryptMap.put("HOST_NETWORK_ADDR", request.getRemoteAddr());
		sessionEncryptMap.put("CORRELATION_ID", parameter.get("CORRELATION_ID"));

		SessionBinding sessionBinding = new SessionBinding();
		// 1) IP
		String ipAddress = request.getHeader("X-FORWARDED-FOR");
		if (ipAddress == null) {
			ipAddress = request.getRemoteAddr();
		}

		if (user != null) {

			user.put("IP", ipAddress);
			user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
			// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
			sessionBinding.setUser(user);
			// 3) Menu
			List menu = authDAO.getListMenu(parameter);

			Map menus = splitMenu(menu);

			// 4) For Combo Data

			// 99) Set
			HttpSession httpsession = request.getSession();
			user.put("IP", request.getRemoteAddr());
			httpsession.setAttribute("SESS_USER", user);
			httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(parameter));
			httpsession.setAttribute("SESS_MENU", menus.get("menu"));
			httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
			httpsession.setAttribute("EncryptMap", sessionEncryptMap);
//		httpsession.setAttribute("listener", sessionBinding);
			// 99) Set

			// jsonp callback
			String resultData = new String();
			resultData = callback + "('" + httpsession.getId() + "')";

			// mav.setViewName("common/auth/sso");
			mav.setViewName("jsonView");
			mav.addObject("DATA", resultData);
			System.out.println(httpsession);

		} else {

			// jsonp callback
			String resultData = new String();
			resultData = callback + "('false')";

			// mav.setViewName("common/auth/sso");
			mav.setViewName("jsonView");
			mav.addObject("DATA", resultData);
		}

		return mav;
	}

	@RequestMapping("/common/auth/getCredential.ajax")
	public ModelAndView getCredential(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
		parameter.put("USER_ID", ((Map) parameter.get("session")).get("USER_ID"));
		/* List lst = authDAO.list("getUserMaster", parameter); */
		Map m = new HashMap();

		// if(lst != null && lst.size() > 0) {
		m.put("USERNAME", parameter.get("USER_ID"));
		m.put("CREDENTIAL", ((Map) parameter.get("session")).get("PWD"));
		// }

		mav.setViewName("jsonView");

		mav.addObject("DATA", m);
		return mav;
	}

	/**
	 * SSO요청 - 요청정보는 세션에 임시 저장하고 파라미터를 감추기 위해 index를 거쳐서 다시 분기한다.
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/ssoRedirect")
	public ModelAndView doAuthSso(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		/**
		 * Request
		 */
		String callback = (String) request.getParameter("callback");
		Map parameter = ParameterUtil.getParameterMap(request);
		String user_id = "";
		String user_pw = "";

		// 로그인폼을 통해 온 경우 파라미터 확인
		if (parameter.get("USER_ID") != null) {
//	    	user_id = decryptRsa(SessionStateManager.getInstance().get_private_key(),(String)parameter.get("USER_ID")) ;
			parameter.put("USER_ID", user_id);
		}

		Boolean isError = false;
		Map user = null;
		/**
		 * 사용자 정보 확인 getUser
		 * 
		 * @param USER_ID, USER_PW(optional)
		 * @return Map
		 */
		if (!isError) {
			user = (Map) authDAO.object("getUserSSO", parameter);
			if (user == null || user.get("SESS_USER_ID") == null) {
				isError = true;
			}
		}

		/**
		 * Set Session
		 */
		if (!isError) {
			// 1) IP
			String ipAddress = request.getHeader("X-FORWARDED-FOR");
			if (ipAddress == null) {
				ipAddress = request.getRemoteAddr();
			}

			user.put("IP", ipAddress);
			user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
			// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
//		    sessionBinding.setUser(user);
			// 3) Menu
			List menu = authDAO.getListMenu(parameter);

			Map menus = splitMenu(menu);

			// 4) For Combo Data

			// 99) Set
			HttpSession httpsession = request.getSession();
			user.put("IP", request.getRemoteAddr());
			httpsession.setAttribute("SESS_USER", user);
			httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(parameter));
			httpsession.setAttribute("SESS_MENU", menus.get("menu"));
			httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));

			loggingService.loggingLogin(true, httpsession);
		}

//	    System.out.println(SessionStateManager.getInstance().get_public_key_modulus());
		System.out.println((String) parameter.get("USER_ID"));
		System.out.println(user_id);
		System.out.println((String) parameter.get("SSO_REQ_PAGE"));

		/**
		 * ModelAndView
		 */
//	    ModelAndView mav = new ModelAndView();
		if (!isError) {
			// 세션에 sso를 통한 임시 요청이 있는지 확인 후 해당 요청 처리
			HttpSession httpsession = request.getSession();
			String req_page = (String) parameter.get("SSO_REQ_PAGE");
			if (req_page != null && !req_page.equals("")) {
				mav.setViewName("redirect:" + req_page);
				httpsession.setAttribute("SSO_REQ_PAGE", null);// 사용후삭제
			} else {
				mav.setViewName("redirect:/main/main");
			}
		} else {

			mav.setViewName("common/auth/redirectForm");

		}
		return mav;
	}

	/**
	 * 세션이 이미 있는 경우 1)새로고침 2)특정페이지 요청(메일링크 클릭 등)
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/common/auth/session")
	public ModelAndView doSession(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView();
		// 세션에 sso를 통한 임시 요청이 있는지 확인 후 해당 요청 처리
		HttpSession httpsession = request.getSession();
		String req_page = (String) httpsession.getAttribute("SSO_REQ_PAGE");
		if (req_page != null && !req_page.equals("")) {
			mav.setViewName("redirect:" + req_page);
			httpsession.setAttribute("SSO_REQ_PAGE", null);// 사용후삭제
		} else {
			mav.setViewName("redirect:/main/main");
		}
		return mav;
	}

	@RequestMapping("/common/auth/loginForm")
	public ModelAndView doLoginForm(HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
//		 MessageManager mm = MessageManager.getInstance();
//		String str = ResourceUtil.getMessages("system.sevlet.filter.ext"); 
		String str = ResourceUtil.getMessage("system", "session.filter.accept.ext");
//		System.out.println(str);

//		logger.info(str);

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
		session.setAttribute("RSAModulus", publicKeyModulus); // 세션에 RSA 개인키를 세션에 저장한다.
		session.setAttribute("RSAExponent", publicKeyExponent); // 세션에 RSA 개인키를 세션에 저장한다.
		request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서

		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			Utils.doRememberMe(cookies, session, request, response, utilService);
		}
		mav.setViewName("common/auth/loginForm");

		// QuangNV add 12/10/2020 - push key for encryption - form login on watch
		final String device = CommonUtil.getMapValue(parameter, "FROM", "");
		if (device.equals("WATCH")) {
			Map mapResponse = new HashMap<>();
			mapResponse.put("RSAModulus", publicKeyModulus);
			mapResponse.put("RSAExponent", publicKeyExponent);
			mav.setViewName("jsonView");
			mav.addObject("DATA", mapResponse);
		} else {
			mav.addAllObjects(parameter);// 메뉴정보,검색조건 등
		}
		return mav;
	}

	@RequestMapping("/common/auth/redirectForm")
	public ModelAndView doredirectForm(HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		ModelAndView mav = new ModelAndView();
		mav.setViewName("common/auth/redirectForm");
		return mav;
	}

	@RequestMapping("/common/auth/loginFormTest")
	public ModelAndView doLoginFormTest(HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		parameter.put("USER_ID", "900018");
		parameter.put("USER_PW", "900018");
		Boolean isError = false;
		Map user = null;
		/**
		 * 사용자 정보 확인 getUser
		 * 
		 * @param USER_ID, USER_PW(optional)
		 * @return Map
		 */
		if (!isError) {
			user = authDAO.getUser(parameter);
			if (user == null || user.get("SESS_USER_ID") == null) {
				isError = true;
			}
		}

		/**
		 * Set Session
		 */
		if (!isError) {
			// 1) IP
			String ipAddress = request.getHeader("X-FORWARDED-FOR");
			if (ipAddress == null) {
				ipAddress = request.getRemoteAddr();
			}

			user.put("IP", ipAddress);
			user.put("LATE_ACCESS_TIME", CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss"));
			// 2) Session Binding : 세션감시자등록 - prototype클래스(빈을 사용할때 마다 생성)
//		    sessionBinding.setUser(user);
			// 3) Menu
			List menu = authDAO.getListMenu(parameter);

			Map menus = splitMenu(menu);

			// 4) For Combo Data

			// 99) Set
			HttpSession httpsession = request.getSession();
			user.put("IP", request.getRemoteAddr());
			httpsession.setAttribute("SESS_USER", user);
			httpsession.setAttribute("SESS_ROLE_ID", authDAO.getUserRoleIdString(parameter));
			httpsession.setAttribute("SESS_MENU", menus.get("menu"));
			httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));

			loggingService.loggingLogin(true, httpsession);
		}

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		if (!isError) {
			// 세션에 sso를 통한 임시 요청이 있는지 확인 후 해당 요청 처리
			HttpSession httpsession = request.getSession();
			String req_page = (String) httpsession.getAttribute("SSO_REQ_PAGE");
			if (req_page != null && !req_page.equals("")) {
				mav.setViewName("redirect:" + req_page);
				httpsession.setAttribute("SSO_REQ_PAGE", null);// 사용후삭제
			} else {
				mav.setViewName("redirect:/main/main");
			}
		} else {

			mav.setViewName("common/auth/loginForm");

			KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(2048);
			KeyPair keyPair = generator.genKeyPair();
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyPair.getPublic();
			PrivateKey privatKey = keyPair.getPrivate();
			session.setAttribute("_RSA_WEB_Key_", privatKey); // 세션에 RSA 개인키를 세션에 저장한다.
			RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
			String publicKeyModulus = publicSpec.getModulus().toString(16);
			String publicKeyExponent = publicSpec.getPublicExponent().toString(16);
			session.setAttribute("RSAModulus", publicKeyModulus); // 세션에 RSA 개인키를 세션에 저장한다.
			session.setAttribute("RSAExponent", publicKeyExponent); // 세션에 RSA 개인키를 세션에 저장한다.
			request.setAttribute("RSAModulus", publicKeyModulus); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
			request.setAttribute("RSAExponent", publicKeyExponent); // 로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		}
//		mav.addAllObjects(parameter);//메뉴정보,검색조건 등

		return mav;
	}

	public String decryptRsa(PrivateKey privateKey, String securedValue) {
		String decryptedValue = "";
		try {
			Cipher cipher = Cipher.getInstance("RSA", "SunJCE");

			/**
			 * 암호화 된 값은 byte 배열이다. 이를 문자열 폼으로 전송하기 위해 16진 문자열(hex)로 변경한다. 서버측에서도 값을 받을 때 hex
			 * 문자열을 받아서 이를 다시 byte 배열로 바꾼 뒤에 복호화 과정을 수행한다.
			 */
			byte[] encryptedBytes = hexToByteArray(securedValue);
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
			decryptedValue = new String(decryptedBytes, "utf-8"); // 문자 인코딩 주의.
		} catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchProviderException | NoSuchPaddingException
				| IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException e) {
			// logger.info("decryptRsa Exception Error : "+e.getMessage());
			// e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => "
					+ e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}
		return decryptedValue;
	}

	/**
	 * 16진 문자열을 byte 배열로 변환한다.
	 */
	public static byte[] hexToByteArray(String hex) {
		if (hex == null || hex.length() % 2 != 0) {
			return new byte[] {};
		}
		byte[] bytes = new byte[hex.length() / 2];
		for (int i = 0; i < hex.length(); i += 2) {
			byte value = (byte) Integer.parseInt(hex.substring(i, i + 2), 16);
			bytes[(int) Math.floor(i / 2)] = value;
		}
		return bytes;
	}
	/* 로그인 체크 */

	@RequestMapping("/common/auth/logout")
	public ModelAndView doLogout(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView();

//	    QuangNV - 14/10/2020 - logout in watch
		Map parameter = ParameterUtil.getParameterMap(request);
		final String fromDevice = CommonUtil.getMapValue(parameter, "FROM", "");
		if ("WATCH".equals(fromDevice)) {
			mav.setViewName("jsonView");
			Map mapResponse = new HashMap<>();
			mapResponse.put("STATE", "SUCCESS");
			mav.addObject("DATA", mapResponse);
		} else {
			mav.setViewName("redirect:/common/auth/redirectForm");
		}

		// mav.setViewName("redirect:/common/auth/expire.do");
		/**
		 * HttpSession에서 세션 정보 제거
		 */
		HttpSession httpsession = request.getSession();
		try {
			Cookie[] cookies = request.getCookies();

			if (cookies != null) {
				String selector = "";

				for (Cookie aCookie : cookies) {
					if (aCookie.getName().equals("selector")) {
						selector = aCookie.getValue();
					}
				}

				if (!selector.isEmpty()) {
					// delete token from database
					Map<String, Object> rememberData = utilService.rememberMeFindSelector(selector);
					if (rememberData != null && !rememberData.isEmpty()) {
						RememberLoginAuth token = new RememberLoginAuth();
						token.fromMap(new HashMap<>(rememberData));
						if (token != null) {
							utilService.deleteRememberMe(token.toMap());

							Cookie cookieSelector = new Cookie("selector", "");
							cookieSelector.setPath("/");
							cookieSelector.setMaxAge(0);
							/*
							 * @JK - 보안 취약점 수정
							 */
							cookieSelector.setSecure(true);

							Cookie cookieValidator = new Cookie("validator", "");
							cookieValidator.setPath("/");
							cookieValidator.setMaxAge(0);
							/*
							 * @JK - 보안 취약점 수정
							 */
							cookieValidator.setSecure(true);

							response.addCookie(cookieSelector);
							response.addCookie(cookieValidator);

						}
					}
				}
			}

			httpsession.removeAttribute("SESS_EVENT");
//        	SessionModelStateMng.getInstance().removeSession(httpsession);
			httpsession.invalidate();
		} catch (Exception e) {
			// System.out.println(e.getMessage());
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => "
					+ e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}

//        if(httpsession != null){ 
//        	if(httpsession.getAttribute("SESS_USER")!= null && ((Map)httpsession.getAttribute("SESS_USER")).size()>0){
//        		httpsession.invalidate();
//        	}
//        }

		return mav;
	}

	@RequestMapping("/common/auth/expire")
	public String doExpire(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return "common/auth/expire";
	}

	@RequestMapping("/common/auth/getMenuList")
	public ModelAndView doMenuList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);

		parameter.put("USER_ID", parameter.get("SESS_USER_ID").toString());

		List list = authDAO.getListMYMenu(parameter);

		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("RESULT_TYPE", "LIST");
		mav.addObject("DATA", list);
		return mav;

	}

	@RequestMapping("/common/auth/passInit.{path}")
	public ModelAndView passInit(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path, HttpSession session) {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map sess = (Map) parameter.get("session");
		String mod = session.getAttribute("RSAModulus").toString();
		String exp = session.getAttribute("RSAExponent").toString();

		String user_id = sess.get("USER_ID").toString();

		// String type = (String) parameter.get("type");
		mav.addObject("USER_ID", user_id);
		mav.addObject("RSAModulus", mod);
		mav.addObject("RSAExponent", exp);

		mav.setViewName(path + ":common/auth/pass_init");
		return mav;
	}

	@RequestMapping("/common/auth/changePassInit.ajax")
	public ModelAndView changePassInit(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		Map parameter = ParameterUtil.getParameterMap(request);
		parameter.put("USER_ID", ((Map) parameter.get("session")).get("USER_ID"));
		parameter.put("SESS_USER_ID", ((Map) parameter.get("session")).get("USER_ID"));
		parameter.put("USER_UID", ((Map) parameter.get("session")).get("USER_UID"));
		parameter.put("USE_FRM_DT", ((Map) parameter.get("session")).get("USE_FRM_DT").toString().split(" ")[0]);
		parameter.put("USE_TO_DT", ((Map) parameter.get("session")).get("USE_TO_DT").toString().split(" ")[0]);
		parameter.put("EMP_NO", ((Map) parameter.get("session")).get("EMP_NO"));
		String result = "true";
		A2mSHA sha = new A2mSHA();
		try {
			parameter.put("PWD", sha.encrypt(parameter.get("PASS").toString()));
//			stm_0201dao.update("updateUser2", parameter);
		} catch (Exception e) {
			// e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => "
					+ e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			result = "false";
		}
		// String type = (String) parameter.get("type");
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	/**
	 * 메뉴를 step1,step2, step3,4 system으로 나누어 준다.
	 * 
	 **/

	Map tmpMap = new LinkedMap();

	private List sortTree(List listMenu) {
		List<MenuNode> temp = new ArrayList<MenuNode>();
		List rs = new ArrayList();

		List<MenuNode> MenuNodes = new ArrayList<MenuNode>();
		for (Object each : listMenu) {
			MenuNode m = new MenuNode((Map) each);
			MenuNodes.add(m);
		}

		Map<String, MenuNode> mapTmp = new HashMap<>();

		// Save all MenuNodes to a map
		for (MenuNode current : MenuNodes) {
			mapTmp.put(current.getId(), current);
		}

		// loop and assign parent/child relationships
		for (MenuNode current : MenuNodes) {
			String parentId = current.getParentId();

			if (parentId != null) {
				MenuNode parent = mapTmp.get(parentId);
				if (parent != null) {
					current.setParent(parent);
					parent.addChild(current);
					mapTmp.put(parentId, parent);
					mapTmp.put(current.getId(), current);
				}
			}

		}

		// get the root
		List<MenuNode> listBranch = new ArrayList<MenuNode>();
		for (MenuNode mMenuNode : mapTmp.values()) {
//        	System.out.println(mMenuNode.getParent());
			if (mMenuNode.getValue().get("UP_MENU_ID").equals(("M_ROOT"))) {
				listBranch.add(mMenuNode);
			}
		}

		for (MenuNode root : listBranch) {
			List<MenuNode> listParents = new ArrayList<MenuNode>();
			listParents.add(root);
			int posOfNode = 0;
			depthFirstSearch(root, listParents, posOfNode, temp);
		}

		for (MenuNode each : temp) {
			rs.add(each.getValue());
		}
		return rs;
	}

	private void depthFirstSearch(MenuNode node, List<MenuNode> listParents, int posOfNode, List rs) {
		if (node == null)
			return;
		rs.add(node);
//		System.out.println(node.getId());
		if (node.getChildren().size() > 0) {
			depthFirstSearch(node.getChildren().get(0), node.getChildren(), 0, rs);
		}

		int newPos = posOfNode + 1;
		if (newPos < listParents.size()) {
			depthFirstSearch(listParents.get(newPos), listParents, newPos, rs);
		} else {
			return;
		}

	}

	public Map splitMenu(List menuList) {
		menuList = sortTree(menuList);
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

				lev = (map.get("LEV")).toString();
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

	// 레퍼런스 문제 때문에 다시 new map을 생성하여 기존맵은 그대로, MENU_ID~는 cMap으로 넣어서 nmap을 리턴함.
	private Map copyMap(Map oMap, Map cMap) {
		Map nmap = new HashMap();
		nmap.put("MENU1", (String) oMap.get("MENU1"));
		nmap.put("MENU2", (String) oMap.get("MENU2"));
		nmap.put("MENU3", (String) oMap.get("MENU3"));
		nmap.put("MENU4", (String) oMap.get("MENU4"));
		nmap.put("NM1", (String) oMap.get("NM1"));
		nmap.put("NM2", (String) oMap.get("NM2"));
		nmap.put("NM3", (String) oMap.get("PGM_ID"));
		nmap.put("NM4", (String) oMap.get("PGM_ID"));
		nmap.put("PTH", (String) oMap.get("PTH"));
		nmap.put("MENU_CLCD", (String) oMap.get("MENU_CLCD"));
		// 링크 정보를 고친다.
		nmap.put("MENU_ID", (String) cMap.get("MENU_ID"));
		nmap.put("PGM_ID", (String) cMap.get("PGM_ID"));
		nmap.put("PGM_PTH", (String) cMap.get("PGM_PTH"));
		nmap.put("PARAM", (String) cMap.get("PARAM"));

		return nmap;
	}

	private void createMV(String str, String key) {
		((Map) tmpMap.get(key)).put(str, new ArrayList());
	}

	private void rememberMe(boolean isRemember, String userId, HttpServletResponse response) throws Exception {
		if (isRemember && !Utils.isNullOrEmpty(userId)) {
			String selector = RandomStringUtils.randomAlphanumeric(12);
			String rawValidator = RandomStringUtils.randomAlphanumeric(64);
			String hashedValidator = DigestUtils.sha256Hex(rawValidator);
			Map<String, Object> params = new HashMap<>();
			params.put("SELECTOR", selector);
			params.put("VALIDATOR", hashedValidator);
			params.put("USER_ID", userId);

			int inserted = utilService.insertRememberMe(params);
			if (inserted <= 0)
				return;

			Cookie cookieSelector = new Cookie("selector", selector);
			cookieSelector.setPath("/");
			cookieSelector.setMaxAge(Utils.REMEMBER_ME_AGE);
			/*
			 * @JK - 보안 취약점 수정
			 */
			cookieSelector.setSecure(true);

			Cookie cookieValidator = new Cookie("validator", rawValidator);
			cookieValidator.setPath("/");
			cookieValidator.setMaxAge(Utils.REMEMBER_ME_AGE);
			/*
			 * @JK - 보안 취약점 수정
			 */
			cookieValidator.setSecure(true);

			response.addCookie(cookieSelector);
			response.addCookie(cookieValidator);
		}
	}

	@RequestMapping("/common/auth/forgotPassword")
	public ModelAndView forgotPassword(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> params = ParameterUtil.getParameterMap(request);
		final String mode = CommonUtil.getMapValue(params, "mode", "");
		final String proceed = CommonUtil.getMapValue(params, "proceed", "");
		final String data = CommonUtil.getMapValue(params, "data", "");
		String errorCode = "";
		String successCode = "";
		String errorArgument = "";
		if (!data.isEmpty()) {
			mav.addObject("ecryptData", data);
		}

		if ("true".equals(proceed)) {
			if ("change".equals(mode)) { // change password
				final String newPassword = CommonUtil.getMapValue(params, "NEW_PASSWORD", "");
				final String confirmNewPassword = CommonUtil.getMapValue(params, "CONFIRM_NEW_PASSWORD", "");

				if (newPassword.isEmpty() || confirmNewPassword.isEmpty()) {
					errorCode = "common.auth.forgotPassword.requiredAll";
				} else if (!newPassword.equals(confirmNewPassword)) {
					errorCode = "common.auth.forgotPassword.passwordNotMatch";
				} else if (newPassword.length() < 8) { // password required at least 8 characters
					errorCode = "common.auth.forgotPassword.lengthRequired";
				}

				if (errorCode.isEmpty()) { // save change password
					if (!data.isEmpty()) {
						String userId = "";
						CryptoUtil crypto = new CryptoUtil();
						try {
							userId = crypto.decrypt(KEY_CRYPTO, data);
							userId = userId.substring(0, userId.lastIndexOf(";"));
							if (!userId.isEmpty()) {
								Map<String, Object> userData = utilService.getUserByUserId(userId);
								if (userData != null && !userData.isEmpty()) {
									A2mSHA sha = new A2mSHA();
									String password = sha.encrypt(newPassword);
									Map<String, Object> _params = new HashMap<>();
									_params.put("PWD", password);
									_params.put("USER_ID", userId);

									int affectedRows = utilService.updateUserPassword(_params);
									if (affectedRows > 0)
										successCode = "common.auth.forgotPassword.success";
									else
										errorCode = "common.auth.forgotPassword.failed";
								} else {
									errorCode = "common.auth.forgotPassword.internalError";
									errorArgument = String.format("Internal error: user [%s] not found in the system!",
											userId);
								}
							} else {
								errorCode = "common.auth.forgotPassword.internalError";
								errorArgument = "Internal error: data is null or empty!";
							}
						} catch (IOException | InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException
								| NoSuchPaddingException | InvalidAlgorithmParameterException
								| IllegalBlockSizeException | BadPaddingException e) {
							errorCode = "common.auth.forgotPassword.internalError";
							errorArgument = "Internal error: error occured when trying to parse data!";
							loggingService.exceptionLogging(e);
						}
					} else {
						errorCode = "common.auth.forgotPassword.internalError";
						errorArgument = "Internal error: not found data to proceed change password, please re check your link or contact to administrator to get help.";
					}
				}
			} else { // send request change password
				final String email = CommonUtil.getMapValue(params, "EMAIL", "");
				final String userId = CommonUtil.getMapValue(params, "USER_ID", "");
				Map<String, Object> userData = null;

				if (email.isEmpty() || userId.isEmpty()) {
					errorCode = "common.auth.forgotPassword.requiredAll";
				} else if (!email.matches("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")) {
					errorCode = "common.auth.forgotPassword.emailWrongFormat";
					errorArgument = String.format("[%s]", email);
				} else { // check user existed in DB
					try {
						userData = utilService.getUserByUserId(userId);
						if (userData == null || userData.isEmpty() || !userData.containsKey("USER_UID")) {
							errorCode = "common.auth.forgotPassword.userIdNotExist";
							errorArgument = String.format("[%s]", userId);
						}
					} catch (Exception e) {
						errorCode = "common.auth.forgotPassword.userIdNotExist";
						errorArgument = String.format("[%s]", userId);
					}
				}

				if (errorCode.isEmpty()) { // send request
					CryptoUtil crypto = new CryptoUtil();
					String _data = crypto.encrypt(KEY_CRYPTO, userId + ";" + new Date().getTime());
					String url = request.getRequestURL().append("?mode=change&data=").append(_data).toString();
					StringBuilder content = new StringBuilder();
					content.append("Click the link below to change your password, thank you.<br/><br/>");
					content.append("<a href='" + url + "' target='_blank'>" + url + "</a>");
					Utils.sendEmailWithoutAttachment(email, "[A2M] Confirm change password", content.toString());
					successCode = "common.auth.forgotPassword.sendEmailSuccess";
				}
			}
		}

		mav.addObject("errorCode", errorCode);
		mav.addObject("errorArguments", errorArgument);
		mav.addObject("successCode", successCode);
		mav.addObject("mode", mode);
		mav.setViewName("common/auth/forgotPassword");
		return mav;
	}

}
