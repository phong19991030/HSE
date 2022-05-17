package module.license;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;

@Service("Tsk_0100ServiceImpl")
public class Tsk_0100ServiceImpl extends AbstractService {
	
	@Autowired
	private Tsk_0100DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	public Map getLicenseList(Map<String, Object> args) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		Map cnt = dao.getLicenseCnt(args);
		List list = dao.getLicenseList(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
		
	}
	
	public Map getLicenseListByCompanyId(Map<String, Object> args) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getLicenseListByCompanyId(args);
		map.put("LIST", list);
		return map;
		
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int update(Map param) throws Exception {
		
		int updateResult = 0;
		Integer licenseId = Integer.parseInt(String.valueOf(param.get("LICENSE_ID")));
		try {
			updateResult = dao.update(param);
			
			Gson g = new Gson();
			String toolsString = (String) param.get("LICENSE_TOOL");
	        List<Map> tools = g.fromJson(toolsString, ArrayList.class);
	        Map<Object, Object> paramDelete = new HashedMap();
			paramDelete.put("LICENSE_ID", licenseId);
			
			if(tools != null && !tools.isEmpty()) {
				for (Map tool : tools) {
					tool.put("LICENSE_ID", licenseId);
				}
				dao.deleteLicenseTool(paramDelete);
				dao.insertLicenseTool(tools);
			}
			
			String worksString = (String) param.get("LICENSE_WORK");
	        List<Map> works = g.fromJson(worksString, ArrayList.class);
			
			if(works != null && !works.isEmpty()) {
				for (Map work : works) {
					work.put("LICENSE_ID", licenseId);
				}
				dao.deleteLicenseWork(paramDelete);
				dao.insertLicenseWork(works);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = updateResult > 0 ? 1 : 0;
		
		return rs;
		
	}
	

	@Transactional(rollbackFor = Exception.class)
	public int insert(ModelAndView mav, Map param) throws Exception {
		Gson g = new Gson();
		int insertResult = 0;
		try {
			insertResult = dao.insert(param);
			Integer licenseId = Integer.parseInt(String.valueOf(param.get("LICENSE_ID")));
			
			 String toolsString = (String) param.get("LICENSE_TOOL");
		        List<Map> tools = g.fromJson(toolsString, ArrayList.class);
		        
				if(tools != null && !tools.isEmpty()) {
					for (Map tool : tools) {
						tool.put("LICENSE_ID", licenseId);
					}
					dao.insertLicenseTool(tools);
				}
				
				String worksString = (String) param.get("LICENSE_WORK");
		        List<Map> works = g.fromJson(worksString, ArrayList.class);
		        
				if(works != null && !works.isEmpty()) {
					for (Map work : works) {
						work.put("LICENSE_ID", licenseId);
					}
					dao.insertLicenseWork(works);
				}
//	        insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "LICENSE_ID");
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	@Transactional
	public int delete(ModelAndView mav, Map<Object, Object> args) {
		
		int resultDelete = 0;
        String license_id = args.get("LICENSE_ID").toString();
        args.put("LICENSE_ID", license_id);
        try {
        	
            dao.deleteLicenseTool(args);
            dao.deleteLicenseWork(args);
            resultDelete = dao.deleteLicense(args);
//          delete Payment
            com0001Service.deletePaymentStatus(mav, args, "LICENSE_ID");
        }
        catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

        int rs = resultDelete > 0 ? 1 : 0;
		return rs;
	}

	public Map<String, Object> getLicenseInfo(Map<String, Object> args) throws Exception {
		Map detail = dao.getLicenseInfo(args);
		List tools = dao.getLicenseToolList(args);
		List works = dao.getLicenseWorkList(args);
		detail.put("LICENSE_TOOL", tools);
		detail.put("LICENSE_WORK", works);
		return detail;
	}
	
}
