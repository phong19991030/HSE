package module.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import infrastructure.inheritance.BaseController;

/**
 * 
 *  imageViewController.java
 *  
 *  @author parkjk
 *  @version 1.0
 *  @Date May 9, 2021
 *  @Description imageViewController
 *
 */
@Controller("imageViewController")
@RequestMapping("/imageView")
public class imageViewController extends BaseController {

	@Autowired
	private ServletContext servletContext;

	/* 이미지 뷰 - dir1 */
	@ResponseBody
	@RequestMapping(value="/{dir1}/{fileName}.{extension}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}, method = RequestMethod.GET)
	public byte[] imageView(HttpServletRequest request, HttpServletResponse response, 
			@PathVariable("fileName") String fileName, @PathVariable("extension") String extension,
			@PathVariable("dir1") String dir1) {
		
		InputStream is = null;
	    try {
	    	String rootPath = FileUtil.getFileDirRootPath(servletContext);
	    	String childPath = FileUtil.joinDirPartition(new String[] {dir1});
	    	
	    	File file = new File(rootPath + childPath + File.separator + fileName + "." + extension);
	    	if (!file.exists() || !file.isFile()) return null;
		    // get your file as InputStream
		    is = new FileInputStream(file);
		    // copy it to response's OutputStream
		    return org.apache.commons.io.IOUtils.toByteArray(is);
	    } catch (IOException ex) {
	      throw new RuntimeException("IOError writing file to output stream");
	    } finally {
	    	if (is != null) {
	    		try {
					is.close();
				} catch (IOException e) {
					exceptionLogging(e);
				}
	    	}
	    }
	}
	
	/* 이미지 뷰 dir2 */
	@ResponseBody
	@RequestMapping(value="/{dir1}/{dir2}/{fileName}.{extension}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}, method = RequestMethod.GET)
	public byte[] imageView(HttpServletRequest request, HttpServletResponse response, 
			@PathVariable("fileName") String fileName, @PathVariable("extension") String extension,
			@PathVariable("dir1") String dir1, @PathVariable("dir2") String dir2) {
		
		InputStream is = null;
	    try {
	    	String rootPath = FileUtil.getFileDirRootPath(servletContext);
	    	String childPath = FileUtil.joinDirPartition(new String[] {dir1, dir2});
	    	
	    	File file = new File(rootPath + childPath + File.separator + fileName + "." + extension);
	    	if (!file.exists() || !file.isFile()) return null;
		    // get your file as InputStream
		    is = new FileInputStream(file);
		    // copy it to response's OutputStream
		    return org.apache.commons.io.IOUtils.toByteArray(is);
	    } catch (IOException ex) {
	      throw new RuntimeException("IOError writing file to output stream");
	    } finally {
	    	if (is != null) {
	    		try {
					is.close();
				} catch (IOException e) {
					exceptionLogging(e);
				}
	    	}
	    }
	}
	
	/* 이미지 뷰 dir3 */
	@ResponseBody
	@RequestMapping(value="/{dir1}/{dir2}/{dir3}/{fileName}.{extension}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}, method = RequestMethod.GET)
	public byte[] imageView(HttpServletRequest request, HttpServletResponse response, 
			@PathVariable("fileName") String fileName, @PathVariable("extension") String extension,
			@PathVariable("dir1") String dir1, @PathVariable("dir2") String dir2, @PathVariable("dir3") String dir3) {
		
		InputStream is = null;
	    try {
	    	String rootPath = FileUtil.getFileDirRootPath(servletContext);
	    	String childPath = FileUtil.joinDirPartition(new String[] {dir1, dir2, dir3});
	    	
	    	File file = new File(rootPath + childPath + File.separator + fileName + "." + extension);
	    	if (!file.exists() || !file.isFile()) return null;
		    // get your file as InputStream
		    is = new FileInputStream(file);
		    // copy it to response's OutputStream
		    return org.apache.commons.io.IOUtils.toByteArray(is);
	    } catch (IOException ex) {
	      throw new RuntimeException("IOError writing file to output stream");
	    } finally {
	    	if (is != null) {
	    		try {
					is.close();
				} catch (IOException e) {
					exceptionLogging(e);
				}
	    	}
	    }
	}
	
}
