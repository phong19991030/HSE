//package module.cms;
//
//import static org.junit.Assert.assertEquals;
//
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.List;
//import java.util.Map;
//
//import javax.annotation.Resource;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.data.mongodb.core.aggregation.Fields;
//
//import config.LogicTestConfig;
//import module.model.Component;
//import module.model.ComponentClass;
//import module.model.Sensor;
//import module.model.WindTurbine;
//import module.util.DateConverter;
//
//public class Cms_0200DAOImplTest extends LogicTestConfig{
//	
//	private static final Logger logger = LoggerFactory.getLogger(Cms_0200DAOImplTest.class);
//	
//	String power_system_id;
//	
//	
//	@Resource(name="Cms_0200DAOImpl")
//	private Old_0200DAOImpl dao;
//	private DateConverter converter; 
//	
//	
//	@Before
//	public void setup() {
//		power_system_id = "5d64ab6e2a41be4f74cf12d7";
//		converter = new module.util.DateConverter();
//	}
//	
//	
//	@Test
//	public void getComponentClassList_test() {
//		/*** Given ***/
//
//		/*** When ***/
//		List<ComponentClass> component_class_list= dao.getComponentClassList(power_system_id);
//		
//		/*** Then ***/
//		assertEquals(component_class_list.size(), 9);
//	}
//	
//	@Test
//	public void getComponentList_test() {
//		/*** Given ***/
//
//		/*** When ***/
//		List<Component> component_list = dao.getComponentList("5d64abc22a41be4f74cf12fc");
//		
//		/*** Then ***/
//		assertEquals(component_list.size(), 2);
//	}
//	
//	@Test
//	public void getSensorList_test() {
//		/*** Given ***/
//
//		/*** When ***/
//		List<Sensor> sensor_list = dao.getSensorListByComponentID("5d64b5e72a41be4f74cf1363");
//		
//		/*** Then ***/
//		assertEquals(sensor_list.size(), 2);
//	}
//	
//	@Test
//	public void getAllSensorList_test() {
//		/*** Given ***/
//
//		
//		/*** When ***/
//		List<Sensor> sensor_all_list = dao.getAllSensorList(power_system_id);
//		List<Sensor> sensor_all_list2 = new ArrayList();
//		
//		List<ComponentClass> component_class_list = dao.getComponentClassList(power_system_id);
//		for(ComponentClass cc : component_class_list) {
//			List<Component> component_list = dao.getComponentList(cc.get_id());
//			for(Component c : component_list) {
//				List<Sensor> sensor_list = dao.getSensorListByComponentID(c.get_id());
//				for(Sensor s : sensor_list) {
//					sensor_all_list2.add(s);
//				}
//			}
//		}
//		
//		/*** Then ***/
//		assertEquals(sensor_all_list.size(), sensor_all_list2.size());
//	}
//	
//	@Test
//	public void getTurbineInfoTest() {
//		/*** Given ***/
//		
//		/*** When ***/
//		WindTurbine turbineInfo = dao.getTurbineInfo(power_system_id);
//		
//		/*** Then ***/
//		assertEquals(turbineInfo.getName(), "HS5500");
//	}
//	
//	@Test
//	public void getSensorDataTest() {
//		/*** Given ***/
//		
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date today = new Date();
//		Date daysAgoOf7 = new Date();
//		daysAgoOf7.setDate(today.getDate()-3);
//		
//		Date edate = converter.convertLocalToUTC(today);
//		Date sdate = converter.convertLocalToUTC(daysAgoOf7);
//		
//		System.out.println("start : " + sdate);
//		System.out.println("end : " + edate);
//		
//		
//		//String sensor_id = "5d6fbcf9c72f2c0d6cead1fa";
//		String sensor_id = "5d6fbb85c72f2c0d6cead197";
//		
//		
//		/*** When ***/
//		List<Map> sensorData_list = dao.getSensorData(sensor_id, sdate, edate, "day");
//		
//		for(Map sensorData : sensorData_list) {
//			Map<String, Integer> map = (Map) sensorData.get("_id");
////			System.out.println(map.get("year")+"-"+map.get("month")+"-"+map.get("day"));
//			System.out.println(map);
//			
//			Double avg_rms = (Double) sensorData.get("avg");
//			System.out.println(Math.round(avg_rms*1000000)/1000000.0);
//		}
//				
//		/*** Then ***/
//		assertEquals(sensorData_list.size(), 4321);
//	}
//	
//	@Test
//	public void getPowerGenerationTest() {
//		/*** Given ***/
//		
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date today = new Date();
//		Date daysAgoOf7 = new Date();
//		daysAgoOf7.setDate(today.getDate()-7);
//		
//		Date edate = converter.convertLocalToUTC(today);
//		Date sdate = converter.convertLocalToUTC(daysAgoOf7);
//		
//		System.out.println("start : " + sdate);
//		System.out.println("end : " + edate);
//		
//		
//		String sensor_id = "5d64e6fb2a41be3ac416bff2";
//		
//		
//		/*** When ***/
//		List<Map> sensorData_list = dao.getPowerGeneration(sensor_id, sdate, edate, "day");
//		
//		for(Map sensorData : sensorData_list) {
//			Map<String, Integer> map = (Map) sensorData.get("_id");
//			System.out.println(map.get("year")+"-"+map.get("month")+"-"+map.get("day"));
//			
//			Double sum_rms = (Double) sensorData.get("sum");
//			int time = (int) sensorData.get("count");
//			System.out.println(Math.round(sum_rms*1000000)/1000000.0);
//			System.out.println(time);
//		}
//				
//		/*** Then ***/
//		assertEquals(sensorData_list.size(), 7);
//	}
//	
//	@Test
//	public void getUptimeTest() {
//		/*** Given ***/
//		
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date today = new Date();
//		Date daysAgoOf7 = new Date();
//		daysAgoOf7.setDate(today.getDate()-7);
//		
//		Date edate = converter.convertLocalToUTC(today);
//		Date sdate = converter.convertLocalToUTC(daysAgoOf7);
//		
//		System.out.println("start : " + sdate);
//		System.out.println("end : " + edate);
//		
//		
//		String sensor_id = "5d64e6fb2a41be3ac416bff2";
//		String format_level = "day";
//		
//		/*** When ***/
//		List<Map> sensorData_list = dao.getUptime(sensor_id, sdate, edate, format_level);
//		
//		
//		double operating_ratio = 0;
//		for(Map sensorData : sensorData_list) {
//			Map<String, Integer> map = (Map) sensorData.get("_id");
//			int uptime = (int) sensorData.get("count") * 10;
//			String date = "";
//		
//			
//			switch(format_level) {
//				case "day":  
//					date = map.get("year")+"-"+map.get("month")+"-"+map.get("day");
//					operating_ratio = Math.round((uptime * 100 / 86400) * 100)/100.0; 
//					break;
//				case "month":
//					date = map.get("year")+"-"+map.get("month");
//					operating_ratio = Math.round((uptime * 100 / 2678400) * 100)/100.0; 	// 31일 기준
//					break;
//				case "year":
//					date = map.get("year") + "";
//					operating_ratio =  Math.round((uptime * 100 / 31536000) * 100)/100.0; 	// 1년 풀가동 기준
//					break;
//			}
//			System.out.println(date);
//			System.out.println("Uptime Millisec : " + uptime);
//			System.out.println("가동률 : " + operating_ratio);
//			System.out.println("가동률 : " + operating_ratio + "%");
//			System.out.println();
//			
//		}
//				
//		/*** Then ***/
//		assertEquals(sensorData_list.size(), 7);
//	}
//	
//	@Test
//	public void getLastUptimeTest() {
//		/*** Given ***/
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date today = new Date();
//		Date daysAgoOf7 = new Date();
//		daysAgoOf7.setDate(today.getDate()-7);
//		
//		Date edate = converter.convertLocalToUTC(today);
//		Date sdate = converter.convertLocalToUTC(daysAgoOf7);
//		
//		System.out.println("start : " + sdate);
//		System.out.println("end : " + edate);
//		
//		String sensor_id = "5d64e6fb2a41be3ac416bff2";
//		String format_level = "day";
//		
//		/*** When ***/
//		List<Map> sensorData_list = dao.getLastUptime(sensor_id, sdate, edate, format_level);
//		System.out.println(sensorData_list.get(0).get("sdate"));
//		Date date = (Date) sensorData_list.get(0).get("sdate");
//		
//		Date convertLocalToUTC = converter.convertUTCToLocal(date);
//		System.out.println(convertLocalToUTC);
//		
//		/*** Then ***/
//		assertEquals(sensorData_list.size(), 1);
//	}
//	
//	@Test
//	public void getFirstUptimeTest() {
//		/*** Given ***/
//		
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date today = new Date();
//		Date daysAgoOf7 = new Date();
//		daysAgoOf7.setDate(today.getDate()-7);
//		
//		Date edate = converter.convertLocalToUTC(today);
//		Date sdate = converter.convertLocalToUTC(daysAgoOf7);
//		
//		System.out.println("start : " + sdate);
//		System.out.println("end : " + edate);
//		
//		String sensor_id = "5d64e6fb2a41be3ac416bff2";
//		String format_level = "day";
//		
//		/*** When ***/
//		List<Map> sensorData_list = dao.getFirstUptime(sensor_id, sdate, edate, format_level);
//		System.out.println(sensorData_list.get(0).get("sdate"));
//		Date date = (Date) sensorData_list.get(0).get("sdate");
//		
//		Date convertLocalToUTC = converter.convertUTCToLocal(date);
//		System.out.println(convertLocalToUTC);
//		
//		/*** Then ***/
//		assertEquals(sensorData_list.size(), 1);
//	}
//	
//	
//	@Test
//	public void dateTest() {
//		/*** Given ***/
//		List<String> date = new ArrayList();
//		date.add("2019-10-24 13:49:27");
//		date.add("2019-10-17 13:49:27");
//		/*** When ***/
//
//		/*** Then ***/
//		String[] str_sdate = date.get(0).split(" ");	// [ '2019-10-24', '13:49:27' ]
//		String[] str_edate = date.get(1).split(" ");
//		
//		String[] ymd_sdate = str_sdate[0].split("-");	// [ '2019', '10', '24' ]
//		String[] hms_sdate = str_sdate[1].split(":");	// [ '13', '49', '27' ]
//		
//		String[] ymd_edate = str_edate[0].split("-");
//		String[] hms_edate = str_edate[1].split(":");
//		
//		
//		for(int i=0; i<3; i++) {
//			System.out.println(ymd_sdate[i]);
//			System.out.println(hms_sdate[i]);
//		}
//		
//		
////		// Parsing Date
//		Calendar s_cal = Calendar.getInstance();
//		s_cal.set(Calendar.YEAR, Integer.parseInt(ymd_sdate[0]));
//		s_cal.set(Calendar.MONTH, Integer.parseInt(ymd_sdate[1])-1);
//		s_cal.set(Calendar.DATE, Integer.parseInt(ymd_sdate[2]));
//		s_cal.set(Calendar.HOUR, Integer.parseInt(hms_sdate[0]));
//		s_cal.set(Calendar.MINUTE, Integer.parseInt(hms_sdate[1]));
//		s_cal.set(Calendar.SECOND, Integer.parseInt(hms_sdate[2]));
//		
//		System.out.println("s_cal : " + s_cal);
//		
//		Calendar e_cal = Calendar.getInstance();
//		e_cal.set(Calendar.YEAR, Integer.parseInt(ymd_edate[0]));
//		e_cal.set(Calendar.MONTH, Integer.parseInt(ymd_edate[1])-1);
//		e_cal.set(Calendar.DATE, Integer.parseInt(ymd_edate[2]));
//		e_cal.set(Calendar.HOUR, Integer.parseInt(hms_edate[0]));
//		e_cal.set(Calendar.MINUTE, Integer.parseInt(hms_edate[1]));
//		e_cal.set(Calendar.SECOND, Integer.parseInt(hms_edate[2]));
//		
//		Date sdate = new Date(s_cal.getTimeInMillis());
//		Date edate = new Date(e_cal.getTimeInMillis());
//		
//		System.out.println("sdate : " + sdate);
//		System.out.println("edate : " + edate);
//	}
//	
//	@Test
//	public void getAllSensorDataTest() {
//		/*** Given ***/
//		
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date today = new Date();
//		Date daysAgoOf7 = new Date();
//		daysAgoOf7.setDate(today.getDate()-3);
//		
//		Date edate = converter.convertLocalToUTC(today);
//		Date sdate = converter.convertLocalToUTC(daysAgoOf7);
//		
//		System.out.println("start : " + sdate);
//		System.out.println("end : " + edate);
//		
//		
//		//String sensor_id = "5d6fbcf9c72f2c0d6cead1fa";
//		String sensor_id = "5d6fbb85c72f2c0d6cead197";
//		
//		
//		/*** When ***/
//		List<Map> sensorData_list = dao.getSensorData(sensor_id, sdate, edate, "minute");
//		
//		for(Map sensorData : sensorData_list) {
//			Map<String, Integer> map = (Map) sensorData.get("_id");
////			System.out.println(map.get("year")+"-"+map.get("month")+"-"+map.get("day"));
//			System.out.println(map);
//			
//			Double avg_rms = (Double) sensorData.get("avg");
//			System.out.println(Math.round(avg_rms*1000000)/1000000.0);
//		}
//				
//		/*** Then ***/
//		assertEquals(sensorData_list.size(), 4321);
//	}
//	
//	
//}
