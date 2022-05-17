// 기존 코드
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
//
// import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
//
// public class AbstractService extends EgovAbstractServiceImpl {
// protected Logger logger = LoggerFactory.getLogger(AbstractService.class);
// }


package infrastructure.inheritance.service;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;

import infrastructure.context.AppContext;
import infrastructure.inheritance.dao.AbstractDAO;

/**
 * 기능명 
 * @작성일    : 2016. 4. 5. 
 * @작성자      : kimhd
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public class AbstractService implements ServiceInterface {
		
	public AbstractDAO dao;
	public String name ; 
	//public Logger looger = Logger.getLogger("Service");
	public Logger logger = LogManager.getLogger(AbstractService.class);
	
	public AbstractService() {
		// TODO Auto-generated constructor stub
	}
	
	public AbstractDAO getDao() {
		return dao;
	}
	public void setDao(AbstractDAO dao) {
		this.dao = dao;
	}

	public void chkDao(){
		if(dao == null){
			Class<? extends AbstractDAO> clazz ; 
			clazz = AbstractDAO.class;
			
			ApplicationContext context = 
			        AppContext.getApplicationContext();
			dao = clazz.cast( context.getBean(name));
		}
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 
	 * @Method : logging
	 * @Author : pjk
	 * @Date : Dec 30, 2020
	 * @param msg
	 * @Description : 보안 취약점에 의한 공통 logging 함수 추가  
	 */
	public void exceptionLogging(Exception e) {
		logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
	}

//	public Class getInherited() {
//		return inherited;
//	}
//
//	public void setInherited(Class inherited) {
//		this.inherited = inherited;
//	}

	@Override
	public List<?> list(String Name) throws Exception {
	    chkDao();
		return dao.list(Name);
	}
	@Override
	public List<?> list(String namespace, String Name) throws Exception {
		chkDao();
		return dao.list(namespace, Name);
	}
	@Override
	public List<?> list(String name, Object parameter) throws Exception {
		chkDao();
		return dao.list(name, parameter);
	}
	@Override
	public List<?> list(String namespace, String name, Object parameter)
			throws Exception {
		chkDao();
		return dao.list(namespace, name, parameter);
	}
	
	
	@Override
	public Map<?, ?> map(String name, String mapKey) throws Exception {
	    chkDao();
		return dao.map(name, mapKey);
	}
	@Override
	public Map<?, ?> map(String name, Object parameter) throws Exception {
	    chkDao();
		return dao.map(name, parameter);
	}
	@Override
	public Map<?, ?> map(String name, Object parameter, String mapKey)
			throws Exception {
	    chkDao();
		return dao.map(name, parameter, mapKey);
	}
	
	@Override
	public Map<?, ?> map(String namespace, String name, Object parameter) throws Exception {
		chkDao();
		return dao.map(namespace, name, parameter);
	}
	
	@Override
	public Object object(String name) throws Exception {
	    chkDao();
		return dao.object(name);
	}
	@Override
	public Object object(String namespace, String name) throws Exception {
	    chkDao();
		return dao.object(namespace, name);
	}
	@Override
	public Object objectString(String name, String parameter) throws Exception {
	    chkDao();
		return dao.objectString(name, parameter);
	}
	@Override
	public Object object(String name, Object parameter) throws Exception {
	    chkDao();
		return dao.object(name, parameter);
	}
	@Override
	public Object object(String namespace, String name, Object parameter)
			throws Exception {
	    chkDao();
		return dao.object(namespace, name, parameter);
	}
	
	
	@Override
	public Object insert() throws Exception {
	    chkDao();
		return dao.insert();
	}
	@Override
	public Object insert(Object parameter) throws Exception {
	    chkDao();
		return dao.insert(parameter);
	}
	@Override
	public Object insert(String name, Object parameter) throws Exception {
	    chkDao();
		return dao.insert(name, parameter);
	}
	@Override
	public Object insert(String namespace, String name, Object parameter)
			throws Exception {
	    chkDao();
		return dao.insert(namespace, name, parameter);
	}
	
	
	@Override
	public Object update(Object parameter) throws Exception {
	    chkDao();
		return dao.update(parameter);
	}
	@Override
	public Object update(String name, Object parameter) throws Exception {
	    chkDao();
		return dao.update(name, parameter);
	}
	@Override
	public Object update(String namespace, String name, Object parameter)
			throws Exception {
	    chkDao();
		return dao.update(namespace, name, parameter);
	}
	
	
	@Override
	public Object delete() throws Exception {
	    chkDao();
		return dao.delete();
	}
	@Override
	public Object delete(Object parameter) throws Exception {
	    chkDao();
		return dao.delete(parameter);
	}
	@Override
	public Object delete(String name, Object parameter) throws Exception {
	    chkDao();
		return dao.delete(name, parameter);
	}
	@Override
	public Object delete(String namespace, String name, Object parameter)
			throws Exception {
	    chkDao();
		return dao.delete(namespace, name, parameter);
	}
	
	
	@Override
	public Object procedure(String name) throws Exception {
	    chkDao();
		return dao.procedure(name);
	}
	@Override
	public Object procedure(String namespace, String name) throws Exception {
	    chkDao();
		return dao.procedure(namespace, name);
	}
	@Override
	public Object procedure(String name, Object parameter) throws Exception {
	    chkDao();
		return dao.procedure(name, parameter);
	}
	@Override
	public Object procedure(String namespace, String name, Object parameter)
			throws Exception {
	    chkDao();
		return dao.procedure(namespace, name, parameter);
	}
	
	public Object ChangeKeyAtFile(Object object){
		if(object instanceof List) {
			for(Map file:(List<Map>)object) {
				file.put("uniqueIdentifier", file.get("UNIQUEIDENTIFIER"));
				file.remove("UNIQUEIDENTIFIER");
				file.put("fileName", file.get("FILENAME"));
				file.remove("FILENAME");
				file.put("filePath", file.get("FILEPATH"));
				file.remove("FILEPATH");
				file.put("fileType", file.get("FILETYPE"));
				file.remove("FILETYPE");
				file.put("fileSize", file.get("FILESIZE"));
				file.remove("FILESIZE");
			}
		} else if (object instanceof Map) {
			((Map)object).put("uniqueIdentifier", ((Map)object).get("UNIQUEIDENTIFIER"));
			((Map)object).remove("UNIQUEIDENTIFIER");
			((Map)object).put("fileName", ((Map)object).get("FILENAME"));
			((Map)object).remove("FILENAME");
			((Map)object).put("filePath", ((Map)object).get("FILEPATH"));
			((Map)object).remove("FILEPATH");
			((Map)object).put("fileType", ((Map)object).get("FILETYPE"));
			((Map)object).remove("FILETYPE");
			((Map)object).put("fileSize", ((Map)object).get("FILESIZE"));
			((Map)object).remove("FILESIZE");
		}
		
		return object;
	}
}