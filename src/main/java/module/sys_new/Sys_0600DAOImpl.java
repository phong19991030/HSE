package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0600DAOImpl")
public class Sys_0600DAOImpl extends AbstractDAO {

	public Sys_0600DAOImpl() {
		super.namespace = "sys_new.sys0600";
	}

	/* 리스트 */
	public List getMenuAccessList(Map param) throws Exception{
		return list("getMenuAccessList", param);
	}
	public Map getMenuAccessCnt(Map param) throws Exception{
		return map("getMenuAccessCnt", param);
	}
	
	/* 팝업 */
	public Map duplicateCheckRoleID(Map param) throws Exception{
		return map("duplicateCheckRoleID", param);
	}
	
	/* 등록, 수정, 삭제 */
	public int insertMenuAccess(Map param) throws Exception {
		return (int) insert("insertMenuAccess", param);
	}
	public int insertMenuAccessGrant(Map param) throws Exception {
		return (int) insert("insertMenuAccessGrant", param);
	}
	public int updateMenuAccess(Map param) throws Exception {
		return (int) update("updateMenuAccess", param);
	}
	public int deleteMenuAccess(Map param) throws Exception {
		return (int) delete("deleteMenuAccess", param);
	}
	public int deleteMenuAccessGrant(Map param) throws Exception {
		return (int) delete("deleteMenuAccessGrant", param);
	}
	/* 상세 */
	public Map getMenuAccessInfo(Map param) throws Exception{
		return map("getMenuAccessInfo", param);
	}
	public List getMenuAccessGrant(Map param) throws Exception{
		return list("getMenuAccessGrant", param);
	}
}
