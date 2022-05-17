package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Safety_0300DAOImpl")
public class Safety_0300DAOImpl extends AbstractDAO {

	public Safety_0300DAOImpl() {
		super.namespace = "safety.safety_0300";
	}

	public List getAccidentList(Map param) throws Exception {
		return list("getAccidentList", param);
	}
	
	public List getAccidentsByCompanyId(Map param) throws Exception {
		return list("getAccidentsByCompanyId", param);
	}
	
	public List getCountAccidentsByCompanyIdNMonth(Map param) throws Exception {
		return list("getCountAccidentsByCompanyIdNMonth", param);
	}
	
	public Map getAccidentById(Map<String, Object> param) throws Exception {
		return map("getAccidentById", param);
	}

	public Map getAccidentCnt(Map<String, Object> param) throws Exception {
		return map("getAccidentCnt", param);
	}

	public int insert(Map params) throws Exception {
		return (int) insert("insert", params);
	}
	
	public int update(Map<String, Object> param) throws Exception {
		return (int) update("update", param);
	}

	public int delete(Map<String, Object> param) throws Exception {
		return (int) delete("delete", param);
	}
	
	public int insertAccidentFile(Map param) throws Exception {
		return (int) insert("insertAccidentFile", param);
	}

	public List getAccidentFiles(Map param) throws Exception {
		return list("getAccidentFiles", param);
	}
	
	public int deleteAccidentFile(Map param) throws Exception {
		return (int) delete("deleteAccidentFile", param);
	}
	
	public int deleteAccidentFileWithId(Map param) throws Exception {
		return (int) delete("deleteAccidentFileWithId", param);
	}
	
}