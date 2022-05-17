package module.com.com_0001;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CastUtil;

/**
 * 
 * @author doanh
 *
 */
@Service("Com_0001ServiceImpl")
public class Com_0001ServiceImpl extends AbstractService{

	@Autowired
	Com_0001DAOImpl dao;
	
	public List getPaymentList(Map param) throws Exception {
        List list = dao.getPaymentList(param);
        return list;
    }
	
	public List getMenuPaymentLst(Map param) throws Exception {
        List list = dao.getMenuPaymentLst(param);
        return list;
    }
	
	public Map getPaymentCnt(Map param) throws Exception {
        Map map = dao.getPaymentCnt(param);
        return map;
    }
	
	public int insertPaymentStatus(ModelAndView mav, Map map, String fieldName) throws Exception {
		int insertResult = 0;
		
		String fieldId = CastUtil.castToString(map.get(fieldName));
		Map param = makeParamPayment(mav, fieldId);
		
		param.put("REGI_EMP_NO", map.get("REGI_EMP_NO"));
		param.put("STATUS", "PAYMENT_STATUS-1");
		param.put("REFERENCE_KEY", fieldName);
		
		insertResult = dao.insertPaymentStatus(param);
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	public int deletePaymentStatus(ModelAndView mav, Map map, String fieldName) throws Exception {
		int insertResult = 0;
		
		String fieldId = (String) map.get(fieldName);
		Map param = makeParamPayment(mav, fieldId);
		
		insertResult = dao.deletePaymentStatus(param);
		
		int rs = insertResult > 0 ? 1 : 0;
		
		return rs;
	}
	
	
	public Map makeParamPayment(ModelAndView mav, String fieldId) {
		
		Map map = new HashMap();
		String MENU_ID = "";
		if(mav.getModel().get("grant") != null) {
			Map<String, Object> model = mav.getModel();
			Map<String, Object> grant = (Map<String, Object>) model.get("grant");
			MENU_ID = (String) grant.get("MENU_ID");
		}else {
//			special case when screen have 2 tab call 2 different Controller 
			MENU_ID = "M_HSE_08_01";
		}
		
		map.put("MENU_ID", MENU_ID);
		map.put("REFERENCE_ID", fieldId);
		
		return map;
	}
	

}
