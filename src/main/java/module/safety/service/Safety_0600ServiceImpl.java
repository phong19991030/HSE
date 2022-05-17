package module.safety.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0600DAOImpl;

@Service("Safety_0600ServiceImpl")
public class Safety_0600ServiceImpl extends AbstractService {

	@Autowired
	private Safety_0600DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;

	public Safety_0600ServiceImpl() {
		super.name = "Safety_0600ServiceImpl";
	}

	public Map list(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> data = dao.list(args);
		
		Map cnt = dao.count(args);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.list(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}

	public Map<String, Object> get(Map<String, Object> args) throws Exception {
		return dao.get(args);
	}

	public Map<String, Object> count(Map<String, Object> args) throws Exception {
		return dao.count(args);
	}

	@Transactional
	public Map<String, Object> insert(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		
		try {
			int insertEmpMgt = dao.insert(args);
			result.put("INSERT_RESULT", insertEmpMgt > 0 ? 1 : 0);
        	
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, args, "SAFE_MGT_ORG_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}
		return result;
	}

	@Transactional
	public Map<String, Object> update(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		int updateEmpMgt = dao.update(args);
		result.put("UPDATE_RESULT", updateEmpMgt > 0 ? 1 : 0);
		return result;
	}

	@Transactional
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		boolean isDelete = false;
		try {
			int deleteEmpMgt = dao.delete(args);
			result.put("DELETE_RES_CNT", deleteEmpMgt > 0 ? 1 : 0);
			isDelete = deleteEmpMgt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, args, "SAFE_MGT_ORG_ID");
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
}
