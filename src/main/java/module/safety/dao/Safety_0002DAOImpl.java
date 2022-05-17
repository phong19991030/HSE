package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Safety_0002DAOImpl")
public class Safety_0002DAOImpl extends AbstractDAO {
	
	public Safety_0002DAOImpl() {
		super.namespace = "sft.sft_0002";
	}

	public Map getListCnt(Map param) throws Exception{
		return map("getListCnt", param);
	}
	
	public List getToolGrantRevokeList(Map<Object, Object> param) throws Exception {
		return list("getToolGrantRevokeList", param);
	}
	
	public int updateToolGrantRevoke(Map param) throws Exception {
		return (int) update("updateToolGrantRevoke", param);
	}

	public int insertToolGrantRevoke(Map param) throws Exception {
		return (int) insert("insertToolGrantRevoke", param);
	}
	
	public int deleteToolGrantRevoke(Map<Object, Object> param) throws Exception {
		return (int) delete("deleteToolGrantRevoke", param);
	}
	
	public Map getToolGrantRevokeDetail(Map<Object, Object> param) throws Exception {
		return map("getToolGrantRevokeDetail", param);
	}
	
	public int insertToolGrantList(Map param) throws Exception {
		return (int) insert("insertToolGrantList", param);
	}
	
	public int insertToolGrantList1(List list) throws Exception {
		return (int) insert("insertToolGrantList1", list);
	}
	
	public int updateToolGrantList(List list) throws Exception {
		return (int) update("updateToolGrantList", list);
	}
	
	public int deleteToolGrantList(Map<Object, Object> param) throws Exception {
		return (int) delete("deleteToolGrantList", param);
	}
	
	public List getToolGrantByGrantId(Map<Object, Object> param) throws Exception {
		return list("getToolGrantByGrantId", param);
	}

}
