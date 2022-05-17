package applications.mail.refer;

import java.io.UnsupportedEncodingException;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;


/**
 * Spring의 JavaMailSenderImpl클래스를 이용해서 첨부파일이 가능한 MimeMessage 메일을 보낸다.
 * - setMailSender메서드는 MailNotifier를 스프링에 빈으로 등록할때 지정된다.
 *   즉, smtp서버 정보는 스프링 설정파일에 있고, 본 클래스로 참조된다.
 *
 */
public class MailNotifier {

	private JavaMailSenderImpl  mailSender;
	
	public void setMailSender(JavaMailSenderImpl  mailSender){
		this.mailSender = mailSender;
	}
	
	public void sendEmailTo(DefaultMailMessage mailMsg){
		
//		mailSender.setUsername("crymini");
//		mailSender.setPassword("woals1004");
		MimeMessage message = mailSender.createMimeMessage();
		Boolean isAttach = false;
		if(mailMsg.getFiles() != null && (mailMsg.getFiles()).length > 0) isAttach = true;
		//메일 메세지 생성
		try {
			MimeMessageHelper messageHelper = new MimeMessageHelper(message, isAttach, mailMsg.getCharset());
			messageHelper.setSubject(mailMsg.getSubject());
			messageHelper.setText(mailMsg.getHtmlContent(), true);
			messageHelper.setFrom(new InternetAddress("crymini@naver.com", "MIS서비스"));
			messageHelper.setTo(new InternetAddress(mailMsg.getTo(), mailMsg.getToName(), mailMsg.getCharset()));
			//파일첨부
			if(isAttach){
				String[] files = mailMsg.getFiles();
				for(int i = 0;i < files.length;i++){
					//files[i] ... C:\\a.txt
					DataSource dataSource = new FileDataSource(files[i]);
					messageHelper.addAttachment(MimeUtility.encodeText(files[i], mailMsg.getCharset(), "B"), dataSource);
					
					
					//files[i] ... c:/a.txt
					//FileSystemResource file = new FileSystemResource(new File(files[i]));
					//messageHelper.addAttachment(files[i], file);


				}
			}
		} catch (MessagingException e){
			System.out.println("[Exception]mailSender.createMimeMessage & setting : " + e);
			e.printStackTrace();
			return;
		}catch (UnsupportedEncodingException e){
			System.out.println("[Exception]mailSender.createMimeMessage & setting : " + e);
			e.printStackTrace();
			return;
		}
		//메일 전송
		try {
			mailSender.send(message);
		} catch (MailException e){
			System.out.println("[Exception]mailSender.send : " + e);
		}
	}
}
