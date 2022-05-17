package infrastructure.aop;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller Inspector 
 * @작성일    : 2016. 4. 19. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 * 현재사용안함 - 2016.09.28
 * 
 */
public class LoggingAspector implements HandlerInterceptor {
	
	protected Logger logger = LogManager.getLogger("LoggingAspector");
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
//	Marker marker = new 
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {

		String className = handler.getClass().getName();
		String reqUri = request.getRequestURI();
		if(reqUri !=null)
			logger.info("=============  <START > - ("+reqUri+")");
		return true;
	}
	
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		if(modelAndView != null){
			logger.info("=============  <VIEW > - ("+modelAndView.getViewName()+")");
		}
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		String className = handler.getClass().getName();
		
		String reqUri = request.getRequestURI();
		if(ex != null){
			//System.out.println("[C]["+sdf.format(new Date())+"] Exception Occured : " + ex.getMessage());
			logger.info(ex.getStackTrace()[0].getClassName() + "." + ex.getStackTrace()[0].getMethodName() + " => " + ex.getClass().getName() + "\n" + " [ Cause ] : " + ex.getMessage());
			logger.error(ex);
		}
		
		if(reqUri !=null)
			logger.info("=============  <END > - ("+reqUri+")");
		System.out.println("\n");
	}
	public void logging(ProceedingJoinPoint joinPoint) throws Exception{
		System.out.println("pointcut");
	}
	
	public void loggingaa(JoinPoint joinPoint) throws Exception{
		System.out.println("pointcut : "+joinPoint.getTarget());
	}
}
