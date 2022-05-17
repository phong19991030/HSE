package module.com.com_0405;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service("Com0405ServiceImpl")
public class Com0405ServiceImpl {

	@Autowired
	private Com0405DaoImpl dao;
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getCompanyList(Map<String, Object> args) throws Exception {
        
        Map<String, Object> map = new HashMap<String, Object>();
		Map cnt = dao.getCompanyCnt(args);
		List list = dao.getCompanyList(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
 		map.put("LIST", list);
		return map;
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getAllCompanys(Map<String, Object> args) throws Exception {        
        Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getAllCompanys(args);
		map.put("LIST", list);
		return map;
	}
	
	@Transactional
	public Map<String, Object> updateCompany(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		int updateCompanyMgt = dao.updateCompany(args);
		result.put("UPDATE_COMPANY_MGT", updateCompanyMgt > 0 ? 1 : 0);
		result.put("COMPANY_ID", args.get("COMPANY_ID"));
		return result;
	}
	

	@Transactional
	public Map<String, Object> insertCompany(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		int insertCompanyMgt = dao.insertCompany(args);
		result.put("INSERT_COMPANY_MGT", insertCompanyMgt > 0 ? 1 : 0);
		result.put("COMPANY_ID", args.get("COMPANY_ID"));
		return result;
	}
	
	@Transactional
	public Map<String, Object> deleteCompany(Map args) throws Exception {
		
		Map result = new HashMap();
        boolean isDelete = false;
        try {
        	
            int delete_company_cnt = dao.deleteCompany(args);
            result.put("DELETE_COMPANY_CNT", delete_company_cnt > 0 ? 1 : 0);
            isDelete = delete_company_cnt > 0 ? true : false;
        }
        // 무결성 제약조건(참조키 존재)
        // SQLIntegrityConstraintViolationException |
        catch (DataIntegrityViolationException e) {
            isDelete = false;
            result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
        }
        result.put("IS_DELETE", isDelete);

        return result;
	}

	public Map<String, Object> getCompanyInfo(Map<String, Object> args) throws Exception {
		return dao.getCompanyInfo(args);

	}
}

