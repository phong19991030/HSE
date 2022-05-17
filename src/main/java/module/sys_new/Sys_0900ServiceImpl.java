
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

import infrastructure.inheritance.service.AbstractService;

@Service("Sys_new_0900ServiceImpl")
public class Sys_0900ServiceImpl extends AbstractService{

	@Autowired
	Sys_0900DAOImpl dao;
	
	@Autowired 
	private ServletContext servletContext;
	
	/* 리스트 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		Map cnt = dao.getGroupCodeCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getGroupCodeList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	/* 팝업 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getTurbineModelList(Map param) throws Exception {
		return dao.getTurbineModelList(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map duplicateCheckAlarmSubCode(Map param) throws Exception {
		return dao.duplicateCheckAlarmSubCode(param);
	}
	
	/* 등록, 수정 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		
		/* 알람 그룹 코드 추가 - WT_ALARM_GR_CD */
		int insert_alarm_group_code_cnt = dao.insertAlarmGroupCode(param);
		
		/* 알람 그룹 코드 추가 결과 */
		result.put("INSERT_ALARM_GROUP_CODE_CNT", insert_alarm_group_code_cnt > 0 ? 1 : 0);
		result.put("WT_ALARM_GR_ID", param.get("WT_ALARM_GR_ID"));
		
		/* 알람 코드 추가 - WT_ALARM_CD */
		int insert_alarm_code_cnt = 0;
		List<Map> list = (List<Map>) param.get("ALARM_LIST");
		for(Map map : list) {
			map.put("WT_ALARM_GR_ID", param.get("WT_ALARM_GR_ID"));
			if(dao.insertAlarmCode(map) > 0) insert_alarm_code_cnt++;
		}
		/* 알람 코드 추가 결과 */
		result.put("INSERT_ALARM_CODE_CNT", insert_alarm_code_cnt);
		result.put("INSERT_ALARM_CODE_LIST", list);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 알람 그룹 코드 수정 - WT_ALARM_GR_CD */
		int update_alarm_group_code_cnt = dao.updateAlarmGroupCode(param);
		/* 알람 그룹 코드 수정 결과 */
		result.put("UPDATE_ALARM_GROUP_CODE_CNT", update_alarm_group_code_cnt > 0 ? 1 : 0);
		result.put("WT_ALARM_GR_ID", param.get("WT_ALARM_GR_ID"));
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			/* 알람 그룹 코드 삭제 - WT_ALARM_GR_CD */
			int delete_alarm_group_code_cnt = dao.deleteAlarmGroupCode(param);
			/* 알람 그룹 코드 삭제 결과 */
			result.put("delete_alarm_group_code_cnt", delete_alarm_group_code_cnt);
			isDelete = delete_alarm_group_code_cnt > 0 ? true : false;
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
	public Map insertAlarmCode(Map param) throws Exception {
		Map result = new HashMap();
		
		/* 알람 코드 추가 - WT_ALARM_CD */
		int insert_alarm_code_cnt = 0;
		List<Map> list = (List<Map>) param.get("ALARM_LIST");
		for(Map map : list) {
			map.put("WT_ALARM_GR_ID", param.get("WT_ALARM_GR_ID"));
			if(dao.insertAlarmCode(map) > 0) insert_alarm_code_cnt++;
		}
		/* 알람 코드 추가 결과 */
		result.put("INSERT_ALARM_CODE_CNT", insert_alarm_code_cnt);
		result.put("INSERT_ALARM_CODE_LIST", list);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map updateAlarmCode(Map param) throws Exception {
		Map result = new HashMap();
		
		/* 알람 코드 추가 - WT_ALARM_CD */
		int update_alarm_code_cnt = 0;
		List<Map> list = (List<Map>) param.get("ALARM_LIST");
		for(Map map : list) {
			if(dao.updateAlarmCode(map) > 0) update_alarm_code_cnt++;
		}
		/* 알람 코드 추가 결과 */
		result.put("UPDATE_ALARM_CODE_CNT", update_alarm_code_cnt);
		result.put("UPDATE_ALARM_CODE_LIST", list);
		
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map deleteAlarmCode(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			/* 알람 그룹 코드 삭제 - WT_ALARM_GR_CD */
			int delete_alarm_code_cnt = dao.deleteAlarmCode(param);
			/* 알람 그룹 코드 삭제 결과 */
			result.put("delete_alarm_code_cnt", delete_alarm_code_cnt);
			isDelete = delete_alarm_code_cnt > 0 ? true : false;
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
	public Map getAlarmGroupCodeInfo(Map param) throws Exception {
		return dao.getAlarmGroupCodeInfo(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getAlarmList(Map param) throws Exception{
		Map cnt = dao.getAlarmListCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getAlarmList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}

}
