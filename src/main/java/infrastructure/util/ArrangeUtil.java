package infrastructure.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
 
/**
 * @author keim
 *
 */
/**
 * 기능명 
 * @작성일    : 2015. 6. 22. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public final class ArrangeUtil {
	protected static Logger logger = LogManager.getLogger(ArrangeUtil.class);
     
    /**
     * List<Map> sort 
     * @작성일    : 2014. 10. 17. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TO-DO  
     */
    
    public static List sortMapList(List<Map> lists,String key,String pkey,String lev){
    	
    	List<Map> list= lists; 
    	List resultList = new ArrayList();
    	
    	// sort max cost (n^2+n) /2
    	int mnLev=-1;
    	for(Map masp : list){
    		if(masp.get(lev) !=null){
	    		int compareLev =  Integer.parseInt(CastUtil.castToString( masp.get(lev)));
	    		if((mnLev == -1) || (mnLev >  compareLev)){
	    			mnLev  = compareLev;
	    		}
    		} 
    		
    	}
    	
		for(Map map : list){
			if((map.get(lev) != null && CastUtil.castToString(map.get(lev)).equals(Integer.toString(mnLev))) || map.get(pkey)== null){
				resultList.add(map);
				if(map.get(lev) == null ){
					map.put("LEV", mnLev);
				}else{
					map.put("LEV", map.get(lev));
				}
				getResultRecursive(list,key,pkey,resultList,(String) map.get(key),lev,Integer.toString(mnLev));
			}
		}
		setHasParents(resultList,lev);
    	return resultList;
    }
    
    private static synchronized void getResultRecursive(List<Map> list,String key,String pkey,List result,String keyVal,String lev,String levVal){
    	if(keyVal !=null){
	    	for(Map map : list){
	    		/*
	    		 * @JK - 보안 취약점 수정 
	    		 */
//	    		if(map.get(pkey)!=null && map.get(pkey).equals(keyVal)){
	    		if(map != null && map.get(pkey)!=null && map.get(pkey).equals(keyVal)){
	    			if(!map.get(pkey).equals(map.get(key))){
		    			if(map.get(lev) == null ){
	    					map.put("LEV", Integer.toString(Integer.parseInt(levVal)+1));
	    				}else{
	    					map.put("LEV", map.get(lev));
	    				}
		    			result.add(map);
		//				list.remove(map);
		    			String levValues;
		    			if(map.get(lev) instanceof BigDecimal){
		    				levValues= ((BigDecimal)map.get(lev)).toString();
		    			}else {
		    				levValues= (map.get(lev)).toString();
		    			}
						getResultRecursive(list,key,pkey,result,(String) map.get(key),lev,levValues);
	    			}
					
	    		}
	    	}
    	}
    }
    
    
    
    private static void setHasParents(List list, String lev ){
    	for(int i = 0 ; i < list.size()-1;i++){
    		Map map = (Map) list.get(i);
    		Map tmpMap = (Map) list.get(i+1);
    		if(Integer.parseInt(CastUtil.castToString(map.get(lev))) < Integer.parseInt(CastUtil.castToString(tmpMap.get(lev)))){
    			map.put("hasChild", true);
    		}
    	}
    	
    } 
    
    
    
    
    /**
     * joinList ( innerJoin 추후 명명 변경 및 추가 기능 가능 
     * @작성일    : 2015. 6. 19. 
     * @작성자      : keim
     * @프로그램설명 : 2개의 리스트맵을 하나의 리스트맵으로 변환해줌. 
     *                   단, 1st 리스트의 innerJoin  이라는 점, 비교키가 1개 뿐이라는점  
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static List<Map> joinList(List<Map> list1,List<Map> list2,String key){
    	List<Map> list = new ArrayList<Map>();
    	//cost :  M*N 
		for(Map tmp1 : list1){
			for(Map tmp2 : list2 ){
				try {
					if(tmp1.get(key).equals(tmp2.get(key))){ 
						for(Map.Entry<String, Object> entry : ((Map<String, Object>) tmp2).entrySet() ){
							if(tmp1.containsKey(entry.getKey())){
								tmp1.put(entry.getKey()+"_1", entry.getValue());
							}else{
								tmp1.put(entry.getKey(), entry.getValue());
							}
						}
					}
				} catch (Exception e) {
					// TO-DO Auto-generated catch block
					logger.error(e.getMessage());
				}
			}
		}
    	
    	
    	return list;
    }
    
    /**
     * 기능명 
     * @작성일    : 2015. 6. 22. 
     * @작성자      : keim
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     * @프로그램설명 :
     * 데이터의 일반 구조가 아님
     * 특수한 경우 2개의 리스트중 한쪽은 hierachy 구조이며 다른 한쪽은 일반 array 구조
     * merge 방법은 한쪽의 hierachy중 하나의 노드에 여러개의 리스트가 존재할 경우 사용하는 방법
     * 
     * 2개의 리스트를 하나의 list<Map> 구조로 변경한다. 
     * 이때 주의 해야할점은 각 Row 별로 반드신 하나이상의 키가 존재해야하며 key 필드와 id  필드는 다르다.
     * 또한 1번 Row의 id 필드와 2번 row의 id 필드는 서로 다를 수 있다.
     *  
     * 예를들어 부서정보와 부서의 사용자정보를 합친다고 가정하였을때 
     * 부서정보의 id는 부서코드 이며 key 값은 부서코드이다 . 
     * 그러나 사용자 정보에서 id는 사용자id이지만 key값은 부서 코드가 되야 한다.
     * 또한 부서정보를 담은 row의 id는 부서코드이지만 사용자정보를 담은row는 id가 사용자 id가 된다. 
     * 
     * 이부분을 구분할 수있도록 각 row에 seperator mark를 삽입한다. 
     * key- seperate : (list1,list2) 로 구분 할 수있다.
     * 
     *  
     * ex> stm_020402 사용
     * 
     * 
     * 
     */
    public static List<Map> mergeList(List<Map> list1,List<Map> list2,String key,String lev){
//    	List<Map> list = new ArrayList<Map>();
    	List<Map> resultList = new ArrayList<Map>();
    	List<Map> hierlist = new ArrayList();
    	List<Map> arraylist = new ArrayList();
    	
    	hierlist.addAll(list1);
    	arraylist.addAll(list2);
    	
    	// 첫 데이터가 hierachy 구조 
    	for(Map tmp1 : list1){
    		tmp1.put("seperate", "list1");
    		resultList.add(tmp1);
    		hierlist.remove(tmp1);
			for(Map tmp2 : list2 ){
				try {
					if(tmp1.get(key).equals(tmp2.get(key))){ 
						if(tmp1.get(lev)!=null){
							int i = Integer.parseInt(CastUtil.castToString(tmp1.get(lev)));
							tmp2.put(lev, i+1);
						}
						tmp2.put("seperate", "list2");
						resultList.add(tmp2);
						arraylist.remove(tmp2);
					}
				} catch (Exception e) {
					// TO-DO Auto-generated catch block
					logger.error(e.getMessage());
				}
			}
		}
    	for(Map remainMaps :hierlist){
    		resultList.add(remainMaps);
    	}
    	for(Map remainMaps :arraylist){
    		resultList.add(remainMaps);
    	}
    	
    	return resultList;
    }
    
    
    /**
     * full outer join  
     * @작성일    : 2016. 9. 26. 
     * @작성자      : keim
     * @프로그램설명 : 
     *  list1, list2 를 비교하여풀 아우터 조인 , 
     *  조인과 다른점이 있다면 list2의 데이터가 list1의 데이터를 덮는다  
     * 
     * 
     * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
     */
    public static List<Map> mergeListMap(List<Map> list1,List<Map> list2,String key){
    	List<Map> resultList = new ArrayList();
    	List<Map> arraylist1 = new ArrayList();
    	List<Map> arraylist2 = new ArrayList();
    	
    	arraylist1.addAll(list1);
    	arraylist2.addAll(list2);
//    	resultList.addAll(list1);
    	
    	for(Map tmp1 : list1){
//    		resultList.add(tmp1);
//    		arraylist1.remove(tmp1);
    		for(Map tmp2 : list2){
    			if(tmp1.get(key).equals(tmp2.get(key))){ 
    				tmp1.putAll(tmp2);
					resultList.add(tmp1);
    				arraylist1.remove(tmp1);
    				arraylist2.remove(tmp2);
    			}
    			
    			
    		}
    	}
    	for(Map remainMaps :arraylist1){
    		resultList.add(remainMaps);
    	}
    	for(Map remainMaps :arraylist2){
    		resultList.add(remainMaps);
    	}
    	
    	
    	
    	
    	return resultList;
    }
    
    /**
     * TreeMap 전체를 Full scan - Depth 유지 하며 List<Map> , Map<List> 의 복합 구조를 형성 하여 Map return 
     * @작성일    : 2014. 9. 30. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TO-DO, DEBUG, TEST, COMPLETE  
     * 진행중 미완 
     * 
     * Tree Map 에서 value를 가지고 key value를 찾는 로직 
     */
    public static Object findMapFromTreeMapBasedFullScan(Map map, String value){
    	Object obj = null;
    	Object resultObject = null;
    	resultObject= obj;
    	Map resultMap = new HashMap();
    	
    	for (Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()) {
			
			if(entry.getValue() instanceof Map){
				obj = findMapFromTreeMapBasedFullScan((Map) entry.getValue(),value);
				if(obj != null ){
//					resultMap = map;
					resultMap.put(entry.getKey(), obj);
					resultObject = resultMap;
//					if(entry.getKey().equals("List")){
//						resultObject = obj;
//					}else{
//						resultObject = resultMap;
//					}
				}
			}else if(entry.getValue() instanceof List){
				for(Object objs:(List)entry.getValue()){
					if(objs instanceof Map){
						obj=	findMapFromTreeMapBasedFullScan((Map) entry.getValue(),value);
						if(obj != null ){
							resultMap.put(entry.getKey(), obj);
							resultObject = resultMap;
						} 
					}
					
				}
			}else{
				if(entry.getValue() != null){
					// 메뉴 중첩 문제 해결 강제삽입
					if(entry.getValue().equals(value)){
						resultObject=  map;
					}
//					else if(entry.getKey().equals(value)){
//						resultObject =  entry.getValue();
//					}
					
				}
			}
		}
    	
    	return resultObject;
    }
    /**
     * TreeMap 전체를 Full scan - Depth를 유지하지 않고 최종의 Map 만을 반환 
     * @작성일    : 2014. 9. 30. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TO-DO, DEBUG, TEST, COMPLETE  
     * 진행중 미완 
     * 
     * Tree Map 에서 value를 가지고 Map을 찾는 로직 
     */
    public static Object findMapFromMapBasedFullScan(Map map, String value){
    	Object obj = null;
    	Object resultObject = null;
    	resultObject= obj;
    	
    	for (Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()) {
			
			if(entry.getValue() instanceof Map){
				obj = findMapFromMapBasedFullScan((Map) entry.getValue(),value);
				if(obj != null ){
//					resultMap.put(entry.getKey(), obj);
					resultObject = obj;
				}
			}else if(entry.getValue() instanceof List){
				for(Object objs:(List)entry.getValue()){
					if(objs instanceof Map){
						obj=	findMapFromMapBasedFullScan((Map) entry.getValue(),value);
						if(obj != null ){
//							resultMap.put(entry.getKey(), obj);
							resultObject = obj;
						} 
					}
					
				}
			}else{
				if(entry.getValue() != null){
					if(entry.getKey().equals(value)){
						resultObject=  map;
					}
				}
			}
		}
    	
    	return resultObject;
    }
    /**
     * TreeMap 전체를 Full scan - Depth를 유지하지 않고 최종의 값만을 반환 
     * @작성일    : 2014. 9. 30. 
     * @작성자      : keim
     * @프로그램설명 :
     * @진행상태설명: TO-DO, DEBUG, TEST, COMPLETE  
     * 진행중 미완 
     * 
     * Tree Map 에서 value를 가지고 key value를 찾는 로직 
     */
    public static Object findValueFromMapBasedFullScan(Map map, String value){
    	Object obj = null;
    	Object resultObject = null;
    	resultObject= obj;
    	
    	for (Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()) {
			
			if(entry.getValue() instanceof Map){
				obj = findValueFromMapBasedFullScan((Map) entry.getValue(),value);
				if(obj != null ){
//					resultMap.put(entry.getKey(), obj);
					resultObject = obj;
				}
			}else if(entry.getValue() instanceof List){
				for(Object objs:(List)entry.getValue()){
					if(objs instanceof Map){
						obj=	findValueFromMapBasedFullScan((Map) entry.getValue(),value);
						if(obj != null ){
//							resultMap.put(entry.getKey(), obj);
							resultObject = obj;
						} 
					}
					
				}
			}else{
				if(entry.getValue() != null){
					if(entry.getKey().equals(value)){
						resultObject =  entry.getValue();
					}
				}
			}
		}
    	
    	return resultObject;
    }
}