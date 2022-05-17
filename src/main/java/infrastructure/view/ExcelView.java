package infrastructure.view;

import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

@Deprecated
public class ExcelView extends AbstractView {
 
	public ExcelView(){
		super.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8");
	}
 
	@Override
	protected void renderMergedOutputModel(Map parameter, HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		response.setContentType(this.getContentType());
		response.setHeader("Content-Description", "Servlet Generated Data");
		response.setHeader("Content-Disposition", "attachment;filename=\""+ URLEncoder.encode((String)parameter.get("fileName"),"UTF-8") +"\";");
//		response.setHeader("Content-Disposition", "attachment;filename=\""+ URLEncoder.encode((String)parameter.get("fileName"),"EUC-KR") +"\";");
		response.setHeader("Pragma", "no-cache");
		PrintWriter out = response.getWriter();
		out.println("<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\">");
		out.println("<head>");
		out.println("<meta http-equiv=\"Content-Type\" content=\"application/vnd.ms-excel; charset=utf-8\" />");
		out.println("</head>");
		out.println("<body>");
		out.println(parameter.get("excelData"));
		out.println("</body>");
		out.println("</html>");
		out.flush();
	}
}