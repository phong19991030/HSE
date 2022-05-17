package applications.taglib.tag;

import java.io.IOException;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

@SuppressWarnings("serial")
public class FileManagerTag extends TagSupport {
	JspWriter out;
//	String[][] data;
	int i = 0;

	String id 		= "";
//	Map params   = new HashMap();//파라미터 ex)CD_ID=CX0001&USE_YN=1
	String fileKey	= "";
	String hold = "false";

	public void setId(String value) {
		this.id = value;
	}
	public void setFileKey(String fileKey) {
		this.fileKey = fileKey;
	}
	public void setHold(String hold) {
		this.hold = hold;
	}
	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	@Override
	public int doEndTag() throws JspException{
		try {
			//out
			out = pageContext.getOut();
			//ctxPath
			HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
			String ctxPath = req.getContextPath();
			
			Calendar cal = Calendar.getInstance();
			int year = cal.get(Calendar.YEAR);
			int month = cal.get(Calendar.MONTH)+1;
			String toYear = String.valueOf(year);
			String toMonth = (month<10?"0":"") + (String.valueOf(month));
			
			//***************************
			//** JQeury Script
			//***************************

			
			//***************************
			//** Html Tag
			//***************************
//			out.print("	<span type=\"button\" class=\"ico_small f13 bg_mint "+(!inactivate? "ac_click":"")+" stepper_prev\" data-inputid=\""+id+"\" data-cls=\""+cls+"\" data-callback=\""+script+"\" style=\"padding:0;margin:0;\"></span>");
//			out.print("	<span><input type=\"text\" id=\""+id+"\" name=\""+id+"\" value=\""+selected+"\" class=\"ac_change stepper_input\" data-callback=\""+script+"\" fpattern=\"stepper\" style=\"width:"+(cls.equals("YY")? "40px":"60px")+";text-align:center;\" "+readonly+" maxlength=\""+(cls.equals("YY")? "4":"7")+"\"/></span>");
//			out.print("	<span type=\"button\" class=\"ico_small d13 bg_mint "+(!inactivate? "ac_click":"")+" stepper_next\" data-inputid=\""+id+"\" data-cls=\""+cls+"\" data-callback=\""+script+"\" style=\"padding:0;margin:0;\"></span>");
			out.print("<span  class=\" sbtn btn ac_click bg_mint ico a7\"  data-func=\"commonFilePopup\"  data-param=\""+fileKey+"\" data-hold=\""+hold+"\" data-field=\""+id+"\">  첨부파일 </span>");
			out.print("<input type=\"text\" id=\""+id+"\" name=\""+id+"\" value=\""+fileKey+"\" style=\"display:none;\" />");
				
		} catch (IOException e) {
			throw new JspException("[DateBtnTag]-[doEndTag]: " + e.getMessage());
		}	
		
		
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();  
		return EVAL_PAGE;
	}

	
	@Override
	public void release() {
		id 		     = "";
		fileKey      = "";
	}

}