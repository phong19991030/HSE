package infrastructure.exception;

import infrastructure.log.LoggingServiceImpl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

public class A2mExceptionHandler extends SimpleMappingExceptionResolver {
	
	@Override
	protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response,
			Object handler, Exception ex) {
		
		logger.error(ex);
	
		LoggingServiceImpl loggingService = new LoggingServiceImpl();
		
		loggingService.loggingSystemErrorInfo(request, response,ex);
		
//		String message = "";
//
//		for(StackTraceElement stackTraceElement : ex.getStackTrace()) {                         
//		    message = message + System.lineSeparator() + stackTraceElement.toString();
//		}   
//		logger.warn( message);

		response.setStatus(response.SC_SERVICE_UNAVAILABLE);
		
		// Expose ModelAndView for chosen error view.
		String viewName = determineViewName(ex, request);
		
		if (viewName != null) {
			// Apply HTTP status code for error views, if specified.
			// Only apply it if we're processing a top-level request.
			Integer statusCode = determineStatusCode(request, viewName);
			if (statusCode != null) {
				applyStatusCodeIfPossible(request, response, statusCode);
			}
			return getModelAndView(viewName, ex, request);
		}
		else {
			return null;
		}
	}
}
