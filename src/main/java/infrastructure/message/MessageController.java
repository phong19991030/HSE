package infrastructure.message;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author A2M-moon
 *
 */
@Controller("messageController")
public class MessageController extends BaseController {


	

	/**
	 * MessageUtil
	 * @작성일    : 2015. 7. 23. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	@RequestMapping("/common/message")
	public ModelAndView getMessage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		String str ="";
		
//		ResourceUtil rutil = new ResourceUtil();
		
		
		if(parameter.get("msg")!= null && !parameter.get("msg").equals("")){
			
			
			str= ResourceUtil.getMessageInfo("message",(String) parameter.get("msg"));
//			str = ResourceUtil.getMessages((String) parameter.get("msg"));
			
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA",str);
		return mav;
	}


	
	
}
