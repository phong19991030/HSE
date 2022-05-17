package module.safety.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.safety.service.Safety_0500ServiceImpl;
import module.sys_new.Doc_0100ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Safety_0500Controller")
@RequestMapping(value = "/sft/sft_0501")
public class Safety_0500Controller extends BaseController {

	@Autowired
	private Safety_0500ServiceImpl service;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Resource
	private Doc_0100ServiceImpl src;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("safety/safety_0500");
		mav.addObject("DATA", parameter);

		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		//config key
		String sysConfigKey1 = "STATUTORY_RENEW_SHP";
		parameter.put("STATUTORY_RENEW_SHP", sysConfigKey1);
		//config key
		String sysConfigKey2 = "STATUTORY_RENEW_DISABILITIES";
		parameter.put("STATUTORY_RENEW_DISABILITIES", sysConfigKey2);
		//config key
		String sysConfigKey3 = "STATUTORY_RENEW_PIPL";
		parameter.put("STATUTORY_RENEW_PIPL", sysConfigKey3);
		//config key
		String sysConfigKey4 = "STATUTORY_RENEW_RETIREMENT";
		parameter.put("STATUTORY_RENEW_RETIREMENT", sysConfigKey4);
		//config key
		String sysConfigKey5 = "STATUTORY_RENEW_SAFETY";
		parameter.put("STATUTORY_RENEW_SAFETY", sysConfigKey5);
		
		Map data = service.list(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}

	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("safety/safety_0502");
		Map data = new HashMap<>();
		data = service.get(parameter);
			parameter.putAll(data);
			mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map session = (Map) parameter.get("session");
		mav.addObject("INS_ID", session.get("USER_ID"));
		
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0501");
		
		//duty option 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "DUTY_CD"); 
    	List<Map<Object, Object>> dutyCds = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("dutyCds", dutyCds);
		return mav;
	}

	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map session = (Map) parameter.get("session");
		mav.addObject("UPS_ID", session.get("USER_ID"));
		
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		parameter.put("CRUD", "U");
		
		Map data = new HashMap<>();
			data = service.get(parameter);
		parameter.putAll(data);
		
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0501");
		return mav;
	}

	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getOne(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.get(parameter);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping(value = "/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = null;
		if (parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = service.update(parameter);
		} else {
			result = service.insert(mav, parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.delete(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/deleteEduFile.ajax")
	public ModelAndView deleteEduFile(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteEduFile(parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
}
