package module.util;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

public class DateConverter {
	
	/**
	 * 
	 * @Method : convertLocalToUTC
	 * @Author : pjk
	 * @Date : Oct 22, 2019
	 * @param localDate
	 * @return 
	 * @Description : Local Time -> UTC Time
	 */
	public static Date convertLocalToUTC(Date localDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(localDate);
		long local = c.getTimeInMillis();			// MilliSec 로 변환
		
		TimeZone z = TimeZone.getDefault();			// 현재 PC TimeZone 반환
		int offset = z.getOffset(local);			// GMT(MilliSec) 반환
		
		long utc = local + offset;					// 여기서 offset 값은 UTC 입장에서 local 에 더해줘야하는 값   
		Date utcDate = new Date(utc);				// UTC -> Local 로 변환 할 땐 반대로 빼줘야 함
		
		return utcDate;
	}
	
	/**
	 * 
	 * @Method : convertUTCToLocal
	 * @Author : pjk
	 * @Date : Nov 3, 2019
	 * @param UTCDate
	 * @return
	 * @Description : UTC Time -> Local Time
	 */
	public static Date convertUTCToLocal(Date UTCDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(UTCDate);
		long UTC = c.getTimeInMillis();				// MilliSec 로 변환
		
		TimeZone z = TimeZone.getDefault();			// 현재 PC TimeZone 반환
		int offset = z.getOffset(UTC);				// GMT(MilliSec) 반환
		
		long local = UTC - offset;					// 여기서 offset 값은 UTC 입장에서 local 에 더해줘야하는 값   
		Date localDate = new Date(local);				// UTC -> Local 로 변환 할 땐 반대로 빼줘야 함
		
		return localDate;
	}
	
	/**
	 * 
	 * @Method : convertStringToDate
	 * @Author : pjk
	 * @Date : Nov 3, 2019
	 * @param str_date : format : yyyy-MM-dd HH:mm:ss
	 * @return
	 * @Description : StringDate -> Date
	 * 			
	 */
	public static Date convertStringToDate(String str_date) {
		// String Date Analysis
		String[] split_ymd_hms = str_date.split(" ");		// [ '2019-10-24', '13:49:27' ]
		
		String[] ymd_date = split_ymd_hms[0].split("-");	// [ '2019', '10', '24' ]
		String[] hms_date = split_ymd_hms[1].split(":");	// [ '13', '49', '27' ]
		
		// Parsing Date
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, Integer.parseInt(ymd_date[0]));
		cal.set(Calendar.MONTH, Integer.parseInt(ymd_date[1])-1);
		cal.set(Calendar.DATE, Integer.parseInt(ymd_date[2]));
		cal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hms_date[0]));	// HOUR_OF_DAT : 24시 표기
		cal.set(Calendar.MINUTE, Integer.parseInt(hms_date[1]));
		cal.set(Calendar.SECOND, Integer.parseInt(hms_date[2]));
		
		
		Date date = new Date(cal.getTimeInMillis());
		
		return date;
	}
	
	/**
	 * 
	 * @Method : convertZeroTime
	 * @Author : pjk
	 * @Date : Nov 4, 2019
	 * @param date
	 * @param format_level
	 * @param format_type
	 * @return
	 * @Description : 
	 * 
	 * 				ex)
	 * 
	 * 				2019-10-01 14:27:19 (day, s)-> 2019-10-01 00:00:00
	 * 				2019-10-01 14:27:19 (day, e)-> 2019-10-02 00:00:00
	 * 
	 * 				2019-10-14 14:27:19 (month, s)-> 2019-10-01 00:00:00
	 * 				2019-10-14 14:27:19 (month, e)-> 2019-11-01 00:00:00
	 * 
	 * 				2019-10-14 14:27:19 (year, s)-> 2019-01-01 00:00:00
	 * 				2019-10-14 14:27:19 (year, e)-> 2020-01-01 00:00:00
	 * 
	 */
	public static Date convertZeroTime(Date date, String format_level, String format_type) {
		
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		
		
		//9월 30일 자로 검색하면, Origin 데이터 : Tue Oct 01 08:44:20 KST 2019 (UTC)
		//날짜를 변경하면 09월 01일이 아닌 10월 1일 이됨
		//UTC > Local > 날짜 변환 > UTC
		
		// UTC > Local
		long UTC = c.getTimeInMillis();
		TimeZone z = TimeZone.getDefault();			// 현재 PC TimeZone 반환
		int offset = z.getOffset(UTC);				// GMT(MilliSec) 반환
		long local = UTC - offset;
		c.setTime(new Date(local));
		
		
		// 날짜 변환
		if(format_level.equals("day")) {
			
			c.set(Calendar.YEAR, c.get(Calendar.YEAR));
			c.set(Calendar.MONTH, c.get(Calendar.MONTH));
			
			if(format_type.equals("s")) { 
				c.set(Calendar.DATE, c.get(Calendar.DATE));
			} else {
				c.set(Calendar.DATE, c.get(Calendar.DATE)+1);
			}
			
		} else if(format_level.equals("month")) {
			
			c.set(Calendar.YEAR, c.get(Calendar.YEAR));
			c.set(Calendar.DATE, 1);

			if(format_type.equals("s")) { 
				c.set(Calendar.MONTH, c.get(Calendar.MONTH));
			} else { 
				c.set(Calendar.MONTH, c.get(Calendar.MONTH)+1);
			}
			
		} else if(format_level.equals("year")) {
			
			c.set(Calendar.MONTH, 0);
			c.set(Calendar.DATE, 1);
			
			if(format_type.equals("s")) { 
				c.set(Calendar.YEAR, c.get(Calendar.YEAR));
			} else {
				c.set(Calendar.YEAR, c.get(Calendar.YEAR)+1);
			}
		}
		
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		
		
		// Local > UTC
		UTC = c.getTimeInMillis() + offset;
		c.setTime(new Date(UTC));
		
		Date zero_time_date = new Date(c.getTimeInMillis());
		
		System.out.println("default_time_date : " + date);
		System.out.println("zero_time_date : " + zero_time_date);
		
		return zero_time_date;
	}
	
	
	
	public static Map createDBSearchDateUTC(String timezoneId) {
		
		Map map = new HashMap();
		
		TimeZone.setDefault(TimeZone.getTimeZone(timezoneId));
		TimeZone tt = TimeZone.getDefault();
		
		// Default Local - Asia/Soeul
		Calendar s = Calendar.getInstance();
		Calendar e = Calendar.getInstance();

		
		// TODO: 매달 1일, 매년 1월 1일의 경우 Date = 0 으로 setting시 자동 계산 
		
		// 정시 00:00:00 일 경우 
		if(s.get(Calendar.HOUR_OF_DAY) == 0) {
			s.set(Calendar.DATE, s.get(Calendar.DATE)-1);
		}
		
		s.set(Calendar.HOUR_OF_DAY, 0);
		s.set(Calendar.MINUTE, 0);
		s.set(Calendar.SECOND, 0);
		s.set(Calendar.MILLISECOND, 0);
		
		e.set(Calendar.MINUTE, 0);
		e.set(Calendar.SECOND, 0);
		e.set(Calendar.MILLISECOND, 0);
		
//		System.out.println(s.getTime());
//		System.out.println(e.getTime());
		
		// UTC 변환 전 한 번 getTime() 해줘야 함
		// 안 할 경우, 시간 에러
		s.getTime();
		e.getTime();
		
		// Local -> UTC 변환
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		s.setTimeZone(TimeZone.getTimeZone("UTC"));
		e.setTimeZone(TimeZone.getTimeZone("UTC"));
		
//		System.out.println(s.getTime());
//		System.out.println(e.getTime());
		
		Date sd = s.getTime();
		Date se = e.getTime();
		
		map.put("START_TIME", sd);
		map.put("END_TIME", se);
		
		return map;
	}
	
	public static Map createYearSearchDateUTC(String timezoneId) {
		
		Map map = new HashMap();
		
		TimeZone.setDefault(TimeZone.getTimeZone(timezoneId));
		TimeZone tt = TimeZone.getDefault();
		
		// Default Local - Asia/Soeul
		Calendar ts = Calendar.getInstance();
		Calendar te = Calendar.getInstance();
		
		// 1월 1일 일 경우
		if(ts.get(Calendar.MONTH) == 0) {
			ts.set(Calendar.YEAR, ts.get(Calendar.YEAR)-1);
		}
		ts.set(Calendar.MONTH, 0);
		ts.set(Calendar.DATE, 1);
		
		ts.set(Calendar.HOUR_OF_DAY, 0);
		ts.set(Calendar.MINUTE, 0);
		ts.set(Calendar.SECOND, 0);
		ts.set(Calendar.MILLISECOND, 0);
		
		te.set(Calendar.HOUR_OF_DAY, 0);
		te.set(Calendar.MINUTE, 0);
		te.set(Calendar.SECOND, 0);
		te.set(Calendar.MILLISECOND, 0);
		
//		System.out.println(ts.getTime());
//		System.out.println(te.getTime());
		
		//SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		ts.getTime();
		te.getTime();
		
		
		// Local -> UTC 변환
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		ts.setTimeZone(TimeZone.getTimeZone("UTC"));
		te.setTimeZone(TimeZone.getTimeZone("UTC"));
		
//		System.out.println(ts.getTime());
//		System.out.println(te.getTime());
		
		Date tsd = ts.getTime();
		Date ted = te.getTime();

		ts.set(Calendar.YEAR, ts.get(Calendar.YEAR)-1);
		te.set(Calendar.YEAR, te.get(Calendar.YEAR)-1);
		
		Date lsd = ts.getTime();
		Date led = te.getTime();
		
		map.put("START_TIME_THIS_YEAR", tsd);
		map.put("END_TIME_THIS_YEAR", ted);
		
		map.put("START_TIME_LAST_YEAR", lsd);
		map.put("END_TIME_LAST_YEAR", led);
		
		return map;
	}
	
	public static String createTimezoneOffset(String timezoneId) {
		
		TimeZone timeZone = TimeZone.getTimeZone(timezoneId);
		
		int rawOffset = timeZone.getRawOffset() / 1000 / 60 / 60;
		
		String offset = "";
		
		if(rawOffset >= 0) {
			offset = "+" + rawOffset + ":" + "00";
		} else {
			offset = rawOffset + ":" + "00";
		}
		
		
		return offset;
	}
}
