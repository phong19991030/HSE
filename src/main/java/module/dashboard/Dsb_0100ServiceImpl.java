package module.dashboard;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.service.AbstractService;
import module.sys_new.Sys_1100ServiceImpl;

@Service("Dsb_0100ServiceImpl")
public class Dsb_0100ServiceImpl extends AbstractService {
	
	@Autowired
	Dsb_0100DAOImpl dao_ma;	
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	/**
	 * 권한에 따른 발전단지 목록 조회 (Maria)
	 * @param param(사용자 권한)
	 * @return Wind farm list
	 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getFarmByRole(Map param) throws Exception {
		return dao_ma.getFarmByRole(param);
	}
	
	public Map getAccidentAnalysis(Map param) throws Exception {
		Map map = new HashMap();
		Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "REPORT_STATUS");
    	List<Map<Object, Object>> reportTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	map.put("reportTypes", reportTypes);
		return map;
//		return dao_ma.getFarmByRole(param);
	}
	
	/**
	 * 선택한 발전단지의 발전기 목록 조회
	 * @param param(farm_id)
	 * @return Wind Turbine's list by farm
	 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getGroupByFarm(Map param) throws Exception {
		return dao_ma.getGroupByFarm(param);
	}
	
	/**
	 * 선택한 발전단지의 발전기 목록 조회
	 * @param param(farm_id)
	 * @return Wind Turbine's list by farm
	 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getTurbineByGroup(Map param) throws Exception {
		return dao_ma.getTurbineByGroup(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getAlarmList(Map param) throws Exception {
		return dao_ma.getAlarmList(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getSensorErrorList(Map param) throws Exception {
		return dao_ma.getSensorErrorList(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getStockList(Map param) throws Exception {
		return dao_ma.getStockList(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getScheduleList(Map param) throws Exception {
		return dao_ma.getScheduleList(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getProduction(Map param) throws Exception {
		return dao_ma.getProduction(param);
	}
}
