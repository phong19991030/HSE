package module.common.data;


import infrastructure.inheritance.BaseController;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import module.com.com_0101.Com_0101DAOImpl;
import module.safety.dao.Safety_0101DAOImpl;
import module.sys.Sys_0301DAOImpl;
import module.sys.Sys_0302DAOImpl;
import module.sys_new.Sys_1100DAOImpl;
import module.sys_new.Sys_1100ServiceImpl;

import java.util.ArrayList;
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

import applications.util.AjaxResult;

/**
 * 
 * @author AnhPV
 * @createdDate 20200107
 * 
 */
@Controller("commonDataController") 
@RequestMapping("/common")
public class CommonDataController extends BaseController{
	
	@Autowired
	private Sys_0302DAOImpl sys0302dao;
	
	@Autowired
	private Sys_0301DAOImpl sys0301dao;
	
	@Autowired
	private Com_0101DAOImpl sys0300dao;
	
	@Autowired
	private Sys_1100DAOImpl sys_1100dao;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	
	@RequestMapping("/getListFarm.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		Map param = (Map) parameter.get("search");
		if(param!= null && param.get("all") != null && !param.get("all").equals("")) {
			param.put("FARM_NM", param.get("all"));
		}
		if (null != param) {
			parameter.putAll(param);
		}

		/**
		 * Logic
		 */
		// 프로그램내역(List)
		List list = sys0301dao.list("getListFarm", parameter);

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");

		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping( value = "/getFarm.ajax") // path = [popup,dialog,tab]
	public ModelAndView getFarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
	
	// 대시보드에 타입별 보고서 갯수 및 작성일 기준 최신 리스트 5개 보내주기
	@RequestMapping("/forDashboard.ajax")
	public ModelAndView reportCountNList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		List result = new ArrayList(); 
//		= oam_0101DAOImpl.list("getReportLimit", parameter);
//		result.add(oam_0101DAOImpl.map("getReportCount", parameter));
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/getEmpMgtList.ajax")
	public ModelAndView getUserList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		List list = sys0300dao.list("getEmpMgtList", parameter);

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");

		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/getEmpListWithParam.ajax")
	public ModelAndView getEmpListWithParam(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		List list = sys0300dao.list("getEmpListWithParam", parameter);

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");

		mav.addObject("DATA", list);
		return mav;
	}

	@RequestMapping("/getEmpInfoWithStrUid.ajax")
	public ModelAndView getEmpInfoWithStrUid(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// getParameterMapWithOutSession (Session 포함 X)
		List list = new ArrayList();
		Map parameter = ParameterUtil.getParameterMap(request);
		String strUid = CastUtil.castToString(parameter.get("strUid"));
		if(!"".equals(strUid)) {
			List<String> lstUId = CastUtil.castToList(strUid, ",");
			parameter.put("lstUId", lstUId);
			
			list = sys0300dao.list("getEmpInfoWithStrUid", parameter);
		}
		
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");

		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/getPersEquipmentList.ajax")
	public ModelAndView getPersonalEquipmentWithStrUid(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map<Object, Object> ppe = new HashMap<Object, Object>();
		ppe.put("COMM_CD", "PPE_LIST");
		List ppeList = sys_1100ServiceImpl.getComCodeListByComm_Cd(ppe);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");

		mav.addObject("DATA", ppeList);
		return mav;
	}
	
	
	@RequestMapping("/getPersEquipmentWithComcd.ajax")
	public ModelAndView getPersEquipmentWithId(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// getParameterMapWithOutSession (Session 포함 X)
		List list = new ArrayList();
		Map parameter = ParameterUtil.getParameterMap(request);
		String strUid = CastUtil.castToString(parameter.get("strUid"));
		if(!"".equals(strUid)) {
			List<String> lstComcd = CastUtil.castToList(strUid, ",");
			parameter.put("lstComcd", lstComcd);
			
			list = sys_1100dao.list("getComCodeByComm_Cd", parameter);
		}
		
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");

		mav.addObject("DATA", list);
		return mav;
	}

}
