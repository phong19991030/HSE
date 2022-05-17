package module.sys_new;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import infrastructure.inheritance.service.AbstractService;
import module.util.FileUtil;

@Service("Sys_new_0200ServiceImpl")
public class Sys_0200ServiceImpl extends AbstractService{

	@Autowired
	Sys_0200DAOImpl dao;
	
	/* 리스트 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		Map cnt = dao.getTurbineCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getTurbineList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getManufacturerList(Map param) throws Exception{
		return dao.getManuFacturerList(param);
	}
	
	/* 팝업 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getFarmList(Map param) throws Exception{
		return dao.getFarmList(param);
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getCompanyList(Map param) throws Exception{
		return dao.getCompanyList(param);
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getTurbineModelList(Map param) throws Exception{
		return dao.getTurbineModelList(param);
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List duplicateCheckTurbineID(Map param) throws Exception {
		return dao.duplicateCheckTurbineID(param);
	}
	/* 등록, 수정, 삭제 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		/* 터빈 추가 - WT_GERATOR */
		int insert_turbine_cnt = dao.insertTurbine(param);
		/* 회사 추가 결과 */
		result.put("INSERT_TURBINE_CNT", insert_turbine_cnt > 0 ? 1 : 0);
		result.put("GERATOR_ID", param.get("GERATOR_ID"));
		
		return result;
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 터빈 수정 - WT_GERATOR */
		int update_turbine_cnt = dao.updateTurbine(param);
		/* 회사 추가 결과 */
		result.put("UPDATE_TURBINE_CNT", update_turbine_cnt > 0 ? 1 : 0);
		result.put("GERATOR_ID", param.get("GERATOR_ID"));
		
		return result;
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_turbine_cnt = dao.deleteTurbine(param);
			result.put("DELETE_TURBINE_CNT", delete_turbine_cnt > 0 ? 1 : 0);
			isDelete = delete_turbine_cnt > 0 ? true : false;
		} 
		// 무결성 제약조건(참조키 존재)
		catch (SQLIntegrityConstraintViolationException | DataIntegrityViolationException e) {
			isDelete = false;
			result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
		}
		result.put("IS_DELETE", isDelete);
		return result;
	}
	/* 상세 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getTurbineInfo(Map param) throws Exception {
		return dao.getTurbineInfo(param);
	}


}
