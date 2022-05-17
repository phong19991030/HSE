package applications.taglib.tag;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

@SuppressWarnings("serial")
public class InfoTag extends TagSupport {
	JspWriter out;

	String id 	= "";
	String cls  = "";//PF|RATIO|VDROP|VOLT|LOSS -- 복수개 선택 가능 (예 : VDROP,PF)
	String ctxPath = "";
	
	Map dataMap = new HashMap() {{
		// 실시간정보 - 요금정보
		put("realCost_TITLE", "요금정보");
		
		// 과저부하
		put("LOAD", new String[] {"이용률(%) : 30%~130%", "이용률(%) : 30%이하", "이용률(%) : 130%이상"});
		put("LOAD_TITLE", "부하기준정보");
		
		// 검침계기성공/검침성공
		put("MR", new String[] {"성공(검침성공수)/전체(검침계획수)", "성공(검침성공계기수)/전체(검침대상계기수)"});
		put("MR_TITLE", "검침성공율 정보");
		
		// 검침계기성공/검침성공/적시성공 (수정전)
		//put("MR1", new String[] {"성공(검침성공수)/전체(검침계획수)", "성공(검침성공계기수)/전체(검침대상계기수)", "성공(수집 시간 내 검침성공수)/전체(검침대상계기수)"});
		//put("MR1_TITLE", "검침성공율 정보");
		
		// 검침성공률/적시수신율/적시수신건수 정보 (수정후)
		put("MR1", new String[] {"정상수신(건) ÷ 전체수신(건) × 100", "적시수신(건) ÷ 전체수신(건) × 100"});
		put("MR1_TITLE", "판단기준");
		
		// 검침성공
		put("MR2", new String[] {"성공(검침성공수)/전체(검침계획수)"});
		put("MR2_TITLE", "검침성공율 정보");
		
		// On-Demand 검침성공
		put("OnDemand", new String[] {"성공(검침성공수)/전체(검침요청수)"});
		put("OnDemand_TITLE", "On-Demand 검침성공율 정보");
		
		put("VOLT", new String[] {"22.9기준 (±)2.5%이내", "22.9기준 (±)2.5%", "22.9기준 (±)20%"});
	    put("VOLT_TITLE", "규정전압(kV)");
	    put("PF", new String[] {"91%이상", "90%이상 ~ 91%미만", "90%미만"});
	    put("PF_TITLE", "역률(%)");
	    put("RATIO", new String[] {"80%미만", "80%이상 ~ 100%미만", "100%이상"});
	    put("RATIO_TITLE", "이용률(%)");
	    put("VDROP", new String[] {"8%미만", "8%이상 ~ 10%미만", "10%이상"});
	    put("VDROP_TITLE", "전압강하(%)");
	    put("LOSS", new String[] {"300kW미만", "300kW이상 ~ 500kW미만", "500kW이상"});
	    put("LOSS_TITLE", "손실유효전력(kW)");
	    
	    //변압기부하관리 전압모니터링 내용
	    put("LC1", new String[] {"110V", "116", "104", "±5"});
	    //변압기부하관리 전압모니터링 대제목
	    put("LC1_TITLE", "전압기준 정보");
	    
	    //전기품질 > 고압고객 모니터링 > 전압 모니터링 내용
	    put("EQ1", new String[] {"6.6KV", "6.9", "6", "-9 ~+5"});
	    //전기품질 > 고압고객 모니터링 > 전압 모니터링 대제목
	    put("EQ1_TITLE", "전압기준 정보");
	    
	    //전기품질 > 고압고객 모니터링 > 역률 모니터링 내용
	    put("EQ2", new String[] {"0.6", "0.9"});
	    //전기품질 > 고압고객 모니터링 > 역률 모니터링 대제목
	    put("EQ2_TITLE", "역률저하기준 ");
	    
	    //전기품질 > 고압고객 모니터링 > 고조파 모니터링 내용
	    put("EQ3", new String[] {"3", "3"});
	    //전기품질 > 고압고객 모니터링 > 고조파 모니터링 대제목
	    put("EQ3_TITLE", "고조파 왜형율 기준");
	    
	    // 전압품질 GIS
 		put("GI", new String[] {"정상수신(건) ÷ 전체수신(건) × 100", "적시수신(건) ÷ 전체수신(건) × 100"});
 		put("GI_TITLE", "전압 유지 기준 정보(색상구분)");
	    
	}};
	
	String[] status_str = {"정상", "주의", "이상"};
	
	// 과저부하
	String[] status_str1 = {"정상", "저부하", "과부하"};
	
	// 검침계기성공/검침성공
	String[] status_str2 = {"성공율", "계기성공율"};
	
	// 검침성공
	String[] status_str3 = {"성공율"};
	
	//On-Demand 검침성공
	String[] status_str4 = {"성공율"};
	
	// 검침계기성공/검침성공/적시성공
	//String[] status_str5 = {"성공율", "계기성공율", "적시성공율"};
	
	// 검침성공률/적시수신율/적시수신건수 정보
	String[] status_str5 = {"검침성공률(%)", "적시수신율(%)"};
	
	//변압기부하관리 > 실시간 부하 모니터링 > 전압모니터링 제목
	String[] LC1 = {"전압", "최대", "최소", "비율"};
	//변압기부하관리 > 실시간 부하 모니터링 > 전압모니터링 내용
	String[] LC1_2 = {"220V", "233", "207", "±6"};
	String[] LC1_3 = {"380V", "418", "342", "±10"};
	String[] LC1_4 = {"440V", "466", "414", "±6"};
	
	//전기품질 > 고압고객 모니터링 > 전압 모니터링 제목
	String[] EQ1 = {"전압", "최대", "최소", "비율"};
	//전기품질 > 고압고객 모니터링 > 전압 모니터링 내용
	String[] EQ1_2 = {"11.4KV", "12.54", "10.26", "±10"};
	String[] EQ1_3 = {"13.2KV", "13.8", "12", "-9 ~+5"};
	String[] EQ1_4 = {"22KV", "22.86", "19.98", "-9 ~+4"};
	String[] EQ1_5 = {"22.9KV", "23.8", "20.8", "-9 ~+4"};
	String[] EQ1_6 = {"66KV", "72.6", "59.4", "±10"};
	String[] EQ1_7 = {"154KV", "169.4", "138.6", "±10"};
	String[] EQ1_8 = {"345V", "362.25", "327.75", "±5"};
	String[] EQ1_9 = {"765KV", "803.25", "726.75", "±5"};
	//전기품질 > 고압고객 모니터링 > 역률 모니터링 제목
	String[] EQ2 = {"경고", "주의"};
	//전기품질 > 고압고객 모니터링 > 고조파 모니터링 제목
	String[] EQ3 = {"154kV이하 전압왜형율 허용기준치", "6.6kV이하 전압왜형율 허용기준치"};
	
	public void setId(String value) {
		this.id = value;
	}
	
	public void setCls(String value) {
		this.cls = value;
	}

	@Override
	public int doStartTag() throws JspException {
		return SKIP_BODY;//<tag/>
	}
	
	@Override
	public int doEndTag() throws JspException {
		out = pageContext.getOut();
		/**
		 * 종료태그
		 */
		try {
			String[] clsArray = cls.split(",");
			int dialog_height = 0;
			int dialog_width = 0;
			String title_str = "기준정보";
			String dialog_class = "infoDialog";
			String dialog_btn = "infoDialogBtn";
			
			if("GAUGE".equals(clsArray[0])){
				dialog_width = 330;
				dialog_height = 320;
			}else if("INFOR".equals(clsArray[0])){
				dialog_width = 450;
				dialog_height = 220;
			}
			else if("MR".equals(clsArray[0])){ // 검침계기/검침성공율정보 다이얼로그 크기
				dialog_width = 380;
				dialog_height = 135;
			}
			// 검침계기/검침/적시성공율정보 다이얼로그 크기 (수정전)
			// 검침성공률/적시수신율/적시수신건수 다이얼로그 크기 (수정후)
			else if("MR1".equals(clsArray[0])){ 
				dialog_width = 550; // 450
				dialog_height = 350; // 170
				dialog_class = "infoDialog2";
			}
			else if("MR2".equals(clsArray[0])){ // 검침성공율정보 다이얼로그 크기
				dialog_width = 315;
				dialog_height = 120;
			}else if("OnDemand".equals(clsArray[0])){ // On-Demand검침성공율정보 다이얼로그 크기
				dialog_width = 300;
				dialog_height = 120;
			}else if("LC1".equals(clsArray[0])){ //변압기부하관리 > 실시간 부하 모니터링 > 전압모니터링 다이얼로그 크기
				dialog_width = 400;
				dialog_height = 200;
			}else if("EQ1".equals(clsArray[0])){ //전기품질 > 고압고객 모니터링 > 전압 모니터링  다이얼로그 크기
				dialog_width = 800;
				dialog_height = 200;
			}else if("EQ2".equals(clsArray[0])){ //전기품질 > 고압고객 모니터링 > 역률 모니터링 다이얼로그 크기
				dialog_width = 300;
				dialog_height = 150;
			}else if("EQ3".equals(clsArray[0])){ //전기품질 > 고압고객 모니터링 > 고조파 모니터링 다이얼로그 크기
				dialog_width = 450;
				dialog_height = 150;
			}else if("GI".equals(clsArray[0])){ // 검침계기/검침성공율정보 다이얼로그 크기
				dialog_width = 910;
				dialog_height = 530;
				dialog_class = "infoDialog2";
			} else if("realCost".equals(clsArray[0])){ // 실시간정보 - 요금정보
				dialog_width = 240;
				dialog_height = 100;
				dialog_class = "infoDialog2";
			} else{
				dialog_width = 240;
				dialog_height = 40 + (120 * clsArray.length);
			}
			
			//유효성 검사 함수(dateValidation,dateTermValidation) 는 common.js에 있음
			out.println("<script type=\"text/javascript\">");
			out.println("function showRuleInfo_"+id+"(){");
			//dialogClass:'alert'
			out.println("$('#"+id+"').dialog({title:'"+ title_str +"', dialogClass:'"+dialog_class+"', width:" + dialog_width + ", height:" + dialog_height + " , closeOnEscape: true, resizable: false, hide: 'fade', position:{my:'right top',at:'left bottom',of:'#"+id+"_btn'}});");
			out.println("}");
			out.println("</script>");
			out.println("<div id='"+id+"' style='display:none;'>");
			
			if("GAUGE".equals(clsArray[0])){
				out.println(getGauge());
			}else if("INFOR".equals(clsArray[0])){
				out.println(getFix());
			}else if("LOAD".equals(clsArray[0])){//부하정보
				out.println(getLoad());
			}else if("MR".equals(clsArray[0])){ // 검침계기/검침성공율정보
				out.println(getMR());
			}else if("MR1".equals(clsArray[0])){ // 검침계기/검침/적시성공율정보
				out.println(getMR1());
			}else if("MR2".equals(clsArray[0])){ // 검침성공율정보
				out.println(getMR2());
			}else if("OnDemand".equals(clsArray[0])){ // On-Demand 검침성공율정보
				out.println(getOnDemand());
			}else if("LC1".equals(clsArray[0])){ //변압기부하관리 > 실시간 부하 모니터링 > 전압모니터링 검침성공율정보
				out.println(getLC1());
			}else if("EQ1".equals(clsArray[0])){ //전기품질 > 고압고객 모니터링 > 전압 모니터링 검침성공율정보
				out.println(getEQ1());
			}else if("EQ2".equals(clsArray[0])){ //전기품질 > 고압고객 모니터링 > 역률 모니터링 검침성공율정보
				out.println(getEQ2());
			}else if("EQ3".equals(clsArray[0])){ //전기품질 > 고압고객 모니터링 > 고조파 모니터링 검침성공율정보
				out.println(getEQ3());
			}else if("GI".equals(clsArray[0])){ // 검침계기/검침성공율정보
				out.println(getGI());
			}else if("realCost".equals(clsArray[0])){ // 실시간정보 - 요금정보
				out.println(getRealCost());
			}else{
				if(clsArray.length > 0){
					for(int i = 0;i < clsArray.length;i++){
						out.println(getContents(clsArray[i]));
					}
				}
			}
			out.println("</div>");
			out.println("<span id='"+id+"_btn' title='"+ title_str +"' class='"+dialog_btn+"' onclick='showRuleInfo_"+id+"();'></span>");
		} catch (IOException e) {
			throw new JspException("[DatePickerTermTag]-[doEndTag]: " + e.getMessage());
		}	
		//release를 호출하여 페이지내에서 Tag가 다시 사용될수있게 준비한다.
		release();
		return EVAL_PAGE;
	}
	
	@Override
	public void release() {
		id 	 = "";
		cls  = "";
	}
	
	//PF|RATIO|VDROP|VOLT|LOSS
	private String getContents(String cls){
		StringBuffer sb = new StringBuffer();
		
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='50px'>" + status_str[i] + "</th>");
			sb.append("<td class='bg_white_info'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}
	
	private String getGauge(){
		StringBuffer sb = new StringBuffer();
		
		sb.append("<span class='bg_status_2' style='color:#FFFFFF; display:inline-block; padding:2px 5px;'>주의</span>");
		sb.append("<table class='table_info' style='width:100%;'>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' colspan='2' width='110;'>전력품질</td><td>주의 1건 이상</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' rowspan='2' width ='30;'>부하</td><td class='b_third' width='70;'>주변압기</td><td>이용률 80% 이상</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_third'>배전선로</td><td>피상전력 10,000KVA 이상</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' colspan='2'>고장</td><td>순간고장 1건 이상</td></tr>");
		sb.append("</table>");
		
		sb.append("<span class='bg_status_3' style='color:#FFFFFF; display:inline-block; padding:2px 5px;'>이상</span>");
		sb.append("<table class='table_info' style='width:100%;'>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' colspan='2' width='110;'>전력품질</td><td>이상 1건 이상</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' rowspan='2' width='30;'>부하</td><td class='b_third' width='70;'>주변압기</td><td>이용률 100% 이상</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_third'>배전선로</td><td>피상전력 14,000KVA 이상</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' colspan='2'>고장</td><td>일시고장 1건 이상</td></tr>");
		sb.append("</table>");
		return sb.toString();
	}
	
	private String getFix(){
		StringBuffer sb = new StringBuffer();
		
		sb.append("<span class='bg_status_2' style='color:#e8e8e8; display:inline-block; padding:2px 5px;'>INFORMATION</span>");
		sb.append("<table class='table_info' style='width:100%;'>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' width='30;'>1단계</td><td>DAS/NDIS 구간 전산화번호 매핑</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' width='30;'>2단계</td><td>설비종류 매핑 및 수정</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' width='30;'>3단계</td><td>DAS 개폐정보 ⇒ NDIS 반영</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' width='30;'>4단계</td><td>선로정보 매핑 및 전산화번호 수정</td></tr>");
		sb.append("<tr class='bg_white_info'><td class='b_secon' width='30;'>5단계</td><td>누락된 전산화번호에 일대다/다대일 구간매핑</td></tr>");
		sb.append("</table>");
		
		return sb.toString();
	}
	
	// 실시간정보 - 요금정보
	private String getRealCost(){
		StringBuffer sb = new StringBuffer();
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label><br/>");
		sb.append("&nbsp;※ 당월 이전통계정보를 보여줍니다");
		return sb.toString();
	}
	
	// 부하기준정보
	private String getLoad(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='50px'>" + status_str1[i] + "</th>");
			sb.append("<td class='bg_white_info'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}
	// 검침계기/검침성공율정보
	private String getMR(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='80px'>" + status_str2[i] + "</th>");
			sb.append("<td class='bg_white_info'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}
	// 검침계기/검침/적시성공율정보 (수정전)
/*	private String getMR1(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='80px'>" + status_str5[i] + "</th>");
			sb.append("<td class='bg_white_info'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}*/
	// 검침성공률, 적시수신율, 적시수신건수 정보 (수정후)
	private String getMR1(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info_green' style='width:100%;'>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<th class='whence_td_secon' width='130px'>" + status_str5[0] + "</th>");
		sb.append("<td class='bg_white_info'>" + row_data[0] + "</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<th class='whence_td_secon' width='130px'>" + status_str5[1] + "</th>");
		sb.append("<td class='bg_white_info'>" + row_data[1] + "</td>");
		sb.append("</tr>");
		sb.append("</table>");
		sb.append("&nbsp;※ 적시수신건수 : FEP수신시간 - 미터검침시간 ≤ 1시간");
		
		sb.append("<br/><br/><label>" + "통계처리방법검토" + "</label>");
		sb.append("<table class='table_info_green' style='width:100%;'>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<th class='whence_td_secon' width='50px'>" + "통계항목" + "</th>");
		sb.append("<th class='whence_td_secon' width='50px'>" + "검침기준시간" + "</th>");
		sb.append("<th class='whence_td_secon' width='150px'>" + "성공판단기준" + "</th>");
		sb.append("<th class='whence_td_secon' width='50px'>" + "통계처리시간" + "</th>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td class='bg_white_info' align='center'>검침성공률</td>");
		sb.append("<td class='bg_white_info' align='center'>미터검침시간</td>");
		sb.append("<td class='bg_white_info' align='center'>ADCS 수신여부</td>");
		sb.append("<td class='bg_white_info' align='center'>익일 07시</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td class='bg_white_info' align='center'>적시수신율</td>");
		sb.append("<td class='bg_white_info' align='center'>FEP수신시간</td>");
		sb.append("<td class='bg_white_info' align='center'>FEP수신시간 - 미터검침시간 ≤ 1시간</td>");
		sb.append("<td class='bg_white_info' align='center'>익일 07시</td>");
		sb.append("</tr>");
		sb.append("</table>");
		sb.append("&nbsp;※ 통계처리시간(07시) 이후 수신데이터는 통계에 반영하지 않음.(향후 필요시 개발)");
		return sb.toString();
	}
	// 검침성공율정보
	private String getMR2(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_1' width='50px'>" + status_str3[i] + "</th>");
			sb.append("<td class='bg_white_info'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}
	// On-Demand 검침성공율정보
	private String getOnDemand(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_1' width='50px'>" + status_str4[i] + "</th>");
			sb.append("<td class='bg_white_info'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
	}
	
	// 변압기부하관리 > 실시간 부하 모니터링 > 전압 모니터링
	private String getLC1(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='80px'>" + LC1[i] + "</th>");
			sb.append("<td class='bg_white_info' align='center'>" + row_data[i] + "</td>");
			sb.append("<td class='bg_white_info' align='center'>" + LC1_2[i] + "</td>");
			sb.append("<td class='bg_white_info' align='center'>" + LC1_3[i] + "</td>");
			sb.append("<td class='bg_white_info' align='center'>" + LC1_4[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
		}
	
	// 전기품질 > 고압고객 모니터링 > 전압 모니터링
	private String getEQ1(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='80px'>" + EQ1[i] + "</th>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + row_data[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_2[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_3[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_4[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_5[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_6[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_7[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_8[i] + "</td>");
			sb.append("<td class='bg_white_info' width='40px' align='center'>" + EQ1_9[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
		}
		
	// 전기품질 > 고압고객 모니터링 > 역률 모니터링
	private String getEQ2(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='80px'>" + EQ2[i] + "</th>");
			sb.append("<td class='bg_white_info' align='center'>" + row_data[i] + "</td>");

			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
		}
	
	// 전기품질 > 고압고객 모니터링 > 고조파 모니터링
	private String getEQ3(){
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info' style='width:100%;'>");
		for(int i = 0; i < row_data.length; i++){
			sb.append("<tr>");
			sb.append("<th class='bg_status_" + (i + 1) + "' width='250px'>" + EQ3[i] + "</th>");
			sb.append("<td class='bg_white_info' align='center'>" + row_data[i] + "</td>");
			sb.append("</tr>");
		}
		sb.append("</table>");
		return sb.toString();
		}
	// 검침성공률, 적시수신율, 적시수신건수 정보 (수정후)
	private String getGI(){
		HttpServletRequest req = (HttpServletRequest)pageContext.getRequest();
		this.ctxPath = req.getContextPath();
		StringBuffer sb = new StringBuffer();
		String[] row_data = (String[]) dataMap.get(cls);
		sb.append("<label>" + dataMap.get(cls + "_TITLE") + "</label>");
		sb.append("<table class='table_info_green' style='width:100%;'>");
		sb.append("<tr>");
		sb.append("<td style='text-align:center;background-color:gray;color:white;width:60px;'>구분</td>");
		sb.append("<td style='text-align:center;background-color:gray;color:white;width:50px;'>공급전압</td>");
		sb.append("<td style='text-align:center;background-color:purple;color:white;width:90px;'>저전압경고</td>");
		sb.append("<td style='text-align:center;background-color:blue;color:white;width:170px;'>저전압주의</td>");
		sb.append("<td style='text-align:center;background-color:green;color:white;width:170px;'>정상</td>");
		sb.append("<td style='text-align:center;background-color:orange;color:white;width:170px;'>과전압주의</td>");
		sb.append("<td style='text-align:center;background-color:red;color:white;width:90px;'>과전압경고</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td rowspan='10' style='text-align:center;'>고압고객</td>");
		sb.append("<td style='text-align:center;'>3.3kV</td>");
		sb.append("<td style='text-align:center;'>3kV 미만</td>");
		sb.append("<td style='text-align:center;'>3kV 이상 3.2kV 미만</td>");
		sb.append("<td style='text-align:center;'>3.2kV 이상 3.4kV 이하</td>");
		sb.append("<td style='text-align:center;'>3.4kV 초과 3.45kV 이하</td>");
		sb.append("<td style='text-align:center;'>3.45kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>6.6kV</td>");
		sb.append("<td style='text-align:center;'>6kV 미만</td>");
		sb.append("<td style='text-align:center;'>6kV 이상 6.3kV 미만</td>");
		sb.append("<td style='text-align:center;'>6.3kV 이상 6.8kV 이하</td>");
		sb.append("<td style='text-align:center;'>6.8kV 초과 6.9kV 이하</td>");
		sb.append("<td style='text-align:center;'>6.9kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>11.4kV</td>");
		sb.append("<td style='text-align:center;'>10.26kV 미만</td>");
		sb.append("<td style='text-align:center;'>10.26kV 이상 10.8kV 미만</td>");
		sb.append("<td style='text-align:center;'>10.8kV 이상 12kV 이하</td>");
		sb.append("<td style='text-align:center;'>12kV 초과 12.54kV 이하</td>");
		sb.append("<td style='text-align:center;'>12.54kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>13.2kV</td>");
		sb.append("<td style='text-align:center;'>12kV 미만</td>");
		sb.append("<td style='text-align:center;'>12kV 이상 12.6kV 미만</td>");
		sb.append("<td style='text-align:center;'>12.6kV 이상 13.5kV 이하</td>");
		sb.append("<td style='text-align:center;'>13.5kV 초과 13.8kV 이하</td>");
		sb.append("<td style='text-align:center;'>13.8kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>22kV</td>");
		sb.append("<td style='text-align:center;'>19.98kV 미만</td>");
		sb.append("<td style='text-align:center;'>19.98kV 이상 21kV 미만</td>");
		sb.append("<td style='text-align:center;'>21kV 이상 22.4kV 이하</td>");
		sb.append("<td style='text-align:center;'>22.4kV 초과 22.86kV 이하</td>");
		sb.append("<td style='text-align:center;'>22.86kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>22.9kV</td>");
		sb.append("<td style='text-align:center;'>20.8kV 미만</td>");
		sb.append("<td style='text-align:center;'>20.8kV 이상 21.9kV 미만</td>");
		sb.append("<td style='text-align:center;'>21.9kV 이상 23.4kV 이하</td>");
		sb.append("<td style='text-align:center;'>23.4kV 초과 23.8kV 이하</td>");
		sb.append("<td style='text-align:center;'>23.8kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>66kV</td>");
		sb.append("<td style='text-align:center;'>59.4kV 미만</td>");
		sb.append("<td style='text-align:center;'>59.4kV 이상 62.7kV 미만</td>");
		sb.append("<td style='text-align:center;'>62.7kV 이상 69.3kV 이하</td>");
		sb.append("<td style='text-align:center;'>69.3kV 초과 72.6kV 이하</td>");
		sb.append("<td style='text-align:center;'>72.6kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>154kV</td>");
		sb.append("<td style='text-align:center;'>138.6kV 미만</td>");
		sb.append("<td style='text-align:center;'>138.6kV 이상 146.3kV 미만</td>");
		sb.append("<td style='text-align:center;'>146.3kV 이상 161.7kV 이하</td>");
		sb.append("<td style='text-align:center;'>161.7kV 초과 169.4kV 이하</td>");
		sb.append("<td style='text-align:center;'>169.4kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>345kV</td>");
		sb.append("<td style='text-align:center;'>327.75kV 미만</td>");
		sb.append("<td style='text-align:center;'>327.75kV 이상 336.4kV 미만</td>");
		sb.append("<td style='text-align:center;'>336.4kV 이상 353.6kV 이하</td>");
		sb.append("<td style='text-align:center;'>353.6kV 초과 362.25kV 이하</td>");
		sb.append("<td style='text-align:center;'>362.25kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>765kV</td>");
		sb.append("<td style='text-align:center;'>726.75kV 미만</td>");
		sb.append("<td style='text-align:center;'>726.75kV 이상 745.9kV 미만</td>");
		sb.append("<td style='text-align:center;'>745.9kV 이상 784.1kV 이하</td>");
		sb.append("<td style='text-align:center;'>784.1kV 초과 803.25kV 이하</td>");
		sb.append("<td style='text-align:center;'>803.25kV 초과</td>");
		sb.append("</tr>");
		sb.append("<tr class='bg_white_info'>");
		sb.append("<td style='text-align:center;'>변압기</td>");
		sb.append("<td style='text-align:center;'>220V</td>");
		sb.append("<td style='text-align:center;'>207V 미만</td>");
		sb.append("<td style='text-align:center;'>207V 이상 213.5V 미만</td>");
		sb.append("<td style='text-align:center;'>213.5V 이상 226.5V 이하</td>");
		sb.append("<td style='text-align:center;'>226.5V 초과 233V 이하</td>");
		sb.append("<td style='text-align:center;'>233V 초과</td>");
		sb.append("</tr>");
		sb.append("</table>");
		
		sb.append("<span style='height:20px; width:865px; border-radius:6px; border:1px solid #d4d4d4; display:inline-block;font-size:12px;padding:6px;color:#525252;'>");
		sb.append("<span style='padding-left:5px; display:inline;color:#525252;'>고압고객</span>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin2_5.png' width='13' height='20'> 저전압경고</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin2_4.png' width='13' height='20'> 저전압주의</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin2_1.png' width='13' height='20'> 정상전압</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin2_2.png' width='13' height='20'> 과전압주의</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin2_3.png' width='13' height='20'> 과전압경고</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin2_0.png' width='13' height='20'> 데이터없음</li>");
		sb.append("</span>");
		sb.append("<span style='height:20px; width:865px; border-radius:6px; border:1px solid #d4d4d4; display:inline-block;font-size:12px;padding:6px;color:#525252;margin-top:5px;'>");
		sb.append("<span style='padding-left:10px; display:inline;color:#525252;'>변압기</span>");
		sb.append("<li style='padding-left:62px; display:inline;'><img src='"+ctxPath+"/images/gis/pin1_5.png' width='13' height='20'> 저전압경고</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin1_4.png' width='13' height='20'> 저전압주의</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin1_1.png' width='13' height='20'> 정상전압</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin1_2.png' width='13' height='20'> 과전압주의</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin1_3.png' width='13' height='20'> 과전압경고</li>");
		sb.append("<li style='padding-left:55px; display:inline;'><img src='"+ctxPath+"/images/gis/pin1_0.png' width='13' height='20'> 데이터없음</li>");
		sb.append("</span>");
		return sb.toString();
	}
}