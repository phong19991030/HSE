<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/rsa.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/rng.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/common.js"></script>

<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1"><spring:message code="sft.sft_0700.label.list" /></h1>
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
                <span class="item-tit"><spring:message code="sft.sft_0700.label.patrol_date" /></span>
                <div class="calendar-picker">
                  <div class="first-date">
                    <div class="input-group">
                      <label class="sr-only">처음날짜</label>
                      <input type="text" id="SEARCH_START_TIME" title="처음날짜설정" class="datepicker" placeholder="YYYY-MM-DD" readonly>
                      <button class="calendar-picker-btn"></button>
                    </div>
                    <!-- <div class="input-group time">
                      <label class="sr-only">처음시간</label>
                      <input type="text" title="처음시간설정" class="date-time-picker" placeholder="00:00" readonly>
                      <button class="calendar-picker-btn"></button>
                    </div> -->
                  </div>
                  <div class="last-date">
                    <div class="input-group">
                      <label class="sr-only">마지막날짜</label>
                      <input type="text" id="SEARCH_END_TIME" title="마지막날짜설정" class="datepicker" placeholder="YYYY-MM-DD" readonly>
                      <button class="calendar-picker-btn"></button>
                    </div>
                    <!-- <div class="input-group time">
                      <label class="sr-only">마지막시간</label>
                      <input type="text" title="마지막시간설정" class="date-time-picker" placeholder="00:00" readonly>
                      <button class="calendar-picker-btn"></button>
                    </div> -->
                  </div>
                </div>
              </div>
              <!-- item -->
              <div class="item">
                <span class="item-tit"><spring:message code="sft.sft_0700.label.check_status" /></span>
                <div class="select-group">
                  <select id="SEARCH_CRITERIA_A" title="안전 점검자">
                    <option value=""><spring:message code="res.res_0002.label.option.ALL" /></option>

                  </select>
                </div>
              </div>
              <!-- item -->
              <div class="item">
                <span class="item-tit"><spring:message code="res.res_0001.label.payment_status" /></span>
                <div class="select-group">
                  <select id="SEARCH_PAYMENT_STATUS" title="결재 상태">
                    <option value=""><spring:message code="res.res_0002.label.option.ALL" /></option>
                  </select>
                </div>
              </div>--%>
              <!-- item -->
              <div class="item search">
                <span class="item-tit"><spring:message code="txt.search" /></span>
                <div class="register-write">
                  <div class="input-group">
                    <input type="text" id="SEARCH_CRITERIA_ALL" title="통합검색" placeholder="<spring:message code="txt.search.placeholder" />">
                  </div>
                </div>
              </div>
            </div>            
            <div class="btn-wrap">
              <div class="btn-wrap">
                <button class="refresh-btn" id="SEARCH_RESET_BTN"><span class="sr-only">새로고침</span></button>
                <button class="search-btn" id="SEARCH_BTN"><spring:message code="common.button.label.search"/></button>
              </div>
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
                <caption></caption>
                <colgroup>
                  <col style="width: 8%;">
                  <col style="width: 20%;">
                  <col style="width: 10%;">
                  <col style="width: 10%;">
                  <col style="width: 11%;">
                  <col style="width: 8%;">
                  <col style="width: 8%;">
                  <col style="width: 8%;">
                  <col style="width: 8%;">
                  <col style="width: 8%;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"><spring:message code="hea.label.no"/></th>
                    <th scope="col" class="txt-left"><spring:message code="sft.sft_0700.label.Project_name" /></th>
                    <th scope="col">문서번호</th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.safety_checker" /></th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.patrol_date" /></th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.general_management" /></th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.health_care" /></th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.safety_management" /></th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.task_management" /></th>
                    <th scope="col"><spring:message code="sft.sft_0700.label.environmental_management" /></th>
                  </tr>
                </thead>
                <tbody id='ROW_LIST'>
                 
              </table>
            </div>
            <!-- //table -->

            <!-- table-foot-area -->
            <div class="table-foot-area">
              <!-- 정렬 -->
              <div class="sort-length">
                <div class="select-group">
                  <select class="select" title="한 페이지에 표시할 행 설정" id="PAGE_SIZE">
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
              <a href="javascript:void(0);" id="PRE_PAGE" class="arr prev">
                <span class="sr-only">이전</span>
              </a> <a href="javascript:void(0);" id="NXT_PAGE" class="arr next">
                <span class="sr-only">다음</span>
              </a>
              </div>
              <!-- foot btn -->
              <div class="foot-btn">
                <button id="REGISTER_BTN" class="btn-style1">
                  <i class="las la-edit"></i><span class="name"><spring:message code="button.register"/></span>
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
<script src="${ctxPath}/script/safety/safety_0700.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>
<script>
  var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_CRITERIA_ALL = localParam['SEARCH_CRITERIA_ALL'];
        const SEARCH_STATUS = localParam['SEARCH_STATUS'];
        const SEARCH_START_TIME = localParam['SEARCH_START_TIME'];
        const SEARCH_END_TIME = localParam['SEARCH_END_TIME'];
        const SEARCH_PAYMENT_STATUS = localParam['SEARCH_PAYMENT_STATUS'];        
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_CRITERIA_ALL').val(SEARCH_CRITERIA_ALL);
        $('input#SEARCH_STATUS').val(SEARCH_STATUS);
        $('input#SEARCH_START_TIME').val(SEARCH_START_TIME);
        $('input#SEARCH_END_TIME').val(SEARCH_END_TIME);
        $('select#SEARCH_PAYMENT_STATUS').val(SEARCH_PAYMENT_STATUS);
        _search.ALL = SEARCH_CRITERIA_ALL;
        _search.A= SEARCH_STATUS;
        _search.B=SEARCH_START_TIME;  
        _search.C=SEARCH_END_TIME;  
        _search.D=SEARCH_PAYMENT_STATUS;  
    }
		safety_0700();
	});
</script>