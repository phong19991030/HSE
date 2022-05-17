package applications.pdt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.renjin.script.RenjinScriptEngine;
//import org.renjin.sexp.Vector;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import org.rosuda.REngine.Rserve.RConnection;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import org.apache.commons.lang.ArrayUtils;

/**
 * @Description : prediction
 * @author : anhpv
 * @since : 2021.04.22
 * @Modification
 */
@Controller("Pdt_0301Controller")
@RequestMapping("/pdt/pdt_0301")
public class Pdt_0301Controller extends BaseController {

	/**
	 * 공지사항 목록 화면
	 * 
	 * @category view
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
//		Map<?, ?> parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("pdt/pdt_0301");
		return mav;
	}


}
