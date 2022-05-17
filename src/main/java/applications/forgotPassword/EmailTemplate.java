package applications.forgotPassword;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * @author khanhtx created on 06/04/2018
 */
public class EmailTemplate {
	
	protected static final Logger logger = LogManager.getLogger(EmailTemplate.class);
	private static final String EMAIL_TEMPLATE_DIR = "/MailTemplates/";
	private static final String REPLACE_START = "\\{\\{";
	private static final String REPLACE_END = "\\}\\}";
	
	public static class ResouceName {
		public static final String RESET_PASSWORD = "reset-password.html";
		public static final String REGISTER_CONFIRM = "register-confirm.html";
		//other
	}

	public static String loadTemplate(String resouceName) throws Exception {
		try {
			Resource resource = new ClassPathResource(EMAIL_TEMPLATE_DIR + resouceName);
			InputStream inputStream = resource.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
			return br.lines().collect(Collectors.joining(System.lineSeparator()));
		} catch (Exception e) {
			logger.error("Could not read template with resouce name = " + resouceName);
		}
		return "";
	}
	
	public static String generateContent(String resouceName, Map<String, String> replaceMap) throws Exception {
		try {
			String template = EmailTemplate.loadTemplate(resouceName);
			if(replaceMap == null) return template;
			for(Entry<String, String> entry : replaceMap.entrySet()) {
				template = template.replaceAll(REPLACE_START+entry.getKey()+REPLACE_END, entry.getValue());
			}
			return template;
		} catch (Exception e) {
			logger.error("Error when generate email content with template " + resouceName);
		}
		return "";
	}

}
