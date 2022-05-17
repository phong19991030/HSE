package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0800DAOImpl")
public class Sys_0800DAOImpl extends AbstractDAO{

	public Sys_0800DAOImpl() {
		super.namespace = "sys_new.sys0800";
	}

	/* 리스트 데이터 조회 */
	public List getMenuList(Map param) throws Exception{
		return list("getMenuList",param);
	}
	/* 등록 */
	public int insertMenu(Map param) throws Exception{
		return (int) insert("insertMenu",param);
	}
	/* 수정 */
	public int updateMenu(Map param) throws Exception{
		return (int) update("updateMenu",param);
	}
	/* 삭제 */
	public int deleteMenu(Map param) throws Exception{
		return (int) delete("deleteMenu",param);
	}
	
}
