package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Safety_0600DAOImpl")
public class Safety_0600DAOImpl extends AbstractDAO {

	public Safety_0600DAOImpl() {
		super.namespace = "safety.safety_0600";
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
}