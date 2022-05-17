package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Safety_0500DAOImpl")
public class Safety_0500DAOImpl extends AbstractDAO {

	public Safety_0500DAOImpl() {
		super.namespace = "safety.safety_0500";
	}

	public List list(Map<String, Object> param) throws Exception {
		return list("search", param);
	}

	public Map get(Map<String, Object> param) throws Exception {
		return map("get", param);
	}

	public Map count(Map<String, Object> param) throws Exception {
		return map("count", param);
	}

	public int insert(Map<String, Object> params) throws Exception {
		return (int) insert("insert", params);
	}

	public int update(Map<String, Object> param) throws Exception {
		return (int) update("update", param);
	}

	public int delete(Map<String, Object> param) throws Exception {
		return (int) delete("delete", param);
	}
	
	public int insertEduFile(Map param) throws Exception {
		return (int) insert("insertEduFile", param);
	}
	
	public int dropEduFile(Map param) throws Exception {
		return (int) delete("dropEduFile", param);
	}
	
	public List getFile(Map<String, Object> param) throws Exception {
		return list("getFile", param);
	}
	
	public int deleteFile(Map param) throws Exception {
		return (int) delete("deleteFile", param);
	}
	
	public List getFiles(Map param) throws Exception {
		return list("getFiles", param);
	}
	
}