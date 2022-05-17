package module.safety.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0500DAOImpl;

@Service("Safety_0500ServiceImpl")
public class Safety_0500ServiceImpl extends AbstractService {

	@Autowired
	private Safety_0500DAOImpl dao;
	
	@Autowired
	private UtilService utilService;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	public Safety_0500ServiceImpl() {
		super.name = "Safety_0500ServiceImpl";
	}

	@Transactional
	public Map list(Map<String, Object> param) throws Exception {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> data = dao.list(param);
		
		Map cnt = dao.count(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.list(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	@Transactional
	public Map<String, Object> get(Map<String, Object> args) throws Exception {
		
		Map<String, Object> rs = new HashMap<String, Object>();
		rs.putAll(dao.get(args));
		
		args.put("EDU_ID", args.get("EDU_ID"));		
		
		args.put("FILE_TYPE", "SHP");		
		rs.put("SHP_FILES", dao.getFile(args));
		
		args.put("FILE_TYPE", "PIPL");		
		rs.put("PIPL_FILES", dao.getFile(args));
		
		args.put("FILE_TYPE", "DISABILITIES");		
		rs.put("DISABILITIES_FILES", dao.getFile(args));
		
		args.put("FILE_TYPE", "RETIREMENT");		
		rs.put("RETIREMENT_FILES", dao.getFile(args));
		
		args.put("FILE_TYPE", "SAFETY");		
		rs.put("SAFETY_FILES", dao.getFile(args));
		return rs;
	}
	
	@Transactional
	public Map<String, Object> count(Map<String, Object> args) throws Exception {
		return dao.count(args);
	}

	@Transactional
	public Map<String, Object> insert(ModelAndView mav, Map<String, Object> param) throws Exception {
		Map<String, Object> result = new HashMap<>();			
		try {
			String shpFileIds = (String) param.get("shpFileIds");
			String[] SHPFileIds = shpFileIds.split("!@#");
			
			String piplFileIds = (String) param.get("piplFileIds");
			String[] PIPLFileIds = piplFileIds.split("!@#");
			
			String retirementFileIds = (String) param.get("retirementFileIds");
			String[] RETIREMENTFileIds = retirementFileIds.split("!@#");
			
			String disabilitiesFileIds = (String) param.get("disabilitiesFileIds");
			String[] DISABILITIESFileIds = disabilitiesFileIds.split("!@#");		
			
			String safetyFileIds = (String) param.get("safetyFileIds");
			String[] SAFETYFileIds = safetyFileIds.split("!@#");		
			int insertResult = 0;
			
			
			insertResult = dao.insert(param);
			Integer eduId = Integer.parseInt(String.valueOf(param.get("EDU_ID")));
			
			//insert file
			insertResult = insertFile(SHPFileIds, eduId, "SHP");
			insertResult = insertFile(PIPLFileIds, eduId, "PIPL");
			insertResult = insertFile(DISABILITIESFileIds, eduId, "DISABILITIES");
			insertResult = insertFile(RETIREMENTFileIds, eduId, "RETIREMENT");
			insertResult = insertFile(SAFETYFileIds, eduId, "SAFETY");
			
			result.put("INSERT_RESULT", insertResult > 0 ? 1 : 0);
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "EDU_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}

		
		return result;
	}
	
	@Transactional
	public int insertFile(String[] fileIds, Integer eduId, String fileType) {
		for (int i = 0; i < fileIds.length; i++) {
			if(!"".equals(fileIds[i])) {
				Map<Object, Object> map = new HashMap<Object, Object>();
				String fileId = fileIds[i];
				map.put("EDU_ID", eduId);
				map.put("FILE_TYPE", fileType);
				map.put("FILE_ID", fileId);
				try {
					dao.insertEduFile(map);
				} catch (Exception e) {
					
					e.printStackTrace();
					return 0;
				}
			}
		}
		return 1;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int dropEduFile(Map<Object, Object> param) {
		int resultDelete = 0;
		String toolFileId = param.get("EDU_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.dropEduFile(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}

	@Transactional
	public Map<String, Object> update(Map<String, Object> param) throws Exception {
Map<String, Object> result = new HashMap<>();
		
		String shpFileIds = (String) param.get("shpFileIds");
		String[] SHPFileIds = shpFileIds.split("!@#");
		
		String piplFileIds = (String) param.get("piplFileIds");
		String[] PIPLFileIds = piplFileIds.split("!@#");
		
		String retirementFileIds = (String) param.get("retirementFileIds");
		String[] RETIREMENTFileIds = retirementFileIds.split("!@#");
		
		String disabilitiesFileIds = (String) param.get("disabilitiesFileIds");
		String[] DISABILITIESFileIds = disabilitiesFileIds.split("!@#");
		
		String safetyFileIds = (String) param.get("safetyFileIds");
		String[] SAFETYFileIds = safetyFileIds.split("!@#");		
				
		int updateResult = 0;
		updateResult = dao.update(param);
		Integer eduId = Integer.parseInt(String.valueOf(param.get("EDU_ID")));
		
		//insert file
		updateResult = insertFile(SHPFileIds, eduId, "SHP");
		updateResult = insertFile(PIPLFileIds, eduId, "PIPL");
		updateResult = insertFile(DISABILITIESFileIds, eduId, "DISABILITIES");
		updateResult = insertFile(RETIREMENTFileIds, eduId, "RETIREMENT");	
		updateResult = insertFile(SAFETYFileIds, eduId, "SAFETY");
		

		result.put("UPDATE_RESULT", updateResult > 0 ? 1 : 0);
		return result;
	}

	@Transactional
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		boolean isDelete = false;
		try {
			int deleteEmpMgt = 0;
			//delete file
			List files = dao.getFiles(args);
			for (int i = 0; i < files.size(); i++) {
				Map file = (Map) files.get(i);
				String fileSeq = (String) file.get("FILE_ID");
				String filePath = (String) file.get("FLE_PATH");
				utilService.deleteFileUtil(fileSeq, filePath);
			}
			deleteEmpMgt = dao.deleteFile(args);
			deleteEmpMgt = dao.delete(args);
			
			result.put("DELETE_RES_CNT", deleteEmpMgt > 0 ? 1 : 0);
			isDelete = deleteEmpMgt > 0 ? true : false;
			
//          delete Payment
            com0001Service.deletePaymentStatus(mav, args, "EDU_ID");
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
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteEduFile(Map<Object, Object> param) {
		int resultDelete = 0;
		String toolFileId = param.get("EDU_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.dropEduFile(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}
}
