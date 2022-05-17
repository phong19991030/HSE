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

@Service("Sys_new_1100ServiceImpl")
public class Sys_1100ServiceImpl extends AbstractService{
	
	@Autowired
	Sys_1100DAOImpl dao;

	@Autowired 
	private ServletContext servletContext;
	
	@Autowired
	private UtilService utilService;
	
	/* 리스트 데이터 조회*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getComCodeList(Map param) throws Exception{
		return ArrangeUtil.sortMapList(dao.getComCodeList(param), "COMM_CD", "UP_COMM_CD", "LEV");
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getComCodeListByComm_Cd(Map param) throws Exception{
		return dao.getComCodeListByComm_Cd(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		/* 메뉴 추가 - TSST_MENU_MGT */
		int insert_menu_cnt = dao.insertComCode(param);
		/* 메뉴 추가 결과 */
		result.put("INSERT_CODE_CNT", insert_menu_cnt > 0 ? 1 : 0);
		result.put("COMM_CD", param.get("COMM_CD"));
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 메뉴 수정 - TSST_MENU_MGT */
		int update_menu_cnt = dao.updateComCode(param);
		/* 메뉴 수정 결과 */
		result.put("UPDATE_CODE_CNT", update_menu_cnt > 0 ? 1 : 0);
		result.put("COMM_CD", param.get("COMM_CD"));
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_code_cnt = dao.deleteComCode(param);
			result.put("DELETE_CODE_CNT", delete_code_cnt > 0 ? 1 : 0);
			isDelete = delete_code_cnt > 0 ? true : false;
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
	public Map checkDuplicateComCode(Map param) throws Exception {
		return dao.checkDuplicateComCode(param);
	}
}
