package infrastructure.inheritance.service;

import java.util.List;
import java.util.Map;



/**
 * @author "kimhd" on 2016.4.5
 *
 */
public interface ServiceInterface {
 
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
	
	public Object procedure(String name) throws Exception ;
	public Object procedure(String namespace,String name) throws Exception;
	public Object procedure(String name,Object parameter) throws Exception;
	public Object procedure(String namespace,String name,Object parameter) throws Exception; 
}
