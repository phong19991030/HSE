package module.hea;

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

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Hea_0002Controller")
@RequestMapping("/hea/hea_0002")
public class Hea_0002Controller extends BaseController{
	@Autowired
	private Hea_0002ServiceImpl service;
	
	@RequestMapping(value = "/list")
	public ModelAndView getListEmpHealth(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getListEmpHealth(parameter);
		mav.setViewName("hea/hea_0002");
		mav.addObject("DATA", result);
		result.putAll(parameter);
		return mav;
	}
	
	@RequestMapping(value = "getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map search = (Map) parameter.get("search");
		if (search != null) {
			String SEARCH_ALL = search.get("all").toString();
			if (SEARCH_ALL.length() != 0) {
				parameter.put("SEARCH_ALL", SEARCH_ALL);
			}
		}
		
		Map result = service.getListEmpHealth(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		mav.addObject("INS_ID", session.get("USER_ID"));
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("hea/hea_000201");
		return mav;
	}
	
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		mav.addObject("INS_ID", session.get("USER_ID"));
		
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		parameter.put("CRUD", "U");
		
		Map data = new HashMap<>();
		data = service.getDetailInfo(parameter);
		parameter.putAll(data);
		mav.addObject("DATA", parameter);
		mav.setViewName("hea/hea_000201");
		return mav;
	}
	
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		String A = parameter.get("EMP_HEALTH_ID").toString();
		Map<String, Object> result = service.getDetailInfo(parameter);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("hea/hea_000202");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.getDetailInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = service.delete(mav, parameter);	
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping(value = "/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = 0;
		
		/* JSON String => List, Map*/ 
//		String jsonA = (String) parameter.get("DISEASE_LIST");
//		List listA = new ArrayList();
//		if(jsonA != null) {
//			JSONArray arr = JSONArray.fromObject(jsonA);
//			for(Object obj : arr) {
//				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
//				listA.add(m);
//			}
//		}
//		
//		parameter.put("DISEASE_LIST", listA);
		
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = service.update(parameter);
		} else {
			result = service.insert(mav, parameter);
		}
		
		Map<Object, Object> map = new HashMap<Object, Object>();
        map.put("EMP_HEALTH_ID", parameter.get("EMP_HEALTH_ID"));
        map.put("RESULT_SAVE", result);
		mav.setViewName("jsonView");
		mav.addObject("DATA", map);
		return mav;
	}
	
//	@RequestMapping("/getDiseasesByEmpHealth.ajax")
//	public ModelAndView getDiseasesByEmpHealth(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		List result = service.getDiseasesByEmpHealth(parameter);	
//		mav.setViewName("jsonView");
//		mav.addObject("DATA", result);
//		return mav;
//	}
	
	/*
	 * @RequestMapping("/popupData.ajax") public ModelAndView
	 * getpopupData(ModelAndView mav, HttpServletRequest request,
	 * HttpServletResponse response) throws Exception { Map<String, Object>
	 * parameter = ParameterUtil.getParameterMap(request); List<Map<String, Object>>
	 * result = service.getListEmpHealth(parameter); mav.setViewName("jsonView");
	 * mav.addObject("DATA", result);
	 * 
	 * return mav; }
	 */
	
	/* 팝업 */
	@RequestMapping("/popupData/{TYPE}.ajax")
	public ModelAndView getPopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable("TYPE") String TYPE) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map data = service.duplicateCheckEmpNo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
	
	@RequestMapping("/deleteHealthFile.ajax")
	public ModelAndView deleteWasteFile(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteHealthFile(parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
}
