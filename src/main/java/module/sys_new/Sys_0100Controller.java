package module.sys_new;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Sys_new_0100Controller")
@RequestMapping("/sys_new/sys_0100")
public class Sys_0100Controller extends BaseController{

	@Resource
	private Sys_0100ServiceImpl src;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		mav.setViewName("sys_new/sys_0100");
		return mav;
	}
	
	/* 발전단지 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map result = src.getFarmList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	/* 발전단지 등록 페이지 */
	@RequestMapping("/farmRegister")
	public ModelAndView farmRegister(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
//		Map session = (Map) parameter.get("session");
//		parameter.putAll(session);
		mav.setViewName("sys_new/sys_0101");
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		
		return mav;
	}
	
	/* 발전단지 작성 저장 */
	@RequestMapping("/saveRegister.ajax")
	public ModelAndView saveRegister(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		Map session = (Map) parameter.get("session");
//		parameter.putAll(session);
		
		/* JSON String => List, Map으로 변환 */
		// GROUP_LIST
		String jsonGroup = request.getParameter("GROUP_LIST");
		List group_list = new ArrayList();
		if(jsonGroup != null) {
			JSONArray arr = JSONArray.fromObject(jsonGroup);
			for(Object obj : arr) {
				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
				// TURBINE_LIST 변환 
				if(parameter.get("PROCESS").toString().equals("UPDATE")) {
					List turbine_list = new ArrayList();
					JSONArray arr2 = JSONArray.fromObject(m.get("TURBINE_LIST"));
					for(Object obj2 : arr2) {
						Map<String, Object> m2 = (Map<String, Object>) JSONObject.toBean((JSONObject) obj2, java.util.HashMap.class);
						turbine_list.add(m2);
					}
					m.put("TURBINE_LIST", turbine_list);
				}
				group_list.add(m);
			}
		}
		parameter.put("GROUP_LIST", group_list);
		
		// COMPANY_LIST
		String jsonCompany = request.getParameter("COMPANY_LIST");
		List company_list = new ArrayList();
		if(jsonCompany != null) {
			JSONArray arr = JSONArray.fromObject(jsonCompany);
			for(Object obj : arr) {
				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
				company_list.add(m);
			}
		}
		parameter.put("COMPANY_LIST", company_list);
		
		Map result = null;
		
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.updateFarm(parameter);
		} else {
			result = src.insertFarm(parameter);
		}
				
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	/* 발전단지 등록 - OPERATOR 팝업조회 */
	@RequestMapping("/popupData.ajax")
	public ModelAndView getpopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		Map result = src.getPopupList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	/* 단지, 그룹 이름 중복 체크 */
	@RequestMapping("/duplicatCheck.ajax")
	public ModelAndView duplicatCheck(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = src.duplicateCheck(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	/* 발전단지 수정 페이지*/
	@RequestMapping("/farmModify")
	public ModelAndView farmModify(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/sys_0101");
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 발전단지 상세정보 페이지*/
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/sys_0102");
		mav.addObject("DATA", parameter);
		
		return mav;
	}
	
	/* 발전단지 상세 or 등록된 정보 조회*/
	@RequestMapping("/detailForm/getFarmInfo.ajax")
	public ModelAndView getFarmInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getFarmInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 발전단지 삭제*/
	@RequestMapping("/detailForm/deleteFarm.ajax")
	public ModelAndView deleteFarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.deleteFarm(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
}
