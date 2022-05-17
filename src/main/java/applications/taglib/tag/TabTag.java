package applications.taglib.tag;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;


/**@Project AOS-TabTag.java
 * @author Keim - RyuJaemin
 * @Date: 2013. 12. 12.
 * @Comment
 */
@SuppressWarnings("serial")
public class TabTag extends TagSupport {

	JspWriter out;
	String ctxPath = "";
	
	String tabNames = "";
	String tabUrls = "";
	int selectedIndex = 0;
	String tabScript = "false";
	
	public void setTabNames(String value){this.tabNames = value;}
	public void setTabUrls(String value){this.tabUrls = value;}
	public void setSelectedIndex(int value) {this.selectedIndex = value;}
	public void setTabScript(String value) {this.tabScript = value;}

	@Override
	public int doStartTag() throws JspException {
		try {
			//out
			out = pageContext.getOut();
			
			//ctxPath
			HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
			if(this.tabScript.equals("true")){
				this.ctxPath = "javascript:";
			}else{
				this.ctxPath = req.getContextPath();
			}
			
			out.println("<ul class=\"tab\">");
			if(tabNames != null && tabUrls != null){
				String[] names = tabNames.split(",");
				String[] urls = tabUrls.split(",");
				
				for(int i = 0;i < names.length;i++){
					String className = "";
					String url = urls[i].equals("#") ? urls[i] : ctxPath+urls[i];
					if(i == 0){
						if(i == selectedIndex){//첫번째 탭이 선택된 경우
							className = "tab_first_ov";
						}else{
							className = "tab_first_out";
						}
					}else if(i == (names.length - 1)){
						if(i == selectedIndex){//마지막 탭이 선택된 경우
							className = "tab_last_out_ov";
						}else{
							if(i == (selectedIndex + 1)){//이전 탭이 선택된 경우
								className = "tab_last_ov_out";
							}else{
								className = "tab_last_out_out";
							}
						}
					}else{
						if(i == selectedIndex){//중간 탭이 선택된 경우
							className = "tab_mid_out_ov";
						}else{
							if(i == (selectedIndex + 1)){//이전 탭이 선택된 경우
								className = "tab_mid_ov_out";
							}else{
								className = "tab_mid_out_out";
							}
						}
					}
					out.println("<li class=\"" + className + "\"><a href=\"" + url + "\" onfocus=\"blur()\">" + names[i] + "</a></li>");
				}//end for
			}//end if(null)
			out.println("<li class=\"tab_btn\">");
		} catch (IOException e) {
			throw new JspException("[TabTag]-[doStartTag]: " + e.getMessage());
		}		
		return EVAL_BODY_INCLUDE;//<tag>reset logic</tag>
	}
	
	//@Override
	public int doEndTag() throws JspException {
		try {
			out.println("</li>");
			out.println("</ul>");
		} catch (IOException e) {
			throw new JspException("[TabTag]-[doEndTag]: " + e.getMessage());
		}		
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	
	@Override
	public void release() {
		tabNames = "";
		tabUrls = "";
		selectedIndex = 0;
	}
}