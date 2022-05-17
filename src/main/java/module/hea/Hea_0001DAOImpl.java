package module.hea;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Hea_0001DAOImpl")
public class Hea_0001DAOImpl extends AbstractDAO{
	
	public Hea_0001DAOImpl() {
		super.namespace = "hea.hea0001";
	}
	
	public List getEmpMgtList(Map<String, Object> params) throws Exception {
		return list("getEmpMgtList", params);
	}
	
	public List getEmpListByCompanyId(Map<String, Object> params) throws Exception {
		return list("getEmpListByCompanyId", params);
	}
	
	public List getComList(Map<String, Object> params) throws Exception {
		return list("getComList", params);
	}
	
	public Map getDetailInfo(Map<String, Object> params) throws Exception {
		return map("getDetailInfo", params);
	}
	
	public Map getEmpMgtCnt(Map<String, Object> params) throws Exception {
		return map("getEmpMgtCnt", params);
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
	
	public List getEmpByUidNEmpNo(Map<String, Object> params) throws Exception {
		return list("getEmpByUidNEmpNo", params);
	} 
	
	public int updateUserUIDwithEmpNo(Map<String, Object> params) throws Exception {
		return (int) update("updateUserUIDwithEmpNo", params);
	}
	
//	public int deleteExpr(Map<String, Object> params) throws Exception {
//		return (int) delete ("deleteExpr", params);
//	}
//	
//	public int insertExpr(Map<String, Object> params) throws Exception {
//		return (int) insert ("insertExpr", params);
//	}
//	
//	public int updateExpr(Map<String, Object> params) throws Exception {
//		return (int) update ("updateExpr", params);
//	}
}
