package infrastructure.log;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchedulerRemoveOldSession {
	

	@Scheduled(cron="0 0 0 * * *")
	public void demoServiceMethod () {
		try {
			LoggingServiceImpl service = new LoggingServiceImpl();
			service.update_sys_login_log_logout_error();
			System.out.println("delete unused sessions successful");
		} catch (Exception e) {
			System.out.println("delete unused sessions unsuccessful");
			e.printStackTrace();
		}
	}
	
}
