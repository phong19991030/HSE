package applications.code;

import infrastructure.util.ParameterUtil;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller("codeController")
@RequestMapping("/common/code")
public class CodeController{
	
	@Autowired 
	private CodeDAOImpl codeDao;
	
	@RequestMapping("code")
	public ModelAndView doAjax(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		String cls = (String)parameter.get("CLS");
		
		/**
    	 * Init
    	 */
		List list = codeDao.list("commCode", parameter);

		/**
		 * Business Logic
		 */

	    /**
		 * ModelAndView
		 */
	    ModelAndView mav = new ModelAndView();
	    mav.setViewName("jsonView");
	    mav.addObject("DATA", list);
	    
		return mav;
	}
	
	@RequestMapping("/getBU_CodeByParent")
	public ModelAndView doAjaxBusinessUnitCode(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		@SuppressWarnings("unchecked")
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		@SuppressWarnings("rawtypes")
		List list = codeDao.list("commBU_Code", parameter);

	    ModelAndView mav = new ModelAndView();
	    mav.setViewName("jsonView");
	    mav.addObject("DATA", list);
	    
		return mav;
	}
}