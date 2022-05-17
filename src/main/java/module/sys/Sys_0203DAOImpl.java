package module.sys;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import infrastructure.inheritance.dao.AbstractDAO;

/**
 * 메뉴관리 구현체
 * 기능 : 
 * 이력 : 
 * 1) 2014. 9. 29. 이한신 최초생성
 * 비고 :
 */

@Component("sys_0203DAOImpl")
public class Sys_0203DAOImpl extends AbstractDAO {
	
	public Sys_0203DAOImpl() {
		super.namespace = "sys.sys0203";
	}

	/**
	 * 메뉴관리 등록 Form 저장 (비즈니스 로직)
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리 등록 Form 저장 (비즈니스 로직)
	 * @진행상태: TO-DO
	 */
	@Transactional(propagation=Propagation.REQUIRED)
	public String insertSYS0203(Map parameter) throws Exception 
	{
		
		String res = "true";

		// 세션 = user_id
		String sess_user_id = (String)((Map) parameter.get("session")).get("USER_UID");
		parameter.put("SESS_USER_ID", sess_user_id); 
		
		// 메뉴ID 중복체크
		String chkID = (String) object("getChkID", parameter);
		
		try {
			// 중복된 메뉴ID가 없는 경우
			if(chkID.equals("0")){
				insert("saveMenu", parameter);
			}else{
				res = "false";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		return res;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public String updateSYS0203(Map parameter) throws Exception 
	{
		
		String res = "true";

		// 세션 = user_id
		String sess_user_id = (String)((Map) parameter.get("session")).get("USER_UID");
		parameter.put("SESS_USER_ID", sess_user_id); 
		
		// 메뉴ID 중복체크
		//String chkID = (String) object("getChkID", parameter);
		
		try {
			// 중복된 메뉴ID가 없는 경우
			//if(chkID.equals("0")){
				update("updateMenu", parameter);
			//}else{
			//	res = "false";
			//}
		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		return res;
	}
	
	/**
	 * 메뉴관리내역 수정/삭제 (비즈니스 로직)
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리내역 수정/삭제 (비즈니스 로직)
	 * @진행상태: TO-DO
	 */
	@Transactional(propagation=Propagation.REQUIRED)
	public String saveSYS0203(Map parameter) throws Exception 
	{
		String res = "true";
		
		// 세션 = user_id
		String sess_user_id = (String)((Map) parameter.get("session")).get("USER_UID");
		parameter.put("SESS_USER_ID", sess_user_id); 
		
		// 메뉴관리내역 그리드 Data (List)
//		List<Map> list = (List<Map>) parameter.get("RESULTLIST");
		
		 ObjectMapper mapper = new ObjectMapper();
	        String jsonString = parameter.get("RESULTLIST").toString().replaceAll("&quot;", "\"").replaceAll("null", "\"\"");
	        List<Map> list = mapper.readValue(jsonString, new TypeReference<List<Map>>(){});

		
		// CRUD 상태값		
		String crud;
		
		try {
	 		for(Map row : list)
			{
	 			if(row.get("CRUD") != null){
	 				crud = (String) row.get("CRUD");
	 				// 수정
		 			if(crud.equals("U"))
		 			{
		 				row.put("SESS_USER_ID",sess_user_id);
		 				update("updateMenu", row);
		 			}
		 			// 삭제
		 			else if (crud.equals("D"))
		 			{
		 				delete("deleteMenu", row);
		 			}
	 			}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		return res;
	}

	public String deleteMenu(Map parameter) throws Exception {
		List list = new ArrayList<>();
//			list = list("getChildrenMenu", parameter);
//		if(list != null && !list.isEmpty()) {
//			return "hasChildren";
//		}
//		
//		delete("deleteMenu", parameter);
//			parameter.put("LIST_CHILDREN", list);
			delete("deleteAllBranch", parameter);

		
		return "true";
	}
}