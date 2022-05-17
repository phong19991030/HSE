package applications.file;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

/** 
 * 기능 : 파일관리
 * 이력 : 
 * 1) 2015. 6. 16. leehs 최초생성
 * 비고 : 
 */
@Component("com_FileDAOImpl")
public class Com_FileDAOImpl extends AbstractDAO {
	public Com_FileDAOImpl() {
		super.namespace = "common.file.file";
	}
	
	public Map getMsgFileMap(Map parameter) throws Exception {
		return (Map)object("getMsgFileMap", parameter);
	}
	
	public Map getFile(Map map){
		Map resultMap = new HashMap();
		try {
			resultMap = (Map) object("getFileList",map);
		} catch (Exception e) {
			// TO-DO Auto-generated catch block
			logger.error(e.getMessage());
		}
		return resultMap;
	}
}