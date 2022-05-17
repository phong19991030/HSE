package applications.wsc;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

/**
 *  
 * @ Create date  : Nov 14, 2018 
 * @ Author     : anhpv
 * @ Description :
 * @ Status: TO-DO, DEBUG, TEST, COMPLETE  
 */
@Controller("WscController")
@RequestMapping("/wsc")
public class WscController extends BaseController{
	
	@RequestMapping("/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response, @PathVariable String path) throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);


		/**
		 * ModelAndView
		 */
		mav.setViewName(path + ":msv/wsc");

		mav.addObject("path", path);
		return mav;
	}
	
	
}
