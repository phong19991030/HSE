package infrastructure.util;

import java.awt.image.ImagingOpException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.mail.javamail.MimeMessageHelper;

import applications.util.ConstantsValue;
import applications.util.ExceptionUtil;

public class SendMailUtil {
	
	/**
	 *  실제로 사용 중인 SendMailUtil
	 *  2021.06.07 local server 메일 전송 확인
	 */
	protected static Logger logger = LogManager.getLogger(SendMailUtil.class);
	public static String smtpPort = "";
	public static String smtpHost = "";
	public static String protocolTLS = "";
	public static String protocolSSL = "";
	public static String authUsername = "";
	public static String authPassword = "";
	public static String displayName = "";
	
	// Load Properties File
	static {
		Properties props = new Properties();
		InputStream is = null;
		
		is = Thread.currentThread().getContextClassLoader().getResourceAsStream(ConstantsValue.MAIL_CONFIG_FILE_NAME);
		if(is == null) {
			throw new RuntimeException("Cannot read mailConfig.properties file!");
		}
		try {
			props.load(is);
			smtpHost = props.getProperty("mail.smtp.host"); // smtp.gmail.com
			smtpPort = "587";//props.getProperty("mail.smtp.port"); // 587
			protocolTLS = props.getProperty("mail.auth.protocol.tls"); // false
			protocolSSL = props.getProperty("mail.auth.protocol.ssl"); // false
			authUsername = props.getProperty("mail.auth.username"); // a2mwps@gmail.com
			authPassword = props.getProperty("mail.auth.password"); // a2m1q2w3e4r#@!
			displayName = props.getProperty("mail.auth.displayName"); // Wind Turbine System
		} catch (IOException e) {
			try {
				is.close();
			} catch (IOException e1) {
				logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			}
		}
	}
	
	public static int sendMail(List<String> mailList, String subject, MimeMessageHelper emails, String senderEmail, String company_nm) throws UnsupportedEncodingException {
		if (!isReadyToSend()) {
			return 2;
		}
		try {
			Properties props = new Properties();
			/* @JK - 지우지 마세용!!! */
			// 공통 common
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.auth", "true");
			props.put("mail.transport.protocol", "smtp");
			props.put("mail.debug", "true");
			
			// TLS, STARTTLS 사용 시(port: 587)
			props.put("mail.smtp.port", "465");
			//props.put("mail.auth.protocol.tls", "true"); //default : true
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.starttls.required", "true");
			props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
			//props.put("mail.smtp.ssl.trust", "*");
			props.put("mail.smtp.socketFactory.port", "465");
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.socketFactory.fallback", "false");
			props.put("mail.smtp.ssl.protocols", "TLSv1 TLSv1.1 TLSv1.2");
//			props.put("mail.smtp.ssl.protocols", "SSLv2Hello SSLv3");
//			props.put("mail.smtp.ssl.enable", "true");
			
			
			// SSL 사용 시(port: 465)
//			props.put("mail.smtp.port", "465");
//			props.put("mail.auth.protocol.ssl", "true");
//			props.put("mail.auth.protocol.tls", "false");
//			props.put("mail.smtp.socketFactory.port", "465");
//			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//			props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
//			props.put("mail.smtp.ssl.enable", "true");
			
			Authenticator auth = new Authenticator() {
				// override the getPasswordAuthentication method
				protected PasswordAuthentication getPasswordAuthentication() {
					//return new PasswordAuthentication("a2mwps@gmail.com", "a2m1q2w3e4r#@!");
					return new PasswordAuthentication("a2mwps@gmail.com", "boohpphefozrtxdz");
				}
			};
			Session session = Session.getInstance(props, auth);
			MimeMessage msg = new MimeMessage(session);
			// set message headers
			msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
			msg.addHeader("format", "flowed");
			msg.addHeader("Content-Transfer-Encoding", "8bit");
			msg.setFrom(new InternetAddress(senderEmail, company_nm));
			msg.setSender(new InternetAddress(senderEmail, company_nm)); // @DY 2021.07.20 에 추가
			msg.setReplyTo(InternetAddress.parse(senderEmail, true));
			msg.setSubject(subject, "UTF-8");
			msg.setContent(emails.getMimeMessage().getContent(), "text/html; charset=utf-8");
			msg.setSentDate(new Date());
			
			// 동보전송방식 (다중 사용자에게 보낼 경우 스팸 처리될 가능성이 있지만 속도 빠름)
			Transport trns = session.getTransport("smtp");
			trns.connect();
			for(int i=0; i<mailList.size(); i++) {
				msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mailList.get(i), false));
				trns.sendMessage(msg, InternetAddress.parse(mailList.get(i)));
			}
			// @JK 전송 후에 닫아줘야해요~  
			//trns.close();
			return 0;
		} catch (MessagingException | IOException e ) {
			//logger.info("\n" + e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage() + "\n");
			e.printStackTrace();
			return 1;
		}
	}
	
	// Server Ready Check Function
	public static boolean isReadyToSend() {
		Socket socket = null;
		try {
			socket = new Socket(smtpHost, Integer.valueOf(smtpPort));
			return true;
		} catch (ImagingOpException | NumberFormatException | IOException e) {
			logger.error("MailUtil._isReadyToSend(): Exception occurs when trying to check server ready!\nDetail: " + ExceptionUtil.getStackTraceString(e));
		} finally {
			if (socket != null)
				try {
					socket.close();
				} catch (IOException e) {
					logger.error("MailUtil._isReadyToSend(): Can't close socket!\nDetail: " + ExceptionUtil.getStackTraceString(e));
				}
		}
		
		logger.error("MailUtil._isReadyToSend(): smtp server [" + smtpHost + ":" + smtpPort + "] is not ready!");
		return false;
	}

}
