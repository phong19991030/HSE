package module.safety.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CastUtil;
import module.com.com_0001.Com_0001ServiceImpl;
import module.safety.dao.Safety_0002DAOImpl;

@Service("Safety_0002ServiceImpl")
public class Safety_0002ServiceImpl extends AbstractService {

	@Autowired
	private Safety_0002DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getRowList(Map param) throws Exception{
		
		Map cnt = dao.getListCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getToolGrantRevokeList(param);
		
		List resultLst = new ArrayList();
		if(list != null && list.size() > 0) {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Map item = (Map) iterator.next();
				List toolGrantList = dao.getToolGrantByGrantId(item);
				if(toolGrantList.size() > 0) {
					Map first = (Map) toolGrantList.get(0);
					String tmpToolName = toolGrantList.size() - 1 == 0 ? (String) first.get("TOOL_NAME") : (String) first.get("TOOL_NAME")+ " 외 " + (toolGrantList.size() - 1) + "개";
					
					item.put("tmpToolName", tmpToolName);
				}
			}
		}
		
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		return map;
	}
	
	public List getToolGrantRevokeList(Map<Object, Object> param) throws Exception {
		Map search = (Map)param.get("search");
    	if(search != null) {
    		param.putAll(search);
    	}
    	
		List list = dao.getToolGrantRevokeList(param);
		
		return list;
	}
	
	public Map getToolGrantRevokeDetail(Map<Object, Object> param) throws Exception {
		Map detail = dao.getToolGrantRevokeDetail(param);
		List toolGrantList = dao.getToolGrantByGrantId(param);
		detail.put("TOOL_GRANT_LIST", toolGrantList);
		
		return detail;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertToolGrantRevoke(ModelAndView mav, Map param) throws Exception {
		int insertResult = 0;
		try {
			insertResult = dao.insertToolGrantRevoke(param);
			String toolsString = (String) param.get("TOOL_GRANT_LIST");
	        Gson g = new Gson();
	        List<Map> toolGrantList = g.fromJson(toolsString, ArrayList.class);
	        
			if(toolGrantList  != null && !toolGrantList.isEmpty()) {
				Integer toolGrantRevokeId = Integer.parseInt(String.valueOf(param.get("TOOL_GRANT_REVOKE_ID")));
				for (Map<String, Object> toolGrant : toolGrantList) {
					if(!"".equals(CastUtil.castToString(toolGrant.get("TOOL_ID")))) {
						toolGrant.put("GRANT_REVOKE_ID", toolGrantRevokeId);
						dao.insertToolGrantList(toolGrant);
					}
				}
//				dao.insertToolGrantList1(toolGrantList);
			}
			
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "TOOL_GRANT_REVOKE_ID");
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateToolGrantRevoke(Map param) throws Exception {
		int updateResult = 0;
		try {
			updateResult = dao.updateToolGrantRevoke(param);
			
			String toolsString = (String) param.get("TOOL_GRANT_LIST");
	        Gson g = new Gson();
	        List<Map> toolGrantList = g.fromJson(toolsString, ArrayList.class);
	        
			if(toolGrantList != null && !toolGrantList.isEmpty()) {
				Integer toolGrantRevokeId = Integer.parseInt(String.valueOf(param.get("TOOL_GRANT_REVOKE_ID")));
				Map<Object, Object> paramDelete = new HashedMap();
				paramDelete.put("TOOL_GRANT_REVOKE_ID", toolGrantRevokeId);
				
				dao.deleteToolGrantList(paramDelete);
				for (Map<String, Object> toolGrant : toolGrantList) {
					if(!"".equals(CastUtil.castToString(toolGrant.get("TOOL_ID")))) {
						toolGrant.put("GRANT_REVOKE_ID", toolGrantRevokeId);
						dao.insertToolGrantList(toolGrant);
					}
				}
//				dao.insertToolGrantList1(toolGrantList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = updateResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteToolGrantRevoke(ModelAndView mav, Map<Object, Object> param) throws Exception {
		int deleteResult = 0;
		try {
			dao.deleteToolGrantList(param);
			deleteResult = dao.deleteToolGrantRevoke(param);
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "TOOL_GRANT_REVOKE_ID");
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = deleteResult > 0 ? 1 : 0;
		return rs;
	}
}
