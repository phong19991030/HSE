package module.license;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.sys_new.Doc_0100ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;


@Controller("Tsk_0300Controller")
@RequestMapping(value = "/tsk/tsk_0300")
public class Tsk_0300Controller extends BaseController{
	
	public static String TASK_DOC_GROUP_1 = "TASK_MGT_1";
	public static String TASK_DOC_GROUP_2 = "TASK_MGT_2";
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Resource
	private Doc_0100ServiceImpl doc_0100service;
	@Autowired
	private Tsk_0200ServiceImpl riskAssessmentService;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("license/tsk_0300");
		Map<Object, Object> ras = new HashMap<Object, Object>();
		ras.put("COMM_CD", "RISK_ASSESSMENT");
		List riskAssessments = sys_1100ServiceImpl.getComCodeListByComm_Cd(ras);
		mav.addObject("riskAssessments", riskAssessments);
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map data = riskAssessmentService.getRiskAssessmentList2(parameter);
		
		Map<Object, Object> tbl = new HashMap<Object, Object>();
		Map<Object, Object> tblRight = new HashMap<Object, Object>();
		tbl.put("COMM_CD", "RISK_TBL");
		tblRight.put("COMM_CD", "RISK_TBL_RIGHT");
		List riskContents = sys_1100ServiceImpl.getComCodeListByComm_Cd(tbl);
		List riskContentsRight = sys_1100ServiceImpl.getComCodeListByComm_Cd(tblRight);
		
		data.put("riskContents", riskContents);
		data.put("riskContentsRight", riskContentsRight);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);

		return mav;
	}
	


}
