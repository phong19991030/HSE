package module.sys_new;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

@Controller("Sys_new_1100Controller")
@RequestMapping("/sys_new/sys_1100")
public class Sys_1100Controller extends BaseController{
	
	@Resource
	private Sys_1100ServiceImpl src;
	
	/* 리스트 페이지*/
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/sys_1100");
		return mav;
	}
	
	/* 리스트 데이터 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		List result = src.getComCodeList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/getComCodeListByComm_Cd.ajax")
	public ModelAndView getComCodeListByComm_Cd(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		List result = src.getComCodeListByComm_Cd(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 등록, 수정 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = null;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 삭제 */
	@RequestMapping("/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.delete(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 중복 체크 */
	@RequestMapping("/checkDuplicate.ajax")
	public ModelAndView checkDuplicate(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.checkDuplicateComCode(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	
	
}



