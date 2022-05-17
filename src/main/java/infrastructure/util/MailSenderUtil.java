package infrastructure.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

//import applications.mail.MailConfiguration;
import applications.util.MailUtil;

/**
 * @deprecated
 */
public class MailSenderUtil {
	
	protected static Logger logger = LogManager.getLogger(MailSenderUtil.class);
	
	public static int sendEmail(String toEmail, String subject, String body) {
		try {
			Properties props = new Properties();
			props.put("mail.smtp.host", MailUtil.smtpHost); // SMTP Host
			props.put("mail.smtp.socketFactory.port", MailUtil.smtpPort); // SSL Port
			props.put("mail.smtp.auth", "true"); // Enabling SMTP
			props.put("mail.smtp.starttls.required", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.socketFactory.fallback", "false");
			
			/*
			 * props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			 * //SSL Factory Class props.put("mail.smtp.auth", "true"); //Enabling SMTP
			 * Authentication props.put("mail.smtp.port", "465"); //SMTP Port
			 */
			Authenticator auth = new Authenticator() {
				// override the getPasswordAuthentication method
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(MailUtil.authUsername, MailUtil.authPassword);
				}
			};
			Session session = Session.getDefaultInstance(props, auth);
			MimeMessage msg = new MimeMessage(session);
			// set message headers
			msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
			msg.addHeader("format", "flowed");
			msg.addHeader("Content-Transfer-Encoding", "8bit");

			msg.setFrom(new InternetAddress(MailUtil.authUsername, MailUtil.displayName));

			msg.setReplyTo(InternetAddress.parse(MailUtil.authUsername, false));

			msg.setSubject(subject, "UTF-8");

			msg.setContent(body, "text/html; charset=utf-8");

			msg.setSentDate(new Date());

			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
			Transport.send(msg);

			// System.out.println("EMail Sent Successfully!!");
			return 0;
		} catch (MessagingException | UnsupportedEncodingException e) {
			// e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			return 1;
		}
	}
}