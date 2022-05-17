package infrastructure.util;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author keim
 *
 */
/**
 * 기능명 
 * @작성일    : 2015. 6. 22. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public final class ComFileUtil {
	protected static Logger logger = LogManager.getLogger(ComFileUtil.class);
    
	
	public static String generateTempKey(){
		String resultKey= "";
		
		Calendar  cal = Calendar.getInstance();
		
		
		resultKey =Long.toHexString(cal.getTimeInMillis()); 
		
		
		return resultKey;
				
		
	}
	
	
	public List<Map> doUpload(Map fileParam, String pgm_id, String rqst_no, String atch_fle_seq) throws Exception {
		/**
		 * File List
		 */
		List<Map> fileList = new ArrayList<Map>();
		
		/**
		 * Directory
		 */		
		//String path = CommonUtil.getDirectoryPath("");
		String path = CommonUtil.getDirectoryUploadDefault();
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
						
						file.transferTo(new File(new File(path), newFileName));
						fileList.add(map);
						
						uploadCount++;
						}
					}
				}
			}
		}
		return fileList;
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
}