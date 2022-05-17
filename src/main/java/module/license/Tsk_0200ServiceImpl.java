package module.license;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import module.com.com_0001.Com_0001ServiceImpl;


@Service("Tsk_0200ServiceImpl")
public class Tsk_0200ServiceImpl {
	
	@Autowired
	private Tsk_0200DaoImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
//	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
//	public List getRiskAssessmentList(Map param) throws Exception {
//		Map search =  (Map) param.get("search");
//        if( search != null) {
//        	param.putAll(search);
//        }
//        return dao.getRiskAssessmentList(param);
//	}
	
	public Map getRiskAssessmentList(Map<String, Object> args) throws Exception {
		Map cnt = dao.getRiskAssessmentCnt(args);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getRiskAssessmentList(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
		
	}
	
	public Map getRiskAssessmentList2(Map<String, Object> args) throws Exception {
		Map cnt = dao.getRiskAssessmentCnt2(args);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getRiskAssessmentList2(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
		
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Map<String, Object> insert(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map result = new HashMap<>();
		
		try {
			int insertRiskAssessmentCnt = dao.insert(args);
			result.put("INSERT_RISK_ASSESSMENT", insertRiskAssessmentCnt > 0 ? 1 : 0);
        	
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, args, "RISK_ASSESSMENT_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}
		return result;
	}
	
	@Transactional
	public Map<String, Object> update(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		int updateRiskAssessment = dao.update(args);
		result.put("UPDATE_RISK_ASSESSMENT", updateRiskAssessment > 0 ? 1 : 0);
		return result;
	}
	
	
	@Transactional
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> args) throws Exception {
		
		Map result = new HashMap();
        boolean isDelete = false;
        try {
            int delete_license_cnt = dao.delete(args);
            result.put("DELETE_RISK_ASSESSMENT", delete_license_cnt > 0 ? 1 : 0);
            isDelete = delete_license_cnt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, args, "RISK_ASSESSMENT_ID");
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
	
	public Map<String, Object> getRiskAssessmentInfo(Map<String, Object> args) throws Exception {
		return dao.getRiskAssessmentInfo(args);
	}

}
