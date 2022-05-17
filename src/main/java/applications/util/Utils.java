package applications.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.math.BigInteger;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.Scanner;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import module.model.RememberLoginAuth;
import net.sf.json.JSONObject;

/**
 * Utils
 *
 * @Description :
 * @Create : Mar 27, 2019
 * @Author : HungDM
 * @Status : COMPLETE
 */
public class Utils {
	
	private static final Logger logger = Logger.getLogger(Utils.class);
	
	public static final int REMEMBER_ME_AGE = 604800;  // 7 days
	
	
	public static Properties commonProps;
	static {
		commonProps = new Properties();
		InputStream inputStream = null;
		try {
			inputStream = Thread.currentThread().getContextClassLoader()
					.getResourceAsStream(ConstantsValue.COMMON_PROPS_NAME);
			commonProps.load(inputStream);
		} catch (IOException e) {
			logger.error("Can't load properties file!\nDetail: " + e);
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					logger.error("Can't close input stream!\nDetail: " + e);
				}
			}
		}
	}
	
	/**
	 * isNullOrEmpty
	 *
	 * @Description : check a string is null or empty
	 * @Output : boolean
	 * @Create : Mar 27, 2019
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static boolean isNullOrEmpty(String s) {
		return s == null || s.isEmpty();
	}

	public static String getProperty(String key) {
		if (commonProps == null 
				|| isNullOrEmpty(key) 
				|| !commonProps.containsKey(key))
			return null;

		return commonProps.getProperty(key);
	}
	
	/* 디렉토리 존재 여부 체크 */
	public static boolean isDirExist(String path) {
		File dir = new File(path);
		return dir.exists() && dir.isDirectory();
	}
	/* 디렉토리 생성 */
	public static boolean makeDir(String path) {
		File dir = new File(path);
		boolean result = true;
		if (!dir.exists()) {
			dir.setExecutable(true);
			dir.setReadable(true);
			dir.setWritable(true);
			result = dir.mkdirs();
		}
		
		return result;
	}
	
	public static String getStringSizeLengthFile(long size) {

	    DecimalFormat df = new DecimalFormat("0.00");
	    float sizeKb = 1024.0f;
	    float sizeMb = sizeKb * sizeKb;
	    float sizeGb = sizeMb * sizeKb;
	    float sizeTerra = sizeGb * sizeKb;

	    if (size < sizeMb)
	        return df.format(size / sizeKb)+ " KB";
	    else if (size < sizeGb)
	        return df.format(size / sizeMb) + " MB";
	    else if (size < sizeTerra)
	        return df.format(size / sizeGb) + " GB";

	    return "";
	}
	
	public static JSONObject getWtgChecklistJson() throws Exception {
		/*
		 * @JK - 보안 취약점 수정 
		 */
		//File jsonFile = new File(Utils.class.getClassLoader().getResource("wtg-checklist.json").getPath());
		String filePath = "";
		if(Utils.class.getClassLoader().getResource("wtg-checklist.json").getPath() != null) {
			filePath = Utils.class.getClassLoader().getResource("wtg-checklist.json").getPath();
		}
		File jsonFile = new File(filePath);
		
		FileReader fileReader = new FileReader(jsonFile);
		BufferedReader br = new BufferedReader(fileReader);
		StringBuilder sb = new StringBuilder();
		String line = null;
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}
		br.close();
		fileReader.close();
		
		JSONObject jsonObj = JSONObject.fromObject(sb.toString());
		return jsonObj != null ? jsonObj : new JSONObject();
	}
	
	public static List<File> listFiles(String pathDir, FilenameFilter filter) {
		List<File> rs = new ArrayList<File>(0);
		
		if (!isNullOrEmpty(pathDir) && isDirExist(pathDir)) {
			File dir = new File(pathDir);
			rs.addAll(Arrays.asList((filter != null) ? dir.listFiles(filter) : dir.listFiles()));
		}
		
		return rs;
	}
	
	public static String sha1(byte[] convertme) throws NoSuchAlgorithmException{
	    MessageDigest md = MessageDigest.getInstance("SHA-1"); 
	    return byteArray2Hex(md.digest(convertme));
	}

	@SuppressWarnings("resource")
	private static String byteArray2Hex(final byte[] hash) {
	    Formatter formatter = new Formatter();
	    for (byte b : hash) {
	        formatter.format("%02x", b);
	    }
	    return formatter.toString();
	}
	
	public static String encryptRsa(String modulusString, String exponentString, String encryptString) {
		String rs = "";
		try {
			if (!Utils.isNullOrEmpty(modulusString) 
					&& !Utils.isNullOrEmpty(exponentString)
					&& !Utils.isNullOrEmpty(encryptString)) {
				Cipher cipher = Cipher.getInstance("RSA", "SunJCE");
				BigInteger modulus = new BigInteger(modulusString, 16);
				BigInteger exponent = new BigInteger(exponentString, 16);
				
				RSAPublicKeySpec publicSpec = new RSAPublicKeySpec(modulus, exponent);
				KeyFactory keyFactory = KeyFactory.getInstance("RSA");
				PublicKey publicKey = keyFactory.generatePublic(publicSpec);
				cipher.init(Cipher.ENCRYPT_MODE, publicKey);		
				byte[] encryptedBytes = cipher.doFinal(encryptString.getBytes("UTF-8"));
				rs = byteArray2Hex(encryptedBytes);
			}
		} catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchProviderException | NoSuchPaddingException | InvalidKeySpecException | IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}
		
		return rs;	
	}
	
	public static void doRememberMe(Cookie[] cookies, HttpSession session, 
			HttpServletRequest request, HttpServletResponse response, UtilService utilService) throws Exception {
		if (utilService == null) return;
		String selector = "";
	    String rawValidator = "";  
	     
	    for (Cookie aCookie : cookies) {
	        if (aCookie.getName().equals("selector")) {
	            selector = aCookie.getValue();
	        } else if (aCookie.getName().equals("validator")) {
	            rawValidator = aCookie.getValue();
	        }
	    }
	    
	    if (!"".equals(selector) && !"".equals(rawValidator)) {
	        Map<String, Object> rememberData = utilService.rememberMeFindSelector(selector);
	        if (rememberData != null && !rememberData.isEmpty()) {
	        	RememberLoginAuth token = new RememberLoginAuth().fromMap(new HashMap<>(rememberData));
	        	if (token != null && !Utils.isNullOrEmpty(token.getValidator())) {
		            String hashedValidatorDatabase = token.getValidator();
		            String hashedValidatorCookie = DigestUtils.sha256Hex(rawValidator);
		             
		            if (hashedValidatorCookie.equals(hashedValidatorDatabase)) {
		                session = request.getSession();
		                session.setAttribute("SESS_USER", utilService.getUserByUserId(token.getUserId()));
		                 
		                // update new token in database
		                String newSelector = RandomStringUtils.randomAlphanumeric(12);
		                String newRawValidator =  RandomStringUtils.randomAlphanumeric(64);
		                 
		                String newHashedValidator = DigestUtils.sha256Hex(newRawValidator);
		                 
		                utilService.deleteRememberMe(token.toMap());
		                token.setSelector(newSelector);
		                token.setValidator(newHashedValidator);
		                utilService.insertRememberMe(token.toMap());
		                 
		                // update cookie
		                Cookie cookieSelector = new Cookie("selector", newSelector);
		                cookieSelector.setPath("/");
		                cookieSelector.setMaxAge(REMEMBER_ME_AGE);
		                /*
		                 * @JK - 보안 취약점 수정 
		                 */
		                cookieSelector.setSecure(true);
		                
		                Cookie cookieValidator = new Cookie("validator", newRawValidator);
		                cookieValidator.setPath("/");
		                cookieValidator.setMaxAge(REMEMBER_ME_AGE);
		                /*
		                 * @JK - 보안 취약점 수정  
		                 */
		                cookieValidator.setSecure(true);
		                
		                response.addCookie(cookieSelector);
		                response.addCookie(cookieValidator);
		                
		                String modulusString = "null".equals(String.valueOf(session.getAttribute("RSAModulus"))) ? null : session.getAttribute("RSAModulus").toString();
		                String exponentString = "null".equals(String.valueOf(session.getAttribute("RSAExponent"))) ? null : session.getAttribute("RSAExponent").toString();
		                String userId = Utils.encryptRsa(modulusString, exponentString, token.getUserId());
		                request.getRequestDispatcher(String.format("/common/auth/login?USER_ID=%s&USER_PW=&rememberMe=true&selector=%s", userId, newSelector))
		                	.forward(request, response);  // forward to login do some actions put data to session
		            }
		        }
	        } else {  // delete cookies from client
	        	Cookie cookieSelector = new Cookie("selector", "");
                cookieSelector.setMaxAge(0);
                /*
                 * @JK - 보안 취약점 수정 
                 */
                cookieSelector.setSecure(true);
                 
                Cookie cookieValidator = new Cookie("validator", "");
                cookieValidator.setMaxAge(0);
                /*
                 * @JK - 보안 취약점 수정  
                 */
                cookieValidator.setSecure(true);
                
                response.addCookie(cookieSelector);
                response.addCookie(cookieValidator);
	        }
	    }
	}
	
	public static void sendEmailWithoutAttachment(String to, String subject, String content) {
		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        
        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("system.a2m.kr@gmail.com", "a2m@2019");
                    }
                });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("system.a2m.kr@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);
            message.setContent(content, "text/html; charset=utf-8");

            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
	}
	
	public static String executePost(String targetURL, HashMap<String, String> param) {
		URLConnection connection = null;
		InputStream response = null;
		String responseBody = "";
		
		try {
			String url = targetURL;

			String str = "";
			String charset = java.nio.charset.StandardCharsets.UTF_8.name();
			for (String each : param.keySet()) {
				str += (each + "=" + param.get(each) + "&");
			}
			str = str.substring(0, str.length() - 1);

			connection = new URL(url + "?" + str).openConnection();
			connection.setRequestProperty("Accept-Charset", charset);
			response = connection.getInputStream();
			Scanner scanner = new Scanner(response);
			responseBody = scanner.useDelimiter("\\A").next();
//			System.out.println(responseBody);
//			System.out.println(connection + "/n response: "+ responseBody);
			

		} catch (IOException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		} finally {
			if(response != null) {
				try {
					response.close();
				} catch (IOException e) {
					logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
				}
			}
		}
		
		return responseBody;
	}
	
	private static String getPostDataString(HashMap<String, String> params) throws UnsupportedEncodingException {
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for(Map.Entry<String, String> entry : params.entrySet()) {
            if (first)
                first = false;
            else
                result.append("&");

            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
        }

        return result.toString();
    }
	
}
