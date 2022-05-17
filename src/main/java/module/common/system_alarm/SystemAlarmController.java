package module.common.system_alarm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import module.util.DateConverter;

@Controller("SystemAlarmController")
@RequestMapping("/common/SystemAlarm")
public class SystemAlarmController extends BaseController {

	@Resource
	private SystemAlarmServiceImpl src;
	
	DateConverter converter = new DateConverter();
	
	
	@RequestMapping("/getAlarmData.ajax")
	public ModelAndView getAlarmData(ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		List<Map> sensor = src.getSensorError(parameter);
		List<Map> scada = src.getScadaAlarm(parameter);
		List<Map> notice = src.getNotice(parameter);
		Map<String, List> data = new HashMap<String, List>();
		data.put("SENSOR", sensor);
		data.put("SCADA", scada);
		data.put("NOTICE", notice);
		
		if(sensor.size() == 0 && notice.size() == 0 && scada.size() == 0) {
			data = null;
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
	
	@RequestMapping("/checkAlarmHistory.ajax")
	public ModelAndView checkAlarmHistory(ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response
							 , @RequestParam(value="ALARM_LIST") List<String> alarm_list) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		String uid = (String) parameter.get("USER_UID");
		String state = (String) parameter.get("STATE");
		
		List<Map<String, String>> list = new ArrayList<>();
		for(int i=0; i<alarm_list.size(); i++) {
			Map map = new HashMap();
			map.put("MESSAGE_ID", alarm_list.get(i));
			//map.put("USER_UID", uid);
			list.add(map);
		}
		parameter.put("ALARM_LIST", list);
		
		if(state.equals("read")) {
			src.insertAllAlarmHistory(parameter);
		} 
		else if(state.equals("delete")) {
			src.updateAllAlarmHistory(parameter);
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", null);
		return mav;
	}
	
	@RequestMapping("/updateAlarmHistory.ajax")
	public ModelAndView updateAlarmHistory(ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		src.updateAlarmHistory(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", null);
		return mav;
	}
	
}
