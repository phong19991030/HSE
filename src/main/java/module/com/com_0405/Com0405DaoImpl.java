package module.com.com_0405;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Com_0405Mgt")
public class Com0405DaoImpl extends AbstractDAO {

	public Com0405DaoImpl() {
		super.namespace = "com.Com_0405";
	}
	
	public List getCompanyList(Map params) throws Exception {
		return list("getCompanyList", params);
	}
	
	public List getAllCompanys(Map params) throws Exception {
		return list("getAllCompanys", params);
	}
	
	public Map getCompanyCnt(Map param) throws Exception{
		return map("getCompanyCnt", param);
	}
	
	public Map getCompanyInfo(Map<String, Object> params) throws Exception {
		return map("getCompanyInfo", params);
	}
	
	public int insertCompany(Map<String, Object> params) throws Exception {
		return (int) insert ("insertCompany", params);
	}
	
	public int updateCompany(Map<String, Object> params) throws Exception {
		return (int) update ("updateCompany", params);
	}
	
	public int deleteCompany(Map params) throws Exception {
		return (int) delete ("deleteCompany", params);
	}

}
