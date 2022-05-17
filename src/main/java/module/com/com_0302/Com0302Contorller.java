package module.com.com_0302;

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

@Controller("Com0302Contorller")
@RequestMapping("/com/com_0302")
public class Com0302Contorller extends BaseController {
	@Resource
	private Doc_0100ServiceImpl src;
	
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0302/com_0302");
		mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = new HashMap();
		parameter.put("DOC_GROUP", "CQB"); //Certificate of Quality Business
		Map result = src.getDocList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
}
