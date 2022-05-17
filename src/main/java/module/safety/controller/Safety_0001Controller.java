package module.safety.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import infrastructure.inheritance.BaseController;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import module.safety.service.Safety_0001ServiceImpl;
import module.safety.service.Safety_0200ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Safety_0001Controller")
@RequestMapping(value = "/sft/sft_0001")
public class Safety_0001Controller extends BaseController {
	
	@Autowired
	private Safety_0001ServiceImpl service;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Autowired
	private Safety_0200ServiceImpl service0200;
	
	@Autowired
	private UtilService utilService;
	
	@RequestMapping("/formManual")
    public ModelAndView formNewManual(ModelAndView mav, HttpServletRequest request
			, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map data = new HashMap<>();
		if("U".equals(CRUD)) {
			data = service.getToolDetail(parameter);
		}
		parameter.putAll(data);
		
//		project status 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "TOOL_TYPE");
    	List<Map<Object, Object>> toolTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	mav.addObject("toolTypes", toolTypes);
    	
//		LOSS_OR_DAMAGE status 
    	Map<Object, Object> tmp1 = new HashMap<Object, Object>();
    	tmp1.put("COMM_CD", "TOOL_LOSS_DAMAGE");
    	List<Map<Object, Object>> lossDamageTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp1);
    	mav.addObject("lossDamageTypes", lossDamageTypes);
    	
    	mav.addObject("tmp", tmp);
    	
		mav.addObject("DATA", parameter);
        mav.setViewName("safety/safety_000101");
        return mav;
    }
	
    @RequestMapping("/detailForm")
    public ModelAndView detailManual(ModelAndView mav, HttpServletRequest request
                                        					, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        Map data = service.getToolDetail(parameter);
        
        mav.addObject("DATA", data);
        mav.setViewName("safety/safety_000102");
        return mav;
    }
	
    @RequestMapping(value = { "/saveManual.ajax" })
    public ModelAndView doSaveManual(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
        String CRUD = (String) parameter.get("CRUD");
        parameter.put("CORRECTION_DATE", "".equals(CastUtil.castToString(parameter.get("CORRECTION_DATE"))) ? null :  CastUtil.castToString(parameter.get("CORRECTION_DATE"))); 
        parameter.put("RENEW_DATE", "".equals(CastUtil.castToString(parameter.get("RENEW_DATE"))) ? null :  CastUtil.castToString(parameter.get("RENEW_DATE"))); 
        parameter.put("IMPORT_DATE", "".equals(CastUtil.castToString(parameter.get("IMPORT_DATE"))) ? null :  CastUtil.castToString(parameter.get("IMPORT_DATE")));
        
        int result = 0;
        if("C".equals(CRUD)) {
        	result = service.insertTool(mav, parameter);
        } else {
        	result = service.updateTool(parameter);
        }
        
        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put("TOOL_ID", parameter.get("TOOL_ID"));
        map.put("RESULT_SAVE", result);
        mav.addObject("DATA", map);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
    	Map session = (Map) parameter.get("session");
    	String user_uid = (String) session.get("USER_UID");
    	Map userInfo = new HashMap<>();
    	
    	userInfo.put("USER_UID", user_uid);
    	
//    	project status 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "TOOL_TYPE");
    	List<Map<Object, Object>> toolTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
//    	projects
    	List<Map<Object, Object>> projects = service0200.getProjectList(parameter);
    	mav.addObject("projects", projects);
    	
    	mav.addObject("USERROLE", userInfo);
    	mav.addObject("toolTypes", toolTypes);
    	mav.setViewName("safety/safety_0001");
    	mav.addObject("DATA", parameter);
        return mav;
	}
	
    @RequestMapping("/getData.ajax")
    public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        
		//config key
		String sysConfigKey = "TOOLS_RENEW_NUM";
		parameter.put("SYS_CONFIG_KEY", sysConfigKey);
        
        Map result = service.getRowList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
        return mav;
    }
    
    @RequestMapping("/getPPEList.ajax")
    public ModelAndView getPPEList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        parameter.put("TOOL_TYPE", "PPE");
        List list = service.getToolList(parameter);
        
        mav.addObject("DATA", list);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.delete(mav, parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping("/deleteManualFromList.ajax")
	public ModelAndView deleteManualFromList(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		int res = service.deleteManualFromList(parameter);

 		mav.addObject("DATA", res);
 		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping("/deleteToolFile.ajax")
	public ModelAndView deleteToolFile(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteToolFile(parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping("/getToolType.ajax")
    public ModelAndView getToolType(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        List result = service.getToolType();
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
        return mav;
    }
	
	@RequestMapping("/getBrandsByToolType.ajax")
    public ModelAndView getBrandsByToolType(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        
        List result = service.getBrandsByToolType(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
        return mav;
    }
	
}
