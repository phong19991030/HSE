package module.common.main;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.com.com_0102.Com_0102ServiceImpl;
import module.com.com_0405.Com0405ServiceImpl;
import module.dashboard.Dsb_0100ServiceImpl;
import module.dashboard.PortletServiceImpl;
import module.safety.service.Safety_0300ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;
import module.util.DateConverter;
import net.sf.json.JSONArray;

/**
 * 메인
 * 기능 : 로그인폼/메인/로그아웃
 * 이력 : 
 * 1) 2013. 10. 7. kdna2m001 최초생성
 * 비고 :
 */
@Controller("mainController") 
public class MainController extends BaseController {
	
	private static final String NAME_EN = "USER_ENG_NM";

	private static final String NAME_KR = "USER_NM";

	public static final String LANG_CODE = "LANG_CODE";
	
	public static final String KOREA_CODE = "ko";
	
	@Resource(name="mainDAOImpl")
	private MainDAOImpl dao;
	
	@Autowired
	private PortletServiceImpl portletServiceImpl;
	
	@Resource
	private Dsb_0100ServiceImpl dsb_src;
	
	@Autowired
	private Com_0102ServiceImpl com0102ServiceImpl;
	
	@Autowired
	private Com0405ServiceImpl com0405ServiceImpl;
	
	@Autowired
	private Safety_0300ServiceImpl safety0300ServiceImpl;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	
	/*@Resource(name="mo0101DAOImpl")
	private MO0101DAO modao;*/
	
	DateConverter converter = new DateConverter();
	
	@RequestMapping("/main/main") 
	public ModelAndView doMain(Model model,HttpServletRequest request, HttpServletResponse response)
		throws Exception {
		
		Map<String, Object>  parameter = ParameterUtil.getParameterMap(request);
		
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		Map profile = new HashMap();
//		profile = (Map)dao.object("getProfileByUserID", parameter);
	    ModelAndView mav = new ModelAndView();
	    String langCode = (String)parameter.get(LANG_CODE);
	    String name = "";
		if (!KOREA_CODE.equals(langCode)) {
			name = (String)profile.get(NAME_KR);
		} else {
			name = (String)profile.get(NAME_EN);
		}
	    profile.put("USER_NM", name);
	    
	    // timezone
		String timezone = (String) parameter.get("CLIENT_ACCESS_TIMEZONE");
	    mav.addObject("CLIENT_ACCESS_TIMEZONE", timezone);
	    
	    Map searchDate = converter.createDBSearchDateUTC(timezone);
		Map yearDate = converter.createYearSearchDateUTC(timezone);
		
		Date s = (Date) searchDate.get("START_TIME");
		Date e = (Date) searchDate.get("END_TIME");
		
		Date ts = (Date) yearDate.get("START_TIME_THIS_YEAR");
		Date te = (Date) yearDate.get("END_TIME_THIS_YEAR");
		
		Date ls = (Date) yearDate.get("START_TIME_LAST_YEAR");
		Date le = (Date) yearDate.get("END_TIME_LAST_YEAR");
		
		parameter.put("START_TIME", s);
		parameter.put("END_TIME", e);

		parameter.put("START_TIME_THIS_YEAR", ts);
		parameter.put("END_TIME_THIS_YEAR", te);
		
		parameter.put("START_TIME_LAST_YEAR", ls);
		parameter.put("END_TIME_LAST_YEAR", le);
		
		List<Map> farmList = new ArrayList(); 
//				dsb_src.getFarmByRole(parameter);
		JSONArray json_farm_list = JSONArray.fromObject(farmList);
	    
	    mav.setViewName("main/dsb_0100");
		mav.addObject("FARM", json_farm_list);
		mav.addObject("DATA", parameter);
		
		Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "REPORT_STATUS");
    	List<Map<Object, Object>> reportTypes = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	mav.addObject("reportTypes", reportTypes);
	    //mav.setViewName("main/main");
	    return mav;
	}
	
	@RequestMapping("/main/getAllProjectDetail.ajax")
	public ModelAndView getAllProjectDetail(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map result = com0102ServiceImpl.getAllProjectDetail(parameter);
//		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	@RequestMapping("/main/getAccidentAnalysis.ajax")
	public ModelAndView getAccidentAnalysis(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map result = safety0300ServiceImpl.getAccidentsByCompanyId(parameter);
//		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	@RequestMapping("/main/getDataAccidentChart.ajax")
	public ModelAndView getDataAccidentChart(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map result = safety0300ServiceImpl.getCountAccidentsByCompanyIdNMonth(parameter);
//		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	
	
//	@RequestMapping("/main/main") 
//	public ModelAndView doMain(Model model,HttpServletRequest request, HttpServletResponse response)
//		throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
////		logger.trace("aaaaa");
//		HttpSession session =  request.getSession();
//		
////		int trav = (int) dao.object("main_trav_remain_result_cnt",parameter);
////		int edu = (int) dao.object("main_edu_remain_result_cnt",parameter);
////		Map vnct = (Map) dao.object("main_vnct_remain_cnt",parameter);
////		Map ctrct = (Map) dao.object("main_ctrct_anin_cnt",parameter);
////		
////		//TO-DO
////		Map ovtm_cnt =  (Map) dao.object("main_ovtm_cnt",parameter);
////		Map edu_cnt =  (Map) dao.object("main_edu_cnt",parameter);
////		
////		Map bym_cnt = (Map) dao.object("main_bym_cnt",parameter);
////		Map bgm_cnt = (Map) dao.object("main_dept_bgm_cnt",parameter);
////		Map acm_cnt01 = (Map) dao.object("main_acm01_cnt",parameter);
////		Map acm_cnt02 = (Map) dao.object("main_acm02_cnt",parameter);
//		
////		List main_list_ovte =  (List) dao.list("main_list_ovte",parameter);
////		List main_list_absn =  (List) dao.list("main_list_absn",parameter);
////		List main_chart_ovte =  (List) dao.list("main_chart_ovte",parameter);
//		
//		Map profile = (Map)dao.object("getProfileByUserID", parameter);
//	    ModelAndView mav = new ModelAndView();
//	    String langCode = (String)parameter.get(LANG_CODE);
//	    String name = "";
//		if (!KOREA_CODE.equals(langCode)) {
//			name = (String)profile.get(NAME_KR);
//		} else {
//			name = (String)profile.get(NAME_EN);
//		}
//	    profile.put("USER_NM", name);
//	    
//		Map sessionMap = (Map) parameter.get("session");
//		List listWidgets = portletServiceImpl.getCurrentUsedWidgets(sessionMap);
////		List list = new ArrayList<>();
//	    mav.addObject("WIDGETS", CastUtil.parseListToJson(listWidgets));
//	    mav.addObject("PROFILE", profile);
//	    
//	    String timezone = (String) sessionMap.get("CLIENT_ACCESS_TIMEZONE");
//	    mav.addObject("_CLIENT_ACCESS_TIMEZONE", timezone);
//	    
//	    // TODO : Main Dashboard가 완료될 때까지 '발전단지 현황'을 메인으로 사용
//	    mav.setViewName("main/main");
////	    mav.setViewName("redirect:/cms/cms_0100/list");
////	    mav.addObject("trav", trav);
////	    mav.addObject("edu", edu);
////	    mav.addObject("vnct", vnct);
////	    mav.addObject("ctrct", ctrct);
////	    mav.addObject("edu_cnt", edu_cnt);
////	    mav.addObject("ovtm_cnt", ovtm_cnt);
////	    mav.addObject("bym_cnt", bym_cnt);
////	    mav.addObject("bgm_cnt", bgm_cnt);
//////	    mav.addObject("acm_cnt01", acm_cnt01);
//////	    mav.addObject("acm_cnt02", acm_cnt02);
////	    mav.addObject("main_list_ovte", main_list_ovte); 
////	    mav.addObject("main_list_absn", main_list_absn);
////	    mav.addObject("main_chart_ovte", JSONArray.toJSONString(main_chart_ovte));
//		return mav;
//	}
	
	
	
	/**
	 * 교육이수현황 
	 * @작성일    : 2015. 11. 21. 
	 * @작성자      : keim
	 * @프로그램설명 :  교육이수현황 
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/main/01/getDataChart.ajax")
	public ModelAndView getData01Chart(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		/**
		 * Parameter 
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Logic 
		 */
		
		List list = dao.list("main_chart_edu",parameter);

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}	
	/**
	 * 시간외 근무현황 
	 * @작성일    : 2015. 11. 21. 
	 * @작성자      : keim
	 * @프로그램설명 :  시간외 근무현황 
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/main/02/getDataChart.ajax")
	public ModelAndView getData02Chart(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		/**
		 * Parameter 
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		/**
		 * Logic 
		 */
		List list = dao.list("main_chart_ovte",parameter); // 성과지표 총괄표

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}	
	
	@RequestMapping("/common/common/custom") 
	public ModelAndView doCustom(ModelAndView mav,HttpServletRequest request, HttpServletResponse response)
		throws Exception {
		mav.setViewName("main/custom");
//		mav.addObject("DATA", list);
		return mav;
	}
}
