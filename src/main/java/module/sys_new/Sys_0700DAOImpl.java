package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0700DAOImpl")
public class Sys_0700DAOImpl extends AbstractDAO{

	public Sys_0700DAOImpl() {
		super.namespace = "sys_new.sys0700";
	}

	/* 리스트 데이터 조회 */
	public List getNoticeList(Map param) throws Exception{
		return list("getNoticeList",param);
	}

	public Map getNoticeCnt(Map param) throws Exception{ 
		return  map("getNoticeCnt",param);
	}

	public List getRegisterList(Map param) throws Exception{
		return list("getRegisterList",param);
	}
	
	/* 등록, 수정, 삭제*/
	public int insertNotice(Map param) throws Exception{
		return (int) insert("insertNotice", param);
	}
	public int updateNotice(Map param) throws Exception{
		return (int) update("updateNotice", param);
	}
	public int deleteNotice(Map param) throws Exception{
		return (int) delete("deleteNotice", param);
	}
	
	/* 상세 데이터 조회 */
	public Map getNoticeInfo(Map param) throws Exception{
		return map("getNoticeInfo",param);
	}


}
