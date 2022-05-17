package module.com.com_0404;

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

@Controller("Com0404Controller")
@RequestMapping("/com/com_0404")
public class Com0404Controller extends BaseController{
	@Resource
	private Doc_0100ServiceImpl src;
	
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0404/com_0404");
		mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = new HashMap();
		parameter.put("DOC_GROUP", "OG"); //Overseas Guidelines
		Map result = src.getDocList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/listCom0405")
	public ModelAndView listCom0405(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0405/com_0405");
		mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/getDataCom0405.ajax")
	public ModelAndView getDataCom0405(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = new HashMap();
		parameter.put("DOC_GROUP", "RG"); //Domestic guidelines
		Map result = src.getDocList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
}
