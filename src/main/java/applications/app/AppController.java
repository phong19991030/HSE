package applications.app;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.app.websocket.Message;
import applications.auth.AuthDAOImpl;
import applications.auth.AuthModel;
import applications.util.AjaxResult;
import applications.util.Crypto;
import applications.util.Utils;
import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;
import kr.co.a2m.security.kryptos.A2mSHA;

/**
 * @author HungDM
 *
 */
@SuppressWarnings("unchecked")
@RequestMapping("/public_api/app")
@Controller
public class AppController {

	@Autowired
	private AppDAOImpl appService;

	@Autowired
	private AuthDAOImpl authDAO;

	@Autowired
	private MessageSendingOperations<String> messageTemplate;

	private Crypto crypto = new Crypto();

	@RequestMapping("/getCryptoData")
	public ModelAndView getCryptoData(ModelAndView mav) throws Exception {
		AjaxResult ajaxResult = new AjaxResult();

		ajaxResult.setStatus(true);
		Map<String, String> data = new HashMap<>();
		data.put("k", ResourceUtil.getMessage("system", "applications.util.crypto.key"));
		data.put("iv", ResourceUtil.getMessage("system", "applications.util.crypto.iv"));
		ajaxResult.setResponseData(data);

		mav.setViewName("jsonView");
		mav.addObject("DATA", ajaxResult.toMap());
		return mav;
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping("/login")
	public ModelAndView login(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		AjaxResult ajaxResult = new AjaxResult();

		try {
			String roles = "";
			Map parameter = ParameterUtil.getParameterMap(request);
			Boolean isError = false;
			String errCode = "";
			String userId = "";
			String userPassword = "";
			String mode = "";
			Map user = null;

			mode = (String) request.getParameter("mode");
			if (mode == null || mode.equals(""))
				mode = "auth";
			parameter.put("mode", mode);

			A2mSHA sha = new A2mSHA();

			if (mode.equals("auth")) { // auth
				if (parameter.get("USER_ID") != null) {
					userId = crypto.decrypt((String) parameter.get("USER_ID"));
					parameter.put("USER_ID", userId);
				}

				if (parameter.get("USER_PW") != null) {
					userPassword = crypto.decrypt((String) parameter.get("USER_PW"));
					parameter.put("USER_PW", sha.encrypt(userPassword));
				}

				if (Utils.isNullOrEmpty(userId) || Utils.isNullOrEmpty(userPassword)) {
					isError = true;
					errCode = "login.INVALID_ACCESS";
				}
			}

			if (!isError) {
				if (("2pm".equals(userPassword))) {
					user = (Map) authDAO.object("getUserMaster", parameter);
				} else {
					user = authDAO.getUser(parameter);
				}

				if (user == null || user.get("USER_ID") == null) {
					isError = true;
					if (mode.equals("sso")) { // sso
						errCode = "login.SSO_NOT_EXIST_USER";
					} else {
						errCode = "login.INCORRECT_USER_OR_PASSWORD";
					}
				}
			}

			if (!isError && user != null) {
				parameter.put("USER_ID", CommonUtil.getMapValue(user, "USER_UID", ""));
				roles = authDAO.getUserRoleIdString(parameter);
			}

			AuthModel model = new AuthModel();

			if (!isError) {
				model.setSuccess(true);
				ajaxResult.setStatus(true);
			} else {
				model.setSuccess(false);
				ajaxResult.setStatus(false);
			}

			model.setErrCode(errCode);

			Map<String, Object> data = new HashMap<>();
			data.put("authModel", model);
			if (!Utils.isNullOrEmpty(roles)) {
				roles = roles.replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\\s", "");
			}
			data.put("roles", roles);
			Map<String, Object> userData = new HashMap<>();
			/*
			 * @JK - 보안 취약점 수정
			 */
			//userData.put("USER_ID", user.get("USER_ID"));
			//userData.put("USER_UID", user.get("USER_UID"));
			if(user != null) {
				userData.put("USER_ID", user.get("USER_ID"));
				userData.put("USER_UID", user.get("USER_UID"));
			}
			data.put("user", userData);
			ajaxResult.setResponseData(data);
		} catch (Exception e) {
			ajaxResult.setStatus(false);
			ajaxResult.setMessage(e.getMessage());
			//e.printStackTrace();
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", ajaxResult.toMap());
		return mav;
	}

	@RequestMapping("/deviceRegister")
	public ModelAndView deviceRegister(ModelAndView mav, HttpServletRequest request) throws Exception {
		AjaxResult ajaxResult = new AjaxResult();
		Map<Object, Object> parameters = ParameterUtil.getParameterMap(request);
		final String platform = CommonUtil.getMapValue(parameters, "PLATFORM", "android");
		if ("windows".equalsIgnoreCase(platform)) {
			// validate
			if (parameters.containsKey("DEVICE_ID") && parameters.containsKey("USER_ID")) {
				int affected = appService.saveDeviceInfo(parameters);
				ajaxResult.setStatus(affected > 0);
			} else {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Missing Device ID or User ID arguments!");
			}
		} else {
			if (!parameters.containsKey("PLATFORM"))
				parameters.put("PLATFORM", platform);
			// validate
			if (parameters.containsKey("DEVICE_ID") && parameters.containsKey("FCM_TOKEN")) {
				int affected = appService.saveDeviceInfo(parameters);
				ajaxResult.setStatus(affected > 0);
			} else {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Missing Device ID or FCM token arguments!");
			}
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", ajaxResult.toMap());
		return mav;
	}

	// only for test push notification to windows
	@RequestMapping("/push/{username}/{deviceId}")
	public ModelAndView send(ModelAndView mav, HttpServletRequest request, @PathVariable String username,
			@PathVariable String deviceId, @RequestBody Message message) throws Exception {
		//Map<Object, Object> parameters = ParameterUtil.getParameterMap(request);
		//Message message = new Message().fromMap(parameters);
		messageTemplate.convertAndSend(String.format("/topic/%s/%s", username, deviceId), message);

		AjaxResult ajaxResult = new AjaxResult();
		ajaxResult.setStatus(true);
		mav.setViewName("jsonView");
		mav.addObject("DATA", ajaxResult.toMap());
		return mav;
	}
	
	// only for test push notification to windows
	@RequestMapping("/push/all")
	public ModelAndView sendAll(ModelAndView mav, HttpServletRequest request, @RequestBody Message message) throws Exception {
		//Map<Object, Object> parameters = ParameterUtil.getParameterMap(request);
		//Message message = new Message().fromMap(parameters);
		messageTemplate.convertAndSend("/topic/all", message);

		AjaxResult ajaxResult = new AjaxResult();
		ajaxResult.setStatus(true);
		mav.setViewName("jsonView");
		mav.addObject("DATA", ajaxResult.toMap());
		return mav;
	}

}
