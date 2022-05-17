package applications.taglib.tag;

import infrastructure.context.AppContext;
import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.inheritance.model.enumeration.CommonClsDataAdaptor;
import infrastructure.inheritance.model.enumeration.CommonClsDataStatic;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import applications.code.CodeDAOImpl;

@SuppressWarnings("serial")
public class RadioTag extends TagSupport {
	protected   Logger logger = LogManager.getLogger(TagSupport.class);
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
	String defaultText = "전체";
	String defaultValue = null;
	String linked = "";//여러개의 선행오브젝트를 참조하는 경우 OBJECT,OBJEC2..형태로 설정 //반드시 Ajax 일때만 사용 
	
	List dataArray  = new ArrayList();
	String dataLabelField ="LABEL"; 
	String dataCodeField ="DATA";
//	String conflicted = "false";
//	String autoComplete = "";//자동검색이 필요한 경우 input box의 id
	String wrapperCss ="";
	String wrapperClass  ="";
	
	
	//반드시 기입 // default fixed
	String type ="";
	String daoName="";
	//fixed , array, load, linked
	
	
	
	public void setCssClass(String cssClass) {
		this.cssClass = cssClass;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setOut(JspWriter out) {
		this.out = out;
	}

	public void setData(String[][] data) {
		this.data = data;
	}

	public void setCls(String cls) {
		this.cls = cls;
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

	public void setSelected(String selected) {
		this.selected = selected;
	}

	public void setScript(String script) {
		this.script = " onClick=\""+script+"\"";
	}

	public void setCss(String css) {
		this.css = css;
	}

	public void setDisabled(String disabled) {
		if(disabled != null && disabled.toLowerCase().equals("true")){
			this.disabled = " disabled";
		}
	}

	public void setDefaultText(String defaultText) {
		this.defaultText = defaultText;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public void setLinked(String linked) {
		this.linked = linked;
	}

	public void setDataArray(List dataArray) {
		this.dataArray = dataArray;
	}

	public void setDataLabelField(String dataLabelField) {
		this.dataLabelField = dataLabelField;
	}

	public void setDataCodeField(String dataCodeField) {
		this.dataCodeField = dataCodeField;
	}

	public void setWrapperCss(String wrapperCss) {
		this.wrapperCss = wrapperCss;
	}

	public void setWrapperClass(String wrapperClass) {
		this.wrapperClass = wrapperClass;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setDaoName(String daoName) {
		this.daoName = daoName;
	}
	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	//@Override
	public int doEndTag() throws JspException {
		try {
			//out
			out = pageContext.getOut();
			//ctxPath
			HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
			String ctxPath = req.getContextPath();
			
			if(!type.equals("linked")){
				getCode();
				
				out.println("<div id=\""+id+"_wrapper\" style=\"display:inline-block;"+wrapperCss+"\" class=\""+wrapperClass+"\" > ");
				
				if(data != null && data.length > 0)
				{
					if(defaultValue != null ){
					out.print("<input type=\"radio\" id=\""+id+"_default\" name="+id+" value=\""+defaultValue+"\" "+(defaultValue.equals(selected) ? "checked":"")+" class=\""+cssClass+"\" style =\"vertical-align: middle;"+(css != null ? css :"")+"\"  "+script+">"
					+"<label for=\""+id+"_default\">"+defaultText+"</label>");  
					 
					}
					for (int i = 0; i < data.length; i++) {
						String cd = (String)data[i][0];
						String nm = (String)data[i][1];			 
						if( nm != null && cd != null){
							out.print("<input type=\"radio\" id="+id+"_"+(i+1)+" name="+id+" "+(selected.equals(cd) ? "checked":"")+"  value=\""+cd+"\" class=\""+cssClass+"\" style =\"vertical-align: middle;"+(css != null ? css :"")+"\"");
							out.print(script);
							out.print(disabled);
//							if(selected == null) selected = "";
//							if (selected.equals(cd)) {
//								out.println(" checked>"+nm);
//							}else{
								out.println(" >"+
								"<label for=\""+id+"_"+(i+1)+"\">"+nm+"</label>");
								
//							}
						}
					}
				}else{
				}
				out.println("</div>");
			}else{
			
				/**
				 * JQeury Script
				 */
				out.println("<script type=\"text/javascript\">");
				out.println("$(document).ready(function(){");
				
					// 데이터 가져오기
					out.println("$.ajax({");
					out.println("type:\"POST\",");
					out.println("url:\""+ctxPath+"/common/code/code.ajax\",");
					out.println("dataType:\"json\",");
					out.println("data:\"CLS="+cls + "&" +params+"\",");//cls='CX0001', params ='CD_ID=CX0001&USE_YN=1'
					out.println("success:function(data){");
					out.println("$(data).each(function(i, code){");
					out.println("var cd = code.DATA;");
					out.println("var nm = code.LABEL;");
					//selected
					if(selected == null) selected = "";
					out.println("if(cd == \""+selected+"\"){");
					String selector = id; 
					if(id.contains(".")) selector =id.replace(".","\\\\.");
							
					out.println("$(\"#"+selector+"_wrapper\").append(\"<input type='radio' id='"+id+"' name='"+id+"' value='\"+cd+\"'"+script+css+disabled+" checked/>\"+nm+\"&nbsp; \");");
					out.println("}else{");
					out.println("$(\"#"+selector+"_wrapper\").append(\"<input type='radio' id='"+id+"' name='"+id+"' value='\"+cd+\"'"+script+css+disabled+"/>\"+nm+\"&nbsp; \"); ");
					out.println("}");
		
					out.println("});");
					out.println("},");
					out.println("error:function(e){alert(e.responseText);}");
					out.println("});");
				out.println("});");	//end script
				out.println("</script>");
				/**
				 * Html Tag
				 */
//				if(width != null && !width.equals("")){
//					out.println("<div id=\""+id+"_wrapper\" style=\"width:"+width+";\">");
//				}else{
					out.println("<div id=\""+id+"_wrapper\" style=\""+wrapperCss+"\" class=\""+wrapperClass+"\" > ");
					
//				}
				
				//defaultText & defaultValue
				if(this.defaultText == null || this.defaultText.equals("")){
					//사용자가 명시적으로 defaultText = ""이라고 지정한 경우
				}else{
					out.print("<input type=\"radio\" id=\""+id+"\" name=\""+id+"\" value=\""+defaultValue+"\"");
					out.print(script);
					out.print(css);
					out.print(disabled);
					if(selected == null) selected = "";
					if (selected.equals(defaultValue)) {
						out.println(" checked>"+defaultText);
					}else{
						out.println(" >"+defaultText);
					}
				}
				out.println("</div>");
				//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
			}
			release();
		} catch (IOException e) {
			throw new JspException("[RadioTag]-[doEndTag]: " + e.getMessage());
		}		
		return EVAL_PAGE;
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
			adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
			
			try {
				dataArray = adao.list(daoName.substring(0,daoName.lastIndexOf(".")), daoName.substring(daoName.lastIndexOf(".")+1), params);
			} catch (Exception e) {
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
							}
						}
					}else{
						hasContain = true;
					}					
				}else {
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
	
	@Override
	public void release() {
		id 		 		= "";
		cls 	 		= "";
		params      	= new HashMap();
		selected 		= "";
		script   		= "";
		css 	 		= "";
		cssClass	 	= "";
		disabled 		= "";
		defaultText  	= "전체";
		defaultValue 	= null;
		linked       	= "";
		dataLabelField 	= "LABEL"; 
		dataCodeField 	= "DATA";
	}
}