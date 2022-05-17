package applications.forgotPassword;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("resetPasswordServiceImpl")
public class ResetPasswordServiceImpl {

	private @Autowired ResetPasswordDAOImpl resetPasswordDAO;

	private static final String UPDATE_RESET_PASS_INFO = "updateResetPassInfo";
	private static final String UPDATE_PASSWORD = "updatePassword";
	private static final String GET_BY_RESET_PASS_TOKEN = "getByResetPassToken";
	private static final String GET_USER_INFO = "getUserInfo";
	private static final String CHECK_EMAIL = "checkEmail";

	@Transactional(propagation = Propagation.REQUIRED)
	public void updateResetPassInfo(Map<String, Object> parameter) throws Exception {
		resetPasswordDAO.update(UPDATE_RESET_PASS_INFO, parameter);
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public void updatePassword(Map<String, Object> parameter) throws Exception {
		resetPasswordDAO.update(UPDATE_PASSWORD, parameter);
	}
	
	
	public void updatePassword2(Map<String, Object> parameter) throws Exception {
		resetPasswordDAO.update("updatePassword2", parameter);
	}
	
	public Object getUserInfo(Map<String, Object> parameter) throws Exception {
		return resetPasswordDAO.object(GET_USER_INFO, parameter);
	}
	
	public Object getUserInfoByEmail(String email) throws Exception {
		Map<String, Object> parameter = new HashMap<>();
		parameter.put("USER_EMAIL", email);
		parameter.put("ACTIVE_YN", "Y");
		return resetPasswordDAO.object(GET_USER_INFO, parameter);
	}
	
	public Object getByResetPassToken(String token) throws Exception {
		Map<String, Object> parameter = new HashMap<>();
		parameter.put("RESET_PW_TOKEN", token);
		return resetPasswordDAO.object(GET_BY_RESET_PASS_TOKEN, parameter);
	}
	
	public boolean checkEmail(String email) throws Exception {
		Map<String, Object> parameter = new HashMap<>();
		parameter.put("USER_EMAIL", email);
		int count = (int) resetPasswordDAO.object(CHECK_EMAIL, parameter);
		return count > 0;
	}
}
