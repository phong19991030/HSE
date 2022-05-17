package module.sys;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Multiset.Entry;

import applications.auth.AuthController;
import infrastructure.inheritance.BaseController;
import infrastructure.log.LoggingServiceImpl;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import module.util.DateConverter;
import net.sf.json.JSONArray;

/**
 * 
 * @ Create date :  Sep 11, 2019  @ Author : anhpv @ Description : @ Status: TO-DO,
 * DEBUG, TEST, COMPLETE
 */
@Controller("Sys_0301Controller")
@RequestMapping("/sys/sys_0301")
public class Sys_0301Controller extends BaseController {
	@Autowired
	private Sys_0301DAOImpl sys0301dao;
	@Autowired
	private Sys_0302DAOImpl sys0302dao;
	
	protected Logger logger = LogManager.getLogger(Sys_0301Controller.class);

	
//	LoggingServiceImpl loggingService =new LoggingServiceImpl();

	
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
		mav.setViewName("sys/sys_0301");
		return mav;
	}
	
	@RequestMapping("/viewListTurbine")
	public ModelAndView doListTurbine(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * ModelAndView
		 */
		Map parameter = ParameterUtil.getParameterMap(request);

		mav.setViewName("dialog:sys/sys_030102");
		mav.addAllObjects(parameter);
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
		List list = sys0301dao.list("getListFarm", parameter);
		list.forEach(each -> {
			Map e = (Map) each;
			if(((Map) e).get("POWER") != null) {
				e.put("POWER_STR", e.get("POWER").toString());
			}else{
				e.put("POWER_STR", "--");
			}
		});
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA", list);
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
		
		List list = sys0301dao.list("checkDoubleName", parameter);
		
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
	
	
	/**
	 * 기능명
	 * 
	 * @작성일 : Sep 11, 2019
	 * @작성자 : AnhPV
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE
	 */
	@RequestMapping("/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView subForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		Map map = new HashMap<>();
		/**
		 * Logic
		 */
		try {
			
			if(parameter.get("FARM_ID") != null) {
				Map object = (Map) sys0301dao.object("getFarmById", parameter); 
				map.putAll(object);
				List listGroup = sys0301dao.list("getListGroup", parameter); 
				map.put("LIST_GROUP", parseListToJson(listGroup));
				
				
				map.put("CRUD", "U");
			} else {
				map.put("CRUD", "C");
				List lisGroupnull = new ArrayList();
				map.put("LIST_GROUP", parseListToJson(lisGroupnull));
			}

		}catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		/**
		 * ModelAndView
		 */
		mav.setViewName(path + ":sys/sys_030101");
		// mav.setViewName(type+":stm/stm_020501");
		mav.addObject("DATA", map);
		mav.addObject("path", path);
		return mav;
	}
	
	private String parseListToJson (List listProgram){
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		if(listProgram == null || listProgram.isEmpty()) {
			listProgram = new ArrayList<>();
		}
		try {
			json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(listProgram);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json;
	}
	
	
	@RequestMapping( value = "/getCompany.ajax") // path = [popup,dialog,tab]
	public ModelAndView getCompany(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		// String type = (String) parameter.get("type");
		
		/**
		 * Logic
		 */
		List list = sys0301dao.list("getCompany", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping( value = "/checkGroup.ajax") // path = [popup,dialog,tab]
	public ModelAndView checkGroup(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		// String type = (String) parameter.get("type");
		
		/**
		 * Logic
		 */
		List list = sys0302dao.list("getTurbineByGroupID", parameter);
		if(list!= null && !list.isEmpty()) {
			mav.addObject("DATA", "true");

		}else {
			mav.addObject("DATA", "false");

		}
		/**
		 * ModelAndView
		 */
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
		Map session = (Map) parameter.get("session");
		String rs;

		try {
			String crud = parameter.get("CRUD").toString();
			Map farm = (Map) parameter.get("farm");
			Map<String, Object> group = (Map<String, Object>) parameter.get("group");
			List<Map> listGroup = new ArrayList<>();
			Map<String, Object> temp = new HashMap<>();
			for (Map.Entry<String, Object> entry : group.entrySet()) {
//				System.out.println("Key : " + entry.getKey() + " Value : " + entry.getValue());
				if(entry.getValue() == null || entry.getValue().equals("")) {
					group.remove(entry);
				}else {
					temp.put(entry.getKey().toString().split("\\.", -1)[0], "");
				}			
			}
			for (Map.Entry<String, Object> entry : temp.entrySet()) {
				Map item = new HashMap();
				item.put("GROUP_ID", group.get(entry.getKey()+"."+"id"));
				item.put("GROUP_NM", group.get(entry.getKey()+"."+"name"));
//				temp.put(entry.getKey(), item);
				listGroup.add(item);
			}
			
			if(farm.get("COMPANY_ID") != null && !farm.get("COMPANY_ID").equals("")) {
				String[] companyArr = farm.get("COMPANY_ID").toString().split(",");
				
				List<String> listCompany = new ArrayList<String>();
				for(int i = 0; i< companyArr.length; i++) {
					listCompany.add(companyArr[i].trim());
				}
				farm.put("COMPANY_LIST", listCompany);
			}
			
			
			if(crud.equals("C")) {
				farm.put("INS_USER", session.get("USER_UID").toString());

				Map map = new HashMap();
				map.put("GROUP_NM", "NO GROUP");
				listGroup.add(map);
				farm.put("group", listGroup);		
				
				sys0301dao.insert("insertFarm", farm);
				sys0301dao.insert("insertFarmCompany", farm);

				if(!listGroup.isEmpty()) {
					sys0301dao.insert("insertGroup", farm);
				}
				
				// insert weader info				
//				new Thread(new Runnable() {
//				    public void run() {
//						try {
//						List<Map<String, String>> weatherList = new ArrayList<Map<String, String>>();
//						String lat = farm.get("LATITUDE").toString();
//						String lon = farm.get("LONGTUD").toString();
//						weatherList = cms_src.getWeatherInfo(lat, lon);
//						
//						if (weatherList != null) {
//							cms_src.insertListWeatherInfo(weatherList);
////							for (Map weatherInfo : weatherList) {
////								cms_src.insertWeatherInfo(weatherInfo);
////							}
//						}
//						
//						}catch (Exception e) {
//							e.printStackTrace();
//						}
//				    }
//				}).start();
				
			
				
			}else {
				
				if(!listGroup.isEmpty()) {
					farm.put("group", listGroup);		
				}
				
				List<Map> temp2 = new ArrayList<>();
				List<Map> listGroup2 = (List<Map>) sys0301dao.list("getListGroup", farm); 
				for(Map each: listGroup) {
					if(each.get("GROUP_ID") == null || each.get("GROUP_ID").equals("")) {
						each.put("STATUS", "C");
						request.setAttribute("EVENT", "INSERT");

						temp2.add(each);
					}else {
						each.put("STATUS", "U");
						request.setAttribute("EVENT", "UPDATE");

						temp2.add(each);
					}
				}
				
				for(Map each: listGroup2) {
					boolean check = true;
					for(Map each2: listGroup) {
						if(each2.get("GROUP_ID") == null) {
							continue;
						}
						if(each.get("GROUP_ID").equals(each2.get("GROUP_ID"))) {
							check = false;
							break;
						}
					}
					if(check) {
						each.put("STATUS", "D");
						temp2.add(each);
					}
				}
				farm.put("LIST_GROUP", temp2);
				sys0301dao.insert("updateFarm", farm);
				sys0301dao.insert("updateGroup", farm);
				sys0301dao.insert("updateFarmCompany", farm);

			}
			rs = "true";
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			rs = "false";
		}
		
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", rs);
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
		Map result = new HashMap();
		try {
			List listGen = sys0302dao.list("getListTurbine", parameter);
			if(listGen != null && !listGen.isEmpty()) {
				result.put("msg", "This farm has generators.");
				result.put("result", "false");
			}else {
				sys0301dao.delete("deleteFarms", parameter);	
				result.put("result", "true");
			}
			request.setAttribute("EVENT", "DELETE");


			
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			result.put("msg", e.toString());
			result.put("result", "false");
		}
	
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

}

