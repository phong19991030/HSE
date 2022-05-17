package module.sys;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import applications.code.CodeDAOImpl;
import infrastructure.inheritance.BaseController;
import infrastructure.util.ParameterUtil;
import net.sf.json.JSONArray;

/**
 * 기능 : 프로그램관리 이력 : 1) 2014. 12. 2. leehs 최초생성 비고 :
 */
@Controller("Sys_0202Controller")
@RequestMapping("/sys/sys_0202")
public class Sys_0202Controller extends BaseController {

	@Autowired
	private Sys_0202DAOImpl sys0202dao;
	@Autowired
	private CodeDAOImpl codedao;

	/**
	 * 프로그램관리 페이지 호출
	 * 
	 * @작성일 : 2014. 12. 2.
	 * @작성자 : leehs
	 * @프로그램설명 : 프로그램관리 페이지 호출
	 * @진행상태: TO-DO
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		List<?> code = codedao.list("getPgmFieldStdMgt");

		mav.setViewName("sys/sys_0202");
		mav.addObject("FLD_CD_GRID", JSONArray.fromObject(code)); // grid selectBox 분야 공통코드
		return mav;
	}

	/**
	 * 프로그램내역
	 * 
	 * @작성일 : 2014. 12. 2.
	 * @작성자 : leehs
	 * @프로그램설명 : 프로그램내역 그리드 호출(Ajax)
	 * @진행상태: TO-DO
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		List list = sys0202dao.list("getPgmList", parameter);
		request.setAttribute("EVENT", "VIEW");
		mav.setViewName("jsonView");
		mav.addObject("DATA", list);
		return mav;
	}

	/**
	 * 프로그램내역 저장
	 * 
	 * @작성일 : 2014. 12. 2.
	 * @작성자 : leehs
	 * @프로그램설명 :
	 * @진행상태: TO-DO
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/save01.ajax")
	public ModelAndView doSave01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);
		String res = sys0202dao.saveSTM0202(parameter, request);

		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}

	/**
	 * 프로그램필드 저장
	 * 
	 * @작성일 : 2014. 12. 2.
	 * @작성자 : leehs
	 * @프로그램설명 :
	 * @진행상태: TO-DO
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/save02.ajax")
	public ModelAndView doSave02(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map parameter = ParameterUtil.getParameterMap(request);

		String res = sys0202dao.saveFld(parameter, request);
		mav.setViewName("jsonView");
		mav.addObject("DATA", res);
		return mav;
	}

}
