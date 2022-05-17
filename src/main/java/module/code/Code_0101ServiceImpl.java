package module.code;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import infrastructure.inheritance.service.AbstractService;

@Service("Code_0101ServiceImpl")
public class Code_0101ServiceImpl extends AbstractService {

	@Autowired
	public Code_0101DAOImpl codeDao;

	public List getCommonCode(Map parameter) throws Exception {
		return codeDao.list("getCommonCode", parameter);
	}

	public List getCommonUpCode(Map parameter) throws Exception {
		return codeDao.list("getCommonUpCode", parameter);
	}

	public List getMaintainceCode(Map parameter) throws Exception {
		return codeDao.list("getMaintanceCode", parameter);
	}

	public List getPartCode(Map parameter) throws Exception {
		return codeDao.list("getPartCode", parameter);
	}

	public List getGroupAlarmCode(Map parameter) throws Exception {
		return codeDao.list("getGroupAlarmCode", parameter);
	}
	
	public List getAllCode(Map parameter) throws Exception {
		return codeDao.list("getAllCode", parameter);
	}
	public List getParentCommonCode(Map parameter) throws Exception {
		return codeDao.list("getParentCommonCode", parameter);
	}
	

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List convertListToTree(List<Map> orgList) {
		int maxLvl = 0;
		for (Map each : orgList) {
			if (Integer.parseInt((each.get("LEV")).toString()) > maxLvl) {
				maxLvl = Integer.parseInt((each.get("LEV")).toString());
			}
		}

		List list = new ArrayList<Map>();

		for (int lvl = maxLvl - 1; lvl >= 0; lvl--) {
			for (Map each : orgList) {
				if (Integer.parseInt((each.get("LEV")).toString()) == lvl) {
					List children = new ArrayList<Map>();
					for (Map each2 : orgList) {
						if (Integer.parseInt((each2.get("LEV")).toString()) == lvl + 1 && each2.get("UP_CD") != null
								&& each2.get("UP_CD").equals(each.get("CODE"))) {
							children.add(each2);
						}
					}
					if (children.size() > 0) {
						each.put("items", children);
					}

				}
				if (Integer.parseInt((each.get("LEV")).toString()) == 0 && lvl == 0) {
					list.add(each);
				}
			}
		}

		return list;
	}

	public boolean checkDoubleCode(Map code, List listCode) {
		boolean check = true;
		
		if(code.get("OLD_COMM_CD") != null && !code.get("OLD_COMM_CD").equals("")) {
			String oldCode = code.get("OLD_COMM_CD").toString();
			for (int i = 0; i < listCode.size(); i++) {
				Map map = (Map) listCode.get(i);
				String codeDb = (String) map.get("CODE");
				if (!codeDb.equals(oldCode) && code.get("COMM_CD").equals(codeDb) ) {
						check = false;
						break;
				
				}
			}
			
		}else {
			for (int i = 0; i < listCode.size(); i++) {
				Map map = (Map) listCode.get(i);
				String codeDb = (String) map.get("CODE");
				if (code.get("COMM_CD").equals(codeDb) ) {
						check = false;
						break;
				}
			}	
		}
		
		
		return check;
	}

//	CRUD common code
	public void insertCommoCode(Map parameter) throws Exception {
		codeDao.insert("insertCommonCode", parameter);
	}

	public void updateCommoCode(Map parameter) throws Exception {
		codeDao.update("updateCommonCode", parameter);
	}

	public void deleteComoCode(Map parammeter) throws Exception {
		codeDao.delete("deleteCommonCode", parammeter);
	}

//	CRUD maintance code	
	public void insertMaintenCode(Map parameter) throws Exception {
		codeDao.insert("insertMaintanceCode", parameter);
	}

	public void updateMaintenCode(Map parameter) throws Exception {
		codeDao.update("updateMaintanceCode", parameter);
	}

	public void deleteMainceCode(Map parameter) throws Exception {
		codeDao.delete("deleteMaintanceCode", parameter);
	}

//	CRUD part code	
	public void insertPartCode(Map parameter) throws Exception {
		codeDao.insert("insertPartCode", parameter);
	}

	public void updatePartCode(Map parameter) throws Exception {
		codeDao.update("updatePartCode", parameter);
	}

	public void deletePartCode(Map parameter) throws Exception {
		codeDao.delete("deletePartCode", parameter);
	}

//	CRUD Alarm code	
	public void insertAlarmCode(Map parameter) throws Exception {
		codeDao.insert("insertAlarmCode", parameter);
	}

	public void updateAlarmCode(Map parameter) throws Exception {
		codeDao.insert("updateAlarmCode", parameter);
	}

//	CRUD Alarm code
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List getAllChildId(List listTree, Map parameter) {
		List listResult = new ArrayList();
		List listLev = new ArrayList();
		// int lev = Integer.parseInt((parameter.get("LEV")).toString());
		String code = (String) parameter.get("CODE");
		listResult.add(code);
		listLev = getChildId(listTree, code);
		for (int i = 0; i < listLev.size(); i++) {
			String cd = (String) listLev.get(i);
			listResult.add(cd);
			List child = getChildId(listTree, cd);
			for (int j = 0; j < child.size(); j++) {
				listResult.add((String) child.get(j));
			}
		}
		return listResult;

	}

	public List getChildId(List listTree, String parent) {
		List listLev = new ArrayList();
		for (int i = 0; i < listTree.size(); i++) {
			Map codeMap = (Map) listTree.get(i);
			String upCode = (String) codeMap.get("UP_CD");
			if (parent.equals(upCode)) {
				String cd = (String) codeMap.get("CODE");
				listLev.add(cd);
			}
		}
		return listLev;

	}

	public boolean checkAlarmCode(Map map) throws Exception {
		boolean check = true;
		List listCd = codeDao.list("getDoubleAlarmCode", map);
		if (listCd.size() > 0) {
			check = false;
		}
		return check;
	}

	public boolean checkAlarmCodeUpdate(Map map) throws Exception {
		boolean check = true;
		List listCd = codeDao.list("getDoubleAlarmCode2", map);
		if (listCd.size() > 0) {
			check = false;
		}
		return check;
	}

	public List getAllDetailCode(Map map) throws Exception {
		return codeDao.list("getAllDetailCode", map);
	}

	public Object getAlarmCodeDetailById(Map map) throws Exception {
		return codeDao.object("getAlarmCodeDetailById", map);
	}

	public void insertSubAlarm(Map map) throws Exception {
		codeDao.insert("insertAlarmSubCode", map);
	}

	public void insertAlarmPpe(Map map) throws Exception {
		codeDao.insert("insertAlarmPpe", map);
	}

	public void insertAlarmAction(Map map) throws Exception {
		codeDao.insert("insertAlarmAction", map);
	}

	public void insertAlarmTool(Map map) throws Exception {
		codeDao.insert("insertAlarmTool", map);
	}

	public void insertAlarmPart(Map map) throws Exception {
		codeDao.insert("insertAlarmPart", map);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void saveSomeDetail(Map<String, Object> map) throws Exception {
		String lenAction = (String) map.get("LEN_ACTION");
		String lenPart = (String) map.get("LEN_PART");
		String lenTool = (String) map.get("LEN_TOOL");
		String lenPpe = (String) map.get("LEN_PPE");
		Map<String, Object> mapAction = new HashMap<String, Object>();
		Map<String, Object> mapPart = new HashMap<String, Object>();
		Map<String, Object> mapTool = new HashMap<String, Object>();
		Map<String, Object> mapPpe = new HashMap<String, Object>();
		String subCd = (String) map.get("WT_ALARM_ID");
		mapAction.put("WT_ALARM_ID", subCd);
		mapPart.put("WT_ALARM_ID", subCd);
		mapTool.put("WT_ALARM_ID", subCd);
		mapPpe.put("WT_ALARM_ID", subCd);
		if (!lenAction.equals("0")) {
			if (lenAction.equals("1")) {
				String action = (String) map.get("ACTION");
				mapAction.put("ACTION_NM", action);
				insertAlarmAction(mapAction);
			} else {
				List listAction = splitStringToList(map.get("ACTION").toString());
				for (int i = 0; i < listAction.size(); i++) {
					String action = (String) listAction.get(i);
					mapAction.put("ACTION_NM", action);
					insertAlarmAction(mapAction);
				}

			}
		}
		if (!lenPart.equals("0")) {
			if (lenPart.equals("1")) {
				String part = (String) map.get("PART");
				if (!part.isEmpty()) {
					mapPart.put("PARTS_NM", part);
					insertAlarmPart(mapPart);
				}
			} else {
				List listPart = splitStringToList(map.get("PART").toString());
				for (int i = 0; i < listPart.size(); i++) {
					String part = (String) listPart.get(i);
					if (!part.isEmpty()) {
						mapPart.put("PARTS_NM", part);
						insertAlarmPart(mapPart);
					}
				}

			}
		}
		if (!lenTool.equals("0")) {
			if (lenTool.equals("1")) {
				String tool = (String) map.get("TOOL");
				if (!tool.isEmpty()) {
					mapTool.put("TOOL_NM", tool);
					insertAlarmTool(mapTool);
				}
			} else {
				List listTool = splitStringToList(map.get("TOOL").toString());
				for (int i = 0; i < listTool.size(); i++) {
					String tool = (String) listTool.get(i);
					if (!tool.isEmpty()) {
						mapTool.put("TOOL_NM", tool);
						insertAlarmTool(mapTool);
					}
				}
			}
		}
		if (!lenPpe.equals("0")) {
			if (lenPpe.equals("1")) {
				String ppe = (String) map.get("PPE");
				if (!ppe.isEmpty()) {
					mapPpe.put("PPE_NM", ppe);
					insertAlarmPpe(mapPpe);
				}
			} else {
				List listPpe = splitStringToList(map.get("PPE").toString());
				for (int i = 0; i < listPpe.size(); i++) {
					String ppe = (String) listPpe.get(i);
					if (!ppe.isEmpty()) {
						mapPpe.put("PPE_NM", ppe);
						insertAlarmPpe(mapPpe);
					}
				}

			}
		}
	}

	private List<String> splitStringToList(String input) {
		List<String> list = new ArrayList<>();
		if (input == null || input.trim().equals("")) {
			return list;
		}
		String[] arr = input.split(",");
		list = Arrays.asList(arr);
		return list;
	}

	public List getAlarmAction(Map map) throws Exception {
		return codeDao.list("getAlarmAction", map);
	}

	public String parseListtoJson(List listProgram) {
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(listProgram);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json;
	}

	public void updateSubAlarmCd(Map parameter) throws Exception {
		codeDao.update("updateSubAlarmCd", parameter);
	}

	public void deleteSomeAlarm(Map map) throws Exception {
		codeDao.delete("deleteAlarmTool", map);
		codeDao.delete("deleteAlarmPpe", map);
		codeDao.delete("deleteAlarmPart", map);
		codeDao.delete("deleteAlarmAction", map);
		List<Map> listFile = (List<Map>) codeDao.list("getListFileByAlarm", map);
		if(listFile != null && listFile.size() > 0) {
			listFile.forEach((each) -> {
				try {
					if(each.get("FLE_PATH") != null && !each.get("FLE_PATH").toString().isEmpty()) {
						File f = new File(each.get("FLE_PATH").toString());           //file to be delete  
						if(f.delete()) {
							System.out.println(f.getName() + " deleted");   //getting and printing the file name  
						}else {
							System.out.println(f.getName() + " delete failed");   //getting and printing the file name  
						}
					}
					codeDao.delete("deleteFile", each);
				} catch (Exception e) {
					e.printStackTrace();
				}
			});
		}
	}

	public void deleteSubAlarmCd(Map map) throws Exception {
		codeDao.delete("deleteSubAlarm", map);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean checkDoubleAlarmDetail(String subCd, String alarmCd) throws Exception {
		boolean check = true;
		Map map = new HashMap();
		map.put("ALARM_SUB_CD", subCd);
		map.put("WT_ALARM_GR_ID", alarmCd);
		List listCheck = codeDao.list("getDoubuleAlarmDetail", map);
		if (listCheck.size() > 0) {
			check = false;
		}
		return check;
	}

	public List<String> getListPartId(String s) {
		List<String> data = new ArrayList<String>(Arrays.asList(s.split(",")));
		return data;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean insertExel(XSSFWorkbook workbook, String type) throws Exception {
		boolean check = true;
		XSSFSheet importSheet = workbook.getSheetAt(0);
		int lastRow = importSheet.getLastRowNum();
		if (type.equals("001")) {
			for (int i = 1; i <= lastRow; i++) {
				XSSFRow rowData = importSheet.getRow(i);
				String code = "";
				String name = "";
				String des = "";
				String upCd = "";
				if (rowData.getCell(0) != null) {
					code = rowData.getCell(0).getStringCellValue();
				}
				if (rowData.getCell(1) != null) {
					name = rowData.getCell(1).getStringCellValue();
				}
				if (rowData.getCell(2) != null) {
					upCd = rowData.getCell(2).getStringCellValue();
				}
				if (rowData.getCell(3) != null) {
					des = rowData.getCell(3).getStringCellValue();
				}
				if (checkCommonExcel(code, name, upCd)) {
					Map map = new HashMap();
					map.put("COMM_CD", code);
					map.put("COMM_NM", name);
					map.put("DESCRPT", des);
					if (!upCd.equals("")) {
						map.put("UP_CD", upCd);
						Map levMap = getLev(upCd);
						int lev = Integer.parseInt((levMap.get("LEV")).toString());
						map.put("LEV", lev + 1);
					} else {
						map.put("LEV", 1);
					}
					codeDao.insert("insertCommonCode", map);
				} else {
					check = false;
				}
			}

		} else if (type.equals("003")) {
			Map map = null;
			Map child = new HashMap();
			for (int index = 2; index <= lastRow; index++) {
				XSSFRow rowData = importSheet.getRow(index);
				if (rowData.getCell(0) != null) {
					String prefixParent = rowData.getCell(0).getStringCellValue();
					String suffixParent = rowData.getCell(1).getStringCellValue();
					String detail = rowData.getCell(3).getStringCellValue();
					if (!prefixParent.equals("")) {
						map = new HashMap();
						if (checkPrefixPartCd(prefixParent, "PART")) {
							map.put("PREFIX_NM", prefixParent);
							map.put("PART_NM", suffixParent);
							map.put("LEV", 1);
							codeDao.insert("insertPartCode", map);
						}
					}
					if (map != null && map.size() > 0) {
						if (!detail.equals("")) {
							child.put("PART_NM", detail);
							child.put("LEV", 2);
							child.put("UP_CD", map.get("PART_CD"));
							codeDao.insert("insertPartCode", child);
						}
					}
				}

			}
		} else if (type.equals("002")) {
			// insert lev 1 lev 2
			Map map = null;
			Map child = new HashMap();
			for (int index = 2; index <= lastRow; index++) {
				XSSFRow rowData = importSheet.getRow(index);
				String prefixParent = rowData.getCell(1).getStringCellValue();
				String suffixParent = rowData.getCell(2).getStringCellValue();
				String prefixChild = rowData.getCell(3).getStringCellValue();
				String suffixChild = rowData.getCell(4).getStringCellValue();
				if (!prefixParent.equals("")) {
					map = new HashMap();
					if (checkPrefixPartCd(prefixParent, "MAIN")) {
						map.put("PREFIX_NM", prefixParent);
						map.put("SUFFIX_NM", suffixParent);
						map.put("LEV", 1);
						codeDao.insert("insertMaintanceCode", map);
					}
				}
				if (map != null && map.size() > 0) {
					if (!prefixChild.equals("")) {
						child.put("PREFIX_NM", prefixChild);
						child.put("SUFFIX_NM", suffixChild);
						child.put("LEV", 2);
						child.put("UP_CD", map.get("MAINTEN_CD"));
						codeDao.insert("insertMaintanceCode", child);
					}
				}
			}
			// insert lev 3
			XSSFSheet importSheet2 = workbook.getSheetAt(1);
			int lastRow2 = importSheet2.getLastRowNum();
			Map result = new HashMap();
			Map objLv2 = new HashMap();
			List maintenCd = null;
			for (int index = 1; index <= lastRow2; index++) {
				XSSFRow rowData = importSheet2.getRow(index);
				String prefixParent = rowData.getCell(0).getStringCellValue();
				String suffixParent = rowData.getCell(1).getStringCellValue();
				String prefixChild = rowData.getCell(2).getStringCellValue();
				String suffixChild = rowData.getCell(3).getStringCellValue();
				if (!prefixParent.equals("")) {
					maintenCd = new ArrayList();
					List prefixList = findMantenLevTwo(prefixParent);
					if (prefixList.size() > 0) {
						for (int i = 0; i < prefixList.size(); i++) {
							objLv2 = (Map) prefixList.get(i);
							maintenCd.add((String) objLv2.get("MAINTEN_CD"));
						}
					}
				}
				for (int i = 0; i < maintenCd.size(); i++) {
					/*
					 * @JK - 보안 취약점 수정 
					 */
					//String upCd = (String) maintenCd.get(i);
					String upCd = "";
					if(maintenCd.get(i) != null) {
						upCd = (String) maintenCd.get(i);
					}
					result.put("UP_CD", upCd);
					result.put("PREFIX_NM", prefixChild);
					result.put("SUFFIX_NM", suffixChild);
					result.put("LEV", 3);
					if (checkdoubleMainLevThree(result)) {
						codeDao.insert("insertMaintanceCode", result);
					}
				}
			}

		} else {
			for (int i = 3; i <= lastRow; i++) {
				XSSFRow rowData = importSheet.getRow(i);
				String manu = "";
				String types = "";
				String des = "";
				String capa = "";
				String codeNm = "";
				if (rowData.getCell(1) != null) {
					manu = rowData.getCell(1).getStringCellValue();
				}
				if (rowData.getCell(2) != null) {
					types = rowData.getCell(2).getStringCellValue();
				}
				if (rowData.getCell(3) != null) {
					capa = rowData.getCell(3).getStringCellValue();
				}
				if (rowData.getCell(4) != null) {
					codeNm = rowData.getCell(4).getStringCellValue();
				}
				if (rowData.getCell(5) != null) {
					des = rowData.getCell(5).getStringCellValue();
				}
				if (validateAlarm(manu, types, capa, codeNm)) {
					Map parameter = new HashMap();
					parameter.put("MANUFAR", manu);
					parameter.put("ALARM_TP", types);
					parameter.put("CAPACITY", capa);
					parameter.put("ALARM_NM", codeNm);
					parameter.put("DESCRPT", des);
					codeDao.insert("insertAlarmCode", parameter);
				}
			}
		}

		return check;
	}

	public boolean checkCommonExcel(String code, String name, String upCd) throws Exception {
		boolean check = true;
		if (code.equals("") || name.equals("")) {
			check = false;
		}
		Map doubMap = getLev(code);
		if (doubMap != null) {
			check = false;
		}
		if (!upCd.equals("")) {
			Map map = getLev(upCd);
			if (map == null) {
				check = false;
			} else {
				int lev = Integer.parseInt((map.get("LEV")).toString());
				if (lev > 2) {
					check = false;
				}
			}
		}
		return check;
	}

	public Map getLev(String upCd) throws Exception {
		Map map = new HashMap();
		map.put("CODE", upCd);
		Map codes = codeDao.map("getLevCode", map);
		return codes;
	}

	public List findMantenLevTwo(String prefix) throws Exception {
		Map map = new HashMap();
		map.put("PREFIX_NM", prefix);
		return codeDao.list("findMantenLevTwo", map);

	}

	public boolean validateAlarm(String manu, String type, String capa, String name) throws Exception {
		boolean check = true;
		if (manu.equals("") || type.equals("") || capa.equals("") || name.equals("")) {
			check = false;
		}
		Map map = new HashMap();
		map.put("MANUFAR", manu);
		map.put("ALARM_TP", type);
		map.put("CAPACITY", name);
		if (!checkAlarmCode(map)) {
			check = false;
		}
		return check;
	}

	public boolean checkPrefixPartCd(String prefix, String type) throws Exception {
		boolean check = true;
		Map map = new HashMap();
		List list = new ArrayList();
		map.put("PREFIX_NM", prefix);
		if (type.equals("PART")) {
			list = codeDao.list("checkPartCd", map);
		} else {
			list = codeDao.list("findMantenLevTwo", map);
		}
		if (list.size() > 0) {
			check = false;
		}
		return check;
	}

	public boolean checkdoubleMainLevThree(Map map) throws Exception {
		boolean check = true;
		List list = codeDao.list("findMantenLevThree", map);
		if (list.size() > 0) {
			check = false;
		}
		return check;
	}

	public int insertAlarmDetail(XSSFWorkbook workbook, String alarmCd) throws Exception {
		XSSFSheet importSheet = workbook.getSheetAt(0);
		int lastRow = importSheet.getLastRowNum();
		List<Map> listDetail = new ArrayList<Map>();
		XSSFRow headerRow = importSheet.getRow(0);
		if(!headerRow.getCell(0).getStringCellValue().equals("Manufacturer") || !headerRow.getCell(18).getStringCellValue().equals("WT No.")) {
			return -2;
		}
		
		
		for (int i = 1; i <= lastRow; i++) {
			XSSFRow rowData = importSheet.getRow(i);
			String code = "";
			String text = "";
			String des = "";
			String sugg = "";
			List<String> actionList = new ArrayList<String>();
			List<String> partList = new ArrayList<String>();
			List<String> toolList = new ArrayList<String>();
			List<String> ppeList = new ArrayList<String>();
			if (rowData.getCell(3) != null) {
				if (rowData.getCell(3).getCellType() == 0) {
					code = String.valueOf((int) rowData.getCell(3).getNumericCellValue());
				} else if (rowData.getCell(3).getCellType() == 1) {
					code = rowData.getCell(3).getStringCellValue();
				}
			}
			if (rowData.getCell(4) != null) {
				text = rowData.getCell(4).getStringCellValue();
			}
			if (rowData.getCell(5) != null) {
				des = rowData.getCell(5).getStringCellValue();
			}
			if (rowData.getCell(6) != null) {
				sugg = rowData.getCell(6).getStringCellValue();
			}
			if (rowData.getCell(7) != null) {
				String temp = rowData.getCell(7).getStringCellValue();
				if(!temp.trim().isEmpty()) {
					String[] action = temp.split("\\r?\\n");
					if(action.length > 0) actionList = Arrays.asList(action);
				}
			}
			if (rowData.getCell(8) != null) {
				String temp = rowData.getCell(8).getStringCellValue();
				if(!temp.trim().isEmpty()) {
					String[] part = temp.split("\\r?\\n");
					if(part.length > 0) partList = Arrays.asList(part);
				}
			}
			if (rowData.getCell(9) != null) {
				String temp = rowData.getCell(9).getStringCellValue();
				if(!temp.trim().isEmpty()) {
					String[] tool = temp.split("\\r?\\n");
					if(tool.length > 0) toolList = Arrays.asList(tool);
				}
			}
			if (rowData.getCell(10) != null) {
				String temp = rowData.getCell(10).getStringCellValue();
				if(!temp.trim().isEmpty()) {
					String[] ppe = temp.split("\\r?\\n");
					if(ppe.length > 0) ppeList = Arrays.asList(ppe);
				}
			}
			if (validateAlarmDetail(code, text, des, alarmCd)) {
				Map map = new HashMap();
				map.put("WT_ALARM_GR_ID", alarmCd);
				map.put("ALARM_SUB_CD", code);
				map.put("ALARM_TXT", text);
				map.put("DESCRPT", des);
				map.put("SUGGEST", sugg);
				map.put("LIST_ACTION", actionList);
				map.put("LIST_PART", partList);
				map.put("LIST_TOOL", toolList);
				map.put("LIST_PPE", ppeList);
				 
				listDetail.add(map);
			}
		}
		if (listDetail.size() > 0) {
			Map map = new HashMap();
			map.put("LIST_DETAIL", listDetail);
			for (Map each : listDetail) {
				codeDao.insert("insertListDetailAlarm", each);
				codeDao.insert("insertSomeAlarmDetail", each);
			}
//			saveAlarmCodeDetail(listDetail);
		}
		return listDetail.size();
	}
	
	/*
	 * @SuppressWarnings({ "unchecked", "rawtypes" }) public void
	 * saveAlarmCodeDetail(List<Map> listDetail) throws Exception { for(Map each:
	 * listDetail) { codeDao.insert("insertAlarmSubCode", each); List actions =
	 * (List) each.get("LIST_ACTION"); if(!each.isEmpty())
	 * insertAlarmAction(mapAction);
	 * 
	 * 
	 * }
	 * 
	 * }
	 */

	public boolean validateAlarmDetail(String code, String text, String des, String alarm) throws Exception {
		boolean check = true;
		if (code.equals("") || text.equals("") || des.equals("")) {
			check = false;
		}
		if (!checkDoubleAlarmDetail(code, alarm)) {
			check = false;
		}
		return check;
	}

	public boolean validPart(Map map) throws Exception {
		boolean check = true;
		List list = new ArrayList();
		String lev = (map.get("LEV")).toString();
		if (lev.equals("1")) {
			list = codeDao.list("validPartLev1", map);
		} else {
			list = codeDao.list("validPartLev2", map);
		}
		if (list.size() > 0) {
			check = false;
		}
		return check;
	}

	public void deleteGroupAlarmCode(Map<String, Object> parameter) throws Exception {
		List list = new ArrayList<>();
		list = codeDao.list("getListAlarmByGroupID", parameter);
		if (!list.isEmpty()) {
			for (Map each : (List<Map>) list) {
				deleteSomeAlarm(each);
				deleteSubAlarmCd(each);
			}
		}
		codeDao.delete("deleteGroupAlarmCode", parameter);

	}

	public List checkDuplicateMaintenanceCode(Map<String, Object> parameter) throws Exception {
		return codeDao.list("checkDuplicateMaintenanceCode", parameter);

	}

	public List checkDuplicatePartCode(Map<String, Object> parameter) throws Exception {
		return codeDao.list("checkDuplicatePartCode", parameter);

	}

	public Object getAlarmGroupById(Map parameter) throws Exception {
		return codeDao.object("getAlarmGroupById", parameter);
	}
}
