package applications.util;

import java.util.HashMap;
import java.util.Map;

/**
 * @Description : 기상청 API에서 사용하는 격자 X, Y값으로 변환
 * @author		: yjkim
 * @since		: 2019.11.12
 */
@Deprecated
public class GridXY {
	
	static double RE = 6371.00877; 	// 지구 반경(km)
	static double GRID = 5.0; 		// 격자 간격(km)
	static double SLAT1 = 30.0;		// 투영 위도1(degree)
	static double SLAT2 = 60.0;		// 투영 위도2(degree)
	static double OLON = 126.0;		// 기준점 경도(degree)
	static double OLAT = 38.0;		// 기준점 위도(degree)
	static double XO = 43;			// 기준점 X좌표(GRID)
	static double YO = 136;			// 기준점 Y좌표(GRID)
	
	/**
	 * Latitude, Longitude ↔ grid X, Y (위,경도 ↔ 격자 X,Y)
	 * @param code (toLL : XY → 위경도 / toXY : 위경도 → XY)
	 * @param x (X or Latitude)
	 * @param y (Y or Longitude)
	 * @return
	 */
	public static Map dfs_xy_conv(String code, double x, double y) {
		
		double DEGRAD = Math.PI / 180.0;
		double RADDEG = 180.0 / Math.PI;
		
		double re = RE / GRID;
		double slat1 = SLAT1 * DEGRAD;
		double slat2 = SLAT2 * DEGRAD;
		double olon = OLON * DEGRAD;
		double olat = OLAT * DEGRAD;
		
		double sn = Math.tan(Math.PI * 0.25f + slat2 * 0.5f) / Math.tan(Math.PI * 0.25f + slat1 * 0.5f);
		sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
		double sf = Math.tan(Math.PI * 0.25f + slat1 * 0.5f);
		sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
		double ro = Math.tan(Math.PI * 0.25f + olat * 0.5f);
		ro = re * sf / Math.pow(ro, sn);
		
		Map<String, Double> rs = new HashMap<String, Double>();
		double ra, theta;
		
		if (code == "toXY") {
			rs.put("lat", x);
			rs.put("lng", y);
			
			ra = Math.tan(Math.PI * 0.25f + x * DEGRAD * 0.5f);
			ra = re * sf / Math.pow(ra, sn);
			theta = y * DEGRAD - olon;
			if (theta > Math.PI) theta -= 2.0f * Math.PI;
			if (theta < -Math.PI) theta += 2.0f * Math.PI;
			theta *= sn;
			
			x = Math.floor(ra * Math.sin(theta) + XO + 0.5f);
			y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5f);
			
			rs.put("x", x);
			rs.put("y", y);
		} else { // code == "toLL"
			rs.put("x", x);
			rs.put("y", y);
			
			double xn = x - XO;
			double yn = ro - y + YO;
			ra = Math.sqrt(xn * xn + yn * yn);
			if (sn < 0.0f) ra = -ra;
			double alat = Math.pow(re * sf / ra, 1.0f / sn);
			alat = 2.0f * Math.atan(alat) - Math.PI * 0.5f;
			
			if (Math.abs(xn) <= 0.0) {
				theta = 0.0f;
			} else {
				if (Math.abs(yn) <= 0.0) {
					theta = Math.PI * 0.5f;
					if (xn < 0.0f) theta = -theta;
				} else {
					theta = Math.atan2(xn, yn);
				}
			}
			
			double alon = theta / sn + olon;
			
			rs.put("lat", alat * RADDEG);
			rs.put("lng", alon * RADDEG);
		}
		
		return rs;
	}
	
}
