package infrastructure.log;

import infrastructure.inheritance.dao.AbstractDAO;

import org.springframework.stereotype.Component;

@Component("loggingDAOImpl")
public class LoggingDAOImpl extends AbstractDAO {
	
	public LoggingDAOImpl() {
		super.namespace = "log.logging";
	}
	
//	public List getListST0501(Object parameter) throws Exception {
//		return list("st.ST0501.getListST0501", parameter);
//	}
//	public List getListST0501ForExcel(Object parameter) throws Exception {
//		return list("st.ST0501.getListST0501ForExcel", parameter);
//	}	
//	public Map getST0501(Object parameter) throws Exception {
//		return (Map)object("st.ST0501.getST0207", parameter);
//	}
//	public Object insertST0207(Object parameter) throws Exception {
//		return insert("st.ST0207.insertST0207", parameter);
//	}
//	public Object updateST0207(Object parameter) throws Exception {
//		return insert("st.ST0207.updateST0207", parameter);
//	}
//	public Object updateST0207ForMenuClcd(Object parameter) throws Exception {
//		return insert("st.ST0207.updateST0207ForMenuClcd", parameter);
//	}
//	public Object updateST0207ForUseYn(Object parameter) throws Exception {
//		return insert("st.ST0207.updateST0207ForUseYn", parameter);
//	}	
//	public Object deleteST0207(Object parameter) throws Exception {
//		return insert("st.ST0207.deleteST0207", parameter);
//	}
//
//	public String getDulpCheckST0207(Object parameter) throws Exception {
//		return (String)object("st.ST0207.getDulpCheckST0207", parameter);
//	}
}
