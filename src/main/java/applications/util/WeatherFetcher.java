package applications.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 * @Description : Weather API
 * @author		: yjkim
 * @since		: 2019.11.12
 * @Modification Information
 *　Date　　　　　　Name　　　　　 Desc.
 *　──────────　　  ──────────　　 ──────────
 *　2019.11.12　　  Yunju Kim　　　3시간마다 99건의 날씨 데이터를 DB에 저장
 *　2019.12.02　　  Yunju Kim　　　12시간마다 모든 날씨 데이터를 DB에 저장
 */
@Deprecated
public class WeatherFetcher {
	// weather api service key
	// TODO : 1년마다 갱신해야 함 (2019-11-26 ~ 2021-11-26)
	private static final String SERVICE_KEY = "J7PiuIVT54wjz2CNWbT2BwtPHLBwk4fLXc1u7qbiWrlHk5hLt8LsTRGG6OFXlVdlhIUAhNPi3CN%2BQphF%2Bm1k9Q%3D%3D";
	
	static String calInfo = getLastestBaseTime();
	static String[] calArr = calInfo.split(" ");
	static String base_date = calArr[0]; // 조회기준일
	static String base_time = calArr[1]; // 조회기준시간
	static int numOfRows = 99;
	static int pageNo = 1;
	static int totalCount = 0;
	static int cnt = 0;
	static boolean loop = true;
	
	static String base_url = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?"
						   + "ServiceKey=" + SERVICE_KEY
						   + "&base_date=" + base_date + "&base_time=" + base_time
						   + "&numOfRows=" + numOfRows + "&_type=json";
	
	static List<Map<String, String>> total_info = new ArrayList<Map<String,String>>();
	
	/**
	 * 날씨 정보 API
	 * @param nx : grid X value
	 * @param ny : grid Y value
	 * @return
	 */
	public static List<Map<String, String>> fn_APIConnect(String nx, String ny) {
		List<Map<String, String>> connectValue = new ArrayList<Map<String,String>>();
		BufferedReader br;
		
		while (loop) {
			
			String addr = base_url
					+ "&nx=" + nx + "&ny=" + ny + "&pageNo=" + pageNo;
			
			try {
				
				URL url = new URL(addr);
				
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-type", "application/json");
				
				if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
					br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				} else {
					br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
				}
				
				String resData = br.readLine();
				
				if (resData == null) {
					System.out.println("Response data is Null!!");
				} else {
					connectValue = jsonParser(resData);
					total_info.addAll(connectValue);
				}
				
				br.close();
				conn.disconnect();
				
			} catch (Exception e) {
				System.out.println(e.getMessage());
				loop = false;
			}
			
		}
		
		return total_info;
	}
	
	/**
	 * 날씨 정보 결과를 Map으로 반환
	 * @param data : 날씨 api reponse data
	 * @return
	 */
	public static List<Map<String, String>> jsonParser(String data) {
		List<Map<String, String>> weatherList = new ArrayList<Map<String,String>>();	
		JSONObject weatherObj = null;
		
		try {
			
			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(data);
			JSONObject response = (JSONObject) obj.get("response");
			JSONObject header = (JSONObject) response.get("header");
			String resCode = header.get("resultCode").toString();
			
			if (resCode.equals("0000")) { // resultMsg : OK
				JSONObject body = (JSONObject) response.get("body");
				
				pageNo = Integer.parseInt(body.get("pageNo").toString());
				totalCount = Integer.parseInt(body.get("totalCount").toString());
				cnt = totalCount / numOfRows;
				
				if (totalCount % numOfRows > 0) { cnt += 1; }
				if (pageNo >= cnt) {
					loop = false;
				} else {
					pageNo += 1;
				}
				
				JSONObject items = (JSONObject) body.get("items");
				JSONArray item = (JSONArray) items.get("item");
				
				for (int i = 0; i < item.size(); i++) {
					Map<String, String> weatherInfo = new HashMap<String, String>();
					
					weatherObj = (JSONObject) item.get(i);
					
					String nx = weatherObj.get("nx").toString();
					String ny = weatherObj.get("ny").toString();
					String fcst_dt = weatherObj.get("fcstDate").toString() + weatherObj.get("fcstTime").toString();
					String category = weatherObj.get("category").toString();
					String fsct_val = weatherObj.get("fcstValue").toString();
					String base_dt = weatherObj.get("baseDate").toString() + weatherObj.get("baseTime").toString();
					
					weatherInfo.put("NX", nx);
					weatherInfo.put("NY", ny);
					weatherInfo.put("FCST_DT", fcst_dt);
					weatherInfo.put("CATEGORY", category);
					weatherInfo.put("FCST_VAL", fsct_val);
					weatherInfo.put("BASE_DT", base_dt);
					
					weatherList.add(weatherInfo);
				}
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			loop = false;
		}
		
		return weatherList;
	}
	
	/**
	 * 날씨 정보 실시간 제공을 위해 최근 Base time을 구하기
	 * @return
	 */
	private static String getLastestBaseTime() {
		SimpleDateFormat fm = new SimpleDateFormat("yyyyMMdd HHmm");
		
		Calendar now = Calendar.getInstance();
		
		int hour = now.get(Calendar.HOUR_OF_DAY);
		int min	 = now.get(Calendar.MINUTE);
		
		// 3시간 간격으로 업데이트 : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300
		if (hour < 2) {
			now.add(Calendar.DATE, -1);
			now.set(Calendar.HOUR_OF_DAY, 23);
		} else {
			now.set(Calendar.HOUR_OF_DAY, hour - (hour + 1) % 3);
		}
		
		now.set(Calendar.MINUTE, 0);
		
		// 발전단지 새로 등록시 현재 날씨도 볼 수 있도록 basetime 3시간 전으로!!
		now.add(Calendar.HOUR_OF_DAY, -3);
		
		String baseCal = fm.format(now.getTime());
		
		return baseCal;
	}
}
