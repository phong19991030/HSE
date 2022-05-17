package infrastructure.aop;

import infrastructure.log.LoggingServiceImpl;

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

public class LoggingControllerAspect implements HandlerInterceptor {

//	protected Logger logger = LogManager.getLogger("LoggingAspector");
	protected static Logger logger = LogManager.getLogger("LoggingAspector");
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
	
	/**
	 * 
	 * @Method : logging
	 * @Author : pjk
	 * @Date : Dec 30, 2020
	 * @param msg
	 * @Description : 보안 취약점에 의한 공통 logging 함수 추가  
	 */
	public static void exceptionLogging(Exception e) {
		logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {

		String className = handler.getClass().getName();
		String reqUri = request.getRequestURI();
		if(reqUri !=null)
			logger.info("=============  <START > - ("+reqUri+")");
		LoggingServiceImpl loggingService = new LoggingServiceImpl();
		loggingService.loggingMenuAccessInfo(request, response);
		
		/*
		 * # 응답 요청 헤더 관련(보안 취약점)
		 */
		// Content-Security-Policy
//		response.setHeader("Content-Security-Policy", "unsafe-inline");
		// X-Frame-Option
		response.setHeader("X-Frame-Options", "DENY");
		// X-Content-Type-Option
		response.setHeader("X-Content-Type-Options", "nosniff");
		// Strict-Transport-Security
		response.setHeader("Strict-Transport-Security", "max-age=31536000;includeSubDomains;preload");
		// X-XSS-Protection
		response.setHeader("X-XSS-Protection", "1;mode=block");
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
			HttpServletResponse response, Object handler, Exception ex) throws Exception {
		String className = handler.getClass().getName();
		
		String reqUri = request.getRequestURI();
		if(ex != null){
			//System.out.println("[C]["+sdf.format(new Date())+"] Exception Occured : " + ex.getMessage());
			logger.info(ex.getStackTrace()[0].getClassName() + "." + ex.getStackTrace()[0].getMethodName() + " => " + ex.getClass().getName() 
					+ "\n" + " [ Cause ] : " 
					+ ex.getMessage()
					+ "\n" + ex.getCause()
					+ "\n" + ex.getLocalizedMessage()
					+ "\n" + ex.getSuppressed()
					);
		}
		
		if(reqUri !=null) {
			LoggingServiceImpl loggingService = new LoggingServiceImpl();
			loggingService.loggingMenuAccess2(request, response);
			logger.info("=============  <END > - ("+reqUri+")");
		}
		System.out.println("\n");
	}
	public void logging(ProceedingJoinPoint joinPoint) throws Exception{
		System.out.println("pointcut");
	}
	
	public void loggingaa(JoinPoint joinPoint) throws Exception{
		System.out.println("pointcut : "+joinPoint.getTarget());
	}
}
