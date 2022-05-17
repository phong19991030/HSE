package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0500DAOImpl")
public class Sys_0500DAOImpl extends AbstractDAO {

	public Sys_0500DAOImpl() {
		super.namespace = "sys_new.sys0500";
	}

	/* 리스트 */
	public List getCompanyList(Map param) throws Exception{
		return list("getCompanyList", param);
	}
	public Map getCompanyCnt(Map param) throws Exception{
		return map("getCompanyCnt", param);
	}
	
	/* 등록, 수정, 삭제 */
	public int insertCompany(Map param) throws Exception {
		return (int) insert("insertCompany", param);
	}
	public int updateCompany(Map param) throws Exception {
		return (int) update("updateCompany", param);
	}
	public int deleteCompany(Map param) throws Exception {
		return (int) delete("deleteCompany", param);
	}
	
	/* 상세 */
	public Map getCompanyInfo(Map param) throws Exception{
		return map("getCompanyInfo", param);
	}
}
