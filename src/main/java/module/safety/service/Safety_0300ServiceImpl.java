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
import infrastructure.util.CommonUtil;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0300DAOImpl;

@Service("Safety_0300ServiceImpl")
public class Safety_0300ServiceImpl extends AbstractService {

	@Autowired
	private Safety_0300DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	@Autowired
	private UtilService utilService;

	public Safety_0300ServiceImpl() {
		super.name = "Safe_0300ServiceImpl";
	}

	public Map getAccidentList(Map<String, Object> args) throws Exception {
		Map cnt = dao.getAccidentCnt(args);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getAccidentList(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	public Map getAccidentsByCompanyId(Map<String, Object> args) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getAccidentsByCompanyId(args);
		map.put("LIST", list);
		return map;
	}
	
	public Map getCountAccidentsByCompanyIdNMonth(Map<String, Object> args) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getCountAccidentsByCompanyIdNMonth(args);
		map.put("LIST", list);
		return map;
	}

	public Map<String, Object> getAccidentById(Map<String, Object> args) throws Exception {
		Map detail = dao.getAccidentById(args);
		List files = dao.getAccidentFiles(args);
		
		String ia = (String) detail.get("INJURED_AREA");
		List INJURED_AREA_LST = CommonUtil.getListFromStr(ia, "@!#%");
		detail.put("INJURED_AREA_LST", INJURED_AREA_LST);
		
		String ad = (String) detail.get("ACCIDENT_DETAIL");
		List ACCIDENT_DETAIL_LST = CommonUtil.getListFromStr(ad, "@!#%");
		detail.put("ACCIDENT_DETAIL_LST", ACCIDENT_DETAIL_LST);
		
		String action = (String) detail.get("ACTION");
		List ACTION_LST = CommonUtil.getListFromStr(action, "@!#%");
		detail.put("ACTION_LST", ACTION_LST);
		
		String pp = (String) detail.get("PREVENTION_PLAN");
		List PREVENTION_PLAN_LST = CommonUtil.getListFromStr(pp, "@!#%");
		detail.put("PREVENTION_PLAN_LST", PREVENTION_PLAN_LST);
		
		detail.put("ACCIDENT_FILES", files);
		return detail;
	}

	public Map<String, Object> count(Map<String, Object> args) throws Exception {
		return dao.getAccidentCnt(args);
	}

	
	@Transactional(rollbackFor = Exception.class)
	public int insertAccident(ModelAndView mav, Map param) throws Exception {
		
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
		
		int insertResult = 0;
		try {
			insertResult = dao.insert(param);
			Integer erpId = Integer.parseInt(String.valueOf(param.get("ACCIDENT_ID")));
			
//			insert file
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("ACCIDENT_ID", erpId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.insertAccidentFile(map);
				}
			}
			
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "ACCIDENT_ID");
		
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateAccident(Map param) throws Exception {
		int updateResult = 0;
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
	    Integer erpId = Integer.parseInt(String.valueOf(param.get("ACCIDENT_ID")));		
		try {
			updateResult = dao.update(param);
			
//			file
			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[0])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("ACCIDENT_ID", erpId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.insertAccidentFile(map);
				}
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = updateResult > 0 ? 1 : 0;
		
		return rs;
	}
	

	@Transactional
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();

		boolean isDelete = false;
		try {
			int deleteEmpMgt = 0;
			//delete file
			List files = dao.getAccidentFiles(args);
			for (int i = 0; i < files.size(); i++) {
				Map file = (Map) files.get(i);
				String fileSeq = (String) file.get("FILE_ID");
				String filePath = (String) file.get("FLE_PATH");
				utilService.deleteFileUtil(fileSeq, filePath);
			}
			
			deleteEmpMgt = dao.delete(args);
			result.put("DELETE_RES_CNT", deleteEmpMgt > 0 ? 1 : 0);
			isDelete = deleteEmpMgt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, args, "ACCIDENT_ID");
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
	public int deleteAccidentFile(Map<Object, Object> param) {
		int resultDelete = 0;
		String toolFileId = param.get("ACCIDENT_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.deleteAccidentFileWithId(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}
	
	Map getinfoFile(Map param) {
		Map res = new HashMap();
	    String strFileImgs = param.get("fileImgs") != null ? (String) param.get("fileImgs") : "";
	    String[] arrImg = strFileImgs.split("!@#");
	    
	    res.put("arrImg", arrImg);
		return res;
		
	}
	
	
}
