package applications.sys;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.pdfbox.util.Hex;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.extensions.XSSFCellBorder.BorderSide;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.util.Utils;
import infrastructure.inheritance.BaseController;
import infrastructure.util.CalendarUtil;
import infrastructure.util.ComFileUtil;
import infrastructure.util.ParameterUtil;
import module.util.DateConverter;

/**
	 * 
	 * 
	 * @작성일 : 2020.03.09
	 * @작성자 : anhpv
	 * @프로그램설명 : 
	 * @진행상태: TO-DO
	 */
@Controller("Sys_0102Controller")
@RequestMapping("/sys/sys_0102")
public class Sys_0102Controller extends BaseController {


	@Autowired
	private Sys_0102DAOImpl dao;
	
	@Autowired
	private ServletContext servletContext;
	
	private final String[] COLOMNS_EXCEL = {"No", "User ID", "Access Time", "IP", "Access Point"};
	
	private final String[] COLOMNS = {"NO", "USER_ID", "TIMESTAMP", "IP", "ACCESS_POINT"};
	
	
	
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws Exception {
	
		mav.setViewName("sys/sys_0102");
		return mav;
	}

	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		
		List list = new ArrayList<>();
		try {
			Map parameter = ParameterUtil.getParameterMap(request);
			Map<String, Object> session = (Map<String, Object>) parameter.get("session");
			String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
			Map search  = (Map) parameter.get("search");
			search.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));

			list = dao.list("getListLog", search);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			exceptionLogging(e);
		}

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA",list);
		return mav;
	}

	@RequestMapping("/getData02.ajax")
	public ModelAndView getData02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		
		List list = new ArrayList<>();
		try {
			Map parameter = ParameterUtil.getParameterMap(request);
			Map<String, Object> session = (Map<String, Object>) parameter.get("session");
			String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
			Map search  = (Map) parameter.get("search");
			search.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));

			list = dao.list("getListLoginLog", search);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA",list);
		return mav;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/excelFile.ajax")
	public void excelFile (HttpServletRequest request, HttpServletResponse response) throws Exception {
		String fileName = "loginlog_"+ ComFileUtil.generateTempKey() + "_" + CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss") + ".xlsx";
		Map parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
		String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
		Map search  = parameter.get("search") == null? new HashMap(): (Map) parameter.get("search");
		search.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		File file = excelFile(fileName, search);
		
		response.setContentType("sys/sys_0203");
		response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
		Files.copy(file.toPath(), response.getOutputStream());
		response.getOutputStream().flush();
		file.delete();
	}

	public File excelFile(String fileName, Map search) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet();
		
//		String rgbS = "f9f9fb";
		String rgbS = "e9e9eb";
		byte[] rgbB = Hex.decodeHex(rgbS); // get byte array from hex string
	   	XSSFColor color = new XSSFColor(rgbB); //IndexedColorMap has no usage until now. So it can be set null.

		String rgbS2 = "d9d9db";
		byte[] rgbB2 = Hex.decodeHex(rgbS); // get byte array from hex string
	   	XSSFColor color2 = new XSSFColor(rgbB);
	   	
	    XSSFFont headerFont= workbook.createFont();
	    headerFont.setBold(true);

	    XSSFCellStyle headerCellStyle = (XSSFCellStyle) workbook.createCellStyle();
	    headerCellStyle.setFillForegroundColor(color);
	    headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	    headerCellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	    headerCellStyle.setBorderColor(BorderSide.BOTTOM, color2);
	    headerCellStyle.setBorderColor(BorderSide.TOP, color2);
	    headerCellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
	    headerCellStyle.setFont(headerFont);
	    headerCellStyle.setAlignment(HorizontalAlignment.CENTER);

	    
	    XSSFCellStyle cellStyle = (XSSFCellStyle) workbook.createCellStyle();
	    cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	    cellStyle.setBorderColor(BorderSide.BOTTOM, color2);
	    cellStyle.setAlignment(HorizontalAlignment.CENTER);


//	    cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);

	    
		List<Map> list = (List<Map>) dao.list("getListLoginLog", search);
		
		Row headerRow = sheet.createRow(0);
		for (int i = 0; i < COLOMNS_EXCEL.length; i++) {
			Cell cell = headerRow.createCell(i);
            cell.setCellValue(COLOMNS_EXCEL[i]);
            cell.setCellStyle(headerCellStyle);
		}
		
		int rowNum = 1;
		for (Map datatype : list) {
            Row row = sheet.createRow(rowNum);
            for (int i = 0; i < COLOMNS.length; i++) {
            	Cell cell = row.createCell(i);
            	String valueOfColomns = COLOMNS[i];
            	if ("NO".equals(valueOfColomns)) {
            		cell.setCellValue(list.size() - rowNum + 1);
            		rowNum++;
            	} else {
            		if (datatype.get(COLOMNS[i]) != null) {
            			if (datatype.get(COLOMNS[i]) instanceof String) {
            				cell.setCellValue((String) datatype.get(COLOMNS[i]));
            			} else if (datatype.get(COLOMNS[i]) instanceof Integer) {
            				cell.setCellValue((Integer) datatype.get(COLOMNS[i]));
            			}
            		}
            	}
        		cell.setCellStyle(cellStyle);
            }
        }
		
		// Resize all columns to fit the content size
        for(int i = 0; i < COLOMNS_EXCEL.length; i++) {
            sheet.autoSizeColumn(i);
        }
        
        File f = new File(servletContext.getRealPath(""));
        /*
         * @JK - 보안 취약점 수정 
         */
		//String rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir");
        String rootDir = "";
        if(f.getParentFile() != null && f.getParentFile().getParentFile() != null) {
        	rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir");
        }
		if (!Utils.isDirExist(rootDir)) {
			Utils.makeDir(rootDir);
		}
		
		File file = new File(rootDir+"/menu_management.xlsx");
		/*
		 * @JK - 보안 취약점 수정 
		 */
		//file.getParentFile().mkdirs();
		if(file.getParentFile() != null) {
			file.getParentFile().mkdirs();
		}
		FileOutputStream fileOutputStream = new FileOutputStream(file);
	    try {
            workbook.write(fileOutputStream);
	    } catch(FileNotFoundException e){
			logger.error(e.getMessage());
			throw e;
		} catch(IOException e){
			logger.error(e.getMessage());
			throw e;
		} finally{
			if(fileOutputStream != null){				
				fileOutputStream.flush();
				fileOutputStream.close();
				workbook.close();
			}			
		}
	    return file;
	}
	
	@RequestMapping("/delete01.ajax")
	@Transactional(propagation = Propagation.REQUIRED)
	public ModelAndView doDelete01(ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);

		
		String res = "true";

		try {
			dao.delete("deleteLog", parameter);
			request.setAttribute("EVENT", "DELETE");
		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}
}