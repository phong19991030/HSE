//package applications.util;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//import module.cms.Cms_0100ServiceImpl;
//
//import org.quartz.JobExecutionContext;
//import org.quartz.JobExecutionException;
//import org.springframework.context.ApplicationContext;
//import org.springframework.scheduling.quartz.QuartzJobBean;
//import org.springframework.stereotype.Component;
//
//@Deprecated
//@Component("SaveWeatherJob")
//public class SaveWeatherInfo extends QuartzJobBean {
//	
//	private ApplicationContext appCtx;
//	
//	@Override
//	protected void executeInternal(JobExecutionContext exCtx) throws JobExecutionException {
//		
//		appCtx = (ApplicationContext) exCtx.getJobDetail().getJobDataMap().get("applicationContext");
//		
//		callService(exCtx);
//		
//	}
//	
//	private void callService(JobExecutionContext exCtx) {
//		
//		Cms_0100ServiceImpl src = (Cms_0100ServiceImpl) appCtx.getBean("Cms_0100ServiceImpl");
//
//		List<Map> farmList = new ArrayList();
//		List<Map<String, String>> weatherList = new ArrayList<Map<String,String>>();
//		
//		String lat = "";
//		String lon = "";
//		
//		try {
//			// 발전단지 정보에서 위도, 경도 값 가져오기
//			//farmList = src.getWindfarmList();
//			
//			if (farmList != null) {
//				for (Map farmObj : farmList) {
//					lat = farmObj.get("LATITUDE").toString();
//					lon = farmObj.get("LONGTUD").toString();
//					
//					weatherList = src.getWeatherInfo(lat, lon);
//					
//					if (weatherList != null) {
//						//src.insertListWeatherInfo(weatherList);
////						for (Map weatherInfo : weatherList) {
////							src.insertWeatherInfo(weatherInfo);
////						}
//					}
//				}
//			}
//			
//			System.out.println("Insert weather information : success!");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		
//	}
//
//}
