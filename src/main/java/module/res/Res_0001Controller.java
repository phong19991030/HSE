package module.res;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

@Controller
@RequestMapping(value = "/res/res_0001")
public class Res_0001Controller extends BaseController{

	@Autowired
	private Res_0001ServiceImpl service;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("res/res_0001");
		mav.addObject("DATA", parameter);
		return mav;
	}

	/* 발전단지 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getList(parameter);
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
		}
		else {
			result= service.insert(mav, parameter);
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
		mav.setViewName("res/res_000102");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		parameter.put("CRUD", "U");
		Map data = new HashMap<>();
		data = service.get(parameter);
		parameter.putAll(data);
	
		mav.addObject("DATA", parameter);
		mav.setViewName("res/res_000101");
		return mav;
	}

	/* 상세 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.get(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "CREATE");
		mav.addObject("CRUD", "C");
		mav.addObject("DATA", parameter);
		mav.setViewName("res/res_000101");
		return mav;
	}

	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.delete(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
}

