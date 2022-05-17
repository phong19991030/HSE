package module.code;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.util.UtilService;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.ParameterUtil;

@Controller("Code_0108Controller")
@RequestMapping("/sys/sys_0108")
public class Code_0108Controller  extends BaseController{

	@Autowired
	public Code_0101DAOImpl codeDao;
	
	@Autowired
	public Code_0101ServiceImpl service;
	
	@Autowired
	ServletContext context;
	
	@Autowired
	private UtilService utilService;
	

	
	@RequestMapping("/list") 
	public ModelAndView doListPartCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
//		mav.setViewName(path + ":sys/sys_010107_maintain");
		mav.setViewName("sys/sys_010108");
		return mav;
	}
	
	
	@RequestMapping("/getPartCode.ajax") 
	public ModelAndView getData02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getPartCode(parameter);		
		mav.setViewName("jsonView"); 
		mav.addObject("RESULT_TYPE", jsonType); 
		mav.addObject("DATA", ArrangeUtil.sortMapList(list, "CODE", "UP_CD", "LEV"));
		return mav;
	}
	
	
	@RequestMapping("/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView openDialogSelect(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
	
		mav.addAllObjects(parameter);
		mav.setViewName(path + ":sys/sys_01010801");

		return mav;
	}
	
//
//	@RequestMapping("/getMaintanceCode.ajax") 
//	public ModelAndView getMaintanceCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		List list = service.getMaintainceCode(parameter);
//		//List listMainten = service.convertListToTree(list);
//		
//		mav.setViewName("jsonView"); 
//		mav.addObject("RESULT_TYPE", jsonType); 
//		mav.addObject("DATA", ArrangeUtil.sortMapList(list, "CODE", "UP_CD", "LEV"));
//		return mav;
//	}
//	@RequestMapping("/getAlarmCode.ajax") 
//	public ModelAndView getData04(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		
//		return mav;
//	}
//	
//	@RequestMapping("/getAllCode.ajax") 
//	public ModelAndView getAllData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);	
//		Map search = (Map) parameter.get("search");
//		parameter.putAll(search);
//		List list = service.getAllCode(parameter);
//	    /**
//		 * ModelAndView
//		 */
//		mav.setViewName("jsonView"); 
//		mav.addObject("RESULT_TYPE", jsonType); 
//		mav.addObject("DATA", list);
//		return mav;
//	}
//	@RequestMapping("/getAllDetailCode.ajax") 
//	public ModelAndView getAllDetailCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);	
//		Map search = (Map) parameter.get("search");
//		parameter.putAll(search);
//		List list = service.getAllDetailCode(parameter);
//
//	    /**
//		 * ModelAndView
//		 */
//		mav.setViewName("jsonView"); 
//		mav.addObject("RESULT_TYPE", jsonType); 
//		mav.addObject("DATA", list);
//		return mav;
//	}
//	@RequestMapping("/checkDoubleCode.ajax") 
//	public @ResponseBody boolean checkDoubleCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMap(request);
//		String newCode = (String) parameter.get("COMM_CD");
//		List listCode = service.getCommonCode(parameter);
//		boolean check = service.checkDoubleCode(newCode, listCode);
//		return check;
//	}
//	
//	@RequestMapping("/createCommon/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView createCommon(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		mav.setViewName(path + ":sys/sys_010101");
//		return mav;
//	}
//	@RequestMapping("/importExel/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView importExcelView(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		String type = (String) parameter.get("TYPE");
//		if(type.equals("CODE")) {
//			mav.setViewName(path + ":sys/sys_010105");
//		}else {
//			String alarmCd = (String) parameter.get("WT_ALARM_GR_ID");
//			mav.addObject("WT_ALARM_GR_ID",alarmCd);
//			mav.setViewName(path + ":sys/sys_010106");
//		}		
//		return mav;
//	}
//	
//	@RequestMapping("/03/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView openDialogSelect(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//	
//		mav.addAllObjects(parameter);
//		mav.setViewName(path + ":common/popup/selectIngredientOfAlarmCode");
//
//		return mav;
//	}
//	
//	@RequestMapping("/02") // path = [popup,dialog,tab]
//	public ModelAndView detailAlarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		String code = (String) parameter.get("WT_ALARM_GR_ID");
//		String groupName = (String) parameter.get("GROUP_NM");
//		mav.addObject("WT_ALARM_GR_ID",code);
//		mav.addObject("GROUP_NM",groupName);
//		mav.setViewName("sys/sys_010102");
//		return mav;
//	}
//	
//	@RequestMapping("/02/saveManual.ajax") // path = [popup,dialog,tab]
//	public ModelAndView saveManual(ModelAndView mav, HttpServletRequest request, 
//			HttpServletResponse response) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
//		String userUid = CommonUtil.getMapValue(session, "USER_UID", "");
//		AjaxResult result = new AjaxResult();
//		List<MultipartFile> fileList = (List<MultipartFile>) parameter.get("file");
//
//		if (fileList != null && !fileList.isEmpty()) {
//			MultipartFile file = fileList.get(0);
//			if (file != null && file.getSize() > 0) {
//				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
//				File f = new File(context.getRealPath(""));
//				String rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator
//						+ sdf.format(new Date());
//				if (!Utils.isDirExist(rootDir)) {
//					Utils.makeDir(rootDir);
//				}
//				
//				final int dotPos = file.getOriginalFilename().lastIndexOf(".");
//				final String fileName = String.valueOf(new Date().getTime() + Math.abs(new Random().nextInt(404)));
//				final String extension = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
//				File saveFile = new File(rootDir + File.separator + fileName + "." + extension);
//				BufferedOutputStream bos = null;
//				try {
//					bos = new BufferedOutputStream(new FileOutputStream(saveFile));
//					byte[] bytes = file.getBytes();
//					bos.write(bytes);
//					bos.flush();
//
//					Map<String, Object> params = new HashMap<>();
//					params.put("FLE_KEY", "Temp");
//					final String seq = UUID.randomUUID().toString();
//					params.put("ATCH_FLE_SEQ", seq);
//					parameter.put("ATCH_FLE_SEQ", seq);
//					
//					params.put("FLE_TP", extension);
//					params.put("FLE_PATH", saveFile.getAbsolutePath());
//					params.put("FLE_NM", file.getOriginalFilename());
//					params.put("NEW_FLE_NM", fileName + "." + extension);
//					params.put("FLE_SZ", file.getSize());
//					params.put("INS_ID", userUid);
//					params.put("DESCRPT", "");
//					utilService.insertFileToTCCO_FILE(params); 
//					result.setStatus(true);
//					result.setResponseData(params);
//				} catch (IOException e) {
//					result.setStatus(false);
//
//					logger.error("Error when upload files: " + e);
//				} 
//			}
//		}
//		
//		mav.setViewName("jsonView");
//		mav.addObject("DATA", result.toMap());
//		return mav;
//	}
////	@RequestMapping("/listdetailAlarm/form.{path}") // path = [popup,dialog,tab]
////	public ModelAndView detailAlarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
////			@PathVariable String path) throws Exception {
////		
////		Map parameter = ParameterUtil.getParameterMap(request);
////		String code = (String) parameter.get("WT_ALARM_GR_ID");
////		mav.addObject("WT_ALARM_GR_ID",code);
////		mav.setViewName(path + "sys/sys_010102");
////		return mav;
////	}
//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	@RequestMapping("/adddDetailAlarm/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView adddDetailAlarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		String code = (String) parameter.get("WT_ALARM_GR_ID");
//		String crud = (String) parameter.get("CRUD");
//		if(crud.equals("U")) {
//			List data = service.getAlarmAction(parameter);
//			List listAction = new ArrayList();
//			List listPart = new ArrayList();
//			List listQtyPart = new ArrayList();
//			List listPpe = new ArrayList();
//			List listQtyPpe = new ArrayList();
//			List listTool = new ArrayList();
//			List listQtyTool = new ArrayList();
//			String partId ="";
//			String toolId ="";
//			String ppeId="";
//			for(int i=0; i<data.size(); i++) {
//				Map map = (Map) data.get(i);
//				String qty="1";
//				if(map.get("QTY")!=null&&map.get("QTY")!="") {
//					qty =  (map.get("QTY")).toString();
//				}
//				String name = (String) map.get("NAME");
//				String type = (String) map.get("TYPE");
//				String id = (String) map.get("ID");
//				if(type.equals("ACTION")) {
//					listAction.add(name);
//				}
//				else if(type.equals("TOOL")) {
//					listTool.add(name);
//					listQtyTool.add(qty);
//					if(toolId.equals("")) {
//						toolId=id;
//					}else {
//						toolId=toolId+","+id;	
//					}
//				}
//				else if(type.equals("PPE")) {
//					listPpe.add(name);
//					listQtyPpe.add(qty);
//					if(ppeId.equals("")) {
//						ppeId=id;
//					}else {
//						ppeId=ppeId+","+id;	
//					}
//				}
//				else {
//					listPart.add(name);
//					listQtyPart.add(qty);
//					if(partId.equals("")) {
//						partId=id;
//					}else {
//						partId=partId+","+id;	
//					}
//				}
//			}
//			mav.addObject("ACTION_LIST",service.parseListtoJson(listAction));
//			mav.addObject("PART_LIST",service.parseListtoJson(listPart));
//			mav.addObject("QTY_PART_LIST",service.parseListtoJson(listQtyPart));
//			mav.addObject("TOOL_LIST",service.parseListtoJson(listTool));
//			mav.addObject("QTY_TOOL_LIST",service.parseListtoJson(listQtyTool));
//			mav.addObject("PPE_LIST",service.parseListtoJson(listPpe));
//			mav.addObject("QTY_PPE_LIST",service.parseListtoJson(listQtyPpe));
//			mav.addObject("PART_ID",partId);
//			mav.addObject("TOOL_ID",toolId);
//			mav.addObject("PPE_ID",ppeId);
//			mav.addObject("DATA",parameter);	
//		}
//		mav.addObject("WT_ALARM_GR_ID",code);
//		mav.addObject("CRUD",crud);
//		mav.setViewName(path + ":sys/sys_010103");
//		return mav;
//	}	
//	@RequestMapping("/addCommonCode.ajax")
//	public @ResponseBody boolean addCommonCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		String CRUD = (String) parameter.get("CRUD");
//		boolean check = true;
//		if(CRUD.equals("C")){
//			String newCode = (String) parameter.get("COMM_CD");
//			List listCode = service.getCommonCode(parameter);
//		    check = service.checkDoubleCode(newCode, listCode);
//		    if(check) {
//		    	service.insertCommoCode(parameter);
//		    }
//			
//		}else if(CRUD.equals("U")) {
//			service.updateCommoCode(parameter);
//		}		
//		return check;
//	}
//	@RequestMapping("/addMaintenCode.ajax")
//	public ModelAndView addMaintenCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		String CRUD = (String) parameter.get("CRUD");
//		if(CRUD.equals("C")) {
//			service.insertMaintenCode(parameter);
//		}else if(CRUD.equals("U")) {
//			service.updateMaintenCode(parameter);
//		}
//		
//		mav.setViewName("jsonView");
//		return mav;
//	}
	@RequestMapping("/addPartCode.ajax")
	public ModelAndView addPartCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		String CRUD = (String) parameter.get("CRUD");
		
		Map result = new HashMap();
		List check = service.checkDuplicatePartCode(parameter);
		if(check != null && !check.isEmpty()) {
			result.put("result", "false");
			result.put("msg", "dupl");
		}else {
			if(CRUD.equals("C")) {
				service.insertPartCode(parameter);
				result.put("result", "true");

			}else if(CRUD.equals("U")) {
				service.updatePartCode(parameter);
				result.put("result", "true");
			}
		}
		mav.addObject("DATA", result);
		mav.setViewName("jsonView");
		return mav;
	}
//	@RequestMapping("/deleteMaintenCode.ajax")
//	public ModelAndView deleteMaintenCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		List list = service.getMaintainceCode(parameter);
//		List result = service.getAllChildId(list, parameter);
//		Map map = new HashMap();
//		map.put("list", result);
//		service.deleteMainceCode(map);
//		mav.setViewName("jsonView");
//		return mav;
//	}
	@RequestMapping("/deletePartCode.ajax")
	public ModelAndView deletePartCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		List list = service.getPartCode(parameter);
		List result = service.getAllChildId(list, parameter);
		Map map = new HashMap();
		map.put("list", result);
		service.deletePartCode(map);
		mav.setViewName("jsonView");
		return mav;
	}
//	
//	@RequestMapping("/deleteCommonCode.ajax")
//	public ModelAndView deleteCommonCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		List list = service.getCommonCode(parameter);
//		List result = service.getAllChildId(list, parameter);
//		Map map = new HashMap();
//		map.put("list", result);
//		service.deleteComoCode(map);
//		mav.setViewName("jsonView");
//		return mav;
//	}
///*	@RequestMapping("/addAlarmCode.ajax")
//	public ModelAndView addAlarmCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		service.insertAlarmCode(parameter);
//		mav.setViewName("jsonView");
//		mav.addObject("result",parameter);
//		return mav;
//	}*/
//	@RequestMapping("/addAlarmCode.ajax") 
//	public @ResponseBody Map addAlarmCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMap(request);
//		boolean check = true;
//		check = service.checkAlarmCode(parameter);
//		if(check) {
//			service.insertAlarmCode(parameter);	
//		}
//		parameter.put("CHECK", check);
//		return parameter;
//	}	
//	@RequestMapping("/checkDoubleAlarmCode.ajax") 
//	public @ResponseBody boolean checkDoubleAlarmCode(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMap(request);
//		boolean check = service.checkAlarmCode(parameter);
//		return check;
//	}
//	
//	@RequestMapping("/saveDetailAlarm.ajax")
//	public @ResponseBody boolean saveDetailAlarm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		boolean check = true;
//		String crud = (String) parameter.get("CRUD");
//		
//		
//		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
//		String userUid = CommonUtil.getMapValue(session, "USER_UID", "");
//		AjaxResult result = new AjaxResult();
//		List<MultipartFile> fileList = parameter.get("file") == null? null: (List<MultipartFile>) parameter.get("file");
//
//		if (fileList != null && !fileList.isEmpty()) {
//			MultipartFile file = fileList.get(0);
//			if (file != null && file.getSize() > 0) {
//				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
//				File f = new File(context.getRealPath(""));
//				String rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator
//						+ sdf.format(new Date());
//				if (!Utils.isDirExist(rootDir)) {
//					Utils.makeDir(rootDir);
//				}
//				
//				final int dotPos = file.getOriginalFilename().lastIndexOf(".");
//				final String fileName = String.valueOf(new Date().getTime() + Math.abs(new Random().nextInt(404)));
//				final String extension = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
//				File saveFile = new File(rootDir + File.separator + fileName + "." + extension);
//				BufferedOutputStream bos = null;
//				try {
//					bos = new BufferedOutputStream(new FileOutputStream(saveFile));
//					byte[] bytes = file.getBytes();
//					bos.write(bytes);
//					bos.flush();
//
//					Map<String, Object> params = new HashMap<>();
//					params.put("FLE_KEY", "Temp");
//					final String seq = UUID.randomUUID().toString();
//					params.put("ATCH_FLE_SEQ", seq);
//					parameter.put("DOC_PATH", seq);
//					
//					params.put("FLE_TP", extension);
//					params.put("FLE_PATH", saveFile.getAbsolutePath());
//					params.put("FLE_NM", file.getOriginalFilename());
//					params.put("NEW_FLE_NM", fileName + "." + extension);
//					params.put("FLE_SZ", file.getSize());
//					params.put("INS_ID", userUid);
//					params.put("DESCRPT", "");
//					utilService.insertFileToTCCO_FILE(params); 
//					result.setStatus(true);
//					result.setResponseData(params);
//				} catch (IOException e) {
//					result.setStatus(false);
//
//					logger.error("Error when upload files: " + e);
//				} 
//			}
//		}
//		
//		
//		
//		
//		if(crud.equals("U")) {
//			service.updateSubAlarmCd(parameter);
//			service.deleteSomeAlarm(parameter);
//			service.saveSomeDetail(parameter);
//		}else {
//			String newCode = (String) parameter.get("ALARM_SUB_CD");
//			String alarmCd = (String) parameter.get("WT_ALARM_GR_ID");
//			check = service.checkDoubleAlarmDetail(newCode,alarmCd);
//			if(check) {
//				service.insertSubAlarm(parameter);
//				service.saveSomeDetail(parameter);
//			}
//			
//		}		
//		return check;
//	}
//	@RequestMapping("/deleteSubAlarmCd.ajax")
//	public ModelAndView deleteSubAlarmCd(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
//		service.deleteSomeAlarm(parameter);
//		service.deleteSubAlarmCd(parameter);
//		mav.setViewName("jsonView");
//		return mav;
//	}
//	
//	@RequestMapping("/checkDoubleAlarmDetail.ajax") 
//	public @ResponseBody boolean checkDoubleAlarmDetail(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMap(request);
//		String newCode = (String) parameter.get("ALARM_SUB_CD");
//		String alarmCd = (String) parameter.get("WT_ALARM_GR_ID");
//		return service.checkDoubleAlarmDetail(newCode,alarmCd);
//	}
//	
//	@RequestMapping( value = "/getPartDetailCd.ajax") // path = [popup,dialog,tab]
//	public ModelAndView getPartDetailCd(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
//
//		List list = codeDao.list("getPartCodeLv2", parameter);
//		mav.setViewName("jsonView");
//		mav.addObject("DATA", list);
//		return mav;
//	}
//	@RequestMapping("/listdetailBasic/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView detailBasic(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		String code = (String) parameter.get("CODE");
//		String type = (String) parameter.get("TYPE");
//		mav.addObject("CODE",code);
//		mav.addObject("TYPE",type);
//		mav.addObject("DATA",parameter);
//		mav.setViewName(path + ":sys/sys_010104");
//		return mav;
//	}
//	@RequestMapping("/listdetailMainten/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView detailMainten(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
////		mav.setViewName(path + ":sys/sys_010107_maintain");
//		mav.setViewName(path + ":sys/sys_010107");
//		return mav;
//	}
//	@RequestMapping("/listdetailPart/form.{path}") // path = [popup,dialog,tab]
//	public ModelAndView detailPart(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
//			@PathVariable String path) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMap(request);
//		mav.setViewName(path + ":sys/sys_010108");
//		return mav;
//	}	
//	@SuppressWarnings("unchecked")
//	@RequestMapping(value = {"/importExcel.ajax"}) 
//	public ModelAndView importExcel (ModelAndView mav, HttpServletRequest request, HttpServletResponse response, @RequestParam("importFile") MultipartFile file,@RequestParam("optionCode") String type) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);			
//		XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream()); 
//
//		service.insertExel(workbook, type);
//		mav.setViewName("jsonView");
//		return mav;
//		
//	}
//	@SuppressWarnings("unchecked")
//	@RequestMapping(value = {"/importAlarmDetail.ajax"}) 
//	public ModelAndView importAlarmDetail (ModelAndView mav, HttpServletRequest request, HttpServletResponse response, @RequestParam("importFile") MultipartFile file,@RequestParam("alarmCd") String alarmCd) throws Exception {
//		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);			
//		XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream()); 	
//		service.insertAlarmDetail(workbook,alarmCd);
//		mav.setViewName("jsonView");
//		return mav;
//		
//	}
//	@SuppressWarnings("unchecked")
//	@RequestMapping(value = "/templateExcelFile.ajax")
//	public void downloadFile(HttpServletRequest request, HttpServletResponse response) {
//		
//		Map<String, Object> parameters = ParameterUtil.getParameterMap(request);
//		String type = (String) parameters.get("TYPE");
//		InputStream is = null;
//		try {
//			
//			String filePath = "";
//			String fileName = "";
//			if(type.equals("001")) {
//				fileName = "CommonCd.xlsx";
//			}else if(type.equals("002")) {
//				fileName = "MaintenCd.xlsx";
//			}else if(type.equals("003")) {
//				fileName = "PartCd.xlsx";
//			}else  if(type.equals("004")) {
//				fileName = "AlarmCd.xlsx";
//			}else {
//				fileName = "Detail_010102(V47).xlsx";
//			}
//			String downloadFolder = context.getRealPath("/WEB-INF/template/");
//			Path file = Paths.get(downloadFolder, fileName);
//			
//			if (Files.exists(file)) {
//				response.setContentType("/sys/sys_0101");	
//				response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
//				
//				Files.copy(file, response.getOutputStream());
//				response.getOutputStream().flush();
//			}
//			
//		} catch (Exception ex) {
//			ex.printStackTrace();
//	    }
//	}
}
