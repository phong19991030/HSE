package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;
import module.model.PPE;
import module.model.PPEUser;

@Repository("Safety_0101DAOImpl")
public class Safety_0101DAOImpl extends AbstractDAO {

	public Safety_0101DAOImpl() {
		super.namespace = "sft.sft_0101";
		// TODO Auto-generated constructor stub
	}

	public List getPPEList(Map<Object, Object> param) throws Exception {
		return list("getPPEList", param);
	}
	
	public int updatePPE(Map map) throws Exception {
		return (int) update("updatePPE", map);
	}

	public int insertPPEList(List list) throws Exception {
		return (int) insert("insertPPEList", list);
	}
	
	public int deletePPEList(List list) throws Exception {
		return (int) delete("deletePPEList", list);
	}
	
	public List getPPEDetailByUser(Map<Object, Object> param) throws Exception {
		return list("getPPEDetailByUser", param);
	}
	
	public List getPersEquipmentList(Map<Object, Object> param) throws Exception {
		return list("getPersEquipmentList", param);
	}
	
	public List getSubjectType() throws Exception{
		return list("getSubjectType");
	}
	
	public Map getBrandsByToolType(Map param) throws Exception{
		return map("getBrandsByToolType",param);
	}
	
	public List getStatusType() throws Exception{
		return list("getStatusType");
	}
	
	public Map getPPECnt(Map param) throws Exception{
		return map("getPPECnt", param);
	}

	public List getInspectionListA(Map param) throws Exception {
		return list("getInspectionListA", param);
	}
	public List getInspectionListB(Map param) throws Exception {
		return list("getInspectionListB", param);
	}
	public List getInspectionListC(Map param) throws Exception {
		return list("getInspectionListC", param);
	}
}
