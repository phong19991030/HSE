package infrastructure.gen;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServlet;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class GeneratorThreadStarter extends HttpServlet {
	protected Logger logger = LogManager.getLogger(GeneratorThreadStarter.class);
	public static void main(String[] args){
//		int i = -1;
//		System.out.println((byte)i);
//		GeneratorThreadStarter tm = new GeneratorThreadStarter();
//		tm.init();
    }
	public void init(){
		Map keyMap = new HashMap();
		try {
//			System.out.println("Thread Start");
//			AbstractDAO adao = new LoggingDAOImpl();
//				// TODO Auto-generated constructor stub
//			adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
//				
//			
//			List tableList = adao.list("gen.generator","selectFromTab" , new HashMap());
//			
//			/* 간단하게 작성함 
//			 * 리스트를 프로그램에 넣는 방법은 좋지않음
//			 * */
//			
//			List necessaryTables = new ArrayList();
//			
//			
//			necessaryTables.add("TSLG_LOGIN_STATE");
//			necessaryTables.add("TSLG_MENU_ACCESS_STATE  ");
//			necessaryTables.add("TSLG_SYS_ERROR_STATE");
//			necessaryTables.add("TSST_USER_LOGIN_INFO");
//			necessaryTables.add("TSST_CONFIG_INFO");
//			necessaryTables.add("TSLG_USER_ROLE");
//			necessaryTables.add("TSLG_ROLE_PGM");
//			necessaryTables.add("TSLG_ROLE_MGT");
//			
//			List tempDeep = new ArrayList();
//			tempDeep.addAll(necessaryTables);
			
			
//			for(Map tabelMap : (List<Map>)tableList){
//				for(String tableName : (List<String>)necessaryTables){	
//					
//					if(tabelMap.get("TABLE_NAME").equals(tableName)){
//						tempDeep.remove(tableName);
//					}
//				}
//			}
			
			//추후 reflection으로 변경 , 현재 심플하게  
//			for(String table: (List<String>)tempDeep ){
//				if(table.equals("TSLG_LOGIN_STATE")){
//					adao.list("gen.logging","gen_TSLG_LOGIN_STATE" , new HashMap());
//				}else if(table.equals("TSLG_MENU_ACCESS_STATE")){ 
//					adao.list("gen.logging","gen_TSLG_MENU_ACCESS_STATE  " , new HashMap());
//				}else if(table.equals("TSLG_SYS_ERROR_STATE")){  
//					adao.list("gen.logging","TSLG_SYS_ERROR_STATE" , new HashMap());
//				}else if(table.equals("TSST_USER_LOGIN_INFO")){  
//					adao.list("gen.system","gen_TSST_USER_LOGIN_INFO" , new HashMap());
//				}else if(table.equals("TSST_CONFIG_INFO")){
//					adao.list("gen.system","gen_TSST_CONFIG_INFO" , new HashMap());
//				}else if(table.equals("TSLG_USER_ROLE")){  
//					adao.list("gen.logging","TSLG_USER_ROLE" , new HashMap());
//				}else if(table.equals("TSLG_ROLE_PGM")){  
//					adao.list("gen.logging","TSLG_ROLE_PGM" , new HashMap());
//				}else if(table.equals("TSLG_ROLE_MGT")){
//					adao.list("gen.logging","TSLG_ROLE_MGT" , new HashMap());
//				}
//			}
		} catch (Exception e) {
			// TO-DO Auto-generated catch block
			logger.error(e.getMessage());
			e.printStackTrace();
		}
	}
	
}
