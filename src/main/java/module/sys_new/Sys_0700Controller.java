package module.sys_new;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import applications.util.Utils;
import infrastructure.inheritance.BaseController;
import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;
import module.util.FileUtil;

@Controller("Sys_new_0700Controller")
@RequestMapping("/sys_new/sys_0700")
public class Sys_0700Controller extends BaseController{
	
	@Resource
	private Sys_0700ServiceImpl src;
	
	@Autowired
	private ServletContext servletContext;
	
	@Autowired
	private UtilService utilService;
	
	/* 리스트 페이지*/
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys_new/sys_0700");
		
		List registerList = src.getRegisterList(parameter);
		mav.addObject("REGISTER_LIST", registerList);
		return mav;
	}
	
	/* 리스트 데이터 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getRowList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 첨부파일 다운로드*/
	@RequestMapping("/downloadFile.ajax")
	public void downloadFile(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);

		InputStream is = null;
		try {
			String fileName = (String) parameter.get("NEW_FLE_NM");
			String extension = (String) parameter.get("FLE_TP");
			// Windows (/ => \), Linux, MacOS(\ => /)
			String dir = (String) parameter.get("FLE_PATH").toString().replace("/", File.separator).replace("\\", File.separator);
			String downloadFileName = (String) parameter.get("FLE_NM");
			
			if(fileName.isEmpty() || extension.isEmpty()) return;

			String _fileName = fileName + "." + extension;
			
			File file = new File(servletContext.getRealPath(""));
			String filePath = "";
			if(file.getParentFile() != null && file.getParentFile().getParentFile() != null) {
				filePath = file.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + dir + File.separator + _fileName;
			}
			File fileToDownload = new File(filePath);
			if(!fileToDownload.exists() || !fileToDownload.isFile()) {
				response.setContentType("text/html;charset=UTF-8");
	    		response.setStatus(HttpServletResponse.SC_OK);
	    		response.getWriter().write("<h1>File not found</h1>Not found the <b>" + (!Utils.isNullOrEmpty(_fileName) ? _fileName : _fileName) + "</b> file in the system.");
	    		response.getWriter().flush();
	    		response.getWriter().close();
	    		return;
			}
			is = new FileInputStream(fileToDownload);
		    // copy it to response's OutputStream
		    response.setContentType("application/octet-stream");
		    response.setHeader("Content-Disposition", "attachment; filename=" + (!Utils.isNullOrEmpty(downloadFileName) ? downloadFileName : downloadFileName));
		    response.setContentLength((int) fileToDownload.length()); 
		    org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
		    response.flushBuffer();
		} catch(IOException ex) {
			exceptionLogging(ex);
		}finally {
	    	if (is != null) {
	    		try {
					is.close();
				} catch (IOException e) {
					//e.printStackTrace();
					exceptionLogging(e);
				}
	    	}
	    }
	}
	
	/* 등록 페이지 이동 */
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/sys_0701");
		
		return mav;
	}
	
	/* 수정 페이지 이동 */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter); 
		mav.setViewName("sys_new/sys_0701");
		
		return mav;
	}
	
	/* 저장 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse resonse) throws Exception{
		
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		// ATCH_FILE
		List<MultipartFile> files = (List<MultipartFile>) parameter.get("ATCH_FILE");
		
		if(files.get(0).getSize() > 0) {
			String rootPath = FileUtil.getFileDirRootPath(servletContext);
			String lastPath = FileUtil.joinDirPartition(new String[] {"notice_atch_file", new SimpleDateFormat("yyyyMMdd").format(new Date())});
			
			Map fileInfo = FileUtil.getFileInfo(files.get(0), "_notice_atch_file");
			fileInfo.put("ROOT_PATH", rootPath);
			fileInfo.put("LAST_PATH", lastPath);
			fileInfo.put("FILE", files.get(0));
			parameter.put("ATCH_FILE", fileInfo);
		} else {
			parameter.put("ATCH_FILE", null);
		}
		
		Map result = null;
		
		try{
			if(parameter.get("PROCESS").toString().equals("UPDATE")) {
				result = src.update(parameter);
			System.out.println("수정일때");
			}else {
				System.out.println("등록일때");
				result = src.insert(parameter);
			}
		} catch(Exception e) {
			exceptionLogging(e);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("sys_new/sys_0702");
		mav.addObject("DATA", parameter);
		
		return mav;
	}

	/* 상세 페이지 데이터 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getNoticeInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 삭제 */
	@RequestMapping("detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.delete(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
}



