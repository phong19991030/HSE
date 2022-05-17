package applications.file;

import infrastructure.util.ParameterUtil;
import infrastructure.util.RedirectUtil;
import infrastructure.util.ResourceUtil;

import java.io.File;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller("filedownloadController")
@Deprecated
public class BltnDownloadController {
	

	@Resource(name="sysFileDAOImpl")
	private SysFileDAO sysFileDAO;	
	
	/**
	 * 게시판 전용 파일 다운로드 컨트롤러
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/common/file/bbsFileDownload")
	public ModelAndView doDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Init
		 */
    	ModelAndView mav = new ModelAndView("emptyView");
    	String path = ResourceUtil.getMessage("dir.upload.default") + "/" + (String)parameter.get("BLTN_ID"); //* String path  : "dir.upload.default","dir.upload.excel" 와 같은 prop 변수명
    	
    	String save_name = "";
    	String real_name = "";
    	/**
    	 * DAO
    	 */
    	Map map = sysFileDAO.getSysFile(parameter);

		/**
		 * Validation
		 */
		if(map != null && !map.isEmpty()){
			save_name = (String)map.get("PHYS_FILE_NM");
			real_name = (String)map.get("LGCL_FILE_NM");
			if(path != null && !path.trim().equals("") && (new File(path)).isDirectory())
			{
				File file = new File(path + "/" + save_name);
				if(file.exists()){
					mav.addObject("file", file);
					mav.addObject("REAL_NAME", real_name);
					mav.setViewName("downloadView");
				}else{
					try{
		    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+save_name);
		        	}catch(Exception ex){}
				}
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "경로를 찾을 수 없습니다.\\r\\n\\r\\n경로 : "+path);
	        	}catch(Exception ex){}
			}
		}else{
			try{
    			RedirectUtil.historyBack(request, response, "잘못된 접근입니다.");
        	}catch(Exception ex){}
		}
    	
    	return mav;
    }
	
}
