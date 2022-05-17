package infrastructure.util;


import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

public class KryptosUtil {
	
	protected static Logger logger = LogManager.getLogger(KryptosUtil.class);
	
	public static Map  getPublicKey() throws Exception {
		Map map = new HashMap();
		
		KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
		/*
		 * @JK - 보안 취약점 수정
		 * :  RSA 알고리즘은 적어도 2048 비트 이상의 길이를 가진 키와 함께 사용해야 하지만 신청기업의 소스코드에서는 키 길이가 1024로 설정되어 있음
		 */
		generator.initialize(1024);
		//generator.initialize(2048);
		KeyPair keyPair = generator.genKeyPair();
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		PublicKey publicKey = keyPair.getPublic();
		PrivateKey privateKey = keyPair.getPrivate();
//		session.setAttribute("_RSA_WEB_Key_", privateKey);   //세션에 RSA 개인키를 세션에 저장한다.
		RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
		map.put("_RSA_WEB_Key_", privateKey);
		map.put("_RSA_PUB_Key_", publicKey);
		map.put("publicKeyModulus", publicSpec.getModulus().toString(16));
		map.put("publicKeyExponent", publicSpec.getPublicExponent().toString(16));
		
		return map;
	}	
	/**
	 * 기능명 
	 * @작성일    : 2015. 2. 6. 
	 * @작성자      : Administrator
	 * @프로그램설명 :
	 * @진행상태: TO-DO
	 *  Encrypt 가능 하게 코드 작성 , 현재 그냥 카피본
	 */
	public static String encryptRsa(PublicKey publicKey,String message ){
		
		String securedValue = "";
		 try{
//			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
//			RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
//			RSAPublicKey key = (RSAPublicKey) keyFactory.generatePublic(publicSpec);
			RSAPublicKey key = (RSAPublicKey) publicKey;
			 System.out.println(key);
			
			Cipher cipher = Cipher.getInstance("RSA");
		   /**
			* 암호화 된 값은 byte 배열이다.
			* 이를 문자열 폼으로 전송하기 위해 16진 문자열(hex)로 변경한다.
			* 서버측에서도 값을 받을 때 hex 문자열을 받아서 이를 다시 byte 배열로 바꾼 뒤에 복호화 과정을 수행한다.
			*/
			byte[] inputBytes = message.getBytes();
			cipher.init(Cipher.ENCRYPT_MODE,  key);
			byte[] encryptedBytes = cipher.doFinal(inputBytes);
			securedValue = byteArrayToHex(encryptedBytes);
		 }catch(InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException e)
		 {
//			 logger.info("decryptRsa Exception Error : "+e.getMessage());
			 logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		 }
		return securedValue;
	}
	/**
	 * 메일용 1274 요상한 키 처리용 반드시 Keysms String 이어야만 한다. 
	 * @작성일    : 2015. 7. 10. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public static byte[] encrypt(String publicKey_str, String original_str) {
		byte[] encrypt_byt = (byte[])null;
	    try {
	    	KeyFactory kf = KeyFactory.getInstance("RSA");
	    	BigInteger pkenc = new BigInteger(publicKey_str, 16);
	    	byte[] publicKey_byt = pkenc.toByteArray();
	    	X509EncodedKeySpec publicKey_x509Spec = new X509EncodedKeySpec(publicKey_byt);
	    	RSAPublicKey publicKey = (RSAPublicKey) kf.generatePublic(publicKey_x509Spec);
	    	Cipher cipher = Cipher.getInstance("RSA");
	    	cipher.init(1, publicKey);
	    	encrypt_byt = cipher.doFinal(original_str.getBytes());
	    } catch (InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException e) {
	    	//e.printStackTrace();
	    	logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
	    }
	    return encrypt_byt;
	  }
	
	/**
	 * 복호화
	 * @작성일    : 2015. 7. 10. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public static String decryptRsa(PrivateKey privateKey, String securedValue) {
		 String decryptedValue = "";
		 try{
			Cipher cipher = Cipher.getInstance("RSA");
		   /**
			* 암호화 된 값은 byte 배열이다.
			* 이를 문자열 폼으로 전송하기 위해 16진 문자열(hex)로 변경한다.
			* 서버측에서도 값을 받을 때 hex 문자열을 받아서 이를
			*  다시 byte 배열로 바꾼 뒤에 복호화 과정을 수행한다.
			*/
			byte[] encryptedBytes = hexToByteArray(securedValue);
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
			decryptedValue = new String(decryptedBytes, "utf-8"); // 문자 인코딩 주의.
		 }catch(InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException e) {
//			 logger.info("decryptRsa Exception Error : "+e.getMessage());
			 logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		 }
			return decryptedValue;
	}
	
	
	
	/**
	 * 16진 문자열을 byte 배열로 변환한다.
	 */
	 public static byte[] hexToByteArray(String hex) {
		if (hex == null || hex.length() % 2 != 0) {
			return new byte[]{};
		}
		byte[] bytes = new byte[hex.length() / 2];
		for (int i = 0; i < hex.length(); i += 2) {
			byte value = (byte)Integer.parseInt(hex.substring(i, i + 2), 16);
			bytes[(int) Math.floor(i / 2)] = value;
		}
		return bytes;
	}
	//Byte[] -> str
		public static String byteArrayToHex(byte[] data) { // Byte 값으로 되어 있는 데이터를 문자열로 변환해주는 Method
			List<String> list = new ArrayList(); 
			String rstStr = new String();
			
//			if (data.length == 24) { // 데이타가 24바이트인지 확인한다.
				for (byte dbyte : data) { // 향상된 for문으로 1바이트씩 계산한다.
					if (Integer.toHexString(dbyte & 0xff).length() == 1) { // 원활한 형변환을 위해 0xff를 AND 연산 한다.
						list.add("0".concat(Integer.toHexString(dbyte & 0xff)));
					} else {
						list.add(Integer.toHexString(dbyte & 0xff));
					}
				}
				for (String strs : list) {
					rstStr = rstStr + strs; // 변환된 값을 문자열로 저장
				}
//			}
			//000421fda9dd71071a73ad4b417eff7eed0616010201c44e
			return rstStr; // 변환된 문자열을 반환한다.
		}
		static String  Master_Server_URI = "http://portalorg.innopolis.or.kr";
		static String  Master_NEW_Server_URI = "http://210.98.50.200/sso/url";
		static String  SSO_Master_Server_URI = "http://portalorg.innopolis.or.kr/sso/url";
		static String Mail_Server_URI = "http://mail.innopolis.or.kr/servlet/crinity?ptype=portlet&paction=newMsgList2";

		//현재 기존시스템 SSO 서버가 살아 있으므로 동일한 키를 서버에 등록하고 URL을 반환한다.
		//기존시스템이 현재로 대체 될 경우 다른 메소드를 동일한 이름으로 생성하여 사용한다. 
//		public static Map  actSSO1(Map userMap) {
//			Map resultMap = new HashMap();
////			String user_id = "hhennessy";
////			String user_id = "dhjeon";
////			String user_id = "kimrh";
//			String user_id = (String) userMap.get("USER_MAIL_ID");
//			String user_email = (String) userMap.get("USER_MAIL");
//			
//			URLConnectAdapter conn = new URLConnectAdapter(SSO_Master_Server_URI);
//			String req_secure_key = generateSSOSecureKey(user_id);
//			
//			String session_parameters =  "&_REQ_SSO_SECURE_KEY="+req_secure_key;
//			System.out.println("###  --- Do SSO Master Login");
//			System.out.println("### SSO_SECURE_KEY:"+req_secure_key);
//			System.out.println("SSOServerKeyRegister.jsp?"+session_parameters);
//
//				String url = ""+Master_Server_URI+"/sso/sso_login.jsp";
//				url += "?_REQ_SSO_SECURE_KEY="+req_secure_key;
////				url += "&SSO_SERVER_URL_ROOT_ADDRESS="+URLEncoder.encode(Master_Server_URI,"UTF-8");
//				url += "&SSO_SERVER_URL_ROOT_ADDRESS="+Master_Server_URI;
//				System.out.println(url);
//			
//			String server_public_key_hex  = conn.getRemoteContents("SSOServerKeyRegister.jsp?"+session_parameters);
//			System.out.println( "HEX Key = "+ server_public_key_hex);
//			String login_userId = user_id;
//			String login_user_mailAddress  = user_email;
//			
//			session_parameters =  "&_REQ_SSO_SECURE_KEY="+req_secure_key;
//			Crypto crypto = new Crypto();
//			byte[] user_id_enc = crypto.encrypt(server_public_key_hex, login_userId);
//			byte[] login_user_mailAddress_enc = crypto.encrypt(server_public_key_hex, login_user_mailAddress);
//			String user_id_enchex = new BigInteger(user_id_enc).toString(16);
//			String login_user_mailAddress_enchex = new BigInteger(login_user_mailAddress_enc).toString(16);
//			
//			
//			session_parameters =  "&_REQ_SSO_SECURE_KEY="+req_secure_key;
//			session_parameters +=  "&_REQ_USER_LOGIN_ID_="+user_id_enchex;
//			String result = conn.getRemoteContents("SSODoLogin.jsp?"+session_parameters);
//			System.out.println(SSO_Master_Server_URI+"/SSODoLogin.jsp?"+session_parameters);
//			System.out.println("###  --- Finish SSO Master Login result:"+result);
//
//			session_parameters =  "&_REQ_SSO_SECURE_KEY="+req_secure_key;
//			session_parameters +=  "&_REQ_USER_LOGIN_MAIL_ADDRESS_="+login_user_mailAddress_enchex;
//			result = conn.getRemoteContents("SSOMailUpdater.jsp?"+session_parameters);
//			System.out.println(SSO_Master_Server_URI+"/SSOMailUpdater.jsp?"+session_parameters);
//			System.out.println("###  --- Finish SSO Master Mail Updater:"+result);
//			
//			session_parameters =  "&_REQ_SSO_SECURE_KEY="+req_secure_key;
//			session_parameters +=  "&SSO_SERVER_URL_ROOT_ADDRESS="+Master_NEW_Server_URI;
//			
//			resultMap.put("_REQ_SSO_SECURE_KEY", req_secure_key);
//			resultMap.put("_SSO_MAIL_LIST_SERVER_URL", Mail_Server_URI+session_parameters);
//			System.out.println("현재실서버용 "+req_secure_key);
//			return resultMap;
//		}
		

		//현재 기존시스템 SSO 서버가 살아 있으므로 동일한 키를 서버에 등록하고 URL을 반환한다.
		//기존시스템이 현재로 대체 될 경우 다른 메소드를 동일한 이름으로 생성하여 사용한다. 

		
		
		public static String makeDigitToStr(String strNum, int digit) {
			String str0 = "";
			for (int i = 0; i < digit; i++)
				str0 += "0";

			return (str0 + strNum).substring((str0 + strNum).length() - digit,
					(str0 + strNum).length());
		}
		
		
		
		
		public static String getPublicKey(PublicKey publicKey)
		  {
		    BigInteger pkenc = new BigInteger(1, publicKey.getEncoded());
		    return pkenc.toString(16);
		  }
		public static String getPrivateKey(PrivateKey privateKey)
		  {
		    BigInteger pkenc = new BigInteger(1, privateKey.getEncoded());
		    return pkenc.toString(16);
		  }
		
		public static PublicKey reGenPublicKey(String key_str){
			 RSAPublicKey publicKey = null;
			try {
				KeyFactory kf = KeyFactory.getInstance("RSA");
				  
				  BigInteger pkenc = new BigInteger(key_str, 16);
				  byte[] publicKey_byt = pkenc.toByteArray();
				  X509EncodedKeySpec publicKey_x509Spec = new X509EncodedKeySpec(publicKey_byt);
				  publicKey = (RSAPublicKey) kf.generatePublic(publicKey_x509Spec);
			} catch (NoSuchAlgorithmException e) {
				// TO-DO Auto-generated catch block
				//e.printStackTrace();
				logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			} catch (InvalidKeySpecException e) {
				// TO-DO Auto-generated catch block
				//e.printStackTrace();
				logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			}
		      
		      return publicKey;
		}
}

