package applications.util;

import java.awt.image.ImagingOpException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.AuthenticationFailedException;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.codec.binary.Base64;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import applications.util.ConstantsValue.EmailJsonResult;
import applications.util.ConstantsValue.EmailType;
import applications.util.ConstantsValue.MailQueueStatus;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 
 * MailUtil
 *
 * @Description : some utilities for send email
 * @Create : Nov 19, 2018 
 * @Author : HungDM
 * @Status : COMPLETE
 * @deprecated
 */
public class MailUtil {

	private static final Logger _LOGGER = LogManager.getLogger(MailUtil.class);
	
	public static String authUsername;
	public static String authPassword;
	public static String displayName;
	public static String systemEmail;
	public static String smtpHost = "";
	public static String smtpPort = "";
	public static String imapHost = "";
	public static String imapPort = "";
	public static String protocolTLS;
	public static String protocolSSL;
	public static int maxSizeUpload;
	public static String baseUploadDir;
	// replacement keyword
	private static String creatorName;
	private static String currentAcceptor;
	private static String nextAcceptor;
	private static String referenceLink;
	private static String documentName;
	private static String status;
	private static String creatorDept;
	private static String currentAcceptorDept;
	private static String nextAcceptorDept;
	private static String creatorPst;
	private static String currentAcceptorPst;
	private static String nextAcceptorPst;
	// mail template
	private static String noticeAccepted;
	private static String noticeCame;
	private static String noticeReturn;
	private static String noticeReject;
	private static String noticeComplete;
	// subject
	private static String defaultSubject;
	// replacement value
	private static String statusApproved;
	private static String statusCame;
	private static String statusReturn;
	private static String statusReject;
	private static String statusComplete;
	// trust store common name (CN)
	@SuppressWarnings("unused")
	private static String trustStoreCN;
	// max resend count
	private static int maxSendCount;
	
	// load properties file
	static {
		Properties props = new Properties();
		InputStream is = null;
		
		try {
			is = Thread.currentThread().getContextClassLoader()
					.getResourceAsStream(ConstantsValue.MAIL_CONFIG_FILE_NAME);
			if (is == null) {
				throw new RuntimeException("Cannot read mailconfig.properties file!");
			}
			
			props.load(is);
			authUsername = props.getProperty("mail.auth.username");
 			authPassword = props.getProperty("mail.auth.password");
			displayName = props.getProperty("mail.auth.displayName");
			systemEmail = props.getProperty("mail.system.email");
			smtpHost = props.getProperty("mail.smtp.host");
			smtpPort = props.getProperty("mail.smtp.port");
			imapHost = props.getProperty("mail.imap.host");
			imapPort = props.getProperty("mail.imap.port");
			protocolTLS = props.getProperty("mail.auth.protocol.tls");
			protocolSSL = props.getProperty("mail.auth.protocol.ssl");
			
			String size = props.getProperty("mail.file.attachment.maxSize");
			size = (size != null && !size.isEmpty()) ? size.replace("m", "") : "0";
			maxSizeUpload = Integer.valueOf(size);
			baseUploadDir = props.getProperty("mail.file.attachment.baseUploadDir");
			
			// replacement keywords
			creatorName = props.getProperty("mail.replacement.keyword.creatorName");
			currentAcceptor = props.getProperty("mail.replacement.keyword.currentAcceptor");
			nextAcceptor = props.getProperty("mail.replacement.keyword.nextAcceptor");
			referenceLink = props.getProperty("mail.replacement.keyword.referenceLink");
			documentName = props.getProperty("mail.replacement.keyword.documentName");
			status = props.getProperty("mail.replacement.keyword.status");
			creatorDept = props.getProperty("mail.replacement.keyword.creatorDept");
			currentAcceptorDept = props.getProperty("mail.replacement.keyword.currentAcceptorDept");
			nextAcceptorDept = props.getProperty("mail.replacement.keyword.nextAcceptorDept");
			creatorPst = props.getProperty("mail.replacement.keyword.creatorPst");
			currentAcceptorPst = props.getProperty("mail.replacement.keyword.currentAcceptorPst");
			nextAcceptorPst = props.getProperty("mail.replacement.keyword.nextAcceptorPst");
			// mail template
			noticeAccepted = props.getProperty("mail.template.content.noticeAccepted");
			noticeCame = props.getProperty("mail.template.content.noticeCame");
			noticeReturn = props.getProperty("mail.template.content.noticeReturn");
			noticeReject = props.getProperty("mail.template.content.noticeReject");
			noticeComplete = props.getProperty("mail.template.content.noticeComplete");
			// mail subject
			defaultSubject = props.getProperty("mail.template.defautSubject");
			// replacement value
			statusApproved = props.getProperty("mail.subject.status.approved");
			statusCame = props.getProperty("mail.subject.status.came");
			statusReturn = props.getProperty("mail.subject.status.return");
			statusReject = props.getProperty("mail.subject.status.reject");
			statusComplete = props.getProperty("mail.subject.status.complete");
			// trustStore
			trustStoreCN = props.getProperty("mail.auth.trustStore.commonName");
			// max resend count
//			maxSendCount = Integer.valueOf(props.getProperty("mail.schedule.maxSendCount"));
		} catch (IOException e) {
			throw new RuntimeException("Cannot read mailconfig.properties file! detail:\r\n" + ExceptionUtil.getStackTraceString(e));
		} finally {
			try {
				if(is != null) is.close();
			} catch (IOException e) {
				BaseController.exceptionLogging(e);
			}
		}
	}
	
	/**
	 * Replace content
	 */
	public static String getTemplateMailContent(EmailType emailType, EmailReplacementKeywords erk) {
		String result = "";
		switch (emailType) {
		case NOTICE_ACCEPTED:
			result = noticeAccepted;
			break;
		case NOTICE_CAME:
			result = noticeCame;
			break;
		case NOTICE_RETURN:
			result = noticeReturn;
			break;
		case NOTICE_REJECT:
			result = noticeReject;
			break;
		case NOTICE_COMPLETE:
			result = noticeComplete;
			break;
		}
		
		if (erk.getCreatorName() != null && !erk.getCreatorName().isEmpty())
			result = result.replaceAll(creatorName, erk.getCreatorName());
		
		if (erk.getCurrentAcceptor() != null && !erk.getCurrentAcceptor().isEmpty())
			result = result.replaceAll(currentAcceptor, erk.getCurrentAcceptor());
		
		if (erk.getNextAcceptor() != null && !erk.getNextAcceptor().isEmpty())
			result = result.replaceAll(nextAcceptor, erk.getNextAcceptor());
		
		if (erk.getReferenceLink() != null && !erk.getReferenceLink().isEmpty())
			result = result.replaceAll(referenceLink, erk.getReferenceLink());
		
		if (erk.getDocumentName() != null && !erk.getDocumentName().isEmpty())
			result = result.replaceAll(documentName, erk.getDocumentName());
		
		if (erk.getCreatorDept() != null && !erk.getCreatorDept().isEmpty())
			result = result.replaceAll(creatorDept, erk.getCreatorDept());
		
		if (erk.getCurrentAcceptorDept() != null && !erk.getCurrentAcceptorDept().isEmpty())
			result = result.replaceAll(currentAcceptorDept, erk.getCurrentAcceptorDept());
		
		if (erk.getNextAcceptorDept() != null && !erk.getNextAcceptorDept().isEmpty())
			result = result.replaceAll(nextAcceptorDept, erk.getNextAcceptorDept());
		
		if (erk.getCreatorPst() != null && !erk.getCreatorPst().isEmpty())
			result = result.replaceAll(creatorPst, erk.getCreatorPst());
		
		if (erk.getCurrentAcceptorPst() != null && !erk.getCurrentAcceptorPst().isEmpty())
			result = result.replaceAll(currentAcceptorPst, erk.getCurrentAcceptorPst());
		
		if (erk.getNextAcceptorPst() != null && !erk.getNextAcceptorPst().isEmpty())
			result = result.replaceAll(nextAcceptorPst, erk.getNextAcceptorPst());
		
		return result;
	}
	
	/**
	 * Replace subject
	 */
	public static String getTemplateMailSubject(EmailType emailType, EmailReplacementKeywords erk) {
		String result = defaultSubject;
		String _status = "";
		switch (emailType) {
		case NOTICE_ACCEPTED:
			_status = statusApproved;
			break;
		case NOTICE_CAME:
			_status = statusCame;
			break;
		case NOTICE_RETURN:
			_status = statusReturn;
			break;
		case NOTICE_REJECT:
			_status = statusReject;
			break;
		case NOTICE_COMPLETE:
			_status = statusComplete;
			break;
		}
		
		result = result.replaceAll(status, _status);
		
		if (erk.getDocumentName() != null && !erk.getDocumentName().isEmpty())
			result = result.replaceAll(documentName, erk.getDocumentName());
		
		return result;
	}
	
	/**
	 * Return the max file size can be upload, value is megabytes (MB)
	 */
	public static int getMaxSizeUpload() {
		return maxSizeUpload;
	}
	
	public static String getBaseUploadDir() {
		return baseUploadDir;
	}
	
	public static String getSystemEmail() {
		return systemEmail;
	}
	
	public static int getMaxSendCount() {
		return maxSendCount;
	}
	
	public static boolean validate(MailSender sender) {
		// from
		if (sender.getFrom() == null || sender.getFrom().isEmpty()) {
			_LOGGER.error("MailUtil.send(?): property 'from' on MailSender argument cannot be null!\nSend email failed!");
			return false;
		} else if (!isValidEmailAddress(sender.getFrom())) {
			_LOGGER.error("MailUtil.send(?): property 'from' [" + sender.getFrom() + "] on MailSender argument not is valid email address!\nSend email failed!");
			return false;
		}
		
		// recipientList
		if (sender.getRecipientList() == null || sender.getRecipientList().isEmpty()) {
			_LOGGER.error("MailUtil.send(?): property 'recipientList' on MailSender argument cannot be null!\nSend email failed!");
			return false;
		} else {
			for (Iterator<String> it = sender.getRecipientList().iterator(); it.hasNext(); ) {
				String emailRecipient = it.next();
				
				if (emailRecipient == null || emailRecipient.isEmpty()) {
					it.remove();
					continue;
				}
				
				if (!isValidEmailAddress(emailRecipient)) {
					_LOGGER.error("MailUtil.send(?): property 'recipientList' on MailSender argument have email [" + emailRecipient + "] is not valid email!\nSend email failed!");
					it.remove();
				}
			}
			
			if (sender.getRecipientList() == null || sender.getRecipientList().isEmpty()) {
				_LOGGER.error("MailUtil.send(?): property 'recipientList' on MailSender argument cannot be null!\nSend email failed!");
				return false;
			}
		}
		
		// subject
		if (sender.getSubject() == null || sender.getSubject().isEmpty()) {
			_LOGGER.error("MailUtil.send(?): property 'subject' on MailSender argument cannot be null!\nSend email failed!");
			return false;
		}
		
		// content
		if (sender.getContent() == null || sender.getContent().isEmpty()) {
			_LOGGER.error("MailUtil.send(?): property 'content' argument cannot be null!\nSend email failed!");
			return false;
		}
		
		// fileAttachments
		if (sender.getFileAttachments() != null && !sender.getFileAttachments().isEmpty()) {
			for (Iterator<FileAttachment> it = sender.getFileAttachments().iterator(); it.hasNext(); ) {
				FileAttachment file = it.next();
				String path = file.getPath();
				
				if (path == null || path.isEmpty()) {
					it.remove();
					continue;
				}
				
				if (!isValidFilePath(path)) {
					_LOGGER.error("MailUtil.send(?): property 'fileAttachments' on MailSender argument have path [" + path + "] is not valid file path!\nSend email failed!");
					it.remove();
				}
			}
		}
		
		// cc
		if (sender.getCc() != null && !sender.getCc().isEmpty()) {
			for (Iterator<String> it = sender.getCc().iterator(); it.hasNext(); ) {
				String emailRecipient = it.next();
				
				if (emailRecipient == null || emailRecipient.isEmpty()) {
					it.remove();
					continue;
				}
				
				if (!isValidEmailAddress(emailRecipient)) {
					_LOGGER.error("MailUtil.send(?): property 'cc' on MailSender argument have email [" + emailRecipient + "] is not valid email!\nSend email failed!");
					it.remove();
				}
			}
		}
		
		// bcc
		if (sender.getCc() != null && !sender.getCc().isEmpty()) {
			for (Iterator<String> it = sender.getBcc().iterator(); it.hasNext(); ) {
				String emailRecipient = it.next();
				
				if (emailRecipient == null || emailRecipient.isEmpty()) {
					it.remove();
					continue;
				}
				
				if (!isValidEmailAddress(emailRecipient)) {
					_LOGGER.error("MailUtil.send(?): property 'bcc' on MailSender argument have email [" + emailRecipient + "] is not valid email!\nSend email failed!");
					it.remove();
				}
			}
		}
		
		return true;
	}
	
	/**
	 * 
	 * send
	 * 
	 * @Description : send email
	 * @Output : void
	 * @Create : Nov 19, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static void send(MailSender sender) {
		// check mail server is ready
		if (!isReadyToSend()) {
			return;
		}
		
		if (!validate(sender)) {
			return;
		}
		
		Properties props = new Properties();
		props.put("mail.smtp.host", smtpHost);
		props.put("mail.smtp.port", smtpPort);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.ssl.trust", smtpHost);
		if ("true".equals(protocolTLS) && !"true".equals(protocolSSL)) {
			props.put("mail.smtp.starttls.enable", protocolTLS);
		}
		if ("true".equals(protocolSSL)) {
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		}
		
		Session session = Session.getDefaultInstance(props,
			new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(authUsername, authPassword);
				}
			});
		//Session session = Session.getDefaultInstance(props); 
		
		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(sender.getFrom()));
			msg.addRecipients(Message.RecipientType.TO, InternetAddress.parse(String.join(",", sender.getRecipientList())));
			
			if (sender.getCc() != null && !sender.getCc().isEmpty()) {
				msg.addRecipients(Message.RecipientType.CC, InternetAddress.parse(String.join(",", sender.getCc())));
			}
			if (sender.getBcc() != null && !sender.getBcc().isEmpty()) {
				msg.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(String.join(",", sender.getBcc())));
			}
			
			msg.setSubject(sender.getSubject());
			
			Multipart multipart = new MimeMultipart();
			
			// add content
			BodyPart bodyContent = new MimeBodyPart();
			bodyContent.setContent(sender.getContent(), "text/html; charset=UTF-8");
			multipart.addBodyPart(bodyContent);
			
			// add files attachment
			if (sender.getFileAttachments() != null && !sender.getFileAttachments().isEmpty()) {
				for (FileAttachment file : sender.getFileAttachments()) {
					String path = file.getPath();
					if (path != null && !path.isEmpty()) {
						BodyPart messageBodyPart = new MimeBodyPart();
			            DataSource source = new FileDataSource(path);
			            messageBodyPart.setDataHandler(new DataHandler(source));
			            messageBodyPart.setFileName(file.getName());
			            
			            multipart.addBodyPart(messageBodyPart);
					}
				}
			}
			
			msg.setContent(multipart);
			Transport.send(msg);
			_LOGGER.info("Send email successfully.");
		} catch (MessagingException e) {
			String stackTrace = ExceptionUtil.getStackTraceString(e);
			_LOGGER.error(stackTrace);
		}
	}
	
	/**
	 * 
	 * send
	 * 
	 * @Description : send email
	 * @Output : void
	 * @Create : Nov 19, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static JSONObject send(MailSender sender, String username, String password) {
		JSONObject json = null;
		
		// check mail server is ready
		if (!isReadyToSend()) {
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), EmailJsonResult.STATUS_VALUE_ERROR.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Server mail is not ready!");
			return json;
		}
		
		if (!validate(sender)) {
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), EmailJsonResult.STATUS_VALUE_ERROR.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Some information is incorrect, validation failed!");
			return json;
		}
		
		Properties props = new Properties();
		props.put("mail.smtp.host", smtpHost);
		props.put("mail.smtp.port", smtpPort);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.ssl.trust", smtpHost);
		if ("true".equals(protocolTLS) && !"true".equals(protocolSSL)) {
			props.put("mail.smtp.starttls.enable", protocolTLS);
		}
		if ("true".equals(protocolSSL)) {
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		}
		
		Session session = Session.getDefaultInstance(props,
				new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		//Session session = Session.getDefaultInstance(props); 
		
		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(sender.getFrom()));
			msg.addRecipients(Message.RecipientType.TO, InternetAddress.parse(String.join(",", sender.getRecipientList())));
			
			if (sender.getCc() != null && !sender.getCc().isEmpty()) {
				msg.addRecipients(Message.RecipientType.CC, InternetAddress.parse(String.join(",", sender.getCc())));
			}
			if (sender.getBcc() != null && !sender.getBcc().isEmpty()) {
				msg.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(String.join(",", sender.getBcc())));
			}
			
			msg.setSubject(sender.getSubject());
			
			Multipart multipart = new MimeMultipart();
			
			// add content
			BodyPart bodyContent = new MimeBodyPart();
			bodyContent.setContent(sender.getContent(), "text/html; charset=UTF-8");
			multipart.addBodyPart(bodyContent);
			
			// add files attachment
			if (sender.getFileAttachments() != null && !sender.getFileAttachments().isEmpty()) {
				for (FileAttachment file : sender.getFileAttachments()) {
					String path = file.getPath();
					if (path != null && !path.isEmpty()) {
						BodyPart messageBodyPart = new MimeBodyPart();
			            DataSource source = new FileDataSource(path);
			            messageBodyPart.setDataHandler(new DataHandler(source));
			            messageBodyPart.setFileName(file.getName());
			            
			            multipart.addBodyPart(messageBodyPart);
					}
				}
			}
			
			msg.setContent(multipart);
			Transport.send(msg);
			_LOGGER.info("Send email successfully.");
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), EmailJsonResult.STATUS_VALUE_SUCCESS.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Send email successfully.");
			return json;
		} catch (AuthenticationFailedException e) {
			String stackTrace = ExceptionUtil.getStackTraceString(e);
			_LOGGER.error(stackTrace);
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), EmailJsonResult.STATUS_VALUE_ERROR.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Password is incorrect!");
			return json;
		} catch (MessagingException e) {
			String stackTrace = ExceptionUtil.getStackTraceString(e);
			_LOGGER.error(stackTrace);
			
			String caused = "";
			if (stackTrace.indexOf("Caused by:") > -1) {
				int index = stackTrace.indexOf("Caused by:");
				caused = stackTrace.substring(index, stackTrace.indexOf("\n", index));
			}
			
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), EmailJsonResult.STATUS_VALUE_ERROR.getValue());
			if (stackTrace.contains("com.sun.mail.smtp.SMTPAddressFailedException: 550 5.1.1 Unknown user")) {
				json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Recipients list has email does not exist, please check again and enter existed email!\n" + caused);
				return json;
			}
			
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Exceptions occurs when trying to send email!\n" + caused);
			return json;
		}
	}
	
	public static void systemSend(MailSender sender, 
			EmailType emailType, EmailReplacementKeywords erk) {
		if (sender == null) {
			_LOGGER.error("MailUtil.systemSend(?, ?, ?): sender argument is null!\nSend email failed!");
			return;
		}
		
		if (emailType == null) {
			_LOGGER.error("MailUtil.systemSend(?, ?, ?): emailType argument is null!\nSend email failed!");
			return;
		}
		
		if (erk == null) {
			_LOGGER.error("MailUtil.systemSend(?, ?, ?): erk argument is null!\nSend email failed!");
			return;
		}
		
		
		sender.setSubject(getTemplateMailSubject(emailType, erk));
		sender.setContent(getTemplateMailContent(emailType, erk));
		sender.setFrom(systemEmail);
		send(sender);
	}
	
	public static JSONObject systemSend(MailSender sender) {
		JSONObject json = null;
		if (sender == null) {
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), MailQueueStatus.ERROR_EXCEPTION.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "sender argument is null!");
			return json;
		}
		
		if (!validate(sender)) {
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), MailQueueStatus.ERROR_EXCEPTION.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Some information is incorrect, validation failed!\nDetail: " + sender.toString());
			return json;
		}
		
		Properties props = new Properties();
		props.put("mail.smtp.host", smtpHost);
		props.put("mail.smtp.port", smtpPort);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.ssl.trust", smtpHost);
		if ("true".equals(protocolTLS) && !"true".equals(protocolSSL)) {
			props.put("mail.smtp.starttls.enable", protocolTLS);
		}
		if ("true".equals(protocolSSL)) {
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		}
		
		Session session = Session.getDefaultInstance(props,
				new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(authUsername, authPassword);
			}
		});
		
		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(sender.getFrom()));
			msg.addRecipients(Message.RecipientType.TO, InternetAddress.parse(String.join(",", sender.getRecipientList())));
			
			if (sender.getCc() != null && !sender.getCc().isEmpty()) {
				msg.addRecipients(Message.RecipientType.CC, InternetAddress.parse(String.join(",", sender.getCc())));
			}
			if (sender.getBcc() != null && !sender.getBcc().isEmpty()) {
				msg.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(String.join(",", sender.getBcc())));
			}
			
			msg.setSubject(sender.getSubject());
			
			Multipart multipart = new MimeMultipart();
			
			// add content
			BodyPart bodyContent = new MimeBodyPart();
			sender.setContent(ParameterUtil.decodeHtml(sender.getContent()));
			bodyContent.setContent(sender.getContent(), "text/html; charset=UTF-8");
			multipart.addBodyPart(bodyContent);
			
			// add files attachment
			if (sender.getFileAttachments() != null && !sender.getFileAttachments().isEmpty()) {
				for (FileAttachment file : sender.getFileAttachments()) {
					String path = file.getPath();
					if (path != null && !path.isEmpty()) {
						BodyPart messageBodyPart = new MimeBodyPart();
			            DataSource source = new FileDataSource(path);
			            messageBodyPart.setDataHandler(new DataHandler(source));
			            messageBodyPart.setFileName(file.getName());
			            
			            multipart.addBodyPart(messageBodyPart);
					}
				}
			}
			
			msg.setContent(multipart);
			Transport.send(msg);
			_LOGGER.info("Send email successfully.");
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), MailQueueStatus.SENT.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Send email successfully.");
			return json;
		} catch (AuthenticationFailedException e) {
			String stackTrace = ExceptionUtil.getStackTraceString(e);
			_LOGGER.error(stackTrace);
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), MailQueueStatus.ERROR_EXCEPTION.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Password is incorrect!");
			return json;
		} catch (MessagingException e) {
			String stackTrace = ExceptionUtil.getStackTraceString(e);
			_LOGGER.error(stackTrace);
			
			json = new JSONObject();
			json.put(EmailJsonResult.STATUS_KEY.getValue(), MailQueueStatus.ERROR_EXCEPTION.getValue());
			json.put(EmailJsonResult.MESSAGE_KEY.getValue(), "Exceptions occurs when trying to send email!\nDetail: " + stackTrace);
			return json;
		}
	}
	
	public static boolean isValidFilePath(String path) {
		File file = new File(path);
		if (!file.exists()) {
			return false;
		}
		
		return true;
	}
	
	public static boolean isValidEmailAddress(String email) {
        String ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(ePattern);
        java.util.regex.Matcher m = p.matcher(email);
        return m.matches();
	}
	
	public static boolean isReadyToSend() {
		Socket socket = null;
		try {
			socket = new Socket(smtpHost, Integer.valueOf(smtpPort));
			return true;
		} catch (ImagingOpException | NumberFormatException | IOException e) {
			_LOGGER.error("MailUtil._isReadyToSend(): Exception occurs when trying to check server ready!\nDetail: " + ExceptionUtil.getStackTraceString(e));
		} finally {
			if (socket != null)
				try {
					socket.close();
				} catch (IOException e) {
					_LOGGER.error("MailUtil._isReadyToSend(): Can't close socket!\nDetail: " + ExceptionUtil.getStackTraceString(e));
				}
		}
		
		_LOGGER.error("MailUtil._isReadyToSend(): smtp server [" + smtpHost + ":" + smtpPort + "] is not ready!");
		return false;
	}
	
	/**
	 * 
	 * MailSender
	 * 
	 * @param from email sender, required
	 * @param recipientList list email recipient, required
	 * @param subject subject email
	 * @param content text content or HTML content, required
	 * @param fileAttachments list of path files attachment, allow null
	 * @param cc list email CC
	 * @param bcc list email BCC
	 *
	 * @Description : store properties for using send() method to send email
	 * @Create : Nov 20, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static class MailSender {
		
		private String from;
		private List<String> recipientList;
		private String subject;
		private String content;
		private List<FileAttachment> fileAttachments;
		private List<String> cc;
		private List<String> bcc;
		
		public MailSender() {
		}

		public MailSender(String from, List<String> recipientList,
				String subject, String content, List<FileAttachment> fileAttachments,
				List<String> cc, List<String> bcc) {
			super();
			this.from = from;
			this.recipientList = recipientList;
			this.subject = subject;
			this.content = content;
			this.fileAttachments = fileAttachments;
			this.cc = cc;
			this.bcc = bcc;
		}

		public String getFrom() {
			return from;
		}

		public void setFrom(String from) {
			this.from = from;
		}

		public List<String> getRecipientList() {
			return recipientList;
		}

		public void setRecipientList(List<String> recipientList) {
			this.recipientList = recipientList;
		}

		public String getSubject() {
			return subject;
		}

		public void setSubject(String subject) {
			this.subject = subject;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public List<FileAttachment> getFileAttachments() {
			return fileAttachments;
		}

		public void setFileAttachments(List<FileAttachment> fileAttachments) {
			this.fileAttachments = fileAttachments;
		}

		public List<String> getCc() {
			return cc;
		}

		public void setCc(List<String> cc) {
			this.cc = cc;
		}

		public List<String> getBcc() {
			return bcc;
		}

		public void setBcc(List<String> bcc) {
			this.bcc = bcc;
		}

		@Override
		public String toString() {
			return "MailSender [from=" + from + ", recipientList="
					+ recipientList + ", subject=" + subject + ", content="
					+ content + ", fileAttachments=" + fileAttachments
					+ ", cc=" + cc + ", bcc=" + bcc + "]";
		}

	}
	
	/**
	 * 
	 * genJsonMailContent
	 *
	 * @Description :
	 * @Output : String
	 * @Create : Nov 28, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static String genJsonMailContent(MailSender sender) {
		JSONObject result = new JSONObject();
		if (sender == null) {
			return null;
		} else {
			JSONObject jsonMail = new JSONObject();
			jsonMail.put("from", sender.getFrom());
			jsonMail.put("recipientList", sender.getRecipientList());
			jsonMail.put("cc", sender.getCc());
			jsonMail.put("bcc", sender.getBcc());
			jsonMail.put("subject", sender.getSubject());
			
			// add files attachment
			List<Object[]> filesAttachment = new ArrayList<Object[]>(0);
			if (sender.getFileAttachments() != null && !sender.getFileAttachments().isEmpty()) {
				for (FileAttachment file : sender.getFileAttachments()) {
					String path = file.getPath();
					if (path != null && !path.isEmpty()) {
						File _file = new File(path);
						if (_file.exists()) {
							try {
								Object[] obj = new Object[2];
								obj[0] = file.getName();
								byte[] fileContent = Files.readAllBytes(_file.toPath());
								obj[1] = Base64.encodeBase64String(fileContent);
								
								filesAttachment.add(obj);
							} catch (IOException e) {
								_LOGGER.error(e);
							}
						}
					}
				}
			}
			jsonMail.put("attachments", filesAttachment);
			jsonMail.put("content", sender.getContent());
			
			result.put("mail", jsonMail);
			result.put("status", "success");
			result.put("log", "");
		}
		
		return result.toString();
	}
	
	/**
	 * 
	 * parseJsonStringToMailSender
	 *
	 * @Description :
	 * @Output : MailSender
	 * @Create : Nov 28, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static MailSender parseJsonStringToMailSender(String jsonString) {
		if (jsonString != null && !jsonString.isEmpty()) {
			JSONObject json = JSONObject.fromObject(jsonString);
			
			if (json != null) {
				if (json.containsKey("mail")) {
					JSONObject mail = json.getJSONObject("mail");
					if (mail != null) {
						MailSender sender = new MailSender();
						if (mail.containsKey("from")) {
							sender.setFrom(mail.getString("from"));
						}
						if (mail.containsKey("recipientList")) {
							JSONArray recipientList = JSONArray.fromObject(mail.get("recipientList"));
							if (recipientList != null && !recipientList.isEmpty()) {
								Object[] list = recipientList.toArray();
								List<String> _list = null;
								for (Object obj : list) {
									if (obj != null) {
										if (_list == null) {
											_list = new ArrayList<>();
										}
										_list.add(String.valueOf(obj));
									}
								}
								
								sender.setRecipientList(_list);
							}
						}
						if (mail.containsKey("cc")) {
							JSONArray cc = JSONArray.fromObject(mail.get("cc"));
							if (cc != null && !cc.isEmpty()) {
								Object[] list = cc.toArray(new String[0]);
								List<String> _list = null;
								for (Object obj : list) {
									if (obj != null) {
										if (_list == null) {
											_list = new ArrayList<>();
										}
										_list.add(String.valueOf(obj));
									}
								}
								sender.setCc(_list);
							}
						}
						if (mail.containsKey("bcc")) {
							JSONArray bcc = JSONArray.fromObject(mail.get("bcc"));
							if (bcc != null && !bcc.isEmpty()) {
								Object[] list = bcc.toArray(new String[0]);
								List<String> _list = null;
								for (Object obj : list) {
									if (obj != null) {
										if (_list == null) {
											_list = new ArrayList<>();
										}
										_list.add(String.valueOf(obj));
									}
								}
								sender.setBcc(_list);
							}
						}
						if (mail.containsKey("subject")) {
							sender.setSubject(mail.getString("subject"));
						}
						if (mail.containsKey("attachments")) {
							JSONArray attachments = JSONArray.fromObject(mail.get("attachments"));
							if (attachments != null) {
								Object[] att = attachments.toArray();
								List<FileAttachment> filesAttachment = new ArrayList<>();
								for (Object obj : att) {
									JSONArray _obj = JSONArray.fromObject(obj);
									Object[] _obj2 = _obj.toArray();
									String fileName = String.valueOf(_obj2[0]);
									String base64 = String.valueOf(_obj2[1]);
									
									if ((!"null".equals(fileName) && !fileName.isEmpty())
											&& (!"null".equals(base64) && !base64.isEmpty())) {
										String prefix = fileName.substring(0, fileName.lastIndexOf("."));
										String suffix = fileName.substring(fileName.lastIndexOf("."), fileName.length());
										FileOutputStream fos = null;
										try {
											File temp = File.createTempFile(prefix, suffix);
											//FileOutputStream fos = new FileOutputStream(temp);
											fos = new FileOutputStream(temp);
											fos.write(Base64.decodeBase64(base64));
											fos.close();
											
											FileAttachment fa = new FileAttachment();
											fa.setName(fileName);
											fa.setPath(temp.getAbsolutePath());
											filesAttachment.add(fa);
										} catch (IOException e) {
											_LOGGER.error(e);
										} finally {
											try {
												if(fos != null)fos.close();
											} catch (IOException e) {
												BaseController.exceptionLogging(e);
											}
										}
									}
								}
								sender.setFileAttachments(filesAttachment);
							}
						}
						
						if (mail.containsKey("content")) {
							sender.setContent(mail.getString("content"));
						}
						
						return sender;
					}
				}
			}
		}
		
		return null;
	}
	
	public static class EmailReplacementKeywords {
		
		private String creatorName;
		private String currentAcceptor;
		private String nextAcceptor;
		private String referenceLink;
		private String documentName;
		private String creatorDept;
		private String currentAcceptorDept;
		private String nextAcceptorDept;
		private String creatorPst;
		private String currentAcceptorPst;
		private String nextAcceptorPst;
		
		public EmailReplacementKeywords() {
		}

		public EmailReplacementKeywords(String creatorName, String currentAcceptor, String nextAcceptor,
				String referenceLink, String documentName, String creatorDept, String currentAcceptorDept,
				String nextAcceptorDept, String creatorPst, String currentAcceptorPst, String nextAcceptorPst) {
			super();
			this.creatorName = creatorName;
			this.currentAcceptor = currentAcceptor;
			this.nextAcceptor = nextAcceptor;
			this.referenceLink = referenceLink;
			this.documentName = documentName;
			this.creatorDept = creatorDept;
			this.currentAcceptorDept = currentAcceptorDept;
			this.nextAcceptorDept = nextAcceptorDept;
			this.creatorPst = creatorPst;
			this.currentAcceptorPst = currentAcceptorPst;
			this.nextAcceptorPst = nextAcceptorPst;
		}

		public String getCreatorName() {
			return creatorName;
		}

		public void setCreatorName(String creatorName) {
			this.creatorName = creatorName;
		}

		public String getCurrentAcceptor() {
			return currentAcceptor;
		}

		public void setCurrentAcceptor(String currentAcceptor) {
			this.currentAcceptor = currentAcceptor;
		}

		public String getNextAcceptor() {
			return nextAcceptor;
		}

		public void setNextAcceptor(String nextAcceptor) {
			this.nextAcceptor = nextAcceptor;
		}

		public String getReferenceLink() {
			return referenceLink;
		}

		public void setReferenceLink(String referenceLink) {
			this.referenceLink = referenceLink;
		}

		public String getDocumentName() {
			return documentName;
		}

		public void setDocumentName(String documentName) {
			this.documentName = documentName;
		}

		public String getCreatorDept() {
			return creatorDept;
		}

		public void setCreatorDept(String creatorDept) {
			this.creatorDept = creatorDept;
		}

		public String getCurrentAcceptorDept() {
			return currentAcceptorDept;
		}

		public void setCurrentAcceptorDept(String currentAcceptorDept) {
			this.currentAcceptorDept = currentAcceptorDept;
		}

		public String getNextAcceptorDept() {
			return nextAcceptorDept;
		}

		public void setNextAcceptorDept(String nextAcceptorDept) {
			this.nextAcceptorDept = nextAcceptorDept;
		}

		public String getCreatorPst() {
			return creatorPst;
		}

		public void setCreatorPst(String creatorPst) {
			this.creatorPst = creatorPst;
		}

		public String getCurrentAcceptorPst() {
			return currentAcceptorPst;
		}

		public void setCurrentAcceptorPst(String currentAcceptorPst) {
			this.currentAcceptorPst = currentAcceptorPst;
		}

		public String getNextAcceptorPst() {
			return nextAcceptorPst;
		}

		public void setNextAcceptorPst(String nextAcceptorPst) {
			this.nextAcceptorPst = nextAcceptorPst;
		}
		
		@Override
		public String toString() {
			return "EmailReplacementKeywords [creatorName=" + creatorName
					+ ", currentAcceptor=" + currentAcceptor
					+ ", nextAcceptor=" + nextAcceptor + ", referenceLink="
					+ referenceLink + ", documentName=" + documentName + "]";
		}
		
	}
	
	public static class FileAttachment {
		
		private String name;
		private String path;
		
		public FileAttachment() {
		}

		public FileAttachment(String name, String path) {
			super();
			this.name = name;
			this.path = path;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getPath() {
			return path;
		}

		public void setPath(String path) {
			this.path = path;
		}

		@Override
		public String toString() {
			return "FileAttachment [name=" + name + ", path=" + path + "]";
		}
		
	}
}
