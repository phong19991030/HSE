package module.com.com_0001;

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

@Controller("Com_0001Controller")
@RequestMapping("/com/com_0001")
public class Com_0001Controller extends BaseController{
	
	@Autowired
	Com_0001ServiceImpl src;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0001/com_0001");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		List result = src.getPaymentList(parameter);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	@RequestMapping("/getMenuPaymentLst.ajax")
	public ModelAndView getMenuPaymentLst(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		List result = src.getMenuPaymentLst(parameter);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	@RequestMapping("/getPaymentCnt.ajax")
	public ModelAndView getPaymentCnt(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map result = src.getPaymentCnt(parameter);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
}
