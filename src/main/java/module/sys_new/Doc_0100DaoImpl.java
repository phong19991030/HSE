package module.sys_new;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Doc_0100DaoImpl")
public class Doc_0100DaoImpl extends AbstractDAO {
	public Doc_0100DaoImpl() {
		super.namespace = "sys_new.doc_0100";
	}
	
	
	public List getDocList(Map param) throws Exception{
		return list("getDocList",param);
	}
	public Map getDocInfo(Map param) throws Exception{
		return map("getDocInfo", param);
	}
	
	public Map getFileInfo(Map param) throws Exception{
		return map("getFileInfo", param);
	}
	
	public Map countDoc(Map param) throws Exception{
		return map("countDoc", param);
	}
	
	public List getDocGroup() throws Exception{
		return list("getDocGroup");
	}
	public int insertDoc(Map param) throws Exception{
		return (int) insert("insertDoc",param);
	}
	
	public int updateDoc(Map param) throws Exception{
		return (int) update("updateDoc",param);
	}
	
	public int deleteDoc(Map param) throws Exception{
		return (int) delete("deleteDoc",param);
	}
	public int deleteFile(String ATCH_FLE_SEQ) throws Exception{
		return (int) delete("deleteFile",ATCH_FLE_SEQ);
	}

}
