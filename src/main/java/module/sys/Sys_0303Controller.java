package module.sys;

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

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
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
import module.util.DateConverter;

/**
 * @Description : Notice(공지사항)
 * @author : yjkim
 * @since : 2019.09.30
 * @Modification Information Date Name Desc. ────────── ────────── ──────────
 *               2019.09.30 Yunju Kim Notice C,R,U,D
 */
@Controller("Sys_0303Controller")
@RequestMapping("/sys/sys_0303")
public class Sys_0303Controller extends BaseController {

	@Resource
	private Sys_0303ServiceImpl src;

	@Autowired
	private UtilService utilService;

	@Autowired
	private ServletContext servletContext;
	

	/**
	 * 공지사항 목록 화면
	 * 
	 * @category view
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("sys/sys_0303");
		mav.addObject("USER_ROLE", src.adminCheck(parameter));
		return mav;
	}

	/**
	 * 공지사항 전체 조회
	 * 
	 * @category select
	 */
	@RequestMapping("/getNoticeList.ajax")
	public ModelAndView getNoticeList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		Map search = (Map) parameter.get("search");
		parameter.putAll(search);
		String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
		parameter.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		List noticeList = src.getNoticeList(parameter);

		mav.setViewName("jsonView");
		mav.addObject("DATA", noticeList);
		request.setAttribute("EVENT", "VIEW");
		return mav;
	}

	/**
	 * 공지사항 등록 화면
	 * 
	 * @category view
	 */
	@RequestMapping("/01.{path}")
	public ModelAndView noticeForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
		Map session = (Map) parameter.get("session");
		String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
		parameter.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		if (parameter.get("NOTICE_ID") != null && !parameter.get("NOTICE_ID").equals("")) {
			Map notice_info = src.getNoticeByID(parameter);
			notice_info.put("USER_ROLE", src.adminCheck(parameter));
			notice_info.put("CRUD", "U");
			mav.addObject("DATA", notice_info);

		} else {
			parameter.put("CRUD", "C");
			mav.addObject("DATA", parameter);
		}
		mav.setViewName(path + ":sys/sys_030301");

		return mav;
	}
	
	@RequestMapping("/formdetail")
	public ModelAndView viewDetail(ModelAndView mav, HttpServletRequest request, HttpServletResponse response
		) throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);
		if (parameter.get("NOTICE_ID") != null && !parameter.get("NOTICE_ID").equals("")) {
			Map notice_info = src.getNoticeByID(parameter);
			notice_info.put("USER_ROLE", src.adminCheck(parameter));
			mav.addObject("DATA", notice_info);

		} else {
			mav.addObject("DATA", parameter);
		}
		mav.setViewName("sys/sys_030303");

		return mav;
	}

	/**
	 * 공지사항 등록
	 * 
	 * @throws Exception
	 * @category insert
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/save.ajax")
	public ModelAndView insertNotice(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map parameter = ParameterUtil.getParameterMap(request);

		Map<String, Object> session = (Map<String, Object>) parameter.get("session");
		final String userUid = CommonUtil.getMapValue(session, "USER_UID", "");
		/*
		 * @JK - 보안 취약점 수정
		 */
		String tz = session.get("CLIENT_ACCESS_TIMEZONE").toString();
//		parameter.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		if(tz != null) {
			parameter.put("CLIENT_TIME_ZONE", DateConverter.createTimezoneOffset(tz));
		}

		AjaxResult result = new AjaxResult();
		List<MultipartFile> fileList = (List<MultipartFile>) parameter.get("file");
		try {
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
						parameter.put("ATCH_FILE", seq);

						params.put("FLE_TP", extension);
						params.put("FLE_PATH", saveFile.getAbsolutePath());
						params.put("FLE_NM", file.getOriginalFilename());
						params.put("NEW_FLE_NM", sdf.format(new Date()) + "/" + fileName + "." + extension);
						params.put("FLE_SZ", file.getSize());
						params.put("INS_ID", userUid);
						params.put("DESCRPT", "");
						utilService.insertFileToTCCO_FILE(params);
						result.setStatus(true);
						result.setResponseData(params);
					} catch (IOException e) {
						//logger.error("Error when upload files: " + e);
						exceptionLogging(e);
					} finally {
						if(bos != null) bos.close();
					}
				}
			}

			String crud = parameter.get("CRUD").toString();
			if (crud.equals("C")) {
				src.insertNotice(parameter);
				request.setAttribute("EVENT", "INSERT");
			} else {
				src.updateNotice(parameter);
				request.setAttribute("EVENT", "UPDATE");
			}

			result.setResponseData(parameter.get("NOTICE_ID"));
			// #push_notification
			pushNotificationNotice(crud, new HashMap<String, String>(parameter));
			result.setStatus(true);

		} catch (IOException e) {
			//e.printStackTrace();
			exceptionLogging(e);
			result.setStatus(false);

		}
		mav.addObject("DATA", result.toMap());
		mav.setViewName("jsonView");

		return mav;
	}

	private void pushNotificationNotice(String crud, Map<String, String> data) {
		if ("C,U".indexOf(crud) == -1)
			return;

		if (!data.containsKey("NOTICE_TIT") || !data.containsKey("NOTICE_CONT"))
			return;

		final String title = data.getOrDefault("NOTICE_TIT", "");
		final String content = data.getOrDefault("NOTICE_CONT", "");

		if (Utils.isNullOrEmpty(title) || Utils.isNullOrEmpty(content))
			return;

	}

	/**
	 * 공지사항 수정
	 * 
	 * @category update
	 */
//	@RequestMapping("/update.ajax")
//	public ModelAndView updateNotice(ModelAndView mav
//								   , HttpServletRequest request
//								   , HttpServletResponse response) throws Exception {
//		
//		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
//		
//		src.updateNotice(parameter);
//		request.setAttribute("EVENT", "UPDATE");
//		mav.setViewName("jsonView");
//		
//		return mav;
//	}

	/**
	 * 공지사항 삭제
	 * 
	 * @throws Exception
	 * @category delete
	 */
	@RequestMapping("/delete.ajax")
	public ModelAndView deleteNotice(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);

		try {
			src.deleteNotice(parameter);
			mav.addObject("DATA", "true");
			request.setAttribute("EVENT", "DELETE");

		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
			mav.addObject("DATA", "false");
		}
		mav.setViewName("jsonView");

		return mav;
	}
	
	@RequestMapping("/delete02.ajax")
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
				map.put("NOTICE_ID", arr[i]);
				src.deleteNotice(map);
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
	

}
