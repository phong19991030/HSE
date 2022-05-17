<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
	.notDownload { cursor: not-allowed; }
	td { text-overflow:ellipsis; overflow:hidden; white-space:nowrap; }
	span.detail-search-keyword{line-height:3;}
</style>

<main id="content" class="work-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="license.tsk_0100.label.subTittleList" /></h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>

        <!-- D : contSection border /
          1. tab : border (If you have a tap, please add this.)
          2. no tab : unborder  add (border-top disappears.)
           -->
        <section class="contSection unborder">
          <div class="content">
            <div class="content-body">

              <!-- fixed-search-form -->
              <div class="fixed-search-form">
                <div class="flex-wrap">
                  <!-- item -->
                  <%--<div class="item">
                    <span class="item-tit"><spring:message code="license.tsk_0100.label.WhetherRiskAssessmentIsPerformed" /></span>
                    <div class="select-group">
                      <select title="구분" id='id_search_risk_assessment'>
				          <option value="">내용</option>
				          <c:forEach items="${riskAssessments}" var="type" varStatus="loop">
				          	<option value="${type.COMM_NM}">${type.COMM_NM}</option>
				          </c:forEach>
			          </select>
                    </div>
                  </div>
                  <!-- item -->
                  <div class="item">
                    <span class="item-tit"><spring:message code="license.tsk_0100.label.workingDate" /></span>
                    <div class="calendar-picker">
		                          <div class="first-date">
		                            <div class="input-group">
		                              <label class="sr-only">처음날짜</label>
		                              <input id='id_search_first_date' type="text" title="처음날짜설정" class="datepicker" placeholder="YYYY-MM-DD" readonly>
		                              <button class="calendar-picker-btn"></button>
		                            </div>
		                          </div>
		                          <div class="last-date">
		                            <div class="input-group">
		                              <label class="sr-only">처음날짜</label>
		                              <input id='id_search_last_date' type="text" title="마지막날짜설정" class="datepicker" placeholder="YYYY-MM-DD" readonly>
		                              <button class="calendar-picker-btn"></button>
		                            </div>
		                          </div>
			                    </div>
                  </div>
                  <!-- item -->
                  <div class="item">
                    <span class="item-tit"><spring:message code="license.tsk_0100.label.workClassification" /></span>
                    <div class="select-group">
                      <select title="구분" id='id_search_work_type'>
			                     	<option value="">내용</option>
			                      	<c:forEach items="${workTypes}" var="type" varStatus="loop">
			                      		<option value="${type.COMM_NM}">${type.COMM_NM}</option>
			                      	</c:forEach>
			                      </select>
                    </div>
                  </div>
                  <!-- item -->
                  <div class="item">
                    <span class="item-tit"><spring:message code="license.tsk_0100.label.paymentStatus" /></span>
                    <div class="select-group">
                      <select title="결재 상태">
                        <option value="">전체</option>
                      </select>
                    </div>
                  </div>--%>
                  <!-- item -->
                  <div class="item search">
                    <span class="item-tit"><spring:message code="license.tsk_0100.label.Search" /></span>
                    <div class="register-write">
                      <div class="input-group">
                        <input type="text" title="통합검색" placeholder="내용을 입력하세요" id='id_search_txt'>
                      </div>
                    </div>
                  </div>
                </div>
               
                <div class="btn-wrap">
		                  	<button id="SEARCH_RESET_BTN" class="refresh-btn"><span class="sr-only"><spring:message code="refresh.keyword" /></span></button>
				            <button id="SEARCH_BTN" class="search-btn"><spring:message code="search.keyword" /></button>
				</div>
              </div>
              <!-- // fixed-search-form -->

              <!-- D : list-form (목록폼)
                1. After setting the width value on the colgroup,
                2. Please cover all the text in td with a <p> tag (ellipsis) -->
              <article class="list-form">
                <!-- table -->
                <div class="base-table center-table">
                  <table>
                    <colgroup>
                      <col style="width: 5%;">
                      <col style="width: 24%;">
                      <col style="width: 9%;">
                      <col style="width: 14%;">
                      <col style="width: 10%;">
                      <col style="width: 10%;">
                      <col style="width: 5%;">
                      <col style="width: 9%;">
                      <col style="width: 8%;">
                      <col style="width: 6%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col"><spring:message code="license.tsk_0100.label.no" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.ProjectName" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.docNo" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.workDate" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.workDetail" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.responsible" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.Participants" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.MaterialsAndConsumables" /></th>
                        <%-- <th scope="col"><spring:message code="license.tsk_0100.label.riskAssessment" /></th> --%>
                        <th scope="col"><spring:message code="license.tsk_0100.label.workClassification" /></th>
                        <th scope="col"><spring:message code="license.tsk_0100.label.documentStatus" /></th>
                      </tr>
                    </thead>
                    <tbody id="ROW_LIST">
                      
                    </tbody>
                    <tfoot>
                      <tr class="hidden-table-bottom">
                        <td></td>
                      </tr>
                    </tfoot>
                    
                    <c:set var="msg_and"><spring:message code="txt.and"/></c:set>
					<input id="id_msg_and" type="hidden" value="${msg_and}"/>
					<c:set var="msg_other"><spring:message code="txt.other"/></c:set>
					<input id="id_msg_other" type="hidden" value="${msg_other}"/>
                  </table>
                </div>
                <!-- //table -->

                <!-- table-foot-area -->
                <div class="table-foot-area">
							<div class="sort-length">
								<div class="select-group">
									<select id="PAGE_SIZE" class="select" title="한 페이지에 표시할 행 설정">
										<option value="10" selected>10
											<spring:message code="pcs.keyword" /></option>
										<option value="20">20
											<spring:message code="pcs.keyword" /></option>
										<option value="30">30
											<spring:message code="pcs.keyword" /></option>
									</select>
								</div>
							</div>
							<!-- pager -->
							<div id="PAGENATION" class="pager">
								<a id="FST_PAGE" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
								<a id="PRE_PAGE" href="javascript:void(0);" class="arr prev">&lt;</a>

								<a id="NXT_PAGE" href="javascript:void(0);" class="arr next">&gt;</a>
								<a id="LST_PAGE" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
							</div>

							<!-- foot btn -->
							<div class="foot-btn">
								<button id="REGISTER_BTN" class="btn-style1">
									<i class="las la-edit"></i><span class="name"><spring:message
											code="button.register" /></span>
								</button>
							</div>
						</div>
                <!-- //table-foot-area -->
              </article>
            </div>

          </div>
      </section>
   </div>
</main>
<script src="${ctxPath}/script/license/tsk_0100.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
  var page = 1;
	$(document).ready(function() {
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const id_search_work_type = localParam['WORK_TYPE'];
        const id_search_risk_assessment = localParam['RISK_ASSESSMENT'];
        const id_search_first_date = localParam['SEARCH_FIRST_DT'];        
        const id_search_last_date = localParam['SEARCH_LAST_DT'];        
        const id_search_payment = localParam['payment'];        
        const id_search_txt = localParam['all'];        
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";
        
        $('select#PAGE_SIZE').val(pageSize);
        $('select#id_search_work_type').val(id_search_work_type);
        $('select#id_search_risk_assessment').val(id_search_risk_assessment);
        $('input#id_search_first_date').val(id_search_first_date);
        $('input#id_search_last_date').val(id_search_last_date);
        $('select#id_search_payment').val(id_search_payment);
        $('input#id_search_txt').val(id_search_txt);
    }
		tsk_0100();
	});
</script>