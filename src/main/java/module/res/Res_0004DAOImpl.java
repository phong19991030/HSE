package module.res;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * 프로그램관리 구현체 기능 : 이력 : 1) 2014. 9. 29. 이한신 최초생성 비고 :
 */
@Component("Res_0004DAOImpl")
public class Res_0004DAOImpl extends AbstractDAO {

	public Res_0004DAOImpl() {
		super.namespace = "res.Res_0004";
	}

	public List getList(Map param) throws Exception {
		return list("getList", param);
	}

	public Map get(Map param) throws Exception {
		return map("get", param);
	}

	public Map countCnt(Map param) throws Exception {
		return map("countCnt", param);
	}

	public int update(Map param) throws Exception {
		return (int) update("update", param);
	}

	public int delete(Map param) throws Exception {
		return (int) delete("delete", param);
	}

	public int insert(Map map) throws Exception {
		return (int) insert("insert", map);
	}
}