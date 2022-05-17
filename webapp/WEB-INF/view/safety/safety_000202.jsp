<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="TOOL_GRANT_REVOKE_ID" name="TOOL_GRANT_REVOKE_ID" value="${DATA.TOOL_GRANT_REVOKE_ID}">
<main id="content" class="safety-page">
	<div class="container">
		<section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="sft.sft_000202.label.header"/></h1>
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
	              	<h2 class="heading4"><spring:message code="sft.sft_000201.label.info"/></h2>
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
			                    	<th scope="row"><spring:message code="sft.sft_0002.label.projectName"/></th>
			                    	<td colspan="3">${DATA.PROJECT_NAME }</td>
		                    	</tr>
		                    	<tr>
			                    	<th scope="row"><spring:message code="sft.sft_0002.label.grantDate"/></th>
			                    	<td>${DATA.GRANT_DATE }</td>
			                    	<th scope="row"><spring:message code="sft.sft_0002.label.expectRevokeDate"/></th>
			                    	<td>${DATA.EXPECT_REVOKE_DATE }</td>
		                    	</tr>
		                    	<tr>
			                    	<th scope="row"><spring:message code="sft.sft_0002.label.registerUser"/></th>
			                    	<td>${DATA.REGISTER_USER_NAME }</td>
			                    	<th scope="row"><spring:message code="sft.sft_0002.label.approveUser"/></th>
			                    	<td>${DATA.APPROVE_USER_NAME }</td>
		                    	</tr>
		                    	<tr>
		                    		<th scope="row"><spring:message code="sft.sft_0002.label.listTool"/></th>
		                    		<td>
		                    			<div class="base-table">
		                    				 <table>
					                         	<colgroup>
					                            	<col style="width: 10%;">
					                                <col style="width: 40%;">
					                                <col style="width: 20%;">
					                                <col style="width: 30%;">
					                             </colgroup>
					                             <thead>
					                             	<tr>
					                                	<th scope="col"><spring:message code="hea.label.no"/></th>
					                                  	<th scope="col"><spring:message code="sft.sft_000202.label.tb.tool"/></th>
					                                  	<th scope="col"><spring:message code="sft.sft_000202.label.tb.quantity"/></th>
					                                  	<th scope="col"><spring:message code="sft.sft_000202.label.tb.note"/></th>
					                                </tr>
					                             </thead>
					                             <tbody>
					                             	<c:forEach items="${DATA.TOOL_GRANT_LIST}" var="item" varStatus="status">
					                             		<tr>
						                             		<td>${status.count}</td>
						                             		<td>${item.TOOL_NAME}</td>
						                             		<td>${item.AMOUNT}</td>
						                             		<td>${item.NOTE}</td>
					                             		</tr>
					                             	</c:forEach>
					                             </tbody>
					                         </table>
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
		                <button class="btn-style4" >
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
	var	grant_id = "${DATA.TOOL_GRANT_REVOKE_ID}";
	var url = CTX+'/sft/sft_0002/formManual?CRUD='+crud+'&TOOL_GRANT_REVOKE_ID='+grant_id;
	window.location.href = url;
}

function delFunc(){
	var grant_id = $('#TOOL_GRANT_REVOKE_ID').val();
	if(confirm("<spring:message code='message.confirmDelete'/>\n<spring:message code='message.confirmDeleteBack'/>")) {
        $.ajax({
            url : CTX + "/sft/sft_0002/delete.ajax"
            , type : 'post'
            , data : {'TOOL_GRANT_REVOKE_ID' : grant_id}
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
  localStorage.removeItem("paramSearchSft0001");
}

</script>
