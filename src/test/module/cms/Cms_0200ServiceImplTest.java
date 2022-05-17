//package module.cms;
//
//import static org.junit.Assert.assertEquals;
//
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.annotation.Resource;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import config.LogicTestConfig;
//import module.util.DateConverter;
//
//public class Cms_0200ServiceImplTest extends LogicTestConfig{
//	
//	
//	private static final Logger logger = LoggerFactory.getLogger(Cms_0200ServiceImplTest.class);
//	String power_system_id;
//	Map param;
//	
//	
//	@Resource(name="Cms_0200ServiceImpl")
//	private Old_0200ServiceImpl service;
//	private DateConverter converter; 
//	
//	@Before
//	public void setup() {
//		power_system_id = "5d64ab6e2a41be4f74cf12d7";
//		converter = new module.util.DateConverter();
//		param = new HashMap();
//	}
//	
//	
//	@Test
//	public void getSensorMap_test() throws Exception {
//		/*** Given ***/
//		
//		/*** When ***/
//		
//		/*** Then ***/
//		
//	}
//	
//	@Test
//	public void getMarginOfUptime() throws Exception {
//		/*** Given ***/
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		
//		
//		Date sdate = format.parse("2019-10-24 00:00:00"); 
//		Date edate = format.parse("2019-11-05 00:00:00");
//		
//		Date sdate_UTC = converter.convertLocalToUTC(sdate);
//		Date edate_UTC = converter.convertLocalToUTC(edate);
//		
//		System.out.println("start : " + sdate_UTC);
//		System.out.println("end : " + edate_UTC);
//		
//		String sensor_id = "5d64e6fb2a41be3ac416bff2";
//		String format_level = "day";
//		
//		
//		/*** When ***/
//		service.getMarginOfUptime(sensor_id, sdate_UTC, edate_UTC, format_level);
//		
//		/*** Then ***/
//		
//	}
//	
//	@Test
//	public void getEventListPageNation_test() throws Exception {
//		/*** Given ***/
//		param.put("TURBINE_ID", "TEST191104");
//		param.put("PAGE", 1);
//		param.put("PAGE_SIZE", 5);
//		
//		/*** When ***/
//		Map event_list_pagenation = service.getEventListPageNation(param);
//		
//		System.out.println("PAGE : " + event_list_pagenation.get("PAGE"));
//		System.out.println("PAGE_SIZE : " + event_list_pagenation.get("PAGE_SIZE"));
//		System.out.println("EVENT_LIST : " + event_list_pagenation.get("EVENT_LIST"));
//		System.out.println("EVENT_CNT : " + event_list_pagenation.get("EVENT_CNT"));
//		
//		List<Map> event_list = (List<Map>) event_list_pagenation.get("EVENT_LIST");
//		
//		/*** Then ***/
//		assertEquals(7, event_list.size());
//		
//	}
//	
//	@Test
//	public void getCodeOfConduct_test() throws Exception {
//		/*** Given ***/
//		param.put("WT_ALARM_ID", "20191004170508399");
//		
//		
//		/*** When ***/
//		Map alarm_info = service.getCodeOfConduct(param);
//
//		System.out.println(alarm_info.entrySet());
//		
//		
//		/*** Then ***/
//		//assertEquals(7, event_list.size());
//		
//	}
//	
//	
//
//}
