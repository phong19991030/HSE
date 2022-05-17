package module.com.com_0304;

import infrastructure.inheritance.service.AbstractService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Com_0304ServiceImpl")
@Transactional
public class Com_0304ServiceImpl extends AbstractService {
	@Autowired
	public Com_0304DaoImpl dao;

	public Com_0304ServiceImpl() {
		super.name = "Com_0304ServiceImpl";
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List getPlanList(Map param) throws Exception {
		Map search = (Map) param.get("search");
		if (search != null) {
			param.putAll(search);
		}
		return dao.getPlanList(param);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getResPcccInfo(Map param) throws Exception {
		return dao.getPlanInfoByPid(param);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_res_cnt = dao.deletePlan(param);
			result.put("DELETE_COM_CNT", delete_res_cnt > 0 ? 1 : 0);
			isDelete = delete_res_cnt > 0 ? true : false;
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
		int update_res_cnt = dao.updatePlan(param);
		result.put("UPDATE_COM_CNT", update_res_cnt > 0 ? 1 : 0);
		return result;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map insertPlan(Map param) throws Exception {
		Map resultMap = new HashMap();
		int insert_resource_cnt = dao.insertPlan(param);
		resultMap.put("INSERT_COM_CNT", insert_resource_cnt > 0 ? 1 : 0);
		return resultMap;
	}
}