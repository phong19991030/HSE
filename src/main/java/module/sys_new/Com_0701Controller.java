package module.sys_new;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;

@Controller("com_0701Controller")
@RequestMapping("/com/com_0701")
public class Com_0701Controller extends BaseController {
	
	@RequestMapping("/list")
public ModelAndView list(ModelAndView mav) {
		mav.setViewName("test/project/list");
		return mav;
	}

}
