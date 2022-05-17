package applications.excel;

import infrastructure.exception.SystemException;
import infrastructure.inheritance.BaseController;
import infrastructure.log.LoggingServiceImpl;
import infrastructure.util.CastUtil;
import infrastructure.util.CommonUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component("excelUploadComponent")
public class ExcelUploadComponent implements ExcelUpload{
	
	/**
	 * Excel File Upload
	 */
	public List doUpload(Map parameter) throws Exception {
		/**
		 * Parameter
		 */
		String columns = CastUtil.castToString(parameter.get("columnIds"));
		//String columnNms = CommonUtil.toString(parameter.get("columnNames"));
		int firstRow = CastUtil.castToInteger(parameter.get("firstRow"))-1;
		
		//System.out.println("========= columns =======" + columns);
		//System.out.println("========= columnNms =======" + columnNms);
		//System.out.println("========= firstRow =======" + firstRow);
		
		/**
		 * Directory
		 */
		String path = CommonUtil.getDirectoryUploadExcel();
		File dir = new File(path);
		if(!dir.isDirectory()) {
			dir.mkdirs();//디렉토리가 없다면 새로 만든다.
		}
		
		/**
		 * SAVE FILE
		 */
		List excelData = new ArrayList();
		
		if(columns != null && !columns.equals("")){
			for (Map.Entry<String, Object> entry : ((Map<String, Object>) parameter).entrySet()){
				if(entry.getValue() instanceof List<?>){
					List<?> value = (List) entry.getValue();
					for(Object obj    : value){
						if(obj instanceof  MultipartFile){
							Map map = new HashMap();
							MultipartFile file =(MultipartFile) obj;
							
							if(file.getSize() > 0){
								int index = file.getOriginalFilename().lastIndexOf(".");
								String ext = file.getOriginalFilename().substring(index);
								File uploadFile = null ;								
								if(fileFilter(ext)){	
									//이동 - web경로로 이동하여 파일읽기 속도 향상
									uploadFile = new File(new File(path), file.getOriginalFilename());
									file.transferTo(uploadFile);
								}
								//엑셀데이터읽기
								if(uploadFile != null){
									excelData = read(uploadFile, file.getOriginalFilename(), columns, firstRow);
								}
							}
						}
					}
				}
			}
		}
		//System.out.println("==============doUpload : " + excelData);
		return excelData;
	}
	
	/**
	 * Excel Data Read
	 */
	private List read(File file, String fileName, String columns, int firstRow) throws Exception {
		
		List excelData = new ArrayList();
		
		//확장자
		int index = fileName.lastIndexOf(".");
		String ext = fileName.substring(index).toLowerCase();
		
		//컬럼정보를 map의 key값으로 사용한다.
		String[] keys = columns.split(",");
		
		//Workbook
		Workbook workbook = null;
		//확장자에 따라 
		FileInputStream is =  new FileInputStream(file);
		try {
			if(ext.equals(".xls")){
				workbook = new HSSFWorkbook(is);
				
			}else if (ext.equals(".xlsx")){
				workbook = new XSSFWorkbook(is);
			}else{
				throw new SystemException("잘못된 파일을 업로드 하셨습니다. 엑셀파일을 업로드 하여 주십시요.(업로드하신 파일 = " + ext+")");
			}
		} catch (IOException e) {
			BaseController.exceptionLogging(e);
		}finally{
			is.close();
		}
		
		Sheet sheet = null;
		//첫번째 시트만 읽는다.
		if(workbook != null && workbook.getSheetAt(0) != null){
			sheet = workbook.getSheetAt(0);
		}
		//Sheet sheet = workbook.getSheetAt(0);
		
		//Row데이터
		if(sheet !=null){
			for(Row row : sheet){
				if(row.getRowNum() < firstRow) continue;//지정된 시작Row부터 읽는다.
				Map rowData = getEmptyMap(keys);//값이 없는 Cell이 Skip되므로 공백으로 초기화하여 생성한다.sa
				
				if(isRowEmpty(row) == false){
					//Cell데이터
					for (Cell cell : row){
						String cellData = "";
						//숫자인지 체크
						if(cell.getCellType() == Cell.CELL_TYPE_NUMERIC){	
							//DATE타입은 우선 NUMERIC으로 인식 하며 NUMERIC이 DATE TYPE인지 확인하여 분기처리.
							if(HSSFDateUtil.isCellDateFormatted(cell)){		
								SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
								 if(cell.getDateCellValue().toString().matches("[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}")){
									 formatter = new SimpleDateFormat("yyyy-MM-dd");
								 }else{
									 formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
								 }
								cellData = formatter.format(cell.getDateCellValue());
							}else{
								cellData = String.valueOf((long)cell.getNumericCellValue());	
							}
						}else if(cell.getCellType()== Cell.CELL_TYPE_FORMULA){
							cellData = String.valueOf((long)cell.getNumericCellValue());				
						}else{
							cellData = cell.getStringCellValue();
						}
						//System.out.println("=========keys======= : " + keys[cell.getColumnIndex()]);
						//System.out.println("=========getColumnIndex======= : " + cell.getColumnIndex());
						//System.out.println("=========cellData======= : " + cellData);
						
						//Map에 데이터를 담는다.
						
						if(keys.length >= cell.getColumnIndex()){
						rowData.put(keys[cell.getColumnIndex()], cellData);
						}
					}
					//List에 데이터를 담는다.
					excelData.add(rowData);
				}
			}
		}
		// 엑셀파일 데이터 업로드 후 서버에 저장되었던 파일 삭제
//		if(file.exists()) {
//			file.delete();
//		}
		synchronized (fileName) {
			if(file.exists()) file.delete();
		}
		
		//System.out.println("==============read : " + excelData);
		return excelData;
	}
	/**
	 * 
	 * <b>공백문자열로 초기화된 HashMap을 반환</b>
	 * @param keys - String[] 키값배열
	 * @return Map
	 */
	private Map getEmptyMap(String[] keys){
		Map map = new HashMap();
		for(int i = 0;i < keys.length;i++){
			map.put(keys[i], "");
		}
		return map;
	}
	
	/**
	 * 
	 * <b>데이터가 아예 없는 Row인 경우 true, 데이터가 있는 Row은 경으 false</b>
	 * @param keys - rowNum
	 * @return boolean
	 */
	public static boolean isRowEmpty(Row row) {
	    for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
	        Cell cell = row.getCell(c);
	        if (cell != null && cell.getCellType() != Cell.CELL_TYPE_BLANK) return false;
	    }
	    return true;
	}	
	
	
	public boolean fileFilter(String ext){
		
		String list = "*.xls;*.xlsx;";
			
		if( list.indexOf(ext) >= 0  ){
			return true;
		} else{
			return false;
		}
	}
}