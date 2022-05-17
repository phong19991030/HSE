package module.com.com_0201;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.sys_new.Sys_1100ServiceImpl;

@Controller("Com_0201Controller")
@RequestMapping(value = "com/com_0201")
public class Com_0201Controller extends BaseController{
	
	@Autowired
	private Com_0201ServiceImpl src;
	
	@Autowired
	private Sys_1100ServiceImpl sys_1100ServiceImpl;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws Exception {
		//TURBINE_STATUS
		Map parameter = ParameterUtil.getParameterMap(request);
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "TURBINE_STATUS");
    	List<Map<Object, Object>> turbineStatus = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("turbineStatus", turbineStatus);
    	
		mav.setViewName("/com/com_0201/com_020100");
		mav.addObject("DATA", parameter);
		return mav;
	}
	

	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		
		String sysConfigKey = "TURBINE_RENEW_NUM ";
		parameter.put("SYS_CONFIG_KEY", sysConfigKey);
		
		
		Map result = src.getListTurbine(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		
		return mav;
	}
	
	
    @RequestMapping("/form/detailTurbine.{path}")
    public ModelAndView detailTurbine(ModelAndView mav, HttpServletRequest request
                                        					, HttpServletResponse response, @PathVariable String path) throws Exception {
        Map parameter = ParameterUtil.getParameterMap(request);
        Map turbine = src.getDataForTurbineDetail(parameter, request);
        mav.addObject("DATA", turbine);
        mav.setViewName("/com/com_0201/com_020110");
        return mav;
    }

    @RequestMapping("/form/newTurbine.{path}")
    public ModelAndView formNewTurbine(ModelAndView mav, HttpServletRequest request
    															, HttpServletResponse response, @PathVariable String path) throws Exception {
    	Map parameter = ParameterUtil.getParameterMap(request);
    	Map turbineData = src.getDataForTurbine(parameter);
    	
    	//TURBINE_STATUS
    	Map<Object, Object> tmp = new HashMap<Object, Object>();
    	tmp.put("COMM_CD", "TURBINE_STATUS");
    	List<Map<Object, Object>> turbineStatus = sys_1100ServiceImpl.getComCodeListByComm_Cd(tmp);
    	
    	mav.addObject("turbineStatus", turbineStatus);
        mav.addObject("DATA", turbineData.get("DATA"));
        //mav.addObject("FARM", turbineData.get("FARM"));
        mav.setViewName("/com/com_0201/com_020120");
        return mav;
    }
	
	@RequestMapping("/saveTurbine.ajax")
    public ModelAndView doSaveTurbine(ModelAndView mav, HttpServletRequest request
                                    						, HttpServletResponse response) throws Exception {
        Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
        
        Map result = null;
        if(parameter.get("CRUD").toString().equals("U")) {
			result = src.updateTurbine(parameter);
		} else {
			result = src.insertTurbine(mav, parameter);
		}
        
        mav.addObject("DATA", result);
        mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping("/deleteTurbine.ajax")
    public ModelAndView doDeleteTurbine(ModelAndView mav, HttpServletRequest request
                                        , HttpServletResponse response) throws Exception {
    	Map parameter = ParameterUtil.getParameterMap(request);
    	Map result = src.deleteTurbine(mav, parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
    }
	
	
	
}
