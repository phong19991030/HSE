//package module.cms;
//
//import static org.junit.Assert.assertEquals;
//
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
//
//public class Cms_0202DAOImplTest extends LogicTestConfig{
//	
//	private static final Logger logger = LoggerFactory.getLogger(Cms_0202DAOImplTest.class);
//	
//	Map param;
//	
//	@Resource(name="Cms_0202DAOImpl")
//	private Old_0202DAOImpl dao;
//	
//	
//	@Before
//	public void setup() {
//		param = new HashMap();
//	}
//	
//	
//	@Test
//	public void getEventList_test() throws Exception {
//		/*** Given ***/
//		param.put("TURBINE_ID", "TEST191104");
//		param.put("PAGE", 1);
//		param.put("PAGE_SIZE", 10); 
//		
//		/*** When ***/
//		List<Map> event_List = dao.getEventList(param);
//		
//		for(Map err : event_List) {
//			System.out.println(err.entrySet());
//		}
//		
//		/*** Then ***/
//		assertEquals(12, event_List.size());
//	}
//	
//	@Test
//	public void getEventCnt_test() throws Exception {
//		/*** Given ***/
//		param.put("TURBINE_ID", "TEST191104");
//		
//		/*** When ***/
//		Map eventCnt = dao.getEventCnt(param);
//		
//		System.out.println(eventCnt.get("CNT"));
//		
//		
//		/*** Then ***/
//		assertEquals("7", eventCnt.get("CNT").toString());
//	}
//	
//	@Test
//	public void getgetTurbineInfo_test() throws Exception {
//		/*** Given ***/
//		param.put("TURBINE_ID", "TEST191104");
//		
//		/*** When ***/
//		Map turbine_info = dao.getTurbineInfo(param);
//		
//		
//		
//		/*** Then ***/
//		assertEquals("turbine191104", turbine_info.get("GERATOR_NM").toString());
//	}
//	
//	@Test
//	public void getAlarmInfo_test() throws Exception {
//		/*** Given ***/
//		param.put("WT_ALARM_ID", "20191004170508399");
//		
//		/*** When ***/
//		Map alarm_info = dao.getAlarmInfo(param);
//		
//		System.out.println(alarm_info.entrySet());
//		
//		
//		/*** Then ***/
//		assertEquals("188", alarm_info.get("ALARM_SUB_CD").toString());
//	}
//	
//	@Test
//	public void getAction_test() throws Exception {
//		/*** Given ***/
//		param.put("WT_ALARM_ID", "20191004170508399");
//		
//		/*** When ***/
//		List<Map> action_list = dao.getAction(param);
//		
//		System.out.println("============== Action ==============");
//		for(Map action : action_list) {
//			System.out.println(action.entrySet());
//		}
//		
//		/*** Then ***/
//		assertEquals(3, action_list.size());
//	}
//	
//	@Test
//	public void getParts_test() throws Exception {
//		/*** Given ***/
//		param.put("WT_ALARM_ID", "20191004170508399");
//		
//		/*** When ***/
//		List<Map> parts_list = dao.getParts(param);
//		
//		System.out.println("============== Parts ==============");
//		for(Map parts : parts_list) {
//			System.out.println(parts.entrySet());
//		}
//		
//		/*** Then ***/
//		assertEquals(3, parts_list.size());
//	}
//	
//	@Test
//	public void getTool_test() throws Exception {
//		/*** Given ***/
//		param.put("WT_ALARM_ID", "20191004170508399");
//		
//		/*** When ***/
//		List<Map> tool_list = dao.getTool(param);
//		
//		System.out.println("============== Parts ==============");
//		for(Map tool : tool_list) {
//			System.out.println(tool.entrySet());
//		}
//		
//		/*** Then ***/
//		assertEquals(3, tool_list.size());
//	}
//	
//	@Test
//	public void getPPE_test() throws Exception {
//		/*** Given ***/
//		param.put("WT_ALARM_ID", "20191004170508399");
//		
//		/*** When ***/
//		List<Map> ppe_list = dao.getPPE(param);
//		
//		System.out.println("============== Parts ==============");
//		for(Map ppe : ppe_list) {
//			System.out.println(ppe.entrySet());
//		}
//		
//		/*** Then ***/
//		assertEquals(4, ppe_list.size());
//	}
//		
//}
