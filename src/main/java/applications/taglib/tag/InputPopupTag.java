package applications.taglib.tag;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/**
 * ex) <
 * @author kdna2m001
 * @title  
 * @contents
 * @version
 *  - 1.0 생성 2013. 1. 16. kdna2m001
 */
@SuppressWarnings("serial")
public class InputPopupTag extends TagSupport {

	JspWriter out;
	String ctxPath = "";
	
	String cd_id = "";
	String nm_id = "";
	String cd_value = "";
	String nm_value = "";
	String cd_size = "10";
	String nm_size = "20";
	String cd_visible = "false";
	String nm_ime = "kor";
	
	String popup_url = "";
	String popup_name = "";
	String popup_width = "";
	String popup_height = "";
	String popup_options = "";
	
	public void setCd_id(String value){this.cd_id = value;}
	public void setNm_id(String value){this.nm_id = value;}
	public void setCd_value(String value) {this.cd_value = value;}
	public void setNm_value(String value) {this.nm_value = value;}
	public void setCd_size(String value) {this.cd_size = value;}
	public void setNm_size(String value) {this.nm_size = value;}
	public void setCd_visible(String value) {this.cd_visible = value;}
	public void setNm_ime(String value) {this.nm_ime = value;}

	public void setPopup_url(String value) {this.popup_url = value;}
	public void setPopup_name(String value) {this.popup_name = value;}
	public void setPopup_width(String value) {this.popup_width = value;}
	public void setPopup_height(String value) {this.popup_height = value;}
	public void setPopup_options(String value) {this.popup_options = value;}

	@Override
	public int doStartTag() throws JspException {
		try {
			//out
			out = pageContext.getOut();
			
			//ctxPath
			HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
			this.ctxPath = req.getContextPath();
			
			//script시작
			out.println("<script type=\"text/javascript\">");
			out.println("$(document).ready(function() {");
			//cd숨김 혹은 readonly
			if(this.cd_visible.equals("false")){
				out.println("$('#"+cd_id+"').hide();");//숨김처리
			}else{
				out.println("setReadOnly('"+cd_id+"', true);");//readonly처리
			}
			//enter=13
			out.println("$('#"+nm_id+"').keyup(function(e){if(e.keyCode == 13) $('#"+cd_id+"_BUTTON').trigger('click');});//enter=13");
			//backspace=8
			//delete=46
			out.println("$('#"+nm_id+"').keyup(function(e){if(e.keyCode == 8 || e.keyCode == 46) reset_"+cd_id+"();});");
			//버튼에 click이벤트 bind
			out.println("$('#"+cd_id+"_BUTTON').click(function(event){");
				out.println("var pop_url = '"+ctxPath + popup_url+"';");
				out.println("var pop_name = '"+popup_name+"';");
				out.println("var pop_width = '"+popup_width+"';");
				out.println("var pop_height = '"+popup_height+"';");
				out.println("var pop_options = '"+popup_options+"';");
				out.println("windowOpen(pop_url, pop_name, pop_width, pop_height, pop_options);");
			out.println("});");
			out.println("});//ready");
			//reset
			out.println("function reset_" + cd_id +"(){");
			
		} catch (IOException e) {
			throw new JspException("[InputPopupTag]-[doStartTag]: " + e.getMessage());
		}		
		return EVAL_BODY_INCLUDE;//<tag>reset logic</tag>
	}
	
	//@Override
	public int doEndTag() throws JspException {
		
		try {
			
			out.println("}");
			out.println("</script>");
			//script종료
			
			out.println("<input type=\"text\" id=\""+cd_id+"\" name=\""+cd_id+"\" size=\""+cd_size+"\"/>");//cd
			out.println("<input type=\"text\" id=\""+nm_id+"\" name=\""+nm_id+"\" size=\""+nm_size+"\" class=\"no_mar "+nm_ime+"\"/>");//nm
			out.println("<img id=\""+cd_id+"_BUTTON\" src=\""+ctxPath+"/images/button/btn_search.gif\" class=\"img_button\"/>");//btn
			
		} catch (IOException e) {
			throw new JspException("[InputPopupTag]-[doEndTag]: " + e.getMessage());
		}		
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	
	@Override
	public void release() {
		cd_id = "";
		nm_id = "";
		cd_value = "";
		nm_value = "";
		cd_size = "10";
		nm_size = "20";
		cd_visible = "false";
		nm_ime = "kor";
		
		popup_url = "";
		popup_name = "";
		popup_width = "";
		popup_height = "";
		popup_options = "";
	}
	


}