package module.sys;

import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.ArrangeUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Sys_0203ServiceImpl")
@Transactional
public class Sys_0203ServiceImpl extends AbstractService {
	@Autowired
	public Sys_0203DAOImpl sys_0203dao;
	
	protected static Logger logger = LogManager.getLogger(Sys_0203ServiceImpl.class);
	
	private final String[] COLOMNS_EXCEL = {"No", "Menu(KOR)", "Menu(Eng)", "Menu ID", "URL", "Use or not", "Upper menu", "Order", "LEV"};
	
	private final String[] COLOMNS = {"No", "MENU_NM", "MENU_NM_ENG","MENU_ID", "LINK_PATH", "USE_YN", "UP_MENU_ID", "ORD_NO", "LEV"};
	
	public Sys_0203ServiceImpl() {
		super.name= "sys_0203DAOImpl";
	}
	
	public Object getMenuByLinkPath(Map parameter) throws Exception{
		return sys_0203dao.object("getMenuByLinkPath", parameter);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public String saveSTM0205(Map parameter) throws Exception {
		return sys_0203dao.saveSYS0203(parameter);
	}
	
	public File excelFile(String fileName) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet();
		
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

		
		List<Map> list = (List<Map>) sys_0203dao.list("getMenuList");
		
		List<Map> clone =  ArrangeUtil.sortMapList(list, "MENU_ID", "UP_MENU_ID", "LEV");
		
		Row headerRow = sheet.createRow(0);
		for (int i = 0; i < COLOMNS_EXCEL.length; i++) {
			Cell cell = headerRow.createCell(i);
            cell.setCellValue(COLOMNS_EXCEL[i]);
            cell.setCellStyle(headerCellStyle);
		}
		
		int rowNum = 1;
		for (Map datatype : clone) {
            Row row = sheet.createRow(rowNum);
            for (int i = 0; i < COLOMNS.length; i++) {
            	Cell cell = row.createCell(i);
            	String valueOfColomns = COLOMNS[i];
            	if ("No".equals(valueOfColomns)) {
//            		cell.setCellValue(rowNum++);
            		cell.setCellValue(clone.size() - rowNum + 1);
            		rowNum++;
            	} else if ("USE_YN".equals(valueOfColomns)) {
            		if (datatype.get(COLOMNS[i]) != null) {
            			if(datatype.get(COLOMNS[i]).toString().equals("Y")) {
            				cell.setCellValue("Yes");
            			}else {
            				cell.setCellValue("No");
            			}
            		}
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
		
		File file = new File("C:/demo/menu_management.xls");
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
}