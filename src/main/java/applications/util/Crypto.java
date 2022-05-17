package applications.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import infrastructure.util.ResourceUtil;

/**
 * This class support functions encryption, decryption text with key, and
 * initial vector.
 * 
 * @author HungDM
 *
 */
public class Crypto {
	
	protected Logger logger = LogManager.getLogger(this.getClass());
	
	private String key;
	private String iv;

	public Crypto() {
		key = ResourceUtil.getMessage("system", "applications.util.crypto.key");
		iv = ResourceUtil.getMessage("system", "applications.util.crypto.iv");
	}

	public String encrypt(String text) {
		try {
			IvParameterSpec ivSpec = new IvParameterSpec(this.iv.getBytes("UTF-8"));
			SecretKeySpec skeySpec = new SecretKeySpec(this.key.getBytes("UTF-8"), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ivSpec);

			byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
			return Base64.getEncoder().encodeToString(encrypted);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException | InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}

		return null;
	}

	public String decrypt(String encrypted) {
		try {
			IvParameterSpec ivSpec = new IvParameterSpec(this.iv.getBytes("UTF-8"));
			SecretKeySpec skeySpec = new SecretKeySpec(this.key.getBytes("UTF-8"), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, ivSpec);
			byte[] original = cipher.doFinal(Base64.getDecoder().decode(encrypted));

			return new String(original);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException | InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			//ex.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}

		return null;
	}
}
