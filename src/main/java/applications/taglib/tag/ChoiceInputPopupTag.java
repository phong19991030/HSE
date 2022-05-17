package applications.taglib.tag;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import infrastructure.util.CastUtil;

/**
 * @Project    : mis
 * @Date       : 2014. 9. 18. 
 * @AUTHOR     : keim
 * @변경이력 : 
 * @프로그램설명 : 
 */
@SuppressWarnings("serial")
public class ChoiceInputPopupTag extends TagSupport {
	JspWriter out;
 
	String url	= "";
	String id	= "";
	String cls = "";
	String classes = "";
	String type = "";
	String disabled	= "";
	String defaultValue = "";
	String callback = "";
//	String fieldTargetObject = "" ;
	String codeFieldName = ""; 
	String textFieldName = ""; 
	String codeFieldSize = "";
	String textFieldSize = ""; 
	String codeTargetName = "";
	String textTargetName = "";
	String codeDefaultValue = "";
	String textDefaultValue = "";
	
	String funcname ="onSelect";
	String eventType = "";
	String searchLabel = "";
	boolean codeView = false;
	String width	= "";
	String height	= "";
	String textTargetReadonly="";
	boolean inactivate = false;
	String params = "";
	String codeValidate = "";
	String textValidate = "";
	
	// 추가 20160527 
	
	String fields;
	String targets;
	String targetsGen;
	String targetsView;
	
	
	
	List fieldsList; 
	List targetsList; 
	
	List targetsGenList;
	List targetsViewList;
	
	
	
//	public void setFieldTargetObject(String fieldTargetObject) {
//		[{SEARCH.DEPT_CD:DEPT_CD},{SEARCH.DEPT_CD:SEARCH.DEPT_CD},{SEARCH.DEPT_CD:SEARCH.DEPT_CD}]
//		{SEARCH.DEPT_CD:SEARCH.DEPT_CD}
//		
//		this.fieldTargetObject = fieldTargetObject;
//	}
	
	
	public void setId(String value) {
		this.id = value;
	}
	public void setCodeDefaultValue(String codeDefaultValue) {
		this.codeDefaultValue = codeDefaultValue;
	}
	public void setTextDefaultValue(String textDefaultValue) {
		this.textDefaultValue = textDefaultValue;
	}
	public void setInactivate(String inactivate) {
		if(inactivate.equals("true")){
			this.inactivate = true;
		}else{
			this.inactivate = false;
		} 
	}
	public void setTextTargetReadonly(String textTargetReadonly) {
		if(textTargetReadonly.equals("true")){
			this.textTargetReadonly = "readonly = \"readonly\"";
		}else{
			this.textTargetReadonly = "";
		}
	}
	public void setCodeTargetName(String codeTargetName) {
		this.codeTargetName = codeTargetName;
	}
	public void setTextTargetName(String textTargetName) {
		this.textTargetName = textTargetName;
	}
	public void setDisabled(String value) {
		if(value != null && value.toLowerCase().equals("true")){
			this.disabled = " disabled";
		}
	} 
	public void setDefaultValue(String value) {
		this.defaultValue = value;
	}
	public String getType() {
		return type;
	}
	public void setType(String value) {
		this.type = value;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String value) {
		this.url = value;
	}
	public String getCls() {
		return cls;
	}
	public void setCls(String value) {
		this.cls = value;
	}
	
	public String getClasses() {
		return classes;
	}
	public void setClasses(String classes) {
		this.classes = classes;
	}
	public String getCallback() {
		return callback;
	}
	public void setCallback(String value) {
		this.callback = value;
	}
	public String getCodeFieldName() {
		return codeFieldName;
	}
	public void setCodeFieldName(String value) {
		this.codeFieldName = value;
	}
	public String getTextFieldName() {
		return textFieldName;
	}
	public void setTextFieldName(String value) {
		this.textFieldName = value;
	}
	
	public String getCodeFieldSize() {
		return codeFieldSize;
	}
	public void setCodeFieldSize(String value) {
		this.codeFieldSize = value;
	}
	public String getTextFieldSize() {
		return textFieldSize;
	}
	public void setTextFieldSize(String value) {
		this.textFieldSize = value;
	}
	
	public String getDisabled() {
		return disabled;
	}
	public String getFuncname() {
		return funcname;
	}
	public void setFuncname(String funcname) {
		this.funcname = funcname;
	}
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	
	
	public String getSearchLabel() {
		return searchLabel;
	}
	public void setSearchLabel(String searchLabel) {
		this.searchLabel = searchLabel;
	}
	
	public String getWidth() {
		return width;
	}
	public void setWidth(String value) {
		this.width = value;
	}
	
	public String getHeight() {
		return height;
	}
	public void setHeight(String value) {
		this.height = value;
	}
	
	public boolean isCodeView() {
		return codeView;
	}
	public void setCodeView(boolean codeView) {
		this.codeView = codeView;
	}
	public void setParams(String value) {
		this.params = value;
	}
	public void setCodeValidate(String value) {
		String validate = "";
		if(!value.equals("")){
			validate = " validate[" + value + "]";
		}
		this.codeValidate = validate;
	}
	public void setTextValidate(String value) {
//		String validate = "";
//		if(!value.equals("")){
//			validate = " validate[" + value + "]";
//		}
		this.textValidate = value;
	}
	
	
	
	public List getFieldsList() {
		return fieldsList;
	}
	public void setFieldsList(List fieldsList) {
		this.fieldsList = fieldsList;
	}
	public List getTargetsList() {
		return targetsList;
	}
	public void setTargetsList(List targetsList) {
		this.targetsList = targetsList;
	}
	public void setFields(String fields) {
		this.fields = fields;
		setFieldsList(CastUtil.castToList(fields,","));
	}
	public void setTargets(String targets) {
		this.targets = targets;
		setTargetsList(CastUtil.castToList(targets,","));
	}
	
	
	
	public String getTargetsGen() {
		return targetsGen;
	}
	public void setTargetsGen(String targetsGen) {
		this.targetsGen = targetsGen;
		setTargetsGenList(CastUtil.castToList(targetsGen,","));
	}
	public String getTargetsView() {
		return targetsView;
	}
	public void setTargetsView(String targetsView) {
		this.targetsView = targetsView;
		setTargetsViewList(CastUtil.castToList(targetsView,","));
	}
	
	
	public void setTargetsGenList(List targetsGenList) {
		this.targetsGenList = targetsGenList;
	}
	public List getTargetsGenList() {
		return targetsGenList;
	}
	public void setTargetsViewList(List targetsViewList) {
		this.targetsViewList = targetsViewList;
	}
	public List getTargetsViewList() {
		return targetsViewList;
	}
	
	
	
	
	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	} 
	
	@Override
	public int doEndTag() throws JspException {
		String urls =  "/common/popup/controls.ajax";
		if(url != null && !url.equals("")){
			urls = url;
		}
		if(funcname == null || funcname.equals("")){
			funcname = "onSelect";
		}
	
		try {
			//out
			out = pageContext.getOut();
			if(!searchLabel.equals("")){
				out.print("<label>"+searchLabel+"</label>");
			}
		
			setSize();
			
			String all = "";
//			if(funcname.equals("onSelectAll")){all="All";}

			out.print("<div class=\"input-group\"><input type=\"text\"  name=\""+textTargetName+"\" id=\""+textTargetName+"\" nova-validation=\""+textValidate+"\" class=\""+id+"_"+codeTargetName+"\" "+textTargetReadonly+" value=\""+textDefaultValue+"\"  onkeydown=\"ChoiceInputFormOnkeydown(event,'"+id+"_"+codeFieldName+"','form')\" onkeyup=\"ChoiceInputFormOnkeyup"+all+"('"+id+"_"+codeFieldName+"','form')\"/>");
			out.print("<input hidden type=\"text\" name=\""+codeTargetName+"\" id=\""+codeTargetName+"\" value=\""+codeDefaultValue+"\" class=\"disabled "+(codeView ? "show":"hide")+" "+id+"_"+codeTargetName+codeValidate+"\" readonly=\"readonly\" style=\"width:"+codeFieldSize+"px;\"/></div>");
			out.print("<span id=\""+id+"_"+codeTargetName+"\" type=\"button\" class=\"btn_ico float_none registration-search-btn btxs_ico_search"+(!inactivate? " ac_click":"bt_disable")+" popup "+type+"\" data-type=\""+type+"\" "
					+ "data-url=\""+urls+"."+type+"\" data-defaultValue=\""+defaultValue+"\" data-id=\""+id+"\" "
					+ "data-callback =\""+callback+"\"  data-cls=\""+cls+"\"  data-param=\""+params+"\" data-prev=\""+textTargetName+"\" data-next=\""+codeTargetName+"\" "   
					+ "data-targetCode=\""+codeFieldName+"\" data-targetText=\""+textFieldName+"\" "
					+ "data-fields=\""+fields+"\" data-targets=\""+targets+"\" "  
					+ "data-class=\""+classes+"\""
					+ "data-funcname=\""+funcname+"\" data-eventType=\""+eventType+"\" data-width=\""+width+"\" data-height=\""+height+"\" style=\"float:none !important\">Select</span>");
			
			if(targets != null && fields != null){
				for(int i = 0 ;  i < targetsList.size() ; i++ ){
					String target = (String) targetsList.get(i);
					// 생성여부가 없으면 모조건 생성 
					if(targetsGen !=null){
						if("true".equals(targetsGenList.get(i))){
							String viewYn = "none";
							if(targetsView !=null){ 
								if("true".equals(targetsViewList.get(i))){
									viewYn = "initial";
								} 
							}
							out.print("<input type=\"text\"  name=\""+target+"\" id=\""+target+"\" nova-validation=\""+textValidate+"\" class=\""+id+"_"+codeTargetName+"\" "+textTargetReadonly+" value=\""+textDefaultValue+"\" style=\"width:"+textFieldSize+"px;display:"+viewYn+"\">");
						}
					}else{
							out.print("<input type=\"text\"  name=\""+target+"\" id=\""+target+"\" nova-validation=\""+textValidate+"\"  class=\""+id+"_"+codeTargetName+"\" "+textTargetReadonly+" value=\""+textDefaultValue+"\" style=\"width:"+textFieldSize+"px;\">");
						
					}
					
				}
					
					
					
						
			}
			
			
//			out.print( ); 
			
		} catch (IOException e) {
			throw new JspException("[FixedComboDayTag]-[doEndTag]: " + e.getMessage());
		}	
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	private void setSize(){
		if(cls.equals("member")){
			width="950"; 
			height="650";
		}else if(cls.equals("depart")){
			width="1000";  
			height="650";
		}else if(cls.equals("ntn")){
			width="500";  
			height="700";
		}else if(cls.equals("post")){
			width="570"; 
			height="870";
		}else if(cls.equals("deptCd")){
			width="900";
			height="800";
		}else if(cls.equals("bank")){
			width="400";
			height="700";
		}else if(cls.equals("budgCd")){
			width="1050";
			height="715";
		}else if(cls.equals("acctCd")){
			width="650";
			height="700";
		} else if ("businessUnit".equals(cls)) {
			width = "400";
			height = "620";
		} else if ("empl".equals(cls)) {
			width = "800";
			height = "680";
		} else if ("empl2".equals(cls)) {
			width="1000";  
			height="650";
		} else if ("binding".equals(cls)) {
			width = "1500";
			height = "750";
		} else if ("selectHuman".equals(cls)) {
			width = "800";
			height = "680";
		}
		
		if(width == null || width.equals("")){
			width="900";
		}
		if(height == null || height.equals("")){
			height="700";
		}
		
		if(codeFieldSize == null || codeFieldSize.equals("")){
			if(cls.equals("member")){
				codeFieldSize = "50";
			}else if(cls.equals("depart")){
				codeFieldSize = "50";
			}else if(cls.equals("ntn")){
				 codeFieldSize = "50";
			}else if(cls.equals("post")){
				 codeFieldSize = "250";
			}else{
				 codeFieldSize = "100";
			}
		}
		if(textFieldSize == null || textFieldSize.equals("")){
			if(cls.equals("member")){
				textFieldSize = "100";
			}else if(cls.equals("depart")){
				textFieldSize = "120";
			}else if(cls.equals("ntn")){
				textFieldSize = "100";
			}else if(cls.equals("post")){
				textFieldSize = "50";
			}else{
				textFieldSize = "220";
			}
		}
//			if(cls.equals("member")){
//				width="900"; 
//				height="650";
//				if(codeFieldSize.equals("")) codeFieldSize = "50";
//				if(textFieldSize.equals("")) textFieldSize = "100";
//			}else if(cls.equals("depart")){
//				width="400";  
//				height="600";
//				if(codeFieldSize.equals("")) codeFieldSize = "50";
//				if(textFieldSize.equals("")) textFieldSize = "120";
//			}else if(cls.equals("ntn")){
//				width="500";  
//				height="600";
//				if(codeFieldSize.equals("")) codeFieldSize = "50";
//				if(textFieldSize.equals("")) textFieldSize = "100";
//			}else if(cls.equals("post")){
//				width="570";  
//				height="700";
//				if(codeFieldSize.equals("")) codeFieldSize = "250";
//				if(textFieldSize.equals("")) textFieldSize = "50";
//			}else{
//				if(width.equals("")) width="600";  
//				if(height.equals("")) height="600";
//				if(codeFieldSize.equals("")) codeFieldSize = "50";
//				if(textFieldSize.equals("")) textFieldSize = "120";
//			}
			
	}
	
	 
	@Override
	public void release() {
		url = "";
		id	= "";
		cls = "";
		type = "";
		disabled	= "";
		defaultValue = "";
		callback = "";
		codeFieldName = ""; 
		textFieldName = ""; 
		codeFieldSize = ""; 
		textFieldSize = ""; 
		codeTargetName="";
		textTargetName="";
		funcname = "";
		eventType = "";
		codeView = false;
		width = "";
		height = "";
		params = "";
		codeValidate = "";
		textValidate = "";
	}

}