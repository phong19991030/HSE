package applications.util;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * 
 * ExceptionUtil
 *
 * @Description :
 * @Create : Nov 29, 2018 
 * @Author : HungDM
 * @Status : COMPLETE
 */
public class ExceptionUtil {

	public static String getStackTraceString(Exception e) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		//e.printStackTrace(pw);
		return sw.toString();
	}
}
