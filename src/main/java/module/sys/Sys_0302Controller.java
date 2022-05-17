package module.sys;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import applications.sys.Sys_0501DAOImpl;
import infrastructure.inheritance.BaseController;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import module.util.DateConverter;
import net.sf.json.JSONArray;

/**
 * 
 * @ Create date :  Sep 11, 2019  @ Author : anhpv @ Description : @ Status: TO-DO,
 * DEBUG, TEST, COMPLETE
 */
@Controller("Sys_0302Controller")
@RequestMapping("/sys/sys_0302")
public class Sys_0302Controller extends BaseController {
	@Autowired
	private Sys_0302DAOImpl sys0302dao;
	@Autowired
	private Sys_0301DAOImpl sys0301dao;
	@Autowired
	private Sys_0501DAOImpl sys0501dao;
	

	/**
	 * doList
	 * 
	 * @Description :
	 * @Output : ModelAndView
	 * @Create : Sept 11, 2019
	 * @Author : AnhPV
	 * @Status : TO-DO, DEBUG, TEST, COMPLETE
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * ModelAndView
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		mav.addAllObjects(parameter);
		mav.setViewName("sys/sys_0302");
		return mav;
	}
	
	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		Map param = (Map) parameter.get("search");
		if (null != param) {
			parameter.putAll(param);
		}
		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
		String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
		parameter.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		/**
		 * Logic
		 */
		// 프로그램내역(List)
		List list = sys0302dao.list("getListTurbine", parameter);

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA", list);
		return mav;
	}
	
	
	/**
	 * 기능명
	 * @throws Exception 
	 * 
	 * @작성일 : Sep 11, 2019
	 * @작성자 : AnhPV
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE
	 */
	@RequestMapping("/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView subForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception{
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		Map map = new HashMap<>();
		/**
		 * Logic
		 */
		try {
		if(parameter.get("GERATOR_ID") != null) {
			List<Map> list = sys0302dao.getTurbine(parameter); 
			if(list != null && !list.isEmpty()) {
				map.putAll((Map)list.get(0));
				int i = 0;
				for(Map obj: list) {
					String prop = obj.get("PROP").toString();
					Map<String, Object> mapProp = CastUtil.stringToMap(prop);
					if(mapProp.get("ROTOR") != null && !mapProp.get("ROTOR").equals("")) {
						map.put("MAIN_PART_ROTOR", obj.get("MAIN_PART_ID"));
						map.put("ROTOR_D", mapProp.get("ROTOR"));
					}
					if(mapProp.get("TOWER_HEIGHT") != null && !mapProp.get("TOWER_HEIGHT").equals("")) {
						map.put("MAIN_PART_TOWER", obj.get("MAIN_PART_ID"));
						map.put("TOWR_HGHT", mapProp.get("TOWER_HEIGHT"));
					}else{
						int val = ++i;
						map.put("BLDE_CD"+ val, obj.get("SERIAL_NO"));
						map.put("MAIN_PART_"+ val, obj.get("MAIN_PART_ID"));

						if(map.get("BLDE_CLOR") == null || map.get("BLDE_CLOR").equals("")) {
							if(mapProp.get("BLADE_COLOR") != null && !mapProp.get("BLADE_COLOR").equals("")) {
								map.put("BLDE_CLOR", mapProp.get("BLADE_COLOR"));
							}
							if(mapProp.get("BLADE_LENGTH") != null && !mapProp.get("BLADE_LENGTH").equals("")) {
								map.put("BLDE_LGTH", mapProp.get("BLADE_LENGTH"));
							}
							if(mapProp.get("BLADE_TYPE") != null && !mapProp.get("BLADE_TYPE").equals("")) {
								map.put("BLDE_TP", mapProp.get("BLADE_TYPE"));
							}
						}
						
					}
					
				}
			}
			
			
			
			map.put("CRUD", "U");
		}else {
			map.put("CRUD", "C");
		}

		}catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		/**
		 * ModelAndView
		 */
		mav.setViewName(path + ":sys/sys_030201");
		// mav.setViewName(type+":stm/stm_020501");
		mav.addObject("DATA", map);
		mav.addObject("path", path);
		return mav;
	}
	
	@RequestMapping( value = "/getFarm.ajax") // path = [popup,dialog,tab]
	public ModelAndView getCompany(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		// String type = (String) parameter.get("type");
		parameter.putAll(session);
		// String type = (String) parameter.get("type");
		
		/**
		 * Logic
		 */
		List list = sys0301dao.list("getListFarm2", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping( value = "/getFarmSys.ajax") // path = [popup,dialog,tab]
	public ModelAndView getFarmSys(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		// String type = (String) parameter.get("type");
		parameter.putAll(session);
		// String type = (String) parameter.get("type");
		
		/**
		 * Logic
		 */
		List list = sys0301dao.list("getListFarm", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping( value = "/doVerify.ajax") // path = [popup,dialog,tab]
	public ModelAndView doVerify(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		// String type = (String) parameter.get("type");
		
		/**
		 * Logic
		 */
//		List list = sys0301dao.list("getListFarm", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", "true");
		return mav;
	}
	
	@RequestMapping( value = "/getGroup.ajax") // path = [popup,dialog,tab]
	public ModelAndView getGroup(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		// String type = (String) parameter.get("type");
		parameter.putAll(session);
		/**
		 * Logic
		 */
		List list = sys0301dao.list("getListGroup2", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping( value = "/getGroupSys.ajax") // path = [popup,dialog,tab]
	public ModelAndView getGroupSys(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		// String type = (String) parameter.get("type");
		parameter.putAll(session);
		parameter.put("display_all", "true");
		/**
		 * Logic
		 */
		List list = sys0301dao.list("getListGroup", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping( value = "/getTurbine.ajax") // path = [popup,dialog,tab]
	public ModelAndView getTurbineByGroupID(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		// String type = (String) parameter.get("type");
		parameter.putAll(session);
		
		/**
		 * Logic
		 */
		List list = sys0302dao.list("getTurbineByGroupID2", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/getManufacturer.ajax")
	public ModelAndView getManufacturer(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);;
		
		List list = sys0501dao.list("getCompanyList", parameter);

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA",list);
		return mav;
	}

	
	
	@RequestMapping("/checkDoubleName.ajax")
	public ModelAndView checkDoubleName(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		
		List list = sys0302dao.list("checkDoubleName", parameter);
		
		if(list != null && !list.isEmpty()) {
			mav.addObject("DATA", "false");
		}else {
			mav.addObject("DATA", "true");
		}
		
		
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		return mav;
	}
	
	
	@RequestMapping("/duplCheckID.ajax")
	public ModelAndView duplCheckID(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map turbine = (Map) parameter.get("turbine");
		parameter.putAll(turbine);
		List list = sys0302dao.list("checkDuplID", parameter);
		
		 if(list != null && list.size() > 0) {
			mav.addObject("DATA", "dupl");
		}else {
			mav.addObject("DATA", "uniq");
		}
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping("/save01.ajax")
	public ModelAndView doSave01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		Map turbine = (Map) parameter.get("turbine");
//		parameter.putAll(farm);
		/**
		 * Logic
		 */
		Map result = new HashMap<>();
//		turbine.put("MANFCTURE_NM", parameter.get("MANFCTURE_NM"));
		try {
			String crud = parameter.get("CRUD").toString();
			
			if(crud.equals("C")) {
				List list = sys0302dao.list("checkDuplID", turbine);
				if(list != null && !list.isEmpty()) {
					result.put("result", "false");
					result.put("err_cd", "existed");
					result.put("msg", "WTG ID already have existed.");
					mav.addObject("DATA", result);
					mav.setViewName("jsonView");
					return mav;					
				}
				sys0302dao.insert("insertTurbine", turbine);
				sys0302dao.insertMainPart(turbine);
				request.setAttribute("EVENT", "INSERT");

			}else {
				sys0302dao.update("updateTurbine", turbine);
				sys0302dao.updateMainPart(turbine);
				request.setAttribute("EVENT", "UPDATE");
			}
			
			
			result.put("result", "true");
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			result.put("result", "false");
		}
	
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	@RequestMapping( value="/delete01.ajax", method=RequestMethod.POST)
	public ModelAndView doDelete01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
//		parameter.putAll(farm);
		/**
		 * Logic
		 */
		String rs;
		try {

			sys0302dao.insert("deleteTurbines", parameter);		
			rs = "true";
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			rs = "false";
		}
	
		/**
		 * ModelAndView
		 */
		request.setAttribute("EVENT", "DELETE");
		mav.setViewName("jsonView");
		mav.addObject("DATA", rs);
		return mav;
	}
}
