package module.sys_new;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.ArrangeUtil;

@Service("Sys_new_0800ServiceImpl")
public class Sys_0800ServiceImpl extends AbstractService{
	
	@Autowired
	Sys_0800DAOImpl dao;

	@Autowired 
	private ServletContext servletContext;
	
	@Autowired
	private UtilService utilService;
	
	/* 리스트 데이터 조회*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getMenuList(Map param) throws Exception{
		return ArrangeUtil.sortMapList(dao.getMenuList(param), "MENU_ID", "UP_MENU_ID", "LEV");
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		/* 메뉴 추가 - TSST_MENU_MGT */
		int insert_menu_cnt = dao.insertMenu(param);
		/* 메뉴 추가 결과 */
		result.put("INSERT_MENU_CNT", insert_menu_cnt > 0 ? 1 : 0);
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 메뉴 수정 - TSST_MENU_MGT */
		int update_menu_cnt = dao.updateMenu(param);
		/* 메뉴 수정 결과 */
		result.put("UPDATE_MENU_CNT", update_menu_cnt > 0 ? 1 : 0);
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_menu_cnt = dao.deleteMenu(param);
			result.put("DELETE_MENU_CNT", delete_menu_cnt > 0 ? 1 : 0);
			isDelete = delete_menu_cnt > 0 ? true : false;
		} 
		// 무결성 제약조건(참조키 존재)
		catch (SQLIntegrityConstraintViolationException | DataIntegrityViolationException e) {
			isDelete = false;
			result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
		}
		result.put("IS_DELETE", isDelete);
		return result;
	}
}
