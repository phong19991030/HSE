package infrastructure.inheritance.model.defaultModel;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class DefaultModel implements Serializable {
	protected  Logger logger = LogManager.getLogger(DefaultModel.class);
	
	String SESS_USER_ID;	// 세션 로그인 정보
	
	public String getSESS_USER_ID() {
		return SESS_USER_ID;
	}
	public void setSESS_USER_ID(String sESS_USER_ID) {
		SESS_USER_ID = sESS_USER_ID;
	}
	
	/** 
	 * 
	 */
//	private  final long serialVersionUID = 1L;
	public List<?> modelList= new ArrayList();
	public Map<String ,List<?>> modelMap = new HashMap();
	public Map sessionMap;

	public List<?> getModelList() {
		return modelList;
	}
	public void setModelList(List<?> modelList) {
		this.modelList = modelList;
	}
	
	
	public Map<String, List<?>> getModelMap() {
		return modelMap;
	}
	public void setModelMap(Map<String, List<?>> modelMap) {
		this.modelMap = modelMap;
	}
	public Map getSessionMap() {
		return sessionMap;
	}

	public void setSessionMap(Map sessionMap) {
		this.sessionMap = sessionMap;
	}
	
	
	public void setSessionMap(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Enumeration enums = session.getAttributeNames();
		while(enums.hasMoreElements()){
			String str =enums.nextElement().toString();
//			System.out.println(str);
			Object obj = session.getAttribute(str) ;
			if(obj instanceof Map) {
				
				if(sessionMap == null){
					sessionMap= new HashMap();
				}
				sessionMap.putAll((Map)obj);
			}
		}
		
	}
	public void printAll(DefaultModel model){
		Class cls = this.getClass();
		Field[] fields  = cls.getDeclaredFields();
//		Field[] fields  = cls.getFields();
		try {
			for(Field fd : fields){
				System.out.println(fd.getName()+": "+ fd.get(this));
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			// TO-DO Auto-generated catch block
		}
		catch (IllegalAccessException e) {
			// TO-DO Auto-generated catch block
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}
		//System.out.println("printAll end");
	}
	
	public DefaultModel getMapToModel(Map map,DefaultModel model) throws Exception{
		
		Object obj;
		for(String key : ((Map<String,Object>)map).keySet()){ 
			try {
						obj =(Object) map.get(key);
						if(obj instanceof BigDecimal) {
							BigDecimal bd = (BigDecimal)(obj);
							String dbls = bd.toString();
							map.put(key, dbls);
						}
						if(obj != null) {
							Method method = model.getClass().getDeclaredMethod("set"+key, obj.getClass() );
							method.invoke(model, map.get(key));
						}
	
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (InvocationTargetException e) {
				Exception ex = (Exception) e.getCause();
				 throw ex;
			}
		}
		return model;
	}

   	
	/**
	 * printModel
	 * @작성일	: 2016. 4. 5.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : map에 대응되는 model 객체 생성 후 테스트하는 함수
	 * @진행상태: COMPLETE
	 */
	public void printModel(Map map, DefaultModel model){
		
		System.out.println("------------------------------------------ printModel: start\n");
		Object obj;
		for(String key : ((Map<String,Object>)map).keySet()){ 
			try {
				obj =(Object) map.get(key);
				if(obj instanceof BigDecimal) {
					
					BigDecimal bd = (BigDecimal)(obj);
					String dbls = bd.toString();
					map.put(key, dbls);
					System.out.println("dbls: " + dbls);
				}
				if(obj != null) {
					Method method = model.getClass().getDeclaredMethod("get" + key);
					method.invoke(model);
					System.out.println(key + ": " + obj);
				}
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			}
		}
		System.out.println("------------------------------------------ printModel: end\n");
	}
}
