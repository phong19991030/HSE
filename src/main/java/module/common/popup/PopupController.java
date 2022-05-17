package module.common.popup;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.auth.AuthDAOImpl;
import applications.sys.Sys_0201DAOImpl;
import applications.sys.Sys_0204DAOImpl;
import applications.sys.Sys_0501ServiceImpl;
import infrastructure.inheritance.BaseController;
import infrastructure.inheritance.model.enumeration.CommonClsDataStatic;
import infrastructure.inheritance.model.enumeration.CommonPopupUrl;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;
import module.code.Code_0101DAOImpl;
import module.code.Code_0101ServiceImpl;
import module.sys.Sys_0301DAOImpl;
import module.sys.Sys_0302DAOImpl;

/**
 * @author A2M-moon
 *
 */
@Controller("popupController")
public class PopupController extends BaseController {

	@Autowired
	private PopupDAOImpl dao;


	@Autowired private AuthDAOImpl authDAO;
	
	
	@Autowired
	public Code_0101ServiceImpl service;
	
	
	@Autowired
	private Sys_0501ServiceImpl sys0501svc;
	
	@Autowired
	private Sys_0301DAOImpl sys0301dao;
	
	@Autowired
	private Sys_0302DAOImpl sys0302dao;
	
	@Autowired
	private Code_0101DAOImpl code0101dao;

	private static final String COMMON_POPUP_VIEW = "common/popup/popupCommon";
	
	@Autowired
	private Sys_0204DAOImpl sys0204dao;
	
	@Autowired
	private Sys_0201DAOImpl sys0201dao;
	
	
	/**
	 * 전체 팝업 컨트롤
	 * @작성일    : 2014. 12. 8. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO 에러메시지 정의  
	 */
	@RequestMapping("/common/popup/controls")
	public ModelAndView doPopupControl(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		/**
		 * ModelAndView
		 */
		ModelAndView result = new ModelAndView();
		result.addObject("exception.code",cls);
		result.setViewName("common/error/exception");
		
		// Common popup
		if (cls.equals("cmmn")) {
			if(parameter.containsKey("jspview") && !parameter.get("jspview").toString().trim().isEmpty()) {
				result.setViewName(type + ":" + parameter.get("jspview").toString().trim());
			} else {
				result.setViewName(type + ":" + COMMON_POPUP_VIEW);	
			}
			
			/*String paramStr = (String) parameter.get("params");
			if(paramStr != null) {
				paramStr = paramStr.replace("& #39;", "'");
				try {
					HashMap<String,Object> paramMap = new ObjectMapper().readValue(paramStr, HashMap.class);	
					if(paramMap != null) {
						parameter.putAll(paramMap);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				
			}
			result.addObject("DATA", parameter);*/
		} else {
			// Other type of popup
			CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
			Method method= null;
			Class clazz = null ;
			
			if((type!=null && !type.equals("")) && (cls!=null && !cls.equals(""))){
				clazz =enums.getGroup().getFix().getObject();				
				method = clazz.getMethod(enums.getGroup().getMethodName(), HttpServletRequest.class,HttpServletResponse.class);
			}			
			
			try {
				if(method !=null){
					// popupController
					if(enums.getGroup().getFix().getClassName().equals(this.getClass().getName())  ){
						result = (ModelAndView) method.invoke(this, request,response);
					}
					// 각 업무 공통 popupController
					else{
						result = (ModelAndView) method.invoke(clazz.newInstance(), request,response);
					}
				}
			}catch (IllegalArgumentException e) {
				logger.error(e.getMessage());
			} catch (IllegalAccessException e) {
				logger.error(e.getMessage());
			} catch (InvocationTargetException e) {
				logger.error(e.getMessage());
			}
		}
		

		return result;
	}
	
	


	/**
	 * 전체 팝업 컨트롤
	 * @작성일    : 2014. 12. 8. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO 에러메시지 정의  
	 */
	@RequestMapping("/common/popup/getDataUrl")
	public ModelAndView getPopupDataUrl(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);

		ModelAndView result = new ModelAndView();
		
		
		result.setViewName("jsonView");
		result.addObject("DATA", enums.getGroup().getAjaxDataUrl());
		
		return result;
	}
	
	
	
	
	/*
	 * ********************************************************
	 * 도움말/ 매뉴얼  팝업 ********************************************
	 * ********************************************************
	 */
	@RequestMapping("/common/popup/help")
	public ModelAndView popupHelp(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		System.out.println(parameter.get("key"));
		// 팝업 또는 다이얼로그 종류명
		
		// 해당 viewName
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
//		LinkedList<Article> articles = null;
		mav.addObject("fileName", "abc.pdf");
		mav.setViewName("popup:common/popup/popupHelp");
		return mav;
	}
	
	
	
	/*
	 * ********************************************************
	 * 부서팝업 ************************************************
	 * ********************************************************
	 */
	/**
	 * 부서 팝업 오픈 
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 : 부서 팝업 오픈 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/departPopup")
	public ModelAndView doDepartPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		
		String viewName = enums.getView();
		
		List list = dao.list("searchStruct", parameter);
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("STRUCT_DT", list);
		//mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;
	}

	/**
	 * 부서 팝업 오픈 
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 : 부서 팝업 오픈 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/departPopup1")
	public ModelAndView doDepart1Popup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
//		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		
//		String viewName = enums.getView();
		
		List list = dao.list("searchStruct", parameter);
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("STRUCT_DT", list);
		//mav.addObject("param", parameter);
		mav.setViewName("common/popup/popupDepartPopup");
		return mav;
	}
	
	/**
	 * 부서 팝업 데이터(Ajax)
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 : 부서 팝업 데이터(Ajax)
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataDepartPopup")
	public ModelAndView doDepartPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */

		List list = dao.list("getDepartPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", ArrangeUtil.sortMapList(list,"DEPT_CD", "UP_DEPT_CD", "LEV"));
		return mav;
	}
	
	/**
	 * 부서검색시 팝업을 열지않고 검색을 먼저한후 1개의 부서일 경우 세팅처리 오픈
	 * @작성일    : 2014. 12. 29. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 : 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataDepartOnce")
	public ModelAndView doDepartPopupOnceAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */

		List list = dao.list("getDepartPopupOnes", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	/*
	 * ********************************************************
	 * 사원검색팝업 ********************************************
	 * ********************************************************
	 */
	/**
	 * 사원검색 팝업 오픈
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 : 사원검색 팝업 오픈 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/empPopup")
	public ModelAndView doEmpPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
//		List empList = 	dao.list("getUserPopup2", parameter);

		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
//		mav.addObject(attributeValue)
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/popupEmplSameDept")
	public ModelAndView doEmpPopupInSameDept(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
//		List empList = 	dao.list("getUserPopup2", parameter);

		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
//		mav.addObject(attributeValue)
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/emplPopup")
	public ModelAndView doEmplPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
//		List empList = 	dao.list("getUserPopup2", parameter);

		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
//		mav.addObject(attributeValue)
		if(parameter.get("DELEGATE") != null && parameter.get("DELEGATE").toString().equals("TRUE")) {
			mav.addObject("DATA", "DELEGATE");
		}
		
		if(parameter.get("GRADE") != null) {
			mav.addObject("GRADE", parameter.get("GRADE"));
		}
		
		if(parameter.get("ROLE") != null ) {
			mav.addObject("ROLE",  parameter.get("ROLE"));
		}
		
		mav.addObject("DEPT_CD", parameter.get("DEPT_CD"));
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/emplPopupChild")
	public ModelAndView doEmplPopupChild(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
//		List empList = 	dao.list("getUserPopup2", parameter);

		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
//		mav.addObject(attributeValue)
		if(parameter.get("DELEGATE") != null && parameter.get("DELEGATE").toString().equals("TRUE")) {
			mav.addObject("DATA", "DELEGATE");
		}
		
		if(parameter.get("GRADE") != null) {
			mav.addObject("GRADE", parameter.get("GRADE"));
		}
		
		if(parameter.get("ROLE") != null ) {
			mav.addObject("ROLE",  parameter.get("ROLE"));
		}
		String dept_code = (String) parameter.get("DEPT_CD");
		mav.addObject("DEPT_CD", dept_code.split("=")[0]);
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/empl2Popup")
	public ModelAndView doEmpl2Popup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
//		List empList = 	dao.list("getUserPopup2", parameter);
		
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		
		if(parameter.get("GRADE") != null) {
			mav.addObject("GRADE", parameter.get("GRADE"));
		}
//		mav.addObject(attributeValue)
//		if(parameter.get("DELEGATE") != null && parameter.get("DELEGATE").toString().equals("TRUE")) {
//			mav.addObject("DATA", "DELEGATE");
//		}
		mav.setViewName(viewName);
		return mav;
	}
	
	
	@RequestMapping("/common/popup/deptOtherDeptPopup")
	public ModelAndView doOtherDeptPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
//		List empList = 	dao.list("getUserPopup2", parameter);

		Map selectedCD = new HashMap<>();
		selectedCD.put("DEPT_CD2", parameter.get("DEPT_CD"));
		selectedCD.put("STRU_ID", parameter.get("STRU_ID"));

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("DATA", selectedCD);
		mav.setViewName(viewName);
		return mav;
	}
	
	/**
	 * 사원검색 팝업 - 조직도 데이터(Ajax)
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataEmpDeptPopup")
	public ModelAndView doEmpDeptPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list = dao.list("getEmpDeptPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", ArrangeUtil.sortMapList(list,"DEPT_CD", "UP_DEPT_CD", "LEV"));
		
		return mav;
	}
	
	
	
	
	
	
	/**
	 * 사원검색 팝업 오픈
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 : 사원검색 팝업 오픈 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/usrPopup")
	public ModelAndView doUserPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;
	}
	
	/**
	 * 사원검색 팝업 - 조직도 데이터(Ajax)
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataUserPopup")
	public ModelAndView doUserPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list = dao.list("getUserPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);
		//mav.addObject("RESULT_TYPE", "GRID");
//		mav.addObject("DATA", ArrangeUtil.sortMapList(list,"DEPT_CD", "UP_DEPT_CD", "LEV"));
		
		return mav;
	}
	
	
	
	/**
	 * 사원검색 팝업 - 인사 데이터(Ajax)
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : keim
	 * @프로그램설명 : 사원검색 팝업 - 인사 데이터(Ajax)
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataEmpPopup")
	public ModelAndView doEmpPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */
		
		//System.out.println("파라미터===" + parameter);

		List list = dao.list("getEmpPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", list);
		return mav;
	}
	
	@RequestMapping("/common/popup/getDataEmpPopupChild")
	public ModelAndView doEmpPopupChildAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */
		
		//System.out.println("파라미터===" + parameter);

		List list = dao.list("getEmpPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", list);
		return mav;
	}
	
	
	/*
	 * ********************************************************
	 * 프로그램 ID 팝업 ****************************************
	 * ********************************************************
	 */
	/**
	 * 프로그램 ID 팝업 오픈 
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : leehs
	 * @프로그램설명 : 프로그램 ID 팝업 오픈 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/pgmPopup")
	public ModelAndView doPgmPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;
	}
	
	/**
	 * 프로그램 ID 팝업 데이터(Ajax)
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : leehs
	 * @프로그램설명 : 프로그램 ID 팝업 데이터(Ajax)
	 * @진행상태: COMPLETE  
	 */
	
	
	
	/**
	 * 프로그램 ID 팝업 오픈 
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : leehs
	 * @프로그램설명 : 프로그램 ID 팝업 오픈 
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/pgmFldPopup")
	public ModelAndView doPgmFldPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("url", enums.getGroup().getAjaxDataUrl());
		return mav;
	}
	
	/**
	 * 프로그램 ID 팝업 데이터(Ajax)
	 * @작성일    : 2014. 12. 3. 
	 * @작성자      : leehs
	 * @프로그램설명 : 프로그램 ID 팝업 데이터(Ajax)
	 * @진행상태: COMPLETE  
	 */
	
	
	
	
	

	/*
	 * ********************************************************
	 * 국가 팝업 ****************************************
	 * ********************************************************
	 */
	/**
	 * 국가 팝업 오픈
	 * @작성일    : 2014. 12. 1. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/ntnPopup")
	public ModelAndView doNtnPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		String dataUrl = enums.getGroup().getAjaxDataUrl();
		String title = enums.getDesc();
		Map data = new HashMap();
		data.put("ajaxUrl", dataUrl);
		data.put("title", title);
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("DATA",data);
		mav.setViewName(viewName);		
		return mav;
	}
	
	/**
	 * 국가 팝업 데이터(Ajax)
	 * @작성일    : 2014. 12. 1. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataNtnPopup")
	public ModelAndView doNtnPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */
		
		List list = dao.list("getNtnPopup", parameter);
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", list);
		return mav;
	}
	
	
	/*
	 * ********************************************************
	 * 우편번호 팝업 ********************************************
	 * ********************************************************
	 */
	/**
	 * 우편번호 팝업 오픈
	 * @작성일    : 2014. 12. 11. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/postPopup")
	public ModelAndView doPostPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;
	}
	
	/**
	 * 우편번호 팝업 데이터(Ajax)
	 * @작성일    : 2014. 12. 11. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getDataPostPopup")
	public ModelAndView doPostPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */
		
		List list = dao.list("getPostNew", parameter);
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}

	

	/*
	 * ********************************************************
	 * 결재라인 팝업 ********************************************
	 * ********************************************************
	 */
	/**
	 * 결재라인 팝업 오픈
	 * @작성일    : 2014. 12. 11. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/popupGwLine")
	public ModelAndView popupGwLine(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;
	}
	
	/**
	 * 결재라인 팝업 데이터(Ajax)
	 * @작성일    : 2014. 12. 11. 
	 * @작성자      : A2M-moon
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	@RequestMapping("/common/popup/getListGwLine")
	public ModelAndView dogetListGwLine(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */
//System.out.println("@@@@@@@@@@ getListGwLine ==> "+parameter);		
		List list = dao.list("getListGwLine", parameter);
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	
	
	
	/*
	 * ********************************************************
	 * 공통코드 팝업 [cls : commCd] "사용" *********************************
	 * ********************************************************
	 */
	/**
	 * 공통코드 팝업창 생성
	 * 데이터 조회는 Stm0101Controller > getDataList.ajax에서 조회한다. 
	 * @작성일    : 2015. 5. 4. 
	 * @작성자      : leehs
	 * @프로그램설명 : 공통코드 팝업
	 * @진행상태: TO_DO  
	 */
	@RequestMapping("/common/popup/popupCommCd")
	public ModelAndView popupCommCd(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;		
	}	
	
	@RequestMapping("/common/popup/popupBms")
	public ModelAndView popupBms(HttpServletRequest request, HttpServletResponse response)
	{
		Map parameter = ParameterUtil.getParameterMap(request);

		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");

		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);

		// 해당 viewName
		String viewName = enums.getView();

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("url", enums.getGroup().getAjaxDataUrl());
		mav.addObject("ETPS_TYPE", parameter.get("ETPS_TYPE"));
		return mav;
	}

	@RequestMapping("/common/popup/getBms.ajax")
	public ModelAndView popupBmsData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */

		List list = dao.list("bms.bms0101", "selectEtps",parameter.get("SE"));

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", list);
		return mav;
	}

	@RequestMapping("/common/popup/popupBmsManage")
	public ModelAndView popupBmsManage(HttpServletRequest request, HttpServletResponse response)
	{
		Map parameter = ParameterUtil.getParameterMap(request);

		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");

		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);

		// 해당 viewName
		String viewName = enums.getView();

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		//mav.addObject("url", enums.getGroup().getAjaxDataUrl());
		return mav;
	}

	//ldcuong test
	@RequestMapping("/common/popup/deptReceiverPopup")
	public ModelAndView doReceiverPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		String viewName = enums.getView();

		ModelAndView result = new ModelAndView();
		
		
		result.setViewName(viewName);
//		result.addObject("DATA", enums.getGroup().getAjaxDataUrl());
		
		return result;
	}
	@RequestMapping("/common/popup/getDataReceiverPopup.ajax")
	public ModelAndView doReceiverPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */

		List list = dao.list("getReceiverPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", list);
		return mav;
	}
	@RequestMapping("/common/popup/userdeptPopup")
	public ModelAndView doUserDeptPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		String viewName = enums.getView();

		ModelAndView result = new ModelAndView();
		
		
		result.setViewName(viewName);
//		result.addObject("DATA", enums.getGroup().getAjaxDataUrl());
		
		return result;
	}	
	
	@RequestMapping("/common/popup/getDataUserDepartPopup.ajax")
	public ModelAndView doUserDeptPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);	
		String sess_user_id = (String) ((Map) parameter.get("session")).get("USER_UID");
		parameter.put("USER_UID", sess_user_id);
	
		/**
		 * Init
		 */

		List list = dao.list("getUser_Derpartment", parameter);
        System.out.print("aa"+list.size()+"bbb");
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		//mav.addObject("RESULT_TYPE", "GRID");
		mav.addObject("DATA", list);
		return mav;
	}	

	
	@RequestMapping("/common/popup/popupBU_CommCd")
	public ModelAndView popupBU_CommCd(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;		
	}	
	
	
	@RequestMapping("/common/popup/bindingPopup")
	public ModelAndView doBindingPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
				
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("DATA", parameter);
		return mav;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupBusinessUnit/getDataList01.ajax")
	public ModelAndView getDataList01(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameters = ParameterUtil.getParameterMapWithOutSession(request);
		List<Map> resultList = (List<Map>) dao.getAllBusinessUnit(parameters);
		
		mav.addObject("DATA", ArrangeUtil.sortMapList(resultList, "CODE", "PARENT_CODE", "LEV"));
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupBusinessUnit")
	public ModelAndView popupBusinessUnit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		return mav;		
	}

	@RequestMapping("/common/popup/userasignPopup")
	public ModelAndView doUserAsignPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);	
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String grade = (String) parameter.get("GRADE");
		String coapvl = (String) parameter.get("COAPVL");
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		
		String viewName = enums.getView();
		
		
		/**
		 * ModelAndView
		 */

		ModelAndView mav = new ModelAndView();
		mav.addObject("GRADE", grade);
		mav.addObject("COAPVL", coapvl);
		mav.addObject("DATA", parameter);
		mav.setViewName(viewName);
		//mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping("/common/popup/getDataUserAsignPopup")
	public ModelAndView doUserAsignPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);	
		String sess_user_id = (String) ((Map) parameter.get("session")).get("USER_UID");
		String grade = (String) parameter.get("GRADE");
		parameter.put("USER_UID", sess_user_id);
		parameter.put("GRADE", grade);
		String coapvl = (String) parameter.get("COAPVL");
		List list = dao.list("getUserAisgns", parameter);
		if("Y".equals(coapvl)) {
			 list = dao.list("getUserAisgns", parameter);
		}else {
			 list = dao.list("getUserAisgn", parameter);
		}


	
		/**
		 * Init
		 */

		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}

	@RequestMapping("/common/popup/popupCntry")
	public ModelAndView popupCntry(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("url", enums.getGroup().getAjaxDataUrl());
		mav.setViewName(viewName);
		return mav;
	}
	

	@RequestMapping("/common/popup/getCntry.ajax")
	public ModelAndView doCntryAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * Init
		 */
		List list = CommonClsDataStatic.getEnum("CNTRY").getList();
		if(!((Map)parameter.get("SE")).get("CNTRY_NAME").toString().equals("") && ((Map)parameter.get("SE")).get("CNTRY_NAME") != null)
			list = FindCntry(list, parameter);
//		List list = dao.list("getPostNew", parameter);
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}
	
	public List FindCntry(List<Map> list, Map parameter)
	{
		List result = new ArrayList();
		for(Map map : list)
		{
			if(((Map)parameter.get("SE")).get("CNTRY_NAME").toString().equals(map.get("LABEL")))
			{
				result.add(map);
				break;
			}
		}
		return result;
	}
	
	@RequestMapping("/common/popup/groupPopup")
	public ModelAndView doGroupPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();

		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/getDataGroupPopup")
	public ModelAndView doGroupPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list = dao.list("getGroupPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);

		return mav;
	}
	
	@RequestMapping("/common/popup/generatorPopup")
	public ModelAndView doGeneratorPopup(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/getDataGeneratorPopup")
	public ModelAndView doGeneratorPopupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list = dao.list("getGeneratorPopup", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);

		return mav;
	}
	
	@RequestMapping("/common/popup/generatorPopup2")
	public ModelAndView doGeneratorPopup2(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/getDataGeneratorPopup2")
	public ModelAndView doGeneratorPopupAjax2(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list =  sys0301dao.list("getListFarm", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);

		return mav;
	}
	
	
	@RequestMapping("/common/popup/generatorPopup3")
	public ModelAndView doGeneratorPopup3(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		//doan test
		List listAllFarm =  sys0301dao.list("getListFarm", parameter);
		List listExitsGroup = new ArrayList();
		List listExitsTurbine = new ArrayList();
		List<String> selectedFarmIds = new ArrayList<String>();
		List<String> selectedGroupIds = new ArrayList<String>();
		List<String> lstGenId = new ArrayList<String>();
		
		String selectedGenIds = "";
		if(!"".equals(parameter.get("defaultValue")) ) {
			selectedGenIds = parameter.get("defaultValue").toString();
		}
		if(!"".equals(selectedGenIds)) {
			String[] arrselectedGenIds = selectedGenIds.split(",");
			for(int i=0; i<arrselectedGenIds.length; i++) {
				lstGenId.add(arrselectedGenIds[i]);
			}
			parameter.put("lstGenId", lstGenId);
			List groupIds = sys0201dao.list("getGroupByGenId", parameter);
			parameter.put("lstGroupId", groupIds);
			for(int i=0; i<groupIds.size(); i++) {
				Map tmp = (Map) groupIds.get(i);
				List list =  sys0302dao.list("getTurbineByGroupID", tmp);
				listExitsTurbine.addAll(list);
				
				
				selectedGroupIds.add(tmp.get("GROUP_ID").toString());
			}
			
			//
			List farmIds = sys0201dao.list("getFarmByGroupId", parameter);
			
			for(int i=0; i<farmIds.size(); i++) {
				Map tmp = (Map) farmIds.get(i);
				List list =  sys0301dao.list("getListGroup", tmp);
				listExitsGroup.addAll(list);
				
				selectedFarmIds.add(tmp.get("FARM_ID").toString());
			}
		}
		
		for(int i=0; i<listAllFarm.size(); i++) {
			Map tmp = (Map) listAllFarm.get(i);
			if(selectedFarmIds.contains(tmp.get("FARM_ID").toString())) {
				tmp.put("selected", true);
			}else {
				tmp.put("selected", false);
			}
		}
		
		String firstFarmId = "";
		for(int i=0; i<listExitsGroup.size(); i++) {
			Map tmp = (Map) listExitsGroup.get(i);
			if(i==0) {
				firstFarmId = tmp.get("FARM_ID").toString();
			}
			String tmpFarmId = tmp.get("FARM_ID").toString();
			if(firstFarmId.equals(tmpFarmId)) {
				tmp.put("isHaveHr", false);
			}else {
				tmp.put("isHaveHr", true);
				firstFarmId = tmpFarmId;
			}
			
			if(selectedGroupIds.contains(tmp.get("GROUP_ID").toString())) {
				tmp.put("selected", true);
			}else {
				tmp.put("selected", false);
			} 
		}
		
		String firstGroupId = "";
		for(int i=0; i<listExitsTurbine.size(); i++) {
			Map tmp = (Map) listExitsTurbine.get(i);
			if(i==0) {
				firstGroupId = tmp.get("GROUP_ID").toString();
			}
			String tmpGroupId = tmp.get("GROUP_ID").toString();
			if(firstGroupId.equals(tmpGroupId)) {
				tmp.put("isHaveHr", false);
			}else {
				tmp.put("isHaveHr", true);
				firstGroupId = tmpGroupId;
			}
			
			if(lstGenId.contains(tmp.get("GERATOR_ID").toString())) {
				tmp.put("selected", true);
			}else {
				tmp.put("selected", false);
			}
		}
		
		
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		
		mav.addObject("listAllFarm", listAllFarm);
		mav.addObject("listExitsGroup", listExitsGroup);
		mav.addObject("listExitsTurbine", listExitsTurbine);
		
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/generatorPopup4")
	public ModelAndView doGeneratorPopup4(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		//doan test
		List listAllFarm =  sys0301dao.list("getListFarm", parameter);
		String aaa = "";
		if(parameter.get("defaultValue") != null) {
			aaa = parameter.get("defaultValue").toString();
		}
		String[] bbb = aaa.split(",");
		List lstGenId = new ArrayList();
		for(int i=0; i<bbb.length; i++) {
			lstGenId.add(bbb[i]);
		}
		parameter.put("lstGenId", lstGenId);
		List groupIds = sys0201dao.list("getGroupByGenId", parameter);
		parameter.put("lstGroupId", groupIds);
		
		List farmIds = sys0201dao.list("getFarmByGroupId", parameter);
		String strFarmIds = "";
		for(int i=0; i<farmIds.size(); i++) {
			Map ccc = (Map) farmIds.get(i);
			strFarmIds += ccc.get("FARM_ID").toString() + ",";
		}
		strFarmIds = StringUtils.chop(strFarmIds);
		
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		mav.addObject("listAllFarm", listAllFarm);
		
		mav.addObject("strFarmIds", strFarmIds);
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/getDataGeneratorPopup3")
	public ModelAndView doGeneratorPopupAjax3(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list =  sys0301dao.list("getListFarm", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);

		return mav;
	}
	
	@RequestMapping("/common/popup/getDataGroup")
	public ModelAndView getDataGroupAjax(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		parameter.put("display_all", "true");
		List list =  sys0301dao.list("getListGroupDisplayFarm", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);

		return mav;
	}
	
	@RequestMapping("/common/popup/getDataGenerator")
	public ModelAndView getDataGenerator(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Init
		 */
		List list =  sys0302dao.list("getTurbineByGroupID", parameter);
 
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		
		mav.addObject("DATA", list);

		return mav;
	}
	
	@RequestMapping("/common/popup/partPopup")
	public ModelAndView doPartPopup(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;
	}
	
	@RequestMapping("/common/popup/propertyPopup")
	public ModelAndView doPropertyPopup(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupSelectHuman/getDataList.ajax")
	public ModelAndView selectHuman_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameters = ParameterUtil.getParameterMapWithOutSession(request);
		List<Map> resultList = (List<Map>) dao.getHumanList(parameters);
		
		mav.addObject("DATA", resultList);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupSelectHuman")
	public ModelAndView popupSelectHuman(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.addObject("TYPE", CommonUtil.getMapValue(parameter, "selectType", "ONE"));
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;		
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupSelectRole/getDataList.ajax")
	public ModelAndView selectRole_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		Map search = (Map) parameter.get("search");
		parameter.putAll(search);
		List list = sys0204dao.list("getRoleMgtByUser", parameter);
		
		mav.addObject("DATA", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupSelectRole")
	public ModelAndView popupSelectRole(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String user_uid = parameter.get("USER_UID") != null? parameter.get("USER_UID").toString(): "";
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		if(!user_uid.isEmpty()) {
			mav.addObject("USER_UID", user_uid);
		}
		mav.addObject("TYPE", CommonUtil.getMapValue(parameter, "selectType", "ONE"));
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		return mav;		
	}
	
	@RequestMapping("/common/popup/popupSelectCompany")
	public ModelAndView doselectCompany(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */

		
		ModelAndView mav = new ModelAndView();
		mav.addObject("TYPE", CommonUtil.getMapValue(parameter, "selectType", "ONE"));
		mav.addObject("FARM_ID", parameter.get("FARM_ID"));
		mav.addObject("COMP_TYPE", CommonUtil.getMapValue(parameter, "COMP_TYPE", ""));
		mav.setViewName(viewName);
		return mav;		
	}
	
	@RequestMapping("/common/popup/popupSelectCompany/getDataList.ajax")
	public ModelAndView selectCompany_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map search = (Map) parameter.get("search");
		if(parameter.get("CLS") != null) {
			search.put("CLS", parameter.get("CLS"));
		}
		search.putAll(parameter);
		
		List list = sys0501svc.list("getCompanyList", search);
		/**
		 * ModelAndView
		 */
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;	
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupSelectTurbine/getDataList.ajax")
	public ModelAndView getTurbineList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		List list = sys0302dao.list("getListTurbine2", parameter);
		
		mav.addObject("DATA", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupSelectTurbine")
	public ModelAndView selectTurbinePopup(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		String viewName = enums.getView();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("TYPE", CommonUtil.getMapValue(parameter, "selectType", "ONE"));
		mav.addObject("param", parameter);
		mav.setViewName(viewName);
		
		return mav;		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupMaintenCode/getDataList.ajax")
	public ModelAndView popupMaintenCode_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		/*
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getMaintainceCode(parameter);
		List result = new ArrayList();
		String code = (String) parameter.get("CODE");
		if(!code.equals("")) {
			List listChild = service.getAllChildId(list, parameter);
			for(int i = 0; i<list.size(); i++) {
				Map map = (Map) list.get(i);
				String codes = (String) map.get("CODE");
				if(listChild.contains(codes)) {
					result.add(map);
				}
			}
		}else {
			result = list;
		}

		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", ArrangeUtil.sortMapList(result, "CODE", "UP_CD", "LEV"));
		mav.setViewName("jsonView");
		
		return mav;
		*/
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getMaintainceCode(parameter);
		//List listMainten = service.convertListToTree(list);
		
		mav.setViewName("jsonView"); 
		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", ArrangeUtil.sortMapList(list, "CODE", "UP_CD", "LEV"));
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupMaintenCode")
	public ModelAndView popupMaintenCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String code = (String) parameter.get("CODE");
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("CODE", code);
		return mav;		
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupPartCode/getDataList.ajax")
	public ModelAndView popupPartCode_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getPartCode(parameter);
		List result = new ArrayList();
		String code = (String) parameter.get("CODE");
		if(!code.equals("")) {
			List listChild = service.getAllChildId(list, parameter);
			for(int i = 0; i<list.size(); i++) {
				Map map = (Map) list.get(i);
				String codes = (String) map.get("CODE");
				if(listChild.contains(codes)) {
					result.add(map);
				}
			}
		}else {
			result = list;
		}
		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", ArrangeUtil.sortMapList(result, "CODE", "UP_CD", "LEV"));
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupPartCode")
	public ModelAndView popupPartCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String code = (String) parameter.get("CODE");
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("CODE", code);
		return mav;		
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupCommonCode/getDataList.ajax")
	public ModelAndView popupCommonCode_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getCommonCode(parameter);
		List result = new ArrayList();
		String code = (String) parameter.get("CODE");
		if(!code.equals("")) {
			List listChild = service.getAllChildId(list, parameter);
			for(int i = 0; i<list.size(); i++) {
				Map map = (Map) list.get(i);
				String codes = (String) map.get("CODE");
				if(listChild.contains(codes)) {
					result.add(map);
				}
			}
		}else {
			result = list;
		}
		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", ArrangeUtil.sortMapList(result, "CODE", "UP_CD", "LEV"));
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupCommonCode")
	public ModelAndView popupCommonCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String code = (String) parameter.get("CODE");
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("CODE", code);
		return mav;		
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupAlarmCode/getDataList.ajax")
	public ModelAndView popupAlarmCode_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getAllDetailCode(parameter);

		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupAlarmCode")
	public ModelAndView popupAlarmCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String code = (String) parameter.get("WT_ALARM_GR_ID");
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("WT_ALARM_GR_ID", code);
		return mav;		
	}
	@RequestMapping("/common/popup/multilPart")
	public ModelAndView multilPart(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		String viewName = enums.getView();
		ModelAndView mav = new ModelAndView();
		mav.addObject("urlGetData", enums.getGroup().getAjaxDataUrl());
		mav.addObject("param", parameter);
		List farms = sys0301dao.list("getListFarm", parameter);
		List partNos = code0101dao.list("getPartCodeLv1", parameter);
		mav.addObject("partNos", partNos);
		mav.addObject("farms", farms);
		mav.setViewName(viewName);
		return mav;
	}
	
	
//popupMutilCommonCode	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("/common/popup/popupMutilCommonCode/getDataList.ajax")
	public ModelAndView popupMutilCommonCode_getDataList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getCommonUpCode(parameter);
		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/common/popup/popupMutilCommonCode")
	public ModelAndView popupMutilCommonCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		String code = (String) parameter.get("CODE");
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewName);
		mav.addObject("CODE", code);
		return mav;		
	}	
	
	
	//////
	@RequestMapping("/common/popup/popupSelectReports")
	public ModelAndView doSelectReports(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */

		
		ModelAndView mav = new ModelAndView();
		mav.addObject("TYPE", CommonUtil.getMapValue(parameter, "selectType", "ONE"));
		mav.setViewName(viewName);
		return mav;		
	}

	
	
	
	@RequestMapping("/common/popup/popupSelectChecklist")
	public ModelAndView doselectChecklist(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String type = (String) parameter.get("type");
		String cls = (String) parameter.get("cls");
		
		// 팝업 또는 다이얼로그 종류명
		CommonPopupUrl enums = CommonPopupUrl.getCommonPopupUrlByTypeGroup(type,cls);
		
		// 해당 viewName
		String viewName = enums.getView();
		
		/**
		 * ModelAndView
		 */

		
		ModelAndView mav = new ModelAndView();
		mav.addObject("TYPE", CommonUtil.getMapValue(parameter, "selectType", "ONE"));
		mav.addObject("FARM_ID", parameter.get("FARM_ID"));
		mav.addObject("COMP_TYPE", CommonUtil.getMapValue(parameter, "COMP_TYPE", ""));
		mav.setViewName(viewName);
		return mav;		
	}
	
}
