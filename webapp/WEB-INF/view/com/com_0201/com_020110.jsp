<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
	img { max-height:150px;}
</style>

<script type="text/javascript">

	function goList() {
		$(location).attr('href', CTX + '/com/com_0201/list');
	}

	function goUpdate() {
		var crud = "U";
		var turbine_id = "${DATA.TURBINE_ID}";
		var url = CTX+'/com/com_0201/form/newTurbine.part?CRUD='+crud+'&TURBINE_ID='+turbine_id;
		window.location.href = url;
	}

    function deleteForm() {
		var turbine_id = $('#TURBINE_ID').val();
        if(confirm("<spring:message code='message.confirmDelete'/>\n<spring:message code='message.confirmDeleteBack'/>")) {
            $.ajax({
                url : CTX + "/com/com_0201/deleteTurbine.ajax"
                , type : 'post'
                , data : {'TURBINE_ID' : turbine_id}
                , cache : false
                , success : function(data, textStatus, jqXHR) {
                    alert('<spring:message code="message.deletedSuccess"/>');
                    goList();
                }
                , error : function(){
                    alert('<spring:message code="message.deletedFailed"/>');
                    location.reload();
                    return false;
                }
            });
        }
    }
		
</script>
<input type="hidden" id="TURBINE_ID" name="TURBINE_ID" value="${DATA.TURBINE_ID}">

<main id="content" class="general-page">
	<div class="container">
	  <section class="hdSection">
	    <!-- tit-wrap -->
	    <div class="tit-wrap">
	      <div class="tit-left">
	        <h1 class="heading1"><spring:message code="com.com0201.label.form.detail"/></h1>
	      </div>
	    </div>
	    <!-- //tit-wrap -->
	  </section>
	  <section class="contSection">
	    <div class="content clearfix">
	
	      <!-- left area -->
	      <div class="left-area">
	        <!-- approval-view -->
	        <article class="approval-view">
	          <div class="flexWrap">
	            <h2 class="heading4">결재라인</h2>
	            <button class="btn2 refresh-btn">
	              <span class="name">결재라인 재지정</span>
	            </button>
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
	                    <em class="position">엔지니어</em>
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
	                    <em class="position">선임연구원</em>
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
	                    <em class="name">김길동</em>
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
	                    <em class="name">이길동</em>
	                    <em class="position">대표</em>
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
	
	        <article class="view-form">
	          <h2 class="heading4"><spring:message code="com.com0201.label.form.sub.title"/></h2>
	
	          <div class="base-table">
	            <table>
	              <caption></caption>
	              <colgroup>
	                <col style="width: 11%;">
	                <col style="width: 89%;">
	              </colgroup>
	              <tbody>
	                <tr>
	                  <th scope="row"><spring:message code="com.com0201.label.turbine.name"/></th>
	                  <td>${DATA.TURBINE_NAME }</td>
	                </tr>
	                <tr>
	                  <th scope="row"><spring:message code="com.com0201.label.turbine.no"/></th>
	                  <td>${DATA.TURBINE_NO }</td>
	                </tr>
	                <tr>
	                  <th scope="row"><spring:message code="com.com0201.label.turbine.model"/></th>
	                  <td>${DATA.TURBINE_MODEL}</td>
	                </tr>
	                <tr>
	                  <th scope="row"><spring:message code="com.com0201.label.turbine.year"/></th>
	                  <td>${DATA.INSTALL_YEAR }</td>
	                </tr>
	                <tr>
	                  <th scope="row"><spring:message code="com.com0201.label.turbine.rate"/></th>
	                  <td>${DATA.USE_RATE}%</td>
	                </tr>
	                <tr>
	                  <th scope="row"><spring:message code="com.com0201.label.turbine.status"/></th>
	                  <td>${DATA.STATUS_NM}</td>
	                </tr>
	              </tbody>
	            </table>
	          </div>
	        </article>
	      </div>
	      <!-- // left area -->
	      <!-- right area -->
	      <div class="right-area">
	        <div class="right-btn-type">
	          <button onclick="goUpdate()" class="btn-style2">
	            <i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
	          </button>
	          <button  onclick="deleteForm()" class="btn-style5">
	            <i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
	          </button>
	          <button class="btn-style4">
	            <i class="las la-print"></i><span class="name"><spring:message code="button.print" /></span>
	          </button>
	        </div>
	      </div>
	      <!-- // right area -->
	    </div>
	  </section>
	</div>
</main>
