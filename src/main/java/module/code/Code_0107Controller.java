package module.code;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.ParameterUtil;

@Controller("Code_0107Controller")
@RequestMapping("/sys/sys_0107")
public class Code_0107Controller extends BaseController {

	@Autowired
	public Code_0101DAOImpl codeDao;

	@Autowired
	public Code_0101ServiceImpl service;

	@Autowired
	ServletContext context;

	@Autowired
	private UtilService utilService;

	@RequestMapping("/list")
	public ModelAndView doListMaintenanceCode(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
//		mav.setViewName(path + ":sys/sys_010107_maintain");
		mav.setViewName("sys/sys_010107");
		return mav;
	}

	@RequestMapping("/getMaintanceCode.ajax")
	public ModelAndView getMaintanceCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getMaintainceCode(parameter);
		// List listMainten = service.convertListToTree(list);

		mav.setViewName("jsonView");
		mav.addObject("RESULT_TYPE", jsonType);
		mav.addObject("DATA", ArrangeUtil.sortMapList(list, "CODE", "UP_CD", "LEV"));
		return mav;
	}
 
	@RequestMapping("/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView openDialogSelect(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
	
		mav.addAllObjects(parameter);
		mav.setViewName(path + ":sys/sys_01010701");

		return mav;
	}
 
	@RequestMapping("/addMaintenCode.ajax")
	public ModelAndView addMaintenCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map result = new HashMap();
		List check = service.checkDuplicateMaintenanceCode(parameter);
		if(check != null && check.size() > 0) {
			result.put("result", "false");
			result.put("msg", "dupl");
		}else {
			if(CRUD.equals("C")) {
				service.insertMaintenCode(parameter);
				result.put("result", "true");

			}else if(CRUD.equals("U")) {
				service.updateMaintenCode(parameter);
				result.put("result", "true");

			}
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
 
	@RequestMapping("/deleteMaintenCode.ajax")
	public ModelAndView deleteMaintenCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getMaintainceCode(parameter);
		List result = service.getAllChildId(list, parameter);
		Map map = new HashMap();
		map.put("list", result);
		service.deleteMainceCode(map);
		mav.setViewName("jsonView");
		return mav;
	}
 
}
