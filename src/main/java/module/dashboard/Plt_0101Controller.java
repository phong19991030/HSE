package module.dashboard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

	
	
@Controller("Plt_0101Controller")
@RequestMapping("/plt/plt_0101")
public class Plt_0101Controller extends BaseController {

	
	@Autowired
	private PortletServiceImpl portletServiceImpl;

	@RequestMapping("/list")
	public ModelAndView doList02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		String isAdmin= portletServiceImpl.checkAdmin(parameter);
		/**
		 * ModelAndView
		 */
		portletServiceImpl.createVersion(session);
		mav.addObject("IS_ADMIN", isAdmin);
		
		mav.setViewName("portal/setting/setting");
		// mav.setViewName(type+":stm/stm_020501");
//		mav.addObject("DATA", map);
//		mav.addObject("path", path);
		return mav;
	}
	
//	@RequestMapping("/getData01") 
//	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		/**
//		 * Parameter
//		 */
//
//		Map parameter = ParameterUtil.getParameterMap(request);
//		Map session = (Map) parameter.get("session");
//		
//		
//		
//		List list = portletServiceImpl.getWidgetsDataByActive(parameter);
//		/**
//		 * ModelAndView
//		 */
//		mav.setViewName("jsonView");
//		mav.addObject("DATA", list);
//		return mav;
//	}
	
	@RequestMapping("/getData02.ajax") 
	public ModelAndView getData02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		
		
		
		List list = portletServiceImpl.getWidgetsData(parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/getData03.ajax") 
	public ModelAndView getData03(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		
		
		
		List list = portletServiceImpl.getCurrentUsedWidgets(session);
		

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);

		return mav;
	}
	
	@RequestMapping("/getListDefault.ajax") 
	public ModelAndView getListDefault(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map param = new HashMap<>();
		param.put("USER_UID", "000");
		List list2 = portletServiceImpl.getDefaultWidgets(param);

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list2);

		return mav;
	}
	
	@RequestMapping("/getData04.ajax") 
	public ModelAndView getData04(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		
		
		
		List list = portletServiceImpl.getAllVesion();
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/getData05.ajax") 
	public ModelAndView getData05(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		
		
		
		List list = portletServiceImpl.getWidgetsData(parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/save01.ajax") 
	public ModelAndView doSave01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response){
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		
		try {
			portletServiceImpl.savePortlet(parameter);
			mav.addObject("DATA", "true");

		} catch (Exception e) {
			e.printStackTrace();
			mav.addObject("DATA", "false");

		}
	
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	@RequestMapping("/form.{path}")
	public ModelAndView doDialog01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		String isAdmin= portletServiceImpl.checkAdmin(parameter);
		if(!isAdmin.equals("true")) {
			throw new Exception("Not admin");
		}
		mav.setViewName(path + ":portal/setting/addWidgetDialog");
		if(null !=parameter.get("WIDGET_ID")) {
			Map obj = portletServiceImpl.getWidgetById(parameter);
			parameter.putAll(obj);
		}
		
		mav.addObject("path", path);
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	@RequestMapping("/edit/form.{path}")
	public ModelAndView doDialog03(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		mav.setViewName(path + ":portal/setting/editWidgetDialog");

		mav.addObject("path", path);
		mav.addObject("DATA", parameter);

		return mav;
	} 
	
	
	
	@RequestMapping("/preivew/form.{path}")
	public ModelAndView doDialog02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) {
		Map parameter = ParameterUtil.getParameterMap(request);

		mav.setViewName(path + ":portal/setting/previewDialog");

		mav.addObject("path", path);
		if(parameter.get("WIDGETS") != null) {
			mav.addObject("DATA", parameter.get("WIDGETS"));

		}
		return mav;
	}

	@RequestMapping("/save02.ajax") 
	public ModelAndView doSave02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		String isAdmin= portletServiceImpl.checkAdmin(parameter);		
		if(!isAdmin.equals("true")) {
			throw new Exception("Not admin");
		}
		
		String result = "true";
		Map mapRs = new HashMap<>();
		String crud =  parameter.get("CRUD") != null ? parameter.get("CRUD").toString(): "";
		try {
			if(crud.equals("C")) {
				Object object  = portletServiceImpl.addWidget(parameter);
				mapRs = new HashMap<>();
				mapRs.putAll(parameter);
			}else {
				portletServiceImpl.saveWidget(parameter);

			}
			

		} catch (Exception e) {
			e.printStackTrace();
			result = "false";
		}
	
		mapRs.put("result", result);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", mapRs);
		return mav;
	}
	
	

	
	
	@RequestMapping("/edit/save01.ajax") 
	public ModelAndView doSave03(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		String result = "true";
		Map mapRs = new HashMap<>();

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		try {
			 portletServiceImpl.saveWidget(parameter);
			 mapRs.putAll(parameter);
		}catch (Exception e) {
			result = "false";
			e.printStackTrace();
		}
		mapRs.put("result",result);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", mapRs);
		return mav;
	}
	
	
	@RequestMapping("/edit/delete01.ajax") 
	public ModelAndView doDelete01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		String result = "true";
		Map mapRs = new HashMap<>();

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		try {
			 portletServiceImpl.deleteWidget(parameter);
		}catch (Exception e) {
			result = "false";
			e.printStackTrace();
		}
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/delete02.ajax") 
	public ModelAndView doDelete02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		String result = "true";
		Map mapRs = new HashMap<>();

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		try {
			 portletServiceImpl.deleteCopy(parameter);
		}catch (Exception e) {
			result = "false";
			e.printStackTrace();
		}
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	@RequestMapping("/portletView/list")
	public ModelAndView doList03(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
//		List list = portletServiceImpl.getWidgetsData();
		
		/**
		 * ModelAndView
		 */
		mav.setViewName("layout/tiles/portlet");
		// mav.setViewName(type+":stm/stm_020501");
//		mav.addObject("DATA", list);
//		mav.addObject("path", path);
		return mav;
	}
	
}
