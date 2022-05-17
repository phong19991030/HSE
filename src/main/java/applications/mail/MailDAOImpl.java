package applications.mail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.util.ResourceUtil;
//import module.common.Ecryption.Encrypt;








import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.google.common.base.Strings;

/**
 * 
 * @author kdna2m001
 * @title  팝업용 DAO
 * @contents 
 * - 코드 등 팝업을 통한 선택
 * @version
 *  - 1.0 생성 2013. 01. 15. kdna2m001
 */
@Component("mailDAOImpl")
public class MailDAOImpl extends AbstractDAO {
	private JavaMailSenderImpl  mailSender;
	
	public void setMailSender(JavaMailSenderImpl  mailSender){
		this.mailSender = mailSender;
	}
	
	public MailDAOImpl() {
		super.namespace = "common.mail";
	}
	
	public static Document inlineStyles(String html) throws IOException {
        // Document doc = Jsoup.connect("http://mypage.com/inlineme.php").get();
        Document doc = Jsoup.parse(html);
        Elements nomail = doc.select(".nomail");
        nomail.remove();
        String style = "style";
        Elements els = doc.select(style);// to get all the style elements
        for (Element e : els) {
            String styleRules = e.getAllElements().get(0).data().replaceAll("\n", "").trim(), delims =
                    "{}";
            StringTokenizer st = new StringTokenizer(styleRules, delims);
            while (st.countTokens() > 1) {
                String selector = st.nextToken(), properties = st.nextToken();
                // Process selectors such as "a:hover"
                if (selector.indexOf(":") > 0) {
                    selector = selector.substring(0, selector.indexOf(":"));
                }
                if (Strings.isNullOrEmpty(selector)) {
                    continue;
                }
                Elements selectedElements = doc.select(selector);
                for (Element selElem : selectedElements) {
                    String oldProperties = selElem.attr(style);
                    selElem.attr(
                        style,
                        oldProperties.length() > 0 ? concatenateProperties(oldProperties,
                            properties) : properties);
                }
            }
            e.remove();
        }
         return doc;
    }

    private static String concatenateProperties(String oldProp, String newProp) {
        oldProp = oldProp.trim();
        if (!newProp.endsWith(";")) {
            newProp += ";";
        }
        return newProp + oldProp; // The existing (old) properties should take precedence.
    }
    
    public void MailSendInner(HttpServletRequest request, HttpServletResponse response, Map parameter) throws Exception
    {
    	String mailPath = "mail/mail_html";
//		Map parameter = new HashMap();
//		parameter.put("PUR_ID", purid);
//		Map result = (Map) maildao.object("getPurcherData", parameter);
//		
//		List list = maildao.list("getProductData", parameter);
//		result.put("PDT_LIST", list);
//		Map detail =  myp03ser.getPurPdtLogData(list, parameter);
//		result.put("PDT_DETAIL", detail);
//		
		InternalRenderer internalRenderer = new InternalRenderer();
		Locale locale = new Locale("KOREAN");
//		Map messageMap = ResourceUtil.getMessageMap("system.encrypt");
//		String key = (String) ((Map)messageMap.get("key")).get("MESSAGE");
////		result.put("PUR_ID", Encrypt.Ecryption(Encrypt.get62count(purid),key));
//		Map data = new HashMap();
//		data.put("DATA", result);
//		
		String html = internalRenderer.evalView(request, response, parameter, locale, mailPath);
		Document t = inlineStyles(changeTag(html));
//		Map address = maildao.map("getEmail", parameter);
//		
		MimeMessage message2 = mailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(message2, false, "UTF-8");
		messageHelper.setSubject("사내 공지사항");
		messageHelper.setText(t.html(), true);
		messageHelper.setFrom(new InternetAddress("mailadmin@a2m.co.kr", "전자결재 시스템"));
		

		ExecutorService executor = Executors.newSingleThreadExecutor();
		List<Map> list = (List<Map>) this.list("getUserlist");
		for(Map user : list){
//			message2.addRecipients(Message.RecipientType.TO, InternetAddress.parse("leekj@a2m.co.kr"));
//			message2.addRecipients(Message.RecipientType.TO, InternetAddress.parse("kimjh@a2m.co.kr"));
			message2.addRecipients(Message.RecipientType.TO, InternetAddress.parse(user.get("EMAIL").toString()));
		}
		
		List<Future<MimeMessage>> futures = new ArrayList<Future<MimeMessage>>();
//		for(Map user : list)
//		{
			Callable<MimeMessage> callable = new Callable<MimeMessage>(){
				public MimeMessage call() throws Exception{
//					messageHelper.setTo("leekj@a2m.co.kr");
					mailSender.send(message2);
					return message2;
				}
			};
			executor.submit(callable);
//		}
//		
		executor.shutdown();
//		messageHelper.setTo("leekj@a2m.co.kr");
//		//messageHelper.setTo(address);
//		mailSender.send(message2);
    }
    
    public String changeTag(String cont) {
		if (cont == "" || cont == null) {
			return cont;
		} else {
			return cont.replaceAll("&amp;", "&").replaceAll("&#35;", "#").replaceAll("&lt;", "<")
					.replaceAll("&gt;", ">").replaceAll("&quot;", "'").replaceAll("&#39;", "\\")
					.replaceAll("&#37;", "%").replaceAll("&#40;", "(").replaceAll("&#41;", ")").replaceAll("&#43;", "+")
					.replaceAll("&#47;", "/").replaceAll("&#46;", ".").replaceAll("&#59;", ";");
		}
	}
}

