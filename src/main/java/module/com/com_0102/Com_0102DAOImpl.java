package module.com.com_0102;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Com_0102DAOImpl")
public class Com_0102DAOImpl extends AbstractDAO {

	public Com_0102DAOImpl() {
		super.namespace = "com.com_0102";
		// TODO Auto-generated constructor stub
	}
	
	public List getProjectList(Map param) throws Exception{
		return list("getProjectList", param);
	}
	
	public List getAllProjects(Map param) throws Exception{
		return list("getAllProjects", param);
	}
	
	public List getProjectsByCompanyId(Map param) throws Exception{
		return list("getProjectsByCompanyId", param);
	}
	
	public List getUserList(Map param) throws Exception{
		return list("getUserList", param);
	}
	
	public Map getProjectCnt(Map param) throws Exception{
		return map("getProjectCnt", param);
	}
	
	public Map getProjectInfo(Map param) throws Exception{
		return map("getProjectInfo", param);
	}
	
	public int insertProject(Map param) throws Exception {
		return (int) insert("insertProject", param);
	}
	
	public int updateProject(Map param) throws Exception {
		return (int) update("updateProject", param);
	}
	public int deleteProject(Map param) throws Exception {
		return (int) delete("deleteProject", param);
	}

}
