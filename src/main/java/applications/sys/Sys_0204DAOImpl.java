package applications.sys;

import infrastructure.inheritance.dao.AbstractDAO;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;

@Component("sys_0204DAOImpl")
public class Sys_0204DAOImpl extends AbstractDAO {
	
	public Sys_0204DAOImpl() {
		super.namespace = "sys.sys0204";
	}

	//저장 - Role
	@Transactional(propagation=Propagation.REQUIRED)
	public String saveRoleMgt(Map parameter, HttpServletRequest request) throws Exception {
		
		String result = "true";
//		System.out.println("list의 사이즈" + list.size());
		String crudId = (String) parameter.get("CRUD");
		String sess_user_id =  (String)((Map) parameter.get("session")).get("USER_UID");
		parameter.put("SESS_USER_ID", sess_user_id);
			
	/*	List listroleid = list("getIdRoleMgt", parameter);
		String roleid = (String) parameter.get("ROLE_ID");
			if(listroleid.size()>0) {
				for(int i=0; i<listroleid.size(); i++) {
					Map maps = (Map) listroleid.get(i);
					String role = (String) maps.get("ROLE_ID");
					if(role.equals(roleid)) {
						result="dupl";
						break;					
					}
					
				}		
			} */
		if (crudId.equals("U")) {
			update("updateRoleRM",parameter);
			request.setAttribute("EVENT", "UPDATE");
		}else if(crudId.equals("C")){			

			insert("insertRoleRM",parameter);	
			request.setAttribute("EVENT", "INSERT");
		}
		else {		
		}

		return result;
	}
	@Transactional(propagation = Propagation.REQUIRED)
	public String duplCheckID(Map parameter) throws Exception {

		String result = "true";
		List listroleid = list("getIdRoleMgt", parameter);
		String roleid = (String) parameter.get("ROLE_ID");
			if(listroleid.size()>0) {
				for(int i=0; i<listroleid.size(); i++) {
					Map maps = (Map) listroleid.get(i);
					String role = (String) maps.get("ROLE_ID");
					if(role.equals(roleid)) {
						result="dupl";
						break;					
					}
					
				}		
			}
		return result;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public String deleteRow(Map map) throws Exception {
	

		String result="true";
		if(result.equals("true")){
			delete("deleteRoleUR", map);
			delete("deleteRolePGM", map);
			delete("deleteRoleRM", map);
//			update("updateUserYn",map);
		}
		return 	result;

	}
	
	//저장 -  Role별 프로그램
	@Transactional(propagation=Propagation.REQUIRED)
	public String savePgmForRole(Map parameter, HttpServletRequest request)  {
		
		String result = "true";
		String sess_user_id = (String)((Map) parameter.get("session")).get("USER_UID");

		Map map = new HashMap();
		
		
		try {
		// 저장 눌렀을 때 ROLE_ID에 대해 "U"인 행만 TEST_ROLE_PGM 수정하고

//        List<Map> list = (List<Map>) parameter.get("RESULTLIST");
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = parameter.get("RESULTLIST").toString().replaceAll("&quot;", "\"").replaceAll("null", "\"\"");
        List<Map> list = mapper.readValue(jsonString, new TypeReference<List<Map>>(){});

 
        String crud;
		for (Map row : list) {

			if(row.get("CRUD") != null){
				crud = (String) row.get("CRUD");
				if(crud.equals("U")){ //수정	
					row.put("SESS_USER_ID",sess_user_id);
					map.put("ROLE_ID", row.get("ROLE_ID"));					
					update("savePgmForRole", row);
					request.setAttribute("EVENT", "UPDATE");
//					insert("savePgmForRoleLog", row);
//					delete("deletePgmForRoleUP", row);
//					insert("insertPgmForRoleUP", row);
//					update("updatePgmForRoleUP", row);
				}
			}
		}
		}catch (Exception e) {
			e.printStackTrace();
			result = "false";
		}
	
		return result;
	}
	
}
