package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Safety_0400DAOImpl")
public class Safety_0400DAOImpl extends AbstractDAO {

	public Safety_0400DAOImpl() {
		super.namespace = "safety.safety_0400";
	}

	public List getEmergResPlanList(Map param) throws Exception {
		return list("getEmergResPlanList", param);
	}
	
	public Map getEmergResPlanCnt(Map param) throws Exception {
		return map("getEmergResPlanCnt", param);
	}
	
	public Map getEmergencyById(Map<String, Object> param) throws Exception {
		return map("getEmergencyById", param);
	}

	public Map count(Map<String, Object> param) throws Exception {
		return map("count", param);
	}

	public int insert(Map<String, Object> params) throws Exception {
		return (int) insert("insert", params);
	}

	public int update(Map param) throws Exception {
		return (int) update("update", param);
	}

	public int delete(Map<String, Object> param) throws Exception {
		return (int) delete("delete", param);
	}
	
	public int inserEmergencyFile(Map param) throws Exception {
		return (int) insert("inserEmergencyFile", param);
	}
	
	public List getEmergencyFiles(Map param) throws Exception {
		return list("getEmergencyFiles", param);
	}
	
	public int deleteEmergencyFile(Map param) throws Exception {
		return (int) delete("deleteEmergencyFile", param);
	}
	
	public int deleteEmergencyFileWithId(Map param) throws Exception {
		return (int) delete("deleteEmergencyFileWithId", param);
	}
}