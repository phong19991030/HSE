<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.btns {margin: 10px 0 0 0;}

.system-detail-wrap .registration-form-lst > li > span {
    width: 115px !important;
   
}
.hidden{
    display: none;
}

</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="DOC_ID" name="DOC_ID" value="${DATA.DOC_ID}"></input>


<div class="container system-wrap system-wrap1">
	<!-- 사용자 등록 페이지 -->
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
	    		<li class="bold">Document Management</li>
	  		</ul>
		</div>
		<!--//타이틀-->
		
		<!-- 등록폼 -->
		<div class="registration-form registration-form1">
		  <div class="registration-form-lst-wrap">
		  <!-- 왼쪽 등록폼 -->
		    <ul class="registration-form-lst">
		      <li>
		        <span>Document Group<span class="red"> *</span></span>
		        <div class="registration-write">
		          <div class="input-group">
		            <label for="DOC_GROUP" class="sr-only">Document Group</label>
		            <input type="text" id="DOC_GROUP" validation-check="required" maxlength="20">
		          </div>
		        </div>
		      </li>
		      <li>
		        <span>Document Name<span class="red"> *</span></span>
		        <div class="registration-write">
		          <div class="input-group">
		            <label for="DOC_NAME" class="sr-only">Document Name</label>
		            <input type="text" id="DOC_NAME" validation-check="required" maxlength="500">
		          </div>
		        </div>
		      </li>
		      <li>
		        <span>File<span class="red"> *</span></span>
		        <div class="registration-write btn-input-wrap">
		          <div class="input-group">
		            <label for="FILE_ID" class="sr-only">File</label>
		            <input type="text" id="FILE_ID" placeholder="Select File"  readonly>
                    <input id="file-input" type="file" onchange='getFilename(this)' name="doc_file" style="display: none;" />
		          </div>
		          <button id="DOC_SELECT_ID" type="button" class="input-btn btn-style1">Select</button>
		        </div>
		      </li>
		     
		    </ul>
			<!-- //왼쪽 등록폼 -->
			
			
			<!-- // 오른쪽 등록폼 -->
		  </div>
		</div>
		<!-- // 등록폼 -->
	  </div>
	  
	  <!-- 버튼 모음 -->
	  <div class="system-right">
	    <div class="btns" style="position:fixed; width:12%;">
	    	<a href="javascript:void(0)" id="SAVE_BTN" class="btn-style btn-style1">Save</a>
	    	<a href="javascript:void(0)" id="DOWLOAD_FILE" class="btn-style btn-style1 hidden">Dowload file</a>

	      	<span id="DELETE_BTN" class="btn-style btn-style3 hidden">Delete</span>

        	<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
	    </div>
	  </div>
	  <!-- //버튼 모음 -->
	</div>
	<!-- // 사용자 등록 -->
	</div>



<!-- 스크립트 -->	
<script src="${ctxPath}/script/sys/sys_doc_register.js"></script>
<!-- <script src="${ctxPath}/js/files-upload.js"></script> -->

<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() { 
		sysDocRegister();
	});
</script>



