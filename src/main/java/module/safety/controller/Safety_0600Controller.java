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
import module.safety.service.Safety_0600ServiceImpl;

@Controller("Safety_0600Controller")
@RequestMapping(value = "/sft/sft_0601")
public class Safety_0600Controller extends BaseController {

	@Autowired
	private Safety_0600ServiceImpl service;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("safety/safety_0600");
		mav.addObject("DATA", parameter);

		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
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
		mav.setViewName("safety/safety_0602");

		mav.addObject("DATA", parameter);
		
		return mav;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("CRUD", "C");
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0601");
		return mav;
	}

	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		parameter.put("CRUD", "U");
		
		Map data = new HashMap<>();
			data = service.get(parameter);
		parameter.putAll(data);
		
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0601");
		return mav;
	}

	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getOne(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.get(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		;
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

}
