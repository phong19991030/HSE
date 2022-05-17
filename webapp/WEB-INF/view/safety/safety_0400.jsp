<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ include file="/WEB-INF/_include/taglib.jsp" %>

    <main id="content" class="general-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">
                <spring:message code="sft.sft_0400.label.subTittleList" />
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
                <!-- <div class="flex-wrap">
                  <div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0400.label.payment" />
                    </span>
                    <div class="select-group" style="width: 345px;">
                      <select title="search_payment" id="id_search_payment">
                        <option value="">전체</option>

                        <%-- <c:forEach items="${projects}" var="project" varStatus="loop">
                          <option value="${project.PROJECT_ID}">${project.PROJECT_NAME}</option>
                          </c:forEach> --%>
                      </select>
                    </div>
                  </div>
                  <%-- <div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0400.label.WRITER" />
                    </span>
                    <div class="select-group" style="width: 345px;">
                      <select title="프로젝트명" id="id_search_user_name">
                        <option value="">전체</option>
                        <c:forEach items="${users}" var="user" varStatus="loop">
                          <option value="${user.USER_NM}">${user.USER_NM}</option>
                        </c:forEach>
                      </select>
                    </div>
                </div> --%> -->

                <div class="item search">
                  <span class="item-tit">
                    <spring:message code="sft.sft_0200.label.SEARCH_ALL" />
                  </span>
                  <div class="register-write">
                    <div class="input-group">
                      <input type="text" id="id_search_txt" placeholder="<spring:message code="txt.search.placeholder" />">
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
                    <col style="width: 5%;">
                    <col style="width: 27%;">
                    <col style="width: 7%;">
                    <col style="width: 8%;">
                    <col style="width: 14%;">
                    <col style="width: 14%;">
                    <col style="width: 20%;">
                    <col style="width: 10%;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="col">
                        <spring:message code="com.com_0101.label.no" />
                      </th>
                      <th rowspan="col" class="txt-left">
                        <spring:message code="sft.sft_0400.label.PROJECT_NAME" />
                      </th>
                      <th rowspan="col">
                        <spring:message code="txt.doc.no" />
                      </th>
                      <th rowspan="col">
                        <spring:message code="sft.sft_0400.label.WRITER" />
                      </th>
                      <th rowspan="col">
                        <spring:message code="sft.sft_0400.label.contact" />
                      </th>
                      <th rowspan="col">
                        <spring:message code="sft.sft_0400.label.EXPECTED_EMERGENCY" />
                      </th>
                      <th rowspan="col" class="txt-left">
                        <spring:message code="sft.sft_0400.label.PROCEDURE_ACTION" />
                      </th>
                      <th rowspan="col">
                        <spring:message code="sft.sft_0400.label.EVACUATION_ROUTE" />
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
                </table>
              </div>

              <div class="table-foot-area">
                <div class="sort-length">
                  <div class="select-group">
                    <select id="PAGE_SIZE" class="select" title="한 페이지에 표시할 행 설정">
                      <option value="10" selected>10
                        <spring:message code="pcs.keyword" />
                      </option>
                      <option value="20">20
                        <spring:message code="pcs.keyword" />
                      </option>
                      <option value="30">30
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

    <script src="${ctxPath}/script/safety/safety_0400.js?cachebuster=" + new Date().getTime()></script>
    <script src="${ctxPath}/script/sys/sys-common.js"></script>

    <script>
      var page = 1;
      $(document).ready(function () {
        var localParam = retrieveLocalObject('paramSearch');
        if (localParam != null) {
          page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
          const id_search_payment = localParam['SEARCH_PAYMENT_STATUS'];
          const id_search_txt = localParam['all'];
          var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

          $('select#PAGE_SIZE').val(pageSize);
          $('select#id_search_payment').val(id_search_payment);
          $('input#id_search_txt').val(id_search_txt);
          _search.ALL = id_search_txt;
          _search.A = id_search_payment;
        }
        safety_0400();
      });
    </script>