package module.com.com_0101;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.service.AbstractService;
import module.util.FileUtil;

@Service("Com_0101ServiceImpl")
public class Com_0101ServiceImpl extends AbstractService{

	@Autowired
	Com_0101DAOImpl dao;
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		Map cnt = dao.getUserCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getUserList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	/* POPUP */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getCompanyList(Map param) throws Exception {
		return dao.getCompanyList(param);
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getMenuAccessList(Map param) throws Exception {
		return dao.getMenuAccessList(param);
	}
//	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
//	public List getTurbinePermissionList(Map param) throws Exception {
//		return dao.getTurbinePermissionList(param);
//	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List duplicateCheckUserID(Map param) throws Exception {
		return dao.duplicateCheckUserID(param);
	}
	/*//POPUP */
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		
		/* 사용자 추가 - TSST_USER, TSST_USER_INFO */
		int insert_user_cnt = dao.insertUser(param);
		/* 사용자 추가 결과 */
		result.put("INSERT_USER_CNT", insert_user_cnt > 0 ? 1 : 0);
		result.put("USER_UID", param.get("USER_UID"));
		
		/* 사용자 메뉴 권한 추가 */
		int cntA = 0;
		List<Map> listA = (List<Map>) param.get("MENU_ACCESS_LIST");
		for(Map map : listA) {
			map.put("USER_UID", param.get("USER_UID"));
			if(dao.insertUserMenuAccess(map) > 0) cntA++;
		}
		/* 사용자 메뉴 권한 추가 결과 */
		result.put("INSERT_MENU_ACCESS_CNT", cntA);
		
		/* 사용자 터빈 권한 추가 */
//		int cntB = 0;
//		List<Map> listB = (List<Map>) param.get("TURBINE_PERMISSION_LIST");
//		for(Map map : listB) {
//			map.put("USER_UID", param.get("USER_UID"));
//			if(dao.insertUserTurbinePermission(map) > 0) cntB++;
//		}
		/* 사용자 터빈 권한 추가 결과 */
//		result.put("INSERT_TURBINE_PERMISSION_CNT", cntB);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 사용자 수정 - TSST_USER, TSST_USER_INFO */
		int update_user_cnt = dao.updateUser(param);
		result.put("UPDATE_USER_CNT", update_user_cnt > 0 ? 1 : 0);
		result.put("USER_UID", param.get("USER_UID"));
		
		/* 사용자 메뉴 권한 삭제 */
		int delete_menu_access_cnt = dao.deleteUserMenuAccess(param);
		/* 사용자 메뉴 권한 삭제 결과 */
		result.put("DELETE_MENU_ACCESS_CNT", delete_menu_access_cnt);
		
		/* 사용자 메뉴 권한 추가 */
		int cntA = 0;
		List<Map> listA = (List<Map>) param.get("MENU_ACCESS_LIST");
		for(Map map : listA) {
			map.put("USER_UID", param.get("USER_UID"));
			if(dao.insertUserMenuAccess(map) > 0) cntA++;
		}
		/* 사용자 메뉴 권한 추가 결과 */
		result.put("INSERT_MENU_ACCESS_CNT", cntA);
		
		/* 사용자 메뉴 권한 삭제 */
//		int delete_turbine_permission_cnt = dao.deleteUserTurbinePermission(param);
//		/* 사용자 메뉴 권한 삭제 결과 */
//		result.put("DELETE_TURBINE_PERMISSION_CNT", delete_turbine_permission_cnt);
//		
//		/* 사용자 터빈 권한 추가 */
//		int cntB = 0;
//		List<Map> listB = (List<Map>) param.get("TURBINE_PERMISSION_LIST");
//		for(Map map : listB) {
//			map.put("USER_UID", param.get("USER_UID"));
//			if(dao.insertUserTurbinePermission(map) > 0) cntB++;
//		}
//		/* 사용자 터빈 권한 추가 결과 */
//		result.put("INSERT_TURBINE_PERMISSION_CNT", cntB);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_user_cnt = dao.deleteUser(param);
			result.put("DELETE_USER_CNT", delete_user_cnt > 0 ? 1 : 0);
			isDelete = delete_user_cnt > 0 ? true : false;
		} 
		// 무결성 제약조건(참조키 존재)
		catch (SQLIntegrityConstraintViolationException | DataIntegrityViolationException e) {
			isDelete = false;
			result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
		}
		result.put("IS_DELETE", isDelete);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getUserInfo(Map param) throws Exception {
		return dao.getUserInfo(param);
	}

}
