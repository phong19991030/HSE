package module.com.com_0301;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.sys_new.Doc_0100ServiceImpl;

@Controller("Com0301Controller")
@RequestMapping("/com/com_0301")
public class Com0301Controller extends BaseController  {
	@Resource
	private Doc_0100ServiceImpl src;
	
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0301/com_0301");
		mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = new HashMap();
		parameter.put("DOC_GROUP", "LHSP"); //Law on health and safety of production areas
		Map result = src.getDocList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/getData0302.ajax")
	public ModelAndView getData0302(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = new HashMap();
		parameter.put("DOC_GROUP", "CQB"); //Certificate of Quality Business
		Map result = src.getDocList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
}
