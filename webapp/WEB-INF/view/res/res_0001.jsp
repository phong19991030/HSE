<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="environ-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="res.res_0001.label.title" /></h1>
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
                  <%--<div class="item">
                    <span class="item-tit"><spring:message code="res.res_0001.label.date_search" /></span>
                    <div class="calendar-picker">
                      <div class="input-group">
                        <label class="sr-only"><spring:message code="res.res_0001.label.date_search" /></label>
                        <input id="SEARCH_CRITERIA_A" type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                        <button class="calendar-picker-btn"></button>
                      </div>
                    </div>
                  </div>
                  <!-- item -->
                  <div class="item">
                    <span class="item-tit"><spring:message code="res.res_0001.label.payment_status" /></span>
                    <div class="select-group">
                      <select id="SEARCH_CRITERIA_B" title="결재 상태">
                        <option value="">전체</option>
                      </select>
                    </div>
                  </div>--%>
                  <!-- item -->
                  <div class="item search">
                    <span class="item-tit"><spring:message code="txt.search" /></span>
                    <div class="register-write">
                      <div class="input-group">
                        <input id="SEARCH_CRITERIA_ALL" type="text" title="<spring:message code="txt.search" />" placeholder="<spring:message code="txt.search.placeholder" />" value="">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btn-wrap">
                  <div class="btn-wrap">
                    <button class="refresh-btn" id="SEARCH_RESET_BTN"><span class="sr-only"><spring:message code="button.reset"/></span></button>
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
                    <colgroup>
                      <col style="width: 5%;">
                      <col style="width: 20%;">
                      <col style="width: 20%;">
                      <col style="width: 20%;">
                      <col style="width: 20%;">
                      <col style="width: 15%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col"><spring:message code="hea.label.no"/></th>
                        <th scope="col"><spring:message code="res.res_0001.label.inspection_date" /></th>
                        <th scope="col"><spring:message code="res.res_0001.label.check_turbine" /></th>
                        <th scope="col"><spring:message code="res.res_0001.label.checker" /></th>
                        <th scope="col" class="txt-left"><spring:message code="res.res_0001.label.Checklist" /></th>
                        <th scope="col"><spring:message code="res.res_0001.label.payment_status" /></th>
                      </tr>
                    </thead>
                    <tbody id="ROW_LIST">
                      
                    </tbody>
                    <tfoot>
                      <tr class="hidden-table-bottom">
                        <td></td>
                      </tr>
                    </tfoot>
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
    
<script src="${ctxPath}/script/res/res_0001.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_CRITERIA_ALL = localParam['SEARCH_CRITERIA_ALL'];
        const SEARCH_INSPECTION_DATE = localParam['SEARCH_INSPECTION_DATE'];
        const SEARCH_PAYMENT_STATUS = localParam['SEARCH_PAYMENT_STATUS'];    
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_CRITERIA_ALL').val(SEARCH_CRITERIA_ALL);
        $('input#SEARCH_CRITERIA_A').val(SEARCH_INSPECTION_DATE);
        $('input#SEARCH_CRITERIA_B').val(SEARCH_PAYMENT_STATUS);
        _search.ALL = SEARCH_CRITERIA_ALL;
        _search.A= SEARCH_INSPECTION_DATE;
        _search.B=SEARCH_PAYMENT_STATUS;  
    }
		res_0001();
	});
</script>
    