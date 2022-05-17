package module.sys;

import java.util.List;
import java.util.Map;

import infrastructure.inheritance.service.AbstractService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
 
/**
 * @Description : Notice(공지사항)
 * @author		: yjkim
 * @since		: 2019.09.30
 * @Modification Information
 *　Date　　　　　　Name　　　　　 Desc.
 *　──────────　　  ──────────　　 ──────────
 *　2019.09.30　　  Yunju Kim　　　Notice C,R,U,D
 */
@Service("Sys_0303ServiceImpl")
public class Sys_0303ServiceImpl extends AbstractService {

	@Autowired
	Sys_0303DAOImpl dao;
	
	/**
	 * 공지사항 등록
	 * @param noticeInfo(title, content, writer_uid)
	 */
	@Transactional(propagation=Propagation.REQUIRES_NEW, rollbackFor={Exception.class})
	public void insertNotice(Map noticeInfo) throws Exception {
		noticeInfo.put("INS_ID", ((Map)noticeInfo.get("session")).get("USER_UID"));
		
		dao.insertNotice(noticeInfo);
	}
	
	/**
	 * 공지사항 목록 조회
	 * @param params(search condition)
	 * @return Notice list
	 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getNoticeList(Map params) throws Exception {
		return dao.getNoticeList(params);
	}
	
	/**
	 * 공지사항 상세 조회
	 * @param param(notice_id)
	 * @return Notice info
	 */
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public Map getNoticeByID(Map param) throws Exception {
		return dao.getNoticeByID(param);
	}
	
	/**
	 * 공지사항 수정
	 * @param params(title, content, notice_id)
	 */
	@Transactional(propagation=Propagation.REQUIRES_NEW, rollbackFor={Exception.class})
	public void updateNotice(Map params) throws Exception {
		dao.updateNotice(params);;
	}
	
	/**
	 * 공지사항 삭제
	 * @param param(notice_id)
	 */
	@Transactional(propagation=Propagation.REQUIRES_NEW, rollbackFor={Exception.class})
	public void deleteNotice(Map param) throws Exception {
		dao.deleteNotice(param);;
	}
	
	/**
	 * 관리자 여부 체크
	 * @param param(user_uid)
	 * @return System Manager = 1
	 */
	public String adminCheck(Map param) throws Exception {
		param.put("USER_UID", ((Map)param.get("session")).get("USER_UID"));
		
		Map adminCheck = dao.adminCheck(param);
		String adminCnt = adminCheck.get("ADMIN").toString();
		String userRole = "";
		
		if (adminCnt.equals("0")) {
			userRole = "NORMAL";
		} else {
			userRole = "ADMIN";
		}
		
		return userRole;
	}
	
}
