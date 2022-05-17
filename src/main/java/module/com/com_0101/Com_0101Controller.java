package module.com.com_0101;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.auth.AuthController;
import applications.auth.AuthDAOImpl;
import infrastructure.inheritance.BaseController;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import kr.co.a2m.security.kryptos.A2mSHA;
import module.hea.Hea_0001DAOImpl;
import module.util.RandomString;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Com_0101Controller")
@RequestMapping("/com/com_0101")
public class Com_0101Controller extends BaseController{
	
	@Resource
	private Com_0101ServiceImpl src;
	
	@Autowired
	private Hea_0001DAOImpl hea_0001DAO;
	
	@Autowired 
	private AuthDAOImpl authDAO;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0101/com_0101");
		mav.addObject("DATA", parameter);
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
	
	/* 보고서 페이지 팝업창 정보 조회 */
	@RequestMapping("/popupData/{TYPE}.ajax")
	public ModelAndView getPopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable("TYPE") String TYPE) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		List data = new ArrayList<Map>();
		switch(TYPE) {
			case "COMPANY":
				data = src.getCompanyList(parameter);
				break;
			case "MENU-ACCESS":
				data = src.getMenuAccessList(parameter);
				break;
			case "ID-CHECK":
				data = src.duplicateCheckUserID(parameter);
				break;
			default:
				break;
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
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
		mav.setViewName("com/com_0101/com_01011");
		return mav;
	}
	
	/* 수정 페이지 이동  */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("com/com_0101/com_01011");
		return mav;
	}
	
	@RequestMapping("/save.ajax")
	@Transactional(propagation=Propagation.REQUIRED)
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		/* 비밀번호 변환 */
		A2mSHA sha = new A2mSHA();
		//parameter.put("PASSWORD", sha.encrypt(parameter.get("PASSWORD").toString()));
		RandomString rs = new RandomString(20);
		String salt = rs.nextString();
		parameter.put("PASSWORD", sha.encrypt(parameter.get("PASSWORD").toString() + salt));
		parameter.put("SALT", salt);
		
		/* JSON String => List, Map으로 변환 */ 
		// MENU_ACCESS_LIST
		String jsonA = request.getParameter("MENU_ACCESS_LIST");
		List listA = new ArrayList();
		if(jsonA != null) {
			JSONArray arr = JSONArray.fromObject(jsonA);
			for(Object obj : arr) {
				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
				listA.add(m);
			}
		}
		parameter.put("MENU_ACCESS_LIST", listA);
		
		// TURBINE_PERMISSION_LIST
//		String jsonB = request.getParameter("TURBINE_PERMISSION_LIST");
//		List listB = new ArrayList();
//		if(jsonB != null) {
//			JSONArray arr = JSONArray.fromObject(jsonB);
//			for(Object obj : arr) {
//				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
//				listB.add(m);
//			}
//		}
//		parameter.put("TURBINE_PERMISSION_LIST", listB);
		mav.setViewName("jsonView");
		
//		check uid exist
		Map tmpParam = new HashMap();
		String empNo = CastUtil.castToString(parameter.get("EMP_NO"));
		String oldEmpNo = CastUtil.castToString(parameter.get("OLD_EMP"));
		tmpParam.put("EMP_NO", parameter.get("EMP_NO"));
		List lstTmp = new ArrayList();
		
		Boolean isNewEmp = false;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			tmpParam.put("USER_UID", parameter.get("USER_UID"));
			if(!empNo.equals(oldEmpNo)) {
				//update old Uid in emp
				Map tmpMap = new HashMap();
				tmpMap.put("EMP_NO", oldEmpNo);
				tmpMap.put("USER_UID", null);
				hea_0001DAO.updateUserUIDwithEmpNo(tmpMap);
				isNewEmp = true;
			}
		} else {
			isNewEmp = true;
		}
		
		if(isNewEmp) {
			lstTmp = hea_0001DAO.getEmpByUidNEmpNo(tmpParam);
			if(lstTmp != null && lstTmp.size() > 0) {
				Map tmp = (Map) lstTmp.get(0);
				String userUid = CastUtil.castToString( tmp.get("USER_UID"));
				if(!"".equals(userUid)) {
					Map map = new HashMap();
					map.put("ValidationMsg", "Employee has been duplicate");
					mav.addObject("DATA", map);
//				mav.addObject("ValidationMsg", "Employee has been duplicate");
					return mav;
				}
			}
		}
//		end check
		
		Map result = null;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(parameter);
			tmpParam.put("USER_UID", parameter.get("USER_UID"));
		}
		
//		update uid to emp
		int tmp = hea_0001DAO.updateUserUIDwithEmpNo(tmpParam);
		
		/* 세션 메뉴 업데이트 */
		Map session = (Map) parameter.get("session");
		List menu = authDAO.getListMenu(session);
		Map menus = new AuthController().splitMenu(menu);
		
		HttpSession httpsession = request.getSession();
		httpsession.setAttribute("SESS_ROLE_ID",authDAO.getUserRoleIdString(session));
		httpsession.setAttribute("SESS_MENU", menus.get("menu"));
		httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
	    /*//세션 메뉴 업데이트 */
		
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("com/com_0101/com_01012");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 상세 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getUserInfo(parameter);
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
