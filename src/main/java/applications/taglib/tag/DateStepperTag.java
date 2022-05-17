package applications.taglib.tag;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

@SuppressWarnings("serial")
public class DateStepperTag extends TagSupport {
	JspWriter out;
	String[][] data;
	int i = 0;

	String id 		= "";
	String cls 	    = "";//종류 - YY|MM
	Map params   = new HashMap();//파라미터 ex)CD_ID=CX0001&USE_YN=1
	String selected = "";
	String script 	= "";
	String css 		= "";
	String cssClass = "";
//	String style = ""; //
	String readonly	= "";
	boolean inactivate = false;


	public void setInactivate(String inactivate) {
		if(inactivate.equals("true")){
			this.inactivate = true;
		}else{
			this.inactivate = false;
		} 
	}
	public void setCssClass(String cssClass) {
		this.cssClass = cssClass;
	}
	public void setId(String value) {
		this.id = value;
	}
	public void setCls(String value) {
		this.cls = value;
	}
	public void setParams(String value) {
//		this.params = value;
		Map paramMap = new HashMap();
		if(value != null && !value.equals("")){
			for(String str : value.split("&")){
				String[] array = str.split("=");
				for(String strs : array[1].split(",")){
					paramMap.put(array[0],strs);
				}
			}
		}
		this.params = paramMap;
		
	}
	public void setSelected(String value) {
		this.selected = value;
	}
	public void setScript(String value) {
		this.script = value;
	}
	public void setCss(String value) {
		this.css = " style=\""+value+"\"";
	}
	public void setReadonly(String value) {
		if(value != null && value.toLowerCase().equals("true")){
			this.readonly = " readonly=\"readonly\"";
		}
	}

	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	@Override
	public int doEndTag() throws JspException {
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
			
			if(selected == null || selected.equals("")){
				if(cls.equals("YY")){
					selected = toYear;
				}else{
					//selected = toYear +"-"+ toMonth;
					selected = toYear + toMonth;
				}
			}	
			//***************************
			//** JQeury Script
			//***************************

			 
			//***************************
			//** Html Tag
			//***************************
			out.print("	<span type=\"button\" class=\"btn bts btg_gray bt_ico d13 "+(!inactivate? "ac_click":"")+" stepper_prev\" data-inputid=\""+id+"\" data-cls=\""+cls+"\" data-callback=\""+script+"\" style=\"margin-right:0;margin-left:0;\"></span>");
			out.print("	<span><input type=\"text\" id=\""+id+"\" name=\""+id+"\" value=\""+selected+"\" class=\"ac_change stepper_input\" data-callback=\""+script+"\" fpattern=\"stepper\" style=\"margin-right:0;width:"+(cls.equals("YY")? "40px":"60px")+";text-align:center;\" "+readonly+" maxlength=\""+(cls.equals("YY")? "4":"7")+"\"/></span>");
			out.print("	<span type=\"button\" class=\"btn bts btg_gray bt_ico d13 "+(!inactivate? "ac_click":"")+" stepper_next\" data-inputid=\""+id+"\" data-cls=\""+cls+"\" data-callback=\""+script+"\" style=\"margin-right:0;margin-left:0;\"></span>");

			
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
		cls 	     = "";
		params       = new HashMap();
		selected     = "";
		script 	     = "";
		css 		 = "";
		readonly	 = "";
	}

}