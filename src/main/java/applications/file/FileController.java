package applications.file;

import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;
import infrastructure.util.RedirectUtil;
import infrastructure.util.ResourceUtil;
import infrastructure.util.CastUtil;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller("downloadController")
@RequestMapping("/common/file/")
public class FileController {
	protected   Logger logger = LogManager.getLogger(FileController.class);

//	@Resource(name="sysFileDAOImpl")
//	private SysFileDAO sysFileDAO;
			
	@Resource(name="com_FileDAOImpl")
	private Com_FileDAOImpl fileDao;
	
	@Autowired
	private UploadComponent uploadComponent;
	
	@Autowired
	private SysFileDAOImpl sysFileDAOImpl;
	
	@RequestMapping("/DwnlMsgFile.ajax")
	public void downloadMsgFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String msg = "";
		Map parameter = ParameterUtil.getParameterMap(request);
		Map wschatSchemaMap= ResourceUtil.getMessageMap("system.schema.wschat");
		String wschatSchema = (String) wschatSchemaMap.get("MESSAGE");
		
		parameter.put("SCHEMA_WSCHAT", wschatSchema);
		String msg_uid = "" + parameter.get("MSG_UID");
		Map fileMap = fileDao.getMsgFileMap(parameter);

		String sysFileName = "" + fileMap.get("FILE_MODI_NM");
		String orgFileName = "" + fileMap.get("FILE_ORI_NM");
		String filePath = "" + fileMap.get("FILE_PATH");
		String ext = "" + fileMap.get("FILE_EXTN");
		/****************************************************/
		// fileService.createSignAgrDoc("AHL201700106918");

		// 파일명 깨짐대응 문자열 인코딩 처리
		orgFileName = java.net.URLEncoder.encode(orgFileName, "UTF-8").replaceAll("\\+", "%20");

		if (fileMap.get("FILE_TYPE") != null ? fileMap.get("FILE_TYPE").toString().contains("video") : false) {
			String oriFilePath = filePath;
			String videofile = filePath.split(sysFileName)[0];
			videofile = videofile + "thum/" + sysFileName.split("[.]")[0] + ".png";
			filePath = videofile;
			if (parameter.get("type") != null && parameter.get("type").equals("slide")) {
				filePath = oriFilePath;
			}
		}
		
		List<String> images = Arrays.asList("jpg", "bmp", "png");
		
		if (parameter.get("THUMB") != null && parameter.get("THUMB").equals("true") && fileMap.get("FILE_TYPE") != null && (fileMap.get("FILE_TYPE").toString().contains("image")|| images.contains(ext.substring(1).toString().toLowerCase()))) {
			String imgfile = filePath.split(sysFileName)[0];
			imgfile = imgfile + "/thumb/" + sysFileName;
			filePath = imgfile;
		}

		// File file = new File(filePath + "/" + sysFileName);
		
		Map mapRootPath = ResourceUtil.getMessageMap("system.dir.upload.rootPath");
		String rootPath = (String) mapRootPath.get("MESSAGE");
		Map mapContextPath = ResourceUtil.getMessageMap("system.dir.upload.contextPath");
		String contextPath = (String) mapContextPath.get("MESSAGE");
		
		if(filePath.length()> contextPath.length() && filePath.indexOf(contextPath) == 0) {
			filePath = rootPath + filePath.substring(contextPath.length());
		}
		File file = new File(filePath);

		if (file.isFile()) {
			if (".pdf".equalsIgnoreCase(ext)) {
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "inline; filename=\"" + orgFileName + "\"");
			} else if (".mp4".equalsIgnoreCase(ext)) {
				response.setContentType("video/mp4");
				response.setHeader("Content-Disposition", "inline; filename=\"" + orgFileName + "\"");
			} else if (".mp3".equalsIgnoreCase(ext)) {
				response.setContentType("audio/mp3");
				response.setHeader("Content-Disposition", "inline; filename=\"" + orgFileName + "\"");
			} else {
				response.setHeader("Content-Disposition", "attachment; filename=\"" + orgFileName + "\"");
			}

			response.setHeader("Accept-Ranges", "bytes");

			long contentLength = file.length();

			response.setHeader("Content-Length", "" + contentLength);

			byte b[] = new byte[8192];
			BufferedInputStream input = null;
			BufferedOutputStream output = null;

			try {
				input = new BufferedInputStream(new FileInputStream(file));
				output = new BufferedOutputStream(response.getOutputStream());

				int read = 0;

				if (contentLength > 0) {
					while (contentLength > 0) {
						if (contentLength < 8192) {
							b = new byte[(int) contentLength];
						}

						read = input.read(b);

						if (read == -1) {
							break;
						}

						output.write(b, 0, read);
						contentLength = contentLength - read;
					}
					msg = "Download success!";
				}

			} catch (Exception e) {
				logger.info("예외가 발생하였습니다.");
				msg = e.getMessage();
			} finally {
				if (output != null) {
					output.flush();
					output.close();
				}

				if (input != null) {
					input.close();
				}
			}

		} else {
			msg = "File not found !";
		}

	}
	
	@RequestMapping("/DwnlMsgFileNew.ajax")
	public void downloadMsgFileNew(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String msg = "";
		Map parameter = ParameterUtil.getParameterMap(request);
		Map wschatSchemaMap= ResourceUtil.getMessageMap("system.schema.wschat");
		String wschatSchema = (String) wschatSchemaMap.get("MESSAGE");
		
		parameter.put("SCHEMA_WSCHAT", wschatSchema);
		String msg_uid = "" + parameter.get("MSG_UID");
		Map fileMap = fileDao.getMsgFileMap(parameter);

		String sysFileName = "" + fileMap.get("FILE_MODI_NM");
		String orgFileName = "" + fileMap.get("FILE_ORI_NM");
		String filePath = "" + fileMap.get("FILE_PATH");
		String ext = "" + fileMap.get("FILE_EXTN").toString().substring(1);
		/****************************************************/
		// fileService.createSignAgrDoc("AHL201700106918");

		// 파일명 깨짐대응 문자열 인코딩 처리
		orgFileName = java.net.URLEncoder.encode(orgFileName, "UTF-8").replaceAll("\\+", "%20");
		
		Map mapRootPath = ResourceUtil.getMessageMap("system.dir.upload.rootPath");
		String rootPath = (String) mapRootPath.get("MESSAGE");
		Map mapContextPath = ResourceUtil.getMessageMap("system.dir.upload.contextPath");
		String contextPath = (String) mapContextPath.get("MESSAGE");
		
		if(filePath.length()> contextPath.length() && filePath.indexOf(contextPath) == 0) {
			filePath = rootPath + filePath.substring(contextPath.length());
		}
		List<String> images = Arrays.asList("jpg", "bmp", "png");


		if (parameter.get("ACTION_TYPE") != null && parameter.get("ACTION_TYPE").equals("THUMB") && fileMap.get("FILE_TYPE") != null ? fileMap.get("FILE_TYPE").toString().contains("video") : false) {
			String oriFilePath = filePath;
			String videofile = filePath.split(sysFileName)[0];
			videofile = videofile + "thumb/" + sysFileName.split("[.]")[0] + ".png";
			filePath = videofile;
			if (parameter.get("type") != null && parameter.get("type").equals("slide")) {
				filePath = oriFilePath;
			}
		}
		
		if (parameter.get("ACTION_TYPE") != null && parameter.get("ACTION_TYPE").equals("THUMB") && fileMap.get("FILE_TYPE") != null && (fileMap.get("FILE_TYPE").toString().contains("image")|| images.contains(ext))) {
			String imgfile = filePath.split(sysFileName)[0];
			imgfile = imgfile + "/thumb/" + sysFileName;
			filePath = imgfile;
		}

		File file = new File(filePath);


		if (file.isFile()) {
			if ("pdf".equalsIgnoreCase(ext)) {
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "inline; filename=\"" + orgFileName + "\"");
			} else if ("mp4".equalsIgnoreCase(ext)  ) {
				if(parameter.get("ACTION_TYPE") != null && parameter.get("ACTION_TYPE").equals("THUMB")) {
					response.setHeader("Content-Disposition", "inline; filename=\"" + sysFileName.split("[.]")[0] + ".png" + "\"");			
				}else if(parameter.get("ACTION_TYPE") != null && parameter.get("ACTION_TYPE").equals("DOWNLOAD")) {
					response.setHeader("Content-Disposition", "attachment; filename=\"" + orgFileName + "\"");
				}else {
					response.setContentType("video/mp4");
					response.setHeader("Content-Disposition", "inline; filename=\"" + orgFileName + "\"");
				}
				
			} else if ("mp3".equalsIgnoreCase(ext)) {
				if(parameter.get("ACTION_TYPE") != null && parameter.get("ACTION_TYPE").equals("DOWNLOAD")) {
					response.setHeader("Content-Disposition", "attachment; filename=\"" + orgFileName + "\"");
				}else {
					response.setContentType("audio/mp3");
					response.setHeader("Content-Disposition", "inline; filename=\"" + orgFileName + "\"");
				}		
			} else {
				response.setHeader("Content-Disposition", "attachment; filename=\"" + orgFileName + "\"");
			}
			response.setHeader("Accept-Ranges", "bytes");

			long contentLength = file.length();

			response.setHeader("Content-Length", "" + contentLength);

			byte b[] = new byte[8192];
			BufferedInputStream input = null;
			BufferedOutputStream output = null;

			try {
				input = new BufferedInputStream(new FileInputStream(file));
				output = new BufferedOutputStream(response.getOutputStream());

				int read = 0;

				if (contentLength > 0) {
					while (contentLength > 0) {
						if (contentLength < 8192) {
							b = new byte[(int) contentLength];
						}

						read = input.read(b);

						if (read == -1) {
							break;
						}

						output.write(b, 0, read);
						contentLength = contentLength - read;
					}
					msg = "Download success!";
				}

			} catch (IOException e) {
				logger.info("예외가 발생하였습니다.");
				msg = e.getMessage();
			} finally {
				if (output != null) {
					output.flush();
					output.close();
				}

				if (input != null) {
					input.close();
				}
			}

		} else {
			msg = "File not found !";
		}

	}
	
	@RequestMapping("/download")
	public ModelAndView doDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		/**
		 * Parameter
		 */
		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Init
		 */
    	ModelAndView mav = new ModelAndView("emptyView");
    	String path = CommonUtil.getDirectoryUploadDefault();
    	String save_name = "";
    	/**
    	 * DAO
    	 */
		Map map = (Map)fileDao.getFile(parameter);

		if(map != null && !map.isEmpty()){			
			save_name = (String)map.get("NEW_FLE_NM");
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
		        	}catch(IOException ex){
		        		logger.error(ex.getMessage());
		        	}
				}
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "경로를 찾을 수 없습니다.\\r\\n\\r\\n경로 : "+path);
	        	}catch(IOException ex){logger.error(ex.getMessage());}
			}
		}else{
			try{
    			RedirectUtil.historyBack(request, response, "잘못된 접근입니다.");
        	}catch(IOException ex){logger.error(ex.getMessage());}
		}
    	
    	return mav;
    }
	
	@RequestMapping("/directDownload")
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
				mav.addObject("FLE_NM", fileName);
				mav.setViewName("downloadView");
			}else{
				try{
	    			RedirectUtil.historyBack(request, response, "파일을 찾을 수 없습니다.\\r\\n\\r\\n파일 : "+fileName);
	        	}catch(IOException ex){logger.error(ex.getMessage());}
			}
		}else{
			try{
    			RedirectUtil.historyBack(request, response, "경로를 찾을 수 없습니다.\\r\\n\\r\\n경로 : "+path);
        	}catch(IOException ex){logger.error(ex.getMessage());}
		}

    	return mav;
    }	
	
	@RequestMapping("/uploadForm")
	public  ModelAndView uploadForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response ,
			@RequestParam("fileKey") String  fileKey
			)
		throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
//		fileDao
//		uploadComponent.doUpload(parameter);
		List fileList =new ArrayList();
		if(fileKey != null && !fileKey.equals("")){
			fileList =  fileDao.list("getFileList",parameter) ;	
		}
		
		mav.setViewName("popup:common/file/fileForm");
		mav.addObject("fileList", fileList);
		return mav;
    }	
	
	@RequestMapping("/uploadFile")
	public  ModelAndView uploadFile(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@RequestParam("fileKey") String  fileKey
			) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
//		int maxPostSize = 2147483000;
//		String path = CommonUtil.getDirectoryUploadDefault();
//		InnorixTransfer innoTransfer = new InnorixTransfer(request, response, maxPostSize, "UTF-8", path);

//		fileDao
		fileKey = uploadComponent.doUpload(parameter);
		mav.setViewName("jsonView");
		Map map  = new HashMap();
		map.put("fileKey", fileKey);
//		mav.addObject("fileKey", fileKey);
		mav.addObject("type","text/plain");
		mav.addObject("DATA", map);
//		response.setContentType("text/plain");
    	return mav;
    }	
	
	@RequestMapping("/deleteFile")
	public  ModelAndView deleteFile(ModelAndView mav, HttpServletRequest request, HttpServletResponse response
			) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
//		int maxPostSize = 2147483000;
//		String path = CommonUtil.getDirectoryUploadDefault();
//		InnorixTransfer innoTransfer = new InnorixTransfer(request, response, maxPostSize, "UTF-8", path);

//		fileDao
//		fileKey = uploadComponent.doUpload(parameter);
//		mav.addObject("fileKey", fileKey);
		if(parameter.get("ATCH_FLE_SEQ") !=null && parameter.get("ATCH_FLE_SEQ") instanceof List ){
			List list = (List) parameter.get("ATCH_FLE_SEQ");
			for(String seq : (List<String>)list){
				parameter.put("ATCH_FLE_SEQ", seq);
				fileDao.delete("deleteFile",parameter);
			}
		}else{
			fileDao.delete("deleteFile",parameter);
		}
		mav.setViewName("jsonView");
    	return mav;
    }	
}
