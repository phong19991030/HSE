package infrastructure.inheritance.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.support.SqlSessionDaoSupport;

/**
 * @author keim
 * 최초생성일 : 2015.01.09
 * 
 * 
 *  
 * 추가일 : 2016.03.09
 * ====== 추가 =======
 * 기능추가 없음
 * 
 * 전자정부 프레임워크 호화성가이드 규칙 3번 
 * 데이터 액서세 아키텍처규칙 
 *	데이터 액세스 규칙은 모든 DAO 클래스들이 EgovAbstractDAO를 상속받아서 사용하여야 하며,
 * EgovAbstractDAO를 무시하고 사용하지 않는 경우를 방지하기 위한 규칙입니다. 
 * EgovAbstractDAO의 활용이 프로젝트에 부적합한 경우 해당 클래스를 확장한 클래스를 상속받아서 활용하여도 무방합니다.
 * 
 * EgovAbstractDAO의 기능이 협소하고 필요이상으로 제한적이므로 추가/확장한여 별도로 사용 
 */
public class AbstractDAO extends SqlSessionDaoSupport implements DAOIterface {
	
	protected Logger logger = LogManager.getLogger(AbstractDAO.class);
	protected String namespace;
	
	public SqlSessionFactory factory;
	public String getNamespace() {
		return namespace;
	}
	public void setNamespace(String namespace) {
		this.namespace = namespace;
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
	
	/** 
	 * DataSource를 @Autowired, @Qualifier 를 통해 지정해줌
	 * 
	 *  -> AbstractDAO를 extends 받는 경우 defaultDS로 연결됨
	 */ 
	@Override
	@Resource(name="sqlMapClientBase") 
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}

//	@Resource(name = "sqlMapClient")
//	public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
//		super.setSqlMapClient(sqlMapClient);
//	}

	/**
	 * 트랜잭션의 이용
	 * 
	 * 1) 트랜잭션 어노테이션용 클래스 Import
	 * import org.springframework.transaction.annotation.Propagation;
	 * import org.springframework.transaction.annotation.Transactional;
	 * 
	 * 2) 트랜잭션을 사용할 메소드에 어노테이션 적용
	 * @Transactional(propagation=Propagation.REQUIRED)
	 */
	
	
	
	/**
	 * List DAO
	 * @return List
	 * @throws Exception
	 */
	
	/**
	 * @Author - keim  
	 * @Comment Name만 입력하고 namespace는 Constructor에서 지정함 
	 * 파라미터 없음 , 변수없이 데이터 호출시 사용 (e.g., 코드,기준날짜)
	 */
	public List<?> list(String Name) throws Exception {
		return getList(namespace,Name);
	}
	/**
	 * @Author - keim  
	 * @Comment namespace를 constructor에서 지정한것과 다른것을 호출 할때 사용 
	 * 가급적 controller에서 하나의 dao를 더 생성할것을 권유
	 * 파라미터 없음 , 변수없이 데이터 호출시 사용 (e.g., 코드,기준날짜)
	 */
	public List<?> list(String namespace,String Name) throws Exception {
		return getList(namespace,Name);
	}
	/**
	 * @Author - keim  
	 * @Comment Name만 입력하고 namespace는 Constructor에서 지정함 
	 * 페이징,조회 대부분이 이 메소드 사용
	 */
	public List<?> list(String name,Object parameter) throws Exception {
		return getList(namespace,name,parameter);
	}
	/**
	 * @Author - keim  
	 * @Comment namespace를 constructor에서 지정한것과 다른것을 호출 할때 사용 
	 * 가급적 controller에서 하나의 dao를 더 선언할것을 권유
	 */
	public List<?> list(String namespace, String name,Object parameter) throws Exception {
		return getList(namespace,name,parameter);
	}
	
	

	public Map<?,?> map(String name, String mapKey) throws Exception {
		return getMap(namespace,name, mapKey);
	}
	
	public Map<?,?> map(String name, Object parameter) throws Exception {
		return (Map)getObject(namespace,name,parameter);
	}
	
	public Map<?,?> map(String name, Object parameter, String mapKey) throws Exception {
		return getMap(namespace,name, parameter, mapKey);
	}
	
	@Override
	public Map<?, ?> map(String namespace, String name, Object parameter) throws Exception {
		return (Map)getObject(namespace, name, parameter);
	}
	
	/**
	 * Object DAO
	 * @return Object
	 * @throws Exception
	 */
	public Object object(String name) throws Exception {
		return getObject(namespace,name);
	}
	public Object object(String namespace,String name) throws Exception {
		return getObject(namespace,name);
	}
	public Object objectString(String name,String parameter) throws Exception {
		return getObject(namespace,name, parameter);
	}
	public Object object(String name,Object parameter) throws Exception {
		return getObject(namespace,name, parameter);
	}
	public Object object(String namespace,String name,Object parameter) throws Exception {
		return getObject(namespace,name, parameter);
	}
	
	
	
	/**
	 * Insert DAO
	 * @return Object
	 * @throws Exception
	 */
	
	/**
	 * @Author - keim  
	 * @Comment 미사용, 파라미터 없이 insert대상이 있을경우만 사용 
	 */
	public Object insert() throws Exception {
		return insertA(namespace);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터만 입력 받음 namespace는 Constructor 에서 name은 "insert"로 고정 
	 */
	public Object insert(Object parameter) throws Exception {
		return insertA(namespace,parameter);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터 입력 받음 namespace는 Constructor에서 고정 name은 지정 
	 */
	public Object insert(String name,Object parameter) throws Exception {
		return insertA(namespace,name, parameter);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터 입력 받음 namespace는 지정 name도 지정
	 */
	public Object insert(String namespace,String name, Object parameter) throws Exception {
		return insertA(namespace,name, parameter);
	}
	
	
	
	
	/**
	 * @Author - keim  
	 * @Comment 파라미터만 입력 받음 
	 */
	public Object update(Object parameter) throws Exception {
		return updateA(namespace, parameter);
	}
	
	/**
	 * @throws Exception 
	 * @Author - keim  
	 * @Comment name과 파라미터만 입력 받음 
	 */
	public Object update(String name,Object parameter) throws Exception {
		return updateA(namespace,name, parameter);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터 입력 받음, namespace는 지정 name도 지정
	 */
	public Object update(String namespace,String name, Object parameter) throws Exception {
		return updateA(namespace,name, parameter);
	}
	

	
	
	/**
	 * @Author - keim  
	 * @Comment 조건없이 삭제시 사용
	 */
	public Object delete() throws Exception {
		return deleteA(namespace);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터만 입력 받음
	 */
	public Object delete(Object parameter) throws Exception {
		return deleteA(namespace, parameter);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터,name 입력 받음
	 */
	public Object delete(String name,Object parameter) throws Exception {
		return deleteA(namespace,name, parameter);
	}
	/**
	 * @Author - keim  
	 * @Comment 파라미터 입력 받음 namespace는 지정 name도 지정
	 */
	public Object delete(String namespace,String name, Object parameter) throws Exception {
		return deleteA(namespace,name, parameter);
	}
	
//	public Object upsertA(Object parameter) throws Exception {
//		getDupCheckST0101
		
//		return upsert(namespace, parameter);
//	}
	
	
	
	/**
	 * Object Procedure DAO
	 * @return Object
	 * @throws Exception
	 */
	public Object procedure(String name) throws Exception {
		return getObject(namespace,name);
	}
	public Object procedure(String namespace,String name) throws Exception {
		return getObject(namespace,name);
	}
	
	public Object procedure(String name,Object parameter) throws Exception {
		return getObject(namespace,name, parameter);
	}
	public Object procedure(String namespace,String name,Object parameter) throws Exception {
		return getObject(namespace,name, parameter);
	}
	
	
	
	
	
	
	
	/* SQL 실 동작 부분 
	 *  @Date- 2013. 11. 19.
	 * 
	 */
	/* List - 기존 메소드 포한 전체 실동작 부분 구현 */
	private List<?> getList(String namespace,String Name)throws Exception {
		return getSqlSession().selectList(namespace+"."+Name);
	}
	private List<?> getList(String namespace,String Name,Object parameter)throws Exception {
		return getSqlSession().selectList(namespace+"."+Name,parameter);
	} 
	
	
	/* Map - 기존 메소드 포한 전체 실동작 부분 구현*/
	private Map<?,?> getMap(String namespace,String name, String mapKey)throws Exception {
		return getSqlSession().selectMap(namespace+"."+name, mapKey);
	}
	
	private Map<?,?> getMap(String namespace,String name, Object parameter, String mapKey)throws Exception {
		return getSqlSession().selectMap(namespace+"."+name, parameter, mapKey); 
		
	}
	

	/* Object - 기존 메소드 포한 전체 실동작 부분 구현*/
	private Object getObject(String namespace,String name) throws Exception {
		return getSqlSession().selectOne(namespace+"."+name);
	}
	private Object getObject(String namespace,String name, Object parameter) throws Exception {
		return getSqlSession().selectOne(namespace+"."+name, parameter);
	}
	
	
	
	
	
	
	
	
	/* Insert */
	private Object insertA(String namespace) throws Exception {
		return getSqlSession().insert(namespace+".insert");
	}
	private Object insertA(String namespace, Object parameter) throws Exception {
		return getSqlSession().insert(namespace+".insert", parameter);
	}
	private Object insertA(String namespace,String name, Object parameter) throws Exception {
		return getSqlSession().insert(namespace+"."+name, parameter);
	}
	
	/* Delete */
	//기존 - 추후 삭제
	private Object deleteA(String namespace) throws Exception {
		return getSqlSession().delete(namespace+".delete");
	}
	
	private Object deleteA(String namespace, Object parameter) throws Exception {
		return getSqlSession().delete(namespace+".delete", parameter);
	}
	private Object deleteA(String namespace,String name, Object parameter) throws Exception {
		SqlSession ss =getSqlSession() ; 
		return getSqlSession().delete(namespace+"."+name, parameter);
	}
	
	/* Update */
	//기존 - 추후 삭제
	private Object updateA(String namespace) throws Exception {
		return getSqlSession().update(namespace+".update");
	}
	private Object updateA(String namespace,Object parameter) throws Exception {
		return getSqlSession().update(namespace+".update",parameter);
	}
	private Object updateA(String namespace,String name, Object parameter) throws Exception {
		return getSqlSession().update(namespace+"."+name, parameter);
	}
	
	/**
	 * @param parameter as Map that contains: key= SEQ_NM, value = squenceName;
	 * @return
	 * @throws Exception
	 * @author hieu
	 * 
	 */
	public Object getIdFromSequence(String namespace,String key, String sequenceName) throws Exception {
		Map map = new HashMap<>();
		map.put(key, sequenceName);
		return object(namespace, "get_nextval_seq", map);
	}
	

	public String changeTag(String cont){
		if(cont.equals("") || cont == null)
		{
			return cont;
		}
		else
		{
			return cont.replaceAll("&amp;", "&").replaceAll("&#35;", "#").replaceAll("&lt;", "<")
					.replaceAll("&gt;", ">").replaceAll("&quot;", "'").replaceAll("&#39;", "\\").replaceAll("&#37;", "%")
					.replaceAll("&#40;", "(").replaceAll("&#41;", ")").replaceAll("&#43", "+").replaceAll("&#47;", "/")
					.replaceAll("&#46;", ".").replaceAll("&#59;", ";");
		}
	}

}
