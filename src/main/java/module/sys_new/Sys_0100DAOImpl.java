package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Sys_new_0100DAOImpl")
public class Sys_0100DAOImpl extends AbstractDAO{
	
	public Sys_0100DAOImpl() 
	{
		super.namespace = "sys_new.sys0100";
	}
	
	/************ sys_0100 - 발전단지 리스트 *****************/
	public List getFarmList(Map param) throws Exception{
		return list("getFarmList", param);
	}
	
	public Map getFarmCnt(Map param) throws Exception{
		return map("getFarmCnt", param);
	}

	/*********** sys_0101 - 팝업 *************************/
	public List getPopupList(Map param) throws Exception{
		return list("getPopupList", param);
	}
	public Map duplicateCheckOfFarmName(Map param) throws Exception{
		return map("duplicateCheckOfFarmName", param);
	}
	public Map duplicateCheckOfGroupName(Map param) throws Exception{
		return map("duplicateCheckOfGroupName", param);
	}
	/********** sys_0101 - 작성 **************************/
	public int insertFarm(Map param) throws Exception{
		return (int) insert ("insertFarm", param);
	}
	public int insertFarmOper(Map param) throws Exception{
		return (int) insert ("insertFarmOper", param);
	}
	public int insertFarmGroup(Map param) throws Exception{
		return (int) insert ("insertFarmGroup", param);
	}

	/********** sys_0102 - 상세 **************************/
	public Map getFarmInfo(Map param) throws Exception{
		return map("getFarmInfo", param);
	}

	/********** sys_0101 - 수정 **************************/
	public int updateFarm(Map param) throws Exception{
		return (int) update("updateFarm", param);
	}
	
	public int deleteFarmOper(Map param) throws Exception{
		return (int) delete("deleteFarmOper", param);
	}

	public int updateFarmGroup(Map param) throws Exception{
		return (int) update("updateFarmGroup", param);
	}
	
	public int deleteFarmGroup(Map param) throws Exception{
		return (int) delete("deleteFarmGroup", param);
	}
	public int updateTurbine(Map param) throws Exception{
		return (int) update("updateTurbine", param);
	}
	
	/********** sys_0102 - 삭제 **************************/
	public int deleteFarm(Map param) throws Exception{
		return (int) delete("deleteFarm", param);
	}





}
