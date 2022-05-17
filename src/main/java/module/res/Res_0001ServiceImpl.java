package module.res;

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

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Res_0001ServiceImpl")
@Transactional
public class Res_0001ServiceImpl extends AbstractService {
	@Autowired
	public Res_0001DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;

	public Res_0001ServiceImpl() {
		super.name = "Res_0001ServiceImpl";
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getList(Map param) throws Exception {
		Map cnt = dao.countCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map get(Map param) throws Exception {
		return dao.get(param);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map delete(ModelAndView mav, Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_res_cnt = dao.delete(param);
			result.put("DELETE_RES_CNT", delete_res_cnt > 0 ? 1 : 0);
			isDelete = delete_res_cnt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "FIRE_PROTECTION_ID");
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

	@Transactional(propagation = Propagation.REQUIRED)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		int update_res_cnt = dao.update(param);
		result.put("UPDATE_RES_CNT", update_res_cnt > 0 ? 1 : 0);
		return result;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map insert(ModelAndView mav, Map param) throws Exception {
		Map resultMap = new HashMap();
		
		try {
			int insert_resource_cnt = dao.insert(param);
			resultMap.put("INSERT_RES_CNT", insert_resource_cnt > 0 ? 1 : 0);
        	
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "FIRE_PROTECTION_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}
		return resultMap;
	}
}