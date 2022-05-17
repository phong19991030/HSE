package module.res;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import applications.util.UtilService;
import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Res_0002ServiceImpl")
@Transactional
public class Res_0002ServiceImpl extends AbstractService {
	@Autowired
	public Res_0002DAOImpl dao;
	
	@Autowired
	private UtilService utilService;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;

	public Res_0002ServiceImpl() {
		super.name = "Res_0002ServiceImpl";
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getList(Map param) throws Exception {
		Map cnt = dao.countCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getList(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map get(Map args) throws Exception {
		Map<String, Object> rs = new HashMap<String, Object>();
		rs.putAll(dao.get(args));
		args.put("WASTE_ID", args.get("WASTE_ID"));
		args.put("FILE_TYPE", "IMG");		
		rs.put("WASTE_FILES", dao.getFile(args));
		return rs;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Map delete(ModelAndView mav, Map param) throws Exception {
		Map result = new HashMap();
		boolean isDelete = false;
		String waste_id = param.get("WASTE_ID").toString();
		param.put("WASTE_ID", waste_id);
		param.put("FILE_TYPE", "IMG");
		try {
			//delete file
			List files = dao.getFile(param);
			for (int i = 0; i < files.size(); i++) {
				Map file = (Map) files.get(i);
				String fileSeq = (String) file.get("FILE_ID");
				String filePath = (String) file.get("FLE_PATH");
				utilService.deleteFileUtil(fileSeq, filePath);
			}
			dao.deleteWasteFile(param);
			int delete_res_cnt = dao.delete(param);
			result.put("DELETE_RES_CNT", delete_res_cnt > 0 ? 1 : 0);
			isDelete = delete_res_cnt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "WASTE_ID");
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

	@Transactional(propagation = Propagation.REQUIRED)
	public int update(Map param) throws Exception {
		Gson g = new Gson();		
		
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
	    
		int update_res_cnt = 0;
		
		try {
			update_res_cnt = dao.update(param);
			Integer wasteId = Integer.parseInt(String.valueOf(param.get("WASTE_ID")));
			
//			insert file			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("WASTE_ID", wasteId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.insertWasteFile(map);
				}
			}
	        
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int result = update_res_cnt > 0 ? 1 : 0;
		return result;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public int insert(ModelAndView mav, Map param) throws Exception {
		Gson g = new Gson();
		
		Map tmpInfoFile = getinfoFile(param);
	    String[] arrImg = (String[]) tmpInfoFile.get("arrImg");
		
		int insertResult = 0;
		try {
			insertResult = dao.insert(param);
			Integer wasteId = Integer.parseInt(String.valueOf(param.get("WASTE_ID")));
			
//			insert file			
			for (int i = 0; i < arrImg.length; i++) {
				if(!"".equals(arrImg[i])) {
					Map<Object, Object> map = new HashMap<Object, Object>();
					String imgFileId = arrImg[i];
					map.put("WASTE_ID", wasteId);
					map.put("FILE_TYPE", "IMG");
					map.put("FILE_ID", imgFileId);
					dao.insertWasteFile(map);
				}
			}
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "WASTE_ID");
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	Map getinfoFile(Map param) {
		Map res = new HashMap();
	    String strFileImgs = param.get("fileImgs") != null ? (String) param.get("fileImgs") : "";
	    String[] arrImg = strFileImgs.split("!@#");
	    res.put("arrImg", arrImg);
		return res;
		
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteWasteFile(Map<Object, Object> param) {
		int resultDelete = 0;
		//String toolFileId = param.get("WASTE_FILE_ID").toString();
		String fileId = param.get("FILE_ID").toString();
		String filePath = param.get("FLE_PATH").toString();
		
		try {
//			delete file
			utilService.deleteFileUtil(fileId, filePath);
			
			resultDelete = dao.deleteWasteFileWithId(param);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}
}





