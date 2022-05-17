package infrastructure.util;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 공통 Utility 클래스.
 * @FileName  : CommonUtil.java
 * @Project     : mis_java
 * @최초작성일 : 2014. 9. 26. 
 * @프로그램설명 : 공통적인 데이터 변경등의 기능을 수행하는 단위 컴포넌트
 */
/**
 * @author keim
 *
 */
/**
 * 기능명 
 * @작성일    : 2015. 6. 22. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public final class ValidateUtil
{
	protected static Logger logger = LogManager.getLogger(CommonUtil.class);
	

    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean isEmpty(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp ==null || tmp.equals("")){
    		return false;
    	}
    	return true;
    }
    
    
    
    
    
    /**
     * 타입상관없이 null 체크  
     * @return 
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean maxLength(Object obj,int len){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp.length()<=len){
    		return true;
    	}
    	return false;
    }
    
    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean intType(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp.trim().matches("[0-9]{0,}")){
    		return true;
    	}
    	return false;
    }
    
    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean floatType(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp.trim().matches("[0-9]{0,}\\.?[0-9]*")){
    		return true;
    	}
    	return false;
    }
    
    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean telType(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp.trim().matches("[0-9]{3}\\-[0-9]{3,4}\\-[0-9]{3,4}")){
    		return true;
    	}
    	return false;
    }
    
    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean emailType(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp.trim().matches("[0-9a-zA-Z]*\\@[a-zA-Z]*\\.[a-zA-Z]")){
    		return true;
    	}
    	return false;
    }
    
    /**
     * 타입상관없이 null 체크  
     * @작성일    : 2015. 5. 8. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static boolean snType(Object obj){
    	String tmp = CastUtil.castToString(obj);
    	if(tmp.trim().matches("[0-9]{6}\\-[0-9]{7}")){
    		return true;
    	}
    	return false;
    }
}