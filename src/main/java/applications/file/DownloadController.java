package applications.file;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.util.CastUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.RedirectUtil;
import infrastructure.util.ResourceUtil;

@Deprecated
//@Controller
//@RequestMapping("/common/file/")
public class DownloadController {
	protected   Logger logger = LogManager.getLogger(DownloadController.class);

	@Autowired
	private SysFileDAOImpl sysFileDAOImpl;
	
//	@RequestMapping("/common/file/download")
	public ModelAndView doDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Init
		 */
    	ModelAndView mav = new ModelAndView("emptyView");
    	String path = ResourceUtil.getMessage("dir.upload.default") + "/" + (String)parameter.get("CLS");
    	String save_name = "";
    	/**
    	 * DAO
    	 */
		Map map = (Map)sysFileDAOImpl.getSysFile(parameter);

		if(map != null && !map.isEmpty()){			
			save_name = (String)map.get("SAVE_NAME");
		}

		/**
		 * Validation
		 */
		if(map != null && !map.isEmpty()){
			if(path != null && !path.trim().equals("") && (new File(path)).isDirectory())
			{
				File file = new File(path + "/" + save_name);
				if(file.exists()){
					mav.addObject("file", file);
					mav.addAllObjects(map);
					mav.setViewName("downloadView");
				}else{
					try{
		    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+save_name);
		        	}catch(Exception ex){
		        		logger.error(ex.getMessage());
		        	}
				}
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "경로를 찾을 수 없습니다.\\r\\n\\r\\n경로 : "+path);
	        	}catch(Exception ex){logger.error(ex.getMessage());}
			}
		}else{
			try{
    			RedirectUtil.historyBack(request, response, "잘못된 접근입니다.");
        	}catch(Exception ex){logger.error(ex.getMessage());}
		}
    	
    	return mav;
    }
	
//	@RequestMapping("/common/file/directDownload")
	public ModelAndView doDirectDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		/**
		 * Parameter
		 * String path     : "dir.upload.default","dir.upload.excel" 와 같은 prop 변수명
		 * String fileName : 실제 파일명
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		String path = CastUtil.castToString(parameter.get("path"));
		String fileName = CastUtil.castToString(parameter.get("fileName"));
		/**
		 * Init
		 */
    	ModelAndView mav = new ModelAndView("emptyView");
    	path = ResourceUtil.getMessage(path);

		/**
		 * Validation
		 */

		if(path != null && !path.trim().equals("") && (new File(path)).isDirectory())
		{
			File file = new File(path + "/" + fileName);
			if(file.exists()){
				mav.addObject("file", file);
				mav.addObject("REAL_NAME", fileName);
				mav.setViewName("downloadView");
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+fileName);
	        	}catch(Exception ex){logger.error(ex.getMessage());}
			}
		}else{
			try{
    			RedirectUtil.historyBack(request, response, "경로를 찾을 수 없습니다.\\r\\n\\r\\n경로 : "+path);
        	}catch(Exception ex){logger.error(ex.getMessage());}
		}

    	return mav;
    }	
}
