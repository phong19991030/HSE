package applications.file;

import infrastructure.util.CalendarUtil;
import infrastructure.util.ComFileUtil;
import infrastructure.util.CommonUtil;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

// 현재 작동하지 않는 클래스 같다. 쿼리도 그대로 사용하면 열심히 에러를 발생시킨다. 
@Component("uploadComponent")
public class UploadComponent implements Upload{
	protected Logger logger = LogManager.getLogger(UploadComponent.class);
	@Autowired
	private Com_FileDAOImpl fileDao;
	
	
	public String doUpload(Map fileParam) throws Exception {
		String FLE_KEY;
//		String path = CommonUtil.getDirectoryUploadDefault();
		String path = ConstantsFile.UPLOAD_ROOT_PATH + ConstantsFile.UPLOAD_CONTEXT_FILE;
		File dir = new File(path);
		
		if(!dir.isDirectory()) {
			dir.mkdirs();//CLS별로 디렉토리가 없다면 새로 만든다.
		}
		
		FLE_KEY = (String) fileParam.get("fileKey");
		if(FLE_KEY == null || FLE_KEY.equals("") || FLE_KEY.equals("null") ){
			FLE_KEY = ComFileUtil.generateTempKey();
		}
		List filelist = (List) fileParam.get("file_list");
//		for (Map.Entry<String, Object> entry : ((Map<String, Object>) fileParam).entrySet()){
//			String key = entry.getKey();
			
//			if(entry.getValue() instanceof List<?>){
//				List<?> value = (List) entry.getValue();
//				
				int uploadCount = 0;
				for(Object obj    : filelist){
					if(obj instanceof  MultipartFile){
						Map map = new HashMap();
						MultipartFile file =(MultipartFile) obj;
						
						// 확장자
						int index = file.getOriginalFilename().lastIndexOf(".");
						String ext = file.getOriginalFilename().substring(index);
						if(fileFilter(ext)){
							// 변환된 파일명
							String newFileName = file.getName() +"_"+uploadCount+ "_" +CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss")+ext;
							
							
							map.put("FILE", file);
							map.put("FLE_KEY", FLE_KEY);
	//						map.put("PGM_ID", pgm_id);
	//						map.put("RQST_NO", rqst_no);
							//map.put("ATCH_FLE_SEQ", uploadCount); -- DB에서 생성
	//						map.put("FLE_FIELD", file.getName());
							map.put("FLE_NM", file.getOriginalFilename());//SAVE_NAME은 DB에서 생성				
							map.put("NEW_FLE_NM", newFileName);//SAVE_NAME은 DB에서 생성				
							map.put("FLE_SZ", file.getSize());
							map.put("FLE_TP", ext);	
							map.put("REGI_DT", CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss"));
							
							//DB에 저장
							fileDao.insert("insertFile", map); 
							
							file.transferTo(new File(new File(ConstantsFile.UPLOAD_CONTEXT_PATH+ ConstantsFile.UPLOAD_CONTEXT_FILE), newFileName));
	//						fileList.add(map);
							
							uploadCount++;
						}
					}
				}
//			}
//		}
		return FLE_KEY;
	}
	
	
	
	/**
	 * FileUpload
	 */
	public List<Map> doUpload(Map fileParam, String pgm_id, String rqst_no, String atch_fle_seq) throws Exception {
		/**
		 * File List
		 */
		List<Map> fileList = new ArrayList<Map>();
		
		/**
		 * Directory
		 */		
		//String path = CommonUtil.getDirectoryPath("");
//		String path = CommonUtil.getDirectoryUploadDefault();
		String path = ConstantsFile.UPLOAD_ROOT_PATH + ConstantsFile.UPLOAD_CONTEXT_FILE;
		File dir = new File(path);
		if(!dir.isDirectory()) {
			dir.mkdirs();//CLS별로 디렉토리가 없다면 새로 만든다.
		}
		
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) fileParam).entrySet()){
			String key = entry.getKey();
			
			if(entry.getValue() instanceof List<?>){
				List<?> value = (List) entry.getValue();
				
				int uploadCount = 0;
				for(Object obj    : value){
					if(obj instanceof  MultipartFile){
						Map map = new HashMap();
						MultipartFile file =(MultipartFile) obj;
						
						// 확장자
						int index = file.getOriginalFilename().lastIndexOf(".");
						String ext = file.getOriginalFilename().substring(index);
						if(fileFilter(ext)){
							// 변환된 파일명
							String newFileName = file.getName() +"_"+uploadCount+ "_" +CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss")+ext;
							
							map.put("FILE", file);
							map.put("PGM_ID", pgm_id);
							map.put("RQST_NO", rqst_no);
							//map.put("ATCH_FLE_SEQ", uploadCount); -- DB에서 생성
							map.put("FLE_FIELD", file.getName());
							map.put("FLE_NM", file.getOriginalFilename());//SAVE_NAME은 DB에서 생성				
							map.put("NEW_FLE_NM", newFileName);//SAVE_NAME은 DB에서 생성				
							map.put("FLE_SZ", file.getSize());
							map.put("FLE_TP", ext);	
							map.put("REGI_DT", CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss"));
							
							//DB에 저장
							//comFiledao.insert("insertSysFile", map); 
							
							file.transferTo(new File(new File(ConstantsFile.UPLOAD_CONTEXT_PATH+ ConstantsFile.UPLOAD_CONTEXT_FILE), newFileName));
							fileList.add(map);
							
							uploadCount++;
						}
					}
				}
			}
		}
		return fileList;
	}
	
	
	public String doUploadEmpImg(Map fileParam) throws Exception {
		String FLE_KEY;
		String path = CommonUtil.getDirectoryUploadEmpImg();
		File dir = new File(path);
		
		if(!dir.isDirectory()) {
			dir.mkdirs();//CLS별로 디렉토리가 없다면 새로 만든다.
		}
		
		
		
		 List list = (List) fileParam.get("file");
			MultipartFile file = (MultipartFile) list.get(0);
				
//		for (Map.Entry<String, Object> entry : ((Map<String, Object>) fileParam).entrySet()){
//			String key = entry.getKey();
			
//			if(entry.getValue() instanceof List<?>){
//				List<?> value = (List) entry.getValue();
//				
				int uploadCount = 0;
				
				// 확장자
				int index = file.getOriginalFilename().lastIndexOf(".");
				String ext = file.getOriginalFilename().substring(index);
				
				String newFileName =  (String)fileParam.get("emp_no");
				if(fileFilter(ext)){
				// 변환된 파일명
					
					//DB에 저장
					file.transferTo(new File(new File(path), newFileName));
	//						fileList.add(map);
					
					uploadCount++;
				}
//			}
//		}
		return newFileName;
	}
	
	
	public boolean fileFilter(String ext){
			
			String list = "*.xls;*.xlsx;*.doc;*.docx;*.ppt;*.pptx;*.hwp;*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.pdf;*.txt;"
				+"*.xls;*.xlsx;*.doc;*.docx;*.ppt;*.pptx;*.hwp;*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.pdf;*.txt";
				
			if( list.indexOf(ext) >= 0  ){
				return true;
			} else{
				return false;
			}
	}
	
	public void updateTempKey(String tempKey ,String fileKey){
		Map map = new HashMap();
		map.put("FLE_KEY",fileKey);
		map.put("TEMP_KEY",tempKey);
		
		
		try {
			fileDao.update("updateFileKey",map) ;
		} catch (Exception e) {
			// TO-DO Auto-generated catch block
			logger.error(e.getMessage());
		}
	}
}

