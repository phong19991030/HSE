package applications.file;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component("sysFileDAOImpl")
public class SysFileDAOImpl extends AbstractDAO implements SysFileDAO{
	
	public List getListSysFile(Object parameter) throws Exception {		
		return list("common.file.SysFile.getListSysFile", parameter);
	}
		
	public Map getSysFile(Object parameter) throws Exception {
		return (Map)object("common.file.SysFile.getSysFile", parameter);
	}
	
	public String insertSysFile(Object parameter) throws Exception {
		insert("common.file.SysFile.insertSysFile", parameter);
		return ((Map)parameter).get("ATCH_SENT_SEQ").toString();
	}
	
	public void deleteSysFile(Object parameter) throws Exception {
		delete("common.file.SysFile.deleteSysFile", parameter);
	}	
}
