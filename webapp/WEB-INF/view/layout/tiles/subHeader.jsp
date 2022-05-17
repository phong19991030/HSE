<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %>
<% 
	Map user = (Map)session.getAttribute("SESS_USER");
	String sess_menu_id = (String)session.getAttribute("sess_menu_id");

	List stepMenu1 = (List)session.getAttribute("SESS_MENU1");
	List stepMenu2 = (List)session.getAttribute("SESS_MENU2");
	List stepMenu4 = (List)session.getAttribute("SESS_MENU4");
	List systemMenu = (List)session.getAttribute("SESS_SYS_MENU");
	List infraMenu = (List)session.getAttribute("SESS_INFRA_MENU");
	
	int i = 0;
	int selectedIdx = -1;
	String selected_menu1 = "";
	String tmp_class = "";
	String tmp_path = "";
	String tmp_param = "";
	String tmp_pgm_id = "";
	String tmp_menu_id = "";
	String tmp_alt = "";
	String menu2 = "";
	/**
	 * sess_menu_id로 부터 선택된 menu를 구한다
	 */
	
// 	if(stepMenu4 != null && !stepMenu4.isEmpty()){
// 		for(i = 0;i < stepMenu4.size();i++){
// 			Map map = (Map)stepMenu4.get(i);
// 			if(map != null && !map.isEmpty()){
// 				if(sess_menu_id.equals(map.get("MENU_ID")) ){
// 					selected_menu1 = (String)map.get("MENU1");
// 				}
// 			}
// 		}
// 	}
%>
<script type="text/javascript">
	var TOP_LAYOUT_WIDTH = 1000;//Global변수 - TOP메뉴의 넓이를 저장해 둔다(화면 요소 크기 조정의 한계점으로 사용)
// 	$(document).ready(function(){
// 		var screenWidth = screen.width;
// 		screenWidth = screenWidth + 80;//보정값적용
// 		//PC해상도를 기준으로 메뉴넓이를 확장해 준다.
// 		if(screenWidth >= 1920){
// 			setMenuPadding("20px");
// 			TOP_LAYOUT_WIDTH = 1200;
			
// 		}else if(screenWidth < 1920 && screenWidth >= 1776){
// 			setMenuPadding("15px");
// 			TOP_LAYOUT_WIDTH = 1100;
// 		}else if(screenWidth < 1776 && screenWidth >= 1680){
// 			setMenuPadding("5px");
// 		}else if(screenWidth < 1680 && screenWidth >= 1440){
// 			setMenuPadding("0px");
// 		}else if(screenWidth < 1440 && screenWidth >= 1280){
// 			setMenuPadding("0px");
// 			$("#tmenu").css("marginLeft", "160px");
// 		}else{
// 			setMenuPadding("0px");
// 			$("#tmenu").css("marginLeft", "122px");
// 		}
// 		//TOP_LAYOUT_WIDTH = $("#theader").width();
// 	});
// 	function setMenuPadding(padding){
// 		$(".tm_ov a").css("paddingLeft", padding);
// 		$(".tm_ov a").css("paddingRight", padding);
// 		$(".tm_out a").css("paddingLeft", padding);
// 		$(".tm_out a").css("paddingRight", padding);
// 	}

	// MDMS VEE관리
	function goToMDMS() {
		var location = "http://aos.kepco.co.kr/mdms/common/auth/login.do?mode=aos";
		window.open(location);
	}
	
	$(document).ready(function(){
		// 메뉴 마우스 over시에..
		//$('ul#menu li').on("hover",function(){
		//	$(this).addClass('ov').siblings().removeClass('ov')
		//});
		$('ul#menu li').on("click",function(){
			location.href = $(this).data('url');
		});
	})
</script>
	<h1 id="logo"><a href="${ctxPath}/main/main.do" onfocus='blur();'><img src="${ctxPath}/images/common/logo.png"/></a></h1>
	<ul id="menu">	
		<c:forEach items="${SESS_MENU1}" var="menu1" varStatus="loop">
			<li id="menu_${menu1.MENU1 }" ${fn:substring(sess_menu_id,0,3) eq fn:substring(menu1.MENU1,0,3) ? 'class="ov"':''}  data-url = "${ctxPath}${menu1.PGM_PTH }?menu_id=${menu1.MENU3}">
				<span class="right">
					<div class="menu_img"></div>
					<div class="menu_name"> ${menu1.NM1 }</div>
				</span>
			</li>
		</c:forEach>
	</ul>	
	<div id="gml">
		<p>
	    	<a class="gml_admin"><strong>${SESS_USER.SESS_USER_NM }</strong> [${SESS_OFFICE[0].UPPO_OFFICE_NM}]</a>
			<a href="${ctxPath}/common/auth/logout.do"><img src="${ctxPath}/images/common/btn_logout.png" alt="logout" /></a>
		</p>
		<c:if test="${fn:indexOf(SESS_USER.SESS_USER_ROLES,'R_0001')>= 0 }">
		<p> 
			<a href="${ctxPath}/st/st0101.do?menu_id=M070101" class="sys_admin">시스템관리</a>
<!-- 			<a onclick="goToMDMS()" class="mdms">MDMS</a> -->
		</p>
		</c:if>
	</div>	
	
	<%--
			<%
		  	for(i = 0;i < stepMenu1.size();i++){ 
		  
				Map map = (Map)stepMenu1.get(i);
				
				//선택된 메뉴
				if(map.get("MENU1").toString().equals(selected_menu1)){
					tmp_class = "ov";
					selectedIdx = i;
				}else{
					tmp_class = "out";
				}
				if(i == 0){
					if(selectedIdx == i){//현재 메뉴가 선택되었으면
						out.println("<td class='tm_ov_first' nowrap></td>");
					}else{
						out.println("<td class='tm_out_first' nowrap></td>");
					}
				}else{
					if(selectedIdx == (i-1)){//직전 메뉴가 선택되었으면
						out.println("<td class='tm_ov_tail' nowrap></td>");
					}else{
						if(selectedIdx == i){//현재 메뉴가 선택되었으면
							out.println("<td class='tm_ov_head' nowrap></td>");
						}else{
							out.println("<td class='tm_out_tail' nowrap></td>");
						}
					}
				}
		  		tmp_path = map.get("PTH").toString().trim();
		  		tmp_param = map.get("PARAM").toString().trim();
		  		tmp_pgm_id = map.get("PGM_ID").toString().trim();
		  		tmp_menu_id = map.get("MENU_ID").toString().trim();
		  		tmp_alt = tmp_path;
		  		
		  		if(tmp_path.equals("")){
		  			if(tmp_pgm_id.equals("")){
		  				tmp_path = "#";
		  				tmp_alt = "권한이 없습니다.";
		  			}else{
		  				if(tmp_param.equals("")){
		  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id;
		  				}else{
		  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id + "&" + tmp_param;
		  				}
		  				tmp_alt = "";//tmp_path;//개발 디버깅용
		  			}
		  		}
		  		if(map.get("MENU1").equals("M100000")){ //모니터링은 팝업으로띄우기
					out.println("<td class='tm_"+tmp_class+"' nowrap><a href=\"javascript:openDashboard('"+tmp_path+"');\" title=\""+tmp_alt+"\" onfocus=\"blur()\">"+map.get("NM1")+"</a></td>");
		  		}else{
					out.println("<td class='tm_"+tmp_class+"' nowrap><a href='"+tmp_path+"'  onfocus=\"blur()\" title=\""+tmp_alt+"\">"+map.get("NM1")+"</a></td>");//class='icon"+(i+1)+"'
		  		}
			} 
			
			if(selectedIdx == (i-1)){//마지막 메뉴가 선택되었으면
				out.println("<td class='tm_ov_last' nowrap></td>");
			}else{
				out.println("<td class='tm_out_last' nowrap></td>");
			}
			%>			
		</tr>
		</table>
	</td>
	<td align="right">
		<table id="emenu">
		<tr>
			<%
		  	for(i = 0;i < infraMenu.size();i++){ 
		  
				Map map = (Map)infraMenu.get(i);
				//선택된 메뉴
				if(map.get("MENU1").toString().equals(selected_menu1)){
					tmp_class = "emenu_ov";
				}else{
					tmp_class = "";
				}
				if(i == 0){
					out.println("<td class='emenu_first' nowrap></td>");
				}else{
					out.println("<td class='emenu_mid' nowrap></td>");
				}
		  		tmp_path = map.get("PTH").toString().trim();
		  		tmp_param = map.get("PARAM").toString().trim();
		  		tmp_pgm_id = map.get("PGM_ID").toString().trim();
		  		tmp_menu_id = map.get("MENU_ID").toString().trim();
		  		tmp_alt = tmp_path;
		  		
		  		if(tmp_path.equals("")){
		  			if(tmp_pgm_id.equals("")){
		  				tmp_path = "#";
		  				tmp_alt = "권한이 없습니다.";
		  			}else{
		  				if(tmp_param.equals("")){
		  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id;
		  				}else{
		  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id + "&" + tmp_param;
		  				}
		  				tmp_alt = "";//tmp_path;//개발 디버깅용
		  			}
		  		}
				
				
				//임시로 플랫폼 메뉴(현재는 M130000)는 팝업처리 
		  		if(map.get("MENU1").equals("M130000")){
		  			out.println("<td class='emenu_center' nowrap><a href='"+tmp_path+"' target='_blank' class='"+tmp_class+"'  onfocus=\"blur()\" title=\""+tmp_alt+"\">"+map.get("NM1")+"</a></td>");
		  		}else{
		  			out.println("<td class='emenu_center' nowrap><a href='"+tmp_path+"' class='"+tmp_class+"'  onfocus=\"blur()\" title=\""+tmp_alt+"\">"+map.get("NM1")+"</a></td>");
		  		}
			} 

			out.println("<td class='emenu_last' nowrap></td>");
			%>	
		</tr>
		</table>
	</td>
</tr>
</table>


<table id="header">
<tr>
	<td>
		<table width="100%">
		<tr>
			<td width="30px"></td>
			<td>
			  <div id="menu">
				  <ul id="topmenu">
					<%for(i = 0;i < stepMenu2.size();i++ ){
						Map map = (Map)stepMenu2.get(i);
						if(map.get("MENU1").toString().equals(selected_menu1)){
							
					  		//tmp_path = map.get("PTH").toString().trim();
					  		//tmp_param = map.get("PARAM").toString().trim();
					  		//tmp_pgm_id = map.get("PGM_ID").toString().trim();
					  		//tmp_menu_id = map.get("MENU_ID").toString().trim();
					  		menu2 = map.get("MENU2").toString();
					  		
					  		// 2단계 메뉴들은 title이 필요없다.
					  		
					  		/* if(tmp_path.equals("")){
					  			if(tmp_pgm_id.equals("")){
					  				tmp_path = "#";
					  				tmp_alt = "권한이 없습니다.";
					  			}else{
					  				if(tmp_param.equals("")){
					  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id;
					  				}else{
					  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id + "&" + tmp_param;
					  				}
					  				tmp_alt = tmp_path;//개발 디버깅용
					  			}
					  		} */
					  		if(selected_menu1.equals("M070000")){//시스템관리는 권한있는 것만 표시
					  			tmp_pgm_id = map.get("PGM_ID").toString().trim();
					  			if(!tmp_pgm_id.equals("")) out.println("<li><a href=\"javascript:toggleSubMenu('"+menu2+"')\" onfocus=\"blur()\">"+map.get("NM2")+"</a><span>&nbsp;&nbsp;</span></li>");
					  			
					  		}else{
					  			out.println("<li><a href=\"javascript:toggleSubMenu('"+menu2+"')\" onfocus=\"blur()\">"+map.get("NM2")+"</a><span>&nbsp;&nbsp;</span></li>");
					  		}
						}
					} 
					%>   
				  </ul>
			  </div>
			</td>
			<td align="right">
				<table id="tglobal">
				<tr>
					<td>
						<table><tr>							
							<td align="right" title="<%=user.get("SESS_SOSOK") %>">
								<div style='width:250px;height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;'>
									<img src="${ctxPath}/images/common/gm_bul.png" style="padding-top:2px;padding-right:3px;"/><strong><%=user.get("SESS_USER_NM") %></strong>[<%=user.get("SESS_SOSOK") %></div></td>
							<td>]&nbsp;</td>
						</tr></table>
					</td>
					<%for(i = 0;i < systemMenu.size();i++ ){
						Map map = (Map)systemMenu.get(i);
						
				  		tmp_path = map.get("PTH").toString().trim();
				  		tmp_param = map.get("PARAM").toString().trim();
				  		tmp_pgm_id = map.get("PGM_ID").toString().trim();
				  		tmp_menu_id = map.get("MENU_ID").toString().trim();
				  		
				  		// 시스템메뉴는 권한이 없으면 메뉴에서 나오지 않기 때문에 
				  		
				  		if(tmp_path.equals("")){
				  			if(!tmp_pgm_id.equals("")){
				  				if(tmp_param.equals("")){
				  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id;
				  				}else{
				  					tmp_path = ctxPath + (String)map.get("PGM_PTH") + "?menu_id=" + tmp_menu_id + "&" + tmp_param;
				  				}
				  				tmp_alt = "";//tmp_path;//개발 디버깅용
				  			}
				  		}
				  		
				  		if(!tmp_path.equals("#")){//권한이 없으면 시스템메뉴 표시안함
				  			
			  		 		out.println("<td><img src=\""+ctxPath+"/images/common/tm_bul17.png\"/></td>");
							out.println("<td nowrap><a href=\""+tmp_path+"\" title=\""+tmp_alt+"\" onfocus=\"blur()\">"+map.get("NM1")+"</a></td>");
							//out.println("<td><span>&nbsp;&nbsp;</span></td>");
				  		}
					} 
					//out.println("<td><img src=\""+ctxPath+"/images/common/gm_bul.png\"/></td>");
					%>	
					<td><a href="${ctxPath}/common/auth/logout.do" onfocus="blur();"><img src="${ctxPath}/images/common/btn_logout.png" border="0"/></a></td>				
				</tr>
				</table>
			</td>
		</tr>
		</table>
	</td>
</tr>
</table>

 --%>	