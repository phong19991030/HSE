package module.license;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.model.RiskAssessment;
import module.safety.service.Safety_0200ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Tsk_0200Controller")
@RequestMapping(value = "/tsk/tsk_0200")
public class Tsk_0200Controller extends BaseController {

	@Autowired
	private Tsk_0200ServiceImpl riskAssessmentService;

	@Autowired
	private Safety_0200ServiceImpl safety0200service;

	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		mav.addObject("projects", projects);
		mav.setViewName("license/tsk_0200");
		mav.addObject("DATA", parameter);
		//Whether risk assessment is performed
		Map<Object, Object> riskCode = new HashMap<Object, Object>();
		riskCode.put("COMM_CD", "RISK_STATUS"); 
		List riskStatuss = sys_1100ServiceImpl.getComCodeListByComm_Cd(riskCode);
		mav.addObject("riskStatuss", riskStatuss);
		return mav;
	}

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = riskAssessmentService.getRiskAssessmentList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<Object, Object> ras = new HashMap<Object, Object>();
		Map<Object, Object> tbl = new HashMap<Object, Object>();
		Map<Object, Object> tblRight = new HashMap<Object, Object>();
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		tbl.put("COMM_CD", "RISK_TBL");
		tblRight.put("COMM_CD", "RISK_TBL_RIGHT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		List riskContents = sys_1100ServiceImpl.getComCodeListByComm_Cd(tbl);
		List riskContentsRight = sys_1100ServiceImpl.getComCodeListByComm_Cd(tblRight);
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		
		Map<Object, Object> consumParam = new HashMap<Object, Object>();
		consumParam.put("COMM_CD", "MATER_CONSUM");
		List consum = sys_1100ServiceImpl.getComCodeListByComm_Cd(consumParam);

		mav.addObject("consum", consum);
		mav.addObject("projects", projects);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("riskContents", riskContents);
		mav.addObject("riskContentsRight", riskContentsRight);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("license/tsk_0201");
		return mav;
	}

	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = riskAssessmentService.getRiskAssessmentInfo(parameter);
		List<Map<Object, Object>> projects = safety0200service.getProjectList(parameter);
		Map<Object, Object> ras = new HashMap<Object, Object>();
		Map<Object, Object> tbl = new HashMap<Object, Object>();
		Map<Object, Object> tblRight = new HashMap<Object, Object>();
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		tbl.put("COMM_CD", "RISK_TBL");
		tblRight.put("COMM_CD", "RISK_TBL_RIGHT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		List riskContents = sys_1100ServiceImpl.getComCodeListByComm_Cd(tbl);
		List riskContentsRight = sys_1100ServiceImpl.getComCodeListByComm_Cd(tblRight);
		String mat = result.get("MATERIAL").toString();
		String work = result.get("WORK_CONTENT").toString();
		String risk = result.get("RISK_ASSESSMENT").toString();
		mav.addObject("riskContents", riskContents);
		org.json.JSONArray array = new org.json.JSONArray(mat);
		org.json.JSONArray array1 = new org.json.JSONArray(work);
		Map<String, Object> mats = new HashMap<>();
		Map<String, Object> works = new HashMap<>();
		for (int i = 0; i < array.length(); i++) {
			String matId = array.getJSONObject(i).getString("MAT_ID");
			String matContent = array.getJSONObject(i).getString("MAT_CONTENT");
			mats.put(matId, matContent);
		}
		for (int i = 0; i < array1.length(); i++) {
			String matId = "" + i;
			String matContent = array1.getJSONObject(i).getString("WORK_CONTENT");
			works.put(matId, matContent);
		}
		List<RiskAssessment> risks = new Gson().fromJson(risk, new TypeToken<List<RiskAssessment>>() {
		}.getType());
		
		Map<Object, Object> consumParam = new HashMap<Object, Object>();
		consumParam.put("COMM_CD", "MATER_CONSUM");
		List consum = sys_1100ServiceImpl.getComCodeListByComm_Cd(consumParam);

		mav.addObject("consum", consum);
		
		mav.addObject("projects", projects);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("CRUD", "U");
		mav.addObject("DATA", result);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("riskContents", riskContents);
		mav.addObject("riskContentsRight", riskContentsRight);
		mav.addObject("MATS", mats);
		mav.addObject("WORKS", works);
		mav.addObject("RISKS", risks);
		mav.setViewName("license/tsk_0201");
		return mav;
	}

	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = riskAssessmentService.getRiskAssessmentInfo(parameter);
		Map<Object, Object> ras = new HashMap<Object, Object>();
		Map<Object, Object> tbl = new HashMap<Object, Object>();
		Map<Object, Object> tblRight = new HashMap<Object, Object>();
		String mat = result.get("MATERIAL").toString();
		String work = result.get("WORK_CONTENT").toString();
	
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		tbl.put("COMM_CD", "RISK_TBL");
		tblRight.put("COMM_CD", "RISK_TBL_RIGHT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		List riskContents = sys_1100ServiceImpl.getComCodeListByComm_Cd(tbl);
		List riskContentsRight = sys_1100ServiceImpl.getComCodeListByComm_Cd(tblRight);
		org.json.JSONArray array = new org.json.JSONArray(mat);
		org.json.JSONArray array1 = new org.json.JSONArray(work);
		Map<String, Object> mats = new HashMap<>();
		Map<String, Object> works = new HashMap<>();
		for (int i = 0; i < array.length(); i++) {
			String matId = array.getJSONObject(i).getString("MAT_ID");
			String matContent = array.getJSONObject(i).getString("MAT_CONTENT");
			mats.put(matId, matContent);
		}
		for (int i = 0; i < array1.length(); i++) {
			String matId = "" + i;
			String matContent = array1.getJSONObject(i).getString("WORK_CONTENT");
			works.put(matId, matContent);
		}
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("license/tsk_0202");
		mav.addObject("DATA", result);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("riskContents", riskContents);
		mav.addObject("riskContentsRight", riskContentsRight);
		mav.addObject("MATS", mats);
		mav.addObject("WORKS", works);
		return mav;
	}

	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = riskAssessmentService.getRiskAssessmentInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> result = riskAssessmentService.delete(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		Map result = null;

		if (parameter.get("CRUD").toString().equals("U")) {
			result = riskAssessmentService.update(parameter);
		} else {
			result = riskAssessmentService.insert(mav, parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}

}
