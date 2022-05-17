package infrastructure.view;

import infrastructure.inheritance.model.defaultModel.DefaultModel;
import infrastructure.util.CastUtil;
import infrastructure.util.CommonUtil;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.web.servlet.view.AbstractView;

import applications.auth.BaseModel;

@Deprecated
public class JSONView extends AbstractView {
 
	public JSONView(){
		super.setContentType("application/json");
//		super.setContentType("text/plain");
	}
 
	@Override
	protected void renderMergedOutputModel(Map parameter, HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		String  browserDetails  =   request.getHeader("User-Agent");
        String  userAgent       =   browserDetails;
        String  user            =   userAgent.toLowerCase();
        String browser = "";
        float version = 0;
		/**
		 * RESULT_TYPE에 따라 처리
		 */
		String result_type = CastUtil.castToString(parameter.get("RESULT_TYPE"));
		String selId = CastUtil.castToString(parameter.get("SELID"));
		Object object = parameter.get("DATA");
		String contentsType = (String) parameter.get("type"); 
		/**
		 * Response Setting
		 */
		 if (user.contains("msie")|| user.contains("rv:11.0"))
	        {
			   if(user.contains("rv:11.0")){
	            	browser ="IE";
	            	//임시 테스트용 TO-DO
//	            	version=(float) 7.0;
	            	version=(float) 11.0;
	            			
	            }else{
		            String substring=userAgent.substring(userAgent.indexOf("MSIE")).split(";")[0];
		            browser=substring.split(" ")[0].replace("MSIE", "IE")+"-"+substring.split(" ")[1];
		            version = Float.parseFloat(substring.split(" ")[1]);
	            }
	        }
		
		// IE일때
		if(browser.indexOf("IE")>= 0){
			// IE 9 이하일때
			if( version <=9.0){
				// ContentType이 존재할때 String으로 - IE9에서는 Json 지원안하기 때문에
				if(contentsType !=null && !contentsType.equals("")){
					response.setContentType("text/plain");
//					response.setContentType(contentsType);
				}else{
					// null 처리를 위해 필요하다. - Json파입으로 인식시키기 위해서
					if(!(object instanceof String)){
//						response.setContentType(null);
						response.setContentType(this.getContentType());
					}else{
						response.setContentType("text/plain");
					}
//					response.setContentType(this.getContentType());
				}
//				response.setContentType(null);
			}else{ 
				// null 처리를 위해 필요하다. - Json파입으로 인식시키기 위해서
				if(!(object instanceof String)){
					response.setContentType(this.getContentType());
				}
				if(contentsType !=null && !contentsType.equals(""))
				{
					response.setContentType("text/plain");
				}
				this.getContentType();
//				response.setContentType(this.getContentType());
			}
		}else{
			// null 처리를 위해 필요하다. - Json파입으로 인식시키기 위해서
			if(!(object instanceof String)){
				response.setContentType(this.getContentType());
			}else{
				response.setContentType("text/plain");
			}
		}
		
		response.setCharacterEncoding("UTF-8");		
//		System.out.println(response.getContentType());
		//1.PrintWriter 
		PrintWriter out = response.getWriter();
		//2. RESULT_TYPE에 따라 분기
		if(result_type.equals("GRID")){
			List list = (List)parameter.get("DATA");
			if(list == null) list = new ArrayList();
			float pageSize = 10;
			int page = 1;
			int records = list.size();
	        int total = (int)Math.ceil((float)records / pageSize);
	        //
	        JSONObject json = new JSONObject();
			json.put("total", total + "");
			json.put("page", page + "");
			json.put("records", records + "");
			json.put("rows", list);
			out.write(json.toString());
		}else if(result_type.equals("PAGING_GRID")){
			List list = (List)parameter.get("DATA");
			if(list == null) list = new ArrayList();
			//페이징 정보를 Controller로 부터 받음
			int pageSize = Integer.parseInt(parameter.get("pageSize").toString());
			int page = Integer.parseInt(parameter.get("page").toString());
			int records = Integer.parseInt(parameter.get("records").toString());
	        int total = (int)Math.ceil((float)records / (float)pageSize);
	        //
	        JSONObject json = new JSONObject();
			json.put("total", total + "");
			json.put("page", page + "");
			json.put("records", records + "");
			json.put("rows", list);
			out.write(json.toString());
		}else{
			if(object instanceof List){
				JSONArray json = JSONArray.fromObject(parameter.get("DATA"));
				out.write(json.toString());
			}
//			else if(result_type.equals("LIST2")){
//				List list = (List)parameter.get("DATA");
//				List list2 = (List)parameter.get("DATA2");
//				if(list == null) list = new ArrayList();
//				if(list2 == null) list2 = new ArrayList();
//				
//				JSONObject json = new JSONObject();
//				json.put("data", list);
//				json.put("data2", list2);
//				out.write(json.toString());
//			}else if(result_type.equals("SUBLIST")){
//				JSONArray json = JSONArray.fromObject(parameter.get("DATA"));
//				json.add(0, selId);
//				out.write(json.toString());
//			}
			else if(object instanceof Map){
				JSONObject json = JSONObject.fromObject(parameter.get("DATA"));
				out.write(json.toString());
			}else if(object instanceof String){
				out.write((String)parameter.get("DATA"));
			}else if(object instanceof DefaultModel || object instanceof BaseModel){
				JSONObject json = JSONObject.fromObject(parameter.get("DATA"));
				out.write(json.toString());
//				구현 필요 object
//				SORT
			}
		}
		out.flush();
	}
}
