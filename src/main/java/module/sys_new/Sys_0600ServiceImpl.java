
package module.sys_new;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.ParameterUtil;
import module.util.FileUtil;

@Service("Sys_new_0600ServiceImpl")
public class Sys_0600ServiceImpl extends AbstractService{

	@Autowired
	Sys_0600DAOImpl dao;
	
	@Autowired 
	private ServletContext servletContext;
	
	/* 리스트 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		Map cnt = dao.getMenuAccessCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getMenuAccessList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	/* 팝업 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map duplicateCheckRoleID(Map param) throws Exception {
		return dao.duplicateCheckRoleID(param);
	}
	
	/* 등록, 수정 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		/* 메뉴 권한 추가 - TSST_ROLE_MGT, TSST_ROLE_PGM */
		int insert_menu_access_cnt = dao.insertMenuAccess(param);
		/* 메뉴 권한 추가 결과 */
		result.put("INSERT_MENU_ACCESS_CNT", insert_menu_access_cnt > 0 ? 1 : 0);
		result.put("ROLE_ID", param.get("ROLE_ID"));
		
		/* 메뉴 승인 권한 추가 */
		int insert_menu_grant_cnt = 0;
		List<Map> list = (List<Map>) param.get("GRANT_LIST");
		for(Map map : list) {
			map.put("ROLE_ID", param.get("ROLE_ID"));
			if(dao.insertMenuAccessGrant(map) > 0) insert_menu_grant_cnt++;
		}
		/* 메뉴 승인 권한 추가 결과 */
		result.put("INSERT_MENU_GRANT_CNT", insert_menu_grant_cnt);
		result.put("INSERT_MENU_GRANT_LIST", list);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 메뉴 권한 수정 - TSST_ROLE_MGT, TSST_ROLE_PGM */
		int update_menu_access_cnt = dao.updateMenuAccess(param);
		/* 메뉴 권한 수정 결과 */
		result.put("UPDATE_MENU_ACCESS_CNT", update_menu_access_cnt > 0 ? 1 : 0);
		result.put("ROLE_ID", param.get("ROLE_ID"));
		
		/* 메뉴 승인 권한 삭제 */
		int delete_menu_grant_cnt = dao.deleteMenuAccessGrant(param);
		/* 메뉴 승인 권한 삭제 결과 */
		result.put("DELETE_MENU_GRANT_CNT", delete_menu_grant_cnt);
		
		/* 메뉴 승인 권한 추가 */
		int insert_menu_grant_cnt = 0;
		List<Map> list = (List<Map>) param.get("GRANT_LIST");
		for(Map map : list) {
			map.put("ROLE_ID", param.get("ROLE_ID"));
			if(dao.insertMenuAccessGrant(map) > 0) insert_menu_grant_cnt++;
		}
		/* 메뉴 승인 권한 추가 결과 */
		result.put("INSERT_MENU_GRANT_CNT", insert_menu_grant_cnt);
		result.put("INSERT_MENU_GRANT_LIST", list);
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		
		/* 메뉴 승인 권한 삭제 - TSST_ROLE_PGM */
		int delete_menu_grant_cnt = dao.deleteMenuAccessGrant(param);
		/* 메뉴 승인 권한 삭제 결과 */
		result.put("DELETE_MENU_GRANT_CNT", delete_menu_grant_cnt);
		
		/* 메뉴 권한 삭제 - TSST_ROLE_MGT */
		int delete_menu_access_cnt = dao.deleteMenuAccess(param);
		/* 메뉴 권한 삭제 결과 */
		result.put("DELETE_MENU_ACCESS_CNT", delete_menu_access_cnt);
		result.put("ROLE_ID", param.get("ROLE_ID"));
		
		return result;
	}
	
	/* 상세 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getMenuAccessInfo(Map param) throws Exception {
		Map result = new HashMap<>();
		result.put("INFO", dao.getMenuAccessInfo(param));
		result.put("GRANT", dao.getMenuAccessGrant(param));
		return result;
	}

}
