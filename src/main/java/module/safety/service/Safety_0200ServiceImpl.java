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
import module.safety.dao.Safety_0200DAOImpl;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Safety_0200ServiceImpl")
@Transactional
public class Safety_0200ServiceImpl extends AbstractService {

	@Autowired
	public Safety_0200DAOImpl dao;

	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	public Safety_0200ServiceImpl() {
		super.name = "Safety_0200ServiceImpl";
	}
	private int cnt;
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getSafeCourseList(Map param) throws Exception {
		Map cnt = dao.getSafeCourseCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getSafeCourseList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;

	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getALlByCompanyId(Map param) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getALlByCompanyId(param);
		map.put("LIST", list);
		return map;

	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List getUserList(Map param) throws Exception {
		return dao.getUserList(param);
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List getProjectList(Map param) throws Exception {
		
		return dao.getProjectList(param);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getSafeCourseById(Map param) throws Exception {
		return dao.getSafeCourseById(param);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map delete(ModelAndView mav, Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_res_cnt = dao.deleteSafeCourse(param);
			result.put("DELETE_RES_CNT", delete_res_cnt > 0 ? 1 : 0);
			isDelete = delete_res_cnt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "SAFE_COURSE_ID");
		}
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
		int update_res_cnt = dao.updateSafeCourse(param);
		result.put("UPDATE_USER_CNT", update_res_cnt > 0 ? 1 : 0);
		return result;
	}

	@Transactional(rollbackFor = Exception.class)
	public Map insertTrainingCourse(ModelAndView mav, Map param) throws Exception {
		Map resultMap = new HashMap();
		
		try {
			int insert_resource_cnt = dao.insertSafeCourse(param);
			resultMap.put("INSERT_USER_CNT", insert_resource_cnt > 0 ? 1 : 0);
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "SAFE_COURSE_ID");
		}catch (Exception e) {
			throw new RuntimeException();
		}
		return resultMap;
	}
}