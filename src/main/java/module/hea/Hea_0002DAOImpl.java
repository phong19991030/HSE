package module.hea;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Hea_0002DAOImpl")
public class Hea_0002DAOImpl extends AbstractDAO{
	
	public Hea_0002DAOImpl() {
		super.namespace = "hea.hea0002";
	}
	
	public List getListEmpHealth(Map<String, Object> params) throws Exception {
		return list("getListEmpHealth", params);
	}
	
	public Map getDetailInfo(Map<String, Object> params) throws Exception {
		return map("getDetailInfo", params);
	}
	
	public int insert(Map<String, Object> params) throws Exception {
		return (int) insert ("insert", params);
	}
	
	public int update(Map<String, Object> params) throws Exception {
		return (int) update ("update", params);
	}
	
	public int delete(Map<String, Object> params) throws Exception {
		return (int) delete ("delete", params);
	}
	
	public Map getEmpHealthCnt(Map<String, Object> params) throws Exception {
		return map("getEmpHealthCnt", params);
	}
	
//	public List getDiseasesByEmpHealth(Map<String, Object> params) throws Exception {
//		return list("getDiseasesByEmpHealth", params);
//	}
//	
//	public int insertDisease(Map<String, Object> params) throws Exception {
//		return (int) insert ("insertDisease", params);
//	}
//	
//	public int updateDisease(Map<String, Object> params) throws Exception {
//		return (int) update ("updateDisease", params);
//	}
//	
//	public int deleteDisease(Map<String, Object> params) throws Exception {
//		return (int) delete ("deleteDisease", params);
//	}
//	
//	public int deleteDiseaseByHealthId(Map<String, Object> params) throws Exception {
//		return (int) delete ("deleteDiseaseByHealthId", params);
//	}
	
	public Map duplicateCheckEmpNo(Map<String, Object> params) throws Exception {
		return map ("duplicateCheckEmpNo", params);
	}
	public int insertHealthFile(Map param) throws Exception {
		return (int) insert("insertHealthFile", param);
	}

	public List getFile(Map<String, Object> param) throws Exception {
		return list("getFile", param);
	}
	
	public int deleteHealthFile(Map param) throws Exception {
		return (int) delete("deleteHealthFile", param);
	}
	
	public int deleteHealthFileWithId(Map param) throws Exception {
		return (int) delete("deleteHealthFileWithId", param);
	}
}
