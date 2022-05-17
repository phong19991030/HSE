package applications.mail;

import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import infrastructure.context.AppContext;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import java.io.*;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class InternalRenderer {

    private final static String ENCODE = "UTF-8";

  
    
    
    
    private ViewResolver jspViewResolver  ; 
    
    public InternalRenderer() {
		// TODO Auto-generated constructor stub
//    	jspViewResolver = (ViewResolver) AppContext.getApplicationContext().getBean("jspViewResolver");
	}
    
    

    public void setViewResolver(ViewResolver viewResolver) {
        this.jspViewResolver = viewResolver;
    }

    public String evalView(HttpServletRequest request, HttpServletResponse response, Map model, Locale locale, String viewName) throws Exception {
    	ApplicationContext ctx = (ApplicationContext) AppContext.getApplicationContext();
    	jspViewResolver = (ViewResolver) AppContext.getApplicationContext().getBean("mailViewResolver");
    	
    	CustomHttpServletResponse customResponse = new CustomHttpServletResponse(response);
        View view = jspViewResolver.resolveViewName(viewName, locale);
        if(view != null){
            view.render(model, request, customResponse);
            OutputStream os = customResponse.getOutputStream();
            return os.toString();
        }
        throw new Exception("no view found");
    }

    class CustomServletOutPutStream extends ServletOutputStream {

        private StringBuilder stringBuilder = new StringBuilder();

        @Override
        public String toString() {
            return stringBuilder.toString();
        }

        @Override
        public void write(int b) {
            stringBuilder.append(b);
        }

        @Override
        public void write(byte b[], int off, int len) throws IOException {
            stringBuilder.append(new String(b, off, len, ENCODE));
        }
    }

    class CustomHttpServletResponse extends HttpServletResponseWrapper {

        private ServletOutputStream outputStream;
        private PrintWriter printWriter;

        public CustomHttpServletResponse(HttpServletResponse response) throws UnsupportedEncodingException {
            super(response);

            this.outputStream = new CustomServletOutPutStream();
            this.printWriter = new PrintWriter(new OutputStreamWriter(outputStream, ENCODE));
        }

        @Override
        public ServletOutputStream getOutputStream() {
            return this.outputStream;
        }

        @Override
        public PrintWriter getWriter() throws IOException {
            return this.printWriter;
        }
    }
}