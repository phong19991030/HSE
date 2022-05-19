package module.sys_new;

import java.io.Console;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

@Controller("Doc_1100Controller")
@RequestMapping("/sys_new/doc_1100")
public class Doc_1100Controller extends BaseController {
	@Resource
	private Doc_0100ServiceImpl src;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/doc_0100");
		mav.addObject("DATA", parameter);
		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getDocList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/getGroup.ajax")
	public ModelAndView getDocGroup(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		List<String> result = src.getDocGroup();
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);

		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.setViewName("sys_new/doc_0101");
		return mav;
	}

	@RequestMapping("/detailForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/doc_0101");
		return mav;
	}

	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getDocInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = null;
		if (parameter.containsKey("DOC_GROUP"))
			parameter.put("DOC_GROUP", String.valueOf(parameter.get("DOC_GROUP")).toUpperCase());
		
		if (parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView deleteDoc(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result1 = src.getDocInfo(parameter);
  		Map result = src.delete(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

}
