package applications.taglib.tag;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.TagSupport;

import infrastructure.util.ComFileUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @Project MIS-SearchBoxLayoutTag.java
 * @author Keim 
 * @Date: 2013. 12. 12.
 * @Comment
 */
@SuppressWarnings("serial")
public class SearchBoxLayoutTag extends TagSupport {

	JspWriter out;
	String ctxPath = "";

	String tabNames = "";
	String tabUrls = "";
	int selectedIndex = 0;
	String tabScript = "false";
	String script ="";
	boolean initenable = true;
	String id;
	String formId = "";
	boolean pagingable = true;
	String buttons = "";
	List<Map> buttonList= new ArrayList();

	public void setTabNames(String value) {
		this.tabNames = value;
	}

	public void setTabUrls(String value) {
		this.tabUrls = value;
	}


	public String getFormId() {
		return formId;
	}

	public void setFormId(String formId) {
		this.formId = formId;
	}

	public boolean isPagingable() {
		return pagingable;
	}

	public void setPagingable(boolean pagingable) {
		this.pagingable = pagingable;
	}

	public void setSelectedIndex(int value) {
		this.selectedIndex = value;
	}

	public void setTabScript(String value) {
		this.tabScript = value;
	}

	private BodyContent mBodyContent;

	public void setBodyContent(BodyContent pBodyContent) {
		mBodyContent = pBodyContent;
	}

	public BodyContent getBodyContent() {
		return mBodyContent;
	}
	
	public void setScript(String script) {
		this.script = script;
	}

	public String getScript() {
		return script;
	}
	
	public void setInitenable(String initenable) {
		this.initenable = (Boolean.parseBoolean(initenable)) ;
	}

	
		
	public String getButtons() {
		return buttons;
	}

	public void setButtons(String buttons) {
		if(buttons !=null){
			buttonList =new ArrayList();
			
			
			buttons = buttons.replaceAll("([a-zA-Z0-9\\.\\_\\s\\t\\n]{1,})", "\'$1\'");
			
			JSONArray json = JSONArray.fromObject(buttons); 

			
			for(Object obj : json){
				Map btMap = new HashMap();
				
				btMap.putAll((JSONObject) obj);
//				((JSONObject)obj).get("");
				buttonList.add(btMap);
			}
//			buttons.replaceAll(regex, replacement)
			
//			buttonList = array;
//			
//			
//			
//			String bt[] = buttons.split(",");
//			Map btMap = new HashMap();
//			for(String bu : bt){
//				String bus[] = bu.split(":");
//				btMap.put(bus[0], bus[1]);
//			}
//			buttonList.add(btMap);
		}
		
		
		this.buttons = buttons;
	}

	@Override 
	public int doStartTag() throws JspException {
		out = pageContext.getOut();
		id =  ComFileUtil.generateTempKey();
		try { 
			out.println("	<div class=\"search-form-wrap\">");
			out.println("		<div class=\"search-wrapper\">");
			out.println("<form class=\"form_search_box\" id=\""+formId +"\" action=\"javascript:"+script+"(\'"+formId+"\');\" onSubmit=\""+script+"(\'"+formId+"\'); return false\" >");
			out.println("<div class=\"input-group\">");
			out.println("<label for=\"detailKeyword\" class=\"sr-only\">검색어입력</label>");
			out.println("<input type=\"text\" name=\"search.all\" id=\"searchAll\" placeholder=\"Enter your search term and then press Enter.\" autocomplete=\"off\">");
			out.println("</div>");
			out.println("<a onclick=\"refreshSearchForm()\" class=\"refresh-btn\" title='Refresh'>");
			out.println("<span class=\"sr-only\">Initializing a search</span>");
			out.println("<i class=\"xi-refresh\"></i>");
			out.println("</a>");
			
	        
				
				
			
			out.println("<a href=\"#none\" class=\"slide-toggle-search\" title='Search details'>");
			out.println("<span class=\"sr-only\">상세검색 토글 버튼</span>");
			out.println("<i class=\"xi-angle-down-min\"></i>");
			out.println("</a>");
			out.println("</form>");
			out.println("<div class=\"search-detail\">");
			out.println("<form class=\"form_search_box\" id=\""+formId +"1\" action=\"javascript:"+script+"(\'"+formId+"1\');\" onSubmit=\""+script+"(\'"+formId+"1\'); return false\" >");
			out.println("<ul class=\"detail-search-lst\">");

			
			
			
//			if(buttonList.size()>0){
//				for(Map obj : buttonList){
//					String id = (String)   ( obj.get("id") !=null  ? obj.get("id")  :""   ); 
//					String name = (String) ( obj.get("name") !=null ? obj.get("name"):"" );
//					String clazz = (String)( obj.get("cssClass")!=null? obj.get("cssClass"):"" );
//					String label = (String)( obj.get("label")!=null? obj.get("label"):"");
//					out.println("<span id=\""+id+"\" name=\""+name+"\" class=\""+clazz+"\">"+label+"</span>");
//				}
//			}
			
//			out.println("<span id=\"search_arrow\"><img src=\"\\images\\fork_images\\search_arrow.png\" alt=\"\"></span>");
//			out.println("				<span class=\"btn btm_search ac_click submit\"></span>");
//			out.println("				<span class=\"btn btm_refresh ac_click reset\"></span>");
//			out.println("			</div>");
//			out.println("		</div>");
//			out.println("		<div class=\"group_content search\">");
			

		} catch (IOException e) {
			throw new JspException("[TabTag]-[doStartTag]: " + e.getMessage());
		}
		
		
		
		return EVAL_BODY_INCLUDE;// <tag>reset logic</tag>
	}

	// @Override
	public int doEndTag() throws JspException {
		out = pageContext.getOut();
		try {
			out.println("</ul>");
			out.println("	<button class=\"search-btn\">search</button>");
//			out.println("</form>");
			out.println("</div>");
			out.println("</div>");
			if(pagingable){
			out.println("<div class=\"total-wrap\">");
			out.println("<span class=\"num\">Total <strong></strong></span>");
			out.println("<div class=\"select-box\">");
			out.println("<label for=\"search_type\"></label>");
			out.println("<select name=\"search_type\" id=\"page-size\" class=\"info-select\" onchange=\"drawgrid()\">");
			out.println("<option value=\"10\" selected=\"selected\">10</option>");
			out.println("<option value=\"20\">20</option>");
			out.println("<option value=\"30\">30</option>");
			out.println("</select>");
			out.println("</div>");
			out.println("</div>");
			}
			out.println("</div>");

			
			out.println("<script type=\"text/javascript\">");
			out.println("function refreshSearchForm() {");
			out.println("$('div.search-form-wrap > div.search-wrapper input').val('');");
			out.println("$('div.search-form-wrap > div.search-wrapper select').val('').trigger('change');");
			out.println(script+"();");
			out.println("}");
			out.println("$(document).ready(function(){"); 
			out.println("$('#searchAll').keypress(function(event){"); 
			out.println("var keycode = (event.keyCode ? event.keyCode : event.which);"); 
			out.println("if(keycode == '13'){"); 
			out.println("$(this).closest('form').submit()"); 
			out.println("}"); 
			out.println("});"); 
			out.println("$('#"+formId+" .slide-toggle-search').click(function() {"); 
			out.println(" $(this).parents('.search-wrapper').toggleClass('active');"); 
			out.println(" if($(this).parents('.search-wrapper').hasClass('active')){$(this).parents('.search-wrapper').find('.slide-toggle-search i').removeClass('xi-angle-down-min').addClass('xi-angle-up-min');}else{$(this).parents('.search-wrapper').find('.slide-toggle-search i').removeClass('xi-angle-up-min').addClass('xi-angle-down-min'); "); 
			out.println("}"); 
			out.println("});"); 
			out.println("$('#"+formId+"').closest('.search-wrapper').find('button.search-btn').click(function() {"); 
			out.println(" $('#"+formId+"').parents('.search-wrapper').removeClass('active');$('#"+formId+"').parents('.search-wrapper').find('.slide-toggle-search i').removeClass('xi-angle-up-min').addClass('xi-angle-down-min');"); 
			out.println("});"); 
			
			if(initenable){
				out.println("		$('#"+formId+".form_search_box').trigger('submit')");
			}
			
//			out.println(" $('#dialog_"+id+".dialog_search_area').dialog({ autoOpen: false, width: 1000, height: 750, modal: true });"); 
//			out.println("      $('#btn_dlg_"+id+" .btn_open_search').click(function(){    		$('#dialog_"+id+".dialog_search_area').dialog('open');	})"); 
//			out.println("      $('#btn_area span.btn').click(function(){    		$('#dialog_"+id+".dialog_search_area').dialog('close'); $('#dialog_"+id+".dialog_search_area').remove()	})"); 
//			out.println(""); 
			out.println("});"); 
			
			
			out.println("$(document).click(function(e){"); 
			out.println("if (!$('#"+formId+"').parents('.search-wrapper').is(e.target) && $('#"+formId+"').parents('.search-wrapper').has(e.target).length === 0 && !($(e.target).hasClass('ui-datepicker-header') || $(e.target).parents(\"div.ui-datepicker-header\").length)) {$('#"+formId+"').parents('.search-wrapper').removeClass('active');$('#"+formId+"').parents('.search-wrapper').find('.slide-toggle-search i').removeClass('xi-angle-up-min').addClass('xi-angle-down-min');}"); 
			out.println("});"); 
			out.println("</script>"); 

		} catch (IOException e) {
			throw new JspException("[TabTag]-[doEndTag]: " + e.getMessage());
		}
		// release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
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