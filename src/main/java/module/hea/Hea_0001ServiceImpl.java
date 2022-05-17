package module.hea;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.util.CastUtil;
import module.com.com_0001.Com_0001ServiceImpl;

@Service("Hea_0001ServiceImpl")
public class Hea_0001ServiceImpl {
	@Autowired
	private Hea_0001DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	public Map getEmpMgtList(Map<String, Object> args) throws Exception {
		Map cnt = dao.getEmpMgtCnt(args);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getEmpMgtList(args);
		map.put("PAGE", args.get("PAGE"));
		map.put("PAGE_SIZE", args.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
		
		return map;
	}
	
	public List<Map<String, Object>> getComList(Map<String, Object> args) throws Exception {
		return dao.getComList(args);
	}

	public Map<String, Object> getDetailInfo(Map<String, Object> args) throws Exception {
		return dao.getDetailInfo(args);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Map<String, Object> insert(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		
		List<Map> exprList = (List<Map>) args.get("EXPR_LIST");
		args.put("EXPR", "".equals(CastUtil.castToString(args.get("EXPR"))) ? null : args.get("EXPR"));
		
		try {
			int tmp = dao.insert(args);			
			result.put("INSERT_EMP_MGT", tmp > 0 ? 1 : 0);
			com0001Service.insertPaymentStatus(mav, args, "EMP_NO");
		}catch (Exception e) {
			throw new RuntimeException();
		}
		
		
		return result;
	}
	
	@Transactional
	public Map<String, Object> update(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		String EMP_NO = args.get("EMP_NO").toString();
		List<Map<String, Object>> exprList = (List<Map<String, Object>>) args.get("EXPR_LIST");
		int tmp = dao.update(args);
//		if (tmp > 0) {
//			for (Map<String, Object> map : exprList) {
//				String crud = map.get("PROCESS").toString();
//				map.put("EMP_NO", EMP_NO);
//				if (crud.equals("UPDATE")) {
//					tmp = dao.updateExpr(map);
//				}
//				if (crud.equals("INSERT")) {
//					tmp = dao.insertExpr(map);
//				}
//				if (crud.equals("DELETE")) {
//					tmp = dao.deleteExpr(map);
//				}
//			}			
//		}
		result.put("UPDATE_EMP_MGT", tmp > 0 ? 1 : 0);
		return result;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public Map<String, Object> delete(ModelAndView mav, Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
//		int n = dao.deleteExpr(args);
		int deleteEmpMgt = dao.delete(args);
		result.put("DELETE_EMP_MGT", deleteEmpMgt > 0 ? 1 : 0);
//      delete Payment
		
        com0001Service.deletePaymentStatus(mav, args, "EMP_NO");
		return result;
	}
	
	@Transactional
	public Map<String, Object> insertExpr(Map<String, Object> args) throws Exception {
		Map<String, Object> result = new HashMap<>();
		int insertExpr = dao.insert(args);
		result.put("INSERT_EMP_MGT", insertExpr > 0 ? 1 : 0);
		return result;
	}
}
