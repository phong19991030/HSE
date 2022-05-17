package module.safety.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import module.safety.service.Safety_0001ServiceImpl;
import module.safety.service.Safety_0002ServiceImpl;
import module.safety.service.Safety_0200ServiceImpl;

@Controller("Safety_0002Controller")
@RequestMapping(value = "/sft/sft_0002")
public class Safety_0002Controller extends BaseController {
	@Autowired
	private Safety_0002ServiceImpl service;
	
	@Autowired
	private Safety_0001ServiceImpl service0001;
	
	@Autowired
	private Safety_0200ServiceImpl service0200;
	
	@RequestMapping("/formManual")
    public ModelAndView formNewManual(ModelAndView mav, HttpServletRequest request
			, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		Map data = new HashMap<>();
		if("U".equals(CRUD)) {
			data = service.getToolGrantRevokeDetail(parameter);
		}	
		parameter.putAll(data);
		
//		tools
		List tools = service0001.getAllToolList(parameter);
		mav.addObject("tools", tools);
		
//    	projects
    	List<Map<Object, Object>> projects = service0200.getProjectList(parameter);
    	mav.addObject("projects", projects);
		
		mav.addObject("DATA", parameter);
        mav.setViewName("safety/safety_000201");
        return mav;
    }
	
    @RequestMapping("/detailForm")
    public ModelAndView detailManual(ModelAndView mav, HttpServletRequest request
                                        					, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        Map tool = service.getToolGrantRevokeDetail(parameter);
        
        mav.addObject("DATA", tool);
        mav.setViewName("safety/safety_000202");
        return mav;
    }
	
    @RequestMapping(value = { "/saveManual.ajax" })
    public ModelAndView doSaveManual(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
        String CRUD = (String) parameter.get("CRUD");
        if("".equals(CastUtil.castToString(parameter.get("EXPECT_REVOKE_DATE")))) {
        	parameter.put("EXPECT_REVOKE_DATE", null);
        }
        
        int result = 0;
        if("C".equals(CRUD)) {
        	result = service.insertToolGrantRevoke(mav, parameter);
        }else {
        	result = service.updateToolGrantRevoke(parameter);
        }
        parameter.put("RESULT_SAVE", result);
        
        mav.addObject("DATA", parameter);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
    	Map session = (Map) parameter.get("session");
    	String user_uid = (String) session.get("USER_UID");
    	Map userInfo = new HashMap<>();
    	
    	userInfo.put("USER_UID", user_uid);
    	mav.addObject("USERROLE", userInfo);
    	
//    	projects
    	List<Map<Object, Object>> projects = service0200.getProjectList(parameter);
    	mav.addObject("projects", projects);
    	
    	mav.setViewName("safety/safety_0002");
        return mav;
	}
	
	@RequestMapping("/getData.ajax")
    public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        
        Map result = service.getRowList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
        return mav;
    }
	
    @RequestMapping("/getManualListData.ajax")
    public ModelAndView getManualListData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        List list = service.getToolGrantRevokeList(parameter);
        
        mav.addObject("DATA", list);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request) throws Exception {
		Map<Object, Object> parameter = ParameterUtil.getParameterMap(request);
		int result = service.deleteToolGrantRevoke(mav, parameter);
		parameter.put("RESULT_DELETE", result);
		
        mav.addObject("DATA", parameter);
 		mav.setViewName("jsonView");
		return mav;
	}
	
}
