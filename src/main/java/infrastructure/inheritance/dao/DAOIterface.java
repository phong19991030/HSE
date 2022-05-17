package infrastructure.inheritance.dao;

import java.util.List;
import java.util.Map;

/**
 * @author keim
 *
 * 전자정부 프레임워크 호화성가이드 규칙 3번 
 * 데이터 액서세 아키텍처규칙 
 *	데이터 액세스 규칙은 모든 DAO 클래스들이 EgovAbstractDAO를 상속받아서 사용하여야 하며,
 * EgovAbstractDAO를 무시하고 사용하지 않는 경우를 방지하기 위한 규칙입니다. 
 * EgovAbstractDAO의 활용이 프로젝트에 부적합한 경우 해당 클래스를 확장한 클래스를 상속받아서 활용하여도 무방합니다.
 */
public interface DAOIterface {
 
	public List<?> list(String Name) throws Exception ;
	public List<?> list(String namespace,String Name) throws Exception;
	public List<?> list(String name,Object parameter) throws Exception ;
	public List<?> list(String namespace, String name,Object parameter) throws Exception ;
	public Map<?,?> map(String name, String mapKey) throws Exception; 
	public Map<?,?> map(String name, Object parameter) throws Exception; 
	
	public Map<?,?> map(String name, Object parameter, String mapKey) throws Exception; 
	public Map<?,?> map(String namespace, String name, Object parameter) throws Exception;
	public Object object(String name) throws Exception ;
	public Object object(String namespace,String name) throws Exception; 
	public Object objectString(String name,String parameter) throws Exception;
	public Object object(String name,Object parameter) throws Exception ;
	public Object object(String namespace,String name,Object parameter) throws Exception ;
	
	

	public Object insert() throws Exception;
	public Object insert(Object parameter) throws Exception;
	public Object insert(String name,Object parameter) throws Exception;
	public Object insert(String namespace,String name, Object parameter) throws Exception;
	
	public Object update(Object parameter) throws Exception ;
	public Object update(String name,Object parameter) throws Exception; 
	public Object update(String namespace,String name, Object parameter) throws Exception; 
	
	public Object delete() throws Exception;
	public Object delete(Object parameter) throws Exception; 
	public Object delete(String name,Object parameter) throws Exception;
	public Object delete(String namespace,String name, Object parameter) throws Exception; 
	
//	public Object upsertA(Object parameter) throws Exception {
//		getDupCheckST0101
		
//		return upsert(namespace, parameter);
//	}
	
	/**
	 * Object Procedure DAO
	 * @return Object
	 * @throws Exception
	 */
	public Object procedure(String name) throws Exception ;
	public Object procedure(String namespace,String name) throws Exception;
	public Object procedure(String name,Object parameter) throws Exception;
	public Object procedure(String namespace,String name,Object parameter) throws Exception; 
	
}
