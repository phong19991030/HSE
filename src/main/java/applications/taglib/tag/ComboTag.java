package applications.taglib.tag;

import infrastructure.context.AppContext;
import infrastructure.exception.SystemException;
import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.inheritance.model.enumeration.CommonClsDataAdaptor;
import infrastructure.inheritance.model.enumeration.CommonClsDataStatic;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.i18n.LocaleContextHolder;

import applications.code.CodeDAOImpl;

@SuppressWarnings("serial")
public class ComboTag extends TagSupport {
	protected  Logger logger = LogManager.getLogger(TagSupport.class);	
	JspWriter out;
	String[][] data;
	int i = 0;

	String id 		= "";
	String cls 	    = "";//Combo종류 - CATN0020|OFFICE
	Map params   = new HashMap();//파라미터 ex)CD_ID=CX0001&USE_YN=1
	String selected = "";
	String script 	= "";
	String css 		= "";
	String cssClass = "";
//	String style = ""; //
	String disabled	= "";
	boolean oneline = false;
	String defaultText = "::전체::";
	String defaultValue = null;
	String linked = "";//여러개의 선행오브젝트를 참조하는 경우 OBJECT,OBJEC2..형태로 설정 //반드시 Ajax 일때만 사용 
	
	List dataArray  = new ArrayList();
	String dataLabelField ="LABEL"; 
	String dataCodeField ="DATA";
//	String conflicted = "false";
//	String autoComplete = "";//자동검색이 필요한 경우 input box의 id
	 
	
	
	
	//반드시 기입 // default fixed
	String type ="";
	String daoName="";
	//fixed , array, load, linked
	
	
	
	
	public void setDataArray(List value) {
		this.dataArray = value;
	}
	public void setCssClass(String cssClass) {
		//this.cssClass = cssClass;
		this.cssClass = " class=\""+cssClass+"\"";
	}
	public void setDaoName(String daoName) {
		this.daoName = daoName;
	}
	public void setDataLabelField(String dataLabelField) {
		this.dataLabelField = dataLabelField;
	}
	public void setDataCodeField(String dataCodeField) {
		this.dataCodeField = dataCodeField;
	}
	public void setType(String type) {
		this.type = type;
	}
	public void setAjax(String value) {
		this.type = value;
	}
	public void setId(String value) {
		this.id = value;
	}
	public void setCls(String value) {
		this.cls = value;
	}
	public void setOneline(String value) {
		if(value != null && value.toLowerCase().equals("true")){
			this.oneline = true;
		}
	}
	public void setParams(String value) {
		Map paramMap = new HashMap();
		List list= new ArrayList();
		
		if(value != null && !value.equals("")){
			for(String str : value.split("&")){
				String[] array = str.split("=");
				// key = value1, value2, value3, .. 일 경우
				if(array[1].contains(",")){
					for(String strs : array[1].split(",")){
						list.add(strs);
					}
					paramMap.put(array[0],list);
				}
				// key = value1일 경우
				else{
					paramMap.put(array[0],array[1]);
				}
			}
		}
		this.params = paramMap;
	}
	public void setSelected(String value) {
		this.selected = value;
	}
	public void setScript(String value) {
		this.script = " onChange =\"" + value + "\"";
	}
	public void setCss(String value) {
		this.css = " style=\""+value+"\"";
	}
	public void setDisabled(String value) {
		if(value != null && value.toLowerCase().equals("true")){
			this.disabled = " disabled=\"disabled\" ";
		}
	}
	public void setDefaultText(String value) {
		this.defaultText = value;
	}
	public void setDefaultValue(String value) {
		this.defaultValue = value;
	}
	public void setLinked(String value){
		this.linked = value;
	}
//	public void setConflicted(String value){
//		this.conflicted = value;
//	}
//	public void setAutoComplete(String value){
//		this.autoComplete = value;
//	}

	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	@Override
	public int doEndTag() throws JspException, SystemException {
		try {
			//out
			out = pageContext.getOut();
			//ctxPath
			HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
			String ctxPath = req.getContextPath();
			
			//defaultText & defaultValue
			String defaultOption = "";
			if(this.defaultValue != null){ 
				defaultOption = "<option value=\""+defaultValue+"\">"+defaultText+"</option>";
			}
		
			
			if(!type.equals("linked")){
				getCode();
				
				out.print("<select id=\""+id+"\" name=\""+id+"\" class=\"info-select\"");
				out.print(script);
				out.print(css);
				out.print(cssClass);
				out.print(disabled);
				printToOutput(">");
				printToOutput(defaultOption);
				
				if(data != null && data.length > 0)
				{
					for (int i = 0; i < data.length; i++) {
						String cd = (String)data[i][0];
						String nm = (String)data[i][1];	
						if(nm !=null && cd !=null){
							if(selected == null) selected = "";
							if (selected.equals(cd)) {
								printToOutput("<option value=\""+cd+"\" selected>"+nm+"</option>");
							}else{
								printToOutput("<option value=\""+cd+"\">"+nm+"</option>");
							}
						}
					}
				}else{
					printToOutput("<option value=\"-1\">데이터가 없습니다.</option>");
				}
				printToOutput("</select>");
			}else{
				getCode();
				
				//***************************
				//** JQeury Script
				//***************************
				printToOutput("<script type=\"text/javascript\">");
				printToOutput("$(document).ready(function(){");
				
				// autoComplete - array선언
//				if(autoComplete != null && !autoComplete.equals("")){printToOutput("var availableTags_"+id+" = new Array();");}
				
				// 데이터 가져오기
				printToOutput("function getComboData_"+id+"(){");
					printToOutput("$.ajax({");
					printToOutput("async:false,");
					printToOutput("type:\"POST\",");
					printToOutput("url:\""+ctxPath+"/common/code/code.ajax\",");
					printToOutput("dataType:\"json\",");
					if(linked != null && !linked.equals("")){					
						String[] linkes = linked.split(",");

						if(linkes.length == 1){
							//1개인 경우 : OBJECT -> "&LINKED=" + $(\"#OBJECT\").val()
							printToOutput("data:\"CLS="+cls + "&" +params+ "&"+linked+"=\"+ $(\"#"+linked+"\").val(),");
						}else{
							//여러개인 경우 : OBJECT, OBJECT2 .. -> "&LINKED=" + $(\"#OBJECT\").val() + "&LINKED2=" + $(\"#OBJECT2\").val() ...
							out.print("data:\"CLS="+cls + "&" +params+ "&"+linkes[0]+"=\"+ $(\"#"+linkes[0]+"\").val()");
							for(i = 1;i < linkes.length;i++){
								out.print("+\"&"+linkes[i]+"=\"+ $(\"#"+linkes[i]+"\").val()");
							}
							printToOutput(",");
						}
					}else{
						printToOutput("data:\"CLS="+cls + "&" +params+"\",");//cls=\"CX0001\", params =\"CD_ID=CX0001&USE_YN=1\"
					}
					printToOutput("success:function(data){");
					printToOutput("$(data).each(function(i, code){");
					printToOutput("var cd = code.DATA;");
					printToOutput("var nm = code.LABEL;");
					
					//selected
					//if(selected == null) selected = "";
					printToOutput("if(cd == \""+selected+"\"){");
					printToOutput("$(\"#"+id+"\").append(\"<option value=\"\"+cd+\"\" selected>\"+nm+\"</option>\");");
					//change이벤트 전파 - selected값이 주어진 경우 하위 combo의 값을 세팅해주기 위해 change이벤트를 발생시켜준다.
					printToOutput("$(\"#"+id+"\").change();");
					
					printToOutput("}else{");
					printToOutput("$(\"#"+id+"\").append(\"<option value=\"\"+cd+\"\">\"+nm+\"</option>\");");
					printToOutput("}");

					printToOutput("});");
					printToOutput("},");
					printToOutput("error:function(e){alert(e.responseText);}");
					printToOutput("});");
				printToOutput("}");
				printToOutput("getComboData_"+id+"();");	
				printToOutput("});");	
				printToOutput("</script>");
				
				//***************************
				//** Html Tag
				//***************************
				out.print("<select id=\"" + id + "\" name=\"" + id + "\"");
				out.print(script);
				out.print(css);
				out.print(cssClass);
				out.print(disabled);
				printToOutput(">");
				printToOutput(defaultOption);
				printToOutput("</select>");
				
				
				
			}
			
			
		} catch (IOException e) {
			throw new JspException("[ComboTag]-[doEndTag]: " + e.getMessage());
		}	
		
		
		
		
		
		
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	
	private void printToOutput(String text) throws IOException{
		//JspWriter out;
		if(oneline) {
			out.print(text);	
		} else {
			out.println(text);
		}
		
	}
	
	/**
	 * 고정 데이터
	 */
	private void getCode(){
		List list = CommonClsDataStatic.YN.getList();
		String jsonStr = CommonClsDataStatic.YN.getJson();
		for(Map obj : (List<Map>)list){
			obj.get(dataCodeField);
			obj.get(dataLabelField);
		}
		
		if(type.equals("fixed")){
			//CommonClsDataAdaptor
			CommonClsDataAdaptor ccda = new CommonClsDataAdaptor();
			dataArray = (List) ccda.getData(cls, params).get("list");
			
			generateList();
		}else if(type.equals("array")){
			generateList();
		}else if(type.equals("load")){
			AbstractDAO adao = new CodeDAOImpl();
//			CodeDAOImpl adao;
			adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));

			
//			Map paramMap = new HashMap();
//			if(params != null && !params.equals("")){
//				for(String str : params.split("&")){
//					String[] array = str.split("=");
//					paramMap.put(array[0],array[1]);
//				}
//			}
			try {
				// ndq 18.08.14: Add language parameter
				 Locale locale = LocaleContextHolder.getLocale();
				 if (locale != null) {
					 params.put("LANG_CODE", locale.getLanguage());
				 }
				dataArray = adao.list(daoName.substring(0,daoName.lastIndexOf(".")), daoName.substring(daoName.lastIndexOf(".")+1), params);
//				dataArray = adao.list("common.code.Code", "commCode", paramMap);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			}
			
			generateList();
		}else{
			
		}
		
	}
	
	private void generateList(){
		int idx = 0;
		data = new String[dataArray.size()][2];
		boolean hasContain;
		
		for(Map map : (List<Map>)dataArray){
			hasContain = false;
			if(map != null){
				if(!type.equals("fixed")){
					if(params != null && params.size() > 0){
						String val ;
						Object paramValue ;
						for (Map.Entry<String, Object> entry : ((Map<String, Object>) params) .entrySet()) {
		//					((String)(map.get(entry.getKey())))
							val = ((String)(map.get(entry.getKey())));
							paramValue = (entry.getValue());
							if(val != null){
								// key = value1, value2, value3, .. 일 경우
								if(paramValue instanceof List){
									for(String tmp : (List<String>) paramValue){
										if(val.equals(tmp)){  
											hasContain = true;
										}
									}
								}
								// key = value1 일 경우
								else{
									if(val.equals(paramValue)){  
										hasContain = true;
									}
								}
							} else if (entry.getKey().equals("LANG_CODE")) {
								hasContain = true;
							}
						}
					} else {
						hasContain = true;
					}
				} else {
					hasContain = true;
				}
			}
			if(hasContain){
				data[idx][0] = (String) map.get(dataCodeField);
				data[idx][1] = (String) map.get(dataLabelField);
			}
			idx++;
		}
	}
	
	// 이전 것
	/*@Override
	public int doEndTag() throws JspException, SystemException {
		try {
			//out
			out = pageContext.getOut();
			//ctxPath
			HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
			String ctxPath = req.getContextPath();
			
			//defaultText & defaultValue
			String defaultOption = "";
			if(this.defaultText == null || this.defaultText.equals("")){
				defaultOption = "";//사용자가 명시적으로 defaultText = ""이라고 지정한 경우
			}else{
				defaultOption = "<option value=\""+defaultValue+"\">"+defaultText+"</option>";
			}
			//***************************
			//** JQeury Script
			//***************************
			out.println("<script type=\"text/javascript\">");
			out.println("$(document).ready(function(){");
			
			// autoComplete - array선언
			if(autoComplete != null && !autoComplete.equals("")){out.println("var availableTags_"+id+" = new Array();");}
			
			// 데이터 가져오기
			out.println("function getComboData_"+id+"(){");
				out.println("$.ajax({");
				out.println("type:\"POST\",");
				out.println("url:\""+ctxPath+"/common/code/code.ajax\",");
				out.println("dataType:\"json\",");
				if(linked != null && !linked.equals("")){					
					String[] linkes = linked.split(",");

					if(linkes.length == 1){
						//1개인 경우 : OBJECT -> "&LINKED=" + $(\"#OBJECT\").val()
						out.println("data:\"CLS="+cls + "&" +params+ "&"+linked+"=\"+ $(\"#"+linked+"\").val(),");
					}else{
						//여러개인 경우 : OBJECT, OBJECT2 .. -> "&LINKED=" + $(\"#OBJECT\").val() + "&LINKED2=" + $(\"#OBJECT2\").val() ...
						out.print("data:\"CLS="+cls + "&" +params+ "&"+linkes[0]+"=\"+ $(\"#"+linkes[0]+"\").val()");
						for(i = 1;i < linkes.length;i++){
							out.print("+\"&"+linkes[i]+"=\"+ $(\"#"+linkes[i]+"\").val()");
						}
						out.println(",");
					}
				}else{
					out.println("data:\"CLS="+cls + "&" +params+"\",");//cls=\"CX0001\", params =\"CD_ID=CX0001&USE_YN=1\"
				}
				out.println("success:function(data){");
				out.println("$(data).each(function(i, cbo){");
				out.println("var cd = cbo.CD;");
				out.println("var nm = cbo.NM;");
				
				//autoComplete - array에 값 세팅
				if(autoComplete != null && !autoComplete.equals("")){out.println("availableTags_"+id+".push(nm);");}
				
				//######### 접속한 사용자의 소속정보를 콤보로 만든다.
				HttpSession session = pageContext.getSession();
				Map map_Selected = (Map)session.getAttribute("SESS_USER");
				// 콤보데이터 세팅
				if("".equals(selected)){
					if("HDQR_CD".equals(id)){
						selected = (String)map_Selected.get("SESS_HDQR_CD");
					}else if("PWR_OFFICECD".equals(id)){
						selected = (String)map_Selected.get("SESS_PWR_OFFICECD");
					}else if("JURIS_OFFICECD".equals(id)){
						selected = (String)map_Selected.get("SESS_JURIS_OFFICECD");
					}else if("SUBST_CD".equals(id)){
						selected = (String)map_Selected.get("SESS_SUBST_CD");
					}
				}
				
				//selected
				//if(selected == null) selected = "";
				out.println("if(cd == \""+selected+"\"){");
				out.println("$(\"#"+id+"\").append(\"<option value=\"\"+cd+\"\" selected>\"+nm+\"</option>\");");
				//change이벤트 전파 - selected값이 주어진 경우 하위 combo의 값을 세팅해주기 위해 change이벤트를 발생시켜준다.
				out.println("$(\"#"+id+"\").change();");
				
				out.println("}else{");
				out.println("$(\"#"+id+"\").append(\"<option value=\"\"+cd+\"\">\"+nm+\"</option>\");");
				out.println("}");

				out.println("});");
				out.println("},");
				out.println("error:function(e){alert(e.responseText);}");
				out.println("});");
			out.println("}");
			
			//autoComplete - 자동검색 실행
			if(autoComplete != null && !autoComplete.equals("")){				
				out.println("$(\"#"+autoComplete+"\").autocomplete({");
				out.println("	source: availableTags_"+id+",");
				out.println("	close: function(event, ui){");
				out.println("		$(\"#"+id+" option\").filter(function(){return this.text == $(\"#"+autoComplete+"\").val();}).attr(\"selected\", true);");
				out.println("		$(\"#"+autoComplete+"\").val(\"\");");
				out.println("		$(\"#"+id+"\").change();");
				out.println("	}");
				out.println("});");
			}			
			//linked에 따라 초기화 실행
			if(linked == null || linked.equals("")){
				out.println("getComboData_"+id+"();");
			}else{
				String[] linkes = linked.split(",");
				//Linked 콤보박스에 bind 
				for(i = 0;i < linkes.length;i++){
					out.println("$(\"#"+linkes[i]+"\").bind(\"change\", \""+linkes[i]+"\", initCombo_"+id+");");//bind(\"eventType\", [eventData,] handler)
				}
				
				//초기화 및 데이터 가져오기
				out.println("function initCombo_"+id+"(event){");
				//out.println("alert(event.target);");
				//out.println("alert(event.data);");
					//초기화
					out.println("$(\"#"+id+"\").find(\"option\").remove().end().append(\""+defaultOption+"\");");
					
					//값가져오기호출
					if(conflicted.equals("false")){//연결된 콤보가 서로 상충하지 않는 경우 각 콤보의 값을 모두 확인
						for(i = 0;i < linkes.length;i++){
							out.println("var linkedVal"+i+" = $(\"#"+linkes[i]+"\").val();");
						}
						
						//연결된 콤보가 유효한 값을 선택한 경우에만
						out.print("if(");
						for(i = 0;i < linkes.length;i++){
							if(i == 0) out.print("(linkedVal"+i+" != null && linkedVal"+i+" != \"\")");
							else out.print(" && (linkedVal"+i+" != null && linkedVal"+i+" != \"\")");
						}
						out.println("){");
							out.println("getComboData_"+id+"();");
						out.println("}");
					}else{//연결된 콤보가 서로 상충되는 경우 현재 변경된 콤보 값만 확인 하고 상충 콤보는 선택을 초기화 한다.
						for(i = 0;i < linkes.length;i++){
							out.println("if(event.data != \""+linkes[i]+"\"){");
								out.println("$(\"#"+linkes[i]+" option:eq(0)\").attr(\"selected\",\"selected\");");//상충 콤보 index=0선택
							out.println("}");
						}
						
						out.println("var linkedVal = $(\"#\"+ event.data).val();");
						out.println("if(linkedVal != null && linkedVal != \"\") {getComboData_"+id+"();}");
						
					}
					//change이벤트 전파
					out.println("$(\"#"+id+"\").change();");
				out.println("}");
			}
						
			out.println("});");		
			
			
			out.println("</script>");
			
			//***************************
			//** Html Tag
			//***************************
			out.print("<select id=\"" + id + "\" name=\"" + id + "\"");
			out.print(script);
			out.print(css);
			out.print(disabled);
			out.println(">");
			out.println(defaultOption);
			out.println("</select>");
			
			//autoComplete - 자동검색 input box추가
			if(autoComplete != null && !autoComplete.equals("")){
				out.println("<input type=\"text\" id=\""+autoComplete+"\"/>");
			}
		} catch (IOException e) {
			throw new JspException("[ComboTag]-[doEndTag]: " + e.getMessage());
		}	
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}*/
	
	@Override
	public void release() {
		id 		     	= "";
		cls 	     	= "";
		params       	= new HashMap();
		selected     	= "";
		script 	     	= "";
		css 		 	= "";
		cssClass	 	= "";
		disabled	 	= "";
		defaultText  	= "::전체::";
		defaultValue 	= null;
		linked       	= "";
		dataLabelField 	= "LABEL"; 
		dataCodeField 	= "DATA";
		oneline			= false;
	}
}