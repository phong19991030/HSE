package module.sys_new;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.auth.AuthController;
import applications.auth.AuthDAOImpl;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Sys_new_0600Controller")
@RequestMapping("/sys_new/sys_0600")
public class Sys_0600Controller extends BaseController{
	
	@Resource
	private Sys_0600ServiceImpl src;
	
	@Autowired 
	private AuthDAOImpl authDAO;
	
	@Autowired
	private ServletContext servletContext;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		mav.setViewName("sys_new/sys_0600");
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
		Map data = src.duplicateCheckRoleID(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
	
	/* 등록 페이지 이동  */
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.setViewName("sys_new/sys_0601");
		return mav;
	}
	
	/* 수정 페이지 이동  */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/sys_0601");
		return mav;
	}
	
	/* 저장 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		/* JSON String => List, Map으로 변환 */ 
		// MENU_ACCESS_LIST
		String jsonA = request.getParameter("GRANT_LIST");
		List listA = new ArrayList();
		if(jsonA != null) {
			JSONArray arr = JSONArray.fromObject(jsonA);
			for(Object obj : arr) {
				Map<String, Object> m = (Map<String, Object>) JSONObject.toBean((JSONObject)obj, java.util.HashMap.class);
				listA.add(m);
			}
		}
		parameter.put("GRANT_LIST", listA);
		
		Map result = null;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(parameter);
		}
		
		/* 세션 메뉴 업데이트 */
		Map session = (Map) parameter.get("session");
		List menu = authDAO.getListMenu(session);
		Map menus = new AuthController().splitMenu(menu);
		
		HttpSession httpsession = request.getSession();
		httpsession.setAttribute("SESS_ROLE_ID",authDAO.getUserRoleIdString(session));
		httpsession.setAttribute("SESS_MENU", menus.get("menu"));
		httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
	    /*//세션 메뉴 업데이트 */
		
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("sys_new/sys_0602");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 유저 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getMenuAccessInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.delete(parameter);
		
		/* 세션 메뉴 업데이트 */
		Map session = (Map) parameter.get("session");
		List menu = authDAO.getListMenu(session);
		Map menus = new AuthController().splitMenu(menu);
		
		HttpSession httpsession = request.getSession();
		httpsession.setAttribute("SESS_ROLE_ID",authDAO.getUserRoleIdString(session));
		httpsession.setAttribute("SESS_MENU", menus.get("menu"));
		httpsession.setAttribute("SESS_SYS_MENU", menus.get("system"));
	    /*//세션 메뉴 업데이트 */
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	
	
	
}
