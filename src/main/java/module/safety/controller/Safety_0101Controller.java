package module.safety.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.safety.service.Safety_0001ServiceImpl;
import module.safety.service.Safety_0101ServiceImpl;

@Controller("Safety_0101Controller")
@RequestMapping(value = "/sft/sft_0101")
public class Safety_0101Controller extends BaseController {

	@Autowired
	private Safety_0101ServiceImpl service;
	
	@Autowired
	private Safety_0001ServiceImpl safety_0001ServiceImpl;
	
//	@RequestMapping("/registerForm")
//	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
//		
//		mav.addObject("PAGE_TITLE", "Register");
//		mav.addObject("PROCESS", "INSERT");
//		mav.addObject("DATA", parameter);
//		mav.setViewName("safety/safety_010101");
//		return mav;
//	}
	
	@RequestMapping("/formManual.ajax")
    public ModelAndView formNewManual(ModelAndView mav, HttpServletRequest request
			, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map data = new HashMap<>();
		parameter.putAll(data);
		
		mav.addObject("DATA", parameter);
        mav.setViewName("jsonView");
        return mav;
    }
	
    @RequestMapping("/detailForm")
    public ModelAndView detailManual(ModelAndView mav, HttpServletRequest request
            , HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        
        mav.addObject("DATA", parameter);
        mav.setViewName("safety/safety_010102");
        return mav;
    }
    
    @RequestMapping("/getDetailData.ajax")
    public ModelAndView getDetailData(ModelAndView mav, HttpServletRequest request
                                        					, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        Map detail = service.getPPEDetailByUser(parameter);
        
        mav.addObject("DATA", detail);
        mav.setViewName("jsonView");
        return mav;
    }
	
    @RequestMapping(value = { "/saveManual.ajax" })
    public ModelAndView doSaveManual(ModelAndView mav, HttpServletRequest request
                                    						, HttpServletResponse response) throws Exception {
        Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
        String CRUD = (String) parameter.get("CRUD");
        int result = 0;
        if("C".equals(CRUD)) {
        	result = service.insertPPEList(parameter);
        } else {
        	try {
        		service.updatePPEList(parameter);
            	result = 1;
			} catch (Exception e) {
				result = 0;
			}
        }
        parameter.put("RESULT_SAVE", result);
        
        mav.addObject("DATA", parameter);
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
    	
    	mav.addObject("USERROLE", userInfo);

        List toolType = service.getSubjectType();
        mav.addObject("toolType",toolType);
        
        List statusType = service.getStatusType();
        mav.addObject("statusType",statusType);
    	mav.setViewName("safety/safety_0101");
    	mav.addObject("DATA", parameter);
        return mav;
	}
	
    @RequestMapping("/getManualListData.ajax")
    public ModelAndView getManualListData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        Map map = service.getPPEList(parameter);
        
        mav.addObject("DATA", map);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deletePPEList(parameter);
		parameter.put("RESULT_DELETE", result);
		
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping("/getBrandsByToolType.ajax")
    public ModelAndView getBrandsByToolType(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        
        Map result = service.getBrandsByToolType(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
        return mav;
    }
	
	@RequestMapping("/getInspectionList.ajax")
    public ModelAndView getInspectionList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        
      //config key renew
  		String sysConfigKey = "EQUIPMENT_A_RENEW_NUM";
  		parameter.put("SYS_CONFIG_KEY_A", sysConfigKey);
  		
  		sysConfigKey = "EQUIPMENT_B_RENEW_NUM";
  		parameter.put("SYS_CONFIG_KEY_B", sysConfigKey);
  		
  		sysConfigKey = "EQUIPMENT_C_RENEW_NUM";
  		parameter.put("SYS_CONFIG_KEY_C", sysConfigKey);
  		//PPE_ID
  		parameter.put("PPE_ID_A", 1);
  		parameter.put("PPE_ID_B", 2);
  		parameter.put("PPE_ID_C", 3);
  		
        List result = service.getInspectionList(parameter); 
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
        return mav;
    }
}
