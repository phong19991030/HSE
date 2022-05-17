package applications.excel;

import infrastructure.util.CalendarUtil;
import infrastructure.util.CommonUtil;
import infrastructure.util.CastUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class FsExcelWriter {
	protected static Logger logger = LogManager.getLogger(FsExcelWriter.class);	
	public static String write(Map parameter) throws Exception {
		String excelTitle = new String(CastUtil.castToString(parameter.get("excelTitle")).getBytes("8859_1"), "utf-8");
		String columnIds = CastUtil.castToString(parameter.get("columnIds"));
		String columnNames = new String(CastUtil.castToString(parameter.get("columnNames")).getBytes("8859_1"), "utf-8");
		String groupStartColumnIds = CastUtil.castToString(parameter.get("groupStartColumnIds"));
		String groupNumberOfColumns = CastUtil.castToString(parameter.get("groupNumberOfColumns"));
		String groupColumnNames = CastUtil.castToString(parameter.get("groupColumnNames"));
				
		String[] colids = columnIds.split(",");
		String[] colnms = columnNames.split(",");
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
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet1 = workbook.createSheet("Sheet1");
		// ############################### 2-1) row, cell, style
		XSSFRow row = null;
		XSSFCell cell = null;
		XSSFCellStyle style = workbook.createCellStyle();
		XSSFDataFormat df = workbook.createDataFormat();
		// ############################### 2-2) merge하는 경우를 대비해서 전체 row,cell을 일괄생성한다.
		// row갯수 = title=1 + header=1~2(group에 따라) + data.size()
		// col갯수 = colids.length
		totalRowCount = 1 + (groupStartColumnIds.equals("") ? 1 : 2) + data.size();
		for(i = 0;i < totalRowCount;i++){
			row = sheet1.createRow(i);
			for(j = 0;j < colids.length;j++){
				cell = row.createCell(j);
				
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
						style = workbook.createCellStyle();
						style.setBorderTop(CellStyle.BORDER_THIN);
						style.setBorderBottom(CellStyle.BORDER_THIN);
						style.setBorderLeft(CellStyle.BORDER_THIN);
						style.setBorderRight(CellStyle.BORDER_THIN);
						style.setAlignment(CellStyle.ALIGN_GENERAL);
						style.setDataFormat(df.getFormat("###,###,###,###,##0.00")); 
						cell.setCellStyle(style);
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
		
		// ############################### 5) data
		for(i = 0;i < data.size();i++){
			rownum++;
			row = sheet1.getRow(rownum);
			Map rowData = (Map)data.get(i);
			for(j = 0; j < colids.length;j++){
				cell = row.getCell(j);
				
				//null 처리 이후에 데이터 유형에 맞게 셀에 값 입력 
				if (rowData.get(colids[j]) != null) {
					if (colnms[j].indexOf("h") >= 0 && rowData.get(colids[j]).toString().indexOf("%") < 0) {
						cell.setCellValue(Double.parseDouble(CommonUtil.getMapValue(rowData, colids[j], "0")));
					} else {
						if (rowData.get(colids[j]).getClass().getName().equals("java.lang.String")) {
							cell.setCellValue(CommonUtil.getMapValue(rowData, colids[j], ""));
						} else if (rowData.get(colids[j]).getClass().getName().equals("java.math.BigDecimal")) {
							cell.setCellValue(Double.parseDouble(CommonUtil.getMapValue(rowData, colids[j], "0")));
						}
					}
				} else {
					if (colnms[j].indexOf("h") >= 0) {
						cell.setCellValue(0);
					} else {
						cell.setCellValue("");
					}
				}//end if (rowData.get(colids[j]) != null) {
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
		String fileName = excelTitle + "_" + CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss") + ".xlsx";
		String path = "";
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
}
