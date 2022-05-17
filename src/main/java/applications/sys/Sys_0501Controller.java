package applications.sys;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import applications.util.AjaxResult;
import applications.util.UtilService;
import applications.util.Utils;
import infrastructure.inheritance.BaseController;
import infrastructure.util.CommonUtil;
import infrastructure.util.ParameterUtil;

/**
 * 사용자관리
 * 
 * @작성일 : 2015. 4. 13.
 * @작성자 : leehs
 * @프로그램설명 :
 * @진행상태: TO-DO
 */
@Controller("Sys_0501Controller")
@RequestMapping("/sys/sys_0501")
public class Sys_0501Controller extends BaseController {

	@Autowired
	private Sys_0501ServiceImpl sys0501svc;

	@Autowired
	private Sys_0201ServiceImpl sys0201svc;
	
	@Autowired
	private UtilService utilService;

	@Autowired
	private ServletContext servletContext;
	/**
	 * 사용자관리 페이지 호출
	 * 
	 * @작성일 : 2014. 12. 1.
	 * @작성자 : leehs
	 * @프로그램설명 : 사용자관리 페이지 호출
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws Exception {
	
		mav.setViewName("sys/sys_0501");
		return mav;
	}

	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);;
		
		Map comp = (Map) parameter.get("search");
		List list = sys0501svc.list("getCompanyList", comp);

	    /**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA",list);
		return mav;
	}

	@RequestMapping("/poupNewDocument/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView popupNewDocument(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
	
		String logoPath="";
		
		List list1 = sys0201svc.list("getLogoPath", parameter);
		if(list1.size()>0) {
			Map map = (Map) list1.get(0);
			
			logoPath=  (String) map.get("FLE_PATH");
		}
		
		mav.setViewName(path + ":sys/sys_050101");  // uncomment this line if not use polaris editor
		
		mav.addObject("LOGO_PATH", logoPath.replaceAll("\\\\", "\\/"));
		mav.addObject("DATA", parameter);
	
		return mav;
	}
	
	@RequestMapping("/poupNewDocument/save01.ajax")
	public ModelAndView doSave01(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);
		
		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
		final String userUid = CommonUtil.getMapValue(session, "USER_UID", "");
		parameter.put("USER_UID", userUid);
		AjaxResult result = new AjaxResult();
	
		List<MultipartFile> fileList = (List<MultipartFile>) parameter.get("file");
		if (fileList != null && !fileList.isEmpty()) {
			MultipartFile file = fileList.get(0);
			if (file != null && file.getSize() > 0) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
				File f = new File(servletContext.getRealPath(""));
				/*
				 * @JK - 보안 취약점 수정 
				 */
				//String rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + sdf.format(new Date());
				String rootDir = "";
				if(f.getParentFile() != null && f.getParentFile().getParentFile() != null) {
					rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator + Utils.getProperty("base.uploadDir") + File.separator + sdf.format(new Date());
				}
				if (!Utils.isDirExist(rootDir)) {
					Utils.makeDir(rootDir);
				}
				
				final int dotPos = file.getOriginalFilename().lastIndexOf(".");
				final String fileName = String.valueOf(new Date().getTime() + Math.abs(new Random().nextInt(404)));
				final String extension = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
				File saveFile = new File(rootDir + File.separator + fileName + "." + extension);
				BufferedOutputStream bos = null;
				try {
					bos = new BufferedOutputStream(new FileOutputStream(saveFile));
					byte[] bytes = file.getBytes();
					bos.write(bytes);
					bos.flush();

					Map<String, Object> params = new HashMap<>();
					params.put("FLE_KEY", "Temp");
					final String seq = UUID.randomUUID().toString();
					params.put("ATCH_FLE_SEQ", seq);
					parameter.put("ATCH_FLE_SEQ", seq);
					
					params.put("FLE_TP", extension);
					params.put("FLE_PATH", saveFile.getAbsolutePath());
					params.put("FLE_NM", file.getOriginalFilename());
					params.put("NEW_FLE_NM", sdf.format(new Date())+"/"+fileName + "." + extension);
					params.put("FLE_SZ", file.getSize());
					params.put("INS_ID", userUid);
					params.put("DESCRPT", "");
					utilService.insertFileToTCCO_FILE(params); 
					result.setStatus(true);
					result.setResponseData(params);
				} catch (IOException e) {
					logger.error("Error when upload files: " + e);
				} finally {
					if(bos != null) bos.close();
				}
			}
		}
		
		
		String res = sys0501svc.saveSTM0501(parameter, request);
		
		if (res.equals("true")) result.setStatus(true);
		else {
			result.setStatus(false);
			if(res.equals("inuse")) {
				result.setMessage("Update unsuccessfully!\nThis organization is inuse.\nCan not change \"classification\".");
			}
		}
		

		mav.setViewName("jsonView");
		mav.addObject("DATA", result.toMap());
		return mav;
	}
	
	@RequestMapping("/checkDoubleName.ajax")
	public ModelAndView checkDoubleName(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		
		List list = sys0501svc.list("checkDoubleName", parameter);
		
		if(list != null && !list.isEmpty()) {
			mav.addObject("DATA", "false");
		}else {
			mav.addObject("DATA", "true");
		}
		
		
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		request.setAttribute("EVENT", "VIEW");
		return mav;
	}
	
	
	@RequestMapping("/delete01.ajax")
	@Transactional(propagation = Propagation.REQUIRED)
	public ModelAndView doDelete01(ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);

		
		Map result = new HashMap<>();

		try {
			boolean check = Integer.parseInt(sys0501svc.object("checkInuse", parameter.get("form")).toString()) > 0? false: true;
			if(!check) {
				result.put("result", "false");
				result.put("msg", "Delete unsuccessful!\nThis organization is inuse.\nPlease check User data, WT farm data or WT generator data.");

			}else{
				sys0501svc.delete("deleteComp", parameter.get("form"));
				result.put("result", "true");
			}
			request.setAttribute("EVENT", "DELETE");
		} catch (Exception e) {
			logger.error(e.getMessage());
			result.put("result", "false");
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/delete02.ajax")
	@Transactional(propagation = Propagation.REQUIRED)
	public ModelAndView doDelete02(ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);

		
		Map result = new HashMap<>();
		

		String id = parameter.get("ID").toString();
		String[] arr = id.split("-");
		String res = "true";
		if(arr.length <= 0) {
			mav.setViewName("jsonView");
			mav.addObject("DATA", "false");
			return mav;
		}
		

		try {
			for(int i = 0; i< arr.length; i++) {
				Map map = new HashMap();
				map.put("COMPANY_ID", arr[i]);
				
				boolean check = Integer.parseInt(sys0501svc.object("checkInuse", map).toString()) > 0? false: true;
				if(!check) {
					result.put("result", "false");
					result.put("msg", "Update unsuccessfully!\nThis organization is inuse.\n Please check User data, WT farm data or WT generator data.");

				}else{
					sys0501svc.delete("deleteComp", map);
					result.put("result", "true");
				}
				
			}
			
			
			request.setAttribute("EVENT", "DELETE");
		} catch (Exception e) {
			logger.error(e.getMessage());
			result.put("result", "false");
		}

		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
}