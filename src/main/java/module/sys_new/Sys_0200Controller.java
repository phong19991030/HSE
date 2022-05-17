package module.sys_new;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

@Controller("Sys_new_0200Controller")
@RequestMapping("/sys_new/sys_0200")
public class Sys_0200Controller extends BaseController{
	
	@Resource
	private Sys_0200ServiceImpl src;
	
	/* 리스트 페이지 이동 */
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/sys_0200");
		List manufacturerList = src.getManufacturerList(parameter);
		mav.addObject("MANUFACTURER_LIST", manufacturerList);
		if(parameter.get("FARM_ID") != null) mav.addObject("FARM_ID", parameter.get("FARM_ID"));
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
		
		List data = new ArrayList<Map>();
		switch(TYPE) {
			case "FARM":
				data = src.getFarmList(parameter);
				break;
			case "OPERATOR":
				parameter.put("CLASS", 1);
				data = src.getCompanyList(parameter);
				break;
			case "TURBINE-MODEL":
				data = src.getTurbineModelList(parameter);
				break;
			case "ID-CHECK":
				data = src.duplicateCheckTurbineID(parameter);
				break;
			default:
				break;
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
	
	/* 등록 페이지 이동 */
	@RequestMapping("/registerForm")
	public ModelAndView geneRegister(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/sys_0201");
		return mav;
	}
	
	/* 수정 페이지 이동  */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/sys_0201");
		return mav;
	}
	
	/* 저장 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
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
		mav.setViewName("sys_new/sys_0202");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 상세 페이지 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getTurbineInfo(parameter);
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
