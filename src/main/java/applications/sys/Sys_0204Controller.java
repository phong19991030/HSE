package applications.sys;

import java.util.ArrayList;
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

import applications.util.SessionUtil;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.ParameterUtil;
import module.util.DateConverter;

/**
 * 권한-프로그램 관리 기능 : 이력 : 1) A2M-moon 최초생성 비고 :
 */
@Controller("Sys_0204Controller")
@RequestMapping("/sys/sys_0204")
public class Sys_0204Controller extends BaseController {
	public static final String POPUP_NEW_DOCUMENT = ":sys/sys_020401";
	public static final String POPUP_GET_DOCUMENT = ":sys/sys_020402";
	// @Resource(name="st0204DAOImpl")
	@Autowired
	private Sys_0204DAOImpl sys0204dao;
	@Autowired
	private Sys_0204ServiceImpl sys0204ser;

	/**
	 * 페이지 호출
	 * 
	 * @작성일 : 2014. 12. 1.
	 * @작성자 : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		/**
		 * ModelAndView
		 */
		mav.setViewName("sys/sys_0204");
		return mav;
	}

//	@RequestMapping("/01/list.{path}")
//	public ModelAndView doList01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		/**
//		 * ModelAndView
//		 */
//		mav.setViewName(path + ":sys/sys_020401");
//		return mav;
//	}

	@RequestMapping("/getRoleMgt.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * Parameter getParameterMap (Session 포함) getParameterMapWithOutSession (Session
		 * 포함 X)
		 */
		// Map parameter = ParameterUtil.getParameterMap(request);
		Map parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
		String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
		parameter.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		Map param = (Map) parameter.get("search");
		if (null != param) {
			parameter.putAll(param);
		}
		List list = sys0204dao.list("getRoleMgt", parameter);
		request.setAttribute("EVENT", "VIEW");
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("RESULT_TYPE", jsonType);
		mav.addObject("DATA", list);

		return mav;
	}

	@RequestMapping("/duplCheckID.ajax")
	public ModelAndView duplCheckID(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {


		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

	
		String res = sys0204dao.duplCheckID(parameter);

		mav.setViewName("jsonView");
		
		mav.addObject("DATA", res);
		return mav;
	}
	
	@RequestMapping("/saveRoleMgt.ajax") // saveRole.ajax
	public ModelAndView doSave01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		Map parameter = ParameterUtil.getParameterMap(request);
		String rs;
		try {
			rs = sys0204dao.saveRoleMgt(parameter, request);		
			rs = "true";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			exceptionLogging(e);
			rs = "false";
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", rs);
		return mav;
	}
	
	@RequestMapping("/checkInuse.ajax")
	public ModelAndView checkInuse(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		Map parameter = ParameterUtil.getParameterMap(request);
		String rs;
		List list = new ArrayList<>();
		try {
			list = sys0204dao.list("checkInuse", parameter);
			if(list.isEmpty()) {
				rs = "notuse";
			}else {
				rs = "inuse";
			}
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			rs = "false";
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", rs);
		return mav;
	}
	
	
	@RequestMapping("/delete01.ajax")
	public ModelAndView doDelete01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		Map parameter = ParameterUtil.getParameterMap(request);
		String rs;
		try {
		    rs = sys0204dao.deleteRow(parameter);
			request.setAttribute("EVENT", "DELETE");
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			rs = "false";
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", rs);
		return mav;
	}
	
/*	@RequestMapping("/poupNewDocument/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView popupNewDocument(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map map = new HashMap<>();

		map.put("ROLE_ID", parameter.get("ROLE_ID"));
		map.put("ROLE_NM", parameter.get("ROLE_NM"));
		map.put("USE_YN", parameter.get("USE_YN"));
		map.put("RMK", parameter.get("RMK"));
		map.put("CRUD", parameter.get("CRUD"));
		mav.setViewName(path + POPUP_NEW_DOCUMENT); // uncomment this line if not use polaris editor
		mav.addObject("path", path);
		mav.addObject("DATA", map);
		return mav;
	}*/
	@RequestMapping("/form.{path}")
	public ModelAndView newtabRoleMng(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,	@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map map = new HashMap<>();

		map.put("ROLE_ID", parameter.get("ROLE_ID"));
		map.put("ROLE_NM", parameter.get("ROLE_NM"));
		map.put("USE_YN", parameter.get("USE_YN"));
		map.put("RMK", parameter.get("RMK"));
		map.put("CRUD", parameter.get("CRUD"));
		mav.setViewName(path + ":sys/sys_020401");	
		mav.addObject("DATA", map);
		return mav;
	}	
	
	@RequestMapping("/formdetail.{path}") // path = [popup,dialog,tab]
	public ModelAndView popupGetDocument(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);

		Map map = new HashMap<>();
		map.put("ROLE_ID", parameter.get("ROLE_ID"));
		
		//mav.setViewName("sys/sys_020402"); // uncomment this line if not use polaris editor
		mav.setViewName(path + ":sys/sys_020402");	
		//mav.addObject("path", path);
		mav.addObject("DATA", map);
		
		return mav;	
	}
	
	@RequestMapping("/detail.{path}")
	public ModelAndView detail(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,	@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map map = new HashMap<>();
		map.put("ROLE_ID", parameter.get("ROLE_ID"));
		
		mav.setViewName(path +"sys/sys_020402");	
		mav.addObject("DATA", map);
		return mav;	
	}	
	
	@RequestMapping("/getPgmForRole.ajax") // getDataUser.ajax
	public ModelAndView getData04(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		/**
		 * Parameter 
		 * getParameterMap (Session 포함)
		 * getParameterMapWithOutSession (Session 포함 X)
		 */
		//Map parameter = ParameterUtil.getParameterMap(request);
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		List list = sys0204dao.list("getPgmForRole", parameter);

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView"); 
		mav.addObject("RESULT_TYPE", jsonType);
		mav.addObject("DATA", ArrangeUtil.sortMapList(list,"MENU_ID", "UP_MENU_ID", "LEV"));

		return mav;		

	}
	
	@RequestMapping("/save04.ajax") // saveRolePgm.ajax
	public ModelAndView doSave04(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
			
		String result = sys0204dao.savePgmForRole(parameter, request);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
}