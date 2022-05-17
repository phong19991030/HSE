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
import module.safety.service.Safety_0001ServiceImpl;
import module.safety.service.Safety_0200ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Safety_0200Controller")
@RequestMapping(value = "/sft/sft_0201")
public class Safety_0200Controller extends BaseController {

	@Autowired
	private Safety_0200ServiceImpl service;
	
	@Autowired
	private Safety_0001ServiceImpl service0001;

	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
    	
    	Map<Object, Object> wt = new HashMap<Object, Object>();
    	wt.put("COMM_CD", "WORK_TYPE");
    	
    	List<Map<Object, Object>> workTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(wt);
		List<Map<Object, Object>> users = service.getUserList(parameter);
		List<Map<Object, Object>> projects = service.getProjectList(parameter);
		
		mav.addObject("workTypes", workTypes);
		mav.addObject("users", users);
		mav.addObject("projects", projects);
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0200");
		return mav;
	}

	/* 발전단지 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getSafeCourseList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);

		return mav;
	}
	
	
	@RequestMapping("/getALlByCompanyId.ajax")
	public ModelAndView getALlByCompanyId(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getALlByCompanyId(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);

		return mav;
	}
	/* 수정 페이지 이동 */

	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		Map result = null;
		if (parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = service.update(parameter);
		} else {
			result = service.insertTrainingCourse(mav, parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("safety/safety_0202");
		mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<Object, Object> edt = new HashMap<Object, Object>();
		edt.put("COMM_CD", "EDU_CONTENT_TYPE");
		List eduContentType = sys_1100ServiceImpl.getComCodeListByComm_Cd(edt);
		
//		workTypes status 
    	Map<Object, Object> wt = new HashMap<Object, Object>();
    	wt.put("COMM_CD", "WORK_TYPE");
    	
    	List<Map<Object, Object>> workTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(wt);
		List<Map<Object, Object>> users = service.getUserList(parameter);
		List<Map<Object, Object>> projects = service.getProjectList(parameter);
		mav.addObject("workTypes", workTypes);
		mav.addObject("users", users);
		mav.addObject("projects", projects);
		mav.addObject("eduContentType", eduContentType);
		
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		
		parameter.put("CRUD", "U");		
		Map data = new HashMap<>();
			data = service.getSafeCourseById(parameter);
		parameter.putAll(data);
		
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0201");
		return mav;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		
		Map<Object, Object> edt = new HashMap<Object, Object>();
		edt.put("COMM_CD", "EDU_CONTENT_TYPE");
		List eduContentType = sys_1100ServiceImpl.getComCodeListByComm_Cd(edt);
		
//		workTypes status 
    	Map<Object, Object> wt = new HashMap<Object, Object>();
    	wt.put("COMM_CD", "WORK_TYPE");
    	
    	List<Map<Object, Object>> workTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(wt);
		List<Map<Object, Object>> users = service.getUserList(parameter);
		List<Map<Object, Object>> projects = service.getProjectList(parameter);
		mav.addObject("workTypes", workTypes);
		mav.addObject("users", users);
		mav.addObject("projects", projects);
		mav.addObject("eduContentType", eduContentType);
		
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "CREATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("safety/safety_0201");
		return mav;
	}

	/* 상세 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getSafeCourseById(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.delete(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

}
