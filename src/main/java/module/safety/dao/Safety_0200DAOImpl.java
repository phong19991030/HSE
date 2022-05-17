package module.safety.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Safety_0200DAOImpl")
public class Safety_0200DAOImpl extends AbstractDAO {

	public Safety_0200DAOImpl() {
		super.namespace = "safety.safety_0200";
	}

	public List getSafeCourseList(Map param) throws Exception {
		return list("getAll", param);
	}
	
	public List getALlByCompanyId(Map param) throws Exception {
		return list("getALlByCompanyId", param);
	}
	
	public List getUserList(Map param) throws Exception {
		return list("getUserList", param);
	}
	
	public List getProjectList(Map param) throws Exception {
		return list("getProjectList", param);
	}

	public Map getSafeCourseById(Map param) throws Exception {
		return map("getSafeCourseById", param);
	}

	public Map getSafeCourseCnt(Map param) throws Exception {
		return map("getSafeCourseCnt", param);
	}

	public int updateSafeCourse(Map param) throws Exception {
		return (int) update("updateSafeCourse", param);
	}

	public int deleteSafeCourse(Map param) throws Exception {
		return (int) delete("deleteSafeCourse", param);
	}

	public int insertSafeCourse(Map map) throws Exception {
		return (int) insert("insertSafeCourse", map);
	}
}
