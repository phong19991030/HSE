package infrastructure.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;

import applications.excel.ExcelWriter;
import applications.excel.FsExcelWriter;
import infrastructure.inheritance.BaseController;

/**
*
* Controller에서 Ajax에 의한 Grid용 ModelAndView와 Excel용 ModelAndView로 분기
* @param HttpServletRequest req
* @param HttpServletResponse res
* @param Map parameter : MODE = NULL인 경우 GRID용 json데이터 반환
*                      : MODE = EXCEL인 경우 Excel시트 다운로드
* @param List data     : 데이터
*/

public class ModelAndViewUtil {
	public static ModelAndView getModelAndView(HttpServletRequest request, HttpServletResponse response,Map parameter, List list) throws Exception {
		Logger logger = LogManager.getLogger(ModelAndViewUtil.class);
		ModelAndView mav = new ModelAndView();

	    if(parameter.get("MODE") == null){
	    	mav.setViewName("jsonView");
	    	mav.addObject("RESULT_TYPE", "GRID");
	    	mav.addObject("DATA", list);
	    }else if(parameter.get("MODE").toString().equals("EXCEL")){ 
			parameter.put("excelData", list);
			
			//String path = CommonUtil.getDirectoryPath(request.getServerName());
			String path = CommonUtil.getDirectoryDownloadExcel();
			parameter.put("path", path);

			String fileName = ExcelWriter.write(parameter);
							
			File file = new File(path + "/" + fileName);
			
			fileName = (String) parameter.get("excelTitle");
			fileName += ".xls";
			if(file.exists()){
				mav.addObject("file", file);
				mav.addObject("FLE_NM", fileName);
				mav.setViewName("downloadView");
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+fileName);
	        	}catch(IOException ex){
	        		
	        		logger.error(ex.getMessage());
	        	}
			}
	    }else if(parameter.get("MODE").toString().equals("FSEXCEL")){
	    	parameter.put("excelData", list);
	    	String fileName = FsExcelWriter.write(parameter);
	    	//파일확인 후 다운로드
	    	String path = "";
	    	File file = new File(path + "/" + fileName);
	    	
	    	if(file.exists()){
	    		mav.addObject("file", file);
	    		mav.addObject("FLE_NM", fileName);
	    		mav.setViewName("downloadView");
	    	}else{
	    		try{
	    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+fileName);
	    		}catch(IOException ex){logger.error(ex.getMessage());}
	    	}
	    }
	    
	    return mav;
	}
	public static ModelAndView getModelAndView(HttpServletRequest request, HttpServletResponse response,Map parameter, List list, String templateName) {
		ModelAndView mav = new ModelAndView();
		Logger logger = LogManager.getLogger(ModelAndViewUtil.class);

		String filePath = "./webapp/WEB_INF/template/" + templateName ;
		String fileName = "Template_Bulk";
		FileInputStream reportStream = null;
		try {
			//FileInputStream reportStream = new FileInputStream(filePath);
			reportStream = new FileInputStream(filePath);
		} catch (FileNotFoundException e) {
			BaseController.exceptionLogging(e);
		} finally {
			try {
				if(reportStream != null) reportStream.close();
			} catch (IOException e) {
				BaseController.exceptionLogging(e);
			}
		}
		
		File file = new File(filePath);
		
		if(file.exists()){
    		mav.addObject("file", file);
    		mav.addObject("FLE_NM", fileName);
    		mav.setViewName("downloadView");
    	}else{
    		try{
    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+fileName);
    		} catch(IOException ex) {
    			logger.error(ex.getMessage());
    		}
    	}
		return mav;
	}
	
/**
 * 통계분석용 데이터 추출에서 사용.... 동적 그리드의 경우 headers가 더 존재해서...
 * @param request
 * @param response
 * @param parameter
 * @param values
 * @param headers
 * @return
 * @throws Exception
 */
public static ModelAndView getModelAndView(HttpServletRequest request, HttpServletResponse response,Map parameter, List values, List headers) throws Exception {
		Logger logger = LogManager.getLogger(ModelAndViewUtil.class);

		ModelAndView mav = new ModelAndView();

	    if(parameter.get("MODE") == null){
	    	mav.setViewName("jsonView");
	    	mav.addObject("RESULT_TYPE", "DYNAMIC_GRID");
		    mav.addObject("DATA", values);
		    mav.addObject("HEADERS", headers);
	    }else if(parameter.get("MODE").toString().equals("EXCEL")){
			parameter.put("excelData", values);
			String fileName = ExcelWriter.write(parameter);//엑셀파일생성
			if(fileName != null && !fileName.equals("")){
				mav.addObject("REAL_NAME", fileName);
				mav.setViewName("excelDownloadView");//다운로드
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "엑셀파일생성에 실패했습니다.\\r\\n\\r\\n파일 : "+fileName);
	        	}catch(IOException ex){
	        		System.err.println("[100]IO Exception");
	        		logger.error(ex.getMessage());
	        	}
			}
	    }else if(parameter.get("MODE").toString().equals("PAGING_GRID")){
	    	mav.setViewName("jsonView");
	    	mav.addObject("RESULT_TYPE", "PAGING_GRID"); 
		    mav.addObject("DATA", values);
		    mav.addObject("HEADERS", headers);
		    mav.addObject("total", parameter.get("total"));
			mav.addObject("page", parameter.get("page"));
			mav.addObject("records",parameter.get("records") );
			mav.addObject("pageSize",parameter.get("pageSize") );
			mav.addObject("rows", parameter.get("rows") );
	    }

	    return mav;
	}
}
