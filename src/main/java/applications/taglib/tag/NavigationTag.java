package applications.taglib.tag;

import infrastructure.util.CastUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/**@Project AOS-NavigationTag.java
 * @author Keim - RyuJaemin
 * @Date: 2013. 12. 12.
 * @Comment
 */
@SuppressWarnings("serial")
public class NavigationTag extends TagSupport {

	JspWriter out;
	Map menuMap =new HashMap();
//	String nm1 = "";
//	String nm2 = "";
//	String nm3 = "";
//	String nm4 = "";
//	String ctxPath = "";
//	String menu_id = "";
//	String menuMode = ""; //MYMENU, RCMENU, null
	String title = "";

	boolean helpIcon = false;
	
	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	public Map getMenuMap() {
		return menuMap;
	}

	public void setMenuMap(Map value) {
		this.menuMap = value;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setHelpIcon(String helpIcon) {
		this.helpIcon = Boolean.parseBoolean(helpIcon);
	}
	public void setHelpIcon(boolean helpIcon) {
		this.helpIcon = helpIcon;
	}

	//@Override
	public int doEndTag() throws JspException {
		
		out = pageContext.getOut();
		
		String tags = getString(menuMap);
		
			try {
				
				
				String pathName="";
				String pathKey="";
				//정규식으로 바꿀 예정 
				if(tags !=null && !tags.equals("")){
				
					String pathTag = tags.substring(tags.lastIndexOf("<span"));
					
	//				String pathKey = pathTag.substring(pathTag.indexOf("data-url=\"")+("data-url=\"").length(),pathTag.lastIndexOf("\">"));
					pathKey = pathTag.replaceAll(".*data-url=\"(.*)\".*","$1");
					pathName = pathTag.replaceAll("<.*>(.*)<.*>", "$1");
				}
				
				
				out.print("<h2 class=\"cnb_title\">"+pathName+"</h2>");
				out.print("<div class=\"cnb_navigation\"><span class=\"home\"></span>"); 
					
				if(menuMap != null){
					out.print(tags);
				}
				
				if(helpIcon){
						
					out.print( "<span class=\"manual ac_click popup\"  data-key=\""+pathKey+"\" ><a href=\"javascript:getHelpPopup('"+pathKey+"')\"> 매뉴얼</a> </span>");
				}
				
				
				out.print("</div>");
//				out.print("");
			} catch (IOException e) {
				throw new JspException("[NavigationTag]-[doEndTag]: " + e.getMessage());
			}		
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	/**
	 * 기능명 
	 * @작성일    : 2014. 12. 4. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public String getString(Map map){
		String resultString="";
		String key = "";
		for(Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()){
//			Map menuMap =map; 
			if(entry.getValue() instanceof Map){
				Map tmpMap = (Map) entry.getValue();
				if(tmpMap.get("MENU_NM") != null){
					if( title != null && !title.equals("")){
						if(tmpMap.get("MENU_NM").equals(title)){
							resultString = "<span data-url=\""+tmpMap.get("LINK_PATH")+"\">"+tmpMap.get("MENU_NM")+"</span>";
						}
					}else{
					resultString = "<span data-url=\""+tmpMap.get("LINK_PATH")+"\">"+tmpMap.get("MENU_NM")+"</span>";
					}
					key = (String) tmpMap.get("LINK_PATH");
				}
				String str = getString((Map) entry.getValue());
				if(!str.equals("")){
					if(!str.startsWith("<em class=\"arrow\"></em>")){
						resultString +="<em class=\"arrow\"></em>"+str;
					}else{
						resultString +=str;
					}
				}
			}else if(entry.getKey().equals("LINK_PATH")){
				
			}else{
				
//				resultString = "<span class=\"page\" data-url=\""+menuMap.get("LINK_PATH")+"\">"+menuMap.get("MENU_NM")+"</span>";
			}
		}
		
		
		
	
		return resultString;
	}
	@Override
	public void release() {
	
	}
}