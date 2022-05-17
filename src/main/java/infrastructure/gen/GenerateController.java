package infrastructure.gen;

import infrastructure.context.AppContext;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import infrastructure.util.ResourceUtil;

import java.lang.reflect.Method;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.InternalResourceView;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
/**
 * @author A2M-moon
 *
 */
@Controller("genController")
@RequestMapping("/generate")
public class GenerateController extends BaseController {

	/**
	 * 기능명 
	 * @작성일    : 2016. 5. 30. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO 
	 */
	@RequestMapping("/list")
	public void getList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		/**
		 * ModelAndView
		 */
//		ModelAndView mav = new ModelAndView();
		String str ="";
		
//		ResourceUtil rutil = new ResourceUtil();
		
			str= ResourceUtil.getMessage("message",(String) parameter.get("msg"));
//			str = ResourceUtil.getMessages((String) parameter.get("msg"));
			
//		org.springframework.web.servlet.view.InternalResourceViewResolver	
			
		InternalResourceViewResolver  resolver = new org.springframework.web.servlet.view.InternalResourceViewResolver();
		resolver.setViewNames("test");
		resolver.setPrefix("/WEB-INF/classes/generator/view/");  
        resolver.setSuffix(".jsp");
        resolver.setCache(false);
        resolver.setViewClass(JstlView.class);  
        
//        PrivateObject privateObject = new PrivateObject("The Private Value");
        resolver.setApplicationContext(AppContext.getApplicationContext());

        Method privateStringMethod = UrlBasedViewResolver.class.
                getDeclaredMethod("buildView", String.class,Locale.class);
        privateStringMethod.setAccessible(true);

		InternalResourceView  viewCu = (InternalResourceView)privateStringMethod.invoke(resolver,"/WEB-INF/classes/generator/view/test",new Locale("ko", "KR"));
        System.out.println("returnValue = " + viewCu);
//        viewCu.
//        buildView
        
        
//        @Override
//    	protected View loadView(String viewName, Locale locale) throws Exception {
//    		AbstractUrlBasedView view = buildView(viewName);
//    		View result = applyLifecycleMethods(viewName, view);
//    		return (view.checkResource(locale) ? result : null);
//    	}

//		return mav;
		
//		PrintWriter out = response.getWriter();
	}
}
