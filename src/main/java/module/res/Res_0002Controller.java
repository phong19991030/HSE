package module.res;

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

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.sys_new.Doc_0100ServiceImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Controller
@RequestMapping(value = "/res/res_0002")
public class Res_0002Controller extends BaseController{

	@Autowired
	private Res_0002ServiceImpl service;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@Resource
	private Doc_0100ServiceImpl src;

	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("res/res_0002");
		mav.addObject("DATA", parameter);
		//waste option 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "WASTE_TYPE"); 
    	List<Map<Object, Object>> wasteCds = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("wasteCds", wasteCds);
		return mav;
	}

	/* 발전단지 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = service.getList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);

		return mav;
	}

	/* 수정 페이지 이동 */

	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		int result = 0;
		if (parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = service.update(parameter);
		}
		else {
			result= service.insert(mav, parameter);
		}
		
		Map<Object, Object> map = new HashMap<Object, Object>();
        map.put("WASTE_ID", parameter.get("WASTE_ID"));
        map.put("RESULT_SAVE", result);
        mav.addObject("DATA", map);
        mav.setViewName("jsonView");
		return mav;
	}

	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map data = new HashMap<>();
		data = service.get(parameter);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("res/res_000202");
		mav.addObject("DATA", data);
		return mav;
	}
	
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		mav.addObject("INS_ID", session.get("USER_ID"));
		
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		
		parameter.put("CRUD", "U");
		
		Map data = new HashMap<>();
		data = service.get(parameter);
		parameter.putAll(data);
		
		mav.addObject("DATA", parameter);
		mav.setViewName("res/res_000201");
		
		//waste option 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "WASTE_TYPE"); 
    	List<Map<Object, Object>> wasteCds = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("wasteCds", wasteCds);
		return mav;
	}

	/* 상세 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.get(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map session = (Map) parameter.get("session");
		mav.addObject("INS_ID", session.get("USER_ID"));
		
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("res/res_000201");
		
		//waste option 
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "WASTE_TYPE"); 
    	List<Map<Object, Object>> wasteCds = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("wasteCds", wasteCds);
		return mav;
	}

	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = service.delete(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/deleteWasteFile.ajax")
	public ModelAndView deleteWasteFile(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteWasteFile(parameter);
		
		parameter.put("RESULT_DELETE", result);
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
	
}

