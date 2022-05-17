package module.license;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import module.safety.service.Safety_0200ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Tsk_0100Controller")
@RequestMapping(value = "/tsk/tsk_0100")
public class Tsk_0100Controller extends BaseController {
	
	@Autowired
	private Tsk_0100ServiceImpl licenseService;
	
	@Autowired
	private Safety_0200ServiceImpl safety0200service;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Autowired
	private Tsk_0100DAOImpl tsk_0100Dao;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);             
		Map<Object, Object> edt = new HashMap<Object, Object>();
		
		Map<Object, Object> ras = new HashMap<Object, Object>();
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		
		Map<Object, Object> wt = new HashMap<Object, Object>();
		wt.put("COMM_CD", "WORK_TYPE");
		List workTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(wt);
		
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		mav.addObject("projects", projects);
		mav.setViewName("license/tsk_0100");
		mav.addObject("workTypes", workTypes);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("DATA", parameter);

		return mav;
	}
	
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = licenseService.getLicenseList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}
	
	@RequestMapping("/getLicenseListByCompanyId.ajax")
	public ModelAndView getLicenseListByCompanyId(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = licenseService.getLicenseListByCompanyId(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map<Object, Object> mc = new HashMap<Object, Object>();
		mc.put("COMM_CD", "MATER_CONSUM");
		List materConsums = sys_1100ServiceImpl.getComCodeListByComm_Cd(mc);
		
		Map<Object, Object> ras = new HashMap<Object, Object>();
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		
		Map<Object, Object> wt = new HashMap<Object, Object>();
		wt.put("COMM_CD", "WORK_TYPE");
		List workTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(wt);
		
		Map<Object, Object> tmpPAW = new HashMap<Object, Object>();
		tmpPAW.put("COMM_CD", "WPM_PAW_ITEM");
    	List<Map<Object, Object>> PAW_ITEMs = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmpPAW);
    	
    	Map<Object, Object> tmpPTW = new HashMap<Object, Object>();
    	tmpPTW.put("COMM_CD", "WPM_PTW_ITEM");
    	List<Map<Object, Object>> PTW_ITEMs = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmpPTW);
    	
    	List items = new ArrayList();
    	for (int i = 0; i < PAW_ITEMs.size(); i++) {
    		Map WPMItem = new HashMap();
    		WPMItem.put("WPM_PAW_ITEM", PAW_ITEMs.get(i)); 
    		WPMItem.put("WPM_PTW_ITEM", PTW_ITEMs.get(i));
    		items.add(WPMItem);
    		
		}
    	
    	mav.addObject("WPMItems", items);
    	mav.addObject("WPM_PTW_ITEM", PTW_ITEMs);
		
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		
		mav.addObject("materConsums", materConsums);
		mav.addObject("workTypes", workTypes);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("projects", projects);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("license/tsk_0101");
		return mav;
	}
	
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map data = new HashMap<>();
		if("U".equals(CRUD)) {
			data = licenseService.getLicenseInfo(parameter);
		}
		parameter.putAll(data);
		
		Map<Object, Object> mc = new HashMap<Object, Object>();
		mc.put("COMM_CD", "MATER_CONSUM");
		List materConsums = sys_1100ServiceImpl.getComCodeListByComm_Cd(mc);
		
		Map<Object, Object> ras = new HashMap<Object, Object>();
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		
		Map<Object, Object> wt = new HashMap<Object, Object>();
		wt.put("COMM_CD", "WORK_TYPE");
		List workTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(wt);
		
		Map<Object, Object> tmpPAW = new HashMap<Object, Object>();
		tmpPAW.put("COMM_CD", "WPM_PAW_ITEM");
    	List<Map<Object, Object>> PAW_ITEMs = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmpPAW);
    	
    	Map<Object, Object> tmpPTW = new HashMap<Object, Object>();
    	tmpPTW.put("COMM_CD", "WPM_PTW_ITEM");
    	List<Map<Object, Object>> PTW_ITEMs = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmpPTW);
    	
    	List items = new ArrayList();
    	for (int i = 0; i < PAW_ITEMs.size(); i++) {
    		Map WPMItem = new HashMap();
    		WPMItem.put("WPM_PAW_ITEM", PAW_ITEMs.get(i)); 
    		WPMItem.put("WPM_PTW_ITEM", PTW_ITEMs.get(i));
    		items.add(WPMItem);
    		
		}
    	
    	mav.addObject("WPMItems", items);
    	mav.addObject("WPM_PTW_ITEM", PTW_ITEMs);
		
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		
		mav.addObject("materConsums", materConsums);
		mav.addObject("workTypes", workTypes);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("projects", projects);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("license/tsk_0101");
		return mav;
	}
	
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map data = licenseService.getLicenseInfo(parameter);
		mav.addObject("DATA", data);
		mav.setViewName("license/tsk_0102");
		return mav;
	}
	
	
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = licenseService.delete(mav, parameter);	
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
	
	
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getLicenseInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = licenseService.getLicenseInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
 		return mav;
	}
	
	
	@RequestMapping(value = { "/save.ajax" })
    public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
        String CRUD = (String) parameter.get("CRUD");
        int result = 0;
        if("C".equals(CRUD)) {
        	result = licenseService.insert(mav, parameter);
        } else {
        	result = licenseService.update(parameter);
        }
        
        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put("TOOL_ID", parameter.get("TOOL_ID"));
        map.put("RESULT_SAVE", result);
        mav.addObject("DATA", map);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/popupData/{TYPE}.ajax")
	public ModelAndView getPopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable("TYPE") String TYPE) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		List data = new ArrayList<Map>();

		
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
	
	@RequestMapping("/getWorkCWithLicenseId.ajax")
	public ModelAndView getWorkCWithLicenseId(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// getParameterMapWithOutSession (Session 포함 X)
		List list = new ArrayList();
		Map parameter = ParameterUtil.getParameterMap(request);
		String LICENSE_ID = CastUtil.castToString(parameter.get("strLicenseId"));
		if(!"".equals(LICENSE_ID)) {
			parameter.put("LICENSE_ID", LICENSE_ID);
			
			list = tsk_0100Dao.list("getWorkCWithLicenseId", parameter);
		}
		
		
		mav.setViewName("jsonView");

		mav.addObject("DATA", list);
		return mav;
	}
}
