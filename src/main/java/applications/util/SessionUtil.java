package applications.util;

import javax.servlet.http.HttpServletRequest;

public class SessionUtil {

	/**
	 * 
	 * isReceiverListCloned
	 *
	 * @Description : check data receiver list is cloned to temporary table
	 * @Output : boolean
	 * @Create : Oct 30, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static boolean isReceiverListCloned(HttpServletRequest req) {
		boolean result = false;
		Object receiverCloned = req.getSession().getAttribute("RECEIVER_CLONED");
		if (receiverCloned != null) {
			result = (boolean) receiverCloned;
		} else {
			setReceiverCloned(req, false);
		}
		
		return result;
	}
	
	/**
	 * 
	 * setReceiverCloned
	 *
	 * @Description : set data to check receiver list is cloned to temporary table
	 * @Output : void
	 * @Create : Oct 30, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static void setReceiverCloned(HttpServletRequest req, boolean value) {
		req.getSession().setAttribute("RECEIVER_CLONED", value);
	}
}
