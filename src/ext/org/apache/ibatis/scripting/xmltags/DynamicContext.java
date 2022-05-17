package org.apache.ibatis.scripting.xmltags;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ognl.OgnlContext;
import ognl.OgnlException;
import ognl.OgnlRuntime;
import ognl.PropertyAccessor;

import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.Configuration;

public class DynamicContext {

  public static final String PARAMETER_OBJECT_KEY = "_parameter";
  public static final String DATABASE_ID_KEY = "_databaseId";

  static {
    OgnlRuntime.setPropertyAccessor(ContextMap.class, new ContextAccessor());
  }

  private final ContextMap bindings;
  private final StringBuilder sqlBuilder = new StringBuilder();
  private int uniqueNumber = 0;

  public DynamicContext(Configuration configuration, Object parameterObject) {
    if (parameterObject != null && !(parameterObject instanceof Map)) {
      MetaObject metaObject = configuration.newMetaObject(parameterObject);
      bindings = new ContextMap(metaObject);
    } else {
      bindings = new ContextMap(null);
    }
    bindings.put(PARAMETER_OBJECT_KEY, parameterObject);
    bindings.put(DATABASE_ID_KEY, configuration.getDatabaseId());
  }

  public Map<String, Object> getBindings() {
    return bindings;
  }

  public void bind(String name, Object value) {
    bindings.put(name, value);
  }

  public void appendSql(String sql) {
    sqlBuilder.append(sql);
    sqlBuilder.append(" ");
  }

  public String getSql() {
    return sqlBuilder.toString().trim();
  }

  public int getUniqueNumber() {
    return uniqueNumber++;
  }

  static class ContextMap extends HashMap<String, Object> {
    private static final long serialVersionUID = 2977601501966151582L;

    private MetaObject parameterMetaObject;
    public ContextMap(MetaObject parameterMetaObject) {
      this.parameterMetaObject = parameterMetaObject;
    }
    public boolean empty(Object obj) { 
        if (obj == null) return true; 
        
        if (obj instanceof String) { 
        	System.out.println(((String) obj).equals(""));
            return ((String) obj).equals(""); 
        } else if (obj instanceof List) { 
            return ((List) obj).isEmpty(); 
        } else if (obj instanceof Map) { 
            return ((Map) obj).isEmpty(); 
        } else if (obj instanceof Object[]) { 
            return Array.getLength(obj) == 0; 
        } else { 
            return false; 
        } 
    } 
    
    public String instance(Object obj) { 
//        if (obj == null) return true; 
        
        if (obj instanceof String) { 
        	System.out.println("&&&&&String");
            return "String"; 
        } else if (obj instanceof List) { 
        	System.out.println("&&&&&List");
        	return "List" ;
        } else if (obj instanceof Map) {
        	System.out.println("&&&&&Map");
        	return "Map" ;
        } else if (obj instanceof Object[]) { 
        	System.out.println("&&&&&Array");
        	return "Array"; 
        } else { 
        	System.out.println("&&&&&NULL");
            return ""; 
        } 
    } 
    public boolean equals(Object obj,Object objTgt) { 
    	if(objTgt == null){
    		objTgt= new String();
    	}
    	if(objTgt instanceof Character){
    		
    		String str = Character.toString((char) objTgt);
    	 
    		objTgt = str;
    	}
    	
    	
    	if( instance(objTgt).equals(instance(obj))){ 
    		return obj.equals(objTgt);
    	}else{
    	
    		return false;
    	}
  } 
    
    @Override
    public Object get(Object key) {
      String strKey = (String) key;
      if (super.containsKey(strKey)) {
        return super.get(strKey);
      }

      if (parameterMetaObject != null) {
        Object object = parameterMetaObject.getValue(strKey);
        if (object != null) {
          super.put(strKey, object);
        }

        return object;
      }

      return null;
    }
  }

  static class ContextAccessor implements PropertyAccessor {

    public Object getProperty(Map context, Object target, Object name)
        throws OgnlException {
      Map map = (Map) target;

      Object result = map.get(name);
      if (result != null) {
        return result;
      }

      Object parameterObject = map.get(PARAMETER_OBJECT_KEY);
      if (parameterObject instanceof Map) {
    	  return ((Map)parameterObject).get(name);
      }

      return null;
    }

    public void setProperty(Map context, Object target, Object name, Object value)
        throws OgnlException {
      Map map = (Map) target;
      map.put(name, value);
    }

	@Override
	public String getSourceAccessor(OgnlContext arg0, Object arg1, Object arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getSourceSetter(OgnlContext arg0, Object arg1, Object arg2) {
		// TODO Auto-generated method stub
		return null;
	}
  }
}