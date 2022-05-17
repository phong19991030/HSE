package infrastructure.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import infrastructure.inheritance.service.AbstractService;

public final class CalendarUtil {
	
	protected static Logger logger = LogManager.getLogger(CalendarUtil.class);
	
	/**
	 * 현재 날짜와 시간 정보를 Date 객체로 반환
	 * @작성일	: 2016. 5. 2.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
     * @return String 
     * ex) String today = CalendarUtil.getToday();
     *     today.toString() -> "Mon May 02 10:42:32 KST 2016"
	 */
	public static Date getToday(){
		Date date = new Date();
		return date;
	}
	
	/**
	 * 현재 날짜와 시간 정보를 문자열(yyyy-MM-dd)로 반환 
	 * @작성일	: 2016. 5. 2.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
     * @return String 
     * ex) String today = CalendarUtil.getTodayStr();
     *     today -> "2016-05-02"
	 */
	public static String getTodayStr(){
		Date date = new Date();
		return dateToStr(date);
	}
	
	
	/**
	 * 현재 날짜와 시간 정보를 포맷에 따라 문자열로 반환 
	 * @작성일	: 2016. 5. 2.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
     * @param format -  String ("yyyy-MM-dd HH:mm:ss")
     * @return String 
     * ex) String today = CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd / HH:mm");
     *     today -> "2016-05-02 / 08:37"
     * ex) String today = CalendarUtil.getTodayStrWithFormat("yyyy-MM-dd HH:mm:ss");
     *     today -> "2016-05-02 08:37:42"
	 */
	public static String getTodayStrWithFormat(String format){
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(new Date());
	}
	
	/**
	 * 현재 날짜와 시간 정보를 문자열의 배열로 반환 
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return String
	 * ex) String[] todayArr = CalendarUtil.getTodayArr();
	 *     todayArr -> ["2012", "05", "02"]
	 */
	public static String[] getTodayArr() {
		String strToday = getTodayStr();
		String[] strTodayArr = seperateStrDateArr(strToday, "-");
		return strTodayArr;
	}
	
	/**
	 * 현재 시를 문자열(HH)로 반환
	 * @작성일	: 2012. 3. 16.
	 * @작성자	: "keim"
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
     * @return String 
     * ex) String hour = CalendarUtil.getHour()
     *     hour -> "09"
	 */
	public static String getHour(){
		SimpleDateFormat sdf = new SimpleDateFormat("HH");
		return sdf.format(new Date());
	}
	

	/**
	 * 특정 연월의 마지막 일자(문자열)를 반환(28~31)
	 * @작성일	: 2016. 5. 2.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param year - int : 특정 년도
	 * @param month - int : 특정 월
	 * @return int
	 * ex) int lastDay = CalendarUtil.getLastDay(2016, 4);
	 *     lastDay -> 30
	 */
	public static int getLastDay(int year, int month){
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month - 1);		// 월 수에서 1 빼야 함
		int last = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		return last;
	}
	
	/**
	 * 초를 일-시간-분으로 환산
	 * @작성일	: 2012. 3. 16.
	 * @작성자	: "keim"
	 * @프로그램설명 :
	 * @진행상태: COMPLETE
     * @param seconds - int : 단위를 환산할 초
     * @return String 
     * ex) String strTime = CalendarUtil.getStrTimeFromSeconds(123400)
     *     strTime -> "1일 10시간 16분 40초"
	 */
	public static String getStrTimeFromSeconds(int seconds){
		String str_time = "";
		
		double dd = Math.floor(seconds / (60 * 60 * 24)); // 일
		double hh = seconds % (60 * 60 * 24); // 시(일을 뺀 나머지 시간
		hh = Math.floor(hh / (60 * 60));
		double mm = seconds % (60 *60); // 분(시간을 뺀 나머지 분)
		mm = Math.floor(mm / 60);
		double ss = seconds % 60; // 초
		
		if(dd > 0) str_time += (int)dd + "일 ";
		if(hh > 0) str_time += (int)hh + "시간 ";
		if(mm > 0) str_time += (int)mm + "분 ";
		str_time += (int)ss + "초";
		
		return str_time;
	}
	
	/**
	 * 날짜 나타내는 문자열 "YYYYMMdd"를 "YYYY"+구분자+"MM"+구분자+"dd" 형식으로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param strDate - String : 형식을 변환할 날짜 문자열
	 * @return String
	 * ex) String strDate = CalendarUtil.seperateStrDate("20160429");
	 *     strDate -> "2016-04-29" 
	 */
	public static String seperateStrDate(String strDate, String separator) {
		if (strDate.trim().length() == 8) {
			String YYYY = strDate.substring(0, 4);
			String MM = strDate.substring(4, 6);
			String dd = strDate.substring(6, 8);
			return YYYY + separator + MM + separator + dd;
		} else {
			return null;	// TODO(kimhd)
		}
	}
	
	/**
	 * 날짜 나타내는 문자열 "YYYYMMdd"를 배열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param strDate - String : 배열로 변환할 날짜 문자열
	 * @return String[]
	 * ex) String[] strDateArr = CalendarUtil.seperateStrDateArr("20160429");
	 *     strDateArr -> ["2016", "04", "29"]
	 */
	public static String[] seperateStrDateArr(String strDate) {
		String[] strDateArr = new String[3];
		if (strDate.trim().length() == 8) {
			strDateArr[0] = strDate.substring(0, 4);
			strDateArr[1] = strDate.substring(4, 6);
			strDateArr[2] = strDate.substring(6, 8);
			return strDateArr;
		} else {
			return null;	// TODO(kimhd)
		}
	}
	
	/**
	 * 날짜 나타내는 문자열  "YYYY"+구분자+"MM"+구분자+"dd"를 배열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param strDate - String : 배열로 변환할 날짜 문자열
	 * @return String[]
	 * ex) String[] strDateArr = CalendarUtil.seperateStrDateArr("20160429");
	 *     strDateArr -> ["2016", "04", "29"]
	 */
	public static String[] seperateStrDateArr(String strDate, String seperator) {
		return strDate.split(seperator);
	}
	
	/**
	 * 날짜 나타내는 배열 ["YYYY", "MM", "dd"]를 "YYYY"+구분자+"MM"+구분자+"dd" 문자열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param strDateArr - String[] : 날짜를 나타내는 배열
	 * @return String
	 * ex) String[] strDateArr = seperateStrDateArr("20160429");
	 *     // strDateArr -> ["2016", "04", "29"]
	 *     String strDate = CalendarUtil.combineStrDate(strDateArr);
	 *     strDate -> "20160429"
	 */
	public static String combineStrDate(String[] strDateArr, String separator) {
		String strDate = strDateArr[0] + separator + strDateArr[1] + separator + strDateArr[2];
		return strDate;
	}
	
	/**
	 * 문자열 "YYYYMMdd" 또는 "YYYY-MM-dd"를 Date 객체로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param strDate - String : Date 객체로 변환할 날짜 문자열
	 * @return Date
	 * ex) Date dateFromStr = CalendarUtil.strToDate("20160430");
	 *     dateFromStr.toString() -> "Sat Apr 30 00:00:00 KST 2016"
	 */
	public static Date strToDate(String strDate) {
		strDate = seperateStrDate(strDate, "-");
		/*
		 * @JK - 보안 취약점 수정
		 */
		//if (strDate.length() == 0) {
		if (strDate.length() == 0 || strDate == null) {
			return null;	// TODO(kimhd)
		}
		SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date date = fm.parse(strDate);
			return date;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
			return null;
		}
	}
	
	/**
	 * Date 객체를 "YYYY"+구분자+"MM"+구분자+"dd" 문자열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 문자열로 변환할 Date 객체
	 * @param seperator - String : 구분자로 사용할 문자열
	 * @return String
	 * ex) String strFromDate = CalendarUtil.dateToStr(new Date(), "*");
	 *     strFromDate -> "2016*05*02"
	 */
	public static String dateToStr(Date date, String separator) {
		SimpleDateFormat fm = new SimpleDateFormat("yyyy" + separator + "MM" + separator + "dd");
		return fm.format(date);
	}
	
	/**
	 * Date 객체를 "YYYY-MM-dd" 문자열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 문자열로 반환할 Date 객체
	 * @return String
	 * ex) String strFromDate = CalendarUtil.dateToStr(new Date());
	 *     strFromDate -> "2016-05-02"
	 */
	public static String dateToStr(Date date) {
		return dateToStr(date, "-");
	}
		
	/**
	 * 날짜 정보 담은 객체를 Date 객체로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param obj - Object : 날짜 나타내는 문자열 혹은 Date 객체
	 * @return Date
	 * ex) String dateStr = "20160502";
	 *     Date date = new Date();
	 *     Object obj = (Object) date;
	 *     Date d1 = CalendarUtil.objToDate(dateStr);
	 *     Date d2 = CalendarUtil.objToDate(date);
	 *     Date d3 = CalendarUtil.objToDate(obj);
	 *     d1.toString() -> "Mon May 02 00:00:00 KST 2016"
	 *     d2.toString() -> "Mon May 02 09:51:25 KST 2016"
	 *     d3.toString() -> "Mon May 02 09:51:25 KST 2016"
	 */
	public static Date objToDate(Object obj) {
		String strDate = "";
		Date date = new Date(); 
		if (CommonUtil.getInstanceType(obj) == strDate.getClass()) {
			strDate = CastUtil.castToString(obj);
			date = strToDate(strDate);
		} else if (CommonUtil.getInstanceType(obj) == date.getClass()) {
			date = (Date) obj;
		} else {
			date = null;
		}
		return date;
	}
	
	/**
	 * 날짜 정보 담은 객체를 문자열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param obj - Object : 날짜 나타내는 문자열 혹은 Date 객체
	 * @return Date
	 * ex) String dateStr = "20160502";
	 *     Date date = new Date();
	 *     Object obj = (Object) date;
	 *     String str1 = CalendarUtil.objToDateStr(dateStr);
	 *     String str2 = CalendarUtil.objToDateStr(date);
	 *     String str3 = CalendarUtil.objToDateStr(obj);
	 *     str1 -> "2016-05-02"
	 *     str2 -> "2016-05-02"
	 *     str3 -> "2016-05-02"
	 */
	public static String objToDateStr(Object obj) {
		String strDate = "";
		Date date = new Date();
		if (CommonUtil.getInstanceType(obj) == strDate.getClass()) {
			strDate = CastUtil.castToString(obj);
			strDate = seperateStrDate(strDate, "-");
		} else if (CommonUtil.getInstanceType(obj) == date.getClass()) {
			strDate = dateToStr((Date) obj);
		}
		return strDate;
	}
	
	
	/**
	 * 1년 후의 날짜 객체 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return Date
	 * ex) Date nextYear = CalendarUtil.getNextYear();
	 *     nextYear.toString() -> "Tue May 02 10:00:01 KST 2017"
	 */
	public static Date getNextYear() {
		return addYear(1);
	}
	
	/**
	 * 1년 전의 날짜 객체 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return Date
	 * ex) Date lastYear = CalendarUtil.getLastYear();
	 *     lastYear.toString() -> "Tue May 02 10:00:01 KST 2015"
	 */
	public static Date getLastYear() {
		return addYear(-1);
	}
	
	/**
	 * 한 달 후의 날짜 객체 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return Date
	 * ex) Date nextMonth = CalendarUtil.getNextMonth();
	 *     nextMonth.toString() -> "Thu Jun 02 10:00:01 KST 2016"
	 */
	public static Date getNextMonth() {
		return addMonth(1);
	}
	
	/**
	 * 한 달 전의 날짜 객체 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return Date
	 * ex) Date lastMonth = CalendarUtil.getLastMonth();
	 *     lastMonth.toString() -> "Sat Apr 02 10:00:01 KST 2016"
	 */
	public static Date getLastMonth() {
		return addMonth(-1);
	}

	/**
	 * 내일의 날짜 객체 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return Date
	 * ex) Date tomorrow = CalendarUtil.getTomorrow();
	 *     tomorrow.toString() -> "Tue May 03 10:00:01 KST 2016"
	 */
	public static Date getTomorrow() {
		return addDay(1);
	}
	
	/**
	 * 어제의 날짜 객체 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @return Date
	 * ex) Date yesterday = CalendarUtil.getYesterday();
	 *     yesterday.toString() -> "Sun May 01 10:00:01 KST 2016"
	 */
	public static Date getYesterday() {
		return addDay(-1);
	}
	
	/**
	 * 특정 날짜에 년, 월, 또는 일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param obj - Object : 날짜 정보 담은 객체(문자열 혹은 Date 객체)
	 * @param unit - String : 변경할 날짜 단위("YEAR", "MONTH", "DAY" 중 하나)
	 * @param amount - int : 변경할 날짜 단위 크기
	 * @return Date
	 * ex) Date date = new Date();	// 2016-05-02
	 *     Date addedDate = CalendarUtil.addDate(date, "YEAR", 3);
	 *     addedDate.toString() -> "Thu May 02 10:00:00 KST 2019"
	 *     Date addedDate = CalendarUtil.addDate(date, "MONTH", 3);
	 *     addedDate.toString() -> "Tue Aug 02 10:07:59 KST 2016"
	 *     Date addedDate = CalendarUtil.addDate(date, "DAY", 3);
	 *     addedDate.toString() -> "Thu May 05 10:07:59 KST 2016"
	 */
	public static Date addDate(Object obj, String unit, int amount) {
		Date date = objToDate(obj);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		switch (unit) {
		case "YEAR":
			cal.add(Calendar.YEAR, amount);
			break;
		case "MONTH":
			cal.add(Calendar.MONTH, amount);
			break;
		case "DAY":
			cal.add(Calendar.DATE, amount);
			break;
		default:
			System.out.println("ERROR: addDate(Object obj, String unit, int amount)");
			break;
		}
		date = cal.getTime();
		return date;
	}
	
	/**
	 * 현재 날짜에 년, 월, 또는 일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param unit - String : 변경할 날짜 단위("YEAR", "MONTH", "DAY" 중 하나)
	 * @param amount - int : 변경할 날짜 단위 크기
	 * @return Date
	 * ex) Date addedDate = CalendarUtil.addDate("YEAR", 5);
	 *     addedDate.toString() -> "Sun May 02 10:10:09 KST 2021"
	 *     Date addedDate = CalendarUtil.addDate("MONTH", 5);
	 *     addedDate.toString() -> "Sun Oct 02 10:10:09 KST 2016"
	 *     Date addedDate = CalendarUtil.addDate("DAY", 5);
	 *     addedDate.toString() -> "Sat May 07 10:10:09 KST 2016"
	 */
	public static Date addDate(String unit, int amount) {
		Date date = new Date();
		return addDate(date, unit, amount);
	}
	
	/**
	 * 특정 날짜에 년도 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param obj - Object : 날짜 정보 담은 객체(문자열 혹은 Date 객체)
	 * @param amount - int : 변경할 년도 단위 크기
	 * @return Date
	 * ex) Date date = new Date();	// 2016-05-02
	 *     Date addedYear = CalendarUtil.addYear(date, -3);
	 *     addedYear.toString() -> "Thu May 02 10:10:09 KST 2013"
	 */
	public static Date addYear(Object obj, int amount) {
		return addDate(obj, "YEAR", amount);
	}
	
	/**
	 * 현재 날짜에 년도를 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param amount - int : 변경할 년도 단위 크기
	 * @return Date
	 * ex) Date addedYear = CalendarUtil.addYear(-5);
	 *     addedYear.toString() -> "Mon May 02 10:10:09 KST 2011"
	 */
	public static Date addYear(int amount) {
		Date date = new Date();
		return addYear(date, amount);
	}

	/**
	 * 특정 날짜에 월을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param amount - int : 변경할 월 단위 크기
	 * @return Date
	 * ex) Date date = new Date();	// 2016-05-02
	 *     Date addedMonth = CalendarUtil.addMonth(date, 3);
	 *     addedMonth.toString() -> "Tue Aug 02 10:10:09 KST 2016"
	 */
	public static Date addMonth(Object obj, int amount) {
		return addDate(obj, "MONTH", amount);
	}
	
	/**
	 * 현재 날짜에 월을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param amount - int : 변경할 월 단위 크기
	 * @return Date
	 * ex) Date addedMonth = CalendarUtil.addMonth(5);
	 *     addedMonth.toString() -> "Sun Oct 02 10:10:09 KST 2016"
	 */
	public static Date addMonth(int amount) {
		Date date = new Date();
		return addMonth(date, amount);
	}
	
	/**
	 * 특정 날짜에 일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param amount - int : 변경할 일 단위 크기
	 * @return Date
	 * ex) Date date = new Date();	// 2016-05-02
	 *     Date addedDay = CalendarUtil.addDay(date, 3);
	 *     addedDay.toString() -> "Thu May 05 10:10:09 KST 2016"
	 */
	public static Date addDay(Object obj, int amount) {
		return addDate(obj, "DAY", amount);
	}
	
	/**
	 * 현재 날짜에 일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param amount - int : 변경할 일 단위 크기
	 * @return Date
	 * ex) Date addedDay = CalendarUtil.addDay(5);
	 *     addedDay.toString() -> "Sat May 07 10:10:09 KST 2016"
	 */
	public static Date addDay(int amount) {
		Date date = new Date();
		return addDay(date, amount);
	}
	
	/**
	 * 특정 날짜에 연월일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param obj - Object : 날짜 정보 담은 객체(문자열 혹은 Date 객체)
	 * @param years - int : 변경할 년도 단위 크기
	 * @param months - int : 변경할 월 단위 크기
	 * @param days - int : 변경할 일 단위 크기
	 * @return Date
	 * ex) Date date = new Date();	// 2016-05-02
	 *     Date added = CalendarUtil.addYearMonthDay(date, 3, 6, 7);
	 *     added.toString() -> "Sat Nov 09 10:10:09 KST 2019"
	 */
	public static Date addYearMonthDay(Object obj, int years, int months, int days) {
		Date date = objToDate(obj);
		date = addYear(date, years);
		date = addMonth(date, months);
		date = addDay(date, days);
		return date;
	}
	
	/**
	 * 현재 날짜에 연월일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param years - int : 변경할 년도 단위 크기
	 * @param months - int : 변경할 월 단위 크기
	 * @param days - int : 변경할 일 단위 크기
	 * @return Date
	 * ex) Date added = CalendarUtil.addYearMonthDay(3, 6, 7);
	 *     added.toString() -> "Sat Nov 09 10:10:09 KST 2019"
	 */
	public static Date addYearMonthDay(int years, int months, int days) {
		Date date = new Date();
		return addYearMonthDay(date, years, months, days);
	}

	/**
	 * 특정 날짜에 연월일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param obj - Object : 날짜 정보 담은 객체(문자열 혹은 Date 객체)
	 * @param strDateAmount - String : 더할 연월일 문자열
	 * @return Date
	 * ex) Date date = new Date();	// 2016-05-02
	 *     Date added = CalendarUtil.addYearMonthDay(date, "10100607");
	 *     added.toString() -> "Thu Nov 09 10:10:09 KST 3026"
	 */
	public static Date addYearMonthDay(Object obj, String strDateAmount) {
		Date date = objToDate(obj);
		Date dateInc = strToDate(strDateAmount);
		int yearInc = getYearInt(dateInc);
		int monthInc = getMonthInt(dateInc) + 1;
		int dayInc = getDayOfMonthInt(dateInc);
		return addYearMonthDay(date, yearInc, monthInc, dayInc);
	}
	
	/**
	 * 현재 날짜에 연월일을 증가시켜 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param strDateAmount - String : 더할 연월일 문자열
	 * @return Date
	 * ex) Date added = CalendarUtil.addYearMonthDay("10100607");
	 *     added.toString() -> "Thu Nov 09 10:10:09 KST 3026"
	 */
	public static Date addYearMonthDay(String strDateAmount) {
		Date date = new Date();
		return addYearMonthDay(date, strDateAmount);
	}
	
	///////////////////////////////////////////////////
	
	/**
	 * 월을 2자리 문자열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : 
	 * @진행상태 : COMPLETE
	 * @param month - int : 0 <= month <= 11
	 * @return String
	 * ex) 5 -> "06", 11 -> "12"
	 */
	public static String formatStrMonth(int month) {
		String formatStr = "";
		if (0 < month && month < 10) {
			formatStr += "0";
		}
		formatStr += CastUtil.castToString(month + 1);
		return formatStr;
	}
	
	/**
	 * 일을 2자리 문자열로 변환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param day - int : 1 <= day <= 31
	 * @return String 
	 * ex) 5 -> "05", 11 -> "11"
	 */
	public static String formatStrDay(int day) {
		String formatStr = "";
		if (0 < day && day < 10) {
			formatStr += "0";
		}
		formatStr += CastUtil.castToString(day);
		return formatStr;
	}
	
	/**
	 * 특정 날짜의 년도를 정수로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 년도를 구할 Date 객체
	 * @return int
	 * ex) getYearInt(new Date()) -> 2016
	 */
	public static int getYearInt(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.YEAR);
	}
	
	/**
	 * 특정 날짜의 년도를 문자열(YYYY)로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 년도를 구할 Date 객체
	 * @return String
	 * ex) getYearStr(new Date()) -> "2016"
	 */
	public static String getYearStr(Date date) {
		return CastUtil.castToString(getYearInt(date));
	}
	
	/**
	 * 특정 날짜의 월을 정수로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 월을 구할 Date 객체
	 * @return int
	 * ex) getMonthInt(new Date()) -> 4		// 5월
	 * ex) getMonthInt(new Date()) -> 10	// 11월
	 */
	public static int getMonthInt(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.MONTH);
	}
	
	/**
	 * 특정 날짜의 월을 문자열(MM)로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 월을 구할 Date 객체
	 * @return String
	 * ex) getMonthInt(new Date()) -> "05"	// 5월
	 */
	public static String getMonthStr(Date date) {
		return formatStrMonth(getMonthInt(date));
	}
	
	/**
	 * 특정 날짜의 일을 정수로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 일을 구할 Date 객체
	 * @return int
	 * ex) getMonthInt(new Date()) -> 2	// 2일
	 */
	public static int getDayOfMonthInt(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * 특정 날짜의 일을 문자열(dd)로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 :
	 * @진행상태 : COMPLETE
	 * @param date - Date : 일을 구할 Date 객체
	 * @return String
	 * ex) getMonthStr(new Date()) -> "02"	// 2일
	 */
	public static String getDayOfMonthStr(Date date) {
		return formatStrDay(getDayOfMonthInt(date));
	}
	
	/**
	 * 특정 날짜의 요일을 정수로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : 
	 * @진행상태 : COMPLETE
	 * @param date - Date : 요일을 구할 Date 객체
	 * @return int
	 * ex) getDayOfWeekInt(new Date()) -> 2	// 월요일
	 */
	public static int getDayOfWeekInt(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.DAY_OF_WEEK);
	}
	
	/**
	 * 특정 날짜의 요일을 문자열로 반환
	 * @작성일	: 2016. 4. 29.
	 * @작성자	: "kimhd"
	 * @프로그램설명 : 
	 * @진행상태 : COMPLETE
	 * @param date - Date : 날짜 객체
	 * @return String
	 * ex) getDayOfWeekStr(new Date()) -> "02"	// 월요일
	 */
	public static String getDayOfWeekStr(Date date) {
		return CastUtil.castToString(getDayOfWeekInt(date));
	}
	
	
	/**
	 * 특정 일시의 차값을 밀리초 문자형 값을 반환
	 * @작성일    : 2016. 9. 27. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: COMPLETE  
	 */
	public static String getDiffTime(Date date , Date date1) {
		Calendar c = Calendar.getInstance ( );
		c.setTime ( date );
		long date1sec = c.getTimeInMillis();
		c.setTime ( date1 );
		long date2sec = c.getTimeInMillis();
		
//		 
//		CastUtil.castToString(getDayOfWeekInt(date));
		return CastUtil.castToString(date2sec-date1sec);
	}
	
	/**
	 * Date 객체의 시간 정보 수정
	 * @param date	: 날짜 객체
	 * @param hour	: 시
	 * @param min	: 분
	 * @param sec	: 초
	 * @param msec	: millisecond
	 * @return Date Object
	 */
	public static Date getDate(Date date, int hour, int min, int sec, int msec) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, hour);
		cal.set(Calendar.MINUTE, min);
		cal.set(Calendar.SECOND, sec);
		cal.set(Calendar.MILLISECOND, msec);
		
		return cal.getTime();
	}
	
	/**
	 * 입력 받은 날짜의 몇 시간 후 Date 값을 반환
	 * @param date : 기준 일자
	 * @param hour : 시간 값
	 * @return Date Object
	 */
	public static Date addTime(Date date, int hour) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.HOUR_OF_DAY, hour);
		
		return cal.getTime();
	}
	
	/**
	 * 로컬 Date 객체를 UTC Date 객체로 변환
	 * @param localDate
	 * @return utcDate
	 */
	public static Date convertLocalToUTC(Date localDate) {
		Calendar c = Calendar.getInstance ( );
		c.setTime(localDate);
		long local = c.getTimeInMillis();
		
		TimeZone z = TimeZone.getDefault();
		int offset = z.getOffset(local);
		
		long utc = local + offset;
		Date utcDate = new Date(utc);
		
		return utcDate;
	}
	
	/**
	 * 시간 나타내는 문자열 "HHmm"를 "HH:mm:00" 형식으로 변환
	 * @param strTime
	 * @return String
	 */
	public static String convertStrTime(String strTime) {
		if (strTime.trim().length() == 4) {
			String hour = strTime.substring(0, 2);
			String minute = strTime.substring(2, 4);
			return hour + ":" + minute + ":00";
		} else {
			return "";
		}
	}
}
