package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0200DAOImpl")
public class Sys_0200DAOImpl extends AbstractDAO{

	public Sys_0200DAOImpl() {
		super.namespace = "sys_new.sys0200";
	}
	/* 리스트 */
	public List getTurbineList(Map param) throws Exception{
		return list("getTurbineList", param);
	}
	public Map getTurbineCnt(Map param) throws Exception{
		return map("getTurbineCnt", param);
	}
	public List getManuFacturerList(Map param) throws Exception{
		return list("getManuFacturerList", param);
	}
	/* 팝업 */
	public List getFarmList(Map param) throws Exception{
		return list("getFarmList", param);
	}
	public List getCompanyList(Map param) throws Exception{
		return list("getCompanyList", param);
	}
	public List getTurbineModelList(Map param) throws Exception{
		return list("getTurbineModelList", param);
	}
	public List duplicateCheckTurbineID(Map param) throws Exception{
		return list("duplicateCheckTurbineID", param);
	}
	/* 등록, 수정, 삭제 */
	public int insertTurbine(Map param) throws Exception {
		return (int) insert("insertTurbine", param);
	}
	public int updateTurbine(Map param) throws Exception {
		return (int) update("updateTurbine", param);
	}
	public int deleteTurbine(Map param) throws Exception {
		return (int) delete("deleteTurbine", param);
	}
	/* 상세 */
	public Map getTurbineInfo(Map param) throws Exception{
		return map("getTurbineInfo", param);
	}

}
