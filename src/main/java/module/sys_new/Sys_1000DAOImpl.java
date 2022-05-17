package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_1000DAOImpl")
public class Sys_1000DAOImpl extends AbstractDAO{

	public Sys_1000DAOImpl() {
		super.namespace = "sys_new.sys1000";
	}

	/* 리스트 데이터 조회 */
	public List getMaintenanceCodeList(Map param) throws Exception{
		return list("getMaintenanceCodeList",param);
	}
	/* 등록 */
	public int insertMaintenanceCode(Map param) throws Exception{
		return (int) insert("insertMaintenanceCode",param);
	}
	/* 수정 */
	public int updateMaintenanceCode(Map param) throws Exception{
		return (int) update("updateMaintenanceCode",param);
	}
	/* 삭제 */
	public int deleteMaintenanceCode(Map param) throws Exception{
		return (int) delete("deleteMaintenanceCode",param);
	}
	/* 중복체크 */
	public Map checkDuplicateMaintenanceCode(Map param) throws Exception{
		return map("checkDuplicateMaintenanceCode",param);
	}
	
}
