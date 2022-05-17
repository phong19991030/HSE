package applications.excel;

import infrastructure.util.CalendarUtil;
import infrastructure.util.ComFileUtil;
import infrastructure.util.CastUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;

public class ExcelWriter {
	protected static Logger logger = LogManager.getLogger(ExcelWriter.class);	
	public static String write(Map parameter) throws Exception {
		String excelTitle = CastUtil.castToString(parameter.get("excelTitle"));
		String columnIds = CastUtil.castToString(parameter.get("columnIds"));
		String columnNames = CastUtil.castToString(parameter.get("columnNames"));
		String columnType = CastUtil.castToString(parameter.get("columnType"));
		String groupStartColumnIds = CastUtil.castToString(parameter.get("groupStartColumnIds"));
		String groupNumberOfColumns = CastUtil.castToString(parameter.get("groupNumberOfColumns"));
		String groupColumnNames = CastUtil.castToString(parameter.get("groupColumnNames"));
				
		String[] colids = columnIds.split(",");
		String[] colnms = columnNames.split(",");
		String[] coltype = columnType.split(",");
		String[] gstartids = groupStartColumnIds.split(",");
		String[] gnum = groupNumberOfColumns.split(",");
		String[] gcolnms = groupColumnNames.split(",");

		List data = (List)parameter.get("excelData");
		
		// ############################### 0) var
		int i = 0;
		int j = 0;
		int k = 0;
		int rownum = 0;
		int totalRowCount = 0;
		boolean isMatch = false;
		String groupColumnIds = "";
		String[] gids = null;
		// ############################### 1) workbook & sheet(1)
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet1 = workbook.createSheet("Sheet1");
		// ############################### 2-1) row, cell, style
		HSSFRow row = null;
		HSSFCell cell = null;
		HSSFCellStyle style = workbook.createCellStyle();
		// ############################### 2-2) merge하는 경우를 대비해서 전체 row,cell을 일괄생성한다.
		// row갯수 = title=1 + header=1~2(group에 따라) + data.size()
		// col갯수 = colids.length
		totalRowCount = 1 + (groupStartColumnIds.equals("") ? 1 : 2) + data.size();
		for(i = 0;i < totalRowCount;i++){
			row = sheet1.createRow(i);
			for(j = 0;j < colids.length;j++){
				cell = row.createCell(j);
				if(totalRowCount < 3000) {//1000건 이하의 경우만 스타일 적용(용량차이 많이 남)
					if(i == 0){
						if(j == 0){
							//a) title style
							
								style = workbook.createCellStyle();
								style.setBorderTop(CellStyle.BORDER_NONE);
								style.setBorderBottom(CellStyle.BORDER_NONE);
								style.setBorderLeft(CellStyle.BORDER_NONE);
								style.setBorderRight(CellStyle.BORDER_NONE);
								style.setAlignment(CellStyle.ALIGN_CENTER);
								Font font = workbook.createFont();
								font.setFontHeightInPoints((short)18);
								font.setColor(IndexedColors.GREY_80_PERCENT.getIndex());
								font.setBoldweight((short)10);
								style.setFont(font);
								cell.setCellStyle(style);
							
						}
					}else{
						if(i == 1 || (i == 2 && !groupStartColumnIds.equals(""))){
							//b) header style
							style = workbook.createCellStyle();
							style.setBorderTop(CellStyle.BORDER_THIN);
							style.setBorderBottom(CellStyle.BORDER_THIN);
							style.setBorderLeft(CellStyle.BORDER_THIN);
							style.setBorderRight(CellStyle.BORDER_THIN);
							style.setAlignment(CellStyle.ALIGN_CENTER);
							style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
							style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
							style.setFillPattern(CellStyle.SOLID_FOREGROUND);
							cell.setCellStyle(style);
						}else{//c) cell
							//c) cell style
							
							if(totalRowCount < 1000){
								style = workbook.createCellStyle();
								style.setBorderTop(CellStyle.BORDER_THIN);
								style.setBorderBottom(CellStyle.BORDER_THIN);
								style.setBorderLeft(CellStyle.BORDER_THIN);
								style.setBorderRight(CellStyle.BORDER_THIN);
								style.setAlignment(CellStyle.ALIGN_GENERAL);
								cell.setCellStyle(style);
							}
						}
					}
				}
			}
		}
		// ############################### 3) title
		row = sheet1.getRow(rownum);
		cell = row.getCell(0);
		cell.setCellValue(excelTitle);

		// merge
		CellRangeAddress titleMergeRegion = new CellRangeAddress(0,0,0, colids.length - 1);//(int firstRow, int lastRow, int firstCol, int lastCol)
		sheet1.addMergedRegion(titleMergeRegion);
		// ############################### 4-1) group header
		/**
		 * group columns이 영향을 미치는 컬럼을 확인해둔다.
		 */
		 if(gstartids != null && !gstartids[0].equals("")){
			 isMatch = false;
			 for(i = 0;i < gstartids.length;i++){
			 	int colspan = Integer.parseInt(gnum[i]);
			 	k = 1;
			 	for(j = 0;j < colids.length;j++){
			 		if(gstartids[i].equals(colids[j])){
			 			if(i == 0) groupColumnIds = colids[j];
			 			else groupColumnIds = groupColumnIds + "," + colids[j];
			 			isMatch = true;
			 			k++;
			 		}else{
			 			if(isMatch){
				 			if(k > colspan){
				 				isMatch = false;
				 			 	break;
				 			}else{
				 				groupColumnIds = groupColumnIds + "," + colids[j];
				 				k++;
				 			}
			 			}
			 		}
			 		
			 	}
			 }
			 gids = groupColumnIds.split(",");
		 }
		 //초기화 
		if(gids == null ){
			gids= new String[0];
		}
		if(!groupColumnIds.equals("")){
			// header value
			rownum++;
			row = sheet1.getRow(rownum);
			k = 0;
			isMatch = false;
			for(i = 0;i < colids.length;i++){
				for(j = 0;j < gstartids.length;j++){//그룹헤더 시작컬럼 확인
					if(colids[i].equals(gstartids[j])) isMatch = true;
				}
				
				cell = row.getCell(i);
								
				if(isMatch){
					cell.setCellValue(gcolnms[k]);
					//merge(colspan)
					CellRangeAddress colMergeRegion = new CellRangeAddress(rownum, rownum,i, (i + Integer.parseInt(gnum[k]) -1));//(int firstRow, int lastRow, int firstCol, int lastCol)
					sheet1.addMergedRegion(colMergeRegion);
					k++;
				}else{
					if(gids != null ){
						for(j = 0;j < gids.length;j++){//그룹헤더 영향컬럼 확인
							if(colids[i] != null && gids[j] != null){
								if(colids[i].equals(gids[j])) isMatch = true;
							}
						}
					}
					if(!isMatch){
						cell.setCellValue(colnms[i]);
						//merge(rowspan)
						CellRangeAddress rowMergeRegion = new CellRangeAddress(rownum, rownum+1,i,i);//(int firstRow, int lastRow, int firstCol, int lastCol)
						sheet1.addMergedRegion(rowMergeRegion);
					}
				}
				isMatch = false;
			}
		}
		// ############################### 4-2) header
		// header value
		rownum++;
		row = sheet1.getRow(rownum);
		if(!groupColumnIds.equals("")){//group헤더를 제외하고 나머지 헤더 
			for(i = 0;i < colnms.length;i++){
				cell = row.getCell(i);
				if(gids != null ){
					for(j = 0;j < gids.length;j++){
						if(colids[i] != null && gids[j] != null){
							if(colids[i].equals(gids[j])){
								cell.setCellValue(colnms[i]);
							}
						}
					}
				}
			}
		}else{//그룹헤더가 없는 일반 헤더
			for(i = 0;i < colnms.length;i++){
				cell = row.getCell(i);
				cell.setCellValue(colnms[i]);
			}
		}
		
		
		String formatStr = "#,##0";
		// ############################### 5) data
		for(i = 0;i < data.size();i++){
			rownum++;
			row = sheet1.getRow(rownum);
			Map rowData = (Map)data.get(i);
			for(j = 0; j < colids.length;j++){
				cell = row.getCell(j);
				
				
//				castToString(rowData.get(colids[j]));
				
				
//				cell.setCellValue(typeCast(castToString(rowData.get(colids[j]))));
				
//				castDouble;
//				castString;
//				System.out.println(colids[j]);
				if(cellTypeCast(typeCast(castToString(rowData.get(colids[j])))) == 0 && !colids[j].equals("EMP_NO")){
				
//					cell.setCellType(cellTypeCast(typeCast(castToString(rowData.get(colids[j])))));
//					if(!colids[j].equals("YYMM") && !colids[j].equals("EMP_NO") && !colids[j].equals("DEPT_CD")&&
//					!colids[j].equals("DEPT_CD") 
//					){
					

					if(coltype.length == colids.length){
							if(Boolean.parseBoolean(coltype[j])){
								style = cell.getCellStyle();
								style.setDataFormat(HSSFDataFormat.getBuiltinFormat(formatStr));
								cell.setCellValue((double) typeCast(castToString(rowData.get(colids[j]))));
								cell.setCellType(cell.CELL_TYPE_NUMERIC);
								cell.setCellStyle(style);
							}else{
								cell.setCellValue(castToString(rowData.get(colids[j])));
								cell.setCellType(cell.CELL_TYPE_STRING);

							}
					}else{
						cell.setCellValue(castToString(rowData.get(colids[j])));
						cell.setCellType(cell.CELL_TYPE_STRING);
					}
//					}
						
//					method = clazz.getMethod("castDouble", Object.class);
				}else{
//					cell.set
					cell.setCellValue(castToString(rowData.get(colids[j])));
					cell.setCellType(cell.CELL_TYPE_STRING);
					
//					method = clazz.getMethod("castString", Object.class);
					
				}
			}
		}

		// ############################### 99) auto cell width 
		for(i = 0;i < colids.length;i++){
			sheet1.autoSizeColumn(i);
		}
		for(i = 0;i < colids.length;i++){
			sheet1.setColumnWidth(i, sheet1.getColumnWidth(i) + 1000);
		}

		/**
		 * FileOutStream
		 */
		String fileName =ComFileUtil.generateTempKey()+ "_" + CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss") + ".xls";
		
		String path =(String) parameter.get("path");
		
		// 디렉토리 생성 
		File pathDir = new File(path);
		if(!pathDir.exists()){
			pathDir.mkdirs();
		}
				
//				
		File file = new File(path + "/" + fileName);
		FileOutputStream fileOutputStream = new FileOutputStream(file);
		try{
			workbook.write(fileOutputStream);
			fileOutputStream.close();
		}catch(FileNotFoundException e){
			logger.error(e.getMessage());
			throw e;
		}catch(IOException e){
			logger.error(e.getMessage());
			throw e;
		}finally{
			if(fileOutputStream != null){				
				fileOutputStream.flush();
				fileOutputStream.close();
			}			
		}
		return fileName;
	}
	
	public static String castToString(Object obj){
		String str = new String();
		if(obj instanceof String){str= (String) obj;			
		}else if(obj instanceof BigDecimal){
			str = ((BigDecimal)obj).toString();
		}else if(obj instanceof Long){
			str = ((Long)obj).toString();
		}else if(obj instanceof Integer){
			str = ((Integer)obj).toString();
		}else if(obj instanceof Double){
			str = ((Double)obj).toString();
		}else if(obj instanceof Float){
			str = ((Float)obj).toString();
		}
		return str;
	}
	
	private static  Object typeCast(String obj){
		
		if(obj.matches("\\-?[0-9]{1,}")){
			return Double.parseDouble(obj);
		}else if(obj.matches("\\-?[0-9]{1,}\\.[0-9]{1,}")){
			return Double.parseDouble(obj);
		}else{
			return obj;
		}
	}

	public static int cellTypeCast(Object obj){
		int result = 1;
//		getInstanceType
		if(obj instanceof String){
			result =1;			
		}else if(obj instanceof Integer){
			result = 0;
		}else if(obj instanceof Double){
			result = 0;
		}
		return result;
	}
	
	private Double castDouble(Object obj){
		return (Double) obj;
	}
	
	private String castString(Object obj){
		return (String) obj;
	}
}
