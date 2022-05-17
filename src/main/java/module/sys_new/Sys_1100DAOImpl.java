package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_1100DAOImpl")
public class Sys_1100DAOImpl extends AbstractDAO{

	public Sys_1100DAOImpl() {
		super.namespace = "sys_new.sys1100";
	}

	/* 리스트 데이터 조회 */
	public List getComCodeList(Map param) throws Exception{
		return list("getComCodeList",param);
	}
	
	public List getComCodeListByComm_Cd(Map param) throws Exception{
		return list("getComCodeListByComm_Cd",param);
	}
	
	/* 등록 */
	public int insertComCode(Map param) throws Exception{
		return (int) insert("insertComCode",param);
	}
	/* 수정 */
	public int updateComCode(Map param) throws Exception{
		return (int) update("updateComCode",param);
	}
	/* 삭제 */
	public int deleteComCode(Map param) throws Exception{
		return (int) delete("deleteComCode",param);
	}
	/* 중복체크 */
	public Map checkDuplicateComCode(Map param) throws Exception{
		return map("checkDuplicateComCode",param);
	}
	
}
