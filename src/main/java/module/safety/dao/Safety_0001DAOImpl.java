package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Safety_0001DAOImpl")
public class Safety_0001DAOImpl extends AbstractDAO {
	
	public Safety_0001DAOImpl() {
		super.namespace = "sft.sft_0001";
		// TODO Auto-generated constructor stub
	}
	
	public Map getToolCnt(Map param) throws Exception{
		return map("getToolCnt", param);
	}

	public List getToolList(Map param) throws Exception {
		return list("getToolList", param);
	}
	
	public int updateTool(Map param) throws Exception {
		return (int) update("updateTool", param);
	}

	public int insertTool(Map param) throws Exception {
		return (int) insert("insertTool", param);
	}
	
	public int deleteTool(Map param) throws Exception {
		return (int) delete("deleteTool", param);
	}
	
	public Map getToolDetail(Map<Object, Object> param) throws Exception {
		return map("getToolDetail", param);
	}
	
	public List getToolHistorys(Map param) throws Exception {
		return list("getToolHistorys", param);
	}
	
	public int insertToolHistory(List list) throws Exception {
		return (int) insert("insertToolHistory", list);
	}
	
	public int updateToolHistory(List list) throws Exception {
		return (int) update("updateToolHistory", list);
	}
	
	public int deleteToolHis(Map param) throws Exception {
		return (int) delete("deleteToolHis", param);
	}
	
	public int insertToolFile(Map param) throws Exception {
		return (int) insert("insertToolFile", param);
	}

	public List getToolFiles(Map param) throws Exception {
		return list("getToolFiles", param);
	}
	
	public int deleteToolFile(Map param) throws Exception {
		return (int) delete("deleteToolFile", param);
	}
	
	public int deleteToolFileWithId(Map param) throws Exception {
		return (int) delete("deleteToolFileWithId", param);
	}
	
	public List getAllToolList(Map param) throws Exception {
		return list("getAllToolList", param);
	}
	
	public List getToolType() throws Exception{
		return list("getToolType");
	}
	
	public List getBrandsByToolType(Map param) throws Exception{
		return list("getBrandsByToolType",param);
	}
	
}
