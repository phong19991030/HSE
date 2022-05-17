package applications.auth;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

/**
 * 
 * @author kdna2m001
 * @title  로그인 및 메뉴(권한)
 * @contents 
 * - 로그인 체크
 * - 사용자가 권한을 갖는 메뉴 전체
 * @version
 *  - 1.0 생성 2012. 11. 29. kdna2m001
 */
@Component("authDAOImpl")
public class AuthDAOImpl extends AbstractDAO {
		
	
	public AuthDAOImpl() {
		// TODO Auto-generated constructor stub
		super.namespace = "common.auth.Auth";
	}
	/**
	 * QuangNV - get USER_NM for watch device
	 */
	public Map getUserDetailForWatch(Object parameter) throws Exception {
		return (Map)object("getUserDetailForWatch", parameter);
	}
	
	/**
	 * 로그인체크
	 */
	public Map getUser(Object parameter) throws Exception {
		return (Map)object("getUser", parameter);
	}

	public String getUseYN(Map parameter) throws Exception {
		return (String) object("getUseYN", parameter);
	}
	
	public Map getUsersso(Object parameter) throws Exception{
		return (Map)object("getUsersso", parameter);
	}
	
	/**
	 * ROLE ID 
	 */
	public String getUserRoleIdString(Object parameter) throws Exception {
		String result ;
		List list = list("userRoleId", parameter);
//		List StringList ;
		result = Arrays.toString(list.toArray());
		
		
		return result ;
//		return (Map)("getUser", parameter);
	}
	
	/**
	 * User emp dept info
	 */
	public Map getUserEmpDeptInfo(Object parameter) throws Exception{
		Map data = map("getUserEmpDeptInfo", parameter);
		return data;
	}
	
	
	/**
	 * 권한있는메뉴전체
	 */
	public List getListMenu(Object parameter) throws Exception {
		//return list("getListMenu", parameter);
		return list("getListMenuLang", parameter);
	}

	public List getListRCMenu(Object parameter) throws Exception {
		return list("getListRCMenu", parameter);
	}
	
	public List getListMYMenu(Object parameter) throws Exception {
		return list("getListMYMenu", parameter);
	}
	
	/**
	 * 
	 * @Method : getUserSalt
	 * @Author : pjk
	 * @Date : Jul 19, 2021
	 * @param parameter
	 * @return
	 * @throws Exception
	 * @Description :
	 */
	public Map getUserSalt(Object parameter) throws Exception {
		return (Map) map("getUserSalt", parameter);
	}
	
}

