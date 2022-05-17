package module.res;

import infrastructure.inheritance.service.AbstractService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import applications.util.AjaxResult;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Res_0004ServiceImpl")
@Transactional
public class Res_0004ServiceImpl extends AbstractService {
	@Autowired
	public Res_0004DAOImpl dao;

	public Res_0004ServiceImpl() {
		super.name = "Res_0004ServiceImpl";
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List getList(Map param) throws Exception {
		Map search = (Map) param.get("search");
		if (search != null) {
			param.putAll(search);
		}
		return dao.getList(param);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map get(Map param) throws Exception {
		return dao.get(param);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_res_cnt = dao.delete(param);
			result.put("DELETE_RES_CNT", delete_res_cnt > 0 ? 1 : 0);
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
		int update_res_cnt = dao.update(param);
		result.put("UPDATE_USER_CNT", update_res_cnt > 0 ? 1 : 0);
		return result;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map insert(Map param) throws Exception {
		Map resultMap = new HashMap();
		int insert_resource_cnt = dao.insert(param);
		resultMap.put("INSERT_RESOURCE_CNT", insert_resource_cnt > 0 ? 1 : 0);
		return resultMap;
	}
}