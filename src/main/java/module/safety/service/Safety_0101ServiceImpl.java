package module.safety.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.google.gson.Gson;

import infrastructure.inheritance.service.AbstractService;
import module.safety.dao.Safety_0101DAOImpl;

//@Transactional(rollbackFor = Exception.class)
@Service("Safety_0101ServiceImpl") 
public class Safety_0101ServiceImpl {
	
	@Autowired
	private Safety_0101DAOImpl dao;
	
//	private final PlatformTransactionManager transactionManager;
//	  public Safety_0101ServiceImpl(PlatformTransactionManager transactionManager) {
//	    this.transactionManager = transactionManager;
//	  }
//	
	public Map getPPEList(Map<Object, Object> param) throws Exception {
		Map cnt = dao.getPPECnt(param);
		Map<String, Object> mapReturn = new HashMap<String, Object>();
		mapReturn.put("CNT", cnt.get("CNT"));
		Map search = (Map)param.get("search");
    	if(search != null) {
    		param.putAll(search);
    	}
		List<Map<String, Object>> list = dao.getPPEList(param);
		Map<Object, List<Map<String, Object>>> mapList = list.stream()
    		    .collect(Collectors.groupingBy(map -> map.get("EMP_NO").toString(),
    		                                   Collectors.toList()));
		
		List<Map<String, Object>> listResult = new ArrayList<Map<String,Object>>();
		int rowNumber = 0;
		for (Map.Entry<Object, List<Map<String, Object>>> entry : mapList.entrySet()) {
			String empNo = String.valueOf(entry.getKey());
			List<Map<String, Object>> ppeList = entry.getValue();
			if(ppeList.size() >= 1) {
				Map<String, Object> ppe = new HashedMap();
				ppe.put("EMP_NAME", ppeList.get(0).get("EMP_NAME"));
				ppe.put("EMP_NO", empNo);
				ppe.put("PPE_LIST", ppeList);
				rowNumber++;
				ppe.put("RN", rowNumber);
				listResult.add(ppe);
			}
		}
		mapReturn.put("LIST", listResult);
		return mapReturn;
	}
	
	public Map getPPEDetailByUser(Map<Object, Object> param) throws Exception {
		List<Map<String, Object>> list = dao.getPPEDetailByUser(param);
		Map<String, Object> res = new HashedMap();
		res.put("EMP_NAME", list.get(0).get("EMP_NAME"));
		res.put("EMP_NO", list.get(0).get("EMP_NO"));
		res.put("EMP_DUTY", list.get(0).get("DUTY_NAME"));
		res.put("LIST", list);
		
		return res;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertPPEList(Map map) throws Exception {
		String ppesString = (String) map.get("PPE_LIST");
        Gson g = new Gson();
        List<Map> ppes = g.fromJson(ppesString, ArrayList.class);
        String REGI_EMP_NO = (String) map.get("REGI_EMP_NO");
        for(Map m: ppes) {
        	m.put("REGI_EMP_NO", REGI_EMP_NO);
        }
        int insertResult = 0;
        try {
        	insertResult = dao.insertPPEList(ppes);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void updatePPEList(Map map) throws Exception {
//		TransactionStatus txStatus =
//		        transactionManager.getTransaction(new DefaultTransactionDefinition());
		String ppesUpdateString = (String) map.get("PPE_LIST");
		String ppesInsertString = (String) map.get("PPE_LIST_INSERT");
		String ppesDeleteString = (String) map.get("LIST_PPE_ID_REMOVE");
        Gson g = new Gson();
        List<Map> ppesU = g.fromJson(ppesUpdateString, ArrayList.class);
        List<Map> ppesI = g.fromJson(ppesInsertString, ArrayList.class);
        List<Map> ppesD = g.fromJson(ppesDeleteString, ArrayList.class);
        
        String REGI_EMP_NO = (String) map.get("REGI_EMP_NO");
        for(Map m: ppesU) {
        	m.put("REGI_EMP_NO", REGI_EMP_NO);
//        	boolean check =(boolean) m.get("CHECK_RENEW");
//        	m.replace("CHECK_RENEW", check ? 1 : 0);
        }

        for(Map m: ppesI) {
        	m.put("REGI_EMP_NO", REGI_EMP_NO);
//        	boolean check =(boolean) m.get("CHECK_RENEW");
//        	m.replace("CHECK_RENEW", check ? 1 : 0);
        }
        
        
		// Delete then insert again
        int updateResult = 0;
        try {
        	if(ppesD.size() != 0) {
        		dao.deletePPEList(ppesD);
        	}
        	if(ppesI.size() != 0) {
        		dao.insertPPEList(ppesI);
        	}
	        for(Map m: ppesU) {  
	        	dao.updatePPE(m);
	        }
//	        transactionManager.commit(txStatus);
    		updateResult = 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
//		int rs = updateResult > 0 ? 1 : 0;
    		
//		return rs;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deletePPEList(Map<Object, Object> param) throws Exception {
		String listId = (String) param.get("LIST_PPE_ID_REMOVE");
		Gson g = new Gson();
		List<Map> ppesD = g.fromJson(listId, ArrayList.class);
		int deleteResult = 0;
		try {
//			for(Map m: ppesD) {
//	        	  dao.deletePPEList(m);
//	         }
			deleteResult = dao.deletePPEList(ppesD);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		int rs = deleteResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	public List getSubjectType() throws Exception {
		List list = dao.getSubjectType();
		
		return list;
	}
	
	public Map getBrandsByToolType(Map<Object, Object> param) throws Exception {
		Map map = dao.getBrandsByToolType(param);
		
		return map;
	}
	
	public List getStatusType() throws Exception {
		List list = dao.getStatusType();
		
		return list;
	}

	public List getInspectionList(Map param) throws Exception  {
		List list = dao.getInspectionListA(param);
//		list.addAll(dao.getInspectionListB(param));
//		list.addAll(dao.getInspectionListC(param));
		return list;
	}
}
