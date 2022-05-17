package module.pdf;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import infrastructure.util.CommonUtil;
import module.model.Report;
import module.model.ReportBladeProcedure;
import module.model.TccoFile;
import module.model.TurbineDroneSpecification;
import module.model.TurbineSpecification;
import module.model.WorkingTimeAndWeatherDetail;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class HandleContent {

	public static String bir_makeTurSpec(TurbineSpecification turSpec, String content) {
		String replaceData = "";
		if (turSpec != null && turSpec.getModel() != null) {
			StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
			sb.append("<tbody>");
			
			sb.append("<tr><td class='bg-gray' style='width: 20%; text-align: center;'>발전기 모델명</td><td class='last-td' style='width: 75%; text-align: center;'>" + turSpec.getModel() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>Rotor 직경</td><td class='last-td' style='text-align: center;'>" + turSpec.getRotorDiam() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>타워높이</td><td class='last-td' style='text-align: center;'>" + turSpec.getTowerHeight() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>Blade 종류</td><td class='last-td' style='text-align: center;'>" + turSpec.getBladeType() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>Blade 길이</td><td class='last-td' style='text-align: center;'>" + turSpec.getBladeLength() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>Blade 색</td><td class='last-td' style='text-align: center;'>" + turSpec.getBladeColor() + "</td></tr>");
			
			String bladeSerial = "N/A";
			if (turSpec.getBladeSerial() != null && !turSpec.getBladeSerial().isEmpty()) {
				String[] bld = turSpec.getBladeSerial().split(",");
				StringBuilder sb2 = new StringBuilder();
				for (int i = 1; i <= 3; i++) {
					sb2.append("<div><span>Blade #" + i + ": </span><span>" + bld[i-1].trim() + "</span></div>");
				}
				bladeSerial = sb2.toString();
				
				/*
				JSONObject json = JSONObject.fromObject(turSpec.getBladeSerial());
				StringBuilder sb2 = new StringBuilder();
				for (int i = 1; i <= 3; i++) {
					sb2.append("<div><span>Blade #" + i + ": </span><span>" + json.getString(i + "") + "</span></div>");
				}
				bladeSerial = sb2.toString();
				*/
			}
			
			sb.append("<tr><td class='bg-gray last-tr-td' style='text-align: center;'>Blade serial number</td><td class='last-td last-tr-td' style='text-align: center;'>" + bladeSerial + "</td></tr>");
			
			sb.append("</tbody>");
			sb.append("</table>");
			
			replaceData = sb.toString();
		} else {
			replaceData = "<div style=\"text-align: center;\">No data.</div>";
		}
		
		content = content.replace("#{TURBINE_SPEC}", replaceData);
		return content;
	}
	
	public static String bir_makeTurDroneSpec(TurbineDroneSpecification droneSpec, String content) {
		String replaceData = "";
		if (droneSpec != null && droneSpec.getDroneType() != null) {
			StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
			sb.append("<tbody>");
			
			sb.append("<tr><td class='bg-gray' style='width: 20%; text-align: center;'>타 입</td><td class='last-td' style='width: 75%; text-align: center;'>" + droneSpec.getDroneType() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>비행 시간</td><td class='last-td' style='text-align: center;'>" + droneSpec.getFlightTime() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>비행 범위</td><td class='last-td' style='text-align: center;'>" + droneSpec.getFlightRange() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>최대 동작 고도</td><td class='last-td' style='text-align: center;'>" + droneSpec.getOperatingAltitude() + "</td></tr>");
			sb.append("<tr><td class='bg-gray' style='text-align: center;'>최대 동작 풍속</td><td class='last-td' style='text-align: center;'>" + droneSpec.getOperatingWindSpeed() + "</td></tr>");
			sb.append("<tr><td class='bg-gray last-tr-td' style='text-align: center;'>최대 비행 속도</td><td class='last-td last-tr-td' style='text-align: center;'>" + droneSpec.getMaxFlightSpeed() + "</td></tr>");
			
			sb.append("</tbody>");
			sb.append("</table>");
			
			replaceData = sb.toString();
		} else {
			replaceData = "<div style=\"text-align: center;\">No data.</div>";
		}
		
		content = content.replace("#{DRONE_SPEC}", replaceData);
		return content;
	}
	
	public static String bir_makeWorkingTimeAndWeather(List<WorkingTimeAndWeatherDetail> wnwList, String remarks, String content) {
		String replaceData = "";
		if (wnwList != null && !wnwList.isEmpty()) {
			StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
			sb.append("<tbody>");
			// header
			sb.append("<tr>");
			sb.append("<td class='bg-gray' style='text-align: center; width: 20%;'>Start Date</td>");
			sb.append("<td class='bg-gray' style='text-align: center; width: 20%;'>End Date</td>");
			sb.append("<td class='bg-gray' style='text-align: center; width: 20%;'>Weather</td>");
			sb.append("<td class='bg-gray' style='text-align: center; width: 20%;'>Temperature (℃)</td>");
			sb.append("<td class='bg-gray' style='text-align: center; width: 20%;'>Wind speed (m/s)</td>");
			sb.append("<td class='bg-gray last-td' style='text-align: center; width: 19%;'>Humidity (%)</td>");
			sb.append("</tr>");
			
			int index = 0;
			for (WorkingTimeAndWeatherDetail wnw : wnwList) {
				String classLastTR_TD = (index == (wnwList.size() - 1)) ? "last-tr-td" : "";
				sb.append("<tr>");
				
				sb.append("<td class='" + classLastTR_TD + "' style='text-align: center;'>" + wnw.getStartWorkingTime() + "</td>");
				sb.append("<td class='" + classLastTR_TD + "' style='text-align: center;'>" + wnw.getEndWorkingTime() + "</td>");
				sb.append("<td class='" + classLastTR_TD + "' style='text-align: center;'>" + wnw.getWeatherCode() + "</td>");
				sb.append("<td class='" + classLastTR_TD + "' style='text-align: center;'>" + wnw.getTemperature() + "</td>");
				sb.append("<td class='" + classLastTR_TD + "' style='text-align: center;'>" + wnw.getWindSpeed() + "</td>");
				sb.append("<td class='last-td " + classLastTR_TD + "' style='text-align: center;'>" + wnw.getHumidity() + "</td>");
				
				sb.append("</tr>");
				index++;
			}
			
			sb.append("</tbody>");
			sb.append("</table>");
			
			if (remarks != null) {
				sb.append("<div style='padding: 20px 0;'>※ " + remarks + "</div>");
			}
			
			replaceData = sb.toString();
		} else {
			replaceData = "<div style=\"text-align: center;\">No data.</div>";
		}
		
		content = content.replace("#{WORKING_TIME_AND_WEATHER}", replaceData);
		return content;
	}
	
	public static String bir_makeBreakages(Report report, String breakageImagesJSON, String content, TurbineSpecification turSpec) {
		List<List<ReportBladeProcedure>> procList = new ArrayList<List<ReportBladeProcedure>>(0);
		if (report.getProcedureBlade01() != null && !report.getProcedureBlade01().isEmpty()) {
			procList.add(report.getProcedureBlade01());
		}
		
		if (report.getProcedureBlade02() != null && !report.getProcedureBlade02().isEmpty()) {
			procList.add(report.getProcedureBlade02());
		}
		
		if (report.getProcedureBlade03() != null && !report.getProcedureBlade03().isEmpty()) {
			procList.add(report.getProcedureBlade03());
		}
		
		Map<String, String> breakageImages = new HashMap<String, String>(0);
		if (breakageImagesJSON != null && !breakageImagesJSON.isEmpty()) {
			JSONArray json = JSONArray.fromObject(new String(breakageImagesJSON));
			for (int i = 0; i < json.size(); i++) {
				JSONObject obj = json.getJSONObject(i);
				if (obj != null) {
					breakageImages.put(obj.getString("order"), obj.getString("image"));
				}
			}
		}
		
		StringBuilder sb = new StringBuilder();
		StringBuilder sbAtts = null;
		
		int lastNumber = 0;
		for (int i = 0; i < procList.size(); i++) {
			final int n = i + 2;  // the heading start with 2
			lastNumber = n;
			List<ReportBladeProcedure> procedureList = procList.get(i);
			final int bladeOrder = procedureList.get(0).getOrder();
			sbAtts = new StringBuilder();
			if (breakageImages.containsKey(bladeOrder + "")) {
				boolean appendHeadAtts = false;
				sb.append("<div style='page-break-before:always'>&nbsp;</div>");
				sb.append("<div class='toc'>" + n + ". 손상범위 #" + bladeOrder + " Blade</div>");
				sb.append("<div class='spaced'></div>");
				sb.append("<table style='width: 97%;'>");
				sb.append("<tr><td class='last-tr-td' rowspan='" + (procedureList.size() + 2) + "' style='width: 310px;'><img height='700' src='" + breakageImages.get(bladeOrder + "") + "'/></td><td class='last-td' colspan='3'><div><p>Turbine No: #</p></div><div><p>Blade type:" + turSpec.getBladeType() + "</p></div><div><p>Blade No:" + turSpec.getBladeSerial().split(",")[i].trim() + "</p></div></td></tr>");
				sb.append("<tr><td>No</td><td>파손 정도 및 범위</td><td class='last-td'>운전 및 정비 방안</td></tr>");
				int index = 0;
				for (ReportBladeProcedure rbp : procedureList) {
					String classLastTR_TD = (index == (procedureList.size() - 1)) ? "last-tr-td" : "";
					
					sb.append("<tr>");
					sb.append("<td class='" + classLastTR_TD + "' style='width: 30px; text-align: center;'>" + rbp.getNo() + "</td>");
					sb.append("<td class='" + classLastTR_TD + "' valign='middle' style='width: 150px;' >" + (!String.valueOf(rbp.getBreakageInfo()).equals("null") ? rbp.getBreakageInfo() : "") + "</td>");
					sb.append("<td class='last-td " + classLastTR_TD + "' valign='middle' style='background: " + getColorBySeverity(rbp.getBreakageSeverity()) + "'>" + (!String.valueOf(rbp.getPlan()).equals("null") ? rbp.getPlan() : "") + "</td>");
					sb.append("</tr>");
					
					// attachment
					if (rbp.getAttachments() != null && !rbp.getAttachments().isEmpty()) {
						if (!appendHeadAtts) {
							sbAtts.append("<div style='page-break-before:always'>&nbsp;</div>");
							sbAtts.append("<div class='toc indent'>" + n + ".1 점검사진 #" + bladeOrder + " Blade</div>");
							appendHeadAtts = true;
						}
						
						for (int j = 0, len = rbp.getAttachments().size(); j < len; j += 2) {
							TccoFile file01 = rbp.getAttachments().get(j);
							TccoFile file02 = null;
							if (j < len - 1) {
								file02 = rbp.getAttachments().get(j + 1);
								final String img01 = PdfUtil.convertImageToBase64(file01.getPath());
								final String img02 = PdfUtil.convertImageToBase64(file02.getPath());
								
								String fixHeight = "";
								if ((file01.getDescription() == null || file01.getDescription().isEmpty())
										&& (file02.getDescription() == null || file02.getDescription().isEmpty())) {
									fixHeight = "height: 35px;";
								}
								
								if ((img01 != null && !img01.isEmpty()) || (img02 != null && !img02.isEmpty())) {
									sbAtts.append("<div class='spaced'></div>");
									sbAtts.append("<table style='width: 97%;'>");
									sbAtts.append("<tr><td style='width: 50%'><img src='" + img01 + "'/></td><td class='last-td' style='width: 50%'><img src='" + img02 + "'/></td></tr>");
									sbAtts.append("<tr><td class='last-tr-td' style='width: 50%; " + fixHeight + " background: " + getColorBySeverity(rbp.getBreakageSeverity()) + "'>" + file01.getDescription() + "</td><td class='last-td last-tr-td' style='width: 50%; background: " + getColorBySeverity(rbp.getBreakageSeverity()) + "'>" + file02.getDescription() + "</td></tr>");
									sbAtts.append("</table>");
									sbAtts.append("<div class='spaced'></div>");
								}
							} else {
								final String img01 = PdfUtil.convertImageToBase64(file01.getPath());
								String fixHeight = "";
								if (file01.getDescription() == null || file01.getDescription().isEmpty()) {
									fixHeight = "height: 35px;";
								}
								
								if (img01 != null && !img01.isEmpty()) {
									sbAtts.append("<div class='spaced'></div>");
									sbAtts.append("<table style='width: 97%;'>");
									sbAtts.append("<tr><td style='width: 50%'><img src='" + img01 + "'/></td><td class='last-td' style='width: 50%'></td></tr>");
									sbAtts.append("<tr><td class='last-tr-td' style='width: 50%; " + fixHeight + " background: " + getColorBySeverity(rbp.getBreakageSeverity()) + "'>" + file01.getDescription() + "</td><td class='last-td last-tr-td' style='width: 50%;'></td></tr>");
									sbAtts.append("</table>");
									sbAtts.append("<div class='spaced'></div>");
								}
							}
						}
					}
					
					index++;
				}
				sb.append("</table>");
				sb.append("<div class='spaced'></div>");
				sb.append(sbAtts.toString());
			}
		}
		
		// inspection results
		sb.append("<div style='page-break-before:always'>&nbsp;</div>");
		sb.append("<div class='toc'>" + (lastNumber + 1) + ". 점검결과</div>");
		sb.append("<div class='spaced'></div>");
		String inspectionResults = (String.valueOf(report.getInspectionResults()).equals("null") ? "" : htmlEscape(report.getInspectionResults()));
		inspectionResults = inspectionResults.replaceAll("\\n", "<br/>");
		sb.append("<div>" + inspectionResults + "</div>");
		sb.append("<div class='spaced'></div>");
		
		// comment
		sb.append("<div class='toc'>" + (lastNumber + 2) + ". 기타 추가 의견</div>");
		sb.append("<div class='spaced'></div>");
		String comment = (String.valueOf(report.getComment()).equals("null") ? "" : htmlEscape(report.getComment()));
		comment = comment.replaceAll("\\n", "<br/>");
		sb.append("<div>" + comment + "</div>");
		sb.append("<div class='spaced'></div>");
		
		content = content.replace("#{BREAKAGES}", sb.toString());
		
		Map<String, String> tocMap = _getTableOfContents(content);
		if (tocMap != null && !tocMap.isEmpty()) {
			StringBuilder sbToc = new StringBuilder();
			TreeMap<String, String> map = new TreeMap<>(tocMap);
			sbToc.append("<table class='table-no-border' style='width: 97%; border: 0px;'>");
			for (Map.Entry<String, String> entry : map.entrySet()) {
				sbToc.append("<tr>");
				String indent = entry.getKey().indexOf(".") != -1 ? "padding-left: 20px !important;" : "";
				sbToc.append("<td style='border: 0px; padding: 10px 0; " + indent + "'>");
				StringBuilder sbItem = new StringBuilder();
				sbItem.append("<div style='float: left; padding-top: 3px;'>" + entry.getValue() + "</div>");
				sbItem.append("<div style='float: left; height: 20px; padding-top: 3px;'>");
				sbItem.append(" ................................................................................................................................................................");
				sbItem.append("</div>");
				
				sbToc.append(sbItem.toString());
				sbToc.append("</td>");
				sbToc.append("<td style='border: 0px; padding: 10px 0;'><div style='float: right;'>#{TOC_" + entry.getKey() + "}</div></td>");
				sbToc.append("</tr>");
			}
			sbToc.append("</table>");
			
			content = content.replace("#{TABLE_OF_CONTENTS}", sbToc.toString());
		}
		
		return content;
	}
	
	private static String htmlEscape(String content) {
		while (content.contains("<") || content.contains(">")) {
			content = content.replaceAll("<", "&lt;");
			content = content.replaceAll(">", "&gt;");
			content = content.replaceAll("&amp;", "&");
		}
		
		return content;
	}
	
	private static Map<String, String> _getTableOfContents(String content) {
		Map<String, String> result = new HashMap<>(0);
		Pattern pattern = Pattern.compile("<div[\\s]+class=[\"']?toc(.*?)[\"']?>((.*?))</div>");
		Matcher matcher = pattern.matcher(content);
		while (matcher.find()) {
			final String text = matcher.group(matcher.groupCount() - 1);
			String number = text.substring(0, text.indexOf(" "));
			if (number.endsWith(".")) {
				number = number.substring(0, number.length() - 1);
			}
			result.put(number, text);
		}
		
		return result;
	}
	
	public static Object[] getTableOfContents(String content) {
		Object[] result = new Object[2];
		
		Map<String, String> tocMap = _getTableOfContents(content);
		if (tocMap != null && !tocMap.isEmpty()) {
			TreeMap<String, String> map = new TreeMap<>(tocMap);
			String[] keyList = new String[map.size()];
			String[] valueList = new String[map.size()];
			int index = 0;
			for (Map.Entry<String, String> entry : map.entrySet()) {
				keyList[index] = "#{TOC_" + entry.getKey() + "}";
				valueList[index] = entry.getValue();
				index++;
			}
			
			result[0] = keyList;
			result[1] = valueList;
		}
		
		return result;
	}
	
	private static String getColorBySeverity(String severityCode) {
		String color = "";
		switch (severityCode) {
		case "S0":
			color = "gray";
			break;
		case "S1":
			color = "green";
			break;
		case "S2":
			color = "#90EE90";
			break;
		case "S3":
			color = "yellow";
			break;
		case "S4":
			color = "orange";
			break;
		case "S5":
			color = "red";
			break;
		}
		
		return color;
	}
	
	/**
	 * 
	 * @Method : replaceContent
	 * @Author : pjk
	 * @Date : Mar 21, 2021
	 * @param content
	 * @param target
	 * @param change
	 * @return
	 * @Description : content 내용 변경
	 */
	public static String replaceContent(String content, String target, String change) {
		if(change == null) change = "";
		content = content.replace(target, escapeTextareaValue(change));
		return content;
	}
	/* 삭제 */
	public static String pir_makeSafetyAndOverview(String content, String safety, String overview) {
		if (safety == null) safety = "";
		content = content.replace("#{SAFETY}", escapeTextareaValue(safety));
		if (overview == null) overview = "";
		content = content.replace("#{OVERVIEW}", escapeTextareaValue(overview));
		
		return content;
	}
	
	@SuppressWarnings("unchecked")
	public static String pir_makeChecklist(String content, JSONObject json) {
		if (json != null && !json.isEmpty()) {
			StringBuilder checklist = new StringBuilder("");
			Iterator<String> keys = json.keys();
			while (keys.hasNext()) {
				final String key = keys.next();
				JSONObject obj = json.getJSONObject(key);
				if (obj == null || obj.isEmpty()) continue;
				
				checklist.append(pir_makeChecklistHtml(key, obj));
			}
			
			content = content.replace("#{CHECKLIST}", checklist.toString());
		}
		
		Map<String, String> tocMap = _getTableOfContents(content);
		if (tocMap != null && !tocMap.isEmpty()) {
			StringBuilder sbToc = new StringBuilder();
			TreeMap<String, String> map = new TreeMap<>(new Comparator<String>() {

				@Override
				public int compare(String o1, String o2) {
					return Integer.valueOf(o1).compareTo(Integer.valueOf(o2));
				}
			});
			map.putAll(tocMap);
			sbToc.append("<table class='table-no-border' style='width: 97%; border: 0px;'>");
			for (Map.Entry<String, String> entry : map.entrySet()) {
				sbToc.append("<tr>");
				String indent = entry.getKey().indexOf(".") != -1 ? "padding-left: 20px !important;" : "";
				sbToc.append("<td style='border: 0px; padding: 10px 0; " + indent + "'>");
				StringBuilder sbItem = new StringBuilder();
				sbItem.append("<div style='float: left; padding-top: 3px;'>" + entry.getValue() + "</div>");
				sbItem.append("<div style='float: left; height: 20px; padding-top: 3px;'>");
				sbItem.append(" ................................................................................................................................................................");
				sbItem.append("</div>");
				
				sbToc.append(sbItem.toString());
				sbToc.append("</td>");
				sbToc.append("<td style='border: 0px; padding: 10px 0;'><div style='float: right;'>#{TOC_" + entry.getKey() + "}</div></td>");
				sbToc.append("</tr>");
			}
			sbToc.append("</table>");
			
			content = content.replace("#{TABLE_OF_CONTENTS}", sbToc.toString());
		}
		
		return content;
	}
	
	public static String pir_makeInspectorData(String content, Map<String, Object> inspectorData) {
		String turbineType = CommonUtil.getMapValue(inspectorData, "TURBINE_TYPE", "");
		String windFarmName = CommonUtil.getMapValue(inspectorData, "FARM_NAME", "");
		String inspectorName = CommonUtil.getMapValue(inspectorData, "INSPECTORS", "");
		String date = CommonUtil.getMapValue(inspectorData, "WORKING_DATES", "");
		
		StringBuilder table = new StringBuilder("<table style='width: 97%;'>");
		table.append("<tr><td class='bg-gray' style='font-weight: bold; width: 100px;'>Turbine type</td><td class='last-td'>" + turbineType + "</td></tr>");
		table.append("<tr><td class='bg-gray' style='font-weight: bold;'>Wind farm name</td><td class='last-td'>" + windFarmName + "</td></tr>");
		table.append("<tr><td class='bg-gray' style='font-weight: bold;'>Inspector name</td><td class='last-td'>" + inspectorName + "</td></tr>");
		table.append("<tr><td class='bg-gray last-tr-td' style='font-weight: bold;'>Date</td><td class='last-td last-tr-td'>" + date + "</td></tr>");
		table.append("</table>");
		table.append("<div class='indent'>Table 1: Turbine 및 Inspector data</div>");
		
		return content.replace("#{INSPECTOR_DATA}", table.toString());
	}
	
	private static String pir_makeChecklistHtml(String key, JSONObject obj) {
		StringBuilder html = new StringBuilder("");
		html.append("<div class=\"spaced\"></div>");
		html.append("<div class=\"spaced\"></div>");
		html.append("<div class=\"toc indent\">" + key + ". " + obj.getString("title") + "</div>");
		html.append("<div class=\"spaced\"></div>");
		
		JSONArray children = obj.getJSONArray("children");
		if (children != null && !children.isEmpty()) {
			StringBuilder table = new StringBuilder("<table style='width: 97%;'>");
			
			table.append("<tr>");
			table.append("<td class='table-header' style='width: 30px;'>No.</td>");
			table.append("<td colspan='2' class='table-header'>점검 항목</td>");
			table.append("<td class='table-header'>점검 결과</td>");
			table.append("<td class='table-header last-td'>비고</td>");
			table.append("</tr>");
			
			final String checked = "<span>&nbsp;<img width='10' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjChAENi2NZ+luAAAAI0lEQVQoz2Nk+M7AwYAbfGdk+M+AFzAxMIwqGDoKfuCV/w4AFf8FA7UqKbAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMTAtMTZUMDQ6NTQ6NDUrMDA6MDALNcMdAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTEwLTE2VDA0OjU0OjQ1KzAwOjAwemh7oQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII='/>&nbsp;</span>";
			final String unchecked = "<span>&nbsp;<img width='10' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjChAENwjfeAxoAAAAJUlEQVQoz2NkeMvwgQE3EGBgeMyADzxmYiAARhUMHgWMBKKbHwCYVgW8KsSxwgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0xMC0xNlQwNDo1NTowOCswMDowMAFqxxkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTAtMTZUMDQ6NTU6MDgrMDA6MDBwN3+lAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='/>&nbsp;</span>";
			
			for (int i = 0; i < children.size(); i++) {
				JSONObject child = children.getJSONObject(i);
				if (child != null && !child.isEmpty()) {
					if (!child.getBoolean("isOther")) {
						JSONArray children02 = child.getJSONArray("children");
						if (children02 == null || children02.isEmpty()) continue;
						
						if (children02.size() > 1) {  // rowspan number
							for (int j = 0; j < children02.size(); j++) {
								JSONObject child02 = children02.getJSONObject(j);
								if (child02 == null || child02.isEmpty()) continue;
								JSONArray children03 = null;
								if (child02.containsKey("children")) {
									children03 = child02.getJSONArray("children");
								}
								
								if (children03 == null || children03.isEmpty()) {
									String checked01 = child02.getBoolean("checkboxValue01") ? checked : unchecked;
									String checked02 = child02.getBoolean("checkboxValue02") ? checked : unchecked;
									String rowspan = j == 0 ? "rowspan='" + children02.size() + "'" : "";
									if (j == 0) {
										table.append("<tr>");
										table.append("<td style=\"text-align: center;\" " + rowspan + ">" + child.getString("no") + "</td>");
										table.append("<td style='width: 100px;' " + rowspan + ">" + child.getString("title") + "</td>");
										table.append("<td style='width: 150px;'>" + escapeTextareaValue(child02.getString("desc")) + "</td>");
										table.append("<td style=\"text-align: center; width: 150px;\">" + child02.getString("checkboxTitle01") + checked01 + " / " + child02.getString("checkboxTitle02") + checked02 + "</td>");
										table.append("<td class='last-td'>" + escapeTextareaValue(child02.getString("comment")) + "</td>");
										table.append("</tr>");
									} else {
										table.append("<tr>");
										table.append("<td>" + escapeTextareaValue(child02.getString("desc")) + "</td>");
										table.append("<td style=\"text-align: center;\">" + child02.getString("checkboxTitle01") + checked01 + " / " + child02.getString("checkboxTitle02") + checked02 + "</td>");
										table.append("<td class='last-td'>" + escapeTextareaValue(child02.getString("comment")) + "</td>");
										table.append("</tr>");
									}
								} else {
									for (int k = 0; k < children03.size(); k++) {
										JSONObject child03 = children03.getJSONObject(k);
										if (child03 == null || child03.isEmpty()) continue;
										
										String checked01 = child03.getBoolean("checkboxValue01") ? checked : unchecked;
										String checked02 = child03.getBoolean("checkboxValue02") ? checked : unchecked;
										String rowspan = k == 0 ? "rowspan='" + children03.size() + "'" : "";
										if (k == 0) {
											table.append("<tr>");
											table.append("<td style=\"text-align: center;\" " + rowspan + ">" + child.getString("no") + "</td>");
											table.append("<td style='width: 100px;' " + rowspan + ">" + child02.getString("title") + "</td>");
											table.append("<td style='width: 150px;'>" + escapeTextareaValue(child03.getString("desc")) + "</td>");
											table.append("<td style=\"text-align: center; width: 150px;\">" + child03.getString("checkboxTitle01") + checked01 + " / " + child03.getString("checkboxTitle02") + checked02 + "</td>");
											table.append("<td class='last-td'>" + escapeTextareaValue(child03.getString("comment")) + "</td>");
											table.append("</tr>");
										} else {
											table.append("<tr>");
											table.append("<td>" + escapeTextareaValue(child03.getString("desc")) + "</td>");
											table.append("<td style=\"text-align: center;\">" + child03.getString("checkboxTitle01") + checked01 + " / " + child03.getString("checkboxTitle02") + checked02 + "</td>");
											table.append("<td class='last-td'>" + escapeTextareaValue(child03.getString("comment")) + "</td>");
											table.append("</tr>");
										}
									}
								}
							}
						} else {
							JSONObject kid = child.getJSONArray("children").getJSONObject(0);
							if (kid == null || kid.isEmpty()) continue;
							
							String checked01 = kid.getBoolean("checkboxValue01") ? checked : unchecked;
							String checked02 = kid.getBoolean("checkboxValue02") ? checked : unchecked;
							table.append("<tr>");
							table.append("<td style=\"text-align: center;\">" + child.getString("no") + "</td>");
							table.append("<td style='width: 100px;'>" + child.getString("title") + "</td>");
							table.append("<td style='width: 150px;'>" + escapeTextareaValue(kid.getString("desc")) + "</td>");
							table.append("<td style=\"text-align: center; width: 150px;\">" + kid.getString("checkboxTitle01") + checked01 + " / " + kid.getString("checkboxTitle02") + checked02 + "</td>");
							table.append("<td class='last-td'>" + escapeTextareaValue(kid.getString("comment")) + "</td>");
							table.append("</tr>");
						}
					} else {  // other
						String classLastTR_TD = (i == (children.size() - 1)) ? "last-tr-td" : "";
						
						table.append("<tr>");
						table.append("<td class='" + classLastTR_TD + "' style=\"text-align: center;\">" + child.getString("no") + "</td>");
						table.append("<td class='" + classLastTR_TD + "'>" + child.getString("title") + "</td>");
						table.append("<td class='last-td " + classLastTR_TD + "' colspan=\"3\">" + escapeTextareaValue(child.getString("comment")) + "</td>");
						table.append("</tr>");
					}
				}
			}
			
			table.append("</table>");
			html.append(table.toString());
		}
		
		return html.toString();
	}
	
	private static String escapeTextareaValue(String value) {
		return htmlEscape(value).replaceAll("\\n", "<br/>");
	}
	
}
