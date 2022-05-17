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
@Controller("Pdt_0101Controller")
@RequestMapping("/pdt/pdt_0101")
public class Pdt_0101Controller extends BaseController {

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
		mav.setViewName("pdt/pdt_0101");
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
		map.put("HISTORY",trainData);
		map.put("PREDICT", X5());
		
		return map; 
	}

	/*
	 * public List<Double> mean() throws IOException, URISyntaxException,
	 * ScriptException {
	 * 
	 * RenjinScriptEngine engine = new RenjinScriptEngine();
	 * 
	 * engine.eval("library('forecast');"); engine.
	 * eval("df <- read.csv(file = 'D:/predictionResource/hankyung9.csv')[0:1065,3];"
	 * ); engine.eval("length_test_set <- 30;"); engine.eval("h <- 365;");
	 * engine.eval("data <- ts(df,start = 0,frequency = h);"); engine.
	 * eval("train_data <- ts(df[0:(length(df)- length_test_set)],start = 0, frequency = h);"
	 * ); engine.
	 * eval("test_data <- ts(df[(length(df)- length_test_set + 1):(length(df))],start = 0, frequency = h);"
	 * );
	 * 
	 * engine.eval("model_name <- 'NNETAR';");
	 * 
	 * engine.
	 * eval("model <- function(y, h){forecast(nnetar(y,p = 10, P=2, repeats=50), h=h)};"
	 * ); engine.eval("fit <- model(window(train_data,start = 0), h=h);");
	 * engine.eval("vec <- as.vector(fit);");
	 * engine.eval("rs <-as.vector(unlist(vec[16],use.names=F));"); Vector result1 =
	 * (Vector) engine.eval("rs"); for (int i = 0; i < 30; i++) {
	 * listNNETAR_10_2.add(result1.getElementAsDouble(i)); }
	 * System.out.println(listNNETAR_10_2);
	 * 
	 * engine.
	 * eval("model <- function(y, h){forecast(nnetar(y,p = 20, P=2, repeats=50), h=h)};"
	 * ); engine.eval("fit <- model(window(train_data,start = 0), h=h);");
	 * engine.eval("vec <- as.vector(fit);");
	 * engine.eval("rs <-as.vector(unlist(vec[16],use.names=F));"); Vector result2 =
	 * (Vector) engine.eval("rs"); for (int i = 0; i < 30; i++) {
	 * listNNETAR_20_2.add(result2.getElementAsDouble(i));
	 * 
	 * } System.out.println(listNNETAR_20_2);
	 * 
	 * engine.eval(" model_name = 'NNETAR + Decomposition';");
	 * 
	 * engine.eval("model <- function(y, h){\r\n" +
	 * "  fit = stlm(y,s.window=\"periodic\", robust=TRUE,modelfunction=nnetar,  p=3, P=1, repeats = 50)\r\n"
	 * + "  return(forecast(fit,h=h))\r\n" + "};");
	 * engine.eval("fit <- model(window(train_data,start = 0), h=h);");
	 * engine.eval("vec <- as.vector(fit);");
	 * engine.eval("rs <-as.vector(unlist(vec[16],use.names=F));"); Vector result3 =
	 * (Vector) engine.eval("rs"); for (int i = 0; i < 30; i++) {
	 * listNNETAR_D_3_1.add(result3.getElementAsDouble(i)); }
	 * System.out.println(listNNETAR_D_3_1);
	 * 
	 * engine.eval("model <- function(y, h){\r\n" +
	 * "  fit = stlm(y,s.window=\"periodic\", robust=TRUE,modelfunction=nnetar,  p=5, P=1, repeats = 20)\r\n"
	 * + "  return(forecast(fit,h=h))\r\n" + "};");
	 * engine.eval("fit <- model(window(train_data,start = 0), h=h);");
	 * engine.eval("vec <- as.vector(fit);");
	 * engine.eval("rs <-as.vector(unlist(vec[16],use.names=F));"); Vector result4 =
	 * (Vector) engine.eval("rs"); for (int i = 0; i < 30; i++) {
	 * listNNETAR_D_5_1.add(result4.getElementAsDouble(i)); }
	 * System.out.println(listNNETAR_D_5_1);
	 * 
	 * List<Double> finalResult = X5();
	 * 
	 * return finalResult; }
	 */

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
