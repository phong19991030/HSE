package applications.taglib.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/**
 * ex) <
 * @author kdna2m001
 * @title  박스태그
 * @contents
 * @version
 *  - 1.0 생성 2013. 6. 15. kdna2m001
 */
@SuppressWarnings("serial")
public class BoxTag extends TagSupport {

	JspWriter out;
	
	
//	String id = "";
	String className = "roundbox";
	String width = "";
	String height = "";
	@Override
	public void setId(String value){this.id = value;}
	public void setClassName(String value){this.className = value;}
	public void setWidth(String value) {this.width = value;}
	public void setHeight(String value) {this.height = value;}

	@Override
	public int doStartTag() throws JspException {
		try {
			//out
			out = pageContext.getOut();
			if(id != null && !id.equals("")) id = "id='"+id+"'";
			if(width != null && !width.equals("")) width = "width:"+width+";";
			if(height != null && !height.equals("")) height = "height:"+height+";";
			
			out.println("<table "+id+" class='"+ className +"' style='"+width+height+"'>");
			out.println("<tr><td class='tl'></td><td class='tbg'></td><td class='tr'></td></tr>");
			out.println("<tr><td class='lbg'></td><td class='cont'>");

		} catch (IOException e) {
			throw new JspException("[BoxTag]-[doStartTag]: " + e.getMessage());
		}		
		return EVAL_BODY_INCLUDE;//<tag>reset logic</tag>
	}
	
	//@Override
	public int doEndTag() throws JspException {
		try {
			out.println("</td><td class='rbg'></td></tr>");
			out.println("<tr><td class='bl'></td><td class='bbg'></td><td class='br'></td></tr>");
			out.println("</table>");
		} catch (IOException e) {
			throw new JspException("[BoxTag]-[doEndTag]: " + e.getMessage());
		}		
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	
	@Override
	public void release() {
		id = "";
		className = "roundbox";
		width = "";
		height = "";
	}
}