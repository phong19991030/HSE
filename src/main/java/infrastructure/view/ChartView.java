package infrastructure.view;

//import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
//import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.Part; //ibm websphere not found


//import org.apache.catalina.connector.ClientAbortException;//ibm websphere not found
import org.springframework.web.servlet.view.AbstractView;

@Deprecated
public class ChartView extends AbstractView {
 
 	//private static final long serialVersionUID = 1L;
	private static final String REQUEST_METHOD_POST = "POST";
	private static final String CONTENT_TYPE_MULTIPART = "multipart/";
	private static final String FORBIDDEN_WORD = "<!ENTITY";


	public ChartView(){}


	@Override
	protected void renderMergedOutputModel(Map<String, Object> arg0,
			HttpServletRequest arg1, HttpServletResponse arg2) throws Exception {
		// TODO Auto-generated method stub
		
	}
 

}
