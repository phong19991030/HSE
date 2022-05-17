<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<main id="content" class="work-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="license.tsk_0300.label.title" /></h1>
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

              <div class="risk-list-area">
                <!-- fixed-search-form -->
                <div class="fixed-search-form">
                  <div class="flex-wrap">
                    <!-- item -->
                    <div class="item search">
                      <span class="item-tit"><spring:message code="license.tsk_0300.label.search" /></span>
                      <div class="select-group">
                        <select id="SEARCH_RA_KEYWORD" title="SEARCH_RA_KEYWORD">
                          <option value=""><spring:message code="license.tsk_0300.label.search.option.all" /></option>
                          <c:forEach items="${riskAssessments}" var="item" varStatus="loop">
                            <option value="${item.COMM_CD }">${item.COMM_NM}</option>
                          </c:forEach>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="btn-wrap">
                    <button class="refresh-btn" id="SEARCH_RESET_BTN"><span class="sr-only"><spring:message code="button.reset"/></span></button>
                    <button class="search-btn" id="SEARCH_BTN"><spring:message code="common.button.label.search"/></button>
                  </div>
                </div>
                <!-- // fixed-search-form -->

                <!--  update-txt-->
                <strong class="update-txt">
                  <span class="sub-txt1">'<spring:message code="license.tsk_0300.label.subtxt1a" />'</span> <spring:message code="license.tsk_0300.label.subtxt1b" />
                  <span class="sub-txt2"><span id="TOTAL_CNT"></span><spring:message code="license.tsk_0300.label.subtxt2a" /></span><spring:message code="license.tsk_0300.label.subtxt2b" />
                </strong>

                <!-- table-->
                <article class="view-form">
                  <div class="base-table custom-table4 center-table">
                    <table>
                      <caption></caption>
                      <colgroup>
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 9%;">
                        <col style="width: 22%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 22%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col"><spring:message code="license.tsk_0300.label.SPRA" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.Windchill_source_ID" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.work" /></th>
                          <th scope="col" class="txt-left"><spring:message code="license.tsk_0300.label.Potential_Hazard" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.frequency_L" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.result_C" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.risk" /></th>
                          <th scope="col" class="txt-left"><spring:message code="license.tsk_0300.label.Potential_Hazard" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.frequency_L" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.result_C" /></th>
                          <th scope="col"><spring:message code="license.tsk_0300.label.risk" /></th>
                        </tr>
                      </thead>
                      <tbody id="ROW_LIST">
                       
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
              <!-- <div class="table-foot-area">
                <div class="sort-length">
                  <div class="select-group">
                    <select id="PAGE_SIZE" class="select" title="한 페이지에 표시할 행 설정">
                      <option selected>10
                        <spring:message code="pcs.keyword" />
                      </option>
                      <option>20
                        <spring:message code="pcs.keyword" />
                      </option>
                      <option>30
                        <spring:message code="pcs.keyword" />
                      </option>
                    </select>
                  </div>
                </div>
                <div id="PAGENATION" class="pager">
                  <a id="FST_PAGE" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
                  <a id="PRE_PAGE" href="javascript:void(0);" class="arr prev">&lt;</a>
              
                  <a id="NXT_PAGE" href="javascript:void(0);" class="arr next">&gt;</a>
                  <a id="LST_PAGE" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
                </div>
              </div> -->
            </div>
          </div>
        </section>
      </div>
      
    </main>
    
    <script src="${ctxPath}/script/license/tsk_300.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	$(document).ready(function() {
		tsk_0300();
});
</script>
