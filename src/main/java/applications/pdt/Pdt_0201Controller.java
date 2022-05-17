package applications.pdt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.renjin.script.RenjinScriptEngine;
//import org.renjin.sexp.Vector;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import org.rosuda.REngine.Rserve.RConnection;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.BaseController;
import org.apache.commons.lang.ArrayUtils;

/**
 * @Description : prediction
 * @author : anhpv
 * @since : 2021.04.22
 * @Modification
 */
@Controller("Pdt_0201Controller")
@RequestMapping("/pdt/pdt_0201")
public class Pdt_0201Controller extends BaseController {

	private List<Double> listNNETAR_10_2 = new ArrayList<>();
	private List<Double> listNNETAR_20_2 = new ArrayList<>();
	private List<Double> listNNETAR_D_3_1 = new ArrayList<>();
	private List<Double> listNNETAR_D_5_1 = new ArrayList<>();

	private int balanceValue = 17400;

	/**
	 * 공지사항 목록 화면
	 * 
	 * @category view
	 */
	@RequestMapping("/list")
	public ModelAndView doList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
//		Map<?, ?> parameter = ParameterUtil.getParameterMap(request);
		mav.setViewName("pdt/pdt_0201");
		return mav;
	}

	/**
	 * 공지사항 전체 조회
	 * 
	 * @category select
	 */
	@RequestMapping("/getData.ajax")
	public ModelAndView getNoticeList(ModelAndView mav, HttpServletRequest request, HttpServletResponse response) {

		Map<Object, Object> result = new HashMap<>();
		Map<String, List<Double>> mean = new HashMap<>();
		try {
			mean = mean2();
			result.put("result", "true");
			result.put("data", mean);
		} catch (REngineException e) {
			e.printStackTrace();
			result.put("result", "false");
		} catch (REXPMismatchException e) {
			e.printStackTrace();
			result.put("result", "false");
		}
		System.out.println(mean);
		mav.setViewName("jsonView");
		mav.addObject("DATA", result);
		request.setAttribute("EVENT", "VIEW");
		return mav;
	}

	public Map<String, List<Double>> mean2() throws REngineException, REXPMismatchException {
		RConnection c = new RConnection();
		Double[] resultArray = ArrayUtils.toObject(c.eval("rs").asDoubles());
		listNNETAR_10_2 = Arrays.asList(resultArray);
		Double[] resultArray2 = ArrayUtils.toObject(c.eval("rs2").asDoubles());
		listNNETAR_20_2 = Arrays.asList(resultArray2);
		Double[] resultArray3 = ArrayUtils.toObject(c.eval("rs3").asDoubles());
		listNNETAR_D_3_1 = Arrays.asList(resultArray3);
		Double[] resultArray4 = ArrayUtils.toObject(c.eval("rs4").asDoubles());
		listNNETAR_D_5_1 = Arrays.asList(resultArray4);
		Double[] trainDataArray = ArrayUtils.toObject(c.eval("train_data").asDoubles());
		List<Double> trainData = Arrays.asList(trainDataArray);

		Map<String, List<Double>> map = new HashMap<String, List<Double>>();
		map.put("HISTORY", trainData);
		map.put("PREDICT", X5());

		return map;
	}


	private List<Double> X5() {
		List<Double> list = new ArrayList<Double>();
		for (int i = 0; i < 30; i++) {
			if ((listNNETAR_10_2.get(i) * 0.45 + listNNETAR_20_2.get(i) * 0.45 + listNNETAR_D_3_1.get(i) * 0.05
					+ listNNETAR_D_5_1.get(i) * 0.05) < balanceValue) {
				if ((getMax(i) - getMin(i)) >= 23000 && getMax(i) - getMin(i) < 35000) {
					list.add(getTop(i, 3));
				} else {
					if ((getMax(i) - getMin(i)) >= 8000 && (getMax(i) - getMin(i)) < 10000) {
						list.add(getTop(i, 2));
					} else {
						list.add(getMin(i));
					}
				}
			} else {
				if ((getMax(i) - getMin(i)) >= 23000 && (getMax(i) - getMin(i)) < 35000) {
					list.add(getTop(i, 2));
				} else {
					if (((getMax(i) - getMin(i)) >= 8000 && (getMax(i) - getMin(i)) < 10000)
							|| ((getMax(i) - getMin(i)) >= 12000 && (getMax(i) - getMin(i)) < 15000)) {
						list.add(getMin(i));
					} else {
						list.add(getMax(i));
					}
				}
			}
		}
		return list;
	}

	private double getMax(int pos) {

		double[] a = { listNNETAR_10_2.get(pos), listNNETAR_20_2.get(pos), listNNETAR_D_3_1.get(pos),
				listNNETAR_D_5_1.get(pos) };

		List<Double> b = Arrays.asList(ArrayUtils.toObject(a));
		return (double) Collections.max(b);
	}

	private double getMin(int pos) {

		double[] a = { listNNETAR_10_2.get(pos), listNNETAR_20_2.get(pos), listNNETAR_D_3_1.get(pos),
				listNNETAR_D_5_1.get(pos) };

		List<Double> b = Arrays.asList(ArrayUtils.toObject(a));
		return (double) Collections.min(b);
	}

	private double getTop(int pos, int top) {
		if (top > 4 || top < 1) {
			return 0;
		}
		double[] a = { listNNETAR_10_2.get(pos), listNNETAR_20_2.get(pos), listNNETAR_D_3_1.get(pos),
				listNNETAR_D_5_1.get(pos) };
		Arrays.sort(a);
		return a[4 - top];
	}

}
