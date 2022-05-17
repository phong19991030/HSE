//package applications.mail;
//
//import java.io.File;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.context.annotation.PropertySources;
//import org.springframework.stereotype.Component;
//
//import applications.util.ConstantsValue;
//
//@Component
//@PropertySources({
//	@PropertySource("classpath:mailconfig.properties")
//})
//public class MailConfiguration {
//
//	@Value("${mail.auth.username}")
//	public String userName;
//	
//	@Value("${mail.auth.password}")
//	public String password;
//	
//	@Value("${mail.auth.displayName}")
//	public String displayName;
//	
//	@Value("${mail.system.email}")
//	public String mailSystem;
//	
//	@Value("${mail.smtp.host}")
//	public String smtpHost;
//	
//	@Value("${mail.smtp.port}")
//	public String smtpPort;
//	
//	@Value("${mail.imap.host}")
//	public String imapHost;
//	
//	@Value("${mail.imap.port}")
//	public String imapPort;
//	
//	@Value("${mail.auth.protocol.tls}")
//	public String isSupprotTLS;
//	
//	@Value("${mail.auth.protocol.ssl}")
//	public String isSupportSSL;
//	
//	@Value("${mail.TrustSSL}")
//	public String isTrustSSL;
//	
//	@Value("${mail.ssl.trustStore}")
//	public String trueStoreName;
//	
//	@Value("${mail.ssl.trustStorePassword}")
//	public String trueStorePassword;
//	
//	@Value("${mail.ssl.trustStoreType}")
//	public String trustStoreType;
//	
//	@Value("${mail.file.attachment.maxSize}")
//	public String fileAttachMaxSize;
//	
//	@Value("${mail.file.attachment.baseUploadDir}")
//	public String uploadDir;
//	
//	@Value("${mail.IMAPConnectionPoolSize}")
//	public String imapConnectionPoolSize;
//	
//	@Value("${mail.IMAPConnectionPoolTimeoutMilliseconds}")
//	public String imapConnectionPoolTimeoutMilliseconds;
//	
//	public MailConfiguration() {
//		System.out.println("init MailConfiguration");
//	}
//
//	public boolean getIsSupprotTLS() {
//		return Boolean.parseBoolean(isSupprotTLS);
//	}
//
//	public boolean getIsSupportSSL() {
//		return Boolean.parseBoolean(isSupportSSL);
//	}
//
//	public boolean getIsTrustSSL() {
//		return Boolean.parseBoolean(isTrustSSL);
//	}
//
//	public int getImapConnectionPoolSize() {
//		return Integer.valueOf(imapConnectionPoolSize);
//	}
//	
//
//	public int getImapConnectionPoolTimeoutMilliseconds() {
//		return Integer.valueOf(imapConnectionPoolTimeoutMilliseconds);
//	}
//
//	public int getImapPort() {
//		return Integer.valueOf(imapPort);
//	}
//
//	public int getSmtpPort() {
//		return Integer.valueOf(smtpPort);
//	}
//
//	public  String getTrustStorePath() {
//		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
//		File file = new File(classLoader.getResource(ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME).getFile());
//		
//		return (file.getParentFile().getAbsolutePath() + File.separator + "keystore" + File.separator + "mailserver" + File.separator + trueStoreName);
//	}
//	
//}
