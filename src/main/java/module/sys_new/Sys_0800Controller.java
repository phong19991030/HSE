package module.sys_new;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.auth.AuthController;
import applications.auth.AuthDAOImpl;
import applications.util.UtilService;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

@Controller("Sys_new_0800Controller")
@RequestMapping("/sys_new/sys_0800")
public class Sys_0800Controller extends BaseController{
	
	@Resource
	private Sys_0800ServiceImpl src;
	
	@Autowired 
	private AuthDAOImpl authDAO;
	
	/* 리스트 페이지*/
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/sys_0800");
		return mav;
	}
	
	/* 메뉴 리스트 데이터 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		List result = src.getMenuList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 메뉴 등록, 수정 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
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
	
	/* 삭제 */
	@RequestMapping("/delete.ajax")
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



