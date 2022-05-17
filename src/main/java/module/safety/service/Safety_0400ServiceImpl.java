package module.safety.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CommonUtil;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0400DAOImpl;

@Service("Safety_0400ServiceImpl")
public class Safety_0400ServiceImpl extends AbstractService {

	@Autowired
	private Safety_0400DAOImpl dao;	
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	public Safety_0400ServiceImpl() {
		super.name = "Safety_0400ServiceImpl";
	}
	
	@Autowired
	private UtilService utilService;
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getEmergResPlanList(Map param) throws Exception {
		Map cnt = dao.getEmergResPlanCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getEmergResPlanList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}

	public Map<String, Object> getEmergencyById(Map<String, Object> args) throws Exception {
		Map detail = dao.getEmergencyById(args);
		List files = dao.getEmergencyFiles(args);
		
		String ee = (String) detail.get("EXPECTED_EMERGENCY");
		List EXPECTED_EMERGENCY_LST = CommonUtil.getListFromStr(ee, "@!#%");
		detail.put("EXPECTED_EMERGENCY_LST", EXPECTED_EMERGENCY_LST);
		
		String pa = (String) detail.get("PROCEDURE_ACTION");
		List PROCEDURE_ACTION_LST = CommonUtil.getListFromStr(pa, "@!#%");
		detail.put("PROCEDURE_ACTION_LST", PROCEDURE_ACTION_LST);
		
		String EVACUATION_ROUTE = (String)detail.get("EVACUATION_ROUTE");
		String[] EVACUATION_ROUTES = EVACUATION_ROUTE.split("-", 2);
		String EVACUATION_ROUTE1 = EVACUATION_ROUTES[0];
		String EVACUATION_ROUTE2 = EVACUATION_ROUTES[1];
		detail.put("EVACUATION_ROUTE1", EVACUATION_ROUTE1);
		detail.put("EVACUATION_ROUTE2", EVACUATION_ROUTE2);
		detail.put("EMERGENCY_FILES", files);
		return detail ;
	}

	public Map<String, Object> count(Map<String, Object> args) throws Exception {
		return dao.count(args);
	}

	@Transactional(rollbackFor = Exception.class)
	public int insert(ModelAndView mav, Map param) throws Exception {
		
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
		
		int insertResult = 0;
		try {
			insertResult = dao.insert(param);
			Integer erpId = Integer.parseInt(String.valueOf(param.get("ERP_ID")));
			
//			insert file
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("ERP_ID", erpId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.inserEmergencyFile(map);
				}
			}
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "ERP_ID");
		
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}

	@Transactional(rollbackFor = Exception.class)
	public int update(Map param) throws Exception {
		int updateResult = 0;
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
	    Integer erpId = Integer.parseInt(String.valueOf(param.get("ERP_ID")));		
		try {
			updateResult = dao.update(param);
			
//			file
			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[0])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("ERP_ID", erpId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.inserEmergencyFile(map);
				}
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = updateResult > 0 ? 1 : 0;
		
		return rs;
	}

	@Transactional(rollbackFor = Exception.class)
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		boolean isDelete = false;
		try {
			int deleteEmpMgt = 0;
			//delete file
			List files = dao.getEmergencyFiles(args);
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
            com0001Service.deletePaymentStatus(mav, args, "ERP_ID");
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
	
	Map getinfoFile(Map param) {
		Map res = new HashMap();
	    String strFileImgs = param.get("fileImgs") != null ? (String) param.get("fileImgs") : "";
	    String[] arrImg = strFileImgs.split("!@#");
	    
	    res.put("arrImg", arrImg);
		return res;
		
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteEmergencyFile(Map<Object, Object> param) {
		int resultDelete = 0;
		String toolFileId = param.get("EMERGENCY_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.deleteEmergencyFile(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}

}
