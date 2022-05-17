package module.dashboard;

import java.util.List;
import java.util.Map;

import infrastructure.inheritance.dao.AbstractDAO;

import org.springframework.stereotype.Repository;

@Repository("Dsb_0100DAOImpl")
public class Dsb_0100DAOImpl extends AbstractDAO {

	public Dsb_0100DAOImpl() {
		super.namespace = "dsb.dsb0100";
	}
	
	/**
	 * 권한에 따른 발전단지 목록 조회
	 * @param param(사용자 권한)
	 * @return Wind farm list
	 */
	public List getFarmByRole(Map param) throws Exception {
		return list("getFarmByRole", param);
	}
	
	/**
	 * 발전단지의 그룹 조회 (사용자 권한)
	 * @param param(farm_id, user_uid)
	 * @return Wind Group's list by farm
	 */
	public List getGroupByFarm(Map param) throws Exception {
		return list("getGroupByFarm", param);
	}
	
	/**
	 * 그룹의 발전기 조회 (사용자 권한)
	 * @param param(group_id, user_uid)
	 * @return Wind Turbine's list by group
	 */
	public List getTurbineByGroup(Map param) throws Exception {
		return list("getTurbineByGroup", param);
	}
	
	
	public List getAlarmList(Map param) throws Exception {
		return list("getAlarmList", param);
	}
	
	public List getSensorErrorList(Map param) throws Exception {
		return list("getSensorErrorList", param);
	}
	
	public List getStockList(Map param) throws Exception {
		return list("getStockList", param);
	}
	
	public List getScheduleList(Map param) throws Exception {
		return list("getScheduleList", param);
	}
	
	public Map getProduction(Map param) throws Exception {
		return map("getProduction", param);
	}
}
