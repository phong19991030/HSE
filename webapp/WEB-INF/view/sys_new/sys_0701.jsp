<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<div class="container system-wrap system-wrap1">
	
	<!-- 등록, 수정 -->
	<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
	<input type="hidden" id="NOTICE_ID" name="NOTICE_ID" value="${DATA.NOTICE_ID}">
	<input type="hidden" id="USER_UID" name="USER_UID" value="${DATA.USER_UID}">
	
	<!-- 이전 첨부파일 -->
	<!-- <input type="hidden" id="ATCH_FLE_SEQ" name="NEW_FLE_NM" value=""></input>
	<input type="hidden" id="FLE_PATH" name="FLE_PATH" value=""></input>
	<input type="hidden" id="NEW_FLE_NM" name="NEW_FLE_NM" value=""></input>
	<input type="hidden" id="FLE_NM" name="NEW_FLE_NM" value=""></input> -->
	<input type="hidden" id="PRE_ATTACH" name="PRE_ATTACH" value=""></input>
	
	<!-- 공지사항 등록 -->
	<div class="system-detail-wrap">
	  <div class="system-left">
	    <!-- 타이틀 -->
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
	    <!-- //타이틀 -->
	    
	    <!-- 등록폼 -->
	    <div class="registration-form registration-form1">
	      <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
	      	<!-- 왼쪽 등록폼 -->
	        <ul class="registration-form-lst">
	          <li class="registration-input-checkbox-wrap">
	            <span>Title<span class="red"> *</span></span>
	            <div class="registration-write">
	              <div class="input-group-wrapper">
	                <div class="input-group" style="width:600px;">
	                  <label for="noticeTitle" class="sr-only">Title</label>
	                  <input id="TITLE" type="text" name="TITLE" validation-check="required">
	                </div>
	              </div>
	              
	              <ul class="checkbox-radio-custom">
	              	<!-- 공지사항 활성화 체크박스 -->
	                <li id="ACTIVE_CHECK">
	                <c:if test="${DATA.NOTICE_SETTING == 'Y'}">
	                  <input type="checkbox" class="checkbox" checked="checked" value="${DATA.NOTICE_SETTING}" id="ACTIVE">
	                </c:if>
	                <c:if test="${DATA.NOTICE_SETTING != 'Y'}">
	                  <input type="checkbox" class="checkbox" value="${DATA.NOTICE_SETTING}" id="ACTIVE">
	                </c:if>  
	                  <label for="Active">Active</label>
	                </li>
	                
	                <!-- 공지사항 활성화시 date setting -->
	                <li class="calendar-picker" style="margin-left: -0.1px;">
<!-- 	                  <div class="calendar-check-wrap"> -->
<!-- 	                    <input type="checkbox" class="checkbox" id="noticeCalendar"> -->
<!-- 	                    <label for="noticeCalendar" class="sr-only"></label> -->
<!-- 	                  </div> -->
	                  <div class="calendar-wrap">
	                    <div class="input-group">
	                      <label for="noticeCalendarPrev" class="sr-only"></label>
	                      <input type="text" class="datepicker" id="START_DT" name="START_DT" value="" style="background-color: #dadee0;" placeholder="yyyy-mm-dd" readonly>
	                      <button class="calendar-picker-btn" id="START_DT_BTN">
	                        <i class="xi-calendar"></i>
	                      </button>
	                    </div>
	                    <em class="hyphen">
	                      <span class="sr-only">-</span>
	                    </em>
	                    <div class="input-group">
	                      <label for="noticeCalendarNext" class="sr-only"></label>
	                      <input type="text" class="datepicker" id="END_DT" name="END_DT" value="" style="background-color: #dadee0;"  placeholder="yyyy-mm-dd" readonly>
	                      <button class="calendar-picker-btn" id="END_DT_BTN">
	                        <i class="xi-calendar"></i>
	                      </button>
	                    </div> 
	                  </div>
	                </li>
	              </ul>
	            </div>
	          </li>
	          
	          <!-- 공지사항 내용 -->
	          <li class="note">
	          	<span>Content<span class="red"> *</span></span>
	            <div class="registration-write">
	            	<div class="input-group input-group-wrap">
              			<label for="CONTENT" class="sr-only">Content</label>
              			<textarea id="CONTENT" validation-check="required"></textarea>
	            	</div>
	            </div>
	          </li>
	          <li>
	          	<span>Attachment</span>
	            <div class="registration-write btn-input-wrap fake-field-file-wrap">
	              <div class="input-group">
	              	<form id="FILE_STORAGE">
	                	<div class="fake-field-file" id="FLE_NM"></div>
	                	<input id="ATCH_FILE" type="file" name="ATCH_FILE" class="field-file">
	              	</form>
	              </div>
	              <label for="ATCH_FILE" aria-label="Attach file" class="registration-search-btn">
	                <i class="xi-paperclip" title="Add file"></i>
	              </label>
	            </div>
	          </li>
	        </ul>
	      </div>
	    </div>
	  </div>
	  <div class="system-right">
	    <div class="btns" style="position:fixed; width:12%;">
	      <a id="SAVE_BTN" class="btn-style btn-style1">Save</a>
	      <a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
	    </div>
	  </div>
	</div>
	<!-- // 등록폼 -->
</div>

<script src="${ctxPath}/script/sys/sys_0701.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function(){
		sys0701();
	});
</script>