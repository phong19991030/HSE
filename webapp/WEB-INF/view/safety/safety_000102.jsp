<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="TOOL_ID" name="TOOL_ID" value="${DATA.TOOL_ID}">
<main id="content" class="safety-page">
	<div class="container">
		 <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="sft.sft_0001.label.detail"/></h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>
        <section class="contSection">
          <div class="content clearfix">
          	<div class="left-area">
          		<!-- approval-view -->
              <article class="approval-view">
                <div class="flexWrap">
                  <h2 class="heading4">결재라인</h2>
                  <!-- <button class="btn2 refresh-btn">
                    <span class="name">결재라인 재지정</span>
                  </button> -->
                </div>

                <ul class="approval-view--line">
                  <!-- D : li class="approval" -> "결재 승인" style is applied. -->
                  <li class="approval">
                    <p class="state">결재승인</p>
                    <div class="box">
                      <div class="info-wrap">
                        <span class="info">
                          <em class="team">윈디텍(주)</em>
                          <em class="name">장길동</em>
                          <em class="position">과장</em>
                        </span>
                        <!-- D : Badge style by approval status.
                          1. approval-badge1 기안
                          2. approval-badge2 검토
                          3. approval-badge3 결재
                        -->
                        <small class="approval-badge1">기안</small>
                      </div>
                      <!-- D : li class="approval" -> "approval-date" The markup should be added. -->
                      <p class="approval-date">
                        <em>2021.06.01</em>
                        <em>09:16</em>
                      </p>
                    </div>
                  </li>
                  <li>
                    <p class="state">결재대기</p>
                    <div class="box">
                      <div class="info-wrap">
                        <span class="info">
                          <em class="team">윈디텍(주)</em>
                          <em class="name">곽길동</em>
                          <em class="position">팀장</em>
                        </span>
                        <!-- D : Badge style by approval status.
                          1. approval-badge1 기안
                          2. approval-badge2 검토
                          3. approval-badge3 결재
                        -->
                        <small class="approval-badge2">검토</small>
                      </div>
                      <!-- D : li class="approval" -> "approval-date" The markup should be added. -->
                      <!-- <p class="approval-date">
                        <em>2021.06.01</em>
                        <em>09:16</em>
                      </p> -->
                    </div>
                  </li>
                  <li>
                    <p class="state">결재대기</p>
                    <div class="box">
                      <div class="info-wrap">
                        <span class="info">
                          <em class="team">운영사 A</em>
                          <em class="name">채길동</em>
                          <em class="position">부장</em>
                        </span>
                        <!-- D : Badge style by approval status.
                          1. approval-badge1 기안
                          2. approval-badge2 검토
                          3. approval-badge3 결재
                        -->
                        <small class="approval-badge3">결재</small>
                      </div>
                      <!-- D : li class="approval" -> "approval-date" The markup should be added. -->
                      <!-- <p class="approval-date">
                        <em>2021.06.01</em>
                        <em>09:16</em>
                      </p> -->
                    </div>
                  </li>
                </ul>
              </article>
              <!-- //approval-view -->
              
              <article class="view-form">
                <h2 class="heading4"><spring:message code="sft.sft_0001.label.content.detail"/></h2>
                <div class="base-table">
                  	<table>
                    	<caption></caption>
	                    <colgroup>
	                      <col style="width: 11%;">
	                      <col style="width: 39%;">
	                      <col style="width: 11%;">
	                      <col style="width: 39%;">
                    	</colgroup>
                    	<tbody>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.toolType"/></th>
                    			<td>${DATA.TOOL_TYPE_NAME}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.manageNo"/></th>
                    			<td>${DATA.MANAGE_NO}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.toolName"/></th>
                    			<td>${DATA.TOOL_NAME}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.standard"/></th>
                    			<td>${DATA.STANDARD}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.brandName"/></th>
                    			<td>${DATA.BRAND_NAME}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.modelName"/></th>
                    			<td>${DATA.MODEL_NAME}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.amount"/></th>
                    			<td>${DATA.AMOUNT}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.lossOrDamageAmount"/></th>
                    			<td>${DATA.LOSS_OR_DAMAGE_NAME}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.correctionDate"/></th>
                    			<td>${DATA.CORRECTION_DATE}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.renewDate"/></th>
                    			<td>${DATA.RENEW_DATE}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.imagePath"/></th>
                    			<td colspan="3">
		                          <div class="view-img-box" style="display: flex;">
		                          	<c:forEach items="${DATA.TOOL_FILES}" var="fileImg" varStatus="loop">
		                          		<c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
			                            	<img class="cls_img_${fileImg.FILE_ID}"  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
			                            	<input id="id_inpFileId" value="${fileImg.FILE_ID}" hidden="true"/>
		                          		</c:if>
			                      	</c:forEach>
		                          </div>
		                        </td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.serialNo"/></th>
                    			<td>${DATA.SERIAL_NO}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.importDate"/></th>
                    			<td>${DATA.IMPORT_DATE}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.manager"/></th>
                    			<td>${DATA.MANAGER_NAME}</td>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.importPrice"/></th>
                    			<td>${DATA.IMPORT_PRICE}</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.toolHistory"/></th>
                    			<td colspan="3">
                    				<ul class="view-equip-history-lst">
                    					<c:forEach items="${DATA.TOOL_HISTORY}" var="his" varStatus="status">
                    						<li>
				                              <span class="date">${his.HIS_DATE}</span>
				                              <em class="line"></em>
				                              <span class="txt">${his.HIS_CONTENT}</span>
				                            </li>
                    					</c:forEach>
			                        </ul>
                    			</td>
                    		</tr>
                    		<tr>
                    			<th scope="row"><spring:message code="sft.sft_0001.label.imagePath"/></th>
                    			<td colspan="3">
		                          <div class="download-box-area custom">
		                            <ul>
		                              <!-- D : If you click download-btn, li has an active. -->
		                              	<c:forEach items="${DATA.TOOL_FILES}" var="fileSpe" varStatus="loop">
		                          			<c:if test="${fileSpe.FILE_TYPE eq 'SPE'}">
				                              <li tmpFileId="${fileSpe.FILE_ID}" tmpFileNm="${fileSpe.FLE_NM}" onclick="downloadFileSpeFunc(this)"  style="cursor:pointer">
				                                <div class="file-wrap">
				                                  <span class="file-info">
				                                    <em class="name">${fileSpe.FLE_NM}</em>
				                                  </span>
				                                  <span class="bottom-info">
				                                    <em class="date">${fileSpe.FILE_INS_DATE}</em>
				                                    <em>${fileSpe.FLE_SZ}</em>
				                                  </span>
				                                </div>
				                                <button class="download-btn" tmpFileId="${fileSpe.FILE_ID}" tmpFileNm="${fileSpe.FLE_NM}" onclick="downloadFileSpeFunc(this)"></button>
				                              </li>
		                          			</c:if>
		                          		</c:forEach>
		                            </ul>
		                          </div>
		                        </td>
                    		</tr>
                    	</tbody>
                  	</table>
                 </div>
               </article>
          	</div>
          	<div class="right-area">
              <div class="right-btn-type">
                <button class="btn-style2" id="MODIFY_BTN" onclick="modifyFunc()">
                  <i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
                </button>
                <button class="btn-style5" id="DELETE_BTN" onclick="delFunc()">
                  <i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
                </button>
                <button class="btn-style4">
                  <i class="las la-print"></i><span class="name"><spring:message code="button.print" /></span>
                </button>
              </div>
            </div>
          </div>
       	</section>
	</div>
</main>

<script>
function modifyFunc(){
	var crud = "U";
	var	tool_id = "${DATA.TOOL_ID}";
	var url = CTX+'/sft/sft_0001/formManual?CRUD='+crud+'&TOOL_ID='+tool_id;
	window.location.href = url;
}

function delFunc(){
	var tool_id = $('#TOOL_ID').val();
	if(confirm("<spring:message code='message.confirmDelete'/>\n<spring:message code='message.confirmDeleteBack'/>")) {
        $.ajax({
            url : CTX + "/sft/sft_0001/delete.ajax"
            , type : 'post'
            , data : {'TOOL_ID' : tool_id}
            , cache : false
            , success : function(data) {
                var resultDelete = data.RESULT_DELETE;
            	if(resultDelete == 1) {
            		alert('<spring:message code="message.deletedSuccess"/>');
            		goList();
            	} else {
            		alert('<spring:message code="message.deletedFailed"/>');
            	}
            }
            , error : function(){
                alert('<spring:message code="message.deletedFailed"/>');
                location.reload();
                return false;
            }
        });
    }
}

function goList() {
	$(location).attr('href', CTX + '/sft/sft_0001/list');
  localStorage.removeItem("paramSearchSft0002");
}

function downloadFileSpeFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm, '_blank');
}
</script>

