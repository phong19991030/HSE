package infrastructure.view;


import infrastructure.util.CastUtil;
import infrastructure.util.RedirectUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

@Deprecated
public class DownloadView extends AbstractView {
 
	public DownloadView(){
		super.setContentType("application/octet-stream");
	}
 
	@Override
	protected void renderMergedOutputModel(Map parameter, HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		// parameter(Map)은 DownloadController에서 ModelAndView객체에 addObject하여 넘어온 정보다.
		File file = (File)parameter.get("file");
		String real_name = CastUtil.castToString(parameter.get("FLE_NM"));
//		System.out.println("다운로드경로 : "+file);
		if(file.exists()){
			response.setContentType(this.getContentType());
			response.setContentLength((int)file.length());
			response.setHeader("Content-Disposition", "attachment;fileName=\""+java.net.URLEncoder.encode(real_name, "UTF-8")+"\";");
			response.setHeader("Content-Transfer", "binary");

			OutputStream out = response.getOutputStream();
			FileInputStream fis = null;

			try{
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis,out);
			}catch(java.io.IOException ioe)	{
				logger.error(ioe.getMessage());
				//iologger.error(e.getMessage()); -- user cancel
			}finally{
				if(fis != null) fis.close();
			}
			out.flush();
		 }else{
	        try{
	    		RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+real_name);
	        }catch(Exception ex){logger.error(ex.getMessage());}
		 }
	}

}
