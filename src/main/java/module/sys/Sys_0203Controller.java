package module.sys;

import java.io.File;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import infrastructure.util.ArrangeUtil;
import infrastructure.util.CalendarUtil;
import infrastructure.util.ComFileUtil;
import infrastructure.util.ParameterUtil;
/**
 * sys_0203 메뉴관리
 * @작성일    : 2016. 9. 26. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
@Controller("Sys_0203Controller")
@RequestMapping("/sys/sys_0203")
public class Sys_0203Controller extends BaseController{
	
	@Autowired 
	private Sys_0203DAOImpl SYS0203dao;
	
	@Autowired
	private Sys_0203ServiceImpl SYS0203ser;
	
	/**
	 * 메뉴관리 페이지 호출 
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리 페이지 호출 
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/list")
	public ModelAndView doSearch(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {	
	    /**
		 * ModelAndView
		 */
	    mav.setViewName("sys/sys_0203");
		return mav;
	}
	
	/**
	 * 메뉴관리내역
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리내역 그리드 호출(Ajax)
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter 
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		/**
		 * Logic 
		 */	
		// 메뉴관리내역 리스트(List)
		List list = SYS0203dao.list("getMenuList", parameter);
		
	    /**
		 * ModelAndView
		 */
		request.setAttribute("EVENT", "VIEW");
		mav.setViewName("jsonView");
		mav.addObject("DATA", ArrangeUtil.sortMapList(list, "MENU_ID", "UP_MENU_ID", "LEV"));
		return mav; 
	}
	
	/**
	 * 메뉴관리내역 수정/삭제
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리내역 수정/삭제
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/save01.ajax")
	public ModelAndView doSave(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter 
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Logic 
		 */
		request.setAttribute("EVENT", "UPDATE");
		String res = SYS0203dao.saveSYS0203(parameter);
		
	    /**
		 * ModelAndView
		 */		
		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}

	/**
	 * 메뉴관리 등록 Form 페이지 호출
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리 등록 Form 페이지 호출
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/01/form.{path}") // path = [popup,dialog,tab]
	public ModelAndView sub01Form(ModelAndView mav, HttpServletRequest request, HttpServletResponse response,
			@PathVariable String path) throws Exception {	
//		System.out.println("@@@@@@@@@@@" + path);
		/**
		 * Parameter 
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		
		//String type = (String) parameter.get("type");
		
		/**
		 * Logic 
		 */	
		// 순번 및 메뉴ID설정
		Map	map = new HashMap();
		if (parameter!= null) {
			// Edit EXISTING MENU
			if (parameter.get("MODE") != null && parameter.get("MODE").equals("EDIT")) {
				// 메뉴ID설정
				map.putAll(SYS0203dao.map("getMenuById", parameter));
				mav.addObject("LEV",parameter.get("LEV"));
				mav.addObject("MODE",parameter.get("MODE"));
				map.putAll(parameter);				
			}
			// Add new menu
			// LEVEL이 0이나 null이 아닌 경우만
			else if(parameter.get("LEV") != null&& !parameter.get("LEV").equals("") && Integer.parseInt((String)parameter.get("LEV"))> 0)
			{
				// 순번설정
				map =  SYS0203dao.map("getOrdNo", parameter);
				
				// 메뉴ID설정
				map.putAll(SYS0203dao.map("getMenuId", parameter));
				mav.addObject("LEV",parameter.get("LEV"));
			}
		}
		
	    /**
		 * ModelAndView
		 */
	    mav.setViewName(path+":sys/sys_020301");
	    //mav.setViewName(type+":sys/sys_020301");
	    mav.addObject("DATA", map);
	    mav.addObject("path",path);
		return mav;
	}
	
	/**
	 * 메뉴관리 등록 Form 저장
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 메뉴관리 등록 Form 저장
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/01/insert01.ajax")
	public ModelAndView doInsert(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) throws Exception {
		/**
		 * Parameter 
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Logic 
		 */		
		String res = "true";
		if("EDIT".equals(parameter.get("MODE"))) {
			res = SYS0203dao.updateSYS0203(parameter);
			request.setAttribute("EVENT", "UPDATE");
		} else {
			res = SYS0203dao.insertSYS0203(parameter);	
			request.setAttribute("EVENT", "INSERT");
		}
		
		
	    /**
		 * ModelAndView
		 */		
		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}
	
	@RequestMapping("/01/delete01.ajax")
	public ModelAndView doDelete01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {
		/**
		 * Parameter 
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMap(request);
		
		/**
		 * Logic 
		 */		
		
			try {
				String rs = SYS0203dao.deleteMenu(parameter);
				request.setAttribute("EVENT", "DELETE");

				mav.addObject("DATA", rs);

			} catch (Exception e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
				exceptionLogging(e);
				mav.addObject("DATA", "false");
			}
		
		
	    /**
		 * ModelAndView
		 */		
		mav.setViewName("jsonView");
		return mav;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/excelFile.ajax")
	public void excelFile (HttpServletRequest request, HttpServletResponse response) throws Exception {
		String fileName = "Menu_"+ComFileUtil.generateTempKey() + "_" + CalendarUtil.getTodayStrWithFormat("yyyyMMddHHmmss") + ".xls";
		
		File file = SYS0203ser.excelFile(fileName);
		
		response.setContentType("sys/sys_0203");
		response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
		Files.copy(file.toPath(), response.getOutputStream());
		response.getOutputStream().flush();
		file.delete();
	}
}
