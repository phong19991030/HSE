package applications.taglib.tag;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/**@Project AOS-ButtonTag.java
 * @author Keim - RyuJaemin
 * @Date: 2013. 12. 12.
 * @Comment
 */
@SuppressWarnings("serial")
public class ButtonTag extends TagSupport {
	JspWriter out;

	String id 		= "";
	String label  	= "";
	String type     = "button";   //button(default)|submit
	String kind 	= "WM";	//WS|WM(default)|WL|BS|BM|BL
	String script 	= "";	//호출함수
	String disabled = "";	//true|false(default)
	String style    = "";
	String name     = "";
	
	//직접 지정하는 disabled 속성이 우선한다.(복수의 Role : R_0001,R_0100....)
	String positiveRoles = "";//권한 있는 Roles(세션 Roles와 비교) -> 해당 되지 않으면 disabled='true'
	String negativeRoles = "";//권한 없는 Roles(세션 Roles와 비교) -> 해당 되면 disabled='true"
	
	@Override
	public void setId(String value) {
		this.id = value;
	}
	
	public void setLabel(String value) {
		this.label = value;
	}
	
	public void setType(String value) {
		this.type = value;
	}
	
	public void setKind(String value) {
		this.kind = value;
	}

	public void setScript(String value) {
		this.script = value;
	}

	public void setDisabled(String value) {
		if(value != null && value.toLowerCase().equals("true")){
			this.disabled = " disabled";
		}
	}
	
	public void setPositiveRoles(String value) {
		this.positiveRoles = value;
	}
	
	public void setNegativeRoles(String value) {
		this.negativeRoles = value;
	}
	
	public void setName(String value) {
		this.name = value;
	}
	
	public void setStyle(String value) {
		this.style = value;
	}
	
	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	@Override
	public int doEndTag() throws JspException {
		out = pageContext.getOut();
		/**
		 * 종료태그
		 */
		try {
			//권한 확인 - 직접 지정하는 disabled속성이 우선
			if(this.disabled.equals("")){
				//권한 확인이 필요하면
				if((this.positiveRoles != null && !this.positiveRoles.equals("")) ||
					(this.negativeRoles != null && !this.negativeRoles.equals(""))){
					int i = 0;
					int j = 0;
					int match = 0;
					//1) 세션에서 Roles확인
					HttpSession session = pageContext.getSession();
					Map user = (Map)session.getAttribute("SESS_USER");
					String user_roles = (String)user.get("SESS_USER_ROLES");
					String[] roles = user_roles.split(",");
					String[] chk_roles = null;
					//2-1) positive
					if(this.positiveRoles != null && !this.positiveRoles.equals("")){
						chk_roles = positiveRoles.split(",");
						match = 0;
						for(i = 0;i < chk_roles.length;i++){
							for(j = 0;j < roles.length;j++){
								if(chk_roles[i] != null && roles[j] != null &&
									chk_roles[i].equals(roles[j])){
									match++;
								}
							}
						}
						if(match == 0) this.disabled = " disabled";//positive에 매치되는 roles이 (없으면) disbled='true'
					}
					//2-2) negative
					if(this.negativeRoles != null && !this.negativeRoles.equals("")){
						chk_roles = negativeRoles.split(",");
						match = 0;
						for(i = 0;i < chk_roles.length;i++){
							for(j = 0;j < roles.length;j++){
								if(chk_roles[i] != null && roles[j] != null &&
									chk_roles[i].equals(roles[j])){
									match++;
								}
							}
						}
						if(match > 0) this.disabled = " disabled";//positive에 매치되는 roles이 (있으면) disbled='true'
					}
				}
			
			}
		
		
			String secondCss=null;
			if(kind != null && !kind.equals("") ){ 
				 secondCss = "btn_"+ kind;
			}else {
				secondCss = "btn_blue";
			}
			out.println("<span id=\""+id+"\" style=\""+style+"\" name=\""+name+"\" data-event=\""+script+"\" class=\"btnWrapper\"  onFocus=\"blur();\" >");
			out.println("<span class=\""+secondCss+" \"/>"+label+"</span><span class=\""+secondCss+"_right \">&nbsp;</span> " );
			out.println("</span> " );
		} catch (IOException e) {
			throw new JspException("[ButtonTag]-[doEndTag]: " + e.getMessage());
		}	
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	
	@Override
	public void release() {
		id 		 = "";
		label  	 = "";
		type     = "button";
		kind 	 = "WM";
		script 	 = "";
		disabled = "";
		name     = "";
		style    = "";
		
		positiveRoles = "";
		negativeRoles = "";
	}
}