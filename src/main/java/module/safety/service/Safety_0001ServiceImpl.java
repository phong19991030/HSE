package module.safety.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0001DAOImpl;

@Service("Safety_0001ServiceImpl") 
public class Safety_0001ServiceImpl extends AbstractService {
	
	@Autowired
	private Safety_0001DAOImpl dao;
	
	@Autowired
	private UtilService utilService;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		
		Map cnt = dao.getToolCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getToolList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	public List getToolList(Map<Object, Object> param) throws Exception {
		Map search = (Map)param.get("search");
    	if(search != null) {
    		param.putAll(search);
    	}
		List list = dao.getToolList(param);
		
		return list;
	}
	
	public List getAllToolList(Map<Object, Object> param) throws Exception {
		Map search = (Map)param.get("search");
    	if(search != null) {
    		param.putAll(search);
    	}
		List list = dao.getAllToolList(param);
		
		return list;
	}
	
	public Map getToolDetail(Map<Object, Object> param) throws Exception {
		Map detail = dao.getToolDetail(param);
		
//		file
		List files = dao.getToolFiles(param);
		
		List historys = dao.getToolHistorys(param);
		
		detail.put("TOOL_HISTORY", historys);
		detail.put("TOOL_FILES", files);
//		String imageId = String.valueOf(detail.get("IMAGE_FILE_ID"));
//		if(imageId != null && !"".equals(imageId)) {
//			Map paramImage = new HashedMap();
//			paramImage.put("ATCH_FLE_SEQ", imageId);
//			Map image = utilService.getFileById(paramImage);
//			detail.put("IMAGE_DATA", image);
//		}
		
		return detail;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertTool(ModelAndView mav, Map param) throws Exception {
//		param = convertDataSave(param);
		Gson g = new Gson();
		
		Map tmpInfoFile = getinfoFile(param);
		String[] arrSpec = (String[]) tmpInfoFile.get("arrSpec");
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
		
		int insertResult = 0;
		try {
			insertResult = dao.insertTool(param);
			Integer toolId = Integer.parseInt(String.valueOf(param.get("TOOL_ID")));
			
//			insert file
			for (int i = 0; i < arrSpec.length; i++) {
				if(!"".equals(arrSpec[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String specificationFileId = arrSpec[i];
					map.put("TOOL_ID", toolId);
					map.put("FILE_TYPE", "SPE");
					map.put("FILE_ID", specificationFileId);
					dao.insertToolFile(map);
				}
			}
			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("TOOL_ID", toolId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.insertToolFile(map);
				}
			}
			
			
	        String historysString = (String) param.get("TOOL_HISTORY");
	        List<Map> historys = g.fromJson(historysString, ArrayList.class);
	        
			if(historys != null && !historys.isEmpty()) {
				for (Map history : historys) {
					history.put("TOOL_ID", toolId);
				}
				dao.insertToolHistory(historys);
			}
			
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "TOOL_ID");
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}

	@Transactional(rollbackFor = Exception.class)
	public int updateTool(Map param) throws Exception {
//		param = convertDataSave(param);
		int updateResult = 0;
		
		Map tmpInfoFile = getinfoFile(param);
		String[] arrSpec = (String[]) tmpInfoFile.get("arrSpec");
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
	    Integer toolId = Integer.parseInt(String.valueOf(param.get("TOOL_ID")));		
		try {
			updateResult = dao.updateTool(param);
			
//			file
			for (int i = 0; i < arrSpec.length; i++) {
				if(!"".equals(arrSpec[0])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String specificationFileId = arrSpec[i];
					map.put("TOOL_ID", toolId);
					map.put("FILE_TYPE", "SPE");
					map.put("FILE_ID", specificationFileId);
					dao.insertToolFile(map);
				}
			}
			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[0])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("TOOL_ID", toolId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.insertToolFile(map);
				}
			}
			
			Gson g = new Gson();
			String historysString = (String) param.get("TOOL_HISTORY");
	        List<Map> historys = g.fromJson(historysString, ArrayList.class);
			
			if(historys != null && !historys.isEmpty()) {
				for (Map history : historys) {
					history.put("TOOL_ID", toolId);
				}
				
				Map<Object, Object> paramDelete = new HashedMap();
				paramDelete.put("TOOL_ID", toolId);
				dao.deleteToolHis(paramDelete);
				dao.insertToolHistory(historys);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = updateResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int delete(ModelAndView mav, Map<Object, Object> param) {
		int resultDelete = 0;
		String tool_id = param.get("TOOL_ID").toString();
		param.put("TOOL_ID", tool_id);
		
		try {
//			delete file
			List files = dao.getToolFiles(param);
			for (int i = 0; i < files.size(); i++) {
				Map file = (Map) files.get(i);
				String fileSeq = (String) file.get("FILE_ID");
				String filePath = (String) file.get("FLE_PATH");
				utilService.deleteFileUtil(fileSeq, filePath);
			}
			dao.deleteToolFile(param);
			dao.deleteToolHis(param);
			
			resultDelete = dao.deleteTool(param);
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "TOOL_ID");
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteManualFromList(Map<Object, Object> param) {
		int result = 1;
		String manual_id = param.get("ID").toString();
 		String[] arr = manual_id.split("-");
 		if(arr.length <= 0) {
 			result = 0;
 			return result;
 		}
		for(int i = 0; i < arr.length; i++) {
			param.put("TOOL_ID", arr[i]);
			try {
				dao.deleteToolHis(param);
				dao.deleteTool(param);
			} catch (Exception e) {
				e.printStackTrace();
				return 0;
			}
		}
		return result;
	}
	
	private Map convertDataSave(Map param) {
		String isLostOrDamage = String.valueOf(param.get("IS_LOSS_OR_DAMAGE"));
		if("".equals(isLostOrDamage) || isLostOrDamage == null) {
			param.put("IS_LOSS_OR_DAMAGE", 0);
		}
		String amount = String.valueOf(param.get("AMOUNT"));
		if("".equals(amount) || amount == null) {
			param.put("AMOUNT", 0);
		}
		String importPrice = String.valueOf(param.get("IMPORT_PRICE"));
		if("".equals(importPrice) || importPrice == null) {
			param.put("IMPORT_PRICE", 0);
		}
		return param;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteToolFile(Map<Object, Object> param) {
		int resultDelete = 0;
		String toolFileId = param.get("TOOL_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.deleteToolFileWithId(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}
	
	Map getinfoFile(Map param) {
		Map res = new HashMap();
		String strSpecificationFileIds = param.get("specificationFileIds") != null ? (String) param.get("specificationFileIds") : "";
		String[] arrSpec = strSpecificationFileIds.split("!@#");
	    String strFileImgs = param.get("fileImgs") != null ? (String) param.get("fileImgs") : "";
	    String[] arrImg = strFileImgs.split("!@#");
	    
	    res.put("arrSpec", arrSpec);
	    res.put("arrImg", arrImg);
		return res;
		
	}
	
	public List getToolType() throws Exception {
		List list = dao.getToolType();
		
		return list;
	}
	
	public List getBrandsByToolType(Map<Object, Object> param) throws Exception {
		List list = dao.getBrandsByToolType(param);
		
		return list;
	}
}
