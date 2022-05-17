//package module.cms;
//
//import java.util.Calendar;
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
//public class UtilTest extends LogicTestConfig{
//	
//	private static final Logger logger = LoggerFactory.getLogger(UtilTest.class);
//	
//	Map param;
//	
//	
//	@Resource(name="Cms_010001DAOImpl")
//	private Cms_010001DAOImpl dao;
//	
//	private DateConverter converter; 
//	
//	
//	@Before
//	public void setup() {
//		param = new HashMap();
//		converter = new module.util.DateConverter();
//	}
//	
//	
//	@Test
//	public void getComponentClassList_test() {
//		/*** Given ***/
//		Map createDBSearchDateUTC = converter.createDBSearchDateUTC("Asia/Seoul");
//		
//		Calendar s = (Calendar) createDBSearchDateUTC.get("START_TIME");
//		Calendar e = (Calendar) createDBSearchDateUTC.get("END_TIME");
//		
//		
//		System.out.println(s.getTime());
//		System.out.println(e.getTime());
//		
////		System.out.println(ZoneId.systemDefault());
////		
////		TimeZone tt = TimeZone.getDefault();
////		System.out.println(tt);
////		
////		Calendar s = Calendar.getInstance();
////		Calendar e = Calendar.getInstance();
////		
////		System.out.println(s.getTime());
////		System.out.println(e.getTime());
////		
////		// TODO: 매달 1일, 매년 1월 1일의 경우 Date = 0 으로 setting시 자동 계산 
////		
////		// 정시 00:00:00 일 경우 
////		if(s.get(Calendar.HOUR_OF_DAY) == 0) {
////			s.set(Calendar.DATE, s.get(Calendar.DATE)-1);
////		}
////		
////		s.set(Calendar.HOUR_OF_DAY, 0);
////		s.set(Calendar.MINUTE, 0);
////		s.set(Calendar.SECOND, 0);
////		s.set(Calendar.MILLISECOND, 0);
////		
////		e.set(Calendar.MINUTE, 0);
////		e.set(Calendar.SECOND, 0);
////		e.set(Calendar.MILLISECOND, 0);
////		
////		System.out.println(s.getTime());
////		System.out.println(e.getTime());
////		
////		// Local -> UTC 변환
////		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
////		s.setTimeZone(TimeZone.getTimeZone("UTC"));
////		e.setTimeZone(TimeZone.getTimeZone("UTC"));
////		
////		System.out.println(s.getTime());
////		System.out.println(e.getTime());
//		
//		
//		/*** When ***/
//		
//		/*** Then ***/
//	}
//	
//	@Test
//	public void year_search_test() throws Exception {
//		/*** Given ***/
//		
//		Map date = converter.createYearSearchDateUTC("Asia/Seoul");
//		
//		
//	
//		
//		/*** When ***/
//		
//		
//		/*** Then ***/
//	}
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//}
