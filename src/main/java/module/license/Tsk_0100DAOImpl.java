package module.license;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Tsk_0100Mgt")
public class Tsk_0100DAOImpl extends AbstractDAO {
	
	public Tsk_0100DAOImpl() {
		super.namespace = "license.Tsk_0100";
	}

	public List getLicenseList(Map params) throws Exception {
		return list("getLicenseList", params);
	}
	
	public List getLicenseListByCompanyId(Map params) throws Exception {
		return list("getLicenseListByCompanyId", params);
	}
	public Map getLicenseInfo(Map<String, Object> params) throws Exception {
		return map("getLicenseInfo", params);
	}
	
	public int insert(Map<String, Object> params) throws Exception {
		return (int) insert ("insertLicense", params);
	}
	
	public int update(Map<String, Object> params) throws Exception {
		return (int) update ("updateLicense", params);
	}
	
	public int deleteLicense(Map params) throws Exception {
		return (int) delete ("deleteLicense", params);
	}
	
	public int insertLicenseTool(List list) throws Exception {
		return (int) insert("insertLicenseTool", list);
	}
	
	public int insertLicenseWork(List list) throws Exception {
		return (int) insert("insertLicenseWork", list);
	}
	
	public int deleteLicenseTool(Map param) throws Exception {
		return (int) delete("deleteLicenseTool", param);
	}
	
	public int deleteLicenseWork(Map param) throws Exception {
		return (int) delete("deleteLicenseWork", param);
	}
	
	public List getLicenseToolList(Map params) throws Exception {
		return list("getLicenseToolList", params);
	}
	
	public List getLicenseWorkList(Map params) throws Exception {
		return list("getLicenseWorkList", params);
	}
	
	public Map getLicenseCnt(Map param) throws Exception {
		return map("getLicenseCnt", param);
	}
}
