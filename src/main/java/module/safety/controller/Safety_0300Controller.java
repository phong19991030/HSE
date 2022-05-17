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
import module.safety.service.Safety_0300ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Safety_0300Controller")
@RequestMapping(value = "/sft/sft_0301")
public class Safety_0300Controller extends BaseController {

	@Autowired
	private Safety_0300ServiceImpl service;
	
	@Autowired
	private Safety_0200ServiceImpl safety0200service;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map<Object, Object> rp = new HashMap<Object, Object>();
    	rp.put("COMM_CD", "REPORT_STATUS");
    	
		List<Map<Object, Object>> reportTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(rp);
		mav.addObject("reportTypes", reportTypes);
		mav.setViewName("safety/safety_0300");
		mav.addObject("DATA", parameter);

		return mav;
	}
	
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = service.getAccidentList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}

	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map data = service.getAccidentById(parameter);
		mav.addObject("DATA", data);
		mav.setViewName("safety/safety_0302");
		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		parameter.put("CRUD","C");
		
		Map<Object, Object> rp = new HashMap<Object, Object>();
		rp.put("COMM_CD", "REPORT_STATUS");
    	
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		List<Map<Object, Object>> reports = sys_1100ServiceImpl.getComCodeListByComm_Cd(rp);
		
		mav.addObject("reports", reports);
		mav.addObject("projects", projects);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0301");
		return mav;
	}

	@RequestMapping("/formAccident")
    public ModelAndView formNewManual(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map data = new HashMap<>();
		if("U".equals(CRUD)) { 
			data = service.getAccidentById(parameter);
		}
		parameter.putAll(data);
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
//		project status 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "REPORT_STATUS");
    	List<Map<Object, Object>> reports = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("projects", projects);
    	mav.addObject("reports", reports);
    	mav.addObject("tmp", tmp);
    	
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0301");
        return mav;
    }
	
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getAccidentById(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.getAccidentById(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	@RequestMapping(value = "/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		int result = 0;
		if("C".equals(CRUD)) {
        	result = service.insertAccident(mav, parameter);
        } else {
        	result = service.updateAccident(parameter);
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
	
	@RequestMapping("/deleteAccidentFile.ajax")
	public ModelAndView deleteAccidentFile(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteAccidentFile(parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
}
