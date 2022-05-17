package module.dashboard;

import java.util.ArrayList;
import java.util.Date;
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
import net.sf.json.JSONArray;

@Controller("Dsb_0100Controller")
@RequestMapping("/dsb/dsb_0100")
public class Dsb_0100Controller extends BaseController {

	@Resource
	private Dsb_0100ServiceImpl src;
	
	DateConverter converter = new DateConverter();
	
	/**
	 *  발전단지 현황 화면
	 *  @category view
	 */
	@RequestMapping("/main")
	public ModelAndView main(ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		// TODO : MariaDB 날짜 검색 시 -> UTC Time으로 검색
		DateConverter converter = new DateConverter();
		
		String timezoneId = (String) parameter.get("CLIENT_ACCESS_TIMEZONE");
		
		Map searchDate = converter.createDBSearchDateUTC(timezoneId);
		Map yearDate = converter.createYearSearchDateUTC(timezoneId);
		
		Date s = (Date) searchDate.get("START_TIME");
		Date e = (Date) searchDate.get("END_TIME");
		
		Date ts = (Date) yearDate.get("START_TIME_THIS_YEAR");
		Date te = (Date) yearDate.get("END_TIME_THIS_YEAR");
		
		Date ls = (Date) yearDate.get("START_TIME_LAST_YEAR");
		Date le = (Date) yearDate.get("END_TIME_LAST_YEAR");
		
		parameter.put("START_TIME", s);
		parameter.put("END_TIME", e);
		
//		System.out.println(s);
//		System.out.println(e);
		
		parameter.put("START_TIME_THIS_YEAR", ts);
		parameter.put("END_TIME_THIS_YEAR", te);
		
//		System.out.println(ts);
//		System.out.println(te);
		
		parameter.put("START_TIME_LAST_YEAR", ls);
		parameter.put("END_TIME_LAST_YEAR", le);
		
//		System.out.println(ls);
//		System.out.println(le);
		
//		String timezone_offset = converter.createTimezoneOffset(timezoneId);
//		parameter.put("TIMEZONE_OFFSET", timezone_offset);
		
		List<Map> farmList = src.getFarmByRole(parameter);
//		List<Map> chartDataOfFarm = src.getChartDataOfFarm(parameter);
//		List<Map> chartDataOfGroup = src.getChartDataOfGroup(parameter);
//		List<Map> chartDataOfTurbine = src.getChartDataOfTurbine(parameter);
		
		JSONArray json_farm_list = JSONArray.fromObject(farmList);
//		JSONArray json_chart_data_farm = JSONArray.fromObject(chartDataOfFarm);
//		JSONArray json_chart_data_group = JSONArray.fromObject(chartDataOfGroup);
//		JSONArray json_chart_data_turbine = JSONArray.fromObject(chartDataOfTurbine);
		
		mav.setViewName("cms/cms_0100");
		mav.addObject("FARM", json_farm_list);
//		mav.addObject("CHART_FARM", json_chart_data_farm);
//		mav.addObject("CHART_GROUP", json_chart_data_group);
//		mav.addObject("CHART_TURBINE", json_chart_data_turbine);
		mav.addObject("CLIENT_ACCESS_TIMEZONE", timezoneId);
		
		return mav;
	}
	
	@RequestMapping("/footer.ajax")
	public ModelAndView viewFooter(ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		mav.setViewName("tab:dashboard/dsb_010001");
		return mav;
	}
	
	@RequestMapping("/side.ajax")
	public ModelAndView viewSide(ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		mav.setViewName("tab:dashboard/dsb_010002");
		return mav;
	}
	
	

	@RequestMapping("/getAllData.ajax")
	public ModelAndView getAllData(@RequestParam(value="FARM_LIST") List<String> farm_list
							 , ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		//List farm_list = (List) parameter.get("FARM_LIST");
		
		String timezoneId = (String) parameter.get("CLIENT_ACCESS_TIMEZONE");
		Map searchDate = converter.createDBSearchDateUTC(timezoneId);
		Map yearDate = converter.createYearSearchDateUTC(timezoneId);
		
		Date s = (Date) searchDate.get("START_TIME");
		Date e = (Date) searchDate.get("END_TIME");
		
		Date ts = (Date) yearDate.get("START_TIME_THIS_YEAR");
		Date te = (Date) yearDate.get("END_TIME_THIS_YEAR");
		
		Date ls = (Date) yearDate.get("START_TIME_LAST_YEAR");
		Date le = (Date) yearDate.get("END_TIME_LAST_YEAR");
		
		parameter.put("START_TIME", s);
		parameter.put("END_TIME", e);
		
		System.out.println(s);
		System.out.println(e);
		
		parameter.put("START_TIME_THIS_YEAR", ts);
		parameter.put("END_TIME_THIS_YEAR", te);
		
		System.out.println(ts);
		System.out.println(te);
		
		parameter.put("START_TIME_LAST_YEAR", ls);
		parameter.put("END_TIME_LAST_YEAR", le);
		
		System.out.println(ls);
		System.out.println(le);
		
		
		Map<String, Object> data = new HashMap<String, Object>();
		Map<String, Object> group_list = new HashMap<String, Object>();
		Map<String, Object> turbine_list= new HashMap<String, Object>();
		
		for(Object farm_id : farm_list) {
			parameter.put("FARM_ID", farm_id);
			List<Map> groupByFarm = src.getGroupByFarm(parameter);
			group_list.put((String) farm_id, groupByFarm);
			
			for(Map group : groupByFarm) {
				Object group_id = group.get("GROUP_ID");
				parameter.put("GROUP_ID", group_id);
				List wtListByGroup = src.getTurbineByGroup(parameter);
				turbine_list.put((String) group_id, wtListByGroup);
			}
			
		}
		
		/*
		 *		no group 
		 *		현재 WT_GEGRATOR 테이블에 FARM_ID 컬럼이 없으므로
		 *		
		 *		FARM_ID 컬럼을 추가하고 GROUP_ID컬럼에 null 값을 줄것인지,
		 *		
		 *		GROUP_ID 컬럼에 FARM_ID를 추가 할 것인지에 여부에 따라 
		 *		no-group 수정
		 *		   
		 */
//		parameter.put("GROUP_ID", null);
//		List wtListByGroup = src.getWTListByGroup(parameter);
		//turbine_list.put("NO_GROUP", wtListByGroup);
		
		
		data.put("GROUP", group_list);
		data.put("TURBINE", turbine_list);

		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		
		return mav;
	}
	
	
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(@RequestParam(value="FARM_LIST") List<String> farm_list
							 , ModelAndView mav
							 , HttpServletRequest request
							 , HttpServletResponse response) throws Exception {
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		System.out.println("###########");
		System.out.println(farm_list);
		
		List<Map<String, String>> list = new ArrayList<>();
		for(int i=0; i<farm_list.size(); i++) {
			Map map = new HashMap();
			map.put("ID", farm_list.get(i));
			list.add(map);
		}
		parameter.put("FARM_LIST", list);
		
		List alarmList = src.getAlarmList(parameter);
		List errorList = src.getSensorErrorList(parameter);
		List stockList = src.getStockList(parameter);
		List schduleList = src.getScheduleList(parameter);
		Map production = src.getProduction(parameter);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("ALARM_LIST", alarmList);
		data.put("SENSOR_ERROR_LIST", errorList);
		data.put("STOCK_LIST", stockList);
		data.put("SCHEDULE_LIST", schduleList);
		data.put("PRODUCTION", production);
		mav.setViewName("jsonView");
		mav.addObject("DATA", data);
		return mav;
	}
}
