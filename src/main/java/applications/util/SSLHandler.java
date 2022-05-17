package applications.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import infrastructure.inheritance.BaseController;

/**
 * 
 * SSLHandler
 *
 * @Description :
 * @Create : Nov 28, 2018 
 * @Author : HungDM
 * @Status : COMPLETE
 */
public class SSLHandler {

	private static final String trustStore;
	private static final String trustStorePassword;
	private static final String trustStoreType;
	
	// load properties file
	static {
		Properties props = new Properties();
		InputStream is = null;
		
		try {
			is = Thread.currentThread().getContextClassLoader()
					.getResourceAsStream(ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME);
			if (is == null) {
				throw new RuntimeException("Cannot read " + ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME + " file!");
			}
			
			props.load(is);
			trustStore = props.getProperty("mail.ssl.trustStore");
			trustStorePassword = props.getProperty("mail.ssl.trustStorePassword");
			trustStoreType = props.getProperty("mail.ssl.trustStoreType");
		} catch (IOException e) {
			throw new RuntimeException("Cannot read " + ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME + " file! detail:\r\n" + e);
		} finally {
			try {
				if(is != null) is.close();
			} catch (IOException e) {
				BaseController.exceptionLogging(e);
			}
		}
	}
	
	private static String _getTrustStorePath() {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		/*
		 * @JK - 보안 취약점 수정
		 */
//		File file = new File(classLoader.getResource(ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME).getFile());
//		return (file.getParentFile().getAbsolutePath() + File.separator + "keystore" + File.separator + "mailserver" + File.separator + trustStore);
		String filePath = "";
		if(classLoader.getResource(ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME) != null) {
			filePath = classLoader.getResource(ConstantsValue.TRUSTSTORE_CONFIG_FILE_NAME).getFile();
		}
		File file = new File(filePath);
		String path = "";
		if(file.getParentFile() != null) {
			path = file.getParentFile().getAbsolutePath() + File.separator + "keystore" + File.separator + "mailserver" + File.separator + trustStore;
		}
		return path;
	}
	
	/**
	 * 
	 * setSSL
	 *
	 * @Description : call this method before handing connect to ssl mail server (IMAPS or SMTP)
	 * @Output : void
	 * @Create : Nov 28, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static void setSSL() {
		System.setProperty("javax.net.ssl.trustStore", _getTrustStorePath());
	    System.setProperty("javax.net.ssl.trustStorePassword", trustStorePassword);
	    System.setProperty("javax.net.ssl.trustStoreType", trustStoreType);
	}
	
}
