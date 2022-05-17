<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
/* .registration-search-btn{background:#1d41cc !important;border-color:#1d41cc !important;color:#fff !important;} */
/* .registration-search-btn:hover{background:#f4f5f7 !important;border-color:#1d41cc !important;color:#1d41cc !important;} */
div.img {display:inline-block;width:calc(100%-102px);height:70px;position:relative;}
.img img {width:100%;height:100%;object-fit:scale-down;}
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input>
<input type="hidden" id="FLE_PATH" name="FLE_PATH" value=""></input>
<input type="hidden" id="NEW_FLE_NM" name="NEW_FLE_NM" value=""></input>

<div class="container system-wrap system-wrap1">
	<!-- 조직 등록 페이지 -->
	<div class="system-detail-wrap">
	  <div class="system-left">
	  
	    <!--타이틀-->
	   <div class="tit-wrap">
	     <h2 class="heading3">
	       <span class="txt">${PAGE_TITLE}</span>
	     </h2>
	     <ul class="location">
	       <li>SYSTEM</li>
	       <li class="bold">Organization management</li>
	     </ul>
	   </div>
	   <!--//타이틀-->
	   
	   <!-- 등록폼 -->
	   <div class="registration-form registration-form1">
	     <div class="registration-form-lst-wrap">
	     <!-- 왼쪽 등록폼 -->
	       <ul class="registration-form-lst">
	         <li>
	           <span>Name<span class="red"> *</span></span>
	           <div class="registration-write">
	             <div class="input-group">
	               <label for="COMPANY_NM" class="sr-only"></label>
	               <input type="text" id="COMPANY_NM" validation-check="required" maxlength="15">
	             </div>
	           </div>
	         </li>
	         <li>
	           <span>Classification<span class="red"> *</span></span>
	           <div class="registration-write">
	             <div class="input-group">
	                <div class="select-box">
	                    <label for="CLS"># Classification</label>
                    	<select id="CLS" class="info-select" validation-check="required">
                      		<option value=""># Classification</option>
							<option value="1">Operator</option>
	                  		<option value="2">Manufacturer</option>
	                  		<option value="3">Isp</option>
	                  		<option value="4">WF Consulting</option>
                    	</select>
	                  </div>
	             </div>
	           </div>
	         </li>
	       </ul>
		   <!--  //왼쪽 등록폼 -->
		   
		   <!-- 오른쪽 등록폼 -->
	       <ul class="registration-form-lst">
	         <li>
	           <span>Organization Address</span>
	           <div class="registration-write">
	             <div class="input-group">
	               <label for="ADDRESS" class="sr-only">Address</label>
	               <input type="text" id="ADDRESS">
	             </div>
	           </div>
	         </li>
	         <li>
	           <span>Logo<span class="red"> *</span></span>
	           <div class="registration-write btn-input-wrap fake-field-file-wrap">
	             <div class="input-group">
	               <form id="fileStorage" style="height:34px;">
	               	 <div class="fake-field-file"></div>
	               	 <input type="file" id="LOGO" name="LOGO" class="field-file" accept=".jpg,.jpeg,.png" validation-check="required">
	               </form>
	             </div>
	             <label for="LOGO" class="registration-search-btn">
	               <i class="xi-paperclip" title="Add file"></i>
	             </label>
	           </div>
	         </li>
	         <li style="display:none;">
	         	<span>Logo View</span>
	         	<div class="registration-write img">
	         		<img id="LOGO_VIEW" src="${ctxPath}/img/sub/login_logo.png">
	         	</div>
	         </li>
	         <li class="note">
	           <span>Description</span>
	           <div class="registration-write">
	           	 <div class="input-group input-group-wrap">
					<label for="DESCRIPTION" class="sr-only">Description</label>
					<textarea id="DESCRIPTION" maxlength="200" placeholder="You can type up to 200 characters."></textarea>
				</div>
	           </div>
	         </li>
	       </ul>
		   <!-- //오른쪽 등록폼 -->
	     </div>
	   </div>
	   <!-- //등록폼 -->
	  </div>
	  
	  <!-- 버튼 모음 -->
	  <div class="system-right">
      <div class="btns" style="position:fixed; width:12%;">
        <a href="javascript:void(0)" id="SAVE_BTN" class="btn-style btn-style1">Save</a>
        <a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
      </div>
    </div>
	  <!-- //버튼 모음 -->
	</div>
	<!-- //조직 등록 -->
</div>

<!-- 스크립트 -->	
<script src="${ctxPath}/script/sys/sys_0501.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	$(document).ready(function(){
		sys0501();		
	});
</script>