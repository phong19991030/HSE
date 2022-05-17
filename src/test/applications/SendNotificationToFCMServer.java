//package applications;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//
//import applications.notification.NotificationService;
//import static applications.notification.Constant.*;
//
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = { "classpath*:config/spring/*" })
//@WebAppConfiguration
//public class SendNotificationToFCMServer {
//
//	@Autowired
//	NotificationService notificationService;
//
//	@Test
//	public void testSendTextMessage() {
//		try {
//			notificationService.sendNotificationMessage(false, "admin", "Messsage", "I love you");
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//	@Test
//	public void logout() {
//		try {
//			Map<String, String> logoutInfo = new HashMap<>();
//			logoutInfo.put(LOGOUT, "true");
//			notificationService.sendNotificationMessage(false, "admin", "Messsage", "You are logout", logoutInfo);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//}
