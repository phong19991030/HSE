<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
.img {display:block;width:100%;height:70px;position:relative;}
.img img {width:100%;height:100%;object-fit:scale-down;}
</style>

<input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input>
<input type="hidden" id="ATCH_FLE_SEQ" name="ATCH_FLE_SEQ" value=""></input>
<input type="hidden" id="FLE_PATH" name="FLE_PATH" value=""></input>
<input type="hidden" id="NEW_FLE_NM" name="NEW_FLE_NM" value=""></input>

<div class="container system-wrap system-wrap1">

	<!-- 조직 관리 상세정보 페이지 -->
	<div class="system-detail-wrap">
		<div class="system-left">
		
		    <!--타이틀-->
		    <div class="tit-wrap">
		      <h2 class="heading3">
		        <span class="txt">Detail</span>
		        <!-- <span class="version">V47</span> -->
		      </h2>
		      <ul class="location">
		        <li>SYSTEM</li>
		        <li class="bold">Organization management</li>
		      </ul>
		    </div>
		    <!--//타이틀-->
		    
		    <!-- 상세폼 -->
		    <div class="registration-form registration-form1">
		      <div class="registration-form-lst-wrap">
		      	<!-- 왼쪽 상세폼 -->
		        <ul class="registration-form-lst">
		          <li>
		            <span>Name</span>
		            <div class="registration-write">
		              <span id="COMPANY_NM"></span>
		            </div>
		          </li>
		          <li>
		            <span>Classification</span>
		            <div class="registration-write">
		              <span id="CLS"></span>
		            </div>
		          </li>
		        </ul>
				<!-- 왼쪽 상세폼 -->
				
				<!-- 오른쪽 상세폼 -->
		        <ul class="registration-form-lst">
		          <li>
		            <span>Organization Address</span>
		            <div class="registration-write">
		              <span id="ADDRESS"></span>
		            </div>
		          </li>
		          <li style="display:none;">
		         	<span>Logo</span>
		         	<div class="registration-write img">
		         		<img id="LOGO_VIEW" src="${ctxPath}/img/sub/login_logo.png">
		         	</div>
		          </li>
		          <li class="note">
		            <span>Description</span>
		            <div class="registration-write change-line">
		              <span id="DESCRIPTION"></span>
		            </div>
		          </li>
		        </ul>
		        <!-- 오른쪽 상세폼 -->
		      </div>
		    </div>
		    <!-- // 상세폼 -->
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
<script src="${ctxPath}/script/sys/sys_0502.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	$(document).ready(function(){
		sys0502();		
	});
</script>