package module.sys;

import java.util.List;
import java.util.Map;

import infrastructure.inheritance.dao.AbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * @Description : Notice(공지사항)
 * @author		: yjkim
 * @since		: 2019.09.30
 * @Modification Information
 *　Date　　　　　　Name　　　　　 Desc.
 *　──────────　　  ──────────　　 ──────────
 *　2019.09.30　　  Yunju Kim　　　Notice C,R,U,D
 */
@Repository("Sys_0303DAOImpl")
public class Sys_0303DAOImpl extends AbstractDAO {

	public Sys_0303DAOImpl() {
		super.namespace = "sys.sys0303";
	}
	
	/**
	 * 공지사항 등록
	 * @param noticeInfo(title, content, writer_uid)
	 */
	public void insertNotice(Map noticeInfo) throws Exception {
		insert("insertNotice", noticeInfo);
	}
	
	/**
	 * 공지사항 목록 조회
	 * @param params(search condition)
	 * @return Notice list
	 */
	public List getNoticeList(Map params) throws Exception {
		return list("getNoticeList", params);
	}
	
	/**
	 * 공지사항 상세 조회
	 * @param param(notice_id)
	 * @return Notice info
	 */
	public Map getNoticeByID(Map param) throws Exception {
		return map("getNoticeByID", param);
	}
	
	/**
	 * 공지사항 수정
	 * @param params(title, content, notice_id)
	 */
	public void updateNotice(Map params) throws Exception {
		update("updateNotice", params);
	}
	
	/**
	 * 공지사항 삭제
	 * @param param(notice_id)
	 */
	public void deleteNotice(Map param) throws Exception {
		update("deleteNotice", param);
	}
	
	/**
	 * 관리자 여부 체크
	 * @param param(user_uid)
	 * @return System Manager = 1
	 */
	public Map adminCheck(Map param) throws Exception {
		return map("adminCheck", param);
	}
	
}
