package module.safety.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0700DAOImpl;

@Service("Safety_0700ServiceImpl")
public class Safety_0700ServiceImpl extends AbstractService {

	@Autowired
	private Safety_0700DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;

	public Safety_0700ServiceImpl() {
		super.name = "Safety_0700ServiceImpl";
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map list(Map<String, Object> param) throws Exception {	
		Map cnt = dao.count(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.list(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map searchAllByCompanyId(Map<String, Object> param) throws Exception {	
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.searchAllByCompanyId(param);;
		map.put("LIST", list);
		return map;
	}

	public Map<String, Object> get(Map<String, Object> args) throws Exception {
		Map result = new HashMap<>();
		result.putAll(dao.get(args));
		
		result.put("CHECK_LIST", dao.getCheckList(args));
		return result;
	}

	public Map<String, Object> count(Map<String, Object> args) throws Exception {
		return dao.count(args);
	}

	@Transactional
	public Map<String, Object> insert(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();	
		try {
			int insertEmpMgt = dao.insert(args);
			
			Integer safeCheckId = Integer.parseInt(String.valueOf(args.get("SAFE_CHECK_ID")));
			
			result.put("SAFE_CHECK_ID", safeCheckId);
			result.put("INSERT_RESULT", insertEmpMgt > 0 ? 1 : 0);
        	
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, args, "SAFE_CHECK_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}
		return result;
	}
	
	@Transactional
	public Map<String, Object> insertCheckList(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
			 dao.insertCheckList(args);
		return result;
	}

	@Transactional
	public Map<String, Object> update(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		int updateEmpMgt = dao.update(args);
		dao.deleteCheckList(args);//clear check list
		result.put("SAFE_CHECK_ID", args.get("SAFE_CHECK_ID"));
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
            com0001Service.deletePaymentStatus(mav, args, "SAFE_CHECK_ID");
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
