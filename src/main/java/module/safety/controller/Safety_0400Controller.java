package module.safety.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.safety.service.Safety_0200ServiceImpl;
import module.safety.service.Safety_0400ServiceImpl;

@Controller("Safety_0400Controller")
@RequestMapping(value = "/sft/sft_0401")
public class Safety_0400Controller extends BaseController {

	@Autowired
	private Safety_0400ServiceImpl service;
	
	@Autowired
	private Safety_0200ServiceImpl service0200;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		List<Map<Object, Object>> projects = service0200.getProjectList(parameter);
		List<Map<Object, Object>> users = service0200.getUserList(parameter);
		mav.addObject("users", users);
		mav.addObject("projects", projects);
		mav.setViewName("safety/safety_0400");
		mav.addObject("DATA", parameter);

		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getEmergResPlanList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);

		return mav;
	}

	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map data = service.getEmergencyById(parameter);
		mav.addObject("DATA", data);
		mav.setViewName("safety/safety_0402");
		return mav;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		List<Map<Object, Object>> projects = service0200.getProjectList(parameter);
		List<Map<Object, Object>> users = service0200.getUserList(parameter);
		mav.addObject("projects", projects);
		mav.addObject("users", users);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		parameter.put("CRUD", "C");
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0401");
		return mav;
	}

	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map data = new HashMap<>();
		if("U".equals(CRUD)) {
			data = service.getEmergencyById(parameter);
		}
		parameter.putAll(data);
		
		List<Map<Object, Object>> projects = service0200.getProjectList(parameter);
		List<Map<Object, Object>> users = service0200.getUserList(parameter);
		mav.addObject("projects", projects);
		mav.addObject("users", users);
		
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0401");
		return mav;
	}

	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getOne(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.getEmergencyById(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		;
		return mav;
	}

	@RequestMapping(value = "/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = 0;
		String CRUD = (String) parameter.get("CRUD");
        if("C".equals(CRUD)) {
			result = service.insert(mav, parameter);
		} else {
			result = service.update(parameter);
		}
		Map<Object, Object> map = new HashMap<Object, Object>();
		mav.setViewName("jsonView");
		map.put("RESULT_SAVE", result);
		mav.addObject("DATA", map);
		mav.setViewName("jsonView");
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
	
	@RequestMapping("/deleteEmergencyFile.ajax")
	public ModelAndView deleteEmergencyFile(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteEmergencyFile(parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}

}
