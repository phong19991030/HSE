package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0900DAOImpl")
public class Sys_0900DAOImpl extends AbstractDAO {

	public Sys_0900DAOImpl() {
		super.namespace = "sys_new.sys0900";
	}

	/* 리스트 */
	public List getGroupCodeList(Map param) throws Exception{
		return list("getGroupCodeList", param);
	}
	public Map getGroupCodeCnt(Map param) throws Exception{
		return map("getGroupCodeCnt", param);
	}
	
	/* 팝업 */
	public List getTurbineModelList(Map param) throws Exception{
		return list("getTurbineModelList", param);
	}
	public Map duplicateCheckAlarmSubCode(Map param) throws Exception{
		return map("duplicateCheckAlarmSubCode", param);
	}
	
	/* 등록, 수정, 삭제 */
	public int insertAlarmGroupCode(Map param) throws Exception {
		return (int) insert("insertAlarmGroupCode", param);
	}
	public int updateAlarmGroupCode(Map param) throws Exception {
		return (int) update("updateAlarmGroupCode", param);
	}
	public int deleteAlarmGroupCode(Map param) throws Exception {
		return (int) delete("deleteAlarmGroupCode", param);
	}
	public int insertAlarmCode(Map param) throws Exception {
		return (int) insert("insertAlarmCode", param);
	}
	public int updateAlarmCode(Map param) throws Exception {
		return (int) update("updateAlarmCode", param);
	}
	public int deleteAlarmCode(Map param) throws Exception {
		return (int) insert("deleteAlarmCode", param);
	}
	
	
	/* 상세 */
	public Map getAlarmGroupCodeInfo(Map param) throws Exception{
		return map("getAlarmGroupCodeInfo", param);
	}
	public List getAlarmList(Map param) throws Exception{
		return list("getAlarmList", param);
	}
	public Map getAlarmListCnt(Map param) throws Exception{
		return map("getAlarmListCnt", param);
	}
}
