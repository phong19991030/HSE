package applications.sys;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMethod;
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
@Controller("Sys_0201Controller")
@RequestMapping("/sys/sys_0201")
public class Sys_0201Controller extends BaseController {

	@Autowired
	private Sys_0201ServiceImpl sys0201svc;
	
	@Autowired
	public Sys_0201DAOImpl sys_0201dao;
	
	@Autowired
	private UtilService utilService;

	@Autowired
	private ServletContext servletContext;


	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws Exception {
		/**
		 * ModelAndView
		 */
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
		generator.initialize(2048);
		KeyPair keyPair = generator.genKeyPair();
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		PublicKey publicKey = keyPair.getPublic();
		PrivateKey privatKey = keyPair.getPrivate();
		httpSession.setAttribute("_RSA_WEB_Key_2", privatKey);   //세션에 RSA 개인키를 세션에 저장한다.
		RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
		String publicKeyModulus = publicSpec.getModulus().toString(16);
		String publicKeyExponent = publicSpec.getPublicExponent().toString(16);
		request.setAttribute("RSAModulus", publicKeyModulus);  //로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		request.setAttribute("RSAExponent", publicKeyExponent);   //로그인 폼에 Input Hidden에 값을 셋팅하기위해서
		
		mav.addAllObjects(parameter);
		mav.setViewName("sys/sys_0201");
		return mav;
	}

	/* @hy 사용자 관리 상세정보 조회*/
	@RequestMapping("/detailForm/getUserInfo.ajax")
	public ModelAndView getUserInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		parameter.putAll(session);
		
		Map result = sys0201svc.getUserInfo(parameter);
		
		mav.setViewName("sys_new/sys_0302");
		mav.addObject("DATA", result);
		return mav;
	}
	
	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		Map searchMap = (Map) parameter.get("search");
		parameter.putAll(searchMap);
		try {

			List list = sys0201svc.list("getUserList", parameter);

			mav.setViewName("jsonView");
			request.setAttribute("EVENT", "VIEW");

			mav.addObject("DATA", list);
			
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		
		
		return mav;
	}

	
	@RequestMapping("/poupNewDocument/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView popupNewDocument(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);

		String USER_UID = request.getParameter("USER_UID");
		
		List list_role = sys0201svc.list("getRoleList", parameter);
		List list_gerator = sys0201svc.list("getGeratorList", parameter);
		
		String ROLE_ID = "";
		String ROLE_NM = "";
		
		String GERATOR_ID = "";
		String GERATOR_NM = "";
		
		List list_rolename = new ArrayList<>();
		List list_geratorname = new ArrayList<>();
		
		for (int i=0;i< list_role.size();i++) {
			Map map_role = (Map) list_role.get(i);
			list_rolename  = sys0201svc.list("getRoleListName", map_role);
			if(list_rolename.size()>0) {
				Map map_listname = (Map) list_rolename.get(0);
				
				if (ROLE_NM=="") {
					ROLE_NM = (String) map_listname.get("ROLE_NM");
				}else {
					ROLE_NM = ROLE_NM + ","+(String) map_listname.get("ROLE_NM");
				}
			
			}
			if (ROLE_ID=="") {
				ROLE_ID = (String) map_role.get("ROLE_ID");
			}else {
			ROLE_ID = ROLE_ID + ","+(String) map_role.get("ROLE_ID");
			}
		}
		
		for (int i=0;i< list_gerator.size();i++) {
			Map map_gerator = (Map) list_gerator.get(i);
			list_geratorname  = sys0201svc.list("getGeratorListName", map_gerator);
			if(list_geratorname.size()>0) {
				Map map_listname = (Map) list_geratorname.get(0);
				
				if (GERATOR_NM=="") {
					GERATOR_NM = (String) map_listname.get("GERATOR_NM");
				}else {
					GERATOR_NM = GERATOR_NM + ","+(String) map_listname.get("GERATOR_NM");
				}
			
			}
			if (GERATOR_ID=="") {
				GERATOR_ID = (String) map_gerator.get("GERATOR_ID");
			}else {
				GERATOR_ID = GERATOR_ID + ","+(String) map_gerator.get("GERATOR_ID");
			}
		}

		String logoPath="";
		
		List list1 = sys0201svc.list("getLogoPath", parameter);
		if(list1.size()>0) {
			Map map = (Map) list1.get(0);
			
			logoPath=  (String) map.get("FLE_PATH");
		}
		
		String COMP_NM="";
		Map param1= new HashMap<>();
		param1.put("USER_UID", USER_UID);
		List list2 = sys0201svc.list("getCompanyName", param1);
		if(list2.size()>0) {
			Map map = (Map) list2.get(0);
			
			COMP_NM=  (String) map.get("COMPANY_NM");
		
		}
		
		//수정페이지
		mav.setViewName(path + ":sys/sys_020101");
		//mav.setViewName(path + ":sys_new/sys_0302");
		
		mav.addObject("USER_UID", USER_UID);
		mav.addObject("COMP_NM", COMP_NM);
		mav.addObject("ROLE_ID", ROLE_ID);
		mav.addObject("ROLE_NM", ROLE_NM);
		mav.addObject("GERATOR_ID", GERATOR_ID);
		mav.addObject("GERATOR_NM", GERATOR_NM);
		mav.addObject("DATA", parameter);
		mav.addObject("LOGO_PATH", logoPath.replaceAll("\\\\", "\\/"));
		
		return mav;
	}
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/poupNewDocument/save01.ajax")
	public ModelAndView doSave01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
		final String userUid = CommonUtil.getMapValue(session, "USER_UID", "");
		
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
					params.put("NEW_FLE_NM", fileName + "." + extension);
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
		
		String res = sys0201svc.saveSTM0201(parameter, request);
		if (res.equals("true")) result.setStatus(true);
		else result.setStatus(false);

		mav.setViewName("jsonView");
		mav.addObject("DATA", result.toMap());
		/*mav.addObject("DATA", res);*/
		return mav;
	}
	
	@RequestMapping("/duplCheckID.ajax")
	public ModelAndView duplCheckID(ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws Exception {


		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

	
		String res = sys0201svc.duplCheckID(parameter);

		mav.setViewName("jsonView");
		
		mav.addObject("DATA", res);
		return mav;
	}
	
	@RequestMapping("/delete01.ajax")
	@Transactional(propagation = Propagation.REQUIRED)
	public ModelAndView doDelete01(ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);

	
		String res = "deleteY";

		try {
//			sys0201svc.delete("deleteUserInfo", parameter.get("form"));
//			sys_0201dao.delete("deleteUserRole", parameter.get("form"));
			sys0201svc.delete("deleteUser", parameter.get("form"));
			request.setAttribute("EVENT", "DELETE");

		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}
	
	@RequestMapping("/01/delete02.ajax")
	@Transactional(propagation = Propagation.REQUIRED)
	public ModelAndView doDelete02(ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		Map parameter = ParameterUtil.getParameterMap(request);

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
				map.put("USER_UID", arr[i]);
				sys_0201dao.delete("deleteUser", map);
			}
			res = "true";
//			sys0201svc.delete("deleteUserInfo", parameter.get("form"));
//			sys_0201dao.delete("deleteUserRole", parameter.get("form"));
//			sys0201svc.delete("deleteUser", parameter.get("form"));
			request.setAttribute("EVENT", "DELETE");

		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}

		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}
	

	
	@RequestMapping( value = "/deleteLogo.ajax") // path = [popup,dialog,tab]
	public ModelAndView deleteLogo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);

		
		String res = "deleteY";
		
		/**
		 * Logic
		 */
		try {
			sys0201svc.delete("deleteLogo", parameter);
			request.setAttribute("EVENT", "DELETE");

		} catch (Exception e) {
			logger.error(e.getMessage());
			res = "false";
		}
		
		
		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}
}