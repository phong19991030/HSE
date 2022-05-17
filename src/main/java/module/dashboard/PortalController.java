package module.dashboard;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;

@Controller("portalController")
@RequestMapping("/portal/portlets")
public class PortalController extends BaseController {
	
	private final String baseDir = "part:portal/view";  // use prefix dialog: to get only HTML content of the view

	@RequestMapping("/operationCondition")
	public ModelAndView getUserInfoPortlet(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		mav.setViewName(baseDir + "/operationCondition");
		return mav;
	}
	
	@RequestMapping("/availabilityChart")
	public ModelAndView getEditButtonPortlet(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		// TODO : 발전기 조회 범위 관련 권한 조건 추가
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		List list = new ArrayList<>();
		try {
//			list = cms_0201dao.getAvailability(parameter);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map result = new HashMap();
		result.put("prevYear", Integer.toString(Calendar.getInstance().get(Calendar.YEAR)));
		result.put("currYear", Integer.toString(Calendar.getInstance().get(Calendar.YEAR)-1));
		String[] categories = {
		                  "'January'",
		                  "'February'",
		                  "'March'",
		                  "'April'",
		                  "'May'",
		                  "'June'",
		                  "'July'",
		                  "'August'",
		                  "'September'",
		                  "'October'",
		                  "'November'",
		                  "'December'"
		};
		List<String> categoriesList = Arrays.asList(categories);
		
		Map out = new HashMap();
		int year_cr, month_cr;
		year_cr = 0;
		month_cr = 0;
		List temp = new ArrayList();
		for(int i = 0; i< list.size(); i++) {
			if((int)((Map)list.get(i)).get("YEAR") != year_cr){
      			out.put(year_cr, new ArrayList<>(temp));
      			temp = new ArrayList();
      			month_cr = 1;
      			year_cr = (int)((Map)list.get(i)).get("YEAR");
      		}
			
      		while((int)((Map)list.get(i)).get("MONTH") != month_cr){
      			temp.add(null);
      			month_cr++;
      		}
      		temp.add(((Map)list.get(i)).get("UZ_RT"));
      		month_cr++;
		}
		out.put(year_cr, new ArrayList<>(temp));

		result.put("prevList", out.get(Integer.parseInt(result.get("prevYear").toString())));
		result.put("currList", out.get(Integer.parseInt(result.get("currYear").toString())));
		result.put("categories", categoriesList);
		mav.addAllObjects(result);
		mav.setViewName(baseDir + "/availabilityChart");
		return mav;
	}
	
	@RequestMapping("/failureRateChart")
	public ModelAndView getApprovalStatusPortlet(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		
		mav.setViewName(baseDir + "/failureRateChart");
		return mav;
	}
	
	@RequestMapping("/productionChart")
	public ModelAndView getCalendarPortlet(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		// TODO : 발전기 조회 범위 관련 권한 조건 추가
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		List list = new ArrayList<>();
		try {
//			list = cms_0201dao.getQuantity(parameter);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map result = new HashMap();
		result.put("prevYear", Integer.toString(Calendar.getInstance().get(Calendar.YEAR)));
		result.put("currYear", Integer.toString(Calendar.getInstance().get(Calendar.YEAR)-1));
		String[] categories = {
		                  "'January'",
		                  "'February'",
		                  "'March'",
		                  "'April'",
		                  "'May'",
		                  "'June'",
		                  "'July'",
		                  "'August'",
		                  "'September'",
		                  "'October'",
		                  "'November'",
		                  "'December'"
		};
		List<String> categoriesList = Arrays.asList(categories);
		
		Map out = new HashMap();
		int year_cr, month_cr;
		year_cr = 0;
		month_cr = 0;
		List temp = new ArrayList();
		for(int i = 0; i< list.size(); i++) {
			if((int)((Map)list.get(i)).get("YEAR") != year_cr){
      			out.put(year_cr, new ArrayList<>(temp));
      			temp = new ArrayList();
      			month_cr = 1;
      			year_cr = (int)((Map)list.get(i)).get("YEAR");
      		}
			
      		while((int)((Map)list.get(i)).get("MONTH") != month_cr){
      			temp.add(null);
      			month_cr++;
      		}
      		temp.add(((Map)list.get(i)).get("QTY"));
      		month_cr++;
		}
		out.put(year_cr, new ArrayList<>(temp));

		result.put("prevList", out.get(Integer.parseInt(result.get("prevYear").toString())));
		result.put("currList", out.get(Integer.parseInt(result.get("currYear").toString())));
		result.put("categories", categoriesList);
		mav.addAllObjects(result);
		mav.setViewName(baseDir + "/productionChart");
		return mav;
	}
	
	@RequestMapping("/reports")
	public ModelAndView getProgressDocumentPortlet(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		
		mav.setViewName(baseDir + "/reports");
		return mav;
	}
	
	@RequestMapping("/scadaAlarm")
	public ModelAndView getScadaAlarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		mav.setViewName(baseDir + "/scadaAlarm");
		return mav;
	}
	@RequestMapping("/sensorError")
	public ModelAndView getsensorError(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		
		mav.setViewName(baseDir + "/sensorError");
		return mav;
	}
	
}
