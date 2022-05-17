package module.com.com_0304;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;


@Component("Com_0304DaoImpl")
public class Com_0304DaoImpl extends AbstractDAO {

	public Com_0304DaoImpl() {
		super.namespace = "general.Com0304";
	}

	public List getPlanList(Map param) throws Exception {
		return list("getAll", param);
	}

	public Map getPlanInfoByPid(Map param) throws Exception {
		return map("getPlanInfoByPid", param);
	}

	public Map getPlanCnt(Map param) throws Exception {
		return map("getPlanCnt", param);
	}

	public int updatePlan(Map param) throws Exception {
		return (int) update("updatePlan", param);
	}

	public int deletePlan(Map param) throws Exception {
		return (int) delete("deletePlan", param);
	}

	public int insertPlan(Map map) throws Exception {
		return (int) insert("insertPlan", map);
	}
}