package infrastructure.grant;

import infrastructure.context.AppContext;
import infrastructure.inheritance.dao.AbstractDAO;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;

import applications.code.CodeDAOImpl;

public class GrantManager {
	
	private volatile Map grantMap = new HashMap();	
	private volatile static GrantManager instance = null;
	private AbstractDAO adao ;
	private GrantManager() {
		// TO-DO Auto-generated constructor stub
		adao = new CodeDAOImpl();
		adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
		initialize();
	}
	public synchronized static GrantManager getInstance() {
		if(instance == null) {
			instance = new GrantManager();
		}
		return instance;
	}
	
	public Map getGrantMap() {
		return grantMap;
	}
	public void setGrantMap(Map grantMap) {
		this.grantMap = grantMap;
	}
	
	//Initialize when WAS stated
	// DAO Needed
	private void initialize(){
		// Author Data 
//		adao.list("")
	}
	
	//Clear for Initialize or Changed 
	private void clearStoredData(){
		// new Instatnce  and Clear Instance
		grantMap.clear();
	}
	
	private void storeToMap(Object obj){
		if(obj instanceof Map ){
			
		}else if(obj instanceof List){
			
		}
		
	}
	
	//Change author Data , Act like Initialize
	/**
	 * 권한수정내용 반영
	 * @작성일    : 2014. 12. 22. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TEST 권한 수정내용 반영 사항 체크 
	 */
	public void changeData(){
		clearStoredData();
		initialize();
		
	}
//	public proc 
	/**
	 * 전체 출력  
	 * @작성일    : 2014. 12. 22. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public void printAll(){
		print(grantMap);
	}
	/**
	 * 전체출력(해
	 * @작성일    : 2014. 12. 22. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
	 */
	public void printAll(String sess_id){
		print((grantMap.get(sess_id)));
	}
	private void print(Object obj){
		if(obj instanceof Map){
			for(Map.Entry<String, Object> entry : ((Map<String, Object>) obj) .entrySet()){
				print(entry.getValue());
			}
		}else if(obj instanceof List){
			for(Object entry : (List<Object>) obj){
				print(entry);
			}
		}else if(obj instanceof String){
			System.out.println(obj);
		}else{
			System.out.println(obj);
		}
	}
	
}
