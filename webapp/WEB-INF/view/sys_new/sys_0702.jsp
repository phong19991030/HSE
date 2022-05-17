<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<div class="container system-wrap system-wrap1">
	
	<input type="hidden" id="NOTICE_ID" name="NOTICE_ID" value="${DATA.NOTICE_ID}"></input>
	<input type="hidden" id="ATCH_FLE_SEQ" name="ATCH_FLE_SEQ" value=""></input>
	<input type="hidden" id="FLE_PATH" name="FLE_PATH" value=""></input>
	<input type="hidden" id="NEW_FLE_NM" name="NEW_FLE_NM" value=""></input>
	<input type="hidden" id="FLE_NM" name="FLE_NM" value=""></input>

	<div class="system-detail-wrap">
	    <div class="system-left">
	    
	    <!--타이틀-->
		<div class="tit-wrap">
		  <h2 class="heading3">
		    <span class="txt">${PAGE_TITLE}</span>
		    <!-- <span class="version">V47</span> -->
		  </h2>
		  <ul class="location">
		    <li>SYSTEM</li>
		    <li class="bold">Notice Management</li>
		  </ul>
		</div>
		<!--//타이틀--> 
		
		<!-- 상세폼 -->
	   <div class="view-page-wrap">
	   		<!-- 제목 -->
			<div class="view-tit">
				<strong id="TITLE"></strong>
<%--                 <c:if test="${DATA.PERIOD_YN == 'Y'}"> --%>
<!-- 					<ul class="view-side"> -->
<!-- 						<li id="START_DT"></li> -->
<!-- 						<li id="END_DT"></li> -->
<!-- 						<li id="INSTITUTION"></li> -->
<!-- 					</ul> -->
<%-- 				</c:if> --%>
			</div>
			<!-- //제목 -->
			
			<!-- 등록일자 or 수정일자 , 등록자 -->
			<div class="veiw-cont-wrap">
				<div class="veiw-cont-side">
					<span id="INS_DT"></span>
					<span id="REGISTER"></span>
				</div>
				
				<div class="veiw-cont">
					<div style="clear:left;">
						<span id="CONTENT" style="word-break: break-all;"></span>
					</div>
				</div>
			</div>
			<!-- //등록일자 or 수정일자 , 등록자 -->
			
			<!-- 첨부파일 -->
			<div>
				<ul id="ATCH_LIST" class="attach-lst">
<%-- 					<c:if test="${DATA.NEW_FLE_NM != '' }"> --%>
<!-- 						<li class="file"> -->
<!-- 							<a> -->
<!-- 								<span id="ATCH_FILE" class="file-name" style="cursor: pointer;"> -->
<!-- 									<em class="download-btn"  style="cursor:pointer;"> -->
<%-- 										<input type="hidden" id="new_fle_nm" value="${DATA.NEW_FLE_NM}"/> --%>
<!-- 									</em> -->
<!-- 									<em id="FILE_NM"></em> -->
<!-- 								</span> -->
<!-- 							</a> -->
<!-- 						</li> -->
<%-- 					</c:if> --%>
				</ul>
			</div>
			<!-- //첨부파일 -->
	    </div>
	    <!-- //상세폼 -->
	  </div>
	  
	  <!-- 버튼 모음 -->
	  <div class="system-right">
	    <div class="btns" style="position:fixed; width:12%;">
	      	<span id="MODIFY_BTN" class="btn-style btn-style1">Modify</span>
			<span id="DELETE_BTN" class="btn-style btn-style3">Delete</span>
			<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
	    </div>
	  </div>
	</div>
</div>

<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0702.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	$(document).ready(function(){
		sys0702();
	});
</script>