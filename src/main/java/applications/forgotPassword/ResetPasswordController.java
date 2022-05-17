package applications.forgotPassword;

import java.security.PrivateKey;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import applications.auth.AuthDAOImpl;
import infrastructure.inheritance.BaseController;
import infrastructure.util.MailSenderUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;
import kr.co.a2m.security.kryptos.A2mSHA;

@Controller("resetPasswordController")
public class ResetPasswordController extends BaseController {
	
	@Autowired
	private ResetPasswordServiceImpl resetPasswordService;
	
	@Autowired 
	private AuthDAOImpl authDAO;

	
	@RequestMapping("/common/auth/resetPassword")
	public ModelAndView resetPassword(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("common/auth/resetPassword");
		return mav;
	}
	
	@RequestMapping("/common/auth/resetPassword/success")
	public ModelAndView sendMailSuccess() throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("common/auth/resetPasswordSuccess");
		return mav;
	}
	
	@RequestMapping("/common/auth/resetPassword/reset")
	public ModelAndView updatePassword(@RequestParam(value = "token") String token) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.addObject("RESET_PASS_TOKEN", token);
		mav.setViewName("common/auth/updatePassword");
		return mav;
	}

	@RequestMapping("/common/auth/resetPassword/sendMail.ajax")
	public ModelAndView sendMail(HttpServletRequest request, HttpServletResponse response) throws Exception {

 		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		String mailTo = null;
		if(parameter.containsKey("USER_EMAIL")) {
			mailTo = (String) parameter.get("USER_EMAIL");
		}
		
		if(StringUtils.isEmpty(mailTo)) {
			mav.addObject("DATA", "2");
			return mav;
		}

		Object userObj = resetPasswordService.getUserInfoByEmail(mailTo);
		
		if(userObj == null) {
			mav.addObject("DATA", "3");
			return mav;
		}
		
		Map<String, Object> userMap = (Map<String, Object>) userObj;
		
		ResourceBundle bundle = ResourceUtil.getResourceBundle("config.system.mail-config");
		
		String token = UUID.randomUUID().toString();
		String expireTime = bundle.getString("token.expire.resetpassword");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.SECOND, new Integer(expireTime));
		Date expiredDate = calendar.getTime();
		
		String mailSubject = bundle.getString("mail.subject.resetpassword");
		
		Map<String, Object> updateData = new HashMap<>();
		updateData.put("RESET_PW_TOKEN", token);
		updateData.put("RESET_PW_TOKEN_EXPIRE", expiredDate);
		updateData.put("USER_UID", userMap.get("USER_UID"));
		
		resetPasswordService.updateResetPassInfo(updateData);
		
		Map<String, String> replaceMap = new HashMap<>();
		
		String actionUrl = bundle.getString("token.receiver.endpoint.resetpassword")+token;
		
		replaceMap.put("action_url", actionUrl);
		
		String content = EmailTemplate.generateContent(EmailTemplate.ResouceName.RESET_PASSWORD, replaceMap);
				
		/*SimpleMailMessage email = new SimpleMailMessage();
		email.setText(content);
		email.setSubject(mailSubject);
		email.setTo(mailTo);
		email.setFrom(EmailTemplate.FROM);
		
		emailService.sendHtmlMail(email);*/
		MailSenderUtil.sendEmail(mailTo, mailSubject, content);
		
		mav.addObject("DATA", "1");
		
		return mav;
	}
	
	@RequestMapping("/common/auth/resetPassword/updatePassword.ajax")
	public ModelAndView updatePassword(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		String validate = updatePassword(parameter);
		mav.addObject("DATA", validate);
		return mav;
	}
	
	@RequestMapping("/common/auth/resetPassword/changePassword.ajax")
	public ModelAndView changePassword(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		

		A2mSHA sha = new A2mSHA();
		String user_id = "";
		String user_pw = "";
		boolean isError = false;
		String errCode = "";
		String new_pw = "";
		PrivateKey privateKey = (PrivateKey) session.getAttribute("_RSA_WEB_Key_");

			if (parameter.get("USER_ID") != null) {
				user_id = decryptRsa(privateKey, (String) parameter.get("USER_ID"));
				parameter.put("USER_ID", user_id);
			}
			if (parameter.get("PWD") != null) {
				user_pw = decryptRsa(privateKey, (String) parameter.get("PWD"));
				parameter.put("USER_PW", sha.encrypt(user_pw));
			}
			
			if (parameter.get("USER_PW_2") != null) {
				new_pw = decryptRsa(privateKey, (String) parameter.get("USER_PW_2"));
				parameter.put("USER_PW_2", sha.encrypt(new_pw));
			}


			if (user_id == null || user_pw == null || user_id.equals("") || user_pw.equals("")) {
				isError = true;
				errCode = "login.WRONG_USER_PWD";
			}
			
			Map user = authDAO.getUser(parameter);
			if (user == null || user.get("USER_ID") == null) {
				isError = true;
				errCode = "login.NOT_EXIST_USER";
			}
			
			Map data = new HashMap();
			

			if(!isError) {
				parameter.put("USER_PW", sha.encrypt(user_pw));

				resetPasswordService.updatePassword2(parameter);
				data.put("RESULT", "true");
			}else {
				data.put("RESULT", "false");
				data.put("errCode", errCode);

			}
		
		mav.addObject("DATA", data);
		return mav;
	}
	
	@RequestMapping("/common/auth/resetPassword/changePasswordFirstLogin.ajax")
	public ModelAndView changePasswordFirstLogin(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		

		A2mSHA sha = new A2mSHA();
		String user_id = "";
		String user_pw = "";
		boolean isError = false;
		String errCode = "";
		String new_pw = "";
		PrivateKey privateKey = (PrivateKey) session.getAttribute("_RSA_WEB_Key_");

			if (parameter.get("USER_ID") != null) {
				user_id = decryptRsa(privateKey, (String) parameter.get("USER_ID"));
				parameter.put("USER_ID", user_id);
			}
		
			
			if (parameter.get("USER_PW_2") != null) {
				new_pw = decryptRsa(privateKey, (String) parameter.get("USER_PW_2"));
				parameter.put("USER_PW_2", sha.encrypt(new_pw));
			}


			if (user_id == null || new_pw == null || user_id.equals("") || new_pw.equals("")) {
				isError = true;
				errCode = "login.WRONG_USER_PWD";
			}
			
			
			
			Map data = new HashMap();
			

			if(!isError) {
				parameter.put("USER_PW", sha.encrypt(user_pw));

				resetPasswordService.updatePassword2(parameter);
				data.put("RESULT", "true");
			}else {
				data.put("RESULT", "false");
				data.put("errCode", errCode);

			}
		
		mav.addObject("DATA", data);
		return mav;
	}
	
	public String decryptRsa(PrivateKey privateKey, String securedValue) {
		 String decryptedValue = "";
		 try{
			Cipher cipher = Cipher.getInstance("RSA", "SunJCE");
			
		   /**
			* ì•”í˜¸í™” ë�œ ê°’ì�€ byte ë°°ì—´ì�´ë‹¤.
			* ì�´ë¥¼ ë¬¸ìž�ì—´ í�¼ìœ¼ë¡œ ì „ì†¡í•˜ê¸° ìœ„í•´ 16ì§„ ë¬¸ìž�ì—´(hex)ë¡œ ë³€ê²½í•œë‹¤.
			* ì„œë²„ì¸¡ì—�ì„œë�„ ê°’ì�„ ë°›ì�„ ë•Œ hex ë¬¸ìž�ì—´ì�„ ë°›ì•„ì„œ ì�´ë¥¼ ë‹¤ì‹œ byte ë°°ì—´ë¡œ ë°”ê¾¼ ë’¤ì—� ë³µí˜¸í™” ê³¼ì •ì�„ ìˆ˜í–‰í•œë‹¤.
			*/
			byte[] encryptedBytes = hexToByteArray(securedValue);
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
			decryptedValue = new String(decryptedBytes, "utf-8"); // ë¬¸ìž� ì�¸ì½”ë”© ì£¼ì�˜.
		 }catch(Exception e)
		 {
			 logger.info("decryptRsa Exception Error : "+e.getMessage());
			 e.printStackTrace();
		 }
			return decryptedValue;
	}
	
	public static byte[] hexToByteArray(String hex) {
		if (hex == null || hex.length() % 2 != 0) {
			return new byte[]{};
		}
		byte[] bytes = new byte[hex.length() / 2];
		for (int i = 0; i < hex.length(); i += 2) {
			byte value = (byte)Integer.parseInt(hex.substring(i, i + 2), 16);
			bytes[(int) Math.floor(i / 2)] = value;
		}
		return bytes;
	}
	
	private String updatePassword(Map<String, Object> parameter) throws Exception {
		String newPass = null;
		newPass = (String) parameter.get("USER_PW_NEW");
		
		if(StringUtils.isEmpty(newPass)) {
			return "2";
		}
		
		String passConfirm = (String) parameter.get("USER_PW_NEW_CONFIRM");
		if(!newPass.equals(passConfirm)) {
			return "3";
		}
		
		String token = (String) parameter.get("RESET_PASS_TOKEN");
		if(StringUtils.isEmpty(token)) {
			return "4";
		}
		
		Object userObj = resetPasswordService.getByResetPassToken(token);
		
		if(userObj == null) {
			return "5";
		}
		
		Map<String, Object> userMap = (Map<String, Object>) userObj;
		
		Object tokenExpired = userMap.get("RESET_PW_TOKEN_EXPIRE");
		
		if(tokenExpired != null) {
			Date tokenExpiredDate = (Date) tokenExpired;
			Date now = new Date();
			if(now.after(tokenExpiredDate)) {
				return "6";
			}
		}
		
		Object tokenStatus = userMap.get("RESET_PW_TOKEN_STATUS");
		
		if(tokenStatus == null || !"1".equals(tokenStatus.toString())) {
			return "7";
		}
		
		if(StringUtils.isEmpty(userMap.get("USER_UID"))) {
			return "8";
		}
		
		
		Map<String, Object> updatePassData = new HashMap<>();
		A2mSHA sha = new A2mSHA();
		updatePassData.put("USER_PW", sha.encrypt(newPass));
		updatePassData.put("USER_UID", userMap.get("USER_UID"));
		resetPasswordService.updatePassword(updatePassData);
		
		return "1";
	}

}
