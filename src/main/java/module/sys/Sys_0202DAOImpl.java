package module.sys;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * 프로그램관리 구현체 기능 : 이력 : 1) 2014. 9. 29. 이한신 최초생성 비고 :
 */
@Component("sys_0202DAOImpl")
public class Sys_0202DAOImpl extends AbstractDAO {

	public Sys_0202DAOImpl() {
		super.namespace = "sys.sys0202";
	}

	/**
	 * 프로그램내역 저장 (비즈니스 로직)
	 * 
	 * @작성일 : 2014. 12. 2.
	 * @작성자 : leehs
	 * @프로그램설명 : 프로그램관리 저장 (비즈니스 로직)
	 * @진행상태: TO-DO
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(propagation = Propagation.REQUIRED)
	public String saveSTM0202(Map parameter, HttpServletRequest request) throws Exception {
		String res = "true";

		// 세션 = sess_user_id
		String sess_user_id = (String) ((Map) parameter.get("session")).get("USER_UID");

		// 프로그램ID 중복체크
		// String chkID = "";

		// 프로그램내역 그리드 Data
		List<Map> list = (List<Map>) parameter.get("RESULTLIST");

		// CRUD 상태값
		String crud;
		try {
			for (Map row : list) {
				// 저장
				if (row.get("CRUD") != null) {
					crud = (String) row.get("CRUD");
					if (crud.equals("C")) {
						// chkID = (String) object("getCnt", row);
						// if(chkID.equals("0")){
						row.put("SESS_USER_ID", sess_user_id);
						request.setAttribute("EVENT", "INSERT");
						save("save", row);
						// }
					}
					// 수정
					else if (crud.equals("U")) {
						row.put("SESS_USER_ID", sess_user_id);
						request.setAttribute("EVENT", "UPDATE");
						save("save", row);
					}
					// 삭제
					else if (crud.equals("D")) {
						request.setAttribute("EVENT", "DELETE");
						delete("delete", row);
					}
				}
			}
		} catch (NumberFormatException e) {
			logger.error(e.getMessage());
			res = "false";
		}

		return res;
	}

	@SuppressWarnings("rawtypes")
	private void save(String queryID, Map param) throws NumberFormatException, Exception {
		if ((Integer) object("countPGM", param) > 0) {
			update("updatePGM", param);
		} else {
			insert("insertPGM", param);
		}

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(propagation = Propagation.REQUIRED)
	public String saveFld(Map parameter, HttpServletRequest request) throws Exception {
		String res = "true";
		// 세션 = sess_user_id
		String sess_user_id = (String) ((Map) parameter.get("session")).get("USER_UID");

		// 프로그램ID 중복체크
		// String chkID = "";

		// 프로그램내역 그리드 Data
		List<Map> list = (List<Map>) parameter.get("RESULTLIST");

		// CRUD 상태값
		String crud;
		try {
			for (Map row : list) {
				// 저장
				if (row.get("CRUD") != null) {
					crud = (String) row.get("CRUD");
					if (crud.equals("C")) {
						// chkID = (String) object("getCnt", row);
						// if(chkID.equals("0")){
						insert("insertPgmFieldList", row);
						request.setAttribute("EVENT", "INSERT");
						// }
					}
					// 수정
					else if (crud.equals("U")) {
						row.put("SESS_USER_ID", sess_user_id);
						update("updatePgmFieldList", row);
						request.setAttribute("EVENT", "UPDATE");
					}
					// 삭제
					else if (crud.equals("D")) {
						delete("deletePgmFieldList", row);
						request.setAttribute("EVENT", "DELETE");
					}
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		return res;
	}

}