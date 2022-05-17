package module.com.com_0201;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Com_0201DAOImpl")
public class Com_0201DAOImpl extends AbstractDAO{
	
	public Com_0201DAOImpl() {
		super.namespace = "com_0201.Com_0201";
		// TODO Auto-generated constructor stub
	}
	
	
	public List getListTurbine(Map<Object, Object> param) throws Exception{
		return list("getListTurbine", param);
	}
	
	public Map getListTurbineCnt(Map<Object, Object> param) throws Exception{
		return map("getListTurbineCnt", param);
	}
	
	public Map getTurbineDetail(Map<Object, Object> param) throws Exception{
		return map("getTurbineDetail", param);
	}
	
	public List getListFarm() throws Exception{
		return list("getListFarm");
	}
	
	public int updateTurbine(Map<Object, Object> param) throws Exception{
		return (int) update("updateTurbine", param);
	}
	public int insertTurbine(Map<Object, Object> param) throws Exception{
		return (int) insert("insertTurbine", param);
	}
	
	public int deleteTurbine(Map<Object, Object> param) throws Exception{
		return (int) delete("deleteTurbine", param);
	}
}
