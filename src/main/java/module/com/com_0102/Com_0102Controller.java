package module.com.com_0102;

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
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import kr.co.a2m.security.kryptos.A2mSHA;
import module.com.com_0001.Com_0001ServiceImpl;
import module.com.com_0101.Com_0101ServiceImpl;
import module.hea.Hea_0001ServiceImpl;
import module.sys_new.Sys_0100ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;
import module.util.RandomString;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Com_0102Controller")
@RequestMapping("/com/com_0102")
public class Com_0102Controller extends BaseController {
	@Resource
	private Com_0102ServiceImpl src;
	
	@Resource
	private Com_0101ServiceImpl sys_0300ServiceImpl;
	
	@Resource
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Resource
	private Hea_0001ServiceImpl health_0100ServiceImpl;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("com/com_0102/com_0102");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 발전단지 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		//config key
		String sysConfigKey = "PROJECT_RENEW_NUM";
		parameter.put("SYS_CONFIG_KEY", sysConfigKey);
		
		Map search = (Map) parameter.get("search");
		if (search != null) {
			String SEARCH_ALL = search.get("all").toString();
			if (SEARCH_ALL.length() != 0) {
				parameter.put("SEARCH_ALL", SEARCH_ALL);
			}
		}
		
		Map result = src.getProjectList(parameter);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	/* 발전단지 리스트 조회 */
	@RequestMapping("/getProjectsByCompanyId.ajax")
	public ModelAndView getProjectsByCompanyId(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map result = src.getProjectsByCompanyId(parameter);
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	@RequestMapping("/getUserList.ajax")
	public ModelAndView getUserList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		List result = src.getUserList(parameter);
		Map map = new HashMap<>();
		map.put("LIST", result);
		mav.setViewName("jsonView");
		mav.addObject("DATA", map);
		
		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		//Get projet status
		Map map = new HashMap<>();
		map.put("COMM_CD", "PRJ_STATUS");
		List<Map> PRJ_STATUS_LIST = sys_1100ServiceImpl.getComCodeListByComm_Cd(map);
		
		mav.addObject("PRJ_STATUS_LIST",PRJ_STATUS_LIST);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.setViewName("com/com_0102/com_01021");
		return mav;
	}
	
	/* 수정 페이지 이동  */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		//Get projet status
		Map map = new HashMap<>();
		map.put("COMM_CD", "PRJ_STATUS");
		List PRJ_STATUS_LIST = sys_1100ServiceImpl.getComCodeListByComm_Cd(map);
		
		mav.addObject("PRJ_STATUS_LIST",PRJ_STATUS_LIST);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("com/com_0102/com_01021");
		return mav;
	}
	
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map result = null;
			
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(mav, parameter);
		}
		
		/* 세션 메뉴 업데이트 */
		Map session = (Map) parameter.get("session");
		
		HttpSession httpsession = request.getSession();
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
		mav.setViewName("com/com_0102/com_01022");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 상세 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getProjectInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.delete(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	@RequestMapping("/popupData/{TYPE}.ajax")
	public ModelAndView getPopupData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable("TYPE") String TYPE) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		List data = new ArrayList<Map>();
		switch(TYPE) {
			case "COMPANY":
				data = sys_0300ServiceImpl.getCompanyList(parameter);
				break;
//			case "MANAGER":
//				data = health_0100ServiceImpl.getEmpMgtList(parameter);
//				break;
			case "CONTRACT-STATUS":
				data = sys_1100ServiceImpl.getComCodeListByComm_Cd(parameter);
				break;
			case "INIT-STATUS":
				data = sys_1100ServiceImpl.getComCodeListByComm_Cd(parameter);
				break;
			case "IMPLEMENT-STATUS":
				data = sys_1100ServiceImpl.getComCodeListByComm_Cd(parameter);
				break;
			case "CLOSE-STATUS":
				data = sys_1100ServiceImpl.getComCodeListByComm_Cd(parameter);
				break;
			default:
				break;
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
}
