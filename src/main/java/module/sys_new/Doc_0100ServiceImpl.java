package module.sys_new;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CommonUtil;
import module.safety.dao.Safety_0500DAOImpl;
import module.safety.service.Safety_0500ServiceImpl;

@Service("Doc_0100ServiceImpl")
public class Doc_0100ServiceImpl extends AbstractService {
	@Autowired
	Doc_0100DaoImpl dao;
	
	@Autowired
	UtilService utilService;
	

	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map<String, Object> getDocList(Map param) throws Exception {
		Map count = dao.countDoc(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getDocList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", count.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	public Map<String , Object> getDocInfo(Map param) throws Exception{
		return dao.getDocInfo(param);
		
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getDocGroup() throws Exception {
		return dao.getDocGroup();
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception {
		Map result = new HashMap();
		int insert_doc_cnt = dao.insertDoc(param);
		result.put("INSERT_DOC_CNT", insert_doc_cnt > 0 ? 1 : 0);
		result.put("DOC_ID", param.get("DOC_ID"));
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception {
		Map result = new HashMap();
		int update_doc_cnt = dao.updateDoc(param);
		result.put("UPDATE_DOC_CNT", update_doc_cnt > 0 ? 1 : 0);
		result.put("DOC_ID", param.get("DOC_ID"));
		return result;
	}
	
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Map delete(Map param) throws Exception {
		
		Map docInfo = dao.getDocInfo(param);
		String ATCH_FLE_SEQ = CommonUtil.getMapValue(docInfo, "FILE_ID", "");
		param.put("ATCH_FLE_SEQ", ATCH_FLE_SEQ);
		Map fileInfo = dao.getFileInfo(param);
		String filePath = CommonUtil.getMapValue(fileInfo, "FLE_PATH", "");
		Map result = new HashMap();
		boolean isDelete = false;
		
		try {
			utilService.deleteFileUtil(ATCH_FLE_SEQ, filePath);
			utilService.deleteFileFromTCCO_FILE(ATCH_FLE_SEQ);
			int delete_doc_cnt = dao.deleteDoc(param);
			result.put("DELETE_DOC_CNT", delete_doc_cnt > 0 ? 1 : 0);
			isDelete = delete_doc_cnt > 0 ? true : false;
		} 
		// 무결성 제약조건(참조키 존재)
		catch (SQLIntegrityConstraintViolationException | DataIntegrityViolationException e) {
			isDelete = false;
			result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
		}
		result.put("IS_DELETE", isDelete);
		
		return result;
	}
	
}
