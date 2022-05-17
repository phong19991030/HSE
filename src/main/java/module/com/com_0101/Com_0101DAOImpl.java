package module.com.com_0101;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Com_0101DAOImpl")
public class Com_0101DAOImpl extends AbstractDAO {

	public Com_0101DAOImpl() {
		super.namespace = "com.com_0101";
	}

	/********** sys_0300 - 리스트 ***************/
	public List getUserList(Map param) throws Exception{
		return list("getUserList", param);
	}
	public Map getUserCnt(Map param) throws Exception{
		return map("getUserCnt", param);
	}
	
	/* POPUP */
	public List getCompanyList(Map param) throws Exception {
		return list("getCompanyList", param);
	}
	public List getMenuAccessList(Map param) throws Exception {
		return list("getMenuAccessList", param);
	}
//	public List getTurbinePermissionList(Map param) throws Exception {
//		return list("getTurbinePermissionList", param);
//	}
	public List duplicateCheckUserID(Map param) throws Exception {
		return list("duplicateCheckUserID", param);
	}
	/*//POPUP */
	
	/* 등록, 수정 */
	public int insertUser(Map param) throws Exception {
		return (int) insert("insertUser", param);
	}
	public int insertUserMenuAccess(Map param) throws Exception {
		return (int) insert("insertUserMenuAccess", param);
	}
//	public int insertUserTurbinePermission(Map param) throws Exception {
//		return (int) insert("insertUserTurbinePermission", param);
//	}
	public int updateUser(Map param) throws Exception {
		return (int) update("updateUser", param);
	}
	public int deleteUserMenuAccess(Map param) throws Exception {
		return (int) delete("deleteUserMenuAccess", param);
	}
//	public int deleteUserTurbinePermission(Map param) throws Exception {
//		return (int) delete("deleteUserTurbinePermission", param);
//	}
	public int deleteUser(Map param) throws Exception {
		return (int) insert("deleteUser", param);
	}
	/* //등록, 수정 */
	
	/* 상세 */
	public Map getUserInfo(Map param) throws Exception{
		return map("getUserInfo", param);
	}
	/* //상세 */
	
	public List getEmpMgtList(Map param) throws Exception{
		return list("getEmpMgtList", param);
	}
	
	public List getEmpListWithParam(Map param) throws Exception{
		return list("getEmpListWithParam", param);
	}
}
