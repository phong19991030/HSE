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

import infrastructure.inheritance.service.AbstractService;

@Service("Sys_new_0100ServiceImpl")
public class Sys_0100ServiceImpl extends AbstractService {

	@Autowired
	Sys_0100DAOImpl dao;
	
	/*발전단지 리스트 조회*/
	public Map getFarmList(Map param) throws Exception{
		Map cnt = dao.getFarmCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = dao.getFarmList(param);
		
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	public Map getPopupList(Map param) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = dao.getPopupList(param);
		map.put("LIST", list);
		return map;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map duplicateCheck(Map param) throws Exception {
		Map result = new HashMap();
		if(param.get("PROCESS").equals("FARM")) result = dao.duplicateCheckOfFarmName(param); 
		else if(param.get("PROCESS").equals("GROUP")) result = dao.duplicateCheckOfGroupName(param);
		return result;
	}

	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insertFarm(Map param) throws Exception{
		Map result = new HashMap();
		
		//FARM
		int insertFarmCnt = dao.insertFarm(param);
		result.put("FARM_ID", param.get("FARM_ID"));
		result.put("INSERT_FARM_CNT", insertFarmCnt > 0 ? 1 : 0);
		
		//COMPANY
		int insert_company_cnt = 0;
		List<Map> company_list = (List<Map>) param.get("COMPANY_LIST");
		for(Map company : company_list) {
			company.put("FARM_ID", param.get("FARM_ID"));
			if(dao.insertFarmOper(company) > 0) insert_company_cnt++;
		}
		result.put("INSERT_COMPANY_CNT", insert_company_cnt);
		
		//GROUP
		int insert_group_cnt = 0;
		List<Map> group_list = (List<Map>) param.get("GROUP_LIST");
		
		// 기본 NO GROUP 추가
		Map no_group = new HashMap<>();
		no_group.put("FARM_ID", param.get("FARM_ID"));
		no_group.put("GROUP_NM", "NO GROUP");
		if(dao.insertFarmGroup(no_group) > 0) insert_group_cnt++;
		
		// GROUP 리스트 추가
		for(Map group : group_list) {
			group.put("FARM_ID", param.get("FARM_ID"));
			if(dao.insertFarmGroup(group) > 0) insert_group_cnt++;
		}
		result.put("INSERT_GROUP_CNT", insert_group_cnt);
		return result;
	}

	/*발전단지 상세화면 조회*/
	public Map getFarmInfo(Map param) throws Exception{
		return dao.getFarmInfo(param);
	}

	/*발전단지 수정*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map updateFarm(Map param) throws Exception{
		Map result = new HashMap();
		
		// 발전단지 수정  
		int update_farm_cnt = dao.updateFarm(param);
		
		// 발전단지 수정 결과 
		result.put("FARM_ID", param.get("FARM_ID"));
		result.put("UPDATE_FARM_CNT", update_farm_cnt);
		
		// 운영사 삭제 
		int delete_company_cnt = dao.deleteFarmOper(param);
		// 운영사 삭제 결과
		result.put("DELETE_COMPANY_CNT", delete_company_cnt);
		
		// 운영사 추가 
		int insert_company_cnt = 0;
		List<Map> company_list = (List<Map>) param.get("COMPANY_LIST");
		for(Map company : company_list) {
			company.put("FARM_ID", param.get("FARM_ID"));
			if(dao.insertFarmOper(company) > 0) insert_company_cnt++;
		}
		// 운영사 추가 결과
		result.put("INSERT_COMPANY_CNT", insert_company_cnt);
		
		// 그룹 추가, 수정, 삭제 
		int insert_group_cnt = 0;
		int update_group_cnt = 0;
		int delete_group_cnt = 0;
		List<Map> group_list = (List<Map>) param.get("GROUP_LIST");
		for(Map group : group_list) {
			group.put("FARM_ID", param.get("FARM_ID"));
			
			if(group.get("PROCESS").equals("INSERT")) {
				if(dao.insertFarmGroup(group) > 0) insert_group_cnt++;
			}
			if(group.get("PROCESS").equals("UPDATE")) {
				if(dao.updateFarmGroup(group) > 0) update_group_cnt++;
			}
			if(group.get("PROCESS").equals("DELETE")) {
				// 현재 그룹에 속한 발전기 => NO GROUP 으로 이동 
				List<Map> turbine_list = (List<Map>) group.get("TURBINE_LIST");
				for(Map turbine : turbine_list) {
					turbine.put("GROUP_ID", param.get("NO_GROUP_ID"));
					dao.updateTurbine(turbine);
				}
				// 그룹 삭제 
				if(dao.deleteFarmGroup(group) > 0) delete_group_cnt++;
			}
		}
		// 그룹 추가, 수정, 삭제 결과
		result.put("INSERT_GROUP_CNT", insert_group_cnt);
		result.put("UPDATE_GROUP_CNT", update_group_cnt);
		result.put("DELETE_GROUP_CNT", delete_group_cnt);
		
		return result;
	}
	
	/*발전단지 삭제*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map deleteFarm(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			//발전단지 정보 삭제
			int delete_farm_cnt = dao.deleteFarm(param);
			result.put("DELETE_FARM_CNT", delete_farm_cnt > 0 ? 1 : 0);
			isDelete = delete_farm_cnt > 0 ? true : false;
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
