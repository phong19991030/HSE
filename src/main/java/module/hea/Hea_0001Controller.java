package module.hea;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.com.com_0101.Com_0101ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Hea_0001Controller")
@RequestMapping("/hea/hea_0001")
public class Hea_0001Controller extends BaseController{
	@Autowired
	private Hea_0001ServiceImpl service;
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Resource
	private Com_0101ServiceImpl com_0101Service;
	
	@RequestMapping(value = "/list")
	public ModelAndView getEmpMgtList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getEmpMgtList(parameter);
		
		Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "SAFE_COURSE_CERT");
    	List<Map<Object, Object>> safeCourseCertState = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	mav.addObject("safeCourseCertState", safeCourseCertState);
    	
    	Map<Object, Object> tmpPaid = new HashMap<Object, Object>();
    	tmpPaid.put("COMM_CD", "PAID_STATE");
    	List<Map<Object, Object>> paidState = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmpPaid);
    	mav.addObject("paidState", paidState);
    	
		mav.setViewName("hea/hea_0001");
		result.putAll(parameter);
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping(value = "/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		//config key
		String sysConfigKey = "EMPLOYEE_RENEW_NUM";
		parameter.put("SYS_CONFIG_KEY", sysConfigKey);
		
		Map search = (Map) parameter.get("search");
		if (search != null) {
			String SEARCH_ALL = search.get("all").toString();
			if (SEARCH_ALL.length() != 0) {
				parameter.put("SEARCH_ALL", SEARCH_ALL);
			}
		}
		
		Map result = service.getEmpMgtList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		//Get duty list
		Map map1 = new HashMap<>();
		map1.put("COMM_CD", "DUTY_CD");
		List<Map> comList = sys_1100ServiceImpl.getComCodeListByComm_Cd(map1);
		
		//Get PPE STATUS list
		Map map2 = new HashMap<>();
		map2.put("COMM_CD", "PAID_STATE");
		List<Map> ppeStatusList = sys_1100ServiceImpl.getComCodeListByComm_Cd(map2);
		
//		get EMP_POSITION lst
		Map positionMap = new HashMap<>();
		positionMap.put("COMM_CD", "EMP_POSITION");
		List<Map> positionList = sys_1100ServiceImpl.getComCodeListByComm_Cd(positionMap);
		mav.addObject("POSITION_LIST", positionList);
		
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("COM_LIST", comList);
		mav.addObject("PAID_LIST", ppeStatusList);
		mav.setViewName("hea/hea_000102");
		return mav;
	}
	
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		//Get duty list
		Map map = new HashMap<>();
		map.put("COMM_CD", "DUTY_CD");
		List<Map> comList = sys_1100ServiceImpl.getComCodeListByComm_Cd(map);
		
		//Get PPE STATUS list
		Map map2 = new HashMap<>();
		map2.put("COMM_CD", "PAID_STATE");
		List<Map> ppeStatusList = sys_1100ServiceImpl.getComCodeListByComm_Cd(map2);
		
//		get EMP_POSITION lst
		Map positionMap = new HashMap<>();
		positionMap.put("COMM_CD", "EMP_POSITION");
		List<Map> positionList = sys_1100ServiceImpl.getComCodeListByComm_Cd(positionMap);
		mav.addObject("POSITION_LIST", positionList);
		
		mav.addObject("COM_LIST", comList);
		mav.addObject("PAID_LIST", ppeStatusList);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("hea/hea_000102");
		return mav;
	}
	
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.getDetailInfo(parameter);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("hea/hea_000101");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.getDetailInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.delete(mav, parameter);	
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping(value = "/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map<String, Object> result = null;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = service.update(parameter);
		} else {
			result = service.insert(mav, parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/popupData/COMPANY.ajax")
	public ModelAndView getPopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		String TYPE = "COMPANY";
		List data = new ArrayList<Map>();
		switch(TYPE) {
			case "COMPANY":
				data = com_0101Service.getCompanyList(parameter);
				break;
			case "MENU-ACCESS":
				data = com_0101Service.getMenuAccessList(parameter);
				break;
			case "ID-CHECK":
				data = com_0101Service.duplicateCheckUserID(parameter);
				break;
			default:
				break;
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
}
