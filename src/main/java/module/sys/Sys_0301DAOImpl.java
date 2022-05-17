package module.sys;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

/**
 *  
 * @ Create date  : Sep 11, 2019 
 * @ Author     : anhpv
 * @ Description :
 * @ Status: TO-DO, DEBUG, TEST, COMPLETE  
 */
@Component("Sys_0301DAOImpl")
public class Sys_0301DAOImpl extends AbstractDAO {

	public Sys_0301DAOImpl() 
	{
		super.namespace = "sys.sys0301";
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getCompanyList() throws Exception {
		List<Map<String, Object>> result = (List<Map<String, Object>>) list("getCompany");
		if (result == null) result = new ArrayList<>();
		
		return result;
	}
	
}
