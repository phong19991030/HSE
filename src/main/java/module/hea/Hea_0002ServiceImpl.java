package module.hea;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import applications.util.UtilService;
import module.com.com_0001.Com_0001ServiceImpl;

@Service("Hea_0002ServiceImpl")
public class Hea_0002ServiceImpl {
	@Autowired
	private Hea_0002DAOImpl dao;
	
	@Autowired
	private UtilService utilService;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;

	public Map getListEmpHealth(Map<String, Object> args) throws Exception {
		Map cnt = dao.getEmpHealthCnt(args);
		Map map = new HashMap<>();
		List list = dao.getListEmpHealth(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}

	public Map<String, Object> getDetailInfo(Map args) throws Exception {
		Map<String, Object> rs = new HashMap<String, Object>();
		rs.putAll(dao.getDetailInfo(args));
		args.put("EMP_HEALTH_ID", args.get("EMP_HEALTH_ID"));
		args.put("FILE_TYPE", "HEALTH");		
		rs.put("HEALTH_FILES", dao.getFile(args));
		return rs;
	}

	@Transactional(rollbackFor = Exception.class)
	public int insert(ModelAndView mav, Map<String, Object> param) throws Exception {
		Gson g = new Gson();
		
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("healthFiles");
		
		int insertResult = 0;
		try {
			insertResult = dao.insert(param);
			Integer healthId = Integer.parseInt(String.valueOf(param.get("EMP_HEALTH_ID")));
			
//			insert file			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String healFileId = arrImg[i];
					map.put("EMP_HEALTH_ID", healthId);
					map.put("FILE_TYPE", "HEALTH");
					map.put("FILE_ID", healFileId);
					dao.insertHealthFile(map);
				}
			}
			
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "EMP_HEALTH_ID");
	        
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}

	@Transactional
	public int update(Map<String, Object> param) throws Exception {
		Gson g = new Gson();
		
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("healthFiles");
		
		int insertResult = 0;
		try {
			insertResult = dao.update(param);
			Integer healthId = Integer.parseInt(String.valueOf(param.get("EMP_HEALTH_ID")));
			
//			insert file			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String healFileId = arrImg[i];
					map.put("EMP_HEALTH_ID", healthId);
					map.put("FILE_TYPE", "HEALTH");
					map.put("FILE_ID", healFileId);
					dao.insertHealthFile(map);
				}
			}
	        
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}

	@Transactional
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		String health_id = param.get("EMP_HEALTH_ID").toString();
		param.put("EMP_HEALTH_ID", health_id);
		param.put("FILE_TYPE", "HEALTH");
		try {
			//delete file
			List files = dao.getFile(param);
			for (int i = 0; i < files.size(); i++) {
				Map file = (Map) files.get(i);
				String fileSeq = (String) file.get("FILE_ID");
				String filePath = (String) file.get("FLE_PATH");
				utilService.deleteFileUtil(fileSeq, filePath);
			}
			dao.deleteHealthFile(param);
			int delete_health_cnt = dao.delete(param);
			result.put("DELETE_HEALTH_CNT", delete_health_cnt > 0 ? 1 : 0);
			isDelete = delete_health_cnt > 0 ? true : false;
			
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "EMP_HEALTH_ID");
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

//	public List getDiseasesByEmpHealth(Map<String, Object> params) throws Exception {
//		return dao.getDiseasesByEmpHealth(params);
//	}
	
	public Map duplicateCheckEmpNo(Map param) throws Exception {
		return dao.duplicateCheckEmpNo(param);
	}
	
	Map getinfoFile(Map param) {
		Map res = new HashMap();
	    String strFileImgs = param.get("healthFileIds") != null ? (String) param.get("healthFileIds") : "";
	    String[] arrFile = strFileImgs.split("!@#");
	    res.put("healthFiles", arrFile);
		return res;
		
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteHealthFile(Map<Object, Object> param) {
		int resultDelete = 0;
		//String toolFileId = param.get("WASTE_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.deleteHealthFileWithId(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}
}
