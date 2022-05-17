package applications.sys;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import applications.util.Utils;
import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CommonUtil;
import kr.co.a2m.security.kryptos.A2mSHA;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Sys_0201ServiceImpl")
@Transactional
public class Sys_0201ServiceImpl extends AbstractService {

	@Autowired
	public Sys_0201DAOImpl sys_0201dao;
	
	private String initPw = "1234";

	public Sys_0201ServiceImpl() {
		super.name = "sys_0201DAOImpl";
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public String saveSTM0201(Map parameter, HttpServletRequest request) throws Exception {

		String res = "true";
		
		Map sees_user_id = new HashMap();
		
		/*
		 * @JK - 보안 취약점 수정 
		 */
//		sees_user_id.put("SESS_USER_ID", ((Map) parameter.get("session")).get("USER_ID"));
//
//		((Map) parameter.get("form")).putAll(sees_user_id); // - 방법1
//
//		String userId = (String) ((Map) parameter.get("form")).get("USER_ID");
//		
//		String crud = (String) ((Map) parameter.get("form")).get("CRUD");
//		
//		if ((((Map) parameter.get("form")).get("inputPWD") != null || !((Map) parameter.get("inputPWD")).get("PWD").equals(""))) {
//			String pwd = (String) ((Map) parameter.get("form")).get("inputPWD");
//			if (pwd.equals("") && crud.equals("U")) {
//				Map map = sys_0201dao.map("getUser", parameter.get("form"));
//				((Map) parameter.get("form")).put("PWD", map.get("PWD"));
//			} else {
//				A2mSHA sha = new A2mSHA();
//				((Map) parameter.get("form")).put("PWD", sha.encrypt(pwd));
//			}
//		}
//		
//		String ATTACH = CommonUtil.getMapValue(parameter, "ATCH_FLE_SEQ", "");
//		Map formInfor = (Map) parameter.get("form");
//		if (!Utils.isNullOrEmpty(ATTACH)) {
//			formInfor.put("LOGO", ATTACH);
//		}
//		String ROLE_ID =  (String) parameter.get("ROLE_ID");
//		String GERATOR_ID =  (String) parameter.get("GERATOR_ID");
		String userId = "";
		String crud = "";
		String ATTACH = "";
		String ROLE_ID = "";
		String GERATOR_ID = "";
		Map formInfor = null;
		if(parameter != null) {
			sees_user_id.put("SESS_USER_ID", ((Map) parameter.get("session")).get("USER_ID"));
			
			((Map) parameter.get("form")).putAll(sees_user_id); // - 방법1
			
			userId = (String) ((Map) parameter.get("form")).get("USER_ID");
			
			crud = (String) ((Map) parameter.get("form")).get("CRUD");
			
			if ((((Map) parameter.get("form")).get("inputPWD") != null || !((Map) parameter.get("inputPWD")).get("PWD").equals(""))) {
				String pwd = (String) ((Map) parameter.get("form")).get("inputPWD");
				if (pwd.equals("") && crud.equals("U")) {
					Map map = sys_0201dao.map("getUser", parameter.get("form"));
					((Map) parameter.get("form")).put("PWD", map.get("PWD"));
				} else {
					A2mSHA sha = new A2mSHA();
					((Map) parameter.get("form")).put("PWD", sha.encrypt(pwd));
				}
			}
			
			ATTACH = CommonUtil.getMapValue(parameter, "ATCH_FLE_SEQ", "");
			formInfor = (Map) parameter.get("form");
			if (!Utils.isNullOrEmpty(ATTACH)) {
				formInfor.put("LOGO", ATTACH);
			}
			ROLE_ID =  (String) parameter.get("ROLE_ID");
			GERATOR_ID =  (String) parameter.get("GERATOR_ID");
		}
		
		String[] partsGenerator = GERATOR_ID.split(",");
		//int a= parts_generator.length;
		
		String[] parts = ROLE_ID.split(",");
		
		try {
			
			if (crud.equals("U")) {
				sys_0201dao.update("updateUser", formInfor);
				sys_0201dao.update("updateUserInfo", formInfor);
				sys_0201dao.delete("deleteUserRole", formInfor);
				sys_0201dao.delete("deleteAuthority", formInfor);
				
				for(int i=0;i< parts.length;i++) {
					formInfor.put("ROLE_ID", parts[i]);
					sys_0201dao.insert("insertUserRole", formInfor);
				}
				if (!Utils.isNullOrEmpty(GERATOR_ID)) {

					for (int i = 0; i < partsGenerator.length; i++) {
						formInfor.put("GERATOR_ID", partsGenerator[i]);
						sys_0201dao.insert("insertAuthority", formInfor);
					}
				}
				request.setAttribute("EVENT", "UPDATE");

			} else if (crud.equals("C")) {
				sys_0201dao.insert("insertUser", formInfor);
				sys_0201dao.insert("insertUserInfo", formInfor);
				for(int i=0;i< parts.length;i++) {
					formInfor.put("ROLE_ID", parts[i]);
					sys_0201dao.insert("insertUserRole", formInfor);
				}
				if (!Utils.isNullOrEmpty(GERATOR_ID)) {
					for(int i=0;i< partsGenerator.length;i++) {
						formInfor.put("GERATOR_ID", partsGenerator[i]);
						sys_0201dao.insert("insertAuthority", formInfor);
					}
				}
				request.setAttribute("EVENT", "INSERT");

			} 
			
		} catch (Exception e) {
			res = "false";
			//e.printStackTrace();
			exceptionLogging(e);
		}
		return res;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public String duplCheckID(Map parameter) throws Exception {

		String res = "true";
		String userId = (String) ((Map) parameter.get("form")).get("USER_ID");

		// 사용자ID 중복체크
		String chkUserId = (String) objectString("chkUserId", userId);

		try {
			// 중복체크
			if (chkUserId.equals("0"))
				res = "uniq";
			else
				res = "dupl";
		} catch (Exception e) {
			res = "false";
			throw e;
		}
		return res;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public String saveSTM0201Mdl(Map parameter) throws Exception {
//		return stm_0201dao.saveSTM0201Mdl(parameter);
		return "";
	}

	@SuppressWarnings("unchecked")
	public void initPassword(String user_uid) throws Exception {
		
		A2mSHA sha = new A2mSHA();
		String password = sha.encrypt(initPw);
		
		Map<String, String> user = new HashMap();
		user.put("USER_UID", user_uid);
		user.put("PWD", password);
		
		try {
			sys_0201dao.update("initPassword", user);
			sys_0201dao.update("initLoginState", user);			
		} catch(Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		
	}

	/* @hy 사용자 관리 상세정보 조회*/
	public Map getUserInfo(Map parameter) throws Exception{
		return sys_0201dao.getUserInfo(parameter);
	}
}