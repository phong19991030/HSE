package module.util;

import java.security.SecureRandom;
import java.util.Locale;
import java.util.Objects;
import java.util.Random;

/**
 * 
 *  RandomString.java
 *  
 *  @author pjk
 *  @version 1.0
 *  @Date Jul 19, 2021
 *  @Description
 *  
 *	
 *	수정자				수정 내용
 *	-------------------------------
 *	pjk				최초 생성
 *
 */
public class RandomString {
	
	public static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	public static final String lower = upper.toLowerCase(Locale.ROOT);
	public static final String digits = "0123456789";
	public static final String alphanum = upper + lower + digits;
	private final Random random;
	private final char[] symbols;
	private final char[] buf;
	
	
	public String nextString() {
		for(int i=0; i<buf.length; i++) 
			buf[i] = symbols[random.nextInt(symbols.length)];
		return new String(buf);
	}
	
    public RandomString(int length, Random random, String symbols) {
        if (length < 1) throw new IllegalArgumentException();
        if (symbols.length() < 2) throw new IllegalArgumentException();
        this.random = Objects.requireNonNull(random);
        this.symbols = symbols.toCharArray();
        this.buf = new char[length];
    }

    /**
     * Create an alphanumeric string generator.
     */
    public RandomString(int length, Random random) {
        this(length, random, alphanum);
    }

    /**
     * Create an alphanumeric strings from a secure generator.
     */
    public RandomString(int length) {
        this(length, new SecureRandom());
    }

    /**
     * Create session identifiers.
     */
    public RandomString() {
        this(21);
    }
}
