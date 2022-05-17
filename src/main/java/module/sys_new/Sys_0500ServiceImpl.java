package module.sys_new;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import infrastructure.inheritance.service.AbstractService;
import module.util.FileUtil;

@Service("Sys_new_0500ServiceImpl")
public class Sys_0500ServiceImpl extends AbstractService{

	@Autowired
	Sys_0500DAOImpl dao;
	
	@Autowired 
	private ServletContext servletContext;
	
	/* 리스트 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		Map cnt = dao.getCompanyCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getCompanyList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	/* 등록, 수정 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		/* 회사 추가 - WT_COMPANY, TCCO_FILE */
		int insert_company_cnt = dao.insertCompany(param);
		/* 회사 추가 결과 */
		result.put("INSERT_COMPANY_CNT", insert_company_cnt > 0 ? 1 : 0);
		result.put("COMPANY_ID", param.get("COMPANY_ID"));
		
		Map file = (Map) param.get("LOGO");
		// 파일 업로드 
		FileUtil.uploadFile((MultipartFile) file.get("FILE"), 
				file.get("ROOT_PATH").toString() + file.get("LAST_PATH").toString(), 
				file.get("UNIQUE_NAME").toString());
		// return 시 에러 
		file.remove("FILE");
		/* 회사 로고 추가 결과 */
		result.put("LOGO", file);
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		/* 회사 추가 - WT_COMPANY, TCCO_FILE */
		int update_company_cnt = dao.updateCompany(param);
		/* 회사 추가 결과 */
		result.put("UPDATE_COMPANY_CNT", update_company_cnt > 0 ? 1 : 0);
		result.put("COMPANY_ID", param.get("COMPANY_ID"));
		
		// 기존 파일 삭제 
		String rootPath = FileUtil.getFileDirRootPath(servletContext);
		String childPath = FileUtil.replaceToServerSeparator(param.get("FLE_PATH").toString());
		FileUtil.deleteFile(rootPath + childPath, param.get("NEW_FLE_NM").toString());
		
		Map file = (Map) param.get("LOGO");
		// 신규 파일 업로드 
		FileUtil.uploadFile((MultipartFile) file.get("FILE"), 
				file.get("ROOT_PATH").toString() + file.get("LAST_PATH").toString(), 
				file.get("UNIQUE_NAME").toString());
		// return 시 에러 
		file.remove("FILE");
		/* 회사 로고 추가 결과 */
		result.put("LOGO", file);
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_company_cnt = dao.deleteCompany(param);
			result.put("DELETE_COMPANY_CNT", delete_company_cnt > 0 ? 1 : 0);
			isDelete = delete_company_cnt > 0 ? true : false;
		} 
		// 무결성 제약조건(참조키 존재)
		catch (SQLIntegrityConstraintViolationException | DataIntegrityViolationException e) {
			isDelete = false;
			result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
		}
		result.put("IS_DELETE", isDelete);
		
		/* 기존 파일 삭제 */
		if(isDelete) {
			String rootPath = FileUtil.getFileDirRootPath(servletContext);
			String childPath = FileUtil.replaceToServerSeparator(param.get("FLE_PATH").toString());
			FileUtil.deleteFile(rootPath + childPath, param.get("NEW_FLE_NM").toString());
		}
		return result;
	}
	
	/* 상세 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getCompanyInfo(Map param) throws Exception {
		return dao.getCompanyInfo(param);
	}

}
