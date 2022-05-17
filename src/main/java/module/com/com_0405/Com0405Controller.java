package module.com.com_0405;

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

@Controller("Com0405Controller")
@RequestMapping(value = "/com/com_0405")
public class Com0405Controller extends BaseController{

	@Autowired
	private Com0405ServiceImpl com0405Service;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0405/com_0405");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = com0405Service.getCompanyList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}
	
	@RequestMapping("/getAllCompanys.ajax")
	public ModelAndView getAllCompanys(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = com0405Service.getAllCompanys(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.setViewName("com/com_0405/com_040501");
		return mav;
	}
	
	
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("com/com_0405/com_040501");
		return mav;
	}
	
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = com0405Service.getCompanyInfo(parameter);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("com/com_0405/com_040502");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = com0405Service.deleteCompany(parameter);	
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getCompanyInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = com0405Service.getCompanyInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
 		return mav;
	}

	
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		Map result = null;
		
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = com0405Service.updateCompany(parameter);                       
		} else {
			result = com0405Service.insertCompany(parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
}
