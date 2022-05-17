package module.license;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Tsk_0200")
public class Tsk_0200DaoImpl extends AbstractDAO {
	
	public Tsk_0200DaoImpl() {
		super.namespace = "license.Tsk_0200";
	}

	public List getRiskAssessmentList(Map params) throws Exception {
		return list("getRiskAssessmentList", params);
	}
	
	public List getRiskAssessmentList2(Map params) throws Exception {
		return list("getRiskAssessmentList2", params);
	}
	
	public Map getRiskAssessmentCnt(Map<String, Object> param) throws Exception{
		return map("getRiskAssessmentCnt", param);
	}
	
	public Map getRiskAssessmentCnt2(Map<String, Object> param) throws Exception{
		return map("getRiskAssessmentCnt2", param);
	}
	public int insert(Map map) throws Exception {
		return (int) insert ("insertRiskAssessment", map);
	}
	
	public int update(Map<String, Object> params) throws Exception {
		return (int) update ("updateRiskAssessment", params);
	}
	
	public int delete(Map<String, Object> params) throws Exception {
		return (int) delete ("deleteRiskAssessment", params);
	}
	
	public Map getRiskAssessmentInfo(Map<String, Object> params) throws Exception {
		return map("getRiskAssessmentInfo", params);
	}

}
