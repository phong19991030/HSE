package applications.file;

import java.util.List;
import java.util.Map;

public interface SysFileDAO {
	List getListSysFile(Object parameter) throws Exception;
	Map getSysFile(Object parameter) throws Exception;
	String insertSysFile(Object parameter) throws Exception;
	void deleteSysFile(Object parameter) throws Exception;
}