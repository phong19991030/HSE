package applications.mobile;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;

/**
 * 
 * AnhPV
 * 2019/02/19
 */
@Component("mobileDAOImpl")
public class MobileDAOImpl extends AbstractDAO {
		
	
	public MobileDAOImpl() {
		// TODO Auto-generated constructor stub
		super.namespace = "common.mobile.Mobile";
	}
	

	public void saveDeviceInfo(Object parameter) throws Exception {
		update("saveDeviceInfo", parameter);
	}


	public Object getDevice(Map parameter) throws Exception {
		return object("getDeviceByID", parameter);
	}


	public void updateUsername(Map parameter) throws Exception {
		update("updateUsernameDevice", parameter);
	}





	public Object userInfo(Map parameter) throws Exception {
		return object("getUserInfo", parameter);
	}
	
}

