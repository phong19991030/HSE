package infrastructure.inheritance.model.enumeration;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

// 공통코드 fixed data - 파라미터 유무에 따른 분류
// 파라미터 존재 - dynamic
// 파리미터 존재 X - static
public class CommonClsDataAdaptor{
	public CommonClsDataAdaptor() {
		// TO-DO Auto-generated constructor stub
	}
	
	public Map getData(String cls, Map param){
		Map resultMap = new HashMap(); // 결과값
		
		CommonClsDataStatic clsStatic = CommonClsDataStatic.getEnum(cls);
		//System.out.println("@@@@clsStatic : " + clsStatic);
		
		// commonClsDataStatic - 파라미터가 존재하지 않는 경우
		/*if(param.isEmpty()){
			convertor(CommonClsDataStatic.getEnum(cls) , resultMap);
		}*/
		// commonClsDataStatic에 cls가 존재하는 경우 (Static, 파라미터 필요X, 공통코드)
		if(clsStatic != null) {
			convertor(clsStatic , resultMap);
		}
		// commonClsDataStatic에 cls가 존재하지 않는 경우 (Dynamic, 파라미터 필요, 공통코드)
		else{
			List list = new ArrayList();
			CommonClsDataDynamic ccdd = new CommonClsDataDynamic();
			list = (List) ccdd.getData(cls, param);
			
			// jsonData, listData
			resultMap.put("json", JSONArray.fromObject(list).toString());
			resultMap.put("list", list);
			
			//System.out.println("[Adaptor_Dynamic_getData]@@@@resultMap : " + resultMap);
		}
		
		return resultMap;
	}
	
	private void convertor(CommonClsDataStatic cls, Map resultMap ){
		//System.out.println("[Adaptor_Static_convertor]@@@@cls : " + cls);
		
		// jsonData, listData
		resultMap.put("json", cls.getJson());
		resultMap.put("list", cls.getList());
		
		//System.out.println("[Adaptor_Static_convertor]@@@@resultMap : " + resultMap);
	}
}