package module.com.com_0201;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.service.AbstractService;
import module.com.com_0001.Com_0001ServiceImpl;

@Service("Com_0201ServiceImpl")
public class Com_0201ServiceImpl extends AbstractService{
	
	@Autowired
	private Com_0201DAOImpl dao;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;

	@Transactional(propagation= Propagation.REQUIRED, readOnly=true)
	public Map getListTurbine(Map param) throws Exception {
//		Map search = (Map)param.get("search");
//    	if(search != null) {
//    		param.putAll(search);
//    	}
    	
    	Map cnt = dao.getListTurbineCnt(param);
		Map<String, Object> map = new HashMap<String, Object>();
		List list = dao.getListTurbine(param);
		map.put("PAGE", param.get("PAGE"));
		map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
		map.put("CNT", cnt.get("CNT"));
		map.put("LIST", list);
    	return map;
	}
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Map getDataForTurbine(Map map) throws Exception {
    	Map<String, Object> returnData = new HashMap<String, Object>();
    	Map session = (Map) map.get("session");
    	String crud = (String) map.get("CRUD");
    	Map turbine = new HashMap();
    	if(crud.equals("C")) {
    		turbine.put("INS_ID", session.get("USER_ID"));
    	} else {
    		turbine = dao.getTurbineDetail(map);
    	}
    	List farm = dao.getListFarm();
    	returnData.put("DATA", turbine);
    	returnData.put("FARM", farm);
    	return returnData;
    }
	
	@Transactional(rollbackFor = Exception.class)
    public Map insertTurbine(ModelAndView mav, Map param) throws Exception {
        Map result = new HashMap();        
        try {
        	int insert_turbine = dao.insertTurbine(param);
            result.put("INSERT_TURBINE_MGT", insert_turbine > 0 ? 1 : 0);
            result.put("TURBINE_ID", param.get("TURBINE_ID"));
        	
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "TURBINE_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}

        return result;
    }

	
	@Transactional(propagation=Propagation.REQUIRED)
    public Map updateTurbine(Map param) throws Exception {
        Map result = new HashMap();
        int update_turbine_cnt = dao.updateTurbine(param);
        result.put("UPDATE_TURBINE_MGT", update_turbine_cnt > 0 ? 1 : 0);

        return result;
    }

	
	@Transactional(propagation=Propagation.REQUIRED)
    public Map deleteTurbine(ModelAndView mav, Map param) throws Exception {
        Map result = new HashMap();
        boolean isDelete = false;
        try {
            int delete_turbine_cnt = dao.deleteTurbine(param);
            result.put("DELETE_TURBINE_MGT", delete_turbine_cnt > 0 ? 1 : 0);
            isDelete = delete_turbine_cnt > 0 ? true : false;
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "TURBINE_ID");
        }
        catch (DataIntegrityViolationException e) {
            isDelete = false;
            result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
        }
        result.put("IS_DELETE", isDelete);

        return result;
    }
	
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Map getDataForTurbineDetail(Map map, HttpServletRequest request) throws Exception {
		Map detailTurbine = dao.getTurbineDetail(map);
        return detailTurbine;
	}
}
