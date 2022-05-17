package applications.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.api.client.util.Strings;

import infrastructure.inheritance.BaseController;
import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONObject;

/**
 * @author HungDM
 *
 */
@Controller("uploadFilesController")
@RequestMapping("/util/upload")
public class UploadFilesController extends BaseController {

	@Autowired
	private UtilService utilService;

	@Autowired
	private ServletContext servletContext;

	// upload multiple files section
	@SuppressWarnings("unchecked")
	@RequestMapping("/uploadMultipleFiles.ajax")
	public ModelAndView doUploadMultipleFiles(ModelAndView mav, @RequestParam("file") MultipartFile file,
			HttpServletRequest req) throws Exception {
		Map<String, Object> parameters = ParameterUtil.getParameterMap(req);
		Map<Object, Object> session = (Map<Object, Object>) parameters.get("session");
		String userUid = CommonUtil.getMapValue(session, "USER_UID", null);
		logger.info("=========== Multiple Files Upload ============");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		File f = new File(servletContext.getRealPath(""));
		/*
		 * @JK - 보안 취약점 수정 
		 */
		//String rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + sdf.format(new Date());
		String rootDir = "";
		if(f.getParentFile() != null && f.getParentFile().getParentFile() != null) {
			rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + sdf.format(new Date());
		}
		if (!Utils.isDirExist(rootDir)) {
			Utils.makeDir(rootDir);
		}

		AjaxResult result = new AjaxResult();

		if (Utils.isDirExist(rootDir)) {
			if (file != null) {
//				final boolean isChunk = Boolean.valueOf(parameters.get("isChunk").toString());
				final boolean isChunk = false;
				if (isChunk) {
					final int chunkIndex = Integer.valueOf(parameters.get("chunkIndex").toString());
					final boolean isLastChunk = Boolean.valueOf(parameters.get("isLastChunk").toString());
					final String fileName = CommonUtil.getMapValue(parameters, "fileName", "");
					final String sha1 = CommonUtil.getMapValue(parameters, "sha1", "");
					final int start = Integer.valueOf(parameters.get("start").toString());
					final int end = Integer.valueOf(parameters.get("end").toString());
					
					if (file != null) {
						JSONObject json = new JSONObject();
						final int dotPos = fileName.lastIndexOf(".");
						final String extension = fileName.substring(dotPos + 1).toLowerCase();
						final String partName = fileName.substring(0, fileName.lastIndexOf(".")) + ".part";
						File saveFile = new File(rootDir + File.separator + partName + chunkIndex);
						BufferedOutputStream bos = null;
						try {
							bos = new BufferedOutputStream(new FileOutputStream(saveFile));
							byte[] bytes = file.getBytes();
							String sha1Server = Utils.sha1(bytes);
							bos.write(bytes);
							bos.flush();

							result.setStatus(sha1.equals(sha1Server));
							json.put("chunkIndex", chunkIndex);
							json.put("start", start);
							json.put("end", end);
							json.put("success", sha1.equals(sha1Server));
							json.put("isLastChunk", isLastChunk);
							
							if (isLastChunk) {
								bos.close();
								FilenameFilter filter = new FilenameFilter() {
									@Override
									public boolean accept(File dir, String name) {
										if (name.startsWith(partName)) return true;
										
										return false;
									}
								};
								final String saveName = String.valueOf(new Date().getTime());
								final String savePath = rootDir + File.separator + saveName + "." + extension;
								List<File> listFiles = Utils.listFiles(rootDir, filter);
								List<Integer> missingParts = getMissingParts(listFiles);
								if (missingParts == null || missingParts.isEmpty()) {
									File mergedFile = mergeFiles(listFiles, savePath);
									Map<String, Object> params = new HashMap<>();
//									params.put("FLE_KEY", "Temp");
									params.put("ATCH_FLE_SEQ", UUID.randomUUID().toString());
									params.put("FLE_TP", extension);
									params.put("FLE_PATH", mergedFile.getAbsolutePath());
									params.put("FLE_NM", fileName);
									params.put("NEW_FLE_NM", saveName + "." + extension);
									params.put("FLE_SZ", mergedFile.length());
									params.put("INS_ID", userUid);
									params.put("DESCRPT", "");
									utilService.insertFileToTCCO_FILE(params);
									json.put("uploaded", params);
									json.put("merged", true);
								} else {
									json.put("merged", false);
								}
								cleanFiles(listFiles);
							}
							
							result.setResponseData(json);
						} catch (IOException e) {
							logger.error("Error when upload files: " + e);
						} finally {
							if (bos != null) {
								bos.close();
							}
						}
					}
				} else {
					if (file.isEmpty() || (file.getSize() > ((1024 * 1024) * 1024))) { // 1GB
						result.setStatus(false);
						result.setMessage("exceeded quota");
					} else {
						Thread.sleep(1);  // make sure the time is increased
						final int dotPos = file.getOriginalFilename().lastIndexOf(".");
						final String fileName = String.valueOf(new Date().getTime() + Math.abs(new Random().nextInt(404)));
						final String extension = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
						File saveFile = new File(rootDir + File.separator + fileName + "." + extension);
						BufferedOutputStream bos = null;
						try {
							bos = new BufferedOutputStream(new FileOutputStream(saveFile));
							byte[] bytes = file.getBytes();
							bos.write(bytes);
							bos.flush();

							Map<String, Object> params = new HashMap<>();
//							params.put("FLE_KEY", "Temp");
							params.put("ATCH_FLE_SEQ", UUID.randomUUID().toString());
							params.put("FLE_TP", extension);
							params.put("FLE_PATH", saveFile.getAbsolutePath());
							params.put("FLE_NM", file.getOriginalFilename());
							params.put("NEW_FLE_NM", fileName + "." + extension);
							params.put("FLE_SZ", file.getSize());
							params.put("INS_ID", userUid);
							params.put("DESCRPT", "");
							utilService.insertFileToTCCO_FILE(params);
							result.setStatus(true);
							result.setResponseData(params);
						} catch (IOException e) {
							logger.error("Error when upload files: " + e);
						} finally {
							if (bos != null) {
								bos.close();
							}
						}
					}
				}
			}
		} else {
			result.setStatus(false);
			result.setMessage("Cannot make directory to upload!");
		}

		logger.info("=========== End Multiple Files Upload ============");

		mav.setViewName("jsonView");
		mav.addObject("DATA", result.toMap());
		return mav;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/downloadFile")
	public void downloadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameters = ParameterUtil.getParameterMap(request);
		InputStream is = null;
	    try {
	    	final String dir = CommonUtil.getMapValue(parameters, "dir", "");
	    	final String name = CommonUtil.getMapValue(parameters, "fileName", "");
	    	final String extension = CommonUtil.getMapValue(parameters, "extension", "");
	    	
//	    	if (dir.isEmpty() || name.isEmpty() || extension.isEmpty()) return;
//	    	allow empty dir - anhpv 20200616
	    	if (name.isEmpty() || extension.isEmpty()) return;
	    	String _fileName = utilService.getOriginalFileName(name + "." + extension);
	    	int count = StringUtils.countMatches(_fileName, ".");
	    	if(count > 1) {
	    		for(int i = 0; i < count-1; i++) {
	    			_fileName = _fileName.replaceFirst(".", "-");
	    		}
	    	}
	    	final String fileName = name + "." + extension;
	    	
	    	File f = new File(servletContext.getRealPath(""));
	    	/*
	    	 * @JK - 보안 취약점 수정 
	    	 */
			//String filePath = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + dir + File.separator + fileName;
	    	String filePath = "";
	    	if(f.getParentFile() != null && f.getParentFile().getParentFile() != null) {
	    		filePath = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + dir + File.separator + fileName;
	    	}
	    	File fileToDownload = new File(filePath);
	    	if (!fileToDownload.exists() || !fileToDownload.isFile()) {
	    		response.setContentType("text/html;charset=UTF-8");
	    		response.setStatus(HttpServletResponse.SC_OK);
	    		response.getWriter().write("<h1>File not found</h1>Not found the <b>" + (!Utils.isNullOrEmpty(_fileName) ? _fileName : fileName) + "</b> file in the system.");
	    		response.getWriter().flush();
	    		response.getWriter().close();
	    		return;
	    	};
		    // get your file as InputStream
		    is = new FileInputStream(fileToDownload);
		    // copy it to response's OutputStream
		    response.setContentType("application/octet-stream");
		    response.setHeader("Content-Disposition", "attachment; filename=" + (!Utils.isNullOrEmpty(_fileName) ? _fileName : fileName));
		    response.setContentLength((int) fileToDownload.length()); 
		    org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
		    response.flushBuffer();
	    } catch (IOException ex) {
	      //throw new RuntimeException("IOError writing file to output stream");
	    	exceptionLogging(ex);
	    } finally {
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
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/downloadFileV2")
	public void downloadFileV2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameters = ParameterUtil.getParameterMap(request);
		InputStream is = null;
	    try {
	    	final String fileId = CommonUtil.getMapValue(parameters, "fileId", "");
	    	final String fileName = CommonUtil.getMapValue(parameters, "fileName", "");
	    	Map param = new HashMap();
	    	param.put("ATCH_FLE_SEQ", fileId);
	    	Map<String, Object> tcco_file = utilService.getFileById(param);
	    	

	    	
	    	File f = new File(servletContext.getRealPath(""));
	    	/*
	    	 * @JK - 보안 취약점 수정 
	    	 */
			//String filePath = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + dir + File.separator + fileName;
	    	String filePath = String.valueOf(tcco_file.get("FLE_PATH"));
//	    	if(f.getParentFile() != null && f.getParentFile().getParentFile() != null) {
//	    		filePath = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + dir + File.separator + fileName;
//	    	}
	    	File fileToDownload = new File(filePath);
	    	if (!fileToDownload.exists() || !fileToDownload.isFile()) {
	    		response.setContentType("text/html;charset=UTF-8");
	    		response.setStatus(HttpServletResponse.SC_OK);
	    		response.getWriter().write("<h1>File not found</h1>Not found the <b>" + (!Utils.isNullOrEmpty(String.valueOf(tcco_file.get("FLE_NM"))) ? String.valueOf(tcco_file.get("FLE_NM")) : fileName) + "</b> file in the system.");
	    		response.getWriter().flush();
	    		response.getWriter().close();
	    		return;
	    	};
		    // get your file as InputStream
		    is = new FileInputStream(fileToDownload);
		    // copy it to response's OutputStream
		    response.setContentType("application/octet-stream");
		    response.setHeader("Content-Disposition", "attachment; filename=" + (!Utils.isNullOrEmpty(String.valueOf(tcco_file.get("FLE_NM"))) ? String.valueOf(tcco_file.get("FLE_NM")) : fileName));
		    response.setContentLength((int) fileToDownload.length()); 
		    org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
		    response.flushBuffer();
	    } catch (IOException ex) {
	      //throw new RuntimeException("IOError writing file to output stream");
	    	exceptionLogging(ex);
	    } finally {
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
	
	@ResponseBody
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/imageView/{seq}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}, method = RequestMethod.GET)
	public byte[] imageView(HttpServletRequest request, HttpServletResponse response, @PathVariable("seq") String seq) throws Exception {
		InputStream is = null;
	    try {
	    	Map param = new HashMap();
	    	param.put("ATCH_FLE_SEQ", seq);
	    	Map<String, Object> tcco_file = utilService.getFileById(param);
	    	if(tcco_file == null || tcco_file.isEmpty()) {
	    		throw new RuntimeException("File not exist");
	    	}
	    	File f = new File(servletContext.getRealPath(""));
	    	/*
	    	 * @JK - 보안 취약점 수정 
	    	 */
			//String filePath = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + dir + File.separator + fileName + "." + extension;
//	    	String filePath = "";
//	    	if(f.getParentFile() != null & f.getParentFile().getParentFile() != null) {
//	    		filePath = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + dir + File.separator + fileName + "." + extension;
//	    	}
	    	String filePath = String.valueOf(tcco_file.get("FLE_PATH"));
	    	File fileToDownload = new File(filePath);
	    	if (!fileToDownload.exists() || !fileToDownload.isFile()) return null;
		    // get your file as InputStream
		    is = new FileInputStream(fileToDownload);
		    // copy it to response's OutputStream
		    return org.apache.commons.io.IOUtils.toByteArray(is);
	    } catch (IOException ex) {
	      throw new RuntimeException("IOError writing file to output stream");
	    } finally {
	    	if (is != null) {
	    		try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
//					exceptionLogging(e);
				}
	    	}
	    }
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/updateFileDescription.ajax")
	public ModelAndView doReplaceFileDescription(ModelAndView mav, HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		Map<Object, Object> params = ParameterUtil.getParameterMap(req);
		Map<Object, Object> session = (Map<Object, Object>) params.get("session");
		
		final String userUid = CommonUtil.getMapValue(session, "USER_UID", null);
		final String fileSeq = CommonUtil.getMapValue(params, "ATCH_FLE_SEQ", "");
		
		AjaxResult result = new AjaxResult();
		if (Utils.isNullOrEmpty(userUid) || Utils.isNullOrEmpty(fileSeq)) {
			result.setStatus(false);
			result.setMessage("Some arguments are null!");
		} else {
			params.put("UPT_ID", userUid);
			int updated = utilService.updateDescForFile(params);
			if (updated > 0) {
				result.setStatus(true);
				result.setMessage("Update successfully!");
			} else {
				result.setStatus(false);
				result.setMessage("Cannot update the file description!");
			}
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result.toMap());
		return mav;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/deleteFile.ajax")
	public ModelAndView doDeleteFile(ModelAndView mav, HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		Map<Object, Object> params = ParameterUtil.getParameterMap(req);
		
		final String filePath = CommonUtil.getMapValue(params, "PATH", "");
		final String fileSeq = CommonUtil.getMapValue(params, "ATCH_FLE_SEQ", "");
		
		AjaxResult result = new AjaxResult();
		if (Utils.isNullOrEmpty(fileSeq)) {
			result.setStatus(false);
			result.setMessage("No sequence found to delete!");
		} else {
			utilService.deleteFileFromTCCO_FILE(fileSeq);
			// delete file from hard disk
			if (!filePath.isEmpty()) {
				File fileToDelete = new File(filePath);
				
//				if (fileToDelete.exists())
//					fileToDelete.delete();
				synchronized (fileToDelete) {
					if (fileToDelete.exists())
						fileToDelete.delete();
				}
			}
			result.setStatus(true);
			result.setMessage("Delete successfully!");
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result.toMap());
		return mav;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/deleteFileV2.ajax")
	public ModelAndView doDeleteFileV2(ModelAndView mav, HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		Map<Object, Object> params = ParameterUtil.getParameterMap(req);
		
		final String filePath = CommonUtil.getMapValue(params, "PATH", "");
		final String fileSeq = CommonUtil.getMapValue(params, "ATCH_FLE_SEQ", "");
		
		AjaxResult result = new AjaxResult();
		if (Utils.isNullOrEmpty(fileSeq)) {
			result.setStatus(false);
			result.setMessage("No sequence found to delete!");
		} else {
			utilService.deleteFileFromTCCO_FILEV2(fileSeq);
			// delete file from hard disk
			if (!filePath.isEmpty()) {
				File fileToDelete = new File(filePath);
				
//				if (fileToDelete.exists())
//					fileToDelete.delete();
				synchronized (fileToDelete) {
					if (fileToDelete.exists())
						fileToDelete.delete();
				}
			}
			result.setStatus(true);
			result.setMessage("Delete successfully!");
		}
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", result.toMap());
		return mav;
	}
	
	private static List<Integer> getMissingParts(List<File> listFiles) {
		List<Integer> rs = new ArrayList<Integer>(0);
		
		if (listFiles != null) {
			List<Integer> fileNames = new ArrayList<>(0);
			final String indexString = ".part";
			for (File file : listFiles) {
				fileNames.add(Integer.valueOf(file.getName().substring(file.getName().lastIndexOf(indexString) + indexString.length())));
			}
			
			Collections.sort(fileNames);
			int start = 1;
			int end = fileNames.get(fileNames.size() - 1);
			for (int i = start; i <= end; i++) {
				if (!fileNames.contains(i)) {
					rs.add(i);
				}
			}
		}
		return rs;
	}
	
	private static File mergeFiles(List<File> parts, String path) {
		Collections.sort(parts, new Comparator<File>() {

			@Override
			public int compare(File o1, File o2) {
				final String split = ".part";
				int n1 = Integer.valueOf(o1.getName().substring(o1.getName().lastIndexOf(split) + split.length()));
				int n2 = Integer.valueOf(o2.getName().substring(o2.getName().lastIndexOf(split) + split.length()));
				return n1 - n2;
			}
		});
		File destFile = new File(path);
		FileOutputStream fos = null;
		FileInputStream fis;
		byte[] fileBytes;
		int bytesRead = 0;
		
		try {
			fos = new FileOutputStream(destFile, true);
			for (File file : parts) {
				fis = new FileInputStream(file);
				fileBytes = new byte[(int) file.length()];
				try {
					bytesRead = fis.read(fileBytes, 0, (int) file.length());
					if (bytesRead == fileBytes.length && bytesRead == file.length()) {
						fos.write(fileBytes);
						fos.flush();
					}
				} catch (IOException e) {
					exceptionLogging(e);
				} finally {
					if(fis != null) {
						try {
							fis.close();
						} catch (IOException e) {
							exceptionLogging(e);
						}
					}
				}
				//fileBytes = null;
				//fis.close();
				//fis = null;
			}
		} catch (FileNotFoundException e) {
			exceptionLogging(e);
		} finally {
			if(fos != null) {
				try {
					fos.close();
					//fos = null;
				} catch (IOException e) {
					exceptionLogging(e);
				}
			}
		}
		
		/*
		 * @JK - 보안 취약점 수정
		 */
//		fos = new FileOutputStream(destFile, true);
//		for (File file : parts) {
//			fis = new FileInputStream(file);
//			fileBytes = new byte[(int) file.length()];
//			bytesRead = fis.read(fileBytes, 0, (int) file.length());
//			if (bytesRead == fileBytes.length && bytesRead == file.length()) {
//				fos.write(fileBytes);
//				fos.flush();
//			}
//			fileBytes = null;
//			fis.close();
//			fis = null;
//		}
//		fos.close();
//		fos = null;
		
		
		return destFile;
	}
	
	private static void cleanFiles(List<File> listFiles) {
		if (listFiles != null) {
			
//			for (File file : listFiles) {
//				if (file != null && file.exists()) {
//					file.delete();
//				}
//			}
			
			synchronized (listFiles) {
				for (File file : listFiles) {
					if (file != null && file.exists()) {
						file.delete();
					}
				}
			}
		}
	}
	
}
