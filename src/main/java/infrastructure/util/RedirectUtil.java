package infrastructure.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class RedirectUtil {
    /**
     * Redirect용 - history.back();
     * 다운로드 등에서 실패시 메세지를 표시하고 이전페이지로 돌아간다.
     * message내용 중 줄바꿈 시 : \\r\\n\\r\\n
     */
    public static void historyBack(HttpServletRequest req, 
    		                       HttpServletResponse res, 
    		                       String message) throws IOException {
        res.setContentType("text/html; charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println("<html>");
        out.println("<script type=\"text/javascript\">");
        out.println("function doBack(){");
        if(message != null && !message.trim().equals("")){
            out.println("alert(\""+message+"\");");
        }
        out.println("history.back();");
        out.println("}</script>");
        out.println("<body onload=\"doBack();\">");
        out.println("</body></html>");
        out.flush();
    }  
    /**
     * JQuery(Ajax)시 에러메세지만 JQuery에 전달
     * <b>요약</b>
     * @param req
     * @param res
     * @param message
     * @throws IOException
     * 
     *  message내용 중 줄바꿈 시 : \r\n\r\n
     */
    public static void onlyMessage(HttpServletRequest req, 
            HttpServletResponse res, 
            String message) throws IOException {
    	res.setContentType("text/html; charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println(message);
        out.flush();
    }
}
