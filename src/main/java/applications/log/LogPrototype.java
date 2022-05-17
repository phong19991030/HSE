package applications.log;

import infrastructure.context.AppContext;

import org.springframework.context.ApplicationContext;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.annotation.Scope;

@Scope("prototype")
public class LogPrototype{

	public void insertSysLogInfo(Object parameter) throws Exception {
		
		ApplicationContext ctx = AppContext.getApplicationContext();
		SqlSessionFactory fact = (SqlSessionFactory) ctx.getBean("sqlSession");
		SqlSession sqlSession = fact.openSession();
		
//		SqlSessionFactory sqlSessionFactory = PrototypeSqlSessionManager.getSqlSessionFactory();
//		SqlSession sqlSession = sqlSessionFactory.openSession();
		
		try{
			//insert시 parameter에 불필요한정보가 세션에 담겨(SEQ)서 돌아오는 것을 방지하기 위해 새로운 Map으로 만들어 전송
			//Map map = new HashMap();
			//map.putAll((Map)parameter);
			//sqlSession.insert("common.auth.Log.insertSysLogInfo", map);
//			System.out.println("insert Log");
			sqlSession.insert("common.auth.Log.insertSysLogInfo", parameter);
			sqlSession.commit();
		}finally{
			if(sqlSession != null) sqlSession.close();
		}
		
	}
	
	public void updateSysLogInfo(Object parameter) throws Exception {

		ApplicationContext ctx = AppContext.getApplicationContext();
		SqlSessionFactory fact = (SqlSessionFactory) ctx.getBean("sqlSession");
		SqlSession sqlSession = fact.openSession();
		try{
			sqlSession.update("common.auth.Log.updateSysLogInfo", parameter);
			sqlSession.commit();
		}finally{
			if(sqlSession != null) sqlSession.close();
		}
	}	
	
	public void updateSysLogInfoForExpired(Object parameter) throws Exception {

		ApplicationContext ctx = AppContext.getApplicationContext();
		SqlSessionFactory fact = (SqlSessionFactory) ctx.getBean("sqlSession");
		SqlSession sqlSession = fact.openSession();
		try{
			sqlSession.update("common.auth.Log.updateSysLogInfoForExpired", parameter);
			sqlSession.commit();
		}finally{
			if(sqlSession != null) sqlSession.close();
		}
	}
}
