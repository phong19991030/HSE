package module.sys_new;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Sys_new_0900Controller")
@RequestMapping("/sys_new/sys_0900")
public class Sys_0900Controller extends BaseController{
	
	@Resource
	private Sys_0900ServiceImpl src;
	
	@Autowired
	private ServletContext servletContext;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		mav.setViewName("sys_new/sys_0900");
		return mav;
	}
	
	/* 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getRowList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 팝업 */
	@RequestMapping("/popupData/{TYPE}.ajax")
	public ModelAndView getPopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable("TYPE") String TYPE) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		if(request.getParameter("ALARM_LIST") != null) {
			//String jsonA = request.getParameter("ALARM_LIST");
			String jsonA = (String) parameter.get("ALARM_LIST");
			List listA = new ArrayList();
			if(jsonA != null) {
				JSONArray arr = JSONArray.fromObject(jsonA);
				for(Object obj : arr) {
					Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
					
					// ACTION
					JSONArray jsonAction = JSONArray.fromObject(m.get("ALARM_ACTION_LIST"));
					List action_list = new ArrayList();
					for(Object obj2 : jsonAction) {
						Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
						action_list.add(m2);
					}
					m.put("ALARM_ACTION_LIST", action_list);
					
					// PART
					JSONArray jsonPart = JSONArray.fromObject(m.get("ALARM_PART_LIST"));
					List part_list = new ArrayList();
					for(Object obj2 : jsonPart) {
						Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
						part_list.add(m2);
					}
					m.put("ALARM_PART_LIST", part_list);
					
					// TOOL
					JSONArray jsonTool = JSONArray.fromObject(m.get("ALARM_TOOL_LIST"));
					List tool_list = new ArrayList();
					for(Object obj2 : jsonTool) {
						Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
						tool_list.add(m2);
					}
					m.put("ALARM_TOOL_LIST", tool_list);
					
					// PPE
					JSONArray jsonPpe = JSONArray.fromObject(m.get("ALARM_PPE_LIST"));
					List ppe_list = new ArrayList();
					for(Object obj2 : jsonPpe) {
						Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
						ppe_list.add(m2);
					}
					m.put("ALARM_PPE_LIST", ppe_list);
					
					listA.add(m);
				}
			}
			parameter.put("ALARM_LIST", listA);
		}
		
		
		
		Map map = new HashMap<>();
		List list = new ArrayList<>();
		switch(TYPE) {
			case "TURBINE-MODEL":
				list = src.getTurbineModelList(parameter);
				mav.addObject("DATA", list);
				break;
			case "duplicateCheck":
				map = src.duplicateCheckAlarmSubCode(parameter);
				mav.addObject("DATA", map);
				break;
			case "insertAlarmCode":
				map = src.insertAlarmCode(parameter);
				mav.addObject("DATA", map);
				break;
			case "updateAlarmCode":
				map = src.updateAlarmCode(parameter);
				mav.addObject("DATA", map);
				break;
			case "deleteAlarmCode":
				map = src.deleteAlarmCode(parameter);
				mav.addObject("DATA", map);
				break;
			default:
				break;
		}
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	/* 등록 페이지 이동  */
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.setViewName("sys_new/sys_0901");
		return mav;
	}
	
	/* 수정 페이지 이동  */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/sys_0901");
		return mav;
	}
	
	/* 저장 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		/* JSON String => List, Map으로 변환 */ 
		// MENU_ACCESS_LIST
		//String jsonA = request.getParameter("ALARM_LIST");
		String jsonA = (String) parameter.get("ALARM_LIST");
		List listA = new ArrayList();
		if(jsonA != null) {
			JSONArray arr = JSONArray.fromObject(jsonA);
			for(Object obj : arr) {
				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
				
				// ACTION
				JSONArray jsonAction = JSONArray.fromObject(m.get("ALARM_ACTION_LIST"));
				List action_list = new ArrayList();
				for(Object obj2 : jsonAction) {
					Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
					action_list.add(m2);
				}
				m.put("ALARM_ACTION_LIST", action_list);
				
				// PART
				JSONArray jsonPart = JSONArray.fromObject(m.get("ALARM_PART_LIST"));
				List part_list = new ArrayList();
				for(Object obj2 : jsonPart) {
					Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
					part_list.add(m2);
				}
				m.put("ALARM_PART_LIST", part_list);
				
				// TOOL
				JSONArray jsonTool = JSONArray.fromObject(m.get("ALARM_TOOL_LIST"));
				List tool_list = new ArrayList();
				for(Object obj2 : jsonTool) {
					Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
					tool_list.add(m2);
				}
				m.put("ALARM_TOOL_LIST", tool_list);
				
				// PPE
				JSONArray jsonPpe = JSONArray.fromObject(m.get("ALARM_PPE_LIST"));
				List ppe_list = new ArrayList();
				for(Object obj2 : jsonPpe) {
					Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject)obj2, java.util.HashMap.class);
					ppe_list.add(m2);
				}
				m.put("ALARM_PPE_LIST", ppe_list);
				
				listA.add(m);
			}
		}
		parameter.put("ALARM_LIST", listA);
		
		Map result = null;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("sys_new/sys_0902");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 유저 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getAlarmGroupCodeInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 알람 리스트 조회 */
	@RequestMapping("/detailForm/getAlarmList.ajax")
	public ModelAndView getAlarmList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getAlarmList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	

	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.delete(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
}
