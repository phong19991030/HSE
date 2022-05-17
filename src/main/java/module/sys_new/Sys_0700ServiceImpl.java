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

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import module.util.FileUtil;

@Service("Sys_new_0700ServiceImpl")
public class Sys_0700ServiceImpl extends AbstractService{
	
	@Autowired
	Sys_0700DAOImpl dao;

	@Autowired 
	private ServletContext servletContext;
	
	@Autowired
	private UtilService utilService;
	
	/* 리스트 데이터 조회*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true) 
	public Map getRowList(Map param) throws Exception{
		Map cnt = dao.getNoticeCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getNoticeList(param);
		 
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getRegisterList(Map param) throws Exception{
		return dao.getRegisterList(param);
	}
	
	/* 등록 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map insert(Map param) throws Exception{
		Map result = new HashMap();
		/* 공지사항 추가 - WT_NOTICE, TCCO_FILE */
		int insert_notice_cnt = dao.insertNotice(param);
		/* 공지사항 추가 결과 */
		result.put("INSERT_NOTICE_CNT", insert_notice_cnt > 0 ? 1 : 0);
		result.put("NOTICE_ID", param.get("NOTICE_ID"));
		
		// 파일 업로드
		Map file = (Map) param.get("ATCH_FILE");
		if(file != null) {
			FileUtil.uploadFile((MultipartFile) file.get("FILE"),
					file.get("ROOT_PATH").toString() + file.get("LAST_PATH").toString(),
					file.get("UNIQUE_NAME").toString());
			//return 시 에서
			file.remove("FILE");
			/* 공지사항 첨부파일 추가 결과 */
			result.put("ATCH_FILE", file);
		}
		return result;
	}
	
	/* 수정*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map update(Map param) throws Exception{
		Map result = new HashMap();
		/* 공지사항 추가 - WT_NOTICE, TCCO_FILE */
		int update_notice_cnt = dao.updateNotice(param);
		/* 공지사항 추가 결과 */
		result.put("UPDATE_NOTICE_CNT", update_notice_cnt > 0 ? 1 : 0);
		result.put(("NOTICE_ID"), param.get("NOTICE_ID"));
		
		Map file = (Map) param.get("ATCH_FILE");
		// 기존 파일 삭제
		if(param.get("ATCH_FLE_SEQ") != null && file != null) {
			String rootPath = FileUtil.getFileDirRootPath(servletContext);
			String childPath = FileUtil.replaceToServerSeparator(param.get("FLE_PATH").toString());
			FileUtil.deleteFile(rootPath + childPath, param.get("NEW_FLE_NM").toString());
		}
		// 신규 파일 업로드
		if(file != null) {
			FileUtil.uploadFile((MultipartFile) file.get("FILE"),
					file.get("ROOT_PATH").toString() + file.get("LAST_PATH").toString(),
					file.get("UNIQUE_NAME").toString());
			//return 시 에서
			file.remove("FILE");
			/* 공지사항 첨부파일 추가 결과 */
			result.put("ATCH_FILE", file);
		}
		return result;
	}
	
	/* 삭제*/
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map delete(Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		try {
			int delete_notice_cnt = dao.deleteNotice(param);
			result.put("DELETE_NOTICE_CNT", delete_notice_cnt > 0 ? 1 : 0);
			isDelete = delete_notice_cnt > 0 ? true : false;
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
	
	/* 상세 데이터 조회 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getNoticeInfo(Map param) throws Exception{
		return dao.getNoticeInfo(param);
	}
	
	
	
}
