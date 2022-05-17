package module.pdf;

import java.util.List;
import java.util.Map;


public class HandlePlan {
	public static String makeTableDownTime(Map map, String content) {
		String replaceData = "";
		String name = (String) map.get("NAME");
		String start = (String) map.get("START");
		String end = (String) map.get("END");
			StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
			sb.append("<tbody>");		
			sb.append("<tr><td style='width: 30%; text-align: center;'>Plan name</td><td style='width: 30%; text-align: center;'>" + "Start" + "</td><td style='width: 30%; text-align: center;'>" + "End" + "</td></tr>");	
			sb.append("<tr><td  text-align: center;'>"+name+"</td><td text-align: center;'>" + start + "</td><td text-align: center;'>" + end + "</td></tr>");	
			sb.append("</tbody>");
			sb.append("</table>");			
			replaceData = sb.toString();
		return replaceData;
	}
	public static String makeTablePart(List list, String content) {
		String replaceData = "";
		int count = 0;
		if(list.size()>0) {
			StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
			sb.append("<tbody>");
			sb.append("<tr><td style='width: 20%; text-align: center;'>Name</td><td style='width: 20%; text-align: center;'>" + "Quantity" + "</td><td style='width: 20%; text-align: center;'>" + "Cost" + "</td> <td style='width: 20%; text-align: center;'>" + "Start date" + "</td> <td style='width: 20%; text-align: center;'>" + "End date" + "</td></tr>");	
			for(int i=0; i<list.size(); i++) {
				Map map = (Map) list.get(i);
				String status = "";
				String type = (String) map.get("SCHED_TP");
				if(type.equals("PART")) {
					status = (String) map.get("STATUS");
					if(status.equals("IN_STOCK")) {
						count++;
						sb.append("<tr><td>"+map.get("ITEM_NM")+"</td><td >" + map.get("QTY") + "</td><td>" + map.get("COST") + "</td> <td>" +map.get("START_PER_DT") + "</td><td>" + map.get("END_PER_DT") + "</td></tr>");						
					}
				}else {
					count++;
					sb.append("<tr><td>"+map.get("ITEM_NM")+"</td><td >" + map.get("QTY") + "</td><td>" + map.get("COST") + "</td> <td>" +map.get("START_PER_DT") + "</td><td>" + map.get("END_PER_DT") + "</td></tr>");											
				}
			}
			sb.append("</tbody>");
			sb.append("</table>");
			replaceData = sb.toString();
		}
		if(count==0){
			replaceData = "<div style=\"text-align: center;\">No data.</div>";
		}
		return replaceData;
	}
}
