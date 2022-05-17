<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ include file="/WEB-INF/_include/taglib.jsp" %>

    <main id="content" class="general-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">
                <spring:message code="sft.sft_0200.label.tittle" />
              </h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>

        <section class="contSection unborder">
          <div class="content">
            <div class="content-body">
              <!-- fixed-search-form -->
              <div class="fixed-search-form">
                <div class="flex-wrap">
                  <%--<div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0200.label.WORK_TYPE" />
                    </span>
                    <div class="select-group">
                      <select title="작업 분류" id="id_search_work_type">
                        <option value="">전체</option>
                        <c:forEach items="${workTypes}" var="type" varStatus="loop">
                          <option value="${type.COMM_NM}">${type.COMM_NM}</option>
                        </c:forEach>
                      </select>
                    </div>
                  </div>
                  <div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0200.label.COURSE_DATE" />
                    </span>
                    <div class="calendar-picker">
                      <div class="first-date">
                        <div class="input-group">
                          <label class="sr-only">처음날짜</label>
                          <input type="text" id="id_search_course_first_date" title="처음날짜설정" class="datepicker"
                            placeholder="YYYY-MM-DD" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <div class="last-date">
                        <div class="input-group">
                          <label class="sr-only">처음날짜</label>
                          <input type="text" id="id_search_course_last_date" title="마지막날짜설정" class="datepicker"
                            placeholder="YYYY-MM-DD" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0200.label.payment" />
                    </span>
                    <div class="select-group">
                      <select title="교육 진행자" id="id_search_payment">
                        <option value="">전체</option>
                        <option value="zxc">zxc</option>
                        <!-- <c:forEach items="${users}" var="user" varStatus="loop">
                          <option value="${user.USER_NM}">${user.USER_NM}</option>
                          </c:forEach> -->
                      </select>
                    </div>
                  </div>--%>
                  <div class="item search">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0200.label.SEARCH_ALL" />
                    </span>
                    <div class="register-write">
                      <div class="input-group">
                        <input type="text" id="id_search_txt" placeholder="<spring:message code="txt.search.placeholder"/>">
                      </div>
                    </div>
                  </div>

                  <div class="btn-wrap">
                    <button id="SEARCH_RESET_BTN" class="refresh-btn">
                      <span class="sr-only">
                        <spring:message code="refresh.keyword" />
                      </span>
                    </button>
                    <button id="SEARCH_BTN" class="search-btn">
                      <spring:message code="search.keyword" />
                    </button>
                  </div>
                </div>
              </div>

              <article class="list-form">
                <div class="base-table center-table">
                  <table>
                    <caption></caption>
                    <colgroup>
                      <col style="width: 3%;">
                      <col style="width: 10%;">
                      <col style="width: 37%;">
                      <col style="width: 10%;">
                      <col style="width: 10%;">
                      <col style="width: 10%;">
                      <col style="width: 10%;">
                      <col style="width: 10%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">
                          <spring:message code="com.com_0101.label.no" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.DOC_NO" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.PROJECT_NAME" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.WORK_TYPE" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.COURSE_DATE" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.PLACE" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.TRAINER" />
                        </th>
                        <th scope="col">
                          <spring:message code="sft.sft_0200.label.TRAINEE" />
                        </th>
                      </tr>
                    </thead>
                    <tbody id="ROW_LIST">

                    </tbody>
                    <tfoot>
                      <tr class="hidden-table-bottom">
                        <td></td>
                      </tr>
                    </tfoot>
                    <c:set var="msg_and">
                      <spring:message code="txt.and" />
                    </c:set>
                    <input id="id_msg_and" type="hidden" value="${msg_and}" />
                    <c:set var="msg_other">
                      <spring:message code="txt.other" />
                    </c:set>
                    <input id="id_msg_other" type="hidden" value="${msg_other}" />
                  </table>
                </div>

                <div class="table-foot-area">
                  <div class="sort-length">
                    <div class="select-group">
                      <select id="PAGE_SIZE" class="select" title="한 페이지에 표시할 행 설정">
                        <option value='10' selected>10
                          <spring:message code="pcs.keyword" />
                        </option>
                        <option value='20'>20
                          <spring:message code="pcs.keyword" />
                        </option>
                        <option value='30'>30
                          <spring:message code="pcs.keyword" />
                        </option>
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
                      <i class="las la-edit"></i><span class="name">
                        <spring:message code="button.register" />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>


    <script src="${ctxPath}/script/safety/safety_0200.js?cachebuster=" + new Date().getTime()></script>
    <script src="${ctxPath}/script/sys/sys-common.js"></script>

    <script>
      var page = 1;
      $(document).ready(function () {
        // get localstorage in here
        var localParam = retrieveLocalObject('paramSearch');
        if (localParam != null) {
          page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
          const SEARCH_FIRST_DT = localParam['SEARCH_FIRST_DT'];
          const SEARCH_LAST_DT = localParam['SEARCH_LAST_DT'];
          const WORK_TYPE = localParam['WORK_TYPE'];
          const payment = localParam['payment'];
          const all = localParam['all'];
          var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

          $('#id_search_course_first_date').val(SEARCH_FIRST_DT);
          $('#id_search_course_last_date').val(SEARCH_LAST_DT);
          $('#id_search_work_type').val(WORK_TYPE);
          $('#id_search_payment').val(payment);
          $('#id_search_txt').val(all);
          $('select#PAGE_SIZE').val(pageSize);
        }
        safety_0200();
      });
    </script>