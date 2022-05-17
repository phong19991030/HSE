package applications.excel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.util.ModelAndViewUtil;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("excelController")
public class ExcelController{
	
	@Autowired
	private ExcelUploadComponent excelUpload;

	@RequestMapping("/excel/popupExcel.{path}")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		mav.addObject("POPUP", parameter);
		
	    mav.setViewName(path+":common/popup/popupExcel");
		return mav;
	}
	
	//excel download
	@RequestMapping("/excel/getExcel")
	public ModelAndView getExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam(value ="list") String  str) throws Exception {
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);

		/**
		 * Business Logic
		 */
		Object obj = null;
		JSONArray array= null;
		
		List list = new ArrayList();
		
		// List가 null인 경우(excel upload sample down)
		if(str != null && !str.equals("")){
			obj=JSONObject.fromObject(str);
			// 160601 취약점 발견 
//			array=(JSONArray)obj;
			array = JSONArray.fromObject(str);
			
			
			list = array;
		}
	    /**
		 * ModelAndView
		 */
		return ModelAndViewUtil.getModelAndView(request, response, parameter, list);
	}

	//excel upload
	@RequestMapping("/excel/setExcel")
	public ModelAndView setExcel(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		//System.out.println("parameter ===" + parameter);
		
		//List excelData = excelUpload.doUpload(request); 
		List excelData = excelUpload.doUpload(parameter); 
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", excelData);
		mav.addObject("type","text/plain");
		return mav;
	}
	
}