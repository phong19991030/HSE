package applications.sys;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("sys_0201DAOImpl")
public class Sys_0201DAOImpl extends AbstractDAO {
	
	public Sys_0201DAOImpl() {
		super.namespace = "sys.sys0201";
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getUserManagementAttach(String userId) throws Exception {
		Object result = list(super.getNamespace(), "getUserManagementAttach", userId);
		return (result != null ? (ArrayList<Map<String, Object>>) result : new ArrayList<>(0));
	}

	/* @hy 사용자 관리 상세정보 조회*/
	public Map getUserInfo(Map parameter) throws Exception{
		return map("getUserInfo", parameter);
	}
	
}
