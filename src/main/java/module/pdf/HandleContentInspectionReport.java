package module.pdf;

import java.util.List;

import module.model.Procedure;

public class HandleContentInspectionReport {
	
	public static String reportTypeContent(Procedure proceduce, String type, List<String> lstFilePathStr, Integer count) throws Exception {
		String str = "";
		
		StringBuilder sb = new StringBuilder("<div style='margin-left: 10px; margin-top: 10px;'>");
		
		if("WO".equals(type)) {
			sb.append("<span>" + count + ". "+ proceduce.getJobName() + "</span>");
			sb.append("<div>"+proceduce.getStrCont().replace("\n", "<br/>")+"</div>");
		}else {
			if(type.equals(proceduce.getReportType())) {
				sb.append("<span>" + count + ". "+ proceduce.getStrIssues().replace("\n", "<br/>") + "</span>");
			}
		}
		
		int lstFilePathSize =  lstFilePathStr.size();
		if(lstFilePathSize > 0) {
			sb.append("<div style='display:flex;'>");
			sb.append("<table style='width: 97%;'>");
			int tmpCountTr =  lstFilePathSize/3 + 1;
			int k = 0;
			for(int i=0; i< tmpCountTr ; i++) {
				sb.append("<tr>");
				int j=0;
				int n = lstFilePathSize - (i * 3);
				if(n<0) {
					for(j=0; j<lstFilePathSize; j++) {
						sb.append("<td style='width: 30%'><img height=\"200\" width=\"180\" src='" + lstFilePathStr.get(k) + "'/></td>");
						k++;
					}
				}else {
					if(n > 3) {
						for(j=0; j<3; j++) {
							sb.append("<td style='width: 30%'><img height=\"200\" width=\"180\" src='" + lstFilePathStr.get(k) + "'/></td>");
							k++;
						}
					}else {
						for(j=0; j<(n%3); j++) {
							sb.append("<td style='width: 30%'><img height=\"200\" width=\"180\" src='" + lstFilePathStr.get(k) + "'/></td>");
							k++;
						}
					}	
				}
				sb.append("</tr>");
			}
			sb.append("</table>");
			sb.append("</div>");
		}
				
		/*
		 * for(String strFilePath : lstFilePathStr) {
		 * sb.append("<td style='width: 30%'><img src='" + strFilePath + "'/></td>");
		 * //sb.
		 * append("<img style='margin-right: 20px; margin-bottom:20px;' height=\"200\" width=\"200\" src='"
		 * +strFilePath+"'/>"); }
		 */
		sb.append("</div>");
		sb.append("<div style=\"display: block; width: 100%; height: 30px;\"></div>");
		str += sb.toString();
			
		return str;
	}
	
	public static String toolContent(String strTools) throws Exception {
		String str = "";
		String[] arrTools = strTools.split("//");
		
		StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
		sb.append("<tbody>");
		sb.append("<tr class='bg-gray'><td style='width: 15%; text-align: center;'>No.</td><td style='width: 70%; text-align: center;'>Description</td><td style='width: 15%; text-align: center;'>Qty</td></tr>");
		for(int i=0; i<arrTools.length; i++) {
			String tmpTool = arrTools[i];
			/*
			 * @JK - 보안 취약점 수정 
			 */
			if(tmpTool != null) {
				int index = i+1;
				String des = tmpTool.split("\\*")[0] == null ? "0" : tmpTool.split("\\*")[0];
				String qty = tmpTool.split("\\*")[1] == null ? "0" : tmpTool.split("\\*")[1];
				sb.append("<tr><td style='width: 15%; text-align: center;'>"+index+"</td><td style='width: 70%; text-align: center;'>"+des+"</td><td style='width: 15%; text-align: center;'>"+qty+"</td></tr>");
			}
		}
		
		sb.append("</tbody>");
		sb.append("</table>");
		str += sb.toString();
		
		return str;
	}
	
	public static String ppeContent(String strPPE) throws Exception {
		String str = "";
		String[] arrPPEs = strPPE.split("//");
		
		StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
		sb.append("<tbody>");
		sb.append("<tr class='bg-gray'><td style='width: 15%; text-align: center;'>No.</td><td style='width: 70%; text-align: center;'>Description</td><td style='width: 15%; text-align: center;'>Qty</td></tr>");
		for(int i=0; i<arrPPEs.length; i++) {
			String tmpPPE = arrPPEs[i];
			/*
			 * @JK - 보안 취약점 수정 
			 */
			if(tmpPPE != null) {
				int index = i+1;
				String des = tmpPPE.split("\\*")[0] == null ? "0" : tmpPPE.split("\\*")[0];
				String qty = tmpPPE.split("\\*")[1] == null ? "0" : tmpPPE.split("\\*")[1];
				sb.append("<tr><td style='width: 15%; text-align: center;'>"+index+"</td><td style='width: 70%; text-align: center;'>"+des+"</td><td style='width: 15%; text-align: center;'>"+qty+"</td></tr>");
			}
		}
		
		sb.append("</tbody>");
		sb.append("</table>");
		str += sb.toString();
		
		return str;
	}
	
	public static String partsContent(String strParts) throws Exception {
		String str = "";
		String[] arrParts = strParts.split("//");
		
		StringBuilder sb = new StringBuilder("<table style='width: 97%;'>");
		sb.append("<tbody>");
		sb.append("<tr class='bg-gray'><td style='width: 15%; text-align: center;'>No.</td><td style='width: 70%; text-align: center;'>Description</td><td style='width: 15%; text-align: center;'>Qty</td></tr>");
		for(int i=0; i<arrParts.length; i++) {
			String tmpPart = arrParts[i];
			int index = i+1;
//			String des = tmpPart.split("\\*")[0];
//			String qty = tmpPart.split("\\*")[1];
			sb.append("<tr><td style='width: 15%; text-align: center;'>"+index+"</td><td style='width: 70%; text-align: center;'>"+tmpPart+"</td><td style='width: 15%; text-align: center;'></td></tr>");
		}
		
		sb.append("</tbody>");
		sb.append("</table>");
		str += sb.toString();
		
		return str;
	}
	
	
}
