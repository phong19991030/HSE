package module.sys_new;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import kr.co.a2m.security.kryptos.A2mSHA;
import module.util.FileUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("Sys_new_0500Controller")
@RequestMapping("/sys_new/sys_0500")
public class Sys_0500Controller extends BaseController {
	
	@Resource
	private Sys_0500ServiceImpl src;
	
	@Autowired
	private ServletContext servletContext;
	
	@RequestMapping("/list")
	public ModelAndView list(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		mav.setViewName("sys_new/sys_0500");
		return mav;
	}
	
	/* 리스트 조회 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getData(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getRowList(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 등록 페이지 이동  */
	@RequestMapping("/registerForm")
	public ModelAndView registerForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Register");
		mav.addObject("PROCESS", "INSERT");
		mav.setViewName("sys_new/sys_0501");
		return mav;
	}
	
	/* 수정 페이지 이동  */
	@RequestMapping("/modifyForm")
	public ModelAndView modifyForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Modify");
		mav.addObject("PROCESS", "UPDATE");
		mav.addObject("DATA", parameter);
		mav.setViewName("sys_new/sys_0501");
		return mav;
	}
	
	/* 저장 */
	@RequestMapping("/save.ajax")
	public ModelAndView save(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		
		// LOGO
		List<MultipartFile> files = parameter.get("LOGO") != null ? (List<MultipartFile>) parameter.get("LOGO") : new LinkedList<MultipartFile>();
		String rootPath = FileUtil.getFileDirRootPath(servletContext);
		String lastPath = FileUtil.joinDirPartition(new String[] {"company_logo", new SimpleDateFormat("yyyyMMdd").format(new Date())});
		Map fileInfo = FileUtil.getFileInfo(files.get(0), "_company_logo");
		fileInfo.put("ROOT_PATH", rootPath);
		fileInfo.put("LAST_PATH", lastPath);
		fileInfo.put("FILE", files.get(0));
		parameter.put("LOGO", fileInfo);
		
		Map result = null;
		if(parameter.get("PROCESS").toString().equals("UPDATE")) {
			result = src.update(parameter);
		} else {
			result = src.insert(parameter);
		}
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	/* 상세 페이지 이동 */
	@RequestMapping("/detailForm")
	public ModelAndView detailForm(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		mav.addObject("PAGE_TITLE", "Detail");
		mav.setViewName("sys_new/sys_0502");
		mav.addObject("DATA", parameter);
		return mav;
	}
	
	/* 유저 정보 조회 */
	@RequestMapping("/detailForm/getDetailInfo.ajax")
	public ModelAndView getDetailInfo(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.getCompanyInfo(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	/* 삭제 */
	@RequestMapping("/detailForm/delete.ajax")
	public ModelAndView delete(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> parameter = ParameterUtil.getParameterMap(request);
		Map result = src.delete(parameter);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		return mav;
	}
	
	
	
	
	
}
