package module.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("DemoController")
@RequestMapping(value = "/demo21/demo22/")
public class DemoController {
	
	@RequestMapping(value = "/list")
	public String demo() {
		return "sys_new/doc_0100";
	}
}
